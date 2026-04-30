import{t as F,X as re,p as a,a1 as oe,_ as ne,u as C,k as de,D as le,o as m,E as ce,j as e,L as me,a5 as K}from"./index-5690a729.js";import{S as pe}from"./SubHeader-95afbf0b.js";import{a as h,u as we,y as ue,d as z,F as he}from"./FormErrors-ef31b318.js";import{F as Q}from"./FieldFormItem-06fa5b01.js";import{S as xe}from"./sucessModal-aeab9bb4.js";import{u as fe}from"./useDispatch-a4a3759f.js";import"./useNotifications-287971f0.js";const A=i=>i.withdraw.form,ge=F([A],i=>i.record),be=F([A],i=>!!i.initLoading),Ae=F([A],i=>!!i.saveLoading),Fe=F([A],i=>!!i.withdrawModal),je={selectInitLoading:be,selectSaveLoading:Ae,selectRecord:ge,selectModal:Fe,selectRaw:A},L={BTC:{min:91e-5,fee:2e-5,decimals:8},ETH:{min:.0077,fee:5e-4,decimals:8},USDT:{min:30,fee:3,decimals:2},SOL:{min:.01,fee:5e-4,decimals:6},XRP:{min:1,fee:.1,decimals:6}},Ne=re().shape({orderNo:h.string(a("entities.withdraw.fields.orderNo")),currency:h.string(a("entities.withdraw.fields.currency")),withdrawAmount:oe().typeError(a("pages.withdraw.errors.amountNumber")).required(a("pages.withdraw.errors.amountRequired")).test("positive",a("pages.withdraw.errors.amountPositive"),i=>typeof i=="number"&&i>0).test("min-by-currency",a("pages.withdraw.errors.amountMin"),function(i){const{currency:o}=this.parent||{};return!o||!L[o]?!0:i>=L[o].min}),fee:h.decimal(a("entities.withdraw.fields.fee")),totalAmount:h.decimal(a("entities.withdraw.fields.totalAmount")),auditor:h.relationToOne(a("entities.withdraw.fields.auditor")),acceptTime:h.datetime(a("entities.withdraw.fields.acceptTime")),status:h.enumerator(a("entities.withdraw.fields.status"),{options:["pending","canceled","success"]}),withdrawPassword:ne().required(a("pages.withdraw.errors.passwordRequired"))});function ze(){var O,$,q,X,Y,U,_,G;const i=fe(),o=C(de.selectCurrentUser),j=C(le.selectRows)||[],P=C(je.selectModal),[Z,R]=m.useState(""),[N,y]=m.useState(""),[s,M]=m.useState(""),[D,E]=m.useState(null),[g,v]=m.useState(!1);m.useEffect(()=>{i(ce.doFetch())},[i]),m.useEffect(()=>{var t,r;if(s&&j.length){const x=j.find(T=>String(T.symbol).toUpperCase()===String(s).toUpperCase());E(x||null);const f=((r=(t=o==null?void 0:o.wallet)==null?void 0:t[s])==null?void 0:r.address)||"";y(f),n.setValue("currency",s)}else E(null),y(""),n.setValue("currency","")},[s,j,o]);const ee=m.useMemo(()=>(o==null?void 0:o.wallet)&&Object.values(o.wallet).some(t=>{var r;return((r=t==null?void 0:t.address)==null?void 0:r.trim())!==""}),[o]),I={orderNo:"",currency:"",withdrawAmount:"",fee:"",totalAmount:"",auditor:"",acceptTime:"",status:"pending",withdrawAdress:"",withdrawPassword:""},n=we({resolver:ue.yupResolver(Ne),mode:"all",defaultValues:I}),ae=z({control:n.control,name:"withdrawAmount"}),S=z({control:n.control,name:"withdrawPassword"});z({control:n.control,name:"currency"});const p=Number(ae),W=!Number.isNaN(p)&&isFinite(p),V=D&&Number(D.amount)||0,B=L[s]||{min:0,fee:0,decimals:8},k=s?B.fee:0,b=s?B.min:0,w=s?B.decimals:8,te=W?Math.max(p-(k||0),0):0,u=(t,r=w)=>typeof t!="number"||!isFinite(t)?"0":Number(t).toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:r}),l=(()=>s?!W||p<=0?{disabled:!0,label:a("pages.withdraw.validation.enterAmount"),reason:"enterAmount"}:b&&p<b?{disabled:!0,label:a("pages.withdraw.validation.belowMin",u(b),s),reason:"belowMin"}:p>V?{disabled:!0,label:a("pages.withdraw.validation.insufficientBalance"),reason:"insufficientBalance"}:!S||typeof S=="string"&&S.trim()===""?{disabled:!0,label:a("pages.withdraw.validation.enterPassword"),reason:"enterPassword"}:{disabled:!1,label:a("pages.withdraw.confirmWithdrawal"),reason:"ok"}:{disabled:!0,label:a("pages.withdraw.validation.selectCurrency"),reason:"selectCurrency"})(),se=()=>{i(K.doClose()),n.reset(I),M(""),y(""),R(""),v(!1)},ie=async t=>{if(!l.disabled){v(!0);try{t.currency=s;const r=new Date,x=`${r.getFullYear()}${String(r.getMonth()+1).padStart(2,"0")}${String(r.getDate()).padStart(2,"0")}`,f=Math.floor(Math.random()*1e7).toString().padStart(7,"0");t.orderNo=`RE${x}${f}`;const T=Number(t.withdrawAmount)||0,J=k||0;t.fee=J,t.totalAmount=T-J,t.withdrawAdress=N,t.status="pending",R(t.totalAmount.toString()),await i(K.doCreate(t))}catch(r){console.error("Withdrawal submission error:",r),v(!1)}}},H=[{id:"BTC",name:"Bitcoin",icon:"fab fa-btc",color:"#F3BA2F"},{id:"ETH",name:"Ethereum",icon:"fab fa-ethereum",color:"#627EEA"},{id:"USDT",name:"Tether",icon:"fas fa-dollar-sign",color:"#26A17B"},{id:"SOL",name:"Solana",icon:"fas fa-bolt",color:"#00FFA3"},{id:"XRP",name:"Ripple",icon:"fas fa-exchange-alt",color:"#23292F"}],d=H.find(t=>t.id===s),{errors:c}=n.formState;return e.jsxs("div",{className:"withdrawContainer",children:[e.jsx(pe,{title:a("pages.withdraw.title")}),e.jsx("div",{className:"container",children:ee?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"currencySection",children:[e.jsx("div",{className:"sectionHeading",children:a("pages.withdraw.selectCurrency")}),e.jsxs("div",{className:"currencyDropdownContainer",children:[e.jsxs("select",{className:"currencyDropdown",value:s,onChange:t=>{const r=t.target.value;M(r),n.setValue("currency",r),n.setValue("withdrawAmount",""),n.setValue("withdrawPassword","")},children:[e.jsx("option",{value:"",children:a("pages.withdraw.selectPlaceholder")}),H.map(t=>{var x,f;const r=(f=(x=o==null?void 0:o.wallet)==null?void 0:x[t.id])==null?void 0:f.address;return e.jsxs("option",{value:t.id,disabled:!r,children:[t.name," ",!r&&a("pages.withdraw.noWalletAddress")]},t.id)})]}),s&&e.jsx("div",{className:"currencyDropdownIcon",style:{color:d==null?void 0:d.color},children:e.jsx("i",{className:d==null?void 0:d.icon})})]}),!s&&e.jsx("div",{className:"dropdownHint",children:a("pages.withdraw.selectHint")})]}),P&&e.jsx(xe,{isOpen:P,onClose:se,type:"withdraw",amount:Z,coinType:s}),s&&e.jsx(he,{...n,children:e.jsx("form",{onSubmit:n.handleSubmit(ie),children:e.jsxs("div",{className:"formSection",children:[e.jsxs("div",{className:"inputField",children:[e.jsx("label",{className:"inputLabel",children:a("pages.withdraw.withdrawalAddress")}),e.jsxs("div",{className:"inputWrapper",children:[e.jsx("input",{type:"text",className:"textField",value:N,disabled:!0,readOnly:!0,"aria-readonly":!0}),e.jsx("div",{className:"networkInfo",id:"networkDetails",children:a("pages.withdraw.networkInfo",d==null?void 0:d.name,s)})]}),!N&&e.jsx("div",{className:"fieldError",role:"alert",style:{color:"#d9534f",marginTop:6},children:a("pages.withdraw.errors.noWalletAddress",s)})]}),e.jsxs("div",{className:"inputField",children:[e.jsx("label",{className:"inputLabel",children:a("pages.withdraw.withdrawalAmount")}),e.jsxs("div",{className:"inputWrapper",children:[e.jsx(Q,{name:"withdrawAmount",className:"amountField",placeholder:"0.0",disabled:g}),e.jsxs("div",{className:"balanceText",children:[a("pages.withdraw.available"),":"," ",e.jsxs("span",{id:"availableBalance",children:[u(V,w)," ",s]})]})]}),e.jsxs("div",{className:"fieldError",role:"alert",style:{color:"#d9534f",marginTop:6},children:[((O=c.withdrawAmount)==null?void 0:O.message)&&e.jsx("div",{children:($=c.withdrawAmount)==null?void 0:$.message}),!((q=c.withdrawAmount)!=null&&q.message)&&l.reason==="enterAmount"&&e.jsx("div",{children:a("pages.withdraw.validation.enterAmount")}),!((X=c.withdrawAmount)!=null&&X.message)&&l.reason==="belowMin"&&e.jsx("div",{children:a("pages.withdraw.errors.minimumWithdraw",s,u(b,w),s)}),!((Y=c.withdrawAmount)!=null&&Y.message)&&l.reason==="insufficientBalance"&&e.jsx("div",{children:a("pages.withdraw.validation.insufficientBalance")})]})]}),e.jsxs("div",{className:"inputField",children:[e.jsx("label",{className:"inputLabel",children:a("pages.withdraw.withdrawalPassword")}),e.jsx("div",{className:"inputWrapper",children:e.jsx(Q,{name:"withdrawPassword",type:"password",className:"textField",placeholder:a("pages.withdraw.passwordPlaceholder"),disabled:g})}),e.jsxs("div",{className:"fieldError",role:"alert",style:{color:"#d9534f",marginTop:6},children:[((U=c.withdrawPassword)==null?void 0:U.message)&&e.jsx("div",{children:(_=c.withdrawPassword)==null?void 0:_.message}),!((G=c.withdrawPassword)!=null&&G.message)&&l.reason==="enterPassword"&&e.jsx("div",{children:a("pages.withdraw.validation.enterPassword")})]})]}),e.jsxs("div",{className:"feeContainer",children:[e.jsxs("div",{className:"feeRow",children:[e.jsx("div",{className:"feeLabel",children:a("pages.withdraw.amountWithdrawal")}),e.jsxs("div",{className:"feeValue",children:[W?u(p,w):"-"," ",s]})]}),e.jsxs("div",{className:"feeRow",children:[e.jsx("div",{className:"feeLabel",children:a("pages.withdraw.minimumWithdrawal")}),e.jsxs("div",{className:"feeValue",children:[u(b,w)," ",s]})]}),e.jsxs("div",{className:"feeRow",children:[e.jsx("div",{className:"feeLabel",children:a("pages.withdraw.networkFee")}),e.jsxs("div",{className:"feeValue",children:[u(k,w)," ",s]})]}),e.jsxs("div",{className:"feeRow receiveAmount",children:[e.jsx("div",{className:"feeLabel",children:a("pages.withdraw.youWillReceive")}),e.jsxs("div",{className:"feeValue",children:[u(te,w)," ",s]})]})]}),e.jsxs("div",{className:"securityNotice",children:[e.jsxs("div",{className:"securityHeader",children:[e.jsx("i",{className:"fas fa-shield-alt securityIcon"}),e.jsx("div",{className:"securityTitle",children:a("pages.withdraw.securityVerification")})]}),e.jsx("div",{className:"securityText",children:a("pages.withdraw.securityMessage")})]}),e.jsx("button",{type:"submit",className:"withdrawBtn",disabled:l.disabled||g,"aria-disabled":l.disabled||g,children:g?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin",style:{marginRight:"8px"}}),a("pages.withdraw.processing")]}):l.label})]})})})]}):e.jsx("div",{className:"noWalletSection",children:e.jsxs("div",{className:"noWalletCard",children:[e.jsx("div",{className:"noWalletIcon",children:e.jsx("i",{className:"fas fa-wallet"})}),e.jsx("h3",{children:a("pages.withdraw.noWallet.title")}),e.jsx("p",{children:a("pages.withdraw.noWallet.description")}),e.jsxs(me,{to:"/withdrawaddress",className:"addWalletBtn",children:[e.jsx("i",{className:"fas fa-plus"}),a("pages.withdraw.noWallet.addButton")]}),e.jsxs("div",{className:"securityNotice",children:[e.jsxs("div",{className:"securityHeader",children:[e.jsx("i",{className:"fas fa-shield-alt securityIcon"}),e.jsx("div",{className:"securityTitle",children:a("pages.withdraw.security.title")})]}),e.jsx("div",{className:"securityText",children:a("pages.withdraw.security.description")})]})]})})}),e.jsx("style",{children:`
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
      `})]})}export{ze as default};
