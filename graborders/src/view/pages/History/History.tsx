import React, { useEffect, useState, useMemo } from "react";
import SubHeader from "src/view/shared/Header/SubHeader";
import { useDispatch, useSelector } from "react-redux";
import assetsActions from "src/modules/assets/view/assetsViewActions";
import assetsSelectors from "src/modules/assets/view/assetsViewSelectors";
import transactionListSelector from "src/modules/transaction/list/transactionListSelectors";
import transactionListActions from "src/modules/transaction/list/transactionListActions";

function History() {
  const dispatch = useDispatch();

  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const Transactionloading = useSelector(transactionListSelector.selectLoading);
  const transaction = useSelector(transactionListSelector.selectRows);

  useEffect(() => {
    dispatch(transactionListActions.doFetch());
  }, [dispatch]);

  // Filter transactions based on selected filters
  const filteredTransactions = useMemo(() => {
    if (!transaction) return [];

    return transaction.filter((tx) => {
      // Apply type filter
      if (typeFilter !== "all") {
        const typeMatch = 
          typeFilter === "deposits" ? tx.type === "deposit" : 
          typeFilter === "withdrawals" ? tx.type === "withdraw" : true;
        if (!typeMatch) return false;
      }

      // Apply status filter
      if (statusFilter !== "all" && tx.status !== statusFilter) {
        return false;
      }

      // Apply time filter
      if (timeFilter !== "all") {
        const now = new Date();
        const transactionDate = new Date(tx.dateTransaction);
        
        switch (timeFilter) {
          case "today":
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            return transactionDate >= today;
          
          case "week":
            const oneWeekAgo = new Date(now);
            oneWeekAgo.setDate(now.getDate() - 7);
            return transactionDate >= oneWeekAgo;
          
          case "month":
            const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            return transactionDate >= firstDayOfMonth;
          
          case "year":
            const firstDayOfYear = new Date(now.getFullYear(), 0, 1);
            return transactionDate >= firstDayOfYear;
          
          default:
            return true;
        }
      }

      return true;
    });
  }, [transaction, typeFilter, statusFilter, timeFilter]);

  // Format date based on how recent it is
  const formatDate = (date) => {
    const transactionDate = new Date(date);
    const now = new Date();
    const isToday = transactionDate.toDateString() === now.toDateString();
    
    // Reset now date after checking today
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = transactionDate.toDateString() === yesterday.toDateString();

    if (isToday) {
      return `Today, ${transactionDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else if (isYesterday) {
      return `Yesterday, ${transactionDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else {
      return transactionDate.toLocaleDateString([], {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  // Handle status filter toggle
  const handleStatusFilter = (status) => {
    setStatusFilter(statusFilter === status ? "all" : status);
  };

  return (
    <div className="container">
      {/* Header Section */}
      <SubHeader title="Transaction History" />

      {/* Filter Options */}
      <div className="filter-options">
        <button
          className={`filter-option ${typeFilter === "all" ? "active" : ""}`}
          onClick={() => setTypeFilter("all")}
        >
          All
        </button>
        <button
          className={`filter-option ${
            typeFilter === "deposits" ? "active" : ""
          }`}
          onClick={() => setTypeFilter("deposits")}
        >
          Deposits
        </button>
        <button
          className={`filter-option ${
            typeFilter === "withdrawals" ? "active" : ""
          }`}
          onClick={() => setTypeFilter("withdrawals")}
        >
          Withdrawals
        </button>
        
        {/* Status Filters */}
        <button
          className={`filter-option ${
            statusFilter === "success" ? "active" : ""
          }`}
          onClick={() => handleStatusFilter("success")}
        >
          Completed
        </button>
        <button
          className={`filter-option ${
            statusFilter === "pending" ? "active" : ""
          }`}
          onClick={() => handleStatusFilter("pending")}
        >
          Pending
        </button>
        <button
          className={`filter-option ${
            statusFilter === "canceled" ? "active" : ""
          }`}
          onClick={() => handleStatusFilter("canceled")}
        >
          Canceled
        </button>
      </div>

      {/* Time Filter */}
      <div className="time-filter">
        <div
          className={`time-option ${timeFilter === "all" ? "active" : ""}`}
          onClick={() => setTimeFilter("all")}
        >
          All Time
        </div>
        <div
          className={`time-option ${timeFilter === "today" ? "active" : ""}`}
          onClick={() => setTimeFilter("today")}
        >
          Today
        </div>
        <div
          className={`time-option ${timeFilter === "week" ? "active" : ""}`}
          onClick={() => setTimeFilter("week")}
        >
          Week
        </div>
        <div
          className={`time-option ${timeFilter === "month" ? "active" : ""}`}
          onClick={() => setTimeFilter("month")}
        >
          Month
        </div>
        <div
          className={`time-option ${timeFilter === "year" ? "active" : ""}`}
          onClick={() => setTimeFilter("year")}
        >
          Year
        </div>
      </div>

      {/* Transaction List */}
      <div className="transaction-list">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <div className="transaction-item" key={transaction.id}>
              <div className="transaction-info">
                <div className={`transaction-icon ${transaction.type}`}>
                  <i
                    className={`fas fa-${
                      transaction.type === "deposit" ? "arrow-up" :  transaction.type === "withdraw" ? "arrow-down" : "exchange-alt"
                    }`}
                    style={{
                      color:
                        transaction.type === "deposit" ? "#00C076" : transaction.type==="withdraw" ? "#FF6838" :"#fff",
                    }}
                  />
                </div>
                <div className="transaction-details">
                  <div className="transaction-type">
                    {transaction.type}
                  </div>
                  <div className="transaction-date">
                    {formatDate(transaction.dateTransaction)}
                  </div>
                </div>
              </div>
              <div className="transaction-amount">
                <div className={`amount ${transaction.type}-amount`}>
                  {transaction.type === "deposit" ? "+" : "-"}
                  {transaction.amount} {transaction.asset}
                </div>
                <div
                  className={`transaction-status statuss-${transaction.status}`}
                >
                  {transaction.status.charAt(0).toUpperCase() +
                    transaction.status.slice(1)}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <i className="fas fa-receipt" />
            </div>
            <div className="empty-title">No transactions found</div>
            <div className="empty-text">
              Try changing your filters to see more transactions
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default History;