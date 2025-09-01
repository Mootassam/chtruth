import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SubHeader from "src/view/shared/Header/SubHeader";
import authActions from "src/modules/auth/authActions";
import authSelectors from "src/modules/auth/authSelectors";

function Profile() {
  const dispatch = useDispatch();
  const currentUser = useSelector(authSelectors.selectCurrentUser);

  const handleSignout = () => {
    dispatch(authActions.doSignout());
  };

  const menuItems = useMemo(() => {
    const baseItems = [
      {
        icon: "fas fa-globe",
        path: "/language",
        name: "Language",
        requiresKyc: false,
      },
      {
        icon: "fas fa-wallet",
        path: "/withdrawaddress",
        name: "Withdrawal Address",
        requiresKyc: true,
      },
      {
        icon: "fas fa-lock",
        path: "/passwordtype",
        name: "Password",
        requiresKyc: false,
      },
      {
        icon: "fas fa-bell",
        path: "/notification",
        name: "Notifications",
        requiresKyc: false,
      },
      {
        icon: "fas fa-gift",
        path: "/invitation",
        name: "My Invitation",
        requiresKyc: true,
      },
      {
        icon: "fas fa-info-circle",
        path: "/about",
        name: "About Us",
        requiresKyc: false,
      },
      {
        icon: "fas fa-file-certificate",
        path: "/approval",
        name: "MSB Approval",
        requiresKyc: false,
      },
    ];

    return baseItems.map(item => ({
      ...item,
      disabled: item.requiresKyc && !currentUser?.kyc,
    }));
  }, [currentUser?.kyc]);

  const renderMenuItem = (item: typeof menuItems[0]) => {
    if (item.disabled) {
      return (
        <li className="profile-settings-item disabled" key={item.name+'1'}>
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
      );
    }

    return (
      <Link to={item.path} className="remove_blue" key={item.name}>
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
    );
  };

  return (
    <div className="profile_container">
      <SubHeader title="Profile" />
      
      <div className="container-profile">
        {!currentUser?.kyc && (
          <div className="verification-alert">
            <div className="alert-icon">
              <i className="fas fa-exclamation-triangle" />
            </div>
            <div className="alert-title">Account Not Verified</div>
            <div className="alert-desc">
              Verify your account to unlock all features and higher limits
            </div>
            <Link to="/proof" className="remove_blue">
              <button className="verify-now-button">Verify Now</button>
            </Link>
          </div>
        )}

        <div className="profile-profile-header">
          <div className="profile-profile-avatar">
            <i className="fas fa-user" />
          </div>
          <div className="profile-profile-info">
            <div className="profile-profile-name">{currentUser?.fullName}</div>
            <div className={currentUser?.kyc ? "profile-profile-status" : "profile-not-status"}>
              {currentUser?.kyc ? "VERIFIED" : "UNVERIFIED"}
            </div>
          </div>
        </div>

        <div className="profile-info-section">
          <div className="profile-section-title">ACCOUNT INFO</div>
          <div className="profile-info-item">
            <div className="profile-info-label">Email</div>
            <div className="profile-info-value">{currentUser?.email}</div>
          </div>
          <div className="profile-info-item">
            <div className="profile-info-label">Credit Score</div>
            <div className="profile-info-value">{currentUser?.score}</div>
          </div>
          <div className="profile-info-item">
            <div className="profile-info-label">Invitation Code </div>
            <div className="profile-info-value">
              <span className="profile-invite-code">
                {currentUser?.kyc ?
                currentUser?.invitationcode : "******"}
              </span>
            </div>
          </div>
        </div>

        {currentUser?.kyc ? (
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
        ) : (
          <div className="limitations-section">
            <div className="limitations-title">Account Limitations</div>
            <ul className="limitations-list">
              {[
                "Withdrawal limit: $1,000 per day",
                "Staking options limited",
                "Advanced trading features disabled",
                "Fiat currency deposits not available",
              ].map((text, index) => (
                <li className="limitation-item" key={index}>
                  <div className="limitation-icon">
                    <i className="fas fa-ban" />
                  </div>
                  <div className="limitation-text">{text}</div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="profile-info-section">
          <div className="profile-section-title">Settings</div>
          <ul className="profile-settings-list">
            {menuItems.map(renderMenuItem)}
            <li className="profile-settings-item" onClick={handleSignout} >
              <div className="profile-settings-info">
                <div className="profile-settings-icon">
                  <i className="fas fa-sign-out-alt" />
                </div>
                <div className="profile-settings-name">Logout</div>
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

export default Profile;