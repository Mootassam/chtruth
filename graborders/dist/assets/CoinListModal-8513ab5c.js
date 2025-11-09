import{o as c,j as e,p as h,H as L,v as k}from"./index-4cd6ea8b.js";const D=({isOpen:y,onClose:b,onSelectCoin:w})=>{const[v,N]=c.useState({}),[p,d]=c.useState(""),[A,T]=c.useState("All"),[F,g]=c.useState(!0),x=c.useRef(null);c.useEffect(()=>{(async()=>{try{g(!0);const s=(await k.get("https://api.binance.com/api/v3/ticker/24hr")).data.filter(a=>a.symbol.endsWith("USDT")&&!a.symbol.includes("UP")&&!a.symbol.includes("DOWN")&&!a.symbol.includes("BEAR")&&!a.symbol.includes("BULL"));s.sort((a,r)=>parseFloat(r.quoteVolume)-parseFloat(a.quoteVolume));const i=s.slice(0,100),t={};i.forEach(a=>{const r=a.symbol,l=r.replace("USDT",""),m=!a.priceChangePercent.startsWith("-"),P=Math.abs(Number(a.priceChangePercent)).toFixed(2),u=Number(a.volume);let f=u.toFixed(0);u>=1e9?f=(u/1e9).toFixed(1)+"B":u>=1e6&&(f=(u/1e6).toFixed(1)+"M"),t[r]={symbol:r,name:`${l}/USDT`,price:Number(a.lastPrice).toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:Number(a.lastPrice)<1?6:4}),change:a.priceChange,changePercent:P,volume:a.volume,volumeFormatted:f,isPositive:m}}),N(t),g(!1)}catch{g(!1)}})()},[]),c.useEffect(()=>(x.current=new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr"),x.current.onmessage=o=>{const n=JSON.parse(o.data);N(s=>{const i={...s};return n.forEach(t=>{if(i[t.s]){const a=!t.P.startsWith("-"),r=Math.abs(Number(t.P)).toFixed(2),l=Number(t.v);let m=l.toFixed(0);l>=1e9?m=(l/1e9).toFixed(1)+"B":l>=1e6&&(m=(l/1e6).toFixed(1)+"M"),i[t.s]={...i[t.s],price:Number(t.c).toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:Number(t.c)<1?6:4}),change:t.p,changePercent:r,volume:t.v,volumeFormatted:m,isPositive:a}}}),i})},()=>{x.current&&x.current.close()}),[]);const j=c.useMemo(()=>{const o=Object.values(v);if(o.length===0)return[];let n=o;if(p){const s=p.toLowerCase();n=n.filter(i=>i.name.toLowerCase().includes(s)||i.symbol.toLowerCase().includes(s))}switch(A){case"Gainers":return n.filter(s=>s.isPositive).sort((s,i)=>Number(i.changePercent)-Number(s.changePercent));case"Losers":return n.filter(s=>!s.isPositive).sort((s,i)=>Number(s.changePercent)-Number(i.changePercent));case"Favorites":return n.filter(s=>["BTCUSDT","ETHUSDT","BNBUSDT"].includes(s.symbol)).sort((s,i)=>Number(i.volume)-Number(s.volume));default:return n.sort((s,i)=>Number(i.volume)-Number(s.volume))}},[v,p,A]),C=o=>{w(o.symbol),b()};if(!y)return null;const S=e.jsxs("div",{className:"modal-overlay",onClick:b,children:[e.jsxs("div",{className:"coin-modal-container",onClick:o=>o.stopPropagation(),children:[e.jsxs("div",{className:"coin-modal-header",children:[e.jsx("div",{className:"coin-modal-title",children:h("components.coinListModal.title")}),e.jsx("button",{className:"close-btn",onClick:b,children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsx("div",{className:"search-section",children:e.jsxs("div",{className:"search-input-container",children:[e.jsx("i",{className:"fas fa-search search-icon"}),e.jsx("input",{type:"text",placeholder:h("components.coinListModal.search.placeholder"),className:"search-input",value:p,onChange:o=>d(o.target.value)}),p&&e.jsx("button",{className:"clear-search",onClick:()=>d(""),children:e.jsx("i",{className:"fas fa-times"})})]})}),F&&e.jsxs("div",{className:"loading-state",children:[e.jsx("i",{className:"fas fa-spinner fa-spin"}),e.jsx("p",{children:h("components.coinListModal.loading")})]}),!F&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"coin-list",children:j.length>0?j.map(o=>e.jsxs("div",{className:"coin-item",onClick:()=>C(o),children:[e.jsxs("div",{className:"coin-info",children:[e.jsxs("div",{className:`coin-icon ${o.name.toLowerCase()}`,children:[e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${o.name.split("/")[0]}.png`,style:{width:40,height:40},alt:o.name.split("/")[0],onError:n=>{n.target.src=`https://via.placeholder.com/40/3a3a3a/ffffff?text=${o.name.split("/")[0].charAt(0)}`}}),e.jsx("i",{className:"fas fa-coins",style:{display:"none"}})]}),e.jsxs("div",{className:"coin-details",children:[e.jsx("div",{className:"coin-symbol",children:o.symbol}),e.jsx("div",{className:"coin-name",children:o.name})]})]}),e.jsxs("div",{className:"coin-price-info",children:[e.jsxs("div",{className:"coin-price",children:["$",o.price]}),e.jsx("div",{className:`coin-change ${o.isPositive?"positive":"negative"}`,children:o.change})]})]},o.symbol)):e.jsxs("div",{className:"no-results",children:[e.jsx("i",{className:"fas fa-search"}),e.jsx("p",{children:h("components.coinListModal.noResults")})]})}),e.jsxs("div",{className:"quick-select-section",children:[e.jsx("div",{className:"section-label",children:h("components.coinListModal.popular")}),e.jsxs("div",{className:"quick-select-chips",children:[e.jsx("button",{className:"chip",onClick:()=>d("BTC"),children:"BTC"}),e.jsx("button",{className:"chip",onClick:()=>d("ETH"),children:"ETH"}),e.jsx("button",{className:"chip",onClick:()=>d("BNB"),children:"BNB"}),e.jsx("button",{className:"chip",onClick:()=>d("SOL"),children:"SOL"})]})]})]})]}),e.jsx("style",{children:`
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
      `})]});return L.createPortal(S,document.body)};export{D as C};
