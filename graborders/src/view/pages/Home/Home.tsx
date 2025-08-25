import React from "react";
import { Link } from "react-router-dom";

function Home() {
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
          <div className="balance zero-balance">$0.00</div>
          <div className="tags">
            <span className="rewards-tag">Rewards $0.00</span>
          </div>
        </div>
      </div>
      {/* Quick Action Buttons */}
      <div className="quick-actions">
        <div className="action-btn">
          <div className="action-circle buy">
            <i className="fas fa-plus action-icon" />
          </div>
          <span className="action-text">Buy</span>
        </div>
        <div className="action-btn">
          <div className="action-circle other">
            <i className="fas fa-download action-icon" />
          </div>
          <span className="action-text">Receive</span>
        </div>
        <div className="action-btn">
          <div className="action-circle other">
            <i className="fas fa-exchange-alt action-icon" />
          </div>
          <span className="action-text">Convert</span>
        </div>
        <div className="action-btn">
          <div className="action-circle other">
            <i className="fas fa-paper-plane action-icon" />
          </div>
          <span className="action-text">Send</span>
        </div>
        <div className="action-btn">
          <div className="action-circle other">
            <i className="fas fa-wallet action-icon" />
          </div>
          <span className="action-text">Deposit</span>
        </div>
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
      <div className="portfolio-section">
        <div className="section-header">
          <div className="section-title">Portfolio</div>
          <div className="see-all">History</div>
        </div>
        {/* Toggle between empty and with funds */}
        <div className="toggle-container">
          <div className="toggle-option toggle-active" id="toggle-empty">
            New User
          </div>
          <div className="toggle-option" id="toggle-funded">
            With Funds
          </div>
        </div>
        <div className="portfolio-empty" id="empty-portfolio">
          <div className="portfolio-empty-icon">
            <i className="fas fa-wallet" />
          </div>
          <div className="portfolio-empty-title">Your portfolio is empty</div>
          <div className="portfolio-empty-text">
            Buy your first crypto and start building your portfolio today
          </div>
          <div className="get-started-btn">Get Started</div>
        </div>
        <div className="portfolio-chart" id="funded-portfolio">
          <div className="chart-line" />
          <div className="chart-bars">
            <div className="chart-bar" style={{ height: 30 }} />
            <div className="chart-bar" style={{ height: 50 }} />
            <div className="chart-bar" style={{ height: 70 }} />
            <div className="chart-bar" style={{ height: 90 }} />
            <div className="chart-bar" style={{ height: 60 }} />
            <div className="chart-bar" style={{ height: 80 }} />
            <div className="chart-bar" style={{ height: 100 }} />
          </div>
          <div className="chart-labels">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>
        <div className="portfolio-stats" id="portfolio-stats">
          <div className="stat">
            <div className="stat-value">$8,420.75</div>
            <div className="stat-label">Crypto</div>
          </div>
          <div className="stat">
            <div className="stat-value">$1,235.64</div>
            <div className="stat-label">NFTs</div>
          </div>
          <div className="stat">
            <div className="stat-value">$1,630.00</div>
            <div className="stat-label">Earn</div>
          </div>
        </div>
      </div>
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
      <div className="news-section">
        <div className="section-header">
          <div className="section-title">Crypto News</div>
          <div className="see-all">See All →</div>
        </div>
        <div className="news-item">
          <div className="news-image">
            <i
              className="fas fa-newspaper"
              style={{ color: "#F3BA2F", fontSize: 24 }}
            />
          </div>
          <div className="news-content">
            <div className="news-title">How to Get Started with Crypto</div>
            <div className="news-excerpt">
              A beginner's guide to buying your first cryptocurrency and
              understanding blockchain technology.
            </div>
            <div className="news-date">2 hours ago • CryptoGuide</div>
          </div>
        </div>
        <div className="news-item">
          <div className="news-image">
            <i
              className="fas fa-newspaper"
              style={{ color: "#F3BA2F", fontSize: 24 }}
            />
          </div>
          <div className="news-content">
            <div className="news-title">
              5 Security Tips Every Crypto User Should Know
            </div>
            <div className="news-excerpt">
              Protect your digital assets with these essential security
              practices for cryptocurrency holders.
            </div>
            <div className="news-date">5 hours ago • SecurityDaily</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
