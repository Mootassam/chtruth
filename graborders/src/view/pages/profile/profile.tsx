import React, { useMemo, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SubHeader from "src/view/shared/Header/SubHeader";
import authActions from "src/modules/auth/authActions";
import authSelectors from "src/modules/auth/authSelectors";
import kycSelectors from "src/modules/kyc/list/kycListSelectors";
import actions from "src/modules/kyc/list/kycListActions";
import { i18n } from "../../../i18n";

// Constants for menu items
const MENU_ITEMS = [
  {
    icon: "fas fa-wallet",
    path: "/withdrawaddress",
    name: i18n("pages.profile.menu.withdrawalAddress"),
    requiresKyc: true,
  },
  {
    icon: "fas fa-lock",
    path: "/passwordtype",
    name: i18n("pages.profile.menu.password"),
    requiresKyc: false,
  },
  {
    icon: "fas fa-bell",
    path: "/notification",
    name: i18n("pages.profile.menu.notifications"),
    requiresKyc: false,
  },
  {
    icon: "fas fa-gift",
    path: "/invitation",
    name: i18n("pages.profile.menu.myInvitation"),
    requiresKyc: true,
  },
  {
    icon: "fas fa-language",
    path: "/language",
    name: i18n("pages.profile.menu.language"),
    requiresKyc: false,
  },
  {
    path: "/terms-of-use",
    icon: "fas fa-file-contract",
    name: i18n("pages.profile.menu.termsOfUse"),
  },
  {
    path: "/privacy-portal",
    icon: "fas fa-user-shield",
    name: i18n("pages.profile.menu.privacyPortal"),
  },
  {
    icon: "fas fa-info-circle",
    path: "/about",
    name: i18n("pages.profile.menu.aboutUs"),
    requiresKyc: false,
  },
  {
    icon: "fas fa-file-contract",
    path: "/approval",
    name: i18n("pages.profile.menu.msbApproval"),
    requiresKyc: false,
  },
  {
    icon: "fas fa-headset",
    path: "/LiveChat",
    name: i18n("pages.profile.menu.customerSupport"),
    requiresKyc: false,
  },
  {
    icon: "fab fa-google-play",
    path: "/playstore",
    name: i18n("pages.profile.menu.downloadApp"),
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

  return (
    <div className="profile_container">
      <SubHeader title={i18n("pages.profile.title")} />

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
          <div className="profile-section-title">{i18n("pages.profile.settings")}</div>
          <ul className="profile-settings-list">
            {menuItems.map(renderMenuItem)}
            <li className="profile-settings-item" onClick={handleSignout}>
              <div className="profile-settings-info">
                <div className="profile-settings-icon">
                  <i className="fas fa-sign-out-alt" />
                </div>
                <div className="profile-settings-name">{i18n("pages.profile.menu.logout")}</div>
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
    <div className="status-title">{i18n("pages.profile.verification.pending.title")}</div>
    <div className="status-desc">
      {i18n("pages.profile.verification.pending.description")}
    </div>
  </div>
);

const VerificationAlert = () => (
  <div className="verification-alert">
    <div className="alert-icon">
      <i className="fas fa-exclamation-triangle" />
    </div>
    <div className="alert-title">{i18n("pages.profile.verification.alert.title")}</div>
    <div className="alert-desc">
      {i18n("pages.profile.verification.alert.description")}
    </div>
    <Link to="/proof" className="remove_blue">
      <button className="verify-now-button">{i18n("pages.profile.verification.alert.verifyNow")}</button>
    </Link>
  </div>
);

const ProfileHeader = ({ currentUser, kycStatus }) => (
  <div className="profile-profile-header">
    <div className="profile-profile-avatar">
      <i className="fas fa-user" />
    </div>
    <div className="profile-profile-info">
      <div className="profile-profile-name">{currentUser?.email?.split('@')[0]}</div>
      <div
        className={
          kycStatus === VERIFICATION_STATUS.SUCCESS
            ? "profile-profile-status"
            : "profile-not-status"
        }
      >
        {kycStatus === VERIFICATION_STATUS.SUCCESS 
          ? i18n("pages.profile.status.verified") 
          : i18n("pages.profile.status.unverified")}
      </div>
    </div>
  </div>
);

const AccountInfo = ({ currentUser }) => (
  <div className="profile-info-section">
    <div className="profile-section-title">{i18n("pages.profile.accountInfo.title")}</div>
    <div className="profile-info-item">
      <div className="profile-info-label">{i18n("pages.profile.accountInfo.email")}</div>
      <div className="profile-info-value">{currentUser?.email}</div>
    </div>
    <div className="profile-info-item">
      <div className="profile-info-label">{i18n("pages.profile.accountInfo.creditScore")}</div>
      <div className="profile-info-value">{currentUser?.score}</div>
    </div>
    <div className="profile-info-item">
      <div className="profile-info-label">{i18n("pages.profile.accountInfo.invitationCode")}</div>
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
    <div className="profile-section-title">{i18n("pages.profile.pendingVerifications.title")}</div>

    <div className="verification-item">
      <div className="verification-icon">
        <i className="fas fa-id-card"></i>
      </div>
      <div className="verification-info">
        <div className="verification-name">{i18n("pages.profile.pendingVerifications.identity.title")}</div>
        <div className="verification-desc">{i18n("pages.profile.pendingVerifications.identity.description")}</div>
      </div>
      <div className="verification-status-badge">{i18n("pages.profile.pendingVerifications.status.pending")}</div>
    </div>

    <div className="verification-item">
      <div className="verification-icon">
        <i className="fas fa-home"></i>
      </div>
      <div className="verification-info">
        <div className="verification-name">{i18n("pages.profile.pendingVerifications.address.title")}</div>
        <div className="verification-desc">{i18n("pages.profile.pendingVerifications.address.description")}</div>
      </div>
      <div className="verification-status-badge">{i18n("pages.profile.pendingVerifications.status.pending")}</div>
    </div>
  </div>
);

const ApprovedVerifications = () => (
  <div className="profile-info-section">
    <div className="profile-section-title">{i18n("pages.profile.approvedVerifications.title")}</div>
    <div className="profile-verification-badge">
      <div className="profile-badge-icon">
        <i className="fas fa-id-card" />
      </div>
      <div className="profile-badge-info">
        <div className="profile-badge-title">{i18n("pages.profile.approvedVerifications.identity.title")}</div>
        <div className="profile-badge-desc">{i18n("pages.profile.approvedVerifications.status.completed")}</div>
      </div>
    </div>
    <div className="profile-verification-badge">
      <div className="profile-badge-icon">
        <i className="fas fa-shield-alt" />
      </div>
      <div className="profile-badge-info">
        <div className="profile-badge-title">{i18n("pages.profile.approvedVerifications.address.title")}</div>
        <div className="profile-badge-desc">{i18n("pages.profile.approvedVerifications.status.completed")}</div>
      </div>
    </div>
  </div>
);

const AccountLimitations = () => (
  <div className="limitations-section">
    <div className="limitations-title">{i18n("pages.profile.limitations.title")}</div>
    <ul className="limitations-list">
      {[
        i18n("pages.profile.limitations.withdrawalLimit"),
        i18n("pages.profile.limitations.stakingLimited"),
        i18n("pages.profile.limitations.advancedTrading"),
        i18n("pages.profile.limitations.fiatDeposits"),
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