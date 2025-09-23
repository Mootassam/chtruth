import{t as l,D as aa,E as u,r as p,u as y,A as ea,X as V,i as ta,Y as sa,Z as na,k as L,j as a,_ as ia}from"./index-876fd0ee.js";import{y as k,u as oa,a as ca,d as ra,F as la}from"./FormErrors-e6c1ebcc.js";import{F as da}from"./FieldFormItem-b6ef5fee.js";import{u as ga}from"./useDispatch-2e80b338.js";const g=t=>t.plan.list,pa=l([g],t=>t.loading),ua=l([g],t=>t.exportLoading),S=l([g],t=>t.rows),D=l([g],t=>t.count),ka=l([D],t=>t>0),xa=l([g],t=>t.sorter||{}),ma=l([g],t=>{const c=t.sorter;if(!c||!c.field)return null;let x=c.order==="descend"?"DESC":"ASC";return`${c.field}_${x}`}),ha=l([g],t=>t.filter),ba=l([g],t=>t.rawFilter),fa=l([g],t=>t.pagination.pageSize),ya=l([g],t=>{const c=t.pagination;return!c||!c.pageSize?0:((c.current||1)-1)*c.pageSize}),va=l([g,D],(t,c)=>({...t.pagination,total:c})),O=l([g],t=>t.selectedKeys),ja=l([g,S],(t,c)=>c.filter(x=>t.selectedKeys.includes(x.id))),wa=l([S,O],(t,c)=>t.length===c.length),Na={selectLoading:pa,selectRows:S,selectCount:D,selectOrderBy:ma,selectLimit:fa,selectFilter:ha,selectOffset:ya,selectPagination:va,selectSelectedKeys:O,selectSelectedRows:ja,selectHasRows:ka,selectExportLoading:ua,selectRawFilter:ba,selectIsAllSelected:wa,selectSorter:xa},Sa=aa().shape({user:k.relationToOne(u("entities.stacking.fields.user"),{}),plan:k.relationToOne(u("entities.stacking.fields.plan"),{}),amount:k.decimal(u("entities.stacking.fields.amount"),{required:!0}),status:k.enumerator(u("entities.stacking.fields.status"),{options:["active","completed","cancelled"]}),startDate:k.datetime(u("entities.stacking.fields.startDate"),{}),endDate:k.datetime(u("entities.stacking.fields.endDate"),{}),earnedRewards:k.decimal(u("entities.stacking.fields.earnedRewards"),{})});function Pa(){const[t,c]=p.useState("options"),[x,F]=p.useState(!1),m=ga(),v=y(Na.selectRows),I=y(ea.selectCurrentUser);y(V.selectRows);const w=y(V.selectRows),B=y(ta.selectRows),[z,U]=p.useState({}),[i,K]=p.useState({crypto:"",daily:"",balance:0,min:0,max:0,symbol:"",plan:"",unstakingPeriod:""}),[h,N]=p.useState(""),[H]=p.useState(()=>({user:"",plan:"",amount:"",status:"",startDate:"",endDate:"",earnedRewards:""})),f=oa({resolver:ca.yupResolver(Sa),mode:"all",defaultValues:H}),R=ra({control:f.control,name:"amount",defaultValue:""});p.useEffect(()=>{N(R||"")},[R]);const W=async e=>{e.startDate=new Date;const s=new Date(e.startDate);s.setDate(s.getDate()+parseInt(i.unstakingPeriod)),e.endDate=s.toISOString(),e.status="active",e.plan=i.plan,e.user=I.id;try{await m(ia.doCreate(e)),m(L.doFetch()),A(n=>({...n,[i.symbol]:n[i.symbol]-parseFloat(h)})),P()}catch(n){console.error("Staking failed:",n)}},Y=()=>{if(!h||isNaN(h)||h<=0)return"0";const e=parseFloat(h),s=parseFloat(i.daily),n=parseFloat(i.unstakingPeriod);return(e*(s/100)*n).toFixed(6)},_=()=>{const e=parseFloat(h),s=E[i.symbol]||0;return isNaN(e)||e<=0?{isValid:!1,message:"Enter an amount"}:e>s?{isValid:!1,message:"Insufficient balance"}:e<i.min?{isValid:!1,message:`Min: ${i.min}`}:e>i.max?{isValid:!1,message:`Max: ${i.max}`}:{isValid:!0,message:"Confirm Stake"}},q=(e,s,n,r,o,d,b,j)=>{K({crypto:e,daily:s,balance:n,min:r,max:o,symbol:d,plan:b,unstakingPeriod:j}),F(!0),N(""),f.setValue("amount","")},P=()=>{F(!1),N(""),f.setValue("amount","")},[E,A]=p.useState({}),X=e=>{const s=B.reduce((n,r)=>(n[r.symbol]=r.amount,n),{});A(s)},Z=async()=>{try{const s=[...new Set(v.map(o=>o.currency))].map(async o=>{if(o==="USDT")return{currency:o,price:1};try{const b=await(await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${o}USDT`)).json();return{currency:o,price:parseFloat(b.price)}}catch(d){return console.error(`Error fetching price for ${o}:`,d),{currency:o,price:0}}}),n=await Promise.all(s),r={};n.forEach(o=>{r[o.currency]=o.price}),U(r)}catch(e){console.error("Error fetching crypto prices:",e)}},G=()=>{let e=0;return w.forEach(s=>{var d;const n=(d=s==null?void 0:s.plan)==null?void 0:d.currency,r=parseFloat(s.amount)||0,o=z[n]||0;e+=r*o}),e.toFixed(2)},J=()=>{let e=0;return w.forEach(s=>{var d;const n=(d=s==null?void 0:s.plan)==null?void 0:d.currency,r=parseFloat(s.earnedRewards)||0,o=z[n]||0;e+=r*o}),e.toFixed(2)};p.useEffect(()=>(m(sa.doFetch()),m(na.doFetch()),m(L.doFetch()),X(),()=>{}),[m]),p.useEffect(()=>{v.length>0&&Z()},[v]);const $=_(),T=!$.isValid,Q=$.message,M=e=>{const s=new Date,n=new Date(e.startDate);return Math.floor((s.getTime()-n.getTime())/(1e3*60*60*24))};return a.jsxs("div",{className:"stacking-container",children:[a.jsxs("div",{className:"stacking-header",children:[a.jsx("div",{className:"stacking-back-button",onClick:()=>window.history.back(),children:a.jsx("i",{className:"fas fa-arrow-left"})}),a.jsx("div",{className:"stacking-page-title",children:"Staking"}),a.jsx("div",{className:"stacking-header-actions"})]}),a.jsxs("div",{className:"stacking-overview",children:[a.jsx("div",{className:"stacking-label",children:"Total Staked Balance"}),a.jsxs("div",{className:"stacking-balance",children:["$",G()]}),a.jsxs("div",{className:"stacking-rewards-earned",children:["+ $",J()," earned"]})]}),a.jsxs("div",{className:"stacking-toggle-section",children:[a.jsx("div",{className:`stacking-toggle-option ${t==="options"?"stacking-toggle-active":""}`,onClick:()=>c("options"),children:"Staking Options"}),a.jsx("div",{className:`stacking-toggle-option ${t==="active"?"stacking-toggle-active":""}`,onClick:()=>c("active"),children:"Active Stakes"})]}),t==="options"&&a.jsx("div",{className:"stacking-options",children:v.map(e=>a.jsxs("div",{className:"stacking-option-card",children:[a.jsxs("div",{className:"stacking-option-header",children:[a.jsxs("div",{style:{display:"flex",gap:10,alignItems:"center"},children:[a.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${e.currency}.png`,style:{width:25,height:25},alt:e.currency}),a.jsx("div",{className:"stacking-option-name",children:e.currency})]}),a.jsxs("div",{className:"stacking-option-apy",children:[e.dailyRate,"% Daily"]})]}),a.jsxs("div",{className:"stacking-option-details",children:[a.jsx("div",{className:"stacking-detail-label",children:"Minimum Stake"}),a.jsxs("div",{className:"stacking-detail-value",children:[e.minimumStake," ",e.currency]})]}),a.jsxs("div",{className:"stacking-option-details",children:[a.jsx("div",{className:"stacking-detail-label",children:"Unstaking Period"}),a.jsxs("div",{className:"stacking-detail-value",children:[e.unstakingPeriod," days"]})]}),a.jsxs("div",{className:"stacking-stake-button",onClick:()=>q(e.currency,e.dailyRate,e.earnedRewards,e.minimumStake,e.maxStake,e.currency,e.id,e.unstakingPeriod),children:["Stake ",e.currency]})]},e.currency))}),t==="active"&&a.jsxs("div",{className:"stacking-active-stakes",children:[a.jsxs("div",{className:"stacking-section-title",children:[a.jsx("span",{children:"Active Stakes"}),a.jsx("span",{className:"stacking-view-all",children:"View All"})]}),w.map(e=>{var n,r,o,d,b,j,C;const s=Math.min(100,M(e)/((n=e==null?void 0:e.plan)==null?void 0:n.unstakingPeriod)*100);return a.jsxs("div",{className:"stacking-stake-item",children:[a.jsxs("div",{className:"stacking-stake-header",children:[a.jsxs("div",{style:{display:"flex",gap:10,alignItems:"center"},children:[a.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${(r=e==null?void 0:e.plan)==null?void 0:r.currency}.png`,style:{width:25,height:25},alt:e.currency}),a.jsx("div",{className:"stacking-stake-crypto",children:(o=e==null?void 0:e.plan)==null?void 0:o.currency})]}),a.jsxs("div",{className:"stacking-stake-amount",children:[e.amount," ",(d=e==null?void 0:e.plan)==null?void 0:d.currency]})]}),a.jsxs("div",{className:"stacking-stake-details",children:[a.jsx("div",{className:"stacking-stake-label",children:"Daily"}),a.jsxs("div",{className:"stacking-stake-value",children:[(b=e==null?void 0:e.plan)==null?void 0:b.dailyRate,"%"]})]}),a.jsxs("div",{className:"stacking-stake-details",children:[a.jsx("div",{className:"stacking-stake-label",children:"Earned"}),a.jsxs("div",{className:"stacking-stake-value stacking-value-positive",children:[e.earnedRewards||0," ",(j=e==null?void 0:e.plan)==null?void 0:j.currency]})]}),a.jsxs("div",{className:"stacking-stake-details",children:[a.jsx("div",{className:"stacking-stake-label",children:"Duration"}),a.jsxs("div",{className:"stacking-stake-value",children:[M(e),"/",(C=e==null?void 0:e.plan)==null?void 0:C.unstakingPeriod," days"]})]}),a.jsx("div",{className:"stacking-progress-bar",children:a.jsx("div",{className:"stacking-progress-fill",style:{width:`${s}%`}})})]},e.id)})]}),x&&a.jsx("div",{className:"stacking-modal-overlay",children:a.jsx("div",{className:"stacking-modal-content",children:a.jsx(la,{...f,children:a.jsxs("form",{onSubmit:f.handleSubmit(W),children:[a.jsxs("div",{className:"stacking-modal-header",children:[a.jsxs("div",{className:"stacking-modal-title",children:["Stake ",a.jsx("span",{children:i.crypto})]}),a.jsx("div",{className:"stacking-close-modal",onClick:P,children:a.jsx("i",{className:"fas fa-times"})})]}),a.jsxs("div",{className:"stacking-input-group",children:[a.jsx(da,{name:"amount",type:"number",label:"Amount to Stake",className:"textField",className1:"inputField",className2:"inputLabel",className3:"inputWrapper",placeholder:"Enter The Amount"}),a.jsxs("div",{className:"stacking-balance-info",children:["Balance: ",a.jsx("span",{children:E[i.symbol]||0})," ",a.jsx("span",{children:i.symbol})]})]}),a.jsxs("div",{className:"stacking-modal-details",children:[a.jsxs("div",{className:"stacking-modal-detail",children:[a.jsx("span",{children:"Daily"}),a.jsxs("span",{children:[i.daily,"%"]})]}),a.jsxs("div",{className:"stacking-modal-detail",children:[a.jsx("span",{children:"Minimum Stake"}),a.jsxs("span",{children:[i.min," ",i.symbol]})]}),a.jsxs("div",{className:"stacking-modal-detail",children:[a.jsx("span",{children:"Maximum Stake"}),a.jsxs("span",{children:[i.max," ",i.symbol]})]}),a.jsxs("div",{className:"stacking-modal-detail",children:[a.jsx("span",{children:"Estimated Total Rewards"}),a.jsxs("span",{children:[Y()," ",i.symbol]})]})]}),a.jsx("button",{type:"submit",disabled:T,className:`stacking-modal-button ${T?"stacking-modal-button-disabled":""}`,children:Q})]})})})}),a.jsx("style",{children:`
        .stacking-container {
          max-width: 400px;
          margin: 0 auto;
          background-color: #000000;
          color: #ffffff;
          min-height: 100vh;
          padding-bottom: 80px;
        }

        /* Header Section */
        .stacking-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 15px;
          background-color: #000000;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .stacking-back-button {
          cursor: pointer;
          font-size: 18px;
        }

        .stacking-page-title {
          font-weight: bold;
          font-size: 18px;
        }

        .stacking-header-actions {
          display: flex;
          gap: 15px;
        }

        .stacking-header-icon {
          font-size: 20px;
          cursor: pointer;
        }

        /* Staking Overview */
        .stacking-overview {
          margin: 20px 15px;
          background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
          border-radius: 16px;
          padding: 20px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .stacking-balance {
          font-size: 32px;
          font-weight: bold;
          margin: 10px 0;
          color: #f3ba2f;
        }

        .stacking-label {
          color: #aaaaaa;
          font-size: 14px;
          margin-bottom: 15px;
        }

        .stacking-rewards-earned {
          background-color: rgba(0, 192, 118, 0.2);
          color: #00c076;
          padding: 8px 15px;
          border-radius: 20px;
          font-size: 14px;
          display: inline-block;
          margin-top: 10px;
        }

        /* Toggle Section */
        .stacking-toggle-section {
          display: flex;
          background-color: #1a1a1a;
          margin: 0 15px 20px;
          border-radius: 12px;
          padding: 5px;
        }

        .stacking-toggle-option {
          flex: 1;
          padding: 12px;
          text-align: center;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .stacking-toggle-active {
          background-color: #2a2a2a;
          color: #f3ba2f;
        }

        /* Staking Options */
        .stacking-options {
          margin: 0 15px 20px;
        }

        .stacking-option-card {
          background-color: #1a1a1a;
          border-radius: 12px;
          padding: 15px;
          margin-bottom: 15px;
          border: 1px solid #2a2a2a;
          transition: transform 0.2s ease;
        }

        .stacking-option-card:hover {
          transform: translateY(-2px);
          border-color: #f3ba2f;
        }

        .stacking-option-header {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
        }

        .stacking-option-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 12px;
        }

        .stacking-eth-icon {
          background-color: #627eea;
          color: #fff;
        }

        .stacking-btc-icon {
          background-color: #f3ba2f;
          color: #000;
        }

        .stacking-bnb-icon {
          background-color: #f3ba2f;
          color: #000;
        }

        .stacking-option-name {
          font-weight: bold;
          font-size: 16px;
        }

        .stacking-option-apy {
          margin-left: auto;
          background-color: rgba(0, 192, 118, 0.2);
          color: #00c076;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: bold;
        }

        .stacking-option-details {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .stacking-detail-label {
          color: #aaaaaa;
          font-size: 14px;
        }

        .stacking-detail-value {
          font-weight: bold;
          font-size: 14px;
        }

        .stacking-stake-button {
          background-color: #f3ba2f;
          color: #000000;
          text-align: center;
          padding: 12px;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          margin-top: 10px;
          transition: background-color 0.2s ease;
        }

        .stacking-stake-button:hover {
          background-color: #e0a91c;
        }

        /* Active Stakes */
        .stacking-active-stakes {
          margin: 25px 15px;
        }

        .stacking-section-title {
          font-weight: bold;
          font-size: 16px;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .stacking-view-all {
          color: #f3ba2f;
          font-size: 14px;
          cursor: pointer;
        }

        .stacking-stake-item {
          background-color: #1a1a1a;
          border-radius: 12px;
          padding: 15px;
          margin-bottom: 15px;
        }

        .stacking-stake-header {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
        }

        .stacking-stake-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 10px;
        }

        .stacking-stake-crypto {
          font-weight: bold;
        }

        .stacking-stake-amount {
          margin-left: auto;
          font-weight: bold;
        }

        .stacking-stake-details {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .stacking-stake-label {
          color: #aaaaaa;
          font-size: 12px;
        }

        .stacking-stake-value {
          font-size: 12px;
          font-weight: 500;
        }

        .stacking-value-positive {
          color: #00c076;
        }

        .stacking-progress-bar {
          height: 6px;
          background-color: #2a2a2a;
          border-radius: 3px;
          margin: 10px 0;
          overflow: hidden;
        }

        .stacking-progress-fill {
          height: 100%;
          background-color: #f3ba2f;
          border-radius: 3px;
          width: 65%;
        }

        /* Modal */
        .stacking-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .stacking-modal-content {
          background-color: #1a1a1a;
          width: 90%;
          max-width: 400px;
          border-radius: 16px;
          padding: 20px;
        }

        .stacking-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .stacking-modal-title {
          font-weight: bold;
          font-size: 18px;
        }

        .stacking-close-modal {
          color: #aaaaaa;
          font-size: 20px;
          cursor: pointer;
        }

        .stacking-input-group {
          margin-bottom: 20px;
        }

        .stacking-input-label {
          display: block;
          color: #aaaaaa;
          margin-bottom: 8px;
          font-size: 14px;
        }

        .stacking-amount-input {
          background-color: #2a2a2a;
          border: none;
          color: white;
          font-size: 18px;
          padding: 15px;
          border-radius: 8px;
          width: 100%;
          outline: none;
        }

        .stacking-balance-info {
          text-align: right;
          color: #aaaaaa;
          font-size: 12px;
          margin-top: 5px;
        }

        .stacking-modal-details {
          background-color: #2a2a2a;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 20px;
        }

        .stacking-modal-detail {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .stacking-modal-detail:last-child {
          margin-bottom: 0;
        }

        .stacking-modal-button {
          background-color: #f3ba2f;
          color: #000000;
          text-align: center;
          padding: 16px;
          border-radius: 12px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.2s ease;
          border: none;
          width: 100%;
          font-size: 16px;
        }

        .stacking-modal-button:hover:not(:disabled) {
          background-color: #e0a91c;
        }

        .stacking-modal-button-disabled {
          background-color: #2a2a2a !important;
          color: #aaaaaa !important;
          cursor: not-allowed !important;
        }

        @media (max-width: 350px) {
          .stacking-balance {
            font-size: 28px;
          }

          .stacking-option-icon {
            width: 36px;
            height: 36px;
          }

          .stacking-option-name {
            font-size: 14px;
          }
        }
      `})]})}export{Pa as default};
