import{t as o,u as l,w as E,r as m,x as y,j as e}from"./index-3e05aead.js";import{S as $}from"./SubHeader-a5fb8eed.js";import{D as k}from"./Dates-1e0d88fd.js";import{u as L}from"./useDispatch-23525796.js";import"./v4-4a60fe23.js";const t=a=>a.user.form,D=o([t],a=>a.user),I=o([t],a=>a.member),z=o([t],a=>a.loading),B=o([t],a=>a.users),M=o([t],a=>a.listLoading),P=o([t],a=>!!a.initLoading),T=o([t],a=>!!a.saveLoading),x={selectInitLoading:P,selectSaveLoading:T,selectUser:D,listMembers:I,loading:z,lisUsers:B,usersLoading:M,selectRaw:t};function J(){const a=L(),i=l(E.selectCurrentUser),r=l(x.listMembers),p=l(x.loading),h=l(x.lisUsers),C=l(x.usersLoading),[F,g]=m.useState(!1),[d,f]=m.useState({title:"",members:[],type:""}),[j,b]=m.useState(!1);m.useEffect(()=>{i!=null&&i.refcode&&a(y.doTree(i.refcode))},[a,i==null?void 0:i.refcode]);const N=()=>{i!=null&&i.refcode&&navigator.clipboard.writeText(i.refcode).then(()=>{b(!0),setTimeout(()=>b(!1),2e3)}).catch(s=>{console.error("Failed to copy: ",s)})},c=s=>{const n=`Join NEXUS using my referral code: ${i==null?void 0:i.refcode}`,v=window.location.origin;switch(s){case"whatsapp":window.open(`https://wa.me/?text=${encodeURIComponent(n)}`,"_blank");break;case"email":window.open(`mailto:?subject=Join NEXUS&body=${encodeURIComponent(n)}`,"_blank");break;case"sms":window.open(`sms:?body=${encodeURIComponent(n)}`,"_blank");break;case"more":navigator.share?navigator.share({title:"NEXUS Referral",text:n,url:v}):N();break}},u=async(s,n)=>{const v=`${s}${w(s)} Generation ${n==="approved"?"Approved":"Pending"} Members`;f({title:v,members:[],type:n}),g(!0);const R={status:n,refCode:i.refcode,level:s};a(y.byLevel(R))},A=()=>{g(!1),f({title:"",members:[],type:""})},w=s=>s===1?"st":s===2?"nd":s===3?"rd":"th",S=s=>`${s}${w(s)} Generation Members`;return e.jsxs("div",{className:"container",children:[e.jsx("style",{children:`
        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .modal-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        .modal-content {
          background: linear-gradient(145deg, #1A1A1A, #2A2A2A);
          border-radius: 16px;
          padding: 0;
          width: 100%;
          max-width: 400px;
          max-height: 90vh;
          overflow: hidden;
          transform: translateY(50px);
          transition: transform 0.3s ease;
          border: 1px solid #2A2A2A;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .modal-overlay.active .modal-content {
          transform: translateY(0);
        }

        .modal-header {
          padding: 20px 25px;
          border-bottom: 1px solid #3A3A3A;
          background: linear-gradient(145deg, #2A2A2A, #1A1A1A);
          position: relative;
        }

        .modal-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #F3BA2F, #ffd700);
        }

        .modal-title {
          font-size: 20px;
          font-weight: bold;
          color: #F3BA2F;
          margin: 0;
        }

        .modal-close-btn {
          position: absolute;
          top: 20px;
          right: 25px;
          background: none;
          border: none;
          color: #AAAAAA;
          font-size: 24px;
          cursor: pointer;
          transition: color 0.2s;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }

        .modal-close-btn:hover {
          color: #F3BA2F;
          background-color: rgba(243, 186, 47, 0.1);
        }

        .modal-body {
          padding: 0;
          max-height: 60vh;
          overflow-y: auto;
        }

        .members-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .member-item {
          padding: 15px 25px;
          border-bottom: 1px solid #3A3A3A;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background-color 0.2s;
        }

        .member-item:hover {
          background-color: rgba(255, 255, 255, 0.05);
        }

        .member-item:last-child {
          border-bottom: none;
        }

        .member-info {
          flex: 1;
        }

        .member-email {
          color: #FFFFFF;
          font-weight: 500;
          margin-bottom: 5px;
          font-size: 14px;
        }

        .member-date {
          color: #AAAAAA;
          font-size: 12px;
        }

        .member-status {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-approved {
          background: linear-gradient(90deg, #00C076, #00ff95);
          color: #000000;
        }

        .status-pending {
          background: linear-gradient(90deg, #F3BA2F, #ffd700);
          color: #000000;
        }

        .empty-state {
          padding: 40px 25px;
          text-align: center;
          color: #AAAAAA;
        }

        .empty-state i {
          font-size: 48px;
          margin-bottom: 15px;
          color: #3A3A3A;
        }

        .empty-state p {
          margin: 0;
          font-size: 14px;
        }

        /* Scrollbar Styling */
        .modal-body::-webkit-scrollbar {
          width: 6px;
        }

        .modal-body::-webkit-scrollbar-track {
          background: #1A1A1A;
        }

        .modal-body::-webkit-scrollbar-thumb {
          background: #F3BA2F;
          border-radius: 3px;
        }

        .modal-body::-webkit-scrollbar-thumb:hover {
          background: #ffd700;
        }

        @media (max-width: 480px) {
          .modal-content {
            margin: 10px;
            max-height: 85vh;
          }
          
          .modal-header {
            padding: 15px 20px;
          }
          
          .modal-title {
            font-size: 18px;
          }
          
          .member-item {
            padding: 12px 20px;
          }
        }
      `}),e.jsx($,{title:"Invite Friends"}),e.jsxs("div",{className:"invite-earn-section",children:[e.jsx("div",{className:"invite-section-title",children:"Earn Together"}),e.jsx("div",{className:"invite-desc",children:"Invite friends to join NEXUS and earn rewards when they sign up and start trading."}),e.jsx("div",{className:"referral-text",children:"YOUR REFERRAL CODE"}),e.jsx("div",{className:"referral-code-value",id:"referralCode",children:(i==null?void 0:i.refcode)||"Loading..."}),e.jsxs("button",{className:"referral-copy-btn",id:"copyReferralBtn",onClick:N,children:[e.jsx("i",{className:"fas fa-copy"}),j?"COPIED!":"COPY CODE"]}),e.jsxs("div",{className:"share-buttons",children:[e.jsx("div",{className:"share-btn","data-platform":"whatsapp",onClick:()=>c("whatsapp"),children:e.jsx("i",{className:"fab fa-whatsapp share-icon-img"})}),e.jsx("div",{className:"share-btn","data-platform":"email",onClick:()=>c("email"),children:e.jsx("i",{className:"fas fa-envelope share-icon-img"})}),e.jsx("div",{className:"share-btn","data-platform":"sms",onClick:()=>c("sms"),children:e.jsx("i",{className:"fas fa-sms share-icon-img"})}),e.jsx("div",{className:"share-btn","data-platform":"more",onClick:()=>c("more"),children:e.jsx("i",{className:"fas fa-share-alt share-icon-img"})})]})]}),e.jsxs("div",{className:"rewards-container",children:[e.jsx("div",{className:"invite-section-title",children:"Your Rewards"}),e.jsxs("div",{className:"rewards-grid-container",children:[e.jsxs("div",{className:"reward-item",children:[e.jsx("div",{className:"reward-amount",children:"$125"}),e.jsx("div",{className:"reward-text",children:"Total Earned"})]}),e.jsxs("div",{className:"reward-item",children:[e.jsx("div",{className:"reward-amount",children:"15"}),e.jsx("div",{className:"reward-text",children:"Friends Invited"})]}),e.jsxs("div",{className:"reward-item",children:[e.jsx("div",{className:"reward-amount",children:"$25"}),e.jsx("div",{className:"reward-text",children:"Per Friend"})]}),e.jsxs("div",{className:"reward-item",children:[e.jsx("div",{className:"reward-amount",children:"5"}),e.jsx("div",{className:"reward-text",children:"Pending Rewards"})]})]})]}),e.jsxs("div",{className:"generation-stats-container",children:[e.jsx("div",{className:"invite-section-title",children:"Generation Members"}),e.jsxs("div",{className:"generation-stats-grid",children:[p&&e.jsx("h2",{children:" Loading ... "}),!p&&(r==null?void 0:r.length)===0&&e.jsx("div",{style:{textAlign:"center",color:"#AAAAAA",padding:"20px"},children:"No generation data available"}),!p&&(r==null?void 0:r.map((s,n)=>e.jsxs("div",{className:"generation-stat-item first-gen",children:[e.jsxs("div",{className:"generation-stat-title",children:[e.jsx("i",{className:"fas fa-crown"}),S(s==null?void 0:s.level)]}),e.jsxs("div",{className:"generation-stats-details",children:[e.jsxs("div",{className:"generation-stat-detail generation-stat-approved",onClick:()=>u(s.level,"approved"),style:{cursor:"pointer"},children:[e.jsx("div",{className:"generation-stat-value",children:(s==null?void 0:s.approvedCount)||0}),e.jsx("div",{className:"generation-stat-label",children:"Approved Members"})]}),e.jsxs("div",{className:"generation-stat-detail generation-stat-pending",onClick:()=>u(s.level,"pending"),style:{cursor:"pointer"},children:[e.jsx("div",{className:"generation-stat-value",children:(s==null?void 0:s.pendingCount)||0}),e.jsx("div",{className:"generation-stat-label",children:"Pending Members"})]})]})]},n)))]})]}),e.jsxs("div",{className:"commission-container",children:[e.jsx("div",{className:"invite-section-title",children:"Commission Structure"}),e.jsxs("div",{className:"commission-grid",children:[e.jsxs("div",{className:"commission-item first-gen",children:[e.jsxs("div",{className:"commission-title",children:[e.jsx("i",{className:"fas fa-crown"}),"1st Generation"]}),e.jsxs("div",{className:"commission-details",children:[e.jsxs("div",{className:"commission-detail",children:[e.jsx("span",{className:"commission-label",children:"First Deposit Commission"}),e.jsx("span",{className:"commission-value",children:"15%"})]}),e.jsxs("div",{className:"commission-detail",children:[e.jsx("span",{className:"commission-label",children:"Staking Profits Commission"}),e.jsx("span",{className:"commission-value",children:"10%"})]})]})]}),e.jsxs("div",{className:"commission-item second-gen",children:[e.jsxs("div",{className:"commission-title",children:[e.jsx("i",{className:"fas fa-users"}),"2nd Generation"]}),e.jsxs("div",{className:"commission-details",children:[e.jsxs("div",{className:"commission-detail",children:[e.jsx("span",{className:"commission-label",children:"First Deposit Commission"}),e.jsx("span",{className:"commission-value",children:"10%"})]}),e.jsxs("div",{className:"commission-detail",children:[e.jsx("span",{className:"commission-label",children:"Staking Profits Commission"}),e.jsx("span",{className:"commission-value",children:"7%"})]})]})]}),e.jsxs("div",{className:"commission-item third-gen",children:[e.jsxs("div",{className:"commission-title",children:[e.jsx("i",{className:"fas fa-user-friends"}),"3rd Generation"]}),e.jsxs("div",{className:"commission-details",children:[e.jsxs("div",{className:"commission-detail",children:[e.jsx("span",{className:"commission-label",children:"First Deposit Commission"}),e.jsx("span",{className:"commission-value",children:"5%"})]}),e.jsxs("div",{className:"commission-detail",children:[e.jsx("span",{className:"commission-label",children:"Staking Profits Commission"}),e.jsx("span",{className:"commission-value",children:"4%"})]})]})]})]})]}),e.jsxs("div",{className:"how-it-works-container",children:[e.jsx("div",{className:"invite-section-title",children:"How It Works"}),e.jsxs("div",{className:"steps-container",children:[e.jsxs("div",{className:"step-item",children:[e.jsx("div",{className:"step-number-circle",children:"1"}),e.jsxs("div",{className:"step-content-text",children:[e.jsx("div",{className:"step-title-text",children:"Share Your Referral Code"}),e.jsx("div",{className:"step-desc",children:"Send your unique code to friends or share it on social media."})]})]}),e.jsxs("div",{className:"step-item",children:[e.jsx("div",{className:"step-number-circle",children:"2"}),e.jsxs("div",{className:"step-content-text",children:[e.jsx("div",{className:"step-title-text",children:"Friends Sign Up"}),e.jsx("div",{className:"step-desc",children:"Your friends sign up using your referral code and verify their accounts."})]})]}),e.jsxs("div",{className:"step-item",children:[e.jsx("div",{className:"step-number-circle",children:"3"}),e.jsxs("div",{className:"step-content-text",children:[e.jsx("div",{className:"step-title-text",children:"Earn Commissions"}),e.jsx("div",{className:"step-desc",children:"Earn commissions from your network's first deposits and staking profits."})]})]})]})]}),e.jsx("div",{className:"toast-notification",id:"referralToast",style:{display:j?"block":"none",position:"fixed",bottom:"20px",left:"50%",transform:"translateX(-50%)",background:"#00C076",color:"white",padding:"12px 24px",borderRadius:"8px",fontWeight:"500",zIndex:"1001"},children:"Referral code copied to clipboard!"}),e.jsx("div",{className:`modal-overlay ${F?"active":""}`,onClick:A,children:e.jsxs("div",{className:"modal-content",onClick:s=>s.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h3",{className:"modal-title",children:d.title}),e.jsx("button",{className:"modal-close-btn",onClick:A,children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsx("div",{className:"modal-body",children:C?e.jsxs("div",{style:{textAlign:"center",padding:"40px",color:"#F3BA2F"},children:[e.jsx("i",{className:"fas fa-spinner fa-spin",style:{fontSize:"24px",marginBottom:"15px"}}),e.jsx("p",{children:"Loading members..."})]}):h&&h.length>0?e.jsx("ul",{className:"members-list",children:h.map((s,n)=>e.jsxs("li",{className:"member-item",children:[e.jsxs("div",{className:"member-info",children:[e.jsx("div",{className:"member-email",children:s.email}),e.jsx("div",{className:"member-date",children:d.type==="approved"?`Approved: ${k.formatDateTime(s.updatedAt||s.createdAt)}`:`Joined: ${k.formatDateTime(s.createdAt)}`})]}),e.jsx("div",{className:`member-status ${d.type==="approved"?"status-approved":"status-pending"}`,children:d.type})]},n))}):e.jsxs("div",{className:"empty-state",children:[e.jsx("i",{className:"fas fa-users"}),e.jsx("p",{children:"No members found"})]})})]})})]})}export{J as default};
