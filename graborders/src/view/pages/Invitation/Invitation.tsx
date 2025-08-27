import React from 'react'
import SubHeader from 'src/view/shared/Header/SubHeader'

function Invitation() {
  return (
<div className="invite-container">
  {/* Header Section */}
<SubHeader title="Invite Friends" />
  {/* Invite Section */}
  <div className="invite-earn-section">
    <div className="invite-section-title">Earn Together</div>
    <div className="invite-desc">
      Invite friends to join CryptoWallet and earn rewards when they sign up and
      trade.
    </div>
    {/* Referral Code */}
    <div className="referral-text">YOUR REFERRAL CODE</div>
    <div className="referral-code-value">X7F9-2K4M-8R3T</div>
    <button className="referral-copy-btn" id="copyReferralBtn">
      <i className="fas fa-copy" />
      COPY CODE
    </button>
    {/* Share Options */}
    <div className="share-buttons">
      <div className="share-btn">
        <i className="fab fa-whatsapp share-icon-img" />
      </div>
      <div className="share-btn">
        <i className="fas fa-envelope share-icon-img" />
      </div>
      <div className="share-btn">
        <i className="fas fa-sms share-icon-img" />
      </div>
      <div className="share-btn">
        <i className="fas fa-share-alt share-icon-img" />
      </div>
    </div>
  </div>
  {/* Rewards Section */}
  <div className="rewards-container">
    <div className="invite-section-title">Your Rewards</div>
    <div className="rewards-grid-container">
      <div className="reward-item">
        <div className="reward-amount">$125</div>
        <div className="reward-text">Total Earned</div>
      </div>
      <div className="reward-item">
        <div className="reward-amount">15</div>
        <div className="reward-text">Friends Invited</div>
      </div>
      <div className="reward-item">
        <div className="reward-amount">$25</div>
        <div className="reward-text">Per Friend</div>
      </div>
      <div className="reward-item">
        <div className="reward-amount">5</div>
        <div className="reward-text">Pending Rewards</div>
      </div>
    </div>
  </div>
  {/* Members Section */}
  <div className="members-container">
    <div className="members-header-section">
      <div className="invite-section-title">First Generation Members</div>
      <a href="#" className="members-view-all">
        View All
      </a>
    </div>
    <div className="members-stats-container">
      <div className="stat-item">
        <div className="stat-value stat-approved">8</div>
        <div className="stat-label">Approved Members</div>
      </div>
      <div className="stat-item">
        <div className="stat-value stat-pending">7</div>
        <div className="stat-label">Pending Approval</div>
      </div>
    </div>
    <div className="members-list-container">
      <div className="member-list-item">
        <div className="member-avatar-img">
          <i className="fas fa-user" />
        </div>
        <div className="member-info">
          <div className="member-name-text">Michael Chen</div>
          <div className="member-join-date">Joined: Jan 15, 2024</div>
        </div>
        <div className="member-status-badge status-badge-approved">
          Approved
        </div>
      </div>
      <div className="member-list-item">
        <div className="member-avatar-img">
          <i className="fas fa-user" />
        </div>
        <div className="member-info">
          <div className="member-name-text">Sarah Johnson</div>
          <div className="member-join-date">Joined: Jan 12, 2024</div>
        </div>
        <div className="member-status-badge status-badge-approved">
          Approved
        </div>
      </div>
      <div className="member-list-item">
        <div className="member-avatar-img">
          <i className="fas fa-user" />
        </div>
        <div className="member-info">
          <div className="member-name-text">David Wilson</div>
          <div className="member-join-date">Joined: Jan 10, 2024</div>
        </div>
        <div className="member-status-badge status-badge-pending">Pending</div>
      </div>
    </div>
  </div>
  {/* How It Works */}
  <div className="how-it-works-container">
    <div className="invite-section-title">How It Works</div>
    <div className="steps-container">
      <div className="step-item">
        <div className="step-number-circle">1</div>
        <div className="step-content-text">
          <div className="step-title-text">Share Your Referral Code</div>
          <div className="step-desc">
            Send your unique code to friends or share it on social media.
          </div>
        </div>
      </div>
      <div className="step-item">
        <div className="step-number-circle">2</div>
        <div className="step-content-text">
          <div className="step-title-text">Friends Sign Up</div>
          <div className="step-desc">
            Your friends sign up using your referral code and verify their
            accounts.
          </div>
        </div>
      </div>
      <div className="step-item">
        <div className="step-number-circle">3</div>
        <div className="step-content-text">
          <div className="step-title-text">Earn Rewards</div>
          <div className="step-desc">
            You earn $25 when each friend completes their first trade.
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Toast Notification */}
  <div className="toast-notification" id="referralToast">
    Referral code copied to clipboard!
  </div>
</div>


  )
}

export default Invitation