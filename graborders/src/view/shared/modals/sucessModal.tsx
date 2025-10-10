import React, { useEffect } from 'react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'deposit' | 'convert' | 'staking' | 'withdraw';
  amount: string;
  coinType: string;
}

const SuccessModalComponent: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  type,
  amount,
  coinType
}) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      createConfettiEffect();
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const getTypeConfig = (modalType: string) => {
    const config = {
      deposit: {
        title: 'Deposit Successful!',
        message: 'Your funds have been successfully deposited to your wallet.'
      },
      convert: {
        title: 'Conversion Successful!',
        message: 'Your currency conversion has been completed successfully.'
      },
      staking: {
        title: 'Staking Successful!',
        message: 'Your funds are now staked and earning rewards!'
      },
      withdraw: {
        title: 'Withdrawal Submitted!',
        message: 'Your withdrawal request has been received and is under review. We will process it within 24 hours.'
      }
    };
    return config[modalType as keyof typeof config] || config.deposit;
  };

  const createConfettiEffect = () => {
    const colors = ['#F3BA2F', '#00C076', '#627EEA', '#FFFFFF'];
    const modalContainer = document.querySelector('.success-modal-overlay');

    if (!modalContainer) return;

    // Clear existing confetti
    const existingConfetti = modalContainer.querySelectorAll('.success-confetti');
    existingConfetti.forEach(confetti => confetti.remove());

    for (let i = 0; i < 30; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'success-confetti';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = '-10px';
      confetti.style.animation = `successConfettiFall ${Math.random() * 3 + 2}s linear forwards`;
      confetti.style.animationDelay = Math.random() * 1 + 's';

      modalContainer.appendChild(confetti);

      setTimeout(() => {
        if (confetti.parentNode) {
          confetti.remove();
        }
      }, 5000);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const { title, message } = getTypeConfig(type);

  return (
    <>
      <style>{`
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
      `}</style>

      <div className="success-modal-overlay" onClick={handleOverlayClick}>
        <div className="success-modal-container">
          <div className="success-modal-icon">
            <i className="fas fa-check"></i>
          </div>

          <div className="success-modal-title">{title}</div>

          <div className="success-modal-amount">
            {amount} {coinType}
          </div>

          <div className="success-modal-message">
            {message}
          </div>

          <button className="success-modal-button" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </>
  );
};

export default SuccessModalComponent;