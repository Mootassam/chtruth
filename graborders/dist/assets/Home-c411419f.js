import{j as e,L as x,i as A,u as b,k as B,n as C,o as r,p as z,q as E,t as d}from"./index-49a858b3.js";import{p as y}from"./productListSelectors-e58f0fe2.js";import{u as D}from"./useNotifications-082ed4f5.js";import{g as T}from"./marketSocket-a8dfa287.js";import{u as q}from"./useDispatch-71f7155d.js";import"./index-d9998155.js";function L(t){const{topic:a,loading:f}=t;return e.jsxs("div",{className:"crypto-news-container",style:{maxWidth:"400px"},children:[e.jsxs("div",{className:"news-section-header",children:[e.jsx("div",{className:"news-sections-title",children:"Crypto News"}),e.jsx(x,{to:"/news",className:"news-see-all remove_blue",children:"See All →"})]}),a==null?void 0:a.map((n,h)=>{var p,g;return e.jsxs("div",{className:"news-item-card",children:[e.jsx("div",{children:e.jsx("img",{src:n==null?void 0:n.cover,className:"news-image-placeholder",loading:"lazy",alt:"News cover"})}),e.jsxs("div",{className:"news-content-wrapper",children:[e.jsx("div",{className:"news-headline",style:{display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden",textOverflow:"ellipsis"},children:(p=n==null?void 0:n.meta)==null?void 0:p.title}),e.jsx("div",{className:"news-summary",style:{display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden",textOverflow:"ellipsis"},children:(g=n==null?void 0:n.meta)==null?void 0:g.subtitle})]})]},h)})]})}const O=`
  .app-header {
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
    padding: 10px 0;
    border-bottom: 1px solid #333;
    margin: auto;
    max-width: 400px;
    margin-bottom: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  }
  
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
  }
  
  .header-left {
    display: flex;
    align-items: center;
  }
  
  .logo-section {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .header-right {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  
  /* Notification Styles */
  .notification-containers {
    position: relative;
  }
  
  .notification-btn {
    position: relative;
    background: #333;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #F3BA2F;
  }
  
  .notification-btn:hover {
    background: #444;
    transform: scale(1.1);
  }
  
  .notification-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background: #FF4444;
    color: white;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    font-size: 10px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
  
  /* Profile Button */
  .profile-btn {
    display: flex;
    align-items: center;
    text-decoration: none;
  }
  
  .profile-avatars {
    width: 40px;
    height: 40px;
    background: #333;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #F3BA2F;
    transition: all 0.3s ease;
  }
  
  .profile-avatars:hover {
    background: #444;
    transform: scale(1.1);
  }
`;function _(){const t=b(B.selectCurrentUser),a=b(C.selectCount),f=r.useMemo(()=>(t==null?void 0:t.id)||null,[t==null?void 0:t.id]);D(f);const n=r.useMemo(()=>a<=0?null:e.jsx("span",{className:"notification-badge",children:a>99?"99+":a}),[a]),h=r.useMemo(()=>e.jsx("div",{className:"logo-section",children:e.jsx("img",{src:"/icons/nexus.png",alt:"App Logo",style:{height:35},loading:"lazy"})}),[]),p=r.useMemo(()=>e.jsx(x,{to:"/notification","aria-label":"Notifications",children:e.jsx("div",{className:"notification-containers",children:e.jsxs("button",{className:"notification-btn",type:"button",children:[e.jsx("i",{className:"fas fa-bell"}),n]})})}),[n]),g=r.useMemo(()=>e.jsx(x,{to:"/profile",className:"profile-btn","aria-label":"Profile",children:e.jsx("div",{className:"profile-avatars",children:e.jsx("i",{className:"fas fa-user"})})}),[]);return e.jsxs("div",{className:"app-header",children:[e.jsxs("div",{className:"header-content",children:[e.jsx("div",{className:"header-left",children:h}),e.jsxs("div",{className:"header-right",children:[p,g]})]}),e.jsx("style",{children:O})]})}const P=A.memo(_),w=["BTCUSDT","ETHUSDT","BNBUSDT","SOLUSDT"],v="home:tickers:v1";function $(t){const a=Number(t);return a.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:a<1?6:2})}function I(t){const a=Number(t);return a>=1e9?(a/1e9).toFixed(1)+"B":a>=1e6?(a/1e6).toFixed(1)+"M":a.toFixed(0)}function F(t){return{symbol:t.s,price:$(t.c),changePercent:String(t.P),volumeFormatted:t.vf||I(t.v||"0"),isPositive:!!t.pos}}const j=({w:t="80px",h:a="14px"})=>e.jsx("span",{style:{display:"inline-block",width:t,height:a,borderRadius:4,background:"linear-gradient(90deg,#2A2A2A 25%,#3a3a3a 50%,#2A2A2A 75%)",backgroundSize:"200% 100%",animation:"shimmer 1.4s infinite",verticalAlign:"middle"}});function R(){const t=q(),a=b(y.selectNews),f=b(y.selectloadingNews),[n,h]=r.useState(()=>{try{const i=sessionStorage.getItem(v);if(i)return JSON.parse(i)}catch{}return{}}),[p,g]=r.useState(0),u=["/images/1.png","/images/2.png","/images/3.png"];r.useEffect(()=>{t(z.doFindNews({id:1,page:1,size:5}))},[]),r.useEffect(()=>{const i=setInterval(()=>g(s=>(s+1)%u.length),5e3);return()=>clearInterval(i)},[u.length]),r.useEffect(()=>{E.get("/market/tickers").then(({data:i})=>{const s=i.data||[],c={};if(w.forEach(o=>{const l=s.find(m=>m.s===o);l&&(c[o]=F(l))}),Object.keys(c).length){h(o=>({...o,...c}));try{sessionStorage.setItem(v,JSON.stringify({...n,...c}))}catch{}}}).catch(()=>{})},[]),r.useEffect(()=>{const i=T(),s=c=>{const o={};w.forEach(l=>{const m=c.find(N=>N.s===l);m&&(o[l]=F(m))}),Object.keys(o).length&&h(l=>{const m={...l,...o};try{sessionStorage.setItem(v,JSON.stringify(m))}catch{}return m})};return i.on("market:update",s),()=>{i.off("market:update",s)}},[]);const k=[{path:"/security-tips",icon:"fas fa-shield-alt",name:d("pages.home.quickAccess.security")},{path:"/faq-center",icon:"fas fa-question-circle",name:d("pages.home.quickAccess.faqCenter")},{path:"/invitation",icon:"fas fa-gift",name:d("pages.home.quickAccess.invitation")},{path:"/stacking",icon:"fas fa-coins",name:d("pages.home.quickAccess.staking")}],S=[{symbol:"BTCUSDT",icon:"fab fa-btc",bgColor:"#F3BA2F"},{symbol:"ETHUSDT",icon:"fab fa-ethereum",bgColor:"#627EEA"},{symbol:"BNBUSDT",icon:"fas fa-coins",bgColor:"#F3BA2F"},{symbol:"SOLUSDT",icon:"fas fa-sun",bgColor:"#00FFA3"}];return e.jsxs("div",{className:"container",children:[e.jsx(P,{}),e.jsx("div",{className:"slider-container",children:e.jsxs("div",{className:"slider",children:[e.jsx("div",{className:"slides-container",style:{transform:`translateX(-${p*100}%)`},children:u.map((i,s)=>e.jsx("div",{className:"slide",children:e.jsx("img",{src:i,alt:`Slide ${s+1}`,loading:s===0?"eager":"lazy"})},s))}),e.jsx("div",{className:"slider-indicators",children:u.map((i,s)=>e.jsx("div",{className:`slider-indicator${s===p?" active":""}`},s))})]})}),e.jsxs("div",{className:"quick-access",children:[e.jsxs("div",{className:"section-header",children:[e.jsx("h2",{className:"section-title",children:d("pages.home.quickAccess.title")}),e.jsxs(x,{to:"/deposit",className:"deposit-header-button remove_blue",children:[e.jsx("div",{className:"deposit-header-icon",children:e.jsx("i",{className:"fas fa-wallet"})}),e.jsx("span",{className:"deposit-header-text",children:d("pages.home.quickAccess.deposit")})]})]}),e.jsx("div",{className:"access-grid",children:k.map(i=>e.jsxs(x,{to:i.path,className:"access-card remove_blue",children:[e.jsx("div",{className:"access-icon",children:e.jsx("i",{className:i.icon})}),e.jsx("span",{className:"access-text",children:i.name})]},i.path))})]}),e.jsxs("div",{className:"favorites-header",children:[e.jsx("div",{className:"favorites-title",children:d("pages.home.popularCryptos")}),e.jsxs(x,{to:"/market",className:"see-all remove_blue",children:[d("pages.home.seeAll")," →"]})]}),e.jsx("div",{className:"market-list",style:{padding:"0 15px"},children:S.map(i=>{const s=n[i.symbol],c=i.symbol.replace("USDT","/USDT"),o=c.split("/")[0];return e.jsxs(x,{to:`/market/detail/${i.symbol}`,className:"market-item remove_blue",children:[e.jsxs("div",{className:"crypto-info",children:[e.jsx("div",{className:"crypto-icon",style:{backgroundColor:i.bgColor},children:e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${o}.png`,style:{width:40},alt:o,loading:"lazy",onError:l=>{l.target.style.display="none"}})}),e.jsxs("div",{children:[e.jsx("div",{className:"crypto-name",children:c}),e.jsxs("div",{className:"crypto-volume",children:[d("pages.home.volume"),": ",s?s.volumeFormatted:e.jsx(j,{w:"50px",h:"12px"})]})]})]}),e.jsxs("div",{className:"price-info",children:[e.jsx("div",{className:"price",children:s?`$${s.price}`:e.jsx(j,{w:"70px",h:"16px"})}),e.jsx("div",{className:`change${s?s.isPositive?" positive":" negative":""}`,children:s?`${s.isPositive?"+":""}${s.changePercent}%`:e.jsx(j,{w:"40px",h:"12px"})})]}),e.jsx("div",{className:"chart",children:e.jsx("i",{className:"fas fa-chart-line",style:{color:s?s.isPositive?"#00C076":"#FF6838":"#555"}})})]},i.symbol)})}),e.jsx(L,{topic:a,loading:f}),e.jsx("style",{children:`
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

        .slider-container { width:100%; overflow:hidden; position:relative; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.3); }
        .slider { position:relative; width:100%; overflow:hidden; }
        .slides-container { display:flex; transition:transform 0.5s ease-in-out; height:100%; }
        .slide { min-width:100%; height:100%; }
        .slide img { width:100%; object-fit:contain; border-radius:12px; }
        .slider-indicators { position:absolute; bottom:15px; left:50%; transform:translateX(-50%); display:flex; gap:8px; z-index:10; }
        .slider-indicator { width:8px; height:8px; border-radius:50%; background-color:rgba(255,255,255,0.5); transition:background-color 0.3s ease; }
        .slider-indicator.active { background-color:#F3BA2F; width:20px; border-radius:4px; }

        .quick-access { margin:0px 0px 20px; }
        .section-header { margin-bottom:15px; display:flex; justify-content:space-between; align-items:center; padding:0 15px; }
        .section-title { font-size:18px; font-weight:bold; color:#FFFFFF; }
        .access-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:15px; padding:0 15px; }
        .access-card { display:flex; flex-direction:column; align-items:center; background-color:#1A1A1A; border-radius:10px; padding:15px 8px; transition:transform 0.2s; text-align:center; }
        .access-card:hover { transform:translateY(-3px); }
        .access-icon { font-size:24px; color:#F3BA2F; margin-bottom:8px; }
        .access-text { font-size:12px; font-weight:500; color:#FFFFFF; line-height:1.3; }

        .deposit-header-button { display:flex; align-items:center; background:linear-gradient(135deg,#F3BA2F,#FF9800); border-radius:8px; padding:8px 16px; transition:all 0.3s ease; box-shadow:0 2px 8px rgba(243,186,47,0.3); text-decoration:none; }
        .deposit-header-button:hover { transform:translateY(-2px); box-shadow:0 4px 12px rgba(243,186,47,0.4); background:linear-gradient(135deg,#FF9800,#F3BA2F); }
        .deposit-header-icon { font-size:14px; color:#FFFFFF; margin-right:6px; }
        .deposit-header-text { font-size:14px; font-weight:600; color:#FFFFFF; }

        @media (max-width:768px) {
          .section-title { font-size:16px; }
          .deposit-header-button { padding:6px 12px; }
          .deposit-header-icon { font-size:12px; margin-right:4px; }
          .deposit-header-text { font-size:12px; }
          .access-grid { grid-template-columns:repeat(4,1fr); gap:12px; }
        }
        @media (max-width:480px) {
          .access-grid { grid-template-columns:repeat(4,1fr); gap:12px; }
          .access-card { padding:12px 6px; }
          .access-icon { font-size:22px; margin-bottom:6px; }
          .access-text { font-size:11px; }
        }
        @media (max-width:350px) {
          .access-grid { grid-template-columns:repeat(2,1fr); gap:12px; }
        }
      `})]})}export{R as default};
