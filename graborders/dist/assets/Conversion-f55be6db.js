import{h as D,u as q,z as De,r,m as Ee,o as W,j as e,i as Pe,G as ce}from"./index-ed26567c.js";import{S as Me}from"./SubHeader-a7b289da.js";import{S as Le}from"./sucessModal-148fd440.js";import{u as Te}from"./useDispatch-232adeda.js";const S=c=>c.assets.form,Ue=D([S],c=>c.record),Re=D([S],c=>!!c.initLoading),Ie=D([S],c=>!!c.saveLoading),$e=D([S],c=>!!c.showModal),qe={selectInitLoading:Re,selectSaveLoading:Ie,selectRecord:Ue,selectModal:$e,selectRaw:S};function Ge(){var te,se,ae,ie;const c=Te(),le=q(De.selectCurrentUser),[o,V]=r.useState("USDT"),[t,O]=r.useState("BTC"),[l,E]=r.useState(1),[k,Y]=r.useState(0),[G,de]=r.useState(0),[me,P]=r.useState(!1),[ue,pe]=r.useState("from"),[M,H]=r.useState(""),[L,T]=r.useState(!0),[J,X]=r.useState(null),_=q(qe.selectModal),[K,Q]=r.useState({}),[xe,he]=r.useState(Date.now()),[ge,h]=r.useState(!1),[fe,Z]=r.useState(0),[z,ee]=r.useState(0),[g,ne]=r.useState(!1),f=q(Ee.selectRows),[b,be]=r.useState({}),v=r.useRef(null),U=r.useRef(!1),[x,oe]=r.useState({});r.useEffect(()=>{(()=>{if(f!=null&&f.length){const s=f.reduce((d,m)=>(d[m.symbol]=m.amount,d),{});oe(s)}})()},[f]),r.useEffect(()=>{c(W.doFetch())},[c]);const y=r.useMemo(()=>{if(!o||l<=0)return!1;const n=x[o]||0;return l<=n},[l,o,x]);r.useEffect(()=>{(async()=>{try{T(!0);const d=(await Pe.get("https://api.binance.com/api/v3/ticker/24hr")).data.filter(i=>i.symbol.endsWith("USDT")&&!i.symbol.includes("UP")&&!i.symbol.includes("DOWN")&&!i.symbol.includes("BEAR")&&!i.symbol.includes("BULL"));d.sort((i,u)=>parseFloat(u.quoteVolume)-parseFloat(i.quoteVolume));const m=d.slice(0,200),a={};m.forEach(i=>{const u=i.symbol,w=u.replace("USDT",""),p=!i.priceChangePercent.startsWith("-"),F=Math.abs(Number(i.priceChangePercent)).toFixed(2),I=parseFloat(i.lastPrice),C=Number(i.volume);let $=C.toFixed(0);C>=1e9?$=(C/1e9).toFixed(1)+"B":C>=1e6&&($=(C/1e6).toFixed(1)+"M"),a[u]={symbol:u,name:`${w}/USDT`,price:I.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:I<1?6:4}),change:i.priceChange,changePercent:F,volume:i.volume,volumeFormatted:$,isPositive:p,quoteVolume:parseFloat(i.quoteVolume),numericPrice:I}}),a.USDT={symbol:"USDT",name:"USDT/USDT",price:"1.00",change:"0",changePercent:"0.00",volume:"0",volumeFormatted:"0",isPositive:!0,quoteVolume:0,numericPrice:1},Q(a),T(!1)}catch(s){console.error("Error fetching market data:",s),X("Failed to fetch market data. Please try again later."),T(!1)}})()},[]),r.useEffect(()=>(v.current=new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr"),v.current.onmessage=n=>{const s=JSON.parse(n.data);Q(d=>{const m={...d};return s.forEach(a=>{if(m[a.s]){const i=!a.P.startsWith("-"),u=Math.abs(Number(a.P)).toFixed(2),w=parseFloat(a.c),p=Number(a.v);let F=p.toFixed(0);p>=1e9?F=(p/1e9).toFixed(1)+"B":p>=1e6&&(F=(p/1e6).toFixed(1)+"M"),m[a.s]={...m[a.s],price:w.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:w<1?6:4}),change:a.p,changePercent:u,volume:a.v,volumeFormatted:F,isPositive:i,quoteVolume:parseFloat(a.q),numericPrice:w}}}),m})},v.current.onerror=n=>{console.error("WebSocket error:",n),X("WebSocket connection error. Prices may not update in real-time.")},()=>{v.current&&v.current.close()}),[]);const j=r.useMemo(()=>{const n=Object.values(K).map(s=>{const d=s.symbol.replace("USDT","");return{code:d,name:d,icon:"fas fa-coins",color:"#F3BA2F",symbol:s.symbol,price:s.numericPrice}});return n.find(s=>s.code==="USDT")||n.push({code:"USDT",name:"USDT",icon:"fas fa-dollar-sign",color:"#26A17B",symbol:"USDT",price:1}),n},[K]),B=r.useCallback(()=>{if(U.current)return;const n=j.find(a=>a.code===o),s=j.find(a=>a.code===t);if(!n||!s)return;const d=n.price,m=s.price;if(d&&m){const a=d/m;de(a),Y(l*a),he(Date.now())}},[o,t,l,j]);r.useEffect(()=>{B()},[B]),r.useEffect(()=>{const n=setInterval(()=>{B()},1e3);return()=>clearInterval(n)},[B]);const ve=n=>{const s=parseFloat(n.target.value)||0;E(s)},ye=()=>{E(x[o]||0)},je=n=>{ue==="from"?V(n):O(n),P(!1),H("")},re=n=>{pe(n),P(!0)},Ae=()=>{const n=o;V(t),O(n)},Ne=r.useMemo(()=>l*.001,[l]),we=r.useMemo(()=>k-k*.001,[k]),Fe=()=>{y&&(Z(Ne),ee(we),h(!0))},Ce=()=>{c(ce.doClose()),E(1),Y(0),ee(0),Z(0),c(W.doFetch())},Se=()=>{y&&(ne(!0),U.current=!0,setTimeout(()=>{const n={user:le.id,fromSymbol:o,fromAmount:l,toSymbol:t,coinName:t,toAmount:z.toFixed(8),status:"available"};c(ce.doCreate(n)),oe(s=>({...s,[o]:(s[o]||0)-l,[t]:(s[t]||0)+z})),U.current=!1,ne(!1),h(!1),setTimeout(()=>{c(W.doFetch())},500)},2e3))},ke=j.filter(n=>n.code.toLowerCase().includes(M.toLowerCase())||n.name.toLowerCase().includes(M.toLowerCase())),R=n=>j.find(s=>s.code===n),A=n=>{const s=R(n);return s?s.price:null},N=n=>{be(s=>({...s,[n]:!0}))},ze=()=>[...Array(10)].map((n,s)=>e.jsxs("div",{className:"currency-item-placeholder",children:[e.jsx("div",{className:"currency-item-icon-placeholder shimmer"}),e.jsxs("div",{className:"currency-item-info-placeholder",children:[e.jsx("div",{className:"placeholder-line shimmer",style:{width:"60%",height:"16px",marginBottom:"8px"}}),e.jsx("div",{className:"placeholder-line shimmer",style:{width:"40%",height:"12px"}})]}),e.jsxs("div",{className:"currency-item-price-placeholder",children:[e.jsx("div",{className:"placeholder-line shimmer",style:{width:"70px",height:"16px",marginBottom:"8px"}}),e.jsx("div",{className:"placeholder-line shimmer",style:{width:"50px",height:"12px"}})]})]},s)),Be=Date.now()-xe<3e3;return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"container",children:[e.jsx(Me,{title:"Convert Crypto"}),L&&e.jsxs("div",{className:"loading-overlay",children:[e.jsx("div",{className:"loading-spinner-large"}),e.jsx("span",{children:"Loading latest prices..."})]}),J&&e.jsxs("div",{className:"error-banner",children:[e.jsx("i",{className:"fas fa-exclamation-triangle"}),e.jsx("span",{children:J})]}),e.jsxs("div",{className:"conversion-box",children:[e.jsxs("div",{className:"amount-input",children:[e.jsxs("div",{className:"input-header",children:[e.jsx("div",{className:"input-label",children:"You send"}),e.jsxs("div",{className:"balance-display",children:["Balance: ",x[o]||0," ",o,e.jsx("button",{className:"max-button",onClick:ye,children:"MAX"})]})]}),e.jsxs("div",{className:"input-field",children:[e.jsx("input",{type:"number",value:l,onChange:ve,min:0,step:"0.00000001"}),e.jsxs("div",{className:"currency-selector",onClick:()=>re("from"),children:[e.jsx("div",{className:"currency-icon",style:{backgroundColor:((te=R(o))==null?void 0:te.color)||"#F3BA2F"},children:b[o]?e.jsx("div",{className:"currency-icon-fallback",children:o.charAt(0)}):e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${o}.png`,style:{width:25,height:25},alt:o,onError:()=>N(o)})}),e.jsx("div",{className:"currency-name",children:o}),e.jsx("i",{className:"fas fa-chevron-down"})]})]}),e.jsx("div",{className:"currency-price",children:A(o)?e.jsxs(e.Fragment,{children:["1 ",o," = $",(se=A(o))==null?void 0:se.toLocaleString("en-US",{maximumFractionDigits:2})]}):e.jsx(e.Fragment,{children:" "})}),!y&&l>0&&e.jsxs("div",{className:"error-text",children:[e.jsx("i",{className:"fas fa-exclamation-circle"}),"Insufficient balance"]})]}),e.jsx("div",{className:"switch-container",children:e.jsx("div",{className:"switch-btn",onClick:Ae,children:e.jsx("i",{className:"fas fa-exchange-alt"})})}),e.jsxs("div",{className:"amount-input",children:[e.jsxs("div",{className:"input-header",children:[e.jsx("div",{className:"input-label",children:"You receive"}),e.jsxs("div",{className:"balance-display",children:["Balance: ",x[t]||0," ",t]})]}),e.jsxs("div",{className:"input-field",children:[e.jsx("input",{type:"number",value:k.toFixed(8),readOnly:!0}),e.jsxs("div",{className:"currency-selector",onClick:()=>re("to"),children:[e.jsx("div",{className:"currency-icon",style:{backgroundColor:((ae=R(t))==null?void 0:ae.color)||"#F3BA2F"},children:b[t]?e.jsx("div",{className:"currency-icon-fallback",children:t.charAt(0)}):e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${t}.png`,style:{width:25,height:25},alt:t,onError:()=>N(t)})}),e.jsx("div",{className:"currency-name",children:t}),e.jsx("i",{className:"fas fa-chevron-down"})]})]}),e.jsx("div",{className:"currency-price",children:A(t)?e.jsxs(e.Fragment,{children:["1 ",t," = $",(ie=A(t))==null?void 0:ie.toLocaleString("en-US",{maximumFractionDigits:2})]}):e.jsx(e.Fragment,{children:" "})})]}),e.jsxs("div",{className:"conversion-result",children:[e.jsx("div",{className:"result-label",children:"Estimated conversion"}),e.jsxs("div",{className:"result-amount",children:["1 ",o," = ",G.toFixed(8)," ",t,!Be&&e.jsx("span",{className:"mini-loader"})]}),e.jsxs("div",{className:"result-equivalent",children:["$",(l*(A(o)||0)).toLocaleString("en-US",{maximumFractionDigits:2})]})]}),e.jsx("button",{className:"convert-btn",onClick:Fe,disabled:L||l<=0||!y||o===t,children:o===t?"Select different currencies":y?"Convert Now":"Insufficient balance"}),e.jsxs("div",{className:"last-updated",children:[e.jsx("i",{className:"fas fa-sync-alt"}),"Prices update in real-time"]})]})]}),me&&e.jsx("div",{className:"currency-modal",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("div",{className:"modal-title",children:"Select Currency"}),e.jsx("div",{className:"close-modal",onClick:()=>P(!1),children:"×"})]}),e.jsxs("div",{className:"search-box",children:[e.jsx("i",{className:"fas fa-search"}),e.jsx("input",{type:"text",placeholder:"Search currencies...",value:M,onChange:n=>H(n.target.value)})]}),e.jsx("ul",{className:"currency-list",children:L?ze():ke.map(n=>e.jsxs("li",{className:"currency-item",onClick:()=>je(n.code),children:[e.jsx("div",{className:"currency-item-icon",style:{backgroundColor:n.color},children:b[n.code]?e.jsx("div",{className:"currency-icon-fallback",children:n.code.charAt(0)}):e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${n.code}.png`,style:{width:40,height:40},alt:n.code,onError:()=>N(n.code)})}),e.jsxs("div",{className:"currency-item-info",children:[e.jsx("div",{className:"currency-item-name",children:n.code}),e.jsx("div",{className:"currency-item-full",children:n.name})]}),e.jsxs("div",{className:"currency-item-details",children:[e.jsxs("div",{className:"currency-item-price",children:["$",n.price.toLocaleString("en-US",{maximumFractionDigits:2})]}),e.jsxs("div",{className:"currency-item-balance",children:["Balance: ",x[n.code]||0," ",n.code]})]})]},n.code))})]})}),_&&e.jsx(Le,{isOpen:_,onClose:Ce,type:"convert",amount:Number(z).toFixed(8),coinType:t}),ge&&e.jsxs("div",{className:"confirmation-modal",children:[e.jsx("div",{className:"modal-overlay",onClick:()=>!g&&h(!1)}),e.jsxs("div",{className:"modal-dialog",children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{children:"Confirm Conversion"}),e.jsx("button",{className:"close-btn",onClick:()=>!g&&h(!1),children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsxs("div",{className:"modal-body",children:[e.jsxs("div",{className:"conversion-summary",children:[e.jsxs("div",{className:"conversion-from",children:[e.jsxs("div",{className:"currency-amount",children:[e.jsx("span",{className:"amount",children:l}),e.jsx("span",{className:"currency",children:o})]}),e.jsx("div",{className:"currency-icon",children:b[o]?e.jsx("div",{className:"currency-icon-fallback large",children:o.charAt(0)}):e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${o}.png`,alt:o,onError:()=>N(o)})})]}),e.jsx("div",{className:"conversion-arrow",children:e.jsx("i",{className:"fas fa-arrow-down"})}),e.jsxs("div",{className:"conversion-to",children:[e.jsxs("div",{className:"currency-amount",children:[e.jsx("span",{className:"amount",children:z.toFixed(8)}),e.jsx("span",{className:"currency",children:t})]}),e.jsx("div",{className:"currency-icon",children:b[t]?e.jsx("div",{className:"currency-icon-fallback large",children:t.charAt(0)}):e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${t}.png`,alt:t,onError:()=>N(t)})})]})]}),e.jsxs("div",{className:"conversion-details",children:[e.jsx("h3",{children:"Conversion Details"}),e.jsxs("div",{className:"detail-item",children:[e.jsx("span",{className:"detail-label",children:"Exchange Rate"}),e.jsxs("span",{className:"detail-value",children:["1 ",o," = ",G.toFixed(8)," ",t]})]}),e.jsxs("div",{className:"detail-item",children:[e.jsx("span",{className:"detail-label",children:"Network Fee"}),e.jsxs("span",{className:"detail-value",children:[fe.toFixed(8)," ",o]})]}),e.jsxs("div",{className:"detail-item",children:[e.jsx("span",{className:"detail-label",children:"Estimated Arrival"}),e.jsx("span",{className:"detail-value",children:"~30 seconds"})]})]})]}),e.jsxs("div",{className:"modal-footer",children:[e.jsx("button",{className:"confirm-btn",onClick:Se,disabled:g,children:g?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin"}),"Processing Conversion..."]}):e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-check-circle"}),"Confirm Conversion"]})}),e.jsx("button",{className:"cancel-btn",onClick:()=>h(!1),disabled:g,children:"Cancel"})]})]})]}),e.jsx("style",{children:`
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
      `})]})}export{Ge as default};
