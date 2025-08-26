import React from "react";
import SubHeader from "src/view/shared/Header/SubHeader";

function History() {
  return (
    <div className="container">
      {/* Header Section */}
      <SubHeader title="Transaction History" />

      {/* Filter Options */}
      <div className="filter-options">
        <button className="filter-option active">All</button>
        <button className="filter-option">Deposits</button>
        <button className="filter-option">Withdrawals</button>
        <button className="filter-option">Completed</button>
        <button className="filter-option">Pending</button>
      </div>
      {/* Time Filter */}
      <div className="time-filter">
        <div className="time-option active">Today</div>
        <div className="time-option">Week</div>
        <div className="time-option">Month</div>
        <div className="time-option">Year</div>
        <div className="time-option">All Time</div>
      </div>
      {/* Transaction List */}
      <div className="transaction-list">
        {/* Transaction 1 */}
        <div className="transaction-item">
          <div className="transaction-info">
            <div className="transaction-icon deposit">
              <i className="fas fa-arrow-down" style={{ color: "#00C076" }} />
            </div>
            <div className="transaction-details">
              <div className="transaction-type">Deposit</div>
              <div className="transaction-date">Today, 10:23 AM</div>
            </div>
          </div>
          <div className="transaction-amount">
            <div className="amount deposit-amount">+0.025 BTC</div>
            <div className="transaction-status status-completed">Completed</div>
          </div>
        </div>
        {/* Transaction 2 */}
        <div className="transaction-item">
          <div className="transaction-info">
            <div className="transaction-icon withdrawal">
              <i className="fas fa-arrow-up" style={{ color: "#FF6838" }} />
            </div>
            <div className="transaction-details">
              <div className="transaction-type">Withdrawal</div>
              <div className="transaction-date">Yesterday, 2:45 PM</div>
            </div>
          </div>
          <div className="transaction-amount">
            <div className="amount withdrawal-amount">-1.5 ETH</div>
            <div className="transaction-status status-completed">Completed</div>
          </div>
        </div>
        {/* Transaction 3 */}
        <div className="transaction-item">
          <div className="transaction-info">
            <div className="transaction-icon deposit">
              <i className="fas fa-arrow-down" style={{ color: "#00C076" }} />
            </div>
            <div className="transaction-details">
              <div className="transaction-type">Deposit</div>
              <div className="transaction-date">Oct 12, 9:15 AM</div>
            </div>
          </div>
          <div className="transaction-amount">
            <div className="amount deposit-amount">+2,500 USDT</div>
            <div className="transaction-status status-completed">Completed</div>
          </div>
        </div>
        {/* Transaction 4 */}
        <div className="transaction-item">
          <div className="transaction-info">
            <div className="transaction-icon withdrawal">
              <i className="fas fa-arrow-up" style={{ color: "#FF6838" }} />
            </div>
            <div className="transaction-details">
              <div className="transaction-type">Withdrawal</div>
              <div className="transaction-date">Oct 10, 4:30 PM</div>
            </div>
          </div>
          <div className="transaction-amount">
            <div className="amount withdrawal-amount">-0.5 BTC</div>
            <div className="transaction-status status-pending">Processing</div>
          </div>
        </div>
        {/* Transaction 5 */}
        <div className="transaction-item">
          <div className="transaction-info">
            <div className="transaction-icon withdrawal">
              <i className="fas fa-arrow-up" style={{ color: "#FF6838" }} />
            </div>
            <div className="transaction-details">
              <div className="transaction-type">Withdrawal</div>
              <div className="transaction-date">Oct 5, 11:20 AM</div>
            </div>
          </div>
          <div className="transaction-amount">
            <div className="amount withdrawal-amount">-3.25 ETH</div>
            <div className="transaction-status status-failed">Failed</div>
          </div>
        </div>
      </div>
      {/* Empty State (Hidden by default) */}
      <div className="empty-state" style={{ display: "none" }}>
        <div className="empty-icon">
          <i className="fas fa-receipt" />
        </div>
        <div className="empty-title">No transactions yet</div>
        <div className="empty-text">
          Your transaction history will appear here once you start using your
          wallet
        </div>
      </div>
      {/* Bottom Navigation */}
     
    </div>
  );
}

export default History;
