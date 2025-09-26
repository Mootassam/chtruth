import{F as R,G as d,J as L,u as k,x as P,i as I,r as l,k as D,j as e,L as $,K as H}from"./index-066d6d6a.js";import{S as M}from"./SubHeader-b25e4655.js";import{a as c,u as V,y as q,F as O}from"./yup-e16dc47d.js";import{u as U}from"./useDispatch-1623005e.js";const b={BTC:{minAmount:91e-5,fee:2e-5,network:"Bitcoin"},ETH:{minAmount:.0077,fee:5e-4,network:"Ethereum (ERC20)"},USDT:{minAmount:30,fee:3,network:"Tron (TRC20)"},SOL:{minAmount:.01,fee:5e-6,network:"Solana"},XRP:{minAmount:10,fee:.1,network:"Ripple"}},Y=R().shape({orderNo:c.string(d("entities.withdraw.fields.orderNo")),currency:c.string(d("entities.withdraw.fields.currency")),withdrawAmount:c.decimal(d("entities.withdraw.fields.withdrawAmount"),{required:!0}),fee:c.decimal(d("entities.withdraw.fields.fee")),totalAmount:c.decimal(d("entities.withdraw.fields.totalAmount")),auditor:c.relationToOne(d("entities.withdraw.fields.auditor")),acceptTime:c.datetime(d("entities.withdraw.fields.acceptTime")),status:c.enumerator(d("entities.withdraw.fields.status"),{options:["pending","canceled","success"]}),withdrawPassword:L().required("Withdrawal password is required").min(6,"Withdrawal password must be at least 6 characters")});function Q(){const g=U(),p=k(P.selectCurrentUser),F=k(I.selectRows),[j,A]=l.useState(""),[a,N]=l.useState(""),[u,v]=l.useState(null),[x,y]=l.useState(""),[n,f]=l.useState({});l.useEffect(()=>{var t,s;if(a&&F.length){const r=F.find(h=>h.symbol===a);v(r||null);const i=((s=(t=p==null?void 0:p.wallet)==null?void 0:t[a])==null?void 0:s.address)||"";A(i)}else v(null),A("")},[a,F,p]),l.useEffect(()=>{g(D.doFetch())},[g]);const T=p.wallet&&Object.values(p.wallet).some(t=>{var s;return((s=t==null?void 0:t.address)==null?void 0:s.trim())!==""}),S={orderNo:"",currency:"",withdrawAmount:"",fee:"",totalAmount:"",auditor:"",acceptTime:"",status:"pending",withdrawAdress:"",withdrawPassword:""},m=V({resolver:q.yupResolver(Y),mode:"all",defaultValues:S}),z=()=>{var r;if(!a||!x)return 0;const t=parseFloat(x);if(isNaN(t))return 0;const s=((r=b[a])==null?void 0:r.fee)||0;return Math.max(0,t-s)},B=()=>{var s;const t={};if(a||(t.currency="Please select a currency"),!x)t.amount="Please enter withdrawal amount";else{const r=parseFloat(x),i=((s=b[a])==null?void 0:s.minAmount)||0,h=(u==null?void 0:u.amount)||0;isNaN(r)||r<=0?t.amount="Please enter a valid amount":r<i?t.amount=`Minimum withdrawal is ${i} ${a}`:r>h&&(t.amount=`Insufficient balance. Available: ${h} ${a}`)}return m.watch("withdrawPassword")||(t.password="Withdrawal password is required"),f(t),Object.keys(t).length===0},C=t=>{var h;if(!B())return;const s=new Date,r=`${s.getFullYear()}${String(s.getMonth()+1).padStart(2,"0")}${String(s.getDate()).padStart(2,"0")}`,i=Math.floor(Math.random()*1e7).toString().padStart(7,"0");t.orderNo=`RE${r}${i}`,t.currency=a,t.totalAmount=t.withdrawAmount,t.withdrawAdress=j,t.fee=((h=b[a])==null?void 0:h.fee)||0,g(H.doCreate(t)),m.reset(S),N(""),A(""),y(""),f({})},W=[{id:"BTC",name:"Bitcoin",icon:"fab fa-btc",color:"#F3BA2F"},{id:"ETH",name:"Ethereum",icon:"fab fa-ethereum",color:"#627EEA"},{id:"USDT",name:"Tether",icon:"fas fa-dollar-sign",color:"#26A17B"},{id:"SOL",name:"Solana",icon:"fas fa-bolt",color:"#00FFA3"},{id:"XRP",name:"Ripple",icon:"fas fa-exchange-alt",color:"#23292F"}],o=l.useMemo(()=>W.find(t=>t.id===a),[a]),w=a?b[a]:null,E=z();return e.jsxs("div",{className:"withdrawContainer",children:[e.jsx(M,{title:"Withdraw Crypto"}),e.jsxs("div",{className:"container",children:[T?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"currencySection",children:[e.jsx("div",{className:"sectionHeading",children:"Select Currency"}),e.jsxs("div",{className:"currencyDropdownContainer",children:[e.jsxs("select",{className:"currencyDropdown",value:a,onChange:t=>{N(t.target.value),f({})},children:[e.jsx("option",{value:"",children:"Select a currency"}),W.map(t=>{var r,i;const s=(i=(r=p.wallet)==null?void 0:r[t.id])==null?void 0:i.address;return e.jsxs("option",{value:t.id,disabled:!s,children:[t.name," (",t.id,")",!s&&" - No wallet address"]},t.id)})]}),a&&e.jsx("div",{className:"currencyDropdownIcon",style:{color:o==null?void 0:o.color},children:e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${o==null?void 0:o.id.toUpperCase()}.png`,style:{width:25,height:25},alt:o==null?void 0:o.id})})]}),n.currency&&e.jsx("div",{className:"errorText",children:n.currency}),!a&&e.jsx("div",{className:"dropdownHint",children:"Please select a currency to continue"})]}),a&&e.jsx(O,{...m,children:e.jsx("form",{onSubmit:m.handleSubmit(C),children:e.jsxs("div",{className:"formSection",children:[e.jsxs("div",{className:"inputField",children:[e.jsx("label",{className:"inputLabel",children:"Withdrawal Address"}),e.jsxs("div",{className:"inputWrapper",children:[e.jsx("input",{type:"text",className:"textField",id:"withdrawalAddress",placeholder:"Enter wallet address",value:j,disabled:!0}),e.jsxs("div",{className:"networkInfo",id:"networkDetails",children:["Network: ",w==null?void 0:w.network]})]})]}),e.jsxs("div",{className:"inputField",children:[e.jsx("label",{className:"inputLabel",children:"Withdrawal Amount"}),e.jsxs("div",{className:"inputWrapper",children:[e.jsx("input",{type:"number",step:"any",className:"amountField",placeholder:"0.0",value:x,onChange:t=>{y(t.target.value),m.setValue("withdrawAmount",t.target.value),f({...n,amount:null})}}),e.jsxs("div",{className:"balanceText",children:["Available:"," ",e.jsxs("span",{id:"availableBalance",children:[u?u==null?void 0:u.amount:0," ",a.toUpperCase()]})]})]}),n.amount&&e.jsx("div",{className:"errorText",children:n.amount})]}),e.jsxs("div",{className:"inputField",children:[e.jsx("label",{className:"inputLabel",children:"Withdrawal Password"}),e.jsx("div",{className:"inputWrapper",children:e.jsx("input",{type:"password",className:"textField",placeholder:"Enter withdrawal password",...m.register("withdrawPassword"),onChange:()=>f({...n,password:null})})}),n.password&&e.jsx("div",{className:"errorText",children:n.password})]}),e.jsx("div",{className:"feeContainer",children:w&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"feeRow",children:[e.jsx("div",{className:"feeLabel",children:"Minimum withdrawal"}),e.jsxs("div",{className:"feeValue",children:[w.minAmount," ",a]})]}),e.jsxs("div",{className:"feeRow",children:[e.jsx("div",{className:"feeLabel",children:"Network fee"}),e.jsxs("div",{className:"feeValue",children:[w.fee," ",a]})]}),e.jsxs("div",{className:"feeRow",children:[e.jsx("div",{className:"feeLabel",children:"Service fee"}),e.jsxs("div",{className:"feeValue",children:["0.0000 ",a]})]}),e.jsxs("div",{className:"feeRow receiveAmount",children:[e.jsx("div",{className:"feeLabel",children:"You will receive"}),e.jsxs("div",{className:"feeValue",children:[E.toFixed(8)," ",a]})]})]})}),e.jsxs("div",{className:"securityNotice",children:[e.jsxs("div",{className:"securityHeader",children:[e.jsx("i",{className:"fas fa-shield-alt securityIcon"}),e.jsx("div",{className:"securityTitle",children:"Security Verification"})]}),e.jsx("div",{className:"securityText",children:"For your security, withdrawals require password confirmation and may be subject to review. Withdrawals to incorrect addresses cannot be reversed."})]}),e.jsx("button",{type:"submit",className:"withdrawBtn",disabled:!x||!m.watch("withdrawPassword"),children:"Confirm Withdrawal"})]})})})]}):e.jsx("div",{className:"noWalletSection",children:e.jsxs("div",{className:"noWalletCard",children:[e.jsx("div",{className:"noWalletIcon",children:e.jsx("i",{className:"fas fa-wallet"})}),e.jsx("h3",{children:"No Wallet Address Found"}),e.jsx("p",{children:"You haven't added any wallet addresses yet. Please add a withdrawal address to proceed with your transaction."}),e.jsxs($,{to:"/withdrawaddress",className:"addWalletBtn",children:[e.jsx("i",{className:"fas fa-plus"}),"Add Wallet Address"]}),e.jsxs("div",{className:"securityNotice",children:[e.jsxs("div",{className:"securityHeader",children:[e.jsx("i",{className:"fas fa-shield-alt securityIcon"}),e.jsx("div",{className:"securityTitle",children:"Security First"})]}),e.jsx("div",{className:"securityText",children:"For your security, we require a verified withdrawal address for each cryptocurrency. This helps prevent errors and ensures your funds reach the correct destination."})]})]})}),e.jsx("div",{className:"toastMsg",id:"toastNotification",children:"Withdrawal address copied!"})]}),e.jsx("style",{children:`
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
          color: #FFFFFF;
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
        
        .errorText {
          color: #FF4444;
          font-size: 14px;
          margin-top: 5px;
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
          border: 1px solid #333333;
        }
        
        .inputWrapper:focus-within {
          border-color: #F3BA2F;
        }
        
        .textField {
          width: 100%;
          background: transparent;
          border: none;
          color: #FFFFFF;
          font-size: 16px;
          outline: none;
        }
        
        .textField:disabled {
          color: #777777;
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
          border: 1px solid #333333;
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
          font-size: 16px;
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
        
        .withdrawBtn:hover:not(:disabled) {
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
      `})]})}export{Q as default};
