import React from "react";
import SubHeader from "src/view/shared/Header/SubHeader";

function formWithdrawAdress() {
  return (
    <div className="container">
      {/* Header */}
   
      <SubHeader title="Withdrawal Address" />
      {/* Selected Currency */}
      <div className="card compact-section">
        <div className="card-title">CURRENCY TYPE</div>
        <div className="selected-currency">
          <div className="currency-icon">
            <i className="fab fa-bitcoin" />
          </div>
          <div className="currency-name">BTC (Bitcoin)</div>
        </div>
      </div>
      {/* Withdrawal Form */}
      <div className="card">
        <div className="card-title small-margin">WITHDRAWAL ADDRESS</div>
        <div className="form-group">
          <label className="form-label">Address</label>
          <div className="input-with-button">
            <input
              type="text"
              className="form-input"
              placeholder="Enter wallet address"
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
            className="password-input"
            placeholder="Enter your password"
            id="passwordInput"
          />
        </div>
        <button className="save-button" onclick="saveAddress()">
          SAVE
        </button>
      </div>
      {/* Notification */}
      <div className="notification" id="notification">
        Address saved successfully!
      </div>
      {/* Bottom Navigation */}
     
    </div>
  );
}

export default formWithdrawAdress;
