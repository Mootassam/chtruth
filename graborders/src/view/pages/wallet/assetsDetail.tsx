import React from "react";
import SubHeader from "src/view/shared/Header/SubHeader";
import { useParams } from "react-router-dom";

function assetsDetail() {
    const { id } = useParams<{ id: string }>();
  
  return (
    <div className="container">
      <SubHeader title="Detail" />
      <div className="asset-card">
        <img
          src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${id}.png`}
          style={{ width: 60, height: 60 }}
          alt={id}
          loading="lazy"
        />
        <div className="asset-name">Bitcoin</div>
        <div className="asset-amount">0.2543 {id}</div>
        <div className="asset-value">$10,245.67</div>
        <div className="price-change">
          <i className="fas fa-arrow-up" />
          +1.46% Today
        </div>
      </div>
      <div className="transaction-history">
        <div className="section-header">
          <div className="section-title">Transaction History</div>
          <div className="filter-button">
            <i className="fas fa-filter" />
            Filter
          </div>
        </div>
        <div className="transaction-list">
          <div className="transaction-item">
            <div className="transaction-info">
              <div className="transaction-icon deposit">
                <i className="fas fa-arrow-down" />
              </div>
              <div className="transaction-details">
                <div className="transaction-type">Deposit</div>
                <div className="transaction-date">Today, 10:23 AM</div>
              </div>
            </div>
            <div className="transaction-amount">
              <div className="transaction-value">+0.025 BTC</div>
              <div className="transaction-status">Completed</div>
            </div>
          </div>
          <div className="transaction-item">
            <div className="transaction-info">
              <div className="transaction-icon withdraw">
                <i className="fas fa-arrow-up" />
              </div>
              <div className="transaction-details">
                <div className="transaction-type">Withdrawal</div>
                <div className="transaction-date">Yesterday, 2:45 PM</div>
              </div>
            </div>
            <div className="transaction-amount">
              <div className="transaction-value">-0.100 BTC</div>
              <div className="transaction-status pending">Pending</div>
            </div>
          </div>
          <div className="transaction-item">
            <div className="transaction-info">
              <div className="transaction-icon swap">
                <i className="fas fa-exchange-alt" />
              </div>
              <div className="transaction-details">
                <div className="transaction-type">Converted to ETH</div>
                <div className="transaction-date">Oct 12, 3:20 PM</div>
              </div>
            </div>
            <div className="transaction-amount">
              <div className="transaction-value">-0.050 BTC</div>
              <div className="transaction-status">Completed</div>
            </div>
          </div>
          <div className="transaction-item">
            <div className="transaction-info">
              <div className="transaction-icon deposit">
                <i className="fas fa-arrow-down" />
              </div>
              <div className="transaction-details">
                <div className="transaction-type">Deposit</div>
                <div className="transaction-date">Oct 10, 9:15 AM</div>
              </div>
            </div>
            <div className="transaction-amount">
              <div className="transaction-value">+0.1793 BTC</div>
              <div className="transaction-status">Completed</div>
            </div>
          </div>
        </div>
      </div>
      <div className="action-buttons">
        <div className="action-button deposit-button">Deposit</div>
        <div className="action-button withdraw-button">Withdraw</div>
      </div>
      <style>{` 
        .asset-title {
            font-size: 20px;
            font-weight: bold;
        }
        
        .search-icon {
            color: #AAAAAA;
            font-size: 20px;
        }
        
        .asset-card {
            background: linear-gradient(135deg, #2A2A2A 0%, #1A1A1A 100%);
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 25px;
            text-align: center;
        }
        
        .asset-icon {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 auto 15px;
            font-size: 28px;
            background-color: #F3BA2F;
            color: #000;
        }
        
        .asset-name {
            font-size: 22px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        .asset-amount {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        .asset-value {
            color: #AAAAAA;
            font-size: 16px;
            margin-bottom: 15px;
        }
        
        .price-change {
            color: #00C076;
            font-size: 14px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;
        }
        
        .price-change.negative {
            color: #FF6838;
        }
        
        .transaction-history {
            margin-bottom: 20px;
        }
        
        .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }
        
        .section-title {
            font-weight: bold;
            font-size: 18px;
        }
        
        .filter-button {
            color: #CCCCCC;
            font-size: 14px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .transaction-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
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
        }
        
        .transaction-icon.deposit {
            background-color: #00C076;
            color: #000;
        }
        
        .transaction-icon.withdraw {
            background-color: #FF6838;
            color: #000;
        }
        
        .transaction-icon.swap {
            background-color: #627EEA;
            color: #FFF;
        }
        
        .transaction-details {
            display: flex;
            flex-direction: column;
        }
        
        .transaction-type {
            font-weight: bold;
            margin-bottom: 4px;
        }
        
        .transaction-date {
            color: #AAAAAA;
            font-size: 12px;
        }
        
        .transaction-amount {
            text-align: right;
        }
        
        .transaction-value {
            font-weight: bold;
            margin-bottom: 4px;
        }
        
        .transaction-status {
            color: #00C076;
            font-size: 12px;
        }
        
        .transaction-status.failed {
            color: #FF6838;
        }
        
        .transaction-status.pending {
            color: #F3BA2F;
        }
        
        .action-buttons {
            display: flex;
            gap: 15px;
            position: fixed;
            max-width: 400px;
            margin: 0 auto;
        }
        
        .action-button {
            flex: 1;
            padding: 16px;
            border-radius: 12px;
            font-weight: bold;
            text-align: center;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .deposit-button {
            background-color: #00C076;
            color: #000;
        }
        
        .withdraw-button {
            background-color: #2A2A2A;
            color: #FFF;
            border: 1px solid #444;
        }
        
        .action-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        
        .no-transactions {
            text-align: center;
            padding: 30px;
            color: #AAAAAA;
            font-style: italic;
        }`}</style>
    </div>
  );
}

export default assetsDetail;
