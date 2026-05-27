import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { QRCodeCanvas } from "qrcode.react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

import method from "src/modules/depositMethod/list/depositMethodListActions";
import selectors from "src/modules/depositMethod/list/depositMethodSelectors";
import depositActions from "src/modules/deposit/form/depositFormActions";
import FieldFormItem from "src/shared/form/FieldFormItem";

// Currency configurations
const CURRENCIES = [
  "USDT", "ETH", "BTC", "USDC", "DAI",
  "SHIB", "XRP", "TRX", "SOL", "BNB", "DOGE"
];

// Minimum deposit in USD per coin
const MIN_DEPOSIT_BY_COIN: Record<string, number> = {
  BTC:  100,
  SOL:  100,
  XRP:  100,
  ETH:   50,
  USDC:  50,
  USDT:  50,
};
const DEFAULT_MIN_DEPOSIT_USD = 50;

function getMinDepositUSD(sym: string): number {
  return MIN_DEPOSIT_BY_COIN[sym?.toUpperCase()] ?? DEFAULT_MIN_DEPOSIT_USD;
}

// Decimal places for each currency
const CURRENCY_DECIMALS = {
  USDT: 2,
  ETH: 6,
  BTC: 8,
  USDC: 2,
  DAI: 2,
  SHIB: 0,
  XRP: 2,
  TRX: 2,
  SOL: 4,
  BNB: 6,
  DOGE: 2,
};

interface CurrencyType {
  _id?: string;
  name?: string;
  symbol?: string;
  network?: any[];
  address?: string;
  minDeposit?: number;
  minimumAmount?: number;
  [key: string]: any;
}

// Helper to format numbers consistently
const formatNumberHelper = (value: number, symbol?: string, decimals?: number) => {
  if (typeof value !== "number" || !isFinite(value) || value === 0) {
    return "0";
  }
  
  const decimalPlaces = decimals !== undefined ? decimals : (CURRENCY_DECIMALS[symbol?.toUpperCase()] || 2);
  
  if (value > 0 && value < 0.000001) {
    return value.toFixed(decimalPlaces > 8 ? decimalPlaces : 8);
  }
  
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimalPlaces,
  }).format(value);
};

// Helper to format USD values
const formatUSDHelper = (value: number) => {
  if (typeof value !== "number" || !isFinite(value) || value === 0) {
    return "$0.00";
  }
  
  if (value > 0 && value < 0.01) {
    return `$${value.toFixed(6)}`;
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(value);
};

function Deposit() {
  const dispatch = useDispatch();
  const params = useParams();
  const symbol = (params?.id || "").toString();

  const listMethod = useSelector(selectors.selectRows);
  const loading = useSelector(selectors.selectLoading);

  const [showToast, setShowToast] = useState(false);
  const [copiedText, setCopiedText] = useState("Address copied");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});
  const [loadingRates, setLoadingRates] = useState(false);

  const [currentAddress, setCurrentAddress] = useState("");
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyType | null>(null);
  const [networkOptions, setNetworkOptions] = useState<Array<{ _id: string; name: string; wallet: string; raw: any }>>([]);
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);
  const [minDepositAmount, setMinDepositAmount] = useState(0);
  const [submittedAmount, setSubmittedAmount] = useState("");

  // Fetch exchange rates
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        setLoadingRates(true);
        const response = await axios.get(
          "https://min-api.cryptocompare.com/data/pricemulti",
          {
            params: {
              fsyms: CURRENCIES.join(","),
              tsyms: "USD",
            },
          }
        );
        
        if (response.data && response.data.Response !== "Error") {
          const rates: Record<string, number> = {};
          CURRENCIES.forEach(currency => {
            if (response.data[currency]?.USD) {
              rates[currency] = response.data[currency].USD;
            }
          });
          setExchangeRates(rates);
        }
      } catch (error) {
        console.error("Failed to fetch exchange rates:", error);
      } finally {
        setLoadingRates(false);
      }
    };

    fetchExchangeRates();
    const interval = setInterval(fetchExchangeRates, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const minInCurrency = useMemo(() => {
    if (!symbol || !exchangeRates[symbol.toUpperCase()]) return 0;
    const rate = exchangeRates[symbol.toUpperCase()];
    return getMinDepositUSD(symbol) / rate;
  }, [symbol, exchangeRates]);

  const formattedMinAmount = useMemo(() => {
    if (minInCurrency === 0) return "0";
    return formatNumberHelper(minInCurrency, symbol);
  }, [minInCurrency, symbol]);

  const schema = useMemo(() => {
    return yup.object().shape({
      amount: yup
        .number()
        .typeError("Amount must be a number")
        .positive("Amount must be positive")
        .required("Amount is required")
        .min(minInCurrency || 0, `Minimum deposit is ${formattedMinAmount} ${symbol}`),
      txid: yup.string().required("Transaction ID is required"),
    });
  }, [minInCurrency, formattedMinAmount, symbol]);

  const formMethods = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      amount: "",
      txid: "",
    },
  });

  const formatNumber = useCallback((value: number, decimals?: number) => {
    return formatNumberHelper(value, symbol, decimals);
  }, [symbol]);

  const formatUSD = useCallback((value: number) => {
    return formatUSDHelper(value);
  }, []);

  useEffect(() => {
    dispatch(method.doFetch());
  }, [dispatch]);

  useEffect(() => {
    if (!listMethod || !symbol) {
      return;
    }

    const currency = listMethod.find((item) => {
      if (!item || !item.symbol) return false;
      return item.symbol.toString().toLowerCase() === symbol.toString().toLowerCase();
    });

    if (!currency) {
      setCurrentCurrency(null);
      setNetworkOptions([]);
      setSelectedNetwork(null);
      setCurrentAddress("");
      return;
    }

    setCurrentCurrency(currency);
    setMinDepositAmount(minInCurrency);

    if (Array.isArray(currency.network) && currency.network.length > 0) {
      const normalized = currency.network.map((n, idx) => ({
        _id: n._id ?? `${currency._id ?? symbol}-network-${idx}`,
        name: n.name ?? n.network ?? `${currency.name ?? symbol} Network`,
        wallet: n.wallet ?? n.address ?? n.depositAddress ?? "",
        raw: n,
      }));
      setNetworkOptions(normalized);

      const defaultNet = normalized.find(n => n._id === selectedNetwork) || normalized[0];
      setSelectedNetwork(defaultNet._id);
      setCurrentAddress(defaultNet.wallet || "");
    } else if (currency.address) {
      const single = {
        _id: currency._id ?? `${symbol}-single`,
        name: `${currency.name ?? symbol} Network`,
        wallet: currency.address,
        raw: null,
      };
      setNetworkOptions([single]);
      setSelectedNetwork(single._id);
      setCurrentAddress(single.wallet || "");
    } else {
      setNetworkOptions([]);
      setSelectedNetwork(null);
      setCurrentAddress("");
    }
  }, [listMethod, symbol, minInCurrency]);

  useEffect(() => {
    if (!selectedNetwork) {
      return;
    }
    const found = networkOptions.find((n) => n._id === selectedNetwork);
    if (found) {
      setCurrentAddress(found.wallet || "");
    }
  }, [selectedNetwork, networkOptions]);

  const copyAddressToClipboard = useCallback(async () => {
    if (!currentAddress) {
      console.error("No address to copy");
      return;
    }
    try {
      await navigator.clipboard.writeText(currentAddress);
      setCopiedText("Address copied");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error("Failed to copy address: ", err);
      setCopiedText("Failed to copy address");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  }, [currentAddress]);

  const saveQRCode = useCallback(() => {
    const canvas = document.querySelector(".dw__qr-canvas canvas");
    if (!(canvas instanceof HTMLCanvasElement)) {
      console.error("QR canvas not found");
      setCopiedText("Unable to save QR");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }
    try {
      const link = document.createElement("a");
      const networkNameSafe = (networkOptions.find(n => n._id === selectedNetwork)?.name || "deposit").replace(/\s+/g, "-");
      link.download = `${symbol}-${networkNameSafe}-address.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      setCopiedText("QR code saved");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error("Failed to save QR code", err);
      setCopiedText("Unable to save QR");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  }, [networkOptions, selectedNetwork, symbol]);

  const handleNetworkSelect = useCallback((event) => {
    const networkId = event.target.value;
    setSelectedNetwork(networkId);
    formMethods.setValue("amount", "");
    formMethods.clearErrors("amount");
  }, [formMethods]);

  const onSubmit = useCallback(async (data) => {
    if (!selectedNetwork || !currentCurrency || !currentAddress) {
      console.error("Missing required information");
      return;
    }

    setIsSubmitting(true);
    try {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const randomDigits = Math.floor(Math.random() * 10000000).toString().padStart(7, "0");
      const orderno = `RE${year}${month}${day}${randomDigits}`;
      const depositData = {
        orderno,
        amount: data.amount,
        txid: data.txid,
        rechargechannel: symbol,
        status: "pending",
        network: selectedNetwork,
        rechargetime: now.toISOString()
      };

      setSubmittedAmount(data.amount);

      await dispatch(depositActions.doCreate(depositData));

      setShowSuccessModal(true);
      formMethods.reset();
    } catch (error) {
      console.error("Deposit submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedNetwork, currentCurrency, currentAddress, symbol, dispatch, formMethods]);

  const handleCloseModal = useCallback(() => {
    setShowSuccessModal(false);
    setSubmittedAmount("");
  }, []);

  const getCurrencyIcon = useCallback((sym: string) => {
    const cleanSymbol = sym ? sym.toUpperCase() : "";
    return `https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${cleanSymbol}.png`;
  }, []);

  const enteredAmount = formMethods.watch("amount");
  const enteredAmountUSD = useMemo(() => {
    if (!enteredAmount || !exchangeRates[symbol?.toUpperCase()]) return 0;
    const amountNum = Number(enteredAmount);
    if (isNaN(amountNum) || !isFinite(amountNum)) return 0;
    return amountNum * exchangeRates[symbol.toUpperCase()];
  }, [enteredAmount, symbol, exchangeRates]);

  return (
    <div className="dw__container">
      {/* Header */}
      <div className="dw__header">
        <div className="dw__nav-bar">
          <Link to="/deposit" className="dw__back-btn remove_blue" aria-label="Back to deposits">
            <i className="fas fa-arrow-left" />
          </Link>
          <div className="dw__page-title">Deposit {symbol || "..."}</div>
        </div>
      </div>

      {/* Content */}
      <div className="dw__content-area">
        <div className="dw__content-wrapper">
          {/* Minimum deposit requirement */}
          {symbol && exchangeRates[symbol.toUpperCase()] && (
            <div className="dw__info-box">
              <div className="dw__info-row">
                <span className="dw__info-label">Minimum deposit:</span>
                <span className="dw__info-value">
                  {formattedMinAmount} {symbol} ({formatUSD(getMinDepositUSD(symbol))})
                </span>
              </div>
              {loadingRates && (
                <div className="dw__rate-loading">
                  <i className="fas fa-spinner fa-spin" /> Loading rates...
                </div>
              )}
            </div>
          )}

          {/* Currency display */}
          <div className="dw__section">
            <div className="dw__section-label">Deposit currency</div>
            <div className="dw__currency-display">
              <div className="dw__currency-icon" aria-hidden>
                <img
                  src={getCurrencyIcon(symbol)}
                  alt={symbol}
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.onerror = null;
                    img.style.display = "none";
                    const parent = img.parentElement;
                    if (parent) {
                      parent.textContent = (symbol && symbol.charAt(0)) || "C";
                      parent.style.background = "#F3BA2F";
                      parent.style.color = "#000000";
                      parent.style.fontSize = "14px";
                      parent.style.fontWeight = "bold";
                      parent.style.display = "inline-flex";
                      parent.style.alignItems = "center";
                      parent.style.justifyContent = "center";
                      parent.style.width = "36px";
                      parent.style.height = "36px";
                      parent.style.borderRadius = "8px";
                    }
                  }}
                />
              </div>
              <div className="dw__currency-details">
                <div className="dw__currency-name">{currentCurrency?.name || symbol}</div>
                {exchangeRates[symbol?.toUpperCase()] && (
                  <div className="dw__currency-rate">
                    1 {symbol} ≈ {formatUSD(exchangeRates[symbol.toUpperCase()])}
                  </div>
                )}
              </div>
            </div>
            <div className="dw__section-note">Fixed currency - cannot be changed</div>
          </div>

          {/* Network select */}
          {networkOptions.length > 0 && (
            <div className="dw__section">
              <div className="dw__section-label">Deposit network</div>
              <div className="dw__network-select-wrapper">
                <select
                  className="dw__network-select"
                  value={selectedNetwork || ""}
                  onChange={handleNetworkSelect}
                  aria-label="Select deposit network"
                >
                  {networkOptions.map((network) => (
                    <option key={network._id} value={network._id}>
                      {network.name}
                    </option>
                  ))}
                </select>
                <div className="dw__select-arrow">
                  <i className="fas fa-chevron-down" />
                </div>
              </div>
            </div>
          )}

          {/* QR code & address */}
          {currentAddress && (
            <div className="dw__qr-section">
              <div className="dw__section-label">Save QR code</div>
              <div className="dw__qr-container">
                <div className="dw__qr-canvas" aria-hidden>
                  <QRCodeCanvas
                    value={currentAddress}
                    size={180}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    level="H"
                    includeMargin={true}
                  />
                </div>

                <div className="dw__address-section">
                  <div className="dw__address-label">Wallet Address</div>
                  <div className="dw__address-text" id="walletAddress">
                    {currentAddress}
                  </div>
                  <div className="dw__address-actions">
                    <button
                      type="button"
                      className="dw__action-btn dw__copy-btn"
                      onClick={copyAddressToClipboard}
                      aria-label="Copy address"
                    >
                      <i className="fas fa-copy" /> Copy Address
                    </button>
                    <button
                      type="button"
                      className="dw__action-btn dw__save-btn"
                      onClick={saveQRCode}
                      aria-label="Save QR code"
                    >
                      <i className="fas fa-download" /> Save QR Code
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Deposit form */}
          {currentAddress && (
            <FormProvider {...formMethods}>
              <form onSubmit={formMethods.handleSubmit(onSubmit)} className="dw__form">
                <div className="dw__section">
                  <div className="dw__form-group">
                    <div className="dw__input-with-usd">
                      <FieldFormItem
                        name="amount"
                        label={`Amount (${symbol})`}
                        placeholder={`Minimum: ${formattedMinAmount} ${symbol}`}
                        className="dw__form-input"
                      />
                      {enteredAmountUSD > 0 && (
                        <div className="dw__usd-value-display">
                          ≈ {formatUSD(enteredAmountUSD)}
                        </div>
                      )}
                    </div>
                    <div className="dw__min-amount-note">
                      Minimum deposit: {formattedMinAmount} {symbol} ({formatUSD(getMinDepositUSD(symbol))})
                    </div>
                  </div>
                </div>

                <div className="dw__section">
                  <div className="dw__form-group">
                    <FieldFormItem
                      name="txid"
                      label="Transaction ID"
                      placeholder="Enter your transaction ID"
                      className="dw__form-input"
                    />
                  </div>
                </div>

                <div className="dw__form-actions">
                  <button
                    type="submit"
                    className="dw__submit-btn"
                    disabled={!formMethods.formState.isValid || isSubmitting || loadingRates}
                    aria-disabled={!formMethods.formState.isValid || isSubmitting || loadingRates}
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin" /> Processing...
                      </>
                    ) : loadingRates ? (
                      <>
                        <i className="fas fa-spinner fa-spin" /> Loading rates...
                      </>
                    ) : (
                      "Confirm Deposit"
                    )}
                  </button>
                </div>
              </form>
            </FormProvider>
          )}

          {/* Loading */}
          {loading && (
            <div className="dw__loading-section" role="status" aria-live="polite">
              <div className="dw__spinner" />
              <div className="dw__loading-text">Loading deposit information...</div>
            </div>
          )}

          {/* No address found */}
          {!loading && !currentAddress && symbol && (
            <div className="dw__error-section" role="alert">
              <i className="fas fa-exclamation-triangle dw__error-icon" />
              <div className="dw__error-text">No deposit address found for {symbol}</div>
              <div className="dw__error-note">Please contact support or try another currency.</div>
            </div>
          )}

          {/* Hint Section */}
          <div className="dw__hint-section">
            <div className="dw__hint-title">Important Notes</div>
            <div className="dw__hint-content">
              <div className="dw__hint-item">
                1. Send only {symbol} to this deposit address. Sending other currencies may result in permanent loss.
              </div>
              <div className="dw__hint-item">2. Ensure you are using the correct network ({networkOptions.find(n => n._id === selectedNetwork)?.name}).</div>
              <div className="dw__hint-item">
                3. Minimum deposit amount: {formattedMinAmount} {symbol} (${getMinDepositUSD(symbol)} USD equivalent)
              </div>
              <div className="dw__hint-item">4. Transactions typically require 1-3 network confirmations before being credited to your account.</div>
              <div className="dw__hint-item">5. Always double-check the address before sending funds.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      <div className={`dw__toast ${showToast ? "dw__toast--visible" : ""}`} role="status" aria-live="polite">
        <i className="fas fa-check-circle dw__toast-icon" />
        {copiedText}
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="dw__modal-overlay" role="dialog" aria-modal="true">
          <div className="dw__modal-content">
            <div className="dw__modal-header">
              <h3 className="dw__modal-title">Deposit Submitted Successfully</h3>
              <button className="dw__modal-close" onClick={handleCloseModal} aria-label="Close">
                <i className="fas fa-times" />
              </button>
            </div>
            <div className="dw__modal-body">
              <div className="dw__modal-success-icon"><i className="fas fa-check-circle" /></div>
              <div className="dw__modal-success-message">
                Your deposit of {submittedAmount} {symbol} has been submitted for processing.
              </div>
              <div className="dw__modal-success-details">
                <p>Please wait for network confirmations. This usually takes 5-30 minutes.</p>
                <p>You can track the status in your transaction history.</p>
              </div>
            </div>
            <div className="dw__modal-footer">
              <button className="dw__modal-btn" onClick={handleCloseModal}>OK</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* ── Root Container ── */
        .dw__container {
          max-width: 400px;
          margin: 0 auto;
          min-height: 100vh;
          background: #000000;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #FFFFFF;
        }

        /* ── Header / Top Bar ── */
        .dw__header {
          display: flex;
          align-items: center;
          height: 56px;
          padding: 0 16px;
          background: #1A1A1A;
          border-bottom: 1px solid #2a2a2e;
          position: sticky;
          top: 0;
          z-index: 50;
          backdrop-filter: blur(10px);
        }
        .dw__nav-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        .dw__back-btn {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: #1A1A1A;
          border: 1px solid #2a2a2e;
          color: #FFFFFF;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }
        .dw__back-btn:hover { 
          background: #2a2a2e; 
          border-color: #F3BA2F; 
          color: #F3BA2F; 
          transform: translateX(-2px);
        }
        .dw__page-title {
          color: #FFFFFF;
          font-size: 18px;
          font-weight: bold;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          letter-spacing: 0.3px;
        }

        /* ── Content Area ── */
        .dw__content-area {
          background: #000000;
          padding: 20px 16px;
          min-height: calc(100vh - 56px);
        }
        .dw__content-wrapper { 
          width: 100%; 
        }

        /* ── Info Box ── */
        .dw__info-box {
          background: rgba(243, 186, 47, 0.08);
          border: 1px solid rgba(243, 186, 47, 0.25);
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 20px;
          box-shadow: 0 2px 8px rgba(243, 186, 47, 0.1);
        }
        .dw__info-row { 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          margin-bottom: 4px; 
        }
        .dw__info-label { 
          font-size: 13px; 
          color: #F3BA2F; 
          font-weight: 600; 
        }
        .dw__info-value { 
          font-size: 13px; 
          font-weight: 700; 
          color: #FFFFFF; 
        }
        .dw__rate-loading { 
          font-size: 12px; 
          color: #AAAAAA; 
          text-align: center; 
          margin-top: 6px; 
        }

        /* ── Section ── */
        .dw__section { 
          margin-bottom: 20px; 
        }
        .dw__section-label {
          font-size: 13px;
          font-weight: bold;
          color: #AAAAAA;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 10px;
        }
        .dw__section-note { 
          font-size: 12px; 
          color: #AAAAAA; 
          margin-top: 8px; 
          font-style: italic; 
        }

        /* ── Currency Display ── */
        .dw__currency-display {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #1A1A1A;
          border: 1px solid #2a2a2e;
          border-radius: 12px;
          padding: 16px;
          transition: all 0.3s ease;
        }
        .dw__currency-display:hover {
          border-color: #F3BA2F;
          box-shadow: 0 0 0 2px rgba(243, 186, 47, 0.1);
        }
        .dw__currency-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: #000000;
          border: 1px solid #2a2a2e;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
        }
        .dw__currency-icon img { 
          width: 100%; 
          height: 100%; 
          object-fit: contain; 
        }
        .dw__currency-details { 
          flex: 1; 
        }
        .dw__currency-name { 
          font-size: 16px; 
          font-weight: 700; 
          color: #FFFFFF; 
          margin-bottom: 4px; 
        }
        .dw__currency-rate { 
          font-size: 12px; 
          color: #AAAAAA; 
        }

        /* ── Network Select ── */
        .dw__network-select-wrapper { 
          position: relative; 
        }
        .dw__network-select {
          width: 100%;
          padding: 14px 42px 14px 16px;
          background: #1A1A1A;
          border: 1px solid #2a2a2e;
          border-radius: 12px;
          color: #FFFFFF;
          font-size: 14px;
          font-weight: 600;
          appearance: none;
          cursor: pointer;
          outline: none;
          transition: all 0.3s ease;
        }
        .dw__network-select:hover {
          border-color: #F3BA2F;
        }
        .dw__network-select:focus { 
          border-color: #F3BA2F; 
          box-shadow: 0 0 0 2px rgba(243, 186, 47, 0.1);
        }
        .dw__select-arrow {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #AAAAAA;
          pointer-events: none;
          font-size: 12px;
        }

        /* ── QR Section ── */
        .dw__qr-section { 
          margin-bottom: 24px; 
        }
        .dw__qr-container {
          background: #1A1A1A;
          border: 1px solid #2a2a2e;
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        .dw__qr-canvas {
          padding: 16px;
          background: #FFFFFF;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease;
        }
        .dw__qr-canvas:hover {
          transform: scale(1.02);
        }
        .dw__qr-canvas canvas { 
          border-radius: 8px; 
          display: block; 
        }
        .dw__address-section { 
          width: 100%; 
          text-align: center; 
        }
        .dw__address-label { 
          font-size: 13px; 
          font-weight: bold; 
          color: #AAAAAA; 
          text-transform: uppercase; 
          letter-spacing: 0.5px; 
          margin-bottom: 12px; 
        }
        .dw__address-text {
          font-size: 12px;
          color: #CCCCCC;
          background: #000000;
          border: 1px solid #2a2a2e;
          padding: 14px;
          border-radius: 10px;
          word-break: break-all;
          font-family: 'Courier New', monospace;
          line-height: 1.6;
          margin-bottom: 16px;
          transition: border-color 0.3s ease;
        }
        .dw__address-text:hover {
          border-color: #F3BA2F;
        }
        .dw__address-actions { 
          display: flex; 
          gap: 12px; 
          justify-content: center; 
          flex-wrap: wrap; 
        }
        .dw__action-btn {
          flex: 1;
          min-width: 130px;
          padding: 12px 16px;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s ease;
        }
        .dw__action-btn:hover { 
          transform: translateY(-2px); 
        }
        .dw__copy-btn { 
          background: linear-gradient(135deg, #F3BA2F, #FF9800); 
          color: #000000; 
          box-shadow: 0 2px 8px rgba(243, 186, 47, 0.3);
        }
        .dw__copy-btn:hover { 
          box-shadow: 0 4px 12px rgba(243, 186, 47, 0.4);
          background: linear-gradient(135deg, #FF9800, #F3BA2F);
        }
        .dw__save-btn { 
          background: #1A1A1A; 
          color: #FFFFFF; 
          border: 1.5px solid #2a2a2e; 
        }
        .dw__save-btn:hover { 
          border-color: #F3BA2F; 
          color: #F3BA2F; 
          background: #2a2a2e;
        }

        /* ── Form ── */
        .dw__form { 
          margin-top: 8px; 
        }
        .dw__form-group { 
          margin-bottom: 8px; 
        }
        .dw__input-with-usd { 
          position: relative; 
        }
        
        .dw__form input[type="text"],
        .dw__form input[type="number"],
        .dw__form input {
          background: #1A1A1A !important;
          border: 1px solid #2a2a2e !important;
          border-radius: 12px !important;
          color: #FFFFFF !important;
          padding: 14px 16px !important;
          font-size: 14px !important;
          width: 100% !important;
          outline: none !important;
          box-sizing: border-box !important;
          transition: all 0.3s ease !important;
        }
        .dw__form input:hover {
          border-color: #F3BA2F !important;
        }
        .dw__form input:focus {
          border-color: #F3BA2F !important;
          box-shadow: 0 0 0 2px rgba(243, 186, 47, 0.1) !important;
        }
        .dw__form label {
          color: #AAAAAA !important;
          font-size: 13px !important;
          font-weight: bold !important;
          text-transform: uppercase !important;
          letter-spacing: 0.5px !important;
          margin-bottom: 8px !important;
          display: block !important;
        }
        .dw__usd-value-display {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 12px;
          color: #AAAAAA;
          background: #1A1A1A;
          padding: 4px 10px;
          border-radius: 8px;
          pointer-events: none;
          border: 1px solid #2a2a2e;
        }
        .dw__min-amount-note { 
          font-size: 12px; 
          color: #AAAAAA; 
          margin-top: 8px; 
        }

        /* ── Submit Button ── */
        .dw__form-actions { 
          margin-top: 24px; 
        }
        .dw__submit-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #F3BA2F, #FF9800);
          color: #000000;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(243, 186, 47, 0.3);
        }
        .dw__submit-btn:hover:not(:disabled) { 
          background: linear-gradient(135deg, #FF9800, #F3BA2F);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(243, 186, 47, 0.4);
        }
        .dw__submit-btn:disabled { 
          background: #2a2a2e; 
          color: #666666; 
          cursor: not-allowed; 
          transform: none;
          box-shadow: none;
        }

        /* ── Loading State ── */
        .fa-spin { 
          animation: dwSpin 1s infinite linear; 
        }
        @keyframes dwSpin { 
          0% { transform: rotate(0deg); } 
          100% { transform: rotate(360deg); } 
        }
        .dw__loading-section { 
          text-align: center; 
          padding: 40px 0; 
        }
        .dw__spinner {
          border: 3px solid #2a2a2e;
          border-top: 3px solid #F3BA2F;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: dwSpin 1s linear infinite;
          margin: 0 auto 16px;
        }
        .dw__loading-text {
          color: #AAAAAA;
          font-size: 14px;
        }

        /* ── Error State ── */
        .dw__error-section { 
          text-align: center; 
          padding: 40px 20px; 
        }
        .dw__error-icon { 
          font-size: 48px; 
          color: #F3BA2F; 
          margin-bottom: 16px; 
          display: block; 
        }
        .dw__error-text { 
          color: #AAAAAA; 
          font-size: 16px; 
          font-weight: 600;
        }
        .dw__error-note { 
          margin-top: 12px; 
          font-size: 14px; 
          color: #666666; 
        }

        /* ── Hint Section ── */
        .dw__hint-section {
          margin-top: 32px;
          background: #1A1A1A;
          border: 1px solid #2a2a2e;
          border-radius: 16px;
          padding: 20px;
        }
        .dw__hint-title { 
          font-size: 16px; 
          font-weight: bold; 
          color: #FFFFFF; 
          margin-bottom: 16px; 
        }
        .dw__hint-content { 
          display: flex; 
          flex-direction: column; 
          gap: 12px; 
        }
        .dw__hint-item {
          font-size: 13px;
          color: #AAAAAA;
          line-height: 1.6;
          padding-left: 20px;
          position: relative;
        }
        .dw__hint-item::before { 
          content: "•"; 
          position: absolute; 
          left: 4px; 
          color: #F3BA2F; 
          font-weight: bold; 
          font-size: 18px;
        }

        /* ── Toast Notification ── */
        .dw__toast {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%) translateY(80px);
          background: #1A1A1A;
          border: 1px solid #F3BA2F;
          color: #FFFFFF;
          padding: 14px 24px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 9999;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
        }
        .dw__toast--visible { 
          transform: translateX(-50%) translateY(0); 
        }
        .dw__toast-icon { 
          color: #F3BA2F; 
          font-size: 18px;
        }

        /* ── Success Modal ── */
        .dw__modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
          animation: dwFadeIn 0.3s ease;
        }
        @keyframes dwFadeIn { 
          from { opacity: 0; } 
          to { opacity: 1; } 
        }
        .dw__modal-content {
          background: #1A1A1A;
          border: 1px solid #2a2a2e;
          border-radius: 20px;
          width: 90%;
          max-width: 380px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          animation: dwSlideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes dwSlideUp {
          from { transform: translateY(24px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .dw__modal-header {
          padding: 20px 24px;
          border-bottom: 1px solid #2a2a2e;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .dw__modal-title { 
          margin: 0; 
          font-size: 18px; 
          font-weight: bold; 
          color: #FFFFFF; 
        }
        .dw__modal-close {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: #2a2a2e;
          border: none;
          color: #AAAAAA;
          cursor: pointer;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        .dw__modal-close:hover { 
          background: #F3BA2F; 
          color: #000000; 
        }
        .dw__modal-body { 
          padding: 32px 24px; 
          text-align: center; 
        }
        .dw__modal-success-icon { 
          font-size: 64px; 
          color: #F3BA2F; 
          margin-bottom: 20px; 
        }
        .dw__modal-success-message { 
          font-size: 16px; 
          color: #FFFFFF; 
          font-weight: bold; 
          margin-bottom: 16px; 
        }
        .dw__modal-success-details { 
          font-size: 14px; 
          color: #AAAAAA; 
          line-height: 1.6; 
        }
        .dw__modal-success-details p { 
          margin: 8px 0; 
        }
        .dw__modal-footer { 
          padding: 20px 24px; 
          border-top: 1px solid #2a2a2e; 
        }
        .dw__modal-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #F3BA2F, #FF9800);
          color: #000000;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(243, 186, 47, 0.3);
        }
        .dw__modal-btn:hover { 
          background: linear-gradient(135deg, #FF9800, #F3BA2F);
          box-shadow: 0 4px 12px rgba(243, 186, 47, 0.4);
          transform: translateY(-2px);
        }

        /* ── Responsive Design ── */
        @media (max-width: 768px) {
          .dw__container {
            max-width: 100%;
          }
          .dw__content-area {
            padding: 16px 12px;
          }
          .dw__page-title {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
}

export default Deposit;