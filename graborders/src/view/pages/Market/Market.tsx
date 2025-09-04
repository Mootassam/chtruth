import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";

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
  p: string; // Price change
}

// Interface for cryptocurrency data
interface CryptoData {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changePercent: string;
  volume: string;
  volumeFormatted: string;
  isPositive: boolean;
  lastUpdated?: number;
}

// Cache key for local storage
const CRYPTO_CACHE_KEY = 'crypto_market_data_cache';
const CACHE_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds

// Predefined popular symbols to reduce initial load
const POPULAR_SYMBOLS = [
  'BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'ADAUSDT', 'XRPUSDT', 
  'SOLUSDT', 'DOTUSDT', 'DOGEUSDT', 'AVAXUSDT', 'MATICUSDT',
  'LTCUSDT', 'LINKUSDT', 'ATOMUSDT', 'UNIUSDT', 'XLMUSDT'
];

// Loading placeholder component
const MarketPlaceholder = () => (
  <div className="market-placeholder">
    {[...Array(10)].map((_, index) => (
      <div key={index} className="market-item-placeholder">
        <div className="crypto-info-placeholder">
          <div className="crypto-icon-placeholder shimmer"></div>
          <div className="crypto-details-placeholder">
            <div className="placeholder-line shimmer" style={{width: '60%', height: '16px', marginBottom: '8px'}}></div>
            <div className="placeholder-line shimmer" style={{width: '40%', height: '12px'}}></div>
          </div>
        </div>
        <div className="price-info-placeholder">
          <div className="placeholder-line shimmer" style={{width: '70px', height: '16px', marginBottom: '8px'}}></div>
          <div className="placeholder-line shimmer" style={{width: '50px', height: '12px'}}></div>
        </div>
        <div className="chart-placeholder shimmer"></div>
      </div>
    ))}
  </div>
);

// Optimized virtualization component with windowing
const VirtualizedList = React.memo(({ items, renderItem, itemHeight, containerHeight }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);
  const requestRef = useRef(null);
  const lastScrollTime = useRef(Date.now());
  const isScrolling = useRef(false);

  const handleScroll = useCallback(() => {
    const now = Date.now();
    lastScrollTime.current = now;
    isScrolling.current = true;
    
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    
    requestRef.current = requestAnimationFrame(() => {
      if (containerRef.current) {
        setScrollTop(containerRef.current.scrollTop);
      }
      
      // Check if scrolling has stopped
      const timeSinceLastScroll = Date.now() - lastScrollTime.current;
      if (timeSinceLastScroll > 100) {
        isScrolling.current = false;
      } else {
        requestRef.current = requestAnimationFrame(handleScroll);
      }
    });
  }, []);

  // Calculate visible range with overscan
  const overscanCount = 10; // Number of items to render above/below visible area
  const totalHeight = items.length * itemHeight;
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscanCount);
  const endIndex = Math.min(
    items.length - 1,
    startIndex + Math.ceil(containerHeight / itemHeight) + overscanCount * 2
  );

  // Memoize visible items to prevent unnecessary re-renders
  const visibleItems = useMemo(() => 
    items.slice(startIndex, endIndex + 1), 
    [items, startIndex, endIndex]
  );

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ height: containerHeight, overflow: "auto" }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        {visibleItems.map((item, index) => (
          <div
            key={item.symbol}
            style={{
              position: "absolute",
              top: (startIndex + index) * itemHeight,
              left: 0,
              right: 0,
              height: itemHeight,
              willChange: 'transform', // Optimize for GPU acceleration
              transform: 'translateZ(0)', // Force GPU acceleration
            }}
          >
            {renderItem(item, isScrolling.current)}
          </div>
        ))}
      </div>
    </div>
  );
});

// Optimized debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
      timeoutRef.current = null;
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay]);

  return debouncedValue;
};

// Helper function to load cached data
const loadCachedData = () => {
  try {
    const cachedData = localStorage.getItem(CRYPTO_CACHE_KEY);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      const now = Date.now();
      
      // Check if cache is still valid
      if (now - timestamp < CACHE_EXPIRY_TIME) {
        return data;
      }
    }
  } catch (error) {
    console.error('Error loading cached data:', error);
  }
  return null;
};

// Helper function to save data to cache
const saveDataToCache = (data) => {
  try {
    const cacheData = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(CRYPTO_CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Error saving data to cache:', error);
  }
};

function Market() {
  const [cryptoData, setCryptoData] = useState<{ [key: string]: CryptoData }>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const ws = useRef<WebSocket | null>(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const updateCountRef = useRef(0); // Track update count for performance optimization

  // Fetch only popular trading pairs initially from Binance REST API
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        
        // Initialize with popular symbols only to reduce initial load
        const initialData: { [key: string]: CryptoData } = {};
        
        POPULAR_SYMBOLS.forEach((symbol) => {
          const baseSymbol = symbol.replace("USDT", "");
          initialData[symbol] = {
            symbol,
            name: `${baseSymbol}/USDT`,
            price: "0",
            change: "0",
            changePercent: "0",
            volume: "0",
            volumeFormatted: "0",
            isPositive: true,
          };
        });

        setCryptoData(initialData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error initializing data:", error);
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Optimized data fetching with REST API, WebSocket, and caching
  useEffect(() => {
    // First try to load from cache to show data immediately
    const cachedData = loadCachedData();
    if (cachedData && Object.keys(cachedData).length > 0) {
      setCryptoData(cachedData);
      setIsLoading(false);
    }
    
    // Initial data fetch using REST API (much faster than waiting for WebSocket)
    const fetchAllPrices = async () => {
      try {
        if (!cachedData) setIsLoading(true);
        
        const response = await fetch('https://api.binance.com/api/v3/ticker/24hr');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        
        // Process only USDT pairs to reduce data size
        const usdtPairs = data.filter(item => 
          item.symbol.endsWith('USDT') && 
          !item.symbol.includes('UP') && 
          !item.symbol.includes('DOWN') &&
          !item.symbol.includes('BEAR') && 
          !item.symbol.includes('BULL')
        );
        
        // Sort by volume to get most important pairs
        usdtPairs.sort((a, b) => parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume));
        
        // Take top 100 pairs by volume
        const topPairs = usdtPairs.slice(0, 100);
        
        const formattedData: { [key: string]: CryptoData } = {};
        
        topPairs.forEach(item => {
          const symbol = item.symbol;
          const baseSymbol = symbol.replace("USDT", "");
          const isPositive = !item.priceChangePercent.startsWith("-");
          const changePercent = Math.abs(Number(item.priceChangePercent)).toFixed(2);
          
          // Format volume
          const volumeNum = Number(item.volume);
          let volumeFormatted = volumeNum.toFixed(0);
          if (volumeNum >= 1000000000) {
            volumeFormatted = (volumeNum / 1000000000).toFixed(1) + "B";
          } else if (volumeNum >= 1000000) {
            volumeFormatted = (volumeNum / 1000000).toFixed(1) + "M";
          }
          
          formattedData[symbol] = {
            symbol,
            name: `${baseSymbol}/USDT`,
            price: Number(item.lastPrice).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: Number(item.lastPrice) < 1 ? 6 : 4,
            }),
            change: item.priceChange,
            changePercent: changePercent,
            volume: item.volume,
            volumeFormatted: volumeFormatted,
            isPositive: isPositive,
            lastUpdated: Date.now()
          };
        });
        
        setCryptoData(formattedData);
        setIsLoading(false);
        
        // Save data to cache
        saveDataToCache(formattedData);
        
        // Store symbols for WebSocket subscription
        return Object.keys(formattedData);
      } catch (error) {
        console.error("Error fetching market data:", error);
        setIsLoading(false);
        return POPULAR_SYMBOLS; // Fallback to popular symbols
      }
    };
    
    // Setup WebSocket for real-time updates
    const setupWebSocket = (symbols: string[]) => {
      // Close existing connection if any
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.close();
      }
      
      // Create individual streams for top symbols (more efficient than all tickers)
      const streams = symbols.map(symbol => `${symbol.toLowerCase()}@ticker`).join('/');
      ws.current = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`);
      
      ws.current.onopen = () => {
        console.log("Connected to Binance selective streams");
      };
      
      // Use a more efficient update strategy with requestAnimationFrame
      let pendingUpdates: { [key: string]: any } = {};
      let animationFrameId: number | null = null;
      let lastUpdateTime = Date.now();
      let updateCount = 0;
      
      const processUpdates = () => {
        setCryptoData(prev => {
          const updatedData = { ...prev };
          let hasChanges = false;
          
          Object.entries(pendingUpdates).forEach(([symbol, data]) => {
            if (updatedData[symbol]) {
              const isPositive = !data.P.startsWith("-");
              const changePercent = Math.abs(Number(data.P)).toFixed(2);
              
              // Format volume
              const volumeNum = Number(data.v);
              let volumeFormatted = volumeNum.toFixed(0);
              if (volumeNum >= 1000000000) {
                volumeFormatted = (volumeNum / 1000000000).toFixed(1) + "B";
              } else if (volumeNum >= 1000000) {
                volumeFormatted = (volumeNum / 1000000).toFixed(1) + "M";
              }
              
              updatedData[symbol] = {
                ...updatedData[symbol],
                price: Number(data.c).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: Number(data.c) < 1 ? 6 : 4,
                }),
                change: data.p,
                changePercent: changePercent,
                volume: data.v,
                volumeFormatted: volumeFormatted,
                isPositive: isPositive,
                lastUpdated: Date.now()
              };
              
              hasChanges = true;
            }
          });
          
          pendingUpdates = {};
          
          // Save to cache periodically (every 20 updates)
          updateCount++;
          if (updateCount % 20 === 0) {
            saveDataToCache(updatedData);
          }
          
          return hasChanges ? updatedData : prev;
        });
        
        animationFrameId = null;
        lastUpdateTime = Date.now();
      };
      
      ws.current.onmessage = (event: MessageEvent) => {
        try {
          const response = JSON.parse(event.data);
          const data = response.data;
          
          // Add to pending updates
          if (data && data.s) {
            pendingUpdates[data.s] = data;
            
            // Schedule update on next animation frame if not already scheduled
            // and throttle updates to prevent excessive renders
            if (!animationFrameId) {
              const now = Date.now();
              const timeSinceLastUpdate = now - lastUpdateTime;
              
              if (timeSinceLastUpdate > 100) { // Limit to 10 updates per second
                animationFrameId = requestAnimationFrame(processUpdates);
              } else {
                // Delay the update to maintain frame rate
                setTimeout(() => {
                  if (!animationFrameId) {
                    animationFrameId = requestAnimationFrame(processUpdates);
                  }
                }, 100 - timeSinceLastUpdate);
              }
            }
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };
      
      ws.current.onerror = (error: Event) => {
        console.error("Market WebSocket error:", error);
      };
      
      ws.current.onclose = () => {
        console.log("Market connection closed");
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
        
        // Try to reconnect after a delay
        setTimeout(() => {
          if (ws.current === null) {
            setupWebSocket(symbols);
          }
        }, 5000);
      };
      
      return () => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
          ws.current.close();
        }
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    };
    
    // Main execution flow
    const initializeData = async () => {
      // If we have cached data, don't show loading state
      if (!cachedData) setIsLoading(true);
      const symbols = await fetchAllPrices();
      return setupWebSocket(symbols);
    };
    
    const cleanup = initializeData();
    return () => {
      cleanup.then(cleanupFn => cleanupFn && cleanupFn());
    };
  }, []);

  // Memoized filter and sort functions with optimized performance
  const filterBySearch = useCallback((crypto) => {
    const searchTermLower = debouncedSearchTerm.toLowerCase();
    return crypto.name.toLowerCase().includes(searchTermLower) ||
           crypto.symbol.toLowerCase().includes(searchTermLower);
  }, [debouncedSearchTerm]);

  const sortByVolume = useCallback((a, b) => Number(b.volume) - Number(a.volume), []);
  const sortGainers = useCallback((a, b) => Number(b.changePercent) - Number(a.changePercent), []);
  const sortLosers = useCallback((a, b) => Number(a.changePercent) - Number(b.changePercent), []);

  // Filter and sort cryptocurrencies with optimizations
  const filteredCrypto = useMemo(() => {
    const cryptoArray = Object.values(cryptoData);
    
    if (cryptoArray.length === 0) return [];

    let filtered = cryptoArray;

    // Apply search filter - optimize by pre-computing lowercase search term
    if (debouncedSearchTerm) {
      filtered = filtered.filter(filterBySearch);
    }

    // Apply tab filters with optimized sorting
    switch (activeTab) {
      case "Gainers":
        return filtered
          .filter((crypto) => crypto.isPositive)
          .sort(sortGainers);
      case "Losers":
        return filtered
          .filter((crypto) => !crypto.isPositive)
          .sort(sortLosers);
      case "Favorites":
        return filtered.filter((crypto) =>
          ["BTCUSDT", "ETHUSDT", "BNBUSDT"].includes(crypto.symbol)
        ).sort(sortByVolume);
      default:
        return filtered.sort(sortByVolume);
    }
  }, [cryptoData, debouncedSearchTerm, activeTab, filterBySearch, sortByVolume, sortGainers, sortLosers]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleTabClick = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  const renderCryptoItem = useCallback((crypto) => (
    <div key={crypto.symbol} className="market-item">
      <Link
        to={`/market/detail/${crypto.symbol}`}
        className="crypto-info remove_blue"
      >
        <div className="crypto-icon">
          <img
            src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${
              crypto.name.split("/")[0]
            }.png`}
            style={{ width: 40, height: 40 }}
            alt={crypto.name.split("/")[0]}
            loading="lazy"
          />
        </div>
        <div>
          <div className="crypto-name">{crypto.name}</div>
          <div className="crypto-volume">
            Vol: {crypto.volumeFormatted}
          </div>
        </div>
      </Link>
      <div className="price-info">
        <div className="price">${crypto.price}</div>
        <div
          className={`change ${
            crypto.isPositive ? "positive" : "negative"
          }`}
        >
          {crypto.isPositive ? "+" : ""}
          {crypto.changePercent}%
        </div>
      </div>
      <div className="chart">
        <i
          className="fas fa-chart-line"
          style={{ color: crypto.isPositive ? "#00C076" : "#FF6838" }}
        />
      </div>
    </div>
  ), []);

  return (
    <div className="container">
      {/* Header Section */}
      <div className="market-headers">
        <div className="market-page-title">Markets</div>
        {/* Search Bar */}
        <div className="search-bar">
          <i className="fas fa-search" style={{ color: "#AAAAAA" }} />
          <input
            type="text"
            placeholder="Search crypto"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <button 
              className="clear-search" 
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Market Tabs */}
      <div className="market-tabs">
        {["All", "Gainers", "Losers", "Favorites"].map((tab) => (
          <div
            key={tab}
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </div>
        ))}
      </div>
      
      <div className="market-list">
        {isLoading && Object.keys(cryptoData).length === 0 ? (
          <MarketPlaceholder />
        ) : filteredCrypto.length > 0 ? (
          <>
            <VirtualizedList
              items={filteredCrypto}
              renderItem={renderCryptoItem}
              itemHeight={80}
              containerHeight={500}
            />
          </>
        ) : (
          <div className="no-results">
            <i
              className="fas fa-search"
              style={{ fontSize: "24px", marginBottom: "10px" }}
            />
            <div>No cryptocurrencies found</div>
          </div>
        )}
      </div>

      <style>{`
        /* Shimmer animation for loading placeholders */
        @keyframes shimmer {
          0% {
            background-position: -468px 0;
          }
          100% {
            background-position: 468px 0;
          }
        }
        
        .shimmer {
          animation-duration: 1.5s;
          animation-fill-mode: forwards;
          animation-iteration-count: infinite;
          animation-name: shimmer;
          animation-timing-function: linear;
          background: #2A2A2A;
          background: linear-gradient(to right, #2A2A2A 8%, #333333 18%, #2A2A2A 33%);
          background-size: 800px 104px;
          position: relative;
          border-radius: 4px;
        }
        
        .market-placeholder {
          margin-top: 16px;
        }
        
        .market-item-placeholder {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 0;
          border-bottom: 1px solid #2A2A2A;
        }
        
        .crypto-info-placeholder {
          display: flex;
          align-items: center;
          flex: 1;
        }
        
        .crypto-icon-placeholder {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 12px;
        }
        
        .crypto-details-placeholder {
          flex: 1;
        }
        
        .price-info-placeholder {
          text-align: right;
          margin-right: 15px;
          flex: 1;
        }
        
        .chart-placeholder {
          width: 18px;
          height: 18px;
          border-radius: 4px;
        }
        
        .placeholder-line {
          border-radius: 4px;
          margin-bottom: 8px;
        }
        
        .container {
          max-width: 400px;
          margin: 0 auto;
          padding: 20px 15px;
          background-color: #000000;
          color: #FFFFFF;
          min-height: 100vh;
        }
        
        .market-headers {
          margin-bottom: 20px;
        }
        
        .market-page-title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 15px;
        }
        
        .search-bar {
          display: flex;
          align-items: center;
          background-color: #1A1A1A;
          border-radius: 8px;
          padding: 10px 15px;
        }
        
        .search-bar i {
          margin-right: 10px;
        }
        
        .search-bar input {
          background: none;
          border: none;
          color: #FFFFFF;
          width: 100%;
          outline: none;
        }
        
        .market-tabs {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          border-bottom: 1px solid #2A2A2A;
        }
        
        .tab {
          padding: 10px 0;
          cursor: pointer;
          color: #AAAAAA;
          position: relative;
          font-size: 14px;
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
          background-color: #F3BA2F;
        }
        
        .market-list {
          max-height: calc(100vh - 200px);
        }
        
        .market-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 0;
          border-bottom: 1px solid #2A2A2A;
        }
        
        .crypto-info {
          display: flex;
          align-items: center;
          flex: 1;
          text-decoration: none;
        }
        
        .remove_blue {
          color: inherit;
          text-decoration: none;
        }
        
        .crypto-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 12px;
          font-size: 18px;
        }
        
        .crypto-name {
          font-weight: bold;
          margin-bottom: 4px;
          font-size: 14px;
        }
        
        .crypto-volume {
          font-size: 12px;
          color: #AAAAAA;
        }
        
        .price-info {
          text-align: right;
          margin-right: 15px;
          flex: 1;
        }
        
        .price {
          font-weight: bold;
          margin-bottom: 4px;
          font-size: 14px;
        }
        
        .change {
          font-size: 12px;
        }
        
        .change.positive {
          color: #00C076;
        }
        
        .change.negative {
          color: #FF6838;
        }
        
        .chart {
          font-size: 18px;
        }
        
        .no-results {
          text-align: center;
          padding: 40px 0;
          color: #777;
        }
      `}</style>
    </div>
  );
}

export default React.memo(Market);