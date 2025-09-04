import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import productListSelectors from "src/modules/product/list/productListSelectors";
import productListActions from "src/modules/product/list/productListActions";
import selector from "src/modules/product/list/productListSelectors";
import News from "./News";

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

  useEffect(() => {
    dispatch(productListActions.doFindNews(1));
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

  return (
    <div className="container">
      {/* Header Section */}
      <div className="mywallet-header">
        <div className="header-top">
          <div className="search-icon">
            <i className="fas fa-search" />
          </div>
          <div className="notification-profile">
            <i className="fas fa-bell header-notification-icon" />
            <Link to="/profile">
              <i className="fas fa-user-circle profile-icon" />
            </Link>
          </div>
        </div>
        <div className="balance-section">
          <div className="balance">$11,286.39</div>
          <div className="tags">
            <span className="profit-tag">+$172.68 | 1.53%</span>
            <span className="rewards-tag">Rewards $25.32</span>
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
        <div className="see-all">See all →</div>
      </div>
      {/* Market List */}
      <div className="market-list">
        {/* BTC */}
        <div className="market-item">
          <div className="crypto-info">
            <div className="crypto-icon btc">
              <i className="fab fa-btc" style={{ color: "#000" }} />
            </div>
            <div>
              <div className="crypto-name">BTC/USDT</div>
              <div className="crypto-volume">Vol: 42.5B</div>
            </div>
          </div>
          <div className="price-info">
            <div className="price">$51,825.10</div>
            <div className="change">+1.46%</div>
          </div>
          <div className="chart">
            <i className="fas fa-chart-line" style={{ color: "#00C076" }} />
          </div>
        </div>
        {/* BNB */}
        <div className="market-item">
          <div className="crypto-info">
            <div className="crypto-icon bnb">
              <i className="fas fa-coins" style={{ color: "#000" }} />
            </div>
            <div>
              <div className="crypto-name">BNB/USDT</div>
              <div className="crypto-volume">Vol: 1.2B</div>
            </div>
          </div>
          <div className="price-info">
            <div className="price">$351.95</div>
            <div className="change">+0.16%</div>
          </div>
          <div className="chart">
            <i className="fas fa-chart-line" style={{ color: "#00C076" }} />
          </div>
        </div>
        {/* ETH */}
        <div className="market-item">
          <div className="crypto-info">
            <div className="crypto-icon eth">
              <i className="fab fa-ethereum" style={{ color: "#fff" }} />
            </div>
            <div>
              <div className="crypto-name">ETH/USDT</div>
              <div className="crypto-volume">Vol: 18.3B</div>
            </div>
          </div>
          <div className="price-info">
            <div className="price">$2,825.75</div>
            <div className="change">+2.31%</div>
          </div>
          <div className="chart">
            <i className="fas fa-chart-line" style={{ color: "#00C076" }} />
          </div>
        </div>
        {/* SOL */}
        <div className="market-item">
          <div className="crypto-info">
            <div className="crypto-icon sol">
              <i className="fas fa-sun" style={{ color: "#000" }} />
            </div>
            <div>
              <div className="crypto-name">SOL/USDT</div>
              <div className="crypto-volume">Vol: 3.7B</div>
            </div>
          </div>
          <div className="price-info">
            <div className="price">$128.42</div>
            <div className="change">+5.12%</div>
          </div>
          <div className="chart">
            <i className="fas fa-chart-line" style={{ color: "#00C076" }} />
          </div>
        </div>
      </div>
      {/* News Section */}
      <News topic={selectNews} loading={selectloadingNews} />
    </div>
  );
}

export default Home;
