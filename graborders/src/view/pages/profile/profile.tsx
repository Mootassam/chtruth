import React, { useMemo, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SubHeader from "src/view/shared/Header/SubHeader";
import authActions from "src/modules/auth/authActions";
import authSelectors from "src/modules/auth/authSelectors";
import kycSelectors from "src/modules/kyc/list/kycListSelectors";
import actions from "src/modules/kyc/list/kycListActions";
// Constants for menu items (moved outside component to prevent recreation)
const MENU_ITEMS = [

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
    path: "/terms-of-use",
    icon: "fas fa-file-contract",
    name: "Terms of Use",
  },
  {
    path: "/privacy-portal",
    icon: "fas fa-user-shield",
    name: "Privacy Portal",
  },
  {
    icon: "fas fa-info-circle",
    path: "/about",
    name: "About Us",
    requiresKyc: false,
  },
  {
    icon: "fas fa-file-contract",
    path: "/approval",
    name: "MSB Approval",
    requiresKyc: false,
  },
];

// Status constants for better maintainability
const VERIFICATION_STATUS = {
  PENDING: "pending",
  SUCCESS: "success",
  UNVERIFIED: "unverified",
};

function Profile() {
  const dispatch = useDispatch();
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const selectRows = useSelector(kycSelectors.selectRows);
  const loading = useSelector(kycSelectors.selectLoading);

  const kycStatus = useMemo(() => {
    if (selectRows[0]?.status === VERIFICATION_STATUS.PENDING) {
      return VERIFICATION_STATUS.PENDING;
    }
    return currentUser?.kyc
      ? VERIFICATION_STATUS.SUCCESS
      : VERIFICATION_STATUS.UNVERIFIED;
  }, [selectRows, currentUser?.kyc]);

  // Memoized user data to prevent unnecessary re-renders
  const userData = useMemo(() => ({ user: currentUser }), [currentUser]);

  useEffect(() => {
    dispatch(actions.doFetch(userData, userData));
  }, [dispatch, userData]);

  const handleSignout = useCallback(() => {
    dispatch(authActions.doSignout());
  }, [dispatch]);

  const menuItems = useMemo(
    () =>
      MENU_ITEMS.map((item) => ({
        ...item,
        disabled: item.requiresKyc && !currentUser?.kyc,
      })),
    [currentUser?.kyc]
  );

  // Memoized render function for menu items
  const renderMenuItem = useCallback((item) => {
    const menuItemContent = (
      <li
        className={`profile-settings-item ${item.disabled ? "disabled" : ""}`}
      >
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

    return item.disabled ? (
      <div key={item.name}>{menuItemContent}</div>
    ) : (
      <Link to={item.path} className="remove_blue" key={item.name}>
        {menuItemContent}
      </Link>
    );
  }, []);

  // Loading state

  return (
    <div className="profile_container">
      <SubHeader title="Profile" />

      <div className="container-profile">
        {/* Verification Status Section */}
        {kycStatus === VERIFICATION_STATUS.PENDING ? (
          <VerificationPending />
        ) : kycStatus === VERIFICATION_STATUS.UNVERIFIED ? (
          <VerificationAlert />
        ) : null}

        {/* Profile Header */}
        <ProfileHeader currentUser={currentUser} kycStatus={kycStatus} />

        {/* Account Info */}
        <AccountInfo currentUser={currentUser} />

        {/* Verification Details */}
        {kycStatus === VERIFICATION_STATUS.PENDING ? (
          <PendingVerifications />
        ) : kycStatus === VERIFICATION_STATUS.SUCCESS ? (
          <ApprovedVerifications />
        ) : (
          <AccountLimitations />
        )}

        {/* Settings Menu */}
        <div className="profile-info-section">
          <div className="profile-section-title">Settings</div>
          <ul className="profile-settings-list">
            {menuItems.map(renderMenuItem)}
            <li className="profile-settings-item" onClick={handleSignout}>
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

// Extracted components for better readability and reusability
const VerificationPending = () => (
  <div className="verification-status">
    <div className="status-icon">
      <i className="fas fa-clock"></i>
    </div>
    <div className="status-title">Verification Pending</div>
    <div className="status-desc">
      Your account verification is in progress. This usually takes 1-3 business
      days.
    </div>
  </div>
);

const VerificationAlert = () => (
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
);

const ProfileHeader = ({ currentUser, kycStatus }) => (
  <div className="profile-profile-header">
    <div className="profile-profile-avatar">
      <i className="fas fa-user" />
    </div>
    <div className="profile-profile-info">
      <div className="profile-profile-name">{currentUser?.fullName}</div>
      <div
        className={
          kycStatus === VERIFICATION_STATUS.SUCCESS
            ? "profile-profile-status"
            : "profile-not-status"
        }
      >
        {kycStatus === VERIFICATION_STATUS.SUCCESS ? "VERIFIED" : "UNVERIFIED"}
      </div>
    </div>
  </div>
);

const AccountInfo = ({ currentUser }) => (
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
      <div className="profile-info-label">Invitation Code</div>
      <div className="profile-info-value">
        <span className="profile-invite-code">
          {currentUser?.kyc ? currentUser?.refcode : "******"}
        </span>
      </div>
    </div>
  </div>
);

const PendingVerifications = () => (
  <div className="info-section">
    <div className="profile-section-title">PENDING VERIFICATIONS</div>

    <div className="verification-item">
      <div className="verification-icon">
        <i className="fas fa-id-card"></i>
      </div>
      <div className="verification-info">
        <div className="verification-name">Identity Verification</div>
        <div className="verification-desc">Submit your government ID</div>
      </div>
      <div className="verification-status-badge">Pending</div>
    </div>

    <div className="verification-item">
      <div className="verification-icon">
        <i className="fas fa-home"></i>
      </div>
      <div className="verification-info">
        <div className="verification-name">Address Verification</div>
        <div className="verification-desc">Verify your residence</div>
      </div>
      <div className="verification-status-badge">Pending</div>
    </div>
  </div>
);

const ApprovedVerifications = () => (
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
);

const AccountLimitations = () => (
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
);

export default Profile;
