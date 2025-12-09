import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

interface CryptoCurrency {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  price: number;
  change24h: number;
  volume24h: string;
  marketCap: string;
  isPositive: boolean;
}

const Home: React.FC = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [marketData, setMarketData] = useState<CryptoCurrency[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Top 5 cryptocurrencies to track
  const topCryptos = [
    { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', icon: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png' },
    { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', icon: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png' },
    { id: 'binancecoin', symbol: 'BNB', name: 'Binance Coin', icon: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png' },
    { id: 'ripple', symbol: 'XRP', name: 'Ripple', icon: 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png' },
    { id: 'cardano', symbol: 'ADA', name: 'Cardano', icon: 'https://assets.coingecko.com/coins/images/975/small/cardano.png' }
  ];

  // Mock circulating supply for market cap calculation
  const getCirculatingSupply = (symbol: string): number => {
    const supplies: { [key: string]: number } = {
      'BTC': 19500000,
      'ETH': 120000000,
      'BNB': 153000000,
      'XRP': 54300000000,
      'ADA': 34000000000
    };
    return supplies[symbol] || 1000000000;
  };

  // Format volume and market cap
  const formatNumber = (num: number): string => {
    if (num >= 1e9) {
      return `$${(num / 1e9).toFixed(1)}B`;
    }
    if (num >= 1e6) {
      return `$${(num / 1e6).toFixed(1)}M`;
    }
    if (num >= 1e3) {
      return `$${(num / 1e3).toFixed(1)}K`;
    }
    return `$${num.toFixed(0)}`;
  };

  // Fetch cryptocurrency data from Binance API
  const fetchMarketData = async () => {
    try {
      setIsLoading(true);
      
      const promises = topCryptos.map(async (crypto) => {
        try {
          const response = await axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${crypto.symbol}USDT`);
          const ticker = response.data;
          
          const price = parseFloat(ticker.lastPrice);
          const change24h = parseFloat(ticker.priceChangePercent);
          const volume = parseFloat(ticker.volume) * price;
          const marketCap = price * getCirculatingSupply(crypto.symbol);
          
          return {
            id: crypto.id,
            name: crypto.name,
            symbol: crypto.symbol,
            icon: crypto.icon,
            price: price,
            change24h: change24h,
            volume24h: formatNumber(volume),
            marketCap: formatNumber(marketCap),
            isPositive: change24h >= 0
          };
        } catch (error) {
          console.error(`Error fetching data for ${crypto.symbol}:`, error);
          // Return fallback data if API call fails
          return {
            id: crypto.id,
            name: crypto.name,
            symbol: crypto.symbol,
            icon: crypto.icon,
            price: 0,
            change24h: 0,
            volume24h: '$0',
            marketCap: '$0',
            isPositive: true
          };
        }
      });

      const results = await Promise.all(promises);
      setMarketData(results);
      
    } catch (error) {
      console.error('Error fetching market data:', error);
      // Set fallback data if all API calls fail
      const fallbackData = topCryptos.map((crypto, index) => ({
        id: crypto.id,
        name: crypto.name,
        symbol: crypto.symbol,
        icon: crypto.icon,
        price: 1000 + (index * 100),
        change24h: (Math.random() - 0.5) * 10,
        volume24h: formatNumber(1000000 + (index * 1000000)),
        marketCap: formatNumber(1000000000 + (index * 1000000000)),
        isPositive: Math.random() > 0.5
      }));
      setMarketData(fallbackData);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
    
    // Refresh data every 30 seconds
    const interval = setInterval(fetchMarketData, 30000);
    
    return () => clearInterval(interval);
  }, []);

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

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for signing up! We will contact you shortly.');
    (e.target as HTMLFormElement).reset();
  };

  const faqItems = [
    {
      question: "How do I create an account?",
      answer: "Creating an account is simple. Click on the 'Create Account' button, fill in your details, verify your email, and complete the identity verification process. Your account will be ready in minutes."
    },
    {
      question: "Is my cryptocurrency safe on your platform?",
      answer: "Yes, security is our top priority. We use cold storage for the majority of funds, multi-signature technology, two-factor authentication, and regular security audits to ensure your assets are protected."
    },
    {
      question: "What trading fees do you charge?",
      answer: "Our trading fees start at 0.1% for makers and 0.2% for takers. Fees decrease based on your 30-day trading volume or by holding our native token."
    },
    {
      question: "Do you have 24/7 customer support?",
      answer: "Yes, we offer 24/7 chat support. You can contact us via our Customer Support team at https://nexus-exchange.com/LiveChat or email at support@nexus-exchange.com."
    }
  ];

  return (
    <>
      <style>{`
        /* Add loading spinner styles */
        .loading-spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 2px solid #f3f3f3;
          border-top: 2px solid var(--primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .crypto-icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: var(--medium-gray);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          overflow: hidden;
        }

        .crypto-icon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .fallback-icon {
          font-size: 14px;
          color: var(--primary);
        }

     /* Hero Section */
        .hero {
          padding: 180px 0 100px;
          background: linear-gradient(135deg, rgba(243, 186, 47, 0.1) 0%, rgba(0, 192, 118, 0.05) 100%);
          position: relative;
          overflow: hidden;
        }

        .hero-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
        }

        .hero-text {
          flex: 1;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 900;
          margin-bottom: 20px;
          line-height: 1.2;
        }

        .hero-title span {
          background: var(--gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-size: 1.2rem;
          color: var(--light-gray);
          margin-bottom: 30px;
          max-width: 500px;
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          margin-top: 30px;
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

        .hero-image {
          flex: 1;
          display: flex;
          justify-content: center;
        }

        .hero-image img {
          max-width: 100%;
          border-radius: 10px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }

        /* Services Section */
        .services {
          padding: 100px 0;
          background-color: var(--dark-gray);
        }

        .section-title {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 60px;
          color: var(--white);
        }

        .section-title span {
          color: var(--primary);
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .service-card {
          background-color: var(--medium-gray);
          border-radius: 12px;
          padding: 30px;
          transition: transform 0.3s, box-shadow 0.3s;
          text-align: center;
        }

        .service-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
        }

        .service-icon {
          font-size: 40px;
          color: var(--primary);
          margin-bottom: 20px;
        }

        .service-title {
          font-size: 1.5rem;
          margin-bottom: 15px;
          color: var(--white);
        }

        .service-desc {
          color: var(--light-gray);
        }

        /* Features Section */
        .features {
          padding: 100px 0;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .feature-card {
          background-color: var(--dark-gray);
          border-radius: 12px;
          padding: 30px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: transform 0.3s;
        }

        .feature-card:hover {
          transform: translateY(-5px);
        }

        .feature-icon {
          font-size: 24px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: var(--medium-gray);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          color: var(--primary);
        }

        .feature-title {
          font-size: 1.3rem;
          margin-bottom: 15px;
          color: var(--white);
        }

        .feature-desc {
          color: var(--light-gray);
        }

        /* About Section */
        .about {
          padding: 100px 0;
          background-color: var(--dark-gray);
        }

        .about-content {
          display: flex;
          align-items: center;
          gap: 50px;
        }

        .about-image {
          flex: 1;
        }

        .about-image img {
          width: 100%;
          border-radius: 10px;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
        }

        .about-text {
          flex: 1;
        }

        .about-title {
          font-size: 2.2rem;
          margin-bottom: 20px;
          color: var(--white);
        }

        .about-title span {
          color: var(--primary);
        }

        .about-desc {
          color: var(--light-gray);
          margin-bottom: 20px;
        }

        .stats {
          display: flex;
          gap: 30px;
          margin-top: 30px;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--primary);
          display: block;
        }

        .stat-label {
          font-size: 0.9rem;
          color: var(--light-gray);
        }

        /* Market Trends Section */
        .market-trends {
          padding: 100px 0;
          background-color: var(--dark-gray);
        }

        .trends-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }

        .markets-table {
          width: 100%;
          border-collapse: collapse;
          background-color: var(--dark);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .markets-table th {
          background-color: var(--medium-gray);
          padding: 15px;
          text-align: left;
          font-weight: 600;
          color: var(--primary);
        }

        .markets-table td {
          padding: 15px;
          border-bottom: 1px solid var(--medium-gray);
        }

        .markets-table tr:last-child td {
          border-bottom: none;
        }

        .markets-table tr:hover {
          background-color: rgba(243, 186, 47, 0.05);
        }

        .crypto-name {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .crypto-icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: var(--medium-gray);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }

        .positive {
          color: var(--secondary);
        }

        .negative {
          color: var(--accent);
        }

        /* Trading Types Section */
        .trading-types {
          padding: 100px 0;
        }

        .trading-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }

        .trading-card {
          background-color: var(--dark-gray);
          border-radius: 12px;
          padding: 30px;
          text-align: center;
          transition: transform 0.3s;
        }

        .trading-card:hover {
          transform: translateY(-5px);
        }

        .trading-icon {
          font-size: 40px;
          color: var(--primary);
          margin-bottom: 20px;
        }

        .trading-title {
          font-size: 1.5rem;
          margin-bottom: 15px;
          color: var(--white);
        }

        .trading-desc {
          color: var(--light-gray);
        }

        /* How It Works Section */
        .how-it-works {
          padding: 100px 0;
          background-color: var(--dark-gray);
        }

        .steps {
          display: flex;
          justify-content: space-between;
          gap: 30px;
          margin-top: 50px;
        }

        .step {
          text-align: center;
          flex: 1;
        }

        .step-number {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--gradient);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--dark);
        }

        .step-title {
          font-size: 1.3rem;
          margin-bottom: 15px;
          color: var(--white);
        }

        .step-desc {
          color: var(--light-gray);
        }

        /* Download App Section */
        .download-app {
          padding: 100px 0;
          text-align: center;
        }

        .app-content {
          display: flex;
          align-items: center;
          gap: 50px;
        }

        .app-image {
          flex: 1;
        }

        .app-image img {
          width: 100%;
          max-width: 300px;
          border-radius: 20px;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
        }

        .app-text {
          flex: 1;
        }

        .app-buttons {
          display: flex;
          gap: 20px;
          margin-top: 30px;
          justify-content: center;
        }

        .app-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          background-color: var(--medium-gray);
          padding: 12px 20px;
          border-radius: 8px;
          color: var(--white);
          text-decoration: none;
          transition: background-color 0.3s;
        }

        .app-btn:hover {
          background-color: var(--primary);
          color: var(--dark);
        }

        /* Help & Support Section */
        .help-support {
          padding: 100px 0;
          background-color: var(--dark-gray);
        }

        .support-content {
          display: flex;
          gap: 50px;
          align-items: flex-start;
        }

        .support-info {
          flex: 1;
        }

        .support-title {
          font-size: 2rem;
          margin-bottom: 20px;
          color: var(--white);
        }

        .support-desc {
          color: var(--light-gray);
          margin-bottom: 30px;
        }

        .support-options {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .support-option {
          background-color: var(--medium-gray);
          padding: 20px;
          border-radius: 8px;
          transition: transform 0.3s;
        }

        .support-option:hover {
          transform: translateY(-5px);
        }

        .support-option h4 {
          font-size: 1.2rem;
          margin-bottom: 10px;
          color: var(--primary);
        }

        .support-option p {
          color: var(--light-gray);
          margin-bottom: 15px;
        }

        .legal-info {
          flex: 1;
        }

        .legal-card {
          background-color: var(--medium-gray);
          padding: 25px;
          border-radius: 8px;
          margin-bottom: 20px;
          transition: transform 0.3s;
        }

        .legal-card:hover {
          transform: translateY(-5px);
        }

        .legal-card h4 {
          font-size: 1.2rem;
          margin-bottom: 15px;
          color: var(--primary);
        }

        .legal-card p {
          color: var(--light-gray);
          margin-bottom: 15px;
        }

        /* FAQ Section */
        .faq {
          padding: 100px 0;
          background-color: var(--dark-gray);
        }

        .faq-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .faq-item {
          margin-bottom: 15px;
          border-radius: 8px;
          overflow: hidden;
          background-color: var(--medium-gray);
        }

        .faq-question {
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          font-weight: 600;
        }

        .faq-answer {
          padding: 0 20px;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s, padding 0.3s;
          color: var(--light-gray);
        }

        .faq-item.active .faq-answer {
          padding: 0 20px 20px;
          max-height: 500px;
        }

        .faq-toggle {
          transition: transform 0.3s;
        }

        .faq-item.active .faq-toggle {
          transform: rotate(180deg);
        }

        /* Create Account Section */
        .create-account {
          padding: 100px 0;
          text-align: center;
        }

        .account-form {
          max-width: 500px;
          margin: 0 auto;
          background-color: var(--dark-gray);
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .form-group {
          margin-bottom: 20px;
          text-align: left;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
        }

        .form-group input {
          width: 100%;
          padding: 12px 15px;
          border-radius: 8px;
          border: 1px solid var(--medium-gray);
          background-color: var(--dark);
          color: var(--white);
          font-size: 16px;
        }

        .form-group input:focus {
          outline: none;
          border-color: var(--primary);
        }


        /* Floating Animation */
        .floating {
          animation: floating 3s ease-in-out infinite;
        }

        @keyframes floating {
          0% {
            transform: translate(0, 0px);
          }
          50% {
            transform: translate(0, 15px);
          }
          100% {
            transform: translate(0, -0px);
          }
        }

        /* Gradient Text */
        .gradient-text {
          background: var(--gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Responsive Design */
        @media (max-width: 992px) {
          .hero-content {
            flex-direction: column;
            text-align: center;
          }

          .hero-title {
            font-size: 2.8rem;
          }

          .cta-buttons {
            justify-content: center;
          }

          .about-content {
            flex-direction: column;
          }

          .stats {
            justify-content: center;
          }

          .steps {
            flex-direction: column;
          }

          .app-content {
            flex-direction: column;
          }

          .support-content {
            flex-direction: column;
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

          .hero-title {
            font-size: 2.2rem;
          }

          .section-title {
            font-size: 2rem;
          }

          .app-buttons {
            flex-direction: column;
            align-items: center;
          }

          .markets-table {
            display: block;
            overflow-x: auto;
          }
        }

        @media (max-width: 576px) {
          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .btn {
            width: 100%;
            text-align: center;
          }

          .hero-title {
            font-size: 1.8rem;
          }

          .section-title {
            font-size: 1.6rem;
          }

          .stats {
            flex-direction: column;
            gap: 20px;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">NEXUS: The All In One <span>Crypto Trading Hub</span></h1>
              <p className="hero-subtitle">From lightning-fast trades to seamless conversions and lucrative staking
                rewards, Nexus is built to empower every type of trader. Whether you're just getting started or
                managing a diversified portfolio, Nexus delivers institution-grade tools within an intuitive,
                user-friendly interface.</p>
              <div className="cta-buttons">
                <a href="https://nexus-exchange.com/auth/signup" target='_blank' className="btn btn-primary">Create Account</a>
                <a href="#download" className="btn btn-secondary">Download App</a>
              </div>
            </div>
            <div className="hero-image">
              <div style={{ width: '100%', height: '500px', background: 'linear-gradient(145deg, #1A1A1A, #2A2A2A)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontSize: '18px', position: 'relative', overflow: 'hidden' }}>
                <div className="floating" style={{ position: 'absolute', top: '20px', left: '20px', background: 'var(--primary)', color: 'var(--dark)', padding: '5px 10px', borderRadius: '5px', fontSize: '12px', fontWeight: 'bold' }}>
                  BTC +2.5%
                </div>
                <div className="floating" style={{ position: 'absolute', top: '60px', right: '30px', background: 'var(--secondary)', color: 'var(--dark)', padding: '5px 10px', borderRadius: '5px', fontSize: '12px', fontWeight: 'bold' }}>
                  ETH +1.8%
                </div>
                <img src="./1.png" alt="Trading Dashboard" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="container">
          <h2 className="section-title">About <span>NEXUS EXCHANGE</span></h2>
          <div className="about-content">
            <div className="about-image">
              <div style={{ width: '100%', height: '400px', background: 'linear-gradient(145deg, var(--primary), var(--accent))', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--dark)', fontSize: '18px', fontWeight: 'bold' }}>
                <img src="./3.png" style={{ height: '400px' }} alt="About Nexus" />
              </div>
            </div>
            <div className="about-text">
              <h3 className="about-title">Nexus: The Future of <span>Intelligent Crypto Trading</span></h3>
              <p className="about-desc">Nexus is your next-generation crypto trading platform built for power, speed,
                and trust. Whether you're a beginner or a pro, Nexus gives you everything you need to trade
                smarter from lightning-fast executions to secure earnings through staking.</p>
              <p className="about-desc">Our goal is simple: Make advanced trading tools easy, accessible, and
                rewarding for everyone. Execute trades instantly, mirror the strategies of top-performing
                investors, and earn passive income through secure, high-yield staking all from one unified
                platform.</p>
              <div className="stats">
                <div className="stat-item">
                  <span className="stat-number">2M+</span>
                  <span className="stat-label">Users</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">$30B+</span>
                  <span className="stat-label">Volume</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">150+</span>
                  <span className="stat-label">Countries</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Trends Section */}
      <section className="market-trends" id="market-trends">
        <div className="container">
          <div className="trends-header">
            <h2 className="section-title">Live <span>Market Trends</span></h2>
            <Link to='/market' className="btn btn-secondary">View All Markets</Link>
          </div>
          <div className="markets-table-container">
            <table className="markets-table">
              <thead>
                <tr>
                  <th>Asset</th>
                  <th>Price</th>
                  <th>24h Change</th>
                  <th>24h Volume</th>
                  <th>Market Cap</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '40px' }}>
                      <div className="loading-spinner" style={{ margin: '0 auto' }}></div>
                      <div style={{ marginTop: '10px', color: 'var(--light-gray)' }}>Loading market data...</div>
                    </td>
                  </tr>
                ) : (
                  marketData.map((crypto, index) => (
                    <tr key={crypto.id}>
                      <td>
                        <div className="crypto-name">
                          <div className="crypto-icon">
                            <img 
                              src={crypto.icon} 
                              alt={crypto.name}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.nextSibling?.remove();
                                const fallback = document.createElement('div');
                                fallback.className = 'fallback-icon';
                                fallback.innerHTML = '<i class="fas fa-coins"></i>';
                                target.parentNode?.appendChild(fallback);
                              }}
                            />
                          </div>
                          <div>
                            <div>{crypto.name}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--light-gray)' }}>{crypto.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td>${crypto.price > 1 ? crypto.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : crypto.price.toFixed(4)}</td>
                      <td className={crypto.isPositive ? 'positive' : 'negative'}>
                        {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                      </td>
                      <td>{crypto.volume24h}</td>
                      <td>{crypto.marketCap}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services" id="trading">
        <div className="container">
          <h2 className="section-title">Trade <span>Smarter, Faster</span></h2>
          <div className="services-grid">
            <div className="service-card">
              <i className="fas fa-bolt service-icon"></i>
              <h3 className="service-title">Lightning Fast Execution</h3>
              <p className="service-desc">Execute trades in milliseconds with our high-performance trading engine and
                optimized infrastructure.</p>
            </div>
            <div className="service-card">
              <i className="fas fa-chart-line service-icon"></i>
              <h3 className="service-title">Advanced Charting</h3>
              <p className="service-desc">Professional trading charts with dozens of technical indicators, drawing
                tools, and customizable layouts.</p>
            </div>
            <div className="service-card">
              <i className="fas fa-coins service-icon"></i>
              <h3 className="service-title">Earn While You Sleep</h3>
              <p className="service-desc">Maximize your assets with Staking and referrals. Earn passive income by
                locking your crypto.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trading Types Section */}
      <section className="trading-types">
        <div className="container">
          <h2 className="section-title">Our <span>Trading Options</span></h2>
          <div className="trading-grid">
            <div className="trading-card">
              <i className="fas fa-forward trading-icon"></i>
              <h3 className="trading-title">Future Trade</h3>
              <p className="trading-desc">Predict and profit from crypto market trends with leveraged positions.
                Manage risk with advanced tools.</p>
            </div>
            <div className="trading-card">
              <i className="fas fa-running trading-icon"></i>
              <h3 className="trading-title">Quick Trade</h3>
              <p className="trading-desc">Make fast crypto trades with minimal steps. Designed for beginners and
                active traders seeking instant execution.</p>
            </div>
            <div className="trading-card">
              <i className="fas fa-shopping-cart trading-icon"></i>
              <h3 className="trading-title">Spot Trade</h3>
              <p className="trading-desc">Buy and sell crypto instantly at market price. Simple, transparent, and
                perfect for real-time execution.</p>
            </div>
            <div className="trading-card">
              <i className="fas fa-piggy-bank trading-icon"></i>
              <h3 className="trading-title">Staking</h3>
              <p className="trading-desc">Earn passive income by locking your crypto assets in the network with
                competitive APY rates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works" id="how-it-works">
        <div className="container">
          <h2 className="section-title">How To Get <span>Started</span></h2>
          <p style={{ textAlign: 'center', color: 'var(--light-gray)', maxWidth: '700px', margin: '0 auto 50px' }}>Simple and
            easy way to start your Nexus trading Journey</p>

          <div className="steps">
            <div className="step">
              <div className="step-number">01</div>
              <h3 className="step-title">Create Account</h3>
              <p className="step-desc">Sign up in seconds with your email and secure your identity. Your data and
                funds are always protected on Nexus.</p>
            </div>
            <div className="step">
              <div className="step-number">02</div>
              <h3 className="step-title">Go To Dashboard</h3>
              <p className="step-desc">Connect your bank or crypto wallet. Instantly deposit and get ready to explore
                all trading features on Nexus.</p>
            </div>
            <div className="step">
              <div className="step-number">03</div>
              <h3 className="step-title">Start Trading</h3>
              <p className="step-desc">Choose your preferred trading type - Spot, Future or Staking - and begin your
                profit journey.</p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <a href="https://nexus-exchange.com/auth/signin" target="_blank" className="btn btn-primary">Get Started</a>
          </div>
        </div>
      </section>

      {/* Download App Section */}
      <section className="download-app" id="download">
        <div className="container">
          <h2 className="section-title">Download <span>Nexus App</span></h2>
          <div className="app-content">
            <div className="">
              <div
                style={{
                  width: '100%',
                  height: '400px',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--dark)',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  position: 'relative',
                }}
              >
                <img src="/playstore.jpg" alt="" style={{ width: '100%', height: '100%' }} />
              </div>
            </div>
            <div className="app-text">
              <h3 style={{ fontSize: '2rem', marginBottom: '20px' }}>Trade On The Go</h3>
              <p style={{ color: 'var(--light-gray)', marginBottom: '30px' }}>Access all Nexus features from your mobile
                device. Download our app for iOS and Android to trade anytime, anywhere.</p>

              <div className="app-buttons">
                <a href="#" className="app-btn">
                  <i className="fab fa-apple" style={{ fontSize: '24px' }}></i>
                  <div>
                    <div style={{ fontSize: '12px' }}>Download on the</div>
                    <div style={{ fontWeight: 'bold' }}>App Store</div>
                  </div>
                </a>
                <a href="https://nexus-exchange.com/playstore" target="_blank" className="app-btn">
                  <i className="fab fa-google-play" style={{ fontSize: '20px' }}></i>
                  <div>
                    <div style={{ fontSize: '12px' }}>Get it on</div>
                    <div style={{ fontWeight: 'bold' }}>Google Play</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Help & Support Section */}
      <section className="help-support" id="help">
        <div className="container">
          <h2 className="section-title">Need <span>Help?</span></h2>
          <div className="support-content">
            <div className="support-info">
              <div className="support-option">
                <h4>24/7 Chat Support</h4>
                <p>How you can contact us. For more information on Nexus, you may refer to the information found
                  on our Website. If you have questions, feedback or complaints you can contact us via our
                  Customer Support team at https://nexus-exchange.com/LiveChat or email at
                  support@nexus-exchange.com. These Terms may specify contact details for particular notices.
                  This address is not monitored for those notices.</p>
                <a href="mailto:support@nexus-exchange.com" className="btn btn-primary">Chat Now</a>
              </div>
            </div>
            <div className="support-info">
              <div className="legal-card">
                <h4>Terms & Conditions</h4>
                <p>These Terms constitute a legally binding agreement between you ("you" or "your") and Nexus
                  ("Nexus", "we", "our" or "us"). The Terms govern your use of the Nexus Services made
                  available to you on or through the Platform or otherwise. Nexus Services may be provided by
                  Nexus or, if specified in these Terms, any Product Terms or any additional terms, by any
                  Nexus Affiliate.</p>
                <Link to="/terms-of-use" className="btn btn-secondary">Learn More</Link>
              </div>
            </div>
            <div className="support-info">
              <div className="legal-card">
                <h4>Privacy Policy</h4>
                <p>Our commitment to protecting your data Welcome to our Privacy Portal. We created this page to
                  help you navigate through key aspects of our Privacy Program and learn more about your
                  privacy rights. At Nexus, we are dedicated to safeguarding your privacy and protecting your
                  data.</p>
                <Link to="/privacy" className="btn btn-secondary">Learn More</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq" id="faq">
        <div className="container">
          <h2 className="section-title">Frequently Asked <span>Questions</span></h2>
          <div className="faq-container">
            {faqItems.map((item, index) => (
              <div key={index} className={`faq-item ${activeFaq === index ? 'active' : ''}`}>
                <div className="faq-question" onClick={() => toggleFaq(index)}>
                  {item.question}
                  <i className={`fas fa-chevron-down faq-toggle ${activeFaq === index ? 'active' : ''}`}></i>
                </div>
                <div className="faq-answer">
                  {item.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
};

export default Home;