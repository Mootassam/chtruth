
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import productListSelectors from "src/modules/product/list/productListSelectors";
import productListActions from "src/modules/product/list/productListActions";
import selector from "src/modules/product/list/productListSelectors";
import News from "./News";
import Header from "src/view/shared/Header/Header";
import { i18n } from "../../../i18n";

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
  const [cryptoData, setCryptoData] = useState<{ [key: string]: CryptoData }>(
    {}
  );
  const ws = useRef<WebSocket | null>(null);

  // State for image slider
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderImages = [
    "/images/1.png",
    "/images/2.png",
    "/images/3.png",
  ];

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      title: i18n("pages.home.notifications.btcAlert"),
      message: i18n("pages.home.notifications.btcReached"),
      time: i18n("pages.home.notifications.fiveMinAgo"),
      unread: true,
    },
    {
      id: 2,
      title: i18n("pages.home.notifications.depositSuccess"),
      message: i18n("pages.home.notifications.depositConfirmed"),
      time: i18n("pages.home.notifications.oneHourAgo"),
      unread: true,
    },
    {
      id: 3,
      title: i18n("pages.home.notifications.securityUpdate"),
      message: i18n("pages.home.notifications.newSecurityFeatures"),
      time: i18n("pages.home.notifications.twoHoursAgo"),
      unread: false,
    },
    {
      id: 4,
      title: i18n("pages.home.notifications.marketNews"),
      message: i18n("pages.home.notifications.ethUpgrade"),
      time: i18n("pages.home.notifications.fiveHoursAgo"),
      unread: false,
    },
  ];

  useEffect(() => {
    const data = {
      id: 1,
      page: 1,
      size: 5,
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
    const topSymbols = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT"];

    // Setup WebSocket for real-time updates
    const streams = topSymbols
      .map((symbol) => `${symbol.toLowerCase()}@ticker`)
      .join("/");
    ws.current = new WebSocket(
      `wss://stream.binance.us:9443/stream?streams=${streams}`
    );

    ws.current.onopen = () => {
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

          setCryptoData((prev) => ({
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
              isPositive: isPositive,
            },
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

  const [activeItem, setActiveItem] = useState<string>("/security-tips");

  const handleItemClick = (path: string) => {
    setActiveItem(path);
  };

  // New Quick Access data
  const quickAccessItems = [
    {
      path: "/security-tips",
      icon: "fas fa-shield-alt",
      name: i18n("pages.home.quickAccess.security"),
    },
    {
      path: "/faq-center",
      icon: "fas fa-question-circle",
      name: i18n("pages.home.quickAccess.faqCenter"),
    },
    {
      icon: "fas fa-gift",
      path: "/invitation",
      name: i18n("pages.home.quickAccess.invitation"),
    },
    {
      path: "/stacking",
      icon: "fas fa-coins ",
      name: i18n("pages.home.quickAccess.staking"),
    },
  ];

  // Define the top 4 cryptocurrencies we want to display
  const topCryptos = [
    {
      symbol: "BTCUSDT",
      icon: "fab fa-btc",
      color: "#000",
      bgColor: "#F3BA2F",
    },
    {
      symbol: "ETHUSDT",
      icon: "fab fa-ethereum",
      color: "#fff",
      bgColor: "#627EEA",
    },
    {
      symbol: "BNBUSDT",
      icon: "fas fa-coins",
      color: "#000",
      bgColor: "#F3BA2F",
    },
    {
      symbol: "SOLUSDT",
      icon: "fas fa-sun",
      color: "#000",
      bgColor: "#00FFA3",
    },
  ];

  return (
    <div className="container">
      {/* Header Section */}
      <Header />

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
                className={`slider-indicator ${index === currentSlide ? "active" : ""
                  }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Quick Access Section */}
      <div className="quick-access">
        <div className="section-header">
          <h2 className="section-title">{i18n("pages.home.quickAccess.title")}</h2>
          <Link to="/deposit" className="deposit-header-button remove_blue">
            <div className="deposit-header-icon">
              <i className="fas fa-wallet" />
            </div>
            <span className="deposit-header-text">{i18n("pages.home.quickAccess.deposit")}</span>
          </Link>
        </div>
        <div className="access-grid">
          {quickAccessItems.map((item) => (
            <Link
              to={item.path}
              key={item.path}
              className="access-card remove_blue"
            >
              <div className="access-icon">
                <i className={item.icon} />
              </div>
              <span className="access-text">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Favorites Section */}
      <div className="favorites-header">
        <div className="favorites-title">{i18n("pages.home.popularCryptos")}</div>
        <Link to="/market" className="see-all remove_blue">
          {i18n("pages.home.seeAll")} →
        </Link>
      </div>
      
      {/* Market List with Real-time Data */}
      <div className="market-list" style={{ padding: "0 15px" }}>
        {topCryptos.map((crypto) => {
          const data = cryptoData[crypto.symbol];
          const displayName = crypto.symbol.replace("USDT", "/USDT");

          return (
            <Link
              to={`/market/detail/${crypto.symbol}`}
              key={crypto.symbol}
              className="market-item remove_blue"
            >
              <div className="crypto-info">
                <div
                  className="crypto-icon"
                  style={{ backgroundColor: crypto.bgColor }}
                >
                  <img
                    src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${displayName?.split("/")[0]
                      }.png`}
                    className={crypto.icon}
                    style={{ width: 40 }}
                  />
                </div>
                <div>
                  <div className="crypto-name">{displayName}</div>
                  <div className="crypto-volume">
                    {i18n("pages.home.volume")}: {data ? data.volumeFormatted : i18n("pages.home.loading")}
                  </div>
                </div>
              </div>
              <div className="price-info">
                <div className="price">
                  {data ? `$${data.price}` : i18n("pages.home.loading")}
                </div>
                <div
                  className={`change ${data ? (data.isPositive ? "positive" : "negative") : ""
                    }`}
                >
                  {data
                    ? `${data.isPositive ? "+" : ""}${data.changePercent}%`
                    : i18n("pages.home.loading")}
                </div>
              </div>
              <div className="chart">
                <i
                  className="fas fa-chart-line"
                  style={{
                    color: data
                      ? data.isPositive
                        ? "#00C076"
                        : "#FF6838"
                      : "#AAAAAA",
                  }}
                />
              </div>
            </Link>
          );
        })}
      </div>

      {/* News Section */}
      <News topic={selectNews} loading={selectloadingNews} />

      {/* Add CSS styles for the new Quick Access section */}
      <style>
        {`
          /* Slider Styles */
          .slider-container {
            width: 100%;
            overflow: hidden;
            position: relative;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          }
          
          .slider {
            position: relative;
            width: 100%;
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
            // height: 100%;
            object-fit: contain;
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

          /* Quick Access Styles */
          .quick-access {
            margin: 0px 0px 20px;
            // padding: 0 15px;
          }

          .section-header {
            margin-bottom: 15px;
          }

          .section-title {
            font-size: 18px;
            font-weight: bold;
            color: #FFFFFF;
          }

          .access-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
            padding: 0 15px;
          }

          .access-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #1A1A1A;
            border-radius: 10px;
            padding: 15px 8px;
            transition: transform 0.2s;
            text-align: center;
          }

          .access-card:hover {
            transform: translateY(-3px);
          }

          .access-icon {
            font-size: 24px;
            color: #F3BA2F;
            margin-bottom: 8px;
          }

          .access-text {
            font-size: 12px;
            font-weight: 500;
            color: #FFFFFF;
            line-height: 1.3;
          }

          @media (max-width: 480px) {
            .slider {
              // height: 180px;
            }
            
            .access-grid {
              grid-template-columns: repeat(4, 1fr);
              gap: 12px;
            }

            .access-card {
              padding: 12px 6px;
            }

            .access-icon {
              font-size: 22px;
              margin-bottom: 6px;
            }

            .access-text {
              font-size: 11px;
            }
          }

          .deposit-header-button {
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #F3BA2F, #FF9800);
  border-radius: 8px;
  padding: 8px 16px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(243, 186, 47, 0.3);
  text-decoration: none;
}

.deposit-header-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(243, 186, 47, 0.4);
  background: linear-gradient(135deg, #FF9800, #F3BA2F);
}

.deposit-header-icon {
  font-size: 14px;
  color: #FFFFFF;
  margin-right: 6px;
}

.deposit-header-text {
  font-size: 14px;
  font-weight: 600;
  color: #FFFFFF;
}

/* Responsive Design */
@media (max-width: 768px) {
  .section-header {
    padding: 0 15px;
  }
  
  .section-title {
    font-size: 16px;
  }
  
  .deposit-header-button {
    padding: 6px 12px;
  }
  
  .deposit-header-icon {
    font-size: 12px;
    margin-right: 4px;
  }
  
  .deposit-header-text {
    font-size: 12px;
  }
  
  .access-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }

}


          @media (max-width: 350px) {
           .access-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }


        `}
      </style>
    </div>
  );
}

export default Home;