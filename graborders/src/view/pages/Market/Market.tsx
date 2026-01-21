import axios from "axios";
import React, { useState, useEffect, useMemo, useRef } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import Header from "src/view/shared/Header/Header";
import { i18n } from "../../../i18n";

// Interface for Binance ticker data
interface BinanceTicker {
  s: string; // Symbol
  c: string; // Last price
  P: string; // Price change percent
  v: string; // Total traded base asset volume
  p: string; // Price change
  q: string; // Quote asset volume (USDT volume)
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
  quoteVolume: number; // For sorting by market value
}

// Main Market Component
const Market: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<{ [key: string]: CryptoData }>(
    {}
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const ws = useRef<WebSocket | null>(null);

  // Favorite coins list - including the requested ones
  const favoriteCoins = useMemo(
    () => [
      "BTCUSDT",
      "ETHUSDT",
      "BNBUSDT",
      "LTCUSDT",
      "SOLUSDT",
      "XRPUSDT",
      "SUIUSDT",
      "DOGEUSDT",
      "SHIBUSDT",
    ],
    []
  );

  // Fetch initial market data
  useEffect(() => {
    const fetchAllPrices = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://api.binance.us/api/v3/ticker/24hr"
        );

        // Process only USDT pairs
        const usdtPairs = response.data.filter(
          (item: any) =>
            item.symbol.endsWith("USDT") &&
            !item.symbol.includes("UP") &&
            !item.symbol.includes("DOWN") &&
            !item.symbol.includes("BEAR") &&
            !item.symbol.includes("BULL")
        );

        // Sort by quoteVolume (market value) to get most valuable pairs
        usdtPairs.sort(
          (a: any, b: any) =>
            parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume)
        );

        // Take top 200 pairs by market value
        const topPairs = usdtPairs.slice(0, 200);

        const formattedData: { [key: string]: CryptoData } = {};

        topPairs.forEach((item: any) => {
          const symbol = item.symbol;
          const baseSymbol = symbol.replace("USDT", "");
          const isPositive = !item.priceChangePercent.startsWith("-");
          const changePercent = Math.abs(
            Number(item.priceChangePercent)
          ).toFixed(2);

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
            quoteVolume: parseFloat(item.quoteVolume), // For sorting by market value
          };
        });

        setCryptoData(formattedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching market data:", error);
        setIsLoading(false);
      }
    };

    fetchAllPrices();
  }, []);

  // Setup WebSocket for real-time updates
  useEffect(() => {
    // Create WebSocket connection for all tickers
    ws.current = new WebSocket("wss://stream.binance.us:9443/ws/!ticker@arr");

    ws.current.onmessage = (event) => {
      const data: BinanceTicker[] = JSON.parse(event.data);

      // Update crypto data with real-time information
      setCryptoData((prevData) => {
        const newData = { ...prevData };

        data.forEach((ticker) => {
          if (newData[ticker.s]) {
            const isPositive = !ticker.P.startsWith("-");
            const changePercent = Math.abs(Number(ticker.P)).toFixed(2);

            // Format volume
            const volumeNum = Number(ticker.v);
            let volumeFormatted = volumeNum.toFixed(0);
            if (volumeNum >= 1000000000) {
              volumeFormatted = (volumeNum / 1000000000).toFixed(1) + "B";
            } else if (volumeNum >= 1000000) {
              volumeFormatted = (volumeNum / 1000000).toFixed(1) + "M";
            }

            newData[ticker.s] = {
              ...newData[ticker.s],
              price: Number(ticker.c).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: Number(ticker.c) < 1 ? 6 : 4,
              }),
              change: ticker.p,
              changePercent: changePercent,
              volume: ticker.v,
              volumeFormatted: volumeFormatted,
              isPositive: isPositive,
              quoteVolume: parseFloat(ticker.q), // Update quote volume for sorting
            };
          }
        });

        return newData;
      });
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  // Filter and sort cryptocurrencies
  const filteredCrypto = useMemo(() => {
    const cryptoArray = Object.values(cryptoData);

    if (cryptoArray.length === 0) return [];

    let filtered = cryptoArray;

    // Apply search filter
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (crypto) =>
          crypto.name.toLowerCase().includes(searchTermLower) ||
          crypto.symbol.toLowerCase().includes(searchTermLower)
      );
    }

    // Apply tab filters
    switch (activeTab) {
      case "Gainers":
        return filtered
          .filter((crypto) => crypto.isPositive)
          .sort((a, b) => Number(b.changePercent) - Number(a.changePercent));
      case "Losers":
        return filtered
          .filter((crypto) => !crypto.isPositive)
          .sort((a, b) => Number(b.changePercent) - Number(a.changePercent)); // Fixed: Biggest losers first
      case "Favorites":
        return filtered
          .filter((crypto) => favoriteCoins.includes(crypto.symbol))
          .sort(
            (a, b) =>
              favoriteCoins.indexOf(a.symbol) - favoriteCoins.indexOf(b.symbol)
          );
      default:
        // Sort by market value (quoteVolume) for All tab
        return filtered.sort((a, b) => b.quoteVolume - a.quoteVolume);
    }
  }, [cryptoData, searchTerm, activeTab, favoriteCoins]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="container">
  
      <div className="market-headers">
        <div className="market-page-title">{i18n("pages.market.title")}</div>
        {/* Search Bar */}
        <div className="search-bar">
          <i className="fas fa-search" style={{ color: "#AAAAAA" }} />
          <input
            type="text"
            placeholder={i18n("pages.market.search.placeholder")}
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <button
              className="clear-search"
              onClick={() => setSearchTerm("")}
              aria-label={i18n("pages.market.search.clear")}
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
            {i18n(`pages.market.tabs.${tab.toLowerCase()}`)}
          </div>
        ))}
      </div>

      <div className="market-list">
        {isLoading && Object.keys(cryptoData).length === 0 ? (
          <div className="market-placeholder">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="market-item-placeholder">
                <div className="crypto-info-placeholder">
                  <div className="crypto-icon-placeholder shimmer"></div>
                  <div className="crypto-details-placeholder">
                    <div
                      className="placeholder-line shimmer"
                      style={{
                        width: "60%",
                        height: "16px",
                        marginBottom: "8px",
                      }}
                    ></div>
                    <div
                      className="placeholder-line shimmer"
                      style={{ width: "40%", height: "12px" }}
                    ></div>
                  </div>
                </div>
                <div className="price-info-placeholder">
                  <div
                    className="placeholder-line shimmer"
                    style={{
                      width: "70px",
                      height: "16px",
                      marginBottom: "8px",
                    }}
                  ></div>
                  <div
                    className="placeholder-line shimmer"
                    style={{ width: "50px", height: "12px" }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredCrypto.length > 0 ? (
          <>
            {filteredCrypto.map((crypto) => (
              <Link
                key={crypto.symbol}
                to={`/market/detail/${crypto.symbol}`}
                className="remove_blue"
              >
                <div className="market-item">
                  <div className="crypto-info">
                    <div className="crypto-icon">
                      <img
                        src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${
                          crypto.name.split("/")[0]
                        }.png`}
                        style={{ width: 40, height: 40 }}
                        alt={crypto.name.split("/")[0]}
                        onError={(e) => {
                          (
                            e.target as HTMLImageElement
                          ).src = `https://via.placeholder.com/40/3a3a3a/ffffff?text=${crypto.name
                            .split("/")[0]
                            .charAt(0)}`;
                        }}
                      />
                    </div>
                    <div>
                      <div className="crypto-name">{crypto.name}</div>
                      <div className="crypto-volume">
                        {i18n("pages.market.volume")}: {crypto.volumeFormatted}
                      </div>
                    </div>
                  </div>
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
                </div>
              </Link>
            ))}
          </>
        ) : (
          <div className="no-results">
            <i
              className="fas fa-search"
              style={{ fontSize: "24px", marginBottom: "10px" }}
            />
            <div>{i18n("pages.market.noResults")}</div>
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
        }
        
        .market-item-placeholder {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 0;
          border-bottom: 1px solid #2A2A2A;
          with:100%
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
          // flex: 1;
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
          position: relative;
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
        
        .clear-search {
          background: none;
          border: none;
          color: #AAAAAA;
          font-size: 18px;
          cursor: pointer;
          position: absolute;
          right: 10px;
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
          overflow-y: auto;
          margin-bottom: 40px;
 
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
          overflow: hidden;
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
        
        .no-results {
          text-align: center;
          padding: 40px 0;
          color: #777;
        }
        
        .remove_blue {
          text-decoration: none;
          color: inherit;
        }
      `}</style>
    </div>
  );
};

export default Market;
