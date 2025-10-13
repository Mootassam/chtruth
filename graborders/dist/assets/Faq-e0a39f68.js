import{h as t,j as e}from"./index-d1d6c6ad.js";const N=()=>{const[a,l]=t.useState(""),[d,i]=t.useState(!1),[p,x]=t.useState(""),m=t.useRef(null),f=[{id:"1",question:"How do I create an account?",answer:e.jsxs("div",{className:"step-list",children:[e.jsxs("div",{className:"step-items",children:[e.jsx("i",{className:"fas fa-arrow-right step-arrow"}),"Go to www.nexustradex.com"]}),e.jsxs("div",{className:"step-items",children:[e.jsx("i",{className:"fas fa-arrow-right step-arrow"}),'Click "Sign Up"']}),e.jsxs("div",{className:"step-items",children:[e.jsx("i",{className:"fas fa-arrow-right step-arrow"}),"Enter your details"]}),e.jsxs("div",{className:"step-items",children:[e.jsx("i",{className:"fas fa-arrow-right step-arrow"}),"Verify your email address"]})]}),icon:"fa-user-plus",category:"getting-started"},{id:"2",question:"How do I complete verification?",answer:"Upload a government-issued ID and a selfie photo. Verification is usually approved within hours.",icon:"fa-id-card",category:"getting-started"},{id:"3",question:"How do I buy cryptocurrency?",answer:e.jsxs("div",{className:"step-list",children:[e.jsxs("div",{className:"step-items",children:[e.jsx("i",{className:"fas fa-arrow-right step-arrow"}),"Complete verification first"]}),e.jsxs("div",{className:"step-items",children:[e.jsx("i",{className:"fas fa-arrow-right step-arrow"}),'Click "Buy Crypto"']}),e.jsxs("div",{className:"step-items",children:[e.jsx("i",{className:"fas fa-arrow-right step-arrow"}),"Select coin and payment method"]}),e.jsxs("div",{className:"step-items",children:[e.jsx("i",{className:"fas fa-arrow-right step-arrow"}),"Confirm transaction"]}),e.jsxs("div",{className:"step-items",children:[e.jsx("i",{className:"fas fa-arrow-right step-arrow"}),"Crypto will appear in your wallet"]})]}),icon:"fa-shopping-cart",category:"getting-started"},{id:"4",question:"How do I trade cryptocurrencies?",answer:e.jsxs("div",{className:"step-list",children:[e.jsxs("div",{className:"step-items",children:[e.jsx("i",{className:"fas fa-arrow-right step-arrow"}),'Go to "Trade/Markets"']}),e.jsxs("div",{className:"step-items",children:[e.jsx("i",{className:"fas fa-arrow-right step-arrow"}),"Pick a trading pair (e.g., BTC/USDT)"]}),e.jsxs("div",{className:"step-items",children:[e.jsx("i",{className:"fas fa-arrow-right step-arrow"}),"Place market or limit orders"]})]}),icon:"fa-chart-line",category:"managing-account"},{id:"5",question:"How do I receive and send crypto?",answer:e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"To receive:"})," Go to Wallet > Receive → copy address or QR code",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"To send:"})," Go to Wallet > Send → enter address/amount → confirm"]}),icon:"fa-wallet",category:"managing-account"},{id:"6",question:"How do I become a P2P Merchant?",answer:e.jsxs("div",{className:"step-list",children:[e.jsxs("div",{className:"step-items",children:[e.jsx("i",{className:"fas fa-arrow-right step-arrow"}),'Apply under "P2P" section']}),e.jsxs("div",{className:"step-items",children:[e.jsx("i",{className:"fas fa-arrow-right step-arrow"}),"Meet eligibility criteria"]}),e.jsxs("div",{className:"step-items",children:[e.jsx("i",{className:"fas fa-arrow-right step-arrow"}),"Once approved, create offers & trade"]})]}),icon:"fa-store",category:"managing-account"},{id:"7",question:"How does staking work?",answer:e.jsxs("div",{className:"step-list",children:[e.jsxs("div",{className:"step-items",children:[e.jsx("i",{className:"fas fa-arrow-right step-arrow"}),"Go to Wallets > Staking"]}),e.jsxs("div",{className:"step-items",children:[e.jsx("i",{className:"fas fa-arrow-right step-arrow"}),"Pick a staking plan"]}),e.jsxs("div",{className:"step-items",children:[e.jsx("i",{className:"fas fa-arrow-right step-arrow"}),"Select amount to stake"]}),e.jsxs("div",{className:"step-items",children:[e.jsx("i",{className:"fas fa-arrow-right step-arrow"}),"Confirm transaction"]}),e.jsxs("div",{className:"step-items",children:[e.jsx("i",{className:"fas fa-arrow-right step-arrow"}),"Rewards processed automatically at end of period"]})]}),icon:"fa-coins",category:"managing-account"}],g=[{id:"f1",question:"What are futures contracts?",answer:"Agreements to buy or sell crypto at a predetermined price on a future date (cash-settled).",icon:"fa-file-contract",category:"futures"},{id:"f2",question:"What is leverage?",answer:"Ability to trade with more capital than you have (e.g., 10x, 20x, 50x leverage).",icon:"fa-arrows-alt-h",category:"futures"},{id:"f3",question:"What are Long and Short positions?",answer:e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Long"})," = betting the price will go up",e.jsx("br",{}),e.jsx("strong",{children:"Short"})," = betting the price will go down"]}),icon:"fa-long-arrow-alt-up",category:"futures"},{id:"f4",question:"What are Margin & Liquidation?",answer:"Risk of position liquidation if your collateral drops too low to maintain the position.",icon:"fa-exclamation-triangle",category:"futures"},{id:"f5",question:"What is the Funding Rate?",answer:"Fee exchanged every 8 hours between long and short traders to balance perpetual contract prices with spot prices.",icon:"fa-percentage",category:"futures"},{id:"f6",question:"How is Profit/Loss calculated?",answer:"Calculated based on price difference multiplied by your leverage and position size.",icon:"fa-calculator",category:"futures"}],h=[{id:"ac1",title:"Contact Support",description:"Get help from our team",icon:"fa-headset"},{id:"ac2",title:"Learning Center",description:"Expand your knowledge",icon:"fa-graduation-cap"},{id:"ac3",title:"Tutorials",description:"Step-by-step guides",icon:"fa-book"},{id:"ac4",title:"Community",description:"Join discussions",icon:"fa-comments"}],o=f.filter(s=>s.question.toLowerCase().includes(a.toLowerCase())||typeof s.answer=="string"&&s.answer.toLowerCase().includes(a.toLowerCase())),r=g.filter(s=>s.question.toLowerCase().includes(a.toLowerCase())||typeof s.answer=="string"&&s.answer.toLowerCase().includes(a.toLowerCase())),u=()=>{window.history.back()},w=s=>{x(`Opening ${s}`),i(!0),setTimeout(()=>{i(!1)},3e3)},n=o.filter(s=>s.category==="getting-started"),c=o.filter(s=>s.category==="managing-account");return e.jsxs("div",{className:"container",children:[e.jsx("div",{className:"headerq",children:e.jsxs("div",{className:"header-content",children:[e.jsx("div",{className:"back-button",onClick:u,children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("div",{className:"page-title",children:"FAQ Center"}),e.jsx("div",{className:"placeholder"})]})}),e.jsxs("div",{className:"hero-section",children:[e.jsx("div",{className:"hero-title",children:"Frequently Asked Questions"}),e.jsx("div",{className:"hero-subtitle",children:"Find answers to common questions about using Nexus"})]}),e.jsx("div",{className:"search-container",children:e.jsx("input",{type:"text",className:"search-bar",placeholder:"Search for answers...",value:a,onChange:s=>l(s.target.value)})}),n.length>0&&e.jsxs("div",{className:"faq-section",children:[e.jsx("div",{className:"section-title",children:"Getting Started"}),e.jsx("div",{className:"faq-category",children:n.map(s=>e.jsxs("div",{className:"faq-item",children:[e.jsxs("div",{className:"faq-question",children:[e.jsx("i",{className:`fas ${s.icon} faq-icon`}),s.question]}),e.jsx("div",{className:"faq-answer",children:s.answer})]},s.id))})]}),c.length>0&&e.jsxs("div",{className:"faq-section",children:[e.jsx("div",{className:"section-title",children:"Managing Your Account"}),e.jsx("div",{className:"faq-category",children:c.map(s=>e.jsxs("div",{className:"faq-item",children:[e.jsxs("div",{className:"faq-question",children:[e.jsx("i",{className:`fas ${s.icon} faq-icon`}),s.question]}),e.jsx("div",{className:"faq-answer",children:s.answer})]},s.id))})]}),r.length>0&&e.jsxs("div",{className:"futures-section",children:[e.jsxs("div",{className:"futures-title",children:[e.jsx("i",{className:"fas fa-chart-bar"}),"Futures Trading Explained"]}),r.map(s=>e.jsxs("div",{className:"faq-item",children:[e.jsxs("div",{className:"faq-question",children:[e.jsx("i",{className:`fas ${s.icon} faq-icon`}),s.question]}),e.jsx("div",{className:"faq-answer",children:s.answer})]},s.id))]}),e.jsxs("div",{className:"benefits-section",children:[e.jsxs("div",{className:"benefits-title",children:[e.jsx("i",{className:"fas fa-star"}),"Why Choose Nexus Futures?"]}),e.jsxs("ul",{className:"benefits-list",children:[e.jsxs("li",{className:"benefit-item",children:[e.jsx("i",{className:"fas fa-shield-alt benefit-icon"}),e.jsx("div",{className:"benefit-content",children:e.jsx("div",{className:"benefit-text",children:"Hedge against market volatility"})})]}),e.jsxs("li",{className:"benefit-item",children:[e.jsx("i",{className:"fas fa-rocket benefit-icon"}),e.jsx("div",{className:"benefit-content",children:e.jsx("div",{className:"benefit-text",children:"Multiply profits with leverage"})})]}),e.jsxs("li",{className:"benefit-item",children:[e.jsx("i",{className:"fas fa-arrows-alt-v benefit-icon"}),e.jsx("div",{className:"benefit-content",children:e.jsx("div",{className:"benefit-text",children:"Trade both rising and falling markets"})})]}),e.jsxs("li",{className:"benefit-item",children:[e.jsx("i",{className:"fas fa-chess benefit-icon"}),e.jsx("div",{className:"benefit-content",children:e.jsx("div",{className:"benefit-text",children:"Implement advanced trading strategies"})})]})]})]}),e.jsx("div",{className:"action-cards",children:h.map(s=>e.jsxs("div",{className:"action-card",onClick:()=>w(s.title),children:[e.jsx("i",{className:`fas ${s.icon} action-icon`}),e.jsx("div",{className:"action-title",children:s.title}),e.jsx("div",{className:"action-description",children:s.description})]},s.id))}),e.jsxs("div",{className:"footer",children:["© 2025 Nexus Nexus Exchange. All rights reserved.",e.jsx("br",{}),"Need more help? Contact support@nexustradex.com"]}),e.jsx("div",{ref:m,className:`notification ${d?"show":""}`,children:p}),e.jsx("style",{children:`





.faq-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  padding-bottom: 80px;
  background-color: #000000;
  min-height: 100vh;
}

/* Header Section */
.headerq {
  background-color: #000000;
  padding: 15px 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.back-button {
  color: #FFFFFF;
  font-size: 20px;
  cursor: pointer;
  width: 20px;
}

.page-title {
  font-size: 20px;
  font-weight: bold;
}

.placeholder {
  width: 20px;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(145deg, #1A1A1A, #2A2A2A);
  border-radius: 12px;
  padding: 25px;
  text-align: center;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
}

.hero-title {
  font-size: 22px;
  font-weight: bold;
  color: #F3BA2F;
  margin-bottom: 10px;
}

.hero-subtitle {
  font-size: 16px;
  color: #AAAAAA;
  line-height: 1.5;
}

/* FAQ Sections */
.faq-section {
  margin-bottom: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #F3BA2F;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #2A2A2A;
}

.faq-category {
  margin-bottom: 25px;
}

.category-title {
  font-size: 16px;
  font-weight: 600;
  color: #F3BA2F;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.category-icon {
  font-size: 18px;
}

.faq-item {
  background-color: #1A1A1A;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 12px;
}

.faq-question {
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 15px;
  color: #FFFFFF;
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.faq-icon {
  color: #00C076;
  font-size: 16px;
  margin-top: 2px;
  flex-shrink: 0;
}

.faq-answer {
  font-size: 14px;
  color: #AAAAAA;
  line-height: 1.5;
  margin-left: 26px;
}

.step-list {
  margin-left: 26px;
  margin-top: 8px;
}

.step-items {
  font-size: 14px;
  color: #AAAAAA;
  line-height: 1.5;
  margin-bottom: 5px;
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.step-arrow {
  color: #F3BA2F;
  font-size: 12px;
  margin-top: 4px;
  flex-shrink: 0;
}

/* Futures Section */
.futures-section {
  background-color: #1A1A1A;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 20px;
  border-left: 4px solid #FF6838;
}

.futures-title {
  font-size: 18px;
  font-weight: bold;
  color: #FF6838;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.futures-content {
  font-size: 14px;
  line-height: 1.5;
}

/* Benefits Section */
.benefits-section {
  background-color: #1A1A1A;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 20px;
  border-left: 4px solid #00C076;
}

.benefits-title {
  font-size: 18px;
  font-weight: bold;
  color: #00C076;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.benefits-list {
  list-style-type: none;
}

.benefit-item {
  padding: 10px 0;
  border-bottom: 1px solid #2A2A2A;
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.benefit-item:last-child {
  border-bottom: none;
}

.benefit-icon {
  color: #00C076;
  font-size: 16px;
  margin-top: 2px;
  flex-shrink: 0;
}

.benefit-content {
  flex: 1;
}

.benefit-text {
  font-size: 14px;
  line-height: 1.5;
}

/* Action Cards */
.action-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 25px;
}

.action-card {
  background-color: #1A1A1A;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  transition: transform 0.2s;
  cursor: pointer;
}

.action-card:hover {
  transform: translateY(-3px);
}

.action-icon {
  font-size: 30px;
  color: #F3BA2F;
  margin-bottom: 12px;
}

.action-title {
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 15px;
}

.action-description {
  font-size: 13px;
  color: #AAAAAA;
}

/* Search Bar */
.search-container {
  margin-bottom: 20px;
}

.search-bar {
  width: 100%;
  padding: 15px;
  background-color: #1A1A1A;
  border: 1px solid #2A2A2A;
  border-radius: 10px;
  color: #FFFFFF;
  font-size: 14px;
}

.search-bar::placeholder {
  color: #AAAAAA;
}

.search-bar:focus {
  outline: none;
  border-color: #F3BA2F;
}

/* Notification */
.notification {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #00C076;
  color: #000000;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.3s;
}

.notification.show {
  opacity: 1;
}

/* Footer */
.footer {
  text-align: center;
  padding: 20px 0;
  color: #AAAAAA;
  font-size: 12px;
  border-top: 1px solid #2A2A2A;
  margin-top: 20px;
}
      `})]})};export{N as default};
