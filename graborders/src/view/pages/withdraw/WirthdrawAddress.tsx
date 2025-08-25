import React from 'react'
import SubHeader from 'src/view/shared/Header/SubHeader'

function WirthdrawAddress() {
  return (
   <div className='container'>
  {/* Currency Selection Page */}
  <div id="currency-page">


    <SubHeader title="Withdrawal Address" />
    <div className="card">
      <h2 className="card-title">CURRENCY TYPE</h2>
      <div className="currency-options">
        <a
          href="#withdrawal-page"
          className="currency-option"
          onclick="selectCurrency('BTC')"
        >
          <div className="currency-icon">
            <i className="fab fa-bitcoin" />
          </div>
          <div className="currency-name">BTC (Bitcoin)</div>
          <div className="currency-arrow">
            <i className="fas fa-chevron-right" />
          </div>
        </a>
        <a
          href="#withdrawal-page"
          className="currency-option"
          onclick="selectCurrency('ETH')"
        >
          <div className="currency-icon">
            <i className="fab fa-ethereum" />
          </div>
          <div className="currency-name">ETH (Ethereum)</div>
          <div className="currency-arrow">
            <i className="fas fa-chevron-right" />
          </div>
        </a>
        <a
          href="#withdrawal-page"
          className="currency-option"
          onclick="selectCurrency('USDT')"
        >
          <div className="currency-icon">
            <i className="fas fa-dollar-sign" />
          </div>
          <div className="currency-name">USDT (Tether)</div>
          <div className="currency-arrow">
            <i className="fas fa-chevron-right" />
          </div>
        </a>
      </div>
    </div>
  </div>
  {/* Withdrawal Address Page */}
  <div id="withdrawal-page">
    <div className="profile-header">
      <a href="#currency-page" className="back-button">
        <i className="fas fa-arrow-left" />
      </a>
      <h1 className="profile-title">Withdrawal Address</h1>
    </div>
    <div className="card">
      <h2 className="card-title">CURRENCY TYPE</h2>
      <div className="selected-currency" id="selectedCurrency">
        <div className="currency-icon">
          <i className="fab fa-bitcoin" />
        </div>
        <div className="currency-name">BTC (Bitcoin)</div>
      </div>
    </div>
    <div className="card">
      <h2 className="card-title">Please enter the withdrawal address</h2>
      <div className="divider" />
      <div className="form-group">
        <label className="form-label">Withdrawal Address</label>
        <div className="input-with-button">
          <input
            type="text"
            className="form-input"
            placeholder="Please enter the withdrawal address"
            id="addressInput"
          />
          <button className="paste-button" onclick="pasteAddress()">
            PASTE
          </button>
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Crypto Withdrawal Password</label>
        <input
          type="password"
          className="form-input"
          placeholder="Enter your withdrawal password"
          id="passwordInput"
        />
      </div>
      <button className="save-button" onclick="saveAddress()">
        SAVE
      </button>
    </div>
  </div>
 
</div>

  )
}

export default WirthdrawAddress