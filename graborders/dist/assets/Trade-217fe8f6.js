import{u as V,B as de,D as pe,o as r,E as ue,F as me,q as _,t as s,G as W,j as e,L as xe}from"./index-49a858b3.js";import{C as be}from"./CoinListModal-0c70025a.js";import{g as G}from"./marketSocket-a8dfa287.js";import{u as ge}from"./useDispatch-71f7155d.js";import"./index-d9998155.js";const d=p=>{if(p==null||p==="")return NaN;const k=Number(p);return Number.isFinite(k)?k:NaN};function ve(){const p=ge(),k=V(de.selectRows)||[],z=V(pe.selectRows)||[],[i,H]=r.useState("BTCUSDT"),[x,L]=r.useState("0"),[M,B]=r.useState("0"),[J,D]=r.useState(!1),[l,X]=r.useState("LIMIT"),[u,j]=r.useState("0"),[h,y]=r.useState(""),[Y,f]=r.useState(""),[c,S]=r.useState("buy"),[F,E]=r.useState({asks:[],bids:[]}),[b,O]=r.useState(!0),[w,I]=r.useState(!1),[$,v]=r.useState(""),R=r.useRef(0),P=r.useMemo(()=>Array.isArray(z)?z.reduce((t,o)=>(t[o.symbol]=Number(o.amount)||0,t),{}):{},[z]),A=r.useMemo(()=>i.replace("USDT",""),[i]),g=r.useMemo(()=>c==="buy"?P.USDT||0:P[A]||0,[c,A,P]),K=r.useCallback(()=>{const t=Date.now().toString(36),o=Math.floor(Math.random()*1e6).toString(36);return`ORD-${t}-${o}`.toUpperCase()},[]);r.useEffect(()=>{p(ue.doFetch()),p(me.doFetcPending());const t=setTimeout(()=>O(!1),800);return()=>clearTimeout(t)},[p]),r.useEffect(()=>{if(x&&x!=="0"&&(j(x),h&&!isNaN(Number(h)))){const t=Number(h)*Number(x);f(t.toFixed(2))}},[x]);const C=r.useCallback(t=>{const o=d(t),a=d(u);if(Number.isFinite(o)&&Number.isFinite(a)&&a>0){const n=o/a;y(n.toFixed(8))}else y("")},[u]),T=r.useCallback(t=>{const o=d(t),a=d(u);if(Number.isFinite(o)&&Number.isFinite(a)){const n=o*a;f(n.toFixed(2))}else f("")},[u]),Z=r.useCallback(t=>{const o=t.target.value;y(o),T(o)},[T]),ee=r.useCallback(t=>{const o=t.target.value;f(o),C(o)},[C]),m=r.useCallback((t,o=2)=>{const a=Number(t);return Number.isFinite(a)?a.toLocaleString(void 0,{minimumFractionDigits:o,maximumFractionDigits:o}):0 .toFixed(o)},[]);r.useEffect(()=>{i&&(_.get("/market/tickers").then(({data:t})=>{const o=(t.data||[]).find(a=>a.s===i);o&&(L(o.c),B(o.P))}).catch(()=>{}),_.get("/market/orderbook",{params:{symbol:i,limit:10}}).then(({data:t})=>{const o=t.data||{};E({asks:o.asks||[],bids:o.bids||[]})}).catch(()=>{}))},[i]),r.useEffect(()=>{if(!i)return;const t=G(),o=a=>{const n=a.find(U=>U.s===i);if(!n)return;const N=performance.now();N-R.current<180||(R.current=N,L(n.c),B(n.P))};return t.on("market:update",o),()=>{t.off("market:update",o)}},[i]),r.useEffect(()=>{if(!i)return;const t=G(),o=`market:depth:${i}`;t.emit("subscribe:depth",{symbol:i});const a=n=>{E({asks:n.asks||[],bids:n.bids||[]})};return t.on(o,a),()=>{t.off(o,a),t.emit("unsubscribe:depth",{symbol:i})}},[i]);const Q=r.useMemo(()=>{const t=[...F.asks.map(o=>d(o.amount)),...F.bids.map(o=>d(o.amount))].filter(o=>Number.isFinite(o));return Math.max(...t,1)},[F]),te=r.useCallback(()=>D(!0),[]),oe=r.useCallback(()=>D(!1),[]),re=r.useCallback(t=>{if(!t)return;H(t),D(!1),O(!0),y(""),f("");const o=setTimeout(()=>O(!1),600);return()=>clearTimeout(o)},[]),ae=r.useCallback(t=>{const o=t.target.value;j(o);const a=d(h);if(Number.isFinite(a)){const n=a*Number(o);f(n.toFixed(2))}},[h]);r.useCallback(t=>{if(c==="buy"){const a=g*t;f(a.toFixed(2)),C(a)}else{const a=g*t;y(a.toFixed(8)),T(a)}},[c,g,C,T]);const se=r.useCallback(()=>{const t=d(u),o=Number.isFinite(t)?t+1:d(x)||0;j(o.toString())},[u,x]),ne=r.useCallback(()=>{const t=d(u);if(!Number.isFinite(t))return;const o=Math.max(1e-4,t-1);j(o.toString())},[u]),q=r.useCallback(t=>{l==="LIMIT"&&t!==void 0&&j(t.toString())},[l]),ie=r.useCallback(async()=>{if(v(""),w)return;const t=d(h),o=d(l==="MARKET"?x:u);if(!Number.isFinite(t)||t<=0){v(s("pages.trade.errors.invalidQuantity"));return}if(!Number.isFinite(o)||o<=0){v(s("pages.trade.errors.invalidPrice"));return}if(c==="buy"){if(o*t>g){v(s("pages.trade.errors.insufficientUSDT",m(g,2)));return}}else if(t>g){v(s("pages.trade.errors.insufficientCoin",m(g,6),A));return}I(!0);try{const a=o,n=t,N=a*n,U=N*.001,ce={orderNo:K(),orderType:l.toLowerCase(),tradingPair:i.replace("USDT","/USDT"),status:l==="MARKET"?"completed":"pending",direction:c.toUpperCase(),delegateType:l,delegateState:l==="MARKET"?"Filled":"Pending",orderQuantity:n,commissionPrice:a,entrustedValue:N,transactionQuantity:l==="MARKET"?n:0,transactionValue:l==="MARKET"?N:0,closingPrice:l==="MARKET"?a:0,handlingFee:l==="MARKET"?U:0,commissionTime:new Date().toISOString(),closingTime:l==="MARKET"?new Date().toISOString():null};await p(W.doCreate(ce)),y(""),f("")}catch(a){console.error("Place order error",a),v(s("pages.trade.errors.failedOrder"))}finally{I(!1)}},[w,h,l,x,u,i,c,p,K,g,A,m]),le=async(t,o)=>{o.status="canceled",p(W.doUpdate(t,o))};return e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"trade-header",children:[e.jsx("div",{className:"trade-header-top",children:e.jsx("div",{className:"trade-page-title",children:s("pages.trade.title")})}),e.jsxs("div",{className:"market-info",children:[b?e.jsx("div",{className:"skeleton-market-name"}):e.jsx("div",{className:"market-name",children:i.replace("USDT","/USDT")}),e.jsx("div",{className:"coin-select-icon",onClick:te,"aria-hidden":!0,children:e.jsx("i",{className:"fas fa-chevron-down"})}),b?e.jsx("div",{className:"skeleton-price-change"}):e.jsxs("div",{className:"market-change",style:{color:String(M).startsWith("-")?"#FF6838":"#00C076"},children:[String(M).startsWith("-")?"":"+",M,"%"]})]})]}),e.jsxs("div",{className:"main-content",children:[e.jsxs("div",{className:"trading-layout",children:[e.jsxs("div",{className:"trade-form",children:[e.jsx("div",{className:"buy-sell-tabs",role:"tablist",children:b?e.jsx("div",{className:"skeleton-tab"}):e.jsxs(e.Fragment,{children:[e.jsx("div",{role:"tab","aria-selected":c==="buy",tabIndex:0,className:`buy-tab ${c==="buy"?"active":""}`,onClick:()=>S("buy"),onKeyDown:t=>t.key==="Enter"&&S("buy"),children:s("pages.trade.buy")}),e.jsx("div",{role:"tab","aria-selected":c==="sell",tabIndex:0,className:`sell-tab ${c==="sell"?"active":""}`,onClick:()=>S("sell"),onKeyDown:t=>t.key==="Enter"&&S("sell"),children:s("pages.trade.sell")})]})}),e.jsxs("div",{className:"order-type",children:[e.jsx("div",{className:"order-type-label",children:s("pages.trade.orderType")}),b?e.jsx("div",{className:"skeleton-input"}):e.jsxs("select",{className:"order-type-select",value:l,onChange:t=>X(t.target.value),children:[e.jsx("option",{value:"LIMIT",children:s("pages.trade.limit")}),e.jsx("option",{value:"MARKET",children:s("pages.trade.market")})]})]}),l==="LIMIT"&&e.jsxs("div",{className:"input-group",children:[e.jsx("div",{className:"input-label",children:s("pages.trade.price")}),b?e.jsx("div",{className:"skeleton-input"}):e.jsxs("div",{className:"input-with-buttons",children:[e.jsx("input",{className:"value-input",value:u,onChange:ae,inputMode:"decimal","aria-label":"price"}),e.jsxs("div",{className:"value-buttons",children:[e.jsx("button",{className:"value-button",onClick:se,"aria-label":s("pages.trade.increasePrice"),children:"+"}),e.jsx("button",{className:"value-button",onClick:ne,"aria-label":s("pages.trade.decreasePrice"),children:"-"})]})]})]}),e.jsxs("div",{className:"input-group",children:[e.jsxs("div",{className:"input-label",children:[s("pages.trade.amount")," (",A,")"]}),b?e.jsx("div",{className:"skeleton-input"}):e.jsx("div",{className:"input-with-buttons",children:e.jsx("input",{className:"value-input",value:h,onChange:Z,placeholder:"0.0",inputMode:"decimal","aria-label":"quantity"})})]}),e.jsxs("div",{className:"input-group",children:[e.jsxs("div",{className:"input-label",children:[s("pages.trade.amount")," (USDT)"]}),b?e.jsx("div",{className:"skeleton-input"}):e.jsx("input",{className:"value-input",value:Y,onChange:ee,placeholder:"0.0",inputMode:"decimal","aria-label":"amount in usdt"})]}),b?e.jsx("div",{className:"skeleton-balance"}):e.jsxs("div",{className:"balance-info",children:[s("pages.trade.available"),": ",m(g,c==="buy"?2:6)," ",c==="buy"?"USDT":A]}),$&&e.jsx("div",{className:"error-message",role:"alert",children:$}),b?e.jsx("div",{className:"skeleton-button"}):e.jsx("button",{className:`action-button ${c==="buy"?"buy-button":"sell-button"}`,onClick:ie,disabled:w,"aria-busy":w,children:w?s("pages.trade.placing"):`${c==="buy"?s("pages.trade.buy"):s("pages.trade.sell")} ${A}`})]}),e.jsxs("div",{className:"order-book",role:"region","aria-label":"order book",children:[e.jsxs("div",{className:"order-book-header",children:[e.jsx("span",{children:s("pages.trade.orderBook.price")}),e.jsxs("span",{children:[s("pages.trade.orderBook.amount")," (",A,")"]})]}),b?e.jsxs(e.Fragment,{children:[[...Array(5)].map((t,o)=>e.jsx("div",{className:"skeleton-order-book"},`s-a-${o}`)),e.jsx("div",{className:"skeleton-current-price"}),[...Array(5)].map((t,o)=>e.jsx("div",{className:"skeleton-order-book"},`s-b-${o}`))]}):e.jsxs(e.Fragment,{children:[F.asks.map((t,o)=>{const a=d(t.amount)||0,n=Math.min(100,a/Q*100);return e.jsxs("div",{className:"order-book-row ask-row",onClick:()=>q(t.price),children:[e.jsx("div",{className:"depth-bar ask-depth",style:{width:`${n}%`}}),e.jsx("div",{className:"order-price",children:m(t.price,4)}),e.jsx("div",{className:"order-amount",children:m(t.amount,4)})]},`ask-${o}`)}),e.jsx("div",{className:"order-book-row current-price-row",children:e.jsxs("div",{className:"current-price",children:["$",m(x,2)]})}),F.bids.map((t,o)=>{const a=d(t.amount)||0,n=Math.min(100,a/Q*100);return e.jsxs("div",{className:"order-book-row bid-row",onClick:()=>q(t.price),children:[e.jsx("div",{className:"depth-bar bid-depth",style:{width:`${n}%`}}),e.jsx("div",{className:"order-price",children:m(t.price,4)}),e.jsx("div",{className:"order-amount",children:m(t.amount,4)})]},`bid-${o}`)})]})]})]}),e.jsxs("div",{className:"open-orders",children:[e.jsxs("div",{className:"open-orders-header",children:[e.jsx("div",{className:"open-orders-title",children:s("pages.trade.openOrders.title")}),e.jsx("div",{className:"orders-filter",children:e.jsx(xe,{to:"/ordersPage",className:"remove_blue","aria-label":s("pages.trade.openOrders.viewAll"),children:e.jsx("i",{className:"fas fa-list"})})})]}),k&&k.length>0?e.jsx("div",{className:"orders-list",children:k.map(t=>{var o;return e.jsxs("div",{className:"order-item",children:[e.jsxs("div",{className:"order-main-info",children:[e.jsxs("div",{className:"order-pair-action",children:[e.jsx("span",{className:"order-pair",children:t.tradingPair}),e.jsx("span",{className:`order-action ${String((t==null?void 0:t.direction)||"").toLowerCase()}`,children:t.direction}),e.jsx("span",{className:"order-type-badge",children:t.orderType})]}),e.jsxs("div",{className:"order-date",children:[t.commissionTime?new Date(t.commissionTime).toLocaleDateString():"",e.jsx("span",{className:"order-time",children:t.commissionTime?new Date(t.commissionTime).toLocaleTimeString():""})]})]}),e.jsxs("div",{className:"order-details",children:[e.jsxs("div",{className:"order-detail",children:[e.jsx("span",{className:"detail-label",children:s("pages.trade.openOrders.status")}),e.jsx("span",{className:`order-status ${String(t.status).toLowerCase()}`,children:t.status})]}),e.jsxs("div",{className:"order-detail",children:[e.jsx("span",{className:"detail-label",children:s("pages.trade.openOrders.price")}),e.jsxs("span",{className:"order-price-value",children:[m(t.commissionPrice,4)," USDT"]})]}),e.jsxs("div",{className:"order-detail",children:[e.jsx("span",{className:"detail-label",children:s("pages.trade.openOrders.amount")}),e.jsxs("span",{className:"order-amount-value",children:[t.orderQuantity," ",(o=t==null?void 0:t.tradingPair)==null?void 0:o.split("/")[0]]})]}),e.jsxs("div",{className:"order-detail",children:[e.jsx("span",{className:"detail-label",children:s("pages.trade.openOrders.total")}),e.jsxs("span",{className:"order-total",children:[m(t.entrustedValue)," USDT"]})]})]}),e.jsx("div",{className:"order-actions",children:String(t.status).toLowerCase()==="pending"||String(t.status).toLowerCase()==="partially filled"?e.jsx("button",{className:"cancel-order-btn",onClick:()=>le(t.id,t),children:s("pages.trade.openOrders.cancel")}):e.jsx("div",{className:"completed-indicator",children:e.jsx("i",{className:"fas fa-check-circle"})})})]},t.id??t.orderNo)})}):e.jsxs("div",{className:"empty-orders",children:[e.jsx("div",{className:"empty-icon",children:e.jsx("i",{className:"fas fa-clipboard-list"})}),e.jsx("div",{className:"empty-text",children:s("pages.trade.openOrders.noOrders")}),e.jsx("div",{className:"empty-subtext",children:s("pages.trade.openOrders.noOrdersSubtext")})]})]})]}),e.jsx(be,{isOpen:J,onClose:oe,onSelectCoin:re}),e.jsx("style",{children:`
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
