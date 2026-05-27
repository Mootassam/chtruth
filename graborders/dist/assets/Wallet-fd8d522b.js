import{N as R,u as U,D as M,o as s,t as p,O,q as W,j as e,L as w,E as I}from"./index-580aaa36.js";import{u as _}from"./useDispatch-18333ad0.js";function G(){const F=_(),b=R(),r=U(M.selectRows),[z,$]=s.useState(b.pathname),[v,k]=s.useState({}),[x,g]=s.useState(!0),h=s.useRef(null),A=s.useRef(new Set),C=s.useRef(r),j=s.useRef({}),E=[{path:"/deposit",icon:"fas fa-wallet",name:p("pages.wallet.quickActions.deposit")},{path:"/withdraw",icon:"fas fa-money-bill-wave",name:p("pages.wallet.quickActions.withdraw")},{path:"/history",icon:"fas fa-history",name:p("pages.wallet.quickActions.history")},{path:"/conversion",icon:"fas fa-exchange-alt action-icon",name:p("pages.wallet.quickActions.convert")},{path:"/stacking",icon:"fas fa-coins action-icon",name:p("pages.wallet.quickActions.staking")}],S=s.useCallback(t=>{const a=parseFloat(t);return isNaN(a)?"0":a%1===0?a.toString():a.toFixed(8).replace(/\.?0+$/,"")},[]);s.useEffect(()=>{const t=O.get();W.get(`/tenant/${t}/prices`).then(a=>{var d;const c=((d=a.data)==null?void 0:d.data)||{};Object.keys(c).length!==0&&(k(i=>{const m={...i};return Object.entries(c).forEach(([n,l])=>{m[n]={s:n,c:l.c,P:l.P},j.current[n]={s:n,c:l.c,P:l.P}}),m}),g(!1))}).catch(()=>{})},[]),s.useEffect(()=>{r!==C.current&&(A.current=new Set(r.filter(a=>a.symbol!=="USDT").map(a=>`${a.symbol}USDT`)),C.current=r)},[r]),s.useEffect(()=>{let t=!0;g(!0),h.current=new WebSocket("wss://stream.binance.us:9443/ws/!ticker@arr");let a=0;const c=100;return h.current.onmessage=d=>{if(!t)return;const i=Date.now();if(!(i-a<c))try{const m=JSON.parse(d.data);m.some(l=>A.current.has(l.s))&&(k(l=>{if(!t)return l;const f={...l};let u=!1;return m.forEach(o=>{A.current.has(o.s)&&JSON.stringify(f[o.s])!==JSON.stringify(o)&&(f[o.s]=o,j.current[o.s]=o,u=!0)}),u?f:l}),a=i,g(!1))}catch(m){console.error("Error processing WebSocket data:",m)}},h.current.onerror=d=>{t&&(console.error("WebSocket error:",d),g(!1))},h.current.onopen=()=>{},()=>{t=!1,h.current&&(h.current.close(),h.current=null)}},[]),s.useEffect(()=>{let t=!0;return(async()=>{try{await F(I.doFetch())}catch(c){t&&console.error("Error fetching assets:",c)}})(),()=>{t=!1}},[F]),s.useEffect(()=>{$(b.pathname)},[b.pathname]);const{assetValues:D,totalValue:L,portfolioChange:y,isLoadingTotal:P}=s.useMemo(()=>{if(x&&Object.keys(v).length===0)return{assetValues:[],totalValue:0,portfolioChange:0,isLoadingTotal:!0};let t=0,a=0;const c=r.map(i=>{if(i.symbol==="USDT"){const N=parseFloat(i.amount||"0");return t+=N,a+=N,{value:N,change:0,isPositive:!0,marketPrice:1}}const m=`${i.symbol}USDT`,n=v[m]||j.current[m],l=parseFloat((n==null?void 0:n.c)||"0"),u=parseFloat(i.amount||"0")*l,o=n?parseFloat(n.P):0,V=u/(1+o/100);t+=u,a+=V;const q=o>=0;return{value:u,change:o,isPositive:q,marketPrice:l}}),d=a>0?(t-a)/a*100:0;return{assetValues:c,totalValue:t,portfolioChange:d,isLoadingTotal:!1}},[r,v,x]),T=s.useMemo(()=>r.length===0?e.jsx("div",{className:"no-assets",children:p("pages.wallet.noAssets")}):r.map((t,a)=>{if(x)return e.jsxs("div",{className:"wallet-asset-item-placeholder",children:[e.jsxs("div",{className:"wallet-asset-info-placeholder",children:[e.jsx("div",{className:"wallet-asset-icon-placeholder shimmer"}),e.jsxs("div",{className:"wallet-asset-details-placeholder",children:[e.jsx("div",{className:"placeholder-line shimmer",style:{width:"80px",height:"16px",marginBottom:"8px"}}),e.jsx("div",{className:"placeholder-line shimmer",style:{width:"60px",height:"12px"}})]})]}),e.jsxs("div",{className:"wallet-asset-value-placeholder",children:[e.jsx("div",{className:"placeholder-line shimmer",style:{width:"70px",height:"16px",marginBottom:"8px"}}),e.jsx("div",{className:"placeholder-line shimmer",style:{width:"50px",height:"12px"}})]})]},t.id);const{value:c,change:d,isPositive:i}=D[a];return e.jsx(w,{to:`/wallets/${t.id}`,className:"remove_blue",children:e.jsxs("div",{className:"wallet-asset-item",role:"button",children:[e.jsxs("div",{className:"wallet-asset-info",children:[e.jsx("div",{className:"wallet-asset-icon",children:e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${t.symbol}.png`,style:{width:35,height:35},alt:t.symbol})}),e.jsxs("div",{className:"wallet-asset-details",children:[e.jsx("div",{className:"wallet-asset-name",children:t.coinName}),e.jsxs("div",{className:"wallet-asset-amount",children:[S(t.amount)," ",t.symbol]})]})]}),e.jsxs("div",{className:"wallet-asset-value",children:[e.jsxs("div",{className:"wallet-value-amount",children:["$",c.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})]}),e.jsxs("div",{className:`wallet-value-change ${i?"positive":"negative"}`,children:[i&&t.symbol!=="USDT"?"+":"",t.symbol!=="USDT"?d.toFixed(2):"0.00","%"]})]})]})},t.id)}),[r,x,D,S]);return e.jsxs("div",{className:"wallet-container",children:[e.jsxs("div",{className:"wallet-header",children:[e.jsxs("div",{className:"header-top",children:[e.jsx("div",{className:"search-icon",children:e.jsx(w,{to:"/profile",children:e.jsx("i",{className:"fas fa-user-circle profile-icon"})})}),e.jsxs("div",{children:[e.jsx("img",{src:"/icons/asset.png",style:{height:33}})," "]}),e.jsx(w,{to:"/notification",className:"remove_blue",children:e.jsx("div",{className:"notification-profile",children:e.jsx("i",{className:"fas fa-bell header-notification-icon profile-icon"})})})]}),e.jsxs("div",{className:"wallet-total-balance",children:[e.jsx("div",{className:"wallet-balance-label",children:p("pages.wallet.totalPortfolioValue")}),P?e.jsxs("div",{className:"wallet-balance-amount-placeholder",children:[e.jsx("div",{className:"placeholder-line shimmer",style:{width:"120px",height:"32px",margin:"0 auto 8px"}}),e.jsx("div",{className:"placeholder-line shimmer",style:{width:"80px",height:"14px",margin:"0 auto"}})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"wallet-balance-amount",children:["$",L.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})]}),e.jsxs("div",{className:`wallet-balance-change ${y>=0?"positive":"negative"}`,children:[y>=0?"+":"",y.toFixed(2),"%"]})]})]})]}),e.jsx("div",{className:"quick-actions",children:E.map(t=>e.jsxs(w,{to:t.path,className:"action-btn remove_blue",role:"button","aria-label":`${t.name} cryptocurrency`,children:[e.jsx("div",{className:`action-circle ${z===t.path?"active":""}`,children:e.jsx("i",{className:`${t.icon} action-icon`,"aria-hidden":"true"})}),e.jsx("span",{className:"action-text",children:t.name})]},t.path))}),e.jsxs("div",{className:"wallet-assets-section",children:[e.jsxs("div",{className:"wallet-section-header",children:[e.jsx("div",{className:"wallet-section-title",children:p("pages.wallet.myAssets")}),e.jsx("div",{className:"wallet-see-all",role:"button",children:p("pages.wallet.manage")})]}),e.jsx("div",{className:"wallet-asset-list",children:T})]}),e.jsx("style",{children:`
        /* All the CSS styles from the original component */
        @keyframes shimmer {
          0% {
            background-position: -468px 0;
          }
          100% {
            background-position: 468px 0;
          }
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
        
        .wallet-balance-amount-placeholder {
          text-align: center;
        }
        
        .wallet-asset-item-placeholder {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 13px;
          background-color: #1A1A1A;
          border-radius: 12px;
        }
        
        .wallet-asset-info-placeholder {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
        }
        
        .wallet-asset-icon-placeholder {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 12px;
        }
        
        .wallet-asset-details-placeholder {
          flex: 1;
        }
        
        .wallet-asset-value-placeholder {
          text-align: right;
        }
        
        .placeholder-line {
          border-radius: 4px;
          margin-bottom: 8px;
        }
        
        .wallet-container {
          max-width: 400px;
          margin: 0 auto;
          padding-bottom: 70px;
          background-color: #000000;
          color: #FFFFFF;
          min-height: 100vh;
        }

        .wallet-header {
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
          margin-bottom: 20px;
        }

        .search-icon, .header-notification-icon {
          color: #FFFFFF;
          font-size: 20px;
          cursor: pointer;
        }

        .notification-profile {
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .profile-icon {
          color: #FFFFFF;
          font-size: 24px;
        }

        .wallet-total-balance {
          background: linear-gradient(135deg, #2A2A2A 0%, #1A1A1A 100%);
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 20px;
          text-align: center;
        }

        .wallet-balance-label {
          color: #AAAAAA;
          font-size: 14px;
          margin-bottom: 8px;
        }

        .wallet-balance-amount {
          font-size: 32px;
          font-weight: bold;
          margin-bottom: 8px;
        }

        .wallet-balance-change {
          font-size: 14px;
        }

        .wallet-balance-change.positive {
          color: #00C076;
        }

        .wallet-balance-change.negative {
          color: #FF6838;
        }

        .quick-actions {
          display: flex;
          justify-content: space-around;
          padding: 15px 0;
          background-color: #000000;
          border-bottom: 1px solid #2A2A2A;
        }

        .action-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          color: #CCCCCC;
        }

        .action-circle {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #2A2A2A;
          margin-bottom: 8px;
          transition: background-color 0.2s ease;
        }

        .action-circle.active, .action-circle:hover {
          background-color: #F3BA2F;
          color: #000000;
        }

        .action-icon {
          font-size: 20px;
        }

        .action-text {
          font-size: 12px;
        }

        .remove_blue {
          color: inherit;
        }

        .wallet-assets-section {
          padding: 0 15px;
        }

        .wallet-section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          margin-top: 20px;
        }

        .wallet-section-title {
          font-weight: bold;
          font-size: 18px;
        }

        .wallet-see-all {
          color: #CCCCCC;
          font-size: 14px;
          cursor: pointer;
        }

        .wallet-asset-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .wallet-asset-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          background-color: #1A1A1A;
          border-radius: 12px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .wallet-asset-item:hover {
          background-color: #2A2A2A;
        }

        .wallet-asset-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .wallet-asset-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          background-color: #2A2A2A;
        }

        .wallet-asset-details {
          display: flex;
          flex-direction: column;
        }

        .wallet-asset-name {
          font-weight: bold;
          margin-bottom: 4px;
        }

        .wallet-asset-amount {
          color: #AAAAAA;
          font-size: 12px;
        }

        .wallet-asset-value {
          text-align: right;
        }

        .wallet-value-amount {
          font-weight: bold;
          margin-bottom: 4px;
        }

        .wallet-value-change {
          font-size: 12px;
        }

        .wallet-value-change.positive {
          color: #00C076;
        }

        .wallet-value-change.negative {
          color: #FF6838;
        }

        .no-assets {
          text-align: center;
          padding: 20px;
          color: #AAAAAA;
        }

        @media (max-width: 480px) {
          .wallet-container {
            padding-bottom: 80px;
          }
          
          .action-circle {
            width: 45px;
            height: 45px;
          }
          
          .action-text {
            font-size: 11px;
          }
        }
      `})]})}export{G as default};
