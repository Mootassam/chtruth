import React from 'react'

function Trade() {
  return (
   <div className="container">
  {/* Header Section */}
<div className="trade-header">
  <div className="trade-header-top">
    <div className="trade-page-title">SPOT</div>
    <div className="settings-icon">
      <i className="fas fa-cog" />
    </div>
  </div>
  <div className="market-info">
    <div className="market-name">BTC/USDT</div>
    <div className="coin-select-icon">
      <i className="fas fa-chevron-down" />
    </div>
    <div className="market-change">+0.37%</div>
  </div>
</div>

  {/* Main Content */}
  <div className="main-content">
    {/* Trading Layout */}
    <div className="trading-layout">
      {/* Trade Form */}
      <div className="trade-form">
        {/* Buy/Sell Tabs */}
        <div className="buy-sell-tabs">
          <div className="buy-tab active">BUY</div>
          <div className="sell-tab">SELL</div>
        </div>
        {/* Order Type */}
        <div className="order-type">
          <div className="order-type-label">Order Type</div>
          <select className="order-type-select">
            <option>LIMIT</option>
            <option>MARKET</option>
            <option>STOP-LIMIT</option>
          </select>
        </div>
        {/* Price Input */}
        <div className="input-group">
          <div className="input-label">Price (USDT)</div>
          <div className="input-with-buttons">
            <input className="value-input" defaultValue="51248.06" />
            <div className="value-buttons">
              <button className="value-button">+</button>
              <button className="value-button">-</button>
            </div>
          </div>
        </div>
        {/* Quantity Input */}
        <div className="input-group">
          <div className="input-label">Amount (BTC)</div>
          <div className="input-with-buttons">
            <input className="value-input" placeholder={0.0} />
            <div className="value-buttons">
              <button className="value-button">+</button>
              <button className="value-button">-</button>
            </div>
          </div>
        </div>
        {/* Amount Display */}
        <div className="amount-display">0.00 USDT</div>
        {/* Balance Info */}
        <div className="balance-info">Available: 5,230.50 USDT</div>
        {/* Action Button */}
        <button className="action-button buy-button">BUY</button>
      </div>
      {/* Order Book */}
      <div className="order-book">
        <div className="order-book-header">
          <span>Price (USDT)</span>
          <span>Amount (BTC)</span>
        </div>
        {/* Asks (Sell Orders) */}
        <div className="order-book-row ask-row">
          <div className="order-price">51,279.00</div>
          <div className="order-amount">0.1201</div>
        </div>
        <div className="order-book-row ask-row">
          <div className="order-price">51,275.42</div>
          <div className="order-amount">0.0843</div>
        </div>
        <div className="order-book-row ask-row">
          <div className="order-price">51,271.88</div>
          <div className="order-amount">0.0325</div>
        </div>
        <div className="order-book-row ask-row">
          <div className="order-price">51,270.99</div>
          <div className="order-amount">0.0187</div>
        </div>
        <div className="order-book-row ask-row">
          <div className="order-price">51,268.66</div>
          <div className="order-amount">0.0152</div>
        </div>
        {/* Current Price */}
        <div className="order-book-row current-price-row" />
        {/* Bids (Buy Orders) */}
        <div className="order-book-row bid-row">
          <div className="order-price">51,245.50</div>
          <div className="order-amount">0.1843</div>
        </div>
        <div className="order-book-row bid-row">
          <div className="order-price">51,242.30</div>
          <div className="order-amount">0.2572</div>
        </div>
        <div className="order-book-row bid-row">
          <div className="order-price">51,240.15</div>
          <div className="order-amount">0.1431</div>
        </div>
        <div className="order-book-row bid-row">
          <div className="order-price">51,238.90</div>
          <div className="order-amount">0.0829</div>
        </div>
        <div className="order-book-row bid-row">
          <div className="order-price">51,235.75</div>
          <div className="order-amount">0.1165</div>
        </div>
      </div>
    </div>
    {/* Open Orders */}
    <div className="open-orders">
      <div className="open-orders-header">
        <div className="open-orders-title">OPEN ORDERS</div>
        <div className="orders-list-icon">
          <i className="fas fa-list" />
        </div>
      </div>
      <div className="empty-orders">
        <div className="empty-icon">
          <i className="fas fa-city" />
        </div>
        <div className="empty-text">No open orders yet</div>
      </div>
    </div>
  </div>

</div>

  )
}

export default Trade