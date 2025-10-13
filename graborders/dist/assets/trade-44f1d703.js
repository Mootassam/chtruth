import{u as V,m as pe,o as ue,h as r,q as me,s as xe,v as Y,j as e,L as be}from"./index-d1d6c6ad.js";import{C as ge}from"./CoinListModal-75d489a3.js";import{u as he}from"./useDispatch-87ec624c.js";const l=c=>{if(c==null||c==="")return NaN;const v=Number(c);return Number.isFinite(v)?v:NaN};function ke(){const c=he(),v=V(pe.selectRows)||[],M=V(ue.selectRows)||[],[d,_]=r.useState("BTCUSDT"),[m,J]=r.useState("0"),[P,H]=r.useState("0"),[G,U]=r.useState(!1),[n,X]=r.useState("LIMIT"),[p,F]=r.useState("0"),[f,N]=r.useState(""),[Z,A]=r.useState(""),[i,T]=r.useState("buy"),[w,ee]=r.useState({asks:[],bids:[]}),[x,L]=r.useState(!0),[S,$]=r.useState(!1),[R,j]=r.useState(""),y=r.useRef(null),k=r.useRef(null),B=r.useRef(0),K=r.useRef(0),I=r.useMemo(()=>Array.isArray(M)?M.reduce((t,o)=>(t[o.symbol]=Number(o.amount)||0,t),{}):{},[M]),b=r.useMemo(()=>d.replace("USDT",""),[d]),g=r.useMemo(()=>i==="buy"?I.USDT||0:I[b]||0,[i,b,I]),Q=r.useCallback(()=>{const t=Date.now().toString(36),o=Math.floor(Math.random()*1e6).toString(36);return`ORD-${t}-${o}`.toUpperCase()},[]);r.useEffect(()=>{c(me.doFetch()),c(xe.doFetcPending());const t=setTimeout(()=>L(!1),800);return()=>clearTimeout(t)},[c]),r.useEffect(()=>{if(m&&m!=="0"&&(F(m),f&&!isNaN(Number(f)))){const t=Number(f)*Number(m);A(t.toFixed(2))}},[m]);const z=r.useCallback(t=>{const o=l(t),a=l(p);if(Number.isFinite(o)&&Number.isFinite(a)&&a>0){const s=o/a;N(s.toFixed(8))}else N("")},[p]),D=r.useCallback(t=>{const o=l(t),a=l(p);if(Number.isFinite(o)&&Number.isFinite(a)){const s=o*a;A(s.toFixed(2))}else A("")},[p]),te=r.useCallback(t=>{const o=t.target.value;N(o),D(o)},[D]),oe=r.useCallback(t=>{const o=t.target.value;A(o),z(o)},[z]),u=r.useCallback((t,o=2)=>{const a=Number(t);return Number.isFinite(a)?a.toLocaleString(void 0,{minimumFractionDigits:o,maximumFractionDigits:o}):0 .toFixed(o)},[]);r.useEffect(()=>{if(d){if(y.current){try{y.current.close()}catch{}y.current=null}try{const t=d.toLowerCase(),o=new WebSocket(`wss://stream.binance.com:9443/ws/${t}@ticker`);y.current=o,o.onmessage=a=>{try{const s=JSON.parse(a.data),h=performance.now();h-B.current>180&&(B.current=h,s.c!==void 0&&J(s.c),s.P!==void 0&&H(s.P))}catch{}},o.onerror=a=>{console.error("Ticker WebSocket error:",a)}}catch(t){console.error("Ticker WS init error",t)}return()=>{if(y.current){try{y.current.close()}catch{}y.current=null}}}},[d]),r.useEffect(()=>{if(d){if(k.current){try{k.current.close()}catch{}k.current=null}try{const t=d.toLowerCase(),o=new WebSocket(`wss://stream.binance.com:9443/ws/${t}@depth20@100ms`);k.current=o,o.onmessage=a=>{try{const s=JSON.parse(a.data),h=performance.now();if(h-K.current>180){K.current=h;const O=(s.asks||[]).slice(0,5).map(C=>({price:C[0],amount:C[1]})),E=(s.bids||[]).slice(0,5).map(C=>({price:C[0],amount:C[1]}));ee({asks:O,bids:E})}}catch{}}}catch(t){console.error("Depth WS init error",t)}return()=>{if(k.current){try{k.current.close()}catch{}k.current=null}}}},[d]);const W=r.useMemo(()=>{const t=[...w.asks.map(o=>l(o.amount)),...w.bids.map(o=>l(o.amount))].filter(o=>Number.isFinite(o));return Math.max(...t,1)},[w]),re=r.useCallback(()=>U(!0),[]),ae=r.useCallback(()=>U(!1),[]),se=r.useCallback(t=>{if(!t)return;_(t),U(!1),L(!0),N(""),A("");const o=setTimeout(()=>L(!1),600);return()=>clearTimeout(o)},[]),ne=r.useCallback(t=>{const o=t.target.value;F(o);const a=l(f);if(Number.isFinite(a)){const s=a*Number(o);A(s.toFixed(2))}},[f]);r.useCallback(t=>{if(i==="buy"){const a=g*t;A(a.toFixed(2)),z(a)}else{const a=g*t;N(a.toFixed(8)),D(a)}},[i,g,z,D]);const ie=r.useCallback(()=>{const t=l(p),o=Number.isFinite(t)?t+1:l(m)||0;F(o.toString())},[p,m]),le=r.useCallback(()=>{const t=l(p);if(!Number.isFinite(t))return;const o=Math.max(1e-4,t-1);F(o.toString())},[p]),q=r.useCallback(t=>{n==="LIMIT"&&t!==void 0&&F(t.toString())},[n]),ce=r.useCallback(async()=>{if(j(""),S)return;const t=l(f),o=l(n==="MARKET"?m:p);if(!Number.isFinite(t)||t<=0){j("Please enter a valid quantity.");return}if(!Number.isFinite(o)||o<=0){j("Please enter a valid price.");return}if(i==="buy"){if(o*t>g){j(`Insufficient USDT balance. Available: ${u(g,2)} USDT`);return}}else if(t>g){j(`Insufficient ${b} balance. Available: ${u(g,6)} ${b}`);return}$(!0);try{const a=o,s=t,h=a*s,O=h*.001,E={orderNo:Q(),orderType:n.toLowerCase(),tradingPair:d.replace("USDT","/USDT"),status:n==="MARKET"?"completed":"pending",direction:i.toUpperCase(),delegateType:n,delegateState:n==="MARKET"?"Filled":"Pending",orderQuantity:s,commissionPrice:a,entrustedValue:h,transactionQuantity:n==="MARKET"?s:0,transactionValue:n==="MARKET"?h:0,closingPrice:n==="MARKET"?a:0,handlingFee:n==="MARKET"?O:0,commissionTime:new Date().toISOString(),closingTime:n==="MARKET"?new Date().toISOString():null};await c(Y.doCreate(E)),N(""),A("")}catch(a){console.error("Place order error",a),j("Failed to place order. Please try again.")}finally{$(!1)}},[S,f,n,m,p,d,i,c,Q,g,b,u]),de=async(t,o)=>{o.status="canceled",c(Y.doUpdate(t,o))};return e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"trade-header",children:[e.jsx("div",{className:"trade-header-top",children:e.jsx("div",{className:"trade-page-title",children:"SPOT"})}),e.jsxs("div",{className:"market-info",children:[x?e.jsx("div",{className:"skeleton-market-name"}):e.jsx("div",{className:"market-name",children:d.replace("USDT","/USDT")}),e.jsx("div",{className:"coin-select-icon",onClick:re,"aria-hidden":!0,children:e.jsx("i",{className:"fas fa-chevron-down"})}),x?e.jsx("div",{className:"skeleton-price-change"}):e.jsxs("div",{className:"market-change",style:{color:String(P).startsWith("-")?"#FF6838":"#00C076"},children:[String(P).startsWith("-")?"":"+",P,"%"]})]})]}),e.jsxs("div",{className:"main-content",children:[e.jsxs("div",{className:"trading-layout",children:[e.jsxs("div",{className:"trade-form",children:[e.jsx("div",{className:"buy-sell-tabs",role:"tablist",children:x?e.jsx("div",{className:"skeleton-tab"}):e.jsxs(e.Fragment,{children:[e.jsx("div",{role:"tab","aria-selected":i==="buy",tabIndex:0,className:`buy-tab ${i==="buy"?"active":""}`,onClick:()=>T("buy"),onKeyDown:t=>t.key==="Enter"&&T("buy"),children:"BUY"}),e.jsx("div",{role:"tab","aria-selected":i==="sell",tabIndex:0,className:`sell-tab ${i==="sell"?"active":""}`,onClick:()=>T("sell"),onKeyDown:t=>t.key==="Enter"&&T("sell"),children:"SELL"})]})}),e.jsxs("div",{className:"order-type",children:[e.jsx("div",{className:"order-type-label",children:"Order Type"}),x?e.jsx("div",{className:"skeleton-input"}):e.jsxs("select",{className:"order-type-select",value:n,onChange:t=>X(t.target.value),children:[e.jsx("option",{value:"LIMIT",children:"LIMIT"}),e.jsx("option",{value:"MARKET",children:"MARKET"})]})]}),n==="LIMIT"&&e.jsxs("div",{className:"input-group",children:[e.jsx("div",{className:"input-label",children:"Price (USDT)"}),x?e.jsx("div",{className:"skeleton-input"}):e.jsxs("div",{className:"input-with-buttons",children:[e.jsx("input",{className:"value-input",value:p,onChange:ne,inputMode:"decimal","aria-label":"price"}),e.jsxs("div",{className:"value-buttons",children:[e.jsx("button",{className:"value-button",onClick:ie,"aria-label":"increase price",children:"+"}),e.jsx("button",{className:"value-button",onClick:le,"aria-label":"decrease price",children:"-"})]})]})]}),e.jsxs("div",{className:"input-group",children:[e.jsxs("div",{className:"input-label",children:["Amount (",b,")"]}),x?e.jsx("div",{className:"skeleton-input"}):e.jsx("div",{className:"input-with-buttons",children:e.jsx("input",{className:"value-input",value:f,onChange:te,placeholder:"0.0",inputMode:"decimal","aria-label":"quantity"})})]}),e.jsxs("div",{className:"input-group",children:[e.jsx("div",{className:"input-label",children:"Amount (USDT)"}),x?e.jsx("div",{className:"skeleton-input"}):e.jsx("input",{className:"value-input",value:Z,onChange:oe,placeholder:"0.0",inputMode:"decimal","aria-label":"amount in usdt"})]}),x?e.jsx("div",{className:"skeleton-balance"}):e.jsxs("div",{className:"balance-info",children:["Available: ",u(g,i==="buy"?2:6)," ",i==="buy"?"USDT":b]}),R&&e.jsx("div",{className:"error-message",role:"alert",children:R}),x?e.jsx("div",{className:"skeleton-button"}):e.jsx("button",{className:`action-button ${i==="buy"?"buy-button":"sell-button"}`,onClick:ce,disabled:S,"aria-busy":S,children:S?"Placing...":`${i==="buy"?"BUY":"SELL"} ${b}`})]}),e.jsxs("div",{className:"order-book",role:"region","aria-label":"order book",children:[e.jsxs("div",{className:"order-book-header",children:[e.jsx("span",{children:"Price (USDT)"}),e.jsxs("span",{children:["Amount (",b,")"]})]}),x?e.jsxs(e.Fragment,{children:[[...Array(5)].map((t,o)=>e.jsx("div",{className:"skeleton-order-book"},`s-a-${o}`)),e.jsx("div",{className:"skeleton-current-price"}),[...Array(5)].map((t,o)=>e.jsx("div",{className:"skeleton-order-book"},`s-b-${o}`))]}):e.jsxs(e.Fragment,{children:[w.asks.map((t,o)=>{const a=l(t.amount)||0,s=Math.min(100,a/W*100);return e.jsxs("div",{className:"order-book-row ask-row",onClick:()=>q(t.price),children:[e.jsx("div",{className:"depth-bar ask-depth",style:{width:`${s}%`}}),e.jsx("div",{className:"order-price",children:u(t.price,4)}),e.jsx("div",{className:"order-amount",children:u(t.amount,4)})]},`ask-${o}`)}),e.jsx("div",{className:"order-book-row current-price-row",children:e.jsxs("div",{className:"current-price",children:["$",u(m,2)]})}),w.bids.map((t,o)=>{const a=l(t.amount)||0,s=Math.min(100,a/W*100);return e.jsxs("div",{className:"order-book-row bid-row",onClick:()=>q(t.price),children:[e.jsx("div",{className:"depth-bar bid-depth",style:{width:`${s}%`}}),e.jsx("div",{className:"order-price",children:u(t.price,4)}),e.jsx("div",{className:"order-amount",children:u(t.amount,4)})]},`bid-${o}`)})]})]})]}),e.jsxs("div",{className:"open-orders",children:[e.jsxs("div",{className:"open-orders-header",children:[e.jsx("div",{className:"open-orders-title",children:"OPEN ORDERS"}),e.jsx("div",{className:"orders-filter",children:e.jsx(be,{to:"/ordersPage",className:"remove_blue","aria-label":"view all orders",children:e.jsx("i",{className:"fas fa-list"})})})]}),v&&v.length>0?e.jsx("div",{className:"orders-list",children:v.map(t=>{var o;return e.jsxs("div",{className:"order-item",children:[e.jsxs("div",{className:"order-main-info",children:[e.jsxs("div",{className:"order-pair-action",children:[e.jsx("span",{className:"order-pair",children:t.tradingPair}),e.jsx("span",{className:`order-action ${String((t==null?void 0:t.direction)||"").toLowerCase()}`,children:t.direction}),e.jsx("span",{className:"order-type-badge",children:t.orderType})]}),e.jsxs("div",{className:"order-date",children:[t.commissionTime?new Date(t.commissionTime).toLocaleDateString():"",e.jsx("span",{className:"order-time",children:t.commissionTime?new Date(t.commissionTime).toLocaleTimeString():""})]})]}),e.jsxs("div",{className:"order-details",children:[e.jsxs("div",{className:"order-detail",children:[e.jsx("span",{className:"detail-label",children:"Status"}),e.jsx("span",{className:`order-status ${String(t.status).toLowerCase()}`,children:t.status})]}),e.jsxs("div",{className:"order-detail",children:[e.jsx("span",{className:"detail-label",children:"Price"}),e.jsxs("span",{className:"order-price-value",children:[u(t.commissionPrice,4)," USDT"]})]}),e.jsxs("div",{className:"order-detail",children:[e.jsx("span",{className:"detail-label",children:"Amount"}),e.jsxs("span",{className:"order-amount-value",children:[t.orderQuantity," ",(o=t==null?void 0:t.tradingPair)==null?void 0:o.split("/")[0]]})]}),e.jsxs("div",{className:"order-detail",children:[e.jsx("span",{className:"detail-label",children:"Total"}),e.jsxs("span",{className:"order-total",children:[u(t.entrustedValue)," USDT"]})]})]}),e.jsx("div",{className:"order-actions",children:String(t.status).toLowerCase()==="pending"||String(t.status).toLowerCase()==="partially filled"?e.jsx("button",{className:"cancel-order-btn",onClick:()=>de(t.id,t),children:"Cancel"}):e.jsx("div",{className:"completed-indicator",children:e.jsx("i",{className:"fas fa-check-circle"})})})]},t.id??t.orderNo)})}):e.jsxs("div",{className:"empty-orders",children:[e.jsx("div",{className:"empty-icon",children:e.jsx("i",{className:"fas fa-clipboard-list"})}),e.jsx("div",{className:"empty-text",children:"No open orders yet"}),e.jsx("div",{className:"empty-subtext",children:"Your open orders will appear here"})]})]})]}),e.jsx(ge,{isOpen:G,onClose:ae,onSelectCoin:se}),e.jsx("style",{children:`
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
      `})]})}export{ke as default};
