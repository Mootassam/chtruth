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

  // Enhanced transaction configuration
  const getTransactionConfig = (type, direction, relatedAsset) => {
    const config = {
      icon: 'fa-exchange-alt',
      typeText: 'Transaction',
      iconClass: 'swap',
      color: '#627EEA',
      amountColor: direction === 'in' ? '#00C076' : '#FF6838'
    };

    switch (type) {
      case 'deposit':
        config.icon = 'fa-arrow-down';
        config.typeText = 'Deposit';
        config.iconClass = 'deposit';
        config.color = '#F3BA2F';
        config.amountColor = '#00C076';
        break;
        
      case 'withdraw':
        config.icon = 'fa-arrow-up';
        config.typeText = 'Withdrawal';
        config.iconClass = 'withdraw';
        config.color = '#FF6838';
        config.amountColor = '#FF6838';
        break;
        
      case 'convert_in':
        config.icon = 'fa-exchange-alt';
        config.typeText = relatedAsset ? `Converted from ${relatedAsset}` : 'Conversion In';
        config.iconClass = 'convert-in';
        config.color = '#9C27B0';
        config.amountColor = '#00C076';
        break;
        
      case 'convert_out':
        config.icon = 'fa-exchange-alt';
        config.typeText = relatedAsset ? `Converted to ${relatedAsset}` : 'Conversion Out';
        config.iconClass = 'convert-out';
        config.color = '#9C27B0';
        config.amountColor = '#FF6838';
        break;
        
      case 'stacking':
        config.icon = 'fa-lock';
        config.typeText = 'Stacking Reward';
        config.iconClass = 'stacking';
        config.color = '#4CAF50';
        config.amountColor = '#00C076';
        break;
        
      case 'futures_profit':
        config.icon = 'fa-chart-line';
        config.typeText = 'Futures Profit';
        config.iconClass = 'futures-profit';
        config.color = '#00BCD4';
        config.amountColor = '#00C076';
        break;
        
      case 'futures_loss':
        config.icon = 'fa-chart-line';
        config.typeText = 'Futures Loss';
        config.iconClass = 'futures-loss';
        config.color = '#FF5722';
        config.amountColor = '#FF6838';
        break;
        
      case 'spot_profit':
        config.icon = 'fa-coins';
        config.typeText = 'Spot Trading Profit';
        config.iconClass = 'spot-profit';
        config.color = '#4CAF50';
        config.amountColor = '#00C076';
        break;
        
      case 'spot_loss':
        config.icon = 'fa-coins';
        config.typeText = 'Spot Trading Loss';
        config.iconClass = 'spot-loss';
        config.color = '#FF5722';
        config.amountColor = '#FF6838';
        break;
        
      default:
        config.icon = 'fa-exchange-alt';
        config.typeText = 'Transaction';
        config.iconClass = 'default';
        config.color = '#627EEA';
    }

    return config;
  };

  // Filter transactions based on selected filters
  const filteredTransactions = useMemo(() => {
    if (!transaction) return [];

    return transaction.filter((tx) => {
      // Apply type filter
      if (typeFilter !== "all") {
        const typeMatch = 
          typeFilter === "deposits" ? (tx.type === "deposit" || tx.direction === "in") : 
          typeFilter === "withdrawals" ? (tx.type === "withdraw" || tx.direction === "out") :
          typeFilter === "profits" ? (tx.type.includes('profit') || (tx.direction === "in" && tx.type !== "deposit")) :
          typeFilter === "losses" ? (tx.type.includes('loss') || (tx.direction === "out" && tx.type !== "withdraw")) :
          typeFilter === "conversions" ? tx.type.includes('convert') :
          typeFilter === "stacking" ? tx.type === "stacking" : true;
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
        <button
          className={`filter-option ${
            typeFilter === "profits" ? "active" : ""
          }`}
          onClick={() => setTypeFilter("profits")}
        >
          Profits
        </button>
        <button
          className={`filter-option ${
            typeFilter === "losses" ? "active" : ""
          }`}
          onClick={() => setTypeFilter("losses")}
        >
          Losses
        </button>
        <button
          className={`filter-option ${
            typeFilter === "conversions" ? "active" : ""
          }`}
          onClick={() => setTypeFilter("conversions")}
        >
          Conversions
        </button>
        <button
          className={`filter-option ${
            typeFilter === "stacking" ? "active" : ""
          }`}
          onClick={() => setTypeFilter("stacking")}
        >
          Stacking
        </button>
      </div>

      {/* Status and Time Filters */}
      <div className="secondary-filters">
        {/* Status Filters */}
        <div className="status-filters">
          <div
            className={`status-option ${statusFilter === "all" ? "active" : ""}`}
            onClick={() => setStatusFilter("all")}
          >
            All Status
          </div>
          <div
            className={`status-option ${statusFilter === "completed" ? "active" : ""}`}
            onClick={() => handleStatusFilter("completed")}
          >
            Completed
          </div>
          <div
            className={`status-option ${statusFilter === "pending" ? "active" : ""}`}
            onClick={() => handleStatusFilter("pending")}
          >
            Pending
          </div>
          <div
            className={`status-option ${statusFilter === "canceled" ? "active" : ""}`}
            onClick={() => handleStatusFilter("canceled")}
          >
            Canceled
          </div>
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
      </div>

      {/* Transaction List */}
      <div className="transaction-list">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => {
            const { icon, typeText, iconClass, amountColor } = getTransactionConfig(
              transaction.type,
              transaction.direction,
              transaction.relatedAsset
            );

            return (
              <div className="transaction-item" key={transaction.id}>
                <div className="transaction-info">
                  <div 
                    className={`transaction-icon ${iconClass}`}
                    style={{ backgroundColor: getTransactionConfig(transaction.type, transaction.direction, transaction.relatedAsset).color }}
                  >
                    <i className={`fas ${icon}`} />
                  </div>
                  <div className="transaction-details">
                    <div className="transaction-type">
                      {typeText}
                    </div>
                    <div className="transaction-date">
                      {formatDate(transaction.dateTransaction)}
                    </div>
                  </div>
                </div>
                <div className="transaction-amount">
                  <div 
                    className="amount" 
                    style={{ color: amountColor }}
                  >
                    {transaction.direction === 'in' ? '+' : '-'}
                    {transaction.amount} {transaction.asset}
                  </div>
                  <div
                    className={`transaction-statuss status-${transaction.status}`}
                  >
                    {transaction.status.charAt(0).toUpperCase() +
                      transaction.status.slice(1)}
                  </div>
                </div>
              </div>
            );
          })
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

      <style>{`
        .container {
          max-width: 400px;
          margin: 0 auto;
          padding: 0 15px;
        }

        .filter-options {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding: 15px 0;
          margin-bottom: 15px;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }

        .filter-options::-webkit-scrollbar {
          display: none;
        }

        .filter-option {
          padding: 8px 16px;
          border-radius: 20px;
          border: 1px solid #444;
          background-color: #1A1A1A;
          color: #CCCCCC;
          font-size: 14px;
          font-weight: 500;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-option.active {
          background-color: #F3BA2F;
          color: #000;
          border-color: #F3BA2F;
        }

        .secondary-filters {
          margin-bottom: 20px;
        }

        .status-filters,
        .time-filter {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding: 10px 0;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }

        .status-filters::-webkit-scrollbar,
        .time-filter::-webkit-scrollbar {
          display: none;
        }

        .status-option,
        .time-option {
          padding: 6px 12px;
          border-radius: 16px;
          border: 1px solid #444;
          background-color: #1A1A1A;
          color: #CCCCCC;
          font-size: 12px;
          font-weight: 500;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .status-option.active,
        .time-option.active {
          background-color: #627EEA;
          color: #FFF;
          border-color: #627EEA;
        }

        .transaction-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 80px;
        }

        .transaction-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          background-color: #1A1A1A;
          border-radius: 12px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .transaction-item:hover {
          background-color: #2A2A2A;
        }

        .transaction-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .transaction-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          color: #FFF;
        }

        .transaction-details {
          display: flex;
          flex-direction: column;
        }

        .transaction-type {
          font-weight: bold;
          margin-bottom: 4px;
          font-size: 14px;
        }

        .transaction-date {
          color: #AAAAAA;
          font-size: 12px;
        }

        .transaction-amount {
          text-align: right;
        }

        .amount {
          font-weight: bold;
          margin-bottom: 4px;
          font-size: 14px;
        }

        .transaction-statuss {
          font-size: 11px;
          color: #2ff378;
        }

        .transaction-status.status-pending {
          color: #F3BA2F;
        }

        .transaction-status.status-canceled {
          color: #FF6838;
        }

        .empty-state {
          text-align: center;
          padding: 40px 20px;
          background: linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%);
          border-radius: 16px;
          margin: 20px 0;
        }

        .empty-icon {
          font-size: 48px;
          color: #F3BA2F;
          margin-bottom: 15px;
        }

        .empty-title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 8px;
          color: #FFFFFF;
        }

        .empty-text {
          color: #AAAAAA;
          font-size: 14px;
        }

        /* Enhanced transaction icons */
        .transaction-icon.deposit { background-color: #F3BA2F !important; color: #000; }
        .transaction-icon.withdraw { background-color: #FF6838 !important; color: #000; }
        .transaction-icon.convert-in { background-color: #9C27B0 !important; color: #FFF; }
        .transaction-icon.convert-out { background-color: #9C27B0 !important; color: #FFF; }
        .transaction-icon.stacking { background-color: #4CAF50 !important; color: #FFF; }
        .transaction-icon.futures-profit { background-color: #00BCD4 !important; color: #FFF; }
        .transaction-icon.futures-loss { background-color: #FF5722 !important; color: #FFF; }
        .transaction-icon.spot-profit { background-color: #4CAF50 !important; color: #FFF; }
        .transaction-icon.spot-loss { background-color: #FF5722 !important; color: #FFF; }
        .transaction-icon.default { background-color: #627EEA !important; color: #FFF; }
        .transaction-icon.swap { background-color: #627EEA !important; color: #FFF; }
      `}</style>
    </div>
  );
}

export default History;