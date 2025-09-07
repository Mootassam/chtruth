import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

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

interface FuturesModalProps {
  isOpen: boolean;
  onClose: () => void;
  direction: "up" | "down" | null;
  selectedCrypto?: CryptoData | null;
  cryptoData: { [key: string]: CryptoData };
}

const FuturesModal: React.FC<FuturesModalProps> = ({ 
  isOpen, 
  onClose, 
  direction, 
  selectedCrypto,
  cryptoData 
}) => {
  const [selectedDuration, setSelectedDuration] = useState<string>("120");
  const [selectedLeverage, setSelectedLeverage] = useState<string>("2");
  const [orderAmount, setOrderAmount] = useState<number>(1);
  const [tradeStatus, setTradeStatus] = useState<'configuring' | 'in-progress' | 'completed'>('configuring');
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [tradeResult, setTradeResult] = useState<'win' | 'loss' | null>(null);
  const [currentPrice, setCurrentPrice] = useState<string>(selectedCrypto?.price || "0");
  const [availableCryptos, setAvailableCryptos] = useState<CryptoData[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState<string>(selectedCrypto?.symbol || "BTCUSDT");

  // Update current price when selected crypto changes
  useEffect(() => {
    if (selectedCrypto) {
      setCurrentPrice(selectedCrypto.price);
      setSelectedSymbol(selectedCrypto.symbol);
    }
  }, [selectedCrypto]);

  // Update available cryptos from cryptoData
  useEffect(() => {
    if (cryptoData && Object.keys(cryptoData).length > 0) {
      setAvailableCryptos(Object.values(cryptoData).sort((a, b) => 
        Number(b.volume) - Number(a.volume)
      ));
      
      // Update current price in real-time
      if (cryptoData[selectedSymbol]) {
        setCurrentPrice(cryptoData[selectedSymbol].price);
      }
    }
  }, [cryptoData, selectedSymbol]);

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
    if (!direction) return;
    
    setTradeStatus('in-progress');
    setTimeLeft(parseInt(selectedDuration));
  };

  const completeTrade = () => {
    // Simulate price movement based on direction
    const currentPriceNum = parseFloat(currentPrice.replace(/,/g, ''));
    const volatility = 0.02; // 2% volatility
    const randomChange = (Math.random() * volatility) - (volatility / 2);
    
    // Direction bias
    const directionBias = direction === 'up' ? 0.01 : -0.01;
    const totalChange = randomChange + directionBias;
    
    const newPrice = currentPriceNum * (1 + totalChange);
    
    // Determine if the trade was successful
    const isWin = (direction === 'up' && newPrice > currentPriceNum) || 
                 (direction === 'down' && newPrice < currentPriceNum);
    
    setTradeResult(isWin ? 'win' : 'loss');
    setTradeStatus('completed');
    
    // Update the current price to show the result
    setCurrentPrice(newPrice.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: newPrice < 1 ? 6 : 4,
    }));
  };

  const resetTrade = () => {
    setTradeStatus('configuring');
    setTradeResult(null);
    setTimeLeft(0);
    
    // Reset to the actual current price
    if (cryptoData[selectedSymbol]) {
      setCurrentPrice(cryptoData[selectedSymbol].price);
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

  const handleCryptoChange = (symbol: string) => {
    setSelectedSymbol(symbol);
    if (cryptoData[symbol]) {
      setCurrentPrice(cryptoData[symbol].price);
    }
    resetTrade();
  };

  if (!isOpen) return null;

  const baseSymbol = selectedSymbol.replace("USDT", "");
  const currentCrypto = cryptoData[selectedSymbol] || {
    symbol: selectedSymbol,
    name: `${baseSymbol}/USDT`,
    price: currentPrice,
    change: "0",
    changePercent: "0",
    volume: "0",
    volumeFormatted: "0",
    isPositive: true,
  };

  const modalContent = (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className={`modal-container ${direction === 'up' ? 'up-theme' : 'down-theme'}`} 
        onClick={e => e.stopPropagation()}
      >
        {/* Header Section */}
        <div className="modal-header">
          <div className="pair-selector">
            <select 
              value={selectedSymbol} 
              onChange={(e) => handleCryptoChange(e.target.value)}
              className="crypto-select"
            >
              {availableCryptos.map(crypto => (
                <option key={crypto.symbol} value={crypto.symbol}>
                  {crypto.name}
                </option>
              ))}
            </select>
          </div>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="pair-info">
          <div className="pair-icon">
            <img
              src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${baseSymbol}.png`}
              alt={baseSymbol}
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://via.placeholder.com/40/3a3a3a/ffffff?text=${baseSymbol.charAt(0)}`;
              }}
            />
          </div>
          <div className="pair-details">
            <div className="pair-name">{currentCrypto.name}</div>
            <div className="current-price">${currentPrice}</div>
            <div className={`price-change ${currentCrypto.isPositive ? 'positive' : 'negative'}`}>
              {currentCrypto.isPositive ? '+' : ''}{currentCrypto.changePercent}%
            </div>
          </div>
        </div>
        
        {/* Trade in progress display */}
        {tradeStatus !== 'configuring' && (
          <div className="trade-progress-section">
            <div className="progress-container">
              <div className="circular-progress" style={{ 
                background: `conic-gradient(${direction === 'up' ? '#00C076' : '#FF6838'} ${calculateProgress()}%, #3a3a3a ${calculateProgress()}%)` 
              }}>
                <div className="progress-inner">
                  <div className="progress-time">{formatTime(timeLeft)}</div>
                  <div className="progress-label">Remaining</div>
                </div>
              </div>
            </div>
            
            <div className="current-price-display">
              Current Price: ${currentPrice}
            </div>
            
            {tradeStatus === 'completed' && tradeResult && (
              <div className={`trade-result ${tradeResult}`}>
                {tradeResult === 'win' 
                  ? `Trade Successful! +${calculateProfit(orderAmount, selectedLeverage, selectedDuration).toFixed(2)} USDT`
                  : `Trade Failed! -${orderAmount} USDT`
                }
              </div>
            )}
            
            <div className="trade-actions">
              {tradeStatus === 'completed' ? (
                <>
                  <button className="trade-action-btn secondary" onClick={onClose}>
                    Close
                  </button>
                  <button className="trade-action-btn primary" onClick={resetTrade}>
                    New Trade
                  </button>
                </>
              ) : (
                <button className="trade-action-btn secondary" onClick={onClose}>
                  Cancel Trade
                </button>
              )}
            </div>
          </div>
        )}
        
        {/* Configuration form (only shown when configuring) */}
        {tradeStatus === 'configuring' && (
          <>
            {/* Direction Indicator */}
            <div className={`direction-indicator ${direction}-indicator`}>
              {direction === 'up' ? 'Predicting price will go UP' : 'Predicting price will go DOWN'}
            </div>
            
            {/* Modal Content */}
            <div className="modal-content">
              {/* Trade Duration Section */}
              <div className="section">
                <div className="section-title">
                  <span>Trade Duration</span>
                  <span>Payout</span>
                </div>
                <div className="options-container">
                  {[
                    { duration: "120", payout: "20" },
                    { duration: "180", payout: "30" },
                    { duration: "240", payout: "35" },
                    { duration: "300", payout: "60" }
                  ].map(option => (
                    <button 
                      key={option.duration}
                      className={`option-btn ${selectedDuration === option.duration ? 'selected' : ''}`}
                      onClick={() => setSelectedDuration(option.duration)}
                    >
                      {option.duration}s ({option.payout}%)
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Leverage Section */}
              <div className="section">
                <div className="section-title">
                  <span>Leverage</span>
                </div>
                <div className="options-container">
                  {["2", "5", "10", "20", "50"].map(leverage => (
                    <button 
                      key={leverage}
                      className={`option-btn ${selectedLeverage === leverage ? 'selected' : ''}`}
                      onClick={() => setSelectedLeverage(leverage)}
                    >
                      {leverage}×
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Order Amount Section */}
              <div className="section">
                <div className="section-title">
                  <span>Order Amount (USDT)</span>
                </div>
                <div className="amount-control">
                  <button 
                    className="amount-btn" 
                    onClick={() => setOrderAmount(prev => Math.max(1, prev - 1))}
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    className="amount-input" 
                    value={orderAmount} 
                    onChange={(e) => setOrderAmount(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                  />
                  <button 
                    className="amount-btn" 
                    onClick={() => setOrderAmount(prev => prev + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="balance-info">
                  Available: 3419.19520000 USDT
                </div>
              </div>
              
              {/* Projected Profit */}
              <div className="profit-info">
                Projected Profit: {calculateProfit(orderAmount, selectedLeverage, selectedDuration).toFixed(2)} USDT
              </div>
              
              {/* Confirm Button */}
              <button 
                className="confirm-btn"
                onClick={startTrade}
                disabled={!direction}
              >
                CONFIRM ORDER
              </button>
            </div>
          </>
        )}
        
        <style jsx>{`
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
            position: relative;
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
          
          .pair-selector {
            flex: 1;
          }
          
          .crypto-select {
            background-color: #2a2a2a;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 6px;
            width: 100%;
          }
          
          .close-btn {
            background: none;
            border: none;
            color: #aaa;
            font-size: 18px;
            cursor: pointer;
            margin-left: 10px;
          }
          
          .pair-info {
            display: flex;
            align-items: center;
            padding: 15px;
            border-bottom: 1px solid #2a2a2a;
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
    </div>
  );
  
  return ReactDOM.createPortal(modalContent, document.body);
};

export default FuturesModal;