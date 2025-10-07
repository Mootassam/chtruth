import{w as r,u as c,x as D,r as h,y as j,j as e}from"./index-83554c6f.js";import{S as E}from"./SubHeader-6f0d27e6.js";import{D as g}from"./Dates-0cec1351.js";import{u as $}from"./useDispatch-3b8e0c73.js";import"./v4-4a60fe23.js";const o=a=>a.user.form,L=r([o],a=>a.user),T=r([o],a=>a.member),B=r([o],a=>a.loading),I=r([o],a=>a.reward),M=r([o],a=>a.users),O=r([o],a=>a.listLoading),P=r([o],a=>!!a.initLoading),G=r([o],a=>!!a.saveLoading),m={selectInitLoading:P,selectSaveLoading:G,selectUser:L,listMembers:T,loading:B,reward:I,lisUsers:M,usersLoading:O,selectRaw:o};function _(){const a=$(),i=c(D.selectCurrentUser),l=c(m.listMembers),f=c(m.loading),d=c(m.lisUsers),N=c(m.usersLoading),S=c(m.reward),[u,A]=h.useState(!1),[n,y]=h.useState({title:"",members:[],type:""}),[v,w]=h.useState(!1);h.useEffect(()=>{i!=null&&i.refcode&&(a(j.rewardCount()),a(j.doTree(i.refcode)))},[a,i==null?void 0:i.refcode]);const k=async()=>{if(i!=null&&i.refcode)try{if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(i.refcode);else{const s=document.createElement("textarea");s.value=i.refcode,s.style.position="fixed",s.style.opacity="0",document.body.appendChild(s),s.focus(),s.select(),document.execCommand("copy"),document.body.removeChild(s)}w(!0),setTimeout(()=>w(!1),2e3)}catch(s){console.error("Failed to copy:",s)}},p=s=>{const t=`Join NEXUS using my referral code: ${i==null?void 0:i.refcode}`,b=window.location.origin;switch(s){case"whatsapp":window.open(`https://wa.me/?text=${encodeURIComponent(t)}`,"_blank");break;case"email":window.open(`mailto:?subject=Join NEXUS&body=${encodeURIComponent(t)}`,"_blank");break;case"sms":window.open(`sms:?body=${encodeURIComponent(t)}`,"_blank");break;case"more":navigator.share?navigator.share({title:"NEXUS Referral",text:t,url:b}):k();break}},C=(s,t)=>{const b=`${s}${F(s)} Generation ${t==="approved"?"Approved":"Pending"} Members`;y({title:b,members:[],type:t}),A(!0);const z={status:t,refCode:i==null?void 0:i.refcode,level:s};a(j.byLevel(z))},x=()=>{A(!1),y({title:"",members:[],type:""})},F=s=>s===1?"st":s===2?"nd":s===3?"rd":"th",R=s=>`${s}${F(s)} Generation Members`;return e.jsxs("div",{className:"container",children:[e.jsx(E,{title:"Invite Friends"}),e.jsxs("div",{className:"invite-earn-section",children:[e.jsx("div",{className:"invite-section-title",children:"Earn Together"}),e.jsx("div",{className:"invite-desc",children:"Invite friends to join NEXUS and earn rewards when they sign up and start trading."}),e.jsx("div",{className:"referral-text",children:"YOUR REFERRAL CODE"}),e.jsx("div",{className:"referral-code-value",id:"referralCode",children:(i==null?void 0:i.refcode)||"Loading..."}),e.jsxs("button",{className:"referral-copy-btn",id:"copyReferralBtn",onClick:k,children:[e.jsx("i",{className:"fas fa-copy"}),v?"COPIED!":"COPY CODE"]}),e.jsxs("div",{className:"share-buttons",children:[e.jsx("div",{className:"share-btn",onClick:()=>p("whatsapp"),children:e.jsx("i",{className:"fab fa-whatsapp share-icon-img"})}),e.jsx("div",{className:"share-btn",onClick:()=>p("email"),children:e.jsx("i",{className:"fas fa-envelope share-icon-img"})}),e.jsx("div",{className:"share-btn",onClick:()=>p("sms"),children:e.jsx("i",{className:"fas fa-sms share-icon-img"})}),e.jsx("div",{className:"share-btn",onClick:()=>p("more"),children:e.jsx("i",{className:"fas fa-share-alt share-icon-img"})})]})]}),e.jsx("div",{className:"total-earned-section",children:e.jsxs("div",{className:"total-earned-card",children:[e.jsx("div",{className:"total-earned-label",children:"Total Earned"}),e.jsxs("div",{className:"total-earned-amount",children:[S," USDT"]}),e.jsx("div",{className:"total-earned-subtitle",children:"All Time Commission"})]})}),e.jsxs("div",{className:"generation-stats-container",children:[e.jsx("div",{className:"invite-section-title",children:"Generation Members"}),e.jsxs("div",{className:"generation-stats-grid",children:[f&&e.jsx("h2",{children:" Loading ... "}),!f&&(l==null?void 0:l.length)===0&&e.jsx("div",{style:{textAlign:"center",color:"#AAAAAA",padding:"20px"},children:"No generation data available"}),!f&&(l==null?void 0:l.map((s,t)=>e.jsxs("div",{className:"generation-stat-item first-gen",children:[e.jsxs("div",{className:"generation-stat-title",children:[e.jsx("i",{className:"fas fa-crown"}),R(s==null?void 0:s.level)]}),e.jsxs("div",{className:"generation-stats-details",children:[e.jsxs("div",{className:"generation-stat-detail generation-stat-approved",onClick:()=>C(s.level,"approved"),style:{cursor:"pointer"},children:[e.jsx("div",{className:"generation-stat-value",children:(s==null?void 0:s.approvedCount)||0}),e.jsx("div",{className:"generation-stat-label",children:"Approved Members"})]}),e.jsxs("div",{className:"generation-stat-detail generation-stat-pending",onClick:()=>C(s.level,"pending"),style:{cursor:"pointer"},children:[e.jsx("div",{className:"generation-stat-value",children:(s==null?void 0:s.pendingCount)||0}),e.jsx("div",{className:"generation-stat-label",children:"Pending Members"})]})]})]},t)))]})]}),e.jsxs("div",{className:"commission-container",children:[e.jsx("div",{className:"invite-section-title",children:"Commission Structure"}),e.jsxs("div",{className:"commission-grid",children:[e.jsxs("div",{className:"commission-item first-gen",children:[e.jsxs("div",{className:"commission-title",children:[e.jsx("i",{className:"fas fa-crown"}),"1st Generation"]}),e.jsxs("div",{className:"commission-details",children:[e.jsxs("div",{className:"commission-detail",children:[e.jsx("span",{className:"commission-label",children:"First Deposit Commission"}),e.jsx("span",{className:"commission-value",children:"15%"})]}),e.jsxs("div",{className:"commission-detail",children:[e.jsx("span",{className:"commission-label",children:"Staking Profits Commission"}),e.jsx("span",{className:"commission-value",children:"10%"})]})]})]}),e.jsxs("div",{className:"commission-item second-gen",children:[e.jsxs("div",{className:"commission-title",children:[e.jsx("i",{className:"fas fa-users"}),"2nd Generation"]}),e.jsxs("div",{className:"commission-details",children:[e.jsxs("div",{className:"commission-detail",children:[e.jsx("span",{className:"commission-label",children:"First Deposit Commission"}),e.jsx("span",{className:"commission-value",children:"10%"})]}),e.jsxs("div",{className:"commission-detail",children:[e.jsx("span",{className:"commission-label",children:"Staking Profits Commission"}),e.jsx("span",{className:"commission-value",children:"7%"})]})]})]}),e.jsxs("div",{className:"commission-item third-gen",children:[e.jsxs("div",{className:"commission-title",children:[e.jsx("i",{className:"fas fa-user-friends"}),"3rd Generation"]}),e.jsxs("div",{className:"commission-details",children:[e.jsxs("div",{className:"commission-detail",children:[e.jsx("span",{className:"commission-label",children:"First Deposit Commission"}),e.jsx("span",{className:"commission-value",children:"5%"})]}),e.jsxs("div",{className:"commission-detail",children:[e.jsx("span",{className:"commission-label",children:"Staking Profits Commission"}),e.jsx("span",{className:"commission-value",children:"4%"})]})]})]})]})]}),e.jsxs("div",{className:"how-it-works-container",children:[e.jsx("div",{className:"invite-section-title",children:"How It Works"}),e.jsxs("div",{className:"steps-container",children:[e.jsxs("div",{className:"step-item",children:[e.jsx("div",{className:"step-number-circle",children:"1"}),e.jsxs("div",{className:"step-content-text",children:[e.jsx("div",{className:"step-title-text",children:"Share Your Referral Code"}),e.jsx("div",{className:"step-desc",children:"Send your unique code to friends or share it on social media."})]})]}),e.jsxs("div",{className:"step-item",children:[e.jsx("div",{className:"step-number-circle",children:"2"}),e.jsxs("div",{className:"step-content-text",children:[e.jsx("div",{className:"step-title-text",children:"Friends Sign Up"}),e.jsx("div",{className:"step-desc",children:"Your friends sign up using your referral code and verify their accounts."})]})]}),e.jsxs("div",{className:"step-item",children:[e.jsx("div",{className:"step-number-circle",children:"3"}),e.jsxs("div",{className:"step-content-text",children:[e.jsx("div",{className:"step-title-text",children:"Earn Commissions"}),e.jsx("div",{className:"step-desc",children:"Earn commissions from your network's first deposits and staking profits."})]})]})]})]}),v&&e.jsx("div",{className:"toast-notification",id:"referralToast",style:{position:"fixed",bottom:"20px",left:"50%",transform:"translateX(-50%)",background:"#00C076",color:"white",padding:"12px 24px",borderRadius:"8px",fontWeight:"500",zIndex:1001},children:"Referral code copied to clipboard!"}),u&&e.jsx("div",{className:"modal-overlay ",onClick:x,children:e.jsxs("div",{className:"modal-content",onClick:s=>s.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h3",{className:"modal-title",children:n.title}),e.jsx("button",{className:"modal-close-btn",onClick:x,children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsx("div",{className:"modal-body",children:N?e.jsxs("div",{style:{textAlign:"center",padding:"40px",color:"#F3BA2F"},children:[e.jsx("i",{className:"fas fa-spinner fa-spin",style:{fontSize:"24px",marginBottom:"15px"}}),e.jsx("p",{children:"Loading members..."})]}):d&&d.length>0?e.jsx("ul",{className:"members-list",children:d.map((s,t)=>e.jsxs("li",{className:"member-item",children:[e.jsxs("div",{className:"member-info",children:[e.jsx("div",{className:"member-email",children:s.email}),e.jsx("div",{className:"member-date",children:n.type==="approved"?`Approved: ${g.formatDateTime(s.updatedAt||s.createdAt)}`:`Joined: ${g.formatDateTime(s.createdAt)}`})]}),e.jsx("div",{className:`member-status ${n.type==="approved"?"status-approved":"status-pending"}`,children:n.type})]},t))}):e.jsxs("div",{className:"empty-state",children:[e.jsx("i",{className:"fas fa-users"}),e.jsx("p",{children:"No members found"})]})})]})}),e.jsx("div",{className:"toast-notification",id:"referralToast",style:{display:v?"block":"none",position:"fixed",bottom:"20px",left:"50%",transform:"translateX(-50%)",background:"#00C076",color:"white",padding:"12px 24px",borderRadius:"8px",fontWeight:"500",zIndex:"1001"},children:"Referral code copied to clipboard!"}),e.jsx("div",{className:`modal-overlay ${u?"active":""}`,onClick:x,children:e.jsxs("div",{className:"modal-content",onClick:s=>s.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h3",{className:"modal-title",children:n.title}),e.jsx("button",{className:"modal-close-btn",onClick:x,children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsx("div",{className:"modal-body",children:N?e.jsxs("div",{style:{textAlign:"center",padding:"40px",color:"#F3BA2F"},children:[e.jsx("i",{className:"fas fa-spinner fa-spin",style:{fontSize:"24px",marginBottom:"15px"}}),e.jsx("p",{children:"Loading members..."})]}):d&&d.length>0?e.jsx("ul",{className:"members-list",children:d.map((s,t)=>e.jsxs("li",{className:"member-item",children:[e.jsxs("div",{className:"member-info",children:[e.jsx("div",{className:"member-email",children:s.email}),e.jsx("div",{className:"member-date",children:n.type==="approved"?`Approved: ${g.formatDateTime(s.updatedAt||s.createdAt)}`:`Joined: ${g.formatDateTime(s.createdAt)}`})]}),e.jsx("div",{className:`member-status ${n.type==="approved"?"status-approved":"status-pending"}`,children:n.type})]},t))}):e.jsxs("div",{className:"empty-state",children:[e.jsx("i",{className:"fas fa-users"}),e.jsx("p",{children:"No members found"})]})})]})}),e.jsx("style",{children:`
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

          .total-earned-section {
    margin: 20px 0;
  }

  .total-earned-card {
    background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
    border-radius: 16px;
    padding: 30px 20px;
    border: 1px solid #333333;
    text-align: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }

  .total-earned-label {
    color: #aaaaaa;
    font-size: 14px;
    margin-bottom: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .total-earned-amount {
    font-size: 42px;
    font-weight: bold;
    color: #F3BA2F;
    margin-bottom: 8px;
    text-shadow: 0 2px 10px rgba(243, 186, 47, 0.3);
  }

  .total-earned-subtitle {
    color: #666666;
    font-size: 12px;
  }

  /* Responsive Design */
  @media (max-width: 480px) {
    .total-earned-card {
      padding: 25px 15px;
    }

    .total-earned-amount {
      font-size: 36px;
    }
  }
      `})]})}export{_ as default};
