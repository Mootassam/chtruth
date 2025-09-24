import{u as Z,w as Fe,r as t,i as Ce,j as e,f as ke,C as Se,k as ze}from"./index-3e05aead.js";import{S as Be}from"./SubHeader-a5fb8eed.js";import{u as De}from"./useDispatch-23525796.js";function Te(){var _,G,K,Q;const L=De(),ee=Z(Fe.selectCurrentUser),[n,M]=t.useState("USDT"),[o,R]=t.useState("BTC"),[c,I]=t.useState(1),[C,re]=t.useState(0),[$,ne]=t.useState(0),[te,S]=t.useState(!1),[oe,se]=t.useState("from"),[z,q]=t.useState(""),[B,D]=t.useState(!0),[W,V]=t.useState(null),[Y,O]=t.useState({}),[ae,ie]=t.useState(Date.now()),[ce,x]=t.useState(!1),[le,de]=t.useState(0),[H,me]=t.useState(0),[h,J]=t.useState(!1),g=Z(Ce.selectRows),[f,ue]=t.useState({}),b=t.useRef(null),E=t.useRef(!1),[p,pe]=t.useState({});t.useEffect(()=>{if(g!=null&&g.length){const r=g.reduce((s,l)=>(s[l.symbol]=l.amount,s),{});pe(r)}},[g]);const v=t.useMemo(()=>{if(!n||c<=0)return!1;const r=p[n]||0;return c<=r},[c,n,p]);t.useEffect(()=>{(async()=>{try{D(!0);const l=(await ke.get("https://api.binance.com/api/v3/ticker/24hr")).data.filter(i=>i.symbol.endsWith("USDT")&&!i.symbol.includes("UP")&&!i.symbol.includes("DOWN")&&!i.symbol.includes("BEAR")&&!i.symbol.includes("BULL"));l.sort((i,m)=>parseFloat(m.quoteVolume)-parseFloat(i.quoteVolume));const d=l.slice(0,200),a={};d.forEach(i=>{const m=i.symbol,N=m.replace("USDT",""),u=!i.priceChangePercent.startsWith("-"),w=Math.abs(Number(i.priceChangePercent)).toFixed(2),U=parseFloat(i.lastPrice),F=Number(i.volume);let T=F.toFixed(0);F>=1e9?T=(F/1e9).toFixed(1)+"B":F>=1e6&&(T=(F/1e6).toFixed(1)+"M"),a[m]={symbol:m,name:`${N}/USDT`,price:U.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:U<1?6:4}),change:i.priceChange,changePercent:w,volume:i.volume,volumeFormatted:T,isPositive:u,quoteVolume:parseFloat(i.quoteVolume),numericPrice:U}}),a.USDT={symbol:"USDT",name:"USDT/USDT",price:"1.00",change:"0",changePercent:"0.00",volume:"0",volumeFormatted:"0",isPositive:!0,quoteVolume:0,numericPrice:1},O(a),D(!1)}catch(s){console.error("Error fetching market data:",s),V("Failed to fetch market data. Please try again later."),D(!1)}})()},[]),t.useEffect(()=>(b.current=new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr"),b.current.onmessage=r=>{const s=JSON.parse(r.data);O(l=>{const d={...l};return s.forEach(a=>{if(d[a.s]){const i=!a.P.startsWith("-"),m=Math.abs(Number(a.P)).toFixed(2),N=parseFloat(a.c),u=Number(a.v);let w=u.toFixed(0);u>=1e9?w=(u/1e9).toFixed(1)+"B":u>=1e6&&(w=(u/1e6).toFixed(1)+"M"),d[a.s]={...d[a.s],price:N.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:N<1?6:4}),change:a.p,changePercent:m,volume:a.v,volumeFormatted:w,isPositive:i,quoteVolume:parseFloat(a.q),numericPrice:N}}}),d})},b.current.onerror=r=>{console.error("WebSocket error:",r),V("WebSocket connection error. Prices may not update in real-time.")},()=>{b.current&&b.current.close()}),[]);const y=t.useMemo(()=>{const r=Object.values(Y).map(s=>{const l=s.symbol.replace("USDT","");return{code:l,name:l,icon:"fas fa-coins",color:"#F3BA2F",symbol:s.symbol,price:s.numericPrice}});return r.find(s=>s.code==="USDT")||r.push({code:"USDT",name:"USDT",icon:"fas fa-dollar-sign",color:"#26A17B",symbol:"USDT",price:1}),r},[Y]),k=t.useCallback(()=>{if(E.current)return;const r=y.find(a=>a.code===n),s=y.find(a=>a.code===o);if(!r||!s)return;const l=r.price,d=s.price;if(l&&d){const a=l/d;ne(a),re(c*a),ie(Date.now())}},[n,o,c,y]);t.useEffect(()=>{k()},[k]),t.useEffect(()=>{const r=setInterval(()=>{k()},1e3);return()=>clearInterval(r)},[k]);const xe=r=>{const s=parseFloat(r.target.value)||0;I(s)},he=()=>{I(p[n]||0)},ge=r=>{oe==="from"?M(r):R(r),S(!1),q("")},X=r=>{se(r),S(!0)},fe=()=>{const r=n;M(o),R(r)},be=t.useMemo(()=>c*.001,[c]),ve=t.useMemo(()=>C-C*.001,[C]),ye=()=>{v&&(de(be),me(ve),x(!0))},je=()=>{v&&(J(!0),E.current=!0,setTimeout(()=>{const r={user:ee.id,fromSymbol:n,fromAmount:c,toSymbol:o,coinName:o,toAmount:H.toFixed(8),status:"available"};L(Se.doCreate(r)),L(ze.doFetch()),E.current=!1,J(!1),x(!1)},2e3))},Ae=y.filter(r=>r.code.toLowerCase().includes(z.toLowerCase())||r.name.toLowerCase().includes(z.toLowerCase())),P=r=>y.find(s=>s.code===r),j=r=>{const s=P(r);return s?s.price:null},A=r=>{ue(s=>({...s,[r]:!0}))},Ne=()=>[...Array(10)].map((r,s)=>e.jsxs("div",{className:"currency-item-placeholder",children:[e.jsx("div",{className:"currency-item-icon-placeholder shimmer"}),e.jsxs("div",{className:"currency-item-info-placeholder",children:[e.jsx("div",{className:"placeholder-line shimmer",style:{width:"60%",height:"16px",marginBottom:"8px"}}),e.jsx("div",{className:"placeholder-line shimmer",style:{width:"40%",height:"12px"}})]}),e.jsxs("div",{className:"currency-item-price-placeholder",children:[e.jsx("div",{className:"placeholder-line shimmer",style:{width:"70px",height:"16px",marginBottom:"8px"}}),e.jsx("div",{className:"placeholder-line shimmer",style:{width:"50px",height:"12px"}})]})]},s)),we=Date.now()-ae<3e3;return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"container",children:[e.jsx(Be,{title:"Convert Crypto"}),B&&e.jsxs("div",{className:"loading-overlay",children:[e.jsx("div",{className:"loading-spinner-large"}),e.jsx("span",{children:"Loading latest prices..."})]}),W&&e.jsxs("div",{className:"error-banner",children:[e.jsx("i",{className:"fas fa-exclamation-triangle"}),e.jsx("span",{children:W})]}),e.jsxs("div",{className:"conversion-box",children:[e.jsxs("div",{className:"amount-input",children:[e.jsxs("div",{className:"input-header",children:[e.jsx("div",{className:"input-label",children:"You send"}),e.jsxs("div",{className:"balance-display",children:["Balance: ",p[n]||0," ",n,e.jsx("button",{className:"max-button",onClick:he,children:"MAX"})]})]}),e.jsxs("div",{className:"input-field",children:[e.jsx("input",{type:"number",value:c,onChange:xe,min:0,step:"0.00000001"}),e.jsxs("div",{className:"currency-selector",onClick:()=>X("from"),children:[e.jsx("div",{className:"currency-icon",style:{backgroundColor:((_=P(n))==null?void 0:_.color)||"#F3BA2F"},children:f[n]?e.jsx("div",{className:"currency-icon-fallback",children:n.charAt(0)}):e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${n}.png`,style:{width:25,height:25},alt:n,onError:()=>A(n)})}),e.jsx("div",{className:"currency-name",children:n}),e.jsx("i",{className:"fas fa-chevron-down"})]})]}),e.jsx("div",{className:"currency-price",children:j(n)?e.jsxs(e.Fragment,{children:["1 ",n," = $",(G=j(n))==null?void 0:G.toLocaleString("en-US",{maximumFractionDigits:2})]}):e.jsx(e.Fragment,{children:" "})}),!v&&c>0&&e.jsxs("div",{className:"error-text",children:[e.jsx("i",{className:"fas fa-exclamation-circle"}),"Insufficient balance"]})]}),e.jsx("div",{className:"switch-container",children:e.jsx("div",{className:"switch-btn",onClick:fe,children:e.jsx("i",{className:"fas fa-exchange-alt"})})}),e.jsxs("div",{className:"amount-input",children:[e.jsxs("div",{className:"input-header",children:[e.jsx("div",{className:"input-label",children:"You receive"}),e.jsxs("div",{className:"balance-display",children:["Balance: ",p[o]||0," ",o]})]}),e.jsxs("div",{className:"input-field",children:[e.jsx("input",{type:"number",value:C.toFixed(8),readOnly:!0}),e.jsxs("div",{className:"currency-selector",onClick:()=>X("to"),children:[e.jsx("div",{className:"currency-icon",style:{backgroundColor:((K=P(o))==null?void 0:K.color)||"#F3BA2F"},children:f[o]?e.jsx("div",{className:"currency-icon-fallback",children:o.charAt(0)}):e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${o}.png`,style:{width:25,height:25},alt:o,onError:()=>A(o)})}),e.jsx("div",{className:"currency-name",children:o}),e.jsx("i",{className:"fas fa-chevron-down"})]})]}),e.jsx("div",{className:"currency-price",children:j(o)?e.jsxs(e.Fragment,{children:["1 ",o," = $",(Q=j(o))==null?void 0:Q.toLocaleString("en-US",{maximumFractionDigits:2})]}):e.jsx(e.Fragment,{children:" "})})]}),e.jsxs("div",{className:"conversion-result",children:[e.jsx("div",{className:"result-label",children:"Estimated conversion"}),e.jsxs("div",{className:"result-amount",children:["1 ",n," = ",$.toFixed(8)," ",o,!we&&e.jsx("span",{className:"mini-loader"})]}),e.jsxs("div",{className:"result-equivalent",children:["$",(c*(j(n)||0)).toLocaleString("en-US",{maximumFractionDigits:2})]})]}),e.jsx("button",{className:"convert-btn",onClick:ye,disabled:B||c<=0||!v||n===o,children:n===o?"Select different currencies":v?"Convert Now":"Insufficient balance"}),e.jsxs("div",{className:"last-updated",children:[e.jsx("i",{className:"fas fa-sync-alt"}),"Prices update in real-time"]})]})]}),te&&e.jsx("div",{className:"currency-modal",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("div",{className:"modal-title",children:"Select Currency"}),e.jsx("div",{className:"close-modal",onClick:()=>S(!1),children:"×"})]}),e.jsxs("div",{className:"search-box",children:[e.jsx("i",{className:"fas fa-search"}),e.jsx("input",{type:"text",placeholder:"Search currencies...",value:z,onChange:r=>q(r.target.value)})]}),e.jsx("ul",{className:"currency-list",children:B?Ne():Ae.map(r=>e.jsxs("li",{className:"currency-item",onClick:()=>ge(r.code),children:[e.jsx("div",{className:"currency-item-icon",style:{backgroundColor:r.color},children:f[r.code]?e.jsx("div",{className:"currency-icon-fallback",children:r.code.charAt(0)}):e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${r.code}.png`,style:{width:40,height:40},alt:r.code,onError:()=>A(r.code)})}),e.jsxs("div",{className:"currency-item-info",children:[e.jsx("div",{className:"currency-item-name",children:r.code}),e.jsx("div",{className:"currency-item-full",children:r.name})]}),e.jsxs("div",{className:"currency-item-details",children:[e.jsxs("div",{className:"currency-item-price",children:["$",r.price.toLocaleString("en-US",{maximumFractionDigits:2})]}),e.jsxs("div",{className:"currency-item-balance",children:["Balance: ",p[r.code]||0," ",r.code]})]})]},r.code))})]})}),ce&&e.jsxs("div",{className:"confirmation-modal",children:[e.jsx("div",{className:"modal-overlay",onClick:()=>!h&&x(!1)}),e.jsxs("div",{className:"modal-dialog",children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{children:"Confirm Conversion"}),e.jsx("button",{className:"close-btn",onClick:()=>!h&&x(!1),children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsxs("div",{className:"modal-body",children:[e.jsxs("div",{className:"conversion-summary",children:[e.jsxs("div",{className:"conversion-from",children:[e.jsxs("div",{className:"currency-amount",children:[e.jsx("span",{className:"amount",children:c}),e.jsx("span",{className:"currency",children:n})]}),e.jsx("div",{className:"currency-icon",children:f[n]?e.jsx("div",{className:"currency-icon-fallback large",children:n.charAt(0)}):e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${n}.png`,alt:n,onError:()=>A(n)})})]}),e.jsx("div",{className:"conversion-arrow",children:e.jsx("i",{className:"fas fa-arrow-down"})}),e.jsxs("div",{className:"conversion-to",children:[e.jsxs("div",{className:"currency-amount",children:[e.jsx("span",{className:"amount",children:H.toFixed(8)}),e.jsx("span",{className:"currency",children:o})]}),e.jsx("div",{className:"currency-icon",children:f[o]?e.jsx("div",{className:"currency-icon-fallback large",children:o.charAt(0)}):e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${o}.png`,alt:o,onError:()=>A(o)})})]})]}),e.jsxs("div",{className:"conversion-details",children:[e.jsx("h3",{children:"Conversion Details"}),e.jsxs("div",{className:"detail-item",children:[e.jsx("span",{className:"detail-label",children:"Exchange Rate"}),e.jsxs("span",{className:"detail-value",children:["1 ",n," = ",$.toFixed(8)," ",o]})]}),e.jsxs("div",{className:"detail-item",children:[e.jsx("span",{className:"detail-label",children:"Network Fee"}),e.jsxs("span",{className:"detail-value",children:[le.toFixed(8)," ",n]})]}),e.jsxs("div",{className:"detail-item",children:[e.jsx("span",{className:"detail-label",children:"Estimated Arrival"}),e.jsx("span",{className:"detail-value",children:"~30 seconds"})]})]})]}),e.jsxs("div",{className:"modal-footer",children:[e.jsx("button",{className:"confirm-btn",onClick:je,disabled:h,children:h?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin"}),"Processing Conversion..."]}):e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-check-circle"}),"Confirm Conversion"]})}),e.jsx("button",{className:"cancel-btn",onClick:()=>x(!1),disabled:h,children:"Cancel"})]})]})]}),e.jsx("style",{children:`
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
             height:100%
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
      `})]})}export{Te as default};
