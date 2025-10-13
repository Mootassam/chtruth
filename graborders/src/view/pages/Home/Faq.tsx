import React, { useState, useEffect, useRef } from 'react';

// Define TypeScript interfaces
interface FAQItem {
  id: string;
  question: string;
  answer: string | React.ReactNode;
  icon: string;
  category: string;
}

interface ActionCard {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const Faq: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>('');
  const notificationRef = useRef<HTMLDivElement>(null);

  // FAQ Data
  const faqData: FAQItem[] = [
    {
      id: '1',
      question: 'How do I create an account?',
      answer: (
        <div className="step-list">
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            Go to www.nexustradex.com
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            Click "Sign Up"
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            Enter your details
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            Verify your email address
          </div>
        </div>
      ),
      icon: 'fa-user-plus',
      category: 'getting-started'
    },
    {
      id: '2',
      question: 'How do I complete verification?',
      answer: 'Upload a government-issued ID and a selfie photo. Verification is usually approved within hours.',
      icon: 'fa-id-card',
      category: 'getting-started'
    },
    {
      id: '3',
      question: 'How do I buy cryptocurrency?',
      answer: (
        <div className="step-list">
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            Complete verification first
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            Click "Buy Crypto"
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            Select coin and payment method
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            Confirm transaction
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            Crypto will appear in your wallet
          </div>
        </div>
      ),
      icon: 'fa-shopping-cart',
      category: 'getting-started'
    },
    {
      id: '4',
      question: 'How do I trade cryptocurrencies?',
      answer: (
        <div className="step-list">
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            Go to "Trade/Markets"
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            Pick a trading pair (e.g., BTC/USDT)
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            Place market or limit orders
          </div>
        </div>
      ),
      icon: 'fa-chart-line',
      category: 'managing-account'
    },
    {
      id: '5',
      question: 'How do I receive and send crypto?',
      answer: (
        <>
          <strong>To receive:</strong> Go to Wallet &gt; Receive → copy address or QR code
          <br />
          <br />
          <strong>To send:</strong> Go to Wallet &gt; Send → enter address/amount → confirm
        </>
      ),
      icon: 'fa-wallet',
      category: 'managing-account'
    },
    {
      id: '6',
      question: 'How do I become a P2P Merchant?',
      answer: (
        <div className="step-list">
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            Apply under "P2P" section
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            Meet eligibility criteria
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            Once approved, create offers & trade
          </div>
        </div>
      ),
      icon: 'fa-store',
      category: 'managing-account'
    },
    {
      id: '7',
      question: 'How does staking work?',
      answer: (
        <div className="step-list">
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            Go to Wallets &gt; Staking
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            Pick a staking plan
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            Select amount to stake
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            Confirm transaction
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            Rewards processed automatically at end of period
          </div>
        </div>
      ),
      icon: 'fa-coins',
      category: 'managing-account'
    }
  ];

  const futuresData: FAQItem[] = [
    {
      id: 'f1',
      question: 'What are futures contracts?',
      answer: 'Agreements to buy or sell crypto at a predetermined price on a future date (cash-settled).',
      icon: 'fa-file-contract',
      category: 'futures'
    },
    {
      id: 'f2',
      question: 'What is leverage?',
      answer: 'Ability to trade with more capital than you have (e.g., 10x, 20x, 50x leverage).',
      icon: 'fa-arrows-alt-h',
      category: 'futures'
    },
    {
      id: 'f3',
      question: 'What are Long and Short positions?',
      answer: (
        <>
          <strong>Long</strong> = betting the price will go up
          <br />
          <strong>Short</strong> = betting the price will go down
        </>
      ),
      icon: 'fa-long-arrow-alt-up',
      category: 'futures'
    },
    {
      id: 'f4',
      question: 'What are Margin & Liquidation?',
      answer: 'Risk of position liquidation if your collateral drops too low to maintain the position.',
      icon: 'fa-exclamation-triangle',
      category: 'futures'
    },
    {
      id: 'f5',
      question: 'What is the Funding Rate?',
      answer: 'Fee exchanged every 8 hours between long and short traders to balance perpetual contract prices with spot prices.',
      icon: 'fa-percentage',
      category: 'futures'
    },
    {
      id: 'f6',
      question: 'How is Profit/Loss calculated?',
      answer: 'Calculated based on price difference multiplied by your leverage and position size.',
      icon: 'fa-calculator',
      category: 'futures'
    }
  ];

  const actionCards: ActionCard[] = [
    {
      id: 'ac1',
      title: 'Contact Support',
      description: 'Get help from our team',
      icon: 'fa-headset'
    },
    {
      id: 'ac2',
      title: 'Learning Center',
      description: 'Expand your knowledge',
      icon: 'fa-graduation-cap'
    },
    {
      id: 'ac3',
      title: 'Tutorials',
      description: 'Step-by-step guides',
      icon: 'fa-book'
    },
    {
      id: 'ac4',
      title: 'Community',
      description: 'Join discussions',
      icon: 'fa-comments'
    }
  ];

  // Filter FAQs based on search term
  const filteredFaqs = faqData.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (typeof item.answer === 'string' && item.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredFutures = futuresData.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (typeof item.answer === 'string' && item.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Handle back button click
  const handleBackClick = () => {
    window.history.back();
  };

  // Handle action card click
  const handleActionCardClick = (title: string) => {
    setNotificationMessage(`Opening ${title}`);
    setShowNotification(true);
    
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  // Group FAQs by category for display
  const gettingStartedFaqs = filteredFaqs.filter(item => item.category === 'getting-started');
  const managingAccountFaqs = filteredFaqs.filter(item => item.category === 'managing-account');

  return (
    <div className="container">
      {/* Header Section */}
      <div className="headerq">
        <div className="header-content">
          <div className="back-button" onClick={handleBackClick}>
            <i className="fas fa-arrow-left" />
          </div>
          <div className="page-title">FAQ Center</div>
          <div className="placeholder"></div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-title">Frequently Asked Questions</div>
        <div className="hero-subtitle">
          Find answers to common questions about using Nexus
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search for answers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Getting Started Section */}
      {gettingStartedFaqs.length > 0 && (
        <div className="faq-section">
          <div className="section-title">Getting Started</div>
          <div className="faq-category">
            {gettingStartedFaqs.map((faq) => (
              <div key={faq.id} className="faq-item">
                <div className="faq-question">
                  <i className={`fas ${faq.icon} faq-icon`} />
                  {faq.question}
                </div>
                <div className="faq-answer">
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Managing Your Account Section */}
      {managingAccountFaqs.length > 0 && (
        <div className="faq-section">
          <div className="section-title">Managing Your Account</div>
          <div className="faq-category">
            {managingAccountFaqs.map((faq) => (
              <div key={faq.id} className="faq-item">
                <div className="faq-question">
                  <i className={`fas ${faq.icon} faq-icon`} />
                  {faq.question}
                </div>
                <div className="faq-answer">
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Futures Trading Section */}
      {filteredFutures.length > 0 && (
        <div className="futures-section">
          <div className="futures-title">
            <i className="fas fa-chart-bar" />
            Futures Trading Explained
          </div>
          {filteredFutures.map((faq) => (
            <div key={faq.id} className="faq-item">
              <div className="faq-question">
                <i className={`fas ${faq.icon} faq-icon`} />
                {faq.question}
              </div>
              <div className="faq-answer">
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Benefits Section */}
      <div className="benefits-section">
        <div className="benefits-title">
          <i className="fas fa-star" />
          Why Choose Nexus Futures?
        </div>
        <ul className="benefits-list">
          <li className="benefit-item">
            <i className="fas fa-shield-alt benefit-icon" />
            <div className="benefit-content">
              <div className="benefit-text">Hedge against market volatility</div>
            </div>
          </li>
          <li className="benefit-item">
            <i className="fas fa-rocket benefit-icon" />
            <div className="benefit-content">
              <div className="benefit-text">Multiply profits with leverage</div>
            </div>
          </li>
          <li className="benefit-item">
            <i className="fas fa-arrows-alt-v benefit-icon" />
            <div className="benefit-content">
              <div className="benefit-text">Trade both rising and falling markets</div>
            </div>
          </li>
          <li className="benefit-item">
            <i className="fas fa-chess benefit-icon" />
            <div className="benefit-content">
              <div className="benefit-text">Implement advanced trading strategies</div>
            </div>
          </li>
        </ul>
      </div>

      {/* Action Cards */}
      <div className="action-cards">
        {actionCards.map((card) => (
          <div
            key={card.id}
            className="action-card"
            onClick={() => handleActionCardClick(card.title)}
          >
            <i className={`fas ${card.icon} action-icon`} />
            <div className="action-title">{card.title}</div>
            <div className="action-description">{card.description}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="footer">
        © 2025 Nexus Nexus Exchange. All rights reserved.
        <br />
        Need more help? Contact support@nexus-exchange.com
      </div>

      {/* Notification Element */}
      <div 
        ref={notificationRef}
        className={`notification ${showNotification ? 'show' : ''}`}
      >
        {notificationMessage}
      </div>


      <style>{`





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
      `}</style>
    </div>
  );
};

export default Faq;