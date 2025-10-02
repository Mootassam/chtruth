import React from 'react'


function Privacy() {

    const handleBackClick = () => {
        window.history.back();
    };
    return (
        <>
            <div className="container">
                {/* Header Section */}
                <div className="header">
                    <div className="header-content">
                        <div className="back-button" onClick={handleBackClick}>
                            <i className="fas fa-arrow-left" />
                        </div>
                        <div className="page-title">Privacy Portal</div>
                        <div className="placeholder" />
                    </div>
                </div>
                {/* Hero Section */}
                <div className="hero-section">
                    <div className="hero-title">Nexus Privacy Portal</div>
                    <div className="hero-subtitle">
                        Protecting your data and privacy with strict guidelines, legal
                        compliance, and industry best practices.
                    </div>
                </div>
                {/* Principles Section */}
                <div className="principles-section">
                    <div className="section-title">Our Privacy Principles</div>
                    <div className="principle-category">
                        <div className="category-title">
                            <i className="fas fa-shield-alt category-icon" />
                            Core Principles
                        </div>
                        <div className="principle-item">
                            <i className="fas fa-eye principle-icon" />
                            <div className="principle-content">
                                <div className="principle-title">Transparency</div>
                                <div className="principle-description">
                                    Regular updates and clear information about how we handle your
                                    data.
                                </div>
                            </div>
                        </div>
                        <div className="principle-item">
                            <i className="fas fa-balance-scale principle-icon" />
                            <div className="principle-content">
                                <div className="principle-title">
                                    Accountability &amp; Compliance
                                </div>
                                <div className="principle-description">
                                    Regular audits, certifications, and adherence to global privacy
                                    laws.
                                </div>
                            </div>
                        </div>
                        <div className="principle-item">
                            <i className="fas fa-lock principle-icon" />
                            <div className="principle-content">
                                <div className="principle-title">Data Security</div>
                                <div className="principle-description">
                                    Advanced encryption, strict access controls, and identity
                                    verification protocols.
                                </div>
                            </div>
                        </div>
                        <div className="principle-item">
                            <i className="fas fa-filter principle-icon" />
                            <div className="principle-content">
                                <div className="principle-title">
                                    Data Minimization &amp; Purpose Limitation
                                </div>
                                <div className="principle-description">
                                    We collect only what's necessary for specific, legitimate
                                    purposes.
                                </div>
                            </div>
                        </div>
                        <div className="principle-item">
                            <i className="fas fa-cogs principle-icon" />
                            <div className="principle-content">
                                <div className="principle-title">Privacy by Design</div>
                                <div className="principle-description">
                                    Privacy is built into all our products and services from the
                                    ground up.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* User Rights Section */}
                <div className="rights-section">
                    <div className="rights-title">
                        <i className="fas fa-user-check" />
                        Your Privacy Rights
                    </div>
                    <div className="rights-content">
                        You have tools to access and manage your data via our app or webform,
                        with detailed information available in our Privacy Notice.
                    </div>
                    <div className="rights-note">
                        Exercise your rights to access, correct, or delete your personal
                        information at any time.
                    </div>
                </div>
                {/* Personal Data Definition */}
                <div className="data-definition">
                    <div className="definition-title">
                        <i className="fas fa-database" />
                        What Is Personal Data?
                    </div>
                    <div className="definition-content">
                        Personal data refers to any information that identifies an individual.
                    </div>
                    <div className="definition-examples">
                        Examples include: name, Nexus ID, email address, location data,
                        transaction history, and device information.
                    </div>
                </div>
                {/* Data Usage Section */}
                <div className="data-usage">
                    <div className="section-title">How We Use Your Data</div>
                    <div className="usage-item">
                        <i className="fas fa-user-cog usage-icon" />
                        <div className="usage-content">
                            <div className="usage-title">Account Management</div>
                            <div className="usage-description">
                                To create and maintain your account, provide services, and
                                communicate with you.
                            </div>
                        </div>
                    </div>
                    <div className="usage-item">
                        <i className="fas fa-gavel usage-icon" />
                        <div className="usage-content">
                            <div className="usage-title">Legal Compliance</div>
                            <div className="usage-description">
                                To fulfill our obligations under applicable laws including
                                Anti-Money Laundering (AML) regulations.
                            </div>
                        </div>
                    </div>
                    <div className="usage-item">
                        <i className="fas fa-shield-alt usage-icon" />
                        <div className="usage-content">
                            <div className="usage-title">Security &amp; Fraud Prevention</div>
                            <div className="usage-description">
                                To protect your account, detect and prevent fraud, and ensure
                                platform security.
                            </div>
                        </div>
                    </div>
                    <div className="usage-item">
                        <i className="fas fa-headset usage-icon" />
                        <div className="usage-content">
                            <div className="usage-title">Customer Support</div>
                            <div className="usage-description">
                                To respond to your inquiries and provide technical assistance when
                                needed.
                            </div>
                        </div>
                    </div>
                    <div className="usage-item">
                        <i className="fas fa-bullhorn usage-icon" />
                        <div className="usage-content">
                            <div className="usage-title">Marketing &amp; Communications</div>
                            <div className="usage-description">
                                To send you relevant updates, product information, and promotional
                                materials (with your consent).
                            </div>
                        </div>
                    </div>
                    <div className="usage-item">
                        <i className="fas fa-exchange-alt usage-icon" />
                        <div className="usage-content">
                            <div className="usage-title">Transaction Processing</div>
                            <div className="usage-description">
                                To facilitate cryptocurrency transactions and maintain transaction
                                records.
                            </div>
                        </div>
                    </div>
                </div>
                {/* Data Retention Section */}
                <div className="retention-section">
                    <div className="retention-title">
                        <i className="fas fa-history" />
                        Data Retention
                    </div>
                    <div className="retention-content">
                        We retain your data for as long as necessary to provide our services,
                        comply with legal obligations (such as tax and AML requirements),
                        resolve disputes, and enforce our agreements.
                    </div>
                </div>
                {/* Data Sharing Section */}
                <div className="sharing-section">
                    <div className="sharing-title">
                        <i className="fas fa-share-alt" />
                        Data Sharing
                    </div>
                    <div className="sharing-content">
                        We may share your data with other Nexus entities or trusted third
                        parties under strict contractual safeguards, only when necessary for the
                        purposes outlined in our Privacy Notice.
                    </div>
                </div>
                {/* Cookies Section */}
                <div className="cookies-section">
                    <div className="cookies-title">
                        <i className="fas fa-cookie-bite" />
                        Cookies &amp; Tracking
                    </div>
                    <div className="cookies-content">
                        We use cookies and similar technologies to enhance your user experience,
                        provide personalized marketing, and analyze how our services are used.
                    </div>
                    <a href="#" className="cookies-link">
                        View our complete Cookie Policy
                    </a>
                </div>
                {/* Action Cards */}
                <div className="action-cards">
                    <div className="action-card">
                        <i className="fas fa-file-contract action-icon" />
                        <div className="action-title">Privacy Notice</div>
                        <div className="action-description">Read our full privacy policy</div>
                    </div>
                    <div className="action-card">
                        <i className="fas fa-user-edit action-icon" />
                        <div className="action-title">Manage Data</div>
                        <div className="action-description">
                            Access and control your information
                        </div>
                    </div>
                    <div className="action-card">
                        <i className="fas fa-cookie action-icon" />
                        <div className="action-title">Cookie Settings</div>
                        <div className="action-description">
                            Adjust your tracking preferences
                        </div>
                    </div>
                    <div className="action-card">
                        <i className="fas fa-question-circle action-icon" />
                        <div className="action-title">Help Center</div>
                        <div className="action-description">
                            Get answers to privacy questions
                        </div>
                    </div>
                </div>
            </div>
            {/* Notification Element */}
            <div className="notification" id="notification">
                Action completed successfully!
            </div>


            <style>{`   .container {
            max-width: 400px;
            margin: 0 auto;
            padding: 20px;
            padding-bottom: 80px;
        }
        
        /* Header Section */
        .header {
            background-color: #000000;
            padding: 0px 0;
            position: sticky;
            top: 0;
            z-index: 100;
            margin-bottom: 20px;
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
        
        /* Principles Section */
        .principles-section {
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
        
        .principle-category {
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
        
        .principle-item {
            background-color: #1A1A1A;
            border-radius: 10px;
            padding: 15px;
            margin-bottom: 12px;
            display: flex;
            align-items: flex-start;
            gap: 12px;
        }
        
        .principle-icon {
            color: #00C076;
            font-size: 16px;
            margin-top: 2px;
            flex-shrink: 0;
        }
        
        .principle-content {
            flex: 1;
        }
        
        .principle-title {
            font-weight: 600;
            margin-bottom: 5px;
            font-size: 15px;
        }
        
        .principle-description {
            font-size: 14px;
            color: #AAAAAA;
            line-height: 1.5;
        }
        
        /* User Rights Section */
        .rights-section {
            background-color: #1A1A1A;
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 20px;
            border-left: 4px solid #00C076;
        }
        
        .rights-title {
            font-size: 18px;
            font-weight: bold;
            color: #00C076;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .rights-content {
            font-size: 14px;
            line-height: 1.5;
            margin-bottom: 15px;
        }
        
        .rights-note {
            font-size: 14px;
            color: #AAAAAA;
            font-style: italic;
        }
        
        /* Data Definition Section */
        .data-definition {
            background-color: #1A1A1A;
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 20px;
        }
        
        .definition-title {
            font-size: 18px;
            font-weight: bold;
            color: #F3BA2F;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .definition-content {
            font-size: 14px;
            line-height: 1.5;
            margin-bottom: 15px;
        }
        
        .definition-examples {
            font-size: 14px;
            color: #AAAAAA;
            font-style: italic;
        }
        
        /* Data Usage Section */
        .data-usage {
            margin-bottom: 20px;
        }
        
        .usage-item {
            background-color: #1A1A1A;
            border-radius: 10px;
            padding: 15px;
            margin-bottom: 12px;
            display: flex;
            align-items: flex-start;
            gap: 12px;
        }
        
        .usage-icon {
            color: #F3BA2F;
            font-size: 16px;
            margin-top: 2px;
            flex-shrink: 0;
        }
        
        .usage-content {
            flex: 1;
        }
        
        .usage-title {
            font-weight: 600;
            margin-bottom: 5px;
            font-size: 15px;
        }
        
        .usage-description {
            font-size: 14px;
            color: #AAAAAA;
            line-height: 1.5;
        }
        
        /* Retention Section */
        .retention-section {
            background-color: #1A1A1A;
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 20px;
            border-left: 4px solid #FF6838;
        }
        
        .retention-title {
            font-size: 18px;
            font-weight: bold;
            color: #FF6838;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .retention-content {
            font-size: 14px;
            line-height: 1.5;
        }
        
        /* Data Sharing Section */
        .sharing-section {
            background-color: #1A1A1A;
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 20px;
        }
        
        .sharing-title {
            font-size: 18px;
            font-weight: bold;
            color: #F3BA2F;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .sharing-content {
            font-size: 14px;
            line-height: 1.5;
        }
        
        /* Cookies Section */
        .cookies-section {
            background-color: #1A1A1A;
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 20px;
            border-left: 4px solid #00C076;
        }
        
        .cookies-title {
            font-size: 18px;
            font-weight: bold;
            color: #00C076;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .cookies-content {
            font-size: 14px;
            line-height: 1.5;
            margin-bottom: 15px;
        }
        
        .cookies-link {
            font-size: 14px;
            color: #00C076;
            text-decoration: none;
            font-weight: 600;
        }
        
        .cookies-link:hover {
            text-decoration: underline;
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
        }`}</style>
        </>

    )
}

export default Privacy