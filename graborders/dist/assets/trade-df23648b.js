import{u as _,q as ue,t as me,i as o,v as xe,w as be,k as s,x as J,j as e,L as ge}from"./index-aca44342.js";import{C as he}from"./CoinListModal-e90cb3b4.js";import{u as fe}from"./useDispatch-08c05b9c.js";const c=d=>{if(d==null||d==="")return NaN;const N=Number(d);return Number.isFinite(N)?N:NaN};function ve(){const d=fe(),N=_(ue.selectRows)||[],O=_(me.selectRows)||[],[p,H]=o.useState("BTCUSDT"),[x,G]=o.useState("0"),[P,X]=o.useState("0"),[Y,U]=o.useState(!1),[i,Z]=o.useState("LIMIT"),[u,w]=o.useState("0"),[f,j]=o.useState(""),[ee,A]=o.useState(""),[l,z]=o.useState("buy"),[S,te]=o.useState({asks:[],bids:[]}),[b,L]=o.useState(!0),[C,E]=o.useState(!1),[R,F]=o.useState(""),y=o.useRef(null),v=o.useRef(null),K=o.useRef(0),Q=o.useRef(0),B=o.useMemo(()=>Array.isArray(O)?O.reduce((t,r)=>(t[r.symbol]=Number(r.amount)||0,t),{}):{},[O]),k=o.useMemo(()=>p.replace("USDT",""),[p]),g=o.useMemo(()=>l==="buy"?B.USDT||0:B[k]||0,[l,k,B]),W=o.useCallback(()=>{const t=Date.now().toString(36),r=Math.floor(Math.random()*1e6).toString(36);return`ORD-${t}-${r}`.toUpperCase()},[]);o.useEffect(()=>{d(xe.doFetch()),d(be.doFetcPending());const t=setTimeout(()=>L(!1),800);return()=>clearTimeout(t)},[d]),o.useEffect(()=>{if(x&&x!=="0"&&(w(x),f&&!isNaN(Number(f)))){const t=Number(f)*Number(x);A(t.toFixed(2))}},[x]);const D=o.useCallback(t=>{const r=c(t),a=c(u);if(Number.isFinite(r)&&Number.isFinite(a)&&a>0){const n=r/a;j(n.toFixed(8))}else j("")},[u]),M=o.useCallback(t=>{const r=c(t),a=c(u);if(Number.isFinite(r)&&Number.isFinite(a)){const n=r*a;A(n.toFixed(2))}else A("")},[u]),re=o.useCallback(t=>{const r=t.target.value;j(r),M(r)},[M]),oe=o.useCallback(t=>{const r=t.target.value;A(r),D(r)},[D]),m=o.useCallback((t,r=2)=>{const a=Number(t);return Number.isFinite(a)?a.toLocaleString(void 0,{minimumFractionDigits:r,maximumFractionDigits:r}):0 .toFixed(r)},[]);o.useEffect(()=>{if(p){if(y.current){try{y.current.close()}catch{}y.current=null}try{const t=p.toLowerCase(),r=new WebSocket(`wss://stream.binance.com:9443/ws/${t}@ticker`);y.current=r,r.onmessage=a=>{try{const n=JSON.parse(a.data),h=performance.now();h-K.current>180&&(K.current=h,n.c!==void 0&&G(n.c),n.P!==void 0&&X(n.P))}catch{}},r.onerror=a=>{console.error("Ticker WebSocket error:",a)}}catch(t){console.error("Ticker WS init error",t)}return()=>{if(y.current){try{y.current.close()}catch{}y.current=null}}}},[p]),o.useEffect(()=>{if(p){if(v.current){try{v.current.close()}catch{}v.current=null}try{const t=p.toLowerCase(),r=new WebSocket(`wss://stream.binance.com:9443/ws/${t}@depth20@100ms`);v.current=r,r.onmessage=a=>{try{const n=JSON.parse(a.data),h=performance.now();if(h-Q.current>180){Q.current=h;const I=(n.asks||[]).slice(0,5).map(T=>({price:T[0],amount:T[1]})),$=(n.bids||[]).slice(0,5).map(T=>({price:T[0],amount:T[1]}));te({asks:I,bids:$})}}catch{}}}catch(t){console.error("Depth WS init error",t)}return()=>{if(v.current){try{v.current.close()}catch{}v.current=null}}}},[p]);const q=o.useMemo(()=>{const t=[...S.asks.map(r=>c(r.amount)),...S.bids.map(r=>c(r.amount))].filter(r=>Number.isFinite(r));return Math.max(...t,1)},[S]),ae=o.useCallback(()=>U(!0),[]),se=o.useCallback(()=>U(!1),[]),ne=o.useCallback(t=>{if(!t)return;H(t),U(!1),L(!0),j(""),A("");const r=setTimeout(()=>L(!1),600);return()=>clearTimeout(r)},[]),ie=o.useCallback(t=>{const r=t.target.value;w(r);const a=c(f);if(Number.isFinite(a)){const n=a*Number(r);A(n.toFixed(2))}},[f]);o.useCallback(t=>{if(l==="buy"){const a=g*t;A(a.toFixed(2)),D(a)}else{const a=g*t;j(a.toFixed(8)),M(a)}},[l,g,D,M]);const le=o.useCallback(()=>{const t=c(u),r=Number.isFinite(t)?t+1:c(x)||0;w(r.toString())},[u,x]),ce=o.useCallback(()=>{const t=c(u);if(!Number.isFinite(t))return;const r=Math.max(1e-4,t-1);w(r.toString())},[u]),V=o.useCallback(t=>{i==="LIMIT"&&t!==void 0&&w(t.toString())},[i]),de=o.useCallback(async()=>{if(F(""),C)return;const t=c(f),r=c(i==="MARKET"?x:u);if(!Number.isFinite(t)||t<=0){F(s("pages.trade.errors.invalidQuantity"));return}if(!Number.isFinite(r)||r<=0){F(s("pages.trade.errors.invalidPrice"));return}if(l==="buy"){if(r*t>g){F(s("pages.trade.errors.insufficientUSDT",m(g,2)));return}}else if(t>g){F(s("pages.trade.errors.insufficientCoin",m(g,6),k));return}E(!0);try{const a=r,n=t,h=a*n,I=h*.001,$={orderNo:W(),orderType:i.toLowerCase(),tradingPair:p.replace("USDT","/USDT"),status:i==="MARKET"?"completed":"pending",direction:l.toUpperCase(),delegateType:i,delegateState:i==="MARKET"?"Filled":"Pending",orderQuantity:n,commissionPrice:a,entrustedValue:h,transactionQuantity:i==="MARKET"?n:0,transactionValue:i==="MARKET"?h:0,closingPrice:i==="MARKET"?a:0,handlingFee:i==="MARKET"?I:0,commissionTime:new Date().toISOString(),closingTime:i==="MARKET"?new Date().toISOString():null};await d(J.doCreate($)),j(""),A("")}catch(a){console.error("Place order error",a),F(s("pages.trade.errors.failedOrder"))}finally{E(!1)}},[C,f,i,x,u,p,l,d,W,g,k,m]),pe=async(t,r)=>{r.status="canceled",d(J.doUpdate(t,r))};return e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"trade-header",children:[e.jsx("div",{className:"trade-header-top",children:e.jsx("div",{className:"trade-page-title",children:s("pages.trade.title")})}),e.jsxs("div",{className:"market-info",children:[b?e.jsx("div",{className:"skeleton-market-name"}):e.jsx("div",{className:"market-name",children:p.replace("USDT","/USDT")}),e.jsx("div",{className:"coin-select-icon",onClick:ae,"aria-hidden":!0,children:e.jsx("i",{className:"fas fa-chevron-down"})}),b?e.jsx("div",{className:"skeleton-price-change"}):e.jsxs("div",{className:"market-change",style:{color:String(P).startsWith("-")?"#FF6838":"#00C076"},children:[String(P).startsWith("-")?"":"+",P,"%"]})]})]}),e.jsxs("div",{className:"main-content",children:[e.jsxs("div",{className:"trading-layout",children:[e.jsxs("div",{className:"trade-form",children:[e.jsx("div",{className:"buy-sell-tabs",role:"tablist",children:b?e.jsx("div",{className:"skeleton-tab"}):e.jsxs(e.Fragment,{children:[e.jsx("div",{role:"tab","aria-selected":l==="buy",tabIndex:0,className:`buy-tab ${l==="buy"?"active":""}`,onClick:()=>z("buy"),onKeyDown:t=>t.key==="Enter"&&z("buy"),children:s("pages.trade.buy")}),e.jsx("div",{role:"tab","aria-selected":l==="sell",tabIndex:0,className:`sell-tab ${l==="sell"?"active":""}`,onClick:()=>z("sell"),onKeyDown:t=>t.key==="Enter"&&z("sell"),children:s("pages.trade.sell")})]})}),e.jsxs("div",{className:"order-type",children:[e.jsx("div",{className:"order-type-label",children:s("pages.trade.orderType")}),b?e.jsx("div",{className:"skeleton-input"}):e.jsxs("select",{className:"order-type-select",value:i,onChange:t=>Z(t.target.value),children:[e.jsx("option",{value:"LIMIT",children:s("pages.trade.limit")}),e.jsx("option",{value:"MARKET",children:s("pages.trade.market")})]})]}),i==="LIMIT"&&e.jsxs("div",{className:"input-group",children:[e.jsx("div",{className:"input-label",children:s("pages.trade.price")}),b?e.jsx("div",{className:"skeleton-input"}):e.jsxs("div",{className:"input-with-buttons",children:[e.jsx("input",{className:"value-input",value:u,onChange:ie,inputMode:"decimal","aria-label":"price"}),e.jsxs("div",{className:"value-buttons",children:[e.jsx("button",{className:"value-button",onClick:le,"aria-label":s("pages.trade.increasePrice"),children:"+"}),e.jsx("button",{className:"value-button",onClick:ce,"aria-label":s("pages.trade.decreasePrice"),children:"-"})]})]})]}),e.jsxs("div",{className:"input-group",children:[e.jsxs("div",{className:"input-label",children:[s("pages.trade.amount")," (",k,")"]}),b?e.jsx("div",{className:"skeleton-input"}):e.jsx("div",{className:"input-with-buttons",children:e.jsx("input",{className:"value-input",value:f,onChange:re,placeholder:"0.0",inputMode:"decimal","aria-label":"quantity"})})]}),e.jsxs("div",{className:"input-group",children:[e.jsxs("div",{className:"input-label",children:[s("pages.trade.amount")," (USDT)"]}),b?e.jsx("div",{className:"skeleton-input"}):e.jsx("input",{className:"value-input",value:ee,onChange:oe,placeholder:"0.0",inputMode:"decimal","aria-label":"amount in usdt"})]}),b?e.jsx("div",{className:"skeleton-balance"}):e.jsxs("div",{className:"balance-info",children:[s("pages.trade.available"),": ",m(g,l==="buy"?2:6)," ",l==="buy"?"USDT":k]}),R&&e.jsx("div",{className:"error-message",role:"alert",children:R}),b?e.jsx("div",{className:"skeleton-button"}):e.jsx("button",{className:`action-button ${l==="buy"?"buy-button":"sell-button"}`,onClick:de,disabled:C,"aria-busy":C,children:C?s("pages.trade.placing"):`${l==="buy"?s("pages.trade.buy"):s("pages.trade.sell")} ${k}`})]}),e.jsxs("div",{className:"order-book",role:"region","aria-label":"order book",children:[e.jsxs("div",{className:"order-book-header",children:[e.jsx("span",{children:s("pages.trade.orderBook.price")}),e.jsxs("span",{children:[s("pages.trade.orderBook.amount")," (",k,")"]})]}),b?e.jsxs(e.Fragment,{children:[[...Array(5)].map((t,r)=>e.jsx("div",{className:"skeleton-order-book"},`s-a-${r}`)),e.jsx("div",{className:"skeleton-current-price"}),[...Array(5)].map((t,r)=>e.jsx("div",{className:"skeleton-order-book"},`s-b-${r}`))]}):e.jsxs(e.Fragment,{children:[S.asks.map((t,r)=>{const a=c(t.amount)||0,n=Math.min(100,a/q*100);return e.jsxs("div",{className:"order-book-row ask-row",onClick:()=>V(t.price),children:[e.jsx("div",{className:"depth-bar ask-depth",style:{width:`${n}%`}}),e.jsx("div",{className:"order-price",children:m(t.price,4)}),e.jsx("div",{className:"order-amount",children:m(t.amount,4)})]},`ask-${r}`)}),e.jsx("div",{className:"order-book-row current-price-row",children:e.jsxs("div",{className:"current-price",children:["$",m(x,2)]})}),S.bids.map((t,r)=>{const a=c(t.amount)||0,n=Math.min(100,a/q*100);return e.jsxs("div",{className:"order-book-row bid-row",onClick:()=>V(t.price),children:[e.jsx("div",{className:"depth-bar bid-depth",style:{width:`${n}%`}}),e.jsx("div",{className:"order-price",children:m(t.price,4)}),e.jsx("div",{className:"order-amount",children:m(t.amount,4)})]},`bid-${r}`)})]})]})]}),e.jsxs("div",{className:"open-orders",children:[e.jsxs("div",{className:"open-orders-header",children:[e.jsx("div",{className:"open-orders-title",children:s("pages.trade.openOrders.title")}),e.jsx("div",{className:"orders-filter",children:e.jsx(ge,{to:"/ordersPage",className:"remove_blue","aria-label":s("pages.trade.openOrders.viewAll"),children:e.jsx("i",{className:"fas fa-list"})})})]}),N&&N.length>0?e.jsx("div",{className:"orders-list",children:N.map(t=>{var r;return e.jsxs("div",{className:"order-item",children:[e.jsxs("div",{className:"order-main-info",children:[e.jsxs("div",{className:"order-pair-action",children:[e.jsx("span",{className:"order-pair",children:t.tradingPair}),e.jsx("span",{className:`order-action ${String((t==null?void 0:t.direction)||"").toLowerCase()}`,children:t.direction}),e.jsx("span",{className:"order-type-badge",children:t.orderType})]}),e.jsxs("div",{className:"order-date",children:[t.commissionTime?new Date(t.commissionTime).toLocaleDateString():"",e.jsx("span",{className:"order-time",children:t.commissionTime?new Date(t.commissionTime).toLocaleTimeString():""})]})]}),e.jsxs("div",{className:"order-details",children:[e.jsxs("div",{className:"order-detail",children:[e.jsx("span",{className:"detail-label",children:s("pages.trade.openOrders.status")}),e.jsx("span",{className:`order-status ${String(t.status).toLowerCase()}`,children:t.status})]}),e.jsxs("div",{className:"order-detail",children:[e.jsx("span",{className:"detail-label",children:s("pages.trade.openOrders.price")}),e.jsxs("span",{className:"order-price-value",children:[m(t.commissionPrice,4)," USDT"]})]}),e.jsxs("div",{className:"order-detail",children:[e.jsx("span",{className:"detail-label",children:s("pages.trade.openOrders.amount")}),e.jsxs("span",{className:"order-amount-value",children:[t.orderQuantity," ",(r=t==null?void 0:t.tradingPair)==null?void 0:r.split("/")[0]]})]}),e.jsxs("div",{className:"order-detail",children:[e.jsx("span",{className:"detail-label",children:s("pages.trade.openOrders.total")}),e.jsxs("span",{className:"order-total",children:[m(t.entrustedValue)," USDT"]})]})]}),e.jsx("div",{className:"order-actions",children:String(t.status).toLowerCase()==="pending"||String(t.status).toLowerCase()==="partially filled"?e.jsx("button",{className:"cancel-order-btn",onClick:()=>pe(t.id,t),children:s("pages.trade.openOrders.cancel")}):e.jsx("div",{className:"completed-indicator",children:e.jsx("i",{className:"fas fa-check-circle"})})})]},t.id??t.orderNo)})}):e.jsxs("div",{className:"empty-orders",children:[e.jsx("div",{className:"empty-icon",children:e.jsx("i",{className:"fas fa-clipboard-list"})}),e.jsx("div",{className:"empty-text",children:s("pages.trade.openOrders.noOrders")}),e.jsx("div",{className:"empty-subtext",children:s("pages.trade.openOrders.noOrdersSubtext")})]})]})]}),e.jsx(he,{isOpen:Y,onClose:se,onSelectCoin:ne}),e.jsx("style",{children:`
        /* Trade Header Section */
        .container {
          background-color: #000000;
          color: #FFFFFF;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        }
        
        .trade-header {
          background-color: #000000;
          padding: 10px 12px;
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 1px solid #2A2A2A;
        }

        .trade-header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }

        .trade-page-title {
          font-size: 16px;
          font-weight: bold;
        }

        .settings-icon {
          color: #AAAAAA;
          font-size: 18px;
          cursor: pointer;
        }

        .market-info {
          display: flex;
          align-items: center;
        }

        .market-name {
          font-weight: bold;
          font-size: 14px;
          margin-right: 8px;
        }

        .coin-select-icon {
          color: #F3BA2F;
          font-size: 14px;
          cursor: pointer;
          margin-right: 10px;
        }

        .market-change {
          font-size: 12px;
          font-weight: 500;
        }

        /* Main Content */
        .main-content {
          padding: 10px;
        }

        /* Trading Layout */
        .trading-layout {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin-bottom: 12px;
        }

        .trade-form {
          // background-color: #1A1A1A;
          // border-radius: 6px;
          // padding: 12px;
        }

        .order-book {
          // background-color: #1A1A1A;
          // border-radius: 6px;
          // padding: 12px;
          overflow-y: auto;
          position: relative;
        }

        /* Buy/Sell Tabs */
        .buy-sell-tabs {
          display: flex;
          margin-bottom: 12px;
          background-color: #2A2A2A;
          border-radius: 4px;
          overflow: hidden;
        }

        .buy-tab,
        .sell-tab {
          flex: 1;
          text-align: center;
          padding: 8px;
          font-weight: bold;
          cursor: pointer;
          font-size: 12px;
        }

        .buy-tab {
          background-color: #2A2A2A;
          color: #FFF;
        }

        .buy-tab.active {
          background-color: #00C076;
          color: #000;
        }

        .sell-tab {
          background-color: #2A2A2A;
          color: #FFF;
        }

        .sell-tab.active {
          background-color: #FF6838;
          color: #FFF;
        }

        /* Order Type */
        .order-type {
          margin-bottom: 12px;
        }

        .order-type-label {
          font-size: 12px;
          color: #AAAAAA;
          margin-bottom: 5px;
        }

        .order-type-select {
          width: 100%;
          background-color: #2A2A2A;
          color: #FFFFFF;
          border: none;
          border-radius: 4px;
          padding: 8px;
          font-size: 12px;
        }

        /* Input Fields */
        .input-group {
          margin-bottom: 12px;
        }

        .input-label {
          display: block;
          font-size: 12px;
          color: #AAAAAA;
          margin-bottom: 5px;
        }

        .input-with-buttons {
          display: flex;
          align-items: center;
          background-color: #2A2A2A;
          border-radius: 4px;
          padding: 4px;
        }

        .value-input {
          flex: 1;
          background: transparent;
          border: none;
          color: #FFFFFF;
          font-size: 12px;
          padding: 6px;
          outline: none;
        }

        .value-buttons {
          display: flex;
        }

        .value-button {
          background-color: #1A1A1A;
          color: #FFFFFF;
          border: none;
          width: 22px;
          height: 22px;
          border-radius: 3px;
          margin-left: 3px;
          cursor: pointer;
          font-size: 10px;
        }

        .value-button:hover {
          background-color: #2A2A2A;
        }

        .amount-display {
          background-color: #2A2A2A;
          border-radius: 4px;
          padding: 8px;
          margin-bottom: 12px;
          font-size: 12px;
          text-align: center;
        }

        .balance-info {
          font-size: 11px;
          color: #AAAAAA;
          margin-bottom: 12px;
          text-align: center;
        }

        /* Action Button */
        .action-button {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 4px;
          font-size: 13px;
          font-weight: bold;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: background-color 0.2s;
        }

        .buy-button {
          background-color: #00C076;
          color: white;
        }

        .buy-button:hover {
          background-color: #00a766;
        }

        .sell-button {
          background-color: #FF6838;
          color: white;
        }

        .sell-button:hover {
          background-color: #e04444;
        }

        /* Order Book */
        .order-book-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 10px;
          color: #AAAAAA;
          padding: 0 5px;
        }

        .order-book-row {
          display: flex;
          justify-content: space-between;
          padding: 6px 5px;
          font-size: 11px;
          cursor: pointer;
          transition: background-color 0.2s;
          position: relative;
          z-index: 1;
        }

        .depth-bar {
          position: absolute;
          top: 0;
          height: 100%;
          opacity: 0.2;
          z-index: -1;
          transition: width 0.3s ease;
        }

        .ask-depth {
          right: 0;
          background-color: #FF6838;
        }

        .bid-depth {
          left: 0;
          background-color: #00C076;
        }

        .order-book-row:hover {
          background-color: rgba(42, 42, 42, 0.7);
          border-radius: 3px;
        }

        .order-price {
          flex: 1;
        }

        .order-amount {
          flex: 1;
          text-align: right;
        }

        .ask-row .order-price {
          color: #FF6838;
        }

        .bid-row .order-price {
          color: #00C076;
        }

        .current-price-row {
          display: flex;
          justify-content: center;
          margin: 8px 0;
          padding: 8px 0;
          border-top: 1px solid #2A2A2A;
          border-bottom: 1px solid #2A2A2A;
        }

        .current-price {
          font-weight: bold;
          color: #F3BA2F;
          font-size: 13px;
        }

        /* Open Orders */
        .open-orders {
          padding: 12px;
          background-color: #1A1A1A;
          border-radius: 6px;
        }

        .open-orders-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .open-orders-title {
          font-size: 13px;
          font-weight: bold;
          color: #F3BA2F;
        }

        .orders-filter {
          display: flex;
          background-color: #2A2A2A;
          border-radius: 4px;
          padding: 2px;
          font-size: 11px;
        }

        .orders-filter span {
          padding: 4px 8px;
          cursor: pointer;
          border-radius: 3px;
        }

        .orders-filter span.active {
          background-color: #F3BA2F;
          color: #000;
        }

        .order-item {
          background-color: #2A2A2A;
          border-radius: 6px;
          padding: 12px;
          margin-bottom: 10px;
          position: relative;
        }

        .order-main-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .order-pair-action {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .order-pair {
          font-weight: bold;
          font-size: 13px;
        }

        .order-action {
          font-size: 11px;
          padding: 2px 6px;
          border-radius: 3px;
          font-weight: bold;
        }

        .order-action.buy {
          background-color: rgba(0, 192, 118, 0.2);
          color: #00C076;
        }

        .order-action.sell {
          background-color: rgba(255, 104, 56, 0.2);
          color: #FF6838;
        }

        .order-type-badge {
          font-size: 10px;
          color: #AAAAAA;
          background-color: #1A1A1A;
          padding: 2px 5px;
          border-radius: 3px;
        }

        .order-date {
          font-size: 11px;
          color: #AAAAAA;
        }

        .order-time {
          color: #777;
        }

        .order-details {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          margin-bottom: 12px;
        }

        .order-detail {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .detail-label {
          font-size: 11px;
          color: #AAAAAA;
        }

        .order-status {
          font-size: 11px;
          font-weight: bold;
        }

        .order-status.completed {
          color: #00C076;
        }

          .order-status.cancelled {
          color: #e01515ff;
        }
        .order-status.pending {
          color: #F3BA2F;
        }

        .order-status.partially-filled {
          color: #FF6838;
        }

        .order-filled {
          font-size: 11px;
          font-weight: bold;
          color: #F3BA2F;
        }

        .order-price-value, .order-amount-value, .order-total {
          font-size: 11px;
          font-weight: bold;
        }

        .order-actions {
          display: flex;
          justify-content: flex-end;
        }

        .cancel-order-btn {
          background-color: #FF6838;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 11px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .cancel-order-btn:hover {
          background-color: #e04444;
        }

        .completed-indicator {
          color: #00C076;
          font-size: 14px;
        }

        .empty-orders {
          text-align: center;
          padding: 40px 0;
        }

        .empty-icon {
          font-size: 32px;
          color: #2A2A2A;
          margin-bottom: 10px;
        }

        .empty-text {
          color: #AAAAAA;
          font-size: 14px;
          margin-bottom: 5px;
        }

        .empty-subtext {
          color: #777;
          font-size: 12px;
        }

        /* Loading Overlay Styles */
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        
        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 5px solid #2A2A2A;
          border-top: 5px solid #F3BA2F;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 15px;
        }
        
        .loading-text {
          color: #FFFFFF;
          font-size: 16px;
          font-weight: 500;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        /* Skeleton Loading for Content */
        .skeleton-loading {
          background: linear-gradient(90deg, #2A2A2A 25%, #333 50%, #2A2A2A 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          border-radius: 4px;
        }
        
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        
        /* Skeleton elements for initial load */
        .skeleton-market-name {
          width: 100px;
          height: 16px;
          margin-right: 8px;
        }
        
        .skeleton-price-change {
          width: 50px;
          height: 16px;
        }
        
        .skeleton-tab {
          width: 100%;
          height: 36px;
        }
        
        .skeleton-input {
          width: 100%;
          height: 40px;
          margin-bottom: 12px;
        }
        
        .skeleton-balance {
          width: 100%;
          height: 14px;
          margin-bottom: 12px;
        }
        
        .skeleton-button {
          width: 100%;
          height: 42px;
        }
        
        .skeleton-order-book {
          height: 20px;
          margin-bottom: 5px;
        }
        
        .skeleton-current-price {
          height: 30px;
          margin: 8px 0;
        }

        /* Coin Selection Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        
        .coin-modal {
          background-color: #1A1A1A;
          border-radius: 8px;
          width: 320px;
          max-width: 90%;
          max-height: 80vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          border-bottom: 1px solid #2A2A2A;
        }
        
        .modal-header h3 {
          margin: 0;
          font-size: 18px;
          color: #F3BA2F;
        }
        
        .close-button {
          background: none;
          border: none;
          color: #AAAAAA;
          font-size: 24px;
          cursor: pointer;
        }
        
        .search-container {
          padding: 12px 16px;
          border-bottom: 1px solid #2A2A2A;
        }
        
        .coin-search {
          width: 100%;
          padding: 10px 12px;
          background-color: #2A2A2A;
          border: none;
          border-radius: 4px;
          color: #FFFFFF;
          font-size: 14px;
        }
        
        .coin-search:focus {
          outline: 1px solid #F3BA2F;
        }
        
        .modal-content {
          flex: 1;
          overflow-y: auto;
        }
        
        .coin-list {
          padding: 8px 0;
        }
        
        .coin-item {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .coin-item:hover {
          background-color: #2A2A2A;
        }
        
        .coin-icon {
          font-size: 20px;
          margin-right: 12px;
          width: 30px;
          text-align: center;
        }
        
        .coin-info {
          flex: 1;
        }
        
        .coin-symbol {
          font-weight: bold;
          font-size: 14px;
          margin-bottom: 2px;
        }
        
        .coin-name {
          color: #AAAAAA;
          font-size: 12px;
        }
      `})]})}export{ve as default};
