import{r as p,u as C,x as y,z as k,j as o}from"./index-fae849d1.js";import{S as w}from"./SubHeader-46d2e0e1.js";import{u as A}from"./useDispatch-00ceb992.js";function D(){const g=A(),[a,c]=p.useState("all"),[n,x]=p.useState("all"),[r,d]=p.useState("all");C(y.selectLoading);const u=C(y.selectRows);p.useEffect(()=>{g(k.doFetch())},[g]);const h=(e,i,s)=>{const t={icon:"fa-exchange-alt",typeText:"Transaction",iconClass:"swap",color:"#627EEA",amountColor:i==="in"?"#00C076":"#FF6838"};switch(e){case"deposit":t.icon="fa-arrow-down",t.typeText="Deposit",t.iconClass="deposit",t.color="#F3BA2F",t.amountColor="#00C076";break;case"withdraw":t.icon="fa-arrow-up",t.typeText="Withdrawal",t.iconClass="withdraw",t.color="#FF6838",t.amountColor="#FF6838";break;case"convert_in":t.icon="fa-exchange-alt",t.typeText=s?`Converted from ${s}`:"Conversion In",t.iconClass="convert-in",t.color="#9C27B0",t.amountColor="#00C076";break;case"convert_out":t.icon="fa-exchange-alt",t.typeText=s?`Converted to ${s}`:"Conversion Out",t.iconClass="convert-out",t.color="#9C27B0",t.amountColor="#FF6838";break;case"stacking":t.icon="fa-lock",t.typeText="Stacking Reward",t.iconClass="stacking",t.color="#4CAF50",t.amountColor="#00C076";break;case"futures_profit":t.icon="fa-chart-line",t.typeText="Futures Profit",t.iconClass="futures-profit",t.color="#00BCD4",t.amountColor="#00C076";break;case"futures_loss":t.icon="fa-chart-line",t.typeText="Futures Loss",t.iconClass="futures-loss",t.color="#FF5722",t.amountColor="#FF6838";break;case"spot_profit":t.icon="fa-coins",t.typeText="Spot Trading Profit",t.iconClass="spot-profit",t.color="#4CAF50",t.amountColor="#00C076";break;case"spot_loss":t.icon="fa-coins",t.typeText="Spot Trading Loss",t.iconClass="spot-loss",t.color="#FF5722",t.amountColor="#FF6838";break;default:t.icon="fa-exchange-alt",t.typeText="Transaction",t.iconClass="default",t.color="#627EEA"}return t},F=p.useMemo(()=>u?u.filter(e=>{if(a!=="all"&&!(a==="deposits"?e.type==="deposit"||e.direction==="in":a==="withdrawals"?e.type==="withdraw"||e.direction==="out":a==="profits"?e.type.includes("profit")||e.direction==="in"&&e.type!=="deposit":a==="losses"?e.type.includes("loss")||e.direction==="out"&&e.type!=="withdraw":a==="conversions"?e.type.includes("convert"):a==="stacking"?e.type==="stacking":!0)||n!=="all"&&e.status!==n)return!1;if(r!=="all"){const i=new Date,s=new Date(e.dateTransaction);switch(r){case"today":const t=new Date(i.getFullYear(),i.getMonth(),i.getDate());return s>=t;case"week":const l=new Date(i);return l.setDate(i.getDate()-7),s>=l;case"month":const f=new Date(i.getFullYear(),i.getMonth(),1);return s>=f;case"year":const v=new Date(i.getFullYear(),0,1);return s>=v;default:return!0}}return!0}):[],[u,a,n,r]),b=e=>{const i=new Date(e),s=new Date,t=i.toDateString()===s.toDateString(),l=new Date(s);l.setDate(s.getDate()-1);const f=i.toDateString()===l.toDateString();return t?`Today, ${i.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}`:f?`Yesterday, ${i.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}`:i.toLocaleDateString([],{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})},m=e=>{x(n===e?"all":e)};return o.jsxs("div",{className:"container",children:[o.jsx(w,{title:"Transaction History"}),o.jsxs("div",{className:"filter-options",children:[o.jsx("button",{className:`filter-option ${a==="all"?"active":""}`,onClick:()=>c("all"),children:"All"}),o.jsx("button",{className:`filter-option ${a==="deposits"?"active":""}`,onClick:()=>c("deposits"),children:"Deposits"}),o.jsx("button",{className:`filter-option ${a==="withdrawals"?"active":""}`,onClick:()=>c("withdrawals"),children:"Withdrawals"}),o.jsx("button",{className:`filter-option ${a==="profits"?"active":""}`,onClick:()=>c("profits"),children:"Profits"}),o.jsx("button",{className:`filter-option ${a==="losses"?"active":""}`,onClick:()=>c("losses"),children:"Losses"}),o.jsx("button",{className:`filter-option ${a==="conversions"?"active":""}`,onClick:()=>c("conversions"),children:"Conversions"}),o.jsx("button",{className:`filter-option ${a==="stacking"?"active":""}`,onClick:()=>c("stacking"),children:"Stacking"})]}),o.jsxs("div",{className:"secondary-filters",children:[o.jsxs("div",{className:"status-filters",children:[o.jsx("div",{className:`status-option ${n==="all"?"active":""}`,onClick:()=>x("all"),children:"All Status"}),o.jsx("div",{className:`status-option ${n==="completed"?"active":""}`,onClick:()=>m("completed"),children:"Completed"}),o.jsx("div",{className:`status-option ${n==="pending"?"active":""}`,onClick:()=>m("pending"),children:"Pending"}),o.jsx("div",{className:`status-option ${n==="canceled"?"active":""}`,onClick:()=>m("canceled"),children:"Canceled"})]}),o.jsxs("div",{className:"time-filter",children:[o.jsx("div",{className:`time-option ${r==="all"?"active":""}`,onClick:()=>d("all"),children:"All Time"}),o.jsx("div",{className:`time-option ${r==="today"?"active":""}`,onClick:()=>d("today"),children:"Today"}),o.jsx("div",{className:`time-option ${r==="week"?"active":""}`,onClick:()=>d("week"),children:"Week"}),o.jsx("div",{className:`time-option ${r==="month"?"active":""}`,onClick:()=>d("month"),children:"Month"}),o.jsx("div",{className:`time-option ${r==="year"?"active":""}`,onClick:()=>d("year"),children:"Year"})]})]}),o.jsx("div",{className:"transaction-list",children:F.length>0?F.map(e=>{const{icon:i,typeText:s,iconClass:t,amountColor:l}=h(e.type,e.direction,e.relatedAsset);return o.jsxs("div",{className:"transaction-item",children:[o.jsxs("div",{className:"transaction-info",children:[o.jsx("div",{className:`transaction-icon ${t}`,style:{backgroundColor:h(e.type,e.direction,e.relatedAsset).color},children:o.jsx("i",{className:`fas ${i}`})}),o.jsxs("div",{className:"transaction-details",children:[o.jsx("div",{className:"transaction-type",children:s}),o.jsx("div",{className:"transaction-date",children:b(e.dateTransaction)})]})]}),o.jsxs("div",{className:"transaction-amount",children:[o.jsxs("div",{className:"amount",style:{color:l},children:[e.direction==="in"?"+":"-",e.amount," ",e.asset]}),o.jsx("div",{className:`transaction-status status-${e.status}`,children:e.status.charAt(0).toUpperCase()+e.status.slice(1)})]})]},e.id)}):o.jsxs("div",{className:"empty-state",children:[o.jsx("div",{className:"empty-icon",children:o.jsx("i",{className:"fas fa-receipt"})}),o.jsx("div",{className:"empty-title",children:"No transactions found"}),o.jsx("div",{className:"empty-text",children:"Try changing your filters to see more transactions"})]})}),o.jsx("style",{children:`
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
      `})]})}export{D as default};
