import React, { useEffect, useState } from "react";
import SubHeader from "src/view/shared/Header/SubHeader";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import spotListSelctors from "src/modules/spot/list/spotListSelectors";
import sportListActions from "src/modules/spot/list/spotListActions";
import sportFormActions from "src/modules/spot/form/spotFormActions";
function OrdersPage() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const listspot = useSelector(spotListSelctors.selectRows);
  const listLoading =useSelector(spotListSelctors.selectLoading)
  const count = useSelector(spotListSelctors.selectCount)
  const dispatch = useDispatch();
  // Sample orders data
  const orders = [
    {
      id: 1,
      pair: "BTC/USDT",
      action: "BUY",
      date: "08/23",
      time: "02:20:08",
      status: "COMPLETED",
      orderPrice: "117065.0000",
      orderAmount: "0.000901",
      filled: "100%",
      total: "105.48",
      type: "LIMIT"
    },
    {
      id: 2,
      pair: "ETH/USDT",
      action: "SELL",
      date: "08/24",
      time: "14:35:22",
      status: "PENDING",
      orderPrice: "2850.50",
      orderAmount: "1.25",
      filled: "35%",
      total: "3563.13",
      type: "LIMIT"
    },
    {
      id: 3,
      pair: "SOL/USDT",
      action: "BUY",
      date: "08/24",
      time: "09:15:47",
      status: "PARTIALLY_FILLED",
      orderPrice: "102.75",
      orderAmount: "15.50",
      filled: "75%",
      total: "1194.56",
      type: "MARKET"
    },
    {
      id: 4,
      pair: "XRP/USDT",
      action: "SELL",
      date: "08/22",
      time: "18:42:11",
      status: "CANCELLED",
      orderPrice: "0.5875",
      orderAmount: "500",
      filled: "0%",
      total: "293.75",
      type: "LIMIT"
    },
    {
      id: 5,
      pair: "ADA/USDT",
      action: "BUY",
      date: "08/21",
      time: "11:23:34",
      status: "COMPLETED",
      orderPrice: "0.4650",
      orderAmount: "1000",
      filled: "100%",
      total: "465.00",
      type: "MARKET"
    },
    {
      id: 6,
      pair: "BTC/USDT",
      action: "SELL",
      date: "08/20",
      time: "16:55:09",
      status: "COMPLETED",
      orderPrice: "48920.00",
      orderAmount: "0.005",
      filled: "100%",
      total: "244.60",
      type: "LIMIT"
    }
  ];



   useEffect(() => {
    dispatch(sportListActions.doFetch());
  }, []);
  // Filter orders based on active filter and search term
  const filteredOrders = orders.filter(order => {
    const matchesFilter = 
      activeFilter === "ALL" || 
      order.status === activeFilter ||
      (activeFilter === "OPEN" && (order.status === "PENDING" || order.status === "PARTIALLY_FILLED"));
    
    const matchesSearch = 
      order.pair.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // Format number with commas
  const formatNumber = (num, decimals = 2) => {
    return Number(num).toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case "COMPLETED": return "#00C076";
      case "PENDING": return "#F3BA2F";
      case "PARTIALLY_FILLED": return "#FF6838";
      case "CANCELLED": return "#AAAAAA";
      default: return "#FFFFFF";
    }
  };

  // Get action color
  const getActionColor = (action) => {
    return action === "BUY" ? "#00C076" : "#FF6838";
  };

  return (
    <div className="container">
      {/* Header */}
      
      <SubHeader title="Orders History" />

      {/* Search Box */}
      <div className="search-box">
        <i className="fas fa-search"></i>
        <input 
          type="text" 
          placeholder="Search by pair or type..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Filters - Mobile Optimized */}
      <div className="filters-container">
        <div className="filters-header" onClick={() => setIsFilterOpen(!isFilterOpen)}>
          <span>Filter: {activeFilter === "ALL" ? "All Orders" : activeFilter}</span>
          <i className={`fas fa-chevron-${isFilterOpen ? "up" : "down"}`}></i>
        </div>
        
        {isFilterOpen && (
          <div className="filters-menu">
            <button 
              className={activeFilter === "ALL" ? "active" : ""}
              onClick={() => {
                setActiveFilter("ALL");
                setIsFilterOpen(false);
              }}
            >
              All Orders
            </button>
            <button 
              className={activeFilter === "OPEN" ? "active" : ""}
              onClick={() => {
                setActiveFilter("OPEN");
                setIsFilterOpen(false);
              }}
            >
              Open
            </button>
            <button 
              className={activeFilter === "COMPLETED" ? "active" : ""}
              onClick={() => {
                setActiveFilter("COMPLETED");
                setIsFilterOpen(false);
              }}
            >
              Completed
            </button>
            <button 
              className={activeFilter === "CANCELLED" ? "active" : ""}
              onClick={() => {
                setActiveFilter("CANCELLED");
                setIsFilterOpen(false);
              }}
            >
              Cancelled
            </button>
          </div>
        )}
      </div>

      {/* Orders List - Mobile Cards */}
      <div className="orders-list">
  {count > 0  ? (
    listspot.map(order => (
      <div key={order.id} className="order-card">
        {/* Header */}
        <div className="order-card-header">
          <div className="pair-action">
            <span className="pair">{order.tradingPair}</span>
            <span
              className="action-badge"
              style={{ color: getActionColor(order.direction) }}
            >
              {order.direction}
            </span>
          </div>
          <div className="date-time">
            <span className="date">
              {order.commissionTime
                ? new Date(order.commissionTime).toLocaleDateString()
                : ""}
            </span>
            <span className="time">
              {order.commissionTime
                ? new Date(order.commissionTime).toLocaleTimeString()
                : ""}
            </span>
          </div>
        </div>

        {/* Order Details */}
        <div className="order-details">
          <div className="detail-row">
            <span className="label">Type</span>
            <span className="value">{order.orderType}</span>
          </div>

          <div className="detail-row">
            <span className="label">Status</span>
            <span
              className="value"
              style={{ color: getStatusColor(order.status) }}
            >
              {order.status}
            </span>
          </div>

          <div className="detail-row">
            <span className="label">Price</span>
            <span className="value">
              {formatNumber(order.commissionPrice, 4)} USDT
            </span>
          </div>

          <div className="detail-row">
            <span className="label">Amount</span>
            <span className="value">{order.orderQuantity}</span>
          </div>

          <div className="detail-row">
            <span className="label">Total (Entrusted)</span>
            <span className="value total">
              {formatNumber(order.entrustedValue)} USDT
            </span>
          </div>

          <div className="detail-row">
            <span className="label">Transaction Quantity</span>
            <span className="value">{order.transactionQuantity ?? "-"}</span>
          </div>

          <div className="detail-row">
            <span className="label">Transaction Value</span>
            <span className="value">
              {order.transactionValue
                ? formatNumber(order.transactionValue)
                : "-"}
            </span>
          </div>

          <div className="detail-row">
            <span className="label">Closing Price</span>
            <span className="value">
              {order.closingPrice ? formatNumber(order.closingPrice, 4) : "-"}
            </span>
          </div>

          <div className="detail-row">
            <span className="label">Handling Fee</span>
            <span className="value">
              {order.handlingFee ? formatNumber(order.handlingFee, 4) : "-"}
            </span>
          </div>

          <div className="detail-row">
            <span className="label">Closing Time</span>
            <span className="value">
              {order.closingTime
                ? new Date(order.closingTime).toLocaleString()
                : "-"}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="order-card-footer">
          <span
            className="status-badge"
            style={{ color: getStatusColor(order.status) }}
          >
            {order.status}
          </span>
        </div>
      </div>
    ))
  ) : (
    <div className="no-orders">
      <i className="fas fa-clipboard-list"></i>
      <p>No orders found</p>
      <span>Try adjusting your filters or search term</span>
    </div>
  )}
</div>


      <style>{`
        .orders-page {
          background-color: #000000;
          color: #FFFFFF;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          padding: 16px;
          padding-bottom: 80px;
        }

        .orders-header {
          margin-bottom: 20px;
        }

        .orders-header h1 {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 4px;
        }

        .orders-header p {
          color: #AAAAAA;
          font-size: 14px;
        }

        .search-box {
          display: flex;
          align-items: center;
          background-color: #1A1A1A;
          border-radius: 10px;
          padding: 12px 16px;
          margin-bottom: 16px;
        }

        .search-box i {
          color: #AAAAAA;
          margin-right: 12px;
          font-size: 16px;
        }

        .search-box input {
          background: none;
          border: none;
          color: #FFFFFF;
          font-size: 16px;
          width: 100%;
          outline: none;
        }

        .filters-container {
          margin-bottom: 20px;
          position: relative;
        }

        .filters-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #1A1A1A;
          padding: 14px 16px;
          border-radius: 10px;
          cursor: pointer;
        }

        .filters-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background-color: #2A2A2A;
          border-radius: 0 0 10px 10px;
          z-index: 10;
          overflow: hidden;
        }

        .filters-menu button {
          display: block;
          width: 100%;
          padding: 14px 16px;
          background: none;
          border: none;
          color: #FFFFFF;
          font-size: 16px;
          text-align: left;
          cursor: pointer;
          border-bottom: 1px solid #3A3A3A;
        }

        .filters-menu button:last-child {
          border-bottom: none;
        }

        .filters-menu button.active {
          color: #F3BA2F;
          background-color: rgba(243, 186, 47, 0.1);
        }

        .orders-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .order-card {
          background-color: #1A1A1A;
          border-radius: 12px;
          padding: 16px;
        }

        .order-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .pair-action {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .pair {
          font-size: 18px;
          font-weight: bold;
        }

        .action-badge {
          font-size: 14px;
          font-weight: bold;
          padding: 4px 8px;
          border-radius: 4px;
          background-color: rgba(0, 192, 118, 0.1);
          align-self: flex-start;
        }

        .action-badge[style*="color: #FF6838"] {
          background-color: rgba(255, 104, 56, 0.1);
        }

        .date-time {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
        }

        .date {
          font-size: 14px;
          font-weight: 500;
        }

        .time {
          font-size: 12px;
          color: #AAAAAA;
        }

        .order-details {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 16px;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .label {
          font-size: 14px;
          color: #AAAAAA;
        }

        .value {
          font-size: 14px;
          font-weight: 500;
        }

        .value.total {
          font-weight: bold;
          color: #F3BA2F;
        }

        .filled-container {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .filled-percent {
          font-size: 14px;
          color: #F3BA2F;
          min-width: 35px;
        }

        .progress-bar {
          width: 80px;
          height: 6px;
          background-color: #2A2A2A;
          border-radius: 3px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background-color: #F3BA2F;
          border-radius: 3px;
          transition: width 0.3s ease;
        }

        .order-card-footer {
          display: flex;
          justify-content: flex-end;
        }

        .status-badge {
          font-size: 14px;
          font-weight: bold;
          padding: 6px 12px;
          border-radius: 6px;
          background-color: rgba(0, 192, 118, 0.1);
        }

        .status-badge[style*="color: #F3BA2F"] {
          background-color: rgba(243, 186, 47, 0.1);
        }

        .status-badge[style*="color: #FF6838"] {
          background-color: rgba(255, 104, 56, 0.1);
        }

        .status-badge[style*="color: #AAAAAA"] {
          background-color: rgba(170, 170, 170, 0.1);
        }

        .no-orders {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          text-align: center;
          color: #AAAAAA;
        }

        .no-orders i {
          font-size: 48px;
          margin-bottom: 16px;
          color: #2A2A2A;
        }

        .no-orders p {
          font-size: 18px;
          margin-bottom: 8px;
          color: #FFFFFF;
        }

        .no-orders span {
          font-size: 14px;
        }

        /* Responsive adjustments */
        @media (max-width: 360px) {
          .order-card-header {
            flex-direction: column;
            gap: 8px;
          }
          
          .date-time {
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}

export default OrdersPage;