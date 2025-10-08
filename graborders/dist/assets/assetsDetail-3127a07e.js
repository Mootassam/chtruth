import{x as A,A as T,u as p,B as b,r as x,D,E as _,j as o,L as F}from"./index-9272ea36.js";import{S as E}from"./SubHeader-5c5f9af7.js";import{u as S}from"./useDispatch-729df1b9.js";const f=i=>i.assets.view,B=A([f],i=>i.record),z=A([f],i=>!!i.loading),C={selectLoading:z,selectRecord:B,selectRaw:f};function O(){const{id:i}=T(),u=S(),n=p(C.selectRecord),y=p(b.selectRows),v=p(C.selectLoading),j=p(b.selectLoading),h=v||j,[k,l]=x.useState(!1),[a,c]=x.useState({status:"all",type:"all",direction:"all",startDate:"",endDate:""});x.useEffect(()=>{Promise.all([u(D.doFind(i)),u(_.doFetch(i))])},[u,i]);const d=y.filter(t=>!(a.status!=="all"&&t.status!==a.status||a.type!=="all"&&t.type!==a.type||a.direction!=="all"&&t.direction!==a.direction||a.startDate&&new Date(t.dateTransaction)<new Date(a.startDate)||a.endDate&&new Date(t.dateTransaction)>new Date(a.endDate))),w=t=>{const s=new Date(t),r=new Date,e=s.toDateString()===r.toDateString(),m=new Date(r.setDate(r.getDate()-1)).toDateString()===s.toDateString();return e?`Today, ${s.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}`:m?`Yesterday, ${s.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}`:s.toLocaleDateString([],{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})},g=(t,s,r)=>{const e={icon:"fa-exchange-alt",typeText:"Transaction",iconClass:"swap",color:"#627EEA",amountColor:s==="in"?"#2ff378":"#FF6838"};switch(t){case"deposit":e.icon="fa-arrow-down",e.typeText="Deposit",e.iconClass="deposit",e.color="#F3BA2F",e.amountColor="#2ff378";break;case"withdraw":e.icon="fa-arrow-up",e.typeText="Withdrawal",e.iconClass="withdraw",e.color="#FF6838",e.amountColor="#FF6838";break;case"convert_in":e.icon="fa-exchange-alt",e.typeText=r?`Converted from ${r}`:"Conversion In",e.iconClass="convert-in",e.color="#9C27B0",e.amountColor="#2ff378";break;case"convert_out":e.icon="fa-exchange-alt",e.typeText=r?`Converted to ${r}`:"Conversion Out",e.iconClass="convert-out",e.color="#9C27B0",e.amountColor="#FF6838";break;case"stacking":e.icon="fa-lock",e.typeText="Stacking Reward",e.iconClass="stacking",e.color="#4CAF50",e.amountColor="#2ff378";break;case"futures_reserved":e.icon="fa-lock",e.typeText="Futures Reserved",e.iconClass="futures-reserved",e.color="#FF9800",e.amountColor="#FF9800";break;case"futures_profit":e.icon="fa-chart-line",e.typeText="Futures Profit",e.iconClass="futures-profit",e.color="#00C076",e.amountColor="#00C076";break;case"futures_loss":e.icon="fa-chart-line",e.typeText="Futures Loss",e.iconClass="futures-loss",e.color="#FF6838",e.amountColor="#FF6838";break;case"futures_settlement":e.icon="fa-file-contract",e.typeText="Futures Settlement",e.iconClass="futures-settlement",e.color="#9C27B0",e.amountColor="#9C27B0";break;case"futures_fee":e.icon="fa-receipt",e.typeText="Futures Fee",e.iconClass="futures-fee",e.color="#607D8B",e.amountColor="#607D8B";break;case"futures_refund":e.icon="fa-undo",e.typeText="Futures Refund",e.iconClass="futures-refund",e.color="#4CAF50",e.amountColor="#4CAF50";break;case"futures_bonus":e.icon="fa-gift",e.typeText="Futures Bonus",e.iconClass="futures-bonus",e.color="#E91E63",e.amountColor="#E91E63";break;case"futures_commission":e.icon="fa-handshake",e.typeText="Futures Commission",e.iconClass="futures-commission",e.color="#795548",e.amountColor="#795548";break;case"manual_profit":e.icon="fa-user-check",e.typeText="Manual Profit",e.iconClass="manual-profit",e.color="#00C076",e.amountColor="#00C076";break;case"manual_loss":e.icon="fa-user-slash",e.typeText="Manual Loss",e.iconClass="manual-loss",e.color="#FF6838",e.amountColor="#FF6838";break;case"manual_adjustment":e.icon="fa-cog",e.typeText="Manual Adjustment",e.iconClass="manual-adjustment",e.color="#9C27B0",e.amountColor="#9C27B0";break;case"spot_profit":e.icon="fa-coins",e.typeText="Spot Trading Profit",e.iconClass="spot-profit",e.color="#4CAF50",e.amountColor="#2ff378";break;case"spot_loss":e.icon="fa-coins",e.typeText="Spot Trading Loss",e.iconClass="spot-loss",e.color="#FF5722",e.amountColor="#FF6838";break;case"reward":e.icon="fa-hand-holding-dollar",e.typeText="Referral Reward",e.iconClass="spot-profit",e.color="#63f211ff",e.amountColor="#5ffc1bff";break;case"bonus":e.icon="fa-gift",e.typeText="Bonus",e.iconClass="bonus",e.color="#E91E63",e.amountColor="#E91E63";break;case"referral_commission":e.icon="fa-users",e.typeText="Referral Commission",e.iconClass="referral-commission",e.color="#FF9800",e.amountColor="#FF9800";break;case"order_reserved":e.icon="fa-clock",e.typeText="Order Reserved",e.iconClass="order-reserved",e.color="#FF9800",e.amountColor="#FF9800";break;case"order_cancelled":e.icon="fa-ban",e.typeText="Order Cancelled",e.iconClass="order-cancelled",e.color="#9E9E9E",e.amountColor="#9E9E9E";break;case"order_partial_fill":e.icon="fa-chart-pie",e.typeText="Order Partial Fill",e.iconClass="order-partial",e.color="#FF9800",e.amountColor="#FF9800";break;case"order_completed":e.icon="fa-check-circle",e.typeText="Order Completed",e.iconClass="order-completed",e.color="#4CAF50",e.amountColor="#4CAF50";break;case"fee_payment":e.icon="fa-receipt",e.typeText="Fee Payment",e.iconClass="fee-payment",e.color="#607D8B",e.amountColor="#607D8B";break;case"adjustment":e.icon="fa-sliders-h",e.typeText="Balance Adjustment",e.iconClass="adjustment",e.color="#9C27B0",e.amountColor="#9C27B0";break;case"transfer":e.icon="fa-exchange-alt",e.typeText="Transfer",e.iconClass="transfer",e.color="#2196F3",e.amountColor="#2196F3";break;default:e.icon="fa-exchange-alt",e.typeText="Transaction",e.iconClass="default",e.color="#627EEA",e.amountColor="#627EEA"}return e},N=()=>{c({status:"all",type:"all",direction:"all",startDate:"",endDate:""})};return o.jsxs("div",{className:"container",children:[o.jsx(E,{title:"Detail"}),h?o.jsxs("div",{className:"asset-card-placeholder",children:[o.jsx("div",{className:"shimmer-circle"}),o.jsx("div",{className:"shimmer-line medium"}),o.jsx("div",{className:"shimmer-line large"})]}):o.jsxs("div",{className:"asset-card",children:[o.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${n==null?void 0:n.symbol}.png`,style:{width:60,height:60},alt:n==null?void 0:n.symbol,loading:"lazy"}),o.jsx("div",{className:"asset-name",children:n==null?void 0:n.coinName}),o.jsxs("div",{className:"asset-amount",children:[n==null?void 0:n.amount.toFixed(8)," ",n==null?void 0:n.symbol]})]}),o.jsxs("div",{className:"transaction-history",children:[o.jsxs("div",{className:"section-header",children:[o.jsx("div",{className:"section-title",children:"Transaction History"}),o.jsxs("div",{className:"filter-button",onClick:()=>l(!0),children:[o.jsx("i",{className:"fas fa-filter"}),"Filter"]})]}),o.jsx("div",{className:"transaction-list",children:h?Array.from({length:5}).map((t,s)=>o.jsxs("div",{className:"transaction-item-placeholder",children:[o.jsxs("div",{className:"transaction-info-placeholder",children:[o.jsx("div",{className:"shimmer-circle"}),o.jsxs("div",{className:"transaction-details-placeholder",children:[o.jsx("div",{className:"shimmer-line medium"}),o.jsx("div",{className:"shimmer-line small"})]})]}),o.jsxs("div",{className:"transaction-amount-placeholder",children:[o.jsx("div",{className:"shimmer-line medium"}),o.jsx("div",{className:"shimmer-line small"})]})]},s)):(d==null?void 0:d.length)>0?d.map(t=>{const{icon:s,typeText:r,iconClass:e,amountColor:m}=g(t.type,t.direction,t.relatedAsset);return o.jsxs("div",{className:"transaction-item",children:[o.jsxs("div",{className:"transaction-info",children:[o.jsx("div",{className:`transaction-icon ${e}`,style:{backgroundColor:g(t.type,t.direction,t.relatedAsset).color},children:o.jsx("i",{className:`fas ${s}`})}),o.jsxs("div",{className:"transaction-details",children:[o.jsx("div",{className:"transaction-type",children:r}),o.jsx("div",{className:"transaction-date",children:w(t.dateTransaction)})]})]}),o.jsxs("div",{className:"transaction-amount",children:[o.jsxs("div",{className:"transaction-value",style:{color:m},children:[t.direction==="in"?"+":"-",t.amount.toFixed(5)," ",t.asset]}),o.jsx("div",{className:`transaction-status ${t.status==="pending"?"pending":t.status==="canceled"?"canceled":""}`,children:t.status.charAt(0).toUpperCase()+t.status.slice(1)})]})]},t._id)}):o.jsxs("div",{className:"no-transactions-container",children:[o.jsx("div",{className:"no-transactions-icon",children:o.jsx("i",{className:"fas fa-file-invoice-dollar"})}),o.jsx("h3",{children:"No Transactions Yet"}),o.jsx("p",{children:"Your transaction history will appear here once you start trading."})]})})]}),k&&o.jsx("div",{className:"modal-backdrop",onClick:()=>l(!1),children:o.jsxs("div",{className:"modal-content",onClick:t=>t.stopPropagation(),children:[o.jsxs("div",{className:"modal-header",children:[o.jsx("h3",{children:"Filter Transactions"}),o.jsx("span",{className:"close",onClick:()=>l(!1),children:"×"})]}),o.jsxs("div",{className:"modal-body",children:[o.jsxs("div",{className:"filter-group",children:[o.jsx("label",{children:"Status"}),o.jsxs("select",{value:a.status,onChange:t=>c({...a,status:t.target.value}),children:[o.jsx("option",{value:"all",children:"All Statuses"}),o.jsx("option",{value:"completed",children:"Completed"}),o.jsx("option",{value:"pending",children:"Pending"}),o.jsx("option",{value:"canceled",children:"Canceled"})]})]}),o.jsxs("div",{className:"filter-group",children:[o.jsx("label",{children:"Type"}),o.jsxs("select",{value:a.type,onChange:t=>c({...a,type:t.target.value}),children:[o.jsx("option",{value:"all",children:"All Types"}),o.jsx("option",{value:"deposit",children:"Deposit"}),o.jsx("option",{value:"withdraw",children:"Withdrawal"}),o.jsx("option",{value:"convert_in",children:"Conversion In"}),o.jsx("option",{value:"convert_out",children:"Conversion Out"}),o.jsx("option",{value:"stacking",children:"Stacking"}),o.jsx("option",{value:"futures_profit",children:"Futures Profit"}),o.jsx("option",{value:"futures_loss",children:"Futures Loss"}),o.jsx("option",{value:"spot_profit",children:"Spot Profit"}),o.jsx("option",{value:"spot_loss",children:"Spot Loss"})]})]}),o.jsxs("div",{className:"filter-group",children:[o.jsx("label",{children:"Direction"}),o.jsxs("select",{value:a.direction,onChange:t=>c({...a,direction:t.target.value}),children:[o.jsx("option",{value:"all",children:"Both Directions"}),o.jsx("option",{value:"in",children:"Incoming"}),o.jsx("option",{value:"out",children:"Outgoing"})]})]}),o.jsxs("div",{className:"filter-group",children:[o.jsx("label",{children:"Start Date"}),o.jsx("input",{type:"date",value:a.startDate,onChange:t=>c({...a,startDate:t.target.value})})]}),o.jsxs("div",{className:"filter-group",children:[o.jsx("label",{children:"End Date"}),o.jsx("input",{type:"date",value:a.endDate,onChange:t=>c({...a,endDate:t.target.value})})]})]}),o.jsxs("div",{className:"modal-footer",children:[o.jsx("button",{className:"btn-secondary",onClick:N,children:"Reset Filters"}),o.jsx("button",{className:"btn-primary",onClick:()=>l(!1),children:"Apply Filters"})]})]})}),o.jsxs("div",{className:"action-buttons",children:[o.jsx(F,{to:"/deposit",className:"action-button deposit-button remove_blue",children:"Deposit"}),o.jsx(F,{to:"/withdraw",className:"action-button withdraw-button remove_blue",children:"Withdraw"})]}),o.jsx("style",{children:`
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

                /* Shimmer animation for loading placeholders */
                @keyframes shimmer {
                    0% { background-position: -468px 0; }
                    100% { background-position: 468px 0; }
                }
                
                .shimmer {
                    animation-duration: 1.5s;
                    animation-fill-mode: forwards;
                    animation-iteration-count: infinite;
                    animation-name: shimmer;
                    animation-timing-function: linear;
                    background: #2A2A2A;
                    background: linear-gradient(to right, #2A2A2A 8%, #333333 18%, #2A2A2A 33%);
                    background-size: 800px 104px;
                    position: relative;
                    border-radius: 4px;
                }
                
                .shimmer-circle {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    margin: 0 auto 15px;
                    background: #2A2A2A;
                    background: linear-gradient(to right, #2A2A2A 8%, #333333 18%, #2A2A2A 33%);
                    background-size: 800px 104px;
                    animation: shimmer 1.5s infinite linear;
                }
                
                .shimmer-line {
                    height: 16px;
                    margin: 8px auto;
                    background: #2A2A2A;
                    background: linear-gradient(to right, #2A2A2A 8%, #333333 18%, #2A2A2A 33%);
                    background-size: 800px 104px;
                    animation: shimmer 1.5s infinite linear;
                    border-radius: 4px;
                }
                
                .shimmer-line.small {
                    width: 60%;
                    height: 12px;
                }
                
                .shimmer-line.medium {
                    width: 70%;
                }
                
                .shimmer-line.large {
                    width: 80%;
                    height: 24px;
                }
                
                .asset-card-placeholder {
                    background: linear-gradient(135deg, #2A2A2A 0%, #1A1A1A 100%);
                    border-radius: 16px;
                    padding: 20px;
                    margin-bottom: 25px;
                    text-align: center;
                }
                
                .transaction-item-placeholder {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 15px;
                    background-color: #1A1A1A;
                    border-radius: 12px;
                }
                
                .transaction-info-placeholder {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                
                .transaction-details-placeholder {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                
                .transaction-amount-placeholder {
                    text-align: right;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                
                /* Enhanced No Transactions State */
                .no-transactions-container {
                    text-align: center;
                    padding: 40px 20px;
                    background: linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%);
                    border-radius: 16px;
                    margin: 20px 0;
                }
                
                .no-transactions-icon {
                    font-size: 60px;
                    color: #F3BA2F;
                    margin-bottom: 20px;
                    animation: pulse 2s infinite;
                }
                
                .no-transactions-container h3 {
                    font-size: 24px;
                    margin-bottom: 10px;
                    color: #FFFFFF;
                }
                
                .no-transactions-container p {
                    color: #AAAAAA;
                    margin-bottom: 30px;
                    line-height: 1.5;
                    max-width: 300px;
                    margin-left: auto;
                    margin-right: auto;
                }
                
                .container {
                    max-width: 400px;
                    margin: 0 auto;
                    position: relative;
                }
                
                .asset-card {
                    background: linear-gradient(135deg, #2A2A2A 0%, #1A1A1A 100%);
                    border-radius: 16px;
                    padding: 20px;
                    margin-bottom: 25px;
                    text-align: center;
                }
                
                .asset-name {
                    font-size: 22px;
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                
                .asset-amount {
                    font-size: 28px;
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                
                .transaction-history {
                    margin-bottom: 80px;
                }
                
                .section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 15px;
                }
                
                .section-title {
                    font-weight: bold;
                    font-size: 18px;
                }
                
                .filter-button {
                    color: #CCCCCC;
                    font-size: 14px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }
                
                .transaction-list {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
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
                }
                
                .transaction-details {
                    display: flex;
                    flex-direction: column;
                }
                
                .transaction-type {
                    font-weight: bold;
                    margin-bottom: 4px;
                }
                
                .transaction-date {
                    color: #AAAAAA;
                    font-size: 12px;
                }
                
                .transaction-amount {
                    text-align: right;
                }
                
                .transaction-value {
                    font-weight: bold;
                    margin-bottom: 4px;
                }
                
                .transaction-status {
                    color: #2ff378;
                    font-size: 12px;
                }
                
                .transaction-status.pending {
                    color: #F3BA2F;
                }

                .transaction-status.canceled {
                    color: #FF6838;
                }
                
                // .action-buttons {
                //     display: flex;
                //     gap: 15px;
                //     position: fixed;
                //     bottom: 20px;
                //     left: 0;
                //     right: 0;
                //     max-width: 400px;
                //     margin: 0 auto;
                //     padding: 0 15px;
                // }
                
                .action-button {
                    flex: 1;
                    padding: 16px;
                    border-radius: 12px;
                    font-weight: bold;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    text-decoration: none;
                    display: block;
                }
                
                .deposit-button {
                    background-color: #F3BA2F;
                    color: #000;
                }
                
                .withdraw-button {
                    background-color: #2A2A2A;
                    color: #FFF;
                    border: 1px solid #444;
                }
                
                .action-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                }
                
                /* Modal Styles */
                .modal-backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.4);
                    backdrop-filter: blur(15px);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
                
                .modal-content {
                    background-color: #1A1A1A;
                    border-radius: 16px;
                    width: 90%;
                    max-width: 400px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
                    overflow: hidden;
                    animation: modal-appear 0.3s ease;
                }
                
                @keyframes modal-appear {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .modal-header {
                    padding: 20px;
                    border-bottom: 1px solid #2A2A2A;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .modal-header h3 {
                    margin: 0;
                    font-size: 18px;
                }
                
                .close {
                    font-size: 24px;
                    cursor: pointer;
                    color: #AAAAAA;
                }
                
                .close:hover {
                    color: #FFF;
                }
                
                .modal-body {
                    padding: 20px;
                }
                
                .filter-group {
                    margin-bottom: 15px;
                }
                
                .filter-group label {
                    display: block;
                    margin-bottom: 5px;
                    color: #CCCCCC;
                    font-size: 14px;
                }
                
                .filter-group select, .filter-group input {
                    width: 100%;
                    padding: 10px;
                    border-radius: 8px;
                    background-color: #2A2A2A;
                    border: 1px solid #444;
                    color: #FFF;
                }
                
                .modal-footer {
                    padding: 20px;
                    border-top: 1px solid #2A2A2A;
                    display: flex;
                    justify-content: space-between;
                    gap: 10px;
                }
                
                .modal-footer button {
                    flex: 1;
                    padding: 12px;
                    border-radius: 8px;
                    font-weight: bold;
                    cursor: pointer;
                    border: none;
                }
                
                .btn-secondary {
                    background-color: #2A2A2A;
                    color: #FFF;
                }
                
                .btn-primary {
                    background-color: #F3BA2F;
                    color: #000;
                }
                
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.05); opacity: 0.8; }
                    100% { transform: scale(1); opacity: 1; }
                }
            `})]})}export{O as default};
