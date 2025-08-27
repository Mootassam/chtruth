import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface FuturesModalProps {
  isOpen: boolean;
  onClose: () => void;
  direction: "up" | "down" | null;
}

const FuturesModal: React.FC<FuturesModalProps> = ({ isOpen, onClose, direction }) => {
  const [selectedDuration, setSelectedDuration] = useState<string>("120");
  const [selectedLeverage, setSelectedLeverage] = useState<string>("2");
  const [orderAmount, setOrderAmount] = useState<number>(1);
  const [tradeStatus, setTradeStatus] = useState<'configuring' | 'in-progress' | 'completed'>('configuring');
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [tradeResult, setTradeResult] = useState<'win' | 'loss' | null>(null);

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
    // Randomly determine win/loss for demonstration
    const isWin = Math.random() > 0.5;
    setTradeResult(isWin ? 'win' : 'loss');
    setTradeStatus('completed');
  };

  const resetTrade = () => {
    setTradeStatus('configuring');
    setTradeResult(null);
    setTimeLeft(0);
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

  if (!isOpen) return null;

  const modalContent = (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className={`modal-container ${direction === 'up' ? 'up-theme' : 'down-theme'}`} 
        onClick={e => e.stopPropagation()}
      >
        {/* Header Section */}
        <div className="modal-header">
          <div className="pair-info">
            <div className="pair-icon">
              <i className="fab fa-btc"></i>
            </div>
            <div className="pair-name">BTC/USDT</div>
          </div>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
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
                    className="amount-inputs" 
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
      </div>
    </div>
  );
  
  return ReactDOM.createPortal(modalContent, document.body);
};

export default FuturesModal;