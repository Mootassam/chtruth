import React, { useState, useEffect, useRef } from "react";
import CoinListModal from "src/shared/modal/CoinListModal";

function Trade() {
  const [selectedCoin, setSelectedCoin] = useState("BTCUSDT");
  const [marketPrice, setMarketPrice] = useState("51248.06");
  const [priceChangePercent, setPriceChangePercent] = useState("0.37");
  const [isCoinModalOpen, setIsCoinModalOpen] = useState(false);
  const [orderType, setOrderType] = useState("LIMIT");
  const [price, setPrice] = useState("51248.06");
  const [quantity, setQuantity] = useState("");
  const [activeTab, setActiveTab] = useState("buy");
  const [orderBook, setOrderBook] = useState({
    asks: [],
    bids: []
  });

  const tickerWs = useRef(null);
  const depthWs = useRef(null);

  // Format number with commas
  const formatNumber = (num, decimals = 2) => {
    return Number(num).toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  // Setup WebSocket for ticker data
  useEffect(() => {
    if (!selectedCoin) return;

    // Close previous connection if exists
    if (tickerWs.current) {
      tickerWs.current.close();
    }

    // Connect to ticker stream
    tickerWs.current = new WebSocket(
      `wss://stream.binance.com:9443/ws/${selectedCoin.toLowerCase()}@ticker`
    );

    tickerWs.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMarketPrice(data.c);
      setPriceChangePercent(data.P);
    };

    return () => {
      if (tickerWs.current) {
        tickerWs.current.close();
      }
    };
  }, [selectedCoin]);

  // Setup WebSocket for order book data
  useEffect(() => {
    if (!selectedCoin) return;

    // Close previous connection if exists
    if (depthWs.current) {
      depthWs.current.close();
    }

    // Connect to depth stream
    depthWs.current = new WebSocket(
      `wss://stream.binance.com:9443/ws/${selectedCoin.toLowerCase()}@depth20@100ms`
    );

    depthWs.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      // Process asks (sell orders)
      const asks = data.asks.slice(0, 5).map(ask => ({
        price: ask[0],
        amount: ask[1]
      }));
      
      // Process bids (buy orders)
      const bids = data.bids.slice(0, 5).map(bid => ({
        price: bid[0],
        amount: bid[1]
      }));
      
      setOrderBook({ asks, bids });
    };

    return () => {
      if (depthWs.current) {
        depthWs.current.close();
      }
    };
  }, [selectedCoin]);

  // Calculate max amount for depth visualization
  const calculateMaxAmount = () => {
    const allAmounts = [
      ...orderBook.asks.map(item => parseFloat(item.amount)),
      ...orderBook.bids.map(item => parseFloat(item.amount))
    ];
    return Math.max(...allAmounts, 1); // Ensure at least 1 to avoid division by zero
  };

  const maxAmount = calculateMaxAmount();

  const handleOpenCoinModal = () => {
    setIsCoinModalOpen(true);
  };

  const handleCloseCoinModal = () => {
    setIsCoinModalOpen(false);
  };

  const handleSelectCoin = (coin) => {
    setSelectedCoin(coin);
    setIsCoinModalOpen(false);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const calculateTotal = () => {
    if (!price || !quantity) return "0.00";
    return (parseFloat(price) * parseFloat(quantity)).toFixed(2);
  };

  const handleIncrementPrice = () => {
    setPrice((prevPrice) => (parseFloat(prevPrice) + 1).toString());
  };

  const handleDecrementPrice = () => {
    if (parseFloat(price) > 1) {
      setPrice((prevPrice) => (parseFloat(prevPrice) - 1).toString());
    }
  };

  const handleIncrementQuantity = () => {
    setQuantity((prevQty) => 
      prevQty ? (parseFloat(prevQty) + 0.001).toFixed(3) : "0.001"
    );
  };

  const handleDecrementQuantity = () => {
    if (quantity && parseFloat(quantity) > 0.001) {
      setQuantity((prevQty) => (parseFloat(prevQty) - 0.001).toFixed(3));
    }
  };

  const handlePlaceOrder = () => {
    // In a real app, this would send the order to an exchange
    alert(`Placing ${activeTab.toUpperCase()} order: ${quantity} ${selectedCoin.replace("USDT", "")} at $${price}`);
  };

  const handleOrderBookClick = (clickPrice) => {
    setPrice(clickPrice);
  };

  return (
    <div className="container">
      {/* Header Section */}
      <div className="trade-header">
        <div className="trade-header-top">
          <div className="trade-page-title">SPOT</div>
          <div className="settings-icon">
            <i className="fas fa-cog" />
          </div>
        </div>
        <div className="market-info">
          <div className="market-name">{selectedCoin.replace("USDT", "/USDT")}</div>
          <div className="coin-select-icon" onClick={handleOpenCoinModal}>
            <i className="fas fa-chevron-down" />
          </div>
          <div 
            className="market-change"
            style={{ color: priceChangePercent.startsWith("-") ? "#FF6838" : "#00C076" }}
          >
            {priceChangePercent.startsWith("-") ? "" : "+"}{priceChangePercent}%
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Trading Layout */}
        <div className="trading-layout">
          {/* Trade Form */}
          <div className="trade-form">
            {/* Buy/Sell Tabs */}
            <div className="buy-sell-tabs">
              <div 
                className={`buy-tab ${activeTab === "buy" ? "active" : ""}`}
                onClick={() => setActiveTab("buy")}
              >
                BUY
              </div>
              <div 
                className={`sell-tab ${activeTab === "sell" ? "active" : ""}`}
                onClick={() => setActiveTab("sell")}
              >
                SELL
              </div>
            </div>
            
            {/* Order Type */}
            <div className="order-type">
              <div className="order-type-label">Order Type</div>
              <select 
                className="order-type-select"
                value={orderType}
                onChange={(e) => setOrderType(e.target.value)}
              >
                <option>LIMIT</option>
                <option>MARKET</option>
                <option>STOP-LIMIT</option>
              </select>
            </div>
            
            {/* Price Input */}
            <div className="input-group">
              <div className="input-label">Price (USDT)</div>
              <div className="input-with-buttons">
                <input 
                  className="value-input" 
                  value={price} 
                  onChange={handlePriceChange}
                />
                <div className="value-buttons">
                  <button className="value-button" onClick={handleIncrementPrice}>+</button>
                  <button className="value-button" onClick={handleDecrementPrice}>-</button>
                </div>
              </div>
            </div>
            
            {/* Quantity Input */}
            <div className="input-group">
              <div className="input-label">Amount ({selectedCoin.replace("USDT", "")})</div>
              <div className="input-with-buttons">
                <input 
                  className="value-input" 
                  value={quantity} 
                  onChange={handleQuantityChange}
                  placeholder="0.0" 
                />
                <div className="value-buttons">
                  <button className="value-button" onClick={handleIncrementQuantity}>+</button>
                  <button className="value-button" onClick={handleDecrementQuantity}>-</button>
                </div>
              </div>
            </div>
            
            {/* Amount Display */}
            <div className="amount-display">{calculateTotal()} USDT</div>
            
            {/* Balance Info */}
            <div className="balance-info">Available: 5,230.50 USDT</div>
            
            {/* Action Button */}
            <button 
              className={`action-button ${activeTab === "buy" ? "buy-button" : "sell-button"}`}
              onClick={handlePlaceOrder}
            >
              {activeTab === "buy" ? "BUY" : "SELL"} {selectedCoin.replace("USDT", "")}
            </button>
          </div>
          
          {/* Order Book */}
          <div className="order-book">
            <div className="order-book-header">
              <span>Price (USDT)</span>
              <span>Amount ({selectedCoin.replace("USDT", "")})</span>
            </div>
            
            {/* Asks (Sell Orders) */}
            {orderBook.asks.map((ask, index) => {
              const amount = parseFloat(ask.amount);
              const widthPercentage = (amount / maxAmount) * 100;
              
              return (
                <div 
                  key={index} 
                  className="order-book-row ask-row"
                  onClick={() => handleOrderBookClick(ask.price)}
                >
                  <div 
                    className="depth-bar ask-depth"
                    style={{ width: `${widthPercentage}%` }}
                  />
                  <div className="order-price">{formatNumber(ask.price)}</div>
                  <div className="order-amount">{formatNumber(ask.amount, 4)}</div>
                </div>
              );
            })}
            
            {/* Current Price */}
            <div className="order-book-row current-price-row">
              <div className="current-price">${formatNumber(marketPrice)}</div>
            </div>
            
            {/* Bids (Buy Orders) */}
            {orderBook.bids.map((bid, index) => {
              const amount = parseFloat(bid.amount);
              const widthPercentage = (amount / maxAmount) * 100;
              
              return (
                <div 
                  key={index} 
                  className="order-book-row bid-row"
                  onClick={() => handleOrderBookClick(bid.price)}
                >
                  <div 
                    className="depth-bar bid-depth"
                    style={{ width: `${widthPercentage}%` }}
                  />
                  <div className="order-price">{formatNumber(bid.price)}</div>
                  <div className="order-amount">{formatNumber(bid.amount, 4)}</div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Open Orders */}
        <div className="open-orders">
          <div className="open-orders-header">
            <div className="open-orders-title">OPEN ORDERS</div>
            <div className="orders-list-icon">
              <i className="fas fa-list" />
            </div>
          </div>
          <div className="empty-orders">
            <div className="empty-icon">
              <i className="fas fa-city" />
            </div>
            <div className="empty-text">No open orders yet</div>
          </div>
        </div>
      </div>

      {/* Coin Selection Modal */}
      <CoinListModal
        isOpen={isCoinModalOpen}
        onClose={handleCloseCoinModal}
        onSelectCoin={handleSelectCoin}
      />

      <style>{`
        /* Trade Header Section */
        .trade-header {
          background-color: #000000;
          padding: 10px 12px;
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 1px solid #2A2A2A;
        }

        .trade-header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }

        .trade-page-title {
          font-size: 16px;
          font-weight: bold;
        }

        .settings-icon {
          color: #AAAAAA;
          font-size: 18px;
          cursor: pointer;
        }

        .market-info {
          display: flex;
          align-items: center;
        }

        .market-name {
          font-weight: bold;
          font-size: 14px;
          margin-right: 8px;
        }

        .coin-select-icon {
          color: #F3BA2F;
          font-size: 14px;
          cursor: pointer;
          margin-right: 10px;
        }

        .market-change {
          font-size: 12px;
          font-weight: 500;
        }

        /* Main Content */
        .main-content {
          padding: 10px;
        }

        /* Trading Layout */
        .trading-layout {
          display: grid;
              grid-template-columns: repeat(2 , 1fr);
          gap: 10px;
          margin-bottom: 12px;
        }

        .trade-form {
          flex: 1;
          // background-color: #1A1A1A;
          border-radius: 6px;
        }

        .order-book {
          flex: 1;
          // background-color: #1A1A1A;
          border-radius: 6px;
          overflow-y: auto;
          position: relative;
        }

        /* Buy/Sell Tabs */
        .buy-sell-tabs {
          display: flex;
          margin-bottom: 12px;
          background-color: #2A2A2A;
          border-radius: 4px;
          overflow: hidden;
        }

        .buy-tab,
        .sell-tab {
          flex: 1;
          text-align: center;
          padding: 8px;
          font-weight: bold;
          cursor: pointer;
          font-size: 12px;
        }

        .buy-tab {
          background-color: #2A2A2A;
          color: #FFF;
        }

        .buy-tab.active {
          background-color: #00C076;
          color: #000;
        }

        .sell-tab {
          background-color: #2A2A2A;
          color: #FFF;
        }

        .sell-tab.active {
          background-color: #FF6838;
          color: #FFF;
        }

        /* Order Type */
        .order-type {
          margin-bottom: 12px;
        }

        .order-type-label {
          font-size: 12px;
          color: #AAAAAA;
          margin-bottom: 5px;
        }

        .order-type-select {
          width: 100%;
          background-color: #2A2A2A;
          color: #FFFFFF;
          border: none;
          border-radius: 4px;
          padding: 8px;
          font-size: 12px;
        }

        /* Input Fields */
        .input-group {
          margin-bottom: 12px;
        }

        .input-label {
          display: block;
          font-size: 12px;
          color: #AAAAAA;
          margin-bottom: 5px;
        }

        .input-with-buttons {
          display: flex;
          align-items: center;
          background-color: #2A2A2A;
          border-radius: 4px;
          padding: 4px;
        }

        .value-input {
          flex: 1;
          background: transparent;
          border: none;
          color: #FFFFFF;
          font-size: 12px;
          padding: 6px;
          outline: none;
        }

        .value-buttons {
          display: flex;
        }

        .value-button {
          background-color: #1A1A1A;
          color: #FFFFFF;
          border: none;
          width: 22px;
          height: 22px;
          border-radius: 3px;
          margin-left: 3px;
          cursor: pointer;
          font-size: 10px;
        }

        .value-button:hover {
          background-color: #2A2A2A;
        }

        .amount-display {
          background-color: #2A2A2A;
          border-radius: 4px;
          padding: 8px;
          margin-bottom: 12px;
          font-size: 12px;
          text-align: center;
        }

        .balance-info {
          font-size: 11px;
          color: #AAAAAA;
          margin-bottom: 12px;
          text-align: center;
        }

        /* Action Button */
        .action-button {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 4px;
          font-size: 13px;
          font-weight: bold;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: background-color 0.2s;
        }

        .buy-button {
          background-color: #00C076;
          color: white;
        }

        .buy-button:hover {
          background-color: #00a766;
        }

        .sell-button {
          background-color: #FF6838;
          color: white;
        }

        .sell-button:hover {
          background-color: #e04444;
        }

        /* Order Book */
        .order-book-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 10px;
          color: #AAAAAA;
          padding: 0 5px;
        }

        .order-book-row {
          display: flex;
          justify-content: space-between;
          padding: 6px 5px;
          font-size: 11px;
          cursor: pointer;
          transition: background-color 0.2s;
          position: relative;
          z-index: 1;
        }

        .depth-bar {
          position: absolute;
          top: 0;
          height: 100%;
          opacity: 0.2;
          z-index: -1;
          transition: width 0.3s ease;
        }

        .ask-depth {
          right: 0;
          background-color: #FF6838;
        }

        .bid-depth {
          left: 0;
          background-color: #00C076;
        }

        .order-book-row:hover {
          background-color: rgba(42, 42, 42, 0.7);
          border-radius: 3px;
        }

        .order-price {
          flex: 1;
        }

        .order-amount {
          flex: 1;
          text-align: right;
        }

        .ask-row .order-price {
          color: #FF6838;
        }

        .bid-row .order-price {
          color: #00C076;
        }

        .current-price-row {
          display: flex;
          justify-content: center;
          margin: 8px 0;
          padding: 8px 0;
          border-top: 1px solid #2A2A2A;
          border-bottom: 1px solid #2A2A2A;
        }

        .current-price {
          font-weight: bold;
          color: #F3BA2F;
          font-size: 13px;
        }

        /* Open Orders */
        .open-orders {
          padding: 12px;
          background-color: #1A1A1A;
          border-radius: 6px;
        }

        .open-orders-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .open-orders-title {
          font-size: 13px;
          font-weight: bold;
          color: #F3BA2F;
        }

        .orders-list-icon {
          color: #F3BA2F;
          font-size: 16px;
          cursor: pointer;
        }

        .empty-orders {
          text-align: center;
          padding: 50px 0;
        }

        .empty-icon {
          font-size: 28px;
          color: #2A2A2A;
          margin-bottom: 8px;
        }

        .empty-text {
          color: #AAAAAA;
          font-size: 12px;
        }
      `}</style>
    </div>
  );
}

export default Trade;