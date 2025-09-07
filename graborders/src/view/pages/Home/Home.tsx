import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import productListSelectors from "src/modules/product/list/productListSelectors";
import productListActions from "src/modules/product/list/productListActions";
import selector from "src/modules/product/list/productListSelectors";
import News from "./News";

// Add interface for cryptocurrency data
interface CryptoData {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changePercent: string;
  volume: string;
  volumeFormatted: string;
  isPositive: boolean;
}

interface QuickActionItem {
  path: string;
  icon: string;
  name: string;
}

function Home() {
  const dispatch = useDispatch();
  const [coincategory, setCoinCategory] = useState("");
  const [response, setResponse] = useState([]);
  const record = useSelector(selector.selectRows);
  const loading = useSelector(selector.selectLoading);
  const [coins, setCoins] = useState();
  const selectNews = useSelector(productListSelectors.selectNews);
  const selectloadingNews = useSelector(productListSelectors.selectloadingNews);
  
  // State for real-time crypto data
  const [cryptoData, setCryptoData] = useState<{ [key: string]: CryptoData }>({});
  const ws = useRef<WebSocket | null>(null);

  // State for image slider
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderImages = [
    "https://public.bnbstatic.com/image/cms/blog/20210728/b0ac64ca-9452-4ee2-b6fe-6ecbe8eeaddd.png",
    "https://cdn.builtin.com/cdn-cgi/image/f=auto,fit=cover,w=1200,h=635,q=80/sites/www.builtin.com/files/2022-07/cryptocurrency-coins-crypto-trading-platform.png",
    "https://observervoice.com/wp-content/uploads/2025/02/Crypto-Market-Faces-Continued-Slump.jpg.avif"
  ];

  useEffect(() => {
    const data = { 
      id: 1, 
      page: 1, 
      size: 5
    };
    dispatch(productListActions.doFindNews(data));
  }, []);

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [sliderImages.length]);

  // WebSocket connection for real-time data
  useEffect(() => {
    // Top 4 cryptocurrencies by market cap
    const topSymbols = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT'];
    
    // Setup WebSocket for real-time updates
    const streams = topSymbols.map(symbol => `${symbol.toLowerCase()}@ticker`).join('/');
    ws.current = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`);
    
    ws.current.onopen = () => {
      console.log("Connected to Binance for top cryptocurrencies");
    };
    
    ws.current.onmessage = (event: MessageEvent) => {
      try {
        const response = JSON.parse(event.data);
        const data = response.data;
        
        if (data && data.s) {
          const symbol = data.s;
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
          
          setCryptoData(prev => ({
            ...prev,
            [symbol]: {
              symbol,
              name: `${symbol.replace("USDT", "")}/USDT`,
              price: Number(data.c).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: Number(data.c) < 1 ? 6 : 4,
              }),
              change: data.p,
              changePercent: changePercent,
              volume: data.v,
              volumeFormatted: volumeFormatted,
              isPositive: isPositive
            }
          }));
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };
    
    ws.current.onerror = (error: Event) => {
      console.error("Home WebSocket error:", error);
    };
    
    ws.current.onclose = () => {
      console.log("Home connection closed");
      // Try to reconnect after a delay
      setTimeout(() => {
        if (ws.current === null) {
          // Reconnect logic if needed
        }
      }, 5000);
    };
    
    return () => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.close();
      }
    };
  }, []);

  const [activeItem, setActiveItem] = useState<string>("/deposit");

  const icons = [
    {
      path: "/deposit",
      icon: "fas fa-chart-line feature-icon",
      name: "deposit",
    },

    {
      path: "/Withdraw",
      icon: "fas fa-chart-line feature-icon",
      name: "Withdraw",
    },
    {
      path: "/History",
      icon: "fas fa-chart-line feature-icon",
      name: "deposit",
    },
    {
      path: "/Security",
      icon: "fas fa-chart-line feature-icon",
      name: "Security",
    },

    {
      path: "/Support",
      icon: "fas fa-chart-line feature-icon",
      name: "Support",
    },
  ];

  const buttons = [
    {
      path: "/p2p",
      icon: "fas fa-chart-line feature-icon",
      name: "P2P",
    },
    {
      path: "/invitation",
      icon: "fas fa-gift feature-icon",
      name: "Refer Friends",
    },

    {
      path: "/stacking",
      icon: "fas fa-coins feature-icon",
      name: "Stacking",
    },
    {
      path: "/securitytips",
      icon: "fas fa-shield-alt feature-icon",
      name: " Security Tips",
    },
  ];

  const handleItemClick = (path: string) => {
    setActiveItem(path);
  };

  const quickActions = [
    {
      path: "/deposit",
      icon: "fas fa-wallet",
      name: "Deposit",
    },
    {
      path: "/withdraw",
      icon: "fas fa-money-bill-wave",
      name: "Withdraw",
    },
    {
      path: "/history",
      icon: "fas fa-history",
      name: "History",
    },
    {
      path: "/security",
      icon: "fas fa-shield-alt",
      name: "Security",
    },
    {
      path: "/support",
      icon: "fas fa-question-circle",
      name: "Support",
    },
  ];

  // Define the top 4 cryptocurrencies we want to display
  const topCryptos = [
    { symbol: "BTCUSDT", icon: "fab fa-btc", color: "#000", bgColor: "#F3BA2F" },
    { symbol: "ETHUSDT", icon: "fab fa-ethereum", color: "#fff", bgColor: "#627EEA" },
    { symbol: "BNBUSDT", icon: "fas fa-coins", color: "#000", bgColor: "#F3BA2F" },
    { symbol: "SOLUSDT", icon: "fas fa-sun", color: "#000", bgColor: "#00FFA3" }
  ];

  return (
    <div className="container">
      {/* Header Section */}
      <div className="mywallet-header">
        <div className="header-top">
  
         
        </div>
      </div>
      
      {/* Image Slider Section */}
      <div className="slider-container">
        <div className="slider">
          <div 
            className="slides-container"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {sliderImages.map((image, index) => (
              <div key={index} className="slide">
                <img src={image} alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </div>
          
          {/* Indicators */}
          <div className="slider-indicators">
            {sliderImages.map((_, index) => (
              <div
                key={index}
                className={`slider-indicator ${index === currentSlide ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
   
      {/* Quick Action Buttons */}
      <div className="quick-actions">
        {quickActions.map((item) => (
          <Link
            to={item.path}
            className="action-btn remove_blue"
            role="button"
            aria-label="Deposit cryptocurrency"
          >
            <div
              className={`action-circle ${
                activeItem === item.path ? "buy" : "other"
              }`}
            >
              <i className={`${item.icon} action-icon`} aria-hidden="true" />
            </div>
            <span className="action-text">{item.name}</span>
          </Link>
        ))}
      </div>

      {/* Feature Shortcuts */}
      <div className="feature-shortcuts">
        {buttons.map((item, index) => (
          <Link to={item.path} className="feature-btn remove_blue">
            <i className={item.icon} />
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
      {/* Portfolio Section */}

      {/* Favorites Section */}
      <div className="favorites-header">
        <div className="favorites-title">Popular Cryptocurrencies</div>
        <Link to="/market" className="see-all remove_blue">See all →</Link>
      </div>
      {/* Market List with Real-time Data */}
      <div className="market-list" style={{padding: '0 15px'}}>
        {topCryptos.map((crypto) => {
          const data = cryptoData[crypto.symbol];
          const displayName = crypto.symbol.replace("USDT", "/USDT");
          
          return (
            <Link   to={`/market/detail/${crypto.symbol}`} key={crypto.symbol} className="market-item remove_blue">
              <div className="crypto-info">
                <div 
                  className="crypto-icon" 
                  style={{ backgroundColor: crypto.bgColor }}
                >
                  <img
                  src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${
              displayName?.split("/")[0]
            }.png`}
                    className={crypto.icon} 
                   style={{width:30}}
                  />
                </div>
                <div>
                  <div className="crypto-name">{displayName}</div>
                  <div className="crypto-volume">
                    Vol: {data ? data.volumeFormatted : "Loading..."}
                  </div>
                </div>
              </div>
              <div className="price-info">
                <div className="price">
                  {data ? `$${data.price}` : "Loading..."}
                </div>
                <div 
                  className={`change ${data ? (data.isPositive ? "positive" : "negative") : ""}`}
                >
                  {data ? `${data.isPositive ? "+" : ""}${data.changePercent}%` : "Loading..."}
                </div>
              </div>
              <div className="chart">
                <i 
                  className="fas fa-chart-line" 
                  style={{ color: data ? (data.isPositive ? "#00C076" : "#FF6838") : "#AAAAAA" }} 
                />
              </div>
            </Link>
          );
        })}
      </div>
      {/* News Section */}
      <News topic={selectNews} loading={selectloadingNews} />

      {/* Add CSS styles for the slider */}
      <style>
        {`
          .slider-container {
            width: 100%;
            margin: 0px 0px 20px 0;
            overflow: hidden;
            position: relative;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          }
          
          .slider {
            position: relative;
            width: 100%;
            height: 200px;
            overflow: hidden;
          }
          
          .slides-container {
            display: flex;
            transition: transform 0.5s ease-in-out;
            height: 100%;
          }
          
          .slide {
            min-width: 100%;
            height: 100%;
          }
          
          .slide img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 12px;
          }
          
          .slider-indicators {
            position: absolute;
            bottom: 15px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 8px;
            z-index: 10;
          }
          
          .slider-indicator {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.5);
            transition: background-color 0.3s ease;
          }
          
          .slider-indicator.active {
            background-color: #F3BA2F;
            width: 20px;
            border-radius: 4px;
          }
          
          @media (max-width: 480px) {
            .slider {
              height: 180px;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Home;