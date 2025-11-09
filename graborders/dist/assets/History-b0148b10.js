import{o as u,u as C,Q as b,T as v,j as e,p as o}from"./index-4cd6ea8b.js";import{S as w}from"./SubHeader-a259f0be.js";import{u as A}from"./useDispatch-1f91c277.js";import"./useNotifications-b773cdf3.js";function _(){const g=A(),[r,l]=u.useState("all"),[n,h]=u.useState("all"),[c,d]=u.useState("all");C(b.selectLoading);const m=C(b.selectRows);u.useEffect(()=>{g(v.doFetch())},[g]);const F=(s,a,i)=>{const t={icon:"fa-exchange-alt",typeText:o("pages.history.transactionTypes.transaction"),iconClass:"swap",color:"#627EEA",amountColor:a==="in"?"#2ff378":"#FF6838"};switch(s){case"deposit":t.icon="fa-arrow-down",t.typeText=o("pages.history.transactionTypes.deposit"),t.iconClass="deposit",t.color="#F3BA2F",t.amountColor="#2ff378";break;case"withdraw":t.icon="fa-arrow-up",t.typeText=o("pages.history.transactionTypes.withdrawal"),t.iconClass="withdraw",t.color="#FF6838",t.amountColor="#FF6838";break;case"convert_in":t.icon="fa-exchange-alt",t.typeText=i?o("pages.history.transactionTypes.convertedFrom",i):o("pages.history.transactionTypes.conversionIn"),t.iconClass="convert-in",t.color="#9C27B0",t.amountColor="#2ff378";break;case"convert_out":t.icon="fa-exchange-alt",t.typeText=i?o("pages.history.transactionTypes.convertedTo",i):o("pages.history.transactionTypes.conversionOut"),t.iconClass="convert-out",t.color="#9C27B0",t.amountColor="#FF6838";break;case"stacking":t.icon="fa-coins",t.typeText=o("pages.history.transactionTypes.stakedAmount"),t.iconClass="stacking",t.color="#FF9800",t.amountColor="#FFB74D";break;case"staking_reward":t.icon="fa-gift",t.typeText=o("pages.history.transactionTypes.stakingRewards"),t.iconClass="staking_reward",t.color="#4CAF50",t.amountColor="#81C784";break;case"futures_reserved":t.icon="fa-lock",t.typeText=o("pages.history.transactionTypes.futuresReserved"),t.iconClass="futures-reserved",t.color="#FF9800",t.amountColor="#FF9800";break;case"futures_profit":t.icon="fa-chart-line",t.typeText=o("pages.history.transactionTypes.futuresProfit"),t.iconClass="futures-profit",t.color="#00C076",t.amountColor="#00C076";break;case"futures_loss":t.icon="fa-chart-line",t.typeText=o("pages.history.transactionTypes.futuresLoss"),t.iconClass="futures-loss",t.color="#FF6838",t.amountColor="#FF6838";break;case"futures_settlement":t.icon="fa-file-contract",t.typeText=o("pages.history.transactionTypes.futuresSettlement"),t.iconClass="futures-settlement",t.color="#9C27B0",t.amountColor="#9C27B0";break;case"futures_fee":t.icon="fa-receipt",t.typeText=o("pages.history.transactionTypes.futuresFee"),t.iconClass="futures-fee",t.color="#607D8B",t.amountColor="#607D8B";break;case"futures_refund":t.icon="fa-undo",t.typeText=o("pages.history.transactionTypes.futuresRefund"),t.iconClass="futures-refund",t.color="#4CAF50",t.amountColor="#4CAF50";break;case"futures_bonus":t.icon="fa-gift",t.typeText=o("pages.history.transactionTypes.futuresBonus"),t.iconClass="futures-bonus",t.color="#E91E63",t.amountColor="#E91E63";break;case"futures_commission":t.icon="fa-handshake",t.typeText=o("pages.history.transactionTypes.futuresCommission"),t.iconClass="futures-commission",t.color="#795548",t.amountColor="#795548";break;case"manual_profit":t.icon="fa-user-check",t.typeText=o("pages.history.transactionTypes.manualProfit"),t.iconClass="manual-profit",t.color="#00C076",t.amountColor="#00C076";break;case"manual_loss":t.icon="fa-user-slash",t.typeText=o("pages.history.transactionTypes.manualLoss"),t.iconClass="manual-loss",t.color="#FF6838",t.amountColor="#FF6838";break;case"manual_adjustment":t.icon="fa-cog",t.typeText=o("pages.history.transactionTypes.manualAdjustment"),t.iconClass="manual-adjustment",t.color="#9C27B0",t.amountColor="#9C27B0";break;case"spot_profit":t.icon="fa-coins",t.typeText=o("pages.history.transactionTypes.spotTradingProfit"),t.iconClass="spot-profit",t.color="#4CAF50",t.amountColor="#2ff378";break;case"spot_loss":t.icon="fa-coins",t.typeText=o("pages.history.transactionTypes.spotTradingLoss"),t.iconClass="spot-loss",t.color="#FF5722",t.amountColor="#FF6838";break;case"reward":t.icon="fa-hand-holding-dollar",t.typeText=o("pages.history.transactionTypes.referralReward"),t.iconClass="spot-profit",t.color="#63f211ff",t.amountColor="#5ffc1bff";break;case"bonus":t.icon="fa-gift",t.typeText=o("pages.history.transactionTypes.bonus"),t.iconClass="bonus",t.color="#E91E63",t.amountColor="#E91E63";break;case"referral_commission":t.icon="fa-users",t.typeText=o("pages.history.transactionTypes.referralCommission"),t.iconClass="referral-commission",t.color="#FF9800",t.amountColor="#FF9800";break;case"order_reserved":t.icon="fa-clock",t.typeText=o("pages.history.transactionTypes.orderReserved"),t.iconClass="order-reserved",t.color="#FF9800",t.amountColor="#FF9800";break;case"order_cancelled":t.icon="fa-ban",t.typeText=o("pages.history.transactionTypes.orderCancelled"),t.iconClass="order-cancelled",t.color="#9E9E9E",t.amountColor="#9E9E9E";break;case"order_partial_fill":t.icon="fa-chart-pie",t.typeText=o("pages.history.transactionTypes.orderPartialFill"),t.iconClass="order-partial",t.color="#FF9800",t.amountColor="#FF9800";break;case"order_completed":t.icon="fa-check-circle",t.typeText=o("pages.history.transactionTypes.orderCompleted"),t.iconClass="order-completed",t.color="#4CAF50",t.amountColor="#4CAF50";break;case"fee_payment":t.icon="fa-receipt",t.typeText=o("pages.history.transactionTypes.feePayment"),t.iconClass="fee-payment",t.color="#607D8B",t.amountColor="#607D8B";break;case"adjustment":t.icon="fa-sliders-h",t.typeText=o("pages.history.transactionTypes.balanceAdjustment"),t.iconClass="adjustment",t.color="#9C27B0",t.amountColor="#9C27B0";break;case"transfer":t.icon="fa-exchange-alt",t.typeText=o("pages.history.transactionTypes.transfer"),t.iconClass="transfer",t.color="#2196F3",t.amountColor="#2196F3";break;default:t.icon="fa-exchange-alt",t.typeText=o("pages.history.transactionTypes.transaction"),t.iconClass="default",t.color="#627EEA",t.amountColor="#627EEA"}return t},x=u.useMemo(()=>m?m.filter(s=>{if(r!=="all"&&!(r==="deposits"?s.type==="deposit"||s.direction==="in":r==="withdrawals"?s.type==="withdraw"||s.direction==="out":r==="profits"?s.type.includes("profit")||s.direction==="in"&&s.type!=="deposit":r==="losses"?s.type.includes("loss")||s.direction==="out"&&s.type!=="withdraw":r==="conversions"?s.type.includes("convert"):r==="stacking"?s.type==="stacking":!0)||n!=="all"&&s.status!==n)return!1;if(c!=="all"){const a=new Date,i=new Date(s.dateTransaction);switch(c){case"today":const t=new Date(a.getFullYear(),a.getMonth(),a.getDate());return i>=t;case"week":const p=new Date(a);return p.setDate(a.getDate()-7),i>=p;case"month":const y=new Date(a.getFullYear(),a.getMonth(),1);return i>=y;case"year":const T=new Date(a.getFullYear(),0,1);return i>=T;default:return!0}}return!0}):[],[m,r,n,c]),k=s=>{const a=new Date(s),i=new Date,t=a.toDateString()===i.toDateString(),p=new Date(i);p.setDate(i.getDate()-1);const y=a.toDateString()===p.toDateString();return t?o("pages.history.dateFormats.today",a.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})):y?o("pages.history.dateFormats.yesterday",a.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})):a.toLocaleDateString([],{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})},f=s=>{h(n===s?"all":s)};return e.jsxs("div",{className:"container",children:[e.jsx(w,{title:o("pages.history.title")}),e.jsxs("div",{className:"filter-options",children:[e.jsx("button",{className:`filter-option ${r==="all"?"active":""}`,onClick:()=>l("all"),children:o("pages.history.filters.all")}),e.jsx("button",{className:`filter-option ${r==="deposits"?"active":""}`,onClick:()=>l("deposits"),children:o("pages.history.filters.deposits")}),e.jsx("button",{className:`filter-option ${r==="withdrawals"?"active":""}`,onClick:()=>l("withdrawals"),children:o("pages.history.filters.withdrawals")}),e.jsx("button",{className:`filter-option ${r==="profits"?"active":""}`,onClick:()=>l("profits"),children:o("pages.history.filters.profits")}),e.jsx("button",{className:`filter-option ${r==="losses"?"active":""}`,onClick:()=>l("losses"),children:o("pages.history.filters.losses")}),e.jsx("button",{className:`filter-option ${r==="conversions"?"active":""}`,onClick:()=>l("conversions"),children:o("pages.history.filters.conversions")}),e.jsx("button",{className:`filter-option ${r==="stacking"?"active":""}`,onClick:()=>l("stacking"),children:o("pages.history.filters.stacking")})]}),e.jsxs("div",{className:"secondary-filters",children:[e.jsxs("div",{className:"status-filters",children:[e.jsx("div",{className:`status-option ${n==="all"?"active":""}`,onClick:()=>h("all"),children:o("pages.history.statusFilters.allStatus")}),e.jsx("div",{className:`status-option ${n==="completed"?"active":""}`,onClick:()=>f("completed"),children:o("pages.history.statusFilters.completed")}),e.jsx("div",{className:`status-option ${n==="pending"?"active":""}`,onClick:()=>f("pending"),children:o("pages.history.statusFilters.pending")}),e.jsx("div",{className:`status-option ${n==="canceled"?"active":""}`,onClick:()=>f("canceled"),children:o("pages.history.statusFilters.canceled")})]}),e.jsxs("div",{className:"time-filter",children:[e.jsx("div",{className:`time-option ${c==="all"?"active":""}`,onClick:()=>d("all"),children:o("pages.history.timeFilters.allTime")}),e.jsx("div",{className:`time-option ${c==="today"?"active":""}`,onClick:()=>d("today"),children:o("pages.history.timeFilters.today")}),e.jsx("div",{className:`time-option ${c==="week"?"active":""}`,onClick:()=>d("week"),children:o("pages.history.timeFilters.week")}),e.jsx("div",{className:`time-option ${c==="month"?"active":""}`,onClick:()=>d("month"),children:o("pages.history.timeFilters.month")}),e.jsx("div",{className:`time-option ${c==="year"?"active":""}`,onClick:()=>d("year"),children:o("pages.history.timeFilters.year")})]})]}),e.jsx("div",{className:"transaction-list",children:x.length>0?x.map(s=>{const{icon:a,typeText:i,iconClass:t,amountColor:p}=F(s.type,s.direction,s.relatedAsset);return e.jsxs("div",{className:"transaction-item",children:[e.jsxs("div",{className:"transaction-info",children:[e.jsx("div",{className:`transaction-icon ${t}`,style:{backgroundColor:F(s.type,s.direction,s.relatedAsset).color},children:e.jsx("i",{className:`fas ${a}`})}),e.jsxs("div",{className:"transaction-details",children:[e.jsx("div",{className:"transaction-type",children:i}),e.jsx("div",{className:"transaction-date",children:k(s.dateTransaction)})]})]}),e.jsxs("div",{className:"transaction-amount",children:[e.jsxs("div",{className:"amount",style:{color:p},children:[s.direction==="in"?"+":"-",s.amount.toFixed(5)," ",s.asset]}),e.jsx("div",{className:`transaction-status status-${s.status}`,children:o(`pages.history.status.${s.status}`)})]})]},s.id)}):e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-icon",children:e.jsx("i",{className:"fas fa-receipt"})}),e.jsx("div",{className:"empty-title",children:o("pages.history.emptyState.title")}),e.jsx("div",{className:"empty-text",children:o("pages.history.emptyState.description")})]})}),e.jsx("style",{children:`
        .container {
          max-width: 400px;
          margin: 0 auto;
          padding: 0 15px;
        }

        .filter-options {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding: 15px 0;
          margin-bottom: 15px;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }

        .filter-options::-webkit-scrollbar {
          display: none;
        }

        .filter-option {
          padding: 8px 16px;
          border-radius: 20px;
          border: 1px solid #444;
          background-color: #1A1A1A;
          color: #CCCCCC;
          font-size: 14px;
          font-weight: 500;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-option.active {
          background-color: #F3BA2F;
          color: #000;
          border-color: #F3BA2F;
        }

        .secondary-filters {
          margin-bottom: 20px;
        }

        .status-filters,
        .time-filter {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding: 10px 0;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }

        .status-filters::-webkit-scrollbar,
        .time-filter::-webkit-scrollbar {
          display: none;
        }

        .status-option,
        .time-option {
          padding: 6px 12px;
          border-radius: 16px;
          border: 1px solid #444;
          background-color: #1A1A1A;
          color: #CCCCCC;
          font-size: 12px;
          font-weight: 500;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .status-option.active,
        .time-option.active {
          background-color: #627EEA;
          color: #FFF;
          border-color: #627EEA;
        }

        .transaction-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 80px;
        }

        .transaction-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          background-color: #1A1A1A;
          border-radius: 12px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .transaction-item:hover {
          background-color: #2A2A2A;
        }

        .transaction-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .transaction-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          color: #FFF;
        }

        .transaction-details {
          display: flex;
          flex-direction: column;
        }

        .transaction-type {
          font-weight: bold;
          margin-bottom: 4px;
          font-size: 14px;
        }

        .transaction-date {
          color: #AAAAAA;
          font-size: 12px;
        }

        .transaction-amount {
          text-align: right;
        }

        .amount {
          font-weight: bold;
          margin-bottom: 4px;
          font-size: 14px;
        }

        .transaction-status {
          font-size: 11px;
          color: #2ff378;
        }

        .transaction-status.status-pending {
          color: #F3BA2F;
        }

        .transaction-status.status-canceled {
          color: #FF6838;
        }

        .empty-state {
          text-align: center;
          padding: 40px 20px;
          background: linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%);
          border-radius: 16px;
          margin: 20px 0;
        }

        .empty-icon {
          font-size: 48px;
          color: #F3BA2F;
          margin-bottom: 15px;
        }

        .empty-title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 8px;
          color: #FFFFFF;
        }

        .empty-text {
          color: #AAAAAA;
          font-size: 14px;
        }

        /* Enhanced transaction icons */
        .transaction-icon.deposit { background-color: #F3BA2F !important; color: #000; }
        .transaction-icon.withdraw { background-color: #FF6838 !important; color: #000; }
        .transaction-icon.convert-in { background-color: #9C27B0 !important; color: #FFF; }
        .transaction-icon.convert-out { background-color: #9C27B0 !important; color: #FFF; }
        .transaction-icon.stacking { background-color: #4CAF50 !important; color: #FFF; }
        .transaction-icon.futures-profit { background-color: #00BCD4 !important; color: #FFF; }
        .transaction-icon.futures-loss { background-color: #FF5722 !important; color: #FFF; }
        .transaction-icon.spot-profit { background-color: #4CAF50 !important; color: #FFF; }
        .transaction-icon.spot-loss { background-color: #FF5722 !important; color: #FFF; }
        .transaction-icon.default { background-color: #627EEA !important; color: #FFF; }
        .transaction-icon.swap { background-color: #627EEA !important; color: #FFF; }
      `})]})}export{_ as default};
