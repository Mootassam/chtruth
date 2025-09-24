import{j as i,L as t}from"./index-17631913.js";function e(){return i.jsxs("div",{className:"app-header",children:[i.jsxs("div",{className:"header-content",children:[i.jsx("div",{className:"header-left",children:i.jsx("div",{className:"logo-section",children:i.jsx("img",{src:"/icons/nexus.png",alt:"",style:{height:35}})})}),i.jsxs("div",{className:"header-right",children:[i.jsx(t,{to:"/notification",children:i.jsx("div",{className:"notification-containers",children:i.jsxs("button",{className:"notification-btn","aria-label":"Notifications",children:[i.jsx("i",{className:"fas fa-bell"}),i.jsx("span",{className:"notification-badge",children:"2"})]})})}),i.jsx(t,{to:"/profile",className:"profile-btn","aria-label":"Profile",children:i.jsx("div",{className:"profile-avatars",children:i.jsx("i",{className:"fas fa-user"})})})]})]}),i.jsx("style",{children:`
      
 
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
          `})]})}export{e as H};
