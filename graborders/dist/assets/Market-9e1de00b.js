import{o as i,q as A,j as e,t as d,i as N,L as w}from"./index-42103d30.js";import{g as S}from"./marketSocket-c2299464.js";import"./index-d9998155.js";const g=new Set(["BTCUSDT","ETHUSDT","BNBUSDT","LTCUSDT","SOLUSDT","XRPUSDT","SUIUSDT","DOGEUSDT","SHIBUSDT"]),C=()=>{const[s,o]=i.useState(new Map),[p,c]=i.useState(!0),[l,f]=i.useState(""),[h,v]=i.useState("All"),x=i.useRef(new Map),n=i.useRef(null);i.useEffect(()=>{A.get("/market/tickers").then(({data:r})=>{const t=r.data||[];t.length!==0&&(o(new Map(t.map(a=>[a.s,a]))),c(!1))}).catch(()=>c(!1))},[]),i.useEffect(()=>{const r=S(),t=a=>{a.forEach(m=>x.current.set(m.s,m)),n.current||(n.current=setTimeout(()=>{n.current=null,o(m=>{const b=new Map(m);return x.current.forEach((j,y)=>b.set(y,j)),x.current.clear(),b}),c(!1)},1e3))};return r.on("market:update",t),()=>{r.off("market:update",t),n.current&&(clearTimeout(n.current),n.current=null)}},[]);const u=i.useMemo(()=>{let r=Array.from(s.values());if(l){const t=l.toLowerCase();r=r.filter(a=>a.n.toLowerCase().includes(t)||a.s.toLowerCase().includes(t))}switch(h){case"Gainers":return r.filter(t=>t.pos).sort((t,a)=>parseFloat(a.P)-parseFloat(t.P));case"Losers":return r.filter(t=>!t.pos).sort((t,a)=>parseFloat(a.P)-parseFloat(t.P));case"Favorites":return r.filter(t=>g.has(t.s)).sort((t,a)=>[...g].indexOf(t.s)-[...g].indexOf(a.s));default:return r.sort((t,a)=>a.q-t.q)}},[s,l,h]),k=i.useCallback(r=>{f(r.target.value)},[]);return e.jsxs("div",{className:"market-container",children:[e.jsxs("div",{className:"market-headers",children:[e.jsx("div",{className:"market-page-title",children:d("pages.market.title")}),e.jsxs("div",{className:"search-bar",children:[e.jsx("i",{className:"fas fa-search",style:{color:"#AAAAAA"}}),e.jsx("input",{type:"text",placeholder:d("pages.market.search.placeholder"),value:l,onChange:k}),l&&e.jsx("button",{className:"clear-search",onClick:()=>f(""),"aria-label":"clear",children:"×"})]})]}),e.jsx("div",{className:"market-tabs",children:["All","Gainers","Losers","Favorites"].map(r=>e.jsx("div",{className:`tab ${h===r?"active":""}`,onClick:()=>v(r),children:d(`pages.market.tabs.${r.toLowerCase()}`)},r))}),e.jsx("div",{className:"market-list",children:p?e.jsx("div",{className:"market-placeholder",children:Array.from({length:10}).map((r,t)=>e.jsxs("div",{className:"market-item-placeholder",children:[e.jsxs("div",{className:"crypto-info-placeholder",children:[e.jsx("div",{className:"crypto-icon-placeholder shimmer"}),e.jsxs("div",{className:"crypto-details-placeholder",children:[e.jsx("div",{className:"placeholder-line shimmer",style:{width:"60%",height:16,marginBottom:8}}),e.jsx("div",{className:"placeholder-line shimmer",style:{width:"40%",height:12}})]})]}),e.jsxs("div",{className:"price-info-placeholder",children:[e.jsx("div",{className:"placeholder-line shimmer",style:{width:70,height:16,marginBottom:8}}),e.jsx("div",{className:"placeholder-line shimmer",style:{width:50,height:12}})]})]},t))}):u.length>0?u.map(r=>e.jsx(T,{ticker:r},r.s)):e.jsxs("div",{className:"no-results",children:[e.jsx("i",{className:"fas fa-search",style:{fontSize:24,marginBottom:10}}),e.jsx("div",{children:d("pages.market.noResults")})]})}),e.jsx("style",{children:`
        @keyframes shimmer {
          0%   { background-position: -468px 0; }
          100% { background-position:  468px 0; }
        }
        .shimmer {
          animation: shimmer 1.5s infinite linear;
          background: linear-gradient(to right, #2A2A2A 8%, #333 18%, #2A2A2A 33%);
          background-size: 800px 104px;
          border-radius: 4px;
        }
        .market-container { max-width:400px; margin:0 auto; padding:20px 15px; background:#000; color:#fff; min-height:100vh; }
        .market-headers { margin-bottom:20px; }
        .market-page-title { font-size:24px; font-weight:bold; margin-bottom:15px; }
        .search-bar { display:flex; align-items:center; background:#1A1A1A; border-radius:8px; padding:10px 15px; position:relative; }
        .search-bar i { margin-right:10px; }
        .search-bar input { background:none; border:none; color:#fff; width:100%; outline:none; }
        .clear-search { background:none; border:none; color:#aaa; font-size:18px; cursor:pointer; position:absolute; right:10px; }
        .market-tabs { display:flex; justify-content:space-between; margin-bottom:20px; border-bottom:1px solid #2A2A2A; }
        .tab { padding:10px 0; cursor:pointer; color:#aaa; position:relative; font-size:14px; }
        .tab.active { color:#fff; font-weight:bold; }
        .tab.active::after { content:''; position:absolute; bottom:-1px; left:0; right:0; height:2px; background:#F3BA2F; }
        .market-list { overflow-y:auto; margin-bottom:40px; }
        .market-item { display:flex; justify-content:space-between; align-items:center; padding:15px 0; border-bottom:1px solid #2A2A2A; }
        .crypto-info { display:flex; align-items:center; flex:1; }
        .crypto-icon { width:40px; height:40px; border-radius:50%; display:flex; justify-content:center; align-items:center; margin-right:12px; overflow:hidden; background:#1A1A1A; }
        .crypto-name { font-weight:bold; margin-bottom:4px; font-size:14px; }
        .crypto-volume { font-size:12px; color:#aaa; }
        .price-info { text-align:right; margin-right:15px; flex:1; }
        .price { font-weight:bold; margin-bottom:4px; font-size:14px; }
        .change { font-size:12px; }
        .change.positive { color:#00C076; }
        .change.negative { color:#FF6838; }
        .market-item-placeholder { display:flex; justify-content:space-between; align-items:center; padding:15px 0; border-bottom:1px solid #2A2A2A; }
        .crypto-info-placeholder { display:flex; align-items:center; flex:1; }
        .crypto-icon-placeholder { width:40px; height:40px; border-radius:50%; margin-right:12px; flex-shrink:0; }
        .crypto-details-placeholder { flex:1; }
        .price-info-placeholder { text-align:right; margin-right:15px; }
        .placeholder-line { border-radius:4px; margin-bottom:8px; }
        .no-results { text-align:center; padding:40px 0; color:#777; }
        .remove_blue { text-decoration:none; color:inherit; }
      `})]})},T=N.memo(({ticker:s})=>{const o=s.n.split("/")[0],p=Number(s.c).toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:Number(s.c)<1?6:4});return e.jsx(w,{to:`/market/detail/${s.s}`,className:"remove_blue",children:e.jsxs("div",{className:"market-item",children:[e.jsxs("div",{className:"crypto-info",children:[e.jsx("div",{className:"crypto-icon",children:e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${o}.png`,width:40,height:40,alt:o,onError:c=>{c.target.src=`https://via.placeholder.com/40/3a3a3a/ffffff?text=${o.charAt(0)}`}})}),e.jsxs("div",{children:[e.jsx("div",{className:"crypto-name",children:s.n}),e.jsxs("div",{className:"crypto-volume",children:[d("pages.market.volume"),": ",s.vf]})]})]}),e.jsxs("div",{className:"price-info",children:[e.jsxs("div",{className:"price",children:["$",p]}),e.jsxs("div",{className:`change ${s.pos?"positive":"negative"}`,children:[s.pos?"+":"",s.P,"%"]})]})]})})});export{C as default};
