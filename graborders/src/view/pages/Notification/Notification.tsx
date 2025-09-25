import React, { useEffect } from "react";
import SubHeader from "src/view/shared/Header/SubHeader";
import { useDispatch, useSelector } from "react-redux";
import notificationFormActions from "src/modules/notification/form/notificationFormActions";
import notificationListActions from "src/modules/notification/list/notificationListActions";
import notificationListSelectors from "src/modules/notification/list/notificationListSelectors";
import Dates from "src/view/shared/utils/Dates";

function Notification() {
  const dispatch = useDispatch();
  const allNotfication = useSelector(notificationListSelectors.selectRows);


  useEffect(() => {
    dispatch(notificationListActions.doFetch());
    return () => {};
  }, [dispatch]);

  const asRead = (id) => {
    dispatch(notificationFormActions.doUpdate(id));
  };
  return (
    <div className="container">
      {/* Header */}
      <SubHeader title="Notification" />
      {/* Filter Tabs */}
      <div className="filter-tabs">
        <button className="filter-tab active">All</button>
        <button className="filter-tab">Unread</button>
        <button className="filter-tab">Read</button>
      </div>
      {/* Notification Container */}
      <div className="notification-container">
        {/* Notification 1 */}

        {allNotfication?.map((item) => (
          <div
            className={`notification-item ${
              item.status === "unread" ? "unread" : ""
            }`}
            onClick={() => asRead(item.id)}
          >
            <div className="notification-icon">
              <i className="fas fa-arrow-down" />
            </div>
            <div className="notification-content">
              <div className="notification-title">Deposit Received</div>
              <div className="notification-message">
                Your deposit of 0.5 BTC has been confirmed and credited to your
                wallet.
              </div>
              <div className="notification-time">
                {Dates.Monthago(item.createdAt)}
              </div>
            </div>
            {item.status === "unread" && <div className="unread-indicator" />}
          </div>
        ))}
      </div>

    </div>
  );
}

export default Notification;
