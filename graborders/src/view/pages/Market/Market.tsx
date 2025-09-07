import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import ReactDOM from "react-dom";
import {Link} from 'react-router-dom'
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
  p: string; // Price change
}

// Interface for cryptocurrency data
interface CryptoData {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changePercent: string;
  volume: string;
  volumeFormatted: string;
  isPositive: boolean;
  lastUpdated?: number;
}

// Cache key for local storage
const CRYPTO_CACHE_KEY = 'crypto_market_data_cache';
const CACHE_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds

// Predefined popular symbols
const POPULAR_SYMBOLS = [
  'BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'ADAUSDT', 'XRPUSDT', 
  'SOLUSDT', 'DOTUSDT', 'DOGEUSDT', 'AVAXUSDT', 'MATICUSDT',
  'LTCUSDT', 'LINKUSDT', 'ATOMUSDT', 'UNIUSDT', 'XLMUSDT'
];

// Market Modal Component
interface FuturesModalProps {
  isOpen: boolean;
  onClose: () => void;
  direction: "up" | "down" | null;
  selectedCrypto: CryptoData | null;
}

const FuturesModal: React.FC<FuturesModalProps> = ({ isOpen, onClose, direction, selectedCrypto }) => {
  const [selectedDuration, setSelectedDuration] = useState<string>("120");
  const [selectedLeverage, setSelectedLeverage] = useState<string>("2");
  const [orderAmount, setOrderAmount] = useState<number>(1);
  const [tradeStatus, setTradeStatus] = useState<'configuring' | 'in-progress' | 'completed'>('configuring');
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [tradeResult, setTradeResult] = useState<'win' | 'loss' | null>(null);
  const [currentPrice, setCurrentPrice] = useState<string>(selectedCrypto?.price || "0");

  useEffect(() => {
    if (isOpen && selectedCrypto) {
      setCurrentPrice(selectedCrypto.price);
    }
  }, [isOpen, selectedCrypto]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (tradeStatus === 'in-progress' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (tradeStatus === 'in-progress' && timeLeft === 0) {
      completeTrade();
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [tradeStatus, timeLeft]);

  const startTrade = () => {
    if (!direction || !selectedCrypto) return;
    
    setTradeStatus('in-progress');
    setTimeLeft(parseInt(selectedDuration));
  };

  const completeTrade = () => {
    // Randomly determine win/loss for demonstration
    const isWin = Math.random() > 0.5;
    setTradeResult(isWin ? 'win' : 'loss');
    setTradeStatus('completed');
  };

  const resetTrade = () => {
    setTradeStatus('configuring');
    setTradeResult(null);
    setTimeLeft(0);
    if (selectedCrypto) {
      setCurrentPrice(selectedCrypto.price);
    }
  };

  const calculateProfit = (amount: number, leverage: string, duration: string): number => {
    return (amount * parseInt(leverage) * parseInt(duration)) / 10000;
  };

  const calculateProgress = (): number => {
    if (tradeStatus !== 'in-progress') return 0;
    const total = parseInt(selectedDuration);
    return ((total - timeLeft) / total) * 100;
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen || !selectedCrypto) return null;

  const baseSymbol = selectedCrypto.symbol.replace("USDT", "");


  
};

// Main Market Component
const Market: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<{ [key: string]: CryptoData }>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDirection, setSelectedDirection] = useState<"up" | "down" | null>(null);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoData | null>(null);
  const ws = useRef<WebSocket | null>(null);
  
  // Fetch market data
  useEffect(() => {
    const fetchAllPrices = async () => {
      try {
        setIsLoading(true);
        
        const response = await fetch('https://api.binance.com/api/v3/ticker/24hr');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        
        // Process only USDT pairs to reduce data size
        const usdtPairs = data.filter(item => 
          item.symbol.endsWith('USDT') && 
          !item.symbol.includes('UP') && 
          !item.symbol.includes('DOWN') &&
          !item.symbol.includes('BEAR') && 
          !item.symbol.includes('BULL')
        );
        
        // Sort by volume to get most important pairs
        usdtPairs.sort((a, b) => parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume));
        
        // Take top 100 pairs by volume
        const topPairs = usdtPairs.slice(0, 100);
        
        const formattedData: { [key: string]: CryptoData } = {};
        
        topPairs.forEach(item => {
          const symbol = item.symbol;
          const baseSymbol = symbol.replace("USDT", "");
          const isPositive = !item.priceChangePercent.startsWith("-");
          const changePercent = Math.abs(Number(item.priceChangePercent)).toFixed(2);
          
          // Format volume
          const volumeNum = Number(item.volume);
          let volumeFormatted = volumeNum.toFixed(0);
          if (volumeNum >= 1000000000) {
            volumeFormatted = (volumeNum / 1000000000).toFixed(1) + "B";
          } else if (volumeNum >= 1000000) {
            volumeFormatted = (volumeNum / 1000000000).toFixed(1) + "M";
          }
          
          formattedData[symbol] = {
            symbol,
            name: `${baseSymbol}/USDT`,
            price: Number(item.lastPrice).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: Number(item.lastPrice) < 1 ? 6 : 4,
            }),
            change: item.priceChange,
            changePercent: changePercent,
            volume: item.volume,
            volumeFormatted: volumeFormatted,
            isPositive: isPositive,
            lastUpdated: Date.now()
          };
        });
        
        setCryptoData(formattedData);
        setIsLoading(false);
        
      } catch (error) {
        console.error("Error fetching market data:", error);
        setIsLoading(false);
      }
    };
    
    fetchAllPrices();
  }, []);

  // Filter and sort cryptocurrencies
  const filteredCrypto = useMemo(() => {
    const cryptoArray = Object.values(cryptoData);
    
    if (cryptoArray.length === 0) return [];

    let filtered = cryptoArray;

    // Apply search filter
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      filtered = filtered.filter(crypto => 
        crypto.name.toLowerCase().includes(searchTermLower) ||
        crypto.symbol.toLowerCase().includes(searchTermLower)
      );
    }

    // Apply tab filters
    switch (activeTab) {
      case "Gainers":
        return filtered
          .filter((crypto) => crypto.isPositive)
          .sort((a, b) => Number(b.changePercent) - Number(a.changePercent));
      case "Losers":
        return filtered
          .filter((crypto) => !crypto.isPositive)
          .sort((a, b) => Number(a.changePercent) - Number(b.changePercent));
      case "Favorites":
        return filtered.filter((crypto) =>
          ["BTCUSDT", "ETHUSDT", "BNBUSDT"].includes(crypto.symbol)
        ).sort((a, b) => Number(b.volume) - Number(a.volume));
      default:
        return filtered.sort((a, b) => Number(b.volume) - Number(a.volume));
    }
  }, [cryptoData, searchTerm, activeTab]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const openModal = (crypto: CryptoData, direction: "up" | "down") => {
    setSelectedCrypto(crypto);
    setSelectedDirection(direction);
    setIsModalOpen(true);
  };

  return (
    <div className="container">
      {/* Header Section */}
      <div className="market-headers">
        <div className="market-page-title">USDT MARKET</div>
        {/* Search Bar */}
        <div className="search-bar">
          <i className="fas fa-search" style={{ color: "#AAAAAA" }} />
          <input
            type="text"
            placeholder="Search crypto"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <button 
              className="clear-search" 
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Market Tabs */}
      <div className="market-tabs">
        {["All", "Gainers", "Losers", "Favorites"].map((tab) => (
          <div
            key={tab}
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </div>
        ))}
      </div>
      
      <div className="market-list">
        {isLoading && Object.keys(cryptoData).length === 0 ? (
          <div className="market-placeholder">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="market-item-placeholder">
                <div className="crypto-info-placeholder">
                  <div className="crypto-icon-placeholder shimmer"></div>
                  <div className="crypto-details-placeholder">
                    <div className="placeholder-line shimmer" style={{width: '60%', height: '16px', marginBottom: '8px'}}></div>
                    <div className="placeholder-line shimmer" style={{width: '40%', height: '12px'}}></div>
                  </div>
                </div>
                <div className="price-info-placeholder">
                  <div className="placeholder-line shimmer" style={{width: '70px', height: '16px', marginBottom: '8px'}}></div>
                  <div className="placeholder-line shimmer" style={{width: '50px', height: '12px'}}></div>
                </div>
                <div className="chart-placeholder shimmer"></div>
              </div>
            ))}
          </div>
        ) : filteredCrypto.length > 0 ? (
          <>
            {filteredCrypto.map((crypto) => (
               <Link
        to={`/market/detail/${crypto.symbol}`}
        className="remove_blue"
      >
              <div key={crypto.symbol} className="market-item">
                <div className="crypto-info">
                  <div className="crypto-icon">
                    <img
                      src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${
                        crypto.name.split("/")[0]
                      }.png`}
                      style={{ width: 40, height: 40 }}
                      alt={crypto.name.split("/")[0]}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://via.placeholder.com/40/3a3a3a/ffffff?text=${crypto.name.split("/")[0].charAt(0)}`;
                      }}
                    />
                  </div>
                  <div>
                    <div className="crypto-name">{crypto.name}</div>
                    <div className="crypto-volume">
                      Vol: {crypto.volumeFormatted}
                    </div>
                  </div>
                </div>
                <div className="price-info">
                  <div className="price">${crypto.price}</div>
                  <div
                    className={`change ${
                      crypto.isPositive ? "positive" : "negative"
                    }`}
                  >
                    {crypto.isPositive ? "+" : ""}
                    {crypto.changePercent}%
                  </div>
                </div>
            
              </div>
              </Link>
            ))}
          </>
        ) : (
          <div className="no-results">
            <i
              className="fas fa-search"
              style={{ fontSize: "24px", marginBottom: "10px" }}
            />
            <div>No cryptocurrencies found</div>
          </div>
        )}
      </div>

      <FuturesModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        direction={selectedDirection}
        selectedCrypto={selectedCrypto}
      />

      <style>{`
        /* Shimmer animation for loading placeholders */
        @keyframes shimmer {
          0% {
            background-position: -468px 0;
          }
          100% {
            background-position: 468px 0;
          }
        }
        
        .shimmer {
          animation-duration: 1.5s;
          animation-fill-mode: forwards;
          animation-iteration-count: infinite;
          animation-name: shimmer;
          animation-timing-function: linear;
          background: #2A2A2A;
          background: linear-gradient(to right, #2A2A2A 8%, #333333 18%, #2A2A2A 33%);
          background-size: 800px 104px;
          position: relative;
          border-radius: 4px;
        }
        
        .market-placeholder {
        }
        
        .market-item-placeholder {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 0;
          border-bottom: 1px solid #2A2A2A;
        }
        
        .crypto-info-placeholder {
          display: flex;
          align-items: center;
          flex: 1;
        }
        
        .crypto-icon-placeholder {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 12px;
        }
        
        .crypto-details-placeholder {
          flex: 1;
        }
        
        .price-info-placeholder {
          text-align: right;
          margin-right: 15px;
          flex: 1;
        }
        
        .chart-placeholder {
          width: 18px;
          height: 18px;
          border-radius: 4px;
        }
        
        .placeholder-line {
          border-radius: 4px;
          margin-bottom: 8px;
        }
        
        .container {
          max-width: 400px;
          margin: 0 auto;
          padding: 20px 15px;
          background-color: #000000;
          color: #FFFFFF;
          min-height: 100vh;
        }
        
        .market-headers {
          margin-bottom: 20px;
        }
        
        .market-page-title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 15px;
        }
        
        .search-bar {
          display: flex;
          align-items: center;
          background-color: #1A1A1A;
          border-radius: 8px;
          padding: 10px 15px;
          position: relative;
        }
        
        .search-bar i {
          margin-right: 10px;
        }
        
        .search-bar input {
          background: none;
          border: none;
          color: #FFFFFF;
          width: 100%;
          outline: none;
        }
        
        .clear-search {
          background: none;
          border: none;
          color: #AAAAAA;
          font-size: 18px;
          cursor: pointer;
          position: absolute;
          right: 10px;
        }
        
        .market-tabs {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          border-bottom: 1px solid #2A2A2A;
        }
        
        .tab {
          padding: 10px 0;
          cursor: pointer;
          color: #AAAAAA;
          position: relative;
          font-size: 14px;
        }
        
        .tab.active {
          color: #FFFFFF;
          font-weight: bold;
        }
        
        .tab.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background-color: #F3BA2F;
        }
        
        .market-list {
          // max-height: calc(100vh - 200px);
          overflow-y: auto;
          margin-bottom: 40px;
        }
        
        .market-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 0;
          border-bottom: 1px solid #2A2A2A;
        }
        
        .crypto-info {
          display: flex;
          align-items: center;
          flex: 1;
        }
        
        .crypto-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 12px;
          font-size: 18px;
          overflow: hidden;
        }
        
        .crypto-name {
          font-weight: bold;
          margin-bottom: 4px;
          font-size: 14px;
        }
        
        .crypto-volume {
          font-size: 12px;
          color: #AAAAAA;
        }
        
        .price-info {
          text-align: right;
          margin-right: 15px;
          flex: 1;
        }
        
        .price {
          font-weight: bold;
          margin-bottom: 4px;
          font-size: 14px;
        }
        
        .change {
          font-size: 12px;
        }
        
        .change.positive {
          color: #00C076;
        }
        
        .change.negative {
          color: #FF6838;
        }
        
        .trade-actions {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        
        .trade-btn {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
        }
        
        .trade-btn.up {
          background-color: rgba(0, 192, 118, 0.2);
          color: #00C076;
        }
        
        .trade-btn.down {
          background-color: rgba(255, 104, 56, 0.2);
          color: #FF6838;
        }
        
        .no-results {
          text-align: center;
          padding: 40px 0;
          color: #777;
        }
        
        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 20px;
        }
        
        .modal-container {
          background-color: #1a1a1a;
          border-radius: 12px;
          width: 100%;
          max-width: 400px;
          max-height: 90vh;
          overflow-y: auto;
          color: white;
        }
        
        .up-theme {
          border-top: 3px solid #00C076;
        }
        
        .down-theme {
          border-top: 3px solid #FF6838;
        }
        
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          border-bottom: 1px solid #2a2a2a;
        }
        
        .pair-info {
          display: flex;
          align-items: center;
        }
        
        .pair-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #2a2a2a;
        }
        
        .pair-icon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .pair-details {
          flex: 1;
        }
        
        .pair-name {
          font-weight: bold;
          margin-bottom: 4px;
        }
        
        .current-price {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 4px;
        }
        
        .price-change {
          font-size: 14px;
        }
        
        .price-change.positive {
          color: #00C076;
        }
        
        .price-change.negative {
          color: #FF6838;
        }
        
        .close-btn {
          background: none;
          border: none;
          color: #aaa;
          font-size: 18px;
          cursor: pointer;
        }
        
        .direction-indicator {
          padding: 15px;
          text-align: center;
          font-weight: bold;
          font-size: 16px;
        }
        
        .up-indicator {
          color: #00C076;
          background-color: rgba(0, 192, 118, 0.1);
        }
        
        .down-indicator {
          color: #FF6838;
          background-color: rgba(255, 104, 56, 0.1);
        }
        
        .modal-content {
          padding: 15px;
        }
        
        .section {
          margin-bottom: 20px;
        }
        
        .section-title {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 14px;
          color: #aaa;
        }
        
        .options-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .option-btn {
          background-color: #2a2a2a;
          border: none;
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s;
        }
        
        .option-btn.selected {
          background-color: #3a3a3a;
          font-weight: bold;
        }
        
        .option-btn:hover {
          background-color: #3a3a3a;
        }
        
        .amount-control {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
        }
        
        .amount-btn {
          background-color: #2a2a2a;
          border: none;
          color: white;
          width: 36px;
          height: 36px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 18px;
        }
        
        .amount-input {
          background-color: #2a2a2a;
          border: none;
          color: white;
          text-align: center;
          width: 60px;
          height: 36px;
          margin: 0 8px;
          border-radius: 6px;
        }
        
        .balance-info {
          font-size: 12px;
          color: #aaa;
        }
        
        .profit-info {
          text-align: center;
          margin: 20px 0;
          font-size: 16px;
          font-weight: bold;
        }
        
        .confirm-btn {
          background-color: #F3BA2F;
          color: black;
          border: none;
          width: 100%;
          padding: 15px;
          border-radius: 6px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .confirm-btn:hover:not(:disabled) {
          background-color: #e0a91a;
        }
        
        .confirm-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .trade-progress-section {
          padding: 20px;
          text-align: center;
        }
        
        .progress-container {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }
        
        .circular-progress {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .progress-inner {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background-color: #1a1a1a;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        
        .progress-time {
          font-size: 20px;
          font-weight: bold;
        }
        
        .progress-label {
          font-size: 12px;
          color: #aaa;
        }
        
        .current-price-display {
          margin-bottom: 15px;
          font-size: 16px;
        }
        
        .trade-result {
          padding: 12px;
          border-radius: 6px;
          margin-bottom: 20px;
          font-weight: bold;
        }
        
        .trade-result.win {
          background-color: rgba(0, 192, 118, 0.1);
          color: #00C076;
        }
        
        .trade-result.loss {
          background-color: rgba(255, 104, 56, 0.1);
          color: #FF6838;
        }
        
        .trade-actions {
          display: flex;
          gap: 10px;
        }
        
        .trade-action-btn {
          flex: 1;
          padding: 12px;
          border-radius: 6px;
          font-weight: bold;
          cursor: pointer;
          border: none;
        }
        
        .trade-action-btn.primary {
          background-color: #F3BA2F;
          color: black;
        }
        
        .trade-action-btn.secondary {
          background-color: #2a2a2a;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default Market;