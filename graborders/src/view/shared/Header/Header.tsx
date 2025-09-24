import React from "react";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div className="app-header">
      <div className="header-content">
        <div className="header-left">
          <div className="logo-section">
            <img src="/icons/nexus.png" alt="" style={{ height: 35 }} />
          </div>
        </div>

        <div className="header-right">
          {/* Notification Bell with Badge */}
          <Link to="/notification">
            <div className="notification-containers">
              <button className="notification-btn" aria-label="Notifications">
                <i className="fas fa-bell"></i>
                <span className="notification-badge">2</span>
              </button>
            </div>
          </Link>

          {/* Profile Icon */}
          <Link to="/profile" className="profile-btn" aria-label="Profile">
            <div className="profile-avatars">
              <i className="fas fa-user"></i>
            </div>
          </Link>
        </div>
      </div>

      <style>{`
      
 
          .app-header {
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            padding: 10px 0;
            border-bottom: 1px solid #333;
            margin : auto;
            max-width:400px;
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
          
          .logo-icon {
            font-size: 24px;
            color: #F3BA2F;
          }
          
          .logo-text {
            font-size: 20px;
            font-weight: bold;
            color: #F3BA2F;
            background: linear-gradient(45deg, #F3BA2F, #FFD700);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
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
          
          /* Notifications Dropdown */
          .notifications-dropdown {
            position: absolute;
            top: 50px;
            right: 0;
            width: 320px;
            background: #1a1a1a;
            border: 1px solid #333;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            z-index: 1000;
            animation: slideDown 0.3s ease;
          }
          
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .notifications-header {
            padding: 15px;
            border-bottom: 1px solid #333;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          
          .notifications-header h3 {
            margin: 0;
            color: #F3BA2F;
            font-size: 16px;
          }
          
          .notifications-count {
            background: #F3BA2F;
            color: #000;
            padding: 2px 8px;
            border-radius: 10px;
            font-size: 12px;
            font-weight: bold;
          }
          
          .notifications-list {
            max-height: 300px;
            overflow-y: auto;
          }
          
          .notification-item {
            padding: 12px 15px;
            border-bottom: 1px solid #222;
            display: flex;
            gap: 10px;
            transition: background 0.3s ease;
          }
          
          .notification-item:hover {
            background: #222;
          }
          
          .notification-item.unread {
            background: rgba(243, 186, 47, 0.1);
          }
          
          .notification-icon {
            color: #F3BA2F;
            font-size: 14px;
            margin-top: 2px;
          }
          
          .notification-content {
            flex: 1;
          }
          
          .notification-title {
            font-weight: bold;
            color: #fff;
            margin-bottom: 4px;
          }
          
          .notification-message {
            color: #ccc;
            font-size: 13px;
            margin-bottom: 4px;
          }
          
          .notification-time {
            color: #888;
            font-size: 11px;
          }
          
          .notifications-footer {
            padding: 10px 15px;
            text-align: center;
            border-top: 1px solid #333;
          }
          
          .view-all-link {
            color: #F3BA2F;
            text-decoration: none;
            font-size: 13px;
            font-weight: bold;
          }
          
          .view-all-link:hover {
            text-decoration: underline;
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
          `}</style>
    </div>
  );
}

export default Header;
