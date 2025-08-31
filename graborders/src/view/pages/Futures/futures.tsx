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

// Dark theme configuration
const darkTheme = {
  grid: {
    horizontal: {
      color: '#2A2A2A'
    },
    vertical: {
      color: '#2A2A2A'
    }
  },
  candle: {
    priceMark: {
      high: {
        color: '#DDD'
      },
      low: {
        color: '#DDD'
      },
      last: {
        upColor: '#00C076',
        downColor: '#FF6838',
        noChangeColor: '#AAAAAA'
      }
    },
    tooltip: {
      rect: {
        color: '#1E1E1F',
        borderColor: '#3A3A3A'
      },
      text: {
        color: '#DDD'
      }
    },
    bar: {
      upColor: '#00C076',
      downColor: '#FF6838',
      noChangeColor: '#AAAAAA'
    }
  },
  indicator: {
    bars: [
      {
        color: '#00C076',
        borderColor: '#00C076'
      }
    ],
    line: {
      size: 2,
      colors: ['#FF9600', '#9D65C9', '#2196F3', '#E11F1C', '#0CB1C1']
    },
    lastValueMark: {
      text: {
        color: '#DDD'
      }
    },
    tooltip: {
      rect: {
        color: '#1E1E1F',
        borderColor: '#3A3A3A'
      },
      text: {
        color: '#DDD'
      }
    }
  },
  xAxis: {
    axisLine: {
      color: '#3A3A3A'
    },
    tickLine: {
      color: '#3A3A3A'
    },
    tickText: {
      color: '#7E7E7E'
    }
  },
  yAxis: {
    axisLine: {
      color: '#3A3A3A'
    },
    tickLine: {
      color: '#3A3A3A'
    },
    tickText: {
      color: '#7E7E7E'
    }
  },
  separator: {
    color: '#2A2A2A'
  },
  crosshair: {
    horizontal: {
      line: {
        color: '#3A3A3A'
      },
      text: {
        color: '#DDD'
      }
    },
    vertical: {
      line: {
        color: '#3A3A3A'
      },
      text: {
        color: '#DDD'
      }
    }
  }
};

function Futures() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tradeDirection, setTradeDirection] = useState(null);
  const [isCoinModalOpen, setIsCoinModalOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState("BTCUSDT");
  const [marketPrice, setMarketPrice] = useState("0");
  const [priceChangePercent, setPriceChangePercent] = useState("0");
  const [highPrice, setHighPrice] = useState("0");
  const [lowPrice, setLowPrice] = useState("0");
  const [volume, setVolume] = useState("0");
  const [recentTrades, setRecentTrades] = useState<BinanceTrade[]>([]);
  // Default timeframe is set to 1m for the chart
  const [timeframe, setTimeframe] = useState("1m");
  const [isLoading, setIsLoading] = useState(true);
  
  const tradeWs = useRef<WebSocket | null>(null);
  const tickerWs = useRef<WebSocket | null>(null);
  const klineWs = useRef<WebSocket | null>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<any>(null);
  const lastKlineRef = useRef<any>(null);

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
    
    // Apply dark theme
    // chartInstanceRef.current.setStyle(darkTheme);
    
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
    
    // Set up an interval to check WebSocket connections and reconnect if needed

    
    // Set up auto-refresh interval (every 1 second)
    if (autoRefreshIntervalRef.current) {
      clearInterval(autoRefreshIntervalRef.current);
    }
    
    autoRefreshIntervalRef.current = setInterval(() => {
      refreshChartData();
    }, 1000);
    
    return () => {
      // Clean up WebSocket connections and interval
      // wsCheckInterval was not defined, removing this line since setInterval cleanup is handled elsewhere
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

      {/* Recent Trades */}
      <div className="section-title">Recent Trades (Live)</div>
      <div className="recent-trades">
        <div className="trades-header">
          <span>Price (USDT)</span>
          <span>Amount</span>
          <span>Time</span>
        </div>
        {recentTrades.map((trade, index) => (
          <div 
            key={`${trade.t}-${index}`} 
            className={`trade-row ${trade.m ? 'sell-trade' : 'buy-trade'}`}
          >
            <div className="trade-price">{formatNumber(trade.p)}</div>
            <div className="trade-amount">{Number(trade.q).toFixed(4)}</div>
            <div className="trade-time">
              {new Date(trade.T).toLocaleTimeString()}
            </div>
          </div>
        ))}
        {recentTrades.length === 0 && (
          <div className="trade-row">
            <div className="trade-price" style={{ textAlign: 'center', width: '100%' }}>
              Waiting for trades...
            </div>
          </div>
        )}
      </div>

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
          color: '#AAAAAA';
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
        
        /* Section Titles */
        .section-title {
          font-size: 16px;
          font-weight: bold;
          margin: 20px 15px 15px;
          padding-bottom: 10px;
          border-bottom: 1px solid #2A2A2A;
        }
        
        .additional-actions {
          color: #AAAAAA;
          font-size: 20px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

export default Futures;