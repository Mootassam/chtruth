import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
const AboutUs: React.FC = () => {
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

  const investors = [
    "Poolin", "Neutrino", "Swop", "Smile", "BTCEX", "Coinbase", "Huobi"
  ];

  const products = [
    {
      icon: "fas fa-shopping-cart",
      title: "Spot Trading",
      description: "Buy and sell crypto in real-time with transparent pricing and instant execution."
    },
    {
      icon: "fas fa-forward",
      title: "Futures Trading",
      description: "Trade with leverage and maximize profit potential by predicting market movements."
    },
    {
      icon: "fas fa-running",
      title: "Quick Trade",
      description: "One-tap trades for fast-paced users. Choose Higher or Lower, and act within seconds."
    },
    {
      icon: "fas fa-users",
      title: "P2P Marketplace",
      description: "Trade directly with global users using preferred payment methods privately and securely."
    },
    {
      icon: "fas fa-piggy-bank",
      title: "Staking",
      description: "Lock your crypto and earn passive income daily through our auto-compounding system."
    }
  ];

  const stats = [
    { number: "60M+", label: "Trades Executed Across Spot, Futures & Quick Trade" },
    { number: "1500+", label: "Referral Network Trusted by Growing Portfolios" },
    { number: "1000+", label: "Active Stakers Earning Rewards 24/7" }
  ];

  return (
    <>
      <style>{`
        /* Hero Section */
        .about-hero {
          padding: 180px 0 100px;
          background: linear-gradient(135deg, rgba(243, 186, 47, 0.1) 0%, rgba(0, 192, 118, 0.05) 100%);
          position: relative;
          overflow: hidden;
          text-align: center;
        }
        
        .about-hero-content {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .about-hero-title {
          font-size: 3.5rem;
          font-weight: 900;
          margin-bottom: 20px;
          line-height: 1.2;
        }
        
        .about-hero-title span {
          background: var(--gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .about-hero-subtitle {
          font-size: 1.2rem;
          color: var(--light-gray);
          margin-bottom: 30px;
        }
        
        .about-cta-buttons {
          display: flex;
          gap: 20px;
          margin-top: 30px;
          justify-content: center;
        }
        
        .btn {
          padding: 14px 30px;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          display: inline-block;
          transition: all 0.3s;
          cursor: pointer;
          border: none;
          font-size: 16px;
        }
        
        .btn-primary {
          background-color: var(--primary);
          color: var(--dark);
        }
        
        .btn-primary:hover {
          background-color: #e0a91a;
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(243, 186, 47, 0.2);
        }
        
        .btn-secondary {
          background-color: transparent;
          color: var(--white);
          border: 2px solid var(--primary);
        }
        
        .btn-secondary:hover {
          background-color: rgba(243, 186, 47, 0.1);
          transform: translateY(-3px);
        }
        
        /* Content Sections */
        .content-section {
          padding: 100px 0;
        }
        
        .content-section:nth-child(even) {
          background-color: var(--dark-gray);
        }
        
        .content-wrapper {
          display: flex;
          align-items: center;
          gap: 50px;
        }
        
        .content-wrapper.reverse {
          flex-direction: row-reverse;
        }
        
        .content-image {
          flex: 1;
        }
        
        .content-image img {
          width: 100%;
          border-radius: 10px;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
        }
        
        .content-text {
          flex: 1;
        }
        
        .section-title {
          font-size: 2.5rem;
          margin-bottom: 20px;
          color: var(--white);
        }
        
        .section-title span {
          color: var(--primary);
        }
        
        .section-subtitle {
          font-size: 1.8rem;
          margin-bottom: 20px;
          color: var(--white);
        }
        
        .section-desc {
          color: var(--light-gray);
          margin-bottom: 20px;
        }
        
        /* Stats Section */
        .stats-section {
          padding: 100px 0;
          text-align: center;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 30px;
          margin-top: 50px;
        }
        
        .stat-item {
          text-align: center;
        }
        
        .stat-number {
          font-size: 3rem;
          font-weight: 800;
          color: var(--primary);
          display: block;
          margin-bottom: 10px;
        }
        
        .stat-label {
          font-size: 1.1rem;
          color: var(--light-gray);
        }
        
        /* Mission Section */
        .mission-section {
          padding: 100px 0;
          background-color: var(--dark-gray);
          text-align: center;
        }
        
        .mission-content {
          max-width: 800px;
          margin: 0 auto;
        }
        
        /* Investors Section */
        .investors-section {
          padding: 100px 0;
          text-align: center;
        }
        
        .investors-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 30px;
          margin-top: 50px;
        }
        
        .investor-logo {
          background-color: var(--medium-gray);
          border-radius: 10px;
          padding: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100px;
          transition: transform 0.3s;
        }
        
        .investor-logo:hover {
          transform: translateY(-5px);
        }
        
        .investor-logo img {
          max-width: 100%;
          max-height: 40px;
          filter: brightness(0) invert(1);
        }
        
        /* Products Section */
        .products-section {
          padding: 100px 0;
          background-color: var(--dark-gray);
        }
        
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          margin-top: 50px;
        }
        
        .product-card {
          background-color: var(--medium-gray);
          border-radius: 12px;
          padding: 30px;
          text-align: center;
          transition: transform 0.3s;
        }
        
        .product-card:hover {
          transform: translateY(-5px);
        }
        
        .product-icon {
          font-size: 40px;
          color: var(--primary);
          margin-bottom: 20px;
        }
        
        .product-title {
          font-size: 1.5rem;
          margin-bottom: 15px;
          color: var(--white);
        }
        
        .product-desc {
          color: var(--light-gray);
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
        
        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        /* Floating Animation */
        .floating {
          animation: floating 3s ease-in-out infinite;
        }
        
        @keyframes floating {
          0% { transform: translate(0, 0px); }
          50% { transform: translate(0, 15px); }
          100% { transform: translate(0, -0px); }
        }
        
        /* Gradient Text */
        .gradient-text {
          background: var(--gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        /* Responsive Design */
        @media (max-width: 992px) {
          .content-wrapper {
            flex-direction: column;
          }
          
          .content-wrapper.reverse {
            flex-direction: column;
          }
          
          .about-hero-title {
            font-size: 2.8rem;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .about-cta-buttons {
            flex-direction: column;
            align-items: center;
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
          
          .about-hero-title {
            font-size: 2.2rem;
          }
          
          .section-title {
            font-size: 1.8rem;
          }
        }
        
        @media (max-width: 576px) {
          .btn {
            width: 100%;
            text-align: center;
          }
          
          .about-hero-title {
            font-size: 1.8rem;
          }
          
          .section-title {
            font-size: 1.6rem;
          }
        }
      `}</style>

      {/* Header & Navigation */}
  

      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <h1 className="about-hero-title">About <span>Nexus Exchange</span></h1>
            <p className="about-hero-subtitle">Nexus Exchange is a next-generation crypto trading ecosystem built to empower individuals and businesses to trade, earn, and grow with ease.</p>
            <div className="about-cta-buttons">
              <a href="https://nexus-exchange.com/auth/signup" target='_blank' className="btn btn-primary">Create Account</a>
              <Link to="/faqs" className="btn btn-secondary">How It Works</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="content-section">
        <div className="container">
          <div className="content-wrapper">
            <div className="content-image">
              <img src='/vision.png' />
            </div>
            <div className="content-text">
              <h2 className="section-title">Our <span>Vision</span></h2>
              <p className="section-desc">At Nexus Exchange, we empower users to trade, earn, and manage digital assets with confidence. From high-speed feature and spot trading to automated earnings through staking, we provide a seamless experience for both beginners and professionals.</p>
              <p className="section-desc">Our secure cold wallet ensures your assets are safely stored, while our low-fee conversion tools make it easy to exchange your holdings into any currency anytime, anywhere. Headquartered in New York, with teams across Dubai, London, Los Angeles, and Miami, Nexus is more than just a trading platform it's a movement toward financial freedom.</p>
              <p className="section-desc">Driven by innovation, trust, and user-first technology, we're redefining what's possible in the world of digital finance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* User Control Section */}
      <section className="content-section">
        <div className="container">
          <div className="content-wrapper reverse">
            <div className="content-image">
              <img src='/4.png' />
            </div>
            <div className="content-text">
              <h2 className="section-title">User <span>First Philosophy</span></h2>
              <p className="section-desc">At Nexus, we believe in putting users first with complete transparency and control over your crypto journey.</p>
              <p className="section-desc">Your Keys. Your Control. With Nexus, your wallet keys never leave your hands. Every transaction runs on secure, audited smart contracts recorded transparently on the public blockchain. No intermediaries. No compromises.</p>
              <p className="section-desc">Trade. Stake. Convert. Grow. From advanced trading and staking to mirroring top-performing portfolios, Nexus equips you with powerful, trustless tools to grow your digital assets confidently and securely.</p>
              <p className="section-desc">Whether you're trading, staking, or copying top traders, Nexus gives you the tools to grow with confidence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <h2 className="section-title">Nexus <span>By The Numbers</span></h2>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
          <div className="about-cta-buttons" style={{ marginTop: '50px' }}>
            <a href="https://nexus-exchange.com/playstore" target='_blank' className="btn btn-primary">Go To Apps</a>
            <a href="https://nexus-exchange.com" target='_blank' className="btn btn-secondary">Learn More</a>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <h2 className="section-title">WE ARE BUILDING THE <span>FUTURE OF CRYPTO FINANCE</span></h2>
            <p className="section-desc">Nexus Exchange was founded with a clear purpose to make crypto trading simple, smart, and accessible for everyone. Our mission is to empower users with the tools to trade, stake, and grow their assets confidently whether they're beginners or pros.</p>
            <p className="section-desc">From fast-paced Quick Trades to passive earning through Staking and Copy Trading, Nexus brings the power of Web3 into your hands without the complexity. We're building a unified ecosystem where anyone can participate, profit, and thrive no coding, no confusion, just pure control.</p>
            <p className="section-desc">At Nexus, our goal is to bridge traditional finance and decentralized technology by offering fast execution, passive earning tools like staking and copy trading, and a frictionless trading experience for all.</p>
            <p className="section-desc">To achieve this, we're developing advanced tools, strategic partnerships, and an open infrastructure that brings true financial freedom to users around the world.</p>
            <div className="about-cta-buttons" style={{ marginTop: '40px' }}>
              <a href="https://nexus-exchange.com"  target='_blank' className="btn btn-primary">Start Exploring Nexus</a>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="content-section">
        <div className="container">
          <div className="content-wrapper">
            <div className="content-image">
              <img src='/4.jpg' />
            </div>
            <div className="content-text">
              <h2 className="section-title">OUR <span>CONCEPT & MISSION</span></h2>
              <p className="section-desc">Nexus Exchange was founded with a clear purpose to make crypto trading simple, smart, and accessible for everyone. Our mission is to empower users with the tools to trade, stake, and grow their assets confidently whether they're beginners or pros.</p>
              <p className="section-desc">From fast-paced Quick Trades to passive earning through Staking and Copy Trading, Nexus brings the power of Web3 into your hands without the complexity.</p>
              <p className="section-desc">We're building a unified ecosystem where anyone can participate, profit, and thrive no coding, no confusion, just pure control.</p>
              <div className="about-cta-buttons" style={{ marginTop: '30px' }}>
                <a href="https://nexus-exchange.com"  target='_blank' className="btn btn-primary">Join the Nexus Movement</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investors Section */}
      <section className="investors-section">
        <div className="container">
          <h2 className="section-title">Our <span>Investors</span></h2>
          <div className="investors-grid">
            {investors.map((investor, index) => (
              <div key={index} className="investor-logo">
                <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{investor}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <div className="container">
          <h2 className="section-title">MEET THE <span>PRODUCT</span></h2>
          <p className="section-desc" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 50px' }}>Beautiful, functional and nearly ready to launch</p>
          
          <div className="products-grid">
            {products.map((product, index) => (
              <div key={index} className="product-card">
                <i className={product.icon + " product-icon"}></i>
                <h3 className="product-title">{product.title}</h3>
                <p className="product-desc">{product.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
  
    </>
  );
};

export default AboutUs;