import React from "react";
import "./Styles/error.css";
import { Link } from "react-router-dom";
import { i18n } from "./../../../i18n";

function Error404Page() {
  return (
    <div className="container eroro">
      <div className="errorContainer">
        <div className="cryptoAnimation">
          <div className="cryptoIcon btcIcon">
            <i className="fab fa-btc" />
          </div>
          <div className="cryptoIcon ethIcon">
            <i className="fab fa-ethereum" />
          </div>
          <div className="cryptoIcon usdtIcon">
            <i className="fas fa-dollar-sign" />
          </div>
        </div>
        <div className="errorIcon">
          <i className="fas fa-exclamation-circle" />
        </div>
        <h1 className="errorCode">404</h1>
        <h2 className="errorTitle">Page Not Found</h2>
        <p className="errorMessage">
          The page you're looking for doesn't exist. It might have been moved or
          you entered the wrong address.
        </p>
        <a href="/" className="homeButton">
          <i className="fas fa-home" /> Go Back Home
        </a>
      </div>
    </div>
  );
}

export default Error404Page;
