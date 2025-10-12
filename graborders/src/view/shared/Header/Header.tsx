import React, { useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useNotifications from "../notifications/useNotifications";
import notificationListSelectors from "src/modules/notification/list/notificationListSelectors";
import authSelectors from "src/modules/auth/authSelectors";

// Extracted CSS to separate constant to prevent re-creation on every render
const HEADER_STYLES = `
  .app-header {
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
    padding: 10px 0;
    border-bottom: 1px solid #333;
    margin: auto;
    max-width: 400px;
    margin-bottom: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  }
  
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
  }
  
  .header-left {
    display: flex;
    align-items: center;
  }
  
  .logo-section {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .header-right {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  
  /* Notification Styles */
  .notification-containers {
    position: relative;
  }
  
  .notification-btn {
    position: relative;
    background: #333;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #F3BA2F;
  }
  
  .notification-btn:hover {
    background: #444;
    transform: scale(1.1);
  }
  
  .notification-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background: #FF4444;
    color: white;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    font-size: 10px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
  
  /* Profile Button */
  .profile-btn {
    display: flex;
    align-items: center;
    text-decoration: none;
  }
  
  .profile-avatars {
    width: 40px;
    height: 40px;
    background: #333;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #F3BA2F;
    transition: all 0.3s ease;
  }
  
  .profile-avatars:hover {
    background: #444;
    transform: scale(1.1);
  }
`;

function Header() {
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const count = useSelector(notificationListSelectors.selectCount);
  
  // Memoize the user ID check to prevent unnecessary re-renders
  const userId = useMemo(() => 
    currentUser?.id || null, 
    [currentUser?.id]
  );

  // Only call useNotifications if we have a valid user ID
  const notifications = useNotifications(userId);

  // Memoize the notification badge to prevent unnecessary re-renders
  const notificationBadge = useMemo(() => {
    if (count <= 0) return null;
    
    return (
      <span className="notification-badge">
        {count > 99 ? '99+' : count}
      </span>
    );
  }, [count]);

  // Memoize the logo section
  const logoSection = useMemo(() => (
    <div className="logo-section">
      <img 
        src="/icons/nexus.png" 
        alt="App Logo" 
        style={{ height: 35 }}
        loading="lazy" // Improve loading performance
      />
    </div>
  ), []);

  // Memoize notification button
  const notificationButton = useMemo(() => (
    <Link to="/notification" aria-label="Notifications">
      <div className="notification-containers">
        <button className="notification-btn" type="button">
          <i className="fas fa-bell"></i>
          {notificationBadge}
        </button>
      </div>
    </Link>
  ), [notificationBadge]);

  // Memoize profile button
  const profileButton = useMemo(() => (
    <Link to="/profile" className="profile-btn" aria-label="Profile">
      <div className="profile-avatars">
        <i className="fas fa-user"></i>
      </div>
    </Link>
  ), []);

  return (
    <div className="app-header">
      <div className="header-content">
        <div className="header-left">
          {logoSection}
        </div>

        <div className="header-right">
          {notificationButton}
          {profileButton}
        </div>
      </div>

      <style>{HEADER_STYLES}</style>
    </div>
  );
}

// React.memo to prevent unnecessary re-renders if props don't change
export default React.memo(Header);