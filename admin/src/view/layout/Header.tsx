import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import authActions from 'src/modules/auth/authActions';
import authSelectors from 'src/modules/auth/authSelectors';
import layoutActions from 'src/modules/layout/layoutActions';
import { getHistory } from 'src/modules/store';
import I18nSelect from 'src/view/layout/I18nSelect';
import HeaderWrapper from 'src/view/layout/styles/HeaderWrapper';
import Avatar from 'src/view/shared/Avatar';
import config from 'src/config';
import useNotifications from 'src/view/shared/notificatoin/useNotifications';

function Header(props) {
  const dispatch = useDispatch();
  const currentUser = useSelector(authSelectors.selectCurrentUser);

  // Listen to notifications via Socket.IO
  const { notifications } = useNotifications(currentUser.id, true);

  // State for counts
  const [kycCount, setKycCount] = React.useState(0);
  const [rechargeCount, setRechargeCount] = React.useState(0);
  const [withdrawCount, setWithdrawCount] = React.useState(0);
  const [futuresCount, setFuturesCount] = React.useState(0);

  // Update counts when notifications change
  React.useEffect(() => {
    notifications.forEach((notif) => {
      switch (notif.type) {
        case "kyc":
          setKycCount((prev) => prev + 1);
          break;
        case "deposit":
          setRechargeCount((prev) => prev + 1);
          break;
        case "withdraw":
          setWithdrawCount((prev) => prev + 1);
          break;
        case "futures":
          setFuturesCount((prev) => prev + 1);
          break;
        default:
          break;
      }
    });
  }, [notifications]);

  // Reset count when user clicks on section
  const handleClickSection = (type: string) => {
    switch (type) {
      case "kyc":
        setKycCount(0);
        break;
      case "deposit":
        setRechargeCount(0);
        break;
      case "withdraw":
        setWithdrawCount(0);
        break;
      case "futures":
        setFuturesCount(0);
        break;
      default:
        break;
    }
  };

  const doToggleMenu = () => {
    dispatch(layoutActions.doToggleMenu());
  };

  const userText = useSelector(authSelectors.selectCurrentUserNameOrEmailPrefix);
  const userAvatar = useSelector(authSelectors.selectCurrentUserAvatar);
  const currentTenant = useSelector(authSelectors.selectCurrentTenant);

  const doSignout = () => {
    dispatch(authActions.doSignout());
  };

  const doNavigateToProfile = () => getHistory().push('/profile');
  const doNavigateToAuditLog = () => getHistory().push('/audit-logs');
  const doNavigateToSettings = () => getHistory().push('/settings');
  const doNavigateToPasswordChange = () => getHistory().push('/password-change');
  const doNavigateToTenants = () => getHistory().push('/tenant');

  return (
    <HeaderWrapper className="navbar sticky-top navbar-light bg-white border-bottom">
      <button type="button" onClick={doToggleMenu} className="menu-toggle-button">
        <i className="fas fa-bars" />
      </button>

      <div className="right__section">
        <div className="quick_actions">
          <div className="action" onClick={() => handleClickSection("kyc")}>
            <span>KYC({kycCount})</span>
          </div>
          <div className="action" onClick={() => handleClickSection("deposit")}>
            <span>Recharges({rechargeCount})</span>
          </div>
          <div className="action" onClick={() => handleClickSection("withdraw")}>
            <span>Withdraw Funds({withdrawCount})</span>
          </div>
          <div className="action" onClick={() => handleClickSection("futures")}>
            <span>Futures({futuresCount})</span>
          </div>
        </div>

        <span className="i18n-select">
          <I18nSelect />
        </span>

        <div className="dropdown">
          <span className="user-dropdown" data-toggle="dropdown">
            <div className="user-dropdown-content">
              <span className="user-dropdown-avatar">
                <Avatar size="small" src={userAvatar || undefined} alt="avatar" />
              </span>
              <span className="user-dropdown-text">
                <span>{userText}</span>
                {['multi', 'multi-with-subdomain'].includes(config.tenantMode) && (
                  <span className="user-dropdown-text-tenant">{currentTenant && currentTenant.name}</span>
                )}
              </span>
            </div>
          </span>
          <div className="dropdown-menu dropdown-menu-right">
            <button onClick={doNavigateToProfile} className="dropdown-item" type="button">
              <i className="fas fa-user" /> {i18n('auth.profile.title')}
            </button>
            <button onClick={doNavigateToPasswordChange} className="dropdown-item" type="button">
              <i className="fas fa-lock" /> {i18n('auth.passwordChange.title')}
            </button>
            {['multi', 'multi-with-subdomain'].includes(config.tenantMode) && (
              <button onClick={doNavigateToTenants} className="dropdown-item" type="button">
                <i className="fas fa-th-large" /> {i18n('auth.tenants')}
              </button>
            )}
            <button onClick={doNavigateToAuditLog} className="dropdown-item" type="button">
              <i className="fas fa-book" /> {i18n('auditLog.menu')}
            </button>
            <button onClick={doSignout} className="dropdown-item" type="button">
              <i className="fas fa-sign-out-alt" /> {i18n('auth.signout')}
            </button>
          </div>
        </div>
      </div>
    </HeaderWrapper>
  );
}

export default Header;
