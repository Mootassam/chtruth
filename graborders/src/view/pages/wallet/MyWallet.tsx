import React from 'react'
import {Link} from 'react-router-dom'
function MyWallet() {
  return (
<div className="wallet-container">
  {/* Header Section */}
  <div className="wallet-header">
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
    <div className="wallet-total-balance">
      <div className="wallet-balance-label">Total Portfolio Value</div>
      <div className="wallet-balance-amount">$11,286.39</div>
      <div className="wallet-balance-change">+$172.68 (1.53%) Today</div>
    </div>
  </div>
  {/* Assets Section */}
  <div className="wallet-assets-section">
    <div className="wallet-section-header">
      <div className="wallet-section-title">My Assets</div>
      <div className="wallet-see-all" role="button">
        Manage
      </div>
    </div>
    <div className="wallet-asset-list">
      {/* Bitcoin */}
      <div className="wallet-asset-item" role="button">
        <div className="wallet-asset-info">
          <div className="wallet-asset-icon wallet-btc">
            <i className="fab fa-btc" />
          </div>
          <div className="wallet-asset-details">
            <div className="wallet-asset-name">Bitcoin</div>
            <div className="wallet-asset-amount">0.1254 BTC</div>
          </div>
        </div>
        <div className="wallet-asset-value">
          <div className="wallet-value-amount">$6,542.36</div>
          <div className="wallet-value-change">+1.46%</div>
        </div>
      </div>
      {/* Ethereum */}
      <div className="wallet-asset-item" role="button">
        <div className="wallet-asset-info">
          <div className="wallet-asset-icon wallet-eth">
            <i className="fab fa-ethereum" />
          </div>
          <div className="wallet-asset-details">
            <div className="wallet-asset-name">Ethereum</div>
            <div className="wallet-asset-amount">3.456 ETH</div>
          </div>
        </div>
        <div className="wallet-asset-value">
          <div className="wallet-value-amount">$3,825.75</div>
          <div className="wallet-value-change">+2.31%</div>
        </div>
      </div>
      {/* BNB */}
      <div className="wallet-asset-item" role="button">
        <div className="wallet-asset-info">
          <div className="wallet-asset-icon wallet-bnb">
            <i className="fas fa-coins" />
          </div>
          <div className="wallet-asset-details">
            <div className="wallet-asset-name">BNB</div>
            <div className="wallet-asset-amount">12.56 BNB</div>
          </div>
        </div>
        <div className="wallet-asset-value">
          <div className="wallet-value-amount">$851.95</div>
          <div className="wallet-value-change">+0.16%</div>
        </div>
      </div>
      {/* USDC */}
      <div className="wallet-asset-item" role="button">
        <div className="wallet-asset-info">
          <div className="wallet-asset-icon wallet-usdc">
            <i className="fas fa-dollar-sign" />
          </div>
          <div className="wallet-asset-details">
            <div className="wallet-asset-name">USDC</div>
            <div className="wallet-asset-amount">1,065.42 USDC</div>
          </div>
        </div>
        <div className="wallet-asset-value">
          <div className="wallet-value-amount">$1,065.42</div>
          <div className="wallet-value-change">0.00%</div>
        </div>
      </div>
    </div>
  </div>
  {/* Transactions Section */}
  <div className="wallet-transactions-section">
    <div className="wallet-section-header">
      <div className="wallet-section-title">Recent Transactions</div>
      <div className="wallet-see-all" role="button">
        View All
      </div>
    </div>
    <div className="wallet-transaction-list">
      {/* Transaction 1 */}
      <div className="wallet-transaction-item" role="button">
        <div className="wallet-transaction-icon wallet-send">
          <i className="fas fa-arrow-up" />
        </div>
        <div className="wallet-transaction-details">
          <div className="wallet-transaction-type">Sent Bitcoin</div>
          <div className="wallet-transaction-date">Today, 10:23 AM</div>
        </div>
        <div className="wallet-transaction-amount">-0.025 BTC</div>
      </div>
      {/* Transaction 2 */}
      <div className="wallet-transaction-item" role="button">
        <div className="wallet-transaction-icon wallet-receive">
          <i className="fas fa-arrow-down" />
        </div>
        <div className="wallet-transaction-details">
          <div className="wallet-transaction-type">Received Ethereum</div>
          <div className="wallet-transaction-date">Yesterday, 2:45 PM</div>
        </div>
        <div className="wallet-transaction-amount">+1.25 ETH</div>
      </div>
      {/* Transaction 3 */}
      <div className="wallet-transaction-item" role="button">
        <div className="wallet-transaction-icon wallet-swap">
          <i className="fas fa-exchange-alt" />
        </div>
        <div className="wallet-transaction-details">
          <div className="wallet-transaction-type">Swapped BNB for USDC</div>
          <div className="wallet-transaction-date">Aug 25, 9:30 AM</div>
        </div>
        <div className="wallet-transaction-amount">-5.2 BNB</div>
      </div>
      {/* Transaction 4 */}
      <div className="wallet-transaction-item" role="button">
        <div className="wallet-transaction-icon wallet-receive">
          <i className="fas fa-arrow-down" />
        </div>
        <div className="wallet-transaction-details">
          <div className="wallet-transaction-type">Received Bitcoin</div>
          <div className="wallet-transaction-date">Aug 24, 4:12 PM</div>
        </div>
        <div className="wallet-transaction-amount">+0.075 BTC</div>
      </div>
    </div>
  </div>
  {/* Bottom Navigation */}
  <div className="wallet-bottom-nav">
    <div className="wallet-nav-item">
      <i className="fas fa-home wallet-nav-icon" aria-hidden="true" />
      <span>Home</span>
    </div>
    <div className="wallet-nav-item wallet-active">
      <i className="fas fa-wallet wallet-nav-icon" aria-hidden="true" />
      <span>Wallet</span>
    </div>
    <div className="wallet-nav-item">
      <i className="fas fa-chart-bar wallet-nav-icon" aria-hidden="true" />
      <span>Markets</span>
    </div>
    <div className="wallet-nav-item">
      <i className="fas fa-coins wallet-nav-icon" aria-hidden="true" />
      <span>Staking</span>
    </div>
    <div className="wallet-nav-item">
      <i className="fas fa-cube wallet-nav-icon" aria-hidden="true" />
      <span>Hub</span>
    </div>
  </div>
</div>




  )
}

export default MyWallet