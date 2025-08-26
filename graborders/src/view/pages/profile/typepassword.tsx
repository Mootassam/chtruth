import React from "react";
import SubHeader from "src/view/shared/Header/SubHeader";
import { Link } from "react-router-dom";
function typepassword() {
  return (
    <div className="container">
      {/* Header */}

      <SubHeader title="Password Type" />
      {/* Password Options */}
      <div className="card">
        <h2 className="card-title">SELECT PASSWORD TYPE</h2>
        <div className="password-options">
          <Link to="/loginpassword" href="#" className="password-option">
            <div className="option-icon">
              <i className="fas fa-key" />
            </div>
            <div className="option-content">
              <div className="option-title">Login Password</div>
              <div className="option-desc">
                Change your account login password
              </div>
            </div>
            <div className="option-arrow">
              <i className="fas fa-chevron-right" />
            </div>
          </Link>
          <Link to="/withdrawPassword" href="#" className="password-option">
            <div className="option-icon">
              <i className="fas fa-lock" />
            </div>
            <div className="option-content">
              <div className="option-title">Withdrawal Password</div>
              <div className="option-desc">
                Change your crypto withdrawal password
              </div>
            </div>
            <div className="option-arrow">
              <i className="fas fa-chevron-right" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default typepassword;
