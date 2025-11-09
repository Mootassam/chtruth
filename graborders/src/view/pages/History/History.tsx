import React, { useEffect, useState, useMemo } from "react";
import SubHeader from "src/view/shared/Header/SubHeader";
import { useDispatch, useSelector } from "react-redux";
import assetsActions from "src/modules/assets/view/assetsViewActions";
import assetsSelectors from "src/modules/assets/view/assetsViewSelectors";
import transactionListSelector from "src/modules/transaction/list/transactionListSelectors";
import transactionListActions from "src/modules/transaction/list/transactionListActions";
import { i18n } from "../../../i18n";

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
      typeText: i18n("pages.history.transactionTypes.transaction"),
      iconClass: 'swap',
      color: '#627EEA',
      amountColor: direction === 'in' ? '#2ff378' : '#FF6838'
    };

    switch (type) {
      case 'deposit':
        config.icon = 'fa-arrow-down';
        config.typeText = i18n("pages.history.transactionTypes.deposit");
        config.iconClass = 'deposit';
        config.color = '#F3BA2F';
        config.amountColor = '#2ff378';
        break;

      case 'withdraw':
        config.icon = 'fa-arrow-up';
        config.typeText = i18n("pages.history.transactionTypes.withdrawal");
        config.iconClass = 'withdraw';
        config.color = '#FF6838';
        config.amountColor = '#FF6838';
        break;

      case 'convert_in':
        config.icon = 'fa-exchange-alt';
        config.typeText = relatedAsset ? i18n("pages.history.transactionTypes.convertedFrom", relatedAsset) : i18n("pages.history.transactionTypes.conversionIn");
        config.iconClass = 'convert-in';
        config.color = '#9C27B0';
        config.amountColor = '#2ff378';
        break;

      case 'convert_out':
        config.icon = 'fa-exchange-alt';
        config.typeText = relatedAsset ? i18n("pages.history.transactionTypes.convertedTo", relatedAsset) : i18n("pages.history.transactionTypes.conversionOut");
        config.iconClass = 'convert-out';
        config.color = '#9C27B0';
        config.amountColor = '#FF6838';
        break;

      case 'stacking':
        config.icon = 'fa-coins';
        config.typeText = i18n("pages.history.transactionTypes.stakedAmount");
        config.iconClass = 'stacking';
        config.color = '#FF9800';
        config.amountColor = '#FFB74D';
        break;

      case 'staking_reward':
        config.icon = 'fa-gift';
        config.typeText = i18n("pages.history.transactionTypes.stakingRewards");
        config.iconClass = 'staking_reward';
        config.color = '#4CAF50';
        config.amountColor = '#81C784';
        break;

      // Futures Trading Transactions
      case 'futures_reserved':
        config.icon = 'fa-lock';
        config.typeText = i18n("pages.history.transactionTypes.futuresReserved");
        config.iconClass = 'futures-reserved';
        config.color = '#FF9800';
        config.amountColor = '#FF9800';
        break;

      case 'futures_profit':
        config.icon = 'fa-chart-line';
        config.typeText = i18n("pages.history.transactionTypes.futuresProfit");
        config.iconClass = 'futures-profit';
        config.color = '#00C076';
        config.amountColor = '#00C076';
        break;

      case 'futures_loss':
        config.icon = 'fa-chart-line';
        config.typeText = i18n("pages.history.transactionTypes.futuresLoss");
        config.iconClass = 'futures-loss';
        config.color = '#FF6838';
        config.amountColor = '#FF6838';
        break;

      case 'futures_settlement':
        config.icon = 'fa-file-contract';
        config.typeText = i18n("pages.history.transactionTypes.futuresSettlement");
        config.iconClass = 'futures-settlement';
        config.color = '#9C27B0';
        config.amountColor = '#9C27B0';
        break;

      case 'futures_fee':
        config.icon = 'fa-receipt';
        config.typeText = i18n("pages.history.transactionTypes.futuresFee");
        config.iconClass = 'futures-fee';
        config.color = '#607D8B';
        config.amountColor = '#607D8B';
        break;

      case 'futures_refund':
        config.icon = 'fa-undo';
        config.typeText = i18n("pages.history.transactionTypes.futuresRefund");
        config.iconClass = 'futures-refund';
        config.color = '#4CAF50';
        config.amountColor = '#4CAF50';
        break;

      case 'futures_bonus':
        config.icon = 'fa-gift';
        config.typeText = i18n("pages.history.transactionTypes.futuresBonus");
        config.iconClass = 'futures-bonus';
        config.color = '#E91E63';
        config.amountColor = '#E91E63';
        break;

      case 'futures_commission':
        config.icon = 'fa-handshake';
        config.typeText = i18n("pages.history.transactionTypes.futuresCommission");
        config.iconClass = 'futures-commission';
        config.color = '#795548';
        config.amountColor = '#795548';
        break;

      // Manual Control Operations
      case 'manual_profit':
        config.icon = 'fa-user-check';
        config.typeText = i18n("pages.history.transactionTypes.manualProfit");
        config.iconClass = 'manual-profit';
        config.color = '#00C076';
        config.amountColor = '#00C076';
        break;

      case 'manual_loss':
        config.icon = 'fa-user-slash';
        config.typeText = i18n("pages.history.transactionTypes.manualLoss");
        config.iconClass = 'manual-loss';
        config.color = '#FF6838';
        config.amountColor = '#FF6838';
        break;

      case 'manual_adjustment':
        config.icon = 'fa-cog';
        config.typeText = i18n("pages.history.transactionTypes.manualAdjustment");
        config.iconClass = 'manual-adjustment';
        config.color = '#9C27B0';
        config.amountColor = '#9C27B0';
        break;

      // Spot Trading
      case 'spot_profit':
        config.icon = 'fa-coins';
        config.typeText = i18n("pages.history.transactionTypes.spotTradingProfit");
        config.iconClass = 'spot-profit';
        config.color = '#4CAF50';
        config.amountColor = '#2ff378';
        break;

      case 'spot_loss':
        config.icon = 'fa-coins';
        config.typeText = i18n("pages.history.transactionTypes.spotTradingLoss");
        config.iconClass = 'spot-loss';
        config.color = '#FF5722';
        config.amountColor = '#FF6838';
        break;

      // Rewards & Bonuses
      case 'reward':
        config.icon = 'fa-hand-holding-dollar';
        config.typeText = i18n("pages.history.transactionTypes.referralReward");
        config.iconClass = 'spot-profit';
        config.color = '#63f211ff';
        config.amountColor = '#5ffc1bff';
        break;

      case 'bonus':
        config.icon = 'fa-gift';
        config.typeText = i18n("pages.history.transactionTypes.bonus");
        config.iconClass = 'bonus';
        config.color = '#E91E63';
        config.amountColor = '#E91E63';
        break;

      case 'referral_commission':
        config.icon = 'fa-users';
        config.typeText = i18n("pages.history.transactionTypes.referralCommission");
        config.iconClass = 'referral-commission';
        config.color = '#FF9800';
        config.amountColor = '#FF9800';
        break;

      // Order Management
      case 'order_reserved':
        config.icon = 'fa-clock';
        config.typeText = i18n("pages.history.transactionTypes.orderReserved");
        config.iconClass = 'order-reserved';
        config.color = '#FF9800';
        config.amountColor = '#FF9800';
        break;

      case 'order_cancelled':
        config.icon = 'fa-ban';
        config.typeText = i18n("pages.history.transactionTypes.orderCancelled");
        config.iconClass = 'order-cancelled';
        config.color = '#9E9E9E';
        config.amountColor = '#9E9E9E';
        break;

      case 'order_partial_fill':
        config.icon = 'fa-chart-pie';
        config.typeText = i18n("pages.history.transactionTypes.orderPartialFill");
        config.iconClass = 'order-partial';
        config.color = '#FF9800';
        config.amountColor = '#FF9800';
        break;

      case 'order_completed':
        config.icon = 'fa-check-circle';
        config.typeText = i18n("pages.history.transactionTypes.orderCompleted");
        config.iconClass = 'order-completed';
        config.color = '#4CAF50';
        config.amountColor = '#4CAF50';
        break;

      // System Operations
      case 'fee_payment':
        config.icon = 'fa-receipt';
        config.typeText = i18n("pages.history.transactionTypes.feePayment");
        config.iconClass = 'fee-payment';
        config.color = '#607D8B';
        config.amountColor = '#607D8B';
        break;

      case 'adjustment':
        config.icon = 'fa-sliders-h';
        config.typeText = i18n("pages.history.transactionTypes.balanceAdjustment");
        config.iconClass = 'adjustment';
        config.color = '#9C27B0';
        config.amountColor = '#9C27B0';
        break;

      case 'transfer':
        config.icon = 'fa-exchange-alt';
        config.typeText = i18n("pages.history.transactionTypes.transfer");
        config.iconClass = 'transfer';
        config.color = '#2196F3';
        config.amountColor = '#2196F3';
        break;

      default:
        config.icon = 'fa-exchange-alt';
        config.typeText = i18n("pages.history.transactionTypes.transaction");
        config.iconClass = 'default';
        config.color = '#627EEA';
        config.amountColor = '#627EEA';
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
      return i18n("pages.history.dateFormats.today", transactionDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }));
    } else if (isYesterday) {
      return i18n("pages.history.dateFormats.yesterday", transactionDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }));
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
      <SubHeader title={i18n("pages.history.title")} />

      {/* Filter Options */}
      <div className="filter-options">
        <button
          className={`filter-option ${typeFilter === "all" ? "active" : ""}`}
          onClick={() => setTypeFilter("all")}
        >
          {i18n("pages.history.filters.all")}
        </button>
        <button
          className={`filter-option ${typeFilter === "deposits" ? "active" : ""}`}
          onClick={() => setTypeFilter("deposits")}
        >
          {i18n("pages.history.filters.deposits")}
        </button>
        <button
          className={`filter-option ${typeFilter === "withdrawals" ? "active" : ""}`}
          onClick={() => setTypeFilter("withdrawals")}
        >
          {i18n("pages.history.filters.withdrawals")}
        </button>
        <button
          className={`filter-option ${typeFilter === "profits" ? "active" : ""}`}
          onClick={() => setTypeFilter("profits")}
        >
          {i18n("pages.history.filters.profits")}
        </button>
        <button
          className={`filter-option ${typeFilter === "losses" ? "active" : ""}`}
          onClick={() => setTypeFilter("losses")}
        >
          {i18n("pages.history.filters.losses")}
        </button>
        <button
          className={`filter-option ${typeFilter === "conversions" ? "active" : ""}`}
          onClick={() => setTypeFilter("conversions")}
        >
          {i18n("pages.history.filters.conversions")}
        </button>
        <button
          className={`filter-option ${typeFilter === "stacking" ? "active" : ""}`}
          onClick={() => setTypeFilter("stacking")}
        >
          {i18n("pages.history.filters.stacking")}
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
            {i18n("pages.history.statusFilters.allStatus")}
          </div>
          <div
            className={`status-option ${statusFilter === "completed" ? "active" : ""}`}
            onClick={() => handleStatusFilter("completed")}
          >
            {i18n("pages.history.statusFilters.completed")}
          </div>
          <div
            className={`status-option ${statusFilter === "pending" ? "active" : ""}`}
            onClick={() => handleStatusFilter("pending")}
          >
            {i18n("pages.history.statusFilters.pending")}
          </div>
          <div
            className={`status-option ${statusFilter === "canceled" ? "active" : ""}`}
            onClick={() => handleStatusFilter("canceled")}
          >
            {i18n("pages.history.statusFilters.canceled")}
          </div>
        </div>

        {/* Time Filter */}
        <div className="time-filter">
          <div
            className={`time-option ${timeFilter === "all" ? "active" : ""}`}
            onClick={() => setTimeFilter("all")}
          >
            {i18n("pages.history.timeFilters.allTime")}
          </div>
          <div
            className={`time-option ${timeFilter === "today" ? "active" : ""}`}
            onClick={() => setTimeFilter("today")}
          >
            {i18n("pages.history.timeFilters.today")}
          </div>
          <div
            className={`time-option ${timeFilter === "week" ? "active" : ""}`}
            onClick={() => setTimeFilter("week")}
          >
            {i18n("pages.history.timeFilters.week")}
          </div>
          <div
            className={`time-option ${timeFilter === "month" ? "active" : ""}`}
            onClick={() => setTimeFilter("month")}
          >
            {i18n("pages.history.timeFilters.month")}
          </div>
          <div
            className={`time-option ${timeFilter === "year" ? "active" : ""}`}
            onClick={() => setTimeFilter("year")}
          >
            {i18n("pages.history.timeFilters.year")}
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
                    {transaction.amount.toFixed(5)} {transaction.asset}
                  </div>
                  <div
                    className={`transaction-status status-${transaction.status}`}
                  >
                    {i18n(`pages.history.status.${transaction.status}`)}
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
            <div className="empty-title">{i18n("pages.history.emptyState.title")}</div>
            <div className="empty-text">
              {i18n("pages.history.emptyState.description")}
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

        .transaction-status {
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