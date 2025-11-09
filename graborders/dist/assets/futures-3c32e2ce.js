import{i as s,y as J,z as je,j as e,R as ye,A as Ae,k as n,u as L,t as de,B as W,v as ue}from"./index-aca44342.js";import{C as ve}from"./CoinListModal-e90cb3b4.js";import{F as we}from"./FuturesChart-1787136e.js";import{u as Fe}from"./useDispatch-08c05b9c.js";const ke=({isOpen:r,onClose:m,direction:c,dispatch:g,listAssets:D,selectedCoin:v,marketPrice:S,availableBalance:i,setOpeningOrders:C})=>{const[w,K]=s.useState("120"),[B,X]=s.useState("20"),[A,x]=s.useState("2"),[l,P]=s.useState(30),[j,b]=s.useState("configuring"),[T,M]=s.useState(0),[q,F]=s.useState(null),[E,R]=s.useState(""),[$,U]=s.useState(null),[te,k]=s.useState(""),[H,G]=s.useState(!1),[f,Q]=s.useState(null),O=(o,d)=>{K(o),X(d)};s.useEffect(()=>(r?document.body.style.overflow="hidden":document.body.style.overflow="unset",()=>{document.body.style.overflow="unset"}),[r]),s.useEffect(()=>{g(J.doFetch())},[g]),s.useEffect(()=>{l<30?R("Minimum amount is 30 USDT"):l>i?R("Insufficient balance"):R("")},[l,i]),s.useEffect(()=>{let o=null;return j==="in-progress"&&(T>0?o=setInterval(()=>{M(d=>d-1)},1e3):(async()=>await oe())()),()=>{o&&clearInterval(o)}},[j,T]);const ie=async()=>{if(!(!c||l<30||l>i)){G(!0);try{const o=await se();if(!o||!o.id){G(!1);return}Q({futuresAmount:l,contractDuration:w,futuresStatus:c==="up"?"long":"short",openPositionPrice:parseFloat(S||"0")||0,closePositionPrice:null,leverage:parseInt(A,10),openPositionTime:new Date,closePositionTime:null}),C(u=>[...u,{id:$,futuresAmount:l,contractDuration:w,futuresStatus:c==="up"?"long":"short",openPositionPrice:parseFloat(S||"0")||0,closePositionPrice:null,leverage:parseInt(A,10),openPositionTime:new Date().toISOString(),closePositionTime:null}]);const d=parseInt(w,10)||0;M(d),b("in-progress")}catch(o){console.error("startTrade error",o)}finally{G(!1)}}},oe=async()=>{if(C([]),!$){F("loss"),k(`-${l.toFixed(2)} USDT`),b("completed");return}try{const o=await g(je.doFind($)),d=o&&o.payload?o.payload:o;if(!d){F("loss"),k(`-${l.toFixed(2)} USDT`),b("completed");return}if(Q({...f,closePositionPrice:d.closePositionPrice,closePositionTime:d.closePositionTime,profitAndLossAmount:d.profitAndLossAmount}),d.control==="profit"){F("win");const u=Number(d.profitAndLossAmount??ne(l,A,B));k(`+${Number.isFinite(u)?u.toFixed(2):"0.00"} USDT`)}else{F("loss");const u=Number(d.futuresAmount??l);k(`-${Number.isFinite(u)?u.toFixed(2):l.toFixed(2)} USDT`)}b("completed"),g(J.doFetchPending())}catch(o){console.error("completeTrade error",o),F("loss"),k(`-${l.toFixed(2)} USDT`),b("completed")}},se=async()=>{const o=parseFloat(S||"0")||0,d={futuresStatus:c==="up"?"long":"short",profitAndLossAmount:"",leverage:parseInt(A,10),control:"loss",operate:"low",futureCoin:v.replace("USDT","/USDT"),closePositionTime:"",closePositionPrice:"",openPositionTime:new Date().toISOString(),openPositionPrice:o,contractDuration:w,futuresAmount:l};try{const u=await g(Ae.doCreate(d)),z=u&&u.id?u:u&&u.payload?u.payload:null;return z&&z.id?(U(z.id),z):(console.warn("Create did not return created record"),null)}catch(u){return console.error("create error",u),null}},re=()=>{b("configuring"),C([]),F(null),M(0),U(null),k(""),Q(null),P(30),X("20"),K("120")},ne=(o,d,u)=>{const z=Number.isFinite(o)?o:0,ee=parseInt(d,10)||0,Y=parseInt(u,10)||0;return z*ee*Y/100},Z=()=>{if(j!=="in-progress")return 0;const o=parseInt(w,10)||1;return(o-T)/o*100},y=o=>{const d=Math.floor(o/60),u=o%60;return`${d.toString().padStart(2,"0")}:${u.toString().padStart(2,"0")}`},V=o=>o?new Date(o).toLocaleTimeString():"-",I=o=>{const d=parseInt(o.target.value,10)||0;P(d)};if(!r)return null;const ae=e.jsxs("div",{className:"modal-overlay",onClick:m,children:[e.jsxs("div",{className:`modal-container ${c==="up"?"up-theme":"down-theme"}`,onClick:o=>o.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{className:"pair-info",children:[e.jsx("div",{className:"pair-icon",children:e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${v.split("USDT")[0]}.png`,style:{width:30,height:30},alt:v,loading:"lazy"})}),e.jsx("div",{className:"pair-name",children:v.replace("USDT","/USDT")})]}),e.jsx("button",{className:"close-btn",onClick:m,children:"×"})]}),j!=="configuring"&&e.jsxs("div",{className:"trade-progress-section",children:[e.jsx("div",{className:"progress-container",children:e.jsx("div",{className:"circular-progress",style:{background:`conic-gradient(${c==="up"?"#00C076":"#FF6838"} ${Z()}%, #3a3a3a ${Z()}%)`},children:e.jsxs("div",{className:"progress-inner",children:[e.jsx("div",{className:"progress-time",children:y(T)}),e.jsx("div",{className:"progress-label",children:"Remaining"})]})})}),f&&e.jsxs("div",{className:"trade-details",children:[e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Futures Amount:"}),e.jsxs("span",{children:[f.futuresAmount," USDT"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Contract Duration:"}),e.jsxs("span",{children:[f.contractDuration,"s"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Future Type:"}),e.jsx("span",{className:f.futuresStatus==="long"?"up-text":"down-text",children:f.futuresStatus.toUpperCase()})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Open Position Price:"}),e.jsxs("span",{children:[f.openPositionPrice.toFixed(4)," USDT"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Close Position Price:"}),e.jsxs("span",{children:[f.closePositionPrice?f.closePositionPrice.toFixed(4):"-"," USDT"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Leverage:"}),e.jsxs("span",{children:[f.leverage,"x"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Open Time:"}),e.jsx("span",{children:V(f.openPositionTime)})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Close Time:"}),e.jsx("span",{children:V(f.closePositionTime)})]})]}),e.jsxs("div",{className:"trade-actions",children:[j==="in-progress"&&e.jsx("button",{className:"trade-action-btn keep-buying",onClick:m,children:"Keep Buying"}),j==="completed"&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"trade-action-btn secondary",onClick:m,children:"Close"}),e.jsx("button",{className:"trade-action-btn primary",onClick:re,children:"New Trade"})]})]})]}),j==="configuring"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:`direction-indicator ${c}-indicator`,children:c==="up"?"Predicting price will go UP":"Predicting price will go DOWN"}),e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"section",children:[e.jsxs("div",{className:"section-title",children:[e.jsx("span",{children:"Contract Duration"}),e.jsx("span",{children:"Payout"})]}),e.jsx("div",{className:"options-container",children:[{duration:"60",payout:"10"},{duration:"120",payout:"20"},{duration:"180",payout:"40"},{duration:"240",payout:"80"}].map(o=>e.jsxs("button",{className:`option-btn ${w===o.duration?"selected":""}`,onClick:()=>O(o.duration,o.payout),children:[o.duration,"s (",o.payout,"%)"]},o.duration))})]}),e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"section-title",children:e.jsx("span",{children:"Leverage"})}),e.jsx("div",{className:"options-container",children:["1","2","5","10","20"].map(o=>e.jsxs("button",{className:`option-btn ${A===o?"selected":""}`,onClick:()=>x(o),children:[o,"×"]},o))})]}),e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"section-title",children:e.jsx("span",{children:"Futures Amount (USDT)"})}),e.jsxs("div",{className:"amount-control",children:[e.jsx("button",{className:"amount-btn",onClick:()=>P(o=>Math.max(1,o-1)),children:"-"}),e.jsx("input",{type:"number",className:"amount-inputs",value:l,onChange:I,min:"1",placeholder:"Enter amount"}),e.jsx("button",{className:"amount-btn",onClick:()=>P(o=>o+1),children:"+"})]}),e.jsxs("div",{className:"balance-info",children:["Available: ",i," USDT"]}),E&&e.jsx("div",{className:"error-message",style:{color:"#FF6838",fontSize:"12px",marginTop:"5px"},children:E})]}),e.jsxs("div",{className:"profit-info",children:["Projected Profit: ",ne(l,A,B).toFixed(2)," USDT"]}),e.jsx("button",{className:"confirm-btn",onClick:ie,disabled:!c||l<30||l>i||H,style:{opacity:!c||l<30||l>i?.5:1,cursor:!c||l<30||l>i?"not-allowed":"pointer"},children:H?"CREATING...":l>i?"INSUFFICIENT BALANCE":"CONFIRM ORDER"})]})]})]}),e.jsx("style",{children:` 
  .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 100000;
      padding: 20px;
  }

  .modal-container {
      background-color: #2a2a2a;
      border-radius: 12px;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
      overflow: hidden;
      max-height: 90vh;
      overflow-y: auto;
  }

  .up-theme {
      border-top: 4px solid #00C076;
  }

  .down-theme {
      border-top: 4px solid #FF6838;
  }

  /* Header Section */
  .modal-header {
      background-color: #1a1a1a;
      padding: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #3a3a3a;
  }

  .pair-info {
      display: flex;
      align-items: center;
      gap: 10px;
  }

  .pair-icon {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #F3BA2F;
      display: flex;
      justify-content: center;
      align-items: center;
  }

  .pair-icon i {
      color: #000;
      font-size: 16px;
  }

  .pair-name {
      font-weight: bold;
      font-size: 18px;
  }

  .close-btn {
      background: none;
      border: none;
      color: #AAAAAA;
      font-size: 20px;
      cursor: pointer;
      padding: 5px;
  }

  .close-btn:hover {
      color: #FFFFFF;
  }

  /* Direction Indicator */
  .direction-indicator {
      padding: 10px 15px;
      text-align: center;
      font-weight: bold;
      font-size: 16px;
  }

  .up-indicator {
      background-color: rgba(0, 192, 118, 0.2);
      color: #00C076;
  }

  .down-indicator {
      background-color: rgba(255, 104, 56, 0.2);
      color: #FF6838;
  }

  /* Modal Content */
  .modal-content {
      padding: 15px;
  }

  .section {
      margin-bottom: 20px;
  }

  .section-title {
      font-size: 14px;
      color: #AAAAAA;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
  }

  .options-container {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
  }

  .option-btn {
      background-color: #3a3a3a;
      border: 1px solid #4a4a4a;
      border-radius: 6px;
      padding: 8px 12px;
      color: #FFFFFF;
      font-size: 14px;
      cursor: pointer;
      flex: 1;
      min-width: 70px;
      text-align: center;
      transition: all 0.2s;
  }

  .option-btn:hover {
      background-color: #4a4a4a;
  }

  .option-btn.selected {
      background-color: #00C076;
      border-color: #00C076;
      color: #000;
      font-weight: bold;
  }

  .down-theme .option-btn.selected {
      background-color: #FF6838;
      border-color: #FF6838;
  }

  .amount-control {
      display: flex;
      align-items: center;
      background-color: #3a3a3a;
      border-radius: 6px;
      padding: 5px;
      margin-top: 10px;
  }

  .amount-btn {
      background: none;
      border: none;
      color: #AAAAAA;
      font-size: 20px;
      width: 40px;
      height: 40px;
      cursor: pointer;
      border-radius: 5px;
  }

  .amount-btn:hover {
      background-color: #4a4a4a;
      color: #FFFFFF;
  }

  .amount-inputs {
      flex: 1;
      background: none;
      border: none;
      color: #FFFFFF;
      font-size: 16px;
      text-align: center;
      padding: 10px 0;
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
  }

  input[type="number"] {
      -moz-appearance: textfield;
  }

  .balance-info {
      font-size: 14px;
      color: #AAAAAA;
      text-align: right;
      margin-top: 5px;
  }

  .profit-info {
      text-align: center;
      font-size: 14px;
      color: #AAAAAA;
      margin: 20px 0;
  }

  .confirm-btn {
      background-color: #00C076;
      color: white;
      display: block;
      width: 100%;
      padding: 15px;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s;
  }

  .confirm-btn:hover:not(:disabled) {
      background-color: #00a466;
  }

  .confirm-btn:disabled {
      background-color: #3a3a3a;
      color: #777;
      cursor: not-allowed;
  }

  .down-theme .confirm-btn {
      background-color: #FF6838;
  }

  .down-theme .confirm-btn:hover:not(:disabled) {
      background-color: #e55a2b;
  }
      
  /* Trade Progress Section */
  .trade-progress-section {
      padding: 20px;
      text-align: center;
  }

  .progress-container {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
  }

  .circular-progress {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 1s linear;
  }

  .progress-inner {
      width: 130px;
      height: 130px;
      border-radius: 50%;
      background-color: #2a2a2a;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
  }

  .progress-time {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 5px;
  }

  .progress-label {
      font-size: 12px;
      color: #AAAAAA;
  }

  /* Trade Details */
  .trade-details {
      background-color: #1e1e1e;
      border-radius: 8px;
      padding: 15px;
      margin: 15px 0;
      text-align: left;
      display:flex;
      flex-direction:column
  }

  .trade-details-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      font-size: 14px;
  }

  .trade-details-row:last-child {
      margin-bottom: 0;
  }

  .trade-details-row span:first-child {
      color: #AAAAAA;
  }

  .trade-details-row span:last-child {
      color: #FFFFFF;
      font-weight: 500;
  }

  .up-text {
      color: #00C076 !important;
  }

  .down-text {
      color: #FF6838 !important;
  }

  .trade-result {
      font-size: 16px;
      font-weight: bold;
      margin: 15px 0;
      padding: 10px;
      border-radius: 6px;
  }

  .trade-result.win {
      background-color: rgba(0, 192, 118, 0.2);
      color: #00C076;
  }

  .trade-result.loss {
      background-color: rgba(255, 104, 56, 0.2);
      color: #FF6838;
  }

  .trade-actions {
      display: flex;
      gap: 10px;
      justify-content: center;
      margin-top: 20px;
  }

  .trade-action-btn {
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s;
  }

  .trade-action-btn.primary {
      background-color: #F3BA2F;
      color: #000;
  }

  .trade-action-btn.primary:hover {
      background-color: #e4ab25;
  }

  .trade-action-btn.secondary {
      background-color: #3a3a3a;
      color: #FFFFFF;
  }

  .trade-action-btn.secondary:hover {
      background-color: #4a4a4a;
  }

  .trade-action-btn.keep-buying {
      background-color: #00C076;
      color: white;
  }

  .trade-action-btn.keep-buying:hover {
      background-color: #00a466;
  }

  .down-theme .trade-action-btn.keep-buying {
      background-color: #FF6838;
  }

  .down-theme .trade-action-btn.keep-buying:hover {
      background-color: #e55a2b;
  }
`})]});return ye.createPortal(ae,document.body)};function Ne(r){const{countFutures:m,futuretLoading:c,listFutures:g,handleOpenOrderModal:D,formatNumber:v,formatDateTime:S}=r;return e.jsxs("div",{className:"orders-container",children:[m&&!c&&(g==null?void 0:g.map(i=>{var C;return e.jsxs("div",{className:"order-card",onClick:()=>D(i),children:[e.jsxs("div",{className:"order-header",children:[e.jsx("div",{className:"order-pair",children:i.symbol||"BTC/USDT"}),e.jsx("div",{className:`order-direction ${i.futuresStatus==="long"?"buy":"sell"}`,children:i.futuresStatus==="long"?n("pages.futures.actions.buyUp"):n("pages.futures.actions.buyDown")})]}),e.jsxs("div",{className:`order-status ${i.finalized?"closed":"open"}`,children:["● ",i.finalized?n("pages.futures.orderDetails.closed"):n("pages.futures.orderDetails.open")]}),e.jsxs("div",{className:"order-details",children:[e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:n("pages.futures.orderDetails.futuresAmount")}),e.jsxs("span",{className:"order-value",children:["$",i.futuresAmount]})]}),e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:n("pages.futures.orderDetails.openPositionPrice")}),e.jsx("span",{className:"order-value",children:v((C=i==null?void 0:i.openPositionPrice)==null?void 0:C.toString(),(i==null?void 0:i.openPositionPrice)>1e3?0:2)})]}),e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:n("pages.futures.orderDetails.openPositionTime")}),e.jsx("span",{className:"order-value",children:S(i.openPositionTime)})]}),e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:n("pages.futures.orderDetails.leverage")}),e.jsxs("span",{className:"order-value",children:[i.leverage,"x"]})]})]})]},i.id)})),g.length===0&&!c&&e.jsxs("div",{className:"no-orders",children:[e.jsx("i",{className:"fas fa-file-invoice"}),e.jsx("div",{children:n("pages.futures.list.noOrders")})]}),e.jsx("style",{children:` 
                .order-status {
                    font-size: 12px;
                    margin-bottom: 12px;
                }
                
                .order-status.open {
                    color: #00C076;
                }
                
                .order-status.closed {
                    color: #777;
                }
            `})]})}function ze(){const r=Fe(),m=L(de.selectRows);L(de.selectLoading);const c=L(W.selectRows),g=L(W.pendingRows),D=L(W.pendingcount),v=L(W.pendingLoading),S=L(W.selectLoading),i=L(W.selectCount),[C,w]=s.useState(!1),[K,B]=s.useState(null),[X,A]=s.useState(!1),[x,l]=s.useState("BTCUSDT"),[P,j]=s.useState("0"),[b,T]=s.useState("0"),[M,q]=s.useState("0"),[F,E]=s.useState("0"),[R,$]=s.useState("0"),[U,te]=s.useState("openOrders"),[k,H]=s.useState(null),[G,f]=s.useState(!1),[Q,O]=s.useState(!0),[ie,oe]=s.useState(!0),[se,re]=s.useState(0),[ne,Z]=s.useState([]),y=s.useRef(null),V=s.useRef(x),I=s.useRef(),ae=s.useCallback((t,a=2)=>{if(t==null)return"0.00";const p=typeof t=="string"?parseFloat(t):t;return isNaN(p)?"0.00":p.toFixed(a)},[]),o=s.useCallback((t,a=2)=>{if(t==null)return"0.00";const p=typeof t=="string"?parseFloat(t):t;return isNaN(p)?"0.00":p.toLocaleString(void 0,{minimumFractionDigits:a,maximumFractionDigits:a})},[]),d=s.useCallback(t=>{if(t==null)return"0";const a=typeof t=="string"?parseFloat(t):t;return isNaN(a)?"0":a>=1e9?(a/1e9).toFixed(2)+n("pages.marketDetail.volume.billion"):a>=1e6?(a/1e6).toFixed(2)+n("pages.marketDetail.volume.million"):o(a,0)},[o]),u=s.useCallback(t=>{if(!t)return n("pages.assetsDetail.status.pending");try{const a=new Date(t);if(isNaN(a.getTime()))return t;const p=new Date;return a.toDateString()===p.toDateString()?n("pages.history.dateFormats.today",a.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})):n("pages.history.dateFormats.yesterday",a.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}))}catch(a){return console.error("Error formatting date:",a,t),t}},[]),z=s.useCallback(t=>{if(!t)return n("pages.assetsDetail.status.pending");try{const a=new Date(t);return isNaN(a.getTime())?t:`${a.toLocaleDateString([],{year:"numeric",month:"short",day:"numeric"})} ${a.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"})}`}catch(a){return console.error("Error formatting date:",a,t),t}},[]),ee=s.useCallback(()=>{if((m==null?void 0:m.length)>0){const t=m.find(a=>a.symbol==="USDT");re((t==null?void 0:t.amount)||0)}},[m]),Y=s.useMemo(()=>U==="openOrders"?{count:D,loading:v,list:Array.isArray(g)?g:[]}:{count:i,loading:S,list:Array.isArray(c)?c:[]},[U,D,v,g,i,S,c]);s.useEffect(()=>{let t=!0;return(async()=>{if(x)try{O(!0);const p=await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${x}`);if(!p.ok)throw new Error("Failed to fetch ticker data");const h=await p.json();t&&(j(h.lastPrice||"0"),T(h.priceChangePercent||"0"),q(h.highPrice||"0"),E(h.lowPrice||"0"),$(h.volume||"0"),O(!1))}catch(p){console.error("Error fetching initial data:",p),t&&O(!1)}})(),()=>{t=!1}},[x]),s.useEffect(()=>{if(!x)return;let t=!0;V.current=x;const a=()=>{y.current&&y.current.close(),I.current&&clearTimeout(I.current);try{y.current=new WebSocket(`wss://stream.binance.com:9443/ws/${x.toLowerCase()}@ticker`),y.current.onopen=()=>{},y.current.onmessage=p=>{if(t)try{const h=JSON.parse(p.data);h.s===V.current&&t&&(j(h.c||"0"),T(h.P||"0"),q(h.h||"0"),E(h.l||"0"),$(h.v||"0"))}catch(h){console.error("Error parsing WebSocket message:",h)}},y.current.onerror=p=>{console.error("Ticker WebSocket error:",p)},y.current.onclose=p=>{x===V.current&&t&&(I.current=setTimeout(a,2e3))}}catch(p){console.error("WebSocket connection error:",p)}};return a(),()=>{t=!1,y.current&&y.current.close(),I.current&&clearTimeout(I.current)}},[x]),s.useEffect(()=>{const t=setTimeout(()=>{oe(!1)},1500);return()=>clearTimeout(t)},[]),s.useEffect(()=>{let t=!0;return(async()=>{try{await Promise.all([r(J.doFetchPending()),r(ue.doFetch())])}catch(p){t&&console.error("Error fetching data:",p)}})(),()=>{t=!1}},[r]),s.useEffect(()=>{ee()},[ee]);const pe=s.useCallback(()=>{A(!0)},[]),me=s.useCallback(()=>{A(!1)},[]),xe=s.useCallback(t=>{O(!0),j("0"),T("0"),q("0"),E("0"),$("0"),l(t),A(!1)},[]),le=s.useCallback(t=>{r(ue.doFetch()),B(t),w(!0)},[r]),ge=s.useCallback(()=>{w(!1),B(null)},[]),fe=s.useCallback(t=>{H(t),f(!0)},[]),he=s.useCallback(()=>{f(!1),H(null)},[]),ce=s.useCallback(t=>{t==="openOrders"?(te("openOrders"),r(J.doFetchPending())):(te("recentOrders"),r(J.doFetch()))},[r]),_=s.useCallback(({width:t="100%",height:a="1em"})=>e.jsx("div",{className:"loading-placeholder",style:{width:t,height:a}}),[]),be=s.useMemo(()=>`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${x.split("USDT")[0]}.png`,[x]);return e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"header",children:[e.jsxs("div",{className:"header-top",children:[e.jsxs("div",{className:"market-info",children:[e.jsx("div",{className:"market-icon",children:e.jsx("img",{src:be,style:{width:30,height:30},alt:x,loading:"lazy",onError:t=>{t.target.style.display="none"}})}),e.jsx("div",{className:"market-name",children:x}),e.jsx("div",{className:"market-change",style:{color:b!=null&&b.startsWith("-")?"#FF6838":"#00C076"},children:b!=="0"?`${b}%`:e.jsx(_,{width:"50px",height:"16px"})})]}),e.jsx("div",{className:"additional-actions",onClick:pe,children:e.jsx("i",{className:"fas fa-filter"})})]}),e.jsx("div",{className:"market-price",children:P!=="0"?`$${o(P)}`:e.jsx(_,{width:"120px",height:"28px"})}),e.jsxs("div",{className:"market-stats",children:[e.jsxs("span",{children:[n("pages.marketDetail.stats.high"),":"," ",M!=="0"?`$${o(M)}`:e.jsx(_,{width:"80px",height:"12px"})]}),e.jsxs("span",{children:[n("pages.marketDetail.stats.volume"),":"," ",R!=="0"?`${d(R)} ${x.replace("USDT","")}`:e.jsx(_,{width:"80px",height:"12px"})]}),e.jsxs("span",{children:[n("pages.marketDetail.stats.low"),":"," ",F!=="0"?`$${o(F)}`:e.jsx(_,{width:"80px",height:"12px"})]})]})]}),e.jsx(we,{symbol:x}),e.jsxs("div",{className:"future-action-buttons",children:[e.jsx("button",{className:"action-button buy-button",onClick:()=>le("up"),children:n("pages.futures.actions.buyUp")}),e.jsx("button",{className:"action-button sell-button",onClick:()=>le("down"),children:n("pages.futures.actions.buyDown")})]}),e.jsxs("div",{className:"section-tabs",children:[e.jsxs("div",{className:`tab ${U==="openOrders"?"active":""}`,onClick:()=>ce("openOrders"),children:[n("pages.futures.tabs.openOrders")," (",D||0,")"]}),e.jsxs("div",{className:`tab ${U==="recentOrders"?"active":""}`,onClick:()=>ce("recentOrders"),children:[n("pages.futures.tabs.recentOrders")," (",i||0,")"]})]}),e.jsx(Ne,{countFutures:Y.count,futuretLoading:Y.loading,listFutures:Y.list,handleOpenOrderModal:fe,formatNumber:o,formatDateTime:u}),G&&k&&e.jsx(De,{selectedOrder:k,onClose:he,formatDateTimeDetailed:z,safeToFixed:ae}),e.jsx(ke,{isOpen:C,onClose:ge,direction:K,dispatch:r,listAssets:m,selectedCoin:x,marketPrice:P,availableBalance:se,setOpeningOrders:Z}),e.jsx(ve,{isOpen:X,onClose:me,onSelectCoin:xe}),e.jsx("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .container {
          max-width: 400px;
          margin: 0 auto;
          padding-bottom: 70px;
          background-color: #000000;
          color: #FFFFFF;
          min-height: 100vh;
        }

        .modal-content {
  max-height: 90vh;
  overflow-y: scroll;  /* allow scroll */
  scrollbar-width: none; /* Firefox */
}
        
        /* Header Section */
        .header {
          background-color: #000000;
          padding: 20px 15px 15px;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        
        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
        
        .market-info {
          display: flex;
          align-items: center;
        }
        
        .market-icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: #F3BA2F;
          margin-right: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .market-icon i {
          color: #000;
        }
        
        .market-name {
          font-weight: bold;
          font-size: 18px;
          margin-right: 10px;
        }
        
        .market-change {
          font-size: 14px;
          font-weight: bold;
        }
        
        .market-price {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        
        .market-stats {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #AAAAAA;
          flex-wrap: wrap;
        }
        
        .market-stats span {
          margin-right: 10px;
          margin-bottom: 5px;
        }
        
        .additional-actions {
          color: #AAAAAA;
          font-size: 20px;
          cursor: pointer;
        }
        
        /* Trading View Chart */
        .chart-container {
          height: 480px;
          background-color: #1A1A1A;
          margin: 15px;
          border-radius: 12px;
          position: relative;
          overflow: hidden;
        }
        
        .chart-placeholder {
          width: 100%;
          height: 100%;
        }
        
        .chart-loading {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.7);
          z-index: 10;
          color: #777;
        }
        
        .chart-controls {
          position: absolute;
          bottom: 10px;
          right: 10px;
          display: flex;
          gap: 5px;
          z-index: 5;
        }
        
        .chart-timeframe {
          background-color: #2A2A2A;
          color: #AAAAAA;
          border: none;
          border-radius: 4px;
          padding: 4px 8px;
          font-size: 12px;
        }
        
        /* Action Buttons */
        .future-action-buttons {
          display: flex;
          gap: 15px;
          margin: 15px;
        }
        
        .action-button {
          flex: 1;
          padding: 13px;
          border: none;
          font-size: 13px;
          font-weight: bold;
          cursor: pointer;
        }
        
        .buy-button {
          background-color: #00C076;
          color: white;
        }
        
        .sell-button {
          background-color: #FF6838;
          color: white;
        }
        
        /* Section Tabs */
        .section-tabs {
          display: flex;
          margin: 15px 15px 0;
          border-bottom: 1px solid #2A2A2A;
        }
        
        .tab {
          padding: 10px 15px;
          cursor: pointer;
          color: #777;
          font-size: 14px;
          position: relative;
          flex: 1;
          text-align: center;
        }
        
        .tab.active {
          color: #FFFFFF;
          font-weight: bold;
        }
        
        .tab.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background-color: #00C076;
        }
        
        /* Orders Container */
        .orders-container {
          margin: 15px;
        }
        
        .order-card {
          background-color: #1A1A1A;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 15px;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .order-card.loading {
          cursor: default;
        }
        
        .order-card:hover:not(.loading) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        
        .order-pair {
          font-weight: bold;
          font-size: 16px;
        }
        
        .order-direction {
          font-size: 12px;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: bold;
        }
        
        .order-direction.buy {
          background-color: rgba(0, 192, 118, 0.2);
          color: #00C076;
        }
        
        .order-direction.sell {
          background-color: rgba(255, 104, 56, 0.2);
          color: #FF6838;
        }
        
        .order-status {
          font-size: 12px;
          margin-bottom: 12px;
        }
        
        .order-status.open {
          color: #00C076;
        }
        
        .order-status.closed {
          color: #777;
        }
        
        .order-details {
          border-top: 1px solid #2A2A2A;
          padding-top: 12px;
        }
        
        .order-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 13px;
        }
        
        .order-label {
          color: #AAAAAA;
        }
        
        .order-value {
          font-weight: 500;
        }
        
        .order-value.buy {
          color: #00C076;
        }
        
        .order-value.sell {
          color: #FF6838;
        }
        
        .no-orders {
          text-align: center;
          padding: 30px 0;
          color: #777;
        }
        
        .no-orders i {
          font-size: 24px;
          margin-bottom: 10px;
          opacity: 0.5;
        }
        
        /* Loading Placeholder */
        .loading-placeholder {
          animation: pulse 1.5s ease-in-out infinite;
          background-color: #2A2A2A;
          border-radius: 4px;
        }
        
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        
        /* Modal Styles */
        .modal-overlays {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 20px;
        }
        
        .modal-content {
          background-color: #1A1A1A;
          border-radius: 12px;
          width: 100%;
          max-width: 400px;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #2A2A2A;
        }
        
        .modal-header h2 {
          font-size: 18px;
          font-weight: bold;
        }
        
        .modal-close {
          background: none;
          border: none;
          color: #AAAAAA;
          font-size: 20px;
          cursor: pointer;
        }
        
        .modal-body {
          padding: 20px;
        }
        
        .modal-footer {
          display: flex;
          justify-content: flex-end;
          padding: 20px;
          border-top: 1px solid #2A2A2A;
          gap: 10px;
        }
        
        .modal-button {
          background-color: #2A2A2A;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 10px 20px;
          cursor: pointer;
          font-weight: bold;
        }
        
        .close-order-button {
          background-color: #FF6838;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 10px 20px;
          cursor: pointer;
          font-weight: bold;
        }
        
        .order-detail-section {
          margin-bottom: 20px;
        }
        
        .order-detail-section h3 {
          font-size: 14px;
          color: #AAAAAA;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .detail-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        
        .detail-pair {
          font-weight: bold;
          font-size: 18px;
        }
        
        .detail-direction {
          font-size: 14px;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: bold;
        }
        
        .detail-direction.buy {
          background-color: rgba(0, 192, 118, 0.2);
          color: #00C076;
        }
        
        .detail-direction.sell {
          background-color: rgba(255, 104, 56, 0.2);
          color: #FF6838;
        }
        
        .detail-status {
          font-size: 14px;
          margin-bottom: 15px;
        }
        
        .detail-status.open {
          color: #00C076;
        }
        
        .detail-status.closed {
          color: #777;
        }
        
        .detail-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 14px;
        }
        
        .detail-label {
          color: #AAAAAA;
        }
        
        .detail-value {
          font-weight: 500;
        }
        
        .detail-value.profit {
          color: #00C076;
        }
        
        .detail-value.loss {
          color: #FF6838;
        }
      `})]})}const De=({selectedOrder:r,onClose:m,formatDateTimeDetailed:c,safeToFixed:g})=>e.jsx("div",{className:"modal-overlays",onClick:m,children:e.jsxs("div",{className:"modal-content",onClick:D=>D.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{children:n("pages.futures.orderDetails.title")}),e.jsx("button",{className:"modal-close",onClick:m,children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsxs("div",{className:"modal-body",children:[e.jsxs("div",{className:"order-detail-section",children:[e.jsxs("div",{className:"detail-header",children:[e.jsx("span",{className:"detail-pair",children:r.symbol||r.pair}),e.jsx("span",{className:`detail-direction ${r.futuresStatus==="long"||r.direction==="BUY UP"?"buy":"sell"}`,children:r.futuresStatus==="long"?n("pages.futures.actions.buyUp"):r.futuresStatus==="short"?n("pages.futures.actions.buyDown"):r.direction})]}),e.jsxs("div",{className:`detail-status ${r.finalized?"closed":"open"}`,children:["● ",r.finalized?n("pages.futures.orderDetails.closed"):n("pages.futures.orderDetails.open")]})]}),e.jsxs("div",{className:"order-detail-section",children:[e.jsx(N,{label:n("pages.futures.orderDetails.futuresAmount"),value:`${r.futuresAmount||r.investment} USDT`}),r.contractDuration&&e.jsx(N,{label:n("pages.futures.orderDetails.contractDuration"),value:`${r.contractDuration} ${n("pages.futures.orderDetails.seconds")}`}),e.jsx(N,{label:n("pages.futures.orderDetails.futuresStatus"),value:r.closePositionTime?n("pages.futures.orderDetails.completed"):n("pages.futures.orderDetails.open")}),e.jsx(N,{label:n("pages.futures.orderDetails.openPositionPrice"),value:r.openPositionPrice||r.openPrice}),e.jsx(N,{label:n("pages.futures.orderDetails.openPositionTime"),value:c(r.openPositionTime||r.openTime)}),r.closePositionPrice&&e.jsx(N,{label:n("pages.futures.orderDetails.closePositionPrice"),value:r.closePositionPrice}),r.closePositionTime&&e.jsx(N,{label:n("pages.futures.orderDetails.closePositionTime"),value:c(r.closePositionTime)}),e.jsx(N,{label:n("pages.futures.orderDetails.profitLossAmount"),value:r.profitAndLossAmount||r.pnl?`${g(r.profitAndLossAmount||r.pnl,2)} USDT`:"__",className:r.control==="profit"?"profit":"loss"}),e.jsx(N,{label:n("pages.futures.orderDetails.leverage"),value:`${r.leverage}X`})]})]}),e.jsx("div",{className:"modal-footer",children:e.jsx("button",{className:"modal-button",onClick:m,children:n("pages.futures.orderDetails.done")})})]})}),N=({label:r,value:m,className:c=""})=>e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"detail-label",children:r}),e.jsx("span",{className:`detail-value ${c}`,children:m})]});export{ze as default};
