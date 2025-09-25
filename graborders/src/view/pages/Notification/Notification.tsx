import React, { useEffect } from "react";
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
  const allNotification = useSelector(notificationListSelectors.selectRows);

  useEffect(() => {
    dispatch(notificationListActions.doFetch());
  }, [dispatch]);

  const markAsRead = (id) => {
    dispatch(notificationFormActions.doUpdate(id));
  };

  return (
    <div className="container">
      <SubHeader title="Notification" />
      <div className="filter-tabs">
        <button className="filter-tab active">All</button>
        <button className="filter-tab">Unread</button>
        <button className="filter-tab">Read</button>
      </div>

      <div className="notification-container">
        {allNotification?.length > 0 ? (
          allNotification.map((item) => {
            const config = typeConfig[item.type] || typeConfig.custom;
            return (
              <div
                key={item.id}
                className={`notification-item ${
                  item.status === "unread" ? "unread" : ""
                }`}
                onClick={() => markAsRead(item.id)}
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
          })
        ) : (
          <div className="empty-notification-state">
            <div className="empty-icon">
              <i className="fas fa-bell-slash" />
            </div>
            <div className="empty-title">No notifications yet</div>
            <div className="empty-message">
              When you get notifications, they'll appear here
            </div>
          </div>
        )}
      </div>

      <style>{`
      
      .empty-notification-state{ 
      display: flex;
    align-items: center;
    flex-direction: column;
    padding: 30px;
    justify-content: center;
      }


      .empty-message{ 
      text-align :center}
      
      `}</style>
    </div>
  );
}

export default Notification;
