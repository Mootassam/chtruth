import{o as n,q as F,j as e,t as l,H as N}from"./index-49a858b3.js";import{g as y}from"./marketSocket-a8dfa287.js";function A(a){const c=Number(a.c),t=Number(a.v||0);return{symbol:a.s,name:`${a.s.replace("USDT","")}/USDT`,price:c.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:c<1?6:4}),changePercent:String(a.P),volume:parseFloat(a.q||"0"),volumeFormatted:a.vf||(t>=1e9?(t/1e9).toFixed(1)+"B":t>=1e6?(t/1e6).toFixed(1)+"M":t.toFixed(0)),isPositive:!!a.pos}}const S=({isOpen:a,onClose:c,onSelectCoin:t})=>{const[m,x]=n.useState({}),[r,p]=n.useState(""),[h,k]=n.useState("All"),[u,g]=n.useState(!0);n.useEffect(()=>{a&&(g(!0),F.get("/market/tickers").then(({data:o})=>{const i=o.data||[],s={};i.forEach(d=>{s[d.s]=A(d)}),x(s)}).catch(()=>{}).finally(()=>g(!1)))},[a]),n.useEffect(()=>{if(!a)return;const o=y(),i=s=>{x(d=>{const b={...d};return s.forEach(v=>{b[v.s]=A(v)}),b})};return o.on("market:update",i),()=>{o.off("market:update",i)}},[a]);const f=n.useMemo(()=>{let o=Object.values(m);if(!o.length)return[];if(r){const i=r.toLowerCase();o=o.filter(s=>s.symbol.toLowerCase().includes(i)||s.name.toLowerCase().includes(i))}switch(h){case"Gainers":return o.filter(i=>i.isPositive).sort((i,s)=>Number(s.changePercent)-Number(i.changePercent));case"Losers":return o.filter(i=>!i.isPositive).sort((i,s)=>Number(i.changePercent)-Number(s.changePercent));case"Favorites":return o.filter(i=>["BTCUSDT","ETHUSDT","BNBUSDT","SOLUSDT"].includes(i.symbol)).sort((i,s)=>s.volume-i.volume);default:return o.sort((i,s)=>s.volume-i.volume)}},[m,r,h]);if(!a)return null;const j=e.jsxs("div",{className:"modal-overlay",onClick:c,children:[e.jsxs("div",{className:"coin-modal-container",onClick:o=>o.stopPropagation(),children:[e.jsxs("div",{className:"coin-modal-header",children:[e.jsx("div",{className:"coin-modal-title",children:l("components.coinListModal.title")}),e.jsx("button",{className:"close-btn",onClick:c,children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsx("div",{className:"search-section",children:e.jsxs("div",{className:"search-input-container",children:[e.jsx("i",{className:"fas fa-search search-icon"}),e.jsx("input",{type:"text",placeholder:l("components.coinListModal.search.placeholder"),className:"search-input",value:r,onChange:o=>p(o.target.value)}),r&&e.jsx("button",{className:"clear-search",onClick:()=>p(""),children:e.jsx("i",{className:"fas fa-times"})})]})}),u&&e.jsxs("div",{className:"loading-state",children:[e.jsx("i",{className:"fas fa-spinner fa-spin"}),e.jsx("p",{children:l("components.coinListModal.loading")})]}),!u&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"coin-list",children:f.length>0?f.map(o=>e.jsxs("div",{className:"coin-item",onClick:()=>{t(o.symbol),c()},children:[e.jsxs("div",{className:"coin-info",children:[e.jsx("div",{className:"coin-icon",children:e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${o.name.split("/")[0]}.png`,style:{width:40,height:40},alt:o.name.split("/")[0],loading:"lazy",onError:i=>{i.target.style.display="none"}})}),e.jsxs("div",{className:"coin-details",children:[e.jsx("div",{className:"coin-symbol",children:o.symbol}),e.jsx("div",{className:"coin-name",children:o.name})]})]}),e.jsxs("div",{className:"coin-price-info",children:[e.jsxs("div",{className:"coin-price",children:["$",o.price]}),e.jsxs("div",{className:`coin-change ${o.isPositive?"positive":"negative"}`,children:[o.isPositive?"+":"",o.changePercent,"%"]})]})]},o.symbol)):e.jsxs("div",{className:"no-results",children:[e.jsx("i",{className:"fas fa-search"}),e.jsx("p",{children:l("components.coinListModal.noResults")})]})}),e.jsxs("div",{className:"quick-select-section",children:[e.jsx("div",{className:"section-label",children:l("components.coinListModal.popular")}),e.jsx("div",{className:"quick-select-chips",children:["BTC","ETH","BNB","SOL"].map(o=>e.jsx("button",{className:"chip",onClick:()=>p(o),children:o},o))})]})]})]}),e.jsx("style",{children:`
        .modal-overlay { position:fixed; top:0; left:0; right:0; bottom:0; background-color:rgba(0,0,0,0.7); display:flex; justify-content:center; align-items:center; z-index:1000; padding:20px; }
        .coin-modal-container { background-color:#2a2a2a; border-radius:12px; width:100%; max-width:400px; max-height:80vh; box-shadow:0 5px 20px rgba(0,0,0,0.4); overflow:hidden; display:flex; flex-direction:column; }
        .coin-modal-header { background-color:#1a1a1a; padding:15px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #3a3a3a; }
        .coin-modal-title { font-weight:bold; font-size:18px; }
        .close-btn { background:none; border:none; color:#AAAAAA; font-size:20px; cursor:pointer; padding:5px; }
        .close-btn:hover { color:#FFFFFF; }
        .search-section { padding:15px; border-bottom:1px solid #3a3a3a; }
        .search-input-container { position:relative; display:flex; align-items:center; }
        .search-icon { position:absolute; left:12px; color:#AAAAAA; }
        .search-input { width:100%; padding:12px 40px; background-color:#3a3a3a; border:1px solid #4a4a4a; border-radius:8px; color:#FFFFFF; font-size:14px; }
        .search-input:focus { outline:none; border-color:#F3BA2F; }
        .clear-search { position:absolute; right:12px; background:none; border:none; color:#AAAAAA; cursor:pointer; }
        .clear-search:hover { color:#FFFFFF; }
        .loading-state { padding:40px 20px; text-align:center; color:#AAAAAA; }
        .loading-state i { font-size:32px; margin-bottom:10px; }
        .coin-list { flex:1; overflow-y:auto; max-height:40vh; }
        .coin-item { display:flex; justify-content:space-between; align-items:center; padding:12px 15px; cursor:pointer; transition:background-color 0.2s; }
        .coin-item:hover { background-color:#3a3a3a; }
        .coin-info { display:flex; align-items:center; gap:12px; }
        .coin-icon { width:40px; height:40px; border-radius:50%; background-color:#3a3a3a; display:flex; justify-content:center; align-items:center; overflow:hidden; }
        .coin-icon img { width:24px; height:24px; object-fit:contain; }
        .coin-details { display:flex; flex-direction:column; }
        .coin-symbol { font-weight:bold; font-size:16px; }
        .coin-name { font-size:12px; color:#AAAAAA; }
        .coin-price-info { text-align:right; }
        .coin-price { font-weight:bold; font-size:14px; }
        .coin-change { font-size:12px; }
        .coin-change.positive { color:#00C076; }
        .coin-change.negative { color:#FF6838; }
        .no-results { padding:40px 20px; text-align:center; color:#AAAAAA; }
        .no-results i { font-size:32px; margin-bottom:10px; }
        .quick-select-section { padding:15px; border-top:1px solid #3a3a3a; }
        .section-label { font-size:14px; color:#AAAAAA; margin-bottom:10px; }
        .quick-select-chips { display:flex; gap:8px; }
        .chip { padding:8px 16px; background-color:#3a3a3a; border:1px solid #4a4a4a; border-radius:20px; color:#FFFFFF; font-size:14px; cursor:pointer; transition:all 0.2s; }
        .chip:hover { background-color:#4a4a4a; border-color:#F3BA2F; }
      `})]});return N.createPortal(j,document.body)};export{S as C};
