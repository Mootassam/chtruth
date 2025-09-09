import React ,{useState} from 'react'
import {Link} from 'react-router-dom'
function MyWallet() {
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
        <div className="quick-actions" style={{paddingTop:0}}>
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
    <div className="wallet-section-header">
      <div className="wallet-section-title">My Assets</div>
      <div className="wallet-see-all" role="button">
        Manage
      </div>
    </div>
    <div className="wallet-asset-list">
      {/* Bitcoin */}
      <div className="wallet-asset-item" role="button">
        <div className="wallet-asset-info">
          <div className="wallet-asset-icon wallet-btc">
            <i className="fab fa-btc" />
          </div>
          <div className="wallet-asset-details">
            <div className="wallet-asset-name">Bitcoin</div>
            <div className="wallet-asset-amount">0 BTC</div>
          </div>
        </div>
        <div className="wallet-asset-value">
          <div className="wallet-value-amount">$0</div>
          <div className="wallet-value-change">+1.46%</div>
        </div>
      </div>
      {/* Ethereum */}
      <div className="wallet-asset-item" role="button">
        <div className="wallet-asset-info">
          <div className="wallet-asset-icon wallet-eth">
            <i className="fab fa-ethereum" />
          </div>
          <div className="wallet-asset-details">
            <div className="wallet-asset-name">Ethereum</div>
            <div className="wallet-asset-amount">0 ETH</div>
          </div>
        </div>
        <div className="wallet-asset-value">
          <div className="wallet-value-amount">$0</div>
          <div className="wallet-value-change">+2.31%</div>
        </div>
      </div>
      {/* BNB */}
      <div className="wallet-asset-item" role="button">
        <div className="wallet-asset-info">
          <div className="wallet-asset-icon wallet-bnb">
            <i className="fas fa-coins" />
          </div>
          <div className="wallet-asset-details">
            <div className="wallet-asset-name">BNB</div>
            <div className="wallet-asset-amount">0 BNB</div>
          </div>
        </div>
        <div className="wallet-asset-value">
          <div className="wallet-value-amount">$0</div>
          <div className="wallet-value-change">+0.16%</div>
        </div>
      </div>
      {/* USDC */}
      <div className="wallet-asset-item" role="button">
        <div className="wallet-asset-info">
          <div className="wallet-asset-icon wallet-usdc">
            <i className="fas fa-dollar-sign" />
          </div>
          <div className="wallet-asset-details">
            <div className="wallet-asset-name">USDC</div>
            <div className="wallet-asset-amount">0 USDC</div>
          </div>
        </div>
        <div className="wallet-asset-value">
          <div className="wallet-value-amount">$0</div>
          <div className="wallet-value-change">0.00%</div>
        </div>
      </div>
    </div>
  </div>


</div>




  )
}

export default MyWallet