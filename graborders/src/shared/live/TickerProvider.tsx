import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { COINCAP_WS_URL, fetchTicker24h, getAssetId } from "../api/coinCap";

type CryptoData = {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changePercent: string;
  volume: string;
  volumeFormatted: string;
  isPositive: boolean;
};

type TickerContextValue = {
  data: { [key: string]: CryptoData };
  subscribe: (symbols: string[]) => void;
  unsubscribe: (symbols: string[]) => void;
};

const TickerContext = createContext<TickerContextValue>({
  data: {},
  subscribe: () => {},
  unsubscribe: () => {},
});

export const TickerProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<{ [key: string]: CryptoData }>({});
  const wsRef = useRef<WebSocket | null>(null);
  const subsRef = useRef<Map<string, number>>(new Map());
  const idToSymbolRef = useRef<Map<string, string>>(new Map()); // Maps "bitcoin" -> "BTCUSDT"
  const reconnectTimerRef = useRef<number | null>(null);
  const pollTimerRef = useRef<number | null>(null);
  const wsHealthyRef = useRef<boolean>(false);

  const connect = useCallback(() => {
    try {
      wsRef.current = new WebSocket(COINCAP_WS_URL);
    } catch {
      reconnectTimerRef.current = window.setTimeout(connect, 3000);
      return;
    }

    wsRef.current.onopen = () => {
      // CoinCap WS receives all prices, no subscription needed
      wsHealthyRef.current = true;
      if (pollTimerRef.current) {
        window.clearInterval(pollTimerRef.current);
        pollTimerRef.current = null;
      }
    };

    wsRef.current.onmessage = (event: MessageEvent) => {
      try {
        const msg = JSON.parse(event.data);
        // {"bitcoin": "6000.00"}
        
        setData((prev) => {
          const next = { ...prev };
          let hasChange = false;

          Object.entries(msg).forEach(([id, priceStr]) => {
             const symbol = idToSymbolRef.current.get(id);
             if (!symbol || !prev[symbol]) return;

             const current = prev[symbol];
             const priceNum = Number(priceStr);
             
             next[symbol] = {
                 ...current,
                 price: priceNum.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: priceNum < 1 ? 6 : 4,
                 }),
             };
             hasChange = true;
          });

          return hasChange ? next : prev;
        });
      } catch {}
    };

    wsRef.current.onerror = () => {
      wsHealthyRef.current = false;
      if (!pollTimerRef.current) {
        pollTimerRef.current = window.setInterval(async () => {
          const symbols: string[] = Array.from(subsRef.current.keys());
          if (symbols.length === 0) return;
          try {
            // Poll REST for each subscribed symbol
            const results = await Promise.all(symbols.map((s) => fetchTicker24h(s).catch(() => null)));
            const updates: { [k: string]: CryptoData } = {};
            results.forEach((t) => {
              if (!t) return;
              const symbol = t.symbol;
              const priceNum = Number(t.lastPrice);
              const isPositive = Number(t.priceChangePercent) >= 0;
              updates[symbol] = {
                symbol,
                name: `${symbol.replace("USDT", "")}/USDT`,
                price: Number(priceNum).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: Number(priceNum) < 1 ? 6 : 4,
                }),
                change: t.priceChange,
                changePercent: Math.abs(Number(t.priceChangePercent)).toFixed(2),
                volume: t.volume,
                volumeFormatted: t.volume,
                isPositive,
              };
            });
            if (Object.keys(updates).length > 0) {
              setData((prev) => ({ ...prev, ...updates }));
            }
          } catch {}
        }, 2000);
      }
    };
    wsRef.current.onclose = () => {
      wsHealthyRef.current = false;
      reconnectTimerRef.current = window.setTimeout(connect, 3000);
      if (!pollTimerRef.current) {
        pollTimerRef.current = window.setInterval(async () => {
          const symbols: string[] = Array.from(subsRef.current.keys());
          if (symbols.length === 0) return;
          try {
            const results = await Promise.all(symbols.map((s) => fetchTicker24h(s).catch(() => null)));
            const updates: { [k: string]: CryptoData } = {};
            results.forEach((t) => {
              if (!t) return;
              const symbol = t.symbol;
              const priceNum = Number(t.lastPrice);
              const isPositive = Number(t.priceChangePercent) >= 0;
              updates[symbol] = {
                symbol,
                name: `${symbol.replace("USDT", "")}/USDT`,
                price: Number(priceNum).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: Number(priceNum) < 1 ? 6 : 4,
                }),
                change: t.priceChange,
                changePercent: Math.abs(Number(t.priceChangePercent)).toFixed(2),
                volume: t.volume,
                volumeFormatted: t.volume,
                isPositive,
              };
            });
            if (Object.keys(updates).length > 0) {
              setData((prev) => ({ ...prev, ...updates }));
            }
          } catch {}
        }, 2000);
      }
    };
  }, []);

  useEffect(() => {
    connect();
    return () => {
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
      if (wsRef.current) {
        try {
          wsRef.current.close();
        } catch {}
      }
      if (pollTimerRef.current) {
        window.clearInterval(pollTimerRef.current);
        pollTimerRef.current = null;
      }
    };
  }, [connect]);

  const subscribe = useCallback((symbols: string[]) => {
    const toAdd: string[] = [];
    symbols.forEach((s) => {
      const c = subsRef.current.get(s) || 0;
      subsRef.current.set(s, c + 1);
      if (c === 0) {
          toAdd.push(s);
          const id = getAssetId(s);
          idToSymbolRef.current.set(id, s);
      }
    });

    toAdd.forEach(async (s) => {
      try {
        const t = await fetchTicker24h(s);
        const symbol = t.symbol;
        const priceNum = Number(t.lastPrice);
        const safePrice = Number.isFinite(priceNum) ? priceNum : 0;
        const changePctNum = Number(t.priceChangePercent);
        const safeChangePct = Number.isFinite(changePctNum) ? changePctNum : 0;
        const changeNum = Number(t.priceChange);
        const safeChange = Number.isFinite(changeNum) ? changeNum : 0;
        const volNum = Number(t.volume);
        const safeVol = Number.isFinite(volNum) ? volNum : 0;
        const isPositive = safeChangePct >= 0;
        const changePercentFormatted = Math.abs(safeChangePct).toFixed(2);
        let volumeFormatted = safeVol.toFixed(0);
        if (safeVol >= 1000000000) {
          volumeFormatted = (safeVol / 1000000000).toFixed(1) + "B";
        } else if (safeVol >= 1000000) {
          volumeFormatted = (safeVol / 1000000).toFixed(1) + "M";
        }
        setData((prev) => ({
          ...prev,
          [symbol]: {
            symbol,
            name: `${symbol.replace("USDT", "")}/USDT`,
            price: Number(safePrice).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: Number(safePrice) < 1 ? 6 : 4,
            }),
            change: String(safeChange),
            changePercent: changePercentFormatted,
            volume: String(safeVol),
            volumeFormatted,
            isPositive,
          },
        }));
      } catch {}
    });
  }, []);

  const unsubscribe = useCallback((symbols: string[]) => {
    symbols.forEach((s) => {
      const c = subsRef.current.get(s) || 0;
      if (c <= 1) {
        subsRef.current.delete(s);
        const id = getAssetId(s);
        idToSymbolRef.current.delete(id);
      } else {
        subsRef.current.set(s, c - 1);
      }
    });
  }, []);

  const value = useMemo(
    () => ({
      data,
      subscribe,
      unsubscribe,
    }),
    [data, subscribe, unsubscribe]
  );

  return <TickerContext.Provider value={value}>{children}</TickerContext.Provider>;
};

export const useTicker = () => useContext(TickerContext);

export const useTickerSymbol = (symbol: string) => {
  const { data } = useTicker();
  return data[symbol];
};
