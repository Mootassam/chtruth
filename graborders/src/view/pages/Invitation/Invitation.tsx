import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authSelectors from "src/modules/auth/authSelectors";
import userFormActions from "src/modules/user/form/userFormActions";
import userFormSelectors from "src/modules/user/form/userFormSelectors";
import SubHeader from "src/view/shared/Header/SubHeader";
import Dates from "src/view/shared/utils/Dates";

function Invitation() {
  const dispatch = useDispatch();
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const listMembers = useSelector(userFormSelectors.listMembers);
  const Loading = useSelector(userFormSelectors.loading);
  const listUser = useSelector(userFormSelectors.lisUsers);

  const userLoading = useSelector(userFormSelectors.usersLoading);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    members: [],
    type: "", // 'approved' or 'pending'
  });
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (currentUser?.refcode) {
      dispatch(userFormActions.doTree(currentUser.refcode));
    }
  }, [dispatch, currentUser?.refcode]);

  // Copy referral code to clipboard
const copyReferralCode = () => {
  const code = currentUser?.refcode;
  if (!code) return;

  if (navigator.clipboard && window.isSecureContext) {
    // Modern API
    navigator.clipboard.writeText(code)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(err => {
        console.error("Clipboard copy failed: ", err);
        fallbackCopyText(code);
      });
  } else {
    // Fallback for Safari / HTTP
    fallbackCopyText(code);
  }
};

  // Share functionality
  const shareReferral = (platform) => {
    const shareText = `Join NEXUS using my referral code: ${currentUser?.refcode}`;
    const shareUrl = window.location.origin;
    
    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=Join NEXUS&body=${encodeURIComponent(shareText)}`, '_blank');
        break;
      case 'sms':
        window.open(`sms:?body=${encodeURIComponent(shareText)}`, '_blank');
        break;
      case 'more':
        if (navigator.share) {
          navigator.share({
            title: 'NEXUS Referral',
            text: shareText,
            url: shareUrl,
          });
        } else {
          copyReferralCode();
        }
        break;
      default:
        break;
    }
  };

  const handleOpenModal = async (level, type) => {
    const title = `${level}${getOrdinalSuffix(level)} Generation ${
      type === "approved" ? "Approved" : "Pending"
    } Members`;

    setModalData({
      title,
      members: [],
      type,
    });
    setIsModalOpen(true);

    const values = {
      status: type,
      refCode: currentUser.refcode,
      level: level,
    };

    dispatch(userFormActions.byLevel(values));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalData({
      title: "",
      members: [],
      type: "",
    });
  };

  const getOrdinalSuffix = (number) => {
    if (number === 1) return "st";
    if (number === 2) return "nd";
    if (number === 3) return "rd";
    return "th";
  };

  // Format generation title with correct ordinal
  const getGenerationTitle = (level) => {
    return `${level}${getOrdinalSuffix(level)} Generation Members`;
  };

  return (
    <div className="container">
  

      {/* Header Section */}
      <SubHeader title="Invite Friends" />

      {/* Invite Section */}
      <div className="invite-earn-section">
        <div className="invite-section-title">Earn Together</div>
        <div className="invite-desc">
          Invite friends to join NEXUS and earn rewards when they sign up
          and start trading.
        </div>
        {/* Referral Code */}
        <div className="referral-text">YOUR REFERRAL CODE</div>
        <div className="referral-code-value" id="referralCode">
          {currentUser?.refcode || "Loading..."}
        </div>
        <button 
          className="referral-copy-btn" 
          id="copyReferralBtn"
          onClick={copyReferralCode}
        >
          <i className="fas fa-copy" />
          {copySuccess ? "COPIED!" : "COPY CODE"}
        </button>
        {/* Share Options */}
        <div className="share-buttons">
          <div 
            className="share-btn" 
            data-platform="whatsapp"
            onClick={() => shareReferral('whatsapp')}
          >
            <i className="fab fa-whatsapp share-icon-img" />
          </div>
          <div 
            className="share-btn" 
            data-platform="email"
            onClick={() => shareReferral('email')}
          >
            <i className="fas fa-envelope share-icon-img" />
          </div>
          <div 
            className="share-btn" 
            data-platform="sms"
            onClick={() => shareReferral('sms')}
          >
            <i className="fas fa-sms share-icon-img" />
          </div>
          <div 
            className="share-btn" 
            data-platform="more"
            onClick={() => shareReferral('more')}
          >
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
          {!Loading && listMembers?.length === 0 && (
            <div style={{textAlign: 'center', color: '#AAAAAA', padding: '20px'}}>
              No generation data available
            </div>
          )}
          {!Loading &&
            listMembers?.map((item, index) => (
              <div className="generation-stat-item first-gen" key={index}>
                <div className="generation-stat-title">
                  <i className="fas fa-crown" />
                  {getGenerationTitle(item?.level)}
                </div>
                <div className="generation-stats-details">
                  <div
                    className="generation-stat-detail generation-stat-approved"
                    onClick={() => handleOpenModal(item.level, "approved")}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="generation-stat-value">
                      {item?.approvedCount || 0}
                    </div>
                    <div className="generation-stat-label">
                      Approved Members
                    </div>
                  </div>
                  <div
                    className="generation-stat-detail generation-stat-pending"
                    onClick={() => handleOpenModal(item.level, "pending")}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="generation-stat-value">
                      {item?.pendingCount || 0}
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
      <div 
        className="toast-notification" 
        id="referralToast"
        style={{
          display: copySuccess ? 'block' : 'none',
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#00C076',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          fontWeight: '500',
          zIndex: '1001'
        }}
      >
        Referral code copied to clipboard!
      </div>

      {/* Members Modal */}
      <div
        className={`modal-overlay ${isModalOpen ? "active" : ""}`}
        onClick={handleCloseModal}
      >
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3 className="modal-title">{modalData.title}</h3>
            <button className="modal-close-btn" onClick={handleCloseModal}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="modal-body">
            {userLoading ? (
              <div style={{textAlign: 'center', padding: '40px', color: '#F3BA2F'}}>
                <i className="fas fa-spinner fa-spin" style={{fontSize: '24px', marginBottom: '15px'}}></i>
                <p>Loading members...</p>
              </div>
            ) : listUser && listUser.length > 0 ? (
              <ul className="members-list">
                {listUser.map((member, index) => (
                  <li key={index} className="member-item">
                    <div className="member-info">
                      <div className="member-email">{member.email}</div>
                      <div className="member-date">
                        {modalData.type === "approved"
                          ? `Approved: ${Dates.formatDateTime(
                              member.updatedAt || member.createdAt
                            )}`
                          : `Joined: ${Dates.formatDateTime(member.createdAt)}`}
                      </div>
                    </div>
                    <div
                      className={`member-status ${
                        modalData.type === "approved"
                          ? "status-approved"
                          : "status-pending"
                      }`}
                    >
                      {modalData.type}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="empty-state">
                <i className="fas fa-users"></i>
                <p>No members found</p>
              </div>
            )}
          </div>
        </div>
      </div>
          <style>{`
        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .modal-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        .modal-content {
          background: linear-gradient(145deg, #1A1A1A, #2A2A2A);
          border-radius: 16px;
          padding: 0;
          width: 100%;
          max-width: 400px;
          max-height: 90vh;
          overflow: hidden;
          transform: translateY(50px);
          transition: transform 0.3s ease;
          border: 1px solid #2A2A2A;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .modal-overlay.active .modal-content {
          transform: translateY(0);
        }

        .modal-header {
          padding: 20px 25px;
          border-bottom: 1px solid #3A3A3A;
          background: linear-gradient(145deg, #2A2A2A, #1A1A1A);
          position: relative;
        }

        .modal-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #F3BA2F, #ffd700);
        }

        .modal-title {
          font-size: 20px;
          font-weight: bold;
          color: #F3BA2F;
          margin: 0;
        }

        .modal-close-btn {
          position: absolute;
          top: 20px;
          right: 25px;
          background: none;
          border: none;
          color: #AAAAAA;
          font-size: 24px;
          cursor: pointer;
          transition: color 0.2s;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }

        .modal-close-btn:hover {
          color: #F3BA2F;
          background-color: rgba(243, 186, 47, 0.1);
        }

        .modal-body {
          padding: 0;
          max-height: 60vh;
          overflow-y: auto;
        }

        .members-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .member-item {
          padding: 15px 25px;
          border-bottom: 1px solid #3A3A3A;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background-color 0.2s;
        }

        .member-item:hover {
          background-color: rgba(255, 255, 255, 0.05);
        }

        .member-item:last-child {
          border-bottom: none;
        }

        .member-info {
          flex: 1;
        }

        .member-email {
          color: #FFFFFF;
          font-weight: 500;
          margin-bottom: 5px;
          font-size: 14px;
        }

        .member-date {
          color: #AAAAAA;
          font-size: 12px;
        }

        .member-status {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-approved {
          background: linear-gradient(90deg, #00C076, #00ff95);
          color: #000000;
        }

        .status-pending {
          background: linear-gradient(90deg, #F3BA2F, #ffd700);
          color: #000000;
        }

        .empty-state {
          padding: 40px 25px;
          text-align: center;
          color: #AAAAAA;
        }

        .empty-state i {
          font-size: 48px;
          margin-bottom: 15px;
          color: #3A3A3A;
        }

        .empty-state p {
          margin: 0;
          font-size: 14px;
        }

        /* Scrollbar Styling */
        .modal-body::-webkit-scrollbar {
          width: 6px;
        }

        .modal-body::-webkit-scrollbar-track {
          background: #1A1A1A;
        }

        .modal-body::-webkit-scrollbar-thumb {
          background: #F3BA2F;
          border-radius: 3px;
        }

        .modal-body::-webkit-scrollbar-thumb:hover {
          background: #ffd700;
        }

        @media (max-width: 480px) {
          .modal-content {
            margin: 10px;
            max-height: 85vh;
          }
          
          .modal-header {
            padding: 15px 20px;
          }
          
          .modal-title {
            font-size: 18px;
          }
          
          .member-item {
            padding: 12px 20px;
          }
        }
      `}</style>
    </div>
  );
}

export default Invitation;