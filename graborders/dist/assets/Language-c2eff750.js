import{an as t,j as a,p as g,ao as l,ap as o}from"./index-4cd6ea8b.js";const r="LAYOUT",i={MENU_TOGGLE:`${r}_MENU_TOGGLE`,MENU_HIDE:`${r}_MENU_HIDE`,MENU_SHOW:`${r}_MENU_SHOW`,MENU_SUBMENU:`${r}_SUBMENU_SHOW`,doChangeLanguage:n=>{t(n),window.location.reload()},doToggleMenu:()=>({type:i.MENU_TOGGLE}),doShowMenu:()=>({type:i.MENU_SHOW}),doHideMenu:()=>({type:i.MENU_HIDE}),dosubMenu:n=>({type:i.MENU_SUBMENU,payload:n})};function d(){const n=e=>{i.doChangeLanguage(e)};return a.jsxs("div",{className:"i18n-container",children:[a.jsxs("div",{className:"language-header",children:[a.jsx("i",{className:"fas fa-language"}),a.jsx("h2",{children:g("pages.language.selectLanguage")}),a.jsx("p",{children:g("pages.language.choosePreferred")})]}),a.jsx("div",{className:"languages-grid",children:l().map(e=>a.jsxs("div",{onClick:()=>n(e.id),className:`language-card ${o()===e.id?"active":""}`,children:[a.jsx("div",{className:"language-flag",children:a.jsx("img",{src:e.flag,alt:e.label})}),a.jsxs("div",{className:"language-info",children:[a.jsx("span",{className:"language-name",children:e.label}),a.jsx("span",{className:"language-native",children:e.nativeName||e.label})]}),o()===e.id&&a.jsx("div",{className:"selected-indicator",children:a.jsx("i",{className:"fas fa-check"})})]},e.id))}),a.jsx("style",{children:`
        .i18n-container {
          max-width: 440px;
          margin: 0 auto;
          padding: 20px;
          background: #000000;
          min-height: 100vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #FFFFFF;
          margin-bottom:50px;
        }

        .language-header {
          text-align: center;
          margin-bottom: 30px;
          padding: 20px 0;
        }

        .language-header i {
          font-size: 48px;
          color: #F3BA2F;
          margin-bottom: 15px;
          display: block;
        }

        .language-header h2 {
          font-size: 24px;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0 0 8px 0;
        }

        .language-header p {
          font-size: 14px;
          color: #AAAAAA;
          margin: 0;
        }

        .languages-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .language-card {
          display: flex;
          align-items: center;
          padding: 16px 20px;
          background: #1A1A1A;
          border: 2px solid #2A2A2A;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .language-card:hover {
          transform: translateY(-2px);
          border-color: #F3BA2F;
          box-shadow: 0 8px 25px rgba(243, 186, 47, 0.15);
        }

        .language-card.active {
          background: linear-gradient(135deg, #F3BA2F 0%, #e0a91a 100%);
          border-color: #F3BA2F;
          color: #000000;
        }

        .language-card.active::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #FF6838, #F3BA2F);
        }

        .language-flag {
          width: 44px;
          height: 44px;
          border-radius: 8px;
          overflow: hidden;
          margin-right: 16px;
          border: 2px solid #2A2A2A;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          flex-shrink: 0;
        }

        .language-card.active .language-flag {
          border-color: rgba(0, 0, 0, 0.3);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        }

        .language-flag img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .language-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .language-name {
          font-size: 16px;
          font-weight: 600;
          color: #FFFFFF;
        }

        .language-native {
          font-size: 13px;
          color: #AAAAAA;
          font-weight: 500;
        }

        .language-card.active .language-name,
        .language-card.active .language-native {
          color: #000000;
        }

        .selected-indicator {
          width: 24px;
          height: 24px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 12px;
          flex-shrink: 0;
        }

        .selected-indicator i {
          font-size: 12px;
          color: #000000;
        }

        /* Loading animation for language change */
        .language-card.loading {
          pointer-events: none;
          opacity: 0.7;
        }

        .language-card.loading::after {
          content: '';
          position: absolute;
          top: 50%;
          right: 20px;
          width: 16px;
          height: 16px;
          border: 2px solid transparent;
          border-top: 2px solid #F3BA2F;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: translateY(-50%) rotate(0deg); }
          100% { transform: translateY(-50%) rotate(360deg); }
        }

        /* Responsive Design */
        @media (max-width: 480px) {
          .i18n-container {
            padding: 16px;
          }
          
          .language-header {
            margin-bottom: 24px;
          }
          
          .language-header i {
            font-size: 40px;
          }
          
          .language-header h2 {
            font-size: 20px;
          }
          
          .language-card {
            padding: 14px 16px;
          }
          
          .language-flag {
            width: 40px;
            height: 40px;
            margin-right: 14px;
          }
        }

        @media (max-width: 360px) {
          .language-card {
            padding: 12px 14px;
          }
          
          .language-flag {
            width: 36px;
            height: 36px;
            margin-right: 12px;
          }
          
          .language-name {
            font-size: 15px;
          }
          
          .language-native {
            font-size: 12px;
          }
        }
      `})]})}function p(){return a.jsx(d,{})}export{p as default};
