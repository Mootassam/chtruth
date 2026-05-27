import{v as E,Z as be,t as l,_ as ge,$ as Ae,u as j,k as ye,D as Fe,X as Ne,o as n,E as je,Y as ve,a7 as se,j as e,L as ae,V as Se}from"./index-580aaa36.js";import{u as ke,y as Ce,c as re,F as De}from"./FormErrors-712ebf47.js";import{y as b}from"./yupFormSchemas-c6792fb1.js";import{F as T}from"./FieldFormItem-e38a82ad.js";import{S as Be}from"./sucessModal-76679ea9.js";import{u as ze}from"./useDispatch-18333ad0.js";const v=i=>i.withdraw.form,Ie=E([v],i=>i.record),Ee=E([v],i=>!!i.initLoading),Re=E([v],i=>!!i.saveLoading),Me=E([v],i=>!!i.withdrawModal),ne={selectInitLoading:Ee,selectSaveLoading:Re,selectRecord:Ie,selectModal:Me,selectRaw:v},W=["USDT","ETH","BTC","USDC","DAI","SHIB","XRP","TRX","SOL","BNB","DOGE"],Ue={BTC:100,SOL:100,XRP:100,ETH:50,USDC:50,USDT:50},Le=50,ie=5;function I(i){return Ue[i==null?void 0:i.toUpperCase()]??Le}const Te={USDT:2,ETH:6,BTC:8,USDC:2,DAI:2,SHIB:0,XRP:2,TRX:2,SOL:4,BNB:6,DOGE:2},We=be().shape({orderNo:b.string(l("entities.withdraw.fields.orderNo")),currency:b.string(l("entities.withdraw.fields.currency")),withdrawAmount:ge().typeError(l("pages.withdraw.errors.amountNumber")).required(l("pages.withdraw.errors.amountRequired")).test("positive",l("pages.withdraw.errors.amountPositive"),i=>typeof i=="number"&&i>0),withdrawPassword:Ae().required("Withdraw password is required"),fee:b.decimal(l("entities.withdraw.fields.fee")),totalAmount:b.decimal(l("entities.withdraw.fields.totalAmount")),auditor:b.relationToOne(l("entities.withdraw.fields.auditor")),acceptTime:b.datetime(l("entities.withdraw.fields.acceptTime")),status:b.enumerator(l("entities.withdraw.fields.status"),{options:["pending","canceled","success"]})});function Ge(){var ee;const i=ze(),S=j(ye.selectCurrentUser),R=j(Fe.selectRows)||[],V=j(ne.selectModal),m=j(Ne.selectRows),P=j(ne.selectSaveLoading),[oe,$]=n.useState(""),[Ve,k]=n.useState(""),[s,M]=n.useState(""),[h,F]=n.useState(""),[H,O]=n.useState(null),[X,Y]=n.useState(!1),[q,C]=n.useState(!1),[U,de]=n.useState(!1),[c,le]=n.useState({}),[D,G]=n.useState(!1);n.useEffect(()=>{i(je.doFetch("exchange"))},[i]),n.useEffect(()=>{i(ve.doFetch())},[i]),n.useEffect(()=>{const t=async()=>{try{G(!0);const r=await Se.get("https://min-api.cryptocompare.com/data/pricemulti",{params:{fsyms:W.join(","),tsyms:"USD"}});if(r.data&&r.data.Response!=="Error"){const p={};W.forEach(o=>{var te;(te=r.data[o])!=null&&te.USD&&(p[o]=r.data[o].USD)}),le(p)}}catch(r){console.error("Failed to fetch exchange rates:",r)}finally{G(!1)}};t();const a=setInterval(t,5*60*1e3);return()=>clearInterval(a)},[]),n.useEffect(()=>{if(m&&m.length>0&&!s){const t=m[0],a=t.symbol||t.id;M(a),d.setValue("currency",a),t.network&&t.network.length>0&&F(t.network[0]._id||t.network[0].name)}},[m]),n.useEffect(()=>{var t,a;if(s&&R.length){const r=R.find(o=>String(o.symbol).toUpperCase()===String(s).toUpperCase());O(r||null);const p=((a=(t=S==null?void 0:S.wallet)==null?void 0:t[s])==null?void 0:a.address)||"";k(p),d.setValue("currency",s),p&&d.setValue("withdrawAdress",p)}else O(null),k(""),d.setValue("currency",""),d.setValue("withdrawAdress","")},[s,R,S]);const L={orderNo:"",currency:"",withdrawAmount:"",withdrawPassword:"",fee:"",totalAmount:"",auditor:"",acceptTime:"",status:"pending",withdrawAdress:""},d=ke({resolver:Ce.yupResolver(We),mode:"all",defaultValues:L}),ce=re({control:d.control,name:"withdrawAmount"});re({control:d.control,name:"currency"});const u=Number(ce),g=!Number.isNaN(u)&&isFinite(u),A=H&&Number(H.amount)||0,{minInCurrency:y,feeInCurrency:w}=n.useMemo(()=>{if(!s||!c[s])return{minInCurrency:0,feeInCurrency:0};const t=c[s],a=I(s)/t,r=ie/t;return{minInCurrency:a,feeInCurrency:r}},[s,c]),B=n.useMemo(()=>!m||!s?null:m.find(t=>{const a=t.symbol||t.id||"";return String(a).toUpperCase()===String(s).toUpperCase()}),[m,s]),f=(B==null?void 0:B.network)||[];n.useEffect(()=>{if(f.length>0){const t=f[0];F(t._id||t.name),C(!1)}else F("")},[B,f]);const N=g?Math.max(u-w,0):0,_=n.useCallback((t,a)=>{if(typeof t!="number"||!isFinite(t)||t===0)return"0";const r=a!==void 0?a:Te[s]||2;return t>0&&t<1e-6?t.toFixed(r>8?r:8):new Intl.NumberFormat("en-US",{minimumFractionDigits:0,maximumFractionDigits:r}).format(t)},[s]),x=n.useCallback(t=>typeof t!="number"||!isFinite(t)||t===0?"$0.00":t>0&&t<.01?`$${t.toFixed(6)}`:new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:6}).format(t),[]),Z=n.useCallback(t=>`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${t?t.toUpperCase():""}.png`,[]),pe=n.useCallback(t=>{F(t._id||t.name),C(!1)},[]),z=n.useCallback(()=>{if(!s)return{disabled:!0,label:l("pages.withdraw.validation.selectCurrency"),reason:"selectCurrency"};if(f.length>0&&!h)return{disabled:!0,label:l("pages.withdraw.validation.selectNetwork"),reason:"selectNetwork"};if(!g||u<=0)return{disabled:!0,label:l("pages.withdraw.validation.enterAmount"),reason:"enterAmount"};if(u<y){const r=_(y);return{disabled:!0,label:l("pages.withdraw.validation.belowMin",r,s),reason:"belowMin"}}if(u>A)return{disabled:!0,label:l("pages.withdraw.validation.insufficientBalance"),reason:"insufficientBalance"};if(u+w>A)return{disabled:!0,label:l("pages.withdraw.validation.insufficientForFee"),reason:"insufficientForFee"};const t=d.getValues("withdrawAdress");if(!t||t.trim()==="")return{disabled:!0,label:l("pages.withdraw.validation.enterAddress"),reason:"enterAddress"};const a=d.getValues("withdrawPassword");return!a||a.trim()===""?{disabled:!0,label:"Enter withdraw password",reason:"enterPassword"}:{disabled:!1,label:l("pages.withdraw.confirmWithdrawal"),reason:"ok"}},[s,f,h,g,u,y,A,w,d,_])(),we=n.useCallback(()=>{i(se.doClose()),d.reset(L),M(""),k(""),$(""),F("")},[i,d,L]),me=n.useCallback(async t=>{if(!z.disabled)try{t.currency=s;const a=new Date,r=`${a.getFullYear()}${String(a.getMonth()+1).padStart(2,"0")}${String(a.getDate()).padStart(2,"0")}`,p=Math.floor(Math.random()*1e7).toString().padStart(7,"0");t.orderNo=`RE${r}${p}`;const o=Number(t.withdrawAmount)||0;t.fee=w,t.totalAmount=o-w,t.status="pending",t.network=h,$(t.totalAmount.toString()),await i(se.doCreate(t))}catch(a){console.error("Withdrawal submission error:",a)}},[s,w,h,z.disabled,i]),ue=n.useCallback(t=>{const a=t.symbol||t.id;M(a),d.setValue("currency",a),d.setValue("withdrawAmount",""),d.setValue("withdrawAdress",""),Y(!1),C(!1)},[d]),J=n.useMemo(()=>!g||!c[s]?0:u*c[s],[u,s,c,g]),_e=n.useMemo(()=>c[s]?w*c[s]:0,[w,s,c]),K=n.useMemo(()=>c[s]?N*c[s]:0,[N,s,c]),fe=n.useMemo(()=>A===0?"0":_(A),[A,_]),Q=n.useMemo(()=>y===0?"0":_(y),[y,_]),he=n.useMemo(()=>w===0?"0":_(w),[w,_]),xe=n.useMemo(()=>N===0?"0":_(N),[N,_]);return e.jsxs("div",{className:"wd__container",children:[e.jsx("div",{className:"wd__header",children:e.jsxs("div",{className:"wd__nav-bar",children:[e.jsx(ae,{to:"/wallets",className:"wd__back-arrow remove_blue",children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("div",{className:"wd__page-title",children:"Withdraw"}),e.jsx(ae,{className:"wd__header-icon remove_blue",to:"/history",children:e.jsx("i",{className:"fas fa-receipt"})})]})}),e.jsx("div",{className:"wd__content-card",children:e.jsx("div",{className:"wd__content",children:e.jsxs("div",{className:"wd__form-section",children:[e.jsxs("div",{className:"wd__input-field",children:[e.jsx("label",{className:"wd__input-label",children:"Select currency"}),e.jsxs("div",{className:"wd__select-wrapper",children:[e.jsxs("div",{className:"wd__select-trigger",onClick:()=>Y(!X),children:[s?e.jsxs("div",{className:"wd__selected-display",children:[e.jsx("div",{className:"wd__currency-icon",children:e.jsx("img",{src:Z(s),alt:s,onError:t=>{const a=t.target;a.onerror=null,a.style.display="none";const r=a.parentElement;r&&(r.textContent=s.charAt(0),r.style.background="#F3BA2F",r.style.color="#000000",r.style.fontSize="14px",r.style.fontWeight="bold",r.style.display="inline-flex",r.style.alignItems="center",r.style.justifyContent="center",r.style.width="28px",r.style.height="28px",r.style.borderRadius="8px")}})}),e.jsx("span",{className:"wd__currency-text",children:s}),D?e.jsx("span",{className:"wd__rate-loading",children:"Loading rates..."}):c[s]?e.jsxs("span",{className:"wd__currency-rate",children:["(1 ",s," ≈ ",x(c[s]),")"]}):null]}):e.jsx("span",{className:"wd__placeholder",children:"Select Currency"}),e.jsx("i",{className:"fas fa-chevron-down wd__dropdown-arrow"})]}),X&&e.jsx("div",{className:"wd__dropdown",children:m&&m.length>0?m.filter(t=>W.includes(t.symbol||t.id)).map(t=>{const a=t.symbol||t.id;return e.jsxs("div",{className:"wd__dropdown-option",onClick:()=>ue(t),children:[e.jsx("div",{className:"wd__currency-icon",children:e.jsx("img",{src:Z(a),alt:a,onError:r=>{const p=r.target;p.onerror=null,p.style.display="none";const o=p.parentElement;o&&(o.textContent=a.charAt(0),o.style.background="#F3BA2F",o.style.color="#000000",o.style.fontSize="14px",o.style.fontWeight="bold",o.style.display="inline-flex",o.style.alignItems="center",o.style.justifyContent="center",o.style.width="28px",o.style.height="28px",o.style.borderRadius="8px")}})}),e.jsx("span",{className:"wd__currency-text",children:a}),D?e.jsx("span",{className:"wd__rate-loading-small",children:"..."}):c[a]?e.jsxs("span",{className:"wd__currency-rate-small",children:["(",x(c[a]),")"]}):null]},t.id||a)}):e.jsx("div",{className:"wd__no-options",children:"No currencies available"})})]})]}),s&&c[s]&&e.jsx("div",{className:"wd__info-box",children:e.jsxs("div",{className:"wd__info-row",children:[e.jsx("span",{className:"wd__info-label",children:"Minimum withdrawal:"}),e.jsxs("span",{className:"wd__info-value",children:[Q," ",s," (",x(I(s)),")"]})]})}),s&&f.length>0&&e.jsxs("div",{className:"wd__input-field",children:[e.jsx("label",{className:"wd__input-label",children:"Withdraw network"}),e.jsxs("div",{className:"wd__select-wrapper",children:[e.jsxs("div",{className:"wd__select-trigger",onClick:()=>C(!q),children:[e.jsxs("div",{className:"wd__selected-display",children:[e.jsx("i",{className:"fas fa-network-wired wd__network-icon"}),e.jsx("span",{className:"wd__network-text",children:((ee=f.find(t=>t._id===h||t.id===h||t.name===h))==null?void 0:ee.name)||"Select Network"})]}),e.jsx("i",{className:"fas fa-chevron-down wd__dropdown-arrow"})]}),q&&e.jsx("div",{className:"wd__dropdown",children:f.map(t=>e.jsxs("div",{className:"wd__dropdown-option",onClick:()=>pe(t),children:[e.jsx("i",{className:"fas fa-network-wired wd__network-icon-small"}),e.jsx("span",{className:"wd__network-text",children:t.name})]},t._id||t.id||t.name))})]})]}),e.jsx(De,{...d,children:e.jsxs("form",{onSubmit:d.handleSubmit(me),children:[e.jsxs("div",{className:"wd__input-field",children:[e.jsx("label",{className:"wd__input-label",children:"Withdraw address"}),e.jsx("div",{className:"wd__input-wrapper",children:e.jsx(T,{name:"withdrawAdress",type:"text",className:"wd__address-field",placeholder:"Enter your wallet address",onChange:t=>k(t.target.value)})}),e.jsx("br",{})]}),e.jsxs("div",{className:"wd__input-field",children:[e.jsx("label",{className:"wd__input-label",children:"Amount of coins withdrawn"}),e.jsx("div",{className:"wd__input-wrapper",children:e.jsx(T,{name:"withdrawAmount",type:"number",className:"wd__amount-field",placeholder:"0.0"})}),e.jsxs("div",{className:"wd__balance-info",children:[e.jsxs("div",{className:"wd__balance-text",children:["Available: ",e.jsxs("span",{className:"wd__balance-amount",children:[fe," ",s]})]}),g&&J>0&&e.jsxs("div",{className:"wd__usd-value",children:["≈ ",x(J)]})]})]}),e.jsxs("div",{className:"wd__fee-section",children:[e.jsxs("div",{className:"wd__fee-row",children:[e.jsx("div",{className:"wd__fee-label",children:"Withdrawal fee:"}),e.jsxs("div",{className:"wd__fee-value",children:[he," ",s,e.jsxs("span",{className:"wd__fee-usd",children:[" (",x(_e),")"]})]})]}),e.jsxs("div",{className:"wd__fee-row",children:[e.jsx("div",{className:"wd__fee-label",children:"Minimum withdrawal:"}),e.jsxs("div",{className:"wd__fee-value",children:[Q," ",s,e.jsxs("span",{className:"wd__fee-usd",children:[" (",x(I(s)),")"]})]})]}),e.jsxs("div",{className:"wd__fee-row",children:[e.jsx("div",{className:"wd__fee-label",children:"You will receive:"}),e.jsxs("div",{className:"wd__fee-value wd__receive-amount",children:[xe," ",s,K>0&&e.jsxs("span",{className:"wd__receive-usd",children:[" (≈ ",x(K),")"]})]})]})]}),e.jsxs("div",{className:"wd__input-field",children:[e.jsx("label",{className:"wd__input-label",children:"Withdraw password"}),e.jsxs("div",{className:"wd__input-wrapper",style:{position:"relative"},children:[e.jsx(T,{name:"withdrawPassword",type:U?"text":"password",className:"wd__address-field",placeholder:"Enter your withdraw password"}),e.jsx("button",{type:"button",onClick:()=>de(t=>!t),style:{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"#AAAAAA",cursor:"pointer",fontSize:15,padding:0},"aria-label":U?"Hide password":"Show password",children:e.jsx("i",{className:U?"fas fa-eye-slash":"fas fa-eye"})})]})]}),e.jsxs("div",{className:"wd__notice-section",children:[e.jsx("div",{className:"wd__notice-title",children:"Important notice"}),e.jsxs("div",{className:"wd__notice-content",children:[e.jsxs("div",{className:"wd__notice-item",children:["1. Minimum withdrawal amount is $",I(s)," USD equivalent in selected currency."]}),e.jsxs("div",{className:"wd__notice-item",children:["2. Withdrawal fee is $",ie," USD equivalent in selected currency."]}),e.jsx("div",{className:"wd__notice-item",children:"3. After submitting the withdraw application, the money will arrive within 24 hours. If the money does not arrive after the expected withdraw time, please consult the online customer service."}),e.jsx("div",{className:"wd__notice-item",children:"4. After submitting the withdraw application, the funds are frozen because the withdraw is in progress and the funds are temporarily held by the system. This does not mean that you have lost the asset or that there is an abnormality with the asset."})]})]}),e.jsx("button",{type:"submit",className:"wd__submit-btn",disabled:z.disabled||P||D,children:P?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin",style:{marginRight:"8px"}}),"Processing..."]}):D?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin",style:{marginRight:"8px"}}),"Loading rates..."]}):z.label})]})})]})})}),V&&e.jsx(Be,{isOpen:V,onClose:we,type:"withdraw",amount:oe,coinType:s}),e.jsx("style",{children:`
        /* ── Root Container ── */
        .wd__container {
          max-width: 400px;
          margin: 0 auto;
          min-height: 100vh;
          background: #000000;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #FFFFFF;
        }

        /* ── Header / Top Bar ── */
        .wd__header {
          display: flex;
          align-items: center;
          padding: 0 16px;
          height: 56px;
          background: #1A1A1A;
          border-bottom: 1px solid #2a2a2e;
          position: sticky;
          top: 0;
          z-index: 50;
        }
        .wd__nav-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        .wd__back-arrow {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: #1A1A1A;
          border: 1px solid #2a2a2e;
          color: #FFFFFF;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }
        .wd__back-arrow:hover { 
          background: #2a2a2e; 
          border-color: #F3BA2F; 
          color: #F3BA2F; 
        }
        .wd__page-title {
          color: #FFFFFF;
          font-size: 18px;
          font-weight: bold;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }
        .wd__header-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: #1A1A1A;
          border: 1px solid #2a2a2e;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          color: #FFFFFF !important;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .wd__header-icon:hover { 
          border-color: #F3BA2F; 
          color: #F3BA2F !important; 
          background: #2a2a2e;
        }

        /* ── Content ── */
        .wd__content-card {
          min-height: calc(100vh - 56px);
        }
        .wd__content { 
          width: 100%; 
        }
        .wd__form-section { 
          display: flex; 
          flex-direction: column; 
          gap: 20px;
          padding: 20px 16px;
        }

        /* ── Labels ── */
        .wd__input-label {
          display: block;
          font-size: 13px;
          font-weight: bold;
          color: #AAAAAA;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 10px;
        }

        /* ── Select Triggers ── */
        .wd__select-trigger {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          background: #1A1A1A;
          border: 1px solid #2a2a2e;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          min-height: 52px;
        }
        .wd__select-trigger:hover {
          background: #2a2a2e;
          border-color: #F3BA2F;
        }

        /* ── Selected Display ── */
        .wd__selected-display {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
          min-width: 0;
        }
        .wd__currency-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: #000000;
          border: 1px solid #2a2a2e;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 12px;
          font-weight: 700;
          color: #FFFFFF;
        }
        .wd__currency-icon img { 
          width: 100%; 
          height: 100%; 
          object-fit: contain; 
        }
        .wd__currency-text {
          font-size: 16px;
          font-weight: 700;
          color: #FFFFFF;
        }
        .wd__currency-rate {
          font-size: 12px;
          color: #AAAAAA;
          margin-left: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .wd__rate-loading { 
          font-size: 12px; 
          color: #AAAAAA; 
        }
        .wd__placeholder { 
          font-size: 14px; 
          color: #666666; 
        }
        .wd__dropdown-arrow { 
          color: #AAAAAA; 
          font-size: 12px; 
          flex-shrink: 0; 
          transition: transform 0.3s ease; 
        }

        /* ── Dropdowns ── */
        .wd__dropdown {
          position: absolute;
          top: calc(100% + 6px);
          left: 0;
          right: 0;
          background: #1A1A1A;
          border: 1px solid #2a2a2e;
          border-radius: 12px;
          overflow: hidden;
          z-index: 100;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          max-height: 240px;
          overflow-y: auto;
        }
        .wd__dropdown-option {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          border-bottom: 1px solid #2a2a2e;
        }
        .wd__dropdown-option:last-child { 
          border-bottom: none; 
        }
        .wd__dropdown-option:hover { 
          background: #2a2a2e; 
        }
        .wd__currency-rate-small { 
          font-size: 11px; 
          color: #AAAAAA; 
          margin-left: auto; 
        }
        .wd__rate-loading-small { 
          font-size: 11px; 
          color: #AAAAAA; 
          margin-left: auto; 
        }
        .wd__network-icon { 
          font-size: 16px; 
          color: #F3BA2F; 
          flex-shrink: 0; 
        }
        .wd__network-icon-small { 
          font-size: 14px; 
          color: #F3BA2F; 
          flex-shrink: 0; 
        }
        .wd__network-text { 
          font-size: 14px; 
          font-weight: 600; 
          color: #FFFFFF; 
        }
        .wd__no-options { 
          padding: 16px; 
          text-align: center; 
          color: #AAAAAA; 
          font-size: 13px; 
        }

        /* Select wrapper for positioning */
        .wd__select-wrapper { 
          position: relative; 
        }

        /* ── Info Box ── */
        .wd__info-box {
          background: rgba(243, 186, 47, 0.08);
          border: 1px solid rgba(243, 186, 47, 0.25);
          border-radius: 12px;
          padding: 16px;
          box-shadow: 0 2px 8px rgba(243, 186, 47, 0.1);
        }
        .wd__info-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          flex-wrap: wrap;
        }
        .wd__info-label { 
          font-size: 13px; 
          color: #F3BA2F; 
          font-weight: 600; 
        }
        .wd__info-value { 
          font-size: 13px; 
          color: #FFFFFF; 
          font-weight: 700; 
        }

        /* ── Input Fields ── */
        .wd__input-wrapper { 
          position: relative; 
        }
        .wd__input-field input,
        .wd__input-field textarea {
          width: 100%;
          padding: 14px 16px !important;
          background: #1A1A1A !important;
          border: 1px solid #2a2a2e !important;
          border-radius: 12px !important;
          color: #FFFFFF !important;
          font-size: 15px !important;
          font-family: inherit !important;
          outline: none !important;
          transition: all 0.3s ease !important;
          box-sizing: border-box;
          box-shadow: none !important;
        }
        .wd__input-field input::placeholder,
        .wd__input-field textarea::placeholder { 
          color: #666666 !important; 
        }
        .wd__input-field input:hover,
        .wd__input-field textarea:hover {
          border-color: #F3BA2F !important;
        }
        .wd__input-field input:focus,
        .wd__input-field textarea:focus {
          border-color: #F3BA2F !important;
          background: #2a2a2e !important;
          box-shadow: 0 0 0 2px rgba(243, 186, 47, 0.1) !important;
        }
        .wd__input-field .is-invalid,
        .wd__input-field input.is-invalid {
          border-color: #FF4444 !important;
        }
        .wd__input-field .invalid-feedback {
          font-size: 12px !important;
          color: #FF4444 !important;
          margin-top: 6px;
          font-weight: 500;
        }

        /* ── Balance Info ── */
        .wd__balance-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 8px;
          padding: 0 2px;
        }
        .wd__balance-text { 
          font-size: 12px; 
          color: #AAAAAA; 
          padding-bottom: 12px; 
        }
        .wd__balance-amount { 
          color: #FFFFFF; 
          font-weight: 600; 
        }
        .wd__usd-value { 
          font-size: 12px; 
          color: #AAAAAA; 
        }

        /* ── Fee Section ── */
        .wd__fee-section {
          background: #1A1A1A;
          border: 1px solid #2a2a2e;
          border-radius: 12px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
        }
        .wd__fee-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          flex-wrap: wrap;
        }
        .wd__fee-label { 
          font-size: 13px; 
          color: #AAAAAA; 
        }
        .wd__fee-value { 
          font-size: 13px; 
          color: #FFFFFF; 
          font-weight: 600; 
          text-align: right; 
        }
        .wd__fee-usd { 
          color: #AAAAAA; 
          font-weight: 400; 
          font-size: 12px; 
        }
        .wd__receive-amount { 
          color: #F3BA2F; 
        }
        .wd__receive-usd { 
          color: #F3BA2F; 
          opacity: 0.7; 
          font-weight: 400; 
        }

        /* ── Notice Section ── */
        .wd__notice-section {
          background: rgba(243, 186, 47, 0.05);
          border: 1px solid rgba(243, 186, 47, 0.15);
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 20px;
        }
        .wd__notice-title {
          font-size: 14px;
          font-weight: bold;
          color: #F3BA2F;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .wd__notice-title::before {
          content: '⚠';
          font-size: 14px;
        }
        .wd__notice-content { 
          display: flex; 
          flex-direction: column; 
          gap: 8px; 
        }
        .wd__notice-item {
          font-size: 12px;
          color: #AAAAAA;
          line-height: 1.6;
          padding-left: 2px;
        }

        /* ── Submit Button ── */
        .wd__submit-btn {
          width: 100%;
          padding: 16px;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          background: linear-gradient(135deg, #F3BA2F, #FF9800);
          color: #000000;
          letter-spacing: 0.2px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 2px 8px rgba(243, 186, 47, 0.3);
        }
        .wd__submit-btn:hover:not(:disabled) { 
          background: linear-gradient(135deg, #FF9800, #F3BA2F);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(243, 186, 47, 0.4);
        }
        .wd__submit-btn:active:not(:disabled) { 
          transform: scale(0.98); 
        }
        .wd__submit-btn:disabled {
          background: #2a2a2e;
          color: #666666;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        /* ── Scrollbar ── */
        .wd__dropdown::-webkit-scrollbar {
          width: 4px;
        }
        .wd__dropdown::-webkit-scrollbar-track {
          background: transparent;
        }
        .wd__dropdown::-webkit-scrollbar-thumb {
          background: #2a2a2e;
          border-radius: 2px;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .wd__container {
            max-width: 100%;
          }
          .wd__form-section {
            padding: 16px 12px;
          }
          .wd__page-title {
            font-size: 16px;
          }
        }
      `})]})}export{Ge as default};
