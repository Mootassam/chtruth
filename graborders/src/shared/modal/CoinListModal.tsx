import React, { useState, useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import { i18n } from "../../i18n";
import authAxios from "src/modules/shared/axios/authAxios";
import { getMarketSocket } from "src/modules/shared/marketSocket";

interface CryptoData {
  symbol: string;
  name: string;
  price: string;
  changePercent: string;
  volume: number;
  volumeFormatted: string;
  isPositive: boolean;
}

function tickerToData(t: any): CryptoData {
  const price = Number(t.c);
  const vol = Number(t.v || 0);
  return {
    symbol: t.s,
    name: `${t.s.replace("USDT", "")}/USDT`,
    price: price.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 6 : 4,
    }),
    changePercent: String(t.P),
    volume: parseFloat(t.q || "0"),
    volumeFormatted: t.vf || (vol >= 1e9 ? (vol / 1e9).toFixed(1) + "B" : vol >= 1e6 ? (vol / 1e6).toFixed(1) + "M" : vol.toFixed(0)),
    isPositive: !!t.pos,
  };
}

const CoinListModal = ({ isOpen, onClose, onSelectCoin }) => {
  const [cryptoMap, setCryptoMap] = useState<Record<string, CryptoData>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  // ── initial load from Redis-cached backend ────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    setIsLoading(true);
    authAxios.get("/market/tickers").then(({ data }) => {
      const arr: any[] = data.data || [];
      const map: Record<string, CryptoData> = {};
      arr.forEach((t) => { map[t.s] = tickerToData(t); });
      setCryptoMap(map);
    }).catch(() => {}).finally(() => setIsLoading(false));
  }, [isOpen]);

  // ── Socket.IO real-time updates ───────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const socket = getMarketSocket();
    const handle = (arr: any[]) => {
      setCryptoMap((prev) => {
        const next = { ...prev };
        arr.forEach((t) => { next[t.s] = tickerToData(t); });
        return next;
      });
    };
    socket.on("market:update", handle);
    return () => { socket.off("market:update", handle); };
  }, [isOpen]);

  const filteredCrypto = useMemo(() => {
    let arr = Object.values(cryptoMap);
    if (!arr.length) return [];

    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      arr = arr.filter((c) => c.symbol.toLowerCase().includes(lower) || c.name.toLowerCase().includes(lower));
    }

    switch (activeTab) {
      case "Gainers":
        return arr.filter((c) => c.isPositive).sort((a, b) => Number(b.changePercent) - Number(a.changePercent));
      case "Losers":
        return arr.filter((c) => !c.isPositive).sort((a, b) => Number(a.changePercent) - Number(b.changePercent));
      case "Favorites":
        return arr.filter((c) => ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT"].includes(c.symbol))
          .sort((a, b) => b.volume - a.volume);
      default:
        return arr.sort((a, b) => b.volume - a.volume);
    }
  }, [cryptoMap, searchTerm, activeTab]);

  if (!isOpen) return null;

  const modalContent = (
    <div className="modal-overlay" onClick={onClose}>
      <div className="coin-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="coin-modal-header">
          <div className="coin-modal-title">{i18n("components.coinListModal.title")}</div>
          <button className="close-btn" onClick={onClose}><i className="fas fa-times" /></button>
        </div>

        <div className="search-section">
          <div className="search-input-container">
            <i className="fas fa-search search-icon" />
            <input
              type="text"
              placeholder={i18n("components.coinListModal.search.placeholder")}
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="clear-search" onClick={() => setSearchTerm("")}>
                <i className="fas fa-times" />
              </button>
            )}
          </div>
        </div>

        {isLoading && (
          <div className="loading-state">
            <i className="fas fa-spinner fa-spin" />
            <p>{i18n("components.coinListModal.loading")}</p>
          </div>
        )}

        {!isLoading && (
          <>
            <div className="coin-list">
              {filteredCrypto.length > 0 ? (
                filteredCrypto.map((coin) => (
                  <div key={coin.symbol} className="coin-item" onClick={() => { onSelectCoin(coin.symbol); onClose(); }}>
                    <div className="coin-info">
                      <div className="coin-icon">
                        <img
                          src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${coin.name.split("/")[0]}.png`}
                          style={{ width: 40, height: 40 }}
                          alt={coin.name.split("/")[0]}
                          loading="lazy"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                        />
                      </div>
                      <div className="coin-details">
                        <div className="coin-symbol">{coin.symbol}</div>
                        <div className="coin-name">{coin.name}</div>
                      </div>
                    </div>
                    <div className="coin-price-info">
                      <div className="coin-price">${coin.price}</div>
                      <div className={`coin-change ${coin.isPositive ? "positive" : "negative"}`}>
                        {coin.isPositive ? "+" : ""}{coin.changePercent}%
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">
                  <i className="fas fa-search" />
                  <p>{i18n("components.coinListModal.noResults")}</p>
                </div>
              )}
            </div>

            <div className="quick-select-section">
              <div className="section-label">{i18n("components.coinListModal.popular")}</div>
              <div className="quick-select-chips">
                {["BTC", "ETH", "BNB", "SOL"].map((t) => (
                  <button key={t} className="chip" onClick={() => setSearchTerm(t)}>{t}</button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <style>{`
        .modal-overlay { position:fixed; top:0; left:0; right:0; bottom:0; background-color:rgba(0,0,0,0.7); display:flex; justify-content:center; align-items:center; z-index:1000; padding:20px; }
        .coin-modal-container { background-color:#2a2a2a; border-radius:12px; width:100%; max-width:400px; max-height:80vh; box-shadow:0 5px 20px rgba(0,0,0,0.4); overflow:hidden; display:flex; flex-direction:column; }
        .coin-modal-header { background-color:#1a1a1a; padding:15px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #3a3a3a; }
        .coin-modal-title { font-weight:bold; font-size:18px; }
        .close-btn { background:none; border:none; color:#AAAAAA; font-size:20px; cursor:pointer; padding:5px; }
        .close-btn:hover { color:#FFFFFF; }
        .search-section { padding:15px; border-bottom:1px solid #3a3a3a; }
        .search-input-container { position:relative; display:flex; align-items:center; }
        .search-icon { position:absolute; left:12px; color:#AAAAAA; }
        .search-input { width:100%; padding:12px 40px; background-color:#3a3a3a; border:1px solid #4a4a4a; border-radius:8px; color:#FFFFFF; font-size:14px; }
        .search-input:focus { outline:none; border-color:#F3BA2F; }
        .clear-search { position:absolute; right:12px; background:none; border:none; color:#AAAAAA; cursor:pointer; }
        .clear-search:hover { color:#FFFFFF; }
        .loading-state { padding:40px 20px; text-align:center; color:#AAAAAA; }
        .loading-state i { font-size:32px; margin-bottom:10px; }
        .coin-list { flex:1; overflow-y:auto; max-height:40vh; }
        .coin-item { display:flex; justify-content:space-between; align-items:center; padding:12px 15px; cursor:pointer; transition:background-color 0.2s; }
        .coin-item:hover { background-color:#3a3a3a; }
        .coin-info { display:flex; align-items:center; gap:12px; }
        .coin-icon { width:40px; height:40px; border-radius:50%; background-color:#3a3a3a; display:flex; justify-content:center; align-items:center; overflow:hidden; }
        .coin-icon img { width:24px; height:24px; object-fit:contain; }
        .coin-details { display:flex; flex-direction:column; }
        .coin-symbol { font-weight:bold; font-size:16px; }
        .coin-name { font-size:12px; color:#AAAAAA; }
        .coin-price-info { text-align:right; }
        .coin-price { font-weight:bold; font-size:14px; }
        .coin-change { font-size:12px; }
        .coin-change.positive { color:#00C076; }
        .coin-change.negative { color:#FF6838; }
        .no-results { padding:40px 20px; text-align:center; color:#AAAAAA; }
        .no-results i { font-size:32px; margin-bottom:10px; }
        .quick-select-section { padding:15px; border-top:1px solid #3a3a3a; }
        .section-label { font-size:14px; color:#AAAAAA; margin-bottom:10px; }
        .quick-select-chips { display:flex; gap:8px; }
        .chip { padding:8px 16px; background-color:#3a3a3a; border:1px solid #4a4a4a; border-radius:20px; color:#FFFFFF; font-size:14px; cursor:pointer; transition:all 0.2s; }
        .chip:hover { background-color:#4a4a4a; border-color:#F3BA2F; }
      `}</style>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default CoinListModal;
