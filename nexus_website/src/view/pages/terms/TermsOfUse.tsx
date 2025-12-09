import React, { useEffect, useState } from 'react';

const TermsOfUse: React.FC = () => {
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

  const tocItems = [
    { id: '#introduction', text: '1. Introduction' },
    { id: '#eligibility', text: '2. Eligibility' },
    { id: '#contact', text: '3. How We Contact Each Other' },
    { id: '#services', text: '4. Nexus Services' },
    { id: '#account', text: '5. Your Nexus Account' },
    { id: '#using-account', text: '6. Using Your Account' },
    { id: '#obligations', text: '7. Your Obligations and Liability' },
    { id: '#disputes', text: '8. Resolving Disputes' },
    { id: '#definitions', text: '9. Definitions' }
  ];

  const eligibilityItems = [
    "be an individual, corporation, legal person, entity or other organization with the full power, authority and capacity to (1) access and use the Nexus Services; and (2) enter into and comply with your obligations under these Terms;",
    "if you are an individual, be at least 18 years old;",
    "if you act as an employee or agent of a legal entity, and enter into these Terms on their behalf, you must be duly authorized to act on behalf of and bind such legal entity for the purposes of entering into these Terms;",
    "not have been previously suspended or removed from using Nexus Services;",
    "not be a Restricted Person;",
    "not currently have an existing Nexus Account; and",
    "not be located, incorporated, otherwise established in, resident of, or (to the extent applicable) a citizen of or operating in a jurisdiction where it would be illegal under Applicable Law for you to access or use the Nexus Services."
  ];

  const additionalDocuments = [
    "Our Privacy Notice, which sets out the terms on which we process any personal data we collect about you, or that you provide to us.",
    "Our Risk Warning, which sets out important information on the risks that can arise when buying, selling, holding or investing in Digital Assets.",
    "The Fee Structure page on our Website.",
    "Product Terms, which set out additional terms and conditions that will apply to your use of specific Nexus Services."
  ];

  const prohibitedUseItems = [
    "breach these Terms or any agreement entered into pursuant to, or in connection with, these Terms;",
    "use Nexus Services in a manner that violates our Prohibited Use Policy;",
    "use Nexus Services for resale or commercial purposes, including transactions on behalf of other persons or entities, unless expressly agreed by us in writing;",
    "use the Nexus Services for anything which, in Nexus sole opinion, is conduct designed to control or artificially affect the price of any Digital Asset;",
    "engage in fraudulent activities, or cause us to suspect that you or any Permitted User have engaged in fraudulent activities and/or Transactions;",
    "provide false, inaccurate or misleading information in connection with your use of the Nexus Services;"
  ];

  const warrantyItems = [
    "all documents and information you provide to us are true, accurate, complete, and up to date in all respects;",
    "all decisions made in connection with these Terms were solely and exclusively based on your own judgement;",
    "you have full power, authority, and capacity to access and use the Nexus Services;",
    "you are not a Restricted Person;",
    "if you are a legal entity, you are duly incorporated, duly organized, and validly existing under the laws of your jurisdiction;"
  ];

  const definitions = [
    { term: "Access IDs", description: "means your Nexus Account details, username, passwords, personal identification numbers, API keys, API secret keys, or any other codes or forms of authentication that you use to access your Nexus Account." },
    { term: "Applicable Law", description: "means all relevant or applicable statutes, laws, principles of equity, rules, regulations, regulatory principles and requirements that are applicable to the provision, receipt or use of the Nexus Services." },
    { term: "Digital Assets", description: "means a digital representation of value or rights which may be transferred and stored electronically, using distributed ledger technology or similar technology." },
    { term: "Nexus Services", description: "means the services offered by us to you through the Platform." },
    { term: "Platform", description: "means the digital platform that we or any of the Nexus Affiliates may make accessible to you via Sites, the Mobile App, a Nexus API or by such other means as Nexus Affiliates may prescribe from time to time for the use of Nexus Services." }
  ];

  return (
    <>
      <style>{`
       
        /* Hero Section */
        .terms-hero {
          padding: 180px 0 100px;
          background: linear-gradient(135deg, rgba(243, 186, 47, 0.1) 0%, rgba(0, 192, 118, 0.05) 100%);
          position: relative;
          overflow: hidden;
          text-align: center;
        }
        
        .terms-hero-content {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .terms-hero-title {
          font-size: 3.5rem;
          font-weight: 900;
          margin-bottom: 20px;
          line-height: 1.2;
        }
        
        .terms-hero-title span {
          background: var(--gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .terms-hero-subtitle {
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
        
        /* Terms Content */
        .terms-content {
          padding: 80px 0;
          background-color: var(--dark-gray);
        }
        
        .terms-container {
          max-width: 1000px;
          margin: 0 auto;
        }
        
        .terms-section {
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
        
        .terms-text {
          color: var(--light-gray);
          margin-bottom: 15px;
        }
        
        .warning-box {
          background-color: rgba(255, 104, 56, 0.1);
          border-left: 4px solid var(--accent);
          padding: 20px;
          margin: 20px 0;
          border-radius: 0 8px 8px 0;
        }
        
        .warning-title {
          font-weight: 700;
          color: var(--accent);
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .info-box {
          background-color: rgba(0, 192, 118, 0.1);
          border-left: 4px solid var(--secondary);
          padding: 20px;
          margin: 20px 0;
          border-radius: 0 8px 8px 0;
        }
        
        .info-title {
          font-weight: 700;
          color: var(--secondary);
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .terms-list {
          margin-left: 20px;
          margin-bottom: 15px;
        }
        
        .terms-list li {
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
        
        /* Responsive Design */
        @media (max-width: 992px) {
          .terms-hero-title {
            font-size: 2.8rem;
          }
          
          .section-title {
            font-size: 1.8rem;
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
          
          .terms-hero-title {
            font-size: 2.2rem;
          }
          
          .section-title {
            font-size: 1.6rem;
          }
        }
        
        @media (max-width: 576px) {
          .terms-hero-title {
            font-size: 1.8rem;
          }
          
          .section-title {
            font-size: 1.4rem;
          }
        }
      `}</style>

    

      {/* Hero Section */}
      <section className="terms-hero">
        <div className="container">
          <div className="terms-hero-content">
            <h1 className="terms-hero-title">TERMS OF <span>USE</span></h1>
            <div className="last-updated">
              <i className="fas fa-calendar-alt"></i> Last Updated: 6 May 2025
            </div>
            <p className="terms-hero-subtitle">These Terms constitute a legally binding agreement between you and Nexus Exchange. Please read them carefully before using our services.</p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="terms-content">
        <div className="container">
          <div className="terms-container">
            {/* Table of Contents */}
            <div className="toc">
              <h3 className="toc-title">Table of Contents</h3>
              <ul className="toc-list">
                {tocItems.map((item, index) => (
                  <li key={index}>
                    <a onClick={(e) => handleSmoothScroll(e, item.id)}>{item.text}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Risk Warning */}
            <div className="warning-box">
              <div className="warning-title">
                <i className="fas fa-exclamation-triangle"></i>
                RISK WARNING
              </div>
              <p className="terms-text">As with any asset, the value of Digital Assets can fluctuate significantly and there is a material risk of economic loss when buying, selling, holding or investing in Digital Assets. You should therefore consider whether trading or holding Digital Assets is suitable for you in light of your financial circumstances.</p>
              <p className="terms-text">Further information on the risks associated with using the Nexus Services is set out in our Risk Warning, which may be updated from time to time. You should read the Risk Warning carefully, however it does not explain all of the risks that may arise, or how such risks relate to your personal circumstances.</p>
              <p className="terms-text">It is important that you fully understand the risks involved before making a decision to use the Nexus Services.</p>
            </div>

            {/* Introduction */}
            <div className="terms-section" id="introduction">
              <h2 className="section-title">1. <span>Introduction</span></h2>
              
              <div className="subsection">
                <h3 className="subsection-title">1.1. About us</h3>
                <p className="terms-text">The Nexus group is an ecosystem centered around an online exchange for Digital Assets trading. The Nexus group provides users with a trading platform to buy and sell Digital Assets, an integrated custody solution allowing users to store their Digital Assets and other Digital Asset-related services.</p>
              </div>
              
              <div className="subsection">
                <h3 className="subsection-title">1.2. These Terms</h3>
                <p className="terms-text">By registering to open a Nexus Account you are entering into a legally binding agreement with us. These Terms will govern your use of the Nexus Services and tell you who we are, how we will provide the Nexus Services to you, how these Terms may be changed or terminated, what to do if there is a problem, along with other important information.</p>
                <p className="terms-text">You must read these Terms, together with the documents referenced in the Terms, carefully and let us know if you do not understand anything.</p>
                <p className="terms-text">Where any Local Terms apply to your use of the Nexus Services, such Local Terms shall govern your use of the Nexus Services.</p>
              </div>
              
              <div className="subsection">
                <h3 className="subsection-title">1.3. Additional documents</h3>
                <p className="terms-text">These Terms refer to a number of additional documents which also apply to your use of the Nexus Services. This includes:</p>
                <ul className="terms-list">
                  {additionalDocuments.map((doc, index) => (
                    <li key={index}>{doc}</li>
                  ))}
                </ul>
                <p className="terms-text">You acknowledge that you will be bound by, and agree that you will comply with, any relevant additional terms and conditions that apply to your use of the Nexus Services.</p>
              </div>
            </div>

            {/* Eligibility */}
            <div className="terms-section" id="eligibility">
              <h2 className="section-title">2. <span>Eligibility</span></h2>
              
              <div className="subsection">
                <h3 className="subsection-title">2.1. Eligibility criteria</h3>
                <p className="terms-text">To be eligible to register for a Nexus Account and use the Nexus Services, you must:</p>
                <ul className="terms-list">
                  {eligibilityItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="subsection">
                <h3 className="subsection-title">2.2. Amending our eligibility criteria</h3>
                <p className="terms-text">We may amend our eligibility criteria at any time in our sole discretion. Where possible, we will give you notice in advance of the change. However, we may occasionally need to make changes without telling you in advance.</p>
              </div>
            </div>

            {/* How We Contact Each Other */}
            <div className="terms-section" id="contact">
              <h2 className="section-title">3. <span>How We Contact Each Other</span></h2>
              
              <div className="subsection">
                <h3 className="subsection-title">3.1. How you can contact us</h3>
                <p className="terms-text">For more information on Nexus, you may refer to the information found on our Website. If you have questions, feedback or complaints you can contact us via our Customer Support team at https://nexus-exchange.com/livechat. These Terms may specify contact details for particular notices. This address is not monitored for those notices.</p>
              </div>
              
              <div className="subsection">
                <h3 className="subsection-title">3.2. How we will contact you</h3>
                <p className="terms-text">We will contact you using the details you provide to us. This may include contacting you by email, SMS or telephone. It is important that you ensure that your contact details are correct and up to date. If your contact details change, you must let us know immediately. If you do not, we will not be responsible if you do not receive information, notices or other important information from us.</p>
              </div>
            </div>

            {/* Nexus Services */}
            <div className="terms-section" id="services">
              <h2 className="section-title">4. <span>Nexus Services</span></h2>
              
              <div className="subsection">
                <h3 className="subsection-title">4.1. Specific product terms</h3>
                <p className="terms-text">Once you have opened a Nexus Account, you will be able to use the Nexus Services in accordance with these Terms and the Product Terms that govern your use of each specific Nexus Service.</p>
              </div>
              
              <div className="subsection">
                <h3 className="subsection-title">4.2. Intra-group services</h3>
                <p className="terms-text">You acknowledge and agree that some of the Nexus Services may be provided by Nexus Affiliates.</p>
              </div>
            </div>

            {/* Important Information Box */}
            <div className="info-box">
              <div className="info-title">
                <i className="fas fa-info-circle"></i>
                IMPORTANT INFORMATION
              </div>
              <p className="terms-text">We are not your broker, intermediary, agent or advisor and we have no fiduciary relationship or obligation to you in connection with any Transactions or other activities you undertake when using the Nexus Services. We do not provide investment or consulting advice of any kind and no communication or information that we provide to you is intended as, or should be construed as, advice of any kind.</p>
              <p className="terms-text">It is your responsibility to determine whether any investment, investment strategy or related transaction is appropriate for you according to your personal investment objectives, financial circumstances and risk tolerance and you are responsible for any associated loss or liability.</p>
            </div>

            {/* Your Nexus Account */}
            <div className="terms-section" id="account">
              <h2 className="section-title">5. <span>Your Nexus Account</span></h2>
              
              <div className="subsection">
                <h3 className="subsection-title">5.1. Account opening</h3>
                <p className="terms-text">You must create and maintain a Nexus Account in order to access the Nexus Services and the Platform. This may be a Nexus Account for an individual user, or a Corporate Nexus Account where the user is a corporation, entity or other organization.</p>
                <p className="terms-text">All Nexus Accounts are provided at our absolute discretion. We reserve the right to refuse any application for a Nexus Account without reason or to limit the number of Nexus Accounts that you may hold.</p>
              </div>
              
              <div className="subsection">
                <h3 className="subsection-title">5.2. Identity verification</h3>
                <p className="terms-text">You will need to comply with our identity verification procedures before you are permitted to open a Nexus Account and access and use the Nexus Services, whether independently or through a third-party service, by providing us with certain information about yourself and, where relevant, all of your Permitted Users. All information that you provide must be complete, accurate and truthful. You must update this information whenever it changes.</p>
              </div>
            </div>

            {/* Using Your Account */}
            <div className="terms-section" id="using-account">
              <h2 className="section-title">6. <span>Using Your Account</span></h2>
              
              <div className="subsection">
                <h3 className="subsection-title">6.1. Giving Instructions</h3>
                <p className="terms-text">You must ensure that any Instruction submitted is complete and accurate. We are not required to verify the accuracy, authenticity or validity of any Instruction and will not monitor or reject Instructions on the basis that they are, or appear to be, duplicates.</p>
                <p className="terms-text">Instructions are irrevocable and therefore once an Instruction has been submitted you, or your Permitted Users, have no right to rescind or withdraw it without our written consent.</p>
              </div>
              
              <div className="subsection">
                <h3 className="subsection-title">6.2. Transactions</h3>
                <p className="terms-text">You may enter into Transactions directly with us, or directly with other users, which may or may not be facilitated by us.</p>
                <p className="terms-text">We do not represent or warrant that any Transaction will be completed successfully or within a specific time period.</p>
              </div>
            </div>

            {/* Your Obligations and Liability */}
            <div className="terms-section" id="obligations">
              <h2 className="section-title">7. <span>Your Obligations and Liability</span></h2>
              
              <div className="subsection">
                <h3 className="subsection-title">7.1. Prohibited use</h3>
                <p className="terms-text">By opening a Nexus Account or carrying out any Transaction, you agree that you and any Permitted User will not:</p>
                <ul className="terms-list">
                  {prohibitedUseItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="subsection">
                <h3 className="subsection-title">7.2. Representations and warranties</h3>
                <p className="terms-text">You hereby represent and warrant to us, at all times, the following:</p>
                <ul className="terms-list">
                  {warrantyItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Resolving Disputes */}
            <div className="terms-section" id="disputes">
              <h2 className="section-title">8. <span>Resolving Disputes</span></h2>
              
              <div className="subsection">
                <h3 className="subsection-title">8.1. Agreement to Arbitrate</h3>
                <p className="terms-text">Aside from where Applicable Law requires or provides you with a choice otherwise, you and Nexus agree that any Claim shall be determined by mandatory final and binding individual (not class) arbitration administered by the Hong Kong International Arbitration Centre ("HKIAC") in accordance with the HKIAC Rules for the time being in force.</p>
                <p className="terms-text">The seat of arbitration shall be Hong Kong. The Tribunal shall consist of one (1) arbitrator to be appointed in accordance with the HKIAC Rules. The language of the arbitration shall be in English.</p>
              </div>
              
              <div className="subsection">
                <h3 className="subsection-title">8.2. Class action waiver</h3>
                <p className="terms-text">You and Nexus agree that any Claims shall be brought against Nexus in an arbitration on an individual basis only and not as a plaintiff or class member in a purported class or representative action. You further agree to waive any right for such Claims to be brought, heard, or arbitrated as a class, collective, representative, or private attorney general action, to the extent permissible by applicable law.</p>
              </div>
            </div>

            {/* Definitions */}
            <div className="terms-section" id="definitions">
              <h2 className="section-title">9. <span>Definitions</span></h2>
              
              <div className="definition-list">
                {definitions.map((def, index) => (
                  <div key={index} className="definition-item">
                    <span className="definition-term">{def.term}</span>
                    <span className="definition-desc">{def.description}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Final Note */}
            <div className="info-box">
              <div className="info-title">
                <i className="fas fa-file-contract"></i>
                AGREEMENT
              </div>
              <p className="terms-text">By registering for a Nexus Account, accessing the Platform and/or using the Nexus Services, you agree that you have read, understood and accepted these Terms, together with any additional documents or terms referred to in these Terms. You acknowledge and agree that you will be bound by and will comply with these Terms, as updated and amended from time to time.</p>
              <p className="terms-text">If you do not understand and accept these Terms in their entirety, you should not register for a Nexus Account or access or use the Platform or any Nexus Service.</p>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default TermsOfUse;