import{h as o,t as G,w as fe,j as e,R as je,x as ye,u as T,o as le,y as B,q as ce}from"./index-cbf01fde.js";import{C as Ae}from"./CoinListModal-899c3db8.js";import{F as we}from"./FuturesChart-8441699c.js";import{u as ve}from"./useDispatch-a9607fd6.js";const Fe=({isOpen:n,onClose:p,direction:c,dispatch:x,listAssets:N,selectedCoin:k,marketPrice:S,availableBalance:a,setOpeningOrders:C})=>{const[A,K]=o.useState("120"),[W,X]=o.useState(""),[y,m]=o.useState("2"),[l,D]=o.useState(1),[f,b]=o.useState("configuring"),[P,U]=o.useState(0),[_,w]=o.useState(null),[I,M]=o.useState(""),[z,L]=o.useState(null),[Q,v]=o.useState(""),[V,Y]=o.useState(!1),[g,q]=o.useState(null),O=(r,i)=>{K(r),X(i)};o.useEffect(()=>(n?document.body.style.overflow="hidden":document.body.style.overflow="unset",()=>{document.body.style.overflow="unset"}),[n]),o.useEffect(()=>{x(G.doFetch())},[x]),o.useEffect(()=>{l<=0?M("Amount must be greater than 0"):l>a?M("Insufficient balance"):M("")},[l,a]),o.useEffect(()=>{let r=null;return f==="in-progress"&&(P>0?r=setInterval(()=>{U(i=>i-1)},1e3):(async()=>await Z())()),()=>{r&&clearInterval(r)}},[f,P]);const ne=async()=>{if(!(!c||l<=0||l>a)){Y(!0);try{const r=await ee();if(!r||!r.id){Y(!1);return}q({futuresAmount:l,contractDuration:A,futuresStatus:c==="up"?"long":"short",openPositionPrice:parseFloat(S||"0")||0,closePositionPrice:null,leverage:parseInt(y,10),openPositionTime:new Date,closePositionTime:null}),C(d=>[...d,{id:z,futuresAmount:l,contractDuration:A,futuresStatus:c==="up"?"long":"short",openPositionPrice:parseFloat(S||"0")||0,closePositionPrice:null,leverage:parseInt(y,10),openPositionTime:new Date().toISOString(),closePositionTime:null}]);const i=parseInt(A,10)||0;U(i),b("in-progress")}catch(r){console.error("startTrade error",r)}finally{Y(!1)}}},Z=async()=>{if(C([]),!z){w("loss"),v(`-${l.toFixed(2)} USDT`),b("completed");return}try{const r=await x(fe.doFind(z)),i=r&&r.payload?r.payload:r;if(!i){w("loss"),v(`-${l.toFixed(2)} USDT`),b("completed");return}if(q({...g,closePositionPrice:i.closePositionPrice,closePositionTime:i.closePositionTime,profitAndLossAmount:i.profitAndLossAmount}),i.control==="profit"){w("win");const d=Number(i.profitAndLossAmount??oe(l,y,W));v(`+${Number.isFinite(d)?d.toFixed(2):"0.00"} USDT`)}else{w("loss");const d=Number(i.futuresAmount??l);v(`-${Number.isFinite(d)?d.toFixed(2):l.toFixed(2)} USDT`)}b("completed"),x(G.doFetchPending())}catch(r){console.error("completeTrade error",r),w("loss"),v(`-${l.toFixed(2)} USDT`),b("completed")}},ee=async()=>{const r=parseFloat(S||"0")||0,i={futuresStatus:c==="up"?"long":"short",profitAndLossAmount:"",leverage:parseInt(y,10),control:"loss",operate:"low",closePositionTime:"",closePositionPrice:"",openPositionTime:new Date().toISOString(),openPositionPrice:r,contractDuration:A,futuresAmount:l};try{const d=await x(ye.doCreate(i)),R=d&&d.id?d:d&&d.payload?d.payload:null;return R&&R.id?(L(R.id),R):(console.warn("Create did not return created record"),null)}catch(d){return console.error("create error",d),null}},te=()=>{b("configuring"),C([]),w(null),U(0),L(null),v(""),q(null)},oe=(r,i,d)=>r*parseInt(i,10)*parseInt(d,10)/100,J=()=>{if(f!=="in-progress")return 0;const r=parseInt(A,10)||1;return(r-P)/r*100},j=r=>{const i=Math.floor(r/60),d=r%60;return`${i.toString().padStart(2,"0")}:${d.toString().padStart(2,"0")}`},E=r=>r?new Date(r).toLocaleTimeString():"-";if(!n)return null;const $=e.jsxs("div",{className:"modal-overlay",onClick:p,children:[e.jsxs("div",{className:`modal-container ${c==="up"?"up-theme":"down-theme"}`,onClick:r=>r.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{className:"pair-info",children:[e.jsx("div",{className:"pair-icon",children:e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${k.split("USDT")[0]}.png`,style:{width:30,height:30},alt:k,loading:"lazy"})}),e.jsx("div",{className:"pair-name",children:k.replace("USDT","/USDT")})]}),e.jsx("button",{className:"close-btn",onClick:p,children:"×"})]}),f!=="configuring"&&e.jsxs("div",{className:"trade-progress-section",children:[e.jsx("div",{className:"progress-container",children:e.jsx("div",{className:"circular-progress",style:{background:`conic-gradient(${c==="up"?"#00C076":"#FF6838"} ${J()}%, #3a3a3a ${J()}%)`},children:e.jsxs("div",{className:"progress-inner",children:[e.jsx("div",{className:"progress-time",children:j(P)}),e.jsx("div",{className:"progress-label",children:"Remaining"})]})})}),g&&e.jsxs("div",{className:"trade-details",children:[e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Futures Amount:"}),e.jsxs("span",{children:[g.futuresAmount," USDT"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Contract Duration:"}),e.jsxs("span",{children:[g.contractDuration,"s"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Future Type:"}),e.jsx("span",{className:g.futuresStatus==="long"?"up-text":"down-text",children:g.futuresStatus.toUpperCase()})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Open Position Price:"}),e.jsxs("span",{children:[g.openPositionPrice.toFixed(4)," USDT"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Close Position Price:"}),e.jsxs("span",{children:[g.closePositionPrice?g.closePositionPrice.toFixed(4):"-"," USDT"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Leverage:"}),e.jsxs("span",{children:[g.leverage,"x"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Open Time:"}),e.jsx("span",{children:E(g.openPositionTime)})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Close Time:"}),e.jsx("span",{children:E(g.closePositionTime)})]})]}),e.jsxs("div",{className:"trade-actions",children:[f==="in-progress"&&e.jsx("button",{className:"trade-action-btn keep-buying",onClick:p,children:"Keep Buying"}),f==="completed"&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"trade-action-btn secondary",onClick:p,children:"Close"}),e.jsx("button",{className:"trade-action-btn primary",onClick:te,children:"New Trade"})]})]})]}),f==="configuring"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:`direction-indicator ${c}-indicator`,children:c==="up"?"Predicting price will go UP":"Predicting price will go DOWN"}),e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"section",children:[e.jsxs("div",{className:"section-title",children:[e.jsx("span",{children:"Contract Duration"}),e.jsx("span",{children:"Payout"})]}),e.jsx("div",{className:"options-container",children:[{duration:"60",payout:"10"},{duration:"120",payout:"20"},{duration:"180",payout:"40"},{duration:"240",payout:"80"}].map(r=>e.jsxs("button",{className:`option-btn ${A===r.duration?"selected":""}`,onClick:()=>O(r.duration,r.payout),children:[r.duration,"s (",r.payout,"%)"]},r.duration))})]}),e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"section-title",children:e.jsx("span",{children:"Leverage"})}),e.jsx("div",{className:"options-container",children:["1","2","5","10","20"].map(r=>e.jsxs("button",{className:`option-btn ${y===r?"selected":""}`,onClick:()=>m(r),children:[r,"×"]},r))})]}),e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"section-title",children:e.jsx("span",{children:"Futures Amount (USDT)"})}),e.jsxs("div",{className:"amount-control",children:[e.jsx("button",{className:"amount-btn",onClick:()=>D(r=>Math.max(1,r-1)),children:"-"}),e.jsx("input",{type:"number",className:"amount-inputs",value:l,onChange:r=>{const i=parseInt(r.target.value,10)||0;D(Math.max(0,i))},min:"1"}),e.jsx("button",{className:"amount-btn",onClick:()=>D(r=>r+1),children:"+"})]}),e.jsxs("div",{className:"balance-info",children:["Available: ",a," USDT"]}),I&&e.jsx("div",{className:"error-message",style:{color:"#FF6838",fontSize:"12px",marginTop:"5px"},children:I})]}),e.jsxs("div",{className:"profit-info",children:["Projected Profit: ",oe(l,y,W).toFixed(2)," USDT"]}),e.jsx("button",{className:"confirm-btn",onClick:ne,disabled:!c||l<=0||l>a||V,style:{opacity:!c||l<=0||l>a?.5:1,cursor:!c||l<=0||l>a?"not-allowed":"pointer"},children:V?"CREATING...":l>a?"INSUFFICIENT BALANCE":"CONFIRM ORDER"})]})]})]}),e.jsx("style",{children:` 
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
`})]});return je.createPortal($,document.body)};function Ne(n){const{countFutures:p,futuretLoading:c,listFutures:x,handleOpenOrderModal:N,formatNumber:k,formatDateTime:S}=n;return e.jsxs("div",{className:"orders-container",children:[p&&!c&&(x==null?void 0:x.map(a=>{var C;return e.jsxs("div",{className:"order-card",onClick:()=>N(a),children:[e.jsxs("div",{className:"order-header",children:[e.jsx("div",{className:"order-pair",children:a.symbol||"BTC/USDT"}),e.jsx("div",{className:`order-direction ${a.futuresStatus==="long"?"buy":"sell"}`,children:a.futuresStatus==="long"?"BUY UP":"BUY DOWN"})]}),e.jsxs("div",{className:`order-status ${a.finalized?"closed":"open"}`,children:["● ",a.finalized?"Closed":"Open"]}),e.jsxs("div",{className:"order-details",children:[e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:"Futures Amount:"}),e.jsxs("span",{className:"order-value",children:["$",a.futuresAmount]})]}),e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:"Open Price:"}),e.jsx("span",{className:"order-value",children:k((C=a==null?void 0:a.openPositionPrice)==null?void 0:C.toString(),(a==null?void 0:a.openPositionPrice)>1e3?0:2)})]}),e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:"Open Time:"}),e.jsx("span",{className:"order-value",children:S(a.openPositionTime)})]}),e.jsxs("div",{className:"order-row",children:[e.jsx("span",{className:"order-label",children:"Leverage:"}),e.jsxs("span",{className:"order-value",children:[a.leverage,"x"]})]})]})]},a.id)})),x.length===0&&!c&&e.jsxs("div",{className:"no-orders",children:[e.jsx("i",{className:"fas fa-file-invoice"}),e.jsx("div",{children:"No orders"})]}),e.jsx("style",{children:` .order-status {
          font-size: 12px;
          margin-bottom: 12px;
        }
        
        .order-status.open {
          color: #00C076;
        }
        
        .order-status.closed {
          color: #777;
        }`})]})}function De(){const n=ve(),p=T(le.selectRows);T(le.selectLoading);const c=T(B.selectRows),x=T(B.pendingRows),N=T(B.pendingcount),k=T(B.pendingLoading),S=T(B.selectLoading),a=T(B.selectCount),[C,A]=o.useState(!1),[K,W]=o.useState(null),[X,y]=o.useState(!1),[m,l]=o.useState("BTCUSDT"),[D,f]=o.useState("0"),[b,P]=o.useState("0"),[U,_]=o.useState("0"),[w,I]=o.useState("0"),[M,z]=o.useState("0"),[L,Q]=o.useState("openOrders"),[v,V]=o.useState(null),[Y,g]=o.useState(!1),[q,O]=o.useState(!0),[ne,Z]=o.useState(!0),[ee,te]=o.useState(0),[oe,J]=o.useState([]),j=o.useRef(null),E=o.useRef(m),$=o.useRef(),r=o.useCallback((t,s=2)=>{if(t==null)return"0.00";const u=typeof t=="string"?parseFloat(t):t;return isNaN(u)?"0.00":u.toFixed(s)},[]),i=o.useCallback((t,s=2)=>{if(t==null)return"0.00";const u=typeof t=="string"?parseFloat(t):t;return isNaN(u)?"0.00":u.toLocaleString(void 0,{minimumFractionDigits:s,maximumFractionDigits:s})},[]),d=o.useCallback(t=>{if(t==null)return"0";const s=typeof t=="string"?parseFloat(t):t;return isNaN(s)?"0":s>=1e9?(s/1e9).toFixed(2)+"B":s>=1e6?(s/1e6).toFixed(2)+"M":i(s,0)},[i]),R=o.useCallback(t=>{if(!t)return"N/A";try{const s=new Date(t);if(isNaN(s.getTime()))return t;const u=new Date;return s.toDateString()===u.toDateString()?`Today ${s.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}`:`${s.toLocaleDateString([],{month:"short",day:"numeric"})} ${s.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}`}catch(s){return console.error("Error formatting date:",s,t),t}},[]),de=o.useCallback(t=>{if(!t)return"N/A";try{const s=new Date(t);return isNaN(s.getTime())?t:`${s.toLocaleDateString([],{year:"numeric",month:"short",day:"numeric"})} ${s.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"})}`}catch(s){return console.error("Error formatting date:",s,t),t}},[]),se=o.useCallback(()=>{if((p==null?void 0:p.length)>0){const t=p.find(s=>s.symbol==="USDT");te((t==null?void 0:t.amount)||0)}},[p]),re=o.useMemo(()=>L==="openOrders"?{count:N,loading:k,list:Array.isArray(x)?x:[]}:{count:a,loading:S,list:Array.isArray(c)?c:[]},[L,N,k,x,a,S,c]);o.useEffect(()=>{let t=!0;return(async()=>{if(m)try{O(!0);const u=await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${m}`);if(!u.ok)throw new Error("Failed to fetch ticker data");const h=await u.json();t&&(f(h.lastPrice||"0"),P(h.priceChangePercent||"0"),_(h.highPrice||"0"),I(h.lowPrice||"0"),z(h.volume||"0"),O(!1))}catch(u){console.error("Error fetching initial data:",u),t&&O(!1)}})(),()=>{t=!1}},[m]),o.useEffect(()=>{if(!m)return;let t=!0;E.current=m;const s=()=>{j.current&&j.current.close(),$.current&&clearTimeout($.current);try{j.current=new WebSocket(`wss://stream.binance.com:9443/ws/${m.toLowerCase()}@ticker`),j.current.onopen=()=>{},j.current.onmessage=u=>{if(t)try{const h=JSON.parse(u.data);h.s===E.current&&t&&(f(h.c||"0"),P(h.P||"0"),_(h.h||"0"),I(h.l||"0"),z(h.v||"0"))}catch(h){console.error("Error parsing WebSocket message:",h)}},j.current.onerror=u=>{console.error("Ticker WebSocket error:",u)},j.current.onclose=u=>{m===E.current&&t&&($.current=setTimeout(s,2e3))}}catch(u){console.error("WebSocket connection error:",u)}};return s(),()=>{t=!1,j.current&&j.current.close(),$.current&&clearTimeout($.current)}},[m]),o.useEffect(()=>{const t=setTimeout(()=>{Z(!1)},1500);return()=>clearTimeout(t)},[]),o.useEffect(()=>{let t=!0;return(async()=>{try{await Promise.all([n(G.doFetchPending()),n(ce.doFetch())])}catch(u){t&&console.error("Error fetching data:",u)}})(),()=>{t=!1}},[n]),o.useEffect(()=>{se()},[se]);const ue=o.useCallback(()=>{y(!0)},[]),pe=o.useCallback(()=>{y(!1)},[]),me=o.useCallback(t=>{O(!0),f("0"),P("0"),_("0"),I("0"),z("0"),l(t),y(!1)},[]),ae=o.useCallback(t=>{n(ce.doFetch()),W(t),A(!0)},[n]),xe=o.useCallback(()=>{A(!1),W(null)},[]),ge=o.useCallback(t=>{V(t),g(!0)},[]),he=o.useCallback(()=>{g(!1),V(null)},[]),ie=o.useCallback(t=>{t==="openOrders"?(Q("openOrders"),n(G.doFetchPending())):(Q("recentOrders"),n(G.doFetch()))},[n]),H=o.useCallback(({width:t="100%",height:s="1em"})=>e.jsx("div",{className:"loading-placeholder",style:{width:t,height:s}}),[]),be=o.useMemo(()=>`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${m.split("USDT")[0]}.png`,[m]);return e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"header",children:[e.jsxs("div",{className:"header-top",children:[e.jsxs("div",{className:"market-info",children:[e.jsx("div",{className:"market-icon",children:e.jsx("img",{src:be,style:{width:30,height:30},alt:m,loading:"lazy",onError:t=>{t.target.style.display="none"}})}),e.jsx("div",{className:"market-name",children:m}),e.jsx("div",{className:"market-change",style:{color:b!=null&&b.startsWith("-")?"#FF6838":"#00C076"},children:b!=="0"?`${b}%`:e.jsx(H,{width:"50px",height:"16px"})})]}),e.jsx("div",{className:"additional-actions",onClick:ue,children:e.jsx("i",{className:"fas fa-filter"})})]}),e.jsx("div",{className:"market-price",children:D!=="0"?`$${i(D)}`:e.jsx(H,{width:"120px",height:"28px"})}),e.jsxs("div",{className:"market-stats",children:[e.jsxs("span",{children:["24h High:"," ",U!=="0"?`$${i(U)}`:e.jsx(H,{width:"80px",height:"12px"})]}),e.jsxs("span",{children:["24h Vol:"," ",M!=="0"?`${d(M)} ${m.replace("USDT","")}`:e.jsx(H,{width:"80px",height:"12px"})]}),e.jsxs("span",{children:["24h Low:"," ",w!=="0"?`$${i(w)}`:e.jsx(H,{width:"80px",height:"12px"})]})]})]}),e.jsx(we,{symbol:m}),e.jsxs("div",{className:"future-action-buttons",children:[e.jsx("button",{className:"action-button buy-button",onClick:()=>ae("up"),children:"BUY UP"}),e.jsx("button",{className:"action-button sell-button",onClick:()=>ae("down"),children:"BUY DOWN"})]}),e.jsxs("div",{className:"section-tabs",children:[e.jsxs("div",{className:`tab ${L==="openOrders"?"active":""}`,onClick:()=>ie("openOrders"),children:["Open Orders (",N||0,")"]}),e.jsxs("div",{className:`tab ${L==="recentOrders"?"active":""}`,onClick:()=>ie("recentOrders"),children:["Recent Orders (",a||0,")"]})]}),e.jsx(Ne,{countFutures:re.count,futuretLoading:re.loading,listFutures:re.list,handleOpenOrderModal:ge,formatNumber:i,formatDateTime:R}),Y&&v&&e.jsx(ke,{selectedOrder:v,onClose:he,formatDateTimeDetailed:de,safeToFixed:r}),e.jsx(Fe,{isOpen:C,onClose:xe,direction:K,dispatch:n,listAssets:p,selectedCoin:m,marketPrice:D,availableBalance:ee,setOpeningOrders:J}),e.jsx(Ae,{isOpen:X,onClose:pe,onSelectCoin:me}),e.jsx("style",{children:`
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
      `})]})}const ke=({selectedOrder:n,onClose:p,formatDateTimeDetailed:c,safeToFixed:x})=>e.jsx("div",{className:"modal-overlays",onClick:p,children:e.jsxs("div",{className:"modal-content",onClick:N=>N.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{children:"Order Details"}),e.jsx("button",{className:"modal-close",onClick:p,children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsxs("div",{className:"modal-body",children:[e.jsxs("div",{className:"order-detail-section",children:[e.jsxs("div",{className:"detail-header",children:[e.jsx("span",{className:"detail-pair",children:n.symbol||n.pair}),e.jsx("span",{className:`detail-direction ${n.futuresStatus==="long"||n.direction==="BUY UP"?"buy":"sell"}`,children:n.futuresStatus==="long"?"BUY UP":n.futuresStatus==="short"?"BUY DOWN":n.direction})]}),e.jsxs("div",{className:`detail-status ${n.finalized?"closed":"open"}`,children:["● ",n.finalized?"Closed":"Open"]})]}),e.jsxs("div",{className:"order-detail-section",children:[e.jsx(F,{label:"Futures Amount:",value:`${n.futuresAmount||n.investment} USDT`}),n.contractDuration&&e.jsx(F,{label:"Contract Duration:",value:`${n.contractDuration} Seconds`}),e.jsx(F,{label:"Futures Status:",value:n.closePositionTime?"Completed":"Open"}),e.jsx(F,{label:"Open Position Price:",value:n.openPositionPrice||n.openPrice}),e.jsx(F,{label:"Open Position Time:",value:c(n.openPositionTime||n.openTime)}),n.closePositionPrice&&e.jsx(F,{label:"Close Position Price:",value:n.closePositionPrice}),n.closePositionTime&&e.jsx(F,{label:"Close Position Time:",value:c(n.closePositionTime)}),e.jsx(F,{label:"Profit And Loss Amount:",value:n.profitAndLossAmount||n.pnl?`${x(n.profitAndLossAmount||n.pnl,2)} USDT`:"__",className:n.control==="profit"?"profit":"loss"}),e.jsx(F,{label:"Leverage:",value:`${n.leverage}X`})]})]}),e.jsx("div",{className:"modal-footer",children:e.jsx("button",{className:"modal-button",onClick:p,children:"Done"})})]})}),F=({label:n,value:p,className:c=""})=>e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"detail-label",children:n}),e.jsx("span",{className:`detail-value ${c}`,children:p})]});export{De as default};
