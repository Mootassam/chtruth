import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import SubHeader from "src/view/shared/Header/SubHeader";
import axios from "axios";
import userSelectors from "src/modules/user/userSelectors";
import assetsListSelectors from "src/modules/assets/list/assetsListSelectors";
import { useDispatch, useSelector } from "react-redux";
import assetsFormAction from "src/modules/assets/form/assetsFormActions";
import authSelectors from "src/modules/auth/authSelectors";
import assetsActions from "src/modules/assets/list/assetsListActions";
import selector from "src/modules/assets/form/assetsFormSelectors";
import SuccessModalComponent from "src/view/shared/modals/sucessModal";

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
  const dispatch = useDispatch();
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const [fromCurrency, setFromCurrency] = useState("USDT");
  const [toCurrency, setToCurrency] = useState("BTC");
  const [fromAmount, setFromAmount] = useState(1);
  const [toAmount, setToAmount] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("from");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const selectModal = useSelector(selector.selectModal)
  const [cryptoData, setCryptoData] = useState<{ [key: string]: CryptoData }>(
    {}
  );
  const [lastConversionUpdate, setLastConversionUpdate] = useState<number>(
    Date.now()
  );
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [conversionFee, setConversionFee] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [isConverting, setIsConverting] = useState(false);
  const assetsBalance = useSelector(assetsListSelectors.selectRows);
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>(
    {}
  );

  const ws = useRef<WebSocket | null>(null);
  const conversionLock = useRef(false);

  // Mock user balances for each currency
  const [balances, setBalances] = useState<{ [key: string]: number }>({});

  // Fixed: Properly initialize and persist balances
  useEffect(() => {
    const initializeBalances = () => {
      if (assetsBalance?.length) {
        const formatted = assetsBalance.reduce(
          (acc: { [key: string]: number }, item) => {
            acc[item.symbol] = item.amount;
            return acc;
          },
          {}
        );
        setBalances(formatted);
      }
    };

    initializeBalances();
  }, [assetsBalance]);

  // Fixed: Add effect to refetch assets when component mounts
  useEffect(() => {
    dispatch(assetsActions.doFetch());
  }, [dispatch]);

  // Check if user has sufficient balance
  const hasSufficientBalance = useMemo(() => {
    if (!fromCurrency || fromAmount <= 0) return false;
    const balance = balances[fromCurrency] || 0;
    return fromAmount <= balance;
  }, [fromAmount, fromCurrency, balances]);

  // Fetch initial market data
  useEffect(() => {
    const fetchAllPrices = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://api.binance.com/api/v3/ticker/24hr"
        );

        // Process only USDT pairs
        const usdtPairs = response.data.filter(
          (item: any) =>
            item.symbol.endsWith("USDT") &&
            !item.symbol.includes("UP") &&
            !item.symbol.includes("DOWN") &&
            !item.symbol.includes("BEAR") &&
            !item.symbol.includes("BULL")
        );

        // Sort by quoteVolume (market value) to get most valuable pairs
        usdtPairs.sort(
          (a: any, b: any) =>
            parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume)
        );

        // Take top 200 pairs by market value
        const topPairs = usdtPairs.slice(0, 200);

        const formattedData: { [key: string]: CryptoData } = {};

        topPairs.forEach((item: any) => {
          const symbol = item.symbol;
          const baseSymbol = symbol.replace("USDT", "");
          const isPositive = !item.priceChangePercent.startsWith("-");
          const changePercent = Math.abs(
            Number(item.priceChangePercent)
          ).toFixed(2);
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
            numericPrice: numericPrice,
          };
        });

        // Add USDT manually since it's not in the pairs
        formattedData["USDT"] = {
          symbol: "USDT",
          name: "USDT/USDT",
          price: "1.00",
          change: "0",
          changePercent: "0.00",
          volume: "0",
          volumeFormatted: "0",
          isPositive: true,
          quoteVolume: 0,
          numericPrice: 1,
        };

        setCryptoData(formattedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching market data:", error);
        setError("Failed to fetch market data. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchAllPrices();
  }, []);

  // Setup WebSocket for real-time updates
  useEffect(() => {
    // Create WebSocket connection for all tickers
    ws.current = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");

    ws.current.onmessage = (event) => {
      const data: BinanceTicker[] = JSON.parse(event.data);

      // Update crypto data with real-time information
      setCryptoData((prevData) => {
        const newData = { ...prevData };

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
              numericPrice: numericPrice,
            };
          }
        });

        return newData;
      });
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      setError(
        "WebSocket connection error. Prices may not update in real-time."
      );
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  // Get available currencies from cryptoData
  const availableCurrencies = useMemo(() => {
    const currencies = Object.values(cryptoData).map((item) => {
      const code = item.symbol.replace("USDT", "");
      return {
        code,
        name: code,
        icon: "fas fa-coins",
        color: "#F3BA2F",
        symbol: item.symbol,
        price: item.numericPrice,
      };
    });

    // Add USDT if not already present
    if (!currencies.find((c) => c.code === "USDT")) {
      currencies.push({
        code: "USDT",
        name: "USDT",
        icon: "fas fa-dollar-sign",
        color: "#26A17B",
        symbol: "USDT",
        price: 1,
      });
    }

    return currencies;
  }, [cryptoData]);

  // Calculate conversion rate based on current prices
  const calculateConversionRate = useCallback(() => {
    if (conversionLock.current) return;

    const fromCurrencyData = availableCurrencies.find(
      (c) => c.code === fromCurrency
    );
    const toCurrencyData = availableCurrencies.find(
      (c) => c.code === toCurrency
    );

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
    setFromAmount(balances[fromCurrency] || 0);
  };

  // Handle currency selection
  const selectCurrency = (code: string) => {
    if (modalType === "from") {
      setFromCurrency(code);
    } else {
      setToCurrency(code);
    }
    setShowModal(false);
    setSearchTerm("");
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

  // Calculate conversion fee (0.1% of transaction)
  const calculateFee = useMemo(() => {
    return fromAmount * 0.001; // 0.1% fee
  }, [fromAmount]);

  // Calculate final amount after fee
  const calculateFinalAmount = useMemo(() => {
    return toAmount - toAmount * 0.001; // 0.1% fee deducted from received amount
  }, [toAmount]);

  // Open confirmation modal
  const openConfirmationModal = () => {
    if (!hasSufficientBalance) return;

    setConversionFee(calculateFee);
    setFinalAmount(calculateFinalAmount);
    setShowConfirmationModal(true);
  };

  // Fixed: Enhanced handleCloseModal to reset form and refetch balances
  const handleCloseModal = () => {
    dispatch(assetsFormAction.doClose());
    
    // Reset form values after successful conversion
    setFromAmount(1);
    setToAmount(0);
    setFinalAmount(0);
    setConversionFee(0);
    
    // Refetch latest balances
    dispatch(assetsActions.doFetch());
  };

  // Fixed: Enhanced conversion function with proper state management
  const performConversion = () => {
    if (!hasSufficientBalance) return;
    setIsConverting(true);
    conversionLock.current = true;

    // Simulate API call/transaction processing
    setTimeout(() => {
      const values = {
        user: currentUser.id,
        fromSymbol: fromCurrency,
        fromAmount: fromAmount,
        toSymbol: toCurrency,
        coinName: toCurrency,
        toAmount: finalAmount.toFixed(8),
        status: "available",
      };
      
      dispatch(assetsFormAction.doCreate(values));
      
      // Update local balances immediately for better UX
      setBalances(prev => ({
        ...prev,
        [fromCurrency]: (prev[fromCurrency] || 0) - fromAmount,
        [toCurrency]: (prev[toCurrency] || 0) + finalAmount
      }));
      
      conversionLock.current = false;
      setIsConverting(false);
      setShowConfirmationModal(false);

      // Refetch assets to ensure data consistency
      setTimeout(() => {
        dispatch(assetsActions.doFetch());
      }, 500);
    }, 2000);
  };

  // Filter currencies based on search
  const filteredCurrencies = availableCurrencies.filter(
    (currency) =>
      currency.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      currency.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current currency object
  const getCurrency = (code: string) =>
    availableCurrencies.find((c) => c.code === code);

  // Get current price for a currency in USDT
  const getCurrencyPrice = (code: string) => {
    const currency = getCurrency(code);
    return currency ? currency.price : null;
  };

  // Handle image error
  const handleImageError = (currencyCode: string) => {
    setImageErrors((prev) => ({ ...prev, [currencyCode]: true }));
  };

  // Loading placeholder for currency items
  const renderCurrencyPlaceholders = () => {
    return [...Array(10)].map((_, index) => (
      <div key={index} className="currency-item-placeholder">
        <div className="currency-item-icon-placeholder shimmer"></div>
        <div className="currency-item-info-placeholder">
          <div
            className="placeholder-line shimmer"
            style={{ width: "60%", height: "16px", marginBottom: "8px" }}
          ></div>
          <div
            className="placeholder-line shimmer"
            style={{ width: "40%", height: "12px" }}
          ></div>
        </div>
        <div className="currency-item-price-placeholder">
          <div
            className="placeholder-line shimmer"
            style={{ width: "70px", height: "16px", marginBottom: "8px" }}
          ></div>
          <div
            className="placeholder-line shimmer"
            style={{ width: "50px", height: "12px" }}
          ></div>
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
            <div className="loading-spinner-large"></div>
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
                Balance: {balances[fromCurrency] || 0} {fromCurrency}
                <button className="max-button" onClick={handleSetMaxAmount}>
                  MAX
                </button>
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
              <div
                className="currency-selector"
                onClick={() => openModal("from")}
              >
                <div
                  className="currency-icon"
                  style={{
                    backgroundColor:
                      getCurrency(fromCurrency)?.color || "#F3BA2F",
                  }}
                >
                  {imageErrors[fromCurrency] ? (
                    <div className="currency-icon-fallback">
                      {fromCurrency.charAt(0)}
                    </div>
                  ) : (
                    <img
                      src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${fromCurrency}.png`}
                      style={{ width: 25, height: 25 }}
                      alt={fromCurrency}
                      onError={() => handleImageError(fromCurrency)}
                    />
                  )}
                </div>
                <div className="currency-name">{fromCurrency}</div>
                <i className="fas fa-chevron-down" />
              </div>
            </div>
            <div className="currency-price">
              {getCurrencyPrice(fromCurrency) ? (
                <>
                  1 {fromCurrency} = $
                  {getCurrencyPrice(fromCurrency)?.toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                  })}
                </>
              ) : (
                <>&nbsp;</>
              )}
            </div>
            {!hasSufficientBalance && fromAmount > 0 && (
              <div className="error-text">
                <i className="fas fa-exclamation-circle"></i>
                Insufficient balance
              </div>
            )}
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
                Balance: {balances[toCurrency] || 0} {toCurrency}
              </div>
            </div>
            <div className="input-field">
              <input type="number" value={toAmount.toFixed(8)} readOnly />
              <div
                className="currency-selector"
                onClick={() => openModal("to")}
              >
                <div
                  className="currency-icon"
                  style={{
                    backgroundColor:
                      getCurrency(toCurrency)?.color || "#F3BA2F",
                  }}
                >
                  {imageErrors[toCurrency] ? (
                    <div className="currency-icon-fallback">
                      {toCurrency.charAt(0)}
                    </div>
                  ) : (
                    <img
                      src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${toCurrency}.png`}
                      style={{ width: 25, height: 25 }}
                      alt={toCurrency}
                      onError={() => handleImageError(toCurrency)}
                    />
                  )}
                </div>
                <div className="currency-name">{toCurrency}</div>
                <i className="fas fa-chevron-down" />
              </div>
            </div>
            <div className="currency-price">
              {getCurrencyPrice(toCurrency) ? (
                <>
                  1 {toCurrency} = $
                  {getCurrencyPrice(toCurrency)?.toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                  })}
                </>
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
              $
              {(
                fromAmount * (getCurrencyPrice(fromCurrency) || 0)
              ).toLocaleString("en-US", { maximumFractionDigits: 2 })}
            </div>
          </div>

          {/* Convert Button */}
          <button
            className="convert-btn"
            onClick={openConfirmationModal}
            disabled={
              isLoading ||
              fromAmount <= 0 ||
              !hasSufficientBalance ||
              fromCurrency === toCurrency
            }
          >
            {fromCurrency === toCurrency
              ? "Select different currencies"
              : !hasSufficientBalance
                ? "Insufficient balance"
                : "Convert Now"}
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
              <div className="close-modal" onClick={() => setShowModal(false)}>
                ×
              </div>
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
              {isLoading
                ? renderCurrencyPlaceholders()
                : filteredCurrencies.map((currency) => (
                  <li
                    key={currency.code}
                    className="currency-item"
                    onClick={() => selectCurrency(currency.code)}
                  >
                    <div
                      className="currency-item-icon"
                      style={{ backgroundColor: currency.color }}
                    >
                      {imageErrors[currency.code] ? (
                        <div className="currency-icon-fallback">
                          {currency.code.charAt(0)}
                        </div>
                      ) : (
                        <img
                          src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${currency.code}.png`}
                          style={{ width: 40, height: 40 }}
                          alt={currency.code}
                          onError={() => handleImageError(currency.code)}
                        />
                      )}
                    </div>
                    <div className="currency-item-info">
                      <div className="currency-item-name">
                        {currency.code}
                      </div>
                      <div className="currency-item-full">
                        {currency.name}
                      </div>
                    </div>
                    <div className="currency-item-details">
                      <div className="currency-item-price">
                        $
                        {currency.price.toLocaleString("en-US", {
                          maximumFractionDigits: 2,
                        })}
                      </div>
                      <div className="currency-item-balance">
                        Balance: {balances[currency.code] || 0}{" "}
                        {currency.code}
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}

      {selectModal && 
      <SuccessModalComponent
        isOpen={selectModal}
        onClose={handleCloseModal}
        type='convert'
        amount={Number(finalAmount).toFixed(8)}
        coinType={toCurrency} />}

      {/* Enhanced Confirmation Modal */}
      {showConfirmationModal && (
        <div className="confirmation-modal">
          <div
            className="modal-overlay"
            onClick={() => !isConverting && setShowConfirmationModal(false)}
          ></div>
          <div className="modal-dialog">
            <div className="modal-header">
              <h2>Confirm Conversion</h2>
              <button
                className="close-btn"
                onClick={() => !isConverting && setShowConfirmationModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="modal-body">
              <div className="conversion-summary">
                <div className="conversion-from">
                  <div className="currency-amount">
                    <span className="amount">{fromAmount}</span>
                    <span className="currency">{fromCurrency}</span>
                  </div>
                  <div className="currency-icon">
                    {imageErrors[fromCurrency] ? (
                      <div className="currency-icon-fallback large">
                        {fromCurrency.charAt(0)}
                      </div>
                    ) : (
                      <img
                        src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${fromCurrency}.png`}
                        alt={fromCurrency}
                        onError={() => handleImageError(fromCurrency)}
                      />
                    )}
                  </div>
                </div>

                <div className="conversion-arrow">
                  <i className="fas fa-arrow-down"></i>
                </div>

                <div className="conversion-to">
                  <div className="currency-amount">
                    <span className="amount">{finalAmount.toFixed(8)}</span>
                    <span className="currency">{toCurrency}</span>
                  </div>
                  <div className="currency-icon">
                    {imageErrors[toCurrency] ? (
                      <div className="currency-icon-fallback large">
                        {toCurrency.charAt(0)}
                      </div>
                    ) : (
                      <img
                        src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${toCurrency}.png`}
                        alt={toCurrency}
                        onError={() => handleImageError(toCurrency)}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="conversion-details">
                <h3>Conversion Details</h3>

                <div className="detail-item">
                  <span className="detail-label">Exchange Rate</span>
                  <span className="detail-value">
                    1 {fromCurrency} = {conversionRate.toFixed(8)} {toCurrency}
                  </span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Network Fee</span>
                  <span className="detail-value">
                    {conversionFee.toFixed(8)} {fromCurrency}
                  </span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Estimated Arrival</span>
                  <span className="detail-value">~30 seconds</span>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="confirm-btn"
                onClick={performConversion}
                disabled={isConverting}
              >
                {isConverting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Processing Conversion...
                  </>
                ) : (
                  <>
                    <i className="fas fa-check-circle"></i>
                    Confirm Conversion
                  </>
                )}
              </button>

              <button
                className="cancel-btn"
                onClick={() => setShowConfirmationModal(false)}
                disabled={isConverting}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}


      <style>{`
        /* Enhanced Confirmation Modal Styles */
        .confirmation-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2000;
          padding: 20px;
          box-sizing: border-box;
        }
        
        .modal-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(5px);
        }
        
        .modal-dialog {
          background: linear-gradient(145deg, #1a1a1a, #2a2a2a);
          border-radius: 20px;
          width: 100%;
          max-width: 400px;
       
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          overflow: hidden;
          z-index: 2001;
          position: relative;
          border: 1px solid #333;
          animation: modalSlideIn 0.3s ease-out;
             height:100%
        }
        
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .modal-header {
          padding: 20px 25px;
          border-bottom: 1px solid #333;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(0, 0, 0, 0.2);
        }
        
        .modal-header h2 {
          margin: 0;
          color: #F3BA2F;
          font-size: 1.5rem;
          font-weight: 600;
        }
        
        .close-btn {
          background: none;
          border: none;
          color: #aaa;
          font-size: 1.2rem;
          cursor: pointer;
          padding: 5px;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        
        .close-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }
        
        .modal-body {
          padding: 25px;
        }
        
        .conversion-summary {
          text-align: center;
          margin-bottom: 30px;
        }
        
        .conversion-from, .conversion-to {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 15px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 12px;
          margin: 10px 0;
        }
        
        .currency-amount {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        
        .currency-amount .amount {
          font-size: 1.8rem;
          font-weight: bold;
          color: #fff;
        }
        
        .currency-amount .currency {
          font-size: 1rem;
          color: #F3BA2F;
          margin-top: 5px;
        }
        
        .currency-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #2a2a2a;
          border: 2px solid #333;
        }
        
        .currency-icon img {
          width: 30px;
          height: 30px;
        }
        
        .currency-icon-fallback {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #F3BA2F;
          color: #000;
          font-weight: bold;
          font-size: 16px;
        }
        
        .currency-icon-fallback.large {
          font-size: 20px;
        }
        
        .conversion-arrow {
          margin: 15px 0;
          color: #F3BA2F;
          font-size: 1.2rem;
        }
        
        .conversion-details {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 12px;
          padding: 20px;
        }
        
        .conversion-details h3 {
          margin: 0 0 15px 0;
          color: #fff;
          font-size: 1.1rem;
          font-weight: 600;
        }
        
        .detail-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid #333;
        }
        
        .detail-item:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }
        
        .detail-label {
          color: #aaa;
          font-size: 0.9rem;
        }
        
        .detail-value {
          color: #fff;
          font-weight: 500;
        }
        
        .modal-footer {
          padding: 20px 25px;
          border-top: 1px solid #333;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: rgba(0, 0, 0, 0.2);
        }
        
        .confirm-btn {
          background: linear-gradient(145deg, #F3BA2F, #E0A91C);
          color: #000;
          border: none;
          border-radius: 12px;
          padding: 16px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.2s;
        }
        
        .confirm-btn:hover:not(:disabled) {
          background: linear-gradient(145deg, #E0A91C, #D49F19);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(243, 186, 47, 0.3);
        }
        
        .confirm-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .cancel-btn {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          border: 1px solid #444;
          border-radius: 12px;
          padding: 16px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .cancel-btn:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.15);
        }
        
        .cancel-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        /* Error text styling */
        .error-text {
          color: #FF6838;
          font-size: 12px;
          margin-top: 8px;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        /* Responsive adjustments for the modal */
        @media (max-width: 480px) {
          .modal-dialog {
            max-width: 100%;
            border-radius: 16px;
          }
          
          .modal-header, .modal-body, .modal-footer {
            padding: 15px;
          }
          
          .currency-amount .amount {
            font-size: 1.5rem;
          }
          
          .currency-icon {
            width: 40px;
            height: 40px;
          }
        }
        
        /* Rest of the styles remain the same as before */
        /* ... (previous styles) ... */
        
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


        
        .currency-list {
          max-height: 400px;
          overflow-y: auto;
          scrollbar-width: none;
        }

        .currency-list::-webkit-scrollbar {
          display: none;
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
            position: relative;
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
            overflow: hidden;
        }
        
        .currency-icon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
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
        
        /* Currency Selection Modal */
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
        
        .currency-modal .modal-content {
            background-color: #1A1A1A;
            max-width: 400px;
            border-radius: 16px;
            padding: 20px;
            max-height: 80vh;
            overflow-y: auto;
        }
        
        .currency-modal .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        
        .currency-modal .modal-title {
            font-size: 18px;
            font-weight: bold;
        }
        
        .currency-modal .close-modal {
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
            overflow: hidden;
        }
        
        .currency-item-icon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
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
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            color: #F3BA2F;
            font-size: 20px;
            font-weight: bold;
            flex-direction: column;
            gap: 20px;
        }
        
        .loading-spinner-large {
            border: 4px solid #333;
            border-top: 4px solid #F3BA2F;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
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
