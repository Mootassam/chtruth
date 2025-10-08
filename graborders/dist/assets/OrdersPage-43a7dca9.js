import{r,u as d,i as p,s as N,j as e}from"./index-9272ea36.js";import{S as j}from"./SubHeader-5c5f9af7.js";import{u as F}from"./useDispatch-729df1b9.js";function T(){const[a,l]=r.useState("ALL"),[n,x]=r.useState(""),[c,t]=r.useState(!1),u=d(p.selectRows);d(p.selectLoading);const h=d(p.selectCount),g=F(),f=[{id:1,pair:"BTC/USDT",action:"BUY",date:"08/23",time:"02:20:08",status:"COMPLETED",orderPrice:"117065.0000",orderAmount:"0.000901",filled:"100%",total:"105.48",type:"LIMIT"},{id:2,pair:"ETH/USDT",action:"SELL",date:"08/24",time:"14:35:22",status:"PENDING",orderPrice:"2850.50",orderAmount:"1.25",filled:"35%",total:"3563.13",type:"LIMIT"},{id:3,pair:"SOL/USDT",action:"BUY",date:"08/24",time:"09:15:47",status:"PARTIALLY_FILLED",orderPrice:"102.75",orderAmount:"15.50",filled:"75%",total:"1194.56",type:"MARKET"},{id:4,pair:"XRP/USDT",action:"SELL",date:"08/22",time:"18:42:11",status:"CANCELLED",orderPrice:"0.5875",orderAmount:"500",filled:"0%",total:"293.75",type:"LIMIT"},{id:5,pair:"ADA/USDT",action:"BUY",date:"08/21",time:"11:23:34",status:"COMPLETED",orderPrice:"0.4650",orderAmount:"1000",filled:"100%",total:"465.00",type:"MARKET"},{id:6,pair:"BTC/USDT",action:"SELL",date:"08/20",time:"16:55:09",status:"COMPLETED",orderPrice:"48920.00",orderAmount:"0.005",filled:"100%",total:"244.60",type:"LIMIT"}];r.useEffect(()=>{g(N.doFetch())},[]),f.filter(s=>{const o=a==="ALL"||s.status===a||a==="OPEN"&&(s.status==="PENDING"||s.status==="PARTIALLY_FILLED"),b=s.pair.toLowerCase().includes(n.toLowerCase())||s.type.toLowerCase().includes(n.toLowerCase());return o&&b});const i=(s,o=2)=>Number(s).toLocaleString(void 0,{minimumFractionDigits:o,maximumFractionDigits:o}),m=s=>{switch(s){case"COMPLETED":return"#00C076";case"PENDING":return"#F3BA2F";case"PARTIALLY_FILLED":return"#FF6838";case"CANCELLED":return"#AAAAAA";default:return"#FFFFFF"}},A=s=>s==="BUY"?"#00C076":"#FF6838";return e.jsxs("div",{className:"container",children:[e.jsx(j,{title:"Orders History"}),e.jsxs("div",{className:"search-box",children:[e.jsx("i",{className:"fas fa-search"}),e.jsx("input",{type:"text",placeholder:"Search by pair or type...",value:n,onChange:s=>x(s.target.value)})]}),e.jsxs("div",{className:"filters-container",children:[e.jsxs("div",{className:"filters-header",onClick:()=>t(!c),children:[e.jsxs("span",{children:["Filter: ",a==="ALL"?"All Orders":a]}),e.jsx("i",{className:`fas fa-chevron-${c?"up":"down"}`})]}),c&&e.jsxs("div",{className:"filters-menu",children:[e.jsx("button",{className:a==="ALL"?"active":"",onClick:()=>{l("ALL"),t(!1)},children:"All Orders"}),e.jsx("button",{className:a==="OPEN"?"active":"",onClick:()=>{l("OPEN"),t(!1)},children:"Open"}),e.jsx("button",{className:a==="COMPLETED"?"active":"",onClick:()=>{l("COMPLETED"),t(!1)},children:"Completed"}),e.jsx("button",{className:a==="CANCELLED"?"active":"",onClick:()=>{l("CANCELLED"),t(!1)},children:"Cancelled"})]})]}),e.jsx("div",{className:"orders-list",children:h>0?u.map(s=>e.jsxs("div",{className:"order-card",children:[e.jsxs("div",{className:"order-card-header",children:[e.jsxs("div",{className:"pair-action",children:[e.jsx("span",{className:"pair",children:s.tradingPair}),e.jsx("span",{className:"action-badge",style:{color:A(s.direction)},children:s.direction})]}),e.jsxs("div",{className:"date-time",children:[e.jsx("span",{className:"date",children:s.commissionTime?new Date(s.commissionTime).toLocaleDateString():""}),e.jsx("span",{className:"time",children:s.commissionTime?new Date(s.commissionTime).toLocaleTimeString():""})]})]}),e.jsxs("div",{className:"order-details",children:[e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"label",children:"Type"}),e.jsx("span",{className:"value",children:s.orderType})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"label",children:"Status"}),e.jsx("span",{className:"value",style:{color:m(s.status)},children:s.status})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"label",children:"Price"}),e.jsxs("span",{className:"value",children:[i(s.commissionPrice,4)," USDT"]})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"label",children:"Amount"}),e.jsx("span",{className:"value",children:s.orderQuantity})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"label",children:"Total (Entrusted)"}),e.jsxs("span",{className:"value total",children:[i(s.entrustedValue)," USDT"]})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"label",children:"Transaction Quantity"}),e.jsx("span",{className:"value",children:s.transactionQuantity??"-"})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"label",children:"Transaction Value"}),e.jsx("span",{className:"value",children:s.transactionValue?i(s.transactionValue):"-"})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"label",children:"Closing Price"}),e.jsx("span",{className:"value",children:s.closingPrice?i(s.closingPrice,4):"-"})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"label",children:"Handling Fee"}),e.jsx("span",{className:"value",children:s.handlingFee?i(s.handlingFee,4):"-"})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"label",children:"Closing Time"}),e.jsx("span",{className:"value",children:s.closingTime?new Date(s.closingTime).toLocaleString():"-"})]})]}),e.jsx("div",{className:"order-card-footer",children:e.jsx("span",{className:"status-badge",style:{color:m(s.status)},children:s.status})})]},s.id)):e.jsxs("div",{className:"no-orders",children:[e.jsx("i",{className:"fas fa-clipboard-list"}),e.jsx("p",{children:"No orders found"}),e.jsx("span",{children:"Try adjusting your filters or search term"})]})}),e.jsx("style",{children:`
        .orders-page {
          background-color: #000000;
          color: #FFFFFF;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          padding: 16px;
          padding-bottom: 80px;
        }

        .orders-header {
          margin-bottom: 20px;
        }

        .orders-header h1 {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 4px;
        }

        .orders-header p {
          color: #AAAAAA;
          font-size: 14px;
        }

        .search-box {
          display: flex;
          align-items: center;
          background-color: #1A1A1A;
          border-radius: 10px;
          padding: 12px 16px;
          margin-bottom: 16px;
        }

        .search-box i {
          color: #AAAAAA;
          margin-right: 12px;
          font-size: 16px;
        }

        .search-box input {
          background: none;
          border: none;
          color: #FFFFFF;
          font-size: 16px;
          width: 100%;
          outline: none;
        }

        .filters-container {
          margin-bottom: 20px;
          position: relative;
        }

        .filters-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #1A1A1A;
          padding: 14px 16px;
          border-radius: 10px;
          cursor: pointer;
        }

        .filters-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background-color: #2A2A2A;
          border-radius: 0 0 10px 10px;
          z-index: 10;
          overflow: hidden;
        }

        .filters-menu button {
          display: block;
          width: 100%;
          padding: 14px 16px;
          background: none;
          border: none;
          color: #FFFFFF;
          font-size: 16px;
          text-align: left;
          cursor: pointer;
          border-bottom: 1px solid #3A3A3A;
        }

        .filters-menu button:last-child {
          border-bottom: none;
        }

        .filters-menu button.active {
          color: #F3BA2F;
          background-color: rgba(243, 186, 47, 0.1);
        }

        .orders-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .order-card {
          background-color: #1A1A1A;
          border-radius: 12px;
          padding: 16px;
        }

        .order-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .pair-action {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .pair {
          font-size: 18px;
          font-weight: bold;
        }

        .action-badge {
          font-size: 14px;
          font-weight: bold;
          padding: 4px 8px;
          border-radius: 4px;
          background-color: rgba(0, 192, 118, 0.1);
          align-self: flex-start;
        }

        .action-badge[style*="color: #FF6838"] {
          background-color: rgba(255, 104, 56, 0.1);
        }

        .date-time {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
        }

        .date {
          font-size: 14px;
          font-weight: 500;
        }

        .time {
          font-size: 12px;
          color: #AAAAAA;
        }

        .order-details {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 16px;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .label {
          font-size: 14px;
          color: #AAAAAA;
        }

        .value {
          font-size: 14px;
          font-weight: 500;
        }

        .value.total {
          font-weight: bold;
          color: #F3BA2F;
        }

        .filled-container {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .filled-percent {
          font-size: 14px;
          color: #F3BA2F;
          min-width: 35px;
        }

        .progress-bar {
          width: 80px;
          height: 6px;
          background-color: #2A2A2A;
          border-radius: 3px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background-color: #F3BA2F;
          border-radius: 3px;
          transition: width 0.3s ease;
        }

        .order-card-footer {
          display: flex;
          justify-content: flex-end;
        }

        .status-badge {
          font-size: 14px;
          font-weight: bold;
          padding: 6px 12px;
          border-radius: 6px;
          background-color: rgba(0, 192, 118, 0.1);
        }

        .status-badge[style*="color: #F3BA2F"] {
          background-color: rgba(243, 186, 47, 0.1);
        }

        .status-badge[style*="color: #FF6838"] {
          background-color: rgba(255, 104, 56, 0.1);
        }

        .status-badge[style*="color: #AAAAAA"] {
          background-color: rgba(170, 170, 170, 0.1);
        }

        .no-orders {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          text-align: center;
          color: #AAAAAA;
        }

        .no-orders i {
          font-size: 48px;
          margin-bottom: 16px;
          color: #2A2A2A;
        }

        .no-orders p {
          font-size: 18px;
          margin-bottom: 8px;
          color: #FFFFFF;
        }

        .no-orders span {
          font-size: 14px;
        }

        /* Responsive adjustments */
        @media (max-width: 360px) {
          .order-card-header {
            flex-direction: column;
            gap: 8px;
          }
          
          .date-time {
            align-items: flex-start;
          }
        }
      `})]})}export{T as default};
