import React, { useState } from 'react';

const HelpCenter: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('general');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const teamMembers = {
    technical: {
      name: "Dr. Sarah Chen",
      title: "Head of Technical Team",
      email: "support@nexus-exchange.com",
      picture: "/sara.jpg",
      description: "15+ years experience in blockchain technology and cybersecurity. Leads our technical infrastructure and platform development.",
      expertise: ["Blockchain Technology", "System Architecture", "Security", "API Integration"]
    },
    transactions: {
      name: "Michael Rodriguez",
      title: "Head of Transactions Team",
      email: "security@nexus-exchange.com",
      picture: "/micheal.jpg",
      description: "Financial services expert with extensive background in digital asset management and transaction processing.",
      expertise: ["Payment Processing", "Risk Management", "Compliance", "Customer Support"]
    }
  };

  const contactInfo = {
    general: "support@nexus-exchange.com",
    technical: "affiliate@nexus-exchange.com",
    security: "security@nexus-exchange.com",
  };

  const addresses = {
    headquarters: {
      name: "Global Headquarters",
      address: "Headquartered in New York, with teams across Dubai, London, Los Angeles, and Miami,",
    },
  };

  const faqCategories = {
    general: [
      {
        question: "How do I create an account on Nexus Exchange?",
        answer: "Click the 'Register' button on our homepage, provide your email address, create a strong password, and complete the verification process. You'll need to verify your email and complete KYC procedures."
      },
      {
        question: "What is the minimum deposit amount?",
        answer: "The minimum deposit varies by cryptocurrency. For Bitcoin, it's 0.001 BTC. For Ethereum, it's 0.01 ETH. Check our fees page for complete details on all supported assets."
      },
      {
        question: "How long do withdrawals take?",
        answer: "Withdrawal times depend on blockchain network congestion. Typically, withdrawals are processed within 30 minutes to 2 hours. We process withdrawals in batches for security reasons."
      }
    ],
    technical: [
      {
        question: "What should I do if I can't log in to my account?",
        answer: "First, ensure you're using the correct email and password. If you've forgotten your password, use the 'Forgot Password' feature. If 2FA is enabled, make sure your authenticator app is synchronized."
      },
      {
        question: "How do I enable Two-Factor Authentication (2FA)?",
        answer: "Go to Security Settings in your account, select 'Enable 2FA', and follow the setup instructions using Google Authenticator or Authy. We strongly recommend enabling 2FA for enhanced security."
      },
      {
        question: "What browsers are supported?",
        answer: "We support Chrome 80+, Firefox 75+, Safari 13+, and Edge 80+. Ensure you're using the latest version for optimal security and performance."
      }
    ],
    transactions: [
      {
        question: "Why is my deposit taking so long to confirm?",
        answer: "Deposit confirmation times depend on blockchain network congestion. You can check the transaction status on the relevant blockchain explorer using your transaction ID."
      },
      {
        question: "What are the trading fees?",
        answer: "We charge 0.1% for both makers and takers. Fees decrease with higher trading volumes. Check our comprehensive fee schedule in the trading section."
      },
      {
        question: "How do I report a suspicious transaction?",
        answer: "Immediately contact our security team at security@nexus-exchange.com with transaction details. Include your account email and any relevant transaction IDs or screenshots."
      }
    ]
  };

  const filteredFAQs = faqCategories[activeCategory as keyof typeof faqCategories].filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <style>{`
        :root {
          --primary: #F3BA2F;
          --secondary: #00C076;
          --accent: #FF6838;
          --dark: #000000;
          --dark-gray: #1A1A1A;
          --medium-gray: #2A2A2A;
          --light-gray: #AAAAAA;
          --white: #FFFFFF;
          --gradient: linear-gradient(135deg, #F3BA2F 0%, #FF6838 50%, #00C076 100%);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
        }

        body {
          background-color: var(--dark);
          color: var(--white);
          line-height: 1.6;
          overflow-x: hidden;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Hero Section */
        .help-hero {
          padding: 180px 0 100px;
          background: linear-gradient(135deg, rgba(243, 186, 47, 0.1) 0%, rgba(0, 192, 118, 0.05) 100%);
          text-align: center;
        }

        .help-hero-title {
          font-size: 3.5rem;
          font-weight: 900;
          margin-bottom: 20px;
          line-height: 1.2;
        }

        .help-hero-title span {
          background: var(--gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .help-hero-subtitle {
          font-size: 1.2rem;
          color: var(--light-gray);
          margin-bottom: 40px;
        }

        /* Search Section */
        .search-section {
          background-color: var(--dark-gray);
          padding: 60px 0;
        }

        .search-container {
          max-width: 600px;
          margin: 0 auto;
        }

        .search-box {
          position: relative;
          margin-bottom: 30px;
        }

        .search-input {
          width: 100%;
          padding: 15px 50px 15px 20px;
          background-color: var(--medium-gray);
          border: 2px solid var(--light-gray);
          border-radius: 12px;
          color: var(--white);
          font-size: 16px;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(243, 186, 47, 0.1);
        }

        .search-icon {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--light-gray);
          font-size: 18px;
        }

        /* Categories */
        .categories {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .category-btn {
          padding: 12px 24px;
          background-color: var(--medium-gray);
          border: 2px solid transparent;
          border-radius: 8px;
          color: var(--white);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .category-btn.active {
          background-color: var(--primary);
          color: var(--dark);
          border-color: var(--primary);
        }

        .category-btn:hover:not(.active) {
          border-color: var(--primary);
          color: var(--primary);
        }

        /* FAQ Section */
        .faq-section {
          padding: 80px 0;
          background-color: var(--dark);
        }

        .faq-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .faq-item {
          background-color: var(--dark-gray);
          border-radius: 12px;
          margin-bottom: 15px;
          overflow: hidden;
          border: 1px solid var(--medium-gray);
        }

        .faq-question {
          padding: 20px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background-color 0.3s ease;
        }

        .faq-question:hover {
          background-color: var(--medium-gray);
        }

        .faq-answer {
          padding: 0 20px;
          max-height: 0;
          overflow: hidden;
          transition: all 0.3s ease;
          color: var(--light-gray);
        }

        .faq-answer.active {
          padding: 0 20px 20px;
          max-height: 500px;
        }

        .faq-icon {
          transition: transform 0.3s ease;
        }

        .faq-item.active .faq-icon {
          transform: rotate(180deg);
        }

        /* Contact Section */
        .contact-section {
          padding: 80px 0;
          background-color: var(--dark-gray);
        }

        .section-title {
          font-size: 2.5rem;
          margin-bottom: 40px;
          text-align: center;
          color: var(--white);
        }

        .section-title span {
          color: var(--primary);
        }

        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 40px;
          margin-bottom: 60px;
        }

        .contact-card {
          background-color: var(--medium-gray);
          border-radius: 12px;
          padding: 30px;
          text-align: center;
        }

        .contact-icon {
          font-size: 48px;
          color: var(--primary);
          margin-bottom: 20px;
        }

        .contact-title {
          font-size: 1.5rem;
          margin-bottom: 15px;
          color: var(--white);
        }

        .contact-email {
          color: var(--light-gray);
          font-size: 1.1rem;
          word-break: break-all;
        }

        /* Team Section */
        .team-section {
          padding: 80px 0;
          background-color: var(--dark);
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 40px;
          margin-bottom: 60px;
        }

        .team-card {
          background: linear-gradient(135deg, var(--medium-gray) 0%, var(--dark-gray) 100%);
          border-radius: 16px;
          padding: 40px;
          text-align: center;
          border: 1px solid rgba(243, 186, 47, 0.1);
        }

        .team-picture {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          margin: 0 auto 20px;
          background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          color: var(--dark);
          font-weight: bold;
        }

        .team-name {
          font-size: 1.5rem;
          margin-bottom: 5px;
          color: var(--white);
        }

        .team-title {
          color: var(--primary);
          font-weight: 600;
          margin-bottom: 15px;
        }

        .team-email {
          color: var(--light-gray);
          margin-bottom: 20px;
          word-break: break-all;
        }

        .team-description {
          color: var(--light-gray);
          margin-bottom: 20px;
          line-height: 1.6;
        }

        .expertise-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
        }

        .expertise-tag {
          background-color: rgba(243, 186, 47, 0.1);
          color: var(--primary);
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        /* Address Section */
        .address-section {
          padding: 80px 0;
          background-color: var(--dark-gray);
        }

        .address-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .address-card {
          background-color: var(--medium-gray);
          border-radius: 12px;
          padding: 30px;
          border-left: 4px solid var(--primary);
        }

        .address-name {
          font-size: 1.3rem;
          margin-bottom: 15px;
          color: var(--white);
        }

        .address-details {
          color: var(--light-gray);
          line-height: 1.6;
        }

        .address-phone {
          color: var(--primary);
          margin-top: 10px;
          font-weight: 600;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .help-hero-title {
            font-size: 2.5rem;
          }

          .section-title {
            font-size: 2rem;
          }

          .categories {
            gap: 10px;
          }

          .category-btn {
            padding: 10px 16px;
            font-size: 14px;
          }

          .team-grid {
            grid-template-columns: 1fr;
          }

          .contact-grid {
            grid-template-columns: 1fr;
          }

          .address-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .help-hero-title {
            font-size: 2rem;
          }

          .section-title {
            font-size: 1.8rem;
          }

          .team-card {
            padding: 25px;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="help-hero">
        <div className="container">
          <h1 className="help-hero-title">Nexus <span>Help Center</span></h1>
          <p className="help-hero-subtitle">
            Get the support you need. Find answers, contact our team, or explore our resources.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="search-section">
        <div className="container">
          <div className="search-container">
            <div className="search-box">
              <input
                type="text"
                className="search-input"
                placeholder="Search for help articles, FAQs, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <i className="fas fa-search search-icon"></i>
            </div>
            
            <div className="categories">
              {Object.keys(faqCategories).map((category) => (
                <button
                  key={category}
                  className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="faq-container">
            <h2 className="section-title">
              Frequently Asked <span>Questions</span>
            </h2>
            
            <div className="faq-list">
              {filteredFAQs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Emails Section */}
      <section className="contact-section">
        <div className="container">
          <h2 className="section-title">
            Contact <span>Emails</span>
          </h2>
          
          <div className="contact-grid">
            {Object.entries(contactInfo).map(([department, email]) => (
              <div key={department} className="contact-card">
                <i className="fas fa-envelope contact-icon"></i>
                <h3 className="contact-title">
                  {department.charAt(0).toUpperCase() + department.slice(1)} Support
                </h3>
                <p className="contact-email">{email}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2 className="section-title">
            Our <span>Team Heads</span>
          </h2>
          
          <div className="team-grid">
            {/* Technical Team Head */}
            <div className="team-card">
              <div className="team-picture">
                {teamMembers.technical.picture ? (
                  <img 
                    src={teamMembers.technical.picture} 
                    alt={teamMembers.technical.name}
                    style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                  />
                ) : (
                  SC
                )}
              </div>
              <h3 className="team-name">{teamMembers.technical.name}</h3>
              <p className="team-title">{teamMembers.technical.title}</p>
              <p className="team-email">{teamMembers.technical.email}</p>
              <p className="team-description">{teamMembers.technical.description}</p>
              <div className="expertise-tags">
                {teamMembers.technical.expertise.map((skill, index) => (
                  <span key={index} className="expertise-tag">{skill}</span>
                ))}
              </div>
            </div>

            {/* Transactions Team Head */}
            <div className="team-card">
              <div className="team-picture">
                {teamMembers.transactions.picture ? (
                  <img 
                    src={teamMembers.transactions.picture} 
                    alt={teamMembers.transactions.name}
                    style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                  />
                ) : (
                  MR
                )}
              </div>
              <h3 className="team-name">{teamMembers.transactions.name}</h3>
              <p className="team-title">{teamMembers.transactions.title}</p>
              <p className="team-email">{teamMembers.transactions.email}</p>
              <p className="team-description">{teamMembers.transactions.description}</p>
              <div className="expertise-tags">
                {teamMembers.transactions.expertise.map((skill, index) => (
                  <span key={index} className="expertise-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Address Section */}
      <section className="address-section">
        <div className="container">
          <h2 className="section-title">
            Our <span>Locations</span>
          </h2>
          
          <div className="address-grid">
            {Object.entries(addresses).map(([key, location]) => (
              <div key={key} className="address-card">
                <h3 className="address-name">{location.name}</h3>
                <div className="address-details">
                  <p>{location.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

// FAQ Item Component
const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={`faq-item ${isActive ? 'active' : ''}`}>
      <div className="faq-question" onClick={() => setIsActive(!isActive)}>
        {question}
        <i className={`fas fa-chevron-down faq-icon ${isActive ? 'active' : ''}`}></i>
      </div>
      <div className={`faq-answer ${isActive ? 'active' : ''}`}>
        {answer}
      </div>
    </div>
  );
};

export default HelpCenter;