import{j as e,L as p,r as A,u as m,f as B,n as C,h as t,p as D}from"./index-0b797a34.js";import{p as u}from"./productListSelectors-f1de028a.js";import{u as T}from"./useNotifications-0c4531ea.js";import{u as L}from"./useDispatch-4b077ce7.js";function z(n){const{topic:r,loading:g}=n;return e.jsxs("div",{className:"crypto-news-container",style:{maxWidth:"400px"},children:[e.jsxs("div",{className:"news-section-header",children:[e.jsx("div",{className:"news-sections-title",children:"Crypto News"}),e.jsx(p,{to:"/news",className:"news-see-all remove_blue",children:"See All →"})]}),r==null?void 0:r.map((a,x)=>{var o,d;return e.jsxs("div",{className:"news-item-card",children:[e.jsx("div",{children:e.jsx("img",{src:a==null?void 0:a.cover,className:"news-image-placeholder",loading:"lazy",alt:"News cover"})}),e.jsxs("div",{className:"news-content-wrapper",children:[e.jsx("div",{className:"news-headline",style:{display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden",textOverflow:"ellipsis"},children:(o=a==null?void 0:a.meta)==null?void 0:o.title}),e.jsx("div",{className:"news-summary",style:{display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden",textOverflow:"ellipsis"},children:(d=a==null?void 0:a.meta)==null?void 0:d.subtitle})]})]},x)})]})}const E=`
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
`;function $(){const n=m(B.selectCurrentUser),r=m(C.selectCount),g=t.useMemo(()=>(n==null?void 0:n.id)||null,[n==null?void 0:n.id]);T(g);const a=t.useMemo(()=>r<=0?null:e.jsx("span",{className:"notification-badge",children:r>99?"99+":r}),[r]),x=t.useMemo(()=>e.jsx("div",{className:"logo-section",children:e.jsx("img",{src:"/icons/nexus.png",alt:"App Logo",style:{height:35},loading:"lazy"})}),[]),o=t.useMemo(()=>e.jsx(p,{to:"/notification","aria-label":"Notifications",children:e.jsx("div",{className:"notification-containers",children:e.jsxs("button",{className:"notification-btn",type:"button",children:[e.jsx("i",{className:"fas fa-bell"}),a]})})}),[a]),d=t.useMemo(()=>e.jsx(p,{to:"/profile",className:"profile-btn","aria-label":"Profile",children:e.jsx("div",{className:"profile-avatars",children:e.jsx("i",{className:"fas fa-user"})})}),[]);return e.jsxs("div",{className:"app-header",children:[e.jsxs("div",{className:"header-content",children:[e.jsx("div",{className:"header-left",children:x}),e.jsxs("div",{className:"header-right",children:[o,d]})]}),e.jsx("style",{children:E})]})}const P=A.memo($);function M(){const n=L();t.useState(""),t.useState([]),m(u.selectRows),m(u.selectLoading),t.useState();const r=m(u.selectNews),g=m(u.selectloadingNews),[a,x]=t.useState({}),o=t.useRef(null),[d,j]=t.useState(0),f=["/images/1.png","/images/2.png","/images/3.png"];t.useEffect(()=>{const i={id:1,page:1,size:5};n(D.doFindNews(i))},[]),t.useEffect(()=>{const i=setInterval(()=>{j(s=>(s+1)%f.length)},5e3);return()=>clearInterval(i)},[f.length]),t.useEffect(()=>{const s=["BTCUSDT","ETHUSDT","BNBUSDT","SOLUSDT"].map(c=>`${c.toLowerCase()}@ticker`).join("/");return o.current=new WebSocket(`wss://stream.binance.com:9443/stream?streams=${s}`),o.current.onopen=()=>{},o.current.onmessage=c=>{try{const l=JSON.parse(c.data).data;if(l&&l.s){const b=l.s,y=!l.P.startsWith("-"),S=Math.abs(Number(l.P)).toFixed(2),h=Number(l.v);let v=h.toFixed(0);h>=1e9?v=(h/1e9).toFixed(1)+"B":h>=1e6&&(v=(h/1e6).toFixed(1)+"M"),x(k=>({...k,[b]:{symbol:b,name:`${b.replace("USDT","")}/USDT`,price:Number(l.c).toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:Number(l.c)<1?6:4}),change:l.p,changePercent:S,volume:l.v,volumeFormatted:v,isPositive:y}}))}}catch(N){console.error("Error parsing WebSocket message:",N)}},o.current.onerror=c=>{console.error("Home WebSocket error:",c)},o.current.onclose=()=>{setTimeout(()=>{o.current},5e3)},()=>{o.current&&o.current.readyState===WebSocket.OPEN&&o.current.close()}},[]),t.useState("/security-tips");const F=[{path:"/security-tips",icon:"fas fa-shield-alt",name:"Security "},{path:"/faq-center",icon:"fas fa-question-circle",name:"FAQ Center"},{icon:"fas fa-gift",path:"/invitation",name:"Invitation"},{path:"/stacking",icon:"fas fa-coins ",name:"Staking"}],w=[{symbol:"BTCUSDT",icon:"fab fa-btc",color:"#000",bgColor:"#F3BA2F"},{symbol:"ETHUSDT",icon:"fab fa-ethereum",color:"#fff",bgColor:"#627EEA"},{symbol:"BNBUSDT",icon:"fas fa-coins",color:"#000",bgColor:"#F3BA2F"},{symbol:"SOLUSDT",icon:"fas fa-sun",color:"#000",bgColor:"#00FFA3"}];return e.jsxs("div",{className:"container",children:[e.jsx(P,{}),e.jsx("div",{className:"slider-container",children:e.jsxs("div",{className:"slider",children:[e.jsx("div",{className:"slides-container",style:{transform:`translateX(-${d*100}%)`},children:f.map((i,s)=>e.jsx("div",{className:"slide",children:e.jsx("img",{src:i,alt:`Slide ${s+1}`})},s))}),e.jsx("div",{className:"slider-indicators",children:f.map((i,s)=>e.jsx("div",{className:`slider-indicator ${s===d?"active":""}`},s))})]})}),e.jsxs("div",{className:"quick-access",children:[e.jsxs("div",{className:"section-header",children:[e.jsx("h2",{className:"section-title",children:"Quick Access"}),e.jsxs(p,{to:"/deposit",className:"deposit-header-button remove_blue",children:[e.jsx("div",{className:"deposit-header-icon",children:e.jsx("i",{className:"fas fa-wallet"})}),e.jsx("span",{className:"deposit-header-text",children:"Deposit"})]})]}),e.jsx("div",{className:"access-grid",children:F.map(i=>e.jsxs(p,{to:i.path,className:"access-card remove_blue",children:[e.jsx("div",{className:"access-icon",children:e.jsx("i",{className:i.icon})}),e.jsx("span",{className:"access-text",children:i.name})]},i.path))})]}),e.jsxs("div",{className:"favorites-header",children:[e.jsx("div",{className:"favorites-title",children:"Popular Cryptocurrencies"}),e.jsx(p,{to:"/market",className:"see-all remove_blue",children:"See all →"})]}),e.jsx("div",{className:"market-list",style:{padding:"0 15px"},children:w.map(i=>{const s=a[i.symbol],c=i.symbol.replace("USDT","/USDT");return e.jsxs(p,{to:`/market/detail/${i.symbol}`,className:"market-item remove_blue",children:[e.jsxs("div",{className:"crypto-info",children:[e.jsx("div",{className:"crypto-icon",style:{backgroundColor:i.bgColor},children:e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${c==null?void 0:c.split("/")[0]}.png`,className:i.icon,style:{width:40}})}),e.jsxs("div",{children:[e.jsx("div",{className:"crypto-name",children:c}),e.jsxs("div",{className:"crypto-volume",children:["Vol: ",s?s.volumeFormatted:"Loading..."]})]})]}),e.jsxs("div",{className:"price-info",children:[e.jsx("div",{className:"price",children:s?`$${s.price}`:"Loading..."}),e.jsx("div",{className:`change ${s?s.isPositive?"positive":"negative":""}`,children:s?`${s.isPositive?"+":""}${s.changePercent}%`:"Loading..."})]}),e.jsx("div",{className:"chart",children:e.jsx("i",{className:"fas fa-chart-line",style:{color:s?s.isPositive?"#00C076":"#FF6838":"#AAAAAA"}})})]},i.symbol)})}),e.jsx(z,{topic:r,loading:g}),e.jsx("style",{children:`
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


        `})]})}export{M as default};
