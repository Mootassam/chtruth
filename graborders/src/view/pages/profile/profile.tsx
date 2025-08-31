import React from "react";
import SubHeader from "src/view/shared/Header/SubHeader";
import { Link } from "react-router-dom";
import authActions from "src/modules/auth/authActions";
import { useDispatch, useSelector } from "react-redux";
import authSelectors from "src/modules/auth/authSelectors";
function profile() {
  const dispatch = useDispatch();
  const currentUser = useSelector(authSelectors.selectCurrentUser);

  const doSignout = () => {
    dispatch(authActions.doSignout());
  };
  const list = [
    {
      icon: "fas fa-globe",
      path: "/language",
      name: "Language",
    },
    {
      icon: "fas fa-wallet",
      path: "/withdrawaddress",
      name: "Withdrawal Address",
    },
    {
      icon: "fas fa-lock",
      path: "/passwordtype",
      name: "Password",
    },
    {
      icon: "fas fa-bell",
      path: "/notification",
      name: "Notifications",
    },
    {
      icon: "fas fa-gift",
      path: "/invitation",
      name: "My Invitation",
    },
    {
      icon: "fas fa-info-circle",
      path: "/about",
      name: "About Us",
    },
    {
      icon: "fas fa-file-certificate",
      path: "/approval",
      name: "MSB Approval",
    },
  ];

  return (
    <div className="profile_container">
      {/* Header Section */}
      <SubHeader title="Profile" />
      <div className="container-profile">
        {/* Profile Header */}
        <div className="profile-profile-header">
          <div className="profile-profile-avatar">
            <i className="fas fa-user" />
          </div>
          <div className="profile-profile-info">
            <div className="profile-profile-name">Raya Business</div>
            <div className="profile-profile-status">VERIFIED</div>
          </div>
        </div>
        {/* Account Info Section */}
        <div className="profile-info-section">
          <div className="profile-section-title">ACCOUNT INFO</div>
          <div className="profile-info-item">
            <div className="profile-info-label">Email</div>
            <div className="profile-info-value">{currentUser.email}</div>
          </div>
          <div className="profile-info-item">
            <div className="profile-info-label">Credit Score</div>
            <div className="profile-info-value">{currentUser.score}</div>
          </div>
          <div className="profile-info-item">
            <div className="profile-info-label">Invitation Code</div>
            <div className="profile-info-value">
              <span className="profile-invite-code">{currentUser.invitationcode}</span>
            </div>
          </div>
        </div>
        {/* Verifications Section */}
        <div className="profile-info-section">
          <div className="profile-section-title">VERIFICATIONS APPROVED</div>
          <div className="profile-verification-badge">
            <div className="profile-badge-icon">
              <i className="fas fa-id-card" />
            </div>
            <div className="profile-badge-info">
              <div className="profile-badge-title">Identity Verification</div>
              <div className="profile-badge-desc">Completed</div>
            </div>
          </div>
          <div className="profile-verification-badge">
            <div className="profile-badge-icon">
              <i className="fas fa-shield-alt" />
            </div>
            <div className="profile-badge-info">
              <div className="profile-badge-title">Address Verification</div>
              <div className="profile-badge-desc">Completed</div>
            </div>
          </div>
        </div>
        {/* Settings Section */}
        <div className="profile-info-section">
          <div className="profile-section-title">Settings</div>
          <ul className="profile-settings-list">
            {list.map((item) => (
              <Link to={item.path} className="remove_blue">
                <li className="profile-settings-item">
                  <div className="profile-settings-info">
                    <div className="profile-settings-icon">
                      <i className={item.icon} />
                    </div>
                    <div className="profile-settings-name">{item.name}</div>
                  </div>
                  <div className="profile-settings-arrow">
                    <i className="fas fa-chevron-right" />
                  </div>
                </li>
              </Link>
            ))}
            <li className="profile-settings-item" onClick={() => doSignout()}>
              <div className="profile-settings-info">
                <div className="profile-settings-icon">
                  <i className="fas fa-sign-out-alt" />
                </div>
                <div className="profile-settings-name">logout</div>
              </div>
              <div className="profile-settings-arrow">
                <i className="fas fa-chevron-right" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default profile;
