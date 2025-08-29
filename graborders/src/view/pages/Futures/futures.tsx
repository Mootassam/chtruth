import React, { useState, useEffect, useRef } from "react";
import CoinListModal from "src/shared/modal/CoinListModal";
import FuturesModal from "src/shared/modal/FuturesModal";

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

function Futures() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tradeDirection, setTradeDirection] = useState(null);
  const [isCoinModalOpen, setIsCoinModalOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState("ETHFIUSDT");
  const [marketPrice, setMarketPrice] = useState("0");
  const [priceChangePercent, setPriceChangePercent] = useState("0");
  const [highPrice, setHighPrice] = useState("0");
  const [lowPrice, setLowPrice] = useState("0");
  const [volume, setVolume] = useState("0");
  const [recentTrades, setRecentTrades] = useState<BinanceTrade[]>([]);
  
  const tradeWs = useRef<WebSocket | null>(null);
  const tickerWs = useRef<WebSocket | null>(null);

  // WebSocket connection for ticker data (price, 24h stats)
  useEffect(() => {
    if (!selectedCoin) return;

    // Close previous connection if it exists
    if (tickerWs.current) {
      tickerWs.current.close();
    }

    // Connect to ticker stream
    tickerWs.current = new WebSocket(`wss://stream.binance.com:9443/ws/${selectedCoin.toLowerCase()}@ticker`);

    tickerWs.current.onopen = () => {
      console.log(`Connected to ${selectedCoin} ticker stream`);
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
  }, [selectedCoin]);

  // WebSocket connection for trade data (recent trades)
  useEffect(() => {
    if (!selectedCoin) return;

    // Close previous connection if it exists
    if (tradeWs.current) {
      tradeWs.current.close();
    }

    // Connect to trade stream
    tradeWs.current = new WebSocket(`wss://stream.binance.com:9443/ws/${selectedCoin.toLowerCase()}@trade`);

    tradeWs.current.onopen = () => {
      console.log(`Connected to ${selectedCoin} trade stream`);
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
  }, [selectedCoin]);

  const handleOpenCoinModal = () => {
    setIsCoinModalOpen(true);
  };

  const handleCloseCoinModal = () => {
    setIsCoinModalOpen(false);
  };

  const handleSelectCoin = (coin: string) => {
    setSelectedCoin(coin);
    setIsCoinModalOpen(false);
    // Reset recent trades when coin changes
    setRecentTrades([]);
  };

  const handleOpenModal = (direction: string) => {
    setTradeDirection(direction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTradeDirection(null);
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
          <div className="market-info">
            <div className="market-icon">
              <i className="fab fa-btc" />
            </div>
            <div className="market-name">{selectedCoin}</div>
            <div className="market-change" style={{ 
              color: priceChangePercent.startsWith('-') ? '#FF6838' : '#00C076' 
            }}>
              {priceChangePercent}%
            </div>
          </div>
          <div className="additional-actions" onClick={handleOpenCoinModal}>
            <i className="fas fa-filter" />
          </div>
        </div>
        <div className="market-price">${formatNumber(marketPrice)}</div>
        <div className="market-stats">
          <span>24h High: ${formatNumber(highPrice)}</span>
          <span>24h Vol: {formatVolume(volume)} {selectedCoin.replace('USDT', '')}</span>
          <span>24h Low: ${formatNumber(lowPrice)}</span>
        </div>
      </div>

      {/* Trading View Chart */}
      <div className="chart-container">
        <div className="chart-placeholder">
          <i className="fas fa-chart-line" />
          <span>Live {selectedCoin} Chart</span>
          <small>Real-time data from Binance</small>
        </div>
        <div className="chart-controls">
          <select className="chart-timeframe">
            <option>1m</option>
            <option>5m</option>
            <option>1h</option>
            <option>4h</option>
            <option>1d</option>
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="future-action-buttons">
        <button
          className="action-button buy-button"
          onClick={() => handleOpenModal("up")}
        >
          BUY UP
        </button>
        <button
          className="action-button sell-button"
          onClick={() => handleOpenModal("down")}
        >
          BUY DOWN
        </button>
      </div>

      {/* Recent Trades */}
      <div className="section-title">Recent Trades (Live)</div>
      <div className="recent-trades">
        <div className="trades-header">
          <span>Price (USDT)</span>
          <span>Amount</span>
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
          <div className="trade-row">
            <div className="trade-price" style={{ textAlign: 'center', width: '100%' }}>
              Waiting for trades...
            </div>
          </div>
        )}
      </div>

      {/* Futures Modal */}
      <FuturesModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        direction={tradeDirection}
        currentPrice={marketPrice}
        symbol={selectedCoin}
      />

      <CoinListModal
        isOpen={isCoinModalOpen}
        onClose={handleCloseCoinModal}
        onSelectCoin={handleSelectCoin}
        currentCoin={selectedCoin}
      />

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
        
        .coin-list-button {
          color: #F3BA2F;
          font-size: 20px;
          cursor: pointer;
        }
        
        .additional-actions {
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
        }
        
        .market-price {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 5px;
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
        }
        
        /* Trading View Chart */
        .chart-container {
          height: 280px;
          background-color: #1A1A1A;
          margin: 15px;
          border-radius: 12px;
          position: relative;
          overflow: hidden;
        }
        
        .chart-placeholder {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
          color: #777;
          text-align: center;
        }
        
        .chart-placeholder i {
          font-size: 50px;
          margin-bottom: 15px;
        }
        
        .chart-placeholder small {
          margin-top: 5px;
          font-size: 12px;
        }
        
        .chart-controls {
          position: absolute;
          bottom: 10px;
          right: 10px;
          display: flex;
          gap: 5px;
        }
        
        .chart-timeframe {
          background-color: #2A2A2A;
          color: #AAAAAA;
          border: none;
          border-radius: 4px;
          padding: 4px 8px;
          font-size: 12px;
        }
        
        /* Action Buttons */
        .future-action-buttons {
          display: flex;
          gap: 15px;
          margin: 15px;
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

export default Futures;