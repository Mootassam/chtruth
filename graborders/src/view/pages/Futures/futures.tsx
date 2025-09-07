import React, { useState, useEffect, useRef, useCallback } from "react";
import { init } from 'klinecharts';
import axios from "axios";

// Interface for Binance trade data
interface BinanceTrade {
  e: string; // Event type
  E: number; // Event time
  s: string; // Symbol
  t: number; // Trade ID
  p: string; // Price
  q: string; // Quantity
  T: number; // Trade time
  m: boolean; // Is buyer market maker?
}

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
  const [recentTrades, setRecentTrades] = useState<BinanceTrade[]>([]);
  const [timeframe, setTimeframe] = useState("1m");
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'openOrders' | 'recentOrders'>('openOrders');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  
  const tradeWs = useRef<WebSocket | null>(null);
  const tickerWs = useRef<WebSocket | null>(null);
  const klineWs = useRef<WebSocket | null>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<any>(null);
  const lastKlineRef = useRef<any>(null);

  // Mock data for open orders
  const [openOrders, setOpenOrders] = useState<Order[]>([
    {
      id: 3,
      pair: "ETH/USDT",
      direction: "BUY UP",
      status: "Open",
      investment: 450.00,
      openPrice: 3450.25,
      openTime: "08/23 09:12:34",
      leverage: 15,
      pnl: 18.30,
      currentPrice: 3468.55,
      stopLoss: 3420.00,
      takeProfit: 3500.00,
      orderType: "Market",
      margin: 30.00,
      fee: 2.25
    },
    {
      id: 4,
      pair: "SOL/USDT",
      direction: "BUY DOWN",
      status: "Open",
      investment: 250.00,
      openPrice: 102.75,
      openTime: "08/23 10:45:21",
      leverage: 12,
      pnl: -5.25,
      currentPrice: 97.50,
      stopLoss: 105.00,
      takeProfit: 95.00,
      orderType: "Limit",
      margin: 20.83,
      fee: 1.25
    },
    {
      id: 5,
      pair: "BTC/USDT",
      direction: "BUY UP",
      status: "Open",
      investment: 1200.00,
      openPrice: 65820.50,
      openTime: "08/24 11:23:45",
      leverage: 10,
      pnl: 245.60,
      currentPrice: 66066.10,
      stopLoss: 65000.00,
      takeProfit: 67000.00,
      orderType: "Market",
      margin: 120.00,
      fee: 6.00
    }
  ]);

  // Mock data for recent orders
  const [recentOrders, setRecentOrders] = useState<Order[]>([
    {
      id: 1,
      pair: "BTC/USDT",
      direction: "BUY DOWN",
      status: "Closed",
      investment: 300.00,
      openPrice: 65983,
      openTime: "08/22 07:47:23",
      leverage: 10,
      pnl: -24.50,
      closePrice: 65958.50,
      closeTime: "08/22 08:15:42",
      orderType: "Market",
      margin: 30.00,
      fee: 1.50
    },
    {
      id: 2,
      pair: "BTC/USDT",
      direction: "BUY UP",
      status: "Closed",
      investment: 600.00,
      openPrice: 65881,
      openTime: "08/22 07:39:57",
      leverage: 20,
      pnl: 132.75,
      closePrice: 65913.75,
      closeTime: "08/22 08:22:18",
      orderType: "Market",
      margin: 30.00,
      fee: 3.00
    },
    {
      id: 6,
      pair: "ADA/USDT",
      direction: "BUY UP",
      status: "Closed",
      investment: 500.00,
      openPrice: 0.4550,
      openTime: "08/23 14:30:12",
      leverage: 15,
      pnl: 32.50,
      closePrice: 0.4582,
      closeTime: "08/23 15:45:33",
      orderType: "Limit",
      margin: 33.33,
      fee: 2.50
    }
  ]);

  // Format number with commas and fixed decimals
  const formatNumber = (num: string, decimals: number = 2) => {
    return Number(num).toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  };

  // Format volume in billions
  const formatVolume = (vol: string) => {
    const volumeNum = Number(vol);
    if (volumeNum >= 1000000000) {
      return (volumeNum / 1000000000).toFixed(2) + 'B';
    } else if (volumeNum >= 1000000) {
      return (volumeNum / 1000000).toFixed(2) + 'M';
    } else {
      return formatNumber(vol, 0);
    }
  };

  // Initialize chart
  const initializeChart = useCallback(() => {
    if (!chartContainerRef.current) return;
    
    // Clear previous chart if it exists
    if (chartInstanceRef.current) {
      chartContainerRef.current.innerHTML = '';
    }
    
    // Initialize the chart with auto-resize option and real-time updates
    chartInstanceRef.current = init(chartContainerRef.current, {
      autoResize: true,
      // Add animation for smoother transitions
      animation: {
        duration: 200,
        easing: 'linear'
      },
      // Enable real-time mode for continuous updates
      realTime: {
        enabled: true,
        interval: 1000  // Update every second
      }
    });
    
    // Set symbol
    chartInstanceRef.current.setSymbol({ ticker: selectedCoin });
    
    // Set period based on timeframe - always use 1m for real-time updates
    const periodMap: Record<string, { span: number, type: string }> = {
      '1m': { span: 1, type: 'minute' },
      '5m': { span: 5, type: 'minute' },
      '15m': { span: 15, type: 'minute' },
      '30m': { span: 30, type: 'minute' },
      '1h': { span: 1, type: 'hour' },
      '4h': { span: 4, type: 'hour' },
      '1d': { span: 1, type: 'day' },
      '1w': { span: 1, type: 'week' },
      '1M': { span: 1, type: 'month' }
    };
    
    const period = periodMap[timeframe] || { span: 1, type: 'minute' };
    chartInstanceRef.current.setPeriod(period);
  }, []);

  // Load historical data
  const loadHistoricalData = useCallback(async () => {
    if (!selectedCoin || !timeframe || !chartInstanceRef.current) return;
    
    setIsLoading(true);
    chartInstanceRef.current.setDataLoader({
      getBars: ({ callback }: { callback: (data: any) => void }) => {
        axios(`https://api.binance.com/api/v3/klines?symbol=${selectedCoin}&interval=${timeframe}&limit=100`)
          .then(dataList => {
            const formattedData = dataList.data.map((kline: any[]) => ({
              timestamp: kline[0],
              open: parseFloat(kline[1]),
              high: parseFloat(kline[2]),
              low: parseFloat(kline[3]),
              close: parseFloat(kline[4]),
              volume: parseFloat(kline[5]),
              turnover: parseFloat(kline[7])
            }));
            callback(formattedData);
            setIsLoading(false);
          })
          .catch(error => {
            console.error('Error loading chart data:', error);
            setIsLoading(false);
          });
      }
    });
  }, [selectedCoin, timeframe]);

  // WebSocket connection for ticker data (price, 24h stats)
  useEffect(() => {
    if (!selectedCoin) return;

    const connectTickerWebSocket = () => {
      // Close previous connection if it exists
      if (tickerWs.current) {
        tickerWs.current.close();
      }

      // Connect to ticker stream
      tickerWs.current = new WebSocket(`wss://stream.binance.com:9443/ws/${selectedCoin.toLowerCase()}@ticker`);

      tickerWs.current.onopen = () => {
        console.log(`Connected to ${selectedCoin} ticker stream`);
      };

      tickerWs.current.onmessage = (event: MessageEvent) => {
        const tickerData: BinanceTicker = JSON.parse(event.data);
        
        // Update market data - this is now the primary source for price updates
        setMarketPrice(tickerData.c);
        setPriceChangePercent(tickerData.P);
        setHighPrice(tickerData.h);
        setLowPrice(tickerData.l);
        setVolume(tickerData.v);
      };

      tickerWs.current.onerror = (error: Event) => {
        console.error('Ticker WebSocket error:', error);
      };

      tickerWs.current.onclose = (event: CloseEvent) => {
        console.log('Ticker WebSocket closed, attempting to reconnect...');
        
        // Auto-reconnect after a short delay
        setTimeout(() => {
          if (selectedCoin) {
            console.log('Attempting to reconnect ticker WebSocket...');
            connectTickerWebSocket();
          }
        }, 2000); // 2-second reconnection delay
      };
    };

    connectTickerWebSocket();

    return () => {
      if (tickerWs.current && tickerWs.current.readyState === WebSocket.OPEN) {
        tickerWs.current.close();
      }
    };
  }, [selectedCoin]);

  // WebSocket connection for trade data (recent trades)
  useEffect(() => {
    if (!selectedCoin) return;

    const connectTradeWebSocket = () => {
      // Close previous connection if it exists
      if (tradeWs.current) {
        tradeWs.current.close();
      }

      // Connect to trade stream
      tradeWs.current = new WebSocket(`wss://stream.binance.com:9443/ws/${selectedCoin.toLowerCase()}@trade`);

      tradeWs.current.onopen = () => {
        console.log(`Connected to ${selectedCoin} trade stream`);
      };

      tradeWs.current.onmessage = (event: MessageEvent) => {
        const tradeData: BinanceTrade = JSON.parse(event.data);
        
        // Add new trade to recent trades (limit to last 20 trades)
        setRecentTrades(prevTrades => {
          const newTrades = [tradeData, ...prevTrades.slice(0, 19)];
          return newTrades;
        });
      };

      tradeWs.current.onerror = (error: Event) => {
        console.error('Trade WebSocket error:', error);
      };

      tradeWs.current.onclose = (event: CloseEvent) => {
        console.log('Trade WebSocket closed, attempting to reconnect...');
        
        // Auto-reconnect after a short delay
        setTimeout(() => {
          if (selectedCoin) {
            console.log('Attempting to reconnect trade WebSocket...');
            connectTradeWebSocket();
          }
        }, 2000); // 2-second reconnection delay
      };
    };

    connectTradeWebSocket();

    return () => {
      if (tradeWs.current && tradeWs.current.readyState === WebSocket.OPEN) {
        tradeWs.current.close();
      }
    };
  }, [selectedCoin]);

  // WebSocket connection for kline data (real-time chart updates only)
  useEffect(() => {
    if (!selectedCoin || !chartInstanceRef.current) return;

    const connectKlineWebSocket = () => {
      // Close previous connection if it exists
      if (klineWs.current) {
        klineWs.current.close();
      }

      // Always use 1m as the default interval for real-time updates
      // This ensures the chart updates automatically regardless of the selected timeframe
      const streamInterval = '1m';
      
      klineWs.current = new WebSocket(
        `wss://stream.binance.com:9443/ws/${selectedCoin.toLowerCase()}@kline_${streamInterval}`
      );

      klineWs.current.onopen = () => {
        console.log(`Connected to ${selectedCoin} kline stream (${streamInterval})`);
      };

      klineWs.current.onmessage = (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data);
          
          // Check if we have kline data
          if (data.e === 'kline') {
            const kline = data.k;
            
            // Convert to chart format
            const chartKline = {
              timestamp: kline.t,
              open: parseFloat(kline.o),
              high: parseFloat(kline.h),
              low: parseFloat(kline.l),
              close: parseFloat(kline.c),
              volume: parseFloat(kline.v),
              turnover: parseFloat(kline.q)
            };
            
            // Store the last kline data for reference
            lastKlineRef.current = chartKline;
            
            // Update chart with new kline data
            if (chartInstanceRef.current) {
              // Direct update of the chart data
              chartInstanceRef.current.updateData(chartKline);
              
              // Force a visual refresh of the chart
              if ( chartInstanceRef.current.getWidth()) {
                const currentWidth = chartInstanceRef.current.getWidth();
                // This trick forces the chart to redraw without changing the data loader
                chartInstanceRef.current.resize(currentWidth - 1);
                setTimeout(() => {
                  if (chartInstanceRef.current) {
                    chartInstanceRef.current.resize(currentWidth);
                  }
                }, 10);
              }
            }
          }
        } catch (error) {
          console.error('Error processing kline data:', error);
        }
      };

      klineWs.current.onerror = (error: Event) => {
        console.error('Kline WebSocket error:', error);
      };
      
      klineWs.current.onclose = (event: CloseEvent) => {
        console.log('Kline WebSocket closed, attempting to reconnect...');
        
        // Auto-reconnect after a short delay
        setTimeout(() => {
          if (selectedCoin) {
            console.log('Attempting to reconnect kline WebSocket...');
            connectKlineWebSocket();
          }
        }, 2000); // 2-second reconnection delay
      };
    };

    connectKlineWebSocket();

    return () => {
      if (klineWs.current && klineWs.current.readyState === WebSocket.OPEN) {
        klineWs.current.close();
      }
    };
  }, [selectedCoin]); // Remove timeframe dependency to prevent reconnection when timeframe changes

  // Auto-refresh and WebSocket check interval references
  const autoRefreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Function to refresh chart data
  const refreshChartData = useCallback(() => {
    if (chartInstanceRef.current && selectedCoin) {
      // Force chart to refresh by triggering a resize event
      const currentWidth = chartInstanceRef.current.getWidth();
      if (currentWidth) {
        chartInstanceRef.current.resize(currentWidth);
      }
      
      // If we have last kline data, update it again to ensure real-time display
      if (lastKlineRef.current) {
        chartInstanceRef.current.updateData(lastKlineRef.current);
      }
    }
  }, [selectedCoin]);
  
  // Initialize chart and load data when component mounts or coin/timeframe changes
  useEffect(() => {
    initializeChart();
    loadHistoricalData();
    
    // Set up auto-refresh interval (every 1 second)
    if (autoRefreshIntervalRef.current) {
      clearInterval(autoRefreshIntervalRef.current);
    }
    
    autoRefreshIntervalRef.current = setInterval(() => {
      refreshChartData();
    }, 1000);
    
    return () => {
      // Clean up WebSocket connections and interval
      if (autoRefreshIntervalRef.current) clearInterval(autoRefreshIntervalRef.current);
      if (tradeWs.current) tradeWs.current.close();
      if (tickerWs.current) tickerWs.current.close();
      if (klineWs.current) klineWs.current.close();
    };
  }, [initializeChart, loadHistoricalData, refreshChartData]);

  const handleOpenCoinModal = () => {
    setIsCoinModalOpen(true);
  };

  const handleCloseCoinModal = () => {
    setIsCoinModalOpen(false);
  };

  const handleSelectCoin = (coin: string) => {
    setSelectedCoin(coin);
    setIsCoinModalOpen(false);
    // Reset recent trades when coin changes
    setRecentTrades([]);
  };

  const handleOpenModal = (direction: string) => {
    setTradeDirection(direction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTradeDirection(null);
  };

  const handleTimeframeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeframe(e.target.value);
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
    setOpenOrders(prev => prev.filter(order => order.id !== orderId));
    setIsOrderModalOpen(false);
  };

  return (
    <div className="container">
      {/* Header Section */}
      <div className="header">
        <div className="header-top">
          <div className="market-info">
            <div className="market-icon">
              <i className="fab fa-btc" />
            </div>
            <div className="market-name">{selectedCoin}</div>
            <div className="market-change" style={{ 
              color: priceChangePercent.startsWith('-') ? '#FF6838' : '#00C076' 
            }}>
              {priceChangePercent}%
            </div>
          </div>
          <div className="additional-actions" onClick={handleOpenCoinModal}>
            <i className="fas fa-filter" />
          </div>
        </div>
        <div className="market-price">${formatNumber(marketPrice)}</div>
        <div className="market-stats">
          <span>24h High: ${formatNumber(highPrice)}</span>
          <span>24h Vol: {formatVolume(volume)} {selectedCoin.replace('USDT', '')}</span>
          <span>24h Low: ${formatNumber(lowPrice)}</span>
        </div>
      </div>

      {/* Trading View Chart */}
      <div className="chart-container">
        {isLoading && (
          <div className="chart-loading">
            <i className="fas fa-spinner fa-spin" />
            <div>Loading chart data...</div>
          </div>
        )}
        <div 
          ref={chartContainerRef} 
          className="chart-placeholder" 
        />
        <div className="chart-controls">
          <select 
            className="chart-timeframe" 
            value={timeframe}
            onChange={handleTimeframeChange}
          >
            <option value="1m">1m</option>
            <option value="5m">5m</option>
            <option value="15m">15m</option>
            <option value="30m">30m</option>
            <option value="1h">1h</option>
            <option value="4h">4h</option>
            <option value="1d">1d</option>
            <option value="1w">1w</option>
            <option value="1M">1M</option>
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

      {/* Tabs for Recent Trades/Open Orders/Recent Orders */}
      <div className="section-tabs">
     
        <div 
          className={`tab ${activeTab === 'openOrders' ? 'active' : ''}`}
          onClick={() => setActiveTab('openOrders')}
        >
          Open Orders ({openOrders.length})
        </div>
        <div 
          className={`tab ${activeTab === 'recentOrders' ? 'active' : ''}`}
          onClick={() => setActiveTab('recentOrders')}
        >
          Recent Orders ({recentOrders.length})
        </div>
      </div>

    

      {/* Open Orders */}
      {activeTab === 'openOrders' && (
        <div className="orders-container">
          {openOrders.map((order) => (
            <div key={order.id} className="order-card" onClick={() => handleOpenOrderModal(order)}>
              <div className="order-header">
                <div className="order-pair">{order.pair}</div>
                <div className={`order-direction ${order.direction === 'BUY UP' ? 'buy' : 'sell'}`}>
                  {order.direction}
                </div>
              </div>
              <div className="order-status open">● {order.status}</div>
              <div className="order-details">
                <div className="order-row">
                  <span className="order-label">Investment:</span>
                  <span className="order-value">${order.investment.toFixed(2)}</span>
                </div>
                <div className="order-row">
                  <span className="order-label">Open Price:</span>
                  <span className="order-value">{formatNumber(order.openPrice.toString(), order.openPrice > 1000 ? 0 : 2)}</span>
                </div>
                <div className="order-row">
                  <span className="order-label">Current Price:</span>
                  <span className="order-value">{formatNumber(order.currentPrice?.toString() || '0', order.openPrice > 1000 ? 0 : 2)}</span>
                </div>
                <div className="order-row">
                  <span className="order-label">P/L:</span>
                  <span className={`order-value ${(order.pnl || 0) >= 0 ? 'buy' : 'sell'}`}>
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
        </div>
      )}

      {/* Recent Orders */}
      {activeTab === 'recentOrders' && (
        <div className="orders-container">
          {recentOrders.map((order) => (
            <div key={order.id} className="order-card" onClick={() => handleOpenOrderModal(order)}>
              <div className="order-header">
                <div className="order-pair">{order.pair}</div>
                <div className={`order-direction ${order.direction === 'BUY UP' ? 'buy' : 'sell'}`}>
                  {order.direction}
                </div>
              </div>
              <div className="order-status closed">● {order.status}</div>
              <div className="order-details">
                <div className="order-row">
                  <span className="order-label">Investment:</span>
                  <span className="order-value">${order.investment.toFixed(2)}</span>
                </div>
                <div className="order-row">
                  <span className="order-label">Open Price:</span>
                  <span className="order-value">{formatNumber(order.openPrice.toString(), order.openPrice > 1000 ? 0 : 2)}</span>
                </div>
                <div className="order-row">
                  <span className="order-label">Close Price:</span>
                  <span className="order-value">{formatNumber(order.closePrice?.toString() || '0', order.openPrice > 1000 ? 0 : 2)}</span>
                </div>
                <div className="order-row">
                  <span className="order-label">P/L:</span>
                  <span className={`order-value ${(order.pnl || 0) >= 0 ? 'buy' : 'sell'}`}>
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
                  <span className={`detail-direction ${selectedOrder.direction === 'BUY UP' ? 'buy' : 'sell'}`}>
                    {selectedOrder.direction}
                  </span>
                </div>
                <div className={`detail-status ${selectedOrder.status.toLowerCase()}`}>
                  ● {selectedOrder.status}
                </div>
              </div>

              <div className="order-detail-section">
                <h3>Order Information</h3>
                <div className="detail-row">
                  <span className="detail-label">Order Type:</span>
                  <span className="detail-value">{selectedOrder.orderType}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Investment:</span>
                  <span className="detail-value">${selectedOrder.investment.toFixed(2)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Leverage:</span>
                  <span className="detail-value">{selectedOrder.leverage}x</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Margin:</span>
                  <span className="detail-value">${selectedOrder.margin.toFixed(2)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Fee:</span>
                  <span className="detail-value">${selectedOrder.fee.toFixed(2)}</span>
                </div>
              </div>

              <div className="order-detail-section">
                <h3>Price Information</h3>
                <div className="detail-row">
                  <span className="detail-label">Open Price:</span>
                  <span className="detail-value">{formatNumber(selectedOrder.openPrice.toString(), selectedOrder.openPrice > 1000 ? 0 : 2)}</span>
                </div>
                {selectedOrder.currentPrice && (
                  <div className="detail-row">
                    <span className="detail-label">Current Price:</span>
                    <span className="detail-value">{formatNumber(selectedOrder.currentPrice.toString(), selectedOrder.openPrice > 1000 ? 0 : 2)}</span>
                  </div>
                )}
                {selectedOrder.closePrice && (
                  <div className="detail-row">
                    <span className="detail-label">Close Price:</span>
                    <span className="detail-value">{formatNumber(selectedOrder.closePrice.toString(), selectedOrder.openPrice > 1000 ? 0 : 2)}</span>
                  </div>
                )}
                <div className="detail-row">
                  <span className="detail-label">P/L:</span>
                  <span className={`detail-value ${(selectedOrder.pnl || 0) >= 0 ? 'profit' : 'loss'}`}>
                    ${selectedOrder.pnl?.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="order-detail-section">
                <h3>Time Information</h3>
                <div className="detail-row">
                  <span className="detail-label">Open Time:</span>
                  <span className="detail-value">{selectedOrder.openTime}</span>
                </div>
                {selectedOrder.closeTime && (
                  <div className="detail-row">
                    <span className="detail-label">Close Time:</span>
                    <span className="detail-value">{selectedOrder.closeTime}</span>
                  </div>
                )}
              </div>

              {selectedOrder.status === "Open" && (
                <div className="order-detail-section">
                  <h3>Risk Management</h3>
                  {selectedOrder.stopLoss && (
                    <div className="detail-row">
                      <span className="detail-label">Stop Loss:</span>
                      <span className="detail-value">{formatNumber(selectedOrder.stopLoss.toString(), selectedOrder.openPrice > 1000 ? 0 : 2)}</span>
                    </div>
                  )}
                  {selectedOrder.takeProfit && (
                    <div className="detail-row">
                      <span className="detail-label">Take Profit:</span>
                      <span className="detail-value">{formatNumber(selectedOrder.takeProfit.toString(), selectedOrder.openPrice > 1000 ? 0 : 2)}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="modal-footer">
              {selectedOrder.status === "Open" && (
                <button 
                  className="close-order-button"
                  onClick={() => handleCloseOrder(selectedOrder.id)}
                >
                  Close Order
                </button>
              )}
              <button className="modal-button" onClick={handleCloseOrderModal}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}

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
        
        /* Recent Trades */
        .recent-trades {
          margin: 15px;
          max-height: 300px;
          overflow-y: auto;
        }
        
        .trades-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 12px;
          color: #777;
          position: sticky;
          top: 0;
          background-color: #000;
          padding: 5px 0;
          z-index: 10;
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
          font-size: 11px;
        }
        
        .buy-trade .trade-price {
          color: #00C076;
        }
        
        .sell-trade .trade-price {
          color: #FF6838;
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
        
        .order-card:hover {
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