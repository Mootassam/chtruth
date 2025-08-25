import React from 'react'
import {Link} from 'react-router-dom'
function MyWallet() {
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
    <div className="action-btn">
      <div className="action-circle buy">
        <i className="fas fa-plus action-icon" />
      </div>
      <span className="action-text">Buy</span>
    </div>
    <div className="action-btn">
      <div className="action-circle other">
        <i className="fas fa-minus action-icon" />
      </div>
      <span className="action-text">Sell</span>
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
    <div className="feature-btn">
      <i className="fas fa-chart-line feature-icon" />
      <span>Advanced Trade</span>
    </div>
    <div className="feature-btn">
      <i className="fas fa-money-bill-wave feature-icon" />
      <span>Top Up USDT</span>
    </div>
    <div className="feature-btn">
      <i className="fas fa-calendar feature-icon" />
      <span>Recurring Buy</span>
    </div>
  </div>
  {/* Favorites Section */}
  <div className="favorites-header">
    <div className="favorites-title">Favorites ▼</div>
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

</div>


  )
}

export default MyWallet