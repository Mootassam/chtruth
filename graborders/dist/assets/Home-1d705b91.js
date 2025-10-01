import{j as e,L as c,u as x,n as D,r,p as C}from"./index-cda6c8f0.js";import{p as h}from"./productListSelectors-777686af.js";import{u as T}from"./useDispatch-dbff049f.js";function L(l){const{topic:d,loading:v}=l;return e.jsxs("div",{className:"crypto-news-container",style:{maxWidth:"400px"},children:[e.jsxs("div",{className:"news-section-header",children:[e.jsx("div",{className:"news-sections-title",children:"Crypto News"}),e.jsx(c,{to:"/news",className:"news-see-all remove_blue",children:"See All →"})]}),d==null?void 0:d.map((o,u)=>{var s,p;return e.jsxs("div",{className:"news-item-card",children:[e.jsx("div",{children:e.jsx("img",{src:o==null?void 0:o.cover,className:"news-image-placeholder",loading:"lazy",alt:"News cover"})}),e.jsxs("div",{className:"news-content-wrapper",children:[e.jsx("div",{className:"news-headline",style:{display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden",textOverflow:"ellipsis"},children:(s=o==null?void 0:o.meta)==null?void 0:s.title}),e.jsx("div",{className:"news-summary",style:{display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden",textOverflow:"ellipsis"},children:(p=o==null?void 0:o.meta)==null?void 0:p.subtitle})]})]},u)})]})}function $(){const l=x(D.selectCount);return e.jsxs("div",{className:"app-header",children:[e.jsxs("div",{className:"header-content",children:[e.jsx("div",{className:"header-left",children:e.jsx("div",{className:"logo-section",children:e.jsx("img",{src:"/icons/nexus.png",alt:"",style:{height:35}})})}),e.jsxs("div",{className:"header-right",children:[e.jsx(c,{to:"/notification",children:e.jsx("div",{className:"notification-containers",children:e.jsxs("button",{className:"notification-btn","aria-label":"Notifications",children:[e.jsx("i",{className:"fas fa-bell"}),e.jsx("span",{className:"notification-badge",children:l})]})})}),e.jsx(c,{to:"/profile",className:"profile-btn","aria-label":"Profile",children:e.jsx("div",{className:"profile-avatars",children:e.jsx("i",{className:"fas fa-user"})})})]})]}),e.jsx("style",{children:`
      
 
          .app-header {
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            padding: 10px 0;
            border-bottom: 1px solid #333;
            margin : auto;
            max-width:400px;
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
          
          .logo-icon {
            font-size: 24px;
            color: #F3BA2F;
          }
          
          .logo-text {
            font-size: 20px;
            font-weight: bold;
            color: #F3BA2F;
            background: linear-gradient(45deg, #F3BA2F, #FFD700);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
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
          
          /* Notifications Dropdown */
          .notifications-dropdown {
            position: absolute;
            top: 50px;
            right: 0;
            width: 320px;
            background: #1a1a1a;
            border: 1px solid #333;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            z-index: 1000;
            animation: slideDown 0.3s ease;
          }
          
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .notifications-header {
            padding: 15px;
            border-bottom: 1px solid #333;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          
          .notifications-header h3 {
            margin: 0;
            color: #F3BA2F;
            font-size: 16px;
          }
          
          .notifications-count {
            background: #F3BA2F;
            color: #000;
            padding: 2px 8px;
            border-radius: 10px;
            font-size: 12px;
            font-weight: bold;
          }
          
          .notifications-list {
            max-height: 300px;
            overflow-y: auto;
          }
          
          .notification-item {
            padding: 12px 15px;
            border-bottom: 1px solid #222;
            display: flex;
            gap: 10px;
            transition: background 0.3s ease;
          }
          
          .notification-item:hover {
            background: #222;
          }
          
          .notification-item.unread {
            background: rgba(243, 186, 47, 0.1);
          }
          
          .notification-icon {
            color: #F3BA2F;
            font-size: 14px;
            margin-top: 2px;
          }
          
          .notification-content {
            flex: 1;
          }
          
          .notification-title {
            font-weight: bold;
            color: #fff;
            margin-bottom: 4px;
          }
          
          .notification-message {
            color: #ccc;
            font-size: 13px;
            margin-bottom: 4px;
          }
          
          .notification-time {
            color: #888;
            font-size: 11px;
          }
          
          .notifications-footer {
            padding: 10px 15px;
            text-align: center;
            border-top: 1px solid #333;
          }
          
          .view-all-link {
            color: #F3BA2F;
            text-decoration: none;
            font-size: 13px;
            font-weight: bold;
          }
          
          .view-all-link:hover {
            text-decoration: underline;
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
          `})]})}function W(){const l=T();r.useState(""),r.useState([]),x(h.selectRows),x(h.selectLoading),r.useState();const d=x(h.selectNews),v=x(h.selectloadingNews),[o,u]=r.useState({}),s=r.useRef(null),[p,y]=r.useState(0),f=["https://public.bnbstatic.com/image/cms/blog/20210728/b0ac64ca-9452-4ee2-b6fe-6ecbe8eeaddd.png","https://cdn.builtin.com/cdn-cgi/image/f=auto,fit=cover,w=1200,h=635,q=80/sites/www.builtin.com/files/2022-07/cryptocurrency-coins-crypto-trading-platform.png","https://observervoice.com/wp-content/uploads/2025/02/Crypto-Market-Faces-Continued-Slump.jpg.avif"];r.useEffect(()=>{const t={id:1,page:1,size:5};l(C.doFindNews(t))},[]),r.useEffect(()=>{const t=setInterval(()=>{y(i=>(i+1)%f.length)},5e3);return()=>clearInterval(t)},[f.length]),r.useEffect(()=>{const i=["BTCUSDT","ETHUSDT","BNBUSDT","SOLUSDT"].map(a=>`${a.toLowerCase()}@ticker`).join("/");return s.current=new WebSocket(`wss://stream.binance.com:9443/stream?streams=${i}`),s.current.onopen=()=>{console.log("Connected to Binance for top cryptocurrencies")},s.current.onmessage=a=>{try{const n=JSON.parse(a.data).data;if(n&&n.s){const g=n.s,F=!n.P.startsWith("-"),A=Math.abs(Number(n.P)).toFixed(2),m=Number(n.v);let b=m.toFixed(0);m>=1e9?b=(m/1e9).toFixed(1)+"B":m>=1e6&&(b=(m/1e6).toFixed(1)+"M"),u(B=>({...B,[g]:{symbol:g,name:`${g.replace("USDT","")}/USDT`,price:Number(n.c).toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:Number(n.c)<1?6:4}),change:n.p,changePercent:A,volume:n.v,volumeFormatted:b,isPositive:F}}))}}catch(w){console.error("Error parsing WebSocket message:",w)}},s.current.onerror=a=>{console.error("Home WebSocket error:",a)},s.current.onclose=()=>{console.log("Home connection closed"),setTimeout(()=>{s.current},5e3)},()=>{s.current&&s.current.readyState===WebSocket.OPEN&&s.current.close()}},[]);const[j,z]=r.useState("/deposit"),N=[{path:"/p2p",icon:"fas fa-chart-line feature-icon",name:"P2P"},{path:"/invitation",icon:"fas fa-gift feature-icon",name:"Refer Friends"},{path:"/stacking",icon:"fas fa-coins feature-icon",name:"Stacking"},{path:"/securitytips",icon:"fas fa-shield-alt feature-icon",name:" Security Tips"}],k=[{path:"/deposit",icon:"fas fa-wallet",name:"Deposit"},{path:"/withdraw",icon:"fas fa-money-bill-wave",name:"Withdraw"},{path:"/history",icon:"fas fa-history",name:"History"},{path:"/security",icon:"fas fa-shield-alt",name:"Security"},{path:"/support",icon:"fas fa-question-circle",name:"Support"}],S=[{symbol:"BTCUSDT",icon:"fab fa-btc",color:"#000",bgColor:"#F3BA2F"},{symbol:"ETHUSDT",icon:"fab fa-ethereum",color:"#fff",bgColor:"#627EEA"},{symbol:"BNBUSDT",icon:"fas fa-coins",color:"#000",bgColor:"#F3BA2F"},{symbol:"SOLUSDT",icon:"fas fa-sun",color:"#000",bgColor:"#00FFA3"}];return e.jsxs("div",{className:"container",children:[e.jsx($,{}),e.jsx("div",{className:"slider-container",children:e.jsxs("div",{className:"slider",children:[e.jsx("div",{className:"slides-container",style:{transform:`translateX(-${p*100}%)`},children:f.map((t,i)=>e.jsx("div",{className:"slide",children:e.jsx("img",{src:t,alt:`Slide ${i+1}`})},i))}),e.jsx("div",{className:"slider-indicators",children:f.map((t,i)=>e.jsx("div",{className:`slider-indicator ${i===p?"active":""}`},i))})]})}),e.jsx("div",{className:"quick-actions",children:k.map(t=>e.jsxs(c,{to:t.path,className:"action-btn remove_blue",role:"button","aria-label":"Deposit cryptocurrency",children:[e.jsx("div",{className:`action-circle ${j===t.path?"buy":"other"}`,children:e.jsx("i",{className:`${t.icon} action-icon`,"aria-hidden":"true"})}),e.jsx("span",{className:"action-text",children:t.name})]}))}),e.jsx("div",{className:"feature-shortcuts",children:N.map((t,i)=>e.jsxs(c,{to:t.path,className:"feature-btn remove_blue",children:[e.jsx("i",{className:t.icon}),e.jsx("span",{children:t.name})]}))}),e.jsxs("div",{className:"favorites-header",children:[e.jsx("div",{className:"favorites-title",children:"Popular Cryptocurrencies"}),e.jsx(c,{to:"/market",className:"see-all remove_blue",children:"See all →"})]}),e.jsx("div",{className:"market-list",style:{padding:"0 15px"},children:S.map(t=>{const i=o[t.symbol],a=t.symbol.replace("USDT","/USDT");return e.jsxs(c,{to:`/market/detail/${t.symbol}`,className:"market-item remove_blue",children:[e.jsxs("div",{className:"crypto-info",children:[e.jsx("div",{className:"crypto-icon",style:{backgroundColor:t.bgColor},children:e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${a==null?void 0:a.split("/")[0]}.png`,className:t.icon,style:{width:40}})}),e.jsxs("div",{children:[e.jsx("div",{className:"crypto-name",children:a}),e.jsxs("div",{className:"crypto-volume",children:["Vol: ",i?i.volumeFormatted:"Loading..."]})]})]}),e.jsxs("div",{className:"price-info",children:[e.jsx("div",{className:"price",children:i?`$${i.price}`:"Loading..."}),e.jsx("div",{className:`change ${i?i.isPositive?"positive":"negative":""}`,children:i?`${i.isPositive?"+":""}${i.changePercent}%`:"Loading..."})]}),e.jsx("div",{className:"chart",children:e.jsx("i",{className:"fas fa-chart-line",style:{color:i?i.isPositive?"#00C076":"#FF6838":"#AAAAAA"}})})]},t.symbol)})}),e.jsx(L,{topic:d,loading:v}),e.jsx("style",{children:`
      
          /* Slider Styles */
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
            
            .notifications-dropdown {
              width: 280px;
              right: -50px;
            }
            
            .logo-text {
              font-size: 18px;
            }
          }
        `})]})}export{W as default};
