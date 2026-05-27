import React, { useEffect, useRef, useState, useCallback } from "react";
import { init, dispose, KLineData } from "klinecharts";
import authAxios from "src/modules/shared/axios/authAxios";
import { getMarketSocket } from "src/modules/shared/marketSocket";

const INDICATORS = ["MA", "EMA", "BOLL", "MACD", "RSI", "WR", "VOL"] as const;
type IndicatorName = (typeof INDICATORS)[number];

const TIMEFRAMES = ["1m", "5m", "15m", "1h", "4h", "1d"] as const;
type TF = (typeof TIMEFRAMES)[number];

const chartTypes = ["candle", "bar", "area"] as const;
type ChartType = (typeof chartTypes)[number];

interface FuturesChartProps {
  symbol?: string;
}

// ─── klinecharts compat wrappers ─────────────────────────────────────────────

const tryCreateIndicator = (chart: any, name: string, isOverlay: boolean) => {
  const paneOptionsOverlay = { id: "candle_pane" };
  const paneOptionsOsc     = { id: "osc_pane", height: 140 };
  const paneOptions = isOverlay ? paneOptionsOverlay : paneOptionsOsc;

  const attempts: Array<() => any> = [
    () => chart.createIndicator?.(name, isOverlay, paneOptions),
    () => chart.createIndicator?.({ name }, isOverlay, paneOptions),
    () => chart.createTechnicalIndicator?.(name, isOverlay, paneOptions),
    () => chart.createTechnicalIndicator?.({ name }, isOverlay, paneOptions),
    () => chart.addIndicator?.(name, paneOptions),
    () => chart.addTechnicalIndicator?.(name, isOverlay, paneOptions),
  ];

  for (const fn of attempts) {
    try {
      const res = fn();
      if (typeof res === "string") return res;
      if (res && typeof res === "object" && ("id" in res || "indicatorId" in res))
        return (res as any).id ?? (res as any).indicatorId;
      if (res === undefined) return true;
    } catch (_) {}
  }
  return null;
};

const tryRemoveIndicator = (chart: any, nameOrId: string) => {
  const attempts: Array<() => any> = [
    () => chart.removeIndicator?.({ id: nameOrId }),
    () => chart.removeTechnicalIndicatorByName?.(nameOrId),
    () => chart.removeTechnicalIndicator?.(nameOrId),
    () => chart.removeIndicatorById?.(nameOrId),
    () => chart.removeIndicatorByName?.(nameOrId),
    () => chart.removeIndicator?.(nameOrId),
  ];
  for (const fn of attempts) {
    try { if (fn() !== undefined) return; } catch (_) {}
  }
};

// ─── component ───────────────────────────────────────────────────────────────

const FuturesChart: React.FC<FuturesChartProps> = ({ symbol = "BTCUSDT" }) => {
  const chartRef = useRef<any>(null);
  const [activeTf, setActiveTf]         = useState<TF>("1m");
  const [activeIndicators, setActiveIndicators] = useState<Record<string, string | true>>({});
  const [chartType, setChartType]       = useState<ChartType>("candle");
  const [isLoading, setIsLoading]       = useState(true);

  // ── load historical klines from backend (Redis-cached, no binance.us) ──────
  const loadData = useCallback(async (tf: TF) => {
    setIsLoading(true);
    try {
      const { data } = await authAxios.get("/market/klines", {
        params: { symbol, interval: tf, limit: 500 },
      });
      const candles: KLineData[] = data.data || [];
      if (candles.length) {
        chartRef.current?.applyNewData?.(candles);
        chartRef.current?.setData?.(candles);
      }
    } catch (err) {
      console.error("[FuturesChart] loadData error", err);
    } finally {
      setIsLoading(false);
    }
  }, [symbol]);

  // ── subscribe to live candle updates via Socket.IO ───────────────────────
  const startKlineSubscription = useCallback((tf: TF) => {
    const socket   = getMarketSocket();
    const eventKey = `market:kline:${symbol}:${tf}`;

    socket.emit("subscribe:kline", { symbol, interval: tf });

    const handler = (candle: KLineData) => {
      chartRef.current?.updateData?.(candle);
      chartRef.current?.appendData?.(candle);
    };

    socket.on(eventKey, handler);

    return () => {
      socket.off(eventKey, handler);
      socket.emit("unsubscribe:kline", { symbol, interval: tf });
    };
  }, [symbol]);

  // ── init chart once ──────────────────────────────────────────────────────
  useEffect(() => {
    const chart = init("futures-chart");
    chartRef.current = chart;

    chart.setStyles?.({
      candle: {
        type: "candle_solid",
        bar: {
          upColor:      "#0ECB81",
          downColor:    "#F6465D",
          noChangeColor:"#999",
        },
        priceMark: {
          last: {
            line: { color: "#888", style: "dashed" },
            text: { color: "#fff", backgroundColor: "#888" },
          },
        },
      },
      grid: {
        horizontal: { color: "rgba(255,255,255,0.06)" },
        vertical:   { color: "rgba(255,255,255,0.03)" },
      },
    });

    const onResize = () => chart.resize?.();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      dispose("futures-chart");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── reload on tf or symbol change ────────────────────────────────────────
  useEffect(() => {
    if (!chartRef.current) return;
    loadData(activeTf);
    const unsubscribe = startKlineSubscription(activeTf);
    return unsubscribe;
  }, [activeTf, symbol, loadData, startKlineSubscription]);

  // ── chart type styles ────────────────────────────────────────────────────
  useEffect(() => {
    if (!chartRef.current) return;
    if (chartType === "candle") {
      chartRef.current.setStyles?.({ candle: { type: "candle_solid" } });
    } else if (chartType === "bar") {
      chartRef.current.setStyles?.({ candle: { type: "candle_stroke" } });
    } else if (chartType === "area") {
      chartRef.current.setStyles?.({
        candle: {
          type: "area",
          area: {
            lineColor: "#0ECB81",
            lineSize: 2,
            gradient: [
              { offset: 0, color: "rgba(14,203,129,0.35)" },
              { offset: 1, color: "rgba(14,203,129,0.04)" },
            ],
          },
        },
      });
    }
  }, [chartType]);

  // ── toggle indicator ─────────────────────────────────────────────────────
  const toggleIndicator = (name: IndicatorName) => {
    const chart = chartRef.current;
    if (!chart) return;

    const exists = activeIndicators[name];
    if (exists) {
      tryRemoveIndicator(chart, typeof exists === "string" ? exists : name);
      setActiveIndicators((p) => { const c = { ...p }; delete c[name]; return c; });
      return;
    }

    const overlayNames = ["MA", "EMA", "BOLL", "VOL", "BBI", "SMA", "SAR"];
    const res = tryCreateIndicator(chart, name, overlayNames.includes(name));
    setActiveIndicators((p) => ({
      ...p,
      [name]: typeof res === "string" ? res : true,
    }));
  };

  const btnStyle = (active: boolean): React.CSSProperties => ({
    padding: "6px 10px",
    background: active ? "#0ECB81" : "transparent",
    color:      active ? "#000"    : "#fff",
    borderRadius: 6,
    border: "1px solid rgba(255,255,255,0.06)",
    cursor: "pointer",
    fontSize: 12,
  });

  return (
    <div style={{ width: "100%", background: "#0B0E11", color: "#fff", padding: 8 }}>
      {/* timeframe toolbar */}
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 8, alignItems: "center" }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {TIMEFRAMES.map((tf) => (
            <button key={tf} onClick={() => setActiveTf(tf)} style={btnStyle(activeTf === tf)}>
              {tf}
            </button>
          ))}
        </div>
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value as ChartType)}
          style={{ padding: "6px 10px", borderRadius: 6, background: "#0B0E11", color: "#fff", border: "1px solid rgba(255,255,255,0.06)", fontSize: 12 }}
        >
          {chartTypes.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* chart canvas */}
      <div style={{ position: "relative" }}>
        <div id="futures-chart" style={{ width: "100%", height: 380 }} />
        {isLoading && (
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(11,14,17,0.7)",
            fontSize: 13, color: "#aaa",
          }}>
            Loading chart…
          </div>
        )}
      </div>

      {/* indicators */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
        {INDICATORS.map((ind) => (
          <button key={ind} onClick={() => toggleIndicator(ind)} style={btnStyle(!!activeIndicators[ind])}>
            {ind}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FuturesChart;
