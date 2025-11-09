import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import SubHeader from "src/view/shared/Header/SubHeader";
import { useDispatch, useSelector } from "react-redux";
import notificationFormActions from "src/modules/notification/form/notificationFormActions";
import notificationListActions from "src/modules/notification/list/notificationListActions";
import notificationListSelectors from "src/modules/notification/list/notificationListSelectors";
import Dates from "src/view/shared/utils/Dates";
import { i18n } from "../../../i18n";

const typeConfig = {
  deposit: {
    icon: "fas fa-arrow-down",
    title: i18n("pages.notification.types.deposit.title"),
    getMessage: (item) => i18n("pages.notification.types.deposit.message", item.message),
  },
  withdraw: {
    icon: "fas fa-arrow-up",
    title: i18n("pages.notification.types.withdraw.title"),
    getMessage: (item) => i18n("pages.notification.types.withdraw.message", item.message),
  },
  staking: {
    icon: "fas fa-coins",
    title: i18n("pages.notification.types.staking.title"),
    getMessage: (item) => i18n("pages.notification.types.staking.message", item.message),
  },
  kyc: {
    icon: "fas fa-id-card",
    title: i18n("pages.notification.types.kyc.title"),
    getMessage: (item) => item.message || i18n("pages.notification.types.kyc.defaultMessage"),
  },
  commission: {
    icon: "fas fa-hand-holding-dollar",
    title: i18n("pages.notification.types.commission.title"),
    getMessage: (item) => i18n("pages.notification.types.commission.message", item.message),
  },
  futures: {
    icon: "fas fa-chart-line",
    title: i18n("pages.notification.types.futures.title"),
    getMessage: (item) => i18n("pages.notification.types.futures.message", item.message),
  },
  accountActivated: {
    icon: "fas fa-user-check",
    title: i18n("pages.notification.types.accountActivated.title"),
    getMessage: (item) => i18n("pages.notification.types.accountActivated.message", item.message),
  },
  custom: {
    icon: "fas fa-bell",
    title: i18n("pages.notification.types.custom.title"),
    getMessage: (item) => item.message || i18n("pages.notification.types.custom.defaultMessage"),
  },
  cancel_deposit: {
    icon: "fas fa-ban",
    title: i18n("pages.notification.types.cancelDeposit.title"),
    getMessage: (item) => i18n("pages.notification.types.cancelDeposit.message", item.message),
  },
  cancel_withdraw: {
    icon: "fas fa-ban",
    title: i18n("pages.notification.types.cancelWithdraw.title"),
    getMessage: (item) => i18n("pages.notification.types.cancelWithdraw.message", item.message),
  },
  cancel_activated: {
    icon: "fas fa-user-slash",
    title: i18n("pages.notification.types.cancelActivated.title"),
    getMessage: () => i18n("pages.notification.types.cancelActivated.message"),
  },
};

function Notification() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allNotification = useSelector(notificationListSelectors.selectRows);
  const loadingNotification = useSelector(
    notificationListSelectors.selectLoading
  );
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const status = activeFilter === "all" ? "" : activeFilter;
    dispatch(notificationListActions.doFetch(status));
  }, [dispatch, activeFilter]);

  const handleNotificationClick = (item) => {
    dispatch(notificationFormActions.doUpdate(item.id));

    if (item.type === "accountActivated") {
      window.location.href = "/profile";
    }
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const filterTabs = [
    { key: "all", label: i18n("pages.notification.filters.all") },
    { key: "unread", label: i18n("pages.notification.filters.unread") },
    { key: "read", label: i18n("pages.notification.filters.read") },
  ];

  return (
    <div className="container">
      <SubHeader title={i18n("pages.notification.title")} />

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
            <span>{i18n("pages.notification.loading")}</span>
          </div>
        ) : allNotification?.length > 0 ? (
          <div className="notification-list">
            {allNotification.map((item) => {
              const config = typeConfig[item.type] || typeConfig.custom;
              return (
                <div
                  key={item.id}
                  className={`notification-item ${item.status === "unread" ? "unread" : ""
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
            <div className="empty-title">{i18n("pages.notification.emptyState.title")}</div>
            <div className="empty-message">
              {activeFilter === "all"
                ? i18n("pages.notification.emptyState.noNotifications")
                : i18n("pages.notification.emptyState.noFilteredNotifications", activeFilter)}
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