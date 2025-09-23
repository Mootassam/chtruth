import{j as e,L as m,r as c,u as h,p as T}from"./index-876fd0ee.js";import{p as u}from"./productListSelectors-2ce8cbcf.js";import{u as A}from"./useDispatch-2e80b338.js";function $(x){const{topic:n,loading:g}=x;return e.jsxs("div",{className:"crypto-news-container",style:{maxWidth:"400px"},children:[e.jsxs("div",{className:"news-section-header",children:[e.jsx("div",{className:"news-sections-title",children:"Crypto News"}),e.jsx(m,{to:"/news",className:"news-see-all remove_blue",children:"See All →"})]}),n==null?void 0:n.map((i,f)=>{var t,l;return e.jsxs("div",{className:"news-item-card",children:[e.jsx("div",{children:e.jsx("img",{src:i==null?void 0:i.cover,className:"news-image-placeholder",loading:"lazy",alt:"News cover"})}),e.jsxs("div",{className:"news-content-wrapper",children:[e.jsx("div",{className:"news-headline",style:{display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden",textOverflow:"ellipsis"},children:(t=i==null?void 0:i.meta)==null?void 0:t.title}),e.jsx("div",{className:"news-summary",style:{display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden",textOverflow:"ellipsis"},children:(l=i==null?void 0:i.meta)==null?void 0:l.subtitle})]})]},f)})]})}function E(){const x=A();c.useState(""),c.useState([]),h(u.selectRows),h(u.selectLoading),c.useState();const n=h(u.selectNews),g=h(u.selectloadingNews),[i,f]=c.useState({}),t=c.useRef(null),[l,w]=c.useState(0),p=["https://public.bnbstatic.com/image/cms/blog/20210728/b0ac64ca-9452-4ee2-b6fe-6ecbe8eeaddd.png","https://cdn.builtin.com/cdn-cgi/image/f=auto,fit=cover,w=1200,h=635,q=80/sites/www.builtin.com/files/2022-07/cryptocurrency-coins-crypto-trading-platform.png","https://observervoice.com/wp-content/uploads/2025/02/Crypto-Market-Faces-Continued-Slump.jpg.avif"];c.useEffect(()=>{const s={id:1,page:1,size:5};x(T.doFindNews(s))},[]),c.useEffect(()=>{const s=setInterval(()=>{w(a=>(a+1)%p.length)},5e3);return()=>clearInterval(s)},[p.length]),c.useEffect(()=>{const a=["BTCUSDT","ETHUSDT","BNBUSDT","SOLUSDT"].map(o=>`${o.toLowerCase()}@ticker`).join("/");return t.current=new WebSocket(`wss://stream.binance.com:9443/stream?streams=${a}`),t.current.onopen=()=>{console.log("Connected to Binance for top cryptocurrencies")},t.current.onmessage=o=>{try{const r=JSON.parse(o.data).data;if(r&&r.s){const v=r.s,F=!r.P.startsWith("-"),C=Math.abs(Number(r.P)).toFixed(2),d=Number(r.v);let b=d.toFixed(0);d>=1e9?b=(d/1e9).toFixed(1)+"B":d>=1e6&&(b=(d/1e6).toFixed(1)+"M"),f(D=>({...D,[v]:{symbol:v,name:`${v.replace("USDT","")}/USDT`,price:Number(r.c).toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:Number(r.c)<1?6:4}),change:r.p,changePercent:C,volume:r.v,volumeFormatted:b,isPositive:F}}))}}catch(N){console.error("Error parsing WebSocket message:",N)}},t.current.onerror=o=>{console.error("Home WebSocket error:",o)},t.current.onclose=()=>{console.log("Home connection closed"),setTimeout(()=>{t.current},5e3)},()=>{t.current&&t.current.readyState===WebSocket.OPEN&&t.current.close()}},[]);const[j,L]=c.useState("/deposit"),y=[{path:"/p2p",icon:"fas fa-chart-line feature-icon",name:"P2P"},{path:"/invitation",icon:"fas fa-gift feature-icon",name:"Refer Friends"},{path:"/stacking",icon:"fas fa-coins feature-icon",name:"Stacking"},{path:"/securitytips",icon:"fas fa-shield-alt feature-icon",name:" Security Tips"}],S=[{path:"/deposit",icon:"fas fa-wallet",name:"Deposit"},{path:"/withdraw",icon:"fas fa-money-bill-wave",name:"Withdraw"},{path:"/history",icon:"fas fa-history",name:"History"},{path:"/security",icon:"fas fa-shield-alt",name:"Security"},{path:"/support",icon:"fas fa-question-circle",name:"Support"}],k=[{symbol:"BTCUSDT",icon:"fab fa-btc",color:"#000",bgColor:"#F3BA2F"},{symbol:"ETHUSDT",icon:"fab fa-ethereum",color:"#fff",bgColor:"#627EEA"},{symbol:"BNBUSDT",icon:"fas fa-coins",color:"#000",bgColor:"#F3BA2F"},{symbol:"SOLUSDT",icon:"fas fa-sun",color:"#000",bgColor:"#00FFA3"}];return e.jsxs("div",{className:"container",children:[e.jsx("div",{className:"mywallet-header",children:e.jsx("div",{className:"header-top"})}),e.jsx("div",{className:"slider-container",children:e.jsxs("div",{className:"slider",children:[e.jsx("div",{className:"slides-container",style:{transform:`translateX(-${l*100}%)`},children:p.map((s,a)=>e.jsx("div",{className:"slide",children:e.jsx("img",{src:s,alt:`Slide ${a+1}`})},a))}),e.jsx("div",{className:"slider-indicators",children:p.map((s,a)=>e.jsx("div",{className:`slider-indicator ${a===l?"active":""}`},a))})]})}),e.jsx("div",{className:"quick-actions",children:S.map(s=>e.jsxs(m,{to:s.path,className:"action-btn remove_blue",role:"button","aria-label":"Deposit cryptocurrency",children:[e.jsx("div",{className:`action-circle ${j===s.path?"buy":"other"}`,children:e.jsx("i",{className:`${s.icon} action-icon`,"aria-hidden":"true"})}),e.jsx("span",{className:"action-text",children:s.name})]}))}),e.jsx("div",{className:"feature-shortcuts",children:y.map((s,a)=>e.jsxs(m,{to:s.path,className:"feature-btn remove_blue",children:[e.jsx("i",{className:s.icon}),e.jsx("span",{children:s.name})]}))}),e.jsxs("div",{className:"favorites-header",children:[e.jsx("div",{className:"favorites-title",children:"Popular Cryptocurrencies"}),e.jsx(m,{to:"/market",className:"see-all remove_blue",children:"See all →"})]}),e.jsx("div",{className:"market-list",style:{padding:"0 15px"},children:k.map(s=>{const a=i[s.symbol],o=s.symbol.replace("USDT","/USDT");return e.jsxs(m,{to:`/market/detail/${s.symbol}`,className:"market-item remove_blue",children:[e.jsxs("div",{className:"crypto-info",children:[e.jsx("div",{className:"crypto-icon",style:{backgroundColor:s.bgColor},children:e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${o==null?void 0:o.split("/")[0]}.png`,className:s.icon,style:{width:40}})}),e.jsxs("div",{children:[e.jsx("div",{className:"crypto-name",children:o}),e.jsxs("div",{className:"crypto-volume",children:["Vol: ",a?a.volumeFormatted:"Loading..."]})]})]}),e.jsxs("div",{className:"price-info",children:[e.jsx("div",{className:"price",children:a?`$${a.price}`:"Loading..."}),e.jsx("div",{className:`change ${a?a.isPositive?"positive":"negative":""}`,children:a?`${a.isPositive?"+":""}${a.changePercent}%`:"Loading..."})]}),e.jsx("div",{className:"chart",children:e.jsx("i",{className:"fas fa-chart-line",style:{color:a?a.isPositive?"#00C076":"#FF6838":"#AAAAAA"}})})]},s.symbol)})}),e.jsx($,{topic:n,loading:g}),e.jsx("style",{children:`
          .slider-container {
            width: 100%;
            margin: 0px 0px 20px 0;
            overflow: hidden;
            position: relative;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          }
          
          .slider {
            position: relative;
            width: 100%;
            height: 200px;
            overflow: hidden;
          }
          
          .slides-container {
            display: flex;
            transition: transform 0.5s ease-in-out;
            height: 100%;
          }
          
          .slide {
            min-width: 100%;
            height: 100%;
          }
          
          .slide img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 12px;
          }
          
          .slider-indicators {
            position: absolute;
            bottom: 15px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 8px;
            z-index: 10;
          }
          
          .slider-indicator {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.5);
            transition: background-color 0.3s ease;
          }
          
          .slider-indicator.active {
            background-color: #F3BA2F;
            width: 20px;
            border-radius: 4px;
          }
          
          @media (max-width: 480px) {
            .slider {
              height: 180px;
            }
          }
        `})]})}export{E as default};
