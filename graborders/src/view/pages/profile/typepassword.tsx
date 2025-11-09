import React from "react";
import SubHeader from "src/view/shared/Header/SubHeader";
import { Link } from "react-router-dom";
import { i18n } from "../../../i18n";

function typepassword() {
  return (
    <div className="container">
      {/* Header */}
      <SubHeader title={i18n("pages.passwordType.title")} />
      
      {/* Password Options */}
      <div className="card">
        <h2 className="card-title">{i18n("pages.passwordType.cardTitle")}</h2>
        <div className="password-options">
          <Link to="/loginpassword" className="password-option remove_blue">
            <div className="option-icon">
              <i className="fas fa-key" />
            </div>
            <div className="option-content">
              <div className="option-title">
                {i18n("pages.passwordType.options.login.title")}
              </div>
              <div className="option-desc">
                {i18n("pages.passwordType.options.login.description")}
              </div>
            </div>
            <div className="option-arrow">
              <i className="fas fa-chevron-right" />
            </div>
          </Link>
          <Link to="/withdrawPassword" className="password-option remove_blue">
            <div className="option-icon">
              <i className="fas fa-lock" />
            </div>
            <div className="option-content">
              <div className="option-title">
                {i18n("pages.passwordType.options.withdrawal.title")}
              </div>
              <div className="option-desc">
                {i18n("pages.passwordType.options.withdrawal.description")}
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