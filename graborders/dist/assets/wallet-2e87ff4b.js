import{t as R,u as U,i as P,r as s,j as e,L as j,k as W}from"./index-066d6d6a.js";import{u as O}from"./useDispatch-1623005e.js";function I(){const y=O(),g=R(),i=U(P.selectRows),[S,D]=s.useState(g.pathname),[f,z]=s.useState({}),[u,w]=s.useState(!0),r=s.useRef(null),b=s.useRef(new Set),N=s.useRef(i),F=s.useRef({}),L=[{path:"/deposit",icon:"fas fa-wallet",name:"Deposit"},{path:"/withdraw",icon:"fas fa-money-bill-wave",name:"Withdraw"},{path:"/history",icon:"fas fa-history",name:"History"},{path:"/conversion",icon:"fas fa-exchange-alt action-icon",name:"Convert"},{path:"/stacking",icon:"fas fa-coins action-icon",name:"Staking"}],k=s.useCallback(t=>{const a=parseFloat(t);return isNaN(a)?"0":a%1===0?a.toString():a.toFixed(8).replace(/\.?0+$/,"")},[]);s.useEffect(()=>{i!==N.current&&(b.current=new Set(i.filter(a=>a.symbol!=="USDT").map(a=>`${a.symbol}USDT`)),N.current=i)},[i]),s.useEffect(()=>{let t=!0;w(!0),r.current=new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");let a=0;const c=100;return r.current.onmessage=d=>{if(!t)return;const o=Date.now();if(!(o-a<c))try{const m=JSON.parse(d.data);m.some(n=>b.current.has(n.s))&&(z(n=>{if(!t)return n;const x={...n};let h=!1;return m.forEach(l=>{b.current.has(l.s)&&JSON.stringify(x[l.s])!==JSON.stringify(l)&&(x[l.s]=l,F.current[l.s]=l,h=!0)}),h?x:n}),a=o,w(!1))}catch(m){console.error("Error processing WebSocket data:",m)}},r.current.onerror=d=>{t&&(console.error("WebSocket error:",d),w(!1))},r.current.onopen=()=>{t&&console.log("WebSocket connected")},()=>{t=!1,r.current&&(r.current.close(),r.current=null)}},[]),s.useEffect(()=>{let t=!0;return(async()=>{try{await y(W.doFetch())}catch(c){t&&console.error("Error fetching assets:",c)}})(),()=>{t=!1}},[y]),s.useEffect(()=>{D(g.pathname)},[g.pathname]);const{assetValues:C,totalValue:T,portfolioChange:v,isLoadingTotal:V}=s.useMemo(()=>{if(u&&Object.keys(f).length===0)return{assetValues:[],totalValue:0,portfolioChange:0,isLoadingTotal:!0};let t=0,a=0;const c=i.map(o=>{if(o.symbol==="USDT"){const A=parseFloat(o.amount||"0");return t+=A,a+=A,{value:A,change:0,isPositive:!0,marketPrice:1}}const m=`${o.symbol}USDT`,p=f[m]||F.current[m],n=parseFloat((p==null?void 0:p.c)||"0"),h=parseFloat(o.amount||"0")*n,l=p?parseFloat(p.P):0,M=h/(1+l/100);t+=h,a+=M;const E=l>=0;return{value:h,change:l,isPositive:E,marketPrice:n}}),d=a>0?(t-a)/a*100:0;return{assetValues:c,totalValue:t,portfolioChange:d,isLoadingTotal:!1}},[i,f,u]),$=s.useMemo(()=>i.length===0?e.jsx("div",{className:"no-assets",children:"No assets found"}):i.map((t,a)=>{if(u)return e.jsxs("div",{className:"wallet-asset-item-placeholder",children:[e.jsxs("div",{className:"wallet-asset-info-placeholder",children:[e.jsx("div",{className:"wallet-asset-icon-placeholder shimmer"}),e.jsxs("div",{className:"wallet-asset-details-placeholder",children:[e.jsx("div",{className:"placeholder-line shimmer",style:{width:"80px",height:"16px",marginBottom:"8px"}}),e.jsx("div",{className:"placeholder-line shimmer",style:{width:"60px",height:"12px"}})]})]}),e.jsxs("div",{className:"wallet-asset-value-placeholder",children:[e.jsx("div",{className:"placeholder-line shimmer",style:{width:"70px",height:"16px",marginBottom:"8px"}}),e.jsx("div",{className:"placeholder-line shimmer",style:{width:"50px",height:"12px"}})]})]},t.id);const{value:c,change:d,isPositive:o}=C[a];return e.jsx(j,{to:`/wallets/${t.id}`,className:"remove_blue",children:e.jsxs("div",{className:"wallet-asset-item",role:"button",children:[e.jsxs("div",{className:"wallet-asset-info",children:[e.jsx("div",{className:"wallet-asset-icon",children:e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${t.symbol}.png`,style:{width:35,height:35},alt:t.symbol})}),e.jsxs("div",{className:"wallet-asset-details",children:[e.jsx("div",{className:"wallet-asset-name",children:t.coinName}),e.jsxs("div",{className:"wallet-asset-amount",children:[k(t.amount)," ",t.symbol]})]})]}),e.jsxs("div",{className:"wallet-asset-value",children:[e.jsxs("div",{className:"wallet-value-amount",children:["$",c.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})]}),e.jsxs("div",{className:`wallet-value-change ${o?"positive":"negative"}`,children:[o&&t.symbol!=="USDT"?"+":"",t.symbol!=="USDT"?d.toFixed(2):"0.00","%"]})]})]})},t.id)}),[i,u,C,k]);return e.jsxs("div",{className:"wallet-container",children:[e.jsxs("div",{className:"wallet-header",children:[e.jsxs("div",{className:"header-top",children:[e.jsx("div",{className:"search-icon",children:e.jsx(j,{to:"/profile",children:e.jsx("i",{className:"fas fa-user-circle profile-icon"})})}),e.jsxs("div",{children:[e.jsx("img",{src:"/icons/asset.png",style:{height:33}})," "]}),e.jsx("div",{className:"notification-profile",children:e.jsx("i",{className:"fas fa-bell header-notification-icon profile-icon"})})]}),e.jsxs("div",{className:"wallet-total-balance",children:[e.jsx("div",{className:"wallet-balance-label",children:"Total Portfolio Value"}),V?e.jsxs("div",{className:"wallet-balance-amount-placeholder",children:[e.jsx("div",{className:"placeholder-line shimmer",style:{width:"120px",height:"32px",margin:"0 auto 8px"}}),e.jsx("div",{className:"placeholder-line shimmer",style:{width:"80px",height:"14px",margin:"0 auto"}})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"wallet-balance-amount",children:["$",T.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})]}),e.jsxs("div",{className:`wallet-balance-change ${v>=0?"positive":"negative"}`,children:[v>=0?"+":"",v.toFixed(2),"%"]})]})]})]}),e.jsx("div",{className:"quick-actions",children:L.map(t=>e.jsxs(j,{to:t.path,className:"action-btn remove_blue",role:"button","aria-label":`${t.name} cryptocurrency`,children:[e.jsx("div",{className:`action-circle ${S===t.path?"active":""}`,children:e.jsx("i",{className:`${t.icon} action-icon`,"aria-hidden":"true"})}),e.jsx("span",{className:"action-text",children:t.name})]},t.path))}),e.jsxs("div",{className:"wallet-assets-section",children:[e.jsxs("div",{className:"wallet-section-header",children:[e.jsx("div",{className:"wallet-section-title",children:"My Assets"}),e.jsx("div",{className:"wallet-see-all",role:"button",children:"Manage"})]}),e.jsx("div",{className:"wallet-asset-list",children:$})]}),e.jsx("style",{children:`
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
      `})]})}export{I as default};
