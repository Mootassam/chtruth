import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import FuturesChart from "../Futures/FuturesChart";
import authAxios from "src/modules/shared/axios/authAxios";
import { getMarketSocket } from "src/modules/shared/marketSocket";
import { i18n } from "../../../i18n";

interface Ticker {
  s: string; c: string; P: string; pos: boolean;
  h: string; l: string; v: string;
}
interface Trade {
  t?: number; T?: number;
  p: string; q: string; m?: boolean;
}

function MarketDetail() {
  const history = useHistory();
  const { id }  = useParams<{ id: string }>();
  const symbol  = (id || "BTCUSDT").toUpperCase();

  const [ticker, setTicker]     = useState<Ticker | null>(null);
  const [trades, setTrades]     = useState<Trade[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const formatNumber = useCallback((num: string, decimals = 2) =>
    Number(num).toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }), []);

  const formatVolume = useCallback((vol: string) => {
    const v = Number(vol);
    if (v >= 1e9) return (v / 1e9).toFixed(2) + i18n("pages.marketDetail.volume.billion");
    if (v >= 1e6) return (v / 1e6).toFixed(2) + i18n("pages.marketDetail.volume.million");
    return formatNumber(vol, 0);
  }, [formatNumber]);

  // ── initial load from backend REST (Redis-cached) ─────────────────────────
  useEffect(() => {
    setIsLoading(true);
    setTicker(null);
    authAxios
      .get(`/market/detail/${symbol}`)
      .then(({ data }) => {
        const { ticker: t, trades: tr } = data.data || {};
        if (t)  setTicker(t);
        if (tr?.length) setTrades(tr.slice(0, 20));
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [symbol]);

  // ── Socket.IO: subscribe to batch market updates, filter this symbol ───────
  useEffect(() => {
    const socket = getMarketSocket();
    const handle = (arr: Ticker[]) => {
      const found = arr.find((t) => t.s === symbol);
      if (found) setTicker(found);
    };
    socket.on("market:update", handle);
    return () => { socket.off("market:update", handle); };
  }, [symbol]);

  const goBack = useCallback(() => history.goBack(), [history]);

  const Placeholder = useCallback(
    ({ width = "100%", height = "1em" }: { width?: string; height?: string }) => (
      <div className="loading-placeholder" style={{ width, height }} />
    ), []);

  const marketInfoSection = useMemo(() => (
    <div className="market-info">
      <div className="market-icon">
        <img
          src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${symbol.replace("USDT", "")}.png`}
          style={{ width: 30, height: 30 }} alt={symbol} loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
      </div>
      <div className="market-name">{symbol}</div>
      <div className="market-change" style={{ color: ticker && !ticker.pos ? "#FF6838" : "#00C076" }}>
        {ticker
          ? `${ticker.pos ? "+" : ""}${ticker.P}%`
          : <Placeholder width="50px" height="16px" />}
      </div>
    </div>
  ), [symbol, ticker, Placeholder]);

  const marketStatsSection = useMemo(() => (
    <div className="market-stats">
      <span>
        {i18n("pages.marketDetail.stats.high")}:{" "}
        {ticker ? `$${formatNumber(ticker.h)}` : <Placeholder width="80px" height="12px" />}
      </span>
      <span>
        {i18n("pages.marketDetail.stats.volume")}:{" "}
        {ticker
          ? `${formatVolume(ticker.v)} ${symbol.replace("USDT", "")}`
          : <Placeholder width="80px" height="12px" />}
      </span>
      <span>
        {i18n("pages.marketDetail.stats.low")}:{" "}
        {ticker ? `$${formatNumber(ticker.l)}` : <Placeholder width="80px" height="12px" />}
      </span>
    </div>
  ), [ticker, symbol, formatNumber, formatVolume, Placeholder]);

  const recentTradesSection = useMemo(() => {
    if (trades.length > 0) {
      return trades.map((trade, idx) => (
        <div key={trade.t ?? idx} className={`trade-row ${trade.m ? "sell-trade" : "buy-trade"}`}>
          <div className="trade-price">{formatNumber(trade.p)}</div>
          <div className="trade-amount">{Number(trade.q).toFixed(4)}</div>
          <div className="trade-time">{new Date(trade.T ?? 0).toLocaleTimeString()}</div>
        </div>
      ));
    }
    return Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="trade-row">
        <div className="trade-price"><Placeholder width="60px" height="14px" /></div>
        <div className="trade-amount"><Placeholder width="50px" height="14px" /></div>
        <div className="trade-time"><Placeholder width="40px" height="14px" /></div>
      </div>
    ));
  }, [trades, formatNumber, Placeholder]);

  return (
    <div className="container">
      <div className="header">
        <div className="header-top">
          <div className="back-button" onClick={goBack}><i className="fas fa-arrow-left" /></div>
          {marketInfoSection}
          <div style={{ width: 20 }} />
        </div>
        <div className="market-price">
          {ticker
            ? `$${formatNumber(ticker.c)}`
            : <Placeholder width="120px" height="28px" />}
        </div>
        {marketStatsSection}
      </div>

      <FuturesChart symbol={symbol} />

      <div className="action-buttons">
        <Link to="/trade" className="remove_blue action-button buy-button">
          {i18n("pages.marketDetail.actions.buy")}
        </Link>
        <Link to="/trade" className="remove_blue action-button sell-button">
          {i18n("pages.marketDetail.actions.sell")}
        </Link>
      </div>

   

      <style>{`
        * { margin:0; padding:0; box-sizing:border-box; font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif; }
        .container { max-width:400px; margin:0 auto; padding-bottom:70px; background:#000; color:#fff; min-height:100vh; }
        .header { background:#000; padding:20px 15px 15px; position:sticky; top:0; z-index:100; }
        .header-top { display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; }
        .back-button { color:#aaa; font-size:20px; cursor:pointer; padding:5px; }
        .market-info { display:flex; align-items:center; }
        .market-icon { width:30px; height:30px; border-radius:50%; background:#1E1E1E; margin-right:10px; display:flex; justify-content:center; align-items:center; overflow:hidden; }
        .market-name { font-weight:bold; font-size:18px; margin-right:10px; }
        .market-change { font-size:14px; font-weight:bold; min-height:16px; display:flex; align-items:center; }
        .market-price { font-size:24px; font-weight:bold; margin-bottom:5px; min-height:28px; display:flex; align-items:center; }
        .market-stats { display:flex; justify-content:space-between; font-size:12px; color:#aaa; flex-wrap:wrap; }
        .market-stats span { margin-right:10px; margin-bottom:5px; display:flex; align-items:center; min-height:16px; }
        .remove_blue { text-decoration:none; color:inherit; display:block; }
        .action-buttons { display:flex; gap:10px; margin:auto; }
        .action-button { flex:1; padding:13px; border:none; border-radius:8px; font-size:16px; font-weight:bold; cursor:pointer; text-align:center; text-decoration:none; display:flex; align-items:center; justify-content:center; }
        .buy-button  { background:#00C076; color:#fff; }
        .sell-button { background:#FF6838; color:#fff; }
        .loading-placeholder { background:linear-gradient(90deg,#2A2A2A 25%,#333 50%,#2A2A2A 75%); background-size:200% 100%; animation:loading 1.5s infinite; border-radius:4px; display:inline-block; }
        @keyframes loading { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        .section-title { font-size:16px; font-weight:bold; margin:20px 15px 15px; padding-bottom:10px; border-bottom:1px solid #2A2A2A; }
        .recent-trades { margin:15px; max-height:300px; overflow-y:auto; }
        .trades-header { display:flex; justify-content:space-between; margin-bottom:10px; font-size:12px; color:#777; position:sticky; top:0; background:#000; padding:5px 0; z-index:10; }
        .trade-row { display:flex; justify-content:space-between; padding:8px 0; font-size:13px; border-bottom:1px solid #2A2A2A; align-items:center; min-height:32px; }
        .trade-price { flex:1; }
        .trade-amount { flex:1; text-align:right; }
        .trade-time { flex:1; text-align:right; color:#777; font-size:11px; }
        .buy-trade  .trade-price { color:#00C076; }
        .sell-trade .trade-price { color:#FF6838; }
      `}</style>
    </div>
  );
}

export default React.memo(MarketDetail);
