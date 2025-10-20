import{i as d,J as ga,K as k,h as g,u as N,f as ma,ac as xa,o as ua,ad as ka,ae as I,q as K,j as a,af as U}from"./index-7e817a56.js";import{a as h,u as ha,y as fa,b as ba,F as va}from"./FormErrors-4903d6be.js";import{F as ya}from"./FieldFormItem-9e1057d9.js";import{S as ja}from"./SubHeader-86ced009.js";import{D as W}from"./Dates-d69d2240.js";import{S as wa}from"./sucessModal-fc6b2abd.js";import{u as Na}from"./useDispatch-de4385f4.js";import"./useNotifications-f2c9c8dc.js";import"./v4-4a60fe23.js";const p=s=>s.plan.list,Sa=d([p],s=>s.loading),Da=d([p],s=>s.exportLoading),A=d([p],s=>s.rows),T=d([p],s=>s.count),za=d([T],s=>s>0),Ra=d([p],s=>s.sorter||{}),Fa=d([p],s=>{const o=s.sorter;if(!o||!o.field)return null;let f=o.order==="descend"?"DESC":"ASC";return`${o.field}_${f}`}),Ea=d([p],s=>s.filter),Aa=d([p],s=>s.rawFilter),Ta=d([p],s=>s.pagination.pageSize),Ca=d([p],s=>{const o=s.pagination;return!o||!o.pageSize?0:((o.current||1)-1)*o.pageSize}),Pa=d([p,T],(s,o)=>({...s.pagination,total:o})),Y=d([p],s=>s.selectedKeys),Ma=d([p,A],(s,o)=>o.filter(f=>s.selectedKeys.includes(f.id))),$a=d([A,Y],(s,o)=>s.length===o.length),La={selectLoading:Sa,selectRows:A,selectCount:T,selectOrderBy:Fa,selectLimit:Ta,selectFilter:Ea,selectOffset:Ca,selectPagination:Pa,selectSelectedKeys:Y,selectSelectedRows:Ma,selectHasRows:za,selectExportLoading:Da,selectRawFilter:Aa,selectIsAllSelected:$a,selectSorter:Ra},S=s=>s.stacking.form,Oa=d([S],s=>s.record),Va=d([S],s=>!!s.initLoading),Ba=d([S],s=>!!s.saveLoading),Ia=d([S],s=>!!s.showModal),Ka={selectInitLoading:Va,selectSaveLoading:Ba,selectRecord:Oa,selectModal:Ia,selectRaw:S},Ua=ga().shape({user:h.relationToOne(k("entities.stacking.fields.user"),{}),plan:h.relationToOne(k("entities.stacking.fields.plan"),{}),amount:h.decimal(k("entities.stacking.fields.amount"),{required:!0}),status:h.enumerator(k("entities.stacking.fields.status"),{options:["active","completed","cancelled"]}),startDate:h.datetime(k("entities.stacking.fields.startDate"),{}),endDate:h.datetime(k("entities.stacking.fields.endDate"),{}),earnedRewards:h.decimal(k("entities.stacking.fields.earnedRewards"),{})});function Za(){const[s,o]=g.useState("options"),[f,C]=g.useState(!1),x=Na(),v=N(La.selectRows),H=N(ma.selectCurrentUser),z=N(xa.selectRows),D=N(ua.selectRows),[R,q]=g.useState({}),[P,M]=g.useState({}),[J,_]=g.useState(""),$=N(Ka.selectModal),G=()=>{x(U.doClose())},[c,Q]=g.useState({crypto:"",daily:"",balance:0,min:0,max:0,symbol:"",plan:"",unstakingPeriod:""}),[b,F]=g.useState(""),[X]=g.useState(()=>({user:"",plan:"",amount:"",status:"",startDate:"",endDate:"",earnedRewards:""})),y=ha({resolver:fa.yupResolver(Ua),mode:"all",defaultValues:X}),L=ba({control:y.control,name:"amount",defaultValue:""}),Z=()=>{if(D&&D.length>0){const e=D.reduce((t,n)=>(n.symbol&&n.amount!==void 0&&(t[n.symbol]=parseFloat(n.amount)||0),t),{});M(e)}};g.useEffect(()=>{F(L||"")},[L]),g.useEffect(()=>{Z()},[D]);const aa=async e=>{e.startDate=new Date;const t=new Date(e.startDate);t.setDate(t.getDate()+parseInt(c.unstakingPeriod)),e.endDate=t.toISOString(),e.status="active",e.plan=c.plan,e.user=H.id,_(e.amount);try{await x(U.doCreate(e)),x(K.doFetch()),x(I.doFetch()),M(n=>({...n,[c.symbol]:(n[c.symbol]||0)-parseFloat(b)})),O()}catch(n){console.error("Staking failed:",n)}},ea=()=>{if(!b||isNaN(b)||b<=0)return"0";const e=parseFloat(b),t=parseFloat(c.daily),n=parseFloat(c.unstakingPeriod);return(e*(t/100)*n).toFixed(6)},sa=()=>{const e=parseFloat(b),t=P[c.symbol]||0;return isNaN(e)||e<=0?{isValid:!1,message:"Enter an amount"}:e>t?{isValid:!1,message:"Insufficient balance"}:e<c.min?{isValid:!1,message:`Min: ${c.min}`}:e>c.max?{isValid:!1,message:`Max: ${c.max}`}:{isValid:!0,message:"Confirm Stake"}},ta=(e,t,n,r,i,l,m,u)=>{Q({crypto:e,daily:t,balance:n,min:r,max:i,symbol:l,plan:m,unstakingPeriod:u}),C(!0),F(""),y.setValue("amount","")},O=()=>{C(!1),F(""),y.setValue("amount","")},na=async()=>{try{const t=[...new Set(v.map(i=>i.currency))].map(async i=>{if(i==="USDT")return{currency:i,price:1};try{const m=await(await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${i}USDT`)).json();return{currency:i,price:parseFloat(m.price)}}catch(l){return console.error(`Error fetching price for ${i}:`,l),{currency:i,price:0}}}),n=await Promise.all(t),r={};n.forEach(i=>{r[i.currency]=i.price}),q(r)}catch(e){console.error("Error fetching crypto prices:",e)}},E=z.filter(e=>e.status==="active"),j=z.filter(e=>e.status==="completed"),ia=()=>{let e=0;return E.forEach(t=>{var l;const n=(l=t==null?void 0:t.plan)==null?void 0:l.currency,r=parseFloat(t.amount)||0,i=R[n]||0;e+=r*i}),e.toFixed(2)},oa=()=>{let e=0;return z.forEach(t=>{var l;const n=(l=t==null?void 0:t.plan)==null?void 0:l.currency,r=parseFloat(t.earnedRewards)||0,i=R[n]||0;e+=r*i}),e.toFixed(2)},ca=()=>{let e=0;return j.forEach(t=>{var l;const n=(l=t==null?void 0:t.plan)==null?void 0:l.currency,r=parseFloat(t.earnedRewards)||0,i=R[n]||0;e+=r*i}),e.toFixed(2)};g.useEffect(()=>(x(ka.doFetch()),x(I.doFetch()),x(K.doFetch()),()=>{}),[x]),g.useEffect(()=>{v.length>0&&na()},[v]);const V=sa(),B=!V.isValid,ra=V.message,la=e=>{const t=new Date,n=new Date(e.startDate);return Math.floor((t.getTime()-n.getTime())/(1e3*60*60*24))},da=e=>{const t=new Date,n=new Date(e.endDate),r=Math.floor((n.getTime()-t.getTime())/(1e3*60*60*24));return Math.max(0,r)},pa=()=>P[c.symbol]||0;return a.jsxs("div",{className:"stacking-container",children:[a.jsx("style",{children:`
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

        /* Completed Rewards Overview - New Professional Design */
        .completed-rewards-overview {
          margin: 0 0px 20px;
          background-color: #1a1a1a;
          border-radius: 12px;
          padding: 16px;
          border-left: 4px solid #00c076;
          margin : 0 15px 15px;
        }

        .completed-rewards-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .completed-rewards-label {
          color: #aaaaaa;
          font-size: 13px;
          font-weight: 500;
        }

        .completed-rewards-count {
          background-color: rgba(0, 192, 118, 0.2);
          color: #00c076;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
        }

        .completed-rewards-amount {
          font-size: 24px;
          font-weight: bold;
          color: #00c076;
          margin-bottom: 4px;
        }

        .completed-rewards-subtext {
          color: #666;
          font-size: 12px;
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
             margin: 0 0px 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
}
       

        .stacking-option-card {
          background-color: #1a1a1a;
          border-radius: 12px;
          padding: 15px;
          margin-bottom: 15px;
          border: 1px solid #2a2a2a;
          transition: transform 0.2s ease;
          margin : 0 15px;
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
          margin: 0 0px 20px;
          display: flex; 
          flex-direction :column ; 
          gap: 15px;
        }

        .stacking-completed-stakes {
          margin: 0 0px 20px;
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
          border: 1px solid #2a2a2a;
          margin : 0 15px;
        }

        .stacking-completed-item {
          background-color: #1a1a1a;
          border-radius: 12px;
          padding: 15px;
          margin-bottom: 12px;
          border: 1px solid #2a2a2a;
          position: relative;
          overflow: hidden;
          margin : 0 15px 15px ;
        }

        .stacking-completed-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 100%;
          background-color: #00c076;
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
          font-size: 15px;
        }

        .stacking-stake-amount {
          margin-left: auto;
          font-weight: bold;
          font-size: 15px;
        }

        .stacking-status-badge {
          padding: 4px 8px;
          border-radius: 8px;
          font-size: 10px;
          font-weight: bold;
          margin-left: 8px;
        }

        .stacking-status-active {
          background-color: rgba(243, 186, 47, 0.2);
          color: #f3ba2f;
        }

        .stacking-status-completed {
          background-color: rgba(0, 192, 118, 0.2);
          color: #00c076;
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

        .stacking-value-completed {
          color: #00c076;
          font-weight: bold;
        }

        .stacking-completed-rewards {
          background-color: rgba(0, 192, 118, 0.1);
          border-radius: 8px;
          padding: 10px;
          margin-top: 10px;
          text-align: center;
        }

        .stacking-completed-rewards-label {
          color: #00c076;
          font-size: 11px;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .stacking-completed-rewards-amount {
          color: #00c076;
          font-size: 14px;
          font-weight: bold;
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
          transition: width 0.3s ease;
        }

        .stacking-progress-completed {
          background-color: #00c076;
        }

        /* Empty State Styles */
        .empty-stacking-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 15px 30px;
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

          .completed-rewards-amount {
            font-size: 20px;
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
      `}),a.jsx(ja,{title:"Stacking"}),a.jsxs("div",{className:"stacking-overview",children:[a.jsx("div",{className:"stacking-label",children:"Total Staked Balance"}),a.jsxs("div",{className:"stacking-balance",children:["$",ia()]}),a.jsxs("div",{className:"stacking-rewards-earned",children:["+ $",oa()," earned"]})]}),a.jsxs("div",{className:"stacking-toggle-section",children:[a.jsx("div",{className:`stacking-toggle-option ${s==="options"?"stacking-toggle-active":""}`,onClick:()=>o("options"),children:"Options"}),a.jsx("div",{className:`stacking-toggle-option ${s==="active"?"stacking-toggle-active":""}`,onClick:()=>o("active"),children:"Active Stakes"}),a.jsx("div",{className:`stacking-toggle-option ${s==="completed"?"stacking-toggle-active":""}`,onClick:()=>o("completed"),children:"Completed"})]}),s==="options"&&a.jsx("div",{className:"stacking-options",children:v.length>0?v.map(e=>a.jsxs("div",{className:"stacking-option-card",children:[a.jsxs("div",{className:"stacking-option-header",children:[a.jsxs("div",{style:{display:"flex",gap:10,alignItems:"center"},children:[a.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${e.currency}.png`,style:{width:25,height:25},alt:e.currency}),a.jsx("div",{className:"stacking-option-name",children:e.currency})]}),a.jsxs("div",{className:"stacking-option-apy",children:[e.dailyRate,"% Daily"]})]}),a.jsxs("div",{className:"stacking-option-details",children:[a.jsx("div",{className:"stacking-detail-label",children:"Minimum Stake"}),a.jsxs("div",{className:"stacking-detail-value",children:[e.minimumStake," ",e.currency]})]}),a.jsxs("div",{className:"stacking-option-details",children:[a.jsx("div",{className:"stacking-detail-label",children:"Unstaking Period"}),a.jsxs("div",{className:"stacking-detail-value",children:[e.unstakingPeriod," days"]})]}),a.jsxs("div",{className:"stacking-stake-button",onClick:()=>ta(e.currency,e.dailyRate,e.earnedRewards,e.minimumStake,e.maxStake,e.currency,e.id,e.unstakingPeriod),children:["Stake ",e.currency]})]},e.currency)):a.jsxs("div",{className:"empty-stacking-state",children:[a.jsx("div",{className:"empty-icon",children:a.jsx("i",{className:"fas fa-coins"})}),a.jsx("div",{className:"empty-title",children:"No Staking Plans Available"}),a.jsx("div",{className:"empty-message",children:"There are currently no staking plans available. Please check back later for new staking opportunities."})]})}),s==="active"&&a.jsx("div",{className:"stacking-active-stakes",children:E.length>0?E.map(e=>{var r,i,l,m,u,w;const t=Math.min(100,la(e)/((r=e==null?void 0:e.plan)==null?void 0:r.unstakingPeriod)*100),n=da(e);return a.jsxs("div",{className:"stacking-stake-item",children:[a.jsxs("div",{className:"stacking-stake-header",children:[a.jsxs("div",{style:{display:"flex",gap:10,alignItems:"center"},children:[a.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${(i=e==null?void 0:e.plan)==null?void 0:i.currency}.png`,style:{width:25,height:25},alt:e.currency}),a.jsx("div",{className:"stacking-stake-crypto",children:(l=e==null?void 0:e.plan)==null?void 0:l.currency}),a.jsx("div",{className:"stacking-status-badge stacking-status-active",children:"ACTIVE"})]}),a.jsxs("div",{className:"stacking-stake-amount",children:[e.amount," ",(m=e==null?void 0:e.plan)==null?void 0:m.currency]})]}),a.jsxs("div",{className:"stacking-stake-details",children:[a.jsx("div",{className:"stacking-stake-label",children:"Daily"}),a.jsxs("div",{className:"stacking-stake-value",children:[(u=e==null?void 0:e.plan)==null?void 0:u.dailyRate,"%"]})]}),a.jsxs("div",{className:"stacking-stake-details",children:[a.jsx("div",{className:"stacking-stake-label",children:"Earned"}),a.jsxs("div",{className:"stacking-stake-value stacking-value-positive",children:[e.earnedRewards||0," ",(w=e==null?void 0:e.plan)==null?void 0:w.currency]})]}),a.jsxs("div",{className:"stacking-stake-details",children:[a.jsx("div",{className:"stacking-stake-label",children:"Remaining"}),a.jsxs("div",{className:"stacking-stake-value",children:[n," days"]})]}),a.jsx("div",{className:"stacking-progress-bar",children:a.jsx("div",{className:"stacking-progress-fill",style:{width:`${t}%`}})})]},e.id)}):a.jsxs("div",{className:"empty-stacking-state",children:[a.jsx("div",{className:"empty-icon",children:a.jsx("i",{className:"fas fa-chart-line"})}),a.jsx("div",{className:"empty-title",children:"No Active Stakes"}),a.jsx("div",{className:"empty-message",children:"You don't have any active stakes yet. Start staking to earn rewards on your crypto assets."}),a.jsx("button",{className:"start-staking-button",onClick:()=>o("options"),children:"Explore Staking Options"})]})}),s==="completed"&&a.jsx("div",{className:"stacking-completed-stakes",children:j.length>0?a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"completed-rewards-overview",children:[a.jsxs("div",{className:"completed-rewards-header",children:[a.jsx("div",{className:"completed-rewards-label",children:"TOTAL COMPLETED REWARDS"}),a.jsxs("div",{className:"completed-rewards-count",children:[j.length," ",j.length===1?"STAKE":"STAKES"]})]}),a.jsxs("div",{className:"completed-rewards-amount",children:["$",ca()]}),a.jsx("div",{className:"completed-rewards-subtext",children:"All rewards from completed stakes"})]}),j.map(e=>{var t,n,r,i,l,m,u,w;return a.jsxs("div",{className:"stacking-completed-item",children:[a.jsxs("div",{className:"stacking-stake-header",children:[a.jsxs("div",{style:{display:"flex",gap:10,alignItems:"center"},children:[a.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${(t=e==null?void 0:e.plan)==null?void 0:t.currency}.png`,style:{width:25,height:25},alt:e.currency}),a.jsx("div",{className:"stacking-stake-crypto",children:(n=e==null?void 0:e.plan)==null?void 0:n.currency}),a.jsx("div",{className:"stacking-status-badge stacking-status-completed",children:"COMPLETED"})]}),a.jsxs("div",{className:"stacking-stake-amount",children:[e.amount," ",(r=e==null?void 0:e.plan)==null?void 0:r.currency]})]}),a.jsxs("div",{className:"stacking-stake-details",children:[a.jsx("div",{className:"stacking-stake-label",children:"Daily Rate"}),a.jsxs("div",{className:"stacking-stake-value",children:[(i=e==null?void 0:e.plan)==null?void 0:i.dailyRate,"%"]})]}),a.jsxs("div",{className:"stacking-stake-details",children:[a.jsx("div",{className:"stacking-stake-label",children:"Duration"}),a.jsxs("div",{className:"stacking-stake-value",children:[(l=e==null?void 0:e.plan)==null?void 0:l.unstakingPeriod," days"]})]}),a.jsxs("div",{className:"stacking-stake-details",children:[a.jsx("div",{className:"stacking-stake-label",children:"Created At"}),a.jsx("div",{className:"stacking-stake-value",children:W.NewsDate((m=e==null?void 0:e.plan)==null?void 0:m.createdAt)})]}),a.jsxs("div",{className:"stacking-stake-details",children:[a.jsx("div",{className:"stacking-stake-label",children:"Date finish"}),a.jsx("div",{className:"stacking-stake-value",children:W.NewsDate((u=e==null?void 0:e.plan)==null?void 0:u.updatedAt)})]}),a.jsxs("div",{className:"stacking-completed-rewards",children:[a.jsx("div",{className:"stacking-completed-rewards-label",children:"TOTAL REWARDS EARNED"}),a.jsxs("div",{className:"stacking-completed-rewards-amount",children:["+",e.earnedRewards||0," ",(w=e==null?void 0:e.plan)==null?void 0:w.currency]})]})]},e.id)})]}):a.jsxs("div",{className:"empty-stacking-state",children:[a.jsx("div",{className:"empty-icon",children:a.jsx("i",{className:"fas fa-check-circle"})}),a.jsx("div",{className:"empty-title",children:"No Completed Stakes"}),a.jsx("div",{className:"empty-message",children:"You haven't completed any stakes yet. Your completed stakes will appear here once they finish."}),a.jsx("button",{className:"start-staking-button",onClick:()=>o("options"),children:"Start Staking"})]})}),$&&a.jsx(wa,{isOpen:$,onClose:G,type:"staking",amount:String(J),coinType:c.crypto}),f&&a.jsx("div",{className:"stacking-modal-overlay",children:a.jsx("div",{className:"stacking-modal-content",children:a.jsx(va,{...y,children:a.jsxs("form",{onSubmit:y.handleSubmit(aa),children:[a.jsxs("div",{className:"stacking-modal-header",children:[a.jsxs("div",{className:"stacking-modal-title",children:["Stake ",a.jsx("span",{children:c.crypto})]}),a.jsx("div",{className:"stacking-close-modal",onClick:O,children:a.jsx("i",{className:"fas fa-times"})})]}),a.jsxs("div",{className:"stacking-input-group",children:[a.jsx(ya,{name:"amount",label:"Amount to Stake",className:"textField",className1:"inputField",className2:"inputLabel",className3:"inputWrapper",placeholder:"Enter The Amount"}),a.jsxs("div",{className:"stacking-balance-info",children:["Balance: ",a.jsx("span",{children:pa()})," ",a.jsx("span",{children:c.symbol})]})]}),a.jsxs("div",{className:"stacking-modal-details",children:[a.jsxs("div",{className:"stacking-modal-detail",children:[a.jsx("span",{children:"Daily"}),a.jsxs("span",{children:[c.daily,"%"]})]}),a.jsxs("div",{className:"stacking-modal-detail",children:[a.jsx("span",{children:"Minimum Stake"}),a.jsxs("span",{children:[c.min," ",c.symbol]})]}),a.jsxs("div",{className:"stacking-modal-detail",children:[a.jsx("span",{children:"Maximum Stake"}),a.jsxs("span",{children:[c.max," ",c.symbol]})]}),a.jsxs("div",{className:"stacking-modal-detail",children:[a.jsx("span",{children:"Estimated Total Rewards"}),a.jsxs("span",{children:[ea()," ",c.symbol]})]})]}),a.jsx("button",{type:"submit",disabled:B,className:`stacking-modal-button ${B?"stacking-modal-button-disabled":""}`,children:ra})]})})})})]})}export{Za as default};
