import React from 'react'

function FutureList(props) {
    const { countFutures, futuretLoading, listFutures, handleOpenOrderModal, formatNumber, formatDateTime } = props
    return (
        <div className="orders-container">
            {countFutures && !futuretLoading &&
                listFutures?.map((order) => (
                    <div
                        key={order.id}
                        className="order-card"
                        onClick={() => handleOpenOrderModal(order)}
                    >
                        <div className="order-header">
                            <div className="order-pair">{order.symbol || "BTC/USDT"}</div>
                            <div
                                className={`order-direction ${order.futuresStatus === "long" ? "buy" : "sell"
                                    }`}
                            >
                                {order.futuresStatus === "long" ? "BUY UP" : "BUY DOWN"}
                            </div>
                        </div>
                        <div
                            className={`order-status ${order.finalized ? "closed" : "open"
                                }`}
                        >
                            ● {order.finalized ? "Closed" : "Open"}
                        </div>
                        <div className="order-details">
                            <div className="order-row">
                                <span className="order-label">Futures Amount:</span>
                                <span className="order-value">${order.futuresAmount}</span>
                            </div>
                            <div className="order-row">
                                <span className="order-label">Open Price:</span>
                                <span className="order-value">
                                    {formatNumber(
                                        order?.openPositionPrice?.toString(),
                                        order?.openPositionPrice > 1000 ? 0 : 2
                                    )}
                                </span>
                            </div>
                            <div className="order-row">
                                <span className="order-label">Open Time:</span>
                                <span className="order-value">
                                    {formatDateTime(order.openPositionTime)}
                                </span>
                            </div>

                            <div className="order-row">
                                <span className="order-label">Leverage:</span>
                                <span className="order-value">{order.leverage}x</span>
                            </div>


                        </div>
                    </div>
                ))}
            {listFutures.length === 0 && !futuretLoading && (
                <div className="no-orders">
                    <i className="fas fa-file-invoice" />
                    <div>No orders</div>
                </div>
            )}
            <style>{` .order-status {
          font-size: 12px;
          margin-bottom: 12px;
        }
        
        .order-status.open {
          color: #00C076;
        }
        
        .order-status.closed {
          color: #777;
        }`}</style>
        </div>
    )
}

export default FutureList