import{r as n,j as e,L as k,f as P}from"./index-17631913.js";import{H as D}from"./Header-9afc79cb.js";const L=()=>{const[u,v]=n.useState({}),[m,A]=n.useState(""),[g,N]=n.useState("All"),[j,f]=n.useState(!0),d=n.useRef(null),x=n.useMemo(()=>["BTCUSDT","ETHUSDT","BNBUSDT","LTCUSDT","SOLUSDT","XRPUSDT","SUIUSDT","DOGEUSDT","SHIBUSDT"],[]);n.useEffect(()=>{(async()=>{try{f(!0);const s=(await P.get("https://api.binance.com/api/v3/ticker/24hr")).data.filter(r=>r.symbol.endsWith("USDT")&&!r.symbol.includes("UP")&&!r.symbol.includes("DOWN")&&!r.symbol.includes("BEAR")&&!r.symbol.includes("BULL"));s.sort((r,l)=>parseFloat(l.quoteVolume)-parseFloat(r.quoteVolume));const a=s.slice(0,200),o={};a.forEach(r=>{const l=r.symbol,c=l.replace("USDT",""),h=!r.priceChangePercent.startsWith("-"),S=Math.abs(Number(r.priceChangePercent)).toFixed(2),p=Number(r.volume);let b=p.toFixed(0);p>=1e9?b=(p/1e9).toFixed(1)+"B":p>=1e6&&(b=(p/1e6).toFixed(1)+"M"),o[l]={symbol:l,name:`${c}/USDT`,price:Number(r.lastPrice).toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:Number(r.lastPrice)<1?6:4}),change:r.priceChange,changePercent:S,volume:r.volume,volumeFormatted:b,isPositive:h,quoteVolume:parseFloat(r.quoteVolume)}}),v(o),f(!1)}catch(i){console.error("Error fetching market data:",i),f(!1)}})()},[]),n.useEffect(()=>(d.current=new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr"),d.current.onmessage=t=>{const i=JSON.parse(t.data);v(s=>{const a={...s};return i.forEach(o=>{if(a[o.s]){const r=!o.P.startsWith("-"),l=Math.abs(Number(o.P)).toFixed(2),c=Number(o.v);let h=c.toFixed(0);c>=1e9?h=(c/1e9).toFixed(1)+"B":c>=1e6&&(h=(c/1e6).toFixed(1)+"M"),a[o.s]={...a[o.s],price:Number(o.c).toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:Number(o.c)<1?6:4}),change:o.p,changePercent:l,volume:o.v,volumeFormatted:h,isPositive:r,quoteVolume:parseFloat(o.q)}}}),a})},d.current.onerror=t=>{console.error("WebSocket error:",t)},()=>{d.current&&d.current.close()}),[]);const y=n.useMemo(()=>{const t=Object.values(u);if(t.length===0)return[];let i=t;if(m){const s=m.toLowerCase();i=i.filter(a=>a.name.toLowerCase().includes(s)||a.symbol.toLowerCase().includes(s))}switch(g){case"Gainers":return i.filter(s=>s.isPositive).sort((s,a)=>Number(a.changePercent)-Number(s.changePercent));case"Losers":return i.filter(s=>!s.isPositive).sort((s,a)=>Number(s.changePercent)-Number(a.changePercent));case"Favorites":return i.filter(s=>x.includes(s.symbol)).sort((s,a)=>x.indexOf(s.symbol)-x.indexOf(a.symbol));default:return i.sort((s,a)=>a.quoteVolume-s.quoteVolume)}},[u,m,g,x]),F=t=>{A(t.target.value)},w=t=>{N(t)};return e.jsxs(e.Fragment,{children:[" ",e.jsx(D,{}),e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"market-headers",children:[e.jsx("div",{className:"market-page-title",children:"USDT MARKET"}),e.jsxs("div",{className:"search-bar",children:[e.jsx("i",{className:"fas fa-search",style:{color:"#AAAAAA"}}),e.jsx("input",{type:"text",placeholder:"Search crypto",value:m,onChange:F}),m&&e.jsx("button",{className:"clear-search",onClick:()=>A(""),"aria-label":"Clear search",children:"×"})]})]}),e.jsx("div",{className:"market-tabs",children:["All","Gainers","Losers","Favorites"].map(t=>e.jsx("div",{className:`tab ${g===t?"active":""}`,onClick:()=>w(t),children:t},t))}),e.jsx("div",{className:"market-list",children:j&&Object.keys(u).length===0?e.jsx("div",{className:"market-placeholder",children:[...Array(10)].map((t,i)=>e.jsxs("div",{className:"market-item-placeholder",children:[e.jsxs("div",{className:"crypto-info-placeholder",children:[e.jsx("div",{className:"crypto-icon-placeholder shimmer"}),e.jsxs("div",{className:"crypto-details-placeholder",children:[e.jsx("div",{className:"placeholder-line shimmer",style:{width:"60%",height:"16px",marginBottom:"8px"}}),e.jsx("div",{className:"placeholder-line shimmer",style:{width:"40%",height:"12px"}})]})]}),e.jsxs("div",{className:"price-info-placeholder",children:[e.jsx("div",{className:"placeholder-line shimmer",style:{width:"70px",height:"16px",marginBottom:"8px"}}),e.jsx("div",{className:"placeholder-line shimmer",style:{width:"50px",height:"12px"}})]})]},i))}):y.length>0?e.jsx(e.Fragment,{children:y.map(t=>e.jsx(k,{to:`/market/detail/${t.symbol}`,className:"remove_blue",children:e.jsxs("div",{className:"market-item",children:[e.jsxs("div",{className:"crypto-info",children:[e.jsx("div",{className:"crypto-icon",children:e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${t.name.split("/")[0]}.png`,style:{width:40,height:40},alt:t.name.split("/")[0],onError:i=>{i.target.src=`https://via.placeholder.com/40/3a3a3a/ffffff?text=${t.name.split("/")[0].charAt(0)}`}})}),e.jsxs("div",{children:[e.jsx("div",{className:"crypto-name",children:t.name}),e.jsxs("div",{className:"crypto-volume",children:["Vol: ",t.volumeFormatted]})]})]}),e.jsxs("div",{className:"price-info",children:[e.jsxs("div",{className:"price",children:["$",t.price]}),e.jsxs("div",{className:`change ${t.isPositive?"positive":"negative"}`,children:[t.isPositive?"+":"",t.changePercent,"%"]})]})]})},t.symbol))}):e.jsxs("div",{className:"no-results",children:[e.jsx("i",{className:"fas fa-search",style:{fontSize:"24px",marginBottom:"10px"}}),e.jsx("div",{children:"No cryptocurrencies found"})]})}),e.jsx("style",{children:`
        /* Shimmer animation for loading placeholders */
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
        
        .market-placeholder {
        }
        
        .market-item-placeholder {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 0;
          border-bottom: 1px solid #2A2A2A;
          with:100%
        }
        
        .crypto-info-placeholder {
          display: flex;
          align-items: center;
          flex: 1;
        }
        
        .crypto-icon-placeholder {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 12px;
        }
        
        .crypto-details-placeholder {
          flex: 1;
        }
        
        .price-info-placeholder {
          text-align: right;
          margin-right: 15px;
          // flex: 1;
        }
        
        .placeholder-line {
          border-radius: 4px;
          margin-bottom: 8px;
        }
        
        .container {
          max-width: 400px;
          margin: 0 auto;
          padding: 20px 15px;
          background-color: #000000;
          color: #FFFFFF;
          min-height: 100vh;
        }
        
        .market-headers {
          margin-bottom: 20px;
        }
        
        .market-page-title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 15px;
        }
        
        .search-bar {
          display: flex;
          align-items: center;
          background-color: #1A1A1A;
          border-radius: 8px;
          padding: 10px 15px;
          position: relative;
        }
        
        .search-bar i {
          margin-right: 10px;
        }
        
        .search-bar input {
          background: none;
          border: none;
          color: #FFFFFF;
          width: 100%;
          outline: none;
        }
        
        .clear-search {
          background: none;
          border: none;
          color: #AAAAAA;
          font-size: 18px;
          cursor: pointer;
          position: absolute;
          right: 10px;
        }
        
        .market-tabs {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          border-bottom: 1px solid #2A2A2A;
        }
        
        .tab {
          padding: 10px 0;
          cursor: pointer;
          color: #AAAAAA;
          position: relative;
          font-size: 14px;
        }
        
        .tab.active {
          color: #FFFFFF;
          font-weight: bold;
        }
        
        .tab.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background-color: #F3BA2F;
        }
        
        .market-list {
          overflow-y: auto;
          margin-bottom: 40px;
 
        }
        
        .market-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 0;
          border-bottom: 1px solid #2A2A2A;
        }
        
        .crypto-info {
          display: flex;
          align-items: center;
          flex: 1;
        }
        
        .crypto-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 12px;
          font-size: 18px;
          overflow: hidden;
        }
        
        .crypto-name {
          font-weight: bold;
          margin-bottom: 4px;
          font-size: 14px;
        }
        
        .crypto-volume {
          font-size: 12px;
          color: #AAAAAA;
        }
        
        .price-info {
          text-align: right;
          margin-right: 15px;
          flex: 1;
        }
        
        .price {
          font-weight: bold;
          margin-bottom: 4px;
          font-size: 14px;
        }
        
        .change {
          font-size: 12px;
        }
        
        .change.positive {
          color: #00C076;
        }
        
        .change.negative {
          color: #FF6838;
        }
        
        .no-results {
          text-align: center;
          padding: 40px 0;
          color: #777;
        }
        
        .remove_blue {
          text-decoration: none;
          color: inherit;
        }
      `})]})]})};export{L as default};
