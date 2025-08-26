import React from "react";

import { Link } from "react-router-dom";
function Market() {
  return (
    <div className="container">
      {/* Header Section */}
      <div className="market-headers">
        <div className="market-page-title">Markets</div>
        {/* Search Bar */}
        <div className="search-bar">
          <i className="fas fa-search" style={{ color: "#AAAAAA" }} />
          <input type="text" placeholder="Search crypto" />
        </div>
      </div>
      {/* Market Tabs */}
      <div className="market-tabs">
        <div className="tab active">All</div>
        <div className="tab">Gainers</div>
        <div className="tab">Losers</div>
        <div className="tab">Favorites</div>
      </div>
      {/* Filter Options */}
      {/* Market List */}
      <div className="market-list">
        {/* BTC */}
        <div className="market-item">
          <Link to="/marketdetail" className="crypto-info remove_blue">
            <div className="crypto-icon btc">
              <i className="fab fa-btc" style={{ color: "#000" }} />
            </div>
            <div>
              <div className="crypto-name">BTC/USDT</div>
              <div className="crypto-volume">Vol: 42.5B</div>
            </div>
          </Link>
          <div className="price-info">
            <div className="price">$51,825.10</div>
            <div className="change positive">+1.46%</div>
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
            <div className="change positive">+2.31%</div>
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
            <div className="change positive">+0.16%</div>
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
            <div className="change positive">+5.12%</div>
          </div>
          <div className="chart">
            <i className="fas fa-chart-line" style={{ color: "#00C076" }} />
          </div>
        </div>
        {/* ADA */}
        <div className="market-item">
          <div className="crypto-info">
            <div className="crypto-icon ada">
              <i className="fas fa-chart-area" style={{ color: "#fff" }} />
            </div>
            <div>
              <div className="crypto-name">ADA/USDT</div>
              <div className="crypto-volume">Vol: 0.8B</div>
            </div>
          </div>
          <div className="price-info">
            <div className="price">$0.52</div>
            <div className="change negative">-0.87%</div>
          </div>
          <div className="chart">
            <i className="fas fa-chart-line" style={{ color: "#FF6838" }} />
          </div>
        </div>
        {/* DOGE */}
        <div className="market-item">
          <div className="crypto-info">
            <div className="crypto-icon doge">
              <i className="fas fa-dog" style={{ color: "#000" }} />
            </div>
            <div>
              <div className="crypto-name">DOGE/USDT</div>
              <div className="crypto-volume">Vol: 1.5B</div>
            </div>
          </div>
          <div className="price-info">
            <div className="price">$0.083</div>
            <div className="change negative">-2.35%</div>
          </div>
          <div className="chart">
            <i className="fas fa-chart-line" style={{ color: "#FF6838" }} />
          </div>
        </div>
        {/* DOT */}
        <div className="market-item">
          <div className="crypto-info">
            <div className="crypto-icon dot">
              <i className="fas fa-circle" style={{ color: "#fff" }} />
            </div>
            <div>
              <div className="crypto-name">DOT/USDT</div>
              <div className="crypto-volume">Vol: 0.6B</div>
            </div>
          </div>
          <div className="price-info">
            <div className="price">$6.92</div>
            <div className="change positive">+3.21%</div>
          </div>
          <div className="chart">
            <i className="fas fa-chart-line" style={{ color: "#00C076" }} />
          </div>
        </div>
        {/* AVAX */}
        <div className="market-item">
          <div className="crypto-info">
            <div className="crypto-icon avax">
              <i className="fas fa-mountain" style={{ color: "#fff" }} />
            </div>
            <div>
              <div className="crypto-name">AVAX/USDT</div>
              <div className="crypto-volume">Vol: 0.9B</div>
            </div>
          </div>
          <div className="price-info">
            <div className="price">$34.67</div>
            <div className="change positive">+1.87%</div>
          </div>
          <div className="chart">
            <i className="fas fa-chart-line" style={{ color: "#00C076" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Market;
