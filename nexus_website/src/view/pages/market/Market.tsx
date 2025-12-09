import React, { useEffect, useState, useRef } from 'react';
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
  inWatchlist: boolean;
  priceChangePercent?: number;
  volume?: string;
}

interface MarketNews {
  title: string;
  excerpt: string;
  category: string;
  timeAgo: string;
  icon: string;
}

interface BinanceTicker {
  s: string; // Symbol
  c: string; // Current price
  P: string; // Price change percent
  v: string; // Volume
  q: string; // Quote volume
}

const Market: React.FC = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [cryptocurrencies, setCryptocurrencies] = useState<CryptoCurrency[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const ws = useRef<WebSocket | null>(null);

  // Top cryptocurrencies to track
  const topCryptos = [
    { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', icon: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png' },
    { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', icon: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png' },
    { id: 'binancecoin', symbol: 'BNB', name: 'Binance Coin', icon: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png' },
    { id: 'ripple', symbol: 'XRP', name: 'Ripple', icon: 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png' },
    { id: 'cardano', symbol: 'ADA', name: 'Cardano', icon: 'https://assets.coingecko.com/coins/images/975/small/cardano.png' },
    { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin', icon: 'https://assets.coingecko.com/coins/images/5/small/dogecoin.png' },
    { id: 'chainlink', symbol: 'LINK', name: 'Chainlink', icon: 'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png' },
    { id: 'polkadot', symbol: 'DOT', name: 'Polkadot', icon: 'https://assets.coingecko.com/coins/images/12171/small/polkadot.png' },
    { id: 'solana', symbol: 'SOL', name: 'Solana', icon: 'https://assets.coingecko.com/coins/images/4128/small/solana.png' },
    { id: 'matic-network', symbol: 'MATIC', name: 'Polygon', icon: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png' }
  ];

  const marketNews: MarketNews[] = [
    {
      title: 'Bitcoin Surges Amid Institutional Adoption',
      excerpt: 'Major financial institutions continue to add Bitcoin to their balance sheets, driving prices higher.',
      category: 'Crypto News',
      timeAgo: '2 hours ago',
      icon: '/n1.webp'
    },
    {
      title: 'Regulatory Clarity Boosts Ethereum Ecosystem',
      excerpt: 'Recent regulatory developments have provided much-needed clarity for Ethereum-based projects.',
      category: 'Regulation',
      timeAgo: '5 hours ago',
           icon: '/n2.png'
    },
    {
      title: 'NFT Market Sees Resurgence with New Gaming Projects',
      excerpt: 'Play-to-earn gaming platforms are driving renewed interest in the NFT market.',
      category: 'NFT',
      timeAgo: '1 day ago',
            icon: '/n3.jpg'
    }
  ];

  const filterButtons = ['All', 'Gainers', 'Losers', 'DeFi', 'NFT', 'Metaverse'];
  const categories = ['All Categories', 'Currency', 'Platform', 'DeFi', 'NFT'];

  // Mock circulating supply for market cap calculation
  const getCirculatingSupply = (symbol: string): number => {
    const supplies: { [key: string]: number } = {
      'BTC': 19500000,
      'ETH': 120000000,
      'BNB': 153000000,
      'XRP': 54300000000,
      'ADA': 34000000000,
      'DOGE': 132000000000,
      'LINK': 1000000000,
      'DOT': 1200000000,
      'SOL': 400000000,
      'MATIC': 10000000000
    };
    return supplies[symbol] || 1000000000;
  };

  // Fetch initial prices from Binance API
  const fetchInitialPrices = async () => {
    try {
      setIsLoading(true);
      
      // Create initial cryptocurrency data structure
      const initialCryptos = topCryptos.map((crypto) => ({
        id: crypto.id,
        name: crypto.name,
        symbol: crypto.symbol,
        icon: crypto.icon,
        price: 0,
        change24h: 0,
        volume24h: '$0',
        marketCap: '$0',
        inWatchlist: false
      }));
      
      setCryptocurrencies(initialCryptos);
      
      // Fetch data from Binance API
      const symbols = topCryptos.map(crypto => `${crypto.symbol}USDT`).join(',');
      const response = await axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbols=${JSON.stringify(symbols.split(','))}`);
      
      const updatedCryptos = initialCryptos.map(crypto => {
        const symbol = `${crypto.symbol}USDT`;
        const ticker = response.data.find((t: any) => t.symbol === symbol);
        
        if (ticker) {
          const price = parseFloat(ticker.lastPrice);
          const change24h = parseFloat(ticker.priceChangePercent);
          const volume = parseFloat(ticker.volume) * price;
          const marketCapValue = price * getCirculatingSupply(crypto.symbol);
          
          return {
            ...crypto,
            price: price,
            change24h: change24h,
            volume24h: `$${volume.toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
            marketCap: `$${marketCapValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
          };
        }
        return crypto;
      });
      
      setCryptocurrencies(updatedCryptos);
    } catch (error) {
      console.error('Error fetching initial prices:', error);
      // Fallback to initial data if API fails
      const fallbackCryptos = topCryptos.map((crypto, index) => ({
        id: crypto.id,
        name: crypto.name,
        symbol: crypto.symbol,
        icon: crypto.icon,
        price: 30000 + (index * 1000), // Fallback prices
        change24h: (Math.random() * 10) - 5, // Random changes between -5% and +5%
        volume24h: `$${(Math.random() * 1000000000).toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
        marketCap: `$${(Math.random() * 50000000000).toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
        inWatchlist: false
      }));
      setCryptocurrencies(fallbackCryptos);
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize cryptocurrency data
  useEffect(() => {
    fetchInitialPrices();
  }, []);

  // WebSocket connection for real-time updates
  useEffect(() => {
    if (cryptocurrencies.length === 0) return;

    const symbols = topCryptos.map(crypto => `${crypto.symbol.toLowerCase()}usdt@ticker`).join('/');
    ws.current = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${symbols}`);

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const ticker = data.data;
      
      setCryptocurrencies(prev => prev.map(crypto => {
        if (`${crypto.symbol}USDT` === ticker.s) {
          const newPrice = parseFloat(ticker.c);
          const newChange = parseFloat(ticker.P);
          const volume = (parseFloat(ticker.v) * newPrice);
          const marketCapValue = newPrice * getCirculatingSupply(crypto.symbol);
          
          return {
            ...crypto,
            price: newPrice,
            change24h: newChange,
            volume24h: `$${volume.toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
            marketCap: `$${marketCapValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
          };
        }
        return crypto;
      }));
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [cryptocurrencies.length]);

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

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const toggleWatchlist = (id: string) => {
    setCryptocurrencies(prev => 
      prev.map(crypto => 
        crypto.id === id 
          ? { ...crypto, inWatchlist: !crypto.inWatchlist }
          : crypto
      )
    );
  };

  const filteredCryptos = cryptocurrencies.filter(crypto => {
    const matchesSearch = crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeFilter === 'Gainers') return matchesSearch && crypto.change24h > 0;
    if (activeFilter === 'Losers') return matchesSearch && crypto.change24h < 0;
    
    return matchesSearch;
  });

  const topMovers = cryptocurrencies
    .sort((a, b) => Math.abs(b.change24h) - Math.abs(a.change24h))
    .slice(0, 4);

  return (
    <>
      <style>{`
        /* Your existing CSS styles remain the same */
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
        
        .nav-link.active {
          color: var(--primary);
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
        .markets-hero {
          padding: 180px 0 100px;
          background: linear-gradient(135deg, rgba(243, 186, 47, 0.1) 0%, rgba(0, 192, 118, 0.05) 100%);
          position: relative;
          overflow: hidden;
          text-align: center;
        }
        
        .markets-hero-content {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .markets-hero-title {
          font-size: 3.5rem;
          font-weight: 900;
          margin-bottom: 20px;
          line-height: 1.2;
        }
        
        .markets-hero-title span {
          background: var(--gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .markets-hero-subtitle {
          font-size: 1.2rem;
          color: var(--light-gray);
          margin-bottom: 30px;
        }
        
        /* Markets Content */
        .markets-content {
          padding: 80px 0;
          background-color: var(--dark-gray);
        }
        
        .markets-container {
          max-width: 1200px;
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
        
        /* Market Stats */
        .market-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }
        
        .stat-card {
          background-color: var(--medium-gray);
          border-radius: 12px;
          padding: 20px;
          text-align: center;
        }
        
        .stat-value {
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 5px;
        }
        
        .stat-label {
          font-size: 0.9rem;
          color: var(--light-gray);
        }
        
        /* Market Controls */
        .market-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          flex-wrap: wrap;
          gap: 15px;
        }
        
        .filter-buttons {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        
        .filter-btn {
          background-color: var(--medium-gray);
          border: none;
          color: var(--white);
          padding: 8px 16px;
          border-radius: 20px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        
        .filter-btn.active {
          background-color: var(--primary);
          color: var(--dark);
        }
        
        .filter-btn:hover {
          background-color: var(--primary);
          color: var(--dark);
        }
        
        .search-controls {
          display: flex;
          gap: 15px;
        }
        
        .search-control {
          background-color: var(--medium-gray);
          border: none;
          color: var(--white);
          padding: 8px 15px;
          border-radius: 8px;
        }
        
        /* Markets Table */
        .markets-table-container {
          background-color: var(--dark);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          margin-bottom: 50px;
        }
        
        .markets-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .markets-table th {
          background-color: var(--medium-gray);
          padding: 15px;
          text-align: left;
          font-weight: 600;
          color: var(--primary);
          cursor: pointer;
          user-select: none;
        }
        
        .markets-table th:hover {
          background-color: rgba(243, 186, 47, 0.1);
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
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          overflow: hidden;
        }
        
        .crypto-icon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .crypto-symbol {
          font-size: 0.8rem;
          color: var(--light-gray);
        }
        
        .positive {
          color: var(--secondary);
        }
        
        .negative {
          color: var(--accent);
        }
        
        .watchlist-btn {
          background: none;
          border: none;
          color: var(--light-gray);
          cursor: pointer;
          font-size: 16px;
          transition: color 0.3s;
        }
        
        .watchlist-btn:hover {
          color: var(--primary);
        }
        
        .watchlist-btn.active {
          color: var(--primary);
        }
        
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
        
        /* Top Movers */
        .top-movers {
          margin-bottom: 50px;
        }
        
        .movers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }
        
        .mover-card {
          background-color: var(--medium-gray);
          border-radius: 12px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 15px;
          transition: transform 0.3s;
        }
        
        .mover-card:hover {
          transform: translateY(-5px);
        }
        
        .mover-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: var(--dark);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          overflow: hidden;
        }
        
        .mover-icon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .mover-info {
          flex: 1;
        }
        
        .mover-name {
          font-weight: 600;
          margin-bottom: 5px;
        }
        
        .mover-symbol {
          font-size: 0.8rem;
          color: var(--light-gray);
        }
        
        .mover-change {
          font-weight: 700;
          font-size: 1.1rem;
        }
        
        /* Market News */
        .market-news {
          margin-bottom: 50px;
        }
        
        .news-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }
        
        .news-card {
          background-color: var(--medium-gray);
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.3s;
        }
        
        .news-card:hover {
          transform: translateY(-5px);
        }
        
        .news-image {
          height: 160px;
          background-color: var(--dark);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
          font-size: 40px;
        }
        
        .news-content {
          padding: 20px;
        }
        
        .news-title {
          font-weight: 600;
          margin-bottom: 10px;
          font-size: 1.1rem;
        }
        
        .news-excerpt {
          color: var(--light-gray);
          font-size: 0.9rem;
          margin-bottom: 15px;
        }
        
        .news-meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
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
        
        /* Responsive Design */
        @media (max-width: 992px) {
          .markets-hero-title {
            font-size: 2.8rem;
          }
          
          .section-title {
            font-size: 1.8rem;
          }
          
          .market-controls {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .search-controls {
            width: 100%;
            justify-content: space-between;
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
          
          .markets-hero-title {
            font-size: 2.2rem;
          }
          
          .section-title {
            font-size: 1.6rem;
          }
          
          .markets-table {
            display: block;
            overflow-x: auto;
          }
        }
        
        @media (max-width: 576px) {
          .markets-hero-title {
            font-size: 1.8rem;
          }
          
          .section-title {
            font-size: 1.4rem;
          }
          
          .market-stats {
            grid-template-columns: 1fr 1fr;
          }
          
          .filter-buttons {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      {/* Header */}
      

      {/* Hero Section */}
      <section className="markets-hero">
        <div className="container">
          <div className="markets-hero-content">
            <h1 className="markets-hero-title">Live <span>Market Trends</span></h1>
            <p className="markets-hero-subtitle">Track real-time cryptocurrency prices, trends, and market movements with Nexus Exchange's advanced market tools.</p>
          </div>
        </div>
      </section>

      {/* Markets Content */}
      <section className="markets-content">
        <div className="container">
          <div className="markets-container">
            {/* Market Stats */}
            <div className="market-stats">
              <div className="stat-card">
                <div className="stat-value">
                  {isLoading ? <div className="loading-spinner"></div> : `$${(cryptocurrencies.reduce((sum, crypto) => sum + (parseFloat(crypto.marketCap.replace('$', '').replace(/,/g, '')) || 0), 0) / 1e12).toFixed(2)}T`}
                </div>
                <div className="stat-label">Total Market Cap</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">
                  {isLoading ? <div className="loading-spinner"></div> : `$${(cryptocurrencies.reduce((sum, crypto) => sum + (parseFloat(crypto.volume24h.replace('$', '').replace(/,/g, '')) || 0), 0) / 1e9).toFixed(1)}B`}
                </div>
                <div className="stat-label">24h Trading Volume</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">
                  {isLoading ? <div className="loading-spinner"></div> : 
                    cryptocurrencies.length > 0 ? 
                    `${((cryptocurrencies.find(c => c.symbol === 'BTC')?.price || 0) * getCirculatingSupply('BTC') / cryptocurrencies.reduce((sum, crypto) => sum + (parseFloat(crypto.marketCap.replace('$', '').replace(/,/g, '')) || 0), 0) * 100).toFixed(1)}%` 
                    : '0%'
                  }
                </div>
                <div className="stat-label">Bitcoin Dominance</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">10,000+</div>
                <div className="stat-label">Active Cryptocurrencies</div>
              </div>
            </div>

            {/* Market Controls */}
            <div className="market-controls">
              <div className="filter-buttons">
                {filterButtons.map(filter => (
                  <button
                    key={filter}
                    className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                    onClick={() => handleFilterClick(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              
              <div className="search-controls">
                <select 
                  className="search-control" 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <input 
                  type="text" 
                  className="search-control" 
                  placeholder="Search crypto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Markets Table */}
            <h2 className="section-title">Top <span>Cryptocurrencies</span></h2>
            <div className="markets-table-container">
              <table className="markets-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>24h Change</th>
                    <th>24h Volume</th>
                    <th>Market Cap</th>
                    <th>Last 7 Days</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={8} style={{ textAlign: 'center', padding: '40px' }}>
                        <div className="loading-spinner" style={{ margin: '0 auto' }}></div>
                        <div style={{ marginTop: '10px' }}>Loading market data...</div>
                      </td>
                    </tr>
                  ) : (
                    filteredCryptos.map((crypto, index) => (
                      <tr key={crypto.id}>
                        <td>{index + 1}</td>
                        <td>
                          <div className="crypto-name">
                            <div className="crypto-icon">
                              <img src={crypto.icon} alt={crypto.name} />
                            </div>
                            <div>
                              <div>{crypto.name}</div>
                              <div className="crypto-symbol">{crypto.symbol}</div>
                            </div>
                          </div>
                        </td>
                        <td>${crypto.price > 1 ? crypto.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : crypto.price.toFixed(4)}</td>
                        <td className={crypto.change24h >= 0 ? 'positive' : 'negative'}>
                          {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                        </td>
                        <td>{crypto.volume24h}</td>
                        <td>{crypto.marketCap}</td>
                        <td>
                          <div 
                            style={{ 
                              width: '80px', 
                              height: '30px', 
                              background: `linear-gradient(90deg, ${crypto.change24h >= 0 ? 'var(--secondary)' : 'var(--accent)'} ${Math.abs(crypto.change24h) * 5}%, var(--medium-gray) ${100 - Math.abs(crypto.change24h) * 5}%)`, 
                              borderRadius: '4px' 
                            }}
                          ></div>
                        </td>
                        <td>
                          <button 
                            className={`watchlist-btn ${crypto.inWatchlist ? 'active' : ''}`}
                            onClick={() => toggleWatchlist(crypto.id)}
                            title={crypto.inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
                          >
                            <i className={crypto.inWatchlist ? 'fas fa-star' : 'far fa-star'}></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Top Movers */}
            <h2 className="section-title">Today's <span>Top Movers</span></h2>
            <div className="top-movers">
              <div className="movers-grid">
                {topMovers.map(mover => (
                  <div key={mover.id} className="mover-card">
                    <div className="mover-icon">
                      <img src={mover.icon} alt={mover.name} />
                    </div>
                    <div className="mover-info">
                      <div className="mover-name">{mover.name}</div>
                      <div className="mover-symbol">{mover.symbol}</div>
                    </div>
                    <div className={`mover-change ${mover.change24h >= 0 ? 'positive' : 'negative'}`}>
                      {mover.change24h >= 0 ? '+' : ''}{mover.change24h.toFixed(2)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Market News */}
            <h2 className="section-title">Crypto <span>Market News</span></h2>
            <div className="market-news">
              <div className="news-grid">
                {marketNews.map((news, index) => (
                  <div key={index} className="news-card">
                    <div className="news-image">
                     <img src={news.icon} style={{width :'100%', height:'100%'}} />
                    </div>
                    <div className="news-content">
                      <h3 className="news-title">{news.title}</h3>
                      <p className="news-excerpt">{news.excerpt}</p>
                      <div className="news-meta">
                        <span>{news.category}</span>
                        <span>{news.timeAgo}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


    </>
  );
};

export default Market;