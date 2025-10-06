import{J as g,u as o,n as c,r,O as h,j as e,P as x}from"./index-731b80eb.js";import{S as y}from"./SubHeader-75a6eb39.js";import{D as v}from"./Dates-aae207ca.js";import{u as j}from"./useDispatch-afa82bf6.js";import"./v4-4a60fe23.js";const l={deposit:{icon:"fas fa-arrow-down",title:"Deposit Received",getMessage:i=>`Your deposit of ${i.message} has been confirmed and credited to your wallet.`},withdraw:{icon:"fas fa-arrow-up",title:"Withdrawal Successful",getMessage:i=>`Your withdrawal of ${i.message} has been processed successfully.`},staking:{icon:"fas fa-coins",title:"Staking Profit",getMessage:i=>`You earned ${i.message} from your staking rewards.`},commission:{icon:"fas fa-hand-holding-dollar",title:"Commission Received",getMessage:i=>`You received a commission of ${i.message}.`},kyc:{icon:"fas fa-id-card",title:"KYC Update",getMessage:i=>i.message||"Your account has been activated."},futures:{icon:"fas fa-chart-line",title:"Futures Update",getMessage:i=>`Your futures transaction amount ${i.message} has been executed.`},accountActivated:{icon:"fas fa-user-check",title:"Account Activated",getMessage:()=>"Your account has been activated."},custom:{icon:"fas fa-bell",title:"Notification",getMessage:i=>i.message||"You have a new notification."}};function Y(){const i=j();g();const a=o(c.selectRows),d=o(c.selectLoading),[s,f]=r.useState("all");r.useEffect(()=>{const t=s==="all"?"":s;i(h.doFetch(t))},[i,s]);const m=t=>{i(x.doUpdate(t.id)),t.type==="accountActivated"&&(window.location.href="/profile")},p=t=>{f(t)},u=[{key:"all",label:"All"},{key:"unread",label:"Unread"},{key:"read",label:"Read"}];return e.jsxs("div",{className:"container",children:[e.jsx(y,{title:"Notification"}),e.jsx("div",{className:"filter-tabs",children:u.map(t=>e.jsx("button",{className:`filter-tab ${s===t.key?"active":""}`,onClick:()=>p(t.key),children:t.label},t.key))}),e.jsx("div",{className:"notification-container",children:d?e.jsxs("div",{className:"loading-state",children:[e.jsx("div",{className:"binance-spinner"}),e.jsx("span",{children:"Loading"})]}):(a==null?void 0:a.length)>0?e.jsx("div",{className:"notification-list",children:a.map(t=>{const n=l[t.type]||l.custom;return e.jsxs("div",{className:`notification-item ${t.status==="unread"?"unread":""}`,onClick:()=>m(t),children:[e.jsx("div",{className:"notification-icon",children:e.jsx("i",{className:n.icon})}),e.jsxs("div",{className:"notification-content",children:[e.jsx("div",{className:"notification-title",children:n.title}),e.jsx("div",{className:"notification-message",children:n.getMessage(t)}),e.jsx("div",{className:"notification-time",children:v.Monthago(t.createdAt)})]}),t.status==="unread"&&e.jsx("div",{className:"unread-indicator"})]},t.id)})}):e.jsxs("div",{className:"empty-notification-state",children:[e.jsx("div",{className:"empty-icon",children:e.jsx("i",{className:"fas fa-bell-slash"})}),e.jsx("div",{className:"empty-title",children:"No notifications yet"}),e.jsx("div",{className:"empty-message",children:s==="all"?"You don't have any notifications yet":`No ${s} notifications found`})]})}),e.jsx("style",{children:`
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
