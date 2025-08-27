import React, { useState } from "react";
import ReactDOM from "react-dom";

const CoinListModal = ({ isOpen, onClose, onSelectCoin }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample cryptocurrency data
  const cryptocurrencies = [
    {
      symbol: "BTC",
      name: "Bitcoin",
      icon: "fab fa-btc",
      price: "$51,825.10",
      change: "+2.31%",
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      icon: "fab fa-ethereum",
      price: "$3,405.60",
      change: "+1.85%",
    },
    {
      symbol: "BNB",
      name: "Binance Coin",
      icon: "fas fa-coins",
      price: "$560.25",
      change: "+0.92%",
    },
    {
      symbol: "ADA",
      name: "Cardano",
      icon: "fas fa-chart-line",
      price: "$1.25",
      change: "-0.45%",
    },
    {
      symbol: "XRP",
      name: "Ripple",
      icon: "fas fa-exchange-alt",
      price: "$0.85",
      change: "+3.12%",
    },
    {
      symbol: "SOL",
      name: "Solana",
      icon: "fas fa-sun",
      price: "$102.75",
      change: "+5.67%",
    },
    {
      symbol: "DOT",
      name: "Polkadot",
      icon: "fas fa-circle",
      price: "$26.80",
      change: "-1.23%",
    },
    {
      symbol: "DOGE",
      name: "Dogecoin",
      icon: "fas fa-dog",
      price: "$0.15",
      change: "+8.91%",
    },
    {
      symbol: "AVAX",
      name: "Avalanche",
      icon: "fas fa-mountain",
      price: "$65.30",
      change: "+4.56%",
    },
    {
      symbol: "MATIC",
      name: "Polygon",
      icon: "fas fa-shapes",
      price: "$1.45",
      change: "+2.34%",
    },
  ];

  const filteredCoins = cryptocurrencies.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  const handleCoinSelect = (coin) => {
    onSelectCoin(coin);
    onClose();
  };

  const modalContent = (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="coin-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Section */}
        <div className="coin-modal-header">
          <div className="coin-modal-title">Select Cryptocurrency</div>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Search Section */}
        <div className="search-section">
          <div className="search-input-container">
            <i className="fas fa-search search-icon"></i>
            <input
              type="text"
              placeholder="Search cryptocurrencies..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="clear-search"
                onClick={() => setSearchTerm("")}
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
        </div>

        {/* Coin List */}
        <div className="coin-list">
          {filteredCoins.length > 0 ? (
            filteredCoins.map((coin) => (
              <div
                key={coin.symbol}
                className="coin-item"
                onClick={() => handleCoinSelect(coin)}
              >
                <div className="coin-info">
                  <div className={`coin-icon ${coin.symbol.toLowerCase()}`}>
                    <i className={coin.icon}></i>
                  </div>
                  <div className="coin-details">
                    <div className="coin-symbol">{coin.symbol}</div>
                    <div className="coin-name">{coin.name}</div>
                  </div>
                </div>
                <div className="coin-price-info">
                  <div className="coin-price">{coin.price}</div>
                  <div
                    className={`coin-change ${
                      coin.change.startsWith("+") ? "positive" : "negative"
                    }`}
                  >
                    {coin.change}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <i className="fas fa-search"></i>
              <p>No cryptocurrencies found</p>
            </div>
          )}
        </div>

        {/* Popular Cryptocurrencies Quick Select */}
        <div className="quick-select-section">
          <div className="section-label">Popular</div>
          <div className="quick-select-chips">
            <button className="chip" onClick={() => setSearchTerm("Bitcoin")}>
              BTC
            </button>
            <button className="chip" onClick={() => setSearchTerm("Ethereum")}>
              ETH
            </button>
            <button className="chip" onClick={() => setSearchTerm("Binance")}>
              BNB
            </button>
            <button className="chip" onClick={() => setSearchTerm("Solana")}>
              SOL
            </button>
          </div>
        </div>
      </div>

      <style>{`
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
        
        .coin-modal-container {
          background-color: #2a2a2a;
          border-radius: 12px;
          width: 100%;
          max-width: 400px;
          max-height: 80vh;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        
        /* Header Section */
        .coin-modal-header {
          background-color: #1a1a1a;
          padding: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #3a3a3a;
        }
        
        .coin-modal-title {
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
        
        /* Search Section */
        .search-section {
          padding: 15px;
          border-bottom: 1px solid #3a3a3a;
        }
        
        .search-input-container {
          position: relative;
          display: flex;
          align-items: center;
        }
        
        .search-icon {
          position: absolute;
          left: 12px;
          color: #AAAAAA;
        }
        
        .search-input {
          width: 100%;
          padding: 12px 40px;
          background-color: #3a3a3a;
          border: 1px solid #4a4a4a;
          border-radius: 8px;
          color: #FFFFFF;
          font-size: 14px;
        }
        
        .search-input:focus {
          outline: none;
          border-color: #F3BA2F;
        }
        
        .clear-search {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          color: #AAAAAA;
          cursor: pointer;
        }
        
        .clear-search:hover {
          color: #FFFFFF;
        }
        
        /* Coin List */
        .coin-list {
          flex: 1;
          overflow-y: auto;
          max-height: 40vh;
        }
        
        .coin-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 15px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .coin-item:hover {
          background-color: #3a3a3a;
        }
        
        .coin-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .coin-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #F3BA2F;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 18px;
        }
        
        .coin-icon.eth {
          background-color: #627EEA;
        }
        
        .coin-icon.bnb {
          background-color: #F3BA2F;
        }
        
        .coin-icon.ada {
          background-color: #0033AD;
        }
        
        .coin-icon.xrp {
          background-color: #23292F;
        }
        
        .coin-icon.sol {
          background-color: #9945FF;
        }
        
        .coin-icon.doge {
          background-color: #C2A633;
        }
        
        .coin-details {
          display: flex;
          flex-direction: column;
        }
        
        .coin-symbol {
          font-weight: bold;
          font-size: 16px;
        }
        
        .coin-name {
          font-size: 12px;
          color: #AAAAAA;
        }
        
        .coin-price-info {
          text-align: right;
        }
        
        .coin-price {
          font-weight: bold;
          font-size: 14px;
        }
        
        .coin-change {
          font-size: 12px;
        }
        
        .coin-change.positive {
          color: #00C076;
        }
        
        .coin-change.negative {
          color: #FF6838;
        }
        
        .no-results {
          padding: 40px 20px;
          text-align: center;
          color: #AAAAAA;
        }
        
        .no-results i {
          font-size: 32px;
          margin-bottom: 10px;
        }
        
        /* Quick Select Section */
        .quick-select-section {
          padding: 15px;
          border-top: 1px solid #3a3a3a;
        }
        
        .section-label {
          font-size: 14px;
          color: #AAAAAA;
          margin-bottom: 10px;
        }
        
        .quick-select-chips {
          display: flex;
          gap: 8px;
        }
        
        .chip {
          padding: 8px 16px;
          background-color: #3a3a3a;
          border: 1px solid #4a4a4a;
          border-radius: 20px;
          color: #FFFFFF;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .chip:hover {
          background-color: #4a4a4a;
          border-color: #F3BA2F;
        }
      `}</style>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default CoinListModal;
