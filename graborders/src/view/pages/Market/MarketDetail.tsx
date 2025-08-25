import React from 'react'

function MarketDetail() {
  return (
   <div className="container">
  {/* Header Section */}
  <div className="header">
    <div className="header-top">
      <div className="back-button">
        <i className="fas fa-arrow-left" />
      </div>
      <div className="market-info">
        <div className="market-icon">
          <i className="fab fa-btc" />
        </div>
        <div className="market-name">BTC/USDT</div>
        <div className="market-change">+2.31%</div>
      </div>
      <div style={{ width: 20 }} />
    </div>
    <div className="market-price">$51,825.10</div>
    <div className="market-stats">
      <span>24h High: $52,120.40</span>
      <span>24h Vol: 42.5B USDT</span>
      <span>24h Low: $50,920.30</span>
    </div>
  </div>
  {/* Trading View Chart */}
  <div className="chart-container">
    <div className="chart-placeholder">
      <i className="fas fa-chart-line" />
      <span>Trading View Chart</span>
    </div>
    <div className="chart-controls">
      <select className="chart-timeframe">
        <option>1h</option>
        <option>4h</option>
        <option>1d</option>
        <option>1w</option>
      </select>
    </div>
  </div>
  {/* Recent Trades */}
  <div className="section-title">Recent Trades</div>
  <div className="recent-trades">
    <div className="trades-header">
      <span>Price (USDT)</span>
      <span>Amount (BTC)</span>
      <span>Time</span>
    </div>
    <div className="trade-row buy-trade">
      <div className="trade-price">51,825.50</div>
      <div className="trade-amount">0.124</div>
      <div className="trade-time">12:45:23</div>
    </div>
    <div className="trade-row buy-trade">
      <div className="trade-price">51,825.20</div>
      <div className="trade-amount">0.543</div>
      <div className="trade-time">12:45:21</div>
    </div>
    <div className="trade-row sell-trade">
      <div className="trade-price">51,824.80</div>
      <div className="trade-amount">1.234</div>
      <div className="trade-time">12:45:18</div>
    </div>
    <div className="trade-row buy-trade">
      <div className="trade-price">51,825.10</div>
      <div className="trade-amount">0.876</div>
      <div className="trade-time">12:45:15</div>
    </div>
    <div className="trade-row sell-trade">
      <div className="trade-price">51,823.90</div>
      <div className="trade-amount">0.453</div>
      <div className="trade-time">12:45:10</div>
    </div>
    <div className="trade-row buy-trade">
      <div className="trade-price">51,824.50</div>
      <div className="trade-amount">0.321</div>
      <div className="trade-time">12:45:05</div>
    </div>
    <div className="trade-row sell-trade">
      <div className="trade-price">51,823.20</div>
      <div className="trade-amount">0.765</div>
      <div className="trade-time">12:45:01</div>
    </div>
    <div className="trade-row buy-trade">
      <div className="trade-price">51,824.00</div>
      <div className="trade-amount">0.432</div>
      <div className="trade-time">12:44:58</div>
    </div>
    <div className="trade-row sell-trade">
      <div className="trade-price">51,822.50</div>
      <div className="trade-amount">1.123</div>
      <div className="trade-time">12:44:55</div>
    </div>
    <div className="trade-row buy-trade">
      <div className="trade-price">51,823.10</div>
      <div className="trade-amount">0.654</div>
      <div className="trade-time">12:44:52</div>
    </div>
  </div>
  {/* Buy/Sell Buttons */}
  <div className="action-buttons">
    <button className="action-button buy-button">BUY</button>
    <button className="action-button sell-button">SELL</button>
  </div>
</div>

  )
}

export default MarketDetail