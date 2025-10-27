import{h as u,u as h,D as y,F as v,j as t}from"./index-dd24c19e.js";import{S as w}from"./SubHeader-60630209.js";import{u as A}from"./useDispatch-ea94fcc1.js";import"./useNotifications-47882de1.js";function E(){const F=A(),[s,c]=u.useState("all"),[r,C]=u.useState("all"),[i,d]=u.useState("all");h(y.selectLoading);const p=h(y.selectRows);u.useEffect(()=>{F(v.doFetch())},[F]);const x=(e,a,n)=>{const o={icon:"fa-exchange-alt",typeText:"Transaction",iconClass:"swap",color:"#627EEA",amountColor:a==="in"?"#2ff378":"#FF6838"};switch(e){case"deposit":o.icon="fa-arrow-down",o.typeText="Deposit",o.iconClass="deposit",o.color="#F3BA2F",o.amountColor="#2ff378";break;case"withdraw":o.icon="fa-arrow-up",o.typeText="Withdrawal",o.iconClass="withdraw",o.color="#FF6838",o.amountColor="#FF6838";break;case"convert_in":o.icon="fa-exchange-alt",o.typeText=n?`Converted from ${n}`:"Conversion In",o.iconClass="convert-in",o.color="#9C27B0",o.amountColor="#2ff378";break;case"convert_out":o.icon="fa-exchange-alt",o.typeText=n?`Converted to ${n}`:"Conversion Out",o.iconClass="convert-out",o.color="#9C27B0",o.amountColor="#FF6838";break;case"stacking":o.icon="fa-coins",o.typeText="Staked Amount",o.iconClass="stacking",o.color="#FF9800",o.amountColor="#FFB74D";break;case"staking_reward":o.icon="fa-gift",o.typeText="Staking Rewards",o.iconClass="staking_reward",o.color="#4CAF50",o.amountColor="#81C784";break;case"futures_reserved":o.icon="fa-lock",o.typeText="Futures Reserved",o.iconClass="futures-reserved",o.color="#FF9800",o.amountColor="#FF9800";break;case"futures_profit":o.icon="fa-chart-line",o.typeText="Futures Profit",o.iconClass="futures-profit",o.color="#00C076",o.amountColor="#00C076";break;case"futures_loss":o.icon="fa-chart-line",o.typeText="Futures Loss",o.iconClass="futures-loss",o.color="#FF6838",o.amountColor="#FF6838";break;case"futures_settlement":o.icon="fa-file-contract",o.typeText="Futures Settlement",o.iconClass="futures-settlement",o.color="#9C27B0",o.amountColor="#9C27B0";break;case"futures_fee":o.icon="fa-receipt",o.typeText="Futures Fee",o.iconClass="futures-fee",o.color="#607D8B",o.amountColor="#607D8B";break;case"futures_refund":o.icon="fa-undo",o.typeText="Futures Refund",o.iconClass="futures-refund",o.color="#4CAF50",o.amountColor="#4CAF50";break;case"futures_bonus":o.icon="fa-gift",o.typeText="Futures Bonus",o.iconClass="futures-bonus",o.color="#E91E63",o.amountColor="#E91E63";break;case"futures_commission":o.icon="fa-handshake",o.typeText="Futures Commission",o.iconClass="futures-commission",o.color="#795548",o.amountColor="#795548";break;case"manual_profit":o.icon="fa-user-check",o.typeText="Manual Profit",o.iconClass="manual-profit",o.color="#00C076",o.amountColor="#00C076";break;case"manual_loss":o.icon="fa-user-slash",o.typeText="Manual Loss",o.iconClass="manual-loss",o.color="#FF6838",o.amountColor="#FF6838";break;case"manual_adjustment":o.icon="fa-cog",o.typeText="Manual Adjustment",o.iconClass="manual-adjustment",o.color="#9C27B0",o.amountColor="#9C27B0";break;case"spot_profit":o.icon="fa-coins",o.typeText="Spot Trading Profit",o.iconClass="spot-profit",o.color="#4CAF50",o.amountColor="#2ff378";break;case"spot_loss":o.icon="fa-coins",o.typeText="Spot Trading Loss",o.iconClass="spot-loss",o.color="#FF5722",o.amountColor="#FF6838";break;case"reward":o.icon="fa-hand-holding-dollar",o.typeText="Referral Reward",o.iconClass="spot-profit",o.color="#63f211ff",o.amountColor="#5ffc1bff";break;case"bonus":o.icon="fa-gift",o.typeText="Bonus",o.iconClass="bonus",o.color="#E91E63",o.amountColor="#E91E63";break;case"referral_commission":o.icon="fa-users",o.typeText="Referral Commission",o.iconClass="referral-commission",o.color="#FF9800",o.amountColor="#FF9800";break;case"order_reserved":o.icon="fa-clock",o.typeText="Order Reserved",o.iconClass="order-reserved",o.color="#FF9800",o.amountColor="#FF9800";break;case"order_cancelled":o.icon="fa-ban",o.typeText="Order Cancelled",o.iconClass="order-cancelled",o.color="#9E9E9E",o.amountColor="#9E9E9E";break;case"order_partial_fill":o.icon="fa-chart-pie",o.typeText="Order Partial Fill",o.iconClass="order-partial",o.color="#FF9800",o.amountColor="#FF9800";break;case"order_completed":o.icon="fa-check-circle",o.typeText="Order Completed",o.iconClass="order-completed",o.color="#4CAF50",o.amountColor="#4CAF50";break;case"fee_payment":o.icon="fa-receipt",o.typeText="Fee Payment",o.iconClass="fee-payment",o.color="#607D8B",o.amountColor="#607D8B";break;case"adjustment":o.icon="fa-sliders-h",o.typeText="Balance Adjustment",o.iconClass="adjustment",o.color="#9C27B0",o.amountColor="#9C27B0";break;case"transfer":o.icon="fa-exchange-alt",o.typeText="Transfer",o.iconClass="transfer",o.color="#2196F3",o.amountColor="#2196F3";break;default:o.icon="fa-exchange-alt",o.typeText="Transaction",o.iconClass="default",o.color="#627EEA",o.amountColor="#627EEA"}return o},g=u.useMemo(()=>p?p.filter(e=>{if(s!=="all"&&!(s==="deposits"?e.type==="deposit"||e.direction==="in":s==="withdrawals"?e.type==="withdraw"||e.direction==="out":s==="profits"?e.type.includes("profit")||e.direction==="in"&&e.type!=="deposit":s==="losses"?e.type.includes("loss")||e.direction==="out"&&e.type!=="withdraw":s==="conversions"?e.type.includes("convert"):s==="stacking"?e.type==="stacking":!0)||r!=="all"&&e.status!==r)return!1;if(i!=="all"){const a=new Date,n=new Date(e.dateTransaction);switch(i){case"today":const o=new Date(a.getFullYear(),a.getMonth(),a.getDate());return n>=o;case"week":const l=new Date(a);return l.setDate(a.getDate()-7),n>=l;case"month":const f=new Date(a.getFullYear(),a.getMonth(),1);return n>=f;case"year":const k=new Date(a.getFullYear(),0,1);return n>=k;default:return!0}}return!0}):[],[p,s,r,i]),b=e=>{const a=new Date(e),n=new Date,o=a.toDateString()===n.toDateString(),l=new Date(n);l.setDate(n.getDate()-1);const f=a.toDateString()===l.toDateString();return o?`Today, ${a.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}`:f?`Yesterday, ${a.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}`:a.toLocaleDateString([],{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})},m=e=>{C(r===e?"all":e)};return t.jsxs("div",{className:"container",children:[t.jsx(w,{title:"Transaction History"}),t.jsxs("div",{className:"filter-options",children:[t.jsx("button",{className:`filter-option ${s==="all"?"active":""}`,onClick:()=>c("all"),children:"All"}),t.jsx("button",{className:`filter-option ${s==="deposits"?"active":""}`,onClick:()=>c("deposits"),children:"Deposits"}),t.jsx("button",{className:`filter-option ${s==="withdrawals"?"active":""}`,onClick:()=>c("withdrawals"),children:"Withdrawals"}),t.jsx("button",{className:`filter-option ${s==="profits"?"active":""}`,onClick:()=>c("profits"),children:"Profits"}),t.jsx("button",{className:`filter-option ${s==="losses"?"active":""}`,onClick:()=>c("losses"),children:"Losses"}),t.jsx("button",{className:`filter-option ${s==="conversions"?"active":""}`,onClick:()=>c("conversions"),children:"Conversions"}),t.jsx("button",{className:`filter-option ${s==="stacking"?"active":""}`,onClick:()=>c("stacking"),children:"Stacking"})]}),t.jsxs("div",{className:"secondary-filters",children:[t.jsxs("div",{className:"status-filters",children:[t.jsx("div",{className:`status-option ${r==="all"?"active":""}`,onClick:()=>C("all"),children:"All Status"}),t.jsx("div",{className:`status-option ${r==="completed"?"active":""}`,onClick:()=>m("completed"),children:"Completed"}),t.jsx("div",{className:`status-option ${r==="pending"?"active":""}`,onClick:()=>m("pending"),children:"Pending"}),t.jsx("div",{className:`status-option ${r==="canceled"?"active":""}`,onClick:()=>m("canceled"),children:"Canceled"})]}),t.jsxs("div",{className:"time-filter",children:[t.jsx("div",{className:`time-option ${i==="all"?"active":""}`,onClick:()=>d("all"),children:"All Time"}),t.jsx("div",{className:`time-option ${i==="today"?"active":""}`,onClick:()=>d("today"),children:"Today"}),t.jsx("div",{className:`time-option ${i==="week"?"active":""}`,onClick:()=>d("week"),children:"Week"}),t.jsx("div",{className:`time-option ${i==="month"?"active":""}`,onClick:()=>d("month"),children:"Month"}),t.jsx("div",{className:`time-option ${i==="year"?"active":""}`,onClick:()=>d("year"),children:"Year"})]})]}),t.jsx("div",{className:"transaction-list",children:g.length>0?g.map(e=>{const{icon:a,typeText:n,iconClass:o,amountColor:l}=x(e.type,e.direction,e.relatedAsset);return t.jsxs("div",{className:"transaction-item",children:[t.jsxs("div",{className:"transaction-info",children:[t.jsx("div",{className:`transaction-icon ${o}`,style:{backgroundColor:x(e.type,e.direction,e.relatedAsset).color},children:t.jsx("i",{className:`fas ${a}`})}),t.jsxs("div",{className:"transaction-details",children:[t.jsx("div",{className:"transaction-type",children:n}),t.jsx("div",{className:"transaction-date",children:b(e.dateTransaction)})]})]}),t.jsxs("div",{className:"transaction-amount",children:[t.jsxs("div",{className:"amount",style:{color:l},children:[e.direction==="in"?"+":"-",e.amount.toFixed(5)," ",e.asset]}),t.jsx("div",{className:`transaction-status status-${e.status}`,children:e.status.charAt(0).toUpperCase()+e.status.slice(1)})]})]},e.id)}):t.jsxs("div",{className:"empty-state",children:[t.jsx("div",{className:"empty-icon",children:t.jsx("i",{className:"fas fa-receipt"})}),t.jsx("div",{className:"empty-title",children:"No transactions found"}),t.jsx("div",{className:"empty-text",children:"Try changing your filters to see more transactions"})]})}),t.jsx("style",{children:`
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
      `})]})}export{E as default};
