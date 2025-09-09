import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import SubHeader from "src/view/shared/Header/SubHeader";
import axios from "axios";

// Interface for Binance ticker data
interface BinanceTicker {
  s: string; // Symbol
  c: string; // Last price
  P: string; // Price change percent
  v: string; // Total traded base asset volume
  p: string; // Price change
  q: string; // Quote asset volume (USDT volume)
}

// Interface for cryptocurrency data
interface CryptoData {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changePercent: string;
  volume: string;
  volumeFormatted: string;
  isPositive: boolean;
  quoteVolume: number; // For sorting by market value
  numericPrice: number; // For conversion calculations
}

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cryptoData, setCryptoData] = useState<{ [key: string]: CryptoData }>({});
  const [lastConversionUpdate, setLastConversionUpdate] = useState<number>(Date.now());
  const ws = useRef<WebSocket | null>(null);
  const conversionLock = useRef(false);

  // Mock user balances for each currency
  const [balances] = useState({
    USDT: 1250.75,
    BTC: 0.35,
    ETH: 2.5,
    BNB: 15.2,
    SOL: 8.7,
    ADA: 1200,
    XRP: 850,
    DOGE: 5000,
    DOT: 95.5,
    AVAX: 32.8
  });

  // Fetch initial market data
  useEffect(() => {
    const fetchAllPrices = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('https://api.binance.com/api/v3/ticker/24hr');
        
        // Process only USDT pairs
        const usdtPairs = response.data.filter((item: any) => 
          item.symbol.endsWith('USDT') && 
          !item.symbol.includes('UP') && 
          !item.symbol.includes('DOWN') &&
          !item.symbol.includes('BEAR') && 
          !item.symbol.includes('BULL')
        );
        
        // Sort by quoteVolume (market value) to get most valuable pairs
        usdtPairs.sort((a: any, b: any) => parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume));
        
        // Take top 200 pairs by market value
        const topPairs = usdtPairs.slice(0, 200);
        
        const formattedData: { [key: string]: CryptoData } = {};
        
        topPairs.forEach((item: any) => {
          const symbol = item.symbol;
          const baseSymbol = symbol.replace("USDT", "");
          const isPositive = !item.priceChangePercent.startsWith("-");
          const changePercent = Math.abs(Number(item.priceChangePercent)).toFixed(2);
          const numericPrice = parseFloat(item.lastPrice);
          
          // Format volume
          const volumeNum = Number(item.volume);
          let volumeFormatted = volumeNum.toFixed(0);
          if (volumeNum >= 1000000000) {
            volumeFormatted = (volumeNum / 1000000000).toFixed(1) + "B";
          } else if (volumeNum >= 1000000) {
            volumeFormatted = (volumeNum / 1000000).toFixed(1) + "M";
          }
          
          formattedData[symbol] = {
            symbol,
            name: `${baseSymbol}/USDT`,
            price: numericPrice.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: numericPrice < 1 ? 6 : 4,
            }),
            change: item.priceChange,
            changePercent: changePercent,
            volume: item.volume,
            volumeFormatted: volumeFormatted,
            isPositive: isPositive,
            quoteVolume: parseFloat(item.quoteVolume),
            numericPrice: numericPrice
          };
        });
        
        // Add USDT manually since it's not in the pairs
        formattedData['USDT'] = {
          symbol: 'USDT',
          name: 'USDT/USDT',
          price: '1.00',
          change: '0',
          changePercent: '0.00',
          volume: '0',
          volumeFormatted: '0',
          isPositive: true,
          quoteVolume: 0,
          numericPrice: 1
        };
        
        setCryptoData(formattedData);
        setIsLoading(false);
        
      } catch (error) {
        console.error("Error fetching market data:", error);
        setError('Failed to fetch market data. Please try again later.');
        setIsLoading(false);
      }
    };
    
    fetchAllPrices();
  }, []);

  // Setup WebSocket for real-time updates
  useEffect(() => {
    // Create WebSocket connection for all tickers
    ws.current = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr');
    
    ws.current.onmessage = (event) => {
      const data: BinanceTicker[] = JSON.parse(event.data);
      
      // Update crypto data with real-time information
      setCryptoData(prevData => {
        const newData = {...prevData};
        
        data.forEach((ticker) => {
          if (newData[ticker.s]) {
            const isPositive = !ticker.P.startsWith("-");
            const changePercent = Math.abs(Number(ticker.P)).toFixed(2);
            const numericPrice = parseFloat(ticker.c);
            
            // Format volume
            const volumeNum = Number(ticker.v);
            let volumeFormatted = volumeNum.toFixed(0);
            if (volumeNum >= 1000000000) {
              volumeFormatted = (volumeNum / 1000000000).toFixed(1) + "B";
            } else if (volumeNum >= 1000000) {
              volumeFormatted = (volumeNum / 1000000).toFixed(1) + "M";
            }
            
            newData[ticker.s] = {
              ...newData[ticker.s],
              price: numericPrice.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: numericPrice < 1 ? 6 : 4,
              }),
              change: ticker.p,
              changePercent: changePercent,
              volume: ticker.v,
              volumeFormatted: volumeFormatted,
              isPositive: isPositive,
              quoteVolume: parseFloat(ticker.q),
              numericPrice: numericPrice
            };
          }
        });
        
        return newData;
      });
    };
    
    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
    
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  // Get available currencies from cryptoData
  const availableCurrencies = useMemo(() => {
    const currencies = Object.values(cryptoData).map(item => {
      const code = item.symbol.replace('USDT', '');
      return {
        code,
        name: code,
        icon: 'fas fa-coins',
        color: '#F3BA2F',
        symbol: item.symbol,
        price: item.numericPrice
      };
    });
    
    // Add USDT if not already present
    if (!currencies.find(c => c.code === 'USDT')) {
      currencies.push({
        code: 'USDT',
        name: 'USDT',
        icon: 'fas fa-dollar-sign',
        color: '#26A17B',
        symbol: 'USDT',
        price: 1
      });
    }
    
    return currencies;
  }, [cryptoData]);

  // Calculate conversion rate based on current prices
  const calculateConversionRate = useCallback(() => {
    if (conversionLock.current) return;
    
    const fromCurrencyData = availableCurrencies.find(c => c.code === fromCurrency);
    const toCurrencyData = availableCurrencies.find(c => c.code === toCurrency);
    
    if (!fromCurrencyData || !toCurrencyData) {
      return;
    }
    
    // Convert between two cryptocurrencies
    const fromPrice = fromCurrencyData.price;
    const toPrice = toCurrencyData.price;
    
    if (fromPrice && toPrice) {
      const rate = fromPrice / toPrice;
      setConversionRate(rate);
      setToAmount(fromAmount * rate);
      setLastConversionUpdate(Date.now());
    }
  }, [fromCurrency, toCurrency, fromAmount, availableCurrencies]);

  // Recalculate conversion when inputs change
  useEffect(() => {
    calculateConversionRate();
  }, [calculateConversionRate]);

  // Throttle conversion updates to prevent UI lag
  useEffect(() => {
    const interval = setInterval(() => {
      calculateConversionRate();
    }, 1000); // Update conversion rate once per second
    
    return () => clearInterval(interval);
  }, [calculateConversionRate]);

  // Handle from amount change
  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setFromAmount(value);
  };

  // Set max amount based on balance
  const handleSetMaxAmount = () => {
    setFromAmount(balances[fromCurrency as keyof typeof balances] || 0);
  };

  // Handle currency selection
  const selectCurrency = (code: string) => {
    if (modalType === 'from') {
      setFromCurrency(code);
    } else {
      setToCurrency(code);
    }
    setShowModal(false);
    setSearchTerm('');
  };

  // Open modal for currency selection
  const openModal = (type: string) => {
    setModalType(type);
    setShowModal(true);
  };

  // Switch currencies
  const switchCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  // Perform conversion - lock rates during transaction
  const performConversion = () => {
    conversionLock.current = true;
    
    // Show conversion confirmation
    alert(`Converting ${fromAmount} ${fromCurrency} to ${toAmount.toFixed(8)} ${toCurrency}`);
    
    // In a real app, this would submit a transaction to your backend
    // After transaction is complete, unlock conversion
    setTimeout(() => {
      conversionLock.current = false;
      calculateConversionRate();
    }, 3000); // Simulate transaction time
  };

  // Filter currencies based on search
  const filteredCurrencies = availableCurrencies.filter(currency => 
    currency.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
    currency.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current currency object
  const getCurrency = (code: string) => availableCurrencies.find(c => c.code === code);

  // Get current price for a currency in USDT
  const getCurrencyPrice = (code: string) => {
    const currency = getCurrency(code);
    return currency ? currency.price : null;
  };

  // Loading placeholder for currency items
  const renderCurrencyPlaceholders = () => {
    return [...Array(10)].map((_, index) => (
      <div key={index} className="currency-item-placeholder">
        <div className="currency-item-icon-placeholder shimmer"></div>
        <div className="currency-item-info-placeholder">
          <div className="placeholder-line shimmer" style={{width: '60%', height: '16px', marginBottom: '8px'}}></div>
          <div className="placeholder-line shimmer" style={{width: '40%', height: '12px'}}></div>
        </div>
        <div className="currency-item-price-placeholder">
          <div className="placeholder-line shimmer" style={{width: '70px', height: '16px', marginBottom: '8px'}}></div>
          <div className="placeholder-line shimmer" style={{width: '50px', height: '12px'}}></div>
        </div>
      </div>
    ));
  };

  // Check if conversion is up-to-date (within last 3 seconds)
  const isConversionRecent = Date.now() - lastConversionUpdate < 3000;

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
            <div className="input-header">
              <div className="input-label">You send</div>
              <div className="balance-display">
                Balance: {balances[fromCurrency as keyof typeof balances] || 0} {fromCurrency}
                <button className="max-button" onClick={handleSetMaxAmount}>MAX</button>
              </div>
            </div>
            <div className="input-field">
              <input
                type="number"
                value={fromAmount}
                onChange={handleFromAmountChange}
                min={0}
                step="0.00000001"
              />
              <div className="currency-selector" onClick={() => openModal('from')}>
                <div className="currency-icon" style={{ backgroundColor: getCurrency(fromCurrency)?.color || '#F3BA2F' }}>
          <img
                        src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${
                          fromCurrency?.split("/")[0]
                        }.png`}
                        style={{ width: 25, height: 25 }}
                        alt={ fromCurrency?.split("/")[0]}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://via.placeholder.com/40/3a3a3a/ffffff?text=${crypto.name.split("/")[0].charAt(0)}`;
                        }}
                      />
                </div>
                <div className="currency-name">{fromCurrency}</div>
                <i className="fas fa-chevron-down" />
              </div>
            </div>
            <div className="currency-price">
              {getCurrencyPrice(fromCurrency) ? (
                <>1 {fromCurrency} = ${getCurrencyPrice(fromCurrency)?.toLocaleString('en-US', { maximumFractionDigits: 2 })}</>
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
            <div className="input-header">
              <div className="input-label">You receive</div>
              <div className="balance-display">
                Balance: {balances[toCurrency as keyof typeof balances] || 0} {toCurrency}
              </div>
            </div>
            <div className="input-field">
              <input
                type="number"
                value={toAmount.toFixed(8)}
                readOnly
              />
              <div className="currency-selector" onClick={() => openModal('to')}>
                <div className="currency-icon" style={{ backgroundColor: getCurrency(toCurrency)?.color || '#F3BA2F' }}>
                   <img
                        src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${
                          toCurrency?.split("/")[0]
                        }.png`}
                        style={{ width: 25, height: 25 }}
                        alt={ toCurrency?.split("/")[0]}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://via.placeholder.com/40/3a3a3a/ffffff?text=${crypto.name.split("/")[0].charAt(0)}`;
                        }}
                      />
                </div>
                <div className="currency-name">{toCurrency}</div>
                <i className="fas fa-chevron-down" />
              </div>
            </div>
            <div className="currency-price">
              {getCurrencyPrice(toCurrency) ? (
                <>1 {toCurrency} = ${getCurrencyPrice(toCurrency)?.toLocaleString('en-US', { maximumFractionDigits: 2 })}</>
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
              {!isConversionRecent && <span className="mini-loader"></span>}
            </div>
            <div className="result-equivalent">
              ${(fromAmount * (getCurrencyPrice(fromCurrency) || 0)).toLocaleString('en-US', { maximumFractionDigits: 2 })}
            </div>
          </div>
          
          {/* Convert Button */}
          <button 
            className="convert-btn" 
            onClick={performConversion} 
            disabled={isLoading || conversionLock.current}
          >
            {conversionLock.current ? 'Processing...' : 'Convert Now'}
          </button>
          
          {/* Last updated time */}
          <div className="last-updated">
            <i className="fas fa-sync-alt"></i>
            Prices update in real-time
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
              {isLoading ? renderCurrencyPlaceholders() : (
                filteredCurrencies.map(currency => (
                  <li
                    key={currency.code}
                    className="currency-item"
                    onClick={() => selectCurrency(currency.code)}
                  >
                    <div
                      className="currency-item-icon"
                      style={{ backgroundColor: currency.color }}
                    >
                        <img
                        src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${
                          currency.name.split("/")[0]
                        }.png`}
                        style={{ width: 40, height: 40 }}
                        alt={currency.name.split("/")[0]}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://via.placeholder.com/40/3a3a3a/ffffff?text=${crypto.name.split("/")[0].charAt(0)}`;
                        }}
                      />
                      {/* <i className={currency.icon} /> */}
                    </div>
                    <div className="currency-item-info">
                      <div className="currency-item-name">{currency.code}</div>
                      <div className="currency-item-full">{currency.name}</div>
                    </div>
                    <div className="currency-item-details">
                      <div className="currency-item-price">
                        ${currency.price.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                      </div>
                      <div className="currency-item-balance">
                        Balance: {balances[currency.code as keyof typeof balances] || 0} {currency.code}
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      )}
      
      <style>{`
        /* Shimmer animation for loading placeholders */
        @keyframes shimmer {
          0% {
            background-position: -468px 0;
          }
          100% {
            background-position: 468px 0;
          }
        }
        
        .shimmer {
          animation-duration: 1.5s;
          animation-fill-mode: forwards;
          animation-iteration-count: infinite;
          animation-name: shimmer;
          animation-timing-function: linear;
          background: #2A2A2A;
          background: linear-gradient(to right, #2A2A2A 8%, #333333 18%, #2A2A2A 33%);
          background-size: 800px 104px;
          position: relative;
          border-radius: 4px;
        }
        
        .currency-item-placeholder {
          display: flex;
          align-items: center;
          padding: 15px 10px;
          border-bottom: 1px solid #2A2A2A;
        }
        
        .currency-item-icon-placeholder {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          margin-right: 15px;
        }
        
        .currency-item-info-placeholder {
          flex: 1;
        }
        
        .currency-item-price-placeholder {
          text-align: right;
        }
        
        .placeholder-line {
          border-radius: 4px;
          margin-bottom: 8px;
        }
        
        .container {
          max-width: 400px;
          margin: 0 auto;
          padding: 0px 15px;
      
        }
        
        .conversion-box {
            position: relative;
        }
        
        .amount-input {
            background-color: #1A1A1A;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
        }
        
        .input-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        
        .input-label {
            color: #AAAAAA;
            font-size: 14px;
        }
        
        .balance-display {
          color: #777;
          font-size: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .max-button {
          background-color: #2A2A2A;
          color: #F3BA2F;
          border: 1px solid #F3BA2F;
          border-radius: 4px;
          padding: 2px 6px;
          font-size: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .max-button:hover {
          background-color: #F3BA2F;
          color: #000;
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
        
        .currency-item-details {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        
        .currency-item-price {
            color: #F3BA2F;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 4px;
        }
        
        .currency-item-balance {
          color: #777;
          font-size: 11px;
        }
        
/* Fullscreen loading overlay */
.loading-overlay {
    position: fixed;       /* stay on top of everything */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;          /* full height */
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    color: #F3BA2F;
    font-size: 20px;
    font-weight: bold;
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
            
            .input-header {
              flex-direction: column;
              align-items: flex-start;
              gap: 4px;
            }
            
            .currency-item {
              flex-direction: column;
              align-items: flex-start;
            }
            
            .currency-item-details {
              align-items: flex-start;
              margin-top: 8px;
            }
        }
      `}</style>
    </>
  );
}

export default Conversion;