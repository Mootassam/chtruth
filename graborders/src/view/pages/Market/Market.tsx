import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import CryptoImage from "src/view/shared/image/Image";

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
  icon: string;
  iconColor: string;
  price: string;
  change: string;
  changePercent: string;
  volume: string;
  volumeFormatted: string;
  isPositive: boolean;
}

// Icon mapping function
const getCryptoIcon = (symbol: string) => {
  const baseSymbol = symbol.replace("USDT", "");

  const iconMap: { [key: string]: { icon: string; color: string } } = {
    BTC: { icon: "fab fa-bitcoin", color: "#F7931A" },
    ETH: { icon: "fab fa-ethereum", color: "#627EEA" },
    BNB: { icon: "fas fa-coins", color: "#F3BA2F" },
    SOL: { icon: "fas fa-sun", color: "#00FFA3" },
    XRP: { icon: "fas fa-exchange-alt", color: "#23292F" },
    ADA: { icon: "fas fa-chart-area", color: "#0033AD" },
    DOGE: { icon: "fas fa-dog", color: "#C2A633" },
    USDC: { icon: "fas fa-dollar-sign", color: "#2775CA" },
    DOT: { icon: "fas fa-circle", color: "#E6007A" },
    AVAX: { icon: "fas fa-mountain", color: "#E84142" },
    MATIC: { icon: "fas fa-polygon", color: "#8247E5" },
    LTC: { icon: "fab fa-litecoin", color: "#BFBBBB" },
    SHIB: { icon: "fas fa-paw", color: "#E60042" },
    TRX: { icon: "fas fa-bolt", color: "#FF060A" },
    LINK: { icon: "fas fa-link", color: "#2A5ADA" },
    XLM: { icon: "fas fa-star", color: "#14B6E7" },
    XMR: { icon: "fas fa-shield-alt", color: "#FF6600" },
    ETC: { icon: "fas fa-ethereum", color: "#33FF99" },
    FIL: { icon: "fas fa-database", color: "#42C6FF" },
    ATOM: { icon: "fas fa-atom", color: "#2E3148" },
    ALGO: { icon: "fas fa-project-diagram", color: "#000000" },
    // Add more as needed
  };

  return iconMap[baseSymbol] || { icon: "fas fa-coins", color: "#9CA3AF" };
};

function Market() {
  const [cryptoData, setCryptoData] = useState<{ [key: string]: CryptoData }>(
    {}
  );
  const [filteredCrypto, setFilteredCrypto] = useState<CryptoData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const ws = useRef<WebSocket | null>(null);

  // Fetch all available trading pairs from Binance REST API
  useEffect(() => {
    const fetchSymbols = async () => {
      try {
        const response = await fetch(
          "https://api.binance.com/api/v3/exchangeInfo"
        );
        const data = await response.json();

        // Filter for USDT pairs only
        const usdtSymbols = data.symbols
          .filter(
            (symbol: any) =>
              symbol.quoteAsset === "USDT" && symbol.status === "TRADING"
          )
          .map((symbol: any) => symbol.symbol);

        // Initialize crypto data for all symbols
        const initialData: { [key: string]: CryptoData } = {};
        usdtSymbols.forEach((symbol: string) => {
          const baseSymbol = symbol.replace("USDT", "");
          const iconData = getCryptoIcon(symbol);

          initialData[symbol] = {
            symbol,
            name: `${baseSymbol}/USDT`,
            icon: iconData.icon,
            iconColor: iconData.color,
            price: "0",
            change: "0",
            changePercent: "0",
            volume: "0",
            volumeFormatted: "0",
            isPositive: true,
          };
        });

        setCryptoData(initialData);
      } catch (error) {
        console.error("Error fetching symbols:", error);
      }
    };

    fetchSymbols();
  }, []);

  // WebSocket connection for all market data - using the all-in-one stream
  useEffect(() => {
    // Connect to the all-in-one stream
    ws.current = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");

    ws.current.onopen = () => {
      console.log("Connected to Binance all-market stream");
    };

    ws.current.onmessage = (event: MessageEvent) => {
      try {
        const tickers = JSON.parse(event.data);

        // Update each ticker in the array
        setCryptoData((prev) => {
          const updatedData = { ...prev };

          tickers.forEach((ticker: BinanceTicker) => {
            const symbol = ticker.s;

            if (updatedData[symbol]) {
              const isPositive = !ticker.P.startsWith("-");
              const changePercent = Math.abs(Number(ticker.P)).toFixed(2);

              // Format volume in billions/millions
              const volumeNum = Number(ticker.v);
              let volumeFormatted = volumeNum.toFixed(0);
              if (volumeNum >= 1000000000) {
                volumeFormatted = (volumeNum / 1000000000).toFixed(1) + "B";
              } else if (volumeNum >= 1000000) {
                volumeFormatted = (volumeNum / 1000000).toFixed(1) + "M";
              }

              updatedData[symbol] = {
                ...updatedData[symbol],
                price: Number(ticker.c).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: ticker.c.includes(".")
                    ? Number(ticker.c) < 1
                      ? 6
                      : 4
                    : 2,
                }),
                change: ticker.p,
                changePercent: changePercent,
                volume: ticker.v,
                volumeFormatted: volumeFormatted,
                isPositive: isPositive,
              };
            }
          });

          return updatedData;
        });
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.current.onerror = (error: Event) => {
      console.error("Market WebSocket error:", error);
    };

    ws.current.onclose = () => {
      console.log("Market connection closed");
    };

    return () => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.close();
      }
    };
  }, []);

  // Filter and sort cryptocurrencies based on search and active tab
  useEffect(() => {
    let filtered = Object.values(cryptoData);

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (crypto) =>
          crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply tab filters
    switch (activeTab) {
      case "Gainers":
        filtered = filtered
          .filter((crypto) => crypto.isPositive)
          .sort((a, b) => Number(b.changePercent) - Number(a.changePercent));
        break;
      case "Losers":
        filtered = filtered
          .filter((crypto) => !crypto.isPositive)
          .sort((a, b) => Number(a.changePercent) - Number(b.changePercent));
        break;
      case "Favorites":
        // For favorites, you might want to implement local storage or context
        filtered = filtered.filter((crypto) =>
          ["BTCUSDT", "ETHUSDT", "BNBUSDT"].includes(crypto.symbol)
        );
        break;
      default:
        // Sort by volume for "All" tab
        filtered.sort((a, b) => Number(b.volume) - Number(a.volume));
    }

    setFilteredCrypto(filtered);
  }, [cryptoData, searchTerm, activeTab]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

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
        {filteredCrypto.length > 0 ? (
          filteredCrypto.map((crypto) => (
            <div key={crypto.symbol} className="market-item">
              <Link
                to={`/market/detail/${crypto.symbol}`}
                className="crypto-info remove_blue"
              >
                <div className="crypto-icon">
     <img
  src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${crypto.name.split('/')[0]}.png`}
  style={{ width: 40, height: 40 }}
  alt={crypto.name.split('/')[0]}
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
          ))
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
          margin-top: 20px;
          max-height: calc(100vh - 200px);
          overflow-y: auto;
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

export default Market;
