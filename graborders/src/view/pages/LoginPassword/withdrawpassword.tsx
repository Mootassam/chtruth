import React from "react";
import SubHeader from "src/view/shared/Header/SubHeader";

function LoginPassword() {
  return (
    <div className="container">
      {/* Header */}
  
      <SubHeader title="Withdraw Password" />
      {/* Password Form */}
      <div className="card">
        <h2 className="card-title">CHANGE LOGIN PASSWORD</h2>
        <div className="form-group">
          <label className="form-label">Password</label>
          <div className="password-input-container">
            <input
              type="password"
              className="form-input"
              placeholder="Enter your current password"
            />
            <button className="toggle-password" type="button">
              <i className="fas fa-eye" />
            </button>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Confirm Password</label>
          <div className="password-input-container">
            <input
              type="password"
              className="form-input"
              placeholder="Confirm your new password"
            />
            <button className="toggle-password" type="button">
              <i className="fas fa-eye" />
            </button>
          </div>
        </div>
        <button className="save-button">SAVE CHANGES</button>
        <p className="warning-message">
          For the safety of your funds, withdrawals are not allowed within 24
          hours after the login password has been changed.
        </p>
      </div>

    </div>
  );
}

export default LoginPassword;
