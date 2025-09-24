import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userListActions from './../../modules/user/list/userListActions';
import userListSelectors from 'src/modules/user/list/userListSelectors';
function Home() {
  const dispatch = useDispatch();
  const totalDeposit = useSelector(
    userListSelectors.selectcountDeposit,
  );

  useEffect(() => {
    dispatch(userListActions.depositCount());
    return () => {};
  }, []);
  return (
    <div className="admin-home-container">
      <div className="welcome-section">
        <h1>Dashboard Overview</h1>
        <p>
          Welcome back! Here's what's happening with your
          platform today.
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-box user-stat">
          <div className="stat-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-content">
            <span className="stat-title">Total Users:</span>
            <span className="stat-value">800</span>
          </div>
        </div>

        <div className="stat-box recharge-stat">
          <div className="stat-icon">
            <i className="fas fa-money-bill-wave"></i>
          </div>
          <div className="stat-content">
            <span className="stat-title">
              Total Recharge Amount:
            </span>
            <span className="stat-value">
              {totalDeposit} USDT
            </span>
          </div>
        </div>

        <div className="stat-box withdraw-stat">
          <div className="stat-icon">
            <i className="fas fa-wallet"></i>
          </div>
          <div className="stat-content">
            <span className="stat-title">
              Total Withdrawals:
            </span>
            <span className="stat-value">58,413,521</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
