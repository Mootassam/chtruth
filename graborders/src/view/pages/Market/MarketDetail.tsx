import React, { useState, useEffect, useRef } from "react";
import { useHistory ,useParams} from 'react-router-dom';

// Interface for Binance trade data
interface BinanceTrade {
  e: string; // Event type
  E: number; // Event time
  s: string; // Symbol
  t: number; // Trade ID
  p: string; // Price
  q: string; // Quantity
  T: number; // Trade time
  m: boolean; // Is buyer market maker?
}

// Interface for Binance ticker data
interface BinanceTicker {
  e: string; // Event type
  E: number; // Event time
  s: string; // Symbol
  c: string; // Last price
  o: string; // Open price
  h: string; // High price
  l: string; // Low price
  v: string; // Total traded base asset volume
  q: string; // Total traded quote asset volume
  P: string; // Price change percent
}

function MarketDetail() {
  const history = useHistory();
  const [marketPrice, setMarketPrice] = useState("51825.10");
  const [priceChangePercent, setPriceChangePercent] = useState("2.31");
  const [highPrice, setHighPrice] = useState("52120.40");
  const [lowPrice, setLowPrice] = useState("50920.30");
  const [volume, setVolume] = useState("42.5");
  const [recentTrades, setRecentTrades] = useState<BinanceTrade[]>([]);
    const { id } = useParams<{ id: string }>();

  const tradeWs = useRef<WebSocket | null>(null);
  const tickerWs = useRef<WebSocket | null>(null);

  // WebSocket connection for ticker data (price, 24h stats)
  useEffect(() => {
    // Connect to ticker stream for BTCUSDT
    tickerWs.current = new WebSocket(`wss://stream.binance.com:9443/ws/${id.toLowerCase()}@ticker`);

    tickerWs.current.onopen = () => {
      console.log(`Connected to BTCUSDT ticker stream`);
    };

    tickerWs.current.onmessage = (event: MessageEvent) => {
      const tickerData: BinanceTicker = JSON.parse(event.data);
      
      // Update market data
      setMarketPrice(tickerData.c);
      setPriceChangePercent(tickerData.P);
      setHighPrice(tickerData.h);
      setLowPrice(tickerData.l);
      setVolume(tickerData.v);

      // Log real-time data to console
      console.log('Real-time Ticker Data:', {
        symbol: tickerData.s,
        price: tickerData.c,
        changePercent: tickerData.P + '%',
        high: tickerData.h,
        low: tickerData.l,
        volume: tickerData.v
      });
    };

    tickerWs.current.onerror = (error: Event) => {
      console.error('Ticker WebSocket error:', error);
    };

    return () => {
      if (tickerWs.current && tickerWs.current.readyState === WebSocket.OPEN) {
        tickerWs.current.close();
      }
    };
  }, []);

  // WebSocket connection for trade data (recent trades)
  useEffect(() => {
    // Connect to trade stream for BTCUSDT
    tradeWs.current = new WebSocket(`wss://stream.binance.com:9443/ws/btcusdt@trade`);

    tradeWs.current.onopen = () => {
      console.log(`Connected to BTCUSDT trade stream`);
    };

    tradeWs.current.onmessage = (event: MessageEvent) => {
      const tradeData: BinanceTrade = JSON.parse(event.data);
      
      // Add new trade to recent trades (limit to last 20 trades)
      setRecentTrades(prevTrades => {
        const newTrades = [tradeData, ...prevTrades.slice(0, 19)];
        return newTrades;
      });

      // Log real-time trade to console
      console.log('Real-time Trade:', {
        symbol: tradeData.s,
        price: tradeData.p,
        quantity: tradeData.q,
        time: new Date(tradeData.T).toLocaleTimeString(),
        isBuyerMaker: tradeData.m
      });
    };

    tradeWs.current.onerror = (error: Event) => {
      console.error('Trade WebSocket error:', error);
    };

    return () => {
      if (tradeWs.current && tradeWs.current.readyState === WebSocket.OPEN) {
        tradeWs.current.close();
      }
    };
  }, []);

  const goBack = () => {
    history.goBack();
  };

  // Format number with commas and fixed decimals
  const formatNumber = (num: string, decimals: number = 2) => {
    return Number(num).toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  };

  // Format volume in billions
  const formatVolume = (vol: string) => {
    const volumeNum = Number(vol);
    if (volumeNum >= 1000000000) {
      return (volumeNum / 1000000000).toFixed(2) + 'B';
    } else if (volumeNum >= 1000000) {
      return (volumeNum / 1000000).toFixed(2) + 'M';
    } else {
      return formatNumber(vol, 0);
    }
  };

  return (
    <div className="container">
      {/* Header Section */}
      <div className="header">
        <div className="header-top">
          <div className="back-button" onClick={() => goBack()}>
            <i className="fas fa-arrow-left" />
          </div>
          <div className="market-info">
            <div className="market-icon">
              <i className="fab fa-btc" />
            </div>
            <div className="market-name">BTC/USDT</div>
            <div className="market-change" style={{ 
              color: priceChangePercent.startsWith('-') ? '#FF6838' : '#00C076' 
            }}>
              {priceChangePercent}%
            </div>
          </div>
          <div style={{ width: 20 }} />
        </div>
        <div className="market-price">${formatNumber(marketPrice)}</div>
        <div className="market-stats">
          <span>24h High: ${formatNumber(highPrice)}</span>
          <span>24h Vol: {formatVolume(volume)} USDT</span>
          <span>24h Low: ${formatNumber(lowPrice)}</span>
        </div>
      </div>

      {/* Trading View Chart */}
      <div className="chart-container">
        <div className="chart-placeholder">
          <i className="fas fa-chart-line" />
          <span>Live BTC/USDT Chart</span>
          <small>Real-time data from Binance</small>
        </div>
        <div className="chart-controls">
          <select className="chart-timeframe">
            <option>1h</option>
            <option>4h</option>
            <option>1d</option>
            <option>1w</option>
          </select>
        </div>
      </div>

      
      {/* Recent Trades */}
      <div className="section-title">Recent Trades (Live)</div>
      <div className="recent-trades">
        <div className="trades-header">
          <span>Price (USDT)</span>
          <span>Amount (BTC)</span>
          <span>Time</span>
        </div>
        {recentTrades.map((trade, index) => (
          <div 
            key={`${trade.t}-${index}`} 
            className={`trade-row ${trade.m ? 'sell-trade' : 'buy-trade'}`}
          >
            <div className="trade-price">{formatNumber(trade.p)}</div>
            <div className="trade-amount">{Number(trade.q).toFixed(4)}</div>
            <div className="trade-time">
              {new Date(trade.T).toLocaleTimeString()}
            </div>
          </div>
        ))}
        {recentTrades.length === 0 && (
          <>
            <div className="trade-row buy-trade">
              <div className="trade-price">51,825.50</div>
              <div className="trade-amount">0.124</div>
              <div className="trade-time">12:45:23</div>
            </div>
            <div className="trade-row buy-trade">
              <div className="trade-price">51,825.20</div>
              <div className="trade-amount">0.543</div>
              <div className="trade-time">12:45:21</div>
            </div>
            <div className="trade-row sell-trade">
              <div className="trade-price">51,824.80</div>
              <div className="trade-amount">1.234</div>
              <div className="trade-time">12:45:18</div>
            </div>
          </>
        )}
      </div>
      
      {/* Buy/Sell Buttons */}
      <div className="action-buttons">
        <button className="action-button buy-button">BUY</button>
        <button className="action-button sell-button">SELL</button>
      </div>
    </div>
  );
}

export default MarketDetail;