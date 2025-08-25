import React from 'react'
import SubHeader from 'src/view/shared/Header/SubHeader'

function Invitation() {
  return (
<div className="container">
  {/* Header Section */}
  
  <SubHeader title="Invite Friends" />
  {/* Invite Section */}
  <div className="invite-section">
    <div className="section-title">Earn Together</div>
    <div className="invite-description">
      Invite friends to join CryptoWallet and earn rewards when they sign up and
      trade.
    </div>
    {/* Referral Code */}
    <div className="referral-label">YOUR REFERRAL CODE</div>
    <div className="referral-code">X7F9-2K4M-8R3T</div>
    <button className="copy-button" id="copyButton">
      <i className="fas fa-copy" />
      COPY CODE
    </button>
    {/* Share Options */}
    <div className="share-options">
      <div className="share-option">
        <i className="fab fa-whatsapp share-icon" />
      </div>
      <div className="share-option">
        <i className="fas fa-envelope share-icon" />
      </div>
      <div className="share-option">
        <i className="fas fa-sms share-icon" />
      </div>
      <div className="share-option">
        <i className="fas fa-share-alt share-icon" />
      </div>
    </div>
  </div>
  {/* Rewards Section */}
  <div className="rewards-section">
    <div className="section-title">Your Rewards</div>
    <div className="rewards-grid">
      <div className="reward-card">
        <div className="reward-value">$125</div>
        <div className="reward-label">Total Earned</div>
      </div>
      <div className="reward-card">
        <div className="reward-value">15</div>
        <div className="reward-label">Friends Invited</div>
      </div>
      <div className="reward-card">
        <div className="reward-value">$25</div>
        <div className="reward-label">Per Friend</div>
      </div>
      <div className="reward-card">
        <div className="reward-value">5</div>
        <div className="reward-label">Pending Rewards</div>
      </div>
    </div>
  </div>
  {/* Members Section */}
  <div className="members-section">
    <div className="members-header">
      <div className="section-title">First Generation Members</div>
      <a href="#" className="view-all">
        View All
      </a>
    </div>
    <div className="members-stats">
      <div className="stat-card">
        <div className="stat-value approved">8</div>
        <div className="stat-label">Approved Members</div>
      </div>
      <div className="stat-card">
        <div className="stat-value pending">7</div>
        <div className="stat-label">Pending Approval</div>
      </div>
    </div>
    <div className="members-list">
      <div className="member-item">
        <div className="member-avatar">
          <i className="fas fa-user" />
        </div>
        <div className="member-details">
          <div className="member-name">Michael Chen</div>
          <div className="member-date">Joined: Jan 15, 2024</div>
        </div>
        <div className="member-status status-approved">Approved</div>
      </div>
      <div className="member-item">
        <div className="member-avatar">
          <i className="fas fa-user" />
        </div>
        <div className="member-details">
          <div className="member-name">Sarah Johnson</div>
          <div className="member-date">Joined: Jan 12, 2024</div>
        </div>
        <div className="member-status status-approved">Approved</div>
      </div>
      <div className="member-item">
        <div className="member-avatar">
          <i className="fas fa-user" />
        </div>
        <div className="member-details">
          <div className="member-name">David Wilson</div>
          <div className="member-date">Joined: Jan 10, 2024</div>
        </div>
        <div className="member-status status-pending">Pending</div>
      </div>
    </div>
  </div>
  {/* How It Works */}
  <div className="how-it-works">
    <div className="section-title">How It Works</div>
    <div className="steps">
      <div className="step">
        <div className="step-number">1</div>
        <div className="step-content">
          <div className="step-title">Share Your Referral Code</div>
          <div className="step-description">
            Send your unique code to friends or share it on social media.
          </div>
        </div>
      </div>
      <div className="step">
        <div className="step-number">2</div>
        <div className="step-content">
          <div className="step-title">Friends Sign Up</div>
          <div className="step-description">
            Your friends sign up using your referral code and verify their
            accounts.
          </div>
        </div>
      </div>
      <div className="step">
        <div className="step-number">3</div>
        <div className="step-content">
          <div className="step-title">Earn Rewards</div>
          <div className="step-description">
            You earn $25 when each friend completes their first trade.
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Toast Notification */}
  <div className="toast" id="toast">
    Referral code copied to clipboard!
  </div>
</div>

  )
}

export default Invitation