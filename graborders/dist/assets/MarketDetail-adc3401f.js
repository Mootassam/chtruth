import{M as $,B as z,r as s,j as e,i as S}from"./index-9a97368f.js";import{F as C}from"./FuturesChart-80ed276a.js";function B(){const A=$(),{id:m}=z(),[u,h]=s.useState(null),[p,g]=s.useState(null),[f,b]=s.useState(null),[k,j]=s.useState(null),[w,y]=s.useState(null),[v,N]=s.useState([]),[i,T]=s.useState(m||"BTCUSDT"),[D,x]=s.useState(!0),n=s.useRef(null),a=s.useRef(null),d=(r,t=2)=>Number(r).toLocaleString(void 0,{minimumFractionDigits:t,maximumFractionDigits:t}),F=r=>{const t=Number(r);return t>=1e9?(t/1e9).toFixed(2)+"B":t>=1e6?(t/1e6).toFixed(2)+"M":d(r,0)};s.useEffect(()=>{(async()=>{try{x(!0);const[t,o]=await Promise.all([S.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${i}`),S.get(`https://api.binance.com/api/v3/trades?symbol=${i}&limit=10`)]),l=t.data;h(l.lastPrice),g(l.priceChangePercent),b(l.highPrice),j(l.lowPrice),y(l.volume),N(o.data.slice(0,5)),x(!1)}catch(t){console.error("Error fetching initial data:",t),x(!1)}})()},[i]),s.useEffect(()=>{if(!i)return;const r=()=>{a.current&&a.current.close(),a.current=new WebSocket(`wss://stream.binance.com:9443/ws/${i.toLowerCase()}@ticker`),a.current.onopen=()=>{},a.current.onmessage=t=>{const o=JSON.parse(t.data);h(o.c),g(o.P),b(o.h),j(o.l),y(o.v)},a.current.onerror=t=>{console.error("Ticker WebSocket error:",t)},a.current.onclose=t=>{setTimeout(()=>{i&&r()},2e3)}};return r(),()=>{a.current&&a.current.readyState===WebSocket.OPEN&&a.current.close()}},[i]),s.useEffect(()=>{if(!i)return;const r=()=>{n.current&&n.current.close(),n.current=new WebSocket(`wss://stream.binance.com:9443/ws/${i.toLowerCase()}@trade`),n.current.onopen=()=>{},n.current.onmessage=t=>{const o=JSON.parse(t.data);N(l=>[o,...l.slice(0,19)])},n.current.onerror=t=>{console.error("Trade WebSocket error:",t)},n.current.onclose=t=>{setTimeout(()=>{i&&r()},2e3)}};return r(),()=>{n.current&&n.current.readyState===WebSocket.OPEN&&n.current.close()}},[i]),s.useEffect(()=>(m&&T(m),()=>{n.current&&n.current.close(),a.current&&a.current.close()}),[m]);const P=()=>{A.goBack()},c=({width:r="100%",height:t="1em"})=>e.jsx("div",{className:"loading-placeholder",style:{width:r,height:t}});return e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"header",children:[e.jsxs("div",{className:"header-top",children:[e.jsx("div",{className:"back-button",onClick:()=>P(),children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsxs("div",{className:"market-info",children:[e.jsx("div",{className:"market-icon",children:e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${i.split("USDT")[0]}.png`,style:{width:30,height:30},alt:i,loading:"lazy"})}),e.jsx("div",{className:"market-name",children:i}),e.jsx("div",{className:"market-change",style:{color:p&&p.startsWith("-")?"#FF6838":"#00C076"},children:p!==null?`${p}%`:e.jsx(c,{width:"50px",height:"16px"})})]}),e.jsx("div",{style:{width:20}})]}),e.jsx("div",{className:"market-price",children:u!==null?`$${d(u)}`:e.jsx(c,{width:"120px",height:"28px"})}),e.jsxs("div",{className:"market-stats",children:[e.jsxs("span",{children:["24h High:"," ",f!==null?`$${d(f)}`:e.jsx(c,{width:"80px",height:"12px"})]}),e.jsxs("span",{children:["24h Vol:"," ",w!==null?`${F(w)} ${i.replace("USDT","")}`:e.jsx(c,{width:"80px",height:"12px"})]}),e.jsxs("span",{children:["24h Low:"," ",k!==null?`$${d(k)}`:e.jsx(c,{width:"80px",height:"12px"})]})]})]}),e.jsx(C,{symbol:i||void 0}),e.jsxs("div",{className:"action-buttons",children:[e.jsx("button",{className:"action-button buy-button",children:"BUY"}),e.jsx("button",{className:"action-button sell-button",children:"SELL"})]}),e.jsx("div",{className:"section-title",children:"Recent Trades (Live)"}),e.jsxs("div",{className:"recent-trades",children:[e.jsxs("div",{className:"trades-header",children:[e.jsx("span",{children:"Price (USDT)"}),e.jsx("span",{children:"Amount"}),e.jsx("span",{children:"Time"})]}),v.length>0?v.map((r,t)=>e.jsxs("div",{className:`trade-row ${r.m?"sell-trade":"buy-trade"}`,children:[e.jsx("div",{className:"trade-price",children:d(r.p)}),e.jsx("div",{className:"trade-amount",children:Number(r.q).toFixed(4)}),e.jsx("div",{className:"trade-time",children:new Date(r.T).toLocaleTimeString()})]},`${r.t}-${t}`)):Array.from({length:5}).map((r,t)=>e.jsxs("div",{className:"trade-row",children:[e.jsx("div",{className:"trade-price",children:e.jsx(c,{width:"60px",height:"14px"})}),e.jsx("div",{className:"trade-amount",children:e.jsx(c,{width:"50px",height:"14px"})}),e.jsx("div",{className:"trade-time",children:e.jsx(c,{width:"40px",height:"14px"})})]},t))]}),e.jsx("style",{children:`
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
        
        /* Action Buttons */
        .action-buttons {
          display: flex;
          gap: 15px;
          margin: auto;
        }
        
        .action-button {
          flex: 1;
          padding: 13px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
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
      `})]})}export{B as default};
