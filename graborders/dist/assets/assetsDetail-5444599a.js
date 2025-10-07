import{w as v,z as D,u as p,A as b,r as x,B as T,C as S,j as t,L as A}from"./index-83554c6f.js";import{S as E}from"./SubHeader-6f0d27e6.js";import{u as z}from"./useDispatch-3b8e0c73.js";const g=r=>r.assets.view,_=v([g],r=>r.record),B=v([g],r=>!!r.loading),F={selectLoading:B,selectRecord:_,selectRaw:g};function $(){const{id:r}=D(),m=z(),n=p(F.selectRecord),j=p(b.selectRows),y=p(F.selectLoading),C=p(b.selectLoading),h=y||C,[k,c]=x.useState(!1),[a,l]=x.useState({status:"all",type:"all",direction:"all",startDate:"",endDate:""});x.useEffect(()=>{Promise.all([m(T.doFind(r)),m(S.doFetch(r))])},[m,r]);const d=j.filter(o=>!(a.status!=="all"&&o.status!==a.status||a.type!=="all"&&o.type!==a.type||a.direction!=="all"&&o.direction!==a.direction||a.startDate&&new Date(o.dateTransaction)<new Date(a.startDate)||a.endDate&&new Date(o.dateTransaction)>new Date(a.endDate))),w=o=>{const i=new Date(o),s=new Date,e=i.toDateString()===s.toDateString(),u=new Date(s.setDate(s.getDate()-1)).toDateString()===i.toDateString();return e?`Today, ${i.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}`:u?`Yesterday, ${i.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}`:i.toLocaleDateString([],{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})},f=(o,i,s)=>{const e={icon:"fa-exchange-alt",typeText:"Transaction",iconClass:"swap",color:"#627EEA",amountColor:i==="in"?"#2ff378":"#FF6838"};switch(o){case"deposit":e.icon="fa-arrow-down",e.typeText="Deposit",e.iconClass="deposit",e.color="#F3BA2F",e.amountColor="#2ff378";break;case"withdraw":e.icon="fa-arrow-up",e.typeText="Withdrawal",e.iconClass="withdraw",e.color="#FF6838",e.amountColor="#FF6838";break;case"convert_in":e.icon="fa-exchange-alt",e.typeText=s?`Converted from ${s}`:"Conversion In",e.iconClass="convert-in",e.color="#9C27B0",e.amountColor="#2ff378";break;case"convert_out":e.icon="fa-exchange-alt",e.typeText=s?`Converted to ${s}`:"Conversion Out",e.iconClass="convert-out",e.color="#9C27B0",e.amountColor="#FF6838";break;case"stacking":e.icon="fa-lock",e.typeText="Stacking Reward",e.iconClass="stacking",e.color="#4CAF50",e.amountColor="#2ff378";break;case"futures_profit":e.icon="fa-chart-line",e.typeText="Futures Profit",e.iconClass="futures-profit",e.color="#00BCD4",e.amountColor="#2ff378";break;case"futures_loss":e.icon="fa-chart-line",e.typeText="Futures Loss",e.iconClass="futures-loss",e.color="#FF5722",e.amountColor="#FF6838";break;case"spot_profit":e.icon="fa-coins",e.typeText="Spot Trading Profit",e.iconClass="spot-profit",e.color="#4CAF50",e.amountColor="#2ff378";break;case"spot_loss":e.icon="fa-coins",e.typeText="Spot Trading Loss",e.iconClass="spot-loss",e.color="#FF5722",e.amountColor="#FF6838";break;case"reward":e.icon="fa-hand-holding-dollar",e.typeText="Referral Reward",e.iconClass="spot-profit",e.color="#63f211ff",e.amountColor="#5ffc1bff";break;case"order_reserved":e.icon="fa-clock",e.typeText="Order Reserved",e.iconClass="order-reserved",e.color="#FF9800",e.amountColor="#FF9800";break;case"order_cancelled":e.icon="fa-ban",e.typeText="Order Cancelled",e.iconClass="order-cancelled",e.color="#9E9E9E",e.amountColor="#9E9E9E";break;default:e.icon="fa-exchange-alt",e.typeText="Transaction",e.iconClass="default",e.color="#627EEA",e.amountColor="#627EEA"}return e},N=()=>{l({status:"all",type:"all",direction:"all",startDate:"",endDate:""})};return t.jsxs("div",{className:"container",children:[t.jsx(E,{title:"Detail"}),h?t.jsxs("div",{className:"asset-card-placeholder",children:[t.jsx("div",{className:"shimmer-circle"}),t.jsx("div",{className:"shimmer-line medium"}),t.jsx("div",{className:"shimmer-line large"})]}):t.jsxs("div",{className:"asset-card",children:[t.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${n==null?void 0:n.symbol}.png`,style:{width:60,height:60},alt:n==null?void 0:n.symbol,loading:"lazy"}),t.jsx("div",{className:"asset-name",children:n==null?void 0:n.coinName}),t.jsxs("div",{className:"asset-amount",children:[n==null?void 0:n.amount.toFixed(8)," ",n==null?void 0:n.symbol]})]}),t.jsxs("div",{className:"transaction-history",children:[t.jsxs("div",{className:"section-header",children:[t.jsx("div",{className:"section-title",children:"Transaction History"}),t.jsxs("div",{className:"filter-button",onClick:()=>c(!0),children:[t.jsx("i",{className:"fas fa-filter"}),"Filter"]})]}),t.jsx("div",{className:"transaction-list",children:h?Array.from({length:5}).map((o,i)=>t.jsxs("div",{className:"transaction-item-placeholder",children:[t.jsxs("div",{className:"transaction-info-placeholder",children:[t.jsx("div",{className:"shimmer-circle"}),t.jsxs("div",{className:"transaction-details-placeholder",children:[t.jsx("div",{className:"shimmer-line medium"}),t.jsx("div",{className:"shimmer-line small"})]})]}),t.jsxs("div",{className:"transaction-amount-placeholder",children:[t.jsx("div",{className:"shimmer-line medium"}),t.jsx("div",{className:"shimmer-line small"})]})]},i)):(d==null?void 0:d.length)>0?d.map(o=>{const{icon:i,typeText:s,iconClass:e,amountColor:u}=f(o.type,o.direction,o.relatedAsset);return t.jsxs("div",{className:"transaction-item",children:[t.jsxs("div",{className:"transaction-info",children:[t.jsx("div",{className:`transaction-icon ${e}`,style:{backgroundColor:f(o.type,o.direction,o.relatedAsset).color},children:t.jsx("i",{className:`fas ${i}`})}),t.jsxs("div",{className:"transaction-details",children:[t.jsx("div",{className:"transaction-type",children:s}),t.jsx("div",{className:"transaction-date",children:w(o.dateTransaction)})]})]}),t.jsxs("div",{className:"transaction-amount",children:[t.jsxs("div",{className:"transaction-value",style:{color:u},children:[o.direction==="in"?"+":"-",o.amount.toFixed(5)," ",o.asset]}),t.jsx("div",{className:`transaction-status ${o.status==="pending"?"pending":o.status==="canceled"?"canceled":""}`,children:o.status.charAt(0).toUpperCase()+o.status.slice(1)})]})]},o._id)}):t.jsxs("div",{className:"no-transactions-container",children:[t.jsx("div",{className:"no-transactions-icon",children:t.jsx("i",{className:"fas fa-file-invoice-dollar"})}),t.jsx("h3",{children:"No Transactions Yet"}),t.jsx("p",{children:"Your transaction history will appear here once you start trading."})]})})]}),k&&t.jsx("div",{className:"modal-backdrop",onClick:()=>c(!1),children:t.jsxs("div",{className:"modal-content",onClick:o=>o.stopPropagation(),children:[t.jsxs("div",{className:"modal-header",children:[t.jsx("h3",{children:"Filter Transactions"}),t.jsx("span",{className:"close",onClick:()=>c(!1),children:"×"})]}),t.jsxs("div",{className:"modal-body",children:[t.jsxs("div",{className:"filter-group",children:[t.jsx("label",{children:"Status"}),t.jsxs("select",{value:a.status,onChange:o=>l({...a,status:o.target.value}),children:[t.jsx("option",{value:"all",children:"All Statuses"}),t.jsx("option",{value:"completed",children:"Completed"}),t.jsx("option",{value:"pending",children:"Pending"}),t.jsx("option",{value:"canceled",children:"Canceled"})]})]}),t.jsxs("div",{className:"filter-group",children:[t.jsx("label",{children:"Type"}),t.jsxs("select",{value:a.type,onChange:o=>l({...a,type:o.target.value}),children:[t.jsx("option",{value:"all",children:"All Types"}),t.jsx("option",{value:"deposit",children:"Deposit"}),t.jsx("option",{value:"withdraw",children:"Withdrawal"}),t.jsx("option",{value:"convert_in",children:"Conversion In"}),t.jsx("option",{value:"convert_out",children:"Conversion Out"}),t.jsx("option",{value:"stacking",children:"Stacking"}),t.jsx("option",{value:"futures_profit",children:"Futures Profit"}),t.jsx("option",{value:"futures_loss",children:"Futures Loss"}),t.jsx("option",{value:"spot_profit",children:"Spot Profit"}),t.jsx("option",{value:"spot_loss",children:"Spot Loss"})]})]}),t.jsxs("div",{className:"filter-group",children:[t.jsx("label",{children:"Direction"}),t.jsxs("select",{value:a.direction,onChange:o=>l({...a,direction:o.target.value}),children:[t.jsx("option",{value:"all",children:"Both Directions"}),t.jsx("option",{value:"in",children:"Incoming"}),t.jsx("option",{value:"out",children:"Outgoing"})]})]}),t.jsxs("div",{className:"filter-group",children:[t.jsx("label",{children:"Start Date"}),t.jsx("input",{type:"date",value:a.startDate,onChange:o=>l({...a,startDate:o.target.value})})]}),t.jsxs("div",{className:"filter-group",children:[t.jsx("label",{children:"End Date"}),t.jsx("input",{type:"date",value:a.endDate,onChange:o=>l({...a,endDate:o.target.value})})]})]}),t.jsxs("div",{className:"modal-footer",children:[t.jsx("button",{className:"btn-secondary",onClick:N,children:"Reset Filters"}),t.jsx("button",{className:"btn-primary",onClick:()=>c(!1),children:"Apply Filters"})]})]})}),t.jsxs("div",{className:"action-buttons",children:[t.jsx(A,{to:"/deposit",className:"action-button deposit-button remove_blue",children:"Deposit"}),t.jsx(A,{to:"/withdraw",className:"action-button withdraw-button remove_blue",children:"Withdraw"})]}),t.jsx("style",{children:`
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
            `})]})}export{$ as default};
