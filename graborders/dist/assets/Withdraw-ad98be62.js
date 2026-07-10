import{v as M,Z as ve,t as d,_ as je,$ as Se,u as S,k as ke,D as Ce,X as De,o as r,E as Be,Y as Ie,a7 as de,j as e,L as le,O as Ue,q as Ee}from"./index-b5200eee.js";import{u as ze,y as Re,c as ce,F as Me}from"./FormErrors-570a3785.js";import{y as g}from"./yupFormSchemas-3bd68238.js";import{F as V}from"./FieldFormItem-baed0ad1.js";import{S as Te}from"./sucessModal-6b5d6fe4.js";import{u as Le}from"./useDispatch-64d56e5e.js";const k=n=>n.withdraw.form,We=M([k],n=>n.record),$e=M([k],n=>!!n.initLoading),Pe=M([k],n=>!!n.saveLoading),Ve=M([k],n=>!!n.withdrawModal),pe={selectInitLoading:$e,selectSaveLoading:Pe,selectRecord:We,selectModal:Ve,selectRaw:k},we=["USDT","ETH","BTC","USDC","DAI","SHIB","XRP","TRX","SOL","BNB","DOGE"],Oe={BTC:100,SOL:100,XRP:100,ETH:100,BNB:100,DOGE:100,USDC:50,USDT:50},He=50,Xe={XRP:10},Ye=5;function z(n){return Oe[n==null?void 0:n.toUpperCase()]??He}function O(n){return Xe[n==null?void 0:n.toUpperCase()]??Ye}const R=new Set(["USDT","USDC","DAI"]),qe={USDT:2,ETH:6,BTC:8,USDC:2,DAI:2,SHIB:0,XRP:2,TRX:2,SOL:4,BNB:6,DOGE:2},Ge=ve().shape({orderNo:g.string(d("entities.withdraw.fields.orderNo")),currency:g.string(d("entities.withdraw.fields.currency")),withdrawAmount:je().typeError(d("pages.withdraw.errors.amountNumber")).required(d("pages.withdraw.errors.amountRequired")).test("positive",d("pages.withdraw.errors.amountPositive"),n=>typeof n=="number"&&n>0),withdrawPassword:Se().required("Withdraw password is required"),fee:g.decimal(d("entities.withdraw.fields.fee")),totalAmount:g.decimal(d("entities.withdraw.fields.totalAmount")),auditor:g.relationToOne(d("entities.withdraw.fields.auditor")),acceptTime:g.datetime(d("entities.withdraw.fields.acceptTime")),status:g.enumerator(d("entities.withdraw.fields.status"),{options:["pending","canceled","success"]})});function rt(){var re;const n=Le(),C=S(ke.selectCurrentUser),T=S(Ce.selectRows)||[],H=S(pe.selectModal),p=S(De.selectRows),X=S(pe.selectSaveLoading),[ue,Y]=r.useState(""),[Ze,D]=r.useState(""),[a,L]=r.useState(""),[h,v]=r.useState(""),[q,G]=r.useState(null),[Z,J]=r.useState(!1),[K,B]=r.useState(!1),[W,me]=r.useState(!1),[A,_e]=r.useState({}),[I,Q]=r.useState(!1);r.useEffect(()=>{n(Be.doFetch("exchange"))},[n]),r.useEffect(()=>{n(Ie.doFetch())},[n]),r.useEffect(()=>{const t=async()=>{var i;try{Q(!0);const c=Ue.get(),Ne=((i=(await Ee.get(`/tenant/${c}/prices`)).data)==null?void 0:i.data)||{},ne={};we.forEach(ie=>{const P=Ne[`${ie}USDT`],oe=Number(P==null?void 0:P.c);oe>0&&(ne[ie]=oe)}),_e(ne)}catch(c){console.error("Failed to fetch exchange rates:",c)}finally{Q(!1)}};t();const s=setInterval(t,5*60*1e3);return()=>clearInterval(s)},[]),r.useEffect(()=>{if(p&&p.length>0&&!a){const t=p[0],s=t.symbol||t.id;L(s),o.setValue("currency",s),t.network&&t.network.length>0&&v(t.network[0]._id||t.network[0].name)}},[p]),r.useEffect(()=>{var t,s;if(a&&T.length){const i=T.find(l=>String(l.symbol).toUpperCase()===String(a).toUpperCase());G(i||null);const c=((s=(t=C==null?void 0:C.wallet)==null?void 0:t[a])==null?void 0:s.address)||"";D(c),o.setValue("currency",a),c&&o.setValue("withdrawAdress",c)}else G(null),D(""),o.setValue("currency",""),o.setValue("withdrawAdress","")},[a,T,C]);const $={orderNo:"",currency:"",withdrawAmount:"",withdrawPassword:"",fee:"",totalAmount:"",auditor:"",acceptTime:"",status:"pending",withdrawAdress:""},o=ze({resolver:Re.yupResolver(Ge),mode:"all",defaultValues:$}),fe=ce({control:o.control,name:"withdrawAmount"});ce({control:o.control,name:"currency"});const w=Number(fe),F=!Number.isNaN(w)&&isFinite(w),y=q&&Number(q.amount)||0,{minInCurrency:N,feeInCurrency:m,rateAvailable:x}=r.useMemo(()=>{if(!a)return{minInCurrency:0,feeInCurrency:0,rateAvailable:!1};const s=R.has(a.toUpperCase())?1:A[a];return s?{minInCurrency:z(a)/s,feeInCurrency:O(a)/s,rateAvailable:!0}:{minInCurrency:0,feeInCurrency:0,rateAvailable:!1}},[a,A]),U=r.useMemo(()=>!p||!a?null:p.find(t=>{const s=t.symbol||t.id||"";return String(s).toUpperCase()===String(a).toUpperCase()}),[p,a]),_=(U==null?void 0:U.network)||[];r.useEffect(()=>{if(_.length>0){const t=_[0];v(t._id||t.name),B(!1)}else v("")},[U,_]);const j=F?Math.max(w-m,0):0,u=r.useCallback((t,s)=>{if(typeof t!="number"||!isFinite(t)||t===0)return"0";const i=s!==void 0?s:qe[a]||2;return t>0&&t<1e-6?t.toFixed(i>8?i:8):new Intl.NumberFormat("en-US",{minimumFractionDigits:0,maximumFractionDigits:i}).format(t)},[a]),b=r.useCallback(t=>typeof t!="number"||!isFinite(t)||t===0?"$0.00":t>0&&t<.01?`$${t.toFixed(6)}`:new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:6}).format(t),[]),ee=r.useCallback(t=>`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${t?t.toUpperCase():""}.png`,[]),he=r.useCallback(t=>{v(t._id||t.name),B(!1)},[]),E=r.useCallback(()=>{if(!a)return{disabled:!0,label:d("pages.withdraw.validation.selectCurrency"),reason:"selectCurrency"};if(_.length>0&&!h)return{disabled:!0,label:d("pages.withdraw.validation.selectNetwork"),reason:"selectNetwork"};if(!x)return{disabled:!0,label:"Unable to verify minimum amount, please try again",reason:"rateUnavailable"};if(!F||w<=0)return{disabled:!0,label:d("pages.withdraw.validation.enterAmount"),reason:"enterAmount"};if(w<N){const i=u(N);return{disabled:!0,label:d("pages.withdraw.validation.belowMin",i,a),reason:"belowMin"}}if(w>y)return{disabled:!0,label:d("pages.withdraw.validation.insufficientBalance"),reason:"insufficientBalance"};if(w+m>y)return{disabled:!0,label:d("pages.withdraw.validation.insufficientForFee"),reason:"insufficientForFee"};const t=o.getValues("withdrawAdress");if(!t||t.trim()==="")return{disabled:!0,label:d("pages.withdraw.validation.enterAddress"),reason:"enterAddress"};const s=o.getValues("withdrawPassword");return!s||s.trim()===""?{disabled:!0,label:"Enter withdraw password",reason:"enterPassword"}:{disabled:!1,label:d("pages.withdraw.confirmWithdrawal"),reason:"ok"}},[a,_,h,x,F,w,N,y,m,o,u])(),xe=r.useCallback(()=>{n(de.doClose()),o.reset($),L(""),D(""),Y(""),v("")},[n,o,$]),be=r.useCallback(async t=>{if(!E.disabled)try{t.currency=a;const s=new Date,i=`${s.getFullYear()}${String(s.getMonth()+1).padStart(2,"0")}${String(s.getDate()).padStart(2,"0")}`,c=Math.floor(Math.random()*1e7).toString().padStart(7,"0");t.orderNo=`RE${i}${c}`;const l=Number(t.withdrawAmount)||0;t.fee=m,t.totalAmount=l-m,t.status="pending",t.network=h,Y(t.totalAmount.toString()),await n(de.doCreate(t))}catch(s){console.error("Withdrawal submission error:",s)}},[a,m,h,E.disabled,n]),ge=r.useCallback(t=>{const s=t.symbol||t.id;L(s),o.setValue("currency",s),o.setValue("withdrawAmount",""),o.setValue("withdrawAdress",""),J(!1),B(!1)},[o]),f=r.useMemo(()=>a?R.has(a.toUpperCase())?1:A[a]||0:0,[a,A]),te=r.useMemo(()=>!F||!f?0:w*f,[w,f,F]),ae=r.useMemo(()=>f?j*f:0,[j,f]),Ae=r.useMemo(()=>y===0?"0":u(y),[y,u]),se=r.useMemo(()=>x?N===0?"0":u(N):"...",[N,u,x]),Fe=r.useMemo(()=>x?m===0?"0":u(m):"...",[m,u,x]),ye=r.useMemo(()=>j===0?"0":u(j),[j,u]);return e.jsxs("div",{className:"wd__container",children:[e.jsx("div",{className:"wd__header",children:e.jsxs("div",{className:"wd__nav-bar",children:[e.jsx(le,{to:"/wallets",className:"wd__back-arrow remove_blue",children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("div",{className:"wd__page-title",children:"Withdraw"}),e.jsx(le,{className:"wd__header-icon remove_blue",to:"/history",children:e.jsx("i",{className:"fas fa-receipt"})})]})}),e.jsx("div",{className:"wd__content-card",children:e.jsx("div",{className:"wd__content",children:e.jsxs("div",{className:"wd__form-section",children:[e.jsxs("div",{className:"wd__input-field",children:[e.jsx("label",{className:"wd__input-label",children:"Select currency"}),e.jsxs("div",{className:"wd__select-wrapper",children:[e.jsxs("div",{className:"wd__select-trigger",onClick:()=>J(!Z),children:[a?e.jsxs("div",{className:"wd__selected-display",children:[e.jsx("div",{className:"wd__currency-icon",children:e.jsx("img",{src:ee(a),alt:a,onError:t=>{const s=t.target;s.onerror=null,s.style.display="none";const i=s.parentElement;i&&(i.textContent=a.charAt(0),i.style.background="#F3BA2F",i.style.color="#000000",i.style.fontSize="14px",i.style.fontWeight="bold",i.style.display="inline-flex",i.style.alignItems="center",i.style.justifyContent="center",i.style.width="28px",i.style.height="28px",i.style.borderRadius="8px")}})}),e.jsx("span",{className:"wd__currency-text",children:a}),I?e.jsx("span",{className:"wd__rate-loading",children:"Loading rates..."}):f?e.jsxs("span",{className:"wd__currency-rate",children:["(1 ",a," ≈ ",b(f),")"]}):null]}):e.jsx("span",{className:"wd__placeholder",children:"Select Currency"}),e.jsx("i",{className:"fas fa-chevron-down wd__dropdown-arrow"})]}),Z&&e.jsx("div",{className:"wd__dropdown",children:p&&p.length>0?p.filter(t=>we.includes(t.symbol||t.id)).map(t=>{const s=t.symbol||t.id;return e.jsxs("div",{className:"wd__dropdown-option",onClick:()=>ge(t),children:[e.jsx("div",{className:"wd__currency-icon",children:e.jsx("img",{src:ee(s),alt:s,onError:i=>{const c=i.target;c.onerror=null,c.style.display="none";const l=c.parentElement;l&&(l.textContent=s.charAt(0),l.style.background="#F3BA2F",l.style.color="#000000",l.style.fontSize="14px",l.style.fontWeight="bold",l.style.display="inline-flex",l.style.alignItems="center",l.style.justifyContent="center",l.style.width="28px",l.style.height="28px",l.style.borderRadius="8px")}})}),e.jsx("span",{className:"wd__currency-text",children:s}),I?e.jsx("span",{className:"wd__rate-loading-small",children:"..."}):R.has(s.toUpperCase())||A[s]?e.jsxs("span",{className:"wd__currency-rate-small",children:["(",b(R.has(s.toUpperCase())?1:A[s]),")"]}):null]},t.id||s)}):e.jsx("div",{className:"wd__no-options",children:"No currencies available"})})]})]}),a&&x&&e.jsx("div",{className:"wd__info-box",children:e.jsxs("div",{className:"wd__info-row",children:[e.jsx("span",{className:"wd__info-label",children:"Minimum withdrawal:"}),e.jsxs("span",{className:"wd__info-value",children:[se," ",a," (",b(z(a)),")"]})]})}),a&&_.length>0&&e.jsxs("div",{className:"wd__input-field",children:[e.jsx("label",{className:"wd__input-label",children:"Withdraw network"}),e.jsxs("div",{className:"wd__select-wrapper",children:[e.jsxs("div",{className:"wd__select-trigger",onClick:()=>B(!K),children:[e.jsxs("div",{className:"wd__selected-display",children:[e.jsx("i",{className:"fas fa-network-wired wd__network-icon"}),e.jsx("span",{className:"wd__network-text",children:((re=_.find(t=>t._id===h||t.id===h||t.name===h))==null?void 0:re.name)||"Select Network"})]}),e.jsx("i",{className:"fas fa-chevron-down wd__dropdown-arrow"})]}),K&&e.jsx("div",{className:"wd__dropdown",children:_.map(t=>e.jsxs("div",{className:"wd__dropdown-option",onClick:()=>he(t),children:[e.jsx("i",{className:"fas fa-network-wired wd__network-icon-small"}),e.jsx("span",{className:"wd__network-text",children:t.name})]},t._id||t.id||t.name))})]})]}),e.jsx(Me,{...o,children:e.jsxs("form",{onSubmit:o.handleSubmit(be),children:[e.jsxs("div",{className:"wd__input-field",children:[e.jsx("label",{className:"wd__input-label",children:"Withdraw address"}),e.jsx("div",{className:"wd__input-wrapper",children:e.jsx(V,{name:"withdrawAdress",type:"text",className:"wd__address-field",placeholder:"Enter your wallet address",onChange:t=>D(t)})}),e.jsx("br",{})]}),e.jsxs("div",{className:"wd__input-field",children:[e.jsx("label",{className:"wd__input-label",children:"Amount of coins withdrawn"}),e.jsx("div",{className:"wd__input-wrapper",children:e.jsx(V,{className:"wd__amount-field",name:"withdrawAmount",type:"number",step:"any",inputMode:"decimal",placeholder:"0.00"})}),e.jsxs("div",{className:"wd__balance-info",children:[e.jsxs("div",{className:"wd__balance-text",children:["Available: ",e.jsxs("span",{className:"wd__balance-amount",children:[Ae," ",a]})]}),F&&te>0&&e.jsxs("div",{className:"wd__usd-value",children:["≈ ",b(te)]})]})]}),e.jsxs("div",{className:"wd__fee-section",children:[e.jsxs("div",{className:"wd__fee-row",children:[e.jsx("div",{className:"wd__fee-label",children:"Withdrawal fee:"}),e.jsxs("div",{className:"wd__fee-value",children:[Fe," ",a,e.jsxs("span",{className:"wd__fee-usd",children:[" (",b(O(a)),")"]})]})]}),e.jsxs("div",{className:"wd__fee-row",children:[e.jsx("div",{className:"wd__fee-label",children:"Minimum withdrawal:"}),e.jsxs("div",{className:"wd__fee-value",children:[se," ",a,e.jsxs("span",{className:"wd__fee-usd",children:[" (",b(z(a)),")"]})]})]}),e.jsxs("div",{className:"wd__fee-row",children:[e.jsx("div",{className:"wd__fee-label",children:"You will receive:"}),e.jsxs("div",{className:"wd__fee-value wd__receive-amount",children:[ye," ",a,ae>0&&e.jsxs("span",{className:"wd__receive-usd",children:[" (≈ ",b(ae),")"]})]})]})]}),e.jsxs("div",{className:"wd__input-field",children:[e.jsx("label",{className:"wd__input-label",children:"Withdraw password"}),e.jsxs("div",{className:"wd__input-wrapper",style:{position:"relative"},children:[e.jsx(V,{name:"withdrawPassword",type:W?"text":"password",className:"wd__address-field",placeholder:"Enter your withdraw password"}),e.jsx("button",{type:"button",onClick:()=>me(t=>!t),style:{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"#AAAAAA",cursor:"pointer",fontSize:15,padding:0},"aria-label":W?"Hide password":"Show password",children:e.jsx("i",{className:W?"fas fa-eye-slash":"fas fa-eye"})})]})]}),e.jsxs("div",{className:"wd__notice-section",children:[e.jsx("div",{className:"wd__notice-title",children:"Important notice"}),e.jsxs("div",{className:"wd__notice-content",children:[e.jsxs("div",{className:"wd__notice-item",children:["1. Minimum withdrawal amount is $",z(a)," USD equivalent in selected currency."]}),e.jsxs("div",{className:"wd__notice-item",children:["2. Withdrawal fee is $",O(a)," USD equivalent in selected currency."]}),e.jsx("div",{className:"wd__notice-item",children:"3. After submitting the withdraw application, the money will arrive within 24 hours. If the money does not arrive after the expected withdraw time, please consult the online customer service."}),e.jsx("div",{className:"wd__notice-item",children:"4. After submitting the withdraw application, the funds are frozen because the withdraw is in progress and the funds are temporarily held by the system. This does not mean that you have lost the asset or that there is an abnormality with the asset."})]})]}),e.jsx("button",{type:"submit",className:"wd__submit-btn",disabled:E.disabled||X||I,children:X?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin",style:{marginRight:"8px"}}),"Processing..."]}):I?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin",style:{marginRight:"8px"}}),"Loading rates..."]}):E.label})]})})]})})}),H&&e.jsx(Te,{isOpen:H,onClose:xe,type:"withdraw",amount:ue,coinType:a}),e.jsx("style",{children:`
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
      `})]})}export{rt as default};
