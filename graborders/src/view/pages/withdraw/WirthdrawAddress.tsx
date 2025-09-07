import React from "react";
import SubHeader from "src/view/shared/Header/SubHeader";
import { Link } from "react-router-dom";

function WirthdrawAddress() {
  const currencyOptions = [
    {
      path: "/formwithdrawaddress/btc",
      label: "BTC (Bitcoin)",
      icon: "fab fa-bitcoin",
    },
    {
      path: "/formwithdrawaddress/eth",
      label: "ETH (Ethereum)",
      icon: "fab fa-ethereum",
    },
    {
      path: "/formwithdrawaddress/tether",
      label: "USDT (Tether)",
      icon: "fas fa-chevron-right",
    },
  ];
  return (
    <div className="container">
      {/* Currency Selection Page */}
      <div id="currency-page">
        <SubHeader title="Withdrawal Address" />
        <div className="card">
          <h2 className="card-title">CURRENCY TYPE</h2>
          <div className="currency-options">
            {currencyOptions.map((item, index) => (
              <Link
                to={item.path}
                className="currency-option remove_blue"
                key={index}
              >
                <div className="currency-icon">
                  <i className={item.icon} />
                </div>
                <div className="currency-name">{item.label}</div>
                <div className="currency-arrow">
                  <i className="fas fa-chevron-right" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WirthdrawAddress;
