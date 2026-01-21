import{N as q,u as M,D as P,o as s,p as o,j as e,L as f,E as W}from"./index-cce0a49c.js";import{u as O}from"./useDispatch-c7d3eaf0.js";function I(){const N=O(),w=q(),i=M(P.selectRows),[D,z]=s.useState(w.pathname),[b,L]=s.useState({}),[x,v]=s.useState(!0),c=s.useRef(null),A=s.useRef(new Set),F=s.useRef(i),k=s.useRef({}),V=[{path:"/deposit",icon:"fas fa-wallet",name:o("pages.wallet.quickActions.deposit")},{path:"/withdraw",icon:"fas fa-money-bill-wave",name:o("pages.wallet.quickActions.withdraw")},{path:"/history",icon:"fas fa-history",name:o("pages.wallet.quickActions.history")},{path:"/conversion",icon:"fas fa-exchange-alt action-icon",name:o("pages.wallet.quickActions.convert")},{path:"/stacking",icon:"fas fa-coins action-icon",name:o("pages.wallet.quickActions.staking")}],C=s.useCallback(a=>{const t=parseFloat(a);return isNaN(t)?"0":t%1===0?t.toString():t.toFixed(8).replace(/\.?0+$/,"")},[]);s.useEffect(()=>{i!==F.current&&(A.current=new Set(i.filter(t=>t.symbol!=="USDT").map(t=>`${t.symbol}USDT`)),F.current=i)},[i]),s.useEffect(()=>{let a=!0;v(!0),c.current=new WebSocket("wss://stream.binance.us:9443/ws/!ticker@arr");let t=0;const d=100;return c.current.onmessage=m=>{if(!a)return;const n=Date.now();if(!(n-t<d))try{const p=JSON.parse(m.data);p.some(r=>A.current.has(r.s))&&(L(r=>{if(!a)return r;const g={...r};let u=!1;return p.forEach(l=>{A.current.has(l.s)&&JSON.stringify(g[l.s])!==JSON.stringify(l)&&(g[l.s]=l,k.current[l.s]=l,u=!0)}),u?g:r}),t=n,v(!1))}catch(p){console.error("Error processing WebSocket data:",p)}},c.current.onerror=m=>{a&&(console.error("WebSocket error:",m),v(!1))},c.current.onopen=()=>{},()=>{a=!1,c.current&&(c.current.close(),c.current=null)}},[]),s.useEffect(()=>{let a=!0;return(async()=>{try{await N(W.doFetch())}catch(d){a&&console.error("Error fetching assets:",d)}})(),()=>{a=!1}},[N]),s.useEffect(()=>{z(w.pathname)},[w.pathname]);const{assetValues:S,totalValue:$,portfolioChange:j,isLoadingTotal:T}=s.useMemo(()=>{if(x&&Object.keys(b).length===0)return{assetValues:[],totalValue:0,portfolioChange:0,isLoadingTotal:!0};let a=0,t=0;const d=i.map(n=>{if(n.symbol==="USDT"){const y=parseFloat(n.amount||"0");return a+=y,t+=y,{value:y,change:0,isPositive:!0,marketPrice:1}}const p=`${n.symbol}USDT`,h=b[p]||k.current[p],r=parseFloat((h==null?void 0:h.c)||"0"),u=parseFloat(n.amount||"0")*r,l=h?parseFloat(h.P):0,R=u/(1+l/100);a+=u,t+=R;const U=l>=0;return{value:u,change:l,isPositive:U,marketPrice:r}}),m=t>0?(a-t)/t*100:0;return{assetValues:d,totalValue:a,portfolioChange:m,isLoadingTotal:!1}},[i,b,x]),E=s.useMemo(()=>i.length===0?e.jsx("div",{className:"no-assets",children:o("pages.wallet.noAssets")}):i.map((a,t)=>{if(x)return e.jsxs("div",{className:"wallet-asset-item-placeholder",children:[e.jsxs("div",{className:"wallet-asset-info-placeholder",children:[e.jsx("div",{className:"wallet-asset-icon-placeholder shimmer"}),e.jsxs("div",{className:"wallet-asset-details-placeholder",children:[e.jsx("div",{className:"placeholder-line shimmer",style:{width:"80px",height:"16px",marginBottom:"8px"}}),e.jsx("div",{className:"placeholder-line shimmer",style:{width:"60px",height:"12px"}})]})]}),e.jsxs("div",{className:"wallet-asset-value-placeholder",children:[e.jsx("div",{className:"placeholder-line shimmer",style:{width:"70px",height:"16px",marginBottom:"8px"}}),e.jsx("div",{className:"placeholder-line shimmer",style:{width:"50px",height:"12px"}})]})]},a.id);const{value:d,change:m,isPositive:n}=S[t];return e.jsx(f,{to:`/wallets/${a.id}`,className:"remove_blue",children:e.jsxs("div",{className:"wallet-asset-item",role:"button",children:[e.jsxs("div",{className:"wallet-asset-info",children:[e.jsx("div",{className:"wallet-asset-icon",children:e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${a.symbol}.png`,style:{width:35,height:35},alt:a.symbol})}),e.jsxs("div",{className:"wallet-asset-details",children:[e.jsx("div",{className:"wallet-asset-name",children:a.coinName}),e.jsxs("div",{className:"wallet-asset-amount",children:[C(a.amount)," ",a.symbol]})]})]}),e.jsxs("div",{className:"wallet-asset-value",children:[e.jsxs("div",{className:"wallet-value-amount",children:["$",d.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})]}),e.jsxs("div",{className:`wallet-value-change ${n?"positive":"negative"}`,children:[n&&a.symbol!=="USDT"?"+":"",a.symbol!=="USDT"?m.toFixed(2):"0.00","%"]})]})]})},a.id)}),[i,x,S,C]);return e.jsxs("div",{className:"wallet-container",children:[e.jsxs("div",{className:"wallet-header",children:[e.jsxs("div",{className:"header-top",children:[e.jsx("div",{className:"search-icon",children:e.jsx(f,{to:"/profile",children:e.jsx("i",{className:"fas fa-user-circle profile-icon"})})}),e.jsxs("div",{children:[e.jsx("img",{src:"/icons/asset.png",style:{height:33}})," "]}),e.jsx(f,{to:"/notification",className:"remove_blue",children:e.jsx("div",{className:"notification-profile",children:e.jsx("i",{className:"fas fa-bell header-notification-icon profile-icon"})})})]}),e.jsxs("div",{className:"wallet-total-balance",children:[e.jsx("div",{className:"wallet-balance-label",children:o("pages.wallet.totalPortfolioValue")}),T?e.jsxs("div",{className:"wallet-balance-amount-placeholder",children:[e.jsx("div",{className:"placeholder-line shimmer",style:{width:"120px",height:"32px",margin:"0 auto 8px"}}),e.jsx("div",{className:"placeholder-line shimmer",style:{width:"80px",height:"14px",margin:"0 auto"}})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"wallet-balance-amount",children:["$",$.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})]}),e.jsxs("div",{className:`wallet-balance-change ${j>=0?"positive":"negative"}`,children:[j>=0?"+":"",j.toFixed(2),"%"]})]})]})]}),e.jsx("div",{className:"quick-actions",children:V.map(a=>e.jsxs(f,{to:a.path,className:"action-btn remove_blue",role:"button","aria-label":`${a.name} cryptocurrency`,children:[e.jsx("div",{className:`action-circle ${D===a.path?"active":""}`,children:e.jsx("i",{className:`${a.icon} action-icon`,"aria-hidden":"true"})}),e.jsx("span",{className:"action-text",children:a.name})]},a.path))}),e.jsxs("div",{className:"wallet-assets-section",children:[e.jsxs("div",{className:"wallet-section-header",children:[e.jsx("div",{className:"wallet-section-title",children:o("pages.wallet.myAssets")}),e.jsx("div",{className:"wallet-see-all",role:"button",children:o("pages.wallet.manage")})]}),e.jsx("div",{className:"wallet-asset-list",children:E})]}),e.jsx("style",{children:`
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
