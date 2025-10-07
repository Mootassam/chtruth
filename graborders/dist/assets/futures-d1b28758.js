import{r,l as _,m as xe,j as e,R as he,o as ge,u as W,i as ie,q as Z,k as le}from"./index-43651a87.js";import{C as fe}from"./CoinListModal-0fcb77bc.js";import{F as be}from"./FuturesChart-0a2cf5d0.js";import{u as je}from"./useDispatch-07f3b144.js";const Ne=({isOpen:A,onClose:f,direction:d,dispatch:F,listAssets:q,selectedCoin:L,marketPrice:$,availableBalance:j,setOpeningOrders:z})=>{const[m,I]=r.useState("120"),[l,J]=r.useState("2"),[a,P]=r.useState(1),[x,N]=r.useState("configuring"),[T,C]=r.useState(0),[D,v]=r.useState(null),[M,O]=r.useState(""),[k,E]=r.useState(null),[n,y]=r.useState(""),[Y,U]=r.useState(!1),[h,S]=r.useState(null);r.useEffect(()=>(A?document.body.style.overflow="hidden":document.body.style.overflow="unset",()=>{document.body.style.overflow="unset"}),[A]),r.useEffect(()=>{F(_.doFetch())},[F]),r.useEffect(()=>{a<=0?O("Amount must be greater than 0"):a>j?O("Insufficient balance"):O("")},[a,j]),r.useEffect(()=>{let o=null;return x==="in-progress"&&(T>0?o=setInterval(()=>{C(i=>i-1)},1e3):(async()=>await K())()),()=>{o&&clearInterval(o)}},[x,T]);const ee=async()=>{if(!(!d||a<=0||a>j)){U(!0);try{const o=await g();if(!o||!o.id){U(!1);return}S({futuresAmount:a,contractDuration:m,futuresStatus:d==="up"?"long":"short",openPositionPrice:parseFloat($||"0")||0,closePositionPrice:null,leverage:parseInt(l,10),openPositionTime:new Date,closePositionTime:null}),z(p=>[...p,{id:k,futuresAmount:a,contractDuration:m,futuresStatus:d==="up"?"long":"short",openPositionPrice:parseFloat($||"0")||0,closePositionPrice:null,leverage:parseInt(l,10),openPositionTime:new Date().toISOString(),closePositionTime:null}]);const i=parseInt(m,10)||0;C(i),N("in-progress")}catch(o){console.error("startTrade error",o)}finally{U(!1)}}},K=async()=>{if(z([]),!k){v("loss"),y(`-${a.toFixed(2)} USDT`),N("completed");return}try{const o=await F(xe.doFind(k)),i=o&&o.payload?o.payload:o;if(!i){v("loss"),y(`-${a.toFixed(2)} USDT`),N("completed");return}if(S({...h,closePositionPrice:i.closePositionPrice,closePositionTime:i.closePositionTime,profitAndLossAmount:i.profitAndLossAmount}),i.control==="profit"){v("win");const p=Number(i.profitAndLossAmount??V(a,l,m));y(`+${Number.isFinite(p)?p.toFixed(2):"0.00"} USDT`)}else{v("loss");const p=Number(i.futuresAmount??a);y(`-${Number.isFinite(p)?p.toFixed(2):a.toFixed(2)} USDT`)}N("completed"),F(_.doFetch())}catch(o){console.error("completeTrade error",o),v("loss"),y(`-${a.toFixed(2)} USDT`),N("completed")}},g=async()=>{const o=parseFloat($||"0")||0;let i=o;d==="up"?i=o*.95:i=o*1.05;const p={futuresStatus:d==="up"?"long":"short",profitAndLossAmount:a*parseInt(l,10)*parseInt(m,10)/1e4,leverage:parseInt(l,10),control:"loss",operate:"low",closePositionTime:new Date(Date.now()+parseInt(m,10)*1e3).toISOString(),closePositionPrice:i,openPositionTime:new Date().toISOString(),openPositionPrice:o,contractDuration:m,futuresAmount:a};try{const w=await F(ge.doCreate(p)),b=w&&w.id?w:w&&w.payload?w.payload:null;return b&&b.id?(E(b.id),b):(console.warn("Create did not return created record"),null)}catch(w){return console.error("create error",w),null}},B=()=>{N("configuring"),z([]),v(null),C(0),E(null),y(""),S(null)},V=(o,i,p)=>o*parseInt(i,10)*parseInt(p,10)/1e4,H=()=>{if(x!=="in-progress")return 0;const o=parseInt(m,10)||1;return(o-T)/o*100},X=o=>{const i=Math.floor(o/60),p=o%60;return`${i.toString().padStart(2,"0")}:${p.toString().padStart(2,"0")}`},G=o=>o?new Date(o).toLocaleTimeString():"-";if(!A)return null;const te=e.jsxs("div",{className:"modal-overlay",onClick:f,children:[e.jsxs("div",{className:`modal-container ${d==="up"?"up-theme":"down-theme"}`,onClick:o=>o.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{className:"pair-info",children:[e.jsx("div",{className:"pair-icon",children:e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${L.split("USDT")[0]}.png`,style:{width:30,height:30},alt:L,loading:"lazy"})}),e.jsx("div",{className:"pair-name",children:L.replace("USDT","/USDT")})]}),e.jsx("button",{className:"close-btn",onClick:f,children:"×"})]}),x!=="configuring"&&e.jsxs("div",{className:"trade-progress-section",children:[e.jsx("div",{className:"progress-container",children:e.jsx("div",{className:"circular-progress",style:{background:`conic-gradient(${d==="up"?"#00C076":"#FF6838"} ${H()}%, #3a3a3a ${H()}%)`},children:e.jsxs("div",{className:"progress-inner",children:[e.jsx("div",{className:"progress-time",children:X(T)}),e.jsx("div",{className:"progress-label",children:"Remaining"})]})})}),h&&e.jsxs("div",{className:"trade-details",children:[e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Futures Amount:"}),e.jsxs("span",{children:[h.futuresAmount," USDT"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Contract Duration:"}),e.jsxs("span",{children:[h.contractDuration,"s"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Future Type:"}),e.jsx("span",{className:h.futuresStatus==="long"?"up-text":"down-text",children:h.futuresStatus.toUpperCase()})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Open Position Price:"}),e.jsxs("span",{children:[h.openPositionPrice.toFixed(4)," USDT"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Close Position Price:"}),e.jsxs("span",{children:[h.closePositionPrice?h.closePositionPrice.toFixed(4):"-"," USDT"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Leverage:"}),e.jsxs("span",{children:[h.leverage,"x"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Open Time:"}),e.jsx("span",{children:G(h.openPositionTime)})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Close Time:"}),e.jsx("span",{children:G(h.closePositionTime)})]})]}),x==="completed"&&e.jsx("div",{className:`trade-result ${D??""}`,style:{color:D==="win"?"#00C076":"#FF6838"},children:n?D==="win"?`Trade Successful! ${n}`:`Trade Failed! ${n}`:D==="win"?`Trade Successful! +${V(a,l,m).toFixed(2)} USDT`:`Trade Failed! -${a.toFixed(2)} USDT`}),e.jsxs("div",{className:"trade-actions",children:[x==="in-progress"&&e.jsx("button",{className:"trade-action-btn keep-buying",onClick:f,children:"Keep Buying"}),x==="completed"&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"trade-action-btn secondary",onClick:f,children:"Close"}),e.jsx("button",{className:"trade-action-btn primary",onClick:B,children:"New Trade"})]})]})]}),x==="configuring"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:`direction-indicator ${d}-indicator`,children:d==="up"?"Predicting price will go UP":"Predicting price will go DOWN"}),e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"section",children:[e.jsxs("div",{className:"section-title",children:[e.jsx("span",{children:"Contract Duration"}),e.jsx("span",{children:"Payout"})]}),e.jsx("div",{className:"options-container",children:[{duration:"60",payout:"10"},{duration:"120",payout:"20"},{duration:"180",payout:"40"},{duration:"240",payout:"80"}].map(o=>e.jsxs("button",{className:`option-btn ${m===o.duration?"selected":""}`,onClick:()=>I(o.duration),children:[o.duration,"s (",o.payout,"%)"]},o.duration))})]}),e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"section-title",children:e.jsx("span",{children:"Leverage"})}),e.jsx("div",{className:"options-container",children:["2","5","10","20","50"].map(o=>e.jsxs("button",{className:`option-btn ${l===o?"selected":""}`,onClick:()=>J(o),children:[o,"×"]},o))})]}),e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"section-title",children:e.jsx("span",{children:"Futures Amount (USDT)"})}),e.jsxs("div",{className:"amount-control",children:[e.jsx("button",{className:"amount-btn",onClick:()=>P(o=>Math.max(1,o-1)),children:"-"}),e.jsx("input",{type:"number",className:"amount-inputs",value:a,onChange:o=>{const i=parseInt(o.target.value,10)||0;P(Math.max(0,i))},min:"1"}),e.jsx("button",{className:"amount-btn",onClick:()=>P(o=>o+1),children:"+"})]}),e.jsxs("div",{className:"balance-info",children:["Available: ",j," USDT"]}),M&&e.jsx("div",{className:"error-message",style:{color:"#FF6838",fontSize:"12px",marginTop:"5px"},children:M})]}),e.jsxs("div",{className:"profit-info",children:["Projected Profit: ",V(a,l,m).toFixed(2)," USDT"]}),e.jsx("button",{className:"confirm-btn",onClick:ee,disabled:!d||a<=0||a>j||Y,style:{opacity:!d||a<=0||a>j?.5:1,cursor:!d||a<=0||a>j?"not-allowed":"pointer"},children:Y?"CREATING...":a>j?"INSUFFICIENT BALANCE":"CONFIRM ORDER"})]})]})]}),e.jsx("style",{children:` 
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
`})]});return he.createPortal(te,document.body)};function Fe(){const A=je(),f=W(ie.selectRows);W(ie.selectLoading);const d=W(Z.selectRows),F=W(Z.selectLoading),q=W(Z.selectCount),[L,$]=r.useState(!1),[j,z]=r.useState(null),[m,I]=r.useState(!1),[l,J]=r.useState("BTCUSDT"),[a,P]=r.useState("0"),[x,N]=r.useState("0"),[T,C]=r.useState("0"),[D,v]=r.useState("0"),[M,O]=r.useState("0"),[k,E]=r.useState("openOrders"),[n,y]=r.useState(null),[Y,U]=r.useState(!1),[h,S]=r.useState(!0),[ee,K]=r.useState(!0),g=r.useRef(null),B=r.useRef(l),[V,H]=r.useState({}),[X,G]=r.useState(0),[te,o]=r.useState(!1),[i,p]=r.useState([]);console.log(i);const w=(t,s=2)=>{if(t==null)return"0.00";const c=typeof t=="string"?parseFloat(t):t;return isNaN(c)?"0.00":c.toFixed(s)},b=(t,s=2)=>{if(t==null)return"0.00";const c=typeof t=="string"?parseFloat(t):t;return isNaN(c)?"0.00":c.toLocaleString(void 0,{minimumFractionDigits:s,maximumFractionDigits:s})},ce=t=>{if(t==null)return"0";const s=typeof t=="string"?parseFloat(t):t;return isNaN(s)?"0":s>=1e9?(s/1e9).toFixed(2)+"B":s>=1e6?(s/1e6).toFixed(2)+"M":b(s,0)},oe=t=>{if(!t)return"N/A";try{const s=new Date(t);if(isNaN(s.getTime()))return t;const c=new Date;return s.toDateString()===c.toDateString()?`Today ${s.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}`:`${s.toLocaleDateString([],{month:"short",day:"numeric"})} ${s.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}`}catch(s){return console.error("Error formatting date:",s,t),t}},se=t=>{if(!t)return"N/A";try{const s=new Date(t);return isNaN(s.getTime())?t:`${s.toLocaleDateString([],{year:"numeric",month:"short",day:"numeric"})} ${s.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"})}`}catch(s){return console.error("Error formatting date:",s,t),t}},re=r.useCallback(()=>{if(f&&f.length>0){const t=f.reduce((s,c)=>(s[c.symbol]=c.amount,s),{});H(t),G(t.USDT||0),o(!0)}},[f]);r.useEffect(()=>{let t=!0;return(async()=>{try{S(!0);const c=await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${l}`);if(!c.ok)throw new Error("Failed to fetch ticker data");const u=await c.json();t&&(P(u.lastPrice||"0"),N(u.priceChangePercent||"0"),C(u.highPrice||"0"),v(u.lowPrice||"0"),O(u.volume||"0"),S(!1))}catch(c){console.error("Error fetching initial data:",c),t&&S(!1)}})(),()=>{t=!1}},[l]),r.useEffect(()=>{if(!l)return;let t=!0;B.current=l;const s=()=>{g.current&&g.current.close(),g.current=new WebSocket(`wss://stream.binance.com:9443/ws/${l.toLowerCase()}@ticker`),g.current.onopen=()=>{console.log(`Connected to ${l} ticker stream`)},g.current.onmessage=c=>{if(t)try{const u=JSON.parse(c.data);u.s===B.current&&t&&(P(u.c||"0"),N(u.P||"0"),C(u.h||"0"),v(u.l||"0"),O(u.v||"0"))}catch(u){console.error("Error parsing WebSocket message:",u)}},g.current.onerror=c=>{console.error("Ticker WebSocket error:",c)},g.current.onclose=c=>{console.log("Ticker WebSocket closed, attempting to reconnect..."),setTimeout(()=>{l&&l===B.current&&t&&(console.log("Attempting to reconnect ticker WebSocket..."),s())},2e3)}};return s(),()=>{t=!1,g.current&&g.current.readyState===WebSocket.OPEN&&g.current.close()}},[l]),r.useEffect(()=>{let t=!0;const s=setTimeout(()=>{t&&K(!1)},1500);return()=>{t=!1,clearTimeout(s)}},[]),r.useEffect(()=>{let t=!0;return(async()=>{try{await A(_.doFetch()),await A(le.doFetch())}catch(c){t&&console.error("Error fetching data:",c)}})(),()=>{t=!1}},[A]),r.useEffect(()=>{let t=!0;return t&&re(),()=>{t=!1}},[f,re]);const de=()=>{I(!0)},pe=()=>{I(!1)},ue=t=>{S(!0),P("0"),N("0"),C("0"),v("0"),O("0"),J(t),I(!1)},ne=t=>{A(le.doFetch()),z(t),$(!0)},me=()=>{$(!1),z(null)},ae=t=>{y(t),U(!0)},Q=()=>{U(!1),y(null)},R=({width:t="100%",height:s="1em"})=>e.jsx("div",{className:"loading-placeholder",style:{width:t,height:s}});return e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"header",children:[e.jsxs("div",{className:"header-top",children:[e.jsxs("div",{className:"market-info",children:[e.jsx("div",{className:"market-icon",children:e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${l.split("USDT")[0]}.png`,style:{width:30,height:30},alt:l,loading:"lazy"})}),e.jsx("div",{className:"market-name",children:l}),e.jsx("div",{className:"market-change",style:{color:x&&x.startsWith("-")?"#FF6838":"#00C076"},children:x!=="0"?`${x}%`:e.jsx(R,{width:"50px",height:"16px"})})]}),e.jsx("div",{className:"additional-actions",onClick:de,children:e.jsx("i",{className:"fas fa-filter"})})]}),e.jsx("div",{className:"market-price",children:a!=="0"?`$${b(a)}`:e.jsx(R,{width:"120px",height:"28px"})}),e.jsxs("div",{className:"market-stats",children:[e.jsxs("span",{children:["24h High:"," ",T!=="0"?`$${b(T)}`:e.jsx(R,{width:"80px",height:"12px"})]}),e.jsxs("span",{children:["24h Vol:"," ",M!=="0"?`${ce(M)} ${l.replace("USDT","")}`:e.jsx(R,{width:"80px",height:"12px"})]}),e.jsxs("span",{children:["24h Low:"," ",D!=="0"?`$${b(D)}`:e.jsx(R,{width:"80px",height:"12px"})]})]})]}),e.jsx(be,{symbol:l||"BTCUSDT"}),e.jsxs("div",{className:"future-action-buttons",children:[e.jsx("button",{className:"action-button buy-button",onClick:()=>ne("up"),children:"BUY UP"}),e.jsx("button",{className:"action-button sell-button",onClick:()=>ne("down"),children:"BUY DOWN"})]}),e.jsxs("div",{className:"section-tabs",children:[e.jsxs("div",{className:`tab ${k==="openOrders"?"active":""}`,onClick:()=>E("openOrders"),children:["Open Orders (",i.length,")"]}),e.jsxs("div",{className:`tab ${k==="recentOrders"?"active":""}`,onClick:()=>E("recentOrders"),children:["Recent Orders (",q,")"]})]}),k==="openOrders"&&e.jsx("div",{className:"orders-container",children:e.jsxs(e.Fragment,{children:[i&&i.map(t=>{var s;return e.jsxs("div",{className:"order-card",onClick:()=>ae(t),children:[e.jsxs("div",{className:"order-header",children:[e.jsx("div",{className:"order-pair",children:t.symbol||"BTC/USDT"}),e.jsx("div",{className:`order-direction ${t.futuresStatus==="long"?"buy":"sell"}`,children:t.futuresStatus==="long"?"BUY UP":"BUY DOWN"})]}),e.jsxs("div",{className:`order-status ${t.closePositionTime?"closed":"open"}`,children:["● ",t.closePositionTime?"Closed":"Open"]}),e.jsxs("div",{className:"order-details",children:[e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:"Futures Amount:"}),e.jsxs("span",{className:"order-value",children:["$",t.futuresAmount]})]}),e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:"Open Price:"}),e.jsx("span",{className:"order-value",children:b((s=t==null?void 0:t.openPositionPrice)==null?void 0:s.toString(),(t==null?void 0:t.openPositionPrice)>1e3?0:2)})]}),e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:"Open Time:"}),e.jsx("span",{className:"order-value",children:oe(t.openPositionTime)})]}),e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:"Leverage:"}),e.jsxs("span",{className:"order-value",children:[t.leverage,"x"]})]})]})]},t.id)}),i.length===0&&e.jsxs("div",{className:"no-orders",children:[e.jsx("i",{className:"fas fa-file-invoice"}),e.jsx("div",{children:"No recent orders"})]})]})}),k==="recentOrders"&&e.jsxs("div",{className:"orders-container",children:[q&&!F&&d.map(t=>{var s;return e.jsxs("div",{className:"order-card",onClick:()=>ae(t),children:[e.jsxs("div",{className:"order-header",children:[e.jsx("div",{className:"order-pair",children:t.symbol||"BTC/USDT"}),e.jsx("div",{className:`order-direction ${t.futuresStatus==="long"?"buy":"sell"}`,children:t.futuresStatus==="long"?"BUY UP":"BUY DOWN"})]}),e.jsxs("div",{className:`order-status ${t.closePositionTime?"closed":"open"}`,children:["● ",t.closePositionTime?"Closed":"Open"]}),e.jsxs("div",{className:"order-details",children:[e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:"Futures Amount:"}),e.jsxs("span",{className:"order-value",children:["$",t.futuresAmount]})]}),e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:"Open Price:"}),e.jsx("span",{className:"order-value",children:b((s=t==null?void 0:t.openPositionPrice)==null?void 0:s.toString(),(t==null?void 0:t.openPositionPrice)>1e3?0:2)})]}),e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:"Open Time:"}),e.jsx("span",{className:"order-value",children:oe(t.openPositionTime)})]}),e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:"Leverage:"}),e.jsxs("span",{className:"order-value",children:[t.leverage,"x"]})]})]})]},t.id)}),d.length===0&&!F&&e.jsxs("div",{className:"no-orders",children:[e.jsx("i",{className:"fas fa-file-invoice"}),e.jsx("div",{children:"No recent orders"})]})]}),Y&&n&&e.jsx("div",{className:"modal-overlays",onClick:Q,children:e.jsxs("div",{className:"modal-content",onClick:t=>t.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{children:"Order Details"}),e.jsx("button",{className:"modal-close",onClick:Q,children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsxs("div",{className:"modal-body",children:[e.jsxs("div",{className:"order-detail-section",children:[e.jsxs("div",{className:"detail-header",children:[e.jsx("span",{className:"detail-pair",children:n.symbol||n.pair}),e.jsx("span",{className:`detail-direction ${n.futuresStatus==="long"||n.direction==="BUY UP"?"buy":"sell"}`,children:n.futuresStatus==="long"?"BUY UP":n.futuresStatus==="short"?"BUY DOWN":n.direction})]}),e.jsxs("div",{className:`detail-status ${n.closePositionTime?"closed":"open"}`,children:["● ",n.closePositionTime?"Closed":"Open"]})]}),e.jsxs("div",{className:"order-detail-section",children:[e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"detail-label",children:"Futures Amount:"}),e.jsxs("span",{className:"detail-value",children:[n.futuresAmount||n.investment," ","USDT"]})]}),n.contractDuration&&e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"detail-label",children:"Contract Duration:"}),e.jsxs("span",{className:"detail-value",children:[n.contractDuration," Seconds"]})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"detail-label",children:"Futures Status:"}),e.jsx("span",{className:"detail-value",children:n.closePositionTime?"Completed":"Open"})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"detail-label",children:"Open Position Price:"}),e.jsx("span",{className:"detail-value",children:n.openPositionPrice||n.openPrice})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"detail-label",children:"Open Position Time:"}),e.jsx("span",{className:"detail-value",children:se(n.openPositionTime||n.openTime)})]}),n.closePositionPrice&&e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"detail-label",children:"Close Position Price:"}),e.jsx("span",{className:"detail-value",children:n.closePositionPrice})]}),n.closePositionTime&&e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"detail-label",children:"Close Position Time:"}),e.jsx("span",{className:"detail-value",children:se(n.closePositionTime)})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"detail-label",children:"Profit And Loss Amount:"}),e.jsxs("span",{className:`detail-value ${n.control==="profit"?"profit":"loss"}`,children:[w(n.profitAndLossAmount||n.pnl,2)," ","USDT"]})]}),e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"detail-label",children:"Leverage:"}),e.jsxs("span",{className:"detail-value",children:[n.leverage,"X"]})]})]})]}),e.jsx("div",{className:"modal-footer",children:e.jsx("button",{className:"modal-button",onClick:Q,children:"Done"})})]})}),e.jsx(Ne,{isOpen:L,onClose:me,direction:j,dispatch:A,listAssets:f,selectedCoin:l,marketPrice:a,availableBalance:X,setOpeningOrders:p}),e.jsx(fe,{isOpen:m,onClose:pe,onSelectCoin:ue}),e.jsx("style",{children:`
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
      `})]})}export{Fe as default};
