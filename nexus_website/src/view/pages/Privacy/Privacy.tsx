import React, { useEffect, useState } from 'react';

const Privacy: React.FC = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.getBoundingClientRect().top + window.pageYOffset - 100,
        behavior: 'smooth'
      });
    }
  };

  const privacyPrinciples = [
    {
      icon: "fas fa-eye",
      title: "Transparency at All Times",
      description: "Our transparency commitment means that we keep you informed about how your data is used and shared. We update this portal and our privacy notices regularly, ensuring you stay informed about any changes that may affect you."
    },
    {
      icon: "fas fa-balance-scale",
      title: "Accountability and Compliance",
      description: "We take our privacy responsibilities seriously. Our practices are in full compliance with applicable data protection laws and regulations around the globe. We conduct regular audits and continuously improve our processes."
    },
    {
      icon: "fas fa-lock",
      title: "Data Security",
      description: "We prioritize your privacy and security, implementing robust measures to protect your data from loss, misuse, or unauthorized access, while strictly controlling access internally."
    },
    {
      icon: "fas fa-filter",
      title: "Data Minimization",
      description: "We have implemented strong governance controls on data minimization, which ensure that all products and services only collect user data with specified purposes."
    },
    {
      icon: "fas fa-user-shield",
      title: "User Rights & Access",
      description: "We recognize and uphold your fundamental rights concerning your personal data. We provide easy-to-use tools and mechanisms to help you exercise your rights."
    },
    {
      icon: "fas fa-cogs",
      title: "Privacy by Design",
      description: "We have strong processes in place to ensure that privacy and data protection are built into all our products and services from the ground up."
    }
  ];

  const dataUsageItems = [
    "Managing the user's account and providing our services",
    "Complying with legal and regulatory requirements (like Anti-Money-Laundering laws)",
    "Communicating with users about service-related matters",
    "Ensuring the safety, security, and integrity of our platform",
    "Providing customer support and improving our services",
    "Sending marketing communications (with your consent)",
    "Preventing fraud and facilitating transactions"
  ];

  const retentionItems = [
    "Meeting legal requirements related to taxation and accounting",
    "Compliance with Anti-Money Laundering regulations",
    "Handling disputes and legal claims",
    "Providing continuous service and support",
    "Other legitimate business purposes as communicated to you"
  ];

  const sharingItems = [
    "Service providers who assist in our operations",
    "Financial institutions and payment processors",
    "Regulatory and law enforcement authorities when required by law",
    "Professional advisors (lawyers, accountants, auditors)",
    "Other Nexus group companies for business operations"
  ];

  const cookieTypes = [
    { name: "Essential Cookies", description: "Required for the basic functions of our platform" },
    { name: "Performance Cookies", description: "Help us understand how users interact with our services" },
    { name: "Functionality Cookies", description: "Remember your preferences and settings" },
    { name: "Targeting Cookies", description: "Used to deliver relevant advertisements" }
  ];

  const privacyRights = [
    { icon: "fas fa-eye", title: "Right to Access", description: "You can request copies of your personal information that we hold." },
    { icon: "fas fa-edit", title: "Right to Rectification", description: "You can request correction of inaccurate or incomplete information." },
    { icon: "fas fa-trash-alt", title: "Right to Erasure", description: "You can request deletion of your personal data under certain circumstances." },
    { icon: "fas fa-pause-circle", title: "Right to Restrict Processing", description: "You can request limitation of how we use your personal data." },
    { icon: "fas fa-file-export", title: "Right to Data Portability", description: "You can request transfer of your data to another organization." },
    { icon: "fas fa-ban", title: "Right to Object", description: "You can object to certain types of processing of your personal data." }
  ];

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
        
        /* Header & Navigation */
        header {
          background-color: rgba(0, 0, 0, 0.9);
          padding: 20px 0;
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 1000;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          transition: background-color 0.3s, padding 0.3s;
        }
        
        header.scrolled {
          background-color: rgba(0, 0, 0, 0.95);
          padding: 15px 0;
        }
        
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 24px;
          font-weight: 900;
          color: var(--primary);
        }
        
        .logo-icon {
          font-size: 28px;
        }
        
        .nav-menu {
          display: flex;
          list-style: none;
          gap: 30px;
        }
        
        .nav-link {
          color: var(--white);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s;
          position: relative;
          cursor: pointer;
        }
        
        .nav-link:hover {
          color: var(--primary);
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -5px;
          left: 0;
          background-color: var(--primary);
          transition: width 0.3s;
        }
        
        .nav-link:hover::after {
          width: 100%;
        }
        
        .search-bar {
          display: flex;
          align-items: center;
          background-color: var(--dark-gray);
          border-radius: 30px;
          padding: 8px 15px;
          width: 250px;
        }
        
        .search-bar input {
          background: transparent;
          border: none;
          color: var(--white);
          width: 100%;
          padding: 5px 10px;
          outline: none;
        }
        
        .search-icon {
          color: var(--light-gray);
        }
        
        .mobile-toggle {
          display: none;
          font-size: 24px;
          cursor: pointer;
        }
        
        /* Hero Section */
        .privacy-hero {
          padding: 180px 0 100px;
          background: linear-gradient(135deg, rgba(243, 186, 47, 0.1) 0%, rgba(0, 192, 118, 0.05) 100%);
          position: relative;
          overflow: hidden;
          text-align: center;
        }
        
        .privacy-hero-content {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .privacy-hero-title {
          font-size: 3.5rem;
          font-weight: 900;
          margin-bottom: 20px;
          line-height: 1.2;
        }
        
        .privacy-hero-title span {
          background: var(--gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .privacy-hero-subtitle {
          font-size: 1.2rem;
          color: var(--light-gray);
          margin-bottom: 30px;
        }
        
        .last-updated {
          background-color: var(--medium-gray);
          padding: 10px 20px;
          border-radius: 8px;
          display: inline-block;
          margin-bottom: 30px;
          font-weight: 600;
        }
        
        /* Privacy Content */
        .privacy-content {
          padding: 80px 0;
          background-color: var(--dark-gray);
        }
        
        .privacy-container {
          max-width: 1000px;
          margin: 0 auto;
        }
        
        .privacy-section {
          margin-bottom: 50px;
        }
        
        .section-title {
          font-size: 2rem;
          margin-bottom: 20px;
          color: var(--white);
          border-bottom: 2px solid var(--primary);
          padding-bottom: 10px;
        }
        
        .section-title span {
          color: var(--primary);
        }
        
        .subsection {
          margin-bottom: 30px;
        }
        
        .subsection-title {
          font-size: 1.4rem;
          margin-bottom: 15px;
          color: var(--primary);
        }
        
        .privacy-text {
          color: var(--light-gray);
          margin-bottom: 15px;
        }
        
        .commitment-box {
          background-color: rgba(0, 192, 118, 0.1);
          border-left: 4px solid var(--secondary);
          padding: 20px;
          margin: 20px 0;
          border-radius: 0 8px 8px 0;
        }
        
        .commitment-title {
          font-weight: 700;
          color: var(--secondary);
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .principles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          margin-top: 30px;
        }
        
        .principle-card {
          background-color: var(--medium-gray);
          border-radius: 12px;
          padding: 25px;
          transition: transform 0.3s;
        }
        
        .principle-card:hover {
          transform: translateY(-5px);
        }
        
        .principle-icon {
          font-size: 40px;
          color: var(--primary);
          margin-bottom: 15px;
        }
        
        .principle-title {
          font-size: 1.3rem;
          margin-bottom: 15px;
          color: var(--white);
        }
        
        .privacy-list {
          margin-left: 20px;
          margin-bottom: 15px;
        }
        
        .privacy-list li {
          margin-bottom: 10px;
          color: var(--light-gray);
        }
        
        .definition-list {
          margin: 20px 0;
        }
        
        .definition-item {
          margin-bottom: 10px;
        }
        
        .definition-term {
          font-weight: 700;
          color: var(--primary);
        }
        
        .definition-desc {
          color: var(--light-gray);
          margin-left: 10px;
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
        
        /* Table of Contents */
        .toc {
          background-color: var(--medium-gray);
          border-radius: 12px;
          padding: 30px;
          margin-bottom: 40px;
        }
        
        .toc-title {
          font-size: 1.5rem;
          margin-bottom: 20px;
          color: var(--primary);
        }
        
        .toc-list {
          list-style: none;
        }
        
        .toc-list li {
          margin-bottom: 10px;
        }
        
        .toc-list a {
          color: var(--light-gray);
          text-decoration: none;
          transition: color 0.3s;
          cursor: pointer;
        }
        
        .toc-list a:hover {
          color: var(--primary);
        }
        
        /* Data Usage Section */
        .data-usage-section {
          background-color: var(--medium-gray);
          border-radius: 12px;
          padding: 30px;
          margin: 30px 0;
        }
        
        .data-usage-title {
          font-size: 1.5rem;
          margin-bottom: 20px;
          color: var(--primary);
        }
        
        /* Responsive Design */
        @media (max-width: 992px) {
          .privacy-hero-title {
            font-size: 2.8rem;
          }
          
          .section-title {
            font-size: 1.8rem;
          }
          
          .principles-grid {
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
          
          .privacy-hero-title {
            font-size: 2.2rem;
          }
          
          .section-title {
            font-size: 1.6rem;
          }
        }
        
        @media (max-width: 576px) {
          .privacy-hero-title {
            font-size: 1.8rem;
          }
          
          .section-title {
            font-size: 1.4rem;
          }
        }
      `}</style>

      {/* Header & Navigation */}


      {/* Hero Section */}
      <section className="privacy-hero">
        <div className="container">
          <div className="privacy-hero-content">
            <h1 className="privacy-hero-title">Nexus <span>Privacy Portal</span></h1>
            <div className="last-updated">
              <i className="fas fa-calendar-alt"></i> Last Updated: 6 May 2025
            </div>
            <p className="privacy-hero-subtitle">Our commitment to protecting your data and ensuring your privacy rights are respected.</p>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="privacy-content">
        <div className="container">
          <div className="privacy-container">
            {/* Table of Contents */}
            <div className="toc">
              <h3 className="toc-title">Privacy Portal Navigation</h3>
              <ul className="toc-list">
                <li><a onClick={(e) => handleSmoothScroll(e, '#commitment')}>Our Commitment</a></li>
                <li><a onClick={(e) => handleSmoothScroll(e, '#principles')}>Privacy Principles</a></li>
                <li><a onClick={(e) => handleSmoothScroll(e, '#data-usage')}>How We Use Your Data</a></li>
                <li><a onClick={(e) => handleSmoothScroll(e, '#data-retention')}>Data Retention</a></li>
                <li><a onClick={(e) => handleSmoothScroll(e, '#data-sharing')}>Data Sharing</a></li>
                <li><a onClick={(e) => handleSmoothScroll(e, '#cookies')}>Cookies & Tracking</a></li>
                <li><a onClick={(e) => handleSmoothScroll(e, '#rights')}>Your Privacy Rights</a></li>
              </ul>
            </div>

            {/* Commitment Section */}
            <div className="privacy-section" id="commitment">
              <h2 className="section-title">Our <span>Commitment</span></h2>
              
              <div className="commitment-box">
                <div className="commitment-title">
                  <i className="fas fa-shield-alt"></i>
                  Our commitment to protecting your data
                </div>
                <p className="privacy-text">Welcome to our Privacy Portal. We created this page to help you navigate through key aspects of our Privacy Program and learn more about your privacy rights.</p>
                <p className="privacy-text">At Nexus, we are dedicated to safeguarding your privacy and protecting your data. The security of your personal information is paramount to us and we follow strict internal guidelines, legal requirements and industry best practices to ensure that your data is secure and used only for authorized purposes.</p>
              </div>
            </div>

            {/* Privacy Principles */}
            <div className="privacy-section" id="principles">
              <h2 className="section-title">Nexus <span>Privacy Principles</span></h2>
              
              <div className="principles-grid">
                {privacyPrinciples.map((principle, index) => (
                  <div key={index} className="principle-card">
                    <div className="principle-icon">
                      <i className={principle.icon}></i>
                    </div>
                    <h3 className="principle-title">{principle.title}</h3>
                    <p className="privacy-text">{principle.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* How Nexus Uses Your Data */}
            <div className="privacy-section" id="data-usage">
              <h2 className="section-title">How Nexus <span>Uses Your Data</span></h2>
              
              <div className="data-usage-section">
                <h3 className="data-usage-title">What is personal data?</h3>
                
                <div className="subsection">
                  <h4 className="subsection-title">Definition of personal data</h4>
                  <p className="privacy-text">Personal data is the data that identifies an individual or relates to an identifiable individual. This includes information you provide to us, information which is collected about you automatically, and information we obtain from third parties, such as name, Nexus ID number, location data, email address, or any details that, when combined, could identify someone.</p>
                </div>
                
                <div className="subsection">
                  <h4 className="subsection-title">How does Nexus use my data?</h4>
                  <p className="privacy-text">We collect and process your personal data to provide secure and efficient services. This includes:</p>
                  <ul className="privacy-list">
                    {dataUsageItems.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Data Retention */}
            <div className="privacy-section" id="data-retention">
              <h2 className="section-title">Retention of <span>Your Data</span></h2>
              
              <div className="subsection">
                <h3 className="subsection-title">For how long does Nexus retain my data?</h3>
                <p className="privacy-text">We hold your personal data to ensure you can keep using Nexus services. This is necessary for the reasons outlined in our Privacy Notice, including:</p>
                <ul className="privacy-list">
                  {retentionItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <p className="privacy-text">We only retain your personal data for as long as necessary to fulfill the purposes for which we collected it, including for the purposes of satisfying any legal, accounting, or reporting requirements.</p>
              </div>
            </div>

            {/* Data Sharing */}
            <div className="privacy-section" id="data-sharing">
              <h2 className="section-title">Data Sharing with <span>Third Parties</span></h2>
              
              <div className="subsection">
                <h3 className="subsection-title">Is my data shared with third parties?</h3>
                <p className="privacy-text">In line with the applicable regulations and requirements, we may share your personal data with third parties, including other Nexus entities, as per our contractual obligations, legal requirements, or business processes. While doing so, we ensure protection of personal data under our Privacy Notice or equivalent safeguards.</p>
                
                <p className="privacy-text">We may share your information with:</p>
                <ul className="privacy-list">
                  {sharingItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                
                <p className="privacy-text">We require all third parties to respect the security of your personal data and to treat it in accordance with the law. We do not allow our third-party service providers to use your personal data for their own purposes and only permit them to process your personal data for specified purposes and in accordance with our instructions.</p>
              </div>
            </div>

            {/* Cookies */}
            <div className="privacy-section" id="cookies">
              <h2 className="section-title">Cookies and <span>Tracking Technologies</span></h2>
              
              <div className="subsection">
                <h3 className="subsection-title">How do we use cookies?</h3>
                <p className="privacy-text">We use cookies and similar tools to enhance your user experience, streamline the provision of our services, enhance our marketing efforts and understand how customers use our services so we can improve user experience.</p>
                
                <p className="privacy-text">Depending on applicable laws in your region, the cookie banner on your browser will tell you how to accept or refuse cookies. A copy of our cookie policy is available below.</p>
                
                <p className="privacy-text">We use different types of cookies:</p>
                <ul className="privacy-list">
                  {cookieTypes.map((cookie, index) => (
                    <li key={index}><strong>{cookie.name}:</strong> {cookie.description}</li>
                  ))}
                </ul>
                
                <p className="privacy-text">You can control cookies through your browser settings and other tools. However, if you choose to disable certain cookies, it may affect your experience and the functionality of our services.</p>
              </div>
            </div>

            {/* Your Rights */}
            <div className="privacy-section" id="rights">
              <h2 className="section-title">Your <span>Privacy Rights</span></h2>
              
              <div className="subsection">
                <h3 className="subsection-title">Exercising Your Privacy Rights</h3>
                <p className="privacy-text">We recognize and uphold your fundamental rights concerning your personal data. To help you exercise them, we provide easy-to-use tools and mechanisms in the Nexus app and through a dedicated webform where you can request our support.</p>
                
                <p className="privacy-text">Depending on your jurisdiction, you may have the following rights:</p>
                
                <div className="principles-grid">
                  {privacyRights.map((right, index) => (
                    <div key={index} className="principle-card">
                      <div className="principle-icon">
                        <i className={right.icon}></i>
                      </div>
                      <h3 className="principle-title">{right.title}</h3>
                      <p className="privacy-text">{right.description}</p>
                    </div>
                  ))}
                </div>
                
                <p className="privacy-text">To exercise any of these rights, please contact us through our dedicated privacy portal or by using the contact information provided in our full Privacy Notice.</p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="commitment-box">
              <div className="commitment-title">
                <i className="fas fa-question-circle"></i>
                Questions About Our Privacy Practices?
              </div>
              <p className="privacy-text">If you have any questions about this Privacy Portal or our privacy practices, please contact our Data Protection Officer at:</p>
              <p className="privacy-text" style={{ marginTop: '15px' }}>
                <strong>Email:</strong> support@nexus-exchange.com<br />
              </p>
              <p className="privacy-text" style={{ marginTop: '15px' }}>We are committed to working with you to obtain a fair resolution of any complaint or concern about privacy.</p>
            </div>
          </div>
        </div>
      </section>

 
    </>
  );
};

export default Privacy;