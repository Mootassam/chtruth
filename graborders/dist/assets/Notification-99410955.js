import{N as g,u as o,n as c,h as l,S as h,j as t,T as x}from"./index-0851878c.js";import{S as y}from"./SubHeader-01b93f9d.js";import{D as v}from"./Dates-670b0ff0.js";import{u as b}from"./useDispatch-f840f987.js";import"./useNotifications-0a1c9b14.js";import"./v4-4a60fe23.js";const r={deposit:{icon:"fas fa-arrow-down",title:"Deposit Received",getMessage:e=>`Your deposit of ${e.message} has been confirmed and credited to your wallet.`},withdraw:{icon:"fas fa-arrow-up",title:"Withdrawal Successful",getMessage:e=>`Your withdrawal of ${e.message} has been processed successfully.`},staking:{icon:"fas fa-coins",title:"Staking Profit",getMessage:e=>`You earned ${e.message} from your staking rewards.`},kyc:{icon:"fas fa-id-card",title:"KYC Update",getMessage:e=>e.message||"Your account has been activated."},commission:{icon:"fas fa-hand-holding-dollar",title:"Commission Received",getMessage:e=>`You received a commission of ${e.message}.`},futures:{icon:"fas fa-chart-line",title:"Futures Update",getMessage:e=>`Your futures transaction amount ${e.message} has been executed.`},accountActivated:{icon:"fas fa-user-check",title:"kyc Verification",getMessage:e=>`Hello ${e.message} your KYC documents have been verified you can now enjoy unlimited features on Nexus Exchange`},custom:{icon:"fas fa-bell",title:"Notification",getMessage:e=>e.message||"You have a new notification."},cancel_deposit:{icon:"fas fa-ban",title:"Deposit Cancelled",getMessage:e=>`Your deposit of ${e.message} has been cancelled.`},cancel_withdraw:{icon:"fas fa-ban",title:"Withdrawal Cancelled",getMessage:e=>`Your withdrawal of ${e.message} has been cancelled.`},cancel_activated:{icon:"fas fa-user-slash",title:"Activation Cancelled",getMessage:()=>"Your KYC was declined  by system please try again or contact Customer Support for help"}};function M(){const e=b();g();const s=o(c.selectRows),d=o(c.selectLoading),[i,f]=l.useState("all");l.useEffect(()=>{const a=i==="all"?"":i;e(h.doFetch(a))},[e,i]);const m=a=>{e(x.doUpdate(a.id)),a.type==="accountActivated"&&(window.location.href="/profile")},u=a=>{f(a)},p=[{key:"all",label:"All"},{key:"unread",label:"Unread"},{key:"read",label:"Read"}];return t.jsxs("div",{className:"container",children:[t.jsx(y,{title:"Notification"}),t.jsx("div",{className:"filter-tabs",children:p.map(a=>t.jsx("button",{className:`filter-tab ${i===a.key?"active":""}`,onClick:()=>u(a.key),children:a.label},a.key))}),t.jsx("div",{className:"notification-container",children:d?t.jsxs("div",{className:"loading-state",children:[t.jsx("div",{className:"binance-spinner"}),t.jsx("span",{children:"Loading"})]}):(s==null?void 0:s.length)>0?t.jsx("div",{className:"notification-list",children:s.map(a=>{const n=r[a.type]||r.custom;return t.jsxs("div",{className:`notification-item ${a.status==="unread"?"unread":""}`,onClick:()=>m(a),children:[t.jsx("div",{className:"notification-icon",children:t.jsx("i",{className:n.icon})}),t.jsxs("div",{className:"notification-content",children:[t.jsx("div",{className:"notification-title",children:n.title}),t.jsx("div",{className:"notification-message",children:n.getMessage(a)}),t.jsx("div",{className:"notification-time",children:v.Monthago(a.createdAt)})]}),a.status==="unread"&&t.jsx("div",{className:"unread-indicator"})]},a.id)})}):t.jsxs("div",{className:"empty-notification-state",children:[t.jsx("div",{className:"empty-icon",children:t.jsx("i",{className:"fas fa-bell-slash"})}),t.jsx("div",{className:"empty-title",children:"No notifications yet"}),t.jsx("div",{className:"empty-message",children:i==="all"?"You don't have any notifications yet":`No ${i} notifications found`})]})}),t.jsx("style",{children:`
        .loading-state {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 40px;
          color: #666;
          font-size: 14px;
        }
        
        .binance-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid #f0b90b;
          border-top: 2px solid transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .unread-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-left: 10px;
        }
        
        .empty-notification-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 30px;
          text-align: center;
          color: #666;
        }
        
        .empty-icon {
          font-size: 48px;
          margin-bottom: 20px;
          color: #ddd;
        }
        
        .empty-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 10px;
        }
        
        .empty-message {
          font-size: 14px;
          line-height: 1.4;
        }
      `})]})}export{M as default};
