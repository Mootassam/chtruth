import{N as l,u as a,f as r,n as d,j as e,L as s}from"./index-168cd059.js";import{u as f}from"./useNotifications-3492bae5.js";function m(i){const n=l(),o=a(r.selectCurrentUser),t=a(d.selectCount);f(o.id);const c=()=>{n.goBack()};return e.jsxs("div",{className:"header",children:[e.jsxs("div",{className:"header-content",children:[e.jsx("div",{className:"back-button",onClick:()=>c(),children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx(s,{to:"/",className:"notification-link",children:e.jsx("i",{className:"fas fa-home header-icon",style:{color:"white",marginLeft:9}})}),e.jsx("div",{className:"page-title",children:i==null?void 0:i.title}),e.jsxs("div",{className:"header-icons",children:[e.jsxs(s,{to:"/notification",className:"notification-link",children:[e.jsx("i",{className:"fas fa-bell header-icon"}),t>0&&e.jsx("span",{className:"notification-badge",children:t})]}),e.jsx(s,{to:"/profile",className:"notification-link",children:e.jsx("i",{className:"fas fa-user header-icon",style:{color:"white",marginLeft:9}})})]})]}),e.jsx("style",{children:` /* Header Section */
  .header {
      background-color: #000000;
      padding: 15px 10px;
      position: sticky;
      top: 0;
      z-index: 100;
      /* margin-bottom: 20px; */
  }

  .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
  }

  .back-button {
      color: #FFFFFF;
      font-size: 20px;
  }

  .page-title {
      font-size: 20px;
      font-weight: bold;
      color: #FFFFFF;
  }

  .header-icons {
      display: flex;
      gap: 15px;
  }

  .header-icon {
      color: #FFFFFF;
      font-size: 20px;
  }

  .notification-link {
      position: relative;
      display: inline-block;
  }

  .notification-badge {
      position: absolute;
      top: -8px;
      right: -8px;
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
`})]})}export{m as S};
