import{u as $,h as le,i as ce,r,k as de,s as K,v as pe,j as e,L as ue}from"./index-066d6d6a.js";import{C as me}from"./CoinListModal-24f3481f.js";import{u as xe}from"./useDispatch-1623005e.js";const l=d=>{if(d==null||d==="")return NaN;const m=Number(d);return Number.isFinite(m)?m:NaN};function fe(){const d=xe(),m=$(le.selectRows)||[],z=$(ce.selectRows)||[],[c,Q]=r.useState("BTCUSDT"),[p,q]=r.useState("51248.06"),[M,W]=r.useState("0.37"),[V,P]=r.useState(!1),[n,Y]=r.useState("LIMIT"),[u,k]=r.useState("51248.06"),[g,S]=r.useState(""),[h,C]=r.useState("buy"),[j,_]=r.useState({asks:[],bids:[]}),[x,L]=r.useState(!0),[F,D]=r.useState(!1),[E,T]=r.useState(""),y=r.useRef(null),v=r.useRef(null),I=r.useRef(0),O=r.useRef(0),J=r.useMemo(()=>Array.isArray(z)?z.reduce((t,o)=>(t[o.symbol]=Number(o.amount)||0,t),{}):{},[z]),R=r.useCallback(()=>{const t=Date.now().toString(36),o=Math.floor(Math.random()*1e6).toString(36);return`ORD-${t}-${o}`.toUpperCase()},[]);r.useEffect(()=>{d(de.doFetch()),d(K.doFetch());const t=setTimeout(()=>L(!1),800);return()=>clearTimeout(t)},[d]),r.useEffect(()=>{n==="MARKET"&&k(p),n==="LIMIT"&&(!u||isNaN(Number(u)))&&k(p)},[n,p]);const f=r.useCallback((t,o=2)=>{const i=Number(t);return Number.isFinite(i)?i.toLocaleString(void 0,{minimumFractionDigits:o,maximumFractionDigits:o}):0 .toFixed(o)},[]);r.useEffect(()=>{if(c){if(y.current){try{y.current.close()}catch{}y.current=null}try{const t=c.toLowerCase(),o=new WebSocket(`wss://stream.binance.com:9443/ws/${t}@ticker`);y.current=o,o.onmessage=i=>{try{const a=JSON.parse(i.data),s=performance.now();s-I.current>180&&(I.current=s,a.c!==void 0&&q(a.c),a.P!==void 0&&W(a.P),n==="MARKET"&&a.c!==void 0&&k(a.c))}catch{}},o.onclose=()=>{}}catch(t){console.error("Ticker WS init error",t)}return()=>{if(y.current){try{y.current.close()}catch{}y.current=null}}}},[c,n]),r.useEffect(()=>{if(c){if(v.current){try{v.current.close()}catch{}v.current=null}try{const t=c.toLowerCase(),o=new WebSocket(`wss://stream.binance.com:9443/ws/${t}@depth20@100ms`);v.current=o,o.onmessage=i=>{try{const a=JSON.parse(i.data),s=performance.now();if(s-O.current>180){O.current=s;const A=(a.asks||[]).slice(0,5).map(N=>({price:N[0],amount:N[1]})),b=(a.bids||[]).slice(0,5).map(N=>({price:N[0],amount:N[1]}));_({asks:A,bids:b})}}catch{}}}catch(t){console.error("Depth WS init error",t)}return()=>{if(v.current){try{v.current.close()}catch{}v.current=null}}}},[c]);const B=r.useMemo(()=>{const t=[...j.asks.map(o=>l(o.amount)),...j.bids.map(o=>l(o.amount))].filter(o=>Number.isFinite(o));return Math.max(...t,1)},[j]),H=r.useCallback(()=>P(!0),[]),G=r.useCallback(()=>P(!1),[]),X=r.useCallback(t=>{if(!t)return;Q(t),P(!1),L(!0);const o=setTimeout(()=>L(!1),600);return()=>clearTimeout(o)},[]),Z=r.useCallback(t=>{k(t.target.value)},[]),ee=r.useCallback(t=>{S(t.target.value)},[]),te=r.useCallback(()=>{const t=l(u),o=l(g);return!Number.isFinite(t)||!Number.isFinite(o)?"0.00":(t*o).toFixed(2)},[u,g]),oe=r.useCallback(()=>{const t=l(u),o=Number.isFinite(t)?t+1:l(p)||0;k(o.toString())},[u,p]),re=r.useCallback(()=>{const t=l(u);if(!Number.isFinite(t))return;const o=Math.max(0,t-1);k(o.toString())},[u]),ne=r.useCallback(()=>{const t=l(g),o=Number.isFinite(t)?t+.001:.001;S(o.toFixed(3).toString())},[g]),se=r.useCallback(()=>{const t=l(g);if(!Number.isFinite(t))return;const o=Math.max(0,t-.001);S(o.toFixed(3).toString())},[g]),U=r.useCallback(t=>{n==="LIMIT"&&t!==void 0&&k(t.toString())},[n]),ae=r.useCallback(async()=>{if(T(""),F)return;const t=l(g);if(!Number.isFinite(t)||t<=0){T("Please enter a valid quantity.");return}const o=l(n==="MARKET"?p:u);if(!Number.isFinite(o)||o<=0){T("Please enter a valid price.");return}D(!0);try{const i=o,a=t,s=i*a,A=s*.001,b={orderNo:R(),orderType:n.toLowerCase(),tradingPair:c.replace("USDT","/USDT"),status:n==="MARKET"?"completed":"pending",direction:h.toUpperCase(),delegateType:n,delegateState:n==="MARKET"?"Filled":"Pending",orderQuantity:a,commissionPrice:i,entrustedValue:s,transactionQuantity:n==="MARKET"?a:0,transactionValue:n==="MARKET"?s:0,closingPrice:n==="MARKET"?i:0,handlingFee:n==="MARKET"?A:0,commissionTime:new Date().toISOString(),closingTime:n==="MARKET"?new Date().toISOString():null};await d(pe.doCreate(b)),d(K.doFetch()),n==="MARKET"&&S("")}catch(i){console.error("Place order error",i),T("Failed to place order. Please try again.")}finally{D(!1)}},[F,g,n,p,u,c,h,d,R]),ie=r.useCallback(t=>{console.log("Cancel requested for",t)},[]);r.useEffect(()=>{let t=!0;const o=setInterval(()=>{if(t&&n==="LIMIT"&&m.length>0){const a=m.map(s=>{if(s.status==="pending"&&s.orderType==="limit"){const A=l(s.commissionPrice),b=l(p);if(!Number.isFinite(A)||!Number.isFinite(b))return s;const N=b*.001;if(Math.abs(A-b)<=N)return{...s,status:"completed",delegateState:"Filled",transactionQuantity:s.orderQuantity,transactionValue:s.orderQuantity*s.commissionPrice,closingPrice:p,closingTime:new Date().toISOString(),handlingFee:s.orderQuantity*s.commissionPrice*.001}}return s}).filter((s,A)=>{var b;return s.status!==((b=m[A])==null?void 0:b.status)});a.length>0&&console.log("Matched orders (sim):",a)}},5e3);return()=>{t=!1,clearInterval(o)}},[m,p,n]);const w=r.useMemo(()=>c?c.replace("USDT",""):"",[c]);return e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"trade-header",children:[e.jsx("div",{className:"trade-header-top",children:e.jsx("div",{className:"trade-page-title",children:"SPOT"})}),e.jsxs("div",{className:"market-info",children:[x?e.jsx("div",{className:"skeleton-market-name"}):e.jsx("div",{className:"market-name",children:c.replace("USDT","/USDT")}),e.jsx("div",{className:"coin-select-icon",onClick:H,"aria-hidden":!0,children:e.jsx("i",{className:"fas fa-chevron-down"})}),x?e.jsx("div",{className:"skeleton-price-change"}):e.jsxs("div",{className:"market-change",style:{color:String(M).startsWith("-")?"#FF6838":"#00C076"},children:[String(M).startsWith("-")?"":"+",M,"%"]})]})]}),e.jsxs("div",{className:"main-content",children:[e.jsxs("div",{className:"trading-layout",children:[e.jsxs("div",{className:"trade-form",children:[e.jsx("div",{className:"buy-sell-tabs",role:"tablist",children:x?e.jsx("div",{className:"skeleton-tab"}):e.jsxs(e.Fragment,{children:[e.jsx("div",{role:"tab","aria-selected":h==="buy",tabIndex:0,className:`buy-tab ${h==="buy"?"active":""}`,onClick:()=>C("buy"),onKeyDown:t=>t.key==="Enter"&&C("buy"),children:"BUY"}),e.jsx("div",{role:"tab","aria-selected":h==="sell",tabIndex:0,className:`sell-tab ${h==="sell"?"active":""}`,onClick:()=>C("sell"),onKeyDown:t=>t.key==="Enter"&&C("sell"),children:"SELL"})]})}),e.jsxs("div",{className:"order-type",children:[e.jsx("div",{className:"order-type-label",children:"Order Type"}),x?e.jsx("div",{className:"skeleton-input"}):e.jsxs("select",{className:"order-type-select",value:n,onChange:t=>Y(t.target.value),children:[e.jsx("option",{value:"LIMIT",children:"LIMIT"}),e.jsx("option",{value:"MARKET",children:"MARKET"})]})]}),n==="LIMIT"&&e.jsxs("div",{className:"input-group",children:[e.jsx("div",{className:"input-label",children:"Price (USDT)"}),x?e.jsx("div",{className:"skeleton-input"}):e.jsxs("div",{className:"input-with-buttons",children:[e.jsx("input",{className:"value-input",value:u,onChange:Z,inputMode:"decimal","aria-label":"price"}),e.jsxs("div",{className:"value-buttons",children:[e.jsx("button",{className:"value-button",onClick:oe,"aria-label":"increase price",children:"+"}),e.jsx("button",{className:"value-button",onClick:re,"aria-label":"decrease price",children:"-"})]})]})]}),e.jsxs("div",{className:"input-group",children:[e.jsxs("div",{className:"input-label",children:["Amount (",w,")"]}),x?e.jsx("div",{className:"skeleton-input"}):e.jsxs("div",{className:"input-with-buttons",children:[e.jsx("input",{className:"value-input",value:g,onChange:ee,placeholder:"0.0",inputMode:"decimal","aria-label":"quantity"}),e.jsxs("div",{className:"value-buttons",children:[e.jsx("button",{className:"value-button",onClick:ne,"aria-label":"increase quantity",children:"+"}),e.jsx("button",{className:"value-button",onClick:se,"aria-label":"decrease quantity",children:"-"})]})]})]}),x?e.jsx("div",{className:"skeleton-input"}):e.jsxs("div",{className:"amount-display",children:[te()," USDT"]}),x?e.jsx("div",{className:"skeleton-balance"}):e.jsxs("div",{className:"balance-info",children:["Available: ",f(J[w]||0,6)," ",w]}),E&&e.jsx("div",{className:"error-message",role:"alert",children:E}),x?e.jsx("div",{className:"skeleton-button"}):e.jsx("button",{className:`action-button ${h==="buy"?"buy-button":"sell-button"}`,onClick:ae,disabled:F,"aria-busy":F,children:F?"Placing...":`${h==="buy"?"BUY":"SELL"} ${w}`})]}),e.jsxs("div",{className:"order-book",role:"region","aria-label":"order book",children:[e.jsxs("div",{className:"order-book-header",children:[e.jsx("span",{children:"Price (USDT)"}),e.jsxs("span",{children:["Amount (",w,")"]})]}),x?e.jsxs(e.Fragment,{children:[[...Array(5)].map((t,o)=>e.jsx("div",{className:"skeleton-order-book"},`s-a-${o}`)),e.jsx("div",{className:"skeleton-current-price"}),[...Array(5)].map((t,o)=>e.jsx("div",{className:"skeleton-order-book"},`s-b-${o}`))]}):e.jsxs(e.Fragment,{children:[j.asks.map((t,o)=>{const i=l(t.amount)||0,a=Math.min(100,i/B*100);return e.jsxs("div",{className:"order-book-row ask-row",onClick:()=>U(t.price),children:[e.jsx("div",{className:"depth-bar ask-depth",style:{width:`${a}%`}}),e.jsx("div",{className:"order-price",children:f(t.price,4)}),e.jsx("div",{className:"order-amount",children:f(t.amount,4)})]},`ask-${o}`)}),e.jsx("div",{className:"order-book-row current-price-row",children:e.jsxs("div",{className:"current-price",children:["$",f(p,2)]})}),j.bids.map((t,o)=>{const i=l(t.amount)||0,a=Math.min(100,i/B*100);return e.jsxs("div",{className:"order-book-row bid-row",onClick:()=>U(t.price),children:[e.jsx("div",{className:"depth-bar bid-depth",style:{width:`${a}%`}}),e.jsx("div",{className:"order-price",children:f(t.price,4)}),e.jsx("div",{className:"order-amount",children:f(t.amount,4)})]},`bid-${o}`)})]})]})]}),e.jsxs("div",{className:"open-orders",children:[e.jsxs("div",{className:"open-orders-header",children:[e.jsx("div",{className:"open-orders-title",children:"OPEN ORDERS"}),e.jsx("div",{className:"orders-filter",children:e.jsx(ue,{to:"/ordersPage",className:"remove_blue","aria-label":"view all orders",children:e.jsx("i",{className:"fas fa-list"})})})]}),m&&m.length>0?e.jsx("div",{className:"orders-list",children:m.map(t=>{var o;return e.jsxs("div",{className:"order-item",children:[e.jsxs("div",{className:"order-main-info",children:[e.jsxs("div",{className:"order-pair-action",children:[e.jsx("span",{className:"order-pair",children:t.tradingPair}),e.jsx("span",{className:`order-action ${String((t==null?void 0:t.direction)||"").toLowerCase()}`,children:t.direction}),e.jsx("span",{className:"order-type-badge",children:t.orderType})]}),e.jsxs("div",{className:"order-date",children:[t.commissionTime?new Date(t.commissionTime).toLocaleDateString():"",e.jsx("span",{className:"order-time",children:t.commissionTime?new Date(t.commissionTime).toLocaleTimeString():""})]})]}),e.jsxs("div",{className:"order-details",children:[e.jsxs("div",{className:"order-detail",children:[e.jsx("span",{className:"detail-label",children:"Status"}),e.jsx("span",{className:`order-status ${String(t.status).toLowerCase()}`,children:t.status})]}),e.jsxs("div",{className:"order-detail",children:[e.jsx("span",{className:"detail-label",children:"Price"}),e.jsxs("span",{className:"order-price-value",children:[f(t.commissionPrice,4)," USDT"]})]}),e.jsxs("div",{className:"order-detail",children:[e.jsx("span",{className:"detail-label",children:"Amount"}),e.jsxs("span",{className:"order-amount-value",children:[t.orderQuantity," ",(o=t==null?void 0:t.tradingPair)==null?void 0:o.split("/")[0]]})]}),e.jsxs("div",{className:"order-detail",children:[e.jsx("span",{className:"detail-label",children:"Total"}),e.jsxs("span",{className:"order-total",children:[f(t.entrustedValue)," USDT"]})]})]}),e.jsx("div",{className:"order-actions",children:String(t.status).toLowerCase()==="pending"||String(t.status).toLowerCase()==="partially filled"?e.jsx("button",{className:"cancel-order-btn",onClick:()=>ie(t.id),children:"Cancel"}):e.jsx("div",{className:"completed-indicator",children:e.jsx("i",{className:"fas fa-check-circle"})})})]},t.id??t.orderNo)})}):e.jsxs("div",{className:"empty-orders",children:[e.jsx("div",{className:"empty-icon",children:e.jsx("i",{className:"fas fa-clipboard-list"})}),e.jsx("div",{className:"empty-text",children:"No open orders yet"}),e.jsx("div",{className:"empty-subtext",children:"Your open orders will appear here"})]})]})]}),e.jsx(me,{isOpen:V,onClose:G,onSelectCoin:X}),e.jsx("style",{children:`
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
      `})]})}export{fe as default};
