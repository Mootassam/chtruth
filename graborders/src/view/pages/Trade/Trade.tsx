import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import CoinListModal from "src/shared/modal/CoinListModal";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import spotListSelectors from "src/modules/spot/list/spotListSelectors";
import spotListActions from "src/modules/spot/list/spotListActions";
import spotFormActions from "src/modules/spot/form/spotFormActions";
import assetsActions from "src/modules/assets/list/assetsListActions";
import assetsListSelectors from "src/modules/assets/list/assetsListSelectors";
import spotService from "src/modules/spot/spotService";
import { stat } from "fs";

// Utility: safe parseFloat that returns NaN if invalid
const safeParse = (v) => {
  if (v === null || v === undefined || v === "") return NaN;
  const n = Number(v);
  return Number.isFinite(n) ? n : NaN;
};

function Trade() {
  const dispatch = useDispatch();

  // Redux data
  const listspot = useSelector(spotListSelectors.selectRows) || [];
  const listAssets = useSelector(assetsListSelectors.selectRows) || [];

  // Local UI state
  const [selectedCoin, setSelectedCoin] = useState("BTCUSDT");
  const [marketPrice, setMarketPrice] = useState("51248.06");
  const [priceChangePercent, setPriceChangePercent] = useState("0.37");
  const [isCoinModalOpen, setIsCoinModalOpen] = useState(false);
  const [orderType, setOrderType] = useState("LIMIT"); // "LIMIT" | "MARKET"
  const [price, setPrice] = useState("51248.06");
  const [quantity, setQuantity] = useState("");
  const [activeTab, setActiveTab] = useState("buy"); // "buy" | "sell"
  const [orderBook, setOrderBook] = useState({ asks: [], bids: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Refs for websockets and throttling
  const tickerWs = useRef(null);
  const depthWs = useRef(null);
  const lastTickerUpdate = useRef(0);
  const lastDepthUpdate = useRef(0);

  // Map balances (memoized)
  const balances = useMemo(() => {
    if (!Array.isArray(listAssets)) return {};
    return listAssets.reduce((acc, item) => {
      acc[item.symbol] = Number(item.amount) || 0;
      return acc;
    }, {});
  }, [listAssets]);

  // Generate unique order number
  const generateOrderNumber = useCallback(() => {
    const t = Date.now().toString(36);
    const r = Math.floor(Math.random() * 1e6).toString(36);
    return `ORD-${t}-${r}`.toUpperCase();
  }, []);

  // Fetch assets and spot list on mount
  useEffect(() => {
    dispatch(assetsActions.doFetch());
    dispatch(spotListActions.doFetch());
    // simulate loading skeleton a short time for UX
    const t = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(t);
  }, [dispatch]);

  // Update price when switching to MARKET
  useEffect(() => {
    if (orderType === "MARKET") {
      setPrice(marketPrice);
    }
    // If switching from MARKET to LIMIT and price is empty, set to marketPrice
    if (orderType === "LIMIT" && (!price || isNaN(Number(price)))) {
      setPrice(marketPrice);
    }
  }, [orderType, marketPrice]); // eslint-disable-line react-hooks/exhaustive-deps

  // Format function (keeps safe behavior)
  const formatNumber = useCallback((num, decimals = 2) => {
    const n = Number(num);
    if (!Number.isFinite(n)) return (0).toFixed(decimals);
    return n.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }, []);

  // Throttled ticker websocket
  useEffect(() => {
    if (!selectedCoin) return;

    // cleanup previous
    if (tickerWs.current) {
      try {
        tickerWs.current.close();
      } catch (e) { }
      tickerWs.current = null;
    }

    try {
      const symbol = selectedCoin.toLowerCase();
      const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@ticker`);
      tickerWs.current = ws;

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          const now = performance.now();
          // throttle to ~200ms
          if (now - lastTickerUpdate.current > 180) {
            lastTickerUpdate.current = now;
            if (data.c !== undefined) setMarketPrice(data.c);
            if (data.P !== undefined) setPriceChangePercent(data.P);
            if (orderType === "MARKET" && data.c !== undefined) {
              setPrice(data.c);
            }
          }
        } catch (err) {
          // ignore malformed messages
          // console.warn("ticker parse error", err);
        }
      };

      ws.onclose = () => {
        // attempt gentle reconnect after small delay
        // but avoid infinite reconnect loops — only if component still mounted
        // we'll just rely on React re-mounting or user action to change symbol
      };
    } catch (err) {
      console.error("Ticker WS init error", err);
    }

    return () => {
      if (tickerWs.current) {
        try {
          tickerWs.current.close();
        } catch (e) { }
        tickerWs.current = null;
      }
    };
  }, [selectedCoin, orderType]);

  // Throttled depth websocket
  useEffect(() => {
    if (!selectedCoin) return;

    if (depthWs.current) {
      try {
        depthWs.current.close();
      } catch (e) { }
      depthWs.current = null;
    }

    try {
      const symbol = selectedCoin.toLowerCase();
      const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@depth20@100ms`);
      depthWs.current = ws;

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          const now = performance.now();
          if (now - lastDepthUpdate.current > 180) {
            lastDepthUpdate.current = now;
            const asks = (data.asks || []).slice(0, 5).map((a) => ({ price: a[0], amount: a[1] }));
            const bids = (data.bids || []).slice(0, 5).map((b) => ({ price: b[0], amount: b[1] }));
            setOrderBook({ asks, bids });
          }
        } catch (err) {
          // ignore
        }
      };
    } catch (err) {
      console.error("Depth WS init error", err);
    }

    return () => {
      if (depthWs.current) {
        try {
          depthWs.current.close();
        } catch (e) { }
        depthWs.current = null;
      }
    };
  }, [selectedCoin]);

  // Calculate max amount for depth visualization
  const maxAmount = useMemo(() => {
    const all = [
      ...orderBook.asks.map((it) => safeParse(it.amount)),
      ...orderBook.bids.map((it) => safeParse(it.amount)),
    ].filter((n) => Number.isFinite(n));
    return Math.max(...all, 1);
  }, [orderBook]);

  // Handlers
  const handleOpenCoinModal = useCallback(() => setIsCoinModalOpen(true), []);
  const handleCloseCoinModal = useCallback(() => setIsCoinModalOpen(false), []);

  const handleSelectCoin = useCallback((coin) => {
    if (!coin) return;
    setSelectedCoin(coin);
    setIsCoinModalOpen(false);
    setIsLoading(true);
    // brief UX loading while updating streams
    const t = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const handlePriceChange = useCallback((e) => {
    setPrice(e.target.value);
  }, []);

  const handleQuantityChange = useCallback((e) => {
    setQuantity(e.target.value);
  }, []);

  const calculateTotal = useCallback(() => {
    const p = safeParse(price);
    const q = safeParse(quantity);
    if (!Number.isFinite(p) || !Number.isFinite(q)) return "0.00";
    return (p * q).toFixed(2);
  }, [price, quantity]);

  const handleIncrementPrice = useCallback(() => {
    const p = safeParse(price);
    const next = Number.isFinite(p) ? (p + 1) : safeParse(marketPrice) || 0;
    setPrice(next.toString());
  }, [price, marketPrice]);

  const handleDecrementPrice = useCallback(() => {
    const p = safeParse(price);
    if (!Number.isFinite(p)) return;
    const next = Math.max(0, p - 1);
    setPrice(next.toString());
  }, [price]);

  const handleIncrementQuantity = useCallback(() => {
    const q = safeParse(quantity);
    const next = Number.isFinite(q) ? (q + 0.001) : 0.001;
    setQuantity(next.toFixed(3).toString());
  }, [quantity]);

  const handleDecrementQuantity = useCallback(() => {
    const q = safeParse(quantity);
    if (!Number.isFinite(q)) return;
    const next = Math.max(0, q - 0.001);
    setQuantity(next.toFixed(3).toString());
  }, [quantity]);

  const handleOrderBookClick = useCallback((clickPrice) => {
    if (orderType === "LIMIT" && clickPrice !== undefined) {
      setPrice(clickPrice.toString());
    }
  }, [orderType]);

  // Place order
  const handlePlaceOrder = useCallback(async () => {
    setErrorMessage("");
    if (placing) return;
    const q = safeParse(quantity);
    if (!Number.isFinite(q) || q <= 0) {
      setErrorMessage("Please enter a valid quantity.");
      return;
    }
    const p = orderType === "MARKET" ? safeParse(marketPrice) : safeParse(price);
    if (!Number.isFinite(p) || p <= 0) {
      setErrorMessage("Please enter a valid price.");
      return;
    }

    // available balance check for SELL or for BUY vs stable coin balance might be needed
    // Here we simply check minimums
    setPlacing(true);
    try {
      const orderPrice = p;
      const orderQty = q;
      const totalValue = orderPrice * orderQty;
      const estimatedFee = totalValue * 0.001; // 0.1%

      const orderData = {
        orderNo: generateOrderNumber(),
        orderType: orderType.toLowerCase(),
        tradingPair: selectedCoin.replace("USDT", "/USDT"),
        status: orderType === "MARKET" ? "completed" : "pending",
        direction: activeTab.toUpperCase(),
        delegateType: orderType,
        delegateState: orderType === "MARKET" ? "Filled" : "Pending",
        orderQuantity: orderQty,
        commissionPrice: orderPrice,
        entrustedValue: totalValue,
        transactionQuantity: orderType === "MARKET" ? orderQty : 0,
        transactionValue: orderType === "MARKET" ? totalValue : 0,
        closingPrice: orderType === "MARKET" ? orderPrice : 0,
        handlingFee: orderType === "MARKET" ? estimatedFee : 0,
        commissionTime: new Date().toISOString(),
        closingTime: orderType === "MARKET" ? new Date().toISOString() : null,
      };

      // dispatch create and refresh list
      await dispatch(spotFormActions.doCreate(orderData));
      dispatch(spotListActions.doFetch());

      // Reset quantity for market orders (limit orders keep values for user convenience)
      if (orderType === "MARKET") {
        setQuantity("");
      }

    } catch (err) {
      console.error("Place order error", err);
      setErrorMessage("Failed to place order. Please try again.");
    } finally {
      setPlacing(false);
    }
  }, [
    placing,
    quantity,
    orderType,
    marketPrice,
    price,
    selectedCoin,
    activeTab,
    dispatch,
    generateOrderNumber,
  ]);

  const handleCancelOrder = useCallback((orderId) => {
    // Real app should dispatch action
    // dispatch(spotListActions.doDelete(orderId));
    // For now simulate optimistic UI
    console.log("Cancel requested for", orderId);
  }, []);

  // Simulate matching for limit orders (kept but non-blocking)
  useEffect(() => {
    let mounted = true;
    const interval = setInterval(() => {
      if (!mounted) return;
      if (orderType === "LIMIT" && listspot.length > 0) {
        const updated = listspot.map((order) => {
          if (order.status === "pending" && order.orderType === "limit") {
            const commissionPrice = safeParse(order.commissionPrice);
            const marketP = safeParse(marketPrice);
            if (!Number.isFinite(commissionPrice) || !Number.isFinite(marketP)) return order;
            const priceTolerance = marketP * 0.001;
            if (Math.abs(commissionPrice - marketP) <= priceTolerance) {
              return {
                ...order,
                status: "completed",
                delegateState: "Filled",
                transactionQuantity: order.orderQuantity,
                transactionValue: order.orderQuantity * order.commissionPrice,
                closingPrice: marketPrice,
                closingTime: new Date().toISOString(),
                handlingFee: order.orderQuantity * order.commissionPrice * 0.001,
              };
            }
          }
          return order;
        });

        const changed = updated.filter((o, i) => o.status !== listspot[i]?.status);
        if (changed.length > 0) {
          console.log("Matched orders (sim):", changed);
          // In a real app: dispatch action to persist changes
        }
      }
    }, 5000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [listspot, marketPrice, orderType]);

  // Derived vars for UI
  const baseSymbol = useMemo(() => {
    if (!selectedCoin) return "";
    return selectedCoin.replace("USDT", "");
  }, [selectedCoin]);




  const updateStatus = async (id) => {
    dispatch(spotFormActions.doUpdate(id, { status: 'cancelled' }))
  }




  return (
    <div className="container">
      {/* Header */}
      <div className="trade-header">
        <div className="trade-header-top">
          <div className="trade-page-title">SPOT</div>
        </div>

        <div className="market-info">
          {isLoading ? (
            <div className="skeleton-market-name" />
          ) : (
            <div className="market-name">{selectedCoin.replace("USDT", "/USDT")}</div>
          )}

          <div className="coin-select-icon" onClick={handleOpenCoinModal} aria-hidden>
            <i className="fas fa-chevron-down" />
          </div>

          {isLoading ? (
            <div className="skeleton-price-change" />
          ) : (
            <div
              className="market-change"
              style={{
                color: String(priceChangePercent).startsWith("-") ? "#FF6838" : "#00C076",
              }}
            >
              {String(priceChangePercent).startsWith("-") ? "" : "+"}
              {priceChangePercent}%
            </div>
          )}
        </div>
      </div>

      {/* Main */}
      <div className="main-content">
        <div className="trading-layout">
          {/* Trade Form */}
          <div className="trade-form">
            <div className="buy-sell-tabs" role="tablist">
              {isLoading ? (
                <div className="skeleton-tab" />
              ) : (
                <>
                  <div
                    role="tab"
                    aria-selected={activeTab === "buy"}
                    tabIndex={0}
                    className={`buy-tab ${activeTab === "buy" ? "active" : ""}`}
                    onClick={() => setActiveTab("buy")}
                    onKeyDown={(e) => e.key === "Enter" && setActiveTab("buy")}
                  >
                    BUY
                  </div>
                  <div
                    role="tab"
                    aria-selected={activeTab === "sell"}
                    tabIndex={0}
                    className={`sell-tab ${activeTab === "sell" ? "active" : ""}`}
                    onClick={() => setActiveTab("sell")}
                    onKeyDown={(e) => e.key === "Enter" && setActiveTab("sell")}
                  >
                    SELL
                  </div>
                </>
              )}
            </div>

            <div className="order-type">
              <div className="order-type-label">Order Type</div>
              {isLoading ? (
                <div className="skeleton-input" />
              ) : (
                <select
                  className="order-type-select"
                  value={orderType}
                  onChange={(e) => setOrderType(e.target.value)}
                >
                  <option value="LIMIT">LIMIT</option>
                  <option value="MARKET">MARKET</option>
                </select>
              )}
            </div>

            {/* Price input (limit only) */}
            {orderType === "LIMIT" && (
              <div className="input-group">
                <div className="input-label">Price (USDT)</div>
                {isLoading ? (
                  <div className="skeleton-input" />
                ) : (
                  <div className="input-with-buttons">
                    <input
                      className="value-input"
                      value={price}
                      onChange={handlePriceChange}
                      inputMode="decimal"
                      aria-label="price"
                    />
                    <div className="value-buttons">
                      <button className="value-button" onClick={handleIncrementPrice} aria-label="increase price">+</button>
                      <button className="value-button" onClick={handleDecrementPrice} aria-label="decrease price">-</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Quantity */}
            <div className="input-group">
              <div className="input-label">Amount ({baseSymbol})</div>
              {isLoading ? (
                <div className="skeleton-input" />
              ) : (
                <div className="input-with-buttons">
                  <input
                    className="value-input"
                    value={quantity}
                    onChange={handleQuantityChange}
                    placeholder="0.0"
                    inputMode="decimal"
                    aria-label="quantity"
                  />
                  <div className="value-buttons">
                    <button className="value-button" onClick={handleIncrementQuantity} aria-label="increase quantity">+</button>
                    <button className="value-button" onClick={handleDecrementQuantity} aria-label="decrease quantity">-</button>
                  </div>
                </div>
              )}
            </div>

            {/* Amount */}
            {isLoading ? (
              <div className="skeleton-input" />
            ) : (
              <div className="amount-display">{calculateTotal()} USDT</div>
            )}

            {/* Balance */}
            {isLoading ? (
              <div className="skeleton-balance" />
            ) : (
              <div className="balance-info">
                Available: {formatNumber(balances[baseSymbol] || 0, 6)} {baseSymbol}
              </div>
            )}

            {/* Error */}
            {errorMessage && <div className="error-message" role="alert">{errorMessage}</div>}

            {/* Action */}
            {isLoading ? (
              <div className="skeleton-button" />
            ) : (
              <button
                className={`action-button ${activeTab === "buy" ? "buy-button" : "sell-button"}`}
                onClick={handlePlaceOrder}
                disabled={placing}
                aria-busy={placing}
              >
                {placing ? "Placing..." : `${activeTab === "buy" ? "BUY" : "SELL"} ${baseSymbol}`}
              </button>
            )}
          </div>

          {/* Order Book */}
          <div className="order-book" role="region" aria-label="order book">
            <div className="order-book-header">
              <span>Price (USDT)</span>
              <span>Amount ({baseSymbol})</span>
            </div>

            {isLoading ? (
              <>
                {[...Array(5)].map((_, i) => <div key={`s-a-${i}`} className="skeleton-order-book" />)}
                <div className="skeleton-current-price" />
                {[...Array(5)].map((_, i) => <div key={`s-b-${i}`} className="skeleton-order-book" />)}
              </>
            ) : (
              <>
                {orderBook.asks.map((ask, idx) => {
                  const amount = safeParse(ask.amount) || 0;
                  const widthPercentage = Math.min(100, (amount / maxAmount) * 100);
                  return (
                    <div key={`ask-${idx}`} className="order-book-row ask-row" onClick={() => handleOrderBookClick(ask.price)}>
                      <div className="depth-bar ask-depth" style={{ width: `${widthPercentage}%` }} />
                      <div className="order-price">{formatNumber(ask.price, 4)}</div>
                      <div className="order-amount">{formatNumber(ask.amount, 4)}</div>
                    </div>
                  );
                })}

                <div className="order-book-row current-price-row">
                  <div className="current-price">${formatNumber(marketPrice, 2)}</div>
                </div>

                {orderBook.bids.map((bid, idx) => {
                  const amount = safeParse(bid.amount) || 0;
                  const widthPercentage = Math.min(100, (amount / maxAmount) * 100);
                  return (
                    <div key={`bid-${idx}`} className="order-book-row bid-row" onClick={() => handleOrderBookClick(bid.price)}>
                      <div className="depth-bar bid-depth" style={{ width: `${widthPercentage}%` }} />
                      <div className="order-price">{formatNumber(bid.price, 4)}</div>
                      <div className="order-amount">{formatNumber(bid.amount, 4)}</div>
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
              <Link to="/ordersPage" className="remove_blue" aria-label="view all orders">
                <i className="fas fa-list" />
              </Link>
            </div>
          </div>

          {listspot && listspot.length > 0 ? (
            <div className="orders-list">
              {listspot.map((order) => (
                <div key={order.id ?? order.orderNo} className="order-item">
                  <div className="order-main-info">
                    <div className="order-pair-action">
                      <span className="order-pair">{order.tradingPair}</span>
                      <span className={`order-action ${String(order?.direction || "").toLowerCase()}`}>
                        {order.direction}
                      </span>
                      <span className="order-type-badge">{order.orderType}</span>
                    </div>
                    <div className="order-date">
                      {order.commissionTime ? new Date(order.commissionTime).toLocaleDateString() : ""}
                      <span className="order-time">
                        {order.commissionTime ? new Date(order.commissionTime).toLocaleTimeString() : ""}
                      </span>
                    </div>
                  </div>

                  <div className="order-details">
                    <div className="order-detail">
                      <span className="detail-label">Status</span>
                      <span className={`order-status ${String(order.status).toLowerCase()}`}>{order.status}</span>
                    </div>

                    <div className="order-detail">
                      <span className="detail-label">Price</span>
                      <span className="order-price-value">{formatNumber(order.commissionPrice, 4)} USDT</span>
                    </div>

                    <div className="order-detail">
                      <span className="detail-label">Amount</span>
                      <span className="order-amount-value">{order.orderQuantity} {order?.tradingPair?.split("/")[0]}</span>
                    </div>

                    <div className="order-detail">
                      <span className="detail-label">Total</span>
                      <span className="order-total">{formatNumber(order.entrustedValue)} USDT</span>
                    </div>
                  </div>

                  <div className="order-actions">
                    {String(order.status).toLowerCase() === "pending" ||
                      String(order.status).toLowerCase() === "partially filled" ? (
                      <button className="cancel-order-btn" onClick={() => updateStatus(order.id)}>
                        Cancel
                      </button>
                    ) : (
                      <div className="completed-indicator">
                        <i className="fas fa-check-circle" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-orders">
              <div className="empty-icon"><i className="fas fa-clipboard-list" /></div>
              <div className="empty-text">No open orders yet</div>
              <div className="empty-subtext">Your open orders will appear here</div>
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

          .order-status.cancelled {
          color: #e01515ff;
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
