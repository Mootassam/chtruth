import React, { useEffect, useState } from "react";
import SubHeader from "src/view/shared/Header/SubHeader";
import { useDispatch, useSelector } from "react-redux";
import assetsActions from "src/modules/assets/view/assetsViewActions";
import assetsSelectors from "src/modules/assets/view/assetsViewSelectors";
import transactionListSelector from "src/modules/transaction/list/transactionListSelectors";
import transactionListActions from "src/modules/transaction/list/transactionListActions";

// Sample transaction data
const sampleTransactions = [
  {
    id: 1,
    type: "deposit",
    amount: "0.025",
    currency: "BTC",
    date: new Date(),
    status: "completed",
    description: "Deposit",
  },
  {
    id: 2,
    type: "withdrawal",
    amount: "1.5",
    currency: "ETH",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
    status: "completed",
    description: "Withdrawal",
  },
  {
    id: 3,
    type: "deposit",
    amount: "2,500",
    currency: "USDT",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    status: "completed",
    description: "Deposit",
  },
  {
    id: 4,
    type: "withdrawal",
    amount: "0.5",
    currency: "BTC",
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    status: "pending",
    description: "Withdrawal",
  },
  {
    id: 5,
    type: "withdrawal",
    amount: "3.25",
    currency: "ETH",
    date: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000), // 9 days ago
    status: "failed",
    description: "Withdrawal",
  },
];

function History() {
    const dispatch = useDispatch();

  const [transactions, setTransactions] = useState(sampleTransactions);
  const [filteredTransactions, setFilteredTransactions] =
    useState(sampleTransactions);
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("today");
  const Transactionloading = useSelector(transactionListSelector.selectLoading);
        const transaction = useSelector(transactionListSelector.selectRows);


  useEffect(() => {
    Promise.all([dispatch(transactionListActions.doFetch())]);
  }, [dispatch]);
  // Filter transactions based on selected filters
  useEffect(() => {
    let result = transactions;

    // Apply type filter
    if (typeFilter !== "all") {
      result = result.filter((transaction) =>
        typeFilter === "deposits"
          ? transaction.type === "deposit"
          : transaction.type === "withdrawal"
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(
        (transaction) => transaction.status === statusFilter
      );
    }

    // Apply time filter
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    switch (timeFilter) {
      case "today":
        result = result.filter(
          (transaction) => new Date(transaction.date) >= today
        );
        break;
      case "week":
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        result = result.filter(
          (transaction) => new Date(transaction.date) >= weekAgo
        );
        break;
      case "month":
        const monthAgo = new Date(today);
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        result = result.filter(
          (transaction) => new Date(transaction.date) >= monthAgo
        );
        break;
      case "year":
        const yearAgo = new Date(today);
        yearAgo.setFullYear(yearAgo.getFullYear() - 1);
        result = result.filter(
          (transaction) => new Date(transaction.date) >= yearAgo
        );
        break;
      default:
        // "all time" - no filtering needed
        break;
    }

    setFilteredTransactions(result);
  }, [typeFilter, statusFilter, timeFilter, transactions]);

  // Format date based on how recent it is
  const formatDate = (date) => {
    const transactionDate = new Date(date);
    const now = new Date();
    const isToday = transactionDate.toDateString() === now.toDateString();
    const isYesterday =
      new Date(now.setDate(now.getDate() - 1)).toDateString() ===
      transactionDate.toDateString();

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
        <button
          className={`filter-option ${
            statusFilter === "completed" ? "active" : ""
          }`}
          onClick={() =>
            setStatusFilter(statusFilter === "completed" ? "all" : "completed")
          }
        >
          Completed
        </button>
        <button
          className={`filter-option ${
            statusFilter === "pending" ? "active" : ""
          }`}
          onClick={() =>
            setStatusFilter(statusFilter === "pending" ? "all" : "pending")
          }
        >
          Pending
        </button>
      </div>

      {/* Time Filter */}
      <div className="time-filter">
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
        <div
          className={`time-option ${timeFilter === "all" ? "active" : ""}`}
          onClick={() => setTimeFilter("all")}
        >
          All Time
        </div>
      </div>

      {/* Transaction List */}
      <div className="transaction-list">
        {transaction.length > 0 ? (
          transaction.map((transaction) => (
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
