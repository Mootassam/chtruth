import React, { useState, useEffect, useRef } from "react";
import CoinListModal from "src/shared/modal/CoinListModal";
import { Link } from "react-router-dom";

// Main Trade Component
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
    bids: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [openOrders, setOpenOrders] = useState([
    {
      id: 1,
      pair: "BTC/USDT",
      action: "BUY",
      date: "08/23",
      time: "02:20:08",
      status: "COMPLETED",
      orderPrice: "117065.0000",
      orderAmount: "0.000901",
      filled: "100%",
      total: "105.48",
      type: "LIMIT",
    },
    {
      id: 2,
      pair: "ETH/USDT",
      action: "SELL",
      date: "08/24",
      time: "14:35:22",
      status: "PENDING",
      orderPrice: "2850.50",
      orderAmount: "1.25",
      filled: "35%",
      total: "3563.13",
      type: "LIMIT",
    },
    {
      id: 3,
      pair: "SOL/USDT",
      action: "BUY",
      date: "08/24",
      time: "09:15:47",
      status: "PARTIALLY FILLED",
      orderPrice: "102.75",
      orderAmount: "15.50",
      filled: "75%",
      total: "1194.56",
      type: "MARKET",
    },
  ]);

  const tickerWs = useRef(null);
  const depthWs = useRef(null);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

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
      const asks = data.asks.slice(0, 5).map((ask) => ({
        price: ask[0],
        amount: ask[1],
      }));

      // Process bids (buy orders)
      const bids = data.bids.slice(0, 5).map((bid) => ({
        price: bid[0],
        amount: bid[1],
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
      ...orderBook.asks.map((item) => parseFloat(item.amount)),
      ...orderBook.bids.map((item) => parseFloat(item.amount)),
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
    setIsLoading(true);

    // Simulate loading when changing coin
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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
    alert(
      `Placing ${activeTab.toUpperCase()} order: ${quantity} ${selectedCoin.replace(
        "USDT",
        ""
      )} at $${price}`
    );
  };

  const handleOrderBookClick = (clickPrice) => {
    setPrice(clickPrice);
  };

  const handleCancelOrder = (orderId) => {
    setOpenOrders(openOrders.filter((order) => order.id !== orderId));
  };

  return (
    <div className="container">
      {/* Loading Overlay */}
      {/* {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading market data...</div>
        </div>
      )} */}

      {/* Header Section */}
      <div className="trade-header">
        <div className="trade-header-top">
          <div className="trade-page-title">SPOT</div>
          <div className="settings-icon">
            <i className="fas fa-cog" />
          </div>
        </div>
        <div className="market-info">
          {isLoading ? (
            <div className="skeleton-loading skeleton-market-name"></div>
          ) : (
            <div className="market-name">
              {selectedCoin.replace("USDT", "/USDT")}
            </div>
          )}
          <div className="coin-select-icon" onClick={handleOpenCoinModal}>
            <i className="fas fa-chevron-down" />
          </div>
          {isLoading ? (
            <div className="skeleton-loading skeleton-price-change"></div>
          ) : (
            <div
              className="market-change"
              style={{
                color: priceChangePercent.startsWith("-")
                  ? "#FF6838"
                  : "#00C076",
              }}
            >
              {priceChangePercent.startsWith("-") ? "" : "+"}
              {priceChangePercent}%
            </div>
          )}
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
              {isLoading ? (
                <div className="skeleton-loading skeleton-tab"></div>
              ) : (
                <>
                  <div
                    className={`buy-tab ${activeTab === "buy" ? "active" : ""}`}
                    onClick={() => setActiveTab("buy")}
                  >
                    BUY
                  </div>
                  <div
                    className={`sell-tab ${
                      activeTab === "sell" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("sell")}
                  >
                    SELL
                  </div>
                </>
              )}
            </div>

            {/* Order Type */}
            <div className="order-type">
              <div className="order-type-label">Order Type</div>
              {isLoading ? (
                <div className="skeleton-loading skeleton-input"></div>
              ) : (
                <select
                  className="order-type-select"
                  value={orderType}
                  onChange={(e) => setOrderType(e.target.value)}
                >
                  <option>LIMIT</option>
                  <option>MARKET</option>
                  <option>STOP-LIMIT</option>
                </select>
              )}
            </div>

            {/* Price Input */}
            <div className="input-group">
              <div className="input-label">Price (USDT)</div>
              {isLoading ? (
                <div className="skeleton-loading skeleton-input"></div>
              ) : (
                <div className="input-with-buttons">
                  <input
                    className="value-input"
                    value={price}
                    onChange={handlePriceChange}
                  />
                  <div className="value-buttons">
                    <button
                      className="value-button"
                      onClick={handleIncrementPrice}
                    >
                      +
                    </button>
                    <button
                      className="value-button"
                      onClick={handleDecrementPrice}
                    >
                      -
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quantity Input */}
            <div className="input-group">
              <div className="input-label">
                Amount ({selectedCoin.replace("USDT", "")})
              </div>
              {isLoading ? (
                <div className="skeleton-loading skeleton-input"></div>
              ) : (
                <div className="input-with-buttons">
                  <input
                    className="value-input"
                    value={quantity}
                    onChange={handleQuantityChange}
                    placeholder="0.0"
                  />
                  <div className="value-buttons">
                    <button
                      className="value-button"
                      onClick={handleIncrementQuantity}
                    >
                      +
                    </button>
                    <button
                      className="value-button"
                      onClick={handleDecrementQuantity}
                    >
                      -
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Amount Display */}
            {isLoading ? (
              <div className="skeleton-loading skeleton-input"></div>
            ) : (
              <div className="amount-display">{calculateTotal()} USDT</div>
            )}

            {/* Balance Info */}
            {isLoading ? (
              <div className="skeleton-loading skeleton-balance"></div>
            ) : (
              <div className="balance-info">Available: 5,230.50 USDT</div>
            )}

            {/* Action Button */}
            {isLoading ? (
              <div className="skeleton-loading skeleton-button"></div>
            ) : (
              <button
                className={`action-button ${
                  activeTab === "buy" ? "buy-button" : "sell-button"
                }`}
                onClick={handlePlaceOrder}
              >
                {activeTab === "buy" ? "BUY" : "SELL"}{" "}
                {selectedCoin.replace("USDT", "")}
              </button>
            )}
          </div>

          {/* Order Book */}
          <div className="order-book">
            <div className="order-book-header">
              <span>Price (USDT)</span>
              <span>Amount ({selectedCoin.replace("USDT", "")})</span>
            </div>

            {isLoading ? (
              <>
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="skeleton-loading skeleton-order-book"
                  ></div>
                ))}
                <div className="skeleton-loading skeleton-current-price"></div>
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="skeleton-loading skeleton-order-book"
                  ></div>
                ))}
              </>
            ) : (
              <>
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
                      <div className="order-price">
                        {formatNumber(ask.price)}
                      </div>
                      <div className="order-amount">
                        {formatNumber(ask.amount, 4)}
                      </div>
                    </div>
                  );
                })}

                {/* Current Price */}
                <div className="order-book-row current-price-row">
                  <div className="current-price">
                    ${formatNumber(marketPrice)}
                  </div>
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
                      <div className="order-price">
                        {formatNumber(bid.price)}
                      </div>
                      <div className="order-amount">
                        {formatNumber(bid.amount, 4)}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>

        {/* Open Orders */}
        <div className="open-orders">
          <div className="open-orders-header">
            <div className="open-orders-title">OPEN ORDERS</div>
            <div className="orders-filter">
              <Link to="/ordersPage" className="remove_blue">
                <i className="fas fa-list" />
              </Link>
            </div>
          </div>

          {openOrders.length > 0 ? (
            <div className="orders-list">
              {openOrders.map((order) => (
                <div key={order.id} className="order-item">
                  <div className="order-main-info">
                    <div className="order-pair-action">
                      <span className="order-pair">{order.pair}</span>
                      <span
                        className={`order-action ${order.action.toLowerCase()}`}
                      >
                        {order.action}
                      </span>
                      <span className="order-type-badge">{order.type}</span>
                    </div>
                    <div className="order-date">
                      {order.date}{" "}
                      <span className="order-time">{order.time}</span>
                    </div>
                  </div>

                  <div className="order-details">
                    <div className="order-detail">
                      <span className="detail-label">Status</span>
                      <span
                        className={`order-status ${order.status
                          .replace(/\s+/g, "-")
                          .toLowerCase()}`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div className="order-detail">
                      <span className="detail-label">Filled</span>
                      <span className="order-filled">{order.filled}</span>
                    </div>

                    <div className="order-detail">
                      <span className="detail-label">Price</span>
                      <span className="order-price-value">
                        {formatNumber(order.orderPrice, 4)} USDT
                      </span>
                    </div>

                    <div className="order-detail">
                      <span className="detail-label">Amount</span>
                      <span className="order-amount-value">
                        {order.orderAmount} {order.pair.split("/")[0]}
                      </span>
                    </div>

                    <div className="order-detail">
                      <span className="detail-label">Total</span>
                      <span className="order-total">
                        {formatNumber(order.total)} USDT
                      </span>
                    </div>
                  </div>

                  <div className="order-actions">
                    {order.status === "PENDING" ||
                    order.status === "PARTIALLY FILLED" ? (
                      <button
                        className="cancel-order-btn"
                        onClick={() => handleCancelOrder(order.id)}
                      >
                        Cancel
                      </button>
                    ) : (
                      <div className="completed-indicator">
                        <i className="fas fa-check-circle"></i>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-orders">
              <div className="empty-icon">
                <i className="fas fa-clipboard-list"></i>
              </div>
              <div className="empty-text">No open orders yet</div>
              <div className="empty-subtext">
                Your open orders will appear here
              </div>
            </div>
          )}
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
        .container {
          background-color: #000000;
          color: #FFFFFF;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        }
        
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
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin-bottom: 12px;
        }

        .trade-form {
          // background-color: #1A1A1A;
          // border-radius: 6px;
          // padding: 12px;
        }

        .order-book {
          // background-color: #1A1A1A;
          // border-radius: 6px;
          // padding: 12px;
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
          margin-bottom: 15px;
        }

        .open-orders-title {
          font-size: 13px;
          font-weight: bold;
          color: #F3BA2F;
        }

        .orders-filter {
          display: flex;
          background-color: #2A2A2A;
          border-radius: 4px;
          padding: 2px;
          font-size: 11px;
        }

        .orders-filter span {
          padding: 4px 8px;
          cursor: pointer;
          border-radius: 3px;
        }

        .orders-filter span.active {
          background-color: #F3BA2F;
          color: #000;
        }

        .order-item {
          background-color: #2A2A2A;
          border-radius: 6px;
          padding: 12px;
          margin-bottom: 10px;
          position: relative;
        }

        .order-main-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .order-pair-action {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .order-pair {
          font-weight: bold;
          font-size: 13px;
        }

        .order-action {
          font-size: 11px;
          padding: 2px 6px;
          border-radius: 3px;
          font-weight: bold;
        }

        .order-action.buy {
          background-color: rgba(0, 192, 118, 0.2);
          color: #00C076;
        }

        .order-action.sell {
          background-color: rgba(255, 104, 56, 0.2);
          color: #FF6838;
        }

        .order-type-badge {
          font-size: 10px;
          color: #AAAAAA;
          background-color: #1A1A1A;
          padding: 2px 5px;
          border-radius: 3px;
        }

        .order-date {
          font-size: 11px;
          color: #AAAAAA;
        }

        .order-time {
          color: #777;
        }

        .order-details {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          margin-bottom: 12px;
        }

        .order-detail {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .detail-label {
          font-size: 11px;
          color: #AAAAAA;
        }

        .order-status {
          font-size: 11px;
          font-weight: bold;
        }

        .order-status.completed {
          color: #00C076;
        }

        .order-status.pending {
          color: #F3BA2F;
        }

        .order-status.partially-filled {
          color: #FF6838;
        }

        .order-filled {
          font-size: 11px;
          font-weight: bold;
          color: #F3BA2F;
        }

        .order-price-value, .order-amount-value, .order-total {
          font-size: 11px;
          font-weight: bold;
        }

        .order-actions {
          display: flex;
          justify-content: flex-end;
        }

        .cancel-order-btn {
          background-color: #FF6838;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 11px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .cancel-order-btn:hover {
          background-color: #e04444;
        }

        .completed-indicator {
          color: #00C076;
          font-size: 14px;
        }

        .empty-orders {
          text-align: center;
          padding: 40px 0;
        }

        .empty-icon {
          font-size: 32px;
          color: #2A2A2A;
          margin-bottom: 10px;
        }

        .empty-text {
          color: #AAAAAA;
          font-size: 14px;
          margin-bottom: 5px;
        }

        .empty-subtext {
          color: #777;
          font-size: 12px;
        }

        /* Loading Overlay Styles */
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        
        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 5px solid #2A2A2A;
          border-top: 5px solid #F3BA2F;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 15px;
        }
        
        .loading-text {
          color: #FFFFFF;
          font-size: 16px;
          font-weight: 500;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        /* Skeleton Loading for Content */
        .skeleton-loading {
          background: linear-gradient(90deg, #2A2A2A 25%, #333 50%, #2A2A2A 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          border-radius: 4px;
        }
        
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        
        /* Skeleton elements for initial load */
        .skeleton-market-name {
          width: 100px;
          height: 16px;
          margin-right: 8px;
        }
        
        .skeleton-price-change {
          width: 50px;
          height: 16px;
        }
        
        .skeleton-tab {
          width: 100%;
          height: 36px;
        }
        
        .skeleton-input {
          width: 100%;
          height: 40px;
          margin-bottom: 12px;
        }
        
        .skeleton-balance {
          width: 100%;
          height: 14px;
          margin-bottom: 12px;
        }
        
        .skeleton-button {
          width: 100%;
          height: 42px;
        }
        
        .skeleton-order-book {
          height: 20px;
          margin-bottom: 5px;
        }
        
        .skeleton-current-price {
          height: 30px;
          margin: 8px 0;
        }

        /* Coin Selection Modal */
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
        }
        
        .coin-modal {
          background-color: #1A1A1A;
          border-radius: 8px;
          width: 320px;
          max-width: 90%;
          max-height: 80vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          border-bottom: 1px solid #2A2A2A;
        }
        
        .modal-header h3 {
          margin: 0;
          font-size: 18px;
          color: #F3BA2F;
        }
        
        .close-button {
          background: none;
          border: none;
          color: #AAAAAA;
          font-size: 24px;
          cursor: pointer;
        }
        
        .search-container {
          padding: 12px 16px;
          border-bottom: 1px solid #2A2A2A;
        }
        
        .coin-search {
          width: 100%;
          padding: 10px 12px;
          background-color: #2A2A2A;
          border: none;
          border-radius: 4px;
          color: #FFFFFF;
          font-size: 14px;
        }
        
        .coin-search:focus {
          outline: 1px solid #F3BA2F;
        }
        
        .modal-content {
          flex: 1;
          overflow-y: auto;
        }
        
        .coin-list {
          padding: 8px 0;
        }
        
        .coin-item {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .coin-item:hover {
          background-color: #2A2A2A;
        }
        
        .coin-icon {
          font-size: 20px;
          margin-right: 12px;
          width: 30px;
          text-align: center;
        }
        
        .coin-info {
          flex: 1;
        }
        
        .coin-symbol {
          font-weight: bold;
          font-size: 14px;
          margin-bottom: 2px;
        }
        
        .coin-name {
          color: #AAAAAA;
          font-size: 12px;
        }
      `}</style>
    </div>
  );
}

export default Trade;
