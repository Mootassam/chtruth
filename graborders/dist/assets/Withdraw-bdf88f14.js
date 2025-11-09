import{t as j,X as oe,p as a,a1 as ne,_ as de,u as z,k as le,D as ce,o as u,E as me,j as e,L as pe,a5 as Q}from"./index-4cd6ea8b.js";import{S as we}from"./SubHeader-a259f0be.js";import{a as h,u as ue,y as he,d as L,F as xe}from"./FormErrors-7891a2f4.js";import{F as Z}from"./FieldFormItem-cd698a33.js";import{S as fe}from"./sucessModal-f14996ab.js";import{u as ge}from"./useDispatch-1f91c277.js";import"./useNotifications-b773cdf3.js";const F=i=>i.withdraw.form,be=j([F],i=>i.record),Ae=j([F],i=>!!i.initLoading),Fe=j([F],i=>!!i.saveLoading),je=j([F],i=>!!i.withdrawModal),Ne={selectInitLoading:Ae,selectSaveLoading:Fe,selectRecord:be,selectModal:je,selectRaw:F},P={BTC:{min:91e-5,fee:2e-5,decimals:8},ETH:{min:.0077,fee:5e-4,decimals:8},USDT:{min:30,fee:3,decimals:2},SOL:{min:.01,fee:5e-4,decimals:6},XRP:{min:1,fee:.1,decimals:6}},ye=oe().shape({orderNo:h.string(a("entities.withdraw.fields.orderNo")),currency:h.string(a("entities.withdraw.fields.currency")),withdrawAmount:ne().typeError(a("pages.withdraw.errors.amountNumber")).required(a("pages.withdraw.errors.amountRequired")).test("positive",a("pages.withdraw.errors.amountPositive"),i=>typeof i=="number"&&i>0).test("min-by-currency",a("pages.withdraw.errors.amountMin"),function(i){const{currency:o}=this.parent||{};return!o||!P[o]?!0:i>=P[o].min}),fee:h.decimal(a("entities.withdraw.fields.fee")),totalAmount:h.decimal(a("entities.withdraw.fields.totalAmount")),auditor:h.relationToOne(a("entities.withdraw.fields.auditor")),acceptTime:h.datetime(a("entities.withdraw.fields.acceptTime")),status:h.enumerator(a("entities.withdraw.fields.status"),{options:["pending","canceled","success"]}),withdrawPassword:de().required(a("pages.withdraw.errors.passwordRequired"))});function Le(){var O,$,q,X,Y,U,_,G,J;const i=ge(),o=z(le.selectCurrentUser),N=z(ce.selectRows)||[],R=z(Ne.selectModal),[ee,M]=u.useState(""),[y,v]=u.useState(""),[s,D]=u.useState(""),[E,I]=u.useState(null),[g,S]=u.useState(!1);u.useEffect(()=>{i(me.doFetch())},[i]),u.useEffect(()=>{var t,r;if(s&&N.length){const x=N.find(C=>String(C.symbol).toUpperCase()===String(s).toUpperCase());I(x||null);const f=((r=(t=o==null?void 0:o.wallet)==null?void 0:t[s])==null?void 0:r.address)||"";v(f),n.setValue("currency",s)}else I(null),v(""),n.setValue("currency","")},[s,N,o]);const ae=u.useMemo(()=>(o==null?void 0:o.wallet)&&Object.values(o.wallet).some(t=>{var r;return((r=t==null?void 0:t.address)==null?void 0:r.trim())!==""}),[o]),V={orderNo:"",currency:"",withdrawAmount:"",fee:"",totalAmount:"",auditor:"",acceptTime:"",status:"pending",withdrawAdress:"",withdrawPassword:""},n=ue({resolver:he.yupResolver(ye),mode:"all",defaultValues:V}),te=L({control:n.control,name:"withdrawAmount"}),W=L({control:n.control,name:"withdrawPassword"});L({control:n.control,name:"currency"});const m=Number(te),B=!Number.isNaN(m)&&isFinite(m),k=E&&Number(E.amount)||0,T=P[s]||{min:0,fee:0,decimals:8},b=s?T.fee:0,A=s?T.min:0,p=s?T.decimals:8,se=B?Math.max(m-(b||0),0):0,w=(t,r=p)=>typeof t!="number"||!isFinite(t)?"0":Number(t).toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:r}),d=(()=>s?!B||m<=0?{disabled:!0,label:a("pages.withdraw.validation.enterAmount"),reason:"enterAmount"}:A&&m<A?{disabled:!0,label:a("pages.withdraw.validation.belowMin",w(A),s),reason:"belowMin"}:m>k?{disabled:!0,label:a("pages.withdraw.validation.insufficientBalance"),reason:"insufficientBalance"}:m+b>k?{disabled:!0,label:a("pages.withdraw.validation.insufficientForFee"),reason:"insufficientForFee"}:!W||typeof W=="string"&&W.trim()===""?{disabled:!0,label:a("pages.withdraw.validation.enterPassword"),reason:"enterPassword"}:{disabled:!1,label:a("pages.withdraw.confirmWithdrawal"),reason:"ok"}:{disabled:!0,label:a("pages.withdraw.validation.selectCurrency"),reason:"selectCurrency"})(),ie=()=>{i(Q.doClose()),n.reset(V),D(""),v(""),M(""),S(!1)},re=async t=>{if(!d.disabled){S(!0);try{t.currency=s;const r=new Date,x=`${r.getFullYear()}${String(r.getMonth()+1).padStart(2,"0")}${String(r.getDate()).padStart(2,"0")}`,f=Math.floor(Math.random()*1e7).toString().padStart(7,"0");t.orderNo=`RE${x}${f}`;const C=Number(t.withdrawAmount)||0,K=b||0;t.fee=K,t.totalAmount=C-K,t.withdrawAdress=y,t.status="pending",M(t.totalAmount.toString()),await i(Q.doCreate(t))}catch(r){console.error("Withdrawal submission error:",r),S(!1)}}},H=[{id:"BTC",name:"Bitcoin",icon:"fab fa-btc",color:"#F3BA2F"},{id:"ETH",name:"Ethereum",icon:"fab fa-ethereum",color:"#627EEA"},{id:"USDT",name:"Tether",icon:"fas fa-dollar-sign",color:"#26A17B"},{id:"SOL",name:"Solana",icon:"fas fa-bolt",color:"#00FFA3"},{id:"XRP",name:"Ripple",icon:"fas fa-exchange-alt",color:"#23292F"}],l=H.find(t=>t.id===s),{errors:c}=n.formState;return e.jsxs("div",{className:"withdrawContainer",children:[e.jsx(we,{title:a("pages.withdraw.title")}),e.jsx("div",{className:"container",children:ae?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"currencySection",children:[e.jsx("div",{className:"sectionHeading",children:a("pages.withdraw.selectCurrency")}),e.jsxs("div",{className:"currencyDropdownContainer",children:[e.jsxs("select",{className:"currencyDropdown",value:s,onChange:t=>{const r=t.target.value;D(r),n.setValue("currency",r),n.setValue("withdrawAmount",""),n.setValue("withdrawPassword","")},children:[e.jsx("option",{value:"",children:a("pages.withdraw.selectPlaceholder")}),H.map(t=>{var x,f;const r=(f=(x=o==null?void 0:o.wallet)==null?void 0:x[t.id])==null?void 0:f.address;return e.jsxs("option",{value:t.id,disabled:!r,children:[t.name," ",!r&&a("pages.withdraw.noWalletAddress")]},t.id)})]}),s&&e.jsx("div",{className:"currencyDropdownIcon",style:{color:l==null?void 0:l.color},children:e.jsx("i",{className:l==null?void 0:l.icon})})]}),!s&&e.jsx("div",{className:"dropdownHint",children:a("pages.withdraw.selectHint")})]}),R&&e.jsx(fe,{isOpen:R,onClose:ie,type:"withdraw",amount:ee,coinType:s}),s&&e.jsx(xe,{...n,children:e.jsx("form",{onSubmit:n.handleSubmit(re),children:e.jsxs("div",{className:"formSection",children:[e.jsxs("div",{className:"inputField",children:[e.jsx("label",{className:"inputLabel",children:a("pages.withdraw.withdrawalAddress")}),e.jsxs("div",{className:"inputWrapper",children:[e.jsx("input",{type:"text",className:"textField",value:y,disabled:!0,readOnly:!0,"aria-readonly":!0}),e.jsx("div",{className:"networkInfo",id:"networkDetails",children:a("pages.withdraw.networkInfo",l==null?void 0:l.name,s)})]}),!y&&e.jsx("div",{className:"fieldError",role:"alert",style:{color:"#d9534f",marginTop:6},children:a("pages.withdraw.errors.noWalletAddress",s)})]}),e.jsxs("div",{className:"inputField",children:[e.jsx("label",{className:"inputLabel",children:a("pages.withdraw.withdrawalAmount")}),e.jsxs("div",{className:"inputWrapper",children:[e.jsx(Z,{name:"withdrawAmount",type:"number",className:"amountField",placeholder:"0.0",step:"any",min:"0",disabled:g}),e.jsxs("div",{className:"balanceText",children:[a("pages.withdraw.available"),":"," ",e.jsxs("span",{id:"availableBalance",children:[w(k,p)," ",s]})]})]}),e.jsxs("div",{className:"fieldError",role:"alert",style:{color:"#d9534f",marginTop:6},children:[((O=c.withdrawAmount)==null?void 0:O.message)&&e.jsx("div",{children:($=c.withdrawAmount)==null?void 0:$.message}),!((q=c.withdrawAmount)!=null&&q.message)&&d.reason==="enterAmount"&&e.jsx("div",{children:a("pages.withdraw.validation.enterAmount")}),!((X=c.withdrawAmount)!=null&&X.message)&&d.reason==="belowMin"&&e.jsx("div",{children:a("pages.withdraw.errors.minimumWithdraw",s,w(A,p),s)}),!((Y=c.withdrawAmount)!=null&&Y.message)&&d.reason==="insufficientBalance"&&e.jsx("div",{children:a("pages.withdraw.validation.insufficientBalance")}),!((U=c.withdrawAmount)!=null&&U.message)&&d.reason==="insufficientForFee"&&e.jsx("div",{children:a("pages.withdraw.errors.insufficientForFee",w(b,p),s)})]})]}),e.jsxs("div",{className:"inputField",children:[e.jsx("label",{className:"inputLabel",children:a("pages.withdraw.withdrawalPassword")}),e.jsx("div",{className:"inputWrapper",children:e.jsx(Z,{name:"withdrawPassword",type:"password",className:"textField",placeholder:a("pages.withdraw.passwordPlaceholder"),disabled:g})}),e.jsxs("div",{className:"fieldError",role:"alert",style:{color:"#d9534f",marginTop:6},children:[((_=c.withdrawPassword)==null?void 0:_.message)&&e.jsx("div",{children:(G=c.withdrawPassword)==null?void 0:G.message}),!((J=c.withdrawPassword)!=null&&J.message)&&d.reason==="enterPassword"&&e.jsx("div",{children:a("pages.withdraw.validation.enterPassword")})]})]}),e.jsxs("div",{className:"feeContainer",children:[e.jsxs("div",{className:"feeRow",children:[e.jsx("div",{className:"feeLabel",children:a("pages.withdraw.amountWithdrawal")}),e.jsxs("div",{className:"feeValue",children:[B?w(m,p):"-"," ",s]})]}),e.jsxs("div",{className:"feeRow",children:[e.jsx("div",{className:"feeLabel",children:a("pages.withdraw.minimumWithdrawal")}),e.jsxs("div",{className:"feeValue",children:[w(A,p)," ",s]})]}),e.jsxs("div",{className:"feeRow",children:[e.jsx("div",{className:"feeLabel",children:a("pages.withdraw.networkFee")}),e.jsxs("div",{className:"feeValue",children:[w(b,p)," ",s]})]}),e.jsxs("div",{className:"feeRow receiveAmount",children:[e.jsx("div",{className:"feeLabel",children:a("pages.withdraw.youWillReceive")}),e.jsxs("div",{className:"feeValue",children:[w(se,p)," ",s]})]})]}),e.jsxs("div",{className:"securityNotice",children:[e.jsxs("div",{className:"securityHeader",children:[e.jsx("i",{className:"fas fa-shield-alt securityIcon"}),e.jsx("div",{className:"securityTitle",children:a("pages.withdraw.securityVerification")})]}),e.jsx("div",{className:"securityText",children:a("pages.withdraw.securityMessage")})]}),e.jsx("button",{type:"submit",className:"withdrawBtn",disabled:d.disabled||g,"aria-disabled":d.disabled||g,children:g?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin",style:{marginRight:"8px"}}),a("pages.withdraw.processing")]}):d.label})]})})})]}):e.jsx("div",{className:"noWalletSection",children:e.jsxs("div",{className:"noWalletCard",children:[e.jsx("div",{className:"noWalletIcon",children:e.jsx("i",{className:"fas fa-wallet"})}),e.jsx("h3",{children:a("pages.withdraw.noWallet.title")}),e.jsx("p",{children:a("pages.withdraw.noWallet.description")}),e.jsxs(pe,{to:"/withdrawaddress",className:"addWalletBtn",children:[e.jsx("i",{className:"fas fa-plus"}),a("pages.withdraw.noWallet.addButton")]}),e.jsxs("div",{className:"securityNotice",children:[e.jsxs("div",{className:"securityHeader",children:[e.jsx("i",{className:"fas fa-shield-alt securityIcon"}),e.jsx("div",{className:"securityTitle",children:a("pages.withdraw.security.title")})]}),e.jsx("div",{className:"securityText",children:a("pages.withdraw.security.description")})]})]})})}),e.jsx("style",{children:`
        .withdrawContainer {
          padding-bottom: 30px;
        }
        
        .container {
          padding: 0 15px;
        }
        
        .noWalletCard {
          background: #2A2A2A;
          border-radius: 16px;
          padding: 30px;
          text-align: center;
          border: 1px solid #333333;
        }
        
        .noWalletIcon {
          font-size: 48px;
          color: #F3BA2F;
          margin-bottom: 16px;
        }
        
        .noWalletCard h3 {
          font-size: 20px;
          margin-bottom: 12px;
          color: #FFFFFF;
        }
        
        .noWalletCard p {
          color: #AAAAAA;
          margin-bottom: 24px;
          line-height: 1.5;
        }
        
        .addWalletBtn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #F3BA2F;
          color: #000000;
          border: none;
          border-radius: 12px;
          padding: 14px 24px;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s ease;
          margin-bottom: 24px;
        }
        
        .addWalletBtn:hover {
          background: #e6ab0a;
          text-decoration: none;
          color: #000000;
        }
        
        /* Currency Dropdown Styles */
        .currencySection {
          margin-bottom: 20px;
        }
        
        .sectionHeading {
          font-weight: bold;
          margin-bottom: 12px;
          font-size: 16px;
        }
        
        .currencyDropdownContainer {
          position: relative;
          width: 100%;
        }
        
        .currencyDropdown {
          width: 100%;
          background-color: #2A2A2A;
          border: 2px solid #2A2A2A;
          border-radius: 12px;
          padding: 12px 45px 12px 15px;
          color: white;
          font-size: 16px;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          cursor: pointer;
        }
        
        .currencyDropdown:focus {
          outline: none;
          border-color: #F3BA2F;
        }
        
        .currencyDropdownIcon {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 24px;
          pointer-events: none;
        }
        
        .dropdownHint {
          color: #FF6838;
          font-size: 14px;
          margin-top: 8px;
        }
        
        /* Form Styles */
        .formSection {
          margin-top: 20px;
        }
        
        .inputField {
          margin-bottom: 20px;
        }
        
        .inputLabel {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #FFFFFF;
        }
        
        .inputWrapper {
          background-color: #2A2A2A;
          border-radius: 12px;
          padding: 15px;
        }
        
        .textField {
          width: 100%;
          background: transparent;
          border: none;
          color: #FFFFFF;
          font-size: 16px;
          outline: none;
        }
        
        .networkInfo {
          color: #AAAAAA;
          font-size: 14px;
          margin-top: 8px;
        }
        
        .amountField {
          width: 100%;
          background: transparent;
          border: none;
          color: #FFFFFF;
          font-size: 20px;
          font-weight: bold;
          outline: none;
          margin-bottom: 8px;
        }
        
        .balanceText {
          color: #AAAAAA;
          font-size: 14px;
        }
        
        .feeContainer {
          background-color: #2A2A2A;
          border-radius: 12px;
          padding: 15px;
          margin-bottom: 20px;
        }
        
        .feeRow {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          font-size: 14px;
        }
        
        .feeLabel {
          color: #AAAAAA;
        }
        
        .feeValue {
          color: #FFFFFF;
          font-weight: 500;
        }
        
        .receiveAmount {
          border-top: 1px solid #333333;
          padding-top: 12px;
          margin-top: 12px;
          font-weight: bold;
        }
        
        .securityNotice {
          background-color: rgba(255, 104, 56, 0.1);
          border: 1px solid #FF6838;
          border-radius: 12px;
          padding: 15px;
          margin-bottom: 25px;
        }
        
        .securityHeader {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }
        
        .securityIcon {
          color: #FF6838;
          margin-right: 10px;
          font-size: 18px;
        }
        
        .securityTitle {
          color: #FF6838;
          font-weight: bold;
          font-size: 16px;
        }
        
        .securityText {
          color: #FF6838;
          font-size: 14px;
          line-height: 1.5;
        }
        
        .withdrawBtn {
          background-color: #F3BA2F;
          color: #000000;
          border: none;
          border-radius: 12px;
          padding: 16px;
          font-size: 16px;
          font-weight: bold;
          width: 100%;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        
        .withdrawBtn:hover {
          background-color: #e6ab0a;
        }
        
        .withdrawBtn:disabled {
          background-color: #2A2A2A;
          color: #777777;
          cursor: not-allowed;
        }
        
        /* Toast Notification */
        .toastMsg {
          position: fixed;
          bottom: 80px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #00C076;
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          font-size: 14px;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1000;
        }
        
        .toastMsg.visible {
          opacity: 1;
        }
        
        @media (max-width: 350px) {
          .currencyDropdown {
            padding: 10px 40px 10px 12px;
            font-size: 14px;
          }
          
          .currencyDropdownIcon {
            font-size: 20px;
            right: 12px;
          }
        }
      `})]})}export{Le as default};
