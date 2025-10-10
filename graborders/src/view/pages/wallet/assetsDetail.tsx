import React, { useEffect, useState } from "react";
import SubHeader from "src/view/shared/Header/SubHeader";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import assetsActions from 'src/modules/assets/view/assetsViewActions';
import assetsSelectors from 'src/modules/assets/view/assetsViewSelectors';
import transactionListSelector from "src/modules/transaction/list/transactionListSelectors";
import transactionListActions from "src/modules/transaction/list/transactionListActions";
import { Link } from 'react-router-dom';

function AssetsDetail() {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const details = useSelector(assetsSelectors.selectRecord);
    const transaction = useSelector(transactionListSelector.selectRows);
    const assetLoading = useSelector(assetsSelectors.selectLoading);
    const Transactionloading = useSelector(transactionListSelector.selectLoading);
    const loading = assetLoading || Transactionloading;

    const [filterModalOpen, setFilterModalOpen] = useState(false);
    const [filters, setFilters] = useState({
        status: 'all',
        type: 'all',
        direction: 'all',
        startDate: '',
        endDate: ''
    });

    useEffect(() => {
        Promise.all([
            dispatch(assetsActions.doFind(id)),
            dispatch(transactionListActions.doFetch(id))
        ]);
    }, [dispatch, id]);

    // Filter transactions based on active filters
    const filteredTransactions = transaction.filter(tx => {
        if (filters.status !== 'all' && tx.status !== filters.status) return false;
        if (filters.type !== 'all' && tx.type !== filters.type) return false;
        if (filters.direction !== 'all' && tx.direction !== filters.direction) return false;
        if (filters.startDate && new Date(tx.dateTransaction) < new Date(filters.startDate)) return false;
        if (filters.endDate && new Date(tx.dateTransaction) > new Date(filters.endDate)) return false;
        return true;
    });

    // Format date function
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const isToday = date.toDateString() === now.toDateString();
        const isYesterday = new Date(now.setDate(now.getDate() - 1)).toDateString() === date.toDateString();

        if (isToday) return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        if (isYesterday) return `Yesterday, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

        return date.toLocaleDateString([], {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Enhanced transaction configuration with icons and colors
    const getTransactionConfig = (type, direction, relatedAsset) => {
        const config = {
            icon: 'fa-exchange-alt',
            typeText: 'Transaction',
            iconClass: 'swap',
            color: '#627EEA',
            amountColor: direction === 'in' ? '#2ff378' : '#FF6838'
        };

switch (type) {
    case 'deposit':
        config.icon = 'fa-arrow-down';
        config.typeText = 'Deposit';
        config.iconClass = 'deposit';
        config.color = '#F3BA2F';
        config.amountColor = '#2ff378';
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
        config.amountColor = '#2ff378';
        break;

    case 'convert_out':
        config.icon = 'fa-exchange-alt';
        config.typeText = relatedAsset ? `Converted to ${relatedAsset}` : 'Conversion Out';
        config.iconClass = 'convert-out';
        config.color = '#9C27B0';
        config.amountColor = '#FF6838';
        break;

 case 'stacking':
  config.icon = 'fa-coins'; // More relevant than lock
  config.typeText = 'Staked Amount';
  config.iconClass = 'stacking';
  config.color = '#FF9800'; // Orange for investment/action
  config.amountColor = '#FFB74D';
  break;


        case 'staking_reward':
  config.icon = 'fa-gift'; // Or fa-trophy for achievement
  config.typeText = 'Staking Rewards';
  config.iconClass = 'staking_reward';
  config.color = '#4CAF50'; // Green for earnings/growth
  config.amountColor = '#81C784';
  break;


    // Futures Trading Transactions
    case 'futures_reserved':
        config.icon = 'fa-lock';
        config.typeText = 'Futures Reserved';
        config.iconClass = 'futures-reserved';
        config.color = '#FF9800';
        config.amountColor = '#FF9800';
        break;

    case 'futures_profit':
        config.icon = 'fa-chart-line';
        config.typeText = 'Futures Profit';
        config.iconClass = 'futures-profit';
        config.color = '#00C076';
        config.amountColor = '#00C076';
        break;

    case 'futures_loss':
        config.icon = 'fa-chart-line';
        config.typeText = 'Futures Loss';
        config.iconClass = 'futures-loss';
        config.color = '#FF6838';
        config.amountColor = '#FF6838';
        break;

    case 'futures_settlement':
        config.icon = 'fa-file-contract';
        config.typeText = 'Futures Settlement';
        config.iconClass = 'futures-settlement';
        config.color = '#9C27B0';
        config.amountColor = '#9C27B0';
        break;

    case 'futures_fee':
        config.icon = 'fa-receipt';
        config.typeText = 'Futures Fee';
        config.iconClass = 'futures-fee';
        config.color = '#607D8B';
        config.amountColor = '#607D8B';
        break;

    case 'futures_refund':
        config.icon = 'fa-undo';
        config.typeText = 'Futures Refund';
        config.iconClass = 'futures-refund';
        config.color = '#4CAF50';
        config.amountColor = '#4CAF50';
        break;

    case 'futures_bonus':
        config.icon = 'fa-gift';
        config.typeText = 'Futures Bonus';
        config.iconClass = 'futures-bonus';
        config.color = '#E91E63';
        config.amountColor = '#E91E63';
        break;

    case 'futures_commission':
        config.icon = 'fa-handshake';
        config.typeText = 'Futures Commission';
        config.iconClass = 'futures-commission';
        config.color = '#795548';
        config.amountColor = '#795548';
        break;

    // Manual Control Operations
    case 'manual_profit':
        config.icon = 'fa-user-check';
        config.typeText = 'Manual Profit';
        config.iconClass = 'manual-profit';
        config.color = '#00C076';
        config.amountColor = '#00C076';
        break;

    case 'manual_loss':
        config.icon = 'fa-user-slash';
        config.typeText = 'Manual Loss';
        config.iconClass = 'manual-loss';
        config.color = '#FF6838';
        config.amountColor = '#FF6838';
        break;

    case 'manual_adjustment':
        config.icon = 'fa-cog';
        config.typeText = 'Manual Adjustment';
        config.iconClass = 'manual-adjustment';
        config.color = '#9C27B0';
        config.amountColor = '#9C27B0';
        break;

    // Spot Trading
    case 'spot_profit':
        config.icon = 'fa-coins';
        config.typeText = 'Spot Trading Profit';
        config.iconClass = 'spot-profit';
        config.color = '#4CAF50';
        config.amountColor = '#2ff378';
        break;

    case 'spot_loss':
        config.icon = 'fa-coins';
        config.typeText = 'Spot Trading Loss';
        config.iconClass = 'spot-loss';
        config.color = '#FF5722';
        config.amountColor = '#FF6838';
        break;

    // Rewards & Bonuses
    case 'reward':
        config.icon = 'fa-hand-holding-dollar';
        config.typeText = 'Referral Reward';
        config.iconClass = 'spot-profit';
        config.color = '#63f211ff';
        config.amountColor = '#5ffc1bff';
        break;

    case 'bonus':
        config.icon = 'fa-gift';
        config.typeText = 'Bonus';
        config.iconClass = 'bonus';
        config.color = '#E91E63';
        config.amountColor = '#E91E63';
        break;

    case 'referral_commission':
        config.icon = 'fa-users';
        config.typeText = 'Referral Commission';
        config.iconClass = 'referral-commission';
        config.color = '#FF9800';
        config.amountColor = '#FF9800';
        break;

    // Order Management
    case 'order_reserved':
        config.icon = 'fa-clock';
        config.typeText = 'Order Reserved';
        config.iconClass = 'order-reserved';
        config.color = '#FF9800';
        config.amountColor = '#FF9800';
        break;

    case 'order_cancelled':
        config.icon = 'fa-ban';
        config.typeText = 'Order Cancelled';
        config.iconClass = 'order-cancelled';
        config.color = '#9E9E9E';
        config.amountColor = '#9E9E9E';
        break;

    case 'order_partial_fill':
        config.icon = 'fa-chart-pie';
        config.typeText = 'Order Partial Fill';
        config.iconClass = 'order-partial';
        config.color = '#FF9800';
        config.amountColor = '#FF9800';
        break;

    case 'order_completed':
        config.icon = 'fa-check-circle';
        config.typeText = 'Order Completed';
        config.iconClass = 'order-completed';
        config.color = '#4CAF50';
        config.amountColor = '#4CAF50';
        break;

    // System Operations
    case 'fee_payment':
        config.icon = 'fa-receipt';
        config.typeText = 'Fee Payment';
        config.iconClass = 'fee-payment';
        config.color = '#607D8B';
        config.amountColor = '#607D8B';
        break;

    case 'adjustment':
        config.icon = 'fa-sliders-h';
        config.typeText = 'Balance Adjustment';
        config.iconClass = 'adjustment';
        config.color = '#9C27B0';
        config.amountColor = '#9C27B0';
        break;

    case 'transfer':
        config.icon = 'fa-exchange-alt';
        config.typeText = 'Transfer';
        config.iconClass = 'transfer';
        config.color = '#2196F3';
        config.amountColor = '#2196F3';
        break;

    default:
        config.icon = 'fa-exchange-alt';
        config.typeText = 'Transaction';
        config.iconClass = 'default';
        config.color = '#627EEA';
        config.amountColor = '#627EEA';
}
        return config;
    };

    const resetFilters = () => {
        setFilters({
            status: 'all',
            type: 'all',
            direction: 'all',
            startDate: '',
            endDate: ''
        });
    };

    return (
        <div className="container">
            <SubHeader title="Detail" />

            {/* Asset Card with Loading Placeholder */}
            {loading ? (
                <div className="asset-card-placeholder">
                    <div className="shimmer-circle"></div>
                    <div className="shimmer-line medium"></div>
                    <div className="shimmer-line large"></div>
                </div>
            ) : (
                <div className="asset-card">
                    <img
                        src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${details?.symbol}.png`}
                        style={{ width: 60, height: 60 }}
                        alt={details?.symbol}
                        loading="lazy"
                    />
                    <div className="asset-name">{details?.coinName}</div>
                    <div className="asset-amount">{details?.amount} {details?.symbol}</div>
                </div>
            )}

            <div className="transaction-history">
                <div className="section-header">
                    <div className="section-title">Transaction History</div>
                    <div className="filter-button" onClick={() => setFilterModalOpen(true)}>
                        <i className="fas fa-filter" />
                        Filter
                    </div>
                </div>

                {/* Transaction List with Loading Placeholder */}
                <div className="transaction-list">
                    {loading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                            <div className="transaction-item-placeholder" key={index}>
                                <div className="transaction-info-placeholder">
                                    <div className="shimmer-circle"></div>
                                    <div className="transaction-details-placeholder">
                                        <div className="shimmer-line medium"></div>
                                        <div className="shimmer-line small"></div>
                                    </div>
                                </div>
                                <div className="transaction-amount-placeholder">
                                    <div className="shimmer-line medium"></div>
                                    <div className="shimmer-line small"></div>
                                </div>
                            </div>
                        ))
                    ) : filteredTransactions?.length > 0 ? (
                        filteredTransactions.map((tx) => {
                            const { icon, typeText, iconClass, amountColor } = getTransactionConfig(
                                tx.type,
                                tx.direction,
                                tx.relatedAsset
                            );

                            return (
                                <div className="transaction-item" key={tx._id}>
                                    <div className="transaction-info">
                                        <div className={`transaction-icon ${iconClass}`} style={{ backgroundColor: getTransactionConfig(tx.type, tx.direction, tx.relatedAsset).color }}>
                                            <i className={`fas ${icon}`} />
                                        </div>
                                        <div className="transaction-details">
                                            <div className="transaction-type">{typeText}</div>
                                            <div className="transaction-date">
                                                {formatDate(tx.dateTransaction)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="transaction-amount">
                                        <div className="transaction-value" style={{ color: amountColor }}>
                                            {tx.direction === 'in' ? '+' : '-'}
                                            {tx.amount} {tx.asset}
                                        </div>
                                        <div className={`transaction-status ${tx.status === 'pending' ? 'pending' : tx.status === "canceled" ? 'canceled' : ''
                                            }`}>
                                            {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="no-transactions-container">
                            <div className="no-transactions-icon">
                                <i className="fas fa-file-invoice-dollar"></i>
                            </div>
                            <h3>No Transactions Yet</h3>
                            <p>Your transaction history will appear here once you start trading.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Filter Modal */}
            {filterModalOpen && (
                <div className="modal-backdrop" onClick={() => setFilterModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Filter Transactions</h3>
                            <span className="close" onClick={() => setFilterModalOpen(false)}>&times;</span>
                        </div>
                        <div className="modal-body">
                            <div className="filter-group">
                                <label>Status</label>
                                <select
                                    value={filters.status}
                                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                >
                                    <option value="all">All Statuses</option>
                                    <option value="completed">Completed</option>
                                    <option value="pending">Pending</option>
                                    <option value="canceled">Canceled</option>
                                </select>
                            </div>
                            <div className="filter-group">
                                <label>Type</label>
                                <select
                                    value={filters.type}
                                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                                >
                                    <option value="all">All Types</option>
                                    <option value="deposit">Deposit</option>
                                    <option value="withdraw">Withdrawal</option>
                                    <option value="convert_in">Conversion In</option>
                                    <option value="convert_out">Conversion Out</option>
                                    <option value="stacking">Stacking</option>
                                    <option value="futures_profit">Futures Profit</option>
                                    <option value="futures_loss">Futures Loss</option>
                                    <option value="spot_profit">Spot Profit</option>
                                    <option value="spot_loss">Spot Loss</option>
                                </select>
                            </div>
                            <div className="filter-group">
                                <label>Direction</label>
                                <select
                                    value={filters.direction}
                                    onChange={(e) => setFilters({ ...filters, direction: e.target.value })}
                                >
                                    <option value="all">Both Directions</option>
                                    <option value="in">Incoming</option>
                                    <option value="out">Outgoing</option>
                                </select>
                            </div>
                            <div className="filter-group">
                                <label>Start Date</label>
                                <input
                                    type="date"
                                    value={filters.startDate}
                                    onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                                />
                            </div>
                            <div className="filter-group">
                                <label>End Date</label>
                                <input
                                    type="date"
                                    value={filters.endDate}
                                    onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-secondary" onClick={resetFilters}>Reset Filters</button>
                            <button className="btn-primary" onClick={() => setFilterModalOpen(false)}>Apply Filters</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="action-buttons">
                <Link to="/deposit" className="action-button deposit-button remove_blue">Deposit</Link>
                <Link to="/withdraw" className="action-button withdraw-button remove_blue">Withdraw</Link>
            </div>

            <style>{`
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

                /* Shimmer animation for loading placeholders */
                @keyframes shimmer {
                    0% { background-position: -468px 0; }
                    100% { background-position: 468px 0; }
                }
                
                .shimmer {
                    animation-duration: 1.5s;
                    animation-fill-mode: forwards;
                    animation-iteration-count: infinite;
                    animation-name: shimmer;
                    animation-timing-function: linear;
                    background: #2A2A2A;
                    background: linear-gradient(to right, #2A2A2A 8%, #333333 18%, #2A2A2A 33%);
                    background-size: 800px 104px;
                    position: relative;
                    border-radius: 4px;
                }
                
                .shimmer-circle {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    margin: 0 auto 15px;
                    background: #2A2A2A;
                    background: linear-gradient(to right, #2A2A2A 8%, #333333 18%, #2A2A2A 33%);
                    background-size: 800px 104px;
                    animation: shimmer 1.5s infinite linear;
                }
                
                .shimmer-line {
                    height: 16px;
                    margin: 8px auto;
                    background: #2A2A2A;
                    background: linear-gradient(to right, #2A2A2A 8%, #333333 18%, #2A2A2A 33%);
                    background-size: 800px 104px;
                    animation: shimmer 1.5s infinite linear;
                    border-radius: 4px;
                }
                
                .shimmer-line.small {
                    width: 60%;
                    height: 12px;
                }
                
                .shimmer-line.medium {
                    width: 70%;
                }
                
                .shimmer-line.large {
                    width: 80%;
                    height: 24px;
                }
                
                .asset-card-placeholder {
                    background: linear-gradient(135deg, #2A2A2A 0%, #1A1A1A 100%);
                    border-radius: 16px;
                    padding: 20px;
                    margin-bottom: 25px;
                    text-align: center;
                }
                
                .transaction-item-placeholder {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 15px;
                    background-color: #1A1A1A;
                    border-radius: 12px;
                }
                
                .transaction-info-placeholder {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                
                .transaction-details-placeholder {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                
                .transaction-amount-placeholder {
                    text-align: right;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                
                /* Enhanced No Transactions State */
                .no-transactions-container {
                    text-align: center;
                    padding: 40px 20px;
                    background: linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%);
                    border-radius: 16px;
                    margin: 20px 0;
                }
                
                .no-transactions-icon {
                    font-size: 60px;
                    color: #F3BA2F;
                    margin-bottom: 20px;
                    animation: pulse 2s infinite;
                }
                
                .no-transactions-container h3 {
                    font-size: 24px;
                    margin-bottom: 10px;
                    color: #FFFFFF;
                }
                
                .no-transactions-container p {
                    color: #AAAAAA;
                    margin-bottom: 30px;
                    line-height: 1.5;
                    max-width: 300px;
                    margin-left: auto;
                    margin-right: auto;
                }
                
                .container {
                    max-width: 400px;
                    margin: 0 auto;
                    position: relative;
                }
                
                .asset-card {
                    background: linear-gradient(135deg, #2A2A2A 0%, #1A1A1A 100%);
                    border-radius: 16px;
                    padding: 20px;
                    margin-bottom: 25px;
                    text-align: center;
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
                
                .transaction-history {
                    margin-bottom: 80px;
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
                    color: #2ff378;
                    font-size: 12px;
                }
                
                .transaction-status.pending {
                    color: #F3BA2F;
                }

                .transaction-status.canceled {
                    color: #FF6838;
                }
                
                // .action-buttons {
                //     display: flex;
                //     gap: 15px;
                //     position: fixed;
                //     bottom: 20px;
                //     left: 0;
                //     right: 0;
                //     max-width: 400px;
                //     margin: 0 auto;
                //     padding: 0 15px;
                // }
                
                .action-button {
                    flex: 1;
                    padding: 16px;
                    border-radius: 12px;
                    font-weight: bold;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    text-decoration: none;
                    display: block;
                }
                
                .deposit-button {
                    background-color: #F3BA2F;
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
                
                /* Modal Styles */
                .modal-backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.4);
                    backdrop-filter: blur(15px);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
                
                .modal-content {
                    background-color: #1A1A1A;
                    border-radius: 16px;
                    width: 90%;
                    max-width: 400px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
                    overflow: hidden;
                    animation: modal-appear 0.3s ease;
                }
                
                @keyframes modal-appear {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .modal-header {
                    padding: 20px;
                    border-bottom: 1px solid #2A2A2A;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .modal-header h3 {
                    margin: 0;
                    font-size: 18px;
                }
                
                .close {
                    font-size: 24px;
                    cursor: pointer;
                    color: #AAAAAA;
                }
                
                .close:hover {
                    color: #FFF;
                }
                
                .modal-body {
                    padding: 20px;
                }
                
                .filter-group {
                    margin-bottom: 15px;
                }
                
                .filter-group label {
                    display: block;
                    margin-bottom: 5px;
                    color: #CCCCCC;
                    font-size: 14px;
                }
                
                .filter-group select, .filter-group input {
                    width: 100%;
                    padding: 10px;
                    border-radius: 8px;
                    background-color: #2A2A2A;
                    border: 1px solid #444;
                    color: #FFF;
                }
                
                .modal-footer {
                    padding: 20px;
                    border-top: 1px solid #2A2A2A;
                    display: flex;
                    justify-content: space-between;
                    gap: 10px;
                }
                
                .modal-footer button {
                    flex: 1;
                    padding: 12px;
                    border-radius: 8px;
                    font-weight: bold;
                    cursor: pointer;
                    border: none;
                }
                
                .btn-secondary {
                    background-color: #2A2A2A;
                    color: #FFF;
                }
                
                .btn-primary {
                    background-color: #F3BA2F;
                    color: #000;
                }
                
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.05); opacity: 0.8; }
                    100% { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
}

export default AssetsDetail;