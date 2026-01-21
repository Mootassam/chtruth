import{o as r,j as e}from"./index-cce0a49c.js";const y=({isOpen:a,onClose:c,type:i,amount:l,coinType:d})=>{r.useEffect(()=>{const s=o=>{o.key==="Escape"&&a&&c()};return document.addEventListener("keydown",s),()=>document.removeEventListener("keydown",s)},[a,c]),r.useEffect(()=>(a?(document.body.style.overflow="hidden",m()):document.body.style.overflow="unset",()=>{document.body.style.overflow="unset"}),[a]);const u=s=>{const o={deposit:{title:"Deposit Successful!",message:"Your funds have been successfully deposited to your wallet."},convert:{title:"Conversion Successful!",message:"Your currency conversion has been completed successfully."},staking:{title:"Staking Successful!",message:"Your funds are now staked and earning rewards!"},withdraw:{title:"Withdrawal Submitted!",message:"Your withdrawal request has been received and is under review. We will process it within 24 hours."}};return o[s]||o.deposit},m=()=>{const s=["#F3BA2F","#00C076","#627EEA","#FFFFFF"],o=document.querySelector(".success-modal-overlay");if(!o)return;o.querySelectorAll(".success-confetti").forEach(n=>n.remove());for(let n=0;n<30;n++){const t=document.createElement("div");t.className="success-confetti",t.style.backgroundColor=s[Math.floor(Math.random()*s.length)],t.style.left=Math.random()*100+"vw",t.style.top="-10px",t.style.animation=`successConfettiFall ${Math.random()*3+2}s linear forwards`,t.style.animationDelay=Math.random()*1+"s",o.appendChild(t),setTimeout(()=>{t.parentNode&&t.remove()},5e3)}},f=s=>{s.target===s.currentTarget&&c()};if(!a)return null;const{title:p,message:g}=u(i);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        .success-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10000;
        }

        .success-modal-container {
          background-color: #1A1A1A;
          width: 90%;
          max-width: 350px;
          border-radius: 16px;
          padding: 30px 25px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          border: 1px solid #2A2A2A;
          animation: successModalAppear 0.4s ease-out;
        }

        @keyframes successModalAppear {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .success-modal-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00C076 0%, #00A567 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto 20px;
          animation: successIconScale 0.5s ease-out 0.2s both;
        }

        @keyframes successIconScale {
          0% {
            transform: scale(0);
          }
          70% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        .success-modal-icon i {
          font-size: 36px;
          color: #FFFFFF;
        }

        .success-modal-title {
          font-weight: bold;
          font-size: 22px;
          margin-bottom: 10px;
          color: #FFFFFF;
        }

        .success-modal-amount {
          font-size: 32px;
          font-weight: bold;
          margin: 15px 0;
          color: #F3BA2F;
        }

        .success-modal-message {
          color: #AAAAAA;
          font-size: 16px;
          margin-bottom: 25px;
          line-height: 1.5;
        }

        .success-modal-button {
          background-color: #F3BA2F;
          color: #000000;
          padding: 16px;
          border-radius: 12px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.2s ease;
          width: 100%;
          border: none;
          font-size: 16px;
        }

        .success-modal-button:hover {
          background-color: #E0A91C;
        }

        .success-confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          background-color: #F3BA2F;
          border-radius: 50%;
          opacity: 0;
          pointer-events: none;
        }

        @keyframes successConfettiFall {
          0% {
            transform: translateY(-100px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(500px) rotate(360deg);
            opacity: 0;
          }
        }
      `}),e.jsx("div",{className:"success-modal-overlay",onClick:f,children:e.jsxs("div",{className:"success-modal-container",children:[e.jsx("div",{className:"success-modal-icon",children:e.jsx("i",{className:"fas fa-check"})}),e.jsx("div",{className:"success-modal-title",children:p}),e.jsxs("div",{className:"success-modal-amount",children:[l," ",d]}),e.jsx("div",{className:"success-modal-message",children:g}),e.jsx("button",{className:"success-modal-button",onClick:c,children:"Done"})]})})]})};export{y as S};
