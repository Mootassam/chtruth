import{i as F,J as oe,K as h,O as ne,P as de,u as z,f as le,o as ce,h as p,q as me,j as e,L as ue,Q as Z}from"./index-0851878c.js";import{S as pe}from"./SubHeader-01b93f9d.js";import{a as w,u as he,y as we,b as L,F as xe}from"./FormErrors-a8c8ec85.js";import{F as _}from"./FieldFormItem-754480d2.js";import{S as fe}from"./sucessModal-aac2a6f3.js";import{u as be}from"./useDispatch-f840f987.js";import"./useNotifications-0a1c9b14.js";const y=s=>s.withdraw.form,ge=F([y],s=>s.record),Ae=F([y],s=>!!s.initLoading),ye=F([y],s=>!!s.saveLoading),Fe=F([y],s=>!!s.withdrawModal),Ne={selectInitLoading:Ae,selectSaveLoading:ye,selectRecord:ge,selectModal:Fe,selectRaw:y},P={BTC:{min:91e-5,fee:2e-5,decimals:8},ETH:{min:.0077,fee:5e-4,decimals:8},USDT:{min:30,fee:3,decimals:2},SOL:{min:.01,fee:5e-4,decimals:6},XRP:{min:1,fee:.1,decimals:6}},je=oe().shape({orderNo:w.string(h("entities.withdraw.fields.orderNo")),currency:w.string(h("entities.withdraw.fields.currency")),withdrawAmount:ne().typeError("Withdrawal amount must be a number").required("Withdrawal amount is required").test("positive","Withdrawal amount must be greater than 0",s=>typeof s=="number"&&s>0).test("min-by-currency","Amount is below the minimum withdrawal for this currency",function(s){const{currency:i}=this.parent||{};return!i||!P[i]?!0:s>=P[i].min}),fee:w.decimal(h("entities.withdraw.fields.fee")),totalAmount:w.decimal(h("entities.withdraw.fields.totalAmount")),auditor:w.relationToOne(h("entities.withdraw.fields.auditor")),acceptTime:w.datetime(h("entities.withdraw.fields.acceptTime")),status:w.enumerator(h("entities.withdraw.fields.status"),{options:["pending","canceled","success"]}),withdrawPassword:de().required("Withdrawal password is required")});function Le(){var $,O,q,Y,X,J,K,Q,U;const s=be(),i=z(le.selectCurrentUser),N=z(ce.selectRows)||[],E=z(Ne.selectModal),[ee,I]=p.useState(""),[j,v]=p.useState(""),[a,M]=p.useState(""),[R,V]=p.useState(null),[b,S]=p.useState(!1);p.useEffect(()=>{s(me.doFetch())},[s]),p.useEffect(()=>{var t,r;if(a&&N.length){const x=N.find(C=>String(C.symbol).toUpperCase()===String(a).toUpperCase());V(x||null);const f=((r=(t=i==null?void 0:i.wallet)==null?void 0:t[a])==null?void 0:r.address)||"";v(f),o.setValue("currency",a)}else V(null),v(""),o.setValue("currency","")},[a,N,i]);const te=p.useMemo(()=>(i==null?void 0:i.wallet)&&Object.values(i.wallet).some(t=>{var r;return((r=t==null?void 0:t.address)==null?void 0:r.trim())!==""}),[i]),D={orderNo:"",currency:"",withdrawAmount:"",fee:"",totalAmount:"",auditor:"",acceptTime:"",status:"pending",withdrawAdress:"",withdrawPassword:""},o=he({resolver:we.yupResolver(je),mode:"all",defaultValues:D}),ae=L({control:o.control,name:"withdrawAmount"}),W=L({control:o.control,name:"withdrawPassword"});L({control:o.control,name:"currency"});const c=Number(ae),T=!Number.isNaN(c)&&isFinite(c),B=R&&Number(R.amount)||0,k=P[a]||{min:0,fee:0,decimals:8},g=a?k.fee:0,A=a?k.min:0,m=a?k.decimals:8,se=T?Math.max(c-(g||0),0):0,u=(t,r=m)=>typeof t!="number"||!isFinite(t)?"0":Number(t).toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:r}),n=(()=>a?!T||c<=0?{disabled:!0,label:"Enter amount",reason:"enterAmount"}:A&&c<A?{disabled:!0,label:`Below minimum (${u(A)} ${a})`,reason:"belowMin"}:c>B?{disabled:!0,label:"Insufficient balance",reason:"insufficientBalance"}:c+g>B?{disabled:!0,label:"Insufficient balance (including fee)",reason:"insufficientForFee"}:!W||typeof W=="string"&&W.trim()===""?{disabled:!0,label:"Enter password",reason:"enterPassword"}:{disabled:!1,label:"Confirm Withdrawal",reason:"ok"}:{disabled:!0,label:"Select currency",reason:"selectCurrency"})(),re=()=>{s(Z.doClose()),o.reset(D),M(""),v(""),I(""),S(!1)},ie=async t=>{if(!n.disabled){S(!0);try{t.currency=a;const r=new Date,x=`${r.getFullYear()}${String(r.getMonth()+1).padStart(2,"0")}${String(r.getDate()).padStart(2,"0")}`,f=Math.floor(Math.random()*1e7).toString().padStart(7,"0");t.orderNo=`RE${x}${f}`;const C=Number(t.withdrawAmount)||0,G=g||0;t.fee=G,t.totalAmount=C-G,t.withdrawAdress=j,t.status="pending",I(t.totalAmount.toString()),await s(Z.doCreate(t))}catch(r){console.error("Withdrawal submission error:",r),S(!1)}}},H=[{id:"BTC",name:"Bitcoin",icon:"fab fa-btc",color:"#F3BA2F"},{id:"ETH",name:"Ethereum",icon:"fab fa-ethereum",color:"#627EEA"},{id:"USDT",name:"Tether",icon:"fas fa-dollar-sign",color:"#26A17B"},{id:"SOL",name:"Solana",icon:"fas fa-bolt",color:"#00FFA3"},{id:"XRP",name:"Ripple",icon:"fas fa-exchange-alt",color:"#23292F"}],d=H.find(t=>t.id===a),{errors:l}=o.formState;return e.jsxs("div",{className:"withdrawContainer",children:[e.jsx(pe,{title:"Withdraw Crypto"}),e.jsx("div",{className:"container",children:te?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"currencySection",children:[e.jsx("div",{className:"sectionHeading",children:"Select Currency"}),e.jsxs("div",{className:"currencyDropdownContainer",children:[e.jsxs("select",{className:"currencyDropdown",value:a,onChange:t=>{const r=t.target.value;M(r),o.setValue("currency",r),o.setValue("withdrawAmount",""),o.setValue("withdrawPassword","")},children:[e.jsx("option",{value:"",children:"Select a currency"}),H.map(t=>{var x,f;const r=(f=(x=i==null?void 0:i.wallet)==null?void 0:x[t.id])==null?void 0:f.address;return e.jsxs("option",{value:t.id,disabled:!r,children:[t.name," ",!r&&"(No wallet address)"]},t.id)})]}),a&&e.jsx("div",{className:"currencyDropdownIcon",style:{color:d==null?void 0:d.color},children:e.jsx("i",{className:d==null?void 0:d.icon})})]}),!a&&e.jsx("div",{className:"dropdownHint",children:"Please select a currency to continue"})]}),E&&e.jsx(fe,{isOpen:E,onClose:re,type:"withdraw",amount:ee,coinType:a}),a&&e.jsx(xe,{...o,children:e.jsx("form",{onSubmit:o.handleSubmit(ie),children:e.jsxs("div",{className:"formSection",children:[e.jsxs("div",{className:"inputField",children:[e.jsx("label",{className:"inputLabel",children:"Withdrawal Address"}),e.jsxs("div",{className:"inputWrapper",children:[e.jsx("input",{type:"text",className:"textField",value:j,disabled:!0,readOnly:!0,"aria-readonly":!0}),e.jsxs("div",{className:"networkInfo",id:"networkDetails",children:["Network: ",d==null?void 0:d.name," (",a,")"]})]}),!j&&e.jsxs("div",{className:"fieldError",role:"alert",style:{color:"#d9534f",marginTop:6},children:["No wallet address found for ",a,". Please add a wallet address first."]})]}),e.jsxs("div",{className:"inputField",children:[e.jsx("label",{className:"inputLabel",children:"Withdrawal Amount"}),e.jsxs("div",{className:"inputWrapper",children:[e.jsx(_,{name:"withdrawAmount",type:"number",className:"amountField",placeholder:"0.0",step:"any",min:"0",disabled:b}),e.jsxs("div",{className:"balanceText",children:["Available:"," ",e.jsxs("span",{id:"availableBalance",children:[u(B,m)," ",a]})]})]}),e.jsxs("div",{className:"fieldError",role:"alert",style:{color:"#d9534f",marginTop:6},children:[(($=l.withdrawAmount)==null?void 0:$.message)&&e.jsx("div",{children:(O=l.withdrawAmount)==null?void 0:O.message}),!((q=l.withdrawAmount)!=null&&q.message)&&n.reason==="enterAmount"&&e.jsx("div",{children:"Enter amount"}),!((Y=l.withdrawAmount)!=null&&Y.message)&&n.reason==="belowMin"&&e.jsxs("div",{children:["Minimum withdraw for ",a,": ",u(A,m)," ",a]}),!((X=l.withdrawAmount)!=null&&X.message)&&n.reason==="insufficientBalance"&&e.jsx("div",{children:"Insufficient balance"}),!((J=l.withdrawAmount)!=null&&J.message)&&n.reason==="insufficientForFee"&&e.jsxs("div",{children:["Not enough balance to cover fee (",u(g,m)," ",a,")"]})]})]}),e.jsxs("div",{className:"inputField",children:[e.jsx("label",{className:"inputLabel",children:"Withdrawal Password"}),e.jsx("div",{className:"inputWrapper",children:e.jsx(_,{name:"withdrawPassword",type:"password",className:"textField",placeholder:"Enter withdrawal password",disabled:b})}),e.jsxs("div",{className:"fieldError",role:"alert",style:{color:"#d9534f",marginTop:6},children:[((K=l.withdrawPassword)==null?void 0:K.message)&&e.jsx("div",{children:(Q=l.withdrawPassword)==null?void 0:Q.message}),!((U=l.withdrawPassword)!=null&&U.message)&&n.reason==="enterPassword"&&e.jsx("div",{children:"Enter withdrawal password"})]})]}),e.jsxs("div",{className:"feeContainer",children:[e.jsxs("div",{className:"feeRow",children:[e.jsx("div",{className:"feeLabel",children:"Amount withdrawal"}),e.jsxs("div",{className:"feeValue",children:[T?u(c,m):"-"," ",a]})]}),e.jsxs("div",{className:"feeRow",children:[e.jsx("div",{className:"feeLabel",children:"Minimum withdrawal"}),e.jsxs("div",{className:"feeValue",children:[u(A,m)," ",a]})]}),e.jsxs("div",{className:"feeRow",children:[e.jsx("div",{className:"feeLabel",children:"Network fee"}),e.jsxs("div",{className:"feeValue",children:[u(g,m)," ",a]})]}),e.jsxs("div",{className:"feeRow receiveAmount",children:[e.jsx("div",{className:"feeLabel",children:"You will receive"}),e.jsxs("div",{className:"feeValue",children:[u(se,m)," ",a]})]})]}),e.jsxs("div",{className:"securityNotice",children:[e.jsxs("div",{className:"securityHeader",children:[e.jsx("i",{className:"fas fa-shield-alt securityIcon"}),e.jsx("div",{className:"securityTitle",children:"Security Verification"})]}),e.jsx("div",{className:"securityText",children:"For your security, withdrawals require password confirmation and may be subject to review. Withdrawals to incorrect addresses cannot be reversed."})]}),e.jsx("button",{type:"submit",className:"withdrawBtn",disabled:n.disabled||b,"aria-disabled":n.disabled||b,children:b?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin",style:{marginRight:"8px"}}),"Processing..."]}):n.label})]})})})]}):e.jsx("div",{className:"noWalletSection",children:e.jsxs("div",{className:"noWalletCard",children:[e.jsx("div",{className:"noWalletIcon",children:e.jsx("i",{className:"fas fa-wallet"})}),e.jsx("h3",{children:"No Wallet Address Found"}),e.jsx("p",{children:"You haven't added any wallet addresses yet. Please add a withdrawal address to proceed with your transaction."}),e.jsxs(ue,{to:"/withdrawaddress",className:"addWalletBtn",children:[e.jsx("i",{className:"fas fa-plus"}),"Add Wallet Address"]}),e.jsxs("div",{className:"securityNotice",children:[e.jsxs("div",{className:"securityHeader",children:[e.jsx("i",{className:"fas fa-shield-alt securityIcon"}),e.jsx("div",{className:"securityTitle",children:"Security First"})]}),e.jsx("div",{className:"securityText",children:"For your security, we require a verified withdrawal address for each cryptocurrency. This helps prevent errors and ensures your funds reach the correct destination."})]})]})})}),e.jsx("style",{children:`
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
