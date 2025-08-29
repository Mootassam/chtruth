import React, { useState, useEffect, useRef } from "react";

// Interface for Binance kline data
interface BinanceKline {
  t: number; // Kline start time
  T: number; // Kline close time
  s: string; // Symbol
  i: string; // Interval
  f: number; // First trade ID
  L: number; // Last trade ID
  o: string; // Open price
  c: string; // Close price
  h: string; // High price
  l: string; // Low price
  v: string; // Volume
  n: number; // Number of trades
  x: boolean; // Is this kline closed?
  q: string; // Quote asset volume
  V: string; // Taker buy base asset volume
  Q: string; // Taker buy quote asset volume
  B: string; // Ignore
}

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
  const [timeframe, setTimeframe] = useState("1m");
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const tradeWs = useRef<WebSocket | null>(null);
  const tickerWs = useRef<WebSocket | null>(null);
  const klineWs = useRef<WebSocket | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const currentPriceRef = useRef<number>(0);

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

  // Fetch historical kline data
  const fetchHistoricalData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${selectedCoin}&interval=${timeframe}&limit=100`
      );
      const data = await response.json();
      
      const formattedData = data.map((kline: any[]) => ({
        time: kline[0] / 1000, // Convert to seconds
        open: parseFloat(kline[1]),
        high: parseFloat(kline[2]),
        low: parseFloat(kline[3]),
        close: parseFloat(kline[4]),
        volume: parseFloat(kline[5])
      }));
      
      setChartData(formattedData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching historical data:', error);
      setIsLoading(false);
    }
  };

  // WebSocket connection for ticker data (price, 24h stats)
  useEffect(() => {
    if (!selectedCoin) return;

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
      
      // Update market data
      setMarketPrice(tickerData.c);
      setPriceChangePercent(tickerData.P);
      setHighPrice(tickerData.h);
      setLowPrice(tickerData.l);
      setVolume(tickerData.v);
      
      // Update current price for chart
      currentPriceRef.current = parseFloat(tickerData.c);
    };

    tickerWs.current.onerror = (error: Event) => {
      console.error('Ticker WebSocket error:', error);
    };

    return () => {
      if (tickerWs.current && tickerWs.current.readyState === WebSocket.OPEN) {
        tickerWs.current.close();
      }
    };
  }, [selectedCoin]);

  // WebSocket connection for trade data (recent trades)
  useEffect(() => {
    if (!selectedCoin) return;

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

    return () => {
      if (tradeWs.current && tradeWs.current.readyState === WebSocket.OPEN) {
        tradeWs.current.close();
      }
    };
  }, [selectedCoin]);

  // WebSocket connection for kline data (real-time chart updates)
  useEffect(() => {
    if (!selectedCoin) return;

    // Close previous connection if it exists
    if (klineWs.current) {
      klineWs.current.close();
    }

    // Connect to kline stream
    const intervalMap: Record<string, string> = {
      '1m': '1m',
      '5m': '5m',
      '15m': '15m',
      '30m': '30m',
      '1h': '1h',
      '4h': '4h',
      '1d': '1d',
      '1w': '1w',
      '1M': '1M'
    };
    
    const streamInterval = intervalMap[timeframe] || '1m';
    klineWs.current = new WebSocket(
      `wss://stream.binance.com:9443/ws/${selectedCoin.toLowerCase()}@kline_${streamInterval}`
    );

    klineWs.current.onopen = () => {
      console.log(`Connected to ${selectedCoin} kline stream (${timeframe})`);
    };

    klineWs.current.onmessage = (event: MessageEvent) => {
      const klineData: BinanceKline = JSON.parse(event.data);
      const kline = klineData.k;
      
      // Update chart data with new kline
      setChartData(prevData => {
        const newData = [...prevData];
        const existingIndex = newData.findIndex(d => d.time === kline.t / 1000);
        
        const newKline = {
          time: kline.t / 1000, // Convert to seconds
          open: parseFloat(kline.o),
          high: parseFloat(kline.h),
          low: parseFloat(kline.l),
          close: parseFloat(kline.c),
          volume: parseFloat(kline.v)
        };
        
        if (existingIndex >= 0) {
          // Update existing kline
          newData[existingIndex] = newKline;
        } else {
          // Add new kline (remove oldest if at limit)
          if (newData.length >= 100) {
            newData.shift();
          }
          newData.push(newKline);
        }
        
        return newData;
      });
    };

    klineWs.current.onerror = (error: Event) => {
      console.error('Kline WebSocket error:', error);
    };

    return () => {
      if (klineWs.current && klineWs.current.readyState === WebSocket.OPEN) {
        klineWs.current.close();
      }
    };
  }, [selectedCoin, timeframe]);

  // Fetch historical data when coin or timeframe changes
  useEffect(() => {
    fetchHistoricalData();
  }, [selectedCoin, timeframe]);

  // Draw chart on canvas
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current || chartData.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Calculate chart dimensions
    const padding = 20;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    // Find min and max values for scaling
    const prices = chartData.map(d => [d.high, d.low, d.open, d.close]).flat();
    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);
    const priceRange = maxPrice - minPrice;
    
    // Calculate bar width
    const barWidth = chartWidth / chartData.length * 0.7;
    const barSpacing = chartWidth / chartData.length * 0.3;
    
    // Draw grid lines
    ctx.strokeStyle = '#2A2A2A';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }
    
    // Draw each candlestick
    chartData.forEach((data, index) => {
      const x = padding + index * (barWidth + barSpacing);
      const openY = padding + chartHeight - ((data.open - minPrice) / priceRange) * chartHeight;
      const closeY = padding + chartHeight - ((data.close - minPrice) / priceRange) * chartHeight;
      const highY = padding + chartHeight - ((data.high - minPrice) / priceRange) * chartHeight;
      const lowY = padding + chartHeight - ((data.low - minPrice) / priceRange) * chartHeight;
      
      // Determine color based on price movement
      const isGreen = data.close > data.open;
      ctx.strokeStyle = isGreen ? '#00C076' : '#FF6838';
      ctx.fillStyle = isGreen ? '#00C076' : '#FF6838';
      
      // Draw high-low line
      ctx.beginPath();
      ctx.moveTo(x + barWidth / 2, highY);
      ctx.lineTo(x + barWidth / 2, lowY);
      ctx.stroke();
      
      // Draw candle body
      if (isGreen) {
        // Green candle (price went up)
        ctx.fillRect(x, closeY, barWidth, openY - closeY);
        ctx.strokeRect(x, closeY, barWidth, openY - closeY);
      } else {
        // Red candle (price went down)
        ctx.fillRect(x, openY, barWidth, closeY - openY);
        ctx.strokeRect(x, openY, barWidth, closeY - openY);
      }
    });
    
    // Draw current price line
    if (currentPriceRef.current > 0) {
      const currentY = padding + chartHeight - ((currentPriceRef.current - minPrice) / priceRange) * chartHeight;
      
      ctx.strokeStyle = '#F3BA2F';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(padding, currentY);
      ctx.lineTo(width - padding, currentY);
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Draw price label
      ctx.fillStyle = '#F3BA2F';
      ctx.font = '12px Arial';
      ctx.fillText(`$${formatNumber(currentPriceRef.current.toString())}`, width - padding - 80, currentY - 5);
    }
    
    // Draw axis labels
    ctx.fillStyle = '#7E7E7E';
    ctx.font = '10px Arial';
    ctx.textAlign = 'right';
    
    // Y-axis labels
    for (let i = 0; i <= 5; i++) {
      const price = minPrice + (priceRange / 5) * (5 - i);
      const y = padding + (chartHeight / 5) * i;
      ctx.fillText(`$${formatNumber(price.toString())}`, padding - 5, y + 3);
    }
    
    // X-axis labels (time)
    ctx.textAlign = 'center';
    if (chartData.length > 0) {
      const firstTime = new Date(chartData[0].time * 1000);
      const lastTime = new Date(chartData[chartData.length - 1].time * 1000);
      
      ctx.fillText(firstTime.toLocaleTimeString(), padding, height - 5);
      ctx.fillText(lastTime.toLocaleTimeString(), width - padding, height - 5);
    }
  }, [chartData, timeframe, selectedCoin]);

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
      <div className="chart-container" ref={containerRef}>
        {isLoading ? (
          <div className="chart-loading">
            <i className="fas fa-spinner fa-spin" />
            <div>Loading chart data...</div>
          </div>
        ) : (
          <canvas ref={canvasRef} className="chart-canvas" />
        )}
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
          height: 300px;
          background-color: #1A1A1A;
          margin: 15px;
          border-radius: 12px;
          position: relative;
          overflow: hidden;
        }
        
        .chart-canvas {
          width: 100%;
          height: 100%;
        }
        
        .chart-loading {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
          color: #777;
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