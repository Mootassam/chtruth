import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const FuturesModal = ({ isOpen, onClose, direction }) => {
  const [selectedDuration, setSelectedDuration] = useState("120");
  const [selectedLeverage, setSelectedLeverage] = useState("2");
  const [orderAmount, setOrderAmount] = useState(1);
  
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
          <button className="confirm-btn">
            CONFIRM ORDER
          </button>
        </div>
      </div>
      
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
          background-color: #2a2a2a;
          border-radius: 12px;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
          overflow: hidden;
        }
        
        .up-theme {
          border-top: 4px solid #00C076;
        }
        
        .down-theme {
          border-top: 4px solid #FF6838;
        }
        
        /* Header Section */
        .modal-header {
          background-color: #1a1a1a;
          padding: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #3a3a3a;
        }
        
        .pair-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .pair-icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: #F3BA2F;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .pair-icon i {
          color: #000;
          font-size: 16px;
        }
        
        .pair-name {
          font-weight: bold;
          font-size: 18px;
        }
        
        .close-btn {
          background: none;
          border: none;
          color: #AAAAAA;
          font-size: 20px;
          cursor: pointer;
          padding: 5px;
        }
        
        .close-btn:hover {
          color: #FFFFFF;
        }
        
        /* Direction Indicator */
        .direction-indicator {
          padding: 10px 15px;
          text-align: center;
          font-weight: bold;
          font-size: 16px;
        }
        
        .up-indicator {
          background-color: rgba(0, 192, 118, 0.2);
          color: #00C076;
        }
        
        .down-indicator {
          background-color: rgba(255, 104, 56, 0.2);
          color: #FF6838;
        }
        
        /* Modal Content */
        .modal-content {
          padding: 15px;
        }
        
        .section {
          margin-bottom: 20px;
        }
        
        .section-title {
          font-size: 14px;
          color: #AAAAAA;
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
        }
        
        .options-container {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        
        .option-btn {
          background-color: #3a3a3a;
          border: 1px solid #4a4a4a;
          border-radius: 6px;
          padding: 8px 12px;
          color: #FFFFFF;
          font-size: 14px;
          cursor: pointer;
          flex: 1;
          min-width: 70px;
          text-align: center;
          transition: all 0.2s;
        }
        
        .option-btn:hover {
          background-color: #4a4a4a;
        }
        
        .option-btn.selected {
          background-color: ${direction === 'up' ? '#00C076' : '#FF6838'};
          border-color: ${direction === 'up' ? '#00C076' : '#FF6838'};
          color: #000;
          font-weight: bold;
        }
        
        .amount-control {
          display: flex;
          align-items: center;
          background-color: #3a3a3a;
          border-radius: 6px;
          padding: 5px;
          margin-top: 10px;
        }
        
        .amount-btn {
          background: none;
          border: none;
          color: #AAAAAA;
          font-size: 20px;
          width: 40px;
          height: 40px;
          cursor: pointer;
          border-radius: 5px;
        }
        
        .amount-btn:hover {
          background-color: #4a4a4a;
          color: #FFFFFF;
        }
        
        .amount-inputs {
          flex: 1;
          background: none;
          border: none;
          color: #FFFFFF;
          font-size: 16px;
          text-align: center;
          padding: 10px 0;
        }
        
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        input[type="number"] {
          -moz-appearance: textfield;
        }
        
        .balance-info {
          font-size: 14px;
          color: #AAAAAA;
          text-align: right;
          margin-top: 5px;
        }
        
        .profit-info {
          text-align: center;
          font-size: 14px;
          color: #AAAAAA;
          margin: 20px 0;
        }
        
        .confirm-btn {
          background-color: ${direction === 'up' ? '#00C076' : '#FF6838'};
          color: white;
          display: block;
          width: 100%;
          padding: 15px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .confirm-btn:hover {
          background-color: ${direction === 'up' ? '#00a466' : '#e55a2b'};
        }
      `}</style>
    </div>
  );
  
  return ReactDOM.createPortal(modalContent, document.body);
};

// Helper function to calculate projected profit
function calculateProfit(amount, leverage, duration) {
  // Simple formula for demonstration
  return (amount * parseInt(leverage) * parseInt(duration)) / 10000;
}

export default FuturesModal;