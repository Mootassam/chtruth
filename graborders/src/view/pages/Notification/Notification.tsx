import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"; // Import useHistory
import SubHeader from "src/view/shared/Header/SubHeader";
import { useDispatch, useSelector } from "react-redux";
import notificationFormActions from "src/modules/notification/form/notificationFormActions";
import notificationListActions from "src/modules/notification/list/notificationListActions";
import notificationListSelectors from "src/modules/notification/list/notificationListSelectors";
import Dates from "src/view/shared/utils/Dates";

const typeConfig = {
  deposit: {
    icon: "fas fa-arrow-down",
    title: "Deposit Received",
    getMessage: (item) =>
      `Your deposit of ${item.message} has been confirmed and credited to your wallet.`,
  },
  withdraw: {
    icon: "fas fa-arrow-up",
    title: "Withdrawal Successful",
    getMessage: (item) =>
      `Your withdrawal of ${item.message} has been processed successfully.`,
  },
  staking: {
    icon: "fas fa-coins",
    title: "Staking Profit",
    getMessage: (item) =>
      `You earned ${item.message} from your staking rewards.`,
  },
  commission: {
    icon: "fas fa-hand-holding-dollar",
    title: "Commission Received",
    getMessage: (item) => `You received a commission of ${item.message}.`,
  },
  kyc: {
    icon: "fas fa-id-card",
    title: "KYC Update",
    getMessage: (item) => item.message || "Your account has been activated.",
  },
  futures: {
    icon: "fas fa-chart-line",
    title: "Futures Update",
    getMessage: (item) =>
      `Your futures transaction amount ${item.message} has been executed.`,
  },
  accountActivated: {
    icon: "fas fa-user-check",
    title: "Account Activated",
    getMessage: () => "Your account has been activated.",
  },
  custom: {
    icon: "fas fa-bell",
    title: "Notification",
    getMessage: (item) => item.message || "You have a new notification.",
  },
};

function Notification() {
  const dispatch = useDispatch();
  const history = useHistory(); // Initialize useHistory
  const allNotification = useSelector(notificationListSelectors.selectRows);
  const loadingNotification = useSelector(
    notificationListSelectors.selectLoading
  );
  const [activeFilter, setActiveFilter] = useState("all"); // Track active filter

  useEffect(() => {
    // Send empty string for "All" filter, otherwise send the status
    const status = activeFilter === "all" ? "" : activeFilter;
    dispatch(notificationListActions.doFetch(status));
  }, [dispatch, activeFilter]);

  const handleNotificationClick = (item) => {
    // Mark as read first
    dispatch(notificationFormActions.doUpdate(item.id));

    // If it's an account activation notification, redirect to profile
    if (item.type === "accountActivated") {
      // Refresh the page and redirect to profile
      window.location.href = "/profile"; // This will do a full page refresh and redirect
      // Alternatively, if you want to use React Router without refresh:
      // history.push('/profile');
      // window.location.reload(); // If you want to force refresh
    }
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  // Filter tabs configuration
  const filterTabs = [
    { key: "all", label: "All" },
    { key: "unread", label: "Unread" },
    { key: "read", label: "Read" },
  ];

  return (
    <div className="container">
      <SubHeader title="Notification" />

      {/* Filter Tabs */}
      <div className="filter-tabs">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            className={`filter-tab ${activeFilter === tab.key ? "active" : ""}`}
            onClick={() => handleFilterChange(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notification Content */}
      <div className="notification-container">
        {loadingNotification ? (
          <div className="loading-state">
            <div className="binance-spinner"></div>
            <span>Loading</span>
          </div>
        ) : allNotification?.length > 0 ? (
          <div className="notification-list">
            {allNotification.map((item) => {
              const config = typeConfig[item.type] || typeConfig.custom;
              return (
                <div
                  key={item.id}
                  className={`notification-item ${
                    item.status === "unread" ? "unread" : ""
                  }`}
                  onClick={() => handleNotificationClick(item)}
                >
                  <div className="notification-icon">
                    <i className={config.icon} />
                  </div>
                  <div className="notification-content">
                    <div className="notification-title">{config.title}</div>
                    <div className="notification-message">
                      {config.getMessage(item)}
                    </div>
                    <div className="notification-time">
                      {Dates.Monthago(item.createdAt)}
                    </div>
                  </div>
                  {item.status === "unread" && (
                    <div className="unread-indicator" />
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-notification-state">
            <div className="empty-icon">
              <i className="fas fa-bell-slash" />
            </div>
            <div className="empty-title">No notifications yet</div>
            <div className="empty-message">
              {activeFilter === "all"
                ? "You don't have any notifications yet"
                : `No ${activeFilter} notifications found`}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .loading-state {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 40px;
          color: #666;
          font-size: 14px;
        }
        
        .binance-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid #f0b90b;
          border-top: 2px solid transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .unread-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-left: 10px;
        }
        
        .empty-notification-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 30px;
          text-align: center;
          color: #666;
        }
        
        .empty-icon {
          font-size: 48px;
          margin-bottom: 20px;
          color: #ddd;
        }
        
        .empty-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 10px;
        }
        
        .empty-message {
          font-size: 14px;
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
}

export default Notification;