import{j as e,L as m,i as B,u as x,k as C,n as D,o as a,p as s,q as T}from"./index-cce0a49c.js";import{p as b}from"./productListSelectors-5a917a15.js";import{u as z}from"./useNotifications-f3d2090f.js";import{u as E}from"./useDispatch-c7d3eaf0.js";function L(r){const{topic:c,loading:u}=r;return e.jsxs("div",{className:"crypto-news-container",style:{maxWidth:"400px"},children:[e.jsxs("div",{className:"news-section-header",children:[e.jsx("div",{className:"news-sections-title",children:"Crypto News"}),e.jsx(m,{to:"/news",className:"news-see-all remove_blue",children:"See All →"})]}),c==null?void 0:c.map((o,h)=>{var n,p;return e.jsxs("div",{className:"news-item-card",children:[e.jsx("div",{children:e.jsx("img",{src:o==null?void 0:o.cover,className:"news-image-placeholder",loading:"lazy",alt:"News cover"})}),e.jsxs("div",{className:"news-content-wrapper",children:[e.jsx("div",{className:"news-headline",style:{display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden",textOverflow:"ellipsis"},children:(n=o==null?void 0:o.meta)==null?void 0:n.title}),e.jsx("div",{className:"news-summary",style:{display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden",textOverflow:"ellipsis"},children:(p=o==null?void 0:o.meta)==null?void 0:p.subtitle})]})]},h)})]})}const $=`
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
`;function q(){const r=x(C.selectCurrentUser),c=x(D.selectCount),u=a.useMemo(()=>(r==null?void 0:r.id)||null,[r==null?void 0:r.id]);z(u);const o=a.useMemo(()=>c<=0?null:e.jsx("span",{className:"notification-badge",children:c>99?"99+":c}),[c]),h=a.useMemo(()=>e.jsx("div",{className:"logo-section",children:e.jsx("img",{src:"/icons/nexus.png",alt:"App Logo",style:{height:35},loading:"lazy"})}),[]),n=a.useMemo(()=>e.jsx(m,{to:"/notification","aria-label":"Notifications",children:e.jsx("div",{className:"notification-containers",children:e.jsxs("button",{className:"notification-btn",type:"button",children:[e.jsx("i",{className:"fas fa-bell"}),o]})})}),[o]),p=a.useMemo(()=>e.jsx(m,{to:"/profile",className:"profile-btn","aria-label":"Profile",children:e.jsx("div",{className:"profile-avatars",children:e.jsx("i",{className:"fas fa-user"})})}),[]);return e.jsxs("div",{className:"app-header",children:[e.jsxs("div",{className:"header-content",children:[e.jsx("div",{className:"header-left",children:h}),e.jsxs("div",{className:"header-right",children:[n,p]})]}),e.jsx("style",{children:$})]})}const U=B.memo(q);function O(){const r=E();a.useState(""),a.useState([]),x(b.selectRows),x(b.selectLoading),a.useState();const c=x(b.selectNews),u=x(b.selectloadingNews),[o,h]=a.useState({}),n=a.useRef(null),[p,w]=a.useState(0),f=["/images/1.png","/images/2.png","/images/3.png"];s("pages.home.notifications.btcAlert"),s("pages.home.notifications.btcReached"),s("pages.home.notifications.fiveMinAgo"),s("pages.home.notifications.depositSuccess"),s("pages.home.notifications.depositConfirmed"),s("pages.home.notifications.oneHourAgo"),s("pages.home.notifications.securityUpdate"),s("pages.home.notifications.newSecurityFeatures"),s("pages.home.notifications.twoHoursAgo"),s("pages.home.notifications.marketNews"),s("pages.home.notifications.ethUpgrade"),s("pages.home.notifications.fiveHoursAgo"),a.useEffect(()=>{const t={id:1,page:1,size:5};r(T.doFindNews(t))},[]),a.useEffect(()=>{const t=setInterval(()=>{w(i=>(i+1)%f.length)},5e3);return()=>clearInterval(t)},[f.length]),a.useEffect(()=>{const i=["BTCUSDT","ETHUSDT","BNBUSDT","SOLUSDT"].map(l=>`${l.toLowerCase()}@ticker`).join("/");return n.current=new WebSocket(`wss://stream.binance.us:9443/stream?streams=${i}`),n.current.onopen=()=>{},n.current.onmessage=l=>{try{const d=JSON.parse(l.data).data;if(d&&d.s){const v=d.s,S=!d.P.startsWith("-"),k=Math.abs(Number(d.P)).toFixed(2),g=Number(d.v);let N=g.toFixed(0);g>=1e9?N=(g/1e9).toFixed(1)+"B":g>=1e6&&(N=(g/1e6).toFixed(1)+"M"),h(A=>({...A,[v]:{symbol:v,name:`${v.replace("USDT","")}/USDT`,price:Number(d.c).toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:Number(d.c)<1?6:4}),change:d.p,changePercent:k,volume:d.v,volumeFormatted:N,isPositive:S}}))}}catch(j){console.error("Error parsing WebSocket message:",j)}},n.current.onerror=l=>{console.error("Home WebSocket error:",l)},n.current.onclose=()=>{setTimeout(()=>{n.current},5e3)},()=>{n.current&&n.current.readyState===WebSocket.OPEN&&n.current.close()}},[]),a.useState("/security-tips");const y=[{path:"/security-tips",icon:"fas fa-shield-alt",name:s("pages.home.quickAccess.security")},{path:"/faq-center",icon:"fas fa-question-circle",name:s("pages.home.quickAccess.faqCenter")},{icon:"fas fa-gift",path:"/invitation",name:s("pages.home.quickAccess.invitation")},{path:"/stacking",icon:"fas fa-coins ",name:s("pages.home.quickAccess.staking")}],F=[{symbol:"BTCUSDT",icon:"fab fa-btc",color:"#000",bgColor:"#F3BA2F"},{symbol:"ETHUSDT",icon:"fab fa-ethereum",color:"#fff",bgColor:"#627EEA"},{symbol:"BNBUSDT",icon:"fas fa-coins",color:"#000",bgColor:"#F3BA2F"},{symbol:"SOLUSDT",icon:"fas fa-sun",color:"#000",bgColor:"#00FFA3"}];return e.jsxs("div",{className:"container",children:[e.jsx(U,{}),e.jsx("div",{className:"slider-container",children:e.jsxs("div",{className:"slider",children:[e.jsx("div",{className:"slides-container",style:{transform:`translateX(-${p*100}%)`},children:f.map((t,i)=>e.jsx("div",{className:"slide",children:e.jsx("img",{src:t,alt:`Slide ${i+1}`})},i))}),e.jsx("div",{className:"slider-indicators",children:f.map((t,i)=>e.jsx("div",{className:`slider-indicator ${i===p?"active":""}`},i))})]})}),e.jsxs("div",{className:"quick-access",children:[e.jsxs("div",{className:"section-header",children:[e.jsx("h2",{className:"section-title",children:s("pages.home.quickAccess.title")}),e.jsxs(m,{to:"/deposit",className:"deposit-header-button remove_blue",children:[e.jsx("div",{className:"deposit-header-icon",children:e.jsx("i",{className:"fas fa-wallet"})}),e.jsx("span",{className:"deposit-header-text",children:s("pages.home.quickAccess.deposit")})]})]}),e.jsx("div",{className:"access-grid",children:y.map(t=>e.jsxs(m,{to:t.path,className:"access-card remove_blue",children:[e.jsx("div",{className:"access-icon",children:e.jsx("i",{className:t.icon})}),e.jsx("span",{className:"access-text",children:t.name})]},t.path))})]}),e.jsxs("div",{className:"favorites-header",children:[e.jsx("div",{className:"favorites-title",children:s("pages.home.popularCryptos")}),e.jsxs(m,{to:"/market",className:"see-all remove_blue",children:[s("pages.home.seeAll")," →"]})]}),e.jsx("div",{className:"market-list",style:{padding:"0 15px"},children:F.map(t=>{const i=o[t.symbol],l=t.symbol.replace("USDT","/USDT");return e.jsxs(m,{to:`/market/detail/${t.symbol}`,className:"market-item remove_blue",children:[e.jsxs("div",{className:"crypto-info",children:[e.jsx("div",{className:"crypto-icon",style:{backgroundColor:t.bgColor},children:e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${l==null?void 0:l.split("/")[0]}.png`,className:t.icon,style:{width:40}})}),e.jsxs("div",{children:[e.jsx("div",{className:"crypto-name",children:l}),e.jsxs("div",{className:"crypto-volume",children:[s("pages.home.volume"),": ",i?i.volumeFormatted:s("pages.home.loading")]})]})]}),e.jsxs("div",{className:"price-info",children:[e.jsx("div",{className:"price",children:i?`$${i.price}`:s("pages.home.loading")}),e.jsx("div",{className:`change ${i?i.isPositive?"positive":"negative":""}`,children:i?`${i.isPositive?"+":""}${i.changePercent}%`:s("pages.home.loading")})]}),e.jsx("div",{className:"chart",children:e.jsx("i",{className:"fas fa-chart-line",style:{color:i?i.isPositive?"#00C076":"#FF6838":"#AAAAAA"}})})]},t.symbol)})}),e.jsx(L,{topic:c,loading:u}),e.jsx("style",{children:`
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


        `})]})}export{O as default};
