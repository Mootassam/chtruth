import{D as S,E as s,u as f,A as W,i as C,r as n,j as e,L as k,I as z}from"./index-fae849d1.js";import{S as D}from"./SubHeader-46d2e0e1.js";import{y as o,u as T,a as B,F as I}from"./FormErrors-df85b60a.js";import{F as L}from"./FieldFormItem-56c93c0a.js";import{u as E}from"./useDispatch-00ceb992.js";const R=S().shape({orderNo:o.string(s("entities.withdraw.fields.orderNo")),currency:o.string(s("entities.withdraw.fields.currency")),withdrawAmount:o.decimal(s("entities.withdraw.fields.withdrawAmount"),{required:!0}),fee:o.decimal(s("entities.withdraw.fields.fee")),totalAmount:o.decimal(s("entities.withdraw.fields.totalAmount")),auditor:o.relationToOne(s("entities.withdraw.fields.auditor")),acceptTime:o.datetime(s("entities.withdraw.fields.acceptTime")),status:o.enumerator(s("entities.withdraw.fields.status"),{options:["pending","canceled","success"]})});function $(){var w;const b=E(),r=f(W.selectCurrentUser),l=f(C.selectRows),[a,m]=n.useState(""),[d,u]=n.useState(null);n.useEffect(()=>{if(a&&l.length){const t=l.find(i=>i.symbol===a);u(t)}else u(null)},[a,l]);const g=r.wallet&&Object.values(r.wallet).some(t=>t&&t.address&&t.address.trim()!==""),[x]=n.useState(()=>({orderNo:"",currency:"",withdrawAmount:"",fee:"",totalAmount:"",auditor:"",acceptTime:"",status:"pending"})),c=T({resolver:B.yupResolver(R),mode:"all",defaultValues:x}),F=t=>{const i=new Date,A=i.getFullYear(),j=String(i.getMonth()+1).padStart(2,"0"),y=String(i.getDate()).padStart(2,"0"),N=`${A}${j}${y}`,v=Math.floor(Math.random()*1e7).toString().padStart(7,"0");t.orderNo=`RE${N}${v}`,t.currency=a,t.totalAmount=t.withdrawAmount,b(z.doCreate(t)),c.reset(x),m("")},h=[{id:"BTC",name:"Bitcoin",icon:"fab fa-btc",color:"#F3BA2F"},{id:"ETH",name:"Ethereum",icon:"fab fa-ethereum",color:"#627EEA"},{id:"USDT",name:"Tether",icon:"fas fa-dollar-sign",color:"#26A17B"},{id:"SOL",name:"Solana",icon:"fas fa-bolt",color:"#00FFA3"},{id:"XRP",name:"Ripple",icon:"fas fa-exchange-alt",color:"#23292F"}],p=n.useMemo(()=>h.find(t=>t.id===a),[a]);return e.jsxs("div",{className:"withdrawContainer",children:[e.jsx(D,{title:"Withdraw Crypto"}),e.jsxs("div",{className:"container",children:[g?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"currencySection",children:[e.jsx("div",{className:"sectionHeading",children:"Select Currency"}),e.jsxs("div",{className:"currencyDropdownContainer",children:[e.jsxs("select",{className:"currencyDropdown",value:a,onChange:t=>m(t.target.value),children:[e.jsx("option",{value:"",children:"Select a currency"}),h.map(t=>{console.log("===================================="),console.log(r.wallet),console.log("====================================");const i=r.wallet&&r.wallet[t.id]&&r.wallet[t.id].address;return r.wallet[t.id],e.jsx("option",{value:t.id,disabled:!i,children:t.name},t.id)})]}),a&&e.jsx("div",{className:"currencyDropdownIcon",style:{color:p.color},children:e.jsx("i",{className:p.icon})})]}),!a&&e.jsx("div",{className:"dropdownHint",children:"Please select a currency to continue"})]}),a&&e.jsx(I,{...c,children:e.jsx("form",{onSubmit:c.handleSubmit(F),children:e.jsxs("div",{className:"formSection",children:[e.jsxs("div",{className:"inputField",children:[e.jsx("label",{className:"inputLabel",children:"Withdrawal Address"}),e.jsxs("div",{className:"inputWrapper",children:[e.jsx("input",{type:"text",className:"textField ",id:"withdrawalAddress",placeholder:"Enter wallet address ",value:((w=r.wallet[a])==null?void 0:w.address)||"",disabled:!0}),e.jsxs("div",{className:"networkInfo",id:"networkDetails",children:["Network: ",p.label," (",a.toUpperCase(),")"]})]})]}),e.jsxs("div",{className:"inputField",children:[e.jsx("label",{className:"inputLabel",children:"Withdrawal Amount"}),e.jsxs("div",{className:"inputWrapper",children:[e.jsx(L,{name:"withdrawAmount",type:"number",className:"amountField",placeholder:"0.0"}),e.jsxs("div",{className:"balanceText",children:["Available:"," ",e.jsxs("span",{id:"availableBalance",children:[d?d==null?void 0:d.amount:0," ",a.toUpperCase()]})]})]})]}),e.jsxs("div",{className:"inputField",children:[e.jsx("label",{className:"inputLabel",children:"Withdrawal Password"}),e.jsx("div",{className:"inputWrapper",children:e.jsx("input",{type:"password",className:"textField",placeholder:"Enter withdrawal password"})})]}),e.jsxs("div",{className:"feeContainer",children:[e.jsxs("div",{className:"feeRow",children:[e.jsx("div",{className:"feeLabel",children:"Minimum withdrawal"}),e.jsxs("div",{className:"feeValue",id:"minWithdrawal",children:["0.001 ",a.toUpperCase()]})]}),e.jsxs("div",{className:"feeRow",children:[e.jsx("div",{className:"feeLabel",children:"Network fee"}),e.jsxs("div",{className:"feeValue",id:"networkFee",children:["0.0005 ",a.toUpperCase()]})]}),e.jsxs("div",{className:"feeRow",children:[e.jsx("div",{className:"feeLabel",children:"Service fee"}),e.jsxs("div",{className:"feeValue",id:"serviceFee",children:["0.0001 ",a.toUpperCase()]})]}),e.jsxs("div",{className:"feeRow receiveAmount",children:[e.jsx("div",{className:"feeLabel",children:"You will receive"}),e.jsxs("div",{className:"feeValue",id:"receiveAmount",children:["0.0000 ",a.toUpperCase()]})]})]}),e.jsxs("div",{className:"securityNotice",children:[e.jsxs("div",{className:"securityHeader",children:[e.jsx("i",{className:"fas fa-shield-alt securityIcon"}),e.jsx("div",{className:"securityTitle",children:"Security Verification"})]}),e.jsx("div",{className:"securityText",children:"For your security, withdrawals require password confirmation and may be subject to review. Withdrawals to incorrect addresses cannot be reversed."})]}),e.jsx("button",{type:"submit",className:"withdrawBtn",id:"withdrawBtn",children:"Confirm Withdrawal"})]})})})]}):e.jsx("div",{className:"noWalletSection",children:e.jsxs("div",{className:"noWalletCard",children:[e.jsx("div",{className:"noWalletIcon",children:e.jsx("i",{className:"fas fa-wallet"})}),e.jsx("h3",{children:"No Wallet Address Found"}),e.jsx("p",{children:"You haven't added any wallet addresses yet. Please add a withdrawal address to proceed with your transaction."}),e.jsxs(k,{to:"/withdrawaddress",className:"addWalletBtn",children:[e.jsx("i",{className:"fas fa-plus"}),"Add Wallet Address"]}),e.jsxs("div",{className:"securityNotice",children:[e.jsxs("div",{className:"securityHeader",children:[e.jsx("i",{className:"fas fa-shield-alt securityIcon"}),e.jsx("div",{className:"securityTitle",children:"Security First"})]}),e.jsx("div",{className:"securityText",children:"For your security, we require a verified withdrawal address for each cryptocurrency. This helps prevent errors and ensures your funds reach the correct destination."})]})]})}),e.jsx("div",{className:"toastMsg",id:"toastNotification",children:"Withdrawal address copied!"})]}),e.jsx("style",{children:`
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
      `})]})}export{$ as default};
