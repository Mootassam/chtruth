import{o,I as Y,J as je,j as e,H as ye,K as ve,p as n,u as $,D as pe,M as B,E as me}from"./index-093855bd.js";import{C as Ae}from"./CoinListModal-bc12b939.js";import{F as we}from"./FuturesChart-0cc542b4.js";import{u as Fe}from"./useDispatch-560ef2ff.js";const ke=({isOpen:r,onClose:m,direction:c,dispatch:g,listAssets:S,selectedCoin:w,marketPrice:C,availableBalance:i,setOpeningOrders:P})=>{const[F,_]=o.useState("30"),[H,X]=o.useState("10"),[v,x]=o.useState("2"),[l,T]=o.useState(30),[y,b]=o.useState("configuring"),[z,E]=o.useState(0),[q,k]=o.useState(null),[R,O]=o.useState(""),[U,I]=o.useState(null),[ee,N]=o.useState(""),[G,J]=o.useState(!1),[f,Q]=o.useState(null),V=[{duration:"30",payout:"10"},{duration:"60",payout:"20"},{duration:"90",payout:"30"},{duration:"120",payout:"40"},{duration:"150",payout:"50"},{duration:"180",payout:"80"},{duration:"240",payout:"100"}],le=["1","2","3","4","5","6","8","10","20","100"],te=(s,d)=>{_(s),X(d)};o.useEffect(()=>(r?document.body.style.overflow="hidden":document.body.style.overflow="unset",()=>{document.body.style.overflow="unset"}),[r]),o.useEffect(()=>{g(Y.doFetch())},[g]),o.useEffect(()=>{l<30?O("Minimum amount is 30 USDT"):l>i?O("Insufficient balance"):O("")},[l,i]),o.useEffect(()=>{let s=null;return y==="in-progress"&&(z>0?s=setInterval(()=>{E(d=>d-1)},1e3):(async()=>await se())()),()=>{s&&clearInterval(s)}},[y,z]);const oe=async()=>{if(!(!c||l<30||l>i)){J(!0);try{const s=await ce();if(!s||!s.id){J(!1);return}Q({futuresAmount:l,contractDuration:F,futuresStatus:c==="up"?"long":"short",openPositionPrice:parseFloat(C||"0")||0,closePositionPrice:null,leverage:parseInt(v,10),openPositionTime:new Date,closePositionTime:null}),P(u=>[...u,{id:U,futuresAmount:l,contractDuration:F,futuresStatus:c==="up"?"long":"short",openPositionPrice:parseFloat(C||"0")||0,closePositionPrice:null,leverage:parseInt(v,10),openPositionTime:new Date().toISOString(),closePositionTime:null}]);const d=parseInt(F,10)||0;E(d),b("in-progress")}catch(s){console.error("startTrade error",s)}finally{J(!1)}}},se=async()=>{if(P([]),!U){k("loss"),N(`-${l.toFixed(2)} USDT`),b("completed");return}try{const s=await g(je.doFind(U)),d=s&&s.payload?s.payload:s;if(!d){k("loss"),N(`-${l.toFixed(2)} USDT`),b("completed");return}if(Q({...f,closePositionPrice:d.closePositionPrice,closePositionTime:d.closePositionTime,profitAndLossAmount:d.profitAndLossAmount}),d.control==="profit"){k("win");const u=Number(d.profitAndLossAmount??j(l,v,H));N(`+${Number.isFinite(u)?u.toFixed(2):"0.00"} USDT`)}else{k("loss");const u=Number(d.futuresAmount??l);N(`-${Number.isFinite(u)?u.toFixed(2):l.toFixed(2)} USDT`)}b("completed"),g(Y.doFetchPending())}catch(s){console.error("completeTrade error",s),k("loss"),N(`-${l.toFixed(2)} USDT`),b("completed")}},ce=async()=>{const s=parseFloat(C||"0")||0,d={futuresStatus:c==="up"?"long":"short",profitAndLossAmount:"",leverage:parseInt(v,10),control:"loss",operate:"low",futureCoin:w.replace("USDT","/USDT"),closePositionTime:"",closePositionPrice:"",openPositionTime:new Date().toISOString(),openPositionPrice:s,contractDuration:F,futuresAmount:l};try{const u=await g(ve.doCreate(d)),A=u&&u.id?u:u&&u.payload?u.payload:null;return A&&A.id?(I(A.id),A):(console.warn("Create did not return created record"),null)}catch(u){return console.error("create error",u),null}},re=()=>{b("configuring"),P([]),k(null),E(0),I(null),N(""),Q(null),T(30),X("10"),_("30")},j=(s,d,u)=>{const A=Number.isFinite(s)?s:0,ae=parseInt(d,10)||0,ie=parseInt(u,10)||0;return A*ae*ie/100},W=()=>{if(y!=="in-progress")return 0;const s=parseInt(F,10)||1;return(s-z)/s*100},M=s=>{const d=Math.floor(s/60),u=s%60;return`${d.toString().padStart(2,"0")}:${u.toString().padStart(2,"0")}`},Z=s=>s?new Date(s).toLocaleTimeString():"-",L=s=>{const d=parseInt(s.target.value,10)||0;T(d)};if(!r)return null;const ne=e.jsxs("div",{className:"modal-overlay",onClick:m,children:[e.jsxs("div",{className:`modal-container ${c==="up"?"up-theme":"down-theme"}`,onClick:s=>s.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{className:"pair-info",children:[e.jsx("div",{className:"pair-icon",children:e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${w.split("USDT")[0]}.png`,style:{width:30,height:30},alt:w,loading:"lazy"})}),e.jsx("div",{className:"pair-name",children:w.replace("USDT","/USDT")})]}),e.jsx("button",{className:"close-btn",onClick:m,children:"×"})]}),y!=="configuring"&&e.jsxs("div",{className:"trade-progress-section",children:[e.jsx("div",{className:"progress-container",children:e.jsx("div",{className:"circular-progress",style:{background:`conic-gradient(${c==="up"?"#00C076":"#FF6838"} ${W()}%, #3a3a3a ${W()}%)`},children:e.jsxs("div",{className:"progress-inner",children:[e.jsx("div",{className:"progress-time",children:M(z)}),e.jsx("div",{className:"progress-label",children:"Remaining"})]})})}),f&&e.jsxs("div",{className:"trade-details",children:[e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Futures Amount:"}),e.jsxs("span",{children:[f.futuresAmount," USDT"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Contract Duration:"}),e.jsxs("span",{children:[f.contractDuration,"s"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Future Type:"}),e.jsx("span",{className:f.futuresStatus==="long"?"up-text":"down-text",children:f.futuresStatus.toUpperCase()})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Open Position Price:"}),e.jsxs("span",{children:[f.openPositionPrice.toFixed(4)," USDT"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Close Position Price:"}),e.jsxs("span",{children:[f.closePositionPrice?f.closePositionPrice.toFixed(4):"-"," USDT"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Leverage:"}),e.jsxs("span",{children:[f.leverage,"x"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Open Time:"}),e.jsx("span",{children:Z(f.openPositionTime)})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Close Time:"}),e.jsx("span",{children:Z(f.closePositionTime)})]})]}),e.jsxs("div",{className:"trade-actions",children:[y==="in-progress"&&e.jsx("button",{className:"trade-action-btn keep-buying",onClick:m,children:"Keep Buying"}),y==="completed"&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"trade-action-btn secondary",onClick:m,children:"Close"}),e.jsx("button",{className:"trade-action-btn primary",onClick:re,children:"New Trade"})]})]})]}),y==="configuring"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:`direction-indicator ${c}-indicator`,children:c==="up"?"Predicting price will go UP":"Predicting price will go DOWN"}),e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"section",children:[e.jsxs("div",{className:"section-title",children:[e.jsx("span",{children:"Contract Duration"}),e.jsx("span",{children:"Payout"})]}),e.jsx("div",{className:"options-container",children:V.map(s=>e.jsxs("button",{className:`option-btn ${F===s.duration?"selected":""}`,onClick:()=>te(s.duration,s.payout),children:[s.duration,"s (",s.payout,"%)"]},s.duration))})]}),e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"section-title",children:e.jsx("span",{children:"Leverage"})}),e.jsx("div",{className:"options-container",children:le.map(s=>e.jsxs("button",{className:`option-btn ${v===s?"selected":""}`,onClick:()=>x(s),children:[s,"×"]},s))})]}),e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"section-title",children:e.jsx("span",{children:"Futures Amount (USDT)"})}),e.jsxs("div",{className:"amount-control",children:[e.jsx("button",{className:"amount-btn",onClick:()=>T(s=>Math.max(1,s-1)),children:"-"}),e.jsx("input",{type:"number",className:"amount-inputs",value:l,onChange:L,min:"1",placeholder:"Enter amount"}),e.jsx("button",{className:"amount-btn",onClick:()=>T(s=>s+1),children:"+"})]}),e.jsxs("div",{className:"balance-info",children:["Available: ",i," USDT"]}),R&&e.jsx("div",{className:"error-message",style:{color:"#FF6838",fontSize:"12px",marginTop:"5px"},children:R})]}),e.jsxs("div",{className:"profit-info",children:["Projected Profit: ",j(l,v,H).toFixed(2)," USDT"]}),e.jsx("button",{className:"confirm-btn",onClick:oe,disabled:!c||l<30||l>i||G,style:{opacity:!c||l<30||l>i?.5:1,cursor:!c||l<30||l>i?"not-allowed":"pointer"},children:G?"CREATING...":l>i?"INSUFFICIENT BALANCE":"CONFIRM ORDER"})]})]})]}),e.jsx("style",{children:` 
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
      // padding: 20px;
      height: 100vh;
  }

  .modal-container {
      background-color: #2a2a2a;
      border-radius: 12px;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
      overflow: hidden;
      // max-height: 90vh;
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
`})]});return ye.createPortal(ne,document.body)};function Ne(r){const{countFutures:m,futuretLoading:c,listFutures:g,handleOpenOrderModal:S,formatNumber:w,formatDateTime:C}=r;return e.jsxs("div",{className:"orders-container",children:[m&&!c&&(g==null?void 0:g.map(i=>{var P;return e.jsxs("div",{className:"order-card",onClick:()=>S(i),children:[e.jsxs("div",{className:"order-header",children:[e.jsx("div",{className:"order-pair",children:i.futureCoin||"BTC/USDT"}),e.jsx("div",{className:`order-direction ${i.futuresStatus==="long"?"buy":"sell"}`,children:i.futuresStatus==="long"?n("pages.futures.actions.buyUp"):n("pages.futures.actions.buyDown")})]}),e.jsxs("div",{className:`order-status ${i.finalized?"closed":"open"}`,children:["● ",i.finalized?n("pages.futures.orderDetails.closed"):n("pages.futures.orderDetails.open")]}),e.jsxs("div",{className:"order-details",children:[e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:n("pages.futures.orderDetails.futuresAmount")}),e.jsxs("span",{className:"order-value",children:["$",i.futuresAmount]})]}),e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:n("pages.futures.orderDetails.openPositionPrice")}),e.jsx("span",{className:"order-value",children:w((P=i==null?void 0:i.openPositionPrice)==null?void 0:P.toString(),(i==null?void 0:i.openPositionPrice)>1e3?0:2)})]}),e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:n("pages.futures.orderDetails.openPositionTime")}),e.jsx("span",{className:"order-value",children:C(i.openPositionTime)})]}),e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:n("pages.futures.orderDetails.leverage")}),e.jsxs("span",{className:"order-value",children:[i.leverage,"x"]})]})]})]},i.id)})),g.length===0&&!c&&e.jsxs("div",{className:"no-orders",children:[e.jsx("i",{className:"fas fa-file-invoice"}),e.jsx("div",{children:n("pages.futures.list.noOrders")})]}),e.jsx("style",{children:` 
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
            `})]})}function ze(){const r=Fe(),m=$(pe.selectRows);$(pe.selectLoading);const c=$(B.selectRows),g=$(B.pendingRows),S=$(B.pendingcount),w=$(B.pendingLoading),C=$(B.selectLoading),i=$(B.selectCount),[P,F]=o.useState(!1),[_,H]=o.useState(null),[X,v]=o.useState(!1),[x,l]=o.useState("BTCUSDT"),[T,y]=o.useState("0"),[b,z]=o.useState("0"),[E,q]=o.useState("0"),[k,R]=o.useState("0"),[O,U]=o.useState("0"),[I,ee]=o.useState("openOrders"),[N,G]=o.useState(null),[J,f]=o.useState(!1),[Q,V]=o.useState(!0),[le,te]=o.useState(!0),[oe,se]=o.useState(0),[ce,re]=o.useState([]),j=o.useRef(null),W=o.useRef(x),M=o.useRef(),Z=o.useCallback((t,a=2)=>{if(t==null)return"0.00";const p=typeof t=="string"?parseFloat(t):t;return isNaN(p)?"0.00":p.toFixed(a)},[]),L=o.useCallback((t,a=2)=>{if(t==null)return"0.00";const p=typeof t=="string"?parseFloat(t):t;return isNaN(p)?"0.00":p.toLocaleString(void 0,{minimumFractionDigits:a,maximumFractionDigits:a})},[]),ne=o.useCallback(t=>{if(t==null)return"0";const a=typeof t=="string"?parseFloat(t):t;return isNaN(a)?"0":a>=1e9?(a/1e9).toFixed(2)+n("pages.marketDetail.volume.billion"):a>=1e6?(a/1e6).toFixed(2)+n("pages.marketDetail.volume.million"):L(a,0)},[L]),s=o.useCallback(t=>{if(!t)return n("pages.assetsDetail.status.pending");try{const a=new Date(t);if(isNaN(a.getTime()))return t;const p=new Date;return a.toDateString()===p.toDateString()?n("pages.history.dateFormats.today",a.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})):n("pages.history.dateFormats.yesterday",a.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}))}catch(a){return console.error("Error formatting date:",a,t),t}},[]),d=o.useCallback(t=>{if(!t)return n("pages.assetsDetail.status.pending");try{const a=new Date(t);return isNaN(a.getTime())?t:`${a.toLocaleDateString([],{year:"numeric",month:"short",day:"numeric"})} ${a.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"})}`}catch(a){return console.error("Error formatting date:",a,t),t}},[]),u=o.useCallback(()=>{if((m==null?void 0:m.length)>0){const t=m.find(a=>a.symbol==="USDT");se((t==null?void 0:t.amount)||0)}},[m]),A=o.useMemo(()=>I==="openOrders"?{count:S,loading:w,list:Array.isArray(g)?g:[]}:{count:i,loading:C,list:Array.isArray(c)?c:[]},[I,S,w,g,i,C,c]);o.useEffect(()=>{let t=!0;return(async()=>{if(x)try{V(!0);const p=await fetch(`https://api.binance.us/api/v3/ticker/24hr?symbol=${x}`);if(!p.ok)throw new Error("Failed to fetch ticker data");const h=await p.json();t&&(y(h.lastPrice||"0"),z(h.priceChangePercent||"0"),q(h.highPrice||"0"),R(h.lowPrice||"0"),U(h.volume||"0"),V(!1))}catch(p){console.error("Error fetching initial data:",p),t&&V(!1)}})(),()=>{t=!1}},[x]),o.useEffect(()=>{if(!x)return;let t=!0;W.current=x;const a=()=>{j.current&&j.current.close(),M.current&&clearTimeout(M.current);try{j.current=new WebSocket(`wss://stream.binance.us:9443/ws/${x.toLowerCase()}@ticker`),j.current.onopen=()=>{},j.current.onmessage=p=>{if(t)try{const h=JSON.parse(p.data);h.s===W.current&&t&&(y(h.c||"0"),z(h.P||"0"),q(h.h||"0"),R(h.l||"0"),U(h.v||"0"))}catch(h){console.error("Error parsing WebSocket message:",h)}},j.current.onerror=p=>{console.error("Ticker WebSocket error:",p)},j.current.onclose=p=>{x===W.current&&t&&(M.current=setTimeout(a,2e3))}}catch(p){console.error("WebSocket connection error:",p)}};return a(),()=>{t=!1,j.current&&j.current.close(),M.current&&clearTimeout(M.current)}},[x]),o.useEffect(()=>{const t=setTimeout(()=>{te(!1)},1500);return()=>clearTimeout(t)},[]),o.useEffect(()=>{let t=!0;return(async()=>{try{await Promise.all([r(Y.doFetchPending()),r(me.doFetch())])}catch(p){t&&console.error("Error fetching data:",p)}})(),()=>{t=!1}},[r]),o.useEffect(()=>{u()},[u]);const ae=o.useCallback(()=>{v(!0)},[]),ie=o.useCallback(()=>{v(!1)},[]),xe=o.useCallback(t=>{V(!0),y("0"),z("0"),q("0"),R("0"),U("0"),l(t),v(!1)},[]),de=o.useCallback(t=>{r(me.doFetch()),H(t),F(!0)},[r]),ge=o.useCallback(()=>{F(!1),H(null)},[]),fe=o.useCallback(t=>{G(t),f(!0)},[]),he=o.useCallback(()=>{f(!1),G(null)},[]),ue=o.useCallback(t=>{t==="openOrders"?(ee("openOrders"),r(Y.doFetchPending())):(ee("recentOrders"),r(Y.doFetch()))},[r]),K=o.useCallback(({width:t="100%",height:a="1em"})=>e.jsx("div",{className:"loading-placeholder",style:{width:t,height:a}}),[]),be=o.useMemo(()=>`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${x.split("USDT")[0]}.png`,[x]);return e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"header",children:[e.jsxs("div",{className:"header-top",children:[e.jsxs("div",{className:"market-info",children:[e.jsx("div",{className:"market-icon",children:e.jsx("img",{src:be,style:{width:30,height:30},alt:x,loading:"lazy",onError:t=>{t.target.style.display="none"}})}),e.jsx("div",{className:"market-name",children:x}),e.jsx("div",{className:"market-change",style:{color:b!=null&&b.startsWith("-")?"#FF6838":"#00C076"},children:b!=="0"?`${b}%`:e.jsx(K,{width:"50px",height:"16px"})})]}),e.jsx("div",{className:"additional-actions",onClick:ae,children:e.jsx("i",{className:"fas fa-filter"})})]}),e.jsx("div",{className:"market-price",children:T!=="0"?`$${L(T)}`:e.jsx(K,{width:"120px",height:"28px"})}),e.jsxs("div",{className:"market-stats",children:[e.jsxs("span",{children:[n("pages.marketDetail.stats.high"),":"," ",E!=="0"?`$${L(E)}`:e.jsx(K,{width:"80px",height:"12px"})]}),e.jsxs("span",{children:[n("pages.marketDetail.stats.volume"),":"," ",O!=="0"?`${ne(O)} ${x.replace("USDT","")}`:e.jsx(K,{width:"80px",height:"12px"})]}),e.jsxs("span",{children:[n("pages.marketDetail.stats.low"),":"," ",k!=="0"?`$${L(k)}`:e.jsx(K,{width:"80px",height:"12px"})]})]})]}),e.jsx(we,{symbol:x}),e.jsxs("div",{className:"future-action-buttons",children:[e.jsx("button",{className:"action-button buy-button",onClick:()=>de("up"),children:n("pages.futures.actions.buyUp")}),e.jsx("button",{className:"action-button sell-button",onClick:()=>de("down"),children:n("pages.futures.actions.buyDown")})]}),e.jsxs("div",{className:"section-tabs",children:[e.jsxs("div",{className:`tab ${I==="openOrders"?"active":""}`,onClick:()=>ue("openOrders"),children:[n("pages.futures.tabs.openOrders")," (",S||0,")"]}),e.jsxs("div",{className:`tab ${I==="recentOrders"?"active":""}`,onClick:()=>ue("recentOrders"),children:[n("pages.futures.tabs.recentOrders")," (",i||0,")"]})]}),e.jsx(Ne,{countFutures:A.count,futuretLoading:A.loading,listFutures:A.list,handleOpenOrderModal:fe,formatNumber:L,formatDateTime:s}),J&&N&&e.jsx(De,{selectedOrder:N,onClose:he,formatDateTimeDetailed:d,safeToFixed:Z}),e.jsx(ke,{isOpen:P,onClose:ge,direction:_,dispatch:r,listAssets:m,selectedCoin:x,marketPrice:T,availableBalance:oe,setOpeningOrders:re}),e.jsx(Ae,{isOpen:X,onClose:ie,onSelectCoin:xe}),e.jsx("style",{children:`
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
      `})]})}const De=({selectedOrder:r,onClose:m,formatDateTimeDetailed:c,safeToFixed:g})=>e.jsx("div",{className:"modal-overlays",onClick:m,children:e.jsxs("div",{className:"modal-content",onClick:S=>S.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{children:n("pages.futures.orderDetails.title")}),e.jsx("button",{className:"modal-close",onClick:m,children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsxs("div",{className:"modal-body",children:[e.jsxs("div",{className:"order-detail-section",children:[e.jsxs("div",{className:"detail-header",children:[e.jsx("span",{className:"detail-pair",children:r.symbol||r.pair}),e.jsx("span",{className:`detail-direction ${r.futuresStatus==="long"||r.direction==="BUY UP"?"buy":"sell"}`,children:r.futuresStatus==="long"?n("pages.futures.actions.buyUp"):r.futuresStatus==="short"?n("pages.futures.actions.buyDown"):r.direction})]}),e.jsxs("div",{className:`detail-status ${r.finalized?"closed":"open"}`,children:["● ",r.finalized?n("pages.futures.orderDetails.closed"):n("pages.futures.orderDetails.open")]})]}),e.jsxs("div",{className:"order-detail-section",children:[e.jsx(D,{label:n("pages.futures.orderDetails.futuresAmount"),value:`${r.futuresAmount||r.investment} USDT`}),r.contractDuration&&e.jsx(D,{label:n("pages.futures.orderDetails.contractDuration"),value:`${r.contractDuration} ${n("pages.futures.orderDetails.seconds")}`}),e.jsx(D,{label:n("pages.futures.orderDetails.futuresStatus"),value:r.closePositionTime?n("pages.futures.orderDetails.completed"):n("pages.futures.orderDetails.open")}),e.jsx(D,{label:n("pages.futures.orderDetails.openPositionPrice"),value:r.openPositionPrice||r.openPrice}),e.jsx(D,{label:n("pages.futures.orderDetails.openPositionTime"),value:c(r.openPositionTime||r.openTime)}),r.closePositionPrice&&e.jsx(D,{label:n("pages.futures.orderDetails.closePositionPrice"),value:r.closePositionPrice}),r.closePositionTime&&e.jsx(D,{label:n("pages.futures.orderDetails.closePositionTime"),value:c(r.closePositionTime)}),e.jsx(D,{label:n("pages.futures.orderDetails.profitLossAmount"),value:r.profitAndLossAmount||r.pnl?`${g(r.profitAndLossAmount||r.pnl,2)} USDT`:"__",className:r.control==="profit"?"profit":"loss"}),e.jsx(D,{label:n("pages.futures.orderDetails.leverage"),value:`${r.leverage}X`})]})]}),e.jsx("div",{className:"modal-footer",children:e.jsx("button",{className:"modal-button",onClick:m,children:n("pages.futures.orderDetails.done")})})]})}),D=({label:r,value:m,className:c=""})=>e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"detail-label",children:r}),e.jsx("span",{className:`detail-value ${c}`,children:m})]});export{ze as default};
