import{j as e,L as c,u as m,n as A,r,p as B}from"./index-cc5f2096.js";import{p as h}from"./productListSelectors-c3bab8d1.js";import{u as z}from"./useDispatch-85fc5622.js";function D(l){const{topic:d,loading:v}=l;return e.jsxs("div",{className:"crypto-news-container",style:{maxWidth:"400px"},children:[e.jsxs("div",{className:"news-section-header",children:[e.jsx("div",{className:"news-sections-title",children:"Crypto News"}),e.jsx(c,{to:"/news",className:"news-see-all remove_blue",children:"See All →"})]}),d==null?void 0:d.map((a,f)=>{var t,p;return e.jsxs("div",{className:"news-item-card",children:[e.jsx("div",{children:e.jsx("img",{src:a==null?void 0:a.cover,className:"news-image-placeholder",loading:"lazy",alt:"News cover"})}),e.jsxs("div",{className:"news-content-wrapper",children:[e.jsx("div",{className:"news-headline",style:{display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden",textOverflow:"ellipsis"},children:(t=a==null?void 0:a.meta)==null?void 0:t.title}),e.jsx("div",{className:"news-summary",style:{display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden",textOverflow:"ellipsis"},children:(p=a==null?void 0:a.meta)==null?void 0:p.subtitle})]})]},f)})]})}function C(){const l=m(A.selectCount);return e.jsxs("div",{className:"app-header",children:[e.jsxs("div",{className:"header-content",children:[e.jsx("div",{className:"header-left",children:e.jsx("div",{className:"logo-section",children:e.jsx("img",{src:"/icons/nexus.png",alt:"",style:{height:35}})})}),e.jsxs("div",{className:"header-right",children:[e.jsx(c,{to:"/notification",children:e.jsx("div",{className:"notification-containers",children:e.jsxs("button",{className:"notification-btn","aria-label":"Notifications",children:[e.jsx("i",{className:"fas fa-bell"}),l>0&&e.jsx("span",{className:"notification-badge",children:l})]})})}),e.jsx(c,{to:"/profile",className:"profile-btn","aria-label":"Profile",children:e.jsx("div",{className:"profile-avatars",children:e.jsx("i",{className:"fas fa-user"})})})]})]}),e.jsx("style",{children:`
      
 
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
          `})]})}function P(){const l=z();r.useState(""),r.useState([]),m(h.selectRows),m(h.selectLoading),r.useState();const d=m(h.selectNews),v=m(h.selectloadingNews),[a,f]=r.useState({}),t=r.useRef(null),[p,w]=r.useState(0),g=["/images/1.png","/images/2.png","/images/3.png"];r.useEffect(()=>{const i={id:1,page:1,size:5};l(B.doFindNews(i))},[]),r.useEffect(()=>{const i=setInterval(()=>{w(s=>(s+1)%g.length)},5e3);return()=>clearInterval(i)},[g.length]),r.useEffect(()=>{const s=["BTCUSDT","ETHUSDT","BNBUSDT","SOLUSDT"].map(o=>`${o.toLowerCase()}@ticker`).join("/");return t.current=new WebSocket(`wss://stream.binance.com:9443/stream?streams=${s}`),t.current.onopen=()=>{},t.current.onmessage=o=>{try{const n=JSON.parse(o.data).data;if(n&&n.s){const u=n.s,y=!n.P.startsWith("-"),k=Math.abs(Number(n.P)).toFixed(2),x=Number(n.v);let b=x.toFixed(0);x>=1e9?b=(x/1e9).toFixed(1)+"B":x>=1e6&&(b=(x/1e6).toFixed(1)+"M"),f(S=>({...S,[u]:{symbol:u,name:`${u.replace("USDT","")}/USDT`,price:Number(n.c).toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:Number(n.c)<1?6:4}),change:n.p,changePercent:k,volume:n.v,volumeFormatted:b,isPositive:y}}))}}catch(F){console.error("Error parsing WebSocket message:",F)}},t.current.onerror=o=>{console.error("Home WebSocket error:",o)},t.current.onclose=()=>{setTimeout(()=>{t.current},5e3)},()=>{t.current&&t.current.readyState===WebSocket.OPEN&&t.current.close()}},[]),r.useState("/security-tips");const N=[{path:"/security-tips",icon:"fas fa-shield-alt",name:"Security "},{path:"/faq-center",icon:"fas fa-question-circle",name:"FAQ Center"},{icon:"fas fa-gift",path:"/invitation",name:"Invitation"},{path:"/stacking",icon:"fas fa-coins ",name:"Staking"}],j=[{symbol:"BTCUSDT",icon:"fab fa-btc",color:"#000",bgColor:"#F3BA2F"},{symbol:"ETHUSDT",icon:"fab fa-ethereum",color:"#fff",bgColor:"#627EEA"},{symbol:"BNBUSDT",icon:"fas fa-coins",color:"#000",bgColor:"#F3BA2F"},{symbol:"SOLUSDT",icon:"fas fa-sun",color:"#000",bgColor:"#00FFA3"}];return e.jsxs("div",{className:"container",children:[e.jsx(C,{}),e.jsx("div",{className:"slider-container",children:e.jsxs("div",{className:"slider",children:[e.jsx("div",{className:"slides-container",style:{transform:`translateX(-${p*100}%)`},children:g.map((i,s)=>e.jsx("div",{className:"slide",children:e.jsx("img",{src:i,alt:`Slide ${s+1}`})},s))}),e.jsx("div",{className:"slider-indicators",children:g.map((i,s)=>e.jsx("div",{className:`slider-indicator ${s===p?"active":""}`},s))})]})}),e.jsxs("div",{className:"quick-access",children:[e.jsxs("div",{className:"section-header",children:[e.jsx("h2",{className:"section-title",children:"Quick Access"}),e.jsxs(c,{to:"/deposit",className:"deposit-header-button remove_blue",children:[e.jsx("div",{className:"deposit-header-icon",children:e.jsx("i",{className:"fas fa-wallet"})}),e.jsx("span",{className:"deposit-header-text",children:"Deposit"})]})]}),e.jsx("div",{className:"access-grid",children:N.map(i=>e.jsxs(c,{to:i.path,className:"access-card remove_blue",children:[e.jsx("div",{className:"access-icon",children:e.jsx("i",{className:i.icon})}),e.jsx("span",{className:"access-text",children:i.name})]},i.path))})]}),e.jsxs("div",{className:"favorites-header",children:[e.jsx("div",{className:"favorites-title",children:"Popular Cryptocurrencies"}),e.jsx(c,{to:"/market",className:"see-all remove_blue",children:"See all →"})]}),e.jsx("div",{className:"market-list",style:{padding:"0 15px"},children:j.map(i=>{const s=a[i.symbol],o=i.symbol.replace("USDT","/USDT");return e.jsxs(c,{to:`/market/detail/${i.symbol}`,className:"market-item remove_blue",children:[e.jsxs("div",{className:"crypto-info",children:[e.jsx("div",{className:"crypto-icon",style:{backgroundColor:i.bgColor},children:e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${o==null?void 0:o.split("/")[0]}.png`,className:i.icon,style:{width:40}})}),e.jsxs("div",{children:[e.jsx("div",{className:"crypto-name",children:o}),e.jsxs("div",{className:"crypto-volume",children:["Vol: ",s?s.volumeFormatted:"Loading..."]})]})]}),e.jsxs("div",{className:"price-info",children:[e.jsx("div",{className:"price",children:s?`$${s.price}`:"Loading..."}),e.jsx("div",{className:`change ${s?s.isPositive?"positive":"negative":""}`,children:s?`${s.isPositive?"+":""}${s.changePercent}%`:"Loading..."})]}),e.jsx("div",{className:"chart",children:e.jsx("i",{className:"fas fa-chart-line",style:{color:s?s.isPositive?"#00C076":"#FF6838":"#AAAAAA"}})})]},i.symbol)})}),e.jsx(D,{topic:d,loading:v}),e.jsx("style",{children:`
          /* Slider Styles */
          .slider-container {
            width: 100%;
            overflow: hidden;
            position: relative;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          }
          
          .slider {
            position: relative;
            width: 100%;
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
            // height: 100%;
            object-fit: contain;
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

          /* Quick Access Styles */
          .quick-access {
            margin: 0px 0px 20px;
            // padding: 0 15px;
          }

          .section-header {
            margin-bottom: 15px;
          }

          .section-title {
            font-size: 18px;
            font-weight: bold;
            color: #FFFFFF;
          }

          .access-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
            padding: 0 15px;
          }

          .access-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #1A1A1A;
            border-radius: 10px;
            padding: 15px 8px;
            transition: transform 0.2s;
            text-align: center;
          }

          .access-card:hover {
            transform: translateY(-3px);
          }

          .access-icon {
            font-size: 24px;
            color: #F3BA2F;
            margin-bottom: 8px;
          }

          .access-text {
            font-size: 12px;
            font-weight: 500;
            color: #FFFFFF;
            line-height: 1.3;
          }

          @media (max-width: 480px) {
            .slider {
              // height: 180px;
            }
            
            .access-grid {
              grid-template-columns: repeat(4, 1fr);
              gap: 12px;
            }

            .access-card {
              padding: 12px 6px;
            }

            .access-icon {
              font-size: 22px;
              margin-bottom: 6px;
            }

            .access-text {
              font-size: 11px;
            }
          }

          .deposit-header-button {
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #F3BA2F, #FF9800);
  border-radius: 8px;
  padding: 8px 16px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(243, 186, 47, 0.3);
  text-decoration: none;
}

.deposit-header-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(243, 186, 47, 0.4);
  background: linear-gradient(135deg, #FF9800, #F3BA2F);
}

.deposit-header-icon {
  font-size: 14px;
  color: #FFFFFF;
  margin-right: 6px;
}

.deposit-header-text {
  font-size: 14px;
  font-weight: 600;
  color: #FFFFFF;
}

/* Responsive Design */
@media (max-width: 768px) {
  .section-header {
    padding: 0 15px;
  }
  
  .section-title {
    font-size: 16px;
  }
  
  .deposit-header-button {
    padding: 6px 12px;
  }
  
  .deposit-header-icon {
    font-size: 12px;
    margin-right: 4px;
  }
  
  .deposit-header-text {
    font-size: 12px;
  }
  
  .access-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }

}


          @media (max-width: 350px) {
           .access-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }


        `})]})}export{P as default};
