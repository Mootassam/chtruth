import React from "react";

function LoginPassword() {
  return (
    <>
      {/* Header */}
      <div className="header">
        <a href="#" className="back-button">
          <i className="fas fa-arrow-left" />
        </a>
        <h1 className="page-title">Login Password</h1>
      </div>
      {/* Password Form */}
      <div className="card">
        <h2 className="card-title">CHANGE LOGIN PASSWORD</h2>
        <div className="form-group">
          <label className="form-label">Old Password</label>
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
          <label className="form-label">New Password</label>
          <div className="password-input-container">
            <input
              type="password"
              className="form-input"
              placeholder="Create a new password"
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
      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <a href="#" className="nav-item">
          <i className="fas fa-home nav-icon" />
          <span>Home</span>
        </a>
        <a href="#" className="nav-item">
          <i className="fas fa-wallet nav-icon" />
          <span>Wallet</span>
        </a>
        <a href="#" className="nav-item">
          <i className="fas fa-chart-line nav-icon" />
          <span>Markets</span>
        </a>
        <a href="#" className="nav-item">
          <i className="fas fa-coins nav-icon" />
          <span>Staking</span>
        </a>
        <a href="#" className="nav-item active">
          <i className="fas fa-user nav-icon" />
          <span>Profile</span>
        </a>
      </div>
    </>
  );
}

export default LoginPassword;
