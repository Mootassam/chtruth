import React, { useEffect, useRef, useState } from "react";
import { init, dispose, KLineData } from "klinecharts";

const INDICATORS = ["MA", "EMA", "BOLL", "MACD", "RSI", "WR", "VOL"] as const;
type IndicatorName = (typeof INDICATORS)[number];

const TIMEFRAMES = ["1m", "5m", "15m", "1h", "4h", "1d"] as const;
type TF = (typeof TIMEFRAMES)[number];

const tfToBinance: Record<TF, string> = {
  "1m": "1m",
  "5m": "5m",
  "15m": "15m",
  "1h": "1h",
  "4h": "4h",
  "1d": "1d",
};

const chartTypes = ["candle", "bar", "area"] as const;
type ChartType = (typeof chartTypes)[number];

/**
 * Helper: try different indicator creation/removal APIs so code works on
 * v9, v10-alpha, and v10 stable.
 */
const tryCreateIndicator = (chart: any, name: string, isOverlay: boolean) => {
  const paneOptionsOverlay = { id: "candle_pane" };
  const paneOptionsOsc = { id: "osc_pane", height: 140 };
  const paneOptions = isOverlay ? paneOptionsOverlay : paneOptionsOsc;

  const attempts: Array<() => any> = [
    // v10 stable: createIndicator(name, isOverlay, paneOptions) OR createIndicator({name}, isOverlay, paneOptions)
    () => chart.createIndicator && chart.createIndicator(name, isOverlay, paneOptions),
    () => chart.createIndicator && chart.createIndicator({ name }, isOverlay, paneOptions),

    // v9 / alpha: createTechnicalIndicator(name, isOverlay, paneOptions) or createTechnicalIndicator({name}, ...)
    () => chart.createTechnicalIndicator && chart.createTechnicalIndicator(name, isOverlay, paneOptions),
    () => chart.createTechnicalIndicator && chart.createTechnicalIndicator({ name }, isOverlay, paneOptions),

    // other possible APIs
    () => chart.addIndicator && chart.addIndicator(name, paneOptions),
    () => chart.addTechnicalIndicator && chart.addTechnicalIndicator(name, isOverlay, paneOptions),
    () => chart.overrideIndicator && chart.overrideIndicator(name, paneOptions),
  ];

  for (const fn of attempts) {
    try {
      const res = fn();
      // Some implementations return an id string or an object with id
      if (typeof res === "string") return res;
      if (res && typeof res === "object") {
        if ("id" in res) return (res as any).id;
        if ("indicatorId" in res) return (res as any).indicatorId;
      }
      // if undefined but didn't throw, assume success (no id)
      if (res === undefined) return true;
    } catch (e) {
      // try next attempt
    }
  }
  console.warn("[kline-compat] failed to create indicator:", name);
  return null;
};

const tryRemoveIndicator = (chart: any, nameOrId: string) => {
  const attempts: Array<() => any> = [
    // v10 stable: removeIndicator({ id })
    () => chart.removeIndicator && chart.removeIndicator({ id: nameOrId }),
    // v9 style: removeTechnicalIndicatorByName / removeTechnicalIndicator
    () => chart.removeTechnicalIndicatorByName && chart.removeTechnicalIndicatorByName(nameOrId),
    () => chart.removeTechnicalIndicator && chart.removeTechnicalIndicator(nameOrId),
    // other possibilities
    () => chart.removeIndicatorById && chart.removeIndicatorById(nameOrId),
    () => chart.removeIndicatorByName && chart.removeIndicatorByName(nameOrId),
    () => chart.removeIndicator && chart.removeIndicator(nameOrId),
  ];

  for (const fn of attempts) {
    try {
      const res = fn();
      // if it runs without throwing, assume success
      if (res !== undefined) return true;
    } catch (e) {
      // try next
    }
  }

  // last resort — try removeTechnicalIndicator(nameOrId)
  try {
    if (chart.removeTechnicalIndicator) {
      chart.removeTechnicalIndicator(nameOrId);
      return true;
    }
  } catch (e) {}
  console.warn("[kline-compat] failed to remove indicator:", nameOrId);
  return false;
};

const FuturesChart: React.FC = () => {
  const chartRef = useRef<any>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const [activeTf, setActiveTf] = useState<TF>("1m");
  // map indicator name -> returned id (string) OR true if created but no id returned
  const [activeIndicators, setActiveIndicators] = useState<Record<string, string | true>>({});
  const [chartType, setChartType] = useState<ChartType>("candle");

  // fetch historical
  const loadData = async (tf: TF) => {
    try {
      const url = `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=${tfToBinance[tf]}&limit=500`;
      const res = await fetch(url);
      const raw = await res.json();
      const data: KLineData[] = raw.map((d: any) => ({
        timestamp: d[0],
        open: +d[1],
        high: +d[2],
        low: +d[3],
        close: +d[4],
        volume: +d[5],
      }));
      chartRef.current?.applyNewData?.(data);
      chartRef.current?.setData?.(data); // fallback for some versions
    } catch (e) {
      console.error("loadData error", e);
    }
  };

  // websocket live
  const startWS = (tf: TF) => {
    wsRef.current?.close();
    const stream = `wss://stream.binance.com:9443/ws/btcusdt@kline_${tfToBinance[tf]}`;
    try {
      const ws = new WebSocket(stream);
      wsRef.current = ws;
      ws.onmessage = (ev) => {
        const msg = JSON.parse(ev.data);
        const k = msg?.k;
        if (!k) return;
        const payload = {
          timestamp: k.t,
          open: +k.o,
          high: +k.h,
          low: +k.l,
          close: +k.c,
          volume: +k.v,
        };
        chartRef.current?.updateData?.(payload);
        chartRef.current?.appendData?.(payload); // fallback
      };
    } catch (e) {
      console.warn("WS start failed", e);
    }
  };

  // init chart on mount
// inside useEffect(() => { … }, [])
useEffect(() => {
  const chart = init("futures-chart");
  chartRef.current = chart;

  // Binance-like default styling
  chart.setStyles?.({
    candle: {
      type: "candle_solid",
      bar: {
        upColor: "#0ECB81",
        downColor: "#F6465D",
        noChangeColor: "#999",
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
      vertical: { color: "rgba(255,255,255,0.03)" },
    },
  });

  // load & live
  loadData(activeTf);
  startWS(activeTf);

  const onResize = () => chart.resize?.();
  window.addEventListener("resize", onResize);

  return () => {
    window.removeEventListener("resize", onResize);
    wsRef.current?.close();
    dispose("futures-chart");
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


  // reload on timeframe change
  useEffect(() => {
    if (!chartRef.current) return;
    loadData(activeTf);
    startWS(activeTf);
  }, [activeTf]);

  // update chart type (candle / bar / area)
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

  // toggle indicator (supports overlay vs oscillator)
  const toggleIndicator = (name: IndicatorName) => {
    const chart = chartRef.current;
    if (!chart) return;

    const exists = activeIndicators[name];
    if (exists) {
      // if we stored an id, remove by id; otherwise remove by name
      const idOrName = typeof exists === "string" ? exists : name;
      tryRemoveIndicator(chart, idOrName as string);
      const copy = { ...activeIndicators };
      delete copy[name];
      setActiveIndicators(copy);
      return;
    }

    // decide overlay vs oscillator (overlay on candle pane)
    const overlayNames = ["MA", "EMA", "BOLL", "VOL", "BBI", "SMA", "SAR"];
    const isOverlay = overlayNames.includes(name);

    const res = tryCreateIndicator(chart, name, isOverlay);
    if (res) {
      // store id string or true as created marker
      setActiveIndicators((p) => ({ ...p, [name]: typeof res === "string" ? (res as string) : true }));
    } else {
      // still mark it active (even if no id returned) so button state updates
      setActiveIndicators((p) => ({ ...p, [name]: true }));
    }
  };

  return (
    <div style={{ width: "100%", height: "100%", background: "#0B0E11", color: "#fff", padding: 8 }}>
      {/* toolbar */}
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 8, alignItems: "center" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf}
              onClick={() => setActiveTf(tf)}
              style={{
                padding: "6px 10px",
                background: activeTf === tf ? "#0ECB81" : "transparent",
                color: activeTf === tf ? "#000" : "#fff",
                borderRadius: 6,
                border: "1px solid rgba(255,255,255,0.06)",
                cursor: "pointer",
              }}
            >
              {tf}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value as ChartType)}
            style={{
              padding: "6px 10px",
              borderRadius: 6,
              background: "#0B0E11",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {chartTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

        
        </div>
      </div>

      {/* chart */}
      <div id="futures-chart" style={{ width: "100%", height: 400 }} />

        <div style={{ display: "flex", gap: 6 }}>
            {INDICATORS.map((ind) => (
              <button
                key={ind}
                onClick={() => toggleIndicator(ind)}
                style={{
                  padding: "6px 10px",
                  borderRadius: 6,
                  background: activeIndicators[ind] ? "#0ECB81" : "transparent",
                  color: activeIndicators[ind] ? "#000" : "#fff",
                  border: "1px solid rgba(255,255,255,0.06)",
                  cursor: "pointer",
                }}
              >
                {ind}
              </button>
            ))}
          </div>
    </div>
  );
};

export default FuturesChart;
