import{r as W,M as R,B as M,h as i,j as e,L as T,k as F}from"./index-d1d6c6ad.js";import{F as B}from"./FuturesChart-42ab801c.js";function _(){const k=R(),{id:x}=M(),[j,w]=i.useState(null),[p,y]=i.useState(null),[h,v]=i.useState(null),[u,N]=i.useState(null),[g,S]=i.useState(null),[b,A]=i.useState([]),[a,$]=i.useState(x||"BTCUSDT"),[O,f]=i.useState(!0),l=i.useRef(null),d=i.useRef(null),c=i.useCallback((t,s=2)=>Number(t).toLocaleString(void 0,{minimumFractionDigits:s,maximumFractionDigits:s}),[]),P=i.useCallback(t=>{const s=Number(t);return s>=1e9?(s/1e9).toFixed(2)+"B":s>=1e6?(s/1e6).toFixed(2)+"M":c(t,0)},[c]);i.useEffect(()=>{(async()=>{try{f(!0);const[s,o]=await Promise.all([F.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${a}`),F.get(`https://api.binance.com/api/v3/trades?symbol=${a}&limit=10`)]),r=s.data;w(r.lastPrice),y(r.priceChangePercent),v(r.highPrice),N(r.lowPrice),S(r.volume),A(o.data.slice(0,5)),f(!1)}catch(s){console.error("Error fetching initial data:",s),f(!1)}})()},[a]),i.useEffect(()=>{if(!a)return;const t=()=>{var o;((o=d.current)==null?void 0:o.readyState)===WebSocket.OPEN&&d.current.close(),d.current=new WebSocket(`wss://stream.binance.com:9443/ws/${a.toLowerCase()}@ticker`),d.current.onmessage=r=>{const m=JSON.parse(r.data);w(m.c),y(m.P),v(m.h),N(m.l),S(m.v)},d.current.onclose=()=>{setTimeout(()=>{a&&t()},2e3)}},s=()=>{var o;((o=l.current)==null?void 0:o.readyState)===WebSocket.OPEN&&l.current.close(),l.current=new WebSocket(`wss://stream.binance.com:9443/ws/${a.toLowerCase()}@trade`),l.current.onmessage=r=>{const m=JSON.parse(r.data);A(D=>[m,...D.slice(0,19)])},l.current.onclose=()=>{setTimeout(()=>{a&&s()},2e3)}};return t(),s(),()=>{var o,r;((o=d.current)==null?void 0:o.readyState)===WebSocket.OPEN&&d.current.close(),((r=l.current)==null?void 0:r.readyState)===WebSocket.OPEN&&l.current.close()}},[a]),i.useEffect(()=>{x&&x!==a&&$(x)},[x,a]);const C=i.useCallback(()=>{k.goBack()},[k]),n=i.useCallback(({width:t="100%",height:s="1em"})=>e.jsx("div",{className:"loading-placeholder",style:{width:t,height:s}}),[]),z=i.useMemo(()=>e.jsxs("div",{className:"market-info",children:[e.jsx("div",{className:"market-icon",children:e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${a.split("USDT")[0]}.png`,style:{width:30,height:30},alt:a,loading:"lazy",onError:t=>{t.target.style.display="none"}})}),e.jsx("div",{className:"market-name",children:a}),e.jsx("div",{className:"market-change",style:{color:p&&p.startsWith("-")?"#FF6838":"#00C076"},children:p!==null?`${p}%`:e.jsx(n,{width:"50px",height:"16px"})})]}),[a,p,n]),E=i.useMemo(()=>e.jsxs("div",{className:"market-stats",children:[e.jsxs("span",{children:["24h High:"," ",h!==null?`$${c(h)}`:e.jsx(n,{width:"80px",height:"12px"})]}),e.jsxs("span",{children:["24h Vol:"," ",g!==null?`${P(g)} ${a.replace("USDT","")}`:e.jsx(n,{width:"80px",height:"12px"})]}),e.jsxs("span",{children:["24h Low:"," ",u!==null?`$${c(u)}`:e.jsx(n,{width:"80px",height:"12px"})]})]}),[h,g,u,a,c,P,n]),L=i.useMemo(()=>b.length>0?b.map((t,s)=>e.jsxs("div",{className:`trade-row ${t.m?"sell-trade":"buy-trade"}`,children:[e.jsx("div",{className:"trade-price",children:c(t.p)}),e.jsx("div",{className:"trade-amount",children:Number(t.q).toFixed(4)}),e.jsx("div",{className:"trade-time",children:new Date(t.T).toLocaleTimeString()})]},`${t.t}-${t.T}-${s}`)):Array.from({length:5}).map((t,s)=>e.jsxs("div",{className:"trade-row",children:[e.jsx("div",{className:"trade-price",children:e.jsx(n,{width:"60px",height:"14px"})}),e.jsx("div",{className:"trade-amount",children:e.jsx(n,{width:"50px",height:"14px"})}),e.jsx("div",{className:"trade-time",children:e.jsx(n,{width:"40px",height:"14px"})})]},s)),[b,c,n]);return e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"header",children:[e.jsxs("div",{className:"header-top",children:[e.jsx("div",{className:"back-button",onClick:C,children:e.jsx("i",{className:"fas fa-arrow-left"})}),z,e.jsx("div",{style:{width:20}})]}),e.jsx("div",{className:"market-price",children:j!==null?`$${c(j)}`:e.jsx(n,{width:"120px",height:"28px"})}),E]}),e.jsx(B,{symbol:a}),e.jsxs("div",{className:"action-buttons",children:[e.jsx(T,{to:"/trade",className:"remove_blue action-button buy-button",children:"BUY"}),e.jsx(T,{to:"/trade",className:"remove_blue action-button sell-button",children:"SELL"})]}),e.jsx("div",{className:"section-title",children:"Recent Trades (Live)"}),e.jsxs("div",{className:"recent-trades",children:[e.jsxs("div",{className:"trades-header",children:[e.jsx("span",{children:"Price (USDT)"}),e.jsx("span",{children:"Amount"}),e.jsx("span",{children:"Time"})]}),L]}),e.jsx("style",{children:`
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
      `})]})}const V=W.memo(_);export{V as default};
