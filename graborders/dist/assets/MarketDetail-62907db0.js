import{f as R,H as _,K as M,i as s,k as o,j as e,L as P,m as F}from"./index-aca44342.js";import{F as O}from"./FuturesChart-1787136e.js";function I(){const j=_(),{id:x}=M(),[y,w]=s.useState(null),[u,v]=s.useState(null),[h,N]=s.useState(null),[g,S]=s.useState(null),[b,A]=s.useState(null),[f,D]=s.useState([]),[i,$]=s.useState(x||"BTCUSDT"),[B,k]=s.useState(!0),d=s.useRef(null),m=s.useRef(null),l=s.useCallback((t,a=2)=>Number(t).toLocaleString(void 0,{minimumFractionDigits:a,maximumFractionDigits:a}),[]),T=s.useCallback(t=>{const a=Number(t);return a>=1e9?(a/1e9).toFixed(2)+o("pages.marketDetail.volume.billion"):a>=1e6?(a/1e6).toFixed(2)+o("pages.marketDetail.volume.million"):l(t,0)},[l]);s.useEffect(()=>{(async()=>{try{k(!0);const[a,c]=await Promise.all([F.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${i}`),F.get(`https://api.binance.com/api/v3/trades?symbol=${i}&limit=10`)]),r=a.data;w(r.lastPrice),v(r.priceChangePercent),N(r.highPrice),S(r.lowPrice),A(r.volume),D(c.data.slice(0,5)),k(!1)}catch(a){console.error("Error fetching initial data:",a),k(!1)}})()},[i]),s.useEffect(()=>{if(!i)return;const t=()=>{var c;((c=m.current)==null?void 0:c.readyState)===WebSocket.OPEN&&m.current.close(),m.current=new WebSocket(`wss://stream.binance.com:9443/ws/${i.toLowerCase()}@ticker`),m.current.onmessage=r=>{const p=JSON.parse(r.data);w(p.c),v(p.P),N(p.h),S(p.l),A(p.v)},m.current.onclose=()=>{setTimeout(()=>{i&&t()},2e3)}},a=()=>{var c;((c=d.current)==null?void 0:c.readyState)===WebSocket.OPEN&&d.current.close(),d.current=new WebSocket(`wss://stream.binance.com:9443/ws/${i.toLowerCase()}@trade`),d.current.onmessage=r=>{const p=JSON.parse(r.data);D(W=>[p,...W.slice(0,19)])},d.current.onclose=()=>{setTimeout(()=>{i&&a()},2e3)}};return t(),a(),()=>{var c,r;((c=m.current)==null?void 0:c.readyState)===WebSocket.OPEN&&m.current.close(),((r=d.current)==null?void 0:r.readyState)===WebSocket.OPEN&&d.current.close()}},[i]),s.useEffect(()=>{x&&x!==i&&$(x)},[x,i]);const C=s.useCallback(()=>{j.goBack()},[j]),n=s.useCallback(({width:t="100%",height:a="1em"})=>e.jsx("div",{className:"loading-placeholder",style:{width:t,height:a}}),[]),z=s.useMemo(()=>e.jsxs("div",{className:"market-info",children:[e.jsx("div",{className:"market-icon",children:e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${i.split("USDT")[0]}.png`,style:{width:30,height:30},alt:i,loading:"lazy",onError:t=>{t.target.style.display="none"}})}),e.jsx("div",{className:"market-name",children:i}),e.jsx("div",{className:"market-change",style:{color:u&&u.startsWith("-")?"#FF6838":"#00C076"},children:u!==null?`${u}%`:e.jsx(n,{width:"50px",height:"16px"})})]}),[i,u,n]),E=s.useMemo(()=>e.jsxs("div",{className:"market-stats",children:[e.jsxs("span",{children:[o("pages.marketDetail.stats.high"),":"," ",h!==null?`$${l(h)}`:e.jsx(n,{width:"80px",height:"12px"})]}),e.jsxs("span",{children:[o("pages.marketDetail.stats.volume"),":"," ",b!==null?`${T(b)} ${i.replace("USDT","")}`:e.jsx(n,{width:"80px",height:"12px"})]}),e.jsxs("span",{children:[o("pages.marketDetail.stats.low"),":"," ",g!==null?`$${l(g)}`:e.jsx(n,{width:"80px",height:"12px"})]})]}),[h,b,g,i,l,T,n]),L=s.useMemo(()=>f.length>0?f.map((t,a)=>e.jsxs("div",{className:`trade-row ${t.m?"sell-trade":"buy-trade"}`,children:[e.jsx("div",{className:"trade-price",children:l(t.p)}),e.jsx("div",{className:"trade-amount",children:Number(t.q).toFixed(4)}),e.jsx("div",{className:"trade-time",children:new Date(t.T).toLocaleTimeString()})]},`${t.t}-${t.T}-${a}`)):Array.from({length:5}).map((t,a)=>e.jsxs("div",{className:"trade-row",children:[e.jsx("div",{className:"trade-price",children:e.jsx(n,{width:"60px",height:"14px"})}),e.jsx("div",{className:"trade-amount",children:e.jsx(n,{width:"50px",height:"14px"})}),e.jsx("div",{className:"trade-time",children:e.jsx(n,{width:"40px",height:"14px"})})]},a)),[f,l,n]);return e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"header",children:[e.jsxs("div",{className:"header-top",children:[e.jsx("div",{className:"back-button",onClick:C,children:e.jsx("i",{className:"fas fa-arrow-left"})}),z,e.jsx("div",{style:{width:20}})]}),e.jsx("div",{className:"market-price",children:y!==null?`$${l(y)}`:e.jsx(n,{width:"120px",height:"28px"})}),E]}),e.jsx(O,{symbol:i}),e.jsxs("div",{className:"action-buttons",children:[e.jsx(P,{to:"/trade",className:"remove_blue action-button buy-button",children:o("pages.marketDetail.actions.buy")}),e.jsx(P,{to:"/trade",className:"remove_blue action-button sell-button",children:o("pages.marketDetail.actions.sell")})]}),e.jsx("div",{className:"section-title",children:o("pages.marketDetail.recentTrades.title")}),e.jsxs("div",{className:"recent-trades",children:[e.jsxs("div",{className:"trades-header",children:[e.jsx("span",{children:o("pages.marketDetail.recentTrades.price")}),e.jsx("span",{children:o("pages.marketDetail.recentTrades.amount")}),e.jsx("span",{children:o("pages.marketDetail.recentTrades.time")})]}),L]}),e.jsx("style",{children:`
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
        
        .back-button {
          color: #AAAAAA;
          font-size: 20px;
          cursor: pointer;
          padding: 5px;
        }
        
        .market-info {
          display: flex;
          align-items: center;
        }
        
        .market-icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: #1E1E1E;
          margin-right: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }
        
        .market-name {
          font-weight: bold;
          font-size: 18px;
          margin-right: 10px;
        }
        
        .market-change {
          font-size: 14px;
          font-weight: bold;
          min-height: 16px;
          display: flex;
          align-items: center;
        }
        
        .market-price {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 5px;
          min-height: 28px;
          display: flex;
          align-items: center;
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
          display: flex;
          align-items: center;
          min-height: 16px;
        }
        
        /* Remove blue link styles */
        .remove_blue {
          text-decoration: none;
          color: inherit;
          display: block;
        }
        
        .remove_blue:hover, .remove_blue:focus, .remove_blue:active {
          text-decoration: none;
          color: inherit;
        }
        
        // /* Action Buttons */
        // .action-buttons {
        //   display: flex;
        //   gap: 10px;
        //   margin: 15px;
        // }
        
        .action-button {
          flex: 1;
          padding: 13px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          text-align: center;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .buy-button {
          background-color: #00C076;
          color: white;
        }
        
        .sell-button {
          background-color: #FF6838;
          color: white;
        }
        
        /* Loading placeholder animation */
        .loading-placeholder {
          background: linear-gradient(90deg, #2A2A2A 25%, #333 50%, #2A2A2A 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          border-radius: 4px;
          display: inline-block;
        }
        
        @keyframes loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
        
        /* Recent Trades */
        .recent-trades {
          margin: 15px;
          max-height: 300px;
          overflow-y: auto;
        }
        
        .trades-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 12px;
          color: #777;
          position: sticky;
          top: 0;
          background-color: #000;
          padding: 5px 0;
          z-index: 10;
        }
        
        .trade-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 13px;
          border-bottom: 1px solid #2A2A2A;
          align-items: center;
          min-height: 32px;
        }
        
        .trade-price {
          flex: 1;
        }
        
        .trade-amount {
          flex: 1;
          text-align: right;
        }
        
        .trade-time {
          flex: 1;
          text-align: right;
          color: #777;
          font-size: 11px;
        }
        
        .buy-trade .trade-price {
          color: #00C076;
        }
        
        .sell-trade .trade-price {
          color: #FF6838;
        }
        
        /* Section Titles */
        .section-title {
          font-size: 16px;
          font-weight: bold;
          margin: 20px 15px 15px;
          padding-bottom: 10px;
          border-bottom: 1px solid #2A2A2A;
        }
      `})]})}const J=R.memo(I);export{J as default};
