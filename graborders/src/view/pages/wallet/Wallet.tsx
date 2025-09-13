import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import assetsActions from "src/modules/assets/list/assetsListActions";
import assetsListSelectors from "src/modules/assets/list/assetsListSelectors";

function MyWallet() {
  const dispatch = useDispatch();
  const location = useLocation();
  const listAssets = useSelector(assetsListSelectors.selectRows);
  const [activeItem, setActiveItem] = useState<string>(location.pathname);

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

  // Calculate total portfolio value from assets
  const calculateTotalValue = () => {
    // This should be replaced with actual calculation from your data
    return listAssets.reduce((total, asset) => total + (asset.value || 0), 0);
  };

  useEffect(() => {
    dispatch(assetsActions.doFetch());
  }, [dispatch]);

  // Update active item when route changes
  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

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
          <div className="wallet-balance-amount">
            ${calculateTotalValue().toLocaleString()}
          </div>
          <div className="wallet-balance-change">+$0 (0%) Today</div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="quick-actions">
        {quickActions.map((item) => (
          <Link
            to={item.path}
            className="action-btn remove_blue"
            role="button"
            aria-label={`${item.name} cryptocurrency`}
            key={item.path}
          >
            <div
              className={`action-circle ${
                activeItem === item.path ? "active" : ""
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
        <div className="wallet-section-header">
          <div className="wallet-section-title">My Assets</div>
          <div className="wallet-see-all" role="button">
            Manage
          </div>
        </div>
        <div className="wallet-asset-list">
          {listAssets.length > 0 ? (
            listAssets.map((asset) => (
              <Link to={`/wallets/${asset.symbol}`} className="remove_blue">
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
                    <div className="wallet-value-amount">
                      ${(asset.value || 0).toLocaleString()}
                    </div>
                    <div
                      className={`wallet-value-change ${
                        asset.change >= 0 ? "positive" : "negative"
                      }`}
                    >
                      {asset.change >= 0 ? "+" : ""}
                      {asset.change || 0}%
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="no-assets">No assets found</div>
          )}
        </div>
      </div>
      <style>
        {`.wallet-container {
  max-width: 400px;
  margin: 0 auto;
  padding-bottom: 70px;
  background-color: #000000;
  color: #FFFFFF;
  min-height: 100vh;
}

/* Header Section */
.wallet-header {
  background-color: #000000;
  padding: 20px 15px 15px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-icon, .header-notification-icon {
  color: #FFFFFF;
  font-size: 20px;
  cursor: pointer;
}

.notification-profile {
  display: flex;
  gap: 15px;
  align-items: center;
}

.profile-icon {
  color: #FFFFFF;
  font-size: 24px;
}

/* Total Balance */
.wallet-total-balance {
  background: linear-gradient(135deg, #2A2A2A 0%, #1A1A1A 100%);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  text-align: center;
}

.wallet-balance-label {
  color: #AAAAAA;
  font-size: 14px;
  margin-bottom: 8px;
}

.wallet-balance-amount {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 8px;
}

.wallet-balance-change {
  color: #00C076;
  font-size: 14px;
}

/* Quick Actions */
.quick-actions {
  display: flex;
  justify-content: space-around;
  padding: 15px 0;
  background-color: #000000;
  border-bottom: 1px solid #2A2A2A;
}

.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #CCCCCC;
}

.action-circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2A2A2A;
  margin-bottom: 8px;
  transition: background-color 0.2s ease;
}

.action-circle.active, .action-circle:hover {
  background-color: #F3BA2F;
  color: #000000;
}

.action-icon {
  font-size: 20px;
}

.action-text {
  font-size: 12px;
}

.remove_blue {
  color: inherit;
}

/* Assets Section */
.wallet-assets-section {
  padding: 0 15px;
}

.wallet-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  margin-top: 20px;
}

.wallet-section-title {
  font-weight: bold;
  font-size: 18px;
}

.wallet-see-all {
  color: #CCCCCC;
  font-size: 14px;
  cursor: pointer;
}

.wallet-asset-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.wallet-asset-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #1A1A1A;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.wallet-asset-item:hover {
  background-color: #2A2A2A;
}

.wallet-asset-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.wallet-asset-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #2A2A2A;
}

.wallet-asset-details {
  display: flex;
  flex-direction: column;
}

.wallet-asset-name {
  font-weight: bold;
  margin-bottom: 4px;
}

.wallet-asset-amount {
  color: #AAAAAA;
  font-size: 12px;
}

.wallet-asset-value {
  text-align: right;
}

.wallet-value-amount {
  font-weight: bold;
  margin-bottom: 4px;
}

.wallet-value-change {
  font-size: 12px;
}

.wallet-value-change.positive {
  color: #00C076;
}

.wallet-value-change.negative {
  color: #FF6838;
}

.no-assets {
  text-align: center;
  padding: 20px;
  color: #AAAAAA;
}

@media (max-width: 480px) {
  .wallet-container {
    padding-bottom: 80px;
  }
  
  .action-circle {
    width: 45px;
    height: 45px;
  }
  
  .action-text {
    font-size: 11px;
  }
}`}
      </style>
    </div>
  );
}

export default MyWallet;
