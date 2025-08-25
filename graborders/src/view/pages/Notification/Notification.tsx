import React from 'react'
import SubHeader from 'src/view/shared/Header/SubHeader'

function Notification() {
  return (
<div className='container'>
  {/* Header */}
 <SubHeader title="Notification" />
  {/* Filter Tabs */}
  <div className="filter-tabs">
    <button className="filter-tab active">All</button>
    <button className="filter-tab">Unread</button>
    <button className="filter-tab">Read</button>
  </div>
  {/* Notification Container */}
  <div className="notification-container">
    {/* Notification 1 */}
    <div className="notification-item unread">
      <div className="notification-icon">
        <i className="fas fa-arrow-down" />
      </div>
      <div className="notification-content">
        <div className="notification-title">Deposit Received</div>
        <div className="notification-message">
          Your deposit of 0.5 BTC has been confirmed and credited to your
          wallet.
        </div>
        <div className="notification-time">10 minutes ago</div>
      </div>
      <div className="unread-indicator" />
    </div>
    {/* Notification 2 */}
    <div className="notification-item unread">
      <div className="notification-icon">
        <i className="fas fa-arrow-up" />
      </div>
      <div className="notification-content">
        <div className="notification-title">Withdrawal Processed</div>
        <div className="notification-message">
          Your withdrawal of 2.34 ETH has been successfully processed.
        </div>
        <div className="notification-time">2 hours ago</div>
      </div>
      <div className="unread-indicator" />
    </div>
    {/* Notification 3 */}
    <div className="notification-item">
      <div className="notification-icon">
        <i className="fas fa-shield-alt" />
      </div>
      <div className="notification-content">
        <div className="notification-title">Security Alert</div>
        <div className="notification-message">
          A new device has been detected logging into your account.
        </div>
        <div className="notification-time">5 hours ago</div>
      </div>
    </div>
    {/* Notification 4 */}
    <div className="notification-item unread">
      <div className="notification-icon">
        <i className="fas fa-bell" />
      </div>
      <div className="notification-content">
        <div className="notification-title">Price Alert: BTC</div>
        <div className="notification-message">
          Bitcoin has reached your target price of $45,000.
        </div>
        <div className="notification-time">1 day ago</div>
      </div>
      <div className="unread-indicator" />
    </div>
    {/* Notification 5 */}
    <div className="notification-item">
      <div className="notification-icon">
        <i className="fas fa-chart-line" />
      </div>
      <div className="notification-content">
        <div className="notification-title">Weekly Report</div>
        <div className="notification-message">
          Your weekly portfolio performance report is now available.
        </div>
        <div className="notification-time">2 days ago</div>
      </div>
    </div>
  </div>
 
</div>


  )
}

export default Notification