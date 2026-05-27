import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import authAxios from "src/modules/shared/axios/authAxios";
import { getMarketSocket } from "src/modules/shared/marketSocket";
import { i18n } from "../../../i18n";

interface Ticker {
  s: string;   // symbol  e.g. BTCUSDT
  n: string;   // name    e.g. BTC/USDT
  c: string;   // last price
  P: string;   // |changePercent|
  pos: boolean;// isPositive
  vf: string;  // volume formatted
  q: number;   // quote volume (for sort)
  h: string;   // high
  l: string;   // low
}

const FAVORITE_SYMBOLS = new Set([
  "BTCUSDT", "ETHUSDT", "BNBUSDT", "LTCUSDT", "SOLUSDT",
  "XRPUSDT", "SUIUSDT", "DOGEUSDT", "SHIBUSDT",
]);

const Market: React.FC = () => {
  const [tickers, setTickers]       = useState<Map<string, Ticker>>(new Map());
  const [isLoading, setIsLoading]   = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab]   = useState("All");

  // Accumulate real-time updates in a ref; batch-apply every 1 second
  const pendingRef  = useRef<Map<string, Ticker>>(new Map());
  const batchTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── initial load from backend REST (Redis-cached, ~5ms) ──────────────────
  useEffect(() => {
    authAxios
      .get("/market/tickers")
      .then(({ data }) => {
        const arr: Ticker[] = data.data || [];
        if (arr.length === 0) return;
        setTickers(new Map(arr.map((t) => [t.s, t])));
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  // ── Socket.IO real-time updates (batched every 1 s to avoid re-render storm) ─
  useEffect(() => {
    const socket = getMarketSocket();

    const handleUpdate = (arr: Ticker[]) => {
      arr.forEach((t) => pendingRef.current.set(t.s, t));

      if (!batchTimer.current) {
        batchTimer.current = setTimeout(() => {
          batchTimer.current = null;
          setTickers((prev) => {
            const next = new Map(prev);
            pendingRef.current.forEach((t, k) => next.set(k, t));
            pendingRef.current.clear();
            return next;
          });
          setIsLoading(false);
        }, 1000);
      }
    };

    socket.on("market:update", handleUpdate);
    return () => {
      socket.off("market:update", handleUpdate);
      if (batchTimer.current) {
        clearTimeout(batchTimer.current);
        batchTimer.current = null;
      }
    };
  }, []);

  // ── filtering & sorting ───────────────────────────────────────────────────
  const filteredList = useMemo(() => {
    let arr = Array.from(tickers.values());

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      arr = arr.filter((t) => t.n.toLowerCase().includes(q) || t.s.toLowerCase().includes(q));
    }

    switch (activeTab) {
      case "Gainers":
        return arr.filter((t) => t.pos).sort((a, b) => parseFloat(b.P) - parseFloat(a.P));
      case "Losers":
        return arr.filter((t) => !t.pos).sort((a, b) => parseFloat(b.P) - parseFloat(a.P));
      case "Favorites":
        return arr
          .filter((t) => FAVORITE_SYMBOLS.has(t.s))
          .sort((a, b) => [...FAVORITE_SYMBOLS].indexOf(a.s) - [...FAVORITE_SYMBOLS].indexOf(b.s));
      default:
        return arr.sort((a, b) => b.q - a.q);
    }
  }, [tickers, searchTerm, activeTab]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  return (
    <div className="market-container">
      <div className="market-headers">
        <div className="market-page-title">{i18n("pages.market.title")}</div>
        <div className="search-bar">
          <i className="fas fa-search" style={{ color: "#AAAAAA" }} />
          <input
            type="text"
            placeholder={i18n("pages.market.search.placeholder")}
            value={searchTerm}
            onChange={handleSearch}
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm("")} aria-label="clear">×</button>
          )}
        </div>
      </div>

      <div className="market-tabs">
        {["All", "Gainers", "Losers", "Favorites"].map((tab) => (
          <div
            key={tab}
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {i18n(`pages.market.tabs.${tab.toLowerCase()}`)}
          </div>
        ))}
      </div>

      <div className="market-list">
        {isLoading ? (
          <div className="market-placeholder">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="market-item-placeholder">
                <div className="crypto-info-placeholder">
                  <div className="crypto-icon-placeholder shimmer" />
                  <div className="crypto-details-placeholder">
                    <div className="placeholder-line shimmer" style={{ width: "60%", height: 16, marginBottom: 8 }} />
                    <div className="placeholder-line shimmer" style={{ width: "40%", height: 12 }} />
                  </div>
                </div>
                <div className="price-info-placeholder">
                  <div className="placeholder-line shimmer" style={{ width: 70, height: 16, marginBottom: 8 }} />
                  <div className="placeholder-line shimmer" style={{ width: 50, height: 12 }} />
                </div>
              </div>
            ))}
          </div>
        ) : filteredList.length > 0 ? (
          filteredList.map((t) => (
            <TickerRow key={t.s} ticker={t} />
          ))
        ) : (
          <div className="no-results">
            <i className="fas fa-search" style={{ fontSize: 24, marginBottom: 10 }} />
            <div>{i18n("pages.market.noResults")}</div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { background-position: -468px 0; }
          100% { background-position:  468px 0; }
        }
        .shimmer {
          animation: shimmer 1.5s infinite linear;
          background: linear-gradient(to right, #2A2A2A 8%, #333 18%, #2A2A2A 33%);
          background-size: 800px 104px;
          border-radius: 4px;
        }
        .market-container { max-width:400px; margin:0 auto; padding:20px 15px; background:#000; color:#fff; min-height:100vh; }
        .market-headers { margin-bottom:20px; }
        .market-page-title { font-size:24px; font-weight:bold; margin-bottom:15px; }
        .search-bar { display:flex; align-items:center; background:#1A1A1A; border-radius:8px; padding:10px 15px; position:relative; }
        .search-bar i { margin-right:10px; }
        .search-bar input { background:none; border:none; color:#fff; width:100%; outline:none; }
        .clear-search { background:none; border:none; color:#aaa; font-size:18px; cursor:pointer; position:absolute; right:10px; }
        .market-tabs { display:flex; justify-content:space-between; margin-bottom:20px; border-bottom:1px solid #2A2A2A; }
        .tab { padding:10px 0; cursor:pointer; color:#aaa; position:relative; font-size:14px; }
        .tab.active { color:#fff; font-weight:bold; }
        .tab.active::after { content:''; position:absolute; bottom:-1px; left:0; right:0; height:2px; background:#F3BA2F; }
        .market-list { overflow-y:auto; margin-bottom:40px; }
        .market-item { display:flex; justify-content:space-between; align-items:center; padding:15px 0; border-bottom:1px solid #2A2A2A; }
        .crypto-info { display:flex; align-items:center; flex:1; }
        .crypto-icon { width:40px; height:40px; border-radius:50%; display:flex; justify-content:center; align-items:center; margin-right:12px; overflow:hidden; background:#1A1A1A; }
        .crypto-name { font-weight:bold; margin-bottom:4px; font-size:14px; }
        .crypto-volume { font-size:12px; color:#aaa; }
        .price-info { text-align:right; margin-right:15px; flex:1; }
        .price { font-weight:bold; margin-bottom:4px; font-size:14px; }
        .change { font-size:12px; }
        .change.positive { color:#00C076; }
        .change.negative { color:#FF6838; }
        .market-item-placeholder { display:flex; justify-content:space-between; align-items:center; padding:15px 0; border-bottom:1px solid #2A2A2A; }
        .crypto-info-placeholder { display:flex; align-items:center; flex:1; }
        .crypto-icon-placeholder { width:40px; height:40px; border-radius:50%; margin-right:12px; flex-shrink:0; }
        .crypto-details-placeholder { flex:1; }
        .price-info-placeholder { text-align:right; margin-right:15px; }
        .placeholder-line { border-radius:4px; margin-bottom:8px; }
        .no-results { text-align:center; padding:40px 0; color:#777; }
        .remove_blue { text-decoration:none; color:inherit; }
      `}</style>
    </div>
  );
};

// Memoized row — only re-renders when price/change actually changes
const TickerRow = React.memo(({ ticker: t }: { ticker: Ticker }) => {
  const base = t.n.split("/")[0];
  const price = Number(t.c).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: Number(t.c) < 1 ? 6 : 4,
  });

  return (
    <Link to={`/market/detail/${t.s}`} className="remove_blue">
      <div className="market-item">
        <div className="crypto-info">
          <div className="crypto-icon">
            <img
              src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${base}.png`}
              width={40}
              height={40}
              alt={base}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  `https://via.placeholder.com/40/3a3a3a/ffffff?text=${base.charAt(0)}`;
              }}
            />
          </div>
          <div>
            <div className="crypto-name">{t.n}</div>
            <div className="crypto-volume">{i18n("pages.market.volume")}: {t.vf}</div>
          </div>
        </div>
        <div className="price-info">
          <div className="price">${price}</div>
          <div className={`change ${t.pos ? "positive" : "negative"}`}>
            {t.pos ? "+" : ""}{t.P}%
          </div>
        </div>
      </div>
    </Link>
  );
});

export default Market;
