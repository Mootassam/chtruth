import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import authSelectors from "src/modules/auth/authSelectors";
import userFormActions from "src/modules/user/form/userFormActions";
import userFormSelectors from "src/modules/user/form/userFormSelectors";
import SubHeader from "src/view/shared/Header/SubHeader";

function Invitation() {
  const dispatch = useDispatch();
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const listMembers = useSelector(userFormSelectors.listMembers);
  const Loading = useSelector(userFormSelectors.ListLoading);

  useEffect(() => {
    dispatch(userFormActions.doTree(currentUser.refcode));
    return () => {};
  }, []);
  return (
    <div className="container">
      {/* Header Section */}
      <SubHeader title="Invite Friends" />

      {/* Invite Section */}
      <div className="invite-earn-section">
        <div className="invite-section-title">Earn Together</div>
        <div className="invite-desc">
          Invite friends to join CryptoWallet and earn rewards when they sign up
          and start trading.
        </div>
        {/* Referral Code */}
        <div className="referral-text">YOUR REFERRAL CODE</div>
        <div className="referral-code-value" id="referralCode">
          {currentUser?.refcode}
        </div>
        <button className="referral-copy-btn" id="copyReferralBtn">
          <i className="fas fa-copy" />
          COPY CODE
        </button>
        {/* Share Options */}
        <div className="share-buttons">
          <div className="share-btn" data-platform="whatsapp">
            <i className="fab fa-whatsapp share-icon-img" />
          </div>
          <div className="share-btn" data-platform="email">
            <i className="fas fa-envelope share-icon-img" />
          </div>
          <div className="share-btn" data-platform="sms">
            <i className="fas fa-sms share-icon-img" />
          </div>
          <div className="share-btn" data-platform="more">
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
      {/* Generation Stats Section */}
      <div className="generation-stats-container">
        <div className="invite-section-title">Generation Members</div>
        <div className="generation-stats-grid">
          {Loading && <h2> Loading ... </h2>}
          {!Loading && listMembers?.map((item, index) => (
            <div className="generation-stat-item first-gen" key={index}>
              <div className="generation-stat-title">
                <i className="fas fa-crown" />
                {item?.level}st Generation Members
              </div>
              <div className="generation-stats-details">
                <div className="generation-stat-detail generation-stat-approved">
                  <div className="generation-stat-value">
                    {item?.approvedCount}
                  </div>
                  <div className="generation-stat-label">Approved Members</div>
                </div>
                <div className="generation-stat-detail generation-stat-pending">
                  <div className="generation-stat-value">
                    {item?.pendingCount}
                  </div>
                  <div className="generation-stat-label">Pending Members</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Commission Structure Section */}
      <div className="commission-container">
        <div className="invite-section-title">Commission Structure</div>
        <div className="commission-grid">
          <div className="commission-item first-gen">
            <div className="commission-title">
              <i className="fas fa-crown" />
              1st Generation
            </div>
            <div className="commission-details">
              <div className="commission-detail">
                <span className="commission-label">
                  First Deposit Commission
                </span>
                <span className="commission-value">15%</span>
              </div>
              <div className="commission-detail">
                <span className="commission-label">
                  Staking Profits Commission
                </span>
                <span className="commission-value">10%</span>
              </div>
            </div>
          </div>
          <div className="commission-item second-gen">
            <div className="commission-title">
              <i className="fas fa-users" />
              2nd Generation
            </div>
            <div className="commission-details">
              <div className="commission-detail">
                <span className="commission-label">
                  First Deposit Commission
                </span>
                <span className="commission-value">10%</span>
              </div>
              <div className="commission-detail">
                <span className="commission-label">
                  Staking Profits Commission
                </span>
                <span className="commission-value">7%</span>
              </div>
            </div>
          </div>
          <div className="commission-item third-gen">
            <div className="commission-title">
              <i className="fas fa-user-friends" />
              3rd Generation
            </div>
            <div className="commission-details">
              <div className="commission-detail">
                <span className="commission-label">
                  First Deposit Commission
                </span>
                <span className="commission-value">5%</span>
              </div>
              <div className="commission-detail">
                <span className="commission-label">
                  Staking Profits Commission
                </span>
                <span className="commission-value">4%</span>
              </div>
            </div>
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
              <div className="step-title-text">Earn Commissions</div>
              <div className="step-desc">
                Earn commissions from your network's first deposits and staking
                profits.
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
  );
}

export default Invitation;
