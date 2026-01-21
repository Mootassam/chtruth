import{t as r,u as m,k as M,o as g,O as N,j as e,p as a}from"./index-cce0a49c.js";import{S as R}from"./SubHeader-1012ae6c.js";import{D as v}from"./Dates-43507067.js";import{u as T}from"./useDispatch-c7d3eaf0.js";import"./useNotifications-f3d2090f.js";import"./v4-4a60fe23.js";const o=i=>i.user.form,B=r([o],i=>i.user),L=r([o],i=>i.member),I=r([o],i=>i.loading),E=r([o],i=>i.reward),G=r([o],i=>i.users),P=r([o],i=>i.listLoading),O=r([o],i=>!!i.initLoading),X=r([o],i=>!!i.saveLoading),p={selectInitLoading:O,selectSaveLoading:X,selectUser:B,listMembers:L,loading:I,reward:E,lisUsers:G,usersLoading:P,selectRaw:o};function q(){const i=T(),t=m(M.selectCurrentUser),d=m(p.listMembers),f=m(p.loading),c=m(p.lisUsers),u=m(p.usersLoading),$=m(p.reward),[A,y]=g.useState(!1),[l,w]=g.useState({title:"",members:[],type:""}),[b,k]=g.useState(!1);g.useEffect(()=>{t!=null&&t.refcode&&(i(N.rewardCount()),i(N.doTree(t.refcode)))},[i,t==null?void 0:t.refcode]);const C=async()=>{if(t!=null&&t.refcode)try{if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(t.refcode);else{const s=document.createElement("textarea");s.value=t.refcode,s.style.position="fixed",s.style.opacity="0",document.body.appendChild(s),s.focus(),s.select(),document.execCommand("copy"),document.body.removeChild(s)}k(!0),setTimeout(()=>k(!1),2e3)}catch(s){console.error("Failed to copy:",s)}},x=s=>{const n=`Join NEXUS using my referral code: ${t==null?void 0:t.refcode}`,j=window.location.origin;switch(s){case"whatsapp":window.open(`https://wa.me/?text=${encodeURIComponent(n)}`,"_blank");break;case"email":window.open(`mailto:?subject=Join NEXUS&body=${encodeURIComponent(n)}`,"_blank");break;case"sms":window.open(`sms:?body=${encodeURIComponent(n)}`,"_blank");break;case"more":navigator.share?navigator.share({title:"NEXUS Referral",text:n,url:j}):C();break}},F=(s,n)=>{const j=`${s}${S(s)} Generation ${n==="approved"?"Approved":"Pending"} Members`;w({title:j,members:[],type:n}),y(!0);const D={status:n,refCode:t==null?void 0:t.refcode,level:s};i(N.byLevel(D))},h=()=>{y(!1),w({title:"",members:[],type:""})},S=s=>s===1?"st":s===2?"nd":s===3?"rd":"th",z=s=>`${s}${S(s)} Generation Members`;return e.jsxs("div",{className:"container",children:[e.jsx(R,{title:a("pages.invitation.title")}),e.jsxs("div",{className:"invite-earn-section",children:[e.jsx("div",{className:"invite-section-title",children:a("pages.invitation.earnTogether")}),e.jsx("div",{className:"invite-desc",children:a("pages.invitation.description")}),e.jsx("div",{className:"referral-text",children:a("pages.invitation.yourReferralCode")}),e.jsx("div",{className:"referral-code-value",id:"referralCode",children:(t==null?void 0:t.refcode)||a("pages.invitation.loading")}),e.jsxs("button",{className:"referral-copy-btn",id:"copyReferralBtn",onClick:C,children:[e.jsx("i",{className:"fas fa-copy"}),b?a("pages.invitation.copied"):a("pages.invitation.copyCode")]}),e.jsxs("div",{className:"share-buttons",children:[e.jsx("div",{className:"share-btn",onClick:()=>x("whatsapp"),children:e.jsx("i",{className:"fab fa-whatsapp share-icon-img"})}),e.jsx("div",{className:"share-btn",onClick:()=>x("email"),children:e.jsx("i",{className:"fas fa-envelope share-icon-img"})}),e.jsx("div",{className:"share-btn",onClick:()=>x("sms"),children:e.jsx("i",{className:"fas fa-sms share-icon-img"})}),e.jsx("div",{className:"share-btn",onClick:()=>x("more"),children:e.jsx("i",{className:"fas fa-share-alt share-icon-img"})})]})]}),e.jsx("div",{className:"total-earned-section",children:e.jsxs("div",{className:"total-earned-card",children:[e.jsx("div",{className:"total-earned-label",children:a("pages.invitation.totalEarned")}),e.jsxs("div",{className:"total-earned-amount",children:[$.toFixed(0)," USDT"]}),e.jsx("div",{className:"total-earned-subtitle",children:a("pages.invitation.allTimeCommission")})]})}),e.jsxs("div",{className:"generation-stats-container",children:[e.jsx("div",{className:"invite-section-title",children:a("pages.invitation.generationMembers")}),e.jsxs("div",{className:"generation-stats-grid",children:[f&&e.jsxs("h2",{children:[" ",a("pages.invitation.loading")," "]}),!f&&(d==null?void 0:d.length)===0&&e.jsx("div",{style:{textAlign:"center",color:"#AAAAAA",padding:"20px"},children:a("pages.invitation.noGenerationData")}),!f&&(d==null?void 0:d.map((s,n)=>e.jsxs("div",{className:"generation-stat-item first-gen",children:[e.jsxs("div",{className:"generation-stat-title",children:[e.jsx("i",{className:"fas fa-crown"}),z(s==null?void 0:s.level)]}),e.jsxs("div",{className:"generation-stats-details",children:[e.jsxs("div",{className:"generation-stat-detail generation-stat-approved",onClick:()=>F(s.level,"approved"),style:{cursor:"pointer"},children:[e.jsx("div",{className:"generation-stat-value",children:(s==null?void 0:s.approvedCount)||0}),e.jsx("div",{className:"generation-stat-label",children:a("pages.invitation.approvedMembers")})]}),e.jsxs("div",{className:"generation-stat-detail generation-stat-pending",onClick:()=>F(s.level,"pending"),style:{cursor:"pointer"},children:[e.jsx("div",{className:"generation-stat-value",children:(s==null?void 0:s.pendingCount)||0}),e.jsx("div",{className:"generation-stat-label",children:a("pages.invitation.pendingMembers")})]})]})]},n)))]})]}),e.jsxs("div",{className:"commission-container",children:[e.jsx("div",{className:"invite-section-title",children:a("pages.invitation.commissionStructure")}),e.jsxs("div",{className:"commission-grid",children:[e.jsxs("div",{className:"commission-item first-gen",children:[e.jsxs("div",{className:"commission-title",children:[e.jsx("i",{className:"fas fa-crown"}),a("pages.invitation.firstGeneration")]}),e.jsxs("div",{className:"commission-details",children:[e.jsxs("div",{className:"commission-detail",children:[e.jsx("span",{className:"commission-label",children:a("pages.invitation.firstDepositCommission")}),e.jsx("span",{className:"commission-value",children:"15%"})]}),e.jsxs("div",{className:"commission-detail",children:[e.jsx("span",{className:"commission-label",children:a("pages.invitation.stakingProfitsCommission")}),e.jsx("span",{className:"commission-value",children:"10%"})]})]})]}),e.jsxs("div",{className:"commission-item second-gen",children:[e.jsxs("div",{className:"commission-title",children:[e.jsx("i",{className:"fas fa-users"}),a("pages.invitation.secondGeneration")]}),e.jsxs("div",{className:"commission-details",children:[e.jsxs("div",{className:"commission-detail",children:[e.jsx("span",{className:"commission-label",children:a("pages.invitation.firstDepositCommission")}),e.jsx("span",{className:"commission-value",children:"10%"})]}),e.jsxs("div",{className:"commission-detail",children:[e.jsx("span",{className:"commission-label",children:a("pages.invitation.stakingProfitsCommission")}),e.jsx("span",{className:"commission-value",children:"7%"})]})]})]}),e.jsxs("div",{className:"commission-item third-gen",children:[e.jsxs("div",{className:"commission-title",children:[e.jsx("i",{className:"fas fa-user-friends"}),a("pages.invitation.thirdGeneration")]}),e.jsxs("div",{className:"commission-details",children:[e.jsxs("div",{className:"commission-detail",children:[e.jsx("span",{className:"commission-label",children:a("pages.invitation.firstDepositCommission")}),e.jsx("span",{className:"commission-value",children:"5%"})]}),e.jsxs("div",{className:"commission-detail",children:[e.jsx("span",{className:"commission-label",children:a("pages.invitation.stakingProfitsCommission")}),e.jsx("span",{className:"commission-value",children:"4%"})]})]})]})]})]}),e.jsxs("div",{className:"how-it-works-container",children:[e.jsx("div",{className:"invite-section-title",children:a("pages.invitation.howItWorks")}),e.jsxs("div",{className:"steps-container",children:[e.jsxs("div",{className:"step-item",children:[e.jsx("div",{className:"step-number-circle",children:"1"}),e.jsxs("div",{className:"step-content-text",children:[e.jsx("div",{className:"step-title-text",children:a("pages.invitation.steps.shareCode.title")}),e.jsx("div",{className:"step-desc",children:a("pages.invitation.steps.shareCode.description")})]})]}),e.jsxs("div",{className:"step-item",children:[e.jsx("div",{className:"step-number-circle",children:"2"}),e.jsxs("div",{className:"step-content-text",children:[e.jsx("div",{className:"step-title-text",children:a("pages.invitation.steps.friendsSignUp.title")}),e.jsx("div",{className:"step-desc",children:a("pages.invitation.steps.friendsSignUp.description")})]})]}),e.jsxs("div",{className:"step-item",children:[e.jsx("div",{className:"step-number-circle",children:"3"}),e.jsxs("div",{className:"step-content-text",children:[e.jsx("div",{className:"step-title-text",children:a("pages.invitation.steps.earnCommissions.title")}),e.jsx("div",{className:"step-desc",children:a("pages.invitation.steps.earnCommissions.description")})]})]})]})]}),b&&e.jsx("div",{className:"toast-notification",id:"referralToast",style:{position:"fixed",bottom:"20px",left:"50%",transform:"translateX(-50%)",background:"#00C076",color:"white",padding:"12px 24px",borderRadius:"8px",fontWeight:"500",zIndex:1001},children:a("pages.invitation.referralCopied")}),A&&e.jsx("div",{className:"modal-overlay ",onClick:h,children:e.jsxs("div",{className:"modal-content",onClick:s=>s.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h3",{className:"modal-title",children:l.title}),e.jsx("button",{className:"modal-close-btn",onClick:h,children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsx("div",{className:"modal-body",children:u?e.jsxs("div",{style:{textAlign:"center",padding:"40px",color:"#F3BA2F"},children:[e.jsx("i",{className:"fas fa-spinner fa-spin",style:{fontSize:"24px",marginBottom:"15px"}}),e.jsx("p",{children:a("pages.invitation.loadingMembers")})]}):c&&c.length>0?e.jsx("ul",{className:"members-list",children:c.map((s,n)=>e.jsxs("li",{className:"member-item",children:[e.jsxs("div",{className:"member-info",children:[e.jsx("div",{className:"member-email",children:s.email}),e.jsx("div",{className:"member-date",children:l.type==="approved"?`${a("pages.invitation.approved")}: ${v.formatDateTime(s.updatedAt||s.createdAt)}`:`${a("pages.invitation.joined")}: ${v.formatDateTime(s.createdAt)}`})]}),e.jsx("div",{className:`member-status ${l.type==="approved"?"status-approved":"status-pending"}`,children:l.type})]},n))}):e.jsxs("div",{className:"empty-state",children:[e.jsx("i",{className:"fas fa-users"}),e.jsx("p",{children:a("pages.invitation.noMembersFound")})]})})]})}),e.jsx("div",{className:"toast-notification",id:"referralToast",style:{display:b?"block":"none",position:"fixed",bottom:"20px",left:"50%",transform:"translateX(-50%)",background:"#00C076",color:"white",padding:"12px 24px",borderRadius:"8px",fontWeight:"500",zIndex:"1001"},children:a("pages.invitation.referralCopied")}),e.jsx("div",{className:`modal-overlay ${A?"active":""}`,onClick:h,children:e.jsxs("div",{className:"modal-content",onClick:s=>s.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h3",{className:"modal-title",children:l.title}),e.jsx("button",{className:"modal-close-btn",onClick:h,children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsx("div",{className:"modal-body",children:u?e.jsxs("div",{style:{textAlign:"center",padding:"40px",color:"#F3BA2F"},children:[e.jsx("i",{className:"fas fa-spinner fa-spin",style:{fontSize:"24px",marginBottom:"15px"}}),e.jsx("p",{children:a("pages.invitation.loadingMembers")})]}):c&&c.length>0?e.jsx("ul",{className:"members-list",children:c.map((s,n)=>e.jsxs("li",{className:"member-item",children:[e.jsxs("div",{className:"member-info",children:[e.jsx("div",{className:"member-email",children:s.email}),e.jsx("div",{className:"member-date",children:l.type==="approved"?`${a("pages.invitation.approved")}: ${v.formatDateTime(s.updatedAt||s.createdAt)}`:`${a("pages.invitation.joined")}: ${v.formatDateTime(s.createdAt)}`})]}),e.jsx("div",{className:`member-status ${l.type==="approved"?"status-approved":"status-pending"}`,children:l.type})]},n))}):e.jsxs("div",{className:"empty-state",children:[e.jsx("i",{className:"fas fa-users"}),e.jsx("p",{children:a("pages.invitation.noMembersFound")})]})})]})}),e.jsx("style",{children:`
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
      `})]})}export{q as default};
