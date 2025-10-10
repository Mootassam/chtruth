import{r,q as Y,t as fe,j as e,R as je,w as ye,u as T,m as ae,x as O,o as ie}from"./index-cc5f2096.js";import{C as Ae}from"./CoinListModal-f92d2b8e.js";import{F as we}from"./FuturesChart-3403df5f.js";import{u as ve}from"./useDispatch-85fc5622.js";const Fe=({isOpen:n,onClose:m,direction:c,dispatch:x,listAssets:N,selectedCoin:k,marketPrice:C,availableBalance:a,setOpeningOrders:S})=>{const[b,J]=r.useState("120"),[y,K]=r.useState("2"),[i,p]=r.useState(1),[A,j]=r.useState("configuring"),[P,w]=r.useState(0),[V,v]=r.useState(null),[z,L]=r.useState(""),[D,E]=r.useState(null),[H,f]=r.useState(""),[R,$]=r.useState(!1),[g,B]=r.useState(null);r.useEffect(()=>(n?document.body.style.overflow="hidden":document.body.style.overflow="unset",()=>{document.body.style.overflow="unset"}),[n]),r.useEffect(()=>{x(Y.doFetch())},[x]),r.useEffect(()=>{i<=0?L("Amount must be greater than 0"):i>a?L("Insufficient balance"):L("")},[i,a]),r.useEffect(()=>{let o=null;return A==="in-progress"&&(P>0?o=setInterval(()=>{w(d=>d-1)},1e3):(async()=>await te())()),()=>{o&&clearInterval(o)}},[A,P]);const G=async()=>{if(!(!c||i<=0||i>a)){$(!0);try{const o=await U();if(!o||!o.id){$(!1);return}B({futuresAmount:i,contractDuration:b,futuresStatus:c==="up"?"long":"short",openPositionPrice:parseFloat(C||"0")||0,closePositionPrice:null,leverage:parseInt(y,10),openPositionTime:new Date,closePositionTime:null}),S(l=>[...l,{id:D,futuresAmount:i,contractDuration:b,futuresStatus:c==="up"?"long":"short",openPositionPrice:parseFloat(C||"0")||0,closePositionPrice:null,leverage:parseInt(y,10),openPositionTime:new Date().toISOString(),closePositionTime:null}]);const d=parseInt(b,10)||0;w(d),j("in-progress")}catch(o){console.error("startTrade error",o)}finally{$(!1)}}},te=async()=>{if(S([]),!D){v("loss"),f(`-${i.toFixed(2)} USDT`),j("completed");return}try{const o=await x(fe.doFind(D)),d=o&&o.payload?o.payload:o;if(!d){v("loss"),f(`-${i.toFixed(2)} USDT`),j("completed");return}if(B({...g,closePositionPrice:d.closePositionPrice,closePositionTime:d.closePositionTime,profitAndLossAmount:d.profitAndLossAmount}),d.control==="profit"){v("win");const l=Number(d.profitAndLossAmount??_(i,y,b));f(`+${Number.isFinite(l)?l.toFixed(2):"0.00"} USDT`)}else{v("loss");const l=Number(d.futuresAmount??i);f(`-${Number.isFinite(l)?l.toFixed(2):i.toFixed(2)} USDT`)}j("completed"),x(Y.doFetchPending())}catch(o){console.error("completeTrade error",o),v("loss"),f(`-${i.toFixed(2)} USDT`),j("completed")}},U=async()=>{const o=parseFloat(C||"0")||0,d={futuresStatus:c==="up"?"long":"short",profitAndLossAmount:"",leverage:parseInt(y,10),control:"loss",operate:"low",closePositionTime:"",closePositionPrice:"",openPositionTime:new Date().toISOString(),openPositionPrice:o,contractDuration:b,futuresAmount:i};try{const l=await x(ye.doCreate(d)),I=l&&l.id?l:l&&l.payload?l.payload:null;return I&&I.id?(E(I.id),I):(console.warn("Create did not return created record"),null)}catch(l){return console.error("create error",l),null}},oe=()=>{j("configuring"),S([]),v(null),w(0),E(null),f(""),B(null)},_=(o,d,l)=>o*parseInt(d,10)*parseInt(l,10)/1e4,q=()=>{if(A!=="in-progress")return 0;const o=parseInt(b,10)||1;return(o-P)/o*100},X=o=>{const d=Math.floor(o/60),l=o%60;return`${d.toString().padStart(2,"0")}:${l.toString().padStart(2,"0")}`},Q=o=>o?new Date(o).toLocaleTimeString():"-";if(!n)return null;const Z=e.jsxs("div",{className:"modal-overlay",onClick:m,children:[e.jsxs("div",{className:`modal-container ${c==="up"?"up-theme":"down-theme"}`,onClick:o=>o.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{className:"pair-info",children:[e.jsx("div",{className:"pair-icon",children:e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${k.split("USDT")[0]}.png`,style:{width:30,height:30},alt:k,loading:"lazy"})}),e.jsx("div",{className:"pair-name",children:k.replace("USDT","/USDT")})]}),e.jsx("button",{className:"close-btn",onClick:m,children:"×"})]}),A!=="configuring"&&e.jsxs("div",{className:"trade-progress-section",children:[e.jsx("div",{className:"progress-container",children:e.jsx("div",{className:"circular-progress",style:{background:`conic-gradient(${c==="up"?"#00C076":"#FF6838"} ${q()}%, #3a3a3a ${q()}%)`},children:e.jsxs("div",{className:"progress-inner",children:[e.jsx("div",{className:"progress-time",children:X(P)}),e.jsx("div",{className:"progress-label",children:"Remaining"})]})})}),g&&e.jsxs("div",{className:"trade-details",children:[e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Futures Amount:"}),e.jsxs("span",{children:[g.futuresAmount," USDT"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Contract Duration:"}),e.jsxs("span",{children:[g.contractDuration,"s"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Future Type:"}),e.jsx("span",{className:g.futuresStatus==="long"?"up-text":"down-text",children:g.futuresStatus.toUpperCase()})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Open Position Price:"}),e.jsxs("span",{children:[g.openPositionPrice.toFixed(4)," USDT"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Close Position Price:"}),e.jsxs("span",{children:[g.closePositionPrice?g.closePositionPrice.toFixed(4):"-"," USDT"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Leverage:"}),e.jsxs("span",{children:[g.leverage,"x"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Open Time:"}),e.jsx("span",{children:Q(g.openPositionTime)})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Close Time:"}),e.jsx("span",{children:Q(g.closePositionTime)})]})]}),e.jsxs("div",{className:"trade-actions",children:[A==="in-progress"&&e.jsx("button",{className:"trade-action-btn keep-buying",onClick:m,children:"Keep Buying"}),A==="completed"&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"trade-action-btn secondary",onClick:m,children:"Close"}),e.jsx("button",{className:"trade-action-btn primary",onClick:oe,children:"New Trade"})]})]})]}),A==="configuring"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:`direction-indicator ${c}-indicator`,children:c==="up"?"Predicting price will go UP":"Predicting price will go DOWN"}),e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"section",children:[e.jsxs("div",{className:"section-title",children:[e.jsx("span",{children:"Contract Duration"}),e.jsx("span",{children:"Payout"})]}),e.jsx("div",{className:"options-container",children:[{duration:"60",payout:"10"},{duration:"120",payout:"20"},{duration:"180",payout:"40"},{duration:"240",payout:"80"}].map(o=>e.jsxs("button",{className:`option-btn ${b===o.duration?"selected":""}`,onClick:()=>J(o.duration),children:[o.duration,"s (",o.payout,"%)"]},o.duration))})]}),e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"section-title",children:e.jsx("span",{children:"Leverage"})}),e.jsx("div",{className:"options-container",children:["2","5","10","20","50"].map(o=>e.jsxs("button",{className:`option-btn ${y===o?"selected":""}`,onClick:()=>K(o),children:[o,"×"]},o))})]}),e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"section-title",children:e.jsx("span",{children:"Futures Amount (USDT)"})}),e.jsxs("div",{className:"amount-control",children:[e.jsx("button",{className:"amount-btn",onClick:()=>p(o=>Math.max(1,o-1)),children:"-"}),e.jsx("input",{type:"number",className:"amount-inputs",value:i,onChange:o=>{const d=parseInt(o.target.value,10)||0;p(Math.max(0,d))},min:"1"}),e.jsx("button",{className:"amount-btn",onClick:()=>p(o=>o+1),children:"+"})]}),e.jsxs("div",{className:"balance-info",children:["Available: ",a," USDT"]}),z&&e.jsx("div",{className:"error-message",style:{color:"#FF6838",fontSize:"12px",marginTop:"5px"},children:z})]}),e.jsxs("div",{className:"profit-info",children:["Projected Profit: ",_(i,y,b).toFixed(2)," USDT"]}),e.jsx("button",{className:"confirm-btn",onClick:G,disabled:!c||i<=0||i>a||R,style:{opacity:!c||i<=0||i>a?.5:1,cursor:!c||i<=0||i>a?"not-allowed":"pointer"},children:R?"CREATING...":i>a?"INSUFFICIENT BALANCE":"CONFIRM ORDER"})]})]})]}),e.jsx("style",{children:` 
  .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      // bottom: 0;
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
`})]});return je.createPortal(Z,document.body)};function Ne(n){const{countFutures:m,futuretLoading:c,listFutures:x,handleOpenOrderModal:N,formatNumber:k,formatDateTime:C}=n;return e.jsxs("div",{className:"orders-container",children:[m&&!c&&(x==null?void 0:x.map(a=>{var S;return e.jsxs("div",{className:"order-card",onClick:()=>N(a),children:[e.jsxs("div",{className:"order-header",children:[e.jsx("div",{className:"order-pair",children:a.symbol||"BTC/USDT"}),e.jsx("div",{className:`order-direction ${a.futuresStatus==="long"?"buy":"sell"}`,children:a.futuresStatus==="long"?"BUY UP":"BUY DOWN"})]}),e.jsxs("div",{className:`order-status ${a.finalized?"closed":"open"}`,children:["● ",a.finalized?"Closed":"Open"]}),e.jsxs("div",{className:"order-details",children:[e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:"Futures Amount:"}),e.jsxs("span",{className:"order-value",children:["$",a.futuresAmount]})]}),e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:"Open Price:"}),e.jsx("span",{className:"order-value",children:k((S=a==null?void 0:a.openPositionPrice)==null?void 0:S.toString(),(a==null?void 0:a.openPositionPrice)>1e3?0:2)})]}),e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:"Open Time:"}),e.jsx("span",{className:"order-value",children:C(a.openPositionTime)})]}),e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:"Leverage:"}),e.jsxs("span",{className:"order-value",children:[a.leverage,"x"]})]})]})]},a.id)})),x.length===0&&!c&&e.jsxs("div",{className:"no-orders",children:[e.jsx("i",{className:"fas fa-file-invoice"}),e.jsx("div",{children:"No orders"})]}),e.jsx("style",{children:` .order-status {
          font-size: 12px;
          margin-bottom: 12px;
        }
        
        .order-status.open {
          color: #00C076;
        }
        
        .order-status.closed {
          color: #777;
        }`})]})}function De(){const n=ve(),m=T(ae.selectRows);T(ae.selectLoading);const c=T(O.selectRows),x=T(O.pendingRows),N=T(O.pendingcount),k=T(O.pendingLoading),C=T(O.selectLoading),a=T(O.selectCount),[S,b]=r.useState(!1),[J,y]=r.useState(null),[K,i]=r.useState(!1),[p,A]=r.useState("BTCUSDT"),[j,P]=r.useState("0"),[w,V]=r.useState("0"),[v,z]=r.useState("0"),[L,D]=r.useState("0"),[E,H]=r.useState("0"),[f,R]=r.useState("openOrders"),[$,g]=r.useState(null),[B,G]=r.useState(!1),[te,U]=r.useState(!0),[oe,_]=r.useState(!0),[q,X]=r.useState(0),[Q,Z]=r.useState([]),o=r.useRef(null),d=r.useRef(p),l=r.useRef(),I=r.useCallback((t,s=2)=>{if(t==null)return"0.00";const u=typeof t=="string"?parseFloat(t):t;return isNaN(u)?"0.00":u.toFixed(s)},[]),M=r.useCallback((t,s=2)=>{if(t==null)return"0.00";const u=typeof t=="string"?parseFloat(t):t;return isNaN(u)?"0.00":u.toLocaleString(void 0,{minimumFractionDigits:s,maximumFractionDigits:s})},[]),le=r.useCallback(t=>{if(t==null)return"0";const s=typeof t=="string"?parseFloat(t):t;return isNaN(s)?"0":s>=1e9?(s/1e9).toFixed(2)+"B":s>=1e6?(s/1e6).toFixed(2)+"M":M(s,0)},[M]),ce=r.useCallback(t=>{if(!t)return"N/A";try{const s=new Date(t);if(isNaN(s.getTime()))return t;const u=new Date;return s.toDateString()===u.toDateString()?`Today ${s.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}`:`${s.toLocaleDateString([],{month:"short",day:"numeric"})} ${s.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}`}catch(s){return console.error("Error formatting date:",s,t),t}},[]),de=r.useCallback(t=>{if(!t)return"N/A";try{const s=new Date(t);return isNaN(s.getTime())?t:`${s.toLocaleDateString([],{year:"numeric",month:"short",day:"numeric"})} ${s.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"})}`}catch(s){return console.error("Error formatting date:",s,t),t}},[]),re=r.useCallback(()=>{if((m==null?void 0:m.length)>0){const t=m.find(s=>s.symbol==="USDT");X((t==null?void 0:t.amount)||0)}},[m]),ee=r.useMemo(()=>f==="openOrders"?{count:N,loading:k,list:Array.isArray(x)?x:[]}:{count:a,loading:C,list:Array.isArray(c)?c:[]},[f,N,k,x,a,C,c]);r.useEffect(()=>{let t=!0;return(async()=>{if(p)try{U(!0);const u=await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${p}`);if(!u.ok)throw new Error("Failed to fetch ticker data");const h=await u.json();t&&(P(h.lastPrice||"0"),V(h.priceChangePercent||"0"),z(h.highPrice||"0"),D(h.lowPrice||"0"),H(h.volume||"0"),U(!1))}catch(u){console.error("Error fetching initial data:",u),t&&U(!1)}})(),()=>{t=!1}},[p]),r.useEffect(()=>{if(!p)return;let t=!0;d.current=p;const s=()=>{o.current&&o.current.close(),l.current&&clearTimeout(l.current);try{o.current=new WebSocket(`wss://stream.binance.com:9443/ws/${p.toLowerCase()}@ticker`),o.current.onopen=()=>{},o.current.onmessage=u=>{if(t)try{const h=JSON.parse(u.data);h.s===d.current&&t&&(P(h.c||"0"),V(h.P||"0"),z(h.h||"0"),D(h.l||"0"),H(h.v||"0"))}catch(h){console.error("Error parsing WebSocket message:",h)}},o.current.onerror=u=>{console.error("Ticker WebSocket error:",u)},o.current.onclose=u=>{p===d.current&&t&&(l.current=setTimeout(s,2e3))}}catch(u){console.error("WebSocket connection error:",u)}};return s(),()=>{t=!1,o.current&&o.current.close(),l.current&&clearTimeout(l.current)}},[p]),r.useEffect(()=>{const t=setTimeout(()=>{_(!1)},1500);return()=>clearTimeout(t)},[]),r.useEffect(()=>{let t=!0;return(async()=>{try{await Promise.all([n(Y.doFetchPending()),n(ie.doFetch())])}catch(u){t&&console.error("Error fetching data:",u)}})(),()=>{t=!1}},[n]),r.useEffect(()=>{re()},[re]);const ue=r.useCallback(()=>{i(!0)},[]),pe=r.useCallback(()=>{i(!1)},[]),me=r.useCallback(t=>{U(!0),P("0"),V("0"),z("0"),D("0"),H("0"),A(t),i(!1)},[]),ne=r.useCallback(t=>{n(ie.doFetch()),y(t),b(!0)},[n]),xe=r.useCallback(()=>{b(!1),y(null)},[]),ge=r.useCallback(t=>{g(t),G(!0)},[]),he=r.useCallback(()=>{G(!1),g(null)},[]),se=r.useCallback(t=>{t==="openOrders"?(R("openOrders"),n(Y.doFetchPending())):(R("recentOrders"),n(Y.doFetch()))},[n]),W=r.useCallback(({width:t="100%",height:s="1em"})=>e.jsx("div",{className:"loading-placeholder",style:{width:t,height:s}}),[]),be=r.useMemo(()=>`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${p.split("USDT")[0]}.png`,[p]);return e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"header",children:[e.jsxs("div",{className:"header-top",children:[e.jsxs("div",{className:"market-info",children:[e.jsx("div",{className:"market-icon",children:e.jsx("img",{src:be,style:{width:30,height:30},alt:p,loading:"lazy",onError:t=>{t.target.style.display="none"}})}),e.jsx("div",{className:"market-name",children:p}),e.jsx("div",{className:"market-change",style:{color:w!=null&&w.startsWith("-")?"#FF6838":"#00C076"},children:w!=="0"?`${w}%`:e.jsx(W,{width:"50px",height:"16px"})})]}),e.jsx("div",{className:"additional-actions",onClick:ue,children:e.jsx("i",{className:"fas fa-filter"})})]}),e.jsx("div",{className:"market-price",children:j!=="0"?`$${M(j)}`:e.jsx(W,{width:"120px",height:"28px"})}),e.jsxs("div",{className:"market-stats",children:[e.jsxs("span",{children:["24h High:"," ",v!=="0"?`$${M(v)}`:e.jsx(W,{width:"80px",height:"12px"})]}),e.jsxs("span",{children:["24h Vol:"," ",E!=="0"?`${le(E)} ${p.replace("USDT","")}`:e.jsx(W,{width:"80px",height:"12px"})]}),e.jsxs("span",{children:["24h Low:"," ",L!=="0"?`$${M(L)}`:e.jsx(W,{width:"80px",height:"12px"})]})]})]}),e.jsx(we,{symbol:p}),e.jsxs("div",{className:"future-action-buttons",children:[e.jsx("button",{className:"action-button buy-button",onClick:()=>ne("up"),children:"BUY UP"}),e.jsx("button",{className:"action-button sell-button",onClick:()=>ne("down"),children:"BUY DOWN"})]}),e.jsxs("div",{className:"section-tabs",children:[e.jsxs("div",{className:`tab ${f==="openOrders"?"active":""}`,onClick:()=>se("openOrders"),children:["Open Orders (",N||0,")"]}),e.jsxs("div",{className:`tab ${f==="recentOrders"?"active":""}`,onClick:()=>se("recentOrders"),children:["Recent Orders (",a||0,")"]})]}),e.jsx(Ne,{countFutures:ee.count,futuretLoading:ee.loading,listFutures:ee.list,handleOpenOrderModal:ge,formatNumber:M,formatDateTime:ce}),B&&$&&e.jsx(ke,{selectedOrder:$,onClose:he,formatDateTimeDetailed:de,safeToFixed:I}),e.jsx(Fe,{isOpen:S,onClose:xe,direction:J,dispatch:n,listAssets:m,selectedCoin:p,marketPrice:j,availableBalance:q,setOpeningOrders:Z}),e.jsx(Ae,{isOpen:K,onClose:pe,onSelectCoin:me}),e.jsx("style",{children:`
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
      `})]})}const ke=({selectedOrder:n,onClose:m,formatDateTimeDetailed:c,safeToFixed:x})=>e.jsx("div",{className:"modal-overlays",onClick:m,children:e.jsxs("div",{className:"modal-content",onClick:N=>N.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{children:"Order Details"}),e.jsx("button",{className:"modal-close",onClick:m,children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsxs("div",{className:"modal-body",children:[e.jsxs("div",{className:"order-detail-section",children:[e.jsxs("div",{className:"detail-header",children:[e.jsx("span",{className:"detail-pair",children:n.symbol||n.pair}),e.jsx("span",{className:`detail-direction ${n.futuresStatus==="long"||n.direction==="BUY UP"?"buy":"sell"}`,children:n.futuresStatus==="long"?"BUY UP":n.futuresStatus==="short"?"BUY DOWN":n.direction})]}),e.jsxs("div",{className:`detail-status ${n.finalized?"closed":"open"}`,children:["● ",n.finalized?"Closed":"Open"]})]}),e.jsxs("div",{className:"order-detail-section",children:[e.jsx(F,{label:"Futures Amount:",value:`${n.futuresAmount||n.investment} USDT`}),n.contractDuration&&e.jsx(F,{label:"Contract Duration:",value:`${n.contractDuration} Seconds`}),e.jsx(F,{label:"Futures Status:",value:n.closePositionTime?"Completed":"Open"}),e.jsx(F,{label:"Open Position Price:",value:n.openPositionPrice||n.openPrice}),e.jsx(F,{label:"Open Position Time:",value:c(n.openPositionTime||n.openTime)}),n.closePositionPrice&&e.jsx(F,{label:"Close Position Price:",value:n.closePositionPrice}),n.closePositionTime&&e.jsx(F,{label:"Close Position Time:",value:c(n.closePositionTime)}),e.jsx(F,{label:"Profit And Loss Amount:",value:n.profitAndLossAmount||n.pnl?`${x(n.profitAndLossAmount||n.pnl,2)} USDT`:"__",className:n.control==="profit"?"profit":"loss"}),e.jsx(F,{label:"Leverage:",value:`${n.leverage}X`})]})]}),e.jsx("div",{className:"modal-footer",children:e.jsx("button",{className:"modal-button",onClick:m,children:"Done"})})]})}),F=({label:n,value:m,className:c=""})=>e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"detail-label",children:n}),e.jsx("span",{className:`detail-value ${c}`,children:m})]});export{De as default};
