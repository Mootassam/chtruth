import React, { useState, useEffect, useRef } from "react";
import CoinListModal from "src/shared/modal/CoinListModal";
import FuturesModal from "src/shared/modal/FuturesModal";
import FuturesChart from "./FuturesChart";

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

// Interface for Order data
interface Order {
  id: number;
  pair: string;
  direction: string;
  status: string;
  investment: number;
  openPrice: number;
  openTime: string;
  leverage: number;
  pnl?: number;
  closePrice?: number;
  closeTime?: string;
  currentPrice?: number;
  stopLoss?: number;
  takeProfit?: number;
  orderType: string;
  margin: number;
  fee: number;
}

function Futures() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tradeDirection, setTradeDirection] = useState<string | null>(null);
  const [isCoinModalOpen, setIsCoinModalOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState("BTCUSDT");
  const [marketPrice, setMarketPrice] = useState("0");
  const [priceChangePercent, setPriceChangePercent] = useState("0");
  const [highPrice, setHighPrice] = useState("0");
  const [lowPrice, setLowPrice] = useState("0");
  const [volume, setVolume] = useState("0");
  const [activeTab, setActiveTab] = useState<"openOrders" | "recentOrders">("openOrders");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isOrdersLoading, setIsOrdersLoading] = useState(true);

  const tickerWs = useRef<WebSocket | null>(null);
  const currentCoinRef = useRef(selectedCoin); // Keep track of current coin

  // Mock data for open orders
  const [openOrders, setOpenOrders] = useState<Order[]>([]);

  // Mock data for recent orders
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  // Format number with commas and fixed decimals
  const formatNumber = (num: string, decimals: number = 2) => {
    return Number(num).toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  // Format volume in billions
  const formatVolume = (vol: string) => {
    const volumeNum = Number(vol);
    if (volumeNum >= 1000000000) {
      return (volumeNum / 1000000000).toFixed(2) + "B";
    } else if (volumeNum >= 1000000) {
      return (volumeNum / 1000000).toFixed(2) + "M";
    } else {
      return formatNumber(vol, 0);
    }
  };

  // Fetch initial data via REST API before WebSocket connects
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.binance.com/api/v3/ticker/24hr?symbol=${selectedCoin}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch ticker data');
        }
        
        const tickerData = await response.json();
        
        // Set initial data from REST API
        setMarketPrice(tickerData.lastPrice);
        setPriceChangePercent(tickerData.priceChangePercent);
        setHighPrice(tickerData.highPrice);
        setLowPrice(tickerData.lowPrice);
        setVolume(tickerData.volume);
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, [selectedCoin]);

  // WebSocket connection for ticker data (price, 24h stats)
  useEffect(() => {
    if (!selectedCoin) return;

    // Update the current coin reference
    currentCoinRef.current = selectedCoin;

    const connectTickerWebSocket = () => {
      // Close previous connection if it exists
      if (tickerWs.current) {
        tickerWs.current.close();
      }

      // Connect to ticker stream
      tickerWs.current = new WebSocket(
        `wss://stream.binance.com:9443/ws/${selectedCoin.toLowerCase()}@ticker`
      );

      tickerWs.current.onopen = () => {
        console.log(`Connected to ${selectedCoin} ticker stream`);
      };

      tickerWs.current.onmessage = (event: MessageEvent) => {
        const tickerData: BinanceTicker = JSON.parse(event.data);
        
        // Only update state if this message is for the currently selected coin
        if (tickerData.s === currentCoinRef.current) {
          setMarketPrice(tickerData.c);
          setPriceChangePercent(tickerData.P);
          setHighPrice(tickerData.h);
          setLowPrice(tickerData.l);
          setVolume(tickerData.v);
        }
      };

      tickerWs.current.onerror = (error: Event) => {
        console.error("Ticker WebSocket error:", error);
      };

      tickerWs.current.onclose = (event: CloseEvent) => {
        console.log("Ticker WebSocket closed, attempting to reconnect...");

        // Auto-reconnect after a short delay, but only if the coin hasn't changed
        setTimeout(() => {
          if (selectedCoin && selectedCoin === currentCoinRef.current) {
            console.log("Attempting to reconnect ticker WebSocket...");
            connectTickerWebSocket();
          }
        }, 2000);
      };
    };

    connectTickerWebSocket();

    return () => {
      if (tickerWs.current && tickerWs.current.readyState === WebSocket.OPEN) {
        tickerWs.current.close();
      }
    };
  }, [selectedCoin]);

  // Simulate loading orders data
  useEffect(() => {
    const timer = setTimeout(() => {
      // Set mock data after delay to simulate loading
      setOpenOrders([
        {
          id: 3,
          pair: "ETH/USDT",
          direction: "BUY UP",
          status: "Open",
          investment: 450.0,
          openPrice: 3450.25,
          openTime: "08/23 09:12:34",
          leverage: 15,
          pnl: 18.3,
          currentPrice: 3468.55,
          stopLoss: 3420.0,
          takeProfit: 3500.0,
          orderType: "Market",
          margin: 30.0,
          fee: 2.25,
        },
        {
          id: 4,
          pair: "SOL/USDT",
          direction: "BUY DOWN",
          status: "Open",
          investment: 250.0,
          openPrice: 102.75,
          openTime: "08/23 10:45:21",
          leverage: 12,
          pnl: -5.25,
          currentPrice: 97.5,
          stopLoss: 105.0,
          takeProfit: 95.0,
          orderType: "Limit",
          margin: 20.83,
          fee: 1.25,
        },
        {
          id: 5,
          pair: "BTC/USDT",
          direction: "BUY UP",
          status: "Open",
          investment: 1200.0,
          openPrice: 65820.5,
          openTime: "08/24 11:23:45",
          leverage: 10,
          pnl: 245.6,
          currentPrice: 66066.1,
          stopLoss: 65000.0,
          takeProfit: 67000.0,
          orderType: "Market",
          margin: 120.0,
          fee: 6.0,
        },
      ]);

      setRecentOrders([
        {
          id: 1,
          pair: "BTC/USDT",
          direction: "BUY DOWN",
          status: "Closed",
          investment: 300.0,
          openPrice: 65983,
          openTime: "08/22 07:47:23",
          leverage: 10,
          pnl: -24.5,
          closePrice: 65958.5,
          closeTime: "08/22 08:15:42",
          orderType: "Market",
          margin: 30.0,
          fee: 1.5,
        },
        {
          id: 2,
          pair: "BTC/USDT",
          direction: "BUY UP",
          status: "Closed",
          investment: 600.0,
          openPrice: 65881,
          openTime: "08/22 07:39:57",
          leverage: 20,
          pnl: 132.75,
          closePrice: 65913.75,
          closeTime: "08/22 08:22:18",
          orderType: "Market",
          margin: 30.0,
          fee: 3.0,
        },
        {
          id: 6,
          pair: "ADA/USDT",
          direction: "BUY UP",
          status: "Closed",
          investment: 500.0,
          openPrice: 0.455,
          openTime: "08/23 14:30:12",
          leverage: 15,
          pnl: 32.5,
          closePrice: 0.4582,
          closeTime: "08/23 15:45:33",
          orderType: "Limit",
          margin: 33.33,
          fee: 2.5,
        },
      ]);

      setIsOrdersLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    return () => {
      // Clean up WebSocket connections
      if (tickerWs.current) tickerWs.current.close();
    };
  }, []);

  const handleOpenCoinModal = () => {
    setIsCoinModalOpen(true);
  };

  const handleCloseCoinModal = () => {
    setIsCoinModalOpen(false);
  };

  const handleSelectCoin = (coin: string) => {
    // Reset market data to loading state
    setIsLoading(true);
    setMarketPrice("0");
    setPriceChangePercent("0");
    setHighPrice("0");
    setLowPrice("0");
    setVolume("0");
    
    // Update selected coin
    setSelectedCoin(coin);
    setIsCoinModalOpen(false);
  };

  const handleOpenModal = (direction: string) => {
    setTradeDirection(direction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTradeDirection(null);
  };

  const handleOpenOrderModal = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderModalOpen(true);
  };

  const handleCloseOrderModal = () => {
    setIsOrderModalOpen(false);
    setSelectedOrder(null);
  };

  const handleCloseOrder = (orderId: number) => {
    setOpenOrders((prev) => prev.filter((order) => order.id !== orderId));
    setIsOrderModalOpen(false);
  };

  // Loading placeholder component
  const LoadingPlaceholder = ({ width = "100%", height = "1em" }: { width?: string, height?: string }) => (
    <div 
      className="loading-placeholder" 
      style={{ width, height }}
    />
  );

  return (
    <div className="container">
      {/* Header Section */}
      <div className="header">
        <div className="header-top">
          <div className="market-info">
            <div className="market-icon">
              <img
                src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${
                  selectedCoin.split("USDT")[0]
                }.png`}
                style={{ width: 30, height: 30 }}
                alt={selectedCoin}
                loading="lazy"
              />
            </div>
            <div className="market-name">{selectedCoin}</div>
            <div
              className="market-change"
              style={{
                color: priceChangePercent && priceChangePercent.startsWith("-")
                  ? "#FF6838"
                  : "#00C076",
              }}
            >
              {priceChangePercent !== "0" ? (
                `${priceChangePercent}%`
              ) : (
                <LoadingPlaceholder width="50px" height="16px" />
              )}
            </div>
          </div>
          <div className="additional-actions" onClick={handleOpenCoinModal}>
            <i className="fas fa-filter" />
          </div>
        </div>
        <div className="market-price">
          {marketPrice !== "0" ? (
            `$${formatNumber(marketPrice)}`
          ) : (
            <LoadingPlaceholder width="120px" height="28px" />
          )}
        </div>
        <div className="market-stats">
          <span>
            24h High:{" "}
            {highPrice !== "0" ? (
              `$${formatNumber(highPrice)}`
            ) : (
              <LoadingPlaceholder width="80px" height="12px" />
            )}
          </span>
          <span>
            24h Vol:{" "}
            {volume !== "0" ? (
              `${formatVolume(volume)} ${selectedCoin.replace("USDT", "")}`
            ) : (
              <LoadingPlaceholder width="80px" height="12px" />
            )}
          </span>
          <span>
            24h Low:{" "}
            {lowPrice !== "0" ? (
              `$${formatNumber(lowPrice)}`
            ) : (
              <LoadingPlaceholder width="80px" height="12px" />
            )}
          </span>
        </div>
      </div>


      {/* If no symbol is selected, defaults to BTCUSDT */}
      <FuturesChart symbol={selectedCoin || undefined} />

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

      {/* Tabs for Open Orders/Recent Orders */}
      <div className="section-tabs">
        <div
          className={`tab ${activeTab === "openOrders" ? "active" : ""}`}
          onClick={() => setActiveTab("openOrders")}
        >
          Open Orders ({isOrdersLoading ? "..." : openOrders.length})
        </div>
        <div
          className={`tab ${activeTab === "recentOrders" ? "active" : ""}`}
          onClick={() => setActiveTab("recentOrders")}
        >
          Recent Orders ({isOrdersLoading ? "..." : recentOrders.length})
        </div>
      </div>

      {/* Open Orders */}
      {activeTab === "openOrders" && (
        <div className="orders-container">
          <>
            {openOrders.map((order) => (
              <div
                key={order.id}
                className="order-card"
                onClick={() => handleOpenOrderModal(order)}
              >
                <div className="order-header">
                  <div className="order-pair">{order.pair}</div>
                  <div
                    className={`order-direction ${
                      order.direction === "BUY UP" ? "buy" : "sell"
                    }`}
                  >
                    {order.direction}
                  </div>
                </div>
                <div className="order-status open">● {order.status}</div>
                <div className="order-details">
                  <div className="order-row">
                    <span className="order-label">Investment:</span>
                    <span className="order-value">
                      ${order.investment.toFixed(2)}
                    </span>
                  </div>
                  <div className="order-row">
                    <span className="order-label">Open Price:</span>
                    <span className="order-value">
                      {formatNumber(
                        order.openPrice.toString(),
                        order.openPrice > 1000 ? 0 : 2
                      )}
                    </span>
                  </div>
                  <div className="order-row">
                    <span className="order-label">Current Price:</span>
                    <span className="order-value">
                      {formatNumber(
                        order.currentPrice?.toString() || "0",
                        order.openPrice > 1000 ? 0 : 2
                      )}
                    </span>
                  </div>
                  <div className="order-row">
                    <span className="order-label">P/L:</span>
                    <span
                      className={`order-value ${
                        (order.pnl || 0) >= 0 ? "buy" : "sell"
                      }`}
                      style={{background:"none"}}
                    >
                      ${order.pnl?.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {openOrders.length === 0 && (
              <div className="no-orders">
                <i className="fas fa-folder-open" />
                <div>No open orders</div>
              </div>
            )}
          </>
        </div>
      )}

      {/* Recent Orders */}
      {activeTab === "recentOrders" && (
        <div className="orders-container">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="order-card"
              onClick={() => handleOpenOrderModal(order)}
            >
              <div className="order-header">
                <div className="order-pair">{order.pair}</div>
                <div
                  className={`order-direction ${
                    order.direction === "BUY UP" ? "buy" : "sell"
                  }`}
                >
                  {order.direction}
                </div>
              </div>
              <div className="order-status closed">● {order.status}</div>
              <div className="order-details">
                <div className="order-row">
                  <span className="order-label">Investment:</span>
                  <span className="order-value">
                    ${order.investment.toFixed(2)}
                  </span>
                </div>
                <div className="order-row">
                  <span className="order-label">Open Price:</span>
                  <span className="order-value">
                    {formatNumber(
                      order.openPrice.toString(),
                      order.openPrice > 1000 ? 0 : 2
                    )}
                  </span>
                </div>
                <div className="order-row">
                  <span className="order-label">Close Price:</span>
                  <span className="order-value">
                    {formatNumber(
                      order.closePrice?.toString() || "0",
                      order.openPrice > 1000 ? 0 : 2
                    )}
                  </span>
                </div>
                <div className="order-row">
                  <span className="order-label">P/L:</span>
                  <span
                    className={`order-value ${
                      (order.pnl || 0) >= 0 ? "buy" : "sell"
                    }`}
                  >
                    ${order.pnl?.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {recentOrders.length === 0 && (
            <div className="no-orders">
              <i className="fas fa-file-invoice" />
              <div>No recent orders</div>
            </div>
          )}
        </div>
      )}

      {/* Order Detail Modal */}
      {isOrderModalOpen && selectedOrder && (
        <div className="modal-overlay" onClick={handleCloseOrderModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Order Details</h2>
              <button className="modal-close" onClick={handleCloseOrderModal}>
                <i className="fas fa-times" />
              </button>
            </div>
            <div className="modal-body">
              <div className="order-detail-section">
                <div className="detail-header">
                  <span className="detail-pair">{selectedOrder.pair}</span>
                  <span
                    className={`detail-direction ${
                      selectedOrder.direction === "BUY UP" ? "buy" : "sell"
                    }`}
                  >
                    {selectedOrder.direction}
                  </span>
                </div>
                <div
                  className={`detail-status ${selectedOrder.status.toLowerCase()}`}
                >
                  ● {selectedOrder.status}
                </div>
              </div>

              <div className="order-detail-section">
  
            
                 <div className="detail-row">
                  <span className="detail-label">Futures Amount:</span>
                  <span className="detail-value">
                   300 USDT
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Contract Duration:</span>
                  <span className="detail-value">
                   3 Minutes
                  </span>
                </div>
             
                <div className="detail-row">
                  <span className="detail-label">Futures Status:</span>
                  <span className="detail-value">
                    Commpleted
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Open Position Pirce:</span>
                  <span className="detail-value">
                   115983
                  </span>
                </div>

        <div className="detail-row">
                  <span className="detail-label">Open Position Time:</span>
                  <span className="detail-value">
                   2025/08/22 07:47:23
                  </span>
                </div>
                 <div className="detail-row">
                  <span className="detail-label">Close Position Pirce:</span>
                  <span className="detail-value">
                   115983.62
                  </span>
                </div>
                    <div className="detail-row">
                  <span className="detail-label">Close Position Time:</span>
                  <span className="detail-value">
                   2025/08/22 /07:50:23
                  </span>
                </div>

                   <div className="detail-row">
                  <span className="detail-label">Profit And Loss Amount:</span>
                  <span className="detail-value">
                  -300
                  </span>
                </div>

                   <div className="detail-row">
                  <span className="detail-label">Leverage:</span>
                  <span className="detail-value">
                    10X
                  </span>
                </div>



              </div>

            </div>
            <div className="modal-footer">
            
              <button className="modal-button" onClick={handleCloseOrderModal}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}

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

        .modal-content {
  max-height: 90vh;
  overflow-y: scroll;  /* allow scroll */
  scrollbar-width: none; /* Firefox */
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
        
        .additional-actions {
          color: #AAAAAA;
          font-size: 20px;
          cursor: pointer;
        }
        
        /* Trading View Chart */
        .chart-container {
          height: 480px;
          background-color: #1A1A1A;
          margin: 15px;
          border-radius: 12px;
          position: relative;
          overflow: hidden;
        }
        
        .chart-placeholder {
          width: 100%;
          height: 100%;
        }
        
        .chart-loading {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.7);
          z-index: 10;
          color: #777;
        }
        
        .chart-controls {
          position: absolute;
          bottom: 10px;
          right: 10px;
          display: flex;
          gap: 5px;
          z-index: 5;
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
          font-size: 13px;
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
        
        /* Section Tabs */
        .section-tabs {
          display: flex;
          margin: 15px 15px 0;
          border-bottom: 1px solid #2A2A2A;
        }
        
        .tab {
          padding: 10px 15px;
          cursor: pointer;
          color: #777;
          font-size: 14px;
          position: relative;
          flex: 1;
          text-align: center;
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
          background-color: #00C076;
        }
        
        /* Orders Container */
        .orders-container {
          margin: 15px;
        }
        
        .order-card {
          background-color: #1A1A1A;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 15px;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .order-card.loading {
          cursor: default;
        }
        
        .order-card:hover:not(.loading) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        
        .order-pair {
          font-weight: bold;
          font-size: 16px;
        }
        
        .order-direction {
          font-size: 12px;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: bold;
        }
        
        .order-direction.buy {
          background-color: rgba(0, 192, 118, 0.2);
          color: #00C076;
        }
        
        .order-direction.sell {
          background-color: rgba(255, 104, 56, 0.2);
          color: #FF6838;
        }
        
        .order-status {
          font-size: 12px;
          margin-bottom: 12px;
        }
        
        .order-status.open {
          color: #00C076;
        }
        
        .order-status.closed {
          color: #777;
        }
        
        .order-details {
          border-top: 1px solid #2A2A2A;
          padding-top: 12px;
        }
        
        .order-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 13px;
        }
        
        .order-label {
          color: #AAAAAA;
        }
        
        .order-value {
          font-weight: 500;
        }
        
        .order-value.buy {
          color: #00C076;
        }
        
        .order-value.sell {
          color: #FF6838;
        }
        
        .no-orders {
          text-align: center;
          padding: 30px 0;
          color: #777;
        }
        
        .no-orders i {
          font-size: 24px;
          margin-bottom: 10px;
          opacity: 0.5;
        }
        
        /* Loading Placeholder */
        .loading-placeholder {
          animation: pulse 1.5s ease-in-out infinite;
          background-color: #2A2A2A;
          border-radius: 4px;
        }
        
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        
        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 20px;
        }
        
        .modal-content {
          background-color: #1A1A1A;
          border-radius: 12px;
          width: 100%;
          max-width: 400px;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #2A2A2A;
        }
        
        .modal-header h2 {
          font-size: 18px;
          font-weight: bold;
        }
        
        .modal-close {
          background: none;
          border: none;
          color: #AAAAAA;
          font-size: 20px;
          cursor: pointer;
        }
        
        .modal-body {
          padding: 20px;
        }
        
        .modal-footer {
          display: flex;
          justify-content: flex-end;
          padding: 20px;
          border-top: 1px solid #2A2A2A;
          gap: 10px;
        }
        
        .modal-button {
          background-color: #2A2A2A;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 10px 20px;
          cursor: pointer;
          font-weight: bold;
        }
        
        .close-order-button {
          background-color: #FF6838;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 10px 20px;
          cursor: pointer;
          font-weight: bold;
        }
        
        .order-detail-section {
          margin-bottom: 20px;
        }
        
        .order-detail-section h3 {
          font-size: 14px;
          color: #AAAAAA;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .detail-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        
        .detail-pair {
          font-weight: bold;
          font-size: 18px;
        }
        
        .detail-direction {
          font-size: 14px;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: bold;
        }
        
        .detail-direction.buy {
          background-color: rgba(0, 192, 118, 0.2);
          color: #00C076;
        }
        
        .detail-direction.sell {
          background-color: rgba(255, 104, 56, 0.2);
          color: #FF6838;
        }
        
        .detail-status {
          font-size: 14px;
          margin-bottom: 15px;
        }
        
        .detail-status.open {
          color: #00C076;
        }
        
        .detail-status.closed {
          color: #777;
        }
        
        .detail-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 14px;
        }
        
        .detail-label {
          color: #AAAAAA;
        }
        
        .detail-value {
          font-weight: 500;
        }
        
        .detail-value.profit {
          color: #00C076;
        }
        
        .detail-value.loss {
          color: #FF6838;
        }
      `}</style>
    </div>
  );
}

export default Futures;