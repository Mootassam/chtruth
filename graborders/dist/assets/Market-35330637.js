import{i as n,j as e,k as m,L as P,m as D}from"./index-aca44342.js";const C=()=>{const[g,A]=n.useState({}),[d,y]=n.useState(""),[b,j]=n.useState("All"),[F,f]=n.useState(!0),p=n.useRef(null),u=n.useMemo(()=>["BTCUSDT","ETHUSDT","BNBUSDT","LTCUSDT","SOLUSDT","XRPUSDT","SUIUSDT","DOGEUSDT","SHIBUSDT"],[]);n.useEffect(()=>{(async()=>{try{f(!0);const a=(await D.get("https://api.binance.com/api/v3/ticker/24hr")).data.filter(s=>s.symbol.endsWith("USDT")&&!s.symbol.includes("UP")&&!s.symbol.includes("DOWN")&&!s.symbol.includes("BEAR")&&!s.symbol.includes("BULL"));a.sort((s,l)=>parseFloat(l.quoteVolume)-parseFloat(s.quoteVolume));const r=a.slice(0,200),o={};r.forEach(s=>{const l=s.symbol,c=l.replace("USDT",""),h=!s.priceChangePercent.startsWith("-"),S=Math.abs(Number(s.priceChangePercent)).toFixed(2),x=Number(s.volume);let v=x.toFixed(0);x>=1e9?v=(x/1e9).toFixed(1)+"B":x>=1e6&&(v=(x/1e6).toFixed(1)+"M"),o[l]={symbol:l,name:`${c}/USDT`,price:Number(s.lastPrice).toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:Number(s.lastPrice)<1?6:4}),change:s.priceChange,changePercent:S,volume:s.volume,volumeFormatted:v,isPositive:h,quoteVolume:parseFloat(s.quoteVolume)}}),A(o),f(!1)}catch(i){console.error("Error fetching market data:",i),f(!1)}})()},[]),n.useEffect(()=>(p.current=new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr"),p.current.onmessage=t=>{const i=JSON.parse(t.data);A(a=>{const r={...a};return i.forEach(o=>{if(r[o.s]){const s=!o.P.startsWith("-"),l=Math.abs(Number(o.P)).toFixed(2),c=Number(o.v);let h=c.toFixed(0);c>=1e9?h=(c/1e9).toFixed(1)+"B":c>=1e6&&(h=(c/1e6).toFixed(1)+"M"),r[o.s]={...r[o.s],price:Number(o.c).toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:Number(o.c)<1?6:4}),change:o.p,changePercent:l,volume:o.v,volumeFormatted:h,isPositive:s,quoteVolume:parseFloat(o.q)}}}),r})},p.current.onerror=t=>{console.error("WebSocket error:",t)},()=>{p.current&&p.current.close()}),[]);const N=n.useMemo(()=>{const t=Object.values(g);if(t.length===0)return[];let i=t;if(d){const a=d.toLowerCase();i=i.filter(r=>r.name.toLowerCase().includes(a)||r.symbol.toLowerCase().includes(a))}switch(b){case"Gainers":return i.filter(a=>a.isPositive).sort((a,r)=>Number(r.changePercent)-Number(a.changePercent));case"Losers":return i.filter(a=>!a.isPositive).sort((a,r)=>Number(r.changePercent)-Number(a.changePercent));case"Favorites":return i.filter(a=>u.includes(a.symbol)).sort((a,r)=>u.indexOf(a.symbol)-u.indexOf(r.symbol));default:return i.sort((a,r)=>r.quoteVolume-a.quoteVolume)}},[g,d,b,u]),k=t=>{y(t.target.value)},w=t=>{j(t)};return e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"market-headers",children:[e.jsx("div",{className:"market-page-title",children:m("pages.market.title")}),e.jsxs("div",{className:"search-bar",children:[e.jsx("i",{className:"fas fa-search",style:{color:"#AAAAAA"}}),e.jsx("input",{type:"text",placeholder:m("pages.market.search.placeholder"),value:d,onChange:k}),d&&e.jsx("button",{className:"clear-search",onClick:()=>y(""),"aria-label":m("pages.market.search.clear"),children:"×"})]})]}),e.jsx("div",{className:"market-tabs",children:["All","Gainers","Losers","Favorites"].map(t=>e.jsx("div",{className:`tab ${b===t?"active":""}`,onClick:()=>w(t),children:m(`pages.market.tabs.${t.toLowerCase()}`)},t))}),e.jsx("div",{className:"market-list",children:F&&Object.keys(g).length===0?e.jsx("div",{className:"market-placeholder",children:[...Array(10)].map((t,i)=>e.jsxs("div",{className:"market-item-placeholder",children:[e.jsxs("div",{className:"crypto-info-placeholder",children:[e.jsx("div",{className:"crypto-icon-placeholder shimmer"}),e.jsxs("div",{className:"crypto-details-placeholder",children:[e.jsx("div",{className:"placeholder-line shimmer",style:{width:"60%",height:"16px",marginBottom:"8px"}}),e.jsx("div",{className:"placeholder-line shimmer",style:{width:"40%",height:"12px"}})]})]}),e.jsxs("div",{className:"price-info-placeholder",children:[e.jsx("div",{className:"placeholder-line shimmer",style:{width:"70px",height:"16px",marginBottom:"8px"}}),e.jsx("div",{className:"placeholder-line shimmer",style:{width:"50px",height:"12px"}})]})]},i))}):N.length>0?e.jsx(e.Fragment,{children:N.map(t=>e.jsx(P,{to:`/market/detail/${t.symbol}`,className:"remove_blue",children:e.jsxs("div",{className:"market-item",children:[e.jsxs("div",{className:"crypto-info",children:[e.jsx("div",{className:"crypto-icon",children:e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${t.name.split("/")[0]}.png`,style:{width:40,height:40},alt:t.name.split("/")[0],onError:i=>{i.target.src=`https://via.placeholder.com/40/3a3a3a/ffffff?text=${t.name.split("/")[0].charAt(0)}`}})}),e.jsxs("div",{children:[e.jsx("div",{className:"crypto-name",children:t.name}),e.jsxs("div",{className:"crypto-volume",children:[m("pages.market.volume"),": ",t.volumeFormatted]})]})]}),e.jsxs("div",{className:"price-info",children:[e.jsxs("div",{className:"price",children:["$",t.price]}),e.jsxs("div",{className:`change ${t.isPositive?"positive":"negative"}`,children:[t.isPositive?"+":"",t.changePercent,"%"]})]})]})},t.symbol))}):e.jsxs("div",{className:"no-results",children:[e.jsx("i",{className:"fas fa-search",style:{fontSize:"24px",marginBottom:"10px"}}),e.jsx("div",{children:m("pages.market.noResults")})]})}),e.jsx("style",{children:`
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
      `})]})};export{C as default};
