import React, { useState } from "react";
import CoinListModal from "src/shared/modal/CoinListModal";
import FuturesModal from "src/shared/modal/FuturesModal";

function Futures() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tradeDirection, setTradeDirection] = useState(null);
  const [isCoinModalOpen, setIsCoinModalOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null);

  const handleOpenCoinModal = () => {
    setIsCoinModalOpen(true);
  };

  const handleCloseCoinModal = () => {
    setIsCoinModalOpen(false);
  };

  const handleSelectCoin = (coin) => {
    setSelectedCoin(coin);
    // You can update the UI with the selected coin
  };
  const handleOpenModal = (direction) => {
    setTradeDirection(direction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTradeDirection(null);
  };

  return (
    <div className="container">
      {/* Header Section */}
      <div className="header">
        <div className="header-top">
          {/* Removed back button and added coin list icon */}

          <div className="market-info">
            <div className="market-icon">
              <i className="fab fa-btc" />
            </div>
            <div className="market-name">BTC/USDT</div>
            <div className="market-change">+2.31%</div>
          </div>
          <div className="additional-actions" onClick={handleOpenCoinModal}>
            <i className="fas fa-filter" />
          </div>
        </div>
        <div className="market-price">$51,825.10</div>
        <div className="market-stats">
          <span>24h High: $52,120.40</span>
          <span>24h Vol: 42.5B USDT</span>
          <span>24h Low: $50,920.30</span>
        </div>
      </div>

      {/* Trading View Chart */}
      <div className="chart-container">
        <div className="chart-placeholder">
          <i className="fas fa-chart-line" />
          <span>Trading View Chart</span>
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
      <div className="section-title">Recent Trades</div>
      <div className="recent-trades">
        <div className="trades-header">
          <span>Price (USDT)</span>
          <span>Amount (BTC)</span>
          <span>Time</span>
        </div>
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
        <div className="trade-row buy-trade">
          <div className="trade-price">51,825.10</div>
          <div className="trade-amount">0.876</div>
          <div className="trade-time">12:45:15</div>
        </div>
        <div className="trade-row sell-trade">
          <div className="trade-price">51,823.90</div>
          <div className="trade-amount">0.453</div>
          <div className="trade-time">12:45:10</div>
        </div>
        <div className="trade-row buy-trade">
          <div className="trade-price">51,824.50</div>
          <div className="trade-amount">0.321</div>
          <div className="trade-time">12:45:05</div>
        </div>
        <div className="trade-row sell-trade">
          <div className="trade-price">51,823.20</div>
          <div className="trade-amount">0.765</div>
          <div className="trade-time">12:45:01</div>
        </div>
        <div className="trade-row buy-trade">
          <div className="trade-price">51,824.00</div>
          <div className="trade-amount">0.432</div>
          <div className="trade-time">12:44:58</div>
        </div>
        <div className="trade-row sell-trade">
          <div className="trade-price">51,822.50</div>
          <div className="trade-amount">1.123</div>
          <div className="trade-time">12:44:55</div>
        </div>
        <div className="trade-row buy-trade">
          <div className="trade-price">51,823.10</div>
          <div className="trade-amount">0.654</div>
          <div className="trade-time">12:44:52</div>
        </div>
      </div>

      {/* Futures Modal */}
      <FuturesModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        direction={tradeDirection}
      />

      <CoinListModal
        isOpen={isCoinModalOpen}
        onClose={handleCloseCoinModal}
        onSelectCoin={handleSelectCoin}
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
          color: #00C076;
          font-size: 14px;
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
        }
        
        .chart-placeholder i {
          font-size: 50px;
          margin-bottom: 15px;
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
        }
        
        .trades-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 12px;
          color: #777;
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
