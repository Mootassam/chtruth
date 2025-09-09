import React, { useState, useEffect, useCallback } from "react";
import SubHeader from "src/view/shared/Header/SubHeader";
import axios from "axios";

function Conversion() {
  // State for conversion values
  const [fromCurrency, setFromCurrency] = useState('USDT');
  const [toCurrency, setToCurrency] = useState('BTC');
  const [fromAmount, setFromAmount] = useState(1);
  const [toAmount, setToAmount] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('from');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currencyChangeLoading, setCurrencyChangeLoading] = useState(false);
  const [error, setError] = useState(null);
  const [prices, setPrices] = useState({});

  // Available currencies with their Binance symbols
  const currencies = [
    { code: 'BTC', name: 'Bitcoin', icon: 'fab fa-btc', color: '#F3BA2F', symbol: 'BTCUSDT' },
    { code: 'ETH', name: 'Ethereum', icon: 'fab fa-ethereum', color: '#627EEA', symbol: 'ETHUSDT' },
    { code: 'BNB', name: 'Binance Coin', icon: 'fas fa-coins', color: '#F3BA2F', symbol: 'BNBUSDT' },
    { code: 'SOL', name: 'Solana', icon: 'fas fa-sun', color: '#00FFA3', symbol: 'SOLUSDT' },
    { code: 'USDT', name: 'Tether', icon: 'fas fa-dollar-sign', color: '#26A17B', symbol: 'USDT' },
    { code: 'ADA', name: 'Cardano', icon: 'fas fa-chart-line', color: '#0033AD', symbol: 'ADAUSDT' },
    { code: 'XRP', name: 'Ripple', icon: 'fas fa-exchange-alt', color: '#23292F', symbol: 'XRPUSDT' },
    { code: 'DOGE', name: 'Dogecoin', icon: 'fas fa-dog', color: '#C2A633', symbol: 'DOGEUSDT' },
    { code: 'DOT', name: 'Polkadot', icon: 'fas fa-circle', color: '#E6007A', symbol: 'DOTUSDT' },
    { code: 'AVAX', name: 'Avalanche', icon: 'fas fa-mountain', color: '#E84142', symbol: 'AVAXUSDT' }
  ];

  // Fetch prices from Binance API
  const fetchPrices = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Get all symbols from our currencies (excluding USDT)
      const symbols = currencies
        .filter(currency => currency.code !== 'USDT')
        .map(currency => currency.symbol);
      
      // Make API request to Binance for all symbols
      const response = await axios.get('https://api.binance.com/api/v3/ticker/price', {
        params: { symbols: JSON.stringify(symbols) }
      });
      
      // Transform the response into a more usable format
      const priceData = {};
      response.data.forEach(item => {
        // Extract the base currency from the symbol (e.g., BTC from BTCUSDT)
        const baseCurrency = item.symbol.replace('USDT', '');
        priceData[baseCurrency] = parseFloat(item.price);
      });
      
      // Add USDT which is always 1:1 with itself
      priceData['USDT'] = 1;
      
      setPrices(priceData);
    } catch (err) {
      console.error('Error fetching prices from Binance:', err);
      setError('Failed to fetch current prices. Please try again later.');
    } finally {
      setIsLoading(false);
      setCurrencyChangeLoading(false);
    }
  }, [currencies]);

  // Calculate conversion rate based on current prices
  const calculateConversionRate = useCallback(() => {
    if (!prices[fromCurrency] || !prices[toCurrency]) {
      return;
    }
    
    // Convert between two cryptocurrencies
    const fromPrice = prices[fromCurrency];
    const toPrice = prices[toCurrency];
    
    if (fromPrice && toPrice) {
      const rate = fromPrice / toPrice;
      setConversionRate(rate);
      setToAmount(fromAmount * rate);
    }
  }, [fromCurrency, toCurrency, fromAmount, prices]);

  // Fetch prices on component mount and when currencies change
  useEffect(() => {
    fetchPrices();
    
    // Set up interval to fetch prices every 30 seconds
    const intervalId = setInterval(fetchPrices, 30000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Fetch prices when currency changes
  useEffect(() => {
    if (Object.keys(prices).length > 0) {
      setCurrencyChangeLoading(true);
      fetchPrices();
    }
  }, [fromCurrency, toCurrency]);

  // Recalculate conversion when inputs change
  useEffect(() => {
    calculateConversionRate();
  }, [calculateConversionRate]);

  // Handle from amount change
  const handleFromAmountChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setFromAmount(value);
  };

  // Handle currency selection
  const selectCurrency = (code) => {
    if (modalType === 'from') {
      setFromCurrency(code);
    } else {
      setToCurrency(code);
    }
    setShowModal(false);
    setSearchTerm('');
  };

  // Open modal for currency selection
  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  // Switch currencies
  const switchCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  // Perform conversion
  const performConversion = () => {
    alert(`Converting ${fromAmount} ${fromCurrency} to ${toAmount.toFixed(8)} ${toCurrency}`);
    // In a real app, this would submit a transaction to your backend
  };

  // Filter currencies based on search
  const filteredCurrencies = currencies.filter(currency => 
    currency.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
    currency.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current currency object
  const getCurrency = (code) => currencies.find(c => c.code === code);

  // Get current price for a currency in USDT
  const getCurrencyPrice = (code) => {
    if (prices[code]) {
      return prices[code];
    }
    return null;
  };

  return (
    <>
      <div className="container">
        {/* Header */}
        <SubHeader title="Convert Crypto" />
        
        {/* Loading and error indicators */}
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <span>Loading latest prices...</span>
          </div>
        )}
        
        {error && (
          <div className="error-banner">
            <i className="fas fa-exclamation-triangle"></i>
            <span>{error}</span>
          </div>
        )}
        
        {/* Conversion Box */}
        <div className="conversion-box">
          {/* From Amount */}
          <div className="amount-input">
            <div className="input-label">You send</div>
            <div className="input-field">
              <input
                type="number"
                value={fromAmount}
                onChange={handleFromAmountChange}
                min={0}
                step="0.00000001"
              />
              <div className="currency-selector" onClick={() => openModal('from')}>
                <div className="currency-icon" style={{ backgroundColor: getCurrency(fromCurrency)?.color }}>
                  <i className={getCurrency(fromCurrency)?.icon} />
                </div>
                <div className="currency-name">{fromCurrency}</div>
                <i className="fas fa-chevron-down" />
              </div>
            </div>
            <div className="currency-price">
              {getCurrencyPrice(fromCurrency) ? (
                <>1 {fromCurrency} = ${getCurrencyPrice(fromCurrency).toLocaleString('en-US', { maximumFractionDigits: 2 })}</>
              ) : (
                <>&nbsp;</>
              )}
            </div>
          </div>
          
          {/* Switch Button */}
          <div className="switch-container">
            <div className="switch-btn" onClick={switchCurrencies}>
              <i className="fas fa-exchange-alt" />
            </div>
          </div>
          
          {/* To Amount */}
          <div className="amount-input">
            <div className="input-label">You receive</div>
            <div className="input-field">
              <input
                type="number"
                value={toAmount.toFixed(8)}
                readOnly
              />
              <div className="currency-selector" onClick={() => openModal('to')}>
                <div className="currency-icon" style={{ backgroundColor: getCurrency(toCurrency)?.color }}>
                  <i className={getCurrency(toCurrency)?.icon} />
                </div>
                <div className="currency-name">{toCurrency}</div>
                <i className="fas fa-chevron-down" />
              </div>
            </div>
            <div className="currency-price">
              {getCurrencyPrice(toCurrency) ? (
                <>1 {toCurrency} = ${getCurrencyPrice(toCurrency).toLocaleString('en-US', { maximumFractionDigits: 2 })}</>
              ) : (
                <>&nbsp;</>
              )}
            </div>
          </div>
          
          {/* Conversion Result */}
          <div className="conversion-result">
            <div className="result-label">Estimated conversion</div>
            <div className="result-amount">
              1 {fromCurrency} = {conversionRate.toFixed(8)} {toCurrency}
              {currencyChangeLoading && <span className="mini-loader"></span>}
            </div>
            <div className="result-equivalent">
              ${(fromAmount * (getCurrencyPrice(fromCurrency) || 0)).toLocaleString('en-US', { maximumFractionDigits: 2 })}
            </div>
          </div>
          
          {/* Convert Button */}
          <button className="convert-btn" onClick={performConversion} disabled={isLoading || currencyChangeLoading}>
            {isLoading || currencyChangeLoading ? 'Updating Prices...' : 'Convert Now'}
          </button>
          
          {/* Last updated time */}
          <div className="last-updated">
            <i className="fas fa-sync-alt"></i>
            Prices update every 30 seconds
          </div>
        </div>
      </div>
      
      {/* Currency Selection Modal */}
      {showModal && (
        <div className="currency-modal">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">Select Currency</div>
              <div className="close-modal" onClick={() => setShowModal(false)}>×</div>
            </div>
            
            <div className="search-box">
              <i className="fas fa-search" />
              <input
                type="text"
                placeholder="Search currencies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <ul className="currency-list">
              {filteredCurrencies.map(currency => (
                <li
                  key={currency.code}
                  className="currency-item"
                  onClick={() => selectCurrency(currency.code)}
                >
                  <div
                    className="currency-item-icon"
                    style={{ backgroundColor: currency.color }}
                  >
                    <i className={currency.icon} />
                  </div>
                  <div className="currency-item-info">
                    <div className="currency-item-name">{currency.code}</div>
                    <div className="currency-item-full">{currency.name}</div>
                  </div>
                  <div className="currency-item-price">
                    {getCurrencyPrice(currency.code) ? (
                      <>${getCurrencyPrice(currency.code).toLocaleString('en-US', { maximumFractionDigits: 2 })}</>
                    ) : (
                      <>&nbsp;</>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      <style>{`
        /* All the CSS styles from your original code */
        .conversion-box {
            padding: 0px 15px;
            position: relative;
        }
        
        .amount-input {
            background-color: #1A1A1A;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
        }
        
        .input-label {
            color: #AAAAAA;
            font-size: 14px;
            margin-bottom: 8px;
        }
        
        .input-field {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .input-field input {
            background: transparent;
            border: none;
            color: white;
            font-size: 24px;
            font-weight: bold;
            width: 70%;
            outline: none;
        }
        
        .currency-selector {
            display: flex;
            align-items: center;
            background-color: #2A2A2A;
            padding: 8px 12px;
            border-radius: 8px;
            cursor: pointer;
        }
        
        .currency-icon {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background-color: #F3BA2F;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 8px;
        }
        
        .currency-name {
            font-weight: bold;
            margin-right: 5px;
        }
        
        .currency-price {
            color: #AAAAAA;
            font-size: 12px;
            margin-top: 8px;
        }
        
        /* Switch Button */
        .switch-container {
            display: flex;
            justify-content: center;
            margin: 10px 0 20px;
        }
        
        .switch-btn {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #2A2A2A;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            border: 2px solid #000;
            transition: all 0.3s ease;
        }
        
        .switch-btn:hover {
            background-color: #F3BA2F;
            transform: rotate(180deg);
        }
        
        .switch-btn i {
            color: #F3BA2F;
            font-size: 18px;
        }
        
        .switch-btn:hover i {
            color: #000;
        }
        
        /* Conversion Result */
        .conversion-result {
            background: linear-gradient(145deg, #1A1A1A, #2A2A2A);
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 25px;
            text-align: center;
            position: relative;
        }
        
        .result-label {
            color: #AAAAAA;
            font-size: 14px;
            margin-bottom: 10px;
        }
        
        .result-amount {
            font-size: 32px;
            font-weight: bold;
            color: #F3BA2F;
            margin-bottom: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }
        
        .result-equivalent {
            color: #AAAAAA;
            font-size: 14px;
        }
        
        /* Convert Button */
        .convert-btn {
            background-color: #F3BA2F;
            color: #000;
            border: none;
            border-radius: 12px;
            padding: 18px;
            font-size: 16px;
            font-weight: bold;
            width: 100%;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        
        .convert-btn:hover:not(:disabled) {
            background-color: #E0A91C;
        }
        
        .convert-btn:disabled {
            background-color: #666;
            cursor: not-allowed;
        }
        
        /* Currency Selector Modal */
        .currency-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            z-index: 1000;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .modal-content {
            background-color: #1A1A1A;
            width: 90%;
            max-width: 400px;
            border-radius: 16px;
            padding: 20px;
            max-height: 80vh;
            overflow-y: auto;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        
        .modal-title {
            font-size: 18px;
            font-weight: bold;
        }
        
        .close-modal {
            color: #AAAAAA;
            font-size: 24px;
            cursor: pointer;
        }
        
        .search-box {
            background-color: #2A2A2A;
            border-radius: 8px;
            padding: 12px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
        }
        
        .search-box input {
            background: transparent;
            border: none;
            color: white;
            width: 100%;
            outline: none;
            margin-left: 10px;
        }
        
        .currency-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .currency-item {
            display: flex;
            align-items: center;
            padding: 15px 10px;
            border-bottom: 1px solid #2A2A2A;
            cursor: pointer;
        }
        
        .currency-item:hover {
            background-color: #2A2A2A;
        }
        
        .currency-item-icon {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background-color: #F3BA2F;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 15px;
        }
        
        .currency-item-info {
            flex: 1;
        }
        
        .currency-item-name {
            font-weight: bold;
            margin-bottom: 4px;
        }
        
        .currency-item-full {
            color: #AAAAAA;
            font-size: 12px;
        }
        
        .currency-item-price {
            color: #F3BA2F;
            font-size: 14px;
            font-weight: bold;
        }
        
        /* Loading overlay */
        .loading-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            background-color: rgba(0, 0, 0, 0.7);
            color: #F3BA2F;
            padding: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10;
        }
        
        .loading-spinner {
            border: 2px solid #333;
            border-top: 2px solid #F3BA2F;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            animation: spin 1s linear infinite;
            margin-right: 10px;
        }
        
        .mini-loader {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid rgba(243, 186, 47, 0.3);
            border-radius: 50%;
            border-top-color: #F3BA2F;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        /* Error banner */
        .error-banner {
            background-color: #FF6838;
            color: white;
            padding: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 15px;
            border-radius: 8px;
        }
        
        .error-banner i {
            margin-right: 10px;
        }
        
        /* Last updated */
        .last-updated {
            text-align: center;
            color: #AAAAAA;
            font-size: 12px;
            margin-top: 15px;
        }
        
        .last-updated i {
            margin-right: 5px;
        }
        
        /* Responsive adjustments */
        @media (max-width: 480px) {
            .result-amount {
                font-size: 28px;
            }
            
            .input-field input {
                font-size: 20px;
            }
        }
      `}</style>
    </>
  );
}

export default Conversion;