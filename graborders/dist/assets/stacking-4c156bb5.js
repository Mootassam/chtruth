import{w as l,G as aa,H as u,r as g,u as v,x as ta,a1 as V,i as ea,a2 as sa,a3 as na,k as O,j as a,a4 as ia}from"./index-43651a87.js";import{a as m,u as oa,y as ca,b as ra,F as la}from"./FormErrors-cf1db234.js";import{F as da}from"./FieldFormItem-8e9b9afd.js";import{S as pa}from"./SubHeader-ad707529.js";import{u as ga}from"./useDispatch-07f3b144.js";const p=e=>e.plan.list,ua=l([p],e=>e.loading),ma=l([p],e=>e.exportLoading),S=l([p],e=>e.rows),z=l([p],e=>e.count),xa=l([z],e=>e>0),ka=l([p],e=>e.sorter||{}),ba=l([p],e=>{const i=e.sorter;if(!i||!i.field)return null;let x=i.order==="descend"?"DESC":"ASC";return`${i.field}_${x}`}),fa=l([p],e=>e.filter),ha=l([p],e=>e.rawFilter),ya=l([p],e=>e.pagination.pageSize),va=l([p],e=>{const i=e.pagination;return!i||!i.pageSize?0:((i.current||1)-1)*i.pageSize}),ja=l([p,z],(e,i)=>({...e.pagination,total:i})),L=l([p],e=>e.selectedKeys),wa=l([p,S],(e,i)=>i.filter(x=>e.selectedKeys.includes(x.id))),Na=l([S,L],(e,i)=>e.length===i.length),Sa={selectLoading:ua,selectRows:S,selectCount:z,selectOrderBy:ba,selectLimit:ya,selectFilter:fa,selectOffset:va,selectPagination:ja,selectSelectedKeys:L,selectSelectedRows:wa,selectHasRows:xa,selectExportLoading:ma,selectRawFilter:ha,selectIsAllSelected:Na,selectSorter:ka},za=aa().shape({user:m.relationToOne(u("entities.stacking.fields.user"),{}),plan:m.relationToOne(u("entities.stacking.fields.plan"),{}),amount:m.decimal(u("entities.stacking.fields.amount"),{required:!0}),status:m.enumerator(u("entities.stacking.fields.status"),{options:["active","completed","cancelled"]}),startDate:m.datetime(u("entities.stacking.fields.startDate"),{}),endDate:m.datetime(u("entities.stacking.fields.endDate"),{}),earnedRewards:m.decimal(u("entities.stacking.fields.earnedRewards"),{})});function Aa(){const[e,i]=g.useState("options"),[x,D]=g.useState(!1),k=ga(),h=v(Sa.selectRows),I=v(ta.selectCurrentUser);v(V.selectRows);const j=v(V.selectRows),B=v(ea.selectRows),[F,U]=g.useState({}),[o,H]=g.useState({crypto:"",daily:"",balance:0,min:0,max:0,symbol:"",plan:"",unstakingPeriod:""}),[b,N]=g.useState(""),[K]=g.useState(()=>({user:"",plan:"",amount:"",status:"",startDate:"",endDate:"",earnedRewards:""})),y=oa({resolver:ca.yupResolver(za),mode:"all",defaultValues:K}),R=ra({control:y.control,name:"amount",defaultValue:""});g.useEffect(()=>{N(R||"")},[R]);const W=async t=>{t.startDate=new Date;const s=new Date(t.startDate);s.setDate(s.getDate()+parseInt(o.unstakingPeriod)),t.endDate=s.toISOString(),t.status="active",t.plan=o.plan,t.user=I.id;try{await k(ia.doCreate(t)),k(O.doFetch()),A(n=>({...n,[o.symbol]:n[o.symbol]-parseFloat(b)})),P()}catch(n){console.error("Staking failed:",n)}},Y=()=>{if(!b||isNaN(b)||b<=0)return"0";const t=parseFloat(b),s=parseFloat(o.daily),n=parseFloat(o.unstakingPeriod);return(t*(s/100)*n).toFixed(6)},q=()=>{const t=parseFloat(b),s=E[o.symbol]||0;return isNaN(t)||t<=0?{isValid:!1,message:"Enter an amount"}:t>s?{isValid:!1,message:"Insufficient balance"}:t<o.min?{isValid:!1,message:`Min: ${o.min}`}:t>o.max?{isValid:!1,message:`Max: ${o.max}`}:{isValid:!0,message:"Confirm Stake"}},G=(t,s,n,r,c,d,f,w)=>{H({crypto:t,daily:s,balance:n,min:r,max:c,symbol:d,plan:f,unstakingPeriod:w}),D(!0),N(""),y.setValue("amount","")},P=()=>{D(!1),N(""),y.setValue("amount","")},[E,A]=g.useState({}),_=t=>{const s=B.reduce((n,r)=>(n[r.symbol]=r.amount,n),{});A(s)},J=async()=>{try{const s=[...new Set(h.map(c=>c.currency))].map(async c=>{if(c==="USDT")return{currency:c,price:1};try{const f=await(await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${c}USDT`)).json();return{currency:c,price:parseFloat(f.price)}}catch(d){return console.error(`Error fetching price for ${c}:`,d),{currency:c,price:0}}}),n=await Promise.all(s),r={};n.forEach(c=>{r[c.currency]=c.price}),U(r)}catch(t){console.error("Error fetching crypto prices:",t)}},Q=()=>{let t=0;return j.forEach(s=>{var d;const n=(d=s==null?void 0:s.plan)==null?void 0:d.currency,r=parseFloat(s.amount)||0,c=F[n]||0;t+=r*c}),t.toFixed(2)},X=()=>{let t=0;return j.forEach(s=>{var d;const n=(d=s==null?void 0:s.plan)==null?void 0:d.currency,r=parseFloat(s.earnedRewards)||0,c=F[n]||0;t+=r*c}),t.toFixed(2)};g.useEffect(()=>(k(sa.doFetch()),k(na.doFetch()),k(O.doFetch()),_(),()=>{}),[k]),g.useEffect(()=>{h.length>0&&J()},[h]);const T=q(),$=!T.isValid,Z=T.message,M=t=>{const s=new Date,n=new Date(t.startDate);return Math.floor((s.getTime()-n.getTime())/(1e3*60*60*24))};return a.jsxs("div",{className:"stacking-container",children:[a.jsx(pa,{title:"Stacking"}),a.jsxs("div",{className:"stacking-overview",children:[a.jsx("div",{className:"stacking-label",children:"Total Staked Balance"}),a.jsxs("div",{className:"stacking-balance",children:["$",Q()]}),a.jsxs("div",{className:"stacking-rewards-earned",children:["+ $",X()," earned"]})]}),a.jsxs("div",{className:"stacking-toggle-section",children:[a.jsx("div",{className:`stacking-toggle-option ${e==="options"?"stacking-toggle-active":""}`,onClick:()=>i("options"),children:"Staking Options"}),a.jsx("div",{className:`stacking-toggle-option ${e==="active"?"stacking-toggle-active":""}`,onClick:()=>i("active"),children:"Active Stakes"})]}),e==="options"&&a.jsx("div",{className:"stacking-options",children:h.length>0?h.map(t=>a.jsxs("div",{className:"stacking-option-card",children:[a.jsxs("div",{className:"stacking-option-header",children:[a.jsxs("div",{style:{display:"flex",gap:10,alignItems:"center"},children:[a.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${t.currency}.png`,style:{width:25,height:25},alt:t.currency}),a.jsx("div",{className:"stacking-option-name",children:t.currency})]}),a.jsxs("div",{className:"stacking-option-apy",children:[t.dailyRate,"% Daily"]})]}),a.jsxs("div",{className:"stacking-option-details",children:[a.jsx("div",{className:"stacking-detail-label",children:"Minimum Stake"}),a.jsxs("div",{className:"stacking-detail-value",children:[t.minimumStake," ",t.currency]})]}),a.jsxs("div",{className:"stacking-option-details",children:[a.jsx("div",{className:"stacking-detail-label",children:"Unstaking Period"}),a.jsxs("div",{className:"stacking-detail-value",children:[t.unstakingPeriod," days"]})]}),a.jsxs("div",{className:"stacking-stake-button",onClick:()=>G(t.currency,t.dailyRate,t.earnedRewards,t.minimumStake,t.maxStake,t.currency,t.id,t.unstakingPeriod),children:["Stake ",t.currency]})]},t.currency)):a.jsxs("div",{className:"empty-stacking-state",children:[a.jsx("div",{className:"empty-icon",children:a.jsx("i",{className:"fas fa-coins"})}),a.jsx("div",{className:"empty-title",children:"No Staking Plans Available"}),a.jsx("div",{className:"empty-message",children:"There are currently no staking plans available. Please check back later for new staking opportunities."})]})}),e==="active"&&a.jsx("div",{className:"stacking-active-stakes",children:j.length>0?j.map(t=>{var n,r,c,d,f,w,C;const s=Math.min(100,M(t)/((n=t==null?void 0:t.plan)==null?void 0:n.unstakingPeriod)*100);return a.jsxs("div",{className:"stacking-stake-item",children:[a.jsxs("div",{className:"stacking-stake-header",children:[a.jsxs("div",{style:{display:"flex",gap:10,alignItems:"center"},children:[a.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${(r=t==null?void 0:t.plan)==null?void 0:r.currency}.png`,style:{width:25,height:25},alt:t.currency}),a.jsx("div",{className:"stacking-stake-crypto",children:(c=t==null?void 0:t.plan)==null?void 0:c.currency})]}),a.jsxs("div",{className:"stacking-stake-amount",children:[t.amount," ",(d=t==null?void 0:t.plan)==null?void 0:d.currency]})]}),a.jsxs("div",{className:"stacking-stake-details",children:[a.jsx("div",{className:"stacking-stake-label",children:"Daily"}),a.jsxs("div",{className:"stacking-stake-value",children:[(f=t==null?void 0:t.plan)==null?void 0:f.dailyRate,"%"]})]}),a.jsxs("div",{className:"stacking-stake-details",children:[a.jsx("div",{className:"stacking-stake-label",children:"Earned"}),a.jsxs("div",{className:"stacking-stake-value stacking-value-positive",children:[t.earnedRewards||0," ",(w=t==null?void 0:t.plan)==null?void 0:w.currency]})]}),a.jsxs("div",{className:"stacking-stake-details",children:[a.jsx("div",{className:"stacking-stake-label",children:"Duration"}),a.jsxs("div",{className:"stacking-stake-value",children:[M(t),"/",(C=t==null?void 0:t.plan)==null?void 0:C.unstakingPeriod," days"]})]}),a.jsx("div",{className:"stacking-progress-bar",children:a.jsx("div",{className:"stacking-progress-fill",style:{width:`${s}%`}})})]},t.id)}):a.jsxs("div",{className:"empty-stacking-state",children:[a.jsx("div",{className:"empty-icon",children:a.jsx("i",{className:"fas fa-chart-line"})}),a.jsx("div",{className:"empty-title",children:"No Active Stakes"}),a.jsx("div",{className:"empty-message",children:"You don't have any active stakes yet. Start staking to earn rewards on your crypto assets."}),a.jsx("button",{className:"start-staking-button",onClick:()=>i("options"),children:"Explore Staking Options"})]})}),x&&a.jsx("div",{className:"stacking-modal-overlay",children:a.jsx("div",{className:"stacking-modal-content",children:a.jsx(la,{...y,children:a.jsxs("form",{onSubmit:y.handleSubmit(W),children:[a.jsxs("div",{className:"stacking-modal-header",children:[a.jsxs("div",{className:"stacking-modal-title",children:["Stake ",a.jsx("span",{children:o.crypto})]}),a.jsx("div",{className:"stacking-close-modal",onClick:P,children:a.jsx("i",{className:"fas fa-times"})})]}),a.jsxs("div",{className:"stacking-input-group",children:[a.jsx(da,{name:"amount",type:"number",label:"Amount to Stake",className:"textField",className1:"inputField",className2:"inputLabel",className3:"inputWrapper",placeholder:"Enter The Amount"}),a.jsxs("div",{className:"stacking-balance-info",children:["Balance: ",a.jsx("span",{children:E[o.symbol]||0})," ",a.jsx("span",{children:o.symbol})]})]}),a.jsxs("div",{className:"stacking-modal-details",children:[a.jsxs("div",{className:"stacking-modal-detail",children:[a.jsx("span",{children:"Daily"}),a.jsxs("span",{children:[o.daily,"%"]})]}),a.jsxs("div",{className:"stacking-modal-detail",children:[a.jsx("span",{children:"Minimum Stake"}),a.jsxs("span",{children:[o.min," ",o.symbol]})]}),a.jsxs("div",{className:"stacking-modal-detail",children:[a.jsx("span",{children:"Maximum Stake"}),a.jsxs("span",{children:[o.max," ",o.symbol]})]}),a.jsxs("div",{className:"stacking-modal-detail",children:[a.jsx("span",{children:"Estimated Total Rewards"}),a.jsxs("span",{children:[Y()," ",o.symbol]})]})]}),a.jsx("button",{type:"submit",disabled:$,className:`stacking-modal-button ${$?"stacking-modal-button-disabled":""}`,children:Z})]})})})}),a.jsx("style",{children:`
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

        /* Empty State Styles */
        .empty-stacking-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 30px;
          text-align: center;
          color: #666;
          background-color: #1a1a1a;
          border-radius: 16px;
          margin: 20px 15px;
          border: 1px solid #2a2a2a;
        }

        .empty-stacking-state .empty-icon {
          font-size: 64px;
          margin-bottom: 20px;
          color: #f3ba2f;
        }

        .empty-stacking-state .empty-title {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 10px;
          color: #ffffff;
        }

        .empty-stacking-state .empty-message {
          font-size: 14px;
          line-height: 1.5;
          color: #aaaaaa;
          margin-bottom: 20px;
          max-width: 300px;
        }

        .start-staking-button {
          background-color: #f3ba2f;
          color: #000000;
          border: none;
          border-radius: 12px;
          padding: 12px 24px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease;
          font-size: 14px;
        }

        .start-staking-button:hover {
          background-color: #e6ab0a;
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

          .empty-stacking-state {
            padding: 40px 20px;
          }

          .empty-stacking-state .empty-icon {
            font-size: 48px;
          }

          .empty-stacking-state .empty-title {
            font-size: 18px;
          }
        }
      `})]})}export{Aa as default};
