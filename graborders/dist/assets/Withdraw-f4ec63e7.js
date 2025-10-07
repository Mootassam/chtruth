import{G as Q,H as p,K as Z,M as _,u as O,x as ee,i as te,r as g,k as ae,j as e,L as re,N as se}from"./index-43651a87.js";import{S as ie}from"./SubHeader-ad707529.js";import{a as h,u as ne,y as oe,b as Y,F as de}from"./FormErrors-cf1db234.js";import{F as X}from"./FieldFormItem-8e9b9afd.js";import{u as le}from"./useDispatch-07f3b144.js";const W={BTC:{min:91e-5,fee:2e-5,decimals:8},ETH:{min:.0077,fee:5e-4,decimals:8},USDT:{min:30,fee:3,decimals:2},SOL:{min:.01,fee:5e-4,decimals:6},XRP:{min:1,fee:.1,decimals:6}},ce=Q().shape({orderNo:h.string(p("entities.withdraw.fields.orderNo")),currency:h.string(p("entities.withdraw.fields.currency")),withdrawAmount:Z().typeError("Withdrawal amount must be a number").required("Withdrawal amount is required").test("positive","Withdrawal amount must be greater than 0",d=>typeof d=="number"&&d>0).test("min-by-currency","Amount is below the minimum withdrawal for this currency",function(d){const{currency:s}=this.parent||{};return!s||!W[s]?!0:d>=W[s].min}),fee:h.decimal(p("entities.withdraw.fields.fee")),totalAmount:h.decimal(p("entities.withdraw.fields.totalAmount")),auditor:h.relationToOne(p("entities.withdraw.fields.auditor")),acceptTime:h.datetime(p("entities.withdraw.fields.acceptTime")),status:h.enumerator(p("entities.withdraw.fields.status"),{options:["pending","canceled","success"]}),withdrawPassword:_().required("Withdrawal password is required")});function fe(){var P,L,I,D,R,V,H,M,$;const d=le(),s=O(ee.selectCurrentUser),A=O(te.selectRows)||[],[k,F]=g.useState(""),[a,T]=g.useState(""),[B,z]=g.useState(null);g.useEffect(()=>{d(ae.doFetch())},[d]),g.useEffect(()=>{var t,r;if(a&&A.length){const w=A.find(S=>String(S.symbol).toUpperCase()===String(a).toUpperCase());z(w||null);const x=((r=(t=s==null?void 0:s.wallet)==null?void 0:t[a])==null?void 0:r.address)||"";F(x)}else z(null),F("")},[a,A,s]);const G=(s==null?void 0:s.wallet)&&Object.values(s.wallet).some(t=>{var r;return((r=t==null?void 0:t.address)==null?void 0:r.trim())!==""}),C={orderNo:"",currency:"",withdrawAmount:"",fee:"",totalAmount:"",auditor:"",acceptTime:"",status:"pending",withdrawAdress:"",withdrawPassword:""},i=ne({resolver:oe.yupResolver(ce),mode:"all",defaultValues:C}),K=Y({control:i.control,name:"withdrawAmount"}),N=Y({control:i.control,name:"withdrawPassword"}),l=Number(K),j=!Number.isNaN(l)&&isFinite(l),y=B&&Number(B.amount)||0,v=W[a]||{min:0,fee:0,decimals:8},f=a?v.fee:0,b=a?v.min:0,c=a?v.decimals:8,U=j?Math.max(l-(f||0),0):0,m=(t,r=c)=>typeof t!="number"||!isFinite(t)?"0":Number(t).toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:r}),u=(()=>a?!j||l<=0?{disabled:!0,label:"Enter amount",reason:"enterAmount"}:b&&l<b?{disabled:!0,label:`Below minimum (${m(b)} ${a})`,reason:"belowMin"}:l>y?{disabled:!0,label:"Insufficient balance",reason:"insufficientBalance"}:l+f>y?{disabled:!0,label:"Insufficient balance (including fee)",reason:"insufficientForFee"}:!N||typeof N=="string"&&N.trim()===""?{disabled:!0,label:"Enter password",reason:"enterPassword"}:{disabled:!1,label:"Confirm Withdrawal",reason:"ok"}:{disabled:!0,label:"Select currency",reason:"selectCurrency"})(),J=t=>{t.currency=a;const r=new Date,w=`${r.getFullYear()}${String(r.getMonth()+1).padStart(2,"0")}${String(r.getDate()).padStart(2,"0")}`,x=Math.floor(Math.random()*1e7).toString().padStart(7,"0");t.orderNo=`RE${w}${x}`;const S=Number(t.withdrawAmount)||0,q=f||0;t.fee=q,t.totalAmount=S-q,t.withdrawAdress=k,d(se.doCreate(t)),i.reset(C),T(""),F("")},E=[{id:"BTC",name:"Bitcoin",icon:"fab fa-btc",color:"#F3BA2F"},{id:"ETH",name:"Ethereum",icon:"fab fa-ethereum",color:"#627EEA"},{id:"USDT",name:"Tether",icon:"fas fa-dollar-sign",color:"#26A17B"},{id:"SOL",name:"Solana",icon:"fas fa-bolt",color:"#00FFA3"},{id:"XRP",name:"Ripple",icon:"fas fa-exchange-alt",color:"#23292F"}],n=E.find(t=>t.id===a),{errors:o}=i.formState;return e.jsxs("div",{className:"withdrawContainer",children:[e.jsx(ie,{title:"Withdraw Crypto"}),e.jsx("div",{className:"container",children:G?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"currencySection",children:[e.jsx("div",{className:"sectionHeading",children:"Select Currency"}),e.jsxs("div",{className:"currencyDropdownContainer",children:[e.jsxs("select",{className:"currencyDropdown",value:a,onChange:t=>{const r=t.target.value;T(r),i.setValue("currency",r),i.setValue("withdrawAmount",""),i.setValue("withdrawPassword","")},children:[e.jsx("option",{value:"",children:"Select a currency"}),E.map(t=>{var w,x;const r=(x=(w=s==null?void 0:s.wallet)==null?void 0:w[t.id])==null?void 0:x.address;return e.jsx("option",{value:t.id,disabled:!r,children:t.name},t.id)})]}),a&&e.jsx("div",{className:"currencyDropdownIcon",style:{color:n==null?void 0:n.color},children:e.jsx("i",{className:n==null?void 0:n.icon})})]}),!a&&e.jsx("div",{className:"dropdownHint",children:"Please select a currency to continue"})]}),a&&e.jsx(de,{...i,children:e.jsx("form",{onSubmit:i.handleSubmit(J),children:e.jsxs("div",{className:"formSection",children:[e.jsxs("div",{className:"inputField",children:[e.jsx("label",{className:"inputLabel",children:"Withdrawal Address"}),e.jsxs("div",{className:"inputWrapper",children:[e.jsx("input",{type:"text",className:"textField",value:k,disabled:!0,"aria-readonly":!0}),e.jsxs("div",{className:"networkInfo",id:"networkDetails",children:["Network: ",n==null?void 0:n.name," (",a,")"]})]})]}),e.jsxs("div",{className:"inputField",children:[e.jsx("label",{className:"inputLabel",children:"Withdrawal Amount"}),e.jsxs("div",{className:"inputWrapper",children:[e.jsx(X,{name:"withdrawAmount",type:"number",className:"amountField",placeholder:"0.0",step:"any",min:"0"}),e.jsxs("div",{className:"balanceText",children:["Available:"," ",e.jsxs("span",{id:"availableBalance",children:[m(y,c)," ",a]})]})]}),e.jsxs("div",{className:"fieldError",role:"alert",style:{color:"#d9534f",marginTop:6},children:[((P=o.withdrawAmount)==null?void 0:P.message)&&e.jsx("div",{children:(L=o.withdrawAmount)==null?void 0:L.message}),!((I=o.withdrawAmount)!=null&&I.message)&&u.reason==="enterAmount"&&e.jsx("div",{children:"Enter amount"}),!((D=o.withdrawAmount)!=null&&D.message)&&u.reason==="belowMin"&&e.jsxs("div",{children:["Minimum withdraw for ",a,": ",m(b,c)," ",a]}),!((R=o.withdrawAmount)!=null&&R.message)&&u.reason==="insufficientBalance"&&e.jsx("div",{children:"Insufficient balance"}),!((V=o.withdrawAmount)!=null&&V.message)&&u.reason==="insufficientForFee"&&e.jsxs("div",{children:["Not enough balance to cover fee (",m(f,c)," ",a,")"]})]})]}),e.jsxs("div",{className:"inputField",children:[e.jsx("label",{className:"inputLabel",children:"Withdrawal Password"}),e.jsx("div",{className:"inputWrapper",children:e.jsx(X,{name:"withdrawPassword",type:"password",className:"textField",placeholder:"Enter withdrawal password"})}),e.jsxs("div",{className:"fieldError",role:"alert",style:{color:"#d9534f",marginTop:6},children:[((H=o.withdrawPassword)==null?void 0:H.message)&&e.jsx("div",{children:(M=o.withdrawPassword)==null?void 0:M.message}),!(($=o.withdrawPassword)!=null&&$.message)&&u.reason==="enterPassword"&&e.jsx("div",{children:"Enter withdrawal password"})]})]}),e.jsxs("div",{className:"feeContainer",children:[e.jsxs("div",{className:"feeRow",children:[e.jsx("div",{className:"feeLabel",children:"Amount withdrawal"}),e.jsxs("div",{className:"feeValue",children:[j?m(l,c):"-"," ",a]})]}),e.jsxs("div",{className:"feeRow",children:[e.jsx("div",{className:"feeLabel",children:"Minimum withdrawal"}),e.jsxs("div",{className:"feeValue",children:[m(b,c)," ",a]})]}),e.jsxs("div",{className:"feeRow",children:[e.jsx("div",{className:"feeLabel",children:"Network fee"}),e.jsxs("div",{className:"feeValue",children:[m(f,c)," ",a]})]}),e.jsxs("div",{className:"feeRow receiveAmount",children:[e.jsx("div",{className:"feeLabel",children:"You will receive"}),e.jsxs("div",{className:"feeValue",children:[m(U,c)," ",a]})]})]}),e.jsxs("div",{className:"securityNotice",children:[e.jsxs("div",{className:"securityHeader",children:[e.jsx("i",{className:"fas fa-shield-alt securityIcon"}),e.jsx("div",{className:"securityTitle",children:"Security Verification"})]}),e.jsx("div",{className:"securityText",children:"For your security, withdrawals require password confirmation and may be subject to review. Withdrawals to incorrect addresses cannot be reversed."})]}),e.jsx("button",{type:"submit",className:"withdrawBtn",disabled:u.disabled||i.formState.isSubmitting,"aria-disabled":u.disabled||i.formState.isSubmitting,children:i.formState.isSubmitting?"Processing...":u.label})]})})})]}):e.jsx("div",{className:"noWalletSection",children:e.jsxs("div",{className:"noWalletCard",children:[e.jsx("div",{className:"noWalletIcon",children:e.jsx("i",{className:"fas fa-wallet"})}),e.jsx("h3",{children:"No Wallet Address Found"}),e.jsx("p",{children:"You haven't added any wallet addresses yet. Please add a withdrawal address to proceed with your transaction."}),e.jsxs(re,{to:"/withdrawaddress",className:"addWalletBtn",children:[e.jsx("i",{className:"fas fa-plus"}),"Add Wallet Address"]}),e.jsxs("div",{className:"securityNotice",children:[e.jsxs("div",{className:"securityHeader",children:[e.jsx("i",{className:"fas fa-shield-alt securityIcon"}),e.jsx("div",{className:"securityTitle",children:"Security First"})]}),e.jsx("div",{className:"securityText",children:"For your security, we require a verified withdrawal address for each cryptocurrency. This helps prevent errors and ensures your funds reach the correct destination."})]})]})})}),e.jsx("style",{children:`
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
      `})]})}export{fe as default};
