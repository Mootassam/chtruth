import React from 'react'
import { Link } from 'react-router-dom'
function Termeofuse() {

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
                        <div className="page-title">Terms of Use</div>
                        <div className="placeholder" />
                    </div>
                </div>
                {/* Hero Section */}
                <div className="hero-section">
                    <div className="hero-title">Nexus Terms of Use</div>
                    {/* <div class="hero-subtitle">Updated 6 May 2025</div> */}
                </div>
                {/* Agreement Section */}
                <div className="content-section">
                    <div className="content-item">
                        <div className="item-title">
                            <i className="fas fa-handshake item-icon" />
                            Agreement
                        </div>
                        <div className="item-content">
                            This is a binding agreement between you (the user) and Nexus. It
                            covers all Nexus Services you access or use.
                        </div>
                    </div>
                </div>
                {/* Risk Warning Section */}
                <div className="warning-section">
                    <div className="warning-title">
                        <i className="fas fa-exclamation-triangle" />
                        Risk Warning
                    </div>
                    <div className="warning-content">
                        Digital assets are volatile and can fluctuate significantly in value.
                        Nexus is not a broker, financial advisor, or investment advisor. You
                        must conduct your own due diligence before making any financial
                        decisions.
                    </div>
                </div>
                {/* About Nexus Section */}
                <div className="content-section">
                    <div className="section-title">About Our Services</div>
                    <div className="content-item">
                        <div className="item-title">
                            <i className="fas fa-info-circle item-icon" />
                            About Nexus
                        </div>
                        <div className="item-content">
                            Nexus provides digital asset exchange, custody services, and related
                            financial services through our platform.
                        </div>
                    </div>
                    <div className="content-item">
                        <div className="item-title">
                            <i className="fas fa-user-check item-icon" />
                            Eligibility
                        </div>
                        <div className="item-content">
                            You must be at least 18 years old, legally able to enter into
                            contracts, not restricted from using our services, and not located in
                            prohibited jurisdictions.
                        </div>
                    </div>
                    <div className="content-item">
                        <div className="item-title">
                            <i className="fas fa-comments item-icon" />
                            Communication
                        </div>
                        <div className="item-content">
                            You must keep your contact information updated. Nexus will contact you
                            via email, SMS, or phone regarding your account and our services.
                        </div>
                    </div>
                </div>
                {/* Services Section */}
                <div className="content-section">
                    <div className="section-title">Our Services</div>
                    <div className="content-item">
                        <div className="item-title">
                            <i className="fas fa-exchange-alt item-icon" />
                            Services Provided
                        </div>
                        <div className="item-content">
                            Nexus offers digital asset trading, secure custody solutions, and
                            customer support through both automated bots and human
                            representatives. User chat functionality is also available.
                        </div>
                    </div>
                    <div className="content-item">
                        <div className="item-title">
                            <i className="fas fa-money-bill-wave item-icon" />
                            Fees
                        </div>
                        <div className="item-content">
                            All applicable fees are listed on our Fee Structure page and are
                            subject to updates. You are responsible for reviewing the current fee
                            schedule before conducting transactions.
                        </div>
                    </div>
                </div>
                {/* Accounts Section */}
                <div className="content-section">
                    <div className="section-title">Account Management</div>
                    <div className="content-item">
                        <div className="item-title">
                            <i className="fas fa-user-circle item-icon" />
                            Account Creation
                        </div>
                        <div className="item-content">
                            You must open an account (individual or corporate) to access our
                            services. This requires completing identity verification procedures
                            (KYC/AML) as required by law.
                        </div>
                    </div>
                    <div className="content-item">
                        <div className="item-title">
                            <i className="fas fa-id-card item-icon" />
                            Identity Verification
                        </div>
                        <div className="item-content">
                            You must complete our Know Your Customer (KYC) and Anti-Money
                            Laundering (AML) verification processes before using certain services.
                        </div>
                    </div>
                    <div className="content-item">
                        <div className="item-title">
                            <i className="fas fa-folder item-icon" />
                            Account Records
                        </div>
                        <div className="item-content">
                            You may maintain records and create sub-accounts under specific
                            conditions outlined in our account management policies.
                        </div>
                    </div>
                </div>
                {/* Transactions Section */}
                <div className="content-section">
                    <div className="section-title">Transactions</div>
                    <div className="content-item">
                        <div className="item-title">
                            <i className="fas fa-wallet item-icon" />
                            Sufficient Balance
                        </div>
                        <div className="item-content">
                            You must maintain sufficient balance in your account for any
                            transactions you initiate. Transactions may fail or incur additional
                            fees if insufficient funds are available.
                        </div>
                    </div>
                    <div className="content-item">
                        <div className="item-title">
                            <i className="fas fa-ban item-icon" />
                            Transaction Cancellation
                        </div>
                        <div className="item-content">
                            Nexus reserves the right to cancel or amend transactions in cases of
                            suspected fraud, errors, or violations of these Terms.
                        </div>
                    </div>
                    <div className="content-item">
                        <div className="item-title">
                            <i className="fas fa-user-shield item-icon" />
                            Unauthorized Transactions
                        </div>
                        <div className="item-content">
                            You are responsible for any unauthorized transactions unless you can
                            prove otherwise through our dispute resolution process.
                        </div>
                    </div>
                </div>
                {/* Digital Assets Section */}
                <div className="content-section">
                    <div className="section-title">Digital Assets</div>
                    <div className="content-item">
                        <div className="item-title">
                            <i className="fas fa-coins item-icon" />
                            Supported Assets
                        </div>
                        <div className="item-content">
                            You may only transact with digital assets explicitly supported by
                            Nexus. Attempting to deposit unsupported assets may result in
                            permanent loss.
                        </div>
                    </div>
                    <div className="content-item">
                        <div className="item-title">
                            <i className="fas fa-code-branch item-icon" />
                            Forks &amp; Airdrops
                        </div>
                        <div className="item-content">
                            Nexus does not guarantee support for blockchain forks, airdrops, or
                            other similar events. Support decisions are made at our sole
                            discretion.
                        </div>
                    </div>
                </div>
                {/* Account Security Section */}
                <div className="content-section">
                    <div className="section-title">Account Security</div>
                    <div className="content-item">
                        <div className="item-title">
                            <i className="fas fa-lock item-icon" />
                            Security Requirements
                        </div>
                        <div className="item-content">
                            You must use a strong password, enable multi-factor authentication
                            (MFA), never share credentials, monitor account activity regularly,
                            and immediately report any security breaches.
                        </div>
                    </div>
                </div>
                {/* Privacy Section */}
                <div className="content-section">
                    <div className="content-item">
                        <div className="item-title">
                            <i className="fas fa-user-secret item-icon" />
                            Privacy
                        </div>
                        <div className="item-content">
                            Your privacy is governed by the Nexus Privacy Notice, which explains
                            how we collect, use, and protect your personal information.
                        </div>
                    </div>
                </div>
                {/* Termination Section */}
                <div className="content-section">
                    <div className="section-title">Account Termination</div>
                    <div className="content-item">
                        <div className="item-title">
                            <i className="fas fa-power-off item-icon" />
                            Termination/Suspension
                        </div>
                        <div className="item-content">
                            Nexus may restrict, suspend, or terminate accounts for fraud, law
                            violations, suspicious activity, or Terms violations. Users may close
                            accounts unless frozen or dormant.
                        </div>
                    </div>
                </div>
                {/* Prohibited Use Section */}
                <div className="warning-section">
                    <div className="warning-title">
                        <i className="fas fa-ban" />
                        Prohibited Use
                    </div>
                    <div className="warning-content">
                        You may not use Nexus services for fraud, market manipulation, illegal
                        activities, unauthorized access, or any purpose that violates applicable
                        laws or these Terms.
                    </div>
                </div>
                {/* Liability Section */}
                <div className="content-section">
                    <div className="section-title">Liability &amp; Intellectual Property</div>
                    <div className="content-item">
                        <div className="item-title">
                            <i className="fas fa-balance-scale item-icon" />
                            Liability
                        </div>
                        <div className="item-content">
                            Nexus is not responsible for losses except in cases of proven gross
                            negligence or fraud. We are not liable for market fluctuations,
                            technical issues, or third-party actions.
                        </div>
                    </div>
                    <div className="content-item">
                        <div className="item-title">
                            <i className="fas fa-copyright item-icon" />
                            Intellectual Property
                        </div>
                        <div className="item-content">
                            Nexus retains all intellectual property rights to our platform,
                            technology, and branding. Users receive a limited license to use our
                            services as outlined in these Terms.
                        </div>
                    </div>
                    <div className="content-item">
                        <div className="item-title">
                            <i className="fas fa-shield-alt item-icon" />
                            Indemnity
                        </div>
                        <div className="item-content">
                            You agree to indemnify and hold Nexus harmless against any claims,
                            losses, or damages resulting from your misuse of our services or
                            violation of these Terms.
                        </div>
                    </div>
                </div>
                {/* Important Notice */}
                <div className="notice-section">
                    <div className="notice-title">
                        <i className="fas fa-file-contract" />
                        Important Notice
                    </div>
                    <div className="notice-content">
                        By using Nexus services, you acknowledge that you have read, understood,
                        and agree to be bound by these Terms of Use. If you do not agree, you
                        must discontinue use of our services immediately.
                    </div>
                </div>
                {/* Action Cards */}
                <div className="action-cards">

                    <Link to="/security-tips" className="remove_blue">
                        <div className="action-card">
                            <i className="fas fa-shield-alt action-icon" />
                            <div className="action-title ">Security</div>
                            <div className="action-description">Keep your account safe.</div>
                        </div>
                    </Link>
                    <Link to="/faq-center" className="remove_blue">
                        <div className="action-card">
                            <i className="fas fa-question-circle action-icon" />
                            <div className="action-title">Help Center</div>
                            <div className="action-description">Get answers to your questions</div>
                        </div>
                    </Link>

                    <Link to="/privacy-portal" className="remove_blue">
                        <div className="action-card">
                            <i className="fas fa-user-shield action-icon" />
                            <div className="action-title">Privacy Policy</div>
                            <div className="action-description">Review our privacy practices</div>
                        </div>
                    </Link>
                    <Link to="/approval" className="remove_blue">
                        <div className="action-card" >
                            <i className="fas fa-gavel action-icon" />
                            <div className="action-title">Legal</div>
                            <div className="action-description">View all legal documents</div>
                        </div>
                    </Link>

                </div>
                {/* Footer */}
                <div className="footer">
                    © 2025 Nexus Exchange. All rights reserved.
                    <br />
                    Last updated: 6 May 2025
                </div>
            </div >
            {/* Scroll to Top Button */}
            < div className="scroll-top" id="scrollTop" >
                <i className="fas fa-chevron-up" />
            </div >
            {/* Notification Element */}


            <style>{`   .container {
            max-width: 400px;
            margin: 0 auto;
            padding: 20px;
            padding-bottom: 80px;
        }
        
        /* Header Section */
        .header {
            background-color: #000000;
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
            font-size: 14px;
            color: #AAAAAA;
            line-height: 1.5;
        }
        
        /* Content Sections */
        .content-section {
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
        
        .content-item {
            background-color: #1A1A1A;
            border-radius: 10px;
            padding: 15px;
            margin-bottom: 12px;
        }
        
        .item-title {
            font-weight: 600;
            margin-bottom: 8px;
            font-size: 16px;
            color: #F3BA2F;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .item-icon {
            font-size: 16px;
        }
        
        .item-content {
            font-size: 14px;
            color: #AAAAAA;
            line-height: 1.5;
        }
        
        /* Warning Section */
        .warning-section {
            background-color: #1A1A1A;
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 20px;
            border-left: 4px solid #FF6838;
        }
        
        .warning-title {
            font-size: 18px;
            font-weight: bold;
            color: #FF6838;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .warning-content {
            font-size: 14px;
            line-height: 1.5;
        }
        
        /* Important Notice */
        .notice-section {
            background-color: #1A1A1A;
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 20px;
            border-left: 4px solid #00C076;
        }
        
        .notice-title {
            font-size: 18px;
            font-weight: bold;
            color: #00C076;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .notice-content {
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
        
        /* Footer */
        .footer {
            text-align: center;
            padding: 20px 0;
            color: #AAAAAA;
            font-size: 12px;
            border-top: 1px solid #2A2A2A;
            margin-top: 20px;
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
        
        /* Scroll to Top Button */
        .scroll-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            background-color: #F3BA2F;
            color: #000000;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        .scroll-top.show {
            opacity: 1;
        }`}</style>
        </>

    )
}

export default Termeofuse