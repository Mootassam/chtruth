import{M as p,u as o,n as c,r as l,Q as h,j as e,S as x}from"./index-de46be71.js";import{S as v}from"./SubHeader-9e26b97e.js";import{D as y}from"./Dates-e41dcbaf.js";import{u as b}from"./useDispatch-2fe88bcc.js";import"./v4-4a60fe23.js";const r={deposit:{icon:"fas fa-arrow-down",title:"Deposit Received",getMessage:t=>`Your deposit of ${t.message} has been confirmed and credited to your wallet.`},withdraw:{icon:"fas fa-arrow-up",title:"Withdrawal Successful",getMessage:t=>`Your withdrawal of ${t.message} has been processed successfully.`},staking:{icon:"fas fa-coins",title:"Staking Profit",getMessage:t=>`You earned ${t.message} from your staking rewards.`},kyc:{icon:"fas fa-id-card",title:"KYC Update",getMessage:t=>t.message||"Your account has been activated."},commission:{icon:"fas fa-hand-holding-dollar",title:"Commission Received",getMessage:t=>`You received a commission of ${t.message}.`},futures:{icon:"fas fa-chart-line",title:"Futures Update",getMessage:t=>`Your futures transaction amount ${t.message} has been executed.`},accountActivated:{icon:"fas fa-user-check",title:"Account Activated",getMessage:()=>"Your account has been activated."},custom:{icon:"fas fa-bell",title:"Notification",getMessage:t=>t.message||"You have a new notification."},cancel_deposit:{icon:"fas fa-ban",title:"Deposit Cancelled",getMessage:t=>`Your deposit of ${t.message} has been cancelled.`},cancel_withdraw:{icon:"fas fa-ban",title:"Withdrawal Cancelled",getMessage:t=>`Your withdrawal of ${t.message} has been cancelled.`},cancel_activated:{icon:"fas fa-user-slash",title:"Activation Cancelled",getMessage:()=>"Your account activation has been cancelled."}};function Y(){const t=b();p();const s=o(c.selectRows),d=o(c.selectLoading),[i,f]=l.useState("all");l.useEffect(()=>{const a=i==="all"?"":i;t(h.doFetch(a))},[t,i]);const m=a=>{t(x.doUpdate(a.id)),a.type==="accountActivated"&&(window.location.href="/profile")},u=a=>{f(a)},g=[{key:"all",label:"All"},{key:"unread",label:"Unread"},{key:"read",label:"Read"}];return e.jsxs("div",{className:"container",children:[e.jsx(v,{title:"Notification"}),e.jsx("div",{className:"filter-tabs",children:g.map(a=>e.jsx("button",{className:`filter-tab ${i===a.key?"active":""}`,onClick:()=>u(a.key),children:a.label},a.key))}),e.jsx("div",{className:"notification-container",children:d?e.jsxs("div",{className:"loading-state",children:[e.jsx("div",{className:"binance-spinner"}),e.jsx("span",{children:"Loading"})]}):(s==null?void 0:s.length)>0?e.jsx("div",{className:"notification-list",children:s.map(a=>{const n=r[a.type]||r.custom;return e.jsxs("div",{className:`notification-item ${a.status==="unread"?"unread":""}`,onClick:()=>m(a),children:[e.jsx("div",{className:"notification-icon",children:e.jsx("i",{className:n.icon})}),e.jsxs("div",{className:"notification-content",children:[e.jsx("div",{className:"notification-title",children:n.title}),e.jsx("div",{className:"notification-message",children:n.getMessage(a)}),e.jsx("div",{className:"notification-time",children:y.Monthago(a.createdAt)})]}),a.status==="unread"&&e.jsx("div",{className:"unread-indicator"})]},a.id)})}):e.jsxs("div",{className:"empty-notification-state",children:[e.jsx("div",{className:"empty-icon",children:e.jsx("i",{className:"fas fa-bell-slash"})}),e.jsx("div",{className:"empty-title",children:"No notifications yet"}),e.jsx("div",{className:"empty-message",children:i==="all"?"You don't have any notifications yet":`No ${i} notifications found`})]})}),e.jsx("style",{children:`
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
      `})]})}export{Y as default};
