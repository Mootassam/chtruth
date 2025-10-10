import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import FuturesChart from "../Futures/FuturesChart";

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
  const { id } = useParams<{ id: string }>();

  const [marketPrice, setMarketPrice] = useState<string | null>(null);
  const [priceChangePercent, setPriceChangePercent] = useState<string | null>(null);
  const [highPrice, setHighPrice] = useState<string | null>(null);
  const [lowPrice, setLowPrice] = useState<string | null>(null);
  const [volume, setVolume] = useState<string | null>(null);
  const [recentTrades, setRecentTrades] = useState<BinanceTrade[]>([]);
  const [selectedCoin, setSelectedCoin] = useState(id || "BTCUSDT");
  const [isLoading, setIsLoading] = useState(true);

  const tradeWs = useRef<WebSocket | null>(null);
  const tickerWs = useRef<WebSocket | null>(null);

  // Format number with commas and fixed decimals
  const formatNumber = (num: string, decimals: number = 2) => {
    return Number(num).toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  // Format volume in billions
  const formatVolume = (vol: string) => {
    const volumeNum = Number(vol);
    if (volumeNum >= 1000000000) {
      return (volumeNum / 1000000000).toFixed(2) + "B";
    } else if (volumeNum >= 1000000) {
      return (volumeNum / 1000000).toFixed(2) + "M";
    } else {
      return formatNumber(vol, 0);
    }
  };

  // Fetch initial data via REST API before WebSocket connects
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        const [tickerResponse, tradesResponse] = await Promise.all([
          axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${selectedCoin}`),
          axios.get(`https://api.binance.com/api/v3/trades?symbol=${selectedCoin}&limit=10`)
        ]);
        
        // Set initial data from REST API
        const tickerData = tickerResponse.data;
        setMarketPrice(tickerData.lastPrice);
        setPriceChangePercent(tickerData.priceChangePercent);
        setHighPrice(tickerData.highPrice);
        setLowPrice(tickerData.lowPrice);
        setVolume(tickerData.volume);
        
        // Set initial trades
        setRecentTrades(tradesResponse.data.slice(0, 5));
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, [selectedCoin]);

  // WebSocket connection for ticker data (price, 24h stats)
  useEffect(() => {
    if (!selectedCoin) return;

    const connectTickerWebSocket = () => {
      // Close previous connection if it exists
      if (tickerWs.current) {
        tickerWs.current.close();
      }

      // Connect to ticker stream
      tickerWs.current = new WebSocket(
        `wss://stream.binance.com:9443/ws/${selectedCoin.toLowerCase()}@ticker`
      );

      tickerWs.current.onopen = () => {
      };

      tickerWs.current.onmessage = (event: MessageEvent) => {
        const tickerData: BinanceTicker = JSON.parse(event.data);

        // Update market data
        setMarketPrice(tickerData.c);
        setPriceChangePercent(tickerData.P);
        setHighPrice(tickerData.h);
        setLowPrice(tickerData.l);
        setVolume(tickerData.v);
      };

      tickerWs.current.onerror = (error: Event) => {
        console.error("Ticker WebSocket error:", error);
      };

      tickerWs.current.onclose = (event: CloseEvent) => {

        // Auto-reconnect after a short delay
        setTimeout(() => {
          if (selectedCoin) {
            connectTickerWebSocket();
          }
        }, 2000);
      };
    };

    connectTickerWebSocket();

    return () => {
      if (tickerWs.current && tickerWs.current.readyState === WebSocket.OPEN) {
        tickerWs.current.close();
      }
    };
  }, [selectedCoin]);

  // WebSocket connection for trade data (recent trades)
  useEffect(() => {
    if (!selectedCoin) return;

    const connectTradeWebSocket = () => {
      // Close previous connection if it exists
      if (tradeWs.current) {
        tradeWs.current.close();
      }

      // Connect to trade stream
      tradeWs.current = new WebSocket(
        `wss://stream.binance.com:9443/ws/${selectedCoin.toLowerCase()}@trade`
      );

      tradeWs.current.onopen = () => {
      };

      tradeWs.current.onmessage = (event: MessageEvent) => {
        const tradeData: BinanceTrade = JSON.parse(event.data);

        // Add new trade to recent trades (limit to last 20 trades)
        setRecentTrades((prevTrades) => {
          const newTrades = [tradeData, ...prevTrades.slice(0, 19)];
          return newTrades;
        });
      };

      tradeWs.current.onerror = (error: Event) => {
        console.error("Trade WebSocket error:", error);
      };

      tradeWs.current.onclose = (event: CloseEvent) => {

        // Auto-reconnect after a short delay
        setTimeout(() => {
          if (selectedCoin) {
            connectTradeWebSocket();
          }
        }, 2000);
      };
    };

    connectTradeWebSocket();

    return () => {
      if (tradeWs.current && tradeWs.current.readyState === WebSocket.OPEN) {
        tradeWs.current.close();
      }
    };
  }, [selectedCoin]);

  useEffect(() => {
    if (id) {
      setSelectedCoin(id);
    }

    return () => {
      // Clean up WebSocket connections
      if (tradeWs.current) tradeWs.current.close();
      if (tickerWs.current) tickerWs.current.close();
    };
  }, [id]);

  const goBack = () => {
    history.goBack();
  };

  // Loading placeholder component
  const LoadingPlaceholder = ({ width = "100%", height = "1em" }: { width?: string, height?: string }) => (
    <div 
      className="loading-placeholder" 
      style={{ width, height }}
    />
  );

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
              <img
                src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${
                  selectedCoin.split("USDT")[0]
                }.png`}
                style={{ width: 30, height: 30 }}
                alt={selectedCoin}
                loading="lazy"
              />
            </div>
            <div className="market-name">{selectedCoin}</div>
            <div
              className="market-change"
              style={{
                color: priceChangePercent && priceChangePercent.startsWith("-")
                  ? "#FF6838"
                  : "#00C076",
              }}
            >
              {priceChangePercent !== null ? (
                `${priceChangePercent}%`
              ) : (
                <LoadingPlaceholder width="50px" height="16px" />
              )}
            </div>
          </div>
          <div style={{ width: 20 }} />
        </div>
        <div className="market-price">
          {marketPrice !== null ? (
            `$${formatNumber(marketPrice)}`
          ) : (
            <LoadingPlaceholder width="120px" height="28px" />
          )}
        </div>
        <div className="market-stats">
          <span>
            24h High:{" "}
            {highPrice !== null ? (
              `$${formatNumber(highPrice)}`
            ) : (
              <LoadingPlaceholder width="80px" height="12px" />
            )}
          </span>
          <span>
            24h Vol:{" "}
            {volume !== null ? (
              `${formatVolume(volume)} ${selectedCoin.replace("USDT", "")}`
            ) : (
              <LoadingPlaceholder width="80px" height="12px" />
            )}
          </span>
          <span>
            24h Low:{" "}
            {lowPrice !== null ? (
              `$${formatNumber(lowPrice)}`
            ) : (
              <LoadingPlaceholder width="80px" height="12px" />
            )}
          </span>
        </div>
      </div>

      {/* Trading View Chart */}
      <FuturesChart  symbol={selectedCoin || undefined} />

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="action-button buy-button">BUY</button>
        <button className="action-button sell-button">SELL</button>
      </div>

      {/* Recent Trades */}
      <div className="section-title">Recent Trades (Live)</div>
      <div className="recent-trades">
        <div className="trades-header">
          <span>Price (USDT)</span>
          <span>Amount</span>
          <span>Time</span>
        </div>
        {recentTrades.length > 0 ? (
          recentTrades.map((trade, index) => (
            <div
              key={`${trade.t}-${index}`}
              className={`trade-row ${trade.m ? "sell-trade" : "buy-trade"}`}
            >
              <div className="trade-price">{formatNumber(trade.p)}</div>
              <div className="trade-amount">{Number(trade.q).toFixed(4)}</div>
              <div className="trade-time">
                {new Date(trade.T).toLocaleTimeString()}
              </div>
            </div>
          ))
        ) : (
          // Show loading placeholders for trades
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="trade-row">
              <div className="trade-price">
                <LoadingPlaceholder width="60px" height="14px" />
              </div>
              <div className="trade-amount">
                <LoadingPlaceholder width="50px" height="14px" />
              </div>
              <div className="trade-time">
                <LoadingPlaceholder width="40px" height="14px" />
              </div>
            </div>
          ))
        )}
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .container {
          max-width: 400px;
          margin: 0 auto;
          padding-bottom: 70px;
          background-color: #000000;
          color: #FFFFFF;
          min-height: 100vh;
        }
        
        /* Header Section */
        .header {
          background-color: #000000;
          padding: 20px 15px 15px;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        
        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
        
        .back-button {
          color: #AAAAAA;
          font-size: 20px;
          cursor: pointer;
        }
        
        .market-info {
          display: flex;
          align-items: center;
        }
        
        .market-icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: #F3BA2F;
          margin-right: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .market-icon i {
          color: #000;
        }
        
        .market-name {
          font-weight: bold;
          font-size: 18px;
          margin-right: 10px;
        }
        
        .market-change {
          font-size: 14px;
          font-weight: bold;
          min-height: 16px;
          display: flex;
          align-items: center;
        }
        
        .market-price {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 5px;
          min-height: 28px;
          display: flex;
          align-items: center;
        }
        
        .market-stats {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #AAAAAA;
          flex-wrap: wrap;
        }
        
        .market-stats span {
          margin-right: 10px;
          margin-bottom: 5px;
          display: flex;
          align-items: center;
          min-height: 16px;
        }
        
        /* Loading placeholder animation */
        .loading-placeholder {
          background: linear-gradient(90deg, #2A2A2A 25%, #333 50%, #2A2A2A 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          border-radius: 4px;
          display: inline-block;
        }
        
        @keyframes loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
        
        /* Action Buttons */
        .action-buttons {
          display: flex;
          gap: 15px;
          margin: auto;
        }
        
        .action-button {
          flex: 1;
          padding: 13px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
        }
        
        .buy-button {
          background-color: #00C076;
          color: white;
        }
        
        .sell-button {
          background-color: #FF6838;
          color: white;
        }
        
        /* Recent Trades */
        .recent-trades {
          margin: 15px;
          max-height: 300px;
          overflow-y: auto;
        }
        
        .trades-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 12px;
          color: #777;
          position: sticky;
          top: 0;
          background-color: #000;
          padding: 5px 0;
          z-index: 10;
        }
        
        .trade-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 13px;
          border-bottom: 1px solid #2A2A2A;
          align-items: center;
          min-height: 32px;
        }
        
        .trade-price {
          flex: 1;
        }
        
        .trade-amount {
          flex: 1;
          text-align: right;
        }
        
        .trade-time {
          flex: 1;
          text-align: right;
          color: #777;
          font-size: 11px;
        }
        
        .buy-trade .trade-price {
          color: #00C076;
        }
        
        .sell-trade .trade-price {
          color: #FF6838;
        }
        
        /* Section Titles */
        .section-title {
          font-size: 16px;
          font-weight: bold;
          margin: 20px 15px 15px;
          padding-bottom: 10px;
          border-bottom: 1px solid #2A2A2A;
        }
      `}</style>
    </div>
  );
}

export default MarketDetail;