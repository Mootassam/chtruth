import{l as E,u as W,h as Ee,i as s,t as Pe,v as V,j as e,k as t,m as Me,P as le}from"./index-aca44342.js";import{S as Te}from"./SubHeader-5c07c3ca.js";import{S as Ue}from"./sucessModal-73f1f0e4.js";import{u as Le}from"./useDispatch-08c05b9c.js";import"./useNotifications-ccc87162.js";const S=l=>l.assets.form,Re=E([S],l=>l.record),$e=E([S],l=>!!l.initLoading),qe=E([S],l=>!!l.saveLoading),Ie=E([S],l=>!!l.showModal),We={selectInitLoading:$e,selectSaveLoading:qe,selectRecord:Re,selectModal:Ie,selectRaw:S};function _e(){var ae,te,ie,ce;const l=Le(),de=W(Ee.selectCurrentUser),[o,O]=s.useState("USDT"),[r,Y]=s.useState("BTC"),[d,P]=s.useState(1),[z,H]=s.useState(0),[J,me]=s.useState(0),[pe,M]=s.useState(!1),[ue,xe]=s.useState("from"),[T,_]=s.useState(""),[U,L]=s.useState(!0),[G,K]=s.useState(null),Q=W(We.selectModal),[X,Z]=s.useState({}),[he,ge]=s.useState(Date.now()),[fe,g]=s.useState(!1),[be,ee]=s.useState(0),[B,ne]=s.useState(0),[f,oe]=s.useState(!1),b=W(Pe.selectRows),[v,ve]=s.useState({}),y=s.useRef(null),R=s.useRef(!1),[h,se]=s.useState({});s.useEffect(()=>{(()=>{if(b!=null&&b.length){const a=b.reduce((m,p)=>(m[p.symbol]=p.amount,m),{});se(a)}})()},[b]),s.useEffect(()=>{l(V.doFetch())},[l]);const j=s.useMemo(()=>{if(!o||d<=0)return!1;const n=h[o]||0;return d<=n},[d,o,h]);s.useEffect(()=>{(async()=>{try{L(!0);const m=(await Me.get("https://api.binance.com/api/v3/ticker/24hr")).data.filter(c=>c.symbol.endsWith("USDT")&&!c.symbol.includes("UP")&&!c.symbol.includes("DOWN")&&!c.symbol.includes("BEAR")&&!c.symbol.includes("BULL"));m.sort((c,u)=>parseFloat(u.quoteVolume)-parseFloat(c.quoteVolume));const p=m.slice(0,200),i={};p.forEach(c=>{const u=c.symbol,F=u.replace("USDT",""),x=!c.priceChangePercent.startsWith("-"),C=Math.abs(Number(c.priceChangePercent)).toFixed(2),q=parseFloat(c.lastPrice),k=Number(c.volume);let I=k.toFixed(0);k>=1e9?I=(k/1e9).toFixed(1)+"B":k>=1e6&&(I=(k/1e6).toFixed(1)+"M"),i[u]={symbol:u,name:`${F}/USDT`,price:q.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:q<1?6:4}),change:c.priceChange,changePercent:C,volume:c.volume,volumeFormatted:I,isPositive:x,quoteVolume:parseFloat(c.quoteVolume),numericPrice:q}}),i.USDT={symbol:"USDT",name:"USDT/USDT",price:"1.00",change:"0",changePercent:"0.00",volume:"0",volumeFormatted:"0",isPositive:!0,quoteVolume:0,numericPrice:1},Z(i),L(!1)}catch(a){console.error("Error fetching market data:",a),K("Failed to fetch market data. Please try again later."),L(!1)}})()},[]),s.useEffect(()=>(y.current=new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr"),y.current.onmessage=n=>{const a=JSON.parse(n.data);Z(m=>{const p={...m};return a.forEach(i=>{if(p[i.s]){const c=!i.P.startsWith("-"),u=Math.abs(Number(i.P)).toFixed(2),F=parseFloat(i.c),x=Number(i.v);let C=x.toFixed(0);x>=1e9?C=(x/1e9).toFixed(1)+"B":x>=1e6&&(C=(x/1e6).toFixed(1)+"M"),p[i.s]={...p[i.s],price:F.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:F<1?6:4}),change:i.p,changePercent:u,volume:i.v,volumeFormatted:C,isPositive:c,quoteVolume:parseFloat(i.q),numericPrice:F}}}),p})},y.current.onerror=n=>{console.error("WebSocket error:",n),K("WebSocket connection error. Prices may not update in real-time.")},()=>{y.current&&y.current.close()}),[]);const A=s.useMemo(()=>{const n=Object.values(X).map(a=>{const m=a.symbol.replace("USDT","");return{code:m,name:m,icon:"fas fa-coins",color:"#F3BA2F",symbol:a.symbol,price:a.numericPrice}});return n.find(a=>a.code==="USDT")||n.push({code:"USDT",name:"USDT",icon:"fas fa-dollar-sign",color:"#26A17B",symbol:"USDT",price:1}),n},[X]),D=s.useCallback(()=>{if(R.current)return;const n=A.find(i=>i.code===o),a=A.find(i=>i.code===r);if(!n||!a)return;const m=n.price,p=a.price;if(m&&p){const i=m/p;me(i),H(d*i),ge(Date.now())}},[o,r,d,A]);s.useEffect(()=>{D()},[D]),s.useEffect(()=>{const n=setInterval(()=>{D()},1e3);return()=>clearInterval(n)},[D]);const ye=n=>{const a=parseFloat(n.target.value)||0;P(a)},je=()=>{P(h[o]||0)},Ae=n=>{ue==="from"?O(n):Y(n),M(!1),_("")},re=n=>{xe(n),M(!0)},Ne=()=>{const n=o;O(r),Y(n)},we=s.useMemo(()=>d*.001,[d]),Fe=s.useMemo(()=>z-z*.001,[z]),Ce=()=>{j&&(ee(we),ne(Fe),g(!0))},ke=()=>{l(le.doClose()),P(1),H(0),ne(0),ee(0),l(V.doFetch())},Se=()=>{j&&(oe(!0),R.current=!0,setTimeout(()=>{const n={user:de.id,fromSymbol:o,fromAmount:d,toSymbol:r,coinName:r,toAmount:B.toFixed(8),status:"available"};l(le.doCreate(n)),se(a=>({...a,[o]:(a[o]||0)-d,[r]:(a[r]||0)+B})),R.current=!1,oe(!1),g(!1),setTimeout(()=>{l(V.doFetch())},500)},2e3))},ze=A.filter(n=>n.code.toLowerCase().includes(T.toLowerCase())||n.name.toLowerCase().includes(T.toLowerCase())),$=n=>A.find(a=>a.code===n),N=n=>{const a=$(n);return a?a.price:null},w=n=>{ve(a=>({...a,[n]:!0}))},Be=()=>[...Array(10)].map((n,a)=>e.jsxs("div",{className:"currency-item-placeholder",children:[e.jsx("div",{className:"currency-item-icon-placeholder shimmer"}),e.jsxs("div",{className:"currency-item-info-placeholder",children:[e.jsx("div",{className:"placeholder-line shimmer",style:{width:"60%",height:"16px",marginBottom:"8px"}}),e.jsx("div",{className:"placeholder-line shimmer",style:{width:"40%",height:"12px"}})]}),e.jsxs("div",{className:"currency-item-price-placeholder",children:[e.jsx("div",{className:"placeholder-line shimmer",style:{width:"70px",height:"16px",marginBottom:"8px"}}),e.jsx("div",{className:"placeholder-line shimmer",style:{width:"50px",height:"12px"}})]})]},a)),De=Date.now()-he<3e3;return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"container",children:[e.jsx(Te,{title:t("pages.conversion.title")}),U&&e.jsxs("div",{className:"loading-overlay",children:[e.jsx("div",{className:"loading-spinner-large"}),e.jsx("span",{children:t("pages.conversion.loading")})]}),G&&e.jsxs("div",{className:"error-banner",children:[e.jsx("i",{className:"fas fa-exclamation-triangle"}),e.jsx("span",{children:G})]}),e.jsxs("div",{className:"conversion-box",children:[e.jsxs("div",{className:"amount-input",children:[e.jsxs("div",{className:"input-header",children:[e.jsx("div",{className:"input-label",children:t("pages.conversion.youSend")}),e.jsxs("div",{className:"balance-display",children:[t("pages.conversion.balance"),": ",h[o]||0," ",o,e.jsx("button",{className:"max-button",onClick:je,children:t("pages.conversion.max")})]})]}),e.jsxs("div",{className:"input-field",children:[e.jsx("input",{type:"number",value:d,onChange:ye,min:0,step:"0.00000001"}),e.jsxs("div",{className:"currency-selector",onClick:()=>re("from"),children:[e.jsx("div",{className:"currency-icon",style:{backgroundColor:((ae=$(o))==null?void 0:ae.color)||"#F3BA2F"},children:v[o]?e.jsx("div",{className:"currency-icon-fallback",children:o.charAt(0)}):e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${o}.png`,style:{width:25,height:25},alt:o,onError:()=>w(o)})}),e.jsx("div",{className:"currency-name",children:o}),e.jsx("i",{className:"fas fa-chevron-down"})]})]}),e.jsx("div",{className:"currency-price",children:N(o)?e.jsxs(e.Fragment,{children:["1 ",o," = $",(te=N(o))==null?void 0:te.toLocaleString("en-US",{maximumFractionDigits:2})]}):e.jsx(e.Fragment,{children:" "})}),!j&&d>0&&e.jsxs("div",{className:"error-text",children:[e.jsx("i",{className:"fas fa-exclamation-circle"}),t("pages.conversion.insufficientBalance")]})]}),e.jsx("div",{className:"switch-container",children:e.jsx("div",{className:"switch-btn",onClick:Ne,children:e.jsx("i",{className:"fas fa-exchange-alt"})})}),e.jsxs("div",{className:"amount-input",children:[e.jsxs("div",{className:"input-header",children:[e.jsx("div",{className:"input-label",children:t("pages.conversion.youReceive")}),e.jsxs("div",{className:"balance-display",children:[t("pages.conversion.balance"),": ",h[r]||0," ",r]})]}),e.jsxs("div",{className:"input-field",children:[e.jsx("input",{type:"number",value:z.toFixed(8),readOnly:!0}),e.jsxs("div",{className:"currency-selector",onClick:()=>re("to"),children:[e.jsx("div",{className:"currency-icon",style:{backgroundColor:((ie=$(r))==null?void 0:ie.color)||"#F3BA2F"},children:v[r]?e.jsx("div",{className:"currency-icon-fallback",children:r.charAt(0)}):e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${r}.png`,style:{width:25,height:25},alt:r,onError:()=>w(r)})}),e.jsx("div",{className:"currency-name",children:r}),e.jsx("i",{className:"fas fa-chevron-down"})]})]}),e.jsx("div",{className:"currency-price",children:N(r)?e.jsxs(e.Fragment,{children:["1 ",r," = $",(ce=N(r))==null?void 0:ce.toLocaleString("en-US",{maximumFractionDigits:2})]}):e.jsx(e.Fragment,{children:" "})})]}),e.jsxs("div",{className:"conversion-result",children:[e.jsx("div",{className:"result-label",children:t("pages.conversion.estimatedConversion")}),e.jsxs("div",{className:"result-amount",children:["1 ",o," = ",J.toFixed(8)," ",r,!De&&e.jsx("span",{className:"mini-loader"})]}),e.jsxs("div",{className:"result-equivalent",children:["$",(d*(N(o)||0)).toLocaleString("en-US",{maximumFractionDigits:2})]})]}),e.jsx("button",{className:"convert-btn",onClick:Ce,disabled:U||d<=0||!j||o===r,children:o===r?t("pages.conversion.selectDifferentCurrencies"):j?t("pages.conversion.convertNow"):t("pages.conversion.insufficientBalance")}),e.jsxs("div",{className:"last-updated",children:[e.jsx("i",{className:"fas fa-sync-alt"}),t("pages.conversion.pricesUpdate")]})]})]}),pe&&e.jsx("div",{className:"currency-modal",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("div",{className:"modal-title",children:t("pages.conversion.selectCurrency")}),e.jsx("div",{className:"close-modal",onClick:()=>M(!1),children:"×"})]}),e.jsxs("div",{className:"search-box",children:[e.jsx("i",{className:"fas fa-search"}),e.jsx("input",{type:"text",placeholder:t("pages.conversion.searchCurrencies"),value:T,onChange:n=>_(n.target.value)})]}),e.jsx("ul",{className:"currency-list",children:U?Be():ze.map(n=>e.jsxs("li",{className:"currency-item",onClick:()=>Ae(n.code),children:[e.jsx("div",{className:"currency-item-icon",style:{backgroundColor:n.color},children:v[n.code]?e.jsx("div",{className:"currency-icon-fallback",children:n.code.charAt(0)}):e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${n.code}.png`,style:{width:40,height:40},alt:n.code,onError:()=>w(n.code)})}),e.jsxs("div",{className:"currency-item-info",children:[e.jsx("div",{className:"currency-item-name",children:n.code}),e.jsx("div",{className:"currency-item-full",children:n.name})]}),e.jsxs("div",{className:"currency-item-details",children:[e.jsxs("div",{className:"currency-item-price",children:["$",n.price.toLocaleString("en-US",{maximumFractionDigits:2})]}),e.jsxs("div",{className:"currency-item-balance",children:[t("pages.conversion.balance"),": ",h[n.code]||0," ",n.code]})]})]},n.code))})]})}),Q&&e.jsx(Ue,{isOpen:Q,onClose:ke,type:"convert",amount:Number(B).toFixed(8),coinType:r}),fe&&e.jsxs("div",{className:"confirmation-modal",children:[e.jsx("div",{className:"modal-overlay",onClick:()=>!f&&g(!1)}),e.jsxs("div",{className:"modal-dialog",children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{children:t("pages.conversion.confirmConversion")}),e.jsx("button",{className:"close-btn",onClick:()=>!f&&g(!1),children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsxs("div",{className:"modal-body",children:[e.jsxs("div",{className:"conversion-summary",children:[e.jsxs("div",{className:"conversion-from",children:[e.jsxs("div",{className:"currency-amount",children:[e.jsx("span",{className:"amount",children:d}),e.jsx("span",{className:"currency",children:o})]}),e.jsx("div",{className:"currency-icon",children:v[o]?e.jsx("div",{className:"currency-icon-fallback large",children:o.charAt(0)}):e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${o}.png`,alt:o,onError:()=>w(o)})})]}),e.jsx("div",{className:"conversion-arrow",children:e.jsx("i",{className:"fas fa-arrow-down"})}),e.jsxs("div",{className:"conversion-to",children:[e.jsxs("div",{className:"currency-amount",children:[e.jsx("span",{className:"amount",children:B.toFixed(8)}),e.jsx("span",{className:"currency",children:r})]}),e.jsx("div",{className:"currency-icon",children:v[r]?e.jsx("div",{className:"currency-icon-fallback large",children:r.charAt(0)}):e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${r}.png`,alt:r,onError:()=>w(r)})})]})]}),e.jsxs("div",{className:"conversion-details",children:[e.jsx("h3",{children:t("pages.conversion.conversionDetails")}),e.jsxs("div",{className:"detail-item",children:[e.jsx("span",{className:"detail-label",children:t("pages.conversion.exchangeRate")}),e.jsxs("span",{className:"detail-value",children:["1 ",o," = ",J.toFixed(8)," ",r]})]}),e.jsxs("div",{className:"detail-item",children:[e.jsx("span",{className:"detail-label",children:t("pages.conversion.networkFee")}),e.jsxs("span",{className:"detail-value",children:[be.toFixed(8)," ",o]})]}),e.jsxs("div",{className:"detail-item",children:[e.jsx("span",{className:"detail-label",children:t("pages.conversion.estimatedArrival")}),e.jsx("span",{className:"detail-value",children:t("pages.conversion.arrivalTime")})]})]})]}),e.jsxs("div",{className:"modal-footer",children:[e.jsx("button",{className:"confirm-btn",onClick:Se,disabled:f,children:f?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin"}),t("pages.conversion.processingConversion")]}):e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-check-circle"}),t("pages.conversion.confirmConversion")]})}),e.jsx("button",{className:"cancel-btn",onClick:()=>g(!1),disabled:f,children:t("pages.conversion.cancel")})]})]})]}),e.jsx("style",{children:`
        /* Enhanced Confirmation Modal Styles */
        .confirmation-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2000;
          padding: 20px;
          box-sizing: border-box;
        }
        
        .modal-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(5px);
        }
        
        .modal-dialog {
          background: linear-gradient(145deg, #1a1a1a, #2a2a2a);
          border-radius: 20px;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          overflow: hidden;
          z-index: 2001;
          position: relative;
          border: 1px solid #333;
          animation: modalSlideIn 0.3s ease-out;
          height: 100%;
        }
        
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .modal-header {
          padding: 20px 25px;
          border-bottom: 1px solid #333;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(0, 0, 0, 0.2);
        }
        
        .modal-header h2 {
          margin: 0;
          color: #F3BA2F;
          font-size: 1.5rem;
          font-weight: 600;
        }
        
        .close-btn {
          background: none;
          border: none;
          color: #aaa;
          font-size: 1.2rem;
          cursor: pointer;
          padding: 5px;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        
        .close-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }
        
        .modal-body {
          padding: 25px;
        }
        
        .conversion-summary {
          text-align: center;
          margin-bottom: 30px;
        }
        
        .conversion-from, .conversion-to {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 15px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 12px;
          margin: 10px 0;
        }
        
        .currency-amount {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        
        .currency-amount .amount {
          font-size: 1.8rem;
          font-weight: bold;
          color: #fff;
        }
        
        .currency-amount .currency {
          font-size: 1rem;
          color: #F3BA2F;
          margin-top: 5px;
        }
        
        .currency-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #2a2a2a;
          border: 2px solid #333;
        }
        
        .currency-icon img {
          width: 30px;
          height: 30px;
        }
        
        .currency-icon-fallback {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #F3BA2F;
          color: #000;
          font-weight: bold;
          font-size: 16px;
        }
        
        .currency-icon-fallback.large {
          font-size: 20px;
        }
        
        .conversion-arrow {
          margin: 15px 0;
          color: #F3BA2F;
          font-size: 1.2rem;
        }
        
        .conversion-details {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 12px;
          padding: 20px;
        }
        
        .conversion-details h3 {
          margin: 0 0 15px 0;
          color: #fff;
          font-size: 1.1rem;
          font-weight: 600;
        }
        
        .detail-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid #333;
        }
        
        .detail-item:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }
        
        .detail-label {
          color: #aaa;
          font-size: 0.9rem;
        }
        
        .detail-value {
          color: #fff;
          font-weight: 500;
        }
        
        .modal-footer {
          padding: 20px 25px;
          border-top: 1px solid #333;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: rgba(0, 0, 0, 0.2);
        }
        
        .confirm-btn {
          background: linear-gradient(145deg, #F3BA2F, #E0A91C);
          color: #000;
          border: none;
          border-radius: 12px;
          padding: 16px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.2s;
        }
        
        .confirm-btn:hover:not(:disabled) {
          background: linear-gradient(145deg, #E0A91C, #D49F19);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(243, 186, 47, 0.3);
        }
        
        .confirm-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .cancel-btn {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          border: 1px solid #444;
          border-radius: 12px;
          padding: 16px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .cancel-btn:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.15);
        }
        
        .cancel-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        /* Error text styling */
        .error-text {
          color: #FF6838;
          font-size: 12px;
          margin-top: 8px;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        /* Responsive adjustments for the modal */
        @media (max-width: 480px) {
          .modal-dialog {
            max-width: 100%;
            border-radius: 16px;
          }
          
          .modal-header, .modal-body, .modal-footer {
            padding: 15px;
          }
          
          .currency-amount .amount {
            font-size: 1.5rem;
          }
          
          .currency-icon {
            width: 40px;
            height: 40px;
          }
        }
        
        /* Rest of the styles remain the same as before */
        /* ... (previous styles) ... */
        
        /* Shimmer animation for loading placeholders */
        @keyframes shimmer {
          0% {
            background-position: -468px 0;
          }
          100% {
            background-position: 468px 0;
          }
        }

        
        .shimmer {
          animation-duration: 1.5s;
          animation-fill-mode: forwards;
          animation-iteration-count: infinite;
          animation-name: shimmer;
          animation-timing-function: linear;
          background: #2A2A2A;
          background: linear-gradient(to right, #2A2A2A 8%, #333333 18%, #2A2A2A 33%);
          background-size: 800px 104px;
          position: relative;
          border-radius: 4px;
        }
        
        .currency-item-placeholder {
          display: flex;
          align-items: center;
          padding: 15px 10px;
          border-bottom: 1px solid #2A2A2A;
        }
        
        .currency-item-icon-placeholder {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          margin-right: 15px;
        }
        
        .currency-item-info-placeholder {
          flex: 1;
        }
        
        .currency-item-price-placeholder {
          text-align: right;
        }


        
        .currency-list {
          max-height: 400px;
          overflow-y: auto;
          scrollbar-width: none;
        }

        .currency-list::-webkit-scrollbar {
          display: none;
        }
        
        .placeholder-line {
          border-radius: 4px;
          margin-bottom: 8px;
        }
        
        .container {
          max-width: 400px;
          margin: 0 auto;
          padding: 0px 15px;
        }
        
        .conversion-box {
            position: relative;
        }
        
        .amount-input {
            background-color: #1A1A1A;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
            position: relative;
        }
        
        .input-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        
        .input-label {
            color: #AAAAAA;
            font-size: 14px;
        }
        
        .balance-display {
          color: #777;
          font-size: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .max-button {
          background-color: #2A2A2A;
          color: #F3BA2F;
          border: 1px solid #F3BA2F;
          border-radius: 4px;
          padding: 2px 6px;
          font-size: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .max-button:hover {
          background-color: #F3BA2F;
          color: #000;
        }
        
        .input-field {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .input-field input {
            background: transparent;
            border: none;
            color: white;
            font-size: 24px;
            font-weight: bold;
            width: 70%;
            outline: none;
        }
        
        .currency-selector {
            display: flex;
            align-items: center;
            background-color: #2A2A2A;
            padding: 8px 12px;
            border-radius: 8px;
            cursor: pointer;
        }
        
        .currency-icon {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background-color: #F3BA2F;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 8px;
            overflow: hidden;
        }
        
        .currency-icon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .currency-name {
            font-weight: bold;
            margin-right: 5px;
        }
        
        .currency-price {
            color: #AAAAAA;
            font-size: 12px;
            margin-top: 8px;
        }
        
        /* Switch Button */
        .switch-container {
            display: flex;
            justify-content: center;
            margin: 10px 0 20px;
        }
        
        .switch-btn {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #2A2A2A;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            border: 2px solid #000;
            transition: all 0.3s ease;
        }
        
        .switch-btn:hover {
            background-color: #F3BA2F;
            transform: rotate(180deg);
        }
        
        .switch-btn i {
            color: #F3BA2F;
            font-size: 18px;
        }
        
        .switch-btn:hover i {
            color: #000;
        }
        
        /* Conversion Result */
        .conversion-result {
            background: linear-gradient(145deg, #1A1A1A, #2A2A2A);
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 25px;
            text-align: center;
            position: relative;
        }
        
        .result-label {
            color: #AAAAAA;
            font-size: 14px;
            margin-bottom: 10px;
        }
        
        .result-amount {
            font-size: 32px;
            font-weight: bold;
            color: #F3BA2F;
            margin-bottom: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }
        
        .result-equivalent {
            color: #AAAAAA;
            font-size: 14px;
        }
        
        /* Convert Button */
        .convert-btn {
            background-color: #F3BA2F;
            color: #000;
            border: none;
            border-radius: 12px;
            padding: 18px;
            font-size: 16px;
            font-weight: bold;
            width: 100%;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        
        .convert-btn:hover:not(:disabled) {
            background-color: #E0A91C;
        }
        
        .convert-btn:disabled {
            background-color: #666;
            cursor: not-allowed;
        }
        
        /* Currency Selection Modal */
        .currency-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            z-index: 1000;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .currency-modal .modal-content {
            background-color: #1A1A1A;
            max-width: 400px;
            border-radius: 16px;
            padding: 20px;
            max-height: 80vh;
            overflow-y: auto;
        }
        
        .currency-modal .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        
        .currency-modal .modal-title {
            font-size: 18px;
            font-weight: bold;
        }
        
        .currency-modal .close-modal {
            color: #AAAAAA;
            font-size: 24px;
            cursor: pointer;
        }
        
        .search-box {
            background-color: #2A2A2A;
            border-radius: 8px;
            padding: 12px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
        }
        
        .search-box input {
            background: transparent;
            border: none;
            color: white;
            width: 100%;
            outline: none;
            margin-left: 10px;
        }
        
        .currency-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .currency-item {
            display: flex;
            align-items: center;
            padding: 15px 10px;
            border-bottom: 1px solid #2A2A2A;
            cursor: pointer;
        }
        
        .currency-item:hover {
            background-color: #2A2A2A;
        }
        
        .currency-item-icon {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background-color: #F3BA2F;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 15px;
            overflow: hidden;
        }
        
        .currency-item-icon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .currency-item-info {
            flex: 1;
        }
        
        .currency-item-name {
            font-weight: bold;
            margin-bottom: 4px;
        }
        
        .currency-item-full {
            color: #AAAAAA;
            font-size: 12px;
        }
        
        .currency-item-details {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        
        .currency-item-price {
            color: #F3BA2F;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 4px;
        }
        
        .currency-item-balance {
          color: #777;
          font-size: 11px;
        }
        
        /* Fullscreen loading overlay */
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            color: #F3BA2F;
            font-size: 20px;
            font-weight: bold;
            flex-direction: column;
            gap: 20px;
        }
        
        .loading-spinner-large {
            border: 4px solid #333;
            border-top: 4px solid #F3BA2F;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
        }
        
        .mini-loader {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid rgba(243, 186, 47, 0.3);
            border-radius: 50%;
            border-top-color: #F3BA2F;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        /* Error banner */
        .error-banner {
            background-color: #FF6838;
            color: white;
            padding: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 15px;
            border-radius: 8px;
        }
        
        .error-banner i {
            margin-right: 10px;
        }
        
        /* Last updated */
        .last-updated {
            text-align: center;
            color: #AAAAAA;
            font-size: 12px;
            margin-top: 15px;
        }
        
        .last-updated i {
            margin-right: 5px;
        }
        
        /* Responsive adjustments */
        @media (max-width: 480px) {
            .result-amount {
                font-size: 28px;
            }
            
            .input-field input {
                font-size: 20px;
            }
            
            .input-header {
              flex-direction: column;
              align-items: flex-start;
              gap: 4px;
            }
            
            .currency-item {
              flex-direction: column;
              align-items: flex-start;
            }
            
            .currency-item-details {
              align-items: flex-start;
              margin-top: 8px;
            }
        }
      `})]})}export{_e as default};
