import React from 'react'

function Withdraw() {
  return (
    <div className="container">
  {/* Header Section */}
  <div className="header">
    <div className="header-top">
      <div className="back-button">
        <i className="fas fa-arrow-left" />
      </div>
      <div className="page-title">Withdraw Crypto</div>
      <div style={{ width: 20 }} /> {/* For spacing */}
    </div>
  </div>
  {/* Currency Selection */}
  <div className="currency-selection">
    <div className="section-title">Select Currency</div>
    <div className="currency-options">
      <div className="currency-option active" data-currency="btc">
        <div className="currency-icon btc-color">
          <i className="fab fa-btc" />
        </div>
        <div className="currency-name">Bitcoin</div>
        <div className="currency-balance">0.2543 BTC</div>
      </div>
      <div className="currency-option" data-currency="eth">
        <div className="currency-icon eth-color">
          <i className="fab fa-ethereum" />
        </div>
        <div className="currency-name">Ethereum</div>
        <div className="currency-balance">1.842 ETH</div>
      </div>
      <div className="currency-option" data-currency="usdt">
        <div className="currency-icon usdt-color">
          <i className="fas fa-dollar-sign" />
        </div>
        <div className="currency-name">USDT</div>
        <div className="currency-balance">1250.50 USDT</div>
      </div>
    </div>
  </div>
  {/* Form Section */}
  <div className="form-section">
    {/* Withdrawal Address */}
    <div className="input-group">
      <label className="input-label">Withdrawal Address</label>
      <div className="input-container">
        <input
          type="text"
          className="text-input"
          id="withdrawal-address"
          placeholder="Enter wallet address"
        />
        <div className="network-address" id="network-info">
          Network: Bitcoin (BTC)
        </div>
      </div>
    </div>
    {/* Amount */}
    <div className="input-group">
      <label className="input-label">Withdrawal Amount</label>
      <div className="input-container">
        <div className="amount-row">
          <input
            type="number"
            className="amount-input"
            id="amount-input"
            placeholder={0.0}
          />
          <button className="max-button" id="max-button">
            MAX
          </button>
        </div>
        <div className="available-balance">
          Available: <span id="available-balance">0.2543 BTC</span>
        </div>
      </div>
    </div>
    {/* Withdrawal Password */}
    <div className="input-group">
      <label className="input-label">Withdrawal Password</label>
      <div className="input-container">
        <input
          type="password"
          className="text-input"
          id="withdrawal-password"
          placeholder="Enter withdrawal password"
        />
      </div>
    </div>
    {/* Fee Information */}
    <div className="fee-info">
      <div className="fee-item">
        <div className="fee-label">Minimum withdrawal</div>
        <div className="fee-value" id="min-withdrawal">
          0.001 BTC
        </div>
      </div>
      <div className="fee-item">
        <div className="fee-label">Network fee</div>
        <div className="fee-value" id="network-fee">
          0.0005 BTC
        </div>
      </div>
      <div className="fee-item">
        <div className="fee-label">Service fee</div>
        <div className="fee-value" id="service-fee">
          0.0001 BTC
        </div>
      </div>
      <div className="fee-item receive-amount">
        <div className="fee-label">You will receive</div>
        <div className="fee-value" id="receive-amount">
          0.0000 BTC
        </div>
      </div>
    </div>
    {/* Security Notice */}
    <div className="security-notice">
      <div className="security-header">
        <i className="fas fa-shield-alt security-icon" />
        <div className="security-title">Security Verification</div>
      </div>
      <div className="security-text">
        For your security, withdrawals require password confirmation and may be
        subject to review. Withdrawals to incorrect addresses cannot be
        reversed.
      </div>
    </div>
    {/* Withdraw Button */}
    <button className="withdraw-button" id="withdraw-button" disabled="">
      Confirm Withdrawal
    </button>
  </div>
  {/* Toast Notification */}
  <div className="toast" id="toast">
    Withdrawal address copied!
  </div>
</div>

  )
}

export default Withdraw