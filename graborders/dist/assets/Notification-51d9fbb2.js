import{k as t,H as h,u as c,n as l,i as r,G as u,j as i,a2 as x}from"./index-aca44342.js";import{S as j}from"./SubHeader-5c07c3ca.js";import{D as v}from"./Dates-a9f6d707.js";import{u as N}from"./useDispatch-08c05b9c.js";import"./useNotifications-ccc87162.js";import"./v4-4a60fe23.js";const p={deposit:{icon:"fas fa-arrow-down",title:t("pages.notification.types.deposit.title"),getMessage:e=>t("pages.notification.types.deposit.message",e.message)},withdraw:{icon:"fas fa-arrow-up",title:t("pages.notification.types.withdraw.title"),getMessage:e=>t("pages.notification.types.withdraw.message",e.message)},staking:{icon:"fas fa-coins",title:t("pages.notification.types.staking.title"),getMessage:e=>t("pages.notification.types.staking.message",e.message)},kyc:{icon:"fas fa-id-card",title:t("pages.notification.types.kyc.title"),getMessage:e=>e.message||t("pages.notification.types.kyc.defaultMessage")},commission:{icon:"fas fa-hand-holding-dollar",title:t("pages.notification.types.commission.title"),getMessage:e=>t("pages.notification.types.commission.message",e.message)},futures:{icon:"fas fa-chart-line",title:t("pages.notification.types.futures.title"),getMessage:e=>t("pages.notification.types.futures.message",e.message)},accountActivated:{icon:"fas fa-user-check",title:t("pages.notification.types.accountActivated.title"),getMessage:e=>t("pages.notification.types.accountActivated.message",e.message)},custom:{icon:"fas fa-bell",title:t("pages.notification.types.custom.title"),getMessage:e=>e.message||t("pages.notification.types.custom.defaultMessage")},cancel_deposit:{icon:"fas fa-ban",title:t("pages.notification.types.cancelDeposit.title"),getMessage:e=>t("pages.notification.types.cancelDeposit.message",e.message)},cancel_withdraw:{icon:"fas fa-ban",title:t("pages.notification.types.cancelWithdraw.title"),getMessage:e=>t("pages.notification.types.cancelWithdraw.message",e.message)},cancel_activated:{icon:"fas fa-user-slash",title:t("pages.notification.types.cancelActivated.title"),getMessage:()=>t("pages.notification.types.cancelActivated.message")}};function F(){const e=N();h();const n=c(l.selectRows),d=c(l.selectLoading),[a,f]=r.useState("all");r.useEffect(()=>{const s=a==="all"?"":a;e(u.doFetch(s))},[e,a]);const g=s=>{e(x.doUpdate(s.id)),s.type==="accountActivated"&&(window.location.href="/profile")},m=s=>{f(s)},y=[{key:"all",label:t("pages.notification.filters.all")},{key:"unread",label:t("pages.notification.filters.unread")},{key:"read",label:t("pages.notification.filters.read")}];return i.jsxs("div",{className:"container",children:[i.jsx(j,{title:t("pages.notification.title")}),i.jsx("div",{className:"filter-tabs",children:y.map(s=>i.jsx("button",{className:`filter-tab ${a===s.key?"active":""}`,onClick:()=>m(s.key),children:s.label},s.key))}),i.jsx("div",{className:"notification-container",children:d?i.jsxs("div",{className:"loading-state",children:[i.jsx("div",{className:"binance-spinner"}),i.jsx("span",{children:t("pages.notification.loading")})]}):(n==null?void 0:n.length)>0?i.jsx("div",{className:"notification-list",children:n.map(s=>{const o=p[s.type]||p.custom;return i.jsxs("div",{className:`notification-item ${s.status==="unread"?"unread":""}`,onClick:()=>g(s),children:[i.jsx("div",{className:"notification-icon",children:i.jsx("i",{className:o.icon})}),i.jsxs("div",{className:"notification-content",children:[i.jsx("div",{className:"notification-title",children:o.title}),i.jsx("div",{className:"notification-message",children:o.getMessage(s)}),i.jsx("div",{className:"notification-time",children:v.Monthago(s.createdAt)})]}),s.status==="unread"&&i.jsx("div",{className:"unread-indicator"})]},s.id)})}):i.jsxs("div",{className:"empty-notification-state",children:[i.jsx("div",{className:"empty-icon",children:i.jsx("i",{className:"fas fa-bell-slash"})}),i.jsx("div",{className:"empty-title",children:t("pages.notification.emptyState.title")}),i.jsx("div",{className:"empty-message",children:a==="all"?t("pages.notification.emptyState.noNotifications"):t("pages.notification.emptyState.noFilteredNotifications",a)})]})}),i.jsx("style",{children:`
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
      `})]})}export{F as default};
