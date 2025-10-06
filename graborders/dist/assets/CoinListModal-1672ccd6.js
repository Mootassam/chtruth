import{r as c,j as e,R as P,f as k}from"./index-731b80eb.js";const B=({isOpen:y,onClose:x,onSelectCoin:j})=>{const[f,v]=c.useState({}),[p,d]=c.useState(""),[N,L]=c.useState("All"),[A,b]=c.useState(!0),h=c.useRef(null);c.useEffect(()=>{(async()=>{try{b(!0);const o=(await k.get("https://api.binance.com/api/v3/ticker/24hr")).data.filter(a=>a.symbol.endsWith("USDT")&&!a.symbol.includes("UP")&&!a.symbol.includes("DOWN")&&!a.symbol.includes("BEAR")&&!a.symbol.includes("BULL"));o.sort((a,r)=>parseFloat(r.quoteVolume)-parseFloat(a.quoteVolume));const t=o.slice(0,100),i={};t.forEach(a=>{const r=a.symbol,l=r.replace("USDT",""),m=!a.priceChangePercent.startsWith("-"),S=Math.abs(Number(a.priceChangePercent)).toFixed(2),u=Number(a.volume);let g=u.toFixed(0);u>=1e9?g=(u/1e9).toFixed(1)+"B":u>=1e6&&(g=(u/1e6).toFixed(1)+"M"),i[r]={symbol:r,name:`${l}/USDT`,price:Number(a.lastPrice).toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:Number(a.lastPrice)<1?6:4}),change:a.priceChange,changePercent:S,volume:a.volume,volumeFormatted:g,isPositive:m}}),v(i),b(!1)}catch{b(!1)}})()},[]),c.useEffect(()=>(h.current=new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr"),h.current.onmessage=s=>{const n=JSON.parse(s.data);v(o=>{const t={...o};return n.forEach(i=>{if(t[i.s]){const a=!i.P.startsWith("-"),r=Math.abs(Number(i.P)).toFixed(2),l=Number(i.v);let m=l.toFixed(0);l>=1e9?m=(l/1e9).toFixed(1)+"B":l>=1e6&&(m=(l/1e6).toFixed(1)+"M"),t[i.s]={...t[i.s],price:Number(i.c).toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:Number(i.c)<1?6:4}),change:i.p,changePercent:r,volume:i.v,volumeFormatted:m,isPositive:a}}}),t})},()=>{h.current&&h.current.close()}),[]);const F=c.useMemo(()=>{const s=Object.values(f);if(s.length===0)return[];let n=s;if(p){const o=p.toLowerCase();n=n.filter(t=>t.name.toLowerCase().includes(o)||t.symbol.toLowerCase().includes(o))}switch(N){case"Gainers":return n.filter(o=>o.isPositive).sort((o,t)=>Number(t.changePercent)-Number(o.changePercent));case"Losers":return n.filter(o=>!o.isPositive).sort((o,t)=>Number(o.changePercent)-Number(t.changePercent));case"Favorites":return n.filter(o=>["BTCUSDT","ETHUSDT","BNBUSDT"].includes(o.symbol)).sort((o,t)=>Number(t.volume)-Number(o.volume));default:return n.sort((o,t)=>Number(t.volume)-Number(o.volume))}},[f,p,N]),w=s=>{j(s.symbol),x()};if(!y)return null;const C=e.jsxs("div",{className:"modal-overlay",onClick:x,children:[e.jsxs("div",{className:"coin-modal-container",onClick:s=>s.stopPropagation(),children:[e.jsxs("div",{className:"coin-modal-header",children:[e.jsx("div",{className:"coin-modal-title",children:"Select Cryptocurrency"}),e.jsx("button",{className:"close-btn",onClick:x,children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsx("div",{className:"search-section",children:e.jsxs("div",{className:"search-input-container",children:[e.jsx("i",{className:"fas fa-search search-icon"}),e.jsx("input",{type:"text",placeholder:"Search cryptocurrencies...",className:"search-input",value:p,onChange:s=>d(s.target.value)}),p&&e.jsx("button",{className:"clear-search",onClick:()=>d(""),children:e.jsx("i",{className:"fas fa-times"})})]})}),A&&e.jsxs("div",{className:"loading-state",children:[e.jsx("i",{className:"fas fa-spinner fa-spin"}),e.jsx("p",{children:"Loading cryptocurrency data..."})]}),!A&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"coin-list",children:F.length>0?F.map(s=>e.jsxs("div",{className:"coin-item",onClick:()=>w(s),children:[e.jsxs("div",{className:"coin-info",children:[e.jsxs("div",{className:`coin-icon ${s.name.toLowerCase()}`,children:[e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${s.name.split("/")[0]}.png`,style:{width:40,height:40},alt:s.name.split("/")[0],onError:n=>{n.target.src=`https://via.placeholder.com/40/3a3a3a/ffffff?text=${s.name.split("/")[0].charAt(0)}`}}),e.jsx("i",{className:"fas fa-coins",style:{display:"none"}})]}),e.jsxs("div",{className:"coin-details",children:[e.jsx("div",{className:"coin-symbol",children:s.symbol}),e.jsx("div",{className:"coin-name",children:s.name})]})]}),e.jsxs("div",{className:"coin-price-info",children:[e.jsxs("div",{className:"coin-price",children:["$",s.price]}),e.jsx("div",{className:`coin-change ${s.isPositive?"positive":"negative"}`,children:s.change})]})]},s.symbol)):e.jsxs("div",{className:"no-results",children:[e.jsx("i",{className:"fas fa-search"}),e.jsx("p",{children:"No cryptocurrencies found"})]})}),e.jsxs("div",{className:"quick-select-section",children:[e.jsx("div",{className:"section-label",children:"Popular"}),e.jsxs("div",{className:"quick-select-chips",children:[e.jsx("button",{className:"chip",onClick:()=>d("BTC"),children:"BTC"}),e.jsx("button",{className:"chip",onClick:()=>d("ETH"),children:"ETH"}),e.jsx("button",{className:"chip",onClick:()=>d("BNB"),children:"BNB"}),e.jsx("button",{className:"chip",onClick:()=>d("SOL"),children:"SOL"})]})]})]})]}),e.jsx("style",{children:`
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
          padding: 20px;
        }
        
        .coin-modal-container {
          background-color: #2a2a2a;
          border-radius: 12px;
          width: 100%;
          max-width: 400px;
          max-height: 80vh;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        
        /* Header Section */
        .coin-modal-header {
          background-color: #1a1a1a;
          padding: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #3a3a3a;
        }
        
        .coin-modal-title {
          font-weight: bold;
          font-size: 18px;
        }
        
        .close-btn {
          background: none;
          border: none;
          color: #AAAAAA;
          font-size: 20px;
          cursor: pointer;
          padding: 5px;
        }
        
        .close-btn:hover {
          color: #FFFFFF;
        }
        
        /* Search Section */
        .search-section {
          padding: 15px;
          border-bottom: 1px solid #3a3a3a;
        }
        
        .search-input-container {
          position: relative;
          display: flex;
          align-items: center;
        }
        
        .search-icon {
          position: absolute;
          left: 12px;
          color: #AAAAAA;
        }
        
        .search-input {
          width: 100%;
          padding: 12px 40px;
          background-color: #3a3a3a;
          border: 1px solid #4a4a4a;
          border-radius: 8px;
          color: #FFFFFF;
          font-size: 14px;
        }
        
        .search-input:focus {
          outline: none;
          border-color: #F3BA2F;
        }
        
        .clear-search {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          color: #AAAAAA;
          cursor: pointer;
        }
        
        .clear-search:hover {
          color: #FFFFFF;
        }
        
        /* Loading State */
        .loading-state, .error-state {
          padding: 40px 20px;
          text-align: center;
          color: #AAAAAA;
        }
        
        .loading-state i, .error-state i {
          font-size: 32px;
          margin-bottom: 10px;
        }
        
        .error-state button {
          margin-top: 10px;
          padding: 8px 16px;
          background-color: #F3BA2F;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        
        /* Coin List */
        .coin-list {
          flex: 1;
          overflow-y: auto;
          max-height: 40vh;
        }
        
        .coin-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 15px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .coin-item:hover {
          background-color: #3a3a3a;
        }
        
        .coin-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .coin-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #3a3a3a;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 18px;
          overflow: hidden;
        }
        
        .coin-icon img {
          width: 24px;
          height: 24px;
          object-fit: contain;
        }
        
        .coin-details {
          display: flex;
          flex-direction: column;
        }
        
        .coin-symbol {
          font-weight: bold;
          font-size: 16px;
        }
        
        .coin-name {
          font-size: 12px;
          color: #AAAAAA;
        }
        
        .coin-price-info {
          text-align: right;
        }
        
        .coin-price {
          font-weight: bold;
          font-size: 14px;
        }
        
        .coin-change {
          font-size: 12px;
        }
        
        .coin-change.positive {
          color: #00C076;
        }
        
        .coin-change.negative {
          color: #FF6838;
        }
        
        .no-results {
          padding: 40px 20px;
          text-align: center;
          color: #AAAAAA;
        }
        
        .no-results i {
          font-size: 32px;
          margin-bottom: 10px;
        }
        
        /* Quick Select Section */
        .quick-select-section {
          padding: 15px;
          border-top: 1px solid #3a3a3a;
        }
        
        .section-label {
          font-size: 14px;
          color: #AAAAAA;
          margin-bottom: 10px;
        }
        
        .quick-select-chips {
          display: flex;
          gap: 8px;
        }
        
        .chip {
          padding: 8px 16px;
          background-color: #3a3a3a;
          border: 1px solid #4a4a4a;
          border-radius: 20px;
          color: #FFFFFF;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .chip:hover {
          background-color: #4a4a4a;
          border-color: #F3BA2F;
        }
      `})]});return P.createPortal(C,document.body)};export{B as C};
