import React, { useEffect, useState } from 'react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const FAQ: React.FC = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqCategories = [
    { id: 'all', name: 'All Questions' },
    { id: 'account', name: 'Account & Security' },
    { id: 'trading', name: 'Trading & Fees' },
    { id: 'deposit', name: 'Deposit & Withdrawal' },
    { id: 'technical', name: 'Technical Issues' },
    { id: 'general', name: 'General Information' }
  ];

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "How do I create a Nexus Exchange account?",
      answer: "Creating an account is simple. Click on the 'Sign Up' button on our homepage, enter your email address, create a strong password, and complete the verification process. You'll need to verify your email and complete our KYC (Know Your Customer) process to start trading.",
      category: "account"
    },
    {
      id: 2,
      question: "What security measures does Nexus Exchange have?",
      answer: "We employ multiple security layers including: Two-Factor Authentication (2FA), cold storage for 95% of digital assets, SSL encryption, anti-phishing codes, withdrawal address whitelisting, and regular security audits. We also offer insurance coverage for digital assets held in our custody.",
      category: "account"
    },
    {
      id: 3,
      question: "What are the trading fees on Nexus Exchange?",
      answer: "Our trading fees start at 0.1% for makers and 0.2% for takers. Fees decrease based on your 30-day trading volume or by holding our native NEX token. We offer competitive fee structures for both retail and institutional traders.",
      category: "trading"
    },
    {
      id: 4,
      question: "How long do deposits and withdrawals take?",
      answer: "Cryptocurrency deposits are typically confirmed within 2-30 minutes depending on network congestion. Withdrawals undergo security checks and are usually processed within 30 minutes. Fiat deposits via bank transfer take 1-3 business days, while withdrawals take 1-2 business days.",
      category: "deposit"
    },
    {
      id: 5,
      question: "What cryptocurrencies does Nexus Exchange support?",
      answer: "We support over 200 cryptocurrencies including Bitcoin (BTC), Ethereum (ETH), Binance Coin (BNB), Cardano (ADA), Solana (SOL), Ripple (XRP), Polkadot (DOT), and many more. We regularly add new tokens based on community demand and thorough security reviews.",
      category: "general"
    },
 
    {
      id: 7,
      question: "What is the minimum deposit amount?",
      answer: "The minimum deposit varies by cryptocurrency. For Bitcoin, it's 0.001 BTC. For Ethereum, it's 0.01 ETH. You can find the complete list of minimum deposits for each supported cryptocurrency in our Deposit section under each asset's details.",
      category: "deposit"
    },
    {
      id: 8,
      question: "How does staking work on Nexus Exchange?",
      answer: "Staking allows you to earn rewards by holding certain cryptocurrencies. Go to the Earn section, select the asset you want to stake, choose the staking period, and confirm. Rewards are calculated daily and distributed to your account. You can unstake at any time, though some assets may have unlocking periods.",
      category: "trading"
    },
    {
      id: 9,
      question: "What should I do if I can't log into my account?",
      answer: "First, ensure you're using the correct email and password. If you've forgotten your password, use the 'Forgot Password' feature. If 2FA is causing issues, use your backup codes. For persistent issues, contact our 24/7 support team with your account email and any error messages received.",
      category: "technical"
    },
    {
      id: 10,
      question: "Are there any withdrawal limits?",
      answer: "Yes, withdrawal limits depend on your verification level. Basic verified accounts can withdraw up to $50,000 daily. Fully verified accounts have limits of $500,000 daily. Institutional accounts can request higher limits. Limits reset every 24 hours at UTC 00:00.",
      category: "deposit"
    },
    {
      id: 11,
      question: "How do I report a suspicious transaction?",
      answer: "Immediately contact our security team at support@nexus-exchange.com with details of the transaction. Include transaction IDs, dates, amounts, and any relevant information. We investigate all reports promptly and may temporarily freeze suspicious transactions during investigation.",
      category: "account"
    },
    {
      id: 12,
      question: "What is the difference between spot and futures trading?",
      answer: "Spot trading involves buying and selling cryptocurrencies at current market prices for immediate settlement. Futures trading allows you to speculate on future price movements with leverage. Futures are more complex and carry higher risk, suitable for experienced traders.",
      category: "trading"
    },
    {
      id: 13,
      question: "How do I contact customer support?",
      answer: "We offer 24/7 customer support through multiple channels: Live chat on our website and app, email at support@nexus-exchange.com, and our help center with extensive documentation. Response times are typically under 5 minutes for live chat and 2 hours for email.",
      category: "general"
    },
    {
      id: 14,
      question: "What countries are supported by Nexus Exchange?",
      answer: "We serve customers in over 150 countries worldwide. However, due to regulatory requirements, we cannot serve residents of certain restricted jurisdictions including the United States, North Korea, Iran, and Syria. Check our Terms of Service for the complete list of restricted countries.",
      category: "general"
    },
    {
      id: 15,
      question: "How are my digital assets insured?",
      answer: "Digital assets held in our custody are covered by a comprehensive insurance policy that protects against theft, including cybersecurity breaches. The policy covers both hot and cold storage assets. We maintain transparent proof of reserves and regularly undergo third-party audits.",
      category: "account"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  const toggleFaq = (id: number) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  const filteredFaqs = faqItems.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const popularFaqs = faqItems.filter(faq => [1, 3, 5, 8, 13].includes(faq.id));

  return (
    <>
      <style>{`
     
        
        /* Hero Section */
        .faq-hero {
          padding: 180px 0 100px;
          background: linear-gradient(135deg, rgba(243, 186, 47, 0.1) 0%, rgba(0, 192, 118, 0.05) 100%);
          position: relative;
          overflow: hidden;
          text-align: center;
        }
        
        .faq-hero-content {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .faq-hero-title {
          font-size: 3.5rem;
          font-weight: 900;
          margin-bottom: 20px;
          line-height: 1.2;
        }
        
        .faq-hero-title span {
          background: var(--gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .faq-hero-subtitle {
          font-size: 1.2rem;
          color: var(--light-gray);
          margin-bottom: 30px;
        }
        
        /* FAQ Content */
        .faq-content {
          padding: 80px 0;
          background-color: var(--dark-gray);
        }
        
        .faq-container {
          max-width: 1000px;
          margin: 0 auto;
        }
        
        .section-title {
          font-size: 2rem;
          margin-bottom: 30px;
          color: var(--white);
        }
        
        .section-title span {
          color: var(--primary);
        }
        
        /* Search Section */
        .search-section {
          background-color: var(--medium-gray);
          border-radius: 12px;
          padding: 30px;
          margin-bottom: 40px;
          text-align: center;
        }
        
        .search-box {
          display: flex;
          max-width: 500px;
          margin: 0 auto;
          gap: 10px;
        }
        
        .search-input {
          flex: 1;
          background-color: var(--dark);
          border: 1px solid var(--light-gray);
          border-radius: 8px;
          padding: 12px 15px;
          color: var(--white);
          font-size: 16px;
        }
        
        .search-input:focus {
          outline: none;
          border-color: var(--primary);
        }
        
        .search-btn {
          background-color: var(--primary);
          border: none;
          border-radius: 8px;
          padding: 12px 20px;
          color: var(--dark);
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        
        .search-btn:hover {
          background-color: #e0a91a;
        }
        
        /* Category Filters */
        .category-filters {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }
        
        .category-btn {
          background-color: var(--medium-gray);
          border: none;
          color: var(--white);
          padding: 10px 20px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s;
          font-weight: 500;
        }
        
        .category-btn.active {
          background-color: var(--primary);
          color: var(--dark);
        }
        
        .category-btn:hover {
          background-color: var(--primary);
          color: var(--dark);
        }
        
        /* Popular Questions */
        .popular-questions {
          margin-bottom: 50px;
        }
        
        .popular-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        
        .popular-card {
          background-color: var(--medium-gray);
          border-radius: 12px;
          padding: 25px;
          transition: transform 0.3s;
          cursor: pointer;
        }
        
        .popular-card:hover {
          transform: translateY(-5px);
        }
        
        .popular-icon {
          font-size: 24px;
          color: var(--primary);
          margin-bottom: 15px;
        }
        
        .popular-question {
          font-weight: 600;
          margin-bottom: 10px;
          font-size: 1.1rem;
        }
        
        /* FAQ List */
        .faq-list {
          margin-bottom: 50px;
        }
        
        .faq-item {
          background-color: var(--medium-gray);
          border-radius: 12px;
          margin-bottom: 15px;
          overflow: hidden;
          transition: all 0.3s;
        }
        
        .faq-item.active {
          background-color: rgba(243, 186, 47, 0.1);
        }
        
        .faq-question {
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.3s;
        }
        
        .faq-question:hover {
          background-color: rgba(243, 186, 47, 0.05);
        }
        
        .faq-answer {
          padding: 0 20px;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s, padding 0.3s;
          color: var(--light-gray);
          line-height: 1.6;
        }
        
        .faq-item.active .faq-answer {
          padding: 0 20px 20px;
          max-height: 500px;
        }
        
        .faq-toggle {
          transition: transform 0.3s;
          color: var(--primary);
        }
        
        .faq-item.active .faq-toggle {
          transform: rotate(180deg);
        }
        
        .faq-category {
          display: inline-block;
          background-color: var(--primary);
          color: var(--dark);
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.7rem;
          font-weight: 600;
          margin-left: 10px;
          text-transform: uppercase;
        }
        
        /* Support Section */
        .support-section {
          background: var(--gradient);
          border-radius: 12px;
          padding: 40px;
          text-align: center;
          color: var(--dark);
        }
        
        .support-title {
          font-size: 1.8rem;
          margin-bottom: 15px;
          font-weight: 700;
        }
        
        .support-description {
          margin-bottom: 25px;
          font-size: 1.1rem;
        }
        
        .support-buttons {
          display: flex;
          gap: 15px;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .support-btn {
          background-color: var(--dark);
          color: var(--white);
          border: none;
          padding: 12px 25px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        
        .support-btn:hover {
          background-color: var(--dark-gray);
        }
        
        .support-btn.secondary {
          background-color: transparent;
          border: 2px solid var(--dark);
          color: var(--dark);
        }
        
        .support-btn.secondary:hover {
          background-color: var(--dark);
          color: var(--white);
        }
        
        /* Footer */
        footer {
          background-color: var(--dark-gray);
          padding: 60px 0 20px;
        }
        
        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 40px;
          margin-bottom: 40px;
        }
        
        .footer-column h3 {
          font-size: 1.2rem;
          margin-bottom: 20px;
          color: var(--primary);
        }
        
        .footer-links {
          list-style: none;
        }
        
        .footer-links li {
          margin-bottom: 10px;
        }
        
        .footer-links a {
          color: var(--light-gray);
          text-decoration: none;
          transition: color 0.3s;
        }
        
        .footer-links a:hover {
          color: var(--primary);
        }
        
        .social-links {
          display: flex;
          gap: 15px;
          margin-top: 20px;
        }
        
        .social-link {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: var(--medium-gray);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--white);
          transition: background-color 0.3s, transform 0.3s;
        }
        
        .social-link:hover {
          background-color: var(--primary);
          transform: translateY(-3px);
          color: var(--dark);
        }
        
        .copyright {
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid var(--medium-gray);
          color: var(--light-gray);
          font-size: 14px;
        }
        
        /* Responsive Design */
        @media (max-width: 992px) {
          .faq-hero-title {
            font-size: 2.8rem;
          }
          
          .section-title {
            font-size: 1.8rem;
          }
          
          .popular-grid {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 768px) {
          .nav-menu {
            position: fixed;
            top: 80px;
            left: -100%;
            flex-direction: column;
            background-color: var(--dark);
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
            padding: 20px 0;
            gap: 0;
          }
          
          .nav-menu.active {
            left: 0;
          }
          
          .nav-link {
            padding: 15px 0;
            display: block;
          }
          
          .mobile-toggle {
            display: block;
          }
          
          .search-bar {
            display: none;
          }
          
          .faq-hero-title {
            font-size: 2.2rem;
          }
          
          .section-title {
            font-size: 1.6rem;
          }
          
          .search-box {
            flex-direction: column;
          }
          
          .support-buttons {
            flex-direction: column;
            align-items: center;
          }
        }
        
        @media (max-width: 576px) {
          .faq-hero-title {
            font-size: 1.8rem;
          }
          
          .section-title {
            font-size: 1.4rem;
          }
          
          .category-filters {
            justify-content: flex-start;
            overflow-x: auto;
            padding-bottom: 10px;
          }
        }
      `}</style>

  

      {/* Hero Section */}
      <section className="faq-hero">
        <div className="container">
          <div className="faq-hero-content">
            <h1 className="faq-hero-title">Frequently Asked <span>Questions</span></h1>
            <p className="faq-hero-subtitle">Find quick answers to common questions about Nexus Exchange, trading, security, and more.</p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="faq-content">
        <div className="container">
          <div className="faq-container">
            {/* Search Section */}
            <div className="search-section">
              <h2 className="section-title">How can we <span>help you?</span></h2>
              <div className="search-box">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search for answers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="search-btn">
                  <i className="fas fa-search"></i> Search
                </button>
              </div>
            </div>

            {/* Category Filters */}
            <div className="category-filters">
              {faqCategories.map(category => (
                <button
                  key={category.id}
                  className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Popular Questions */}
            <div className="popular-questions">
              <h2 className="section-title">Popular <span>Questions</span></h2>
              <div className="popular-grid">
                {popularFaqs.map(faq => (
                  <div key={faq.id} className="popular-card" onClick={() => toggleFaq(faq.id)}>
                    <div className="popular-icon">
                      <i className="fas fa-question-circle"></i>
                    </div>
                    <h3 className="popular-question">{faq.question}</h3>
                    <p className="faq-answer" style={{ 
                      maxHeight: activeFaq === faq.id ? '500px' : '0',
                      padding: activeFaq === faq.id ? '15px 0 0 0' : '0',
                      margin: 0
                    }}>
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ List */}
            <div className="faq-list">
              <h2 className="section-title">All <span>Questions</span></h2>
              <div className="faq-items">
                {filteredFaqs.map(faq => (
                  <div key={faq.id} className={`faq-item ${activeFaq === faq.id ? 'active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFaq(faq.id)}>
                      <span>
                        {faq.question}
                        <span className="faq-category">
                          {faqCategories.find(cat => cat.id === faq.category)?.name.split(' ')[0]}
                        </span>
                      </span>
                      <i className={`fas fa-chevron-down faq-toggle ${activeFaq === faq.id ? 'active' : ''}`}></i>
                    </div>
                    <div className="faq-answer">
                      {faq.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Section */}
            <div className="support-section">
              <h2 className="support-title">Still need help?</h2>
              <p className="support-description">
                Can't find the answer you're looking for? Our support team is here to help you 24/7.
              </p>
              <div className="support-buttons">
                <button className="support-btn">
                  <i className="fas fa-comments"></i> Live Chat Support
                </button>
                <a href='mailto:support@nexus-exchange.com'  style={{ textDecoration: "none" }} className="support-btn secondary">
                  <i className="fas fa-envelope"></i> Email Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

   
    </>
  );
};

export default FAQ;