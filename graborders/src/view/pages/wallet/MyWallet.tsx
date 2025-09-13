import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import assetsActions from "src/modules/assets/list/assetsListActions";
import { useDispatch, useSelector } from "react-redux";
import assetsListSelectors from "src/modules/assets/list/assetsListSelectors";
function MyWallet() {
  const dispatch = useDispatch();
  const listAssets = useSelector(assetsListSelectors.selectRows);
  console.log("====================================");
  console.log(listAssets);
  console.log("====================================");
  const [activeItem, setActiveItem] = useState<string>("/deposit");

  const quickActions = [
    {
      path: "/deposit",
      icon: "fas fa-wallet",
      name: "Deposit",
    },
    {
      path: "/withdraw",
      icon: "fas fa-money-bill-wave",
      name: "Withdraw",
    },
    {
      path: "/history",
      icon: "fas fa-history",
      name: "History",
    },
    {
      path: "/conversion",
      icon: "fas fa-exchange-alt action-icon",
      name: "Convert",
    },
    {
      path: "/stacking",
      icon: "fas fa-coins action-icon",
      name: "Staking",
    },
  ];

  // Assets data based on deposit networks
  const assets = [
    {
      id: "btc",
      name: "Bitcoin",
      icon: "fab fa-btc",
      amount: "0.2543 BTC",
      value: "$10,245.67",
      change: "+1.46%",
      color: "#F3BA2F",
    },
    {
      id: "eth",
      name: "Ethereum",
      icon: "fab fa-ethereum",
      amount: "3.421 ETH",
      value: "$8,532.18",
      change: "+2.31%",
      color: "#627EEA",
    },
    {
      id: "usdt",
      name: "Tether",
      icon: "fas fa-dollar-sign",
      amount: "1,250.50 USDT",
      value: "$1,250.50",
      change: "+0.01%",
      color: "#26A17B",
    },
    {
      id: "sol",
      name: "Solana",
      icon: "fas fa-bolt",
      amount: "18.75 SOL",
      value: "$1,845.23",
      change: "+5.12%",
      color: "#00FFA3",
    },
    {
      id: "xrp",
      name: "Ripple",
      icon: "fas fa-exchange-alt",
      amount: "1,240.75 XRP",
      value: "$623.41",
      change: "+0.85%",
      color: "#23292F",
    },
  ];

  useEffect(() => {
    dispatch(assetsActions.doFetch());
  }, []);

  return (
    <div className="wallet-container">
      {/* Header Section */}
      <div className="wallet-header">
        <div className="header-top">
          <div className="search-icon">
            <i className="fas fa-search" />
          </div>
          <div className="notification-profile">
            <i className="fas fa-bell header-notification-icon" />
            <Link to="/profile">
              <i className="fas fa-user-circle profile-icon" />
            </Link>
          </div>
        </div>
        <div className="wallet-total-balance">
          <div className="wallet-balance-label">Total Portfolio Value</div>
          <div className="wallet-balance-amount">$0</div>
          <div className="wallet-balance-change">+$0 (0%) Today</div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="quick-actions" style={{ paddingTop: 0 }}>
        {quickActions.map((item) => (
          <Link
            to={item.path}
            className="action-btn remove_blue"
            role="button"
            aria-label="Deposit cryptocurrency"
          >
            <div
              className={`action-circle ${
                activeItem === item.path ? "buy" : "other"
              }`}
            >
              <i className={`${item.icon} action-icon`} aria-hidden="true" />
            </div>
            <span className="action-text">{item.name}</span>
          </Link>
        ))}
      </div>
      {/* Assets Section */}
      <div className="wallet-assets-section">
        <div className="wallet-section-header"></div>
        <div className="wallet-asset-list">
          {/* List of assets */}

          {/* Assets Section */}
          <div className="wallet-assets-section">
            <div className="wallet-section-header">
              <div className="wallet-section-title">My Assets</div>
              <div className="wallet-see-all" role="button">
                Manage
              </div>
            </div>
            <div className="wallet-asset-list">
              {listAssets.map((asset) => (
                <div className="wallet-asset-item" role="button" key={asset.id}>
                  <div className="wallet-asset-info">
                    <div className="wallet-asset-icon">
                      <img
                        src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${asset.symbol}.png`}
                        style={{ width: 35, height: 35 }}
                        alt={asset.symbol}
                        onError={(e) => {
                          (
                            e.target as HTMLImageElement
                          ).src = `https://via.placeholder.com/40/3a3a3a/ffffff?text=${asset.symbol
                            .split("/")[0]
                            .charAt(0)}`;
                        }}
                      />
                    </div>
                    <div className="wallet-asset-details">
                      <div className="wallet-asset-name">{asset.coinName}</div>
                      <div className="wallet-asset-amount">
                        {asset.amount}&nbsp;{asset.symbol}
                      </div>
                    </div>
                  </div>
                  <div className="wallet-asset-value">
                    <div className="wallet-value-amount">$623.41</div>
                    <div className={`wallet-value-change ${"+2.31%"}`}>
                      +2.31%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyWallet;
