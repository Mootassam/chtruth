
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import productListSelectors from "src/modules/product/list/productListSelectors";
import productListActions from "src/modules/product/list/productListActions";
import News from "./News";
import Header from "src/view/shared/Header/Header";
import { i18n } from "../../../i18n";
import authAxios from "src/modules/shared/axios/authAxios";
import { getMarketSocket } from "src/modules/shared/marketSocket";

const TOP_SYMBOLS = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT"];
const CACHE_KEY = "home:tickers:v1";

interface CryptoData {
  symbol: string;
  price: string;
  changePercent: string;
  volumeFormatted: string;
  isPositive: boolean;
}

function formatPrice(c: string): string {
  const n = Number(c);
  return n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: n < 1 ? 6 : 2,
  });
}

function formatVol(v: string): string {
  const n = Number(v);
  if (n >= 1e9) return (n / 1e9).toFixed(1) + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  return n.toFixed(0);
}

function tickerToData(t: any): CryptoData {
  return {
    symbol: t.s,
    price: formatPrice(t.c),
    changePercent: String(t.P),
    volumeFormatted: t.vf || formatVol(t.v || "0"),
    isPositive: !!t.pos,
  };
}

const Shimmer = ({ w = "80px", h = "14px" }: { w?: string; h?: string }) => (
  <span style={{
    display: "inline-block", width: w, height: h, borderRadius: 4,
    background: "linear-gradient(90deg,#2A2A2A 25%,#3a3a3a 50%,#2A2A2A 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.4s infinite",
    verticalAlign: "middle",
  }} />
);

function Home() {
  const dispatch = useDispatch();
  const selectNews = useSelector(productListSelectors.selectNews);
  const selectloadingNews = useSelector(productListSelectors.selectloadingNews);

  const [cryptoData, setCryptoData] = useState<Record<string, CryptoData>>(() => {
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) return JSON.parse(cached);
    } catch (_) {}
    return {};
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderImages = ["/images/1.png", "/images/2.png", "/images/3.png"];

  // ── news fetch ────────────────────────────────────────────────────────────
  useEffect(() => {
    dispatch(productListActions.doFindNews({ id: 1, page: 1, size: 5 }));
  }, []);

  // ── slider auto-advance ───────────────────────────────────────────────────
  useEffect(() => {
    const t = setInterval(() => setCurrentSlide((p) => (p + 1) % sliderImages.length), 5000);
    return () => clearInterval(t);
  }, [sliderImages.length]);

  // ── initial REST fetch (Redis-cached ~8s on server) ───────────────────────
  useEffect(() => {
    authAxios.get("/market/tickers").then(({ data }) => {
      const arr: any[] = data.data || [];
      const next: Record<string, CryptoData> = {};
      TOP_SYMBOLS.forEach((sym) => {
        const t = arr.find((x) => x.s === sym);
        if (t) next[sym] = tickerToData(t);
      });
      if (Object.keys(next).length) {
        setCryptoData((prev) => ({ ...prev, ...next }));
        try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ...cryptoData, ...next })); } catch (_) {}
      }
    }).catch(() => {});
  }, []);

  // ── Socket.IO live updates (same stream Market.tsx uses) ──────────────────
  useEffect(() => {
    const socket = getMarketSocket();
    const handle = (arr: any[]) => {
      const updates: Record<string, CryptoData> = {};
      TOP_SYMBOLS.forEach((sym) => {
        const t = arr.find((x) => x.s === sym);
        if (t) updates[sym] = tickerToData(t);
      });
      if (Object.keys(updates).length) {
        setCryptoData((prev) => {
          const next = { ...prev, ...updates };
          try { sessionStorage.setItem(CACHE_KEY, JSON.stringify(next)); } catch (_) {}
          return next;
        });
      }
    };
    socket.on("market:update", handle);
    return () => { socket.off("market:update", handle); };
  }, []);

  const quickAccessItems = [
    { path: "/security-tips", icon: "fas fa-shield-alt",     name: i18n("pages.home.quickAccess.security")   },
    { path: "/faq-center",    icon: "fas fa-question-circle", name: i18n("pages.home.quickAccess.faqCenter")  },
    { path: "/invitation",    icon: "fas fa-gift",            name: i18n("pages.home.quickAccess.invitation") },
    { path: "/stacking",      icon: "fas fa-coins",           name: i18n("pages.home.quickAccess.staking")    },
  ];

  const topCryptos = [
    { symbol: "BTCUSDT", icon: "fab fa-btc",      bgColor: "#F3BA2F" },
    { symbol: "ETHUSDT", icon: "fab fa-ethereum",  bgColor: "#627EEA" },
    { symbol: "BNBUSDT", icon: "fas fa-coins",     bgColor: "#F3BA2F" },
    { symbol: "SOLUSDT", icon: "fas fa-sun",        bgColor: "#00FFA3" },
  ];

  return (
    <div className="container">
      <Header />

      {/* Image Slider */}
      <div className="slider-container">
        <div className="slider">
          <div className="slides-container" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {sliderImages.map((img, i) => (
              <div key={i} className="slide">
                <img src={img} alt={`Slide ${i + 1}`} loading={i === 0 ? "eager" : "lazy"} />
              </div>
            ))}
          </div>
          <div className="slider-indicators">
            {sliderImages.map((_, i) => (
              <div key={i} className={`slider-indicator${i === currentSlide ? " active" : ""}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div className="quick-access">
        <div className="section-header">
          <h2 className="section-title">{i18n("pages.home.quickAccess.title")}</h2>
          <Link to="/deposit" className="deposit-header-button remove_blue">
            <div className="deposit-header-icon"><i className="fas fa-wallet" /></div>
            <span className="deposit-header-text">{i18n("pages.home.quickAccess.deposit")}</span>
          </Link>
        </div>
        <div className="access-grid">
          {quickAccessItems.map((item) => (
            <Link to={item.path} key={item.path} className="access-card remove_blue">
              <div className="access-icon"><i className={item.icon} /></div>
              <span className="access-text">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Cryptos */}
      <div className="favorites-header">
        <div className="favorites-title">{i18n("pages.home.popularCryptos")}</div>
        <Link to="/market" className="see-all remove_blue">{i18n("pages.home.seeAll")} →</Link>
      </div>

      <div className="market-list" style={{ padding: "0 15px" }}>
        {topCryptos.map((crypto) => {
          const data = cryptoData[crypto.symbol];
          const displayName = crypto.symbol.replace("USDT", "/USDT");
          const coinName = displayName.split("/")[0];

          return (
            <Link to={`/market/detail/${crypto.symbol}`} key={crypto.symbol} className="market-item remove_blue">
              <div className="crypto-info">
                <div className="crypto-icon" style={{ backgroundColor: crypto.bgColor }}>
                  <img
                    src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${coinName}.png`}
                    style={{ width: 40 }}
                    alt={coinName}
                    loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
                <div>
                  <div className="crypto-name">{displayName}</div>
                  <div className="crypto-volume">
                    {i18n("pages.home.volume")}: {data ? data.volumeFormatted : <Shimmer w="50px" h="12px" />}
                  </div>
                </div>
              </div>
              <div className="price-info">
                <div className="price">
                  {data ? `$${data.price}` : <Shimmer w="70px" h="16px" />}
                </div>
                <div className={`change${data ? (data.isPositive ? " positive" : " negative") : ""}`}>
                  {data ? `${data.isPositive ? "+" : ""}${data.changePercent}%` : <Shimmer w="40px" h="12px" />}
                </div>
              </div>
              <div className="chart">
                <i className="fas fa-chart-line" style={{ color: data ? (data.isPositive ? "#00C076" : "#FF6838") : "#555" }} />
              </div>
            </Link>
          );
        })}
      </div>

      <News topic={selectNews} loading={selectloadingNews} />

      <style>{`
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

        .slider-container { width:100%; overflow:hidden; position:relative; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.3); }
        .slider { position:relative; width:100%; overflow:hidden; }
        .slides-container { display:flex; transition:transform 0.5s ease-in-out; height:100%; }
        .slide { min-width:100%; height:100%; }
        .slide img { width:100%; object-fit:contain; border-radius:12px; }
        .slider-indicators { position:absolute; bottom:15px; left:50%; transform:translateX(-50%); display:flex; gap:8px; z-index:10; }
        .slider-indicator { width:8px; height:8px; border-radius:50%; background-color:rgba(255,255,255,0.5); transition:background-color 0.3s ease; }
        .slider-indicator.active { background-color:#F3BA2F; width:20px; border-radius:4px; }

        .quick-access { margin:0px 0px 20px; }
        .section-header { margin-bottom:15px; display:flex; justify-content:space-between; align-items:center; padding:0 15px; }
        .section-title { font-size:18px; font-weight:bold; color:#FFFFFF; }
        .access-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:15px; padding:0 15px; }
        .access-card { display:flex; flex-direction:column; align-items:center; background-color:#1A1A1A; border-radius:10px; padding:15px 8px; transition:transform 0.2s; text-align:center; }
        .access-card:hover { transform:translateY(-3px); }
        .access-icon { font-size:24px; color:#F3BA2F; margin-bottom:8px; }
        .access-text { font-size:12px; font-weight:500; color:#FFFFFF; line-height:1.3; }

        .deposit-header-button { display:flex; align-items:center; background:linear-gradient(135deg,#F3BA2F,#FF9800); border-radius:8px; padding:8px 16px; transition:all 0.3s ease; box-shadow:0 2px 8px rgba(243,186,47,0.3); text-decoration:none; }
        .deposit-header-button:hover { transform:translateY(-2px); box-shadow:0 4px 12px rgba(243,186,47,0.4); background:linear-gradient(135deg,#FF9800,#F3BA2F); }
        .deposit-header-icon { font-size:14px; color:#FFFFFF; margin-right:6px; }
        .deposit-header-text { font-size:14px; font-weight:600; color:#FFFFFF; }

        @media (max-width:768px) {
          .section-title { font-size:16px; }
          .deposit-header-button { padding:6px 12px; }
          .deposit-header-icon { font-size:12px; margin-right:4px; }
          .deposit-header-text { font-size:12px; }
          .access-grid { grid-template-columns:repeat(4,1fr); gap:12px; }
        }
        @media (max-width:480px) {
          .access-grid { grid-template-columns:repeat(4,1fr); gap:12px; }
          .access-card { padding:12px 6px; }
          .access-icon { font-size:22px; margin-bottom:6px; }
          .access-text { font-size:11px; }
        }
        @media (max-width:350px) {
          .access-grid { grid-template-columns:repeat(2,1fr); gap:12px; }
        }
      `}</style>
    </div>
  );
}

export default Home;
