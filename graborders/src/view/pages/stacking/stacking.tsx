import React from "react";
import SubHeader from "src/view/shared/Header/SubHeader";

function stacking() {
  return (
    <div className="container">
      {/* Header Section */}
      <SubHeader title="Stacking" />
      {/* Staking Overview */}
      <div className="staking-overview">
        <div className="staking-title">Your Staking Portfolio</div>
        <div className="total-staked">Total Staked</div>
        <div className="staked-amount">$4,382.75</div>
        <div className="earnings">
          <div className="earned-item">
            <div className="earned-label">Earned (24h)</div>
            <div className="earned-amount">$12.48</div>
          </div>
          <div className="earned-item">
            <div className="earned-label">Total Earned</div>
            <div className="earned-amount">$382.75</div>
          </div>
        </div>
      </div>
      {/* Staking Options */}
      <div className="staking-options">
        <div className="section-title">Available for Staking</div>
        <div className="option-tabs">
          <button className="option-tab active">All</button>
          <button className="option-tab">High APY</button>
          <button className="option-tab">Stablecoins</button>
        </div>
        <div className="staking-cards">
          {/* Crypto 1 */}
          <div className="staking-card">
            <div className="crypto-icon">
              <i className="fab fa-bitcoin" />
            </div>
            <div className="crypto-info">
              <div className="crypto-name">Bitcoin</div>
              <div className="crypto-apy">APY: 5.25%</div>
            </div>
            <div className="crypto-balance">
              <div className="balance-amount">0.0245 BTC</div>
              <div className="balance-value">$1,245.80</div>
            </div>
          </div>
          {/* Crypto 2 */}
          <div className="staking-card">
            <div className="crypto-icon">
              <i className="fab fa-ethereum" />
            </div>
            <div className="crypto-info">
              <div className="crypto-name">Ethereum</div>
              <div className="crypto-apy">APY: 6.72%</div>
            </div>
            <div className="crypto-balance">
              <div className="balance-amount">4.82 ETH</div>
              <div className="balance-value">$2,382.45</div>
            </div>
          </div>
          {/* Crypto 3 */}
          <div className="staking-card">
            <div className="crypto-icon">
              <i className="fas fa-coins" />
            </div>
            <div className="crypto-info">
              <div className="crypto-name">Cardano</div>
              <div className="crypto-apy">APY: 7.15%</div>
            </div>
            <div className="crypto-balance">
              <div className="balance-amount">0 ADA</div>
              <div className="balance-value">$0.00</div>
            </div>
          </div>
          {/* Crypto 4 */}
          <div className="staking-card">
            <div className="crypto-icon">
              <i className="fas fa-dollar-sign" />
            </div>
            <div className="crypto-info">
              <div className="crypto-name">USDT</div>
              <div className="crypto-apy">APY: 8.30%</div>
            </div>
            <div className="crypto-balance">
              <div className="balance-amount">750.50 USDT</div>
              <div className="balance-value">$750.50</div>
            </div>
          </div>
        </div>
      </div>
      {/* Staking Form */}
      <div className="staking-form">
        <div className="form-title">Stake Ethereum</div>
        <input
          type="number"
          className="amount-input"
          placeholder={0.0}
          defaultValue="0.5"
        />
        <div className="amount-options">
          <button className="amount-option">25%</button>
          <button className="amount-option">50%</button>
          <button className="amount-option active">75%</button>
          <button className="amount-option">Max</button>
        </div>
        <div className="staking-details">
          <div className="detail-row">
            <span className="detail-label">APY</span>
            <span className="detail-value">6.72%</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Est. Annual Earnings</span>
            <span className="detail-value">0.0336 ETH</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Unstaking Period</span>
            <span className="detail-value">7 days</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Minimum Amount</span>
            <span className="detail-value">0.1 ETH</span>
          </div>
        </div>
        <button className="stake-button">Stake Now</button>
      </div>
      {/* Staking History */}
      <div className="staking-history">
        <div className="history-header">
          <div className="history-title">Staking History</div>
          <a href="#" className="view-all">
            View All
          </a>
        </div>
        <ul className="history-list">
          <li className="history-item">
            <div className="history-info">
              <div className="history-name">Ethereum Staking</div>
              <div className="history-date">Jun 15, 2023</div>
            </div>
            <div className="history-amount">
              <div className="history-value">+2.5 ETH</div>
              <div className="history-status">Completed</div>
            </div>
          </li>
          <li className="history-item">
            <div className="history-info">
              <div className="history-name">Bitcoin Staking</div>
              <div className="history-date">May 28, 2023</div>
            </div>
            <div className="history-amount">
              <div className="history-value">+0.15 BTC</div>
              <div className="history-status">Completed</div>
            </div>
          </li>
          <li className="history-item">
            <div className="history-info">
              <div className="history-name">USDT Staking</div>
              <div className="history-date">May 15, 2023</div>
            </div>
            <div className="history-amount">
              <div className="history-value">+500 USDT</div>
              <div className="history-status status-pending">Unstaking</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default stacking;
