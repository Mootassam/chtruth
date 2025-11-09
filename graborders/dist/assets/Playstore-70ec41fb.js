import{h as o,N as M,j as a}from"./index-c8bac528.js";function E(){const[c,p]=o.useState(null),[n,h]=o.useState(!1),[f,t]=o.useState(!1),[l,d]=o.useState(!1),[g,r]=o.useState(!1),b=M(),j=[{src:"/playsotre/3.jpg",label:"Advanced Charts"},{src:"/playsotre/1.jpg",label:"Fast Withdrawals"},{src:"/playsotre/2.png",label:"Crypto Staking"},{src:"/playsotre/assets.jpg",label:"Portfolio"},{src:"/playsotre/chat.png",label:"24/7 Support"}],u=e=>{p(e)},x=()=>{p(null)},v=()=>{t(!0)},N=async()=>{d(!0);try{const e="https://nexus-exchange.com/apk/nexus-exchange.apk",s=document.createElement("a");s.href=e,s.download="Nexus-Exchange-v3.4.2.apk",document.body.appendChild(s),s.click(),document.body.removeChild(s),setTimeout(()=>{d(!1),t(!1)},2e3)}catch(e){console.error("Download failed:",e),d(!1)}},w=e=>{e.target.closest(".screenshot")||e.target.closest(".install-button")||e.target.closest(".share-button")||e.target.closest(".back-button")||t(!0)},i={title:"Nexus Exchange - Crypto Trading App",text:"Check out Nexus Exchange - The ultimate trading platform for cryptocurrency and forex markets. Trade Bitcoin, Ethereum, and more with advanced tools!",url:"https://nexus-exchange.com/playstore",apkUrl:"https://nexus-exchange.com/apk/nexus-exchange.apk"},k=()=>{const e=`${i.title}

${i.text}

Download: ${i.url}`,s=encodeURIComponent(e);window.open(`https://wa.me/?text=${s}`,"_blank"),r(!1)},y=()=>{const e=encodeURIComponent(i.url);window.open(`https://www.facebook.com/sharer/sharer.php?u=${e}`,"_blank","width=600,height=400"),r(!1)},z=()=>{const e=`${i.title}
${i.text}
Download: ${i.url}`,s=encodeURIComponent(e);window.open(`sms:?body=${s}`,"_blank"),r(!1)},C=()=>{const e=encodeURIComponent(i.title),s=encodeURIComponent(`${i.text}

Download: ${i.url}`);window.open(`mailto:?subject=${e}&body=${s}`,"_blank"),r(!1)},m=()=>{navigator.clipboard.writeText(i.url).then(()=>{alert("Link copied to clipboard!"),r(!1)}).catch(e=>{console.error("Failed to copy: ",e)})},S=()=>{r(!0)},A=()=>{b.goBack()};return a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"play-store-container",onClick:w,children:[a.jsxs("div",{className:"header",children:[a.jsx("div",{className:"back-button",onClick:A,children:a.jsx("i",{className:"fas fa-arrow-left"})}),a.jsxs("div",{className:"search-bar",children:[a.jsx("i",{className:"fas fa-search"}),a.jsx("input",{type:"text",placeholder:"Search Google Play"})]}),a.jsx("div",{className:"more-options",children:a.jsx("i",{className:"fas fa-ellipsis-v"})})]}),a.jsxs("div",{className:"app-header",children:[a.jsx("img",{src:"/playsotre/nexus.jpg",className:"app-icon",alt:"Nexus Exchange"}),a.jsxs("div",{className:"app-info",children:[a.jsx("h1",{className:"app-title",children:"Nexus Exchange"}),a.jsx("div",{className:"app-developer",children:"SpotTrade Technologies Inc."}),a.jsxs("div",{className:"app-badges",children:[a.jsxs("div",{className:"rating",children:[a.jsxs("div",{className:"stars",children:[a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star-half-alt"})]}),a.jsx("span",{className:"rating-value",children:"4.5"}),a.jsx("span",{className:"rating-count",children:"(1.2M)"})]}),a.jsxs("div",{className:"editor-choice",children:[a.jsx("i",{className:"fas fa-award"})," Editor's Choice"]})]}),a.jsx("div",{className:"downloads",children:"10M+ downloads"}),a.jsx("div",{className:"age-rating",children:"Rated for 3+"}),a.jsxs("div",{className:"actions-buttons",children:[a.jsxs("button",{className:"install-button",onClick:v,children:[a.jsx("i",{className:"fas fa-download"})," Install"]}),a.jsx("button",{className:"wishlist-button",children:a.jsx("i",{className:"far fa-bookmark"})}),a.jsx("button",{className:"share-button",onClick:S,children:a.jsx("i",{className:"fas fa-share-alt"})})]})]})]}),a.jsxs("div",{className:"screenshots",children:[a.jsx("h2",{className:"sections-title",children:"About this app"}),a.jsx("div",{className:"screenshot-container",children:j.map((e,s)=>a.jsxs("div",{className:"screenshot",onClick:()=>u(e.src),children:[a.jsx("img",{src:e.src,alt:e.label}),a.jsx("div",{className:"screenshot-label",children:e.label})]},s))})]}),a.jsxs("div",{className:"app-details",children:[a.jsxs("div",{className:"about-app",children:[a.jsxs("p",{className:`description ${n?"expanded":""}`,children:["Nexus Exchange is the ultimate trading platform for cryptocurrency and forex markets. Trade Bitcoin, Ethereum, Forex pairs and more with advanced charting tools, real-time market data, and secure transactions. Enjoy a seamless trading experience with our intuitive interface designed for both beginners and experts.",n&&a.jsxs(a.Fragment,{children:[a.jsx("br",{}),a.jsx("br",{}),"Features include: • Real-time market data and advanced charts • Secure wallet integration • Multiple payment methods • 24/7 customer support • Advanced order types • Portfolio tracking • Price alerts and notifications"]})]}),a.jsx("div",{className:"read-more",onClick:()=>h(!n),children:n?"Read less":"Read more"})]}),a.jsxs("div",{className:"details-grid",children:[a.jsxs("div",{className:"detail-item",children:[a.jsx("span",{className:"detail-label",children:"Updated"}),a.jsx("span",{className:"detail-value",children:"August 15, 2023"})]}),a.jsxs("div",{className:"detail-item",children:[a.jsx("span",{className:"detail-label",children:"Size"}),a.jsx("span",{className:"detail-value",children:"35 MB"})]}),a.jsxs("div",{className:"detail-item",children:[a.jsx("span",{className:"detail-label",children:"Downloads"}),a.jsx("span",{className:"detail-value",children:"10,000,000+"})]}),a.jsxs("div",{className:"detail-item",children:[a.jsx("span",{className:"detail-label",children:"Current Version"}),a.jsx("span",{className:"detail-value",children:"3.4.2"})]}),a.jsxs("div",{className:"detail-item",children:[a.jsx("span",{className:"detail-label",children:"Requires Android"}),a.jsx("span",{className:"detail-value",children:"8.0 and up"})]}),a.jsxs("div",{className:"detail-item",children:[a.jsx("span",{className:"detail-label",children:"Content Rating"}),a.jsx("span",{className:"detail-value",children:"Rated for 3+"})]})]})]}),a.jsxs("div",{className:"reviews",children:[a.jsx("h2",{className:"sections-title",children:"Ratings and reviews"}),a.jsxs("div",{className:"review-summary",children:[a.jsxs("div",{className:"overall-rating",children:[a.jsx("div",{className:"rating-large",children:"4.5"}),a.jsxs("div",{className:"stars-large",children:[a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star-half-alt"})]}),a.jsx("div",{className:"rating-total",children:"1.2M reviews"})]}),a.jsxs("div",{className:"rating-bars",children:[a.jsxs("div",{className:"rating-bar",children:[a.jsx("span",{className:"bar-label",children:"5"}),a.jsx("div",{className:"bar-container",children:a.jsx("div",{className:"bar-fill",style:{width:"65%"}})}),a.jsx("span",{className:"bar-count",children:"65%"})]}),a.jsxs("div",{className:"rating-bar",children:[a.jsx("span",{className:"bar-label",children:"4"}),a.jsx("div",{className:"bar-container",children:a.jsx("div",{className:"bar-fill",style:{width:"20%"}})}),a.jsx("span",{className:"bar-count",children:"20%"})]}),a.jsxs("div",{className:"rating-bar",children:[a.jsx("span",{className:"bar-label",children:"3"}),a.jsx("div",{className:"bar-container",children:a.jsx("div",{className:"bar-fill",style:{width:"8%"}})}),a.jsx("span",{className:"bar-count",children:"8%"})]}),a.jsxs("div",{className:"rating-bar",children:[a.jsx("span",{className:"bar-label",children:"2"}),a.jsx("div",{className:"bar-container",children:a.jsx("div",{className:"bar-fill",style:{width:"4%"}})}),a.jsx("span",{className:"bar-count",children:"4%"})]}),a.jsxs("div",{className:"rating-bar",children:[a.jsx("span",{className:"bar-label",children:"1"}),a.jsx("div",{className:"bar-container",children:a.jsx("div",{className:"bar-fill",style:{width:"3%"}})}),a.jsx("span",{className:"bar-count",children:"3%"})]})]})]}),a.jsxs("div",{className:"review-list",children:[a.jsxs("div",{className:"review-item",children:[a.jsxs("div",{className:"review-header",children:[a.jsx("div",{className:"reviewer-avatar",children:"J"}),a.jsxs("div",{children:[a.jsx("span",{className:"reviewer-name",children:"James Carter"}),a.jsx("span",{className:"review-date",children:"January 14, 2025"})]})]}),a.jsxs("div",{className:"review-stars",children:[a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star"})]}),a.jsx("p",{className:"review-text",children:"I’ve used several trading apps, but this one is by far the smoothest. The real-time updates are accurate, and the interface is super clean. I made my first successful trades within a week — highly recommend it for both beginners and pros!"})]}),a.jsxs("div",{className:"review-item",children:[a.jsxs("div",{className:"review-header",children:[a.jsx("div",{className:"reviewer-avatar",children:"O"}),a.jsxs("div",{children:[a.jsx("span",{className:"reviewer-name",children:"Olivia Martin"}),a.jsx("span",{className:"review-date",children:"February 3, 2025"})]})]}),a.jsxs("div",{className:"review-stars",children:[a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"far fa-star"})]}),a.jsx("p",{className:"review-text",children:"Great platform! I love how easy it is to analyze charts and execute trades quickly. I just wish there were more color themes for customization. Other than that, it’s perfect!"})]}),a.jsxs("div",{className:"review-item",children:[a.jsxs("div",{className:"review-header",children:[a.jsx("div",{className:"reviewer-avatar",children:"A"}),a.jsxs("div",{children:[a.jsx("span",{className:"reviewer-name",children:"Ahmed Hassan"}),a.jsx("span",{className:"review-date",children:"March 19, 2025"})]})]}),a.jsxs("div",{className:"review-stars",children:[a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star"})]}),a.jsx("p",{className:"review-text",children:"Very reliable trading app. Fast withdrawals, accurate data, and professional design. The live support team is also helpful — they solved my issue in less than 10 minutes."})]}),a.jsxs("div",{className:"review-item",children:[a.jsxs("div",{className:"review-header",children:[a.jsx("div",{className:"reviewer-avatar",children:"S"}),a.jsxs("div",{children:[a.jsx("span",{className:"reviewer-name",children:"Sophia Lee"}),a.jsx("span",{className:"review-date",children:"April 22, 2025"})]})]}),a.jsxs("div",{className:"review-stars",children:[a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star"})]}),a.jsx("p",{className:"review-text",children:"This app made trading so much easier for me. The learning curve is smooth, and the built-in tutorials helped me understand how to read market signals. Definitely a must-have for new traders."})]}),a.jsxs("div",{className:"review-item",children:[a.jsxs("div",{className:"review-header",children:[a.jsx("div",{className:"reviewer-avatar",children:"D"}),a.jsxs("div",{children:[a.jsx("span",{className:"reviewer-name",children:"Daniel Johnson"}),a.jsx("span",{className:"review-date",children:"June 8, 2025"})]})]}),a.jsxs("div",{className:"review-stars",children:[a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star"})]}),a.jsx("p",{className:"review-text",children:"Fast, modern, and trustworthy. I’ve been using it daily for over three months and haven’t faced a single technical issue. The profit tracking and history features are top-notch!"})]}),a.jsxs("div",{className:"review-item",children:[a.jsxs("div",{className:"review-header",children:[a.jsx("div",{className:"reviewer-avatar",children:"L"}),a.jsxs("div",{children:[a.jsx("span",{className:"reviewer-name",children:"Laura Fernandez"}),a.jsx("span",{className:"review-date",children:"August 1, 2025"})]})]}),a.jsxs("div",{className:"review-stars",children:[a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"far fa-star"})]}),a.jsx("p",{className:"review-text",children:"Excellent app for mobile trading! The charts are easy to read, and the notifications keep me updated on market movements. It would be great to add more indicators, but overall it’s fantastic."})]})]})]}),a.jsxs("div",{className:"similar-apps",children:[a.jsx("h2",{className:"sections-title",children:"Similar apps"}),a.jsxs("div",{className:"app-grid",children:[a.jsxs("div",{className:"app-card",children:[a.jsx("div",{className:"app-card-icon",style:{background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)"},children:a.jsx("i",{className:"fas fa-coins"})}),a.jsx("div",{className:"app-card-title",children:"Crypto Trader"}),a.jsx("div",{className:"app-card-developer",children:"CryptoApps Ltd"}),a.jsxs("div",{className:"app-card-rating",children:[a.jsxs("div",{className:"app-card-stars",children:[a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star-half-alt"})]}),a.jsx("span",{children:"4.3"})]})]}),a.jsxs("div",{className:"app-card",children:[a.jsx("div",{className:"app-card-icon",style:{background:"linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"},children:a.jsx("i",{className:"fas fa-chart-bar"})}),a.jsx("div",{className:"app-card-title",children:"Forex Master"}),a.jsx("div",{className:"app-card-developer",children:"Forex Solutions"}),a.jsxs("div",{className:"app-card-rating",children:[a.jsxs("div",{className:"app-card-stars",children:[a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"far fa-star"})]}),a.jsx("span",{children:"4.0"})]})]}),a.jsxs("div",{className:"app-card",children:[a.jsx("div",{className:"app-card-icon",style:{background:"linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"},children:a.jsx("i",{className:"fas fa-wallet"})}),a.jsx("div",{className:"app-card-title",children:"Bitcoin Wallet"}),a.jsx("div",{className:"app-card-developer",children:"Blockchain Tech"}),a.jsxs("div",{className:"app-card-rating",children:[a.jsxs("div",{className:"app-card-stars",children:[a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star"})]}),a.jsx("span",{children:"4.8"})]})]})]})]}),a.jsx("div",{className:"footer",children:a.jsx("p",{children:"Google Play and the Google Play logo are trademarks of Google LLC."})})]}),a.jsxs("div",{className:"nav-bar",children:[a.jsxs("div",{className:"nav-item active",children:[a.jsx("i",{className:"fas fa-home nav-icon"}),a.jsx("span",{children:"Home"})]}),a.jsxs("div",{className:"nav-item",children:[a.jsx("i",{className:"fas fa-gamepad nav-icon"}),a.jsx("span",{children:"Games"})]}),a.jsxs("div",{className:"nav-item",children:[a.jsx("i",{className:"fas fa-film nav-icon"}),a.jsx("span",{children:"Movies"})]}),a.jsxs("div",{className:"nav-item",children:[a.jsx("i",{className:"fas fa-book nav-icon"}),a.jsx("span",{children:"Books"})]})]}),c&&a.jsx("div",{className:"image-modal",onClick:x,children:a.jsxs("div",{className:"modal-content",onClick:e=>e.stopPropagation(),children:[a.jsx("button",{className:"close-button",onClick:x,children:a.jsx("i",{className:"fas fa-times"})}),a.jsx("img",{src:c,alt:"App screenshot"})]})}),f&&a.jsx("div",{className:"download-modal",onClick:()=>t(!1),children:a.jsxs("div",{className:"download-modal-content",onClick:e=>e.stopPropagation(),children:[a.jsxs("div",{className:"download-header",children:[a.jsx("div",{className:"download-app-icon",children:a.jsx("img",{src:"/playsotre/nexus.jpg",alt:"Nexus Exchange"})}),a.jsxs("div",{className:"download-app-info",children:[a.jsx("h3",{children:"Nexus Exchange"}),a.jsx("p",{children:"SpotTrade Technologies Inc."}),a.jsxs("div",{className:"download-rating",children:[a.jsxs("div",{className:"stars",children:[a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star"}),a.jsx("i",{className:"fas fa-star-half-alt"})]}),a.jsx("span",{children:"4.5 • 10M+ downloads"})]})]})]}),a.jsxs("div",{className:"download-details",children:[a.jsxs("div",{className:"download-detail-item",children:[a.jsx("span",{className:"label",children:"Version:"}),a.jsx("span",{className:"value",children:"3.4.2"})]}),a.jsxs("div",{className:"download-detail-item",children:[a.jsx("span",{className:"label",children:"Size:"}),a.jsx("span",{className:"value",children:"35 MB"})]}),a.jsxs("div",{className:"download-detail-item",children:[a.jsx("span",{className:"label",children:"Required Android:"}),a.jsx("span",{className:"value",children:"8.0 and up"})]}),a.jsxs("div",{className:"download-detail-item",children:[a.jsx("span",{className:"label",children:"Permissions:"}),a.jsx("span",{className:"value",children:"Network, Storage, Camera"})]})]}),a.jsxs("div",{className:"download-warning",children:[a.jsx("i",{className:"fas fa-exclamation-triangle"}),a.jsx("p",{children:'This APK file is safe and verified. Enable "Install from unknown sources" in your Android settings if needed.'})]}),a.jsxs("div",{className:"download-actions",children:[a.jsx("button",{className:"cancel-button",onClick:()=>t(!1),children:"Cancel"}),a.jsx("button",{className:`download-apk-button ${l?"downloading":""}`,onClick:N,disabled:l,children:l?a.jsxs(a.Fragment,{children:[a.jsx("i",{className:"fas fa-spinner fa-spin"}),"Downloading..."]}):a.jsxs(a.Fragment,{children:[a.jsx("i",{className:"fas fa-download"}),"Download APK"]})})]}),a.jsx("div",{className:"download-footer",children:a.jsx("p",{children:"By downloading, you agree to our Terms of Service and Privacy Policy"})})]})}),g&&a.jsx("div",{className:"share-modal",onClick:()=>r(!1),children:a.jsxs("div",{className:"share-modal-content",onClick:e=>e.stopPropagation(),children:[a.jsxs("div",{className:"share-header",children:[a.jsx("h3",{children:"Share Nexus Exchange"}),a.jsx("button",{className:"close-share-button",onClick:()=>r(!1),children:a.jsx("i",{className:"fas fa-times"})})]}),a.jsxs("div",{className:"share-options",children:[a.jsxs("div",{className:"share-option",onClick:k,children:[a.jsx("div",{className:"share-icon whatsapp",children:a.jsx("i",{className:"fab fa-whatsapp"})}),a.jsx("span",{children:"WhatsApp"})]}),a.jsxs("div",{className:"share-option",onClick:y,children:[a.jsx("div",{className:"share-icon facebook",children:a.jsx("i",{className:"fab fa-facebook-f"})}),a.jsx("span",{children:"Facebook"})]}),a.jsxs("div",{className:"share-option",onClick:z,children:[a.jsx("div",{className:"share-icon sms",children:a.jsx("i",{className:"fas fa-sms"})}),a.jsx("span",{children:"SMS"})]}),a.jsxs("div",{className:"share-option",onClick:C,children:[a.jsx("div",{className:"share-icon email",children:a.jsx("i",{className:"fas fa-envelope"})}),a.jsx("span",{children:"Email"})]}),a.jsxs("div",{className:"share-option",onClick:m,children:[a.jsx("div",{className:"share-icon link",children:a.jsx("i",{className:"fas fa-link"})}),a.jsx("span",{children:"Copy Link"})]})]}),a.jsxs("div",{className:"share-url",children:[a.jsx("input",{type:"text",value:i.url,readOnly:!0,className:"url-input"}),a.jsx("button",{onClick:m,className:"copy-url-button",children:a.jsx("i",{className:"fas fa-copy"})})]})]})}),a.jsx("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Roboto', Arial, sans-serif;
        }
        
        body {
          background-color: #f8f9fa;
          color: #3c4043;
          line-height: 1.5;
          max-width: 400px;
          margin: 0 auto;
          position: relative;
        }
        
        .play-store-container {
          background-color: white;
          min-height: 100vh;
          padding-bottom: 60px;
        }
        
        /* Header */
        .header {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          border-bottom: 1px solid #e8eaed;
          background-color: white;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        
        .back-button {
          margin-right: 16px;
          color: #5f6368;
          font-size: 20px;
          cursor: pointer;
        }
        
        .search-bar {
          flex: 1;
          display: flex;
          align-items: center;
          background-color: #f1f3f4;
          border-radius: 20px;
          padding: 8px 16px;
          margin: 0 8px;
        }
        
        .search-bar i {
          color: #5f6368;
          margin-right: 8px;
          font-size: 18px;
        }
        
        .search-bar input {
          border: none;
          background: transparent;
          width: 100%;
          font-size: 16px;
          outline: none;
        }
        
        .more-options {
          color: #5f6368;
          font-size: 20px;
          cursor: pointer;
        }
        
        /* App Header */
        .app-header {
          padding: 20px 16px;
          border-bottom: 1px solid #e8eaed;
          display: flex;
          align-items: flex-start;
        }
        
        .app-icon {
          width: 80px;
          height: 80px;
          border-radius: 16px;
          margin-right: 16px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        }
        
        .app-info {
          flex: 1;
        }
        
        .app-title {
          font-size: 18px;
          font-weight: 500;
          margin-bottom: 4px;
          line-height: 1.3;
          color: #3c4043;
        }
        
        .app-developer {
          color: #1a73e8;
          margin-bottom: 8px;
          font-size: 13px;
        }
        
        .app-badges {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .rating {
          display: flex;
          align-items: center;
        }
        
        .stars {
          color: #fbbc04;
          margin-right: 4px;
          font-size: 14px;
        }
        
        .rating-value {
          font-weight: 500;
          margin-right: 4px;
          font-size: 14px;
        }
        
        .rating-count {
          color: #5f6368;
          font-size: 13px;
        }
        
        .editor-choice {
          display: flex;
          align-items: center;
          background: #f8f9fa;
          color: #5f6368;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 500;
        }
        
        .editor-choice i {
          margin-right: 4px;
          color: #1a73e8;
          font-size: 10px;
        }
        
        .downloads {
          color: #5f6368;
          font-size: 13px;
          margin-bottom: 4px;
        }
        
        .age-rating {
          background-color: #f1f3f4;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 11px;
          color: #5f6368;
          display: inline-block;
          margin-bottom: 12px;
        }
        
        .actions-buttons {
          display: flex;
          margin-top: 8px;
        }
        
        .install-button {
          background-color: #1a73e8;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 10px 20px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          margin-right: 12px;
          display: flex;
          align-items: center;
          flex: 1;
          justify-content: center;
          transition: background-color 0.2s;
        }
        
        .install-button:hover {
          background-color: #1669d6;
        }
        
        .install-button i {
          margin-right: 8px;
        }
        
        .wishlist-button, .share-button {
          background-color: #f1f3f4;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #5f6368;
          margin-right: 8px;
          transition: background-color 0.2s;
        }
        
        .wishlist-button:hover, .share-button:hover {
          background-color: #e8eaed;
        }
        
        /* Screenshots */
        .screenshots {
          padding: 20px 16px;
          border-bottom: 1px solid #e8eaed;
        }
        
        .sections-title {
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 12px;
          color: #3c4043;
        }
        
        .screenshot-container {
          display: flex;
          overflow-x: auto;
          padding-bottom: 8px;
          gap: 12px;
          scrollbar-width: none;
        }
        
        .screenshot-container::-webkit-scrollbar {
          display: none;
        }
        
        .screenshot {
          width: 200px;
          height: 355px;
          border-radius: 12px;
          flex-shrink: 0;
          background-size: cover;
          background-position: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          position: relative;
          cursor: pointer;
          transition: transform 0.2s;
          overflow: hidden;
        }
        
        .screenshot:hover {
          transform: scale(1.02);
        }
        
        .screenshot img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .screenshot-label {
          position: absolute;
          bottom: 10px;
          left: 10px;
          background-color: rgba(0,0,0,0.7);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
        }
        
        /* App Details */
        .app-details {
          padding: 20px 16px;
          border-bottom: 1px solid #e8eaed;
        }
        
        .about-app {
          margin-bottom: 20px;
        }
        
        .description {
          color: #5f6368;
          margin-bottom: 12px;
          font-size: 14px;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: ${n?"unset":"3"};
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .read-more {
          color: #1a73e8;
          font-weight: 500;
          cursor: pointer;
          font-size: 14px;
        }
        
        .details-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
          background: #f8f9fa;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #e8eaed;
        }
        
        .detail-item {
          display: flex;
          justify-content: space-between;
          padding: 12px 16px;
          border-bottom: 1px solid #e8eaed;
          font-size: 14px;
        }
        
        .detail-item:last-child {
          border-bottom: none;
        }
        
        .detail-label {
          color: #5f6368;
        }
        
        .detail-value {
          font-weight: 500;
          text-align: right;
        }
        
        /* Reviews */
        .reviews {
          padding: 20px 16px;
          border-bottom: 1px solid #e8eaed;
        }
        
        .review-summary {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          padding: 16px;
          background: #f8f9fa;
          border-radius: 8px;
        }
        
        .overall-rating {
          text-align: center;
          margin-right: 20px;
        }
        
        .rating-large {
          font-size: 36px;
          font-weight: 500;
          line-height: 1;
        }
        
        .stars-large {
          color: #fbbc04;
          font-size: 16px;
          margin: 6px 0;
        }
        
        .rating-total {
          color: #5f6368;
          font-size: 13px;
        }
        
        .rating-bars {
          flex: 1;
        }
        
        .rating-bar {
          display: flex;
          align-items: center;
          margin-bottom: 6px;
        }
        
        .bar-label {
          width: 20px;
          font-size: 13px;
          color: #5f6368;
        }
        
        .bar-container {
          flex: 1;
          height: 6px;
          background-color: #e8eaed;
          border-radius: 3px;
          margin: 0 8px;
          overflow: hidden;
        }
        
        .bar-fill {
          height: 100%;
          background-color: #fbbc04;
          border-radius: 3px;
        }
        
        .bar-count {
          width: 30px;
          font-size: 13px;
          color: #5f6368;
          text-align: right;
        }
        
        .review-list {
          margin-top: 20px;
        }
        
        .review-item {
          padding: 16px 0;
          border-bottom: 1px solid #e8eaed;
        }
        
        .review-item:last-child {
          border-bottom: none;
        }
        
        .review-header {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
        }
        
        .reviewer-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: #e0e0e0;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          font-weight: bold;
          color: #5f6368;
          font-size: 16px;
        }
        
        .reviewer-name {
          font-weight: 500;
          margin-right: 8px;
          font-size: 14px;
        }
        
        .review-date {
          color: #5f6368;
          font-size: 13px;
        }
        
        .review-stars {
          color: #fbbc04;
          margin-bottom: 8px;
          font-size: 14px;
        }
        
        .review-text {
          color: #3c4043;
          font-size: 14px;
          line-height: 1.4;
        }
        
        /* Similar Apps */
        .similar-apps {
          padding: 20px 16px;
        }
        
        .app-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        
        .app-card {
          text-align: center;
          padding: 12px 8px;
          border-radius: 8px;
          transition: background-color 0.2s;
          cursor: pointer;
        }
        
        .app-card:hover {
          background-color: #f8f9fa;
        }
        
        .app-card-icon {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          margin: 0 auto 6px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .app-card-icon i {
          font-size: 28px;
          color: white;
        }
        
        .app-card-title {
          font-size: 12px;
          font-weight: 500;
          margin-bottom: 2px;
          line-height: 1.3;
          color: #3c4043;
        }
        
        .app-card-developer {
          font-size: 11px;
          color: #5f6368;
          margin-bottom: 6px;
        }
        
        .app-card-rating {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          color: #5f6368;
        }
        
        .app-card-stars {
          color: #fbbc04;
          margin-right: 2px;
          font-size: 10px;
        }
        
        /* Footer */
        .footer {
          padding: 20px 16px;
          background-color: #f8f9fa;
          border-top: 1px solid #e8eaed;
          text-align: center;
          color: #5f6368;
          font-size: 12px;
        }
        
        /* Navigation Bar */
        .nav-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: white;
          display: flex;
          justify-content: space-around;
          padding: 8px 0;
          border-top: 1px solid #e8eaed;
          max-width: 400px;
          margin: 0 auto;
          z-index: 100;
        }
        
        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #5f6368;
          font-size: 10px;
          padding: 4px 8px;
          border-radius: 8px;
          transition: background-color 0.2s;
        }
        
        .nav-item.active {
          color: #1a73e8;
        }
        
        .nav-item:hover {
          background-color: #f8f9fa;
        }
        
        .nav-icon {
          font-size: 20px;
          margin-bottom: 2px;
        }
        
        /* Image Modal */
        .image-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }
        
        .modal-content {
          position: relative;
          max-width: 100%;
          max-height: 100%;
        }
        
        .modal-content img {
          width: 100%;
          height: auto;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }
        
        .close-button {
          position: absolute;
          top: -40px;
          right: 0;
          background: rgba(255, 255, 255, 0.9);
          color: #3c4043;
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 16px;
        }
        
        /* Download Modal */
        .download-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 20px;
        }
        
        .download-modal-content {
          background: white;
          border-radius: 12px;
          width: 100%;
          max-width: 360px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          overflow: hidden;
        }
        
        .download-header {
          display: flex;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #e8eaed;
          background: #f8f9fa;
        }
        
        .download-app-icon {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          margin-right: 16px;
          overflow: hidden;
        }
        
        .download-app-icon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .download-app-info h3 {
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 4px;
          color: #3c4043;
        }
        
        .download-app-info p {
          font-size: 13px;
          color: #1a73e8;
          margin-bottom: 6px;
        }
        
        .download-rating {
          display: flex;
          align-items: center;
        }
        
        .download-rating .stars {
          font-size: 12px;
          margin-right: 6px;
        }
        
        .download-rating span {
          font-size: 12px;
          color: #5f6368;
        }
        
        .download-details {
          padding: 16px 20px;
          border-bottom: 1px solid #e8eaed;
        }
        
        .download-detail-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 13px;
        }
        
        .download-detail-item:last-child {
          margin-bottom: 0;
        }
        
        .download-detail-item .label {
          color: #5f6368;
        }
        
        .download-detail-item .value {
          font-weight: 500;
          text-align: right;
        }
        
        .download-warning {
          display: flex;
          align-items: flex-start;
          padding: 16px 20px;
          background: #fff8e1;
          border-left: 4px solid #ffc107;
          margin: 0 20px 16px;
          border-radius: 4px;
        }
        
        .download-warning i {
          color: #ff9800;
          margin-right: 8px;
          margin-top: 2px;
          font-size: 14px;
        }
        
        .download-warning p {
          font-size: 12px;
          color: #5f6368;
          line-height: 1.4;
        }
        
        .download-actions {
          display: flex;
          gap: 12px;
          padding: 0 20px 20px;
        }
        
        .cancel-button {
          flex: 1;
          background: #f1f3f4;
          border: none;
          border-radius: 4px;
          padding: 12px;
          font-size: 14px;
          font-weight: 500;
          color: #5f6368;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .cancel-button:hover {
          background: #e8eaed;
        }
        
        .download-apk-button {
          flex: 2;
          background: #1a73e8;
          border: none;
          border-radius: 4px;
          padding: 12px;
          font-size: 14px;
          font-weight: 500;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background-color 0.2s;
        }
        
        .download-apk-button:hover:not(.downloading) {
          background: #1669d6;
        }
        
        .download-apk-button.downloading {
          background: #5f6368;
          cursor: not-allowed;
        }
        
        .download-footer {
          padding: 12px 20px;
          background: #f8f9fa;
          border-top: 1px solid #e8eaed;
        }
        
        .download-footer p {
          font-size: 11px;
          color: #5f6368;
          text-align: center;
          line-height: 1.3;
        }
        
        /* Share Modal */
        .share-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 20px;
        }
        
        .share-modal-content {
          background: white;
          border-radius: 16px;
          width: 100%;
          max-width: 320px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          overflow: hidden;
          animation: slideUp 0.3s ease;
        }
        
        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .share-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #e8eaed;
        }
        
        .share-header h3 {
          font-size: 18px;
          font-weight: 500;
          color: #3c4043;
          margin: 0;
        }
        
        .close-share-button {
          background: none;
          border: none;
          color: #5f6368;
          font-size: 18px;
          cursor: pointer;
          padding: 4px;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s;
        }
        
        .close-share-button:hover {
          background-color: #f1f3f4;
        }
        
        .share-options {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          padding: 20px;
        }
        
        .share-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          padding: 12px 8px;
          border-radius: 12px;
          transition: background-color 0.2s;
        }
        
        .share-option:hover {
          background-color: #f8f9fa;
        }
        
        .share-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
          font-size: 20px;
          color: white;
        }
        
        .share-icon.whatsapp {
          background: #25D366;
        }
        
        .share-icon.facebook {
          background: #1877F2;
        }
        
        .share-icon.sms {
          background: #34B7F1;
        }
        
        .share-icon.email {
          background: #EA4335;
        }
        
        .share-icon.link {
          background: #5f6368;
        }
        
        .share-option span {
          font-size: 12px;
          font-weight: 500;
          color: #3c4043;
          text-align: center;
        }
        
        .share-url {
          padding: 0 20px 20px;
          display: flex;
          gap: 8px;
        }
        
        .url-input {
          flex: 1;
          padding: 12px;
          border: 1px solid #e8eaed;
          border-radius: 8px;
          font-size: 14px;
          background: #f8f9fa;
          color: #5f6368;
        }
        
        .copy-url-button {
          background: #1a73e8;
          border: none;
          border-radius: 8px;
          padding: 12px 16px;
          color: white;
          cursor: pointer;
          font-size: 14px;
          transition: background-color 0.2s;
        }
        
        .copy-url-button:hover {
          background: #1669d6;
        }
        
        /* Responsive adjustments */
        @media (max-width: 400px) {
          body {
            max-width: 100%;
          }
          
          .nav-bar {
            max-width: 100%;
          }
          
          .screenshot {
            width: 180px;
            height: 320px;
          }
          
          .download-modal-content,
          .share-modal-content {
            margin: 0 16px;
          }
          
          .share-options {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `})]})}export{E as default};
