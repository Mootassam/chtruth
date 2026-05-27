import React, { useMemo, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import { i18n } from "../../../i18n";
import authSelectors from "src/modules/auth/authSelectors";
import actions from "src/modules/withdraw/form/withdrawFormActions";
import selectors from "src/modules/withdraw/form/withdrawFormSelectors";
import FieldFormItem from "src/shared/form/FieldFormItem";
import assetsListSelectors from "src/modules/assets/list/assetsListSelectors";
import assetsListActions from "src/modules/assets/list/assetsListActions";
import SuccessModalComponent from "src/view/shared/modals/sucessModal";
import method from "src/modules/depositMethod/list/depositMethodListActions";
import depositMethodselectors from "src/modules/depositMethod/list/depositMethodSelectors";
import axios from "axios";

// Currency configurations
const CURRENCIES = [
  "USDT", "ETH", "BTC", "USDC", "DAI",
  "SHIB", "XRP", "TRX", "SOL", "BNB", "DOGE"
];

// Minimum withdrawal in USD per coin
const MIN_WITHDRAWAL_BY_COIN: Record<string, number> = {
  BTC:  100,
  SOL:  100,
  XRP:  100,
  ETH:   50,
  USDC:  50,
  USDT:  50,
};
const DEFAULT_MIN_WITHDRAWAL_USD = 50;
const WITHDRAWAL_FEE_USD = 5;

function getMinWithdrawalUSD(sym: string): number {
  return MIN_WITHDRAWAL_BY_COIN[sym?.toUpperCase()] ?? DEFAULT_MIN_WITHDRAWAL_USD;
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

const schema = yup.object().shape({
  orderNo: yupFormSchemas.string(i18n("entities.withdraw.fields.orderNo")),
  currency: yupFormSchemas.string(i18n("entities.withdraw.fields.currency")),
  withdrawAmount: yup
    .number()
    .typeError(i18n("pages.withdraw.errors.amountNumber"))
    .required(i18n("pages.withdraw.errors.amountRequired"))
    .test(
      "positive",
      i18n("pages.withdraw.errors.amountPositive"),
      (val) => typeof val === "number" && val > 0
    ),
  withdrawPassword: yup
    .string()
    .required("Withdraw password is required"),
  fee: yupFormSchemas.decimal(i18n("entities.withdraw.fields.fee")),
  totalAmount: yupFormSchemas.decimal(
    i18n("entities.withdraw.fields.totalAmount")
  ),
  auditor: yupFormSchemas.relationToOne(i18n("entities.withdraw.fields.auditor")),
  acceptTime: yupFormSchemas.datetime(i18n("entities.withdraw.fields.acceptTime")),
  status: yupFormSchemas.enumerator(i18n("entities.withdraw.fields.status"), {
    options: ["pending", "canceled", "success"],
  }),
});

function Withdraw() {
  const dispatch = useDispatch();
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const assets = useSelector(assetsListSelectors.selectRows) || [];
  const selectModal = useSelector(selectors.selectModal);
  const listMethod = useSelector(depositMethodselectors.selectRows);
  const loading = useSelector(selectors.selectSaveLoading);

  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [selected, setSelected] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [item, setItem] = useState<{ symbol: string; amount: number } | null>(null);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showNetworkDropdown, setShowNetworkDropdown] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});
  const [loadingRates, setLoadingRates] = useState(false);

  // Fetch assets once
  useEffect(() => {
    dispatch(assetsListActions.doFetch('exchange'));
  }, [dispatch]);

  // Fetch deposit methods on mount
  useEffect(() => {
    dispatch(method.doFetch());
  }, [dispatch]);

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
    // Refresh rates every 5 minutes
    const interval = setInterval(fetchExchangeRates, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Set default currency when listMethod loads
  useEffect(() => {
    if (listMethod && listMethod.length > 0 && !selected) {
      const defaultCurrency = listMethod[0];
      const symbol = defaultCurrency.symbol || defaultCurrency.id;
      setSelected(symbol);
      form.setValue("currency", symbol);
      
      if (defaultCurrency.network && defaultCurrency.network.length > 0) {
        setSelectedNetwork(defaultCurrency.network[0]._id || defaultCurrency.network[0].name);
      }
    }
  }, [listMethod]);

  // Update selected asset info when currency or assets change
  useEffect(() => {
    if (selected && assets.length) {
      const found = assets.find((a) =>
        String(a.symbol).toUpperCase() === String(selected).toUpperCase()
      );
      setItem(found || null);

      const walletAddress = currentUser?.wallet?.[selected]?.address || "";
      setAddress(walletAddress);

      form.setValue("currency", selected);
      
      if (walletAddress) {
        form.setValue("withdrawAdress", walletAddress);
      }
    } else {
      setItem(null);
      setAddress("");
      form.setValue("currency", "");
      form.setValue("withdrawAdress", "");
    }
  }, [selected, assets, currentUser]);

  const initialValues = {
    orderNo: "",
    currency: "",
    withdrawAmount: "",
    withdrawPassword: "",
    fee: "",
    totalAmount: "",
    auditor: "",
    acceptTime: "",
    status: "pending",
    withdrawAdress: "",
  };

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: initialValues,
  });

  // Watch fields we need to react to
  const watchedAmount = useWatch({ control: form.control, name: "withdrawAmount" });
  const watchedCurrency = useWatch({ control: form.control, name: "currency" });

  // Parsed numeric values
  const parsedAmount = Number(watchedAmount);
  const isAmountNumber = !Number.isNaN(parsedAmount) && isFinite(parsedAmount);
  const availableBalance = item ? Number(item.amount) || 0 : 0;

  // Calculate minimum withdrawal and fee in selected currency
  const { minInCurrency, feeInCurrency } = useMemo(() => {
    if (!selected || !exchangeRates[selected]) {
      return { minInCurrency: 0, feeInCurrency: 0 };
    }

    const rate = exchangeRates[selected];
    const minInCurrency = getMinWithdrawalUSD(selected) / rate;
    const feeInCurrency = WITHDRAWAL_FEE_USD / rate;

    return {
      minInCurrency,
      feeInCurrency,
    };
  }, [selected, exchangeRates]);

  // Get selected method details
  const selectedMethod = useMemo(() => {
    if (!listMethod || !selected) return null;
    return listMethod.find((method) => {
      const methodSymbol = method.symbol || method.id || "";
      return String(methodSymbol).toUpperCase() === String(selected).toUpperCase();
    });
  }, [listMethod, selected]);

  // Get network list for selected currency
  const networkList = selectedMethod?.network || [];

  // Set default network when currency changes
  useEffect(() => {
    if (networkList.length > 0) {
      const defaultNetwork = networkList[0];
      setSelectedNetwork(defaultNetwork._id || defaultNetwork.name);
      setShowNetworkDropdown(false);
    } else {
      setSelectedNetwork("");
    }
  }, [selectedMethod, networkList]);

  // Receive amount (what user receives after fee)
  const receiveAmount = isAmountNumber ? Math.max(parsedAmount - feeInCurrency, 0) : 0;

  // Helper to format numbers consistently
  const formatNumber = useCallback((value: number, decimals?: number) => {
    if (typeof value !== "number" || !isFinite(value) || value === 0) {
      return "0";
    }
    
    const decimalPlaces = decimals !== undefined ? decimals : (CURRENCY_DECIMALS[selected] || 2);
    
    // For very small numbers, show more precision but not scientific notation
    if (value > 0 && value < 0.000001) {
      return value.toFixed(decimalPlaces > 8 ? decimalPlaces : 8);
    }
    
    // For regular numbers
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimalPlaces,
    }).format(value);
  }, [selected]);

  // Helper to format USD values
  const formatUSD = useCallback((value: number) => {
    if (typeof value !== "number" || !isFinite(value) || value === 0) {
      return "$0.00";
    }
    
    // For very small USD values, show more precision
    if (value > 0 && value < 0.01) {
      return `$${value.toFixed(6)}`;
    }
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(value);
  }, []);

  // Get currency icon URL
  const getCurrencyIcon = useCallback((symbol: string) => {
    const cleanSymbol = symbol ? symbol.toUpperCase() : "";
    return `https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${cleanSymbol}.png`;
  }, []);

  // Handle network selection
  const handleNetworkSelect = useCallback((network: any) => {
    setSelectedNetwork(network._id || network.name);
    setShowNetworkDropdown(false);
  }, []);

  // Validation checks
  const computeValidationState = useCallback(() => {
    if (!selected) {
      return { disabled: true, label: i18n("pages.withdraw.validation.selectCurrency"), reason: "selectCurrency" };
    }

    if (networkList.length > 0 && !selectedNetwork) {
      return { disabled: true, label: i18n("pages.withdraw.validation.selectNetwork"), reason: "selectNetwork" };
    }

    if (!isAmountNumber || parsedAmount <= 0) {
      return { disabled: true, label: i18n("pages.withdraw.validation.enterAmount"), reason: "enterAmount" };
    }

    // Check minimum withdrawal
    if (parsedAmount < minInCurrency) {
      const formattedMin = formatNumber(minInCurrency);
      return {
        disabled: true,
        label: i18n("pages.withdraw.validation.belowMin", formattedMin, selected),
        reason: "belowMin",
      };
    }

    // Check available balance
    if (parsedAmount > availableBalance) {
      return {
        disabled: true,
        label: i18n("pages.withdraw.validation.insufficientBalance"),
        reason: "insufficientBalance",
      };
    }

    // Check if fee can be covered
    if (parsedAmount + feeInCurrency > availableBalance) {
      return {
        disabled: true,
        label: i18n("pages.withdraw.validation.insufficientForFee"),
        reason: "insufficientForFee",
      };
    }

    const withdrawAddress = form.getValues("withdrawAdress");
    if (!withdrawAddress || withdrawAddress.trim() === "") {
      return { disabled: true, label: i18n("pages.withdraw.validation.enterAddress"), reason: "enterAddress" };
    }

    const withdrawPassword = form.getValues("withdrawPassword");
    if (!withdrawPassword || withdrawPassword.trim() === "") {
      return { disabled: true, label: "Enter withdraw password", reason: "enterPassword" };
    }

    return { disabled: false, label: i18n("pages.withdraw.confirmWithdrawal"), reason: "ok" };
  }, [selected, networkList, selectedNetwork, isAmountNumber, parsedAmount, minInCurrency, availableBalance, feeInCurrency, form, formatNumber]);

  const validationState = computeValidationState();

  const handleCloseModal = useCallback(() => {
    dispatch(actions.doClose());
    form.reset(initialValues);
    setSelected("");
    setAddress("");
    setAmount("");
    setSelectedNetwork("");
  }, [dispatch, form, initialValues]);

  // Submit handler
  const onSubmit = useCallback(async (values: any) => {
    if (validationState.disabled) return;

    try {
      values.currency = selected;

      // Generate order number
      const now = new Date();
      const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
      const randomDigits = Math.floor(Math.random() * 1e7).toString().padStart(7, "0");
      values.orderNo = `RE${dateStr}${randomDigits}`;

      // Set fee and total amount
      const amountNum = Number(values.withdrawAmount) || 0;
      values.fee = feeInCurrency;
      values.totalAmount = amountNum - feeInCurrency;
      values.status = "pending";
      values.network = selectedNetwork;

      setAmount(values.totalAmount.toString());

      await dispatch(actions.doCreate(values));
    } catch (error) {
      console.error("Withdrawal submission error:", error);
    }
  }, [selected, feeInCurrency, selectedNetwork, validationState.disabled, dispatch]);

  // Handle currency selection
  const handleCurrencySelect = useCallback((currency: any) => {
    const symbol = currency.symbol || currency.id;
    setSelected(symbol);
    form.setValue("currency", symbol);
    form.setValue("withdrawAmount", "");
    form.setValue("withdrawAdress", "");
    setShowCurrencyDropdown(false);
    setShowNetworkDropdown(false);
  }, [form]);

  // Calculate USD value of withdrawal amount
  const withdrawalUSDValue = useMemo(() => {
    if (!isAmountNumber || !exchangeRates[selected]) return 0;
    return parsedAmount * exchangeRates[selected];
  }, [parsedAmount, selected, exchangeRates, isAmountNumber]);

  // Calculate USD value of fee
  const feeUSDValue = useMemo(() => {
    if (!exchangeRates[selected]) return 0;
    return feeInCurrency * exchangeRates[selected];
  }, [feeInCurrency, selected, exchangeRates]);

  // Calculate USD value of receive amount
  const receiveUSDValue = useMemo(() => {
    if (!exchangeRates[selected]) return 0;
    return receiveAmount * exchangeRates[selected];
  }, [receiveAmount, selected, exchangeRates]);

  // Format available balance with proper handling
  const formattedAvailableBalance = useMemo(() => {
    if (availableBalance === 0) return "0";
    return formatNumber(availableBalance);
  }, [availableBalance, formatNumber]);

  // Format minimum withdrawal amount
  const formattedMinAmount = useMemo(() => {
    if (minInCurrency === 0) return "0";
    return formatNumber(minInCurrency);
  }, [minInCurrency, formatNumber]);

  // Format fee amount
  const formattedFeeAmount = useMemo(() => {
    if (feeInCurrency === 0) return "0";
    return formatNumber(feeInCurrency);
  }, [feeInCurrency, formatNumber]);

  // Format receive amount
  const formattedReceiveAmount = useMemo(() => {
    if (receiveAmount === 0) return "0";
    return formatNumber(receiveAmount);
  }, [receiveAmount, formatNumber]);

  return (
    <div className="wd__container">
      {/* Header Section */}
      <div className="wd__header">
        <div className="wd__nav-bar">
          <Link to="/wallets" className="wd__back-arrow remove_blue">
            <i className="fas fa-arrow-left" />
          </Link>
          <div className="wd__page-title">Withdraw</div>
          <Link className="wd__header-icon remove_blue" to="/history">
            <i className="fas fa-receipt" />
          </Link>
        </div>
      </div>

      {/* Content Card */}
      <div className="wd__content-card">
        <div className="wd__content">
          {/* Select currency section */}
          <div className="wd__form-section">
            <div className="wd__input-field">
              <label className="wd__input-label">Select currency</label>
              <div className="wd__select-wrapper">
                <div
                  className="wd__select-trigger"
                  onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                >
                  {selected ? (
                    <div className="wd__selected-display">
                      <div className="wd__currency-icon">
                        <img
                          src={getCurrencyIcon(selected)}
                          alt={selected}
                          onError={(e) => {
                            const img = e.target as HTMLImageElement;
                            img.onerror = null;
                            img.style.display = "none";
                            const parent = img.parentElement;
                            if (parent) {
                              parent.textContent = selected.charAt(0);
                              parent.style.background = "#F3BA2F";
                              parent.style.color = "#000000";
                              parent.style.fontSize = "14px";
                              parent.style.fontWeight = "bold";
                              parent.style.display = "inline-flex";
                              parent.style.alignItems = "center";
                              parent.style.justifyContent = "center";
                              parent.style.width = "28px";
                              parent.style.height = "28px";
                              parent.style.borderRadius = "8px";
                            }
                          }}
                        />
                      </div>
                      <span className="wd__currency-text">{selected}</span>
                      {loadingRates ? (
                        <span className="wd__rate-loading">Loading rates...</span>
                      ) : exchangeRates[selected] ? (
                        <span className="wd__currency-rate">
                          (1 {selected} ≈ {formatUSD(exchangeRates[selected])})
                        </span>
                      ) : null}
                    </div>
                  ) : (
                    <span className="wd__placeholder">Select Currency</span>
                  )}
                  <i className="fas fa-chevron-down wd__dropdown-arrow" />
                </div>

                {showCurrencyDropdown && (
                  <div className="wd__dropdown">
                    {listMethod && listMethod.length > 0 ? (
                      listMethod
                        .filter(currency => CURRENCIES.includes(currency.symbol || currency.id))
                        .map((currency) => {
                          const symbol = currency.symbol || currency.id;
                          return (
                            <div
                              key={currency.id || symbol}
                              className="wd__dropdown-option"
                              onClick={() => handleCurrencySelect(currency)}
                            >
                              <div className="wd__currency-icon">
                                <img
                                  src={getCurrencyIcon(symbol)}
                                  alt={symbol}
                                  onError={(e) => {
                                    const img = e.target as HTMLImageElement;
                                    img.onerror = null;
                                    img.style.display = "none";
                                    const parent = img.parentElement;
                                    if (parent) {
                                      parent.textContent = symbol.charAt(0);
                                      parent.style.background = "#F3BA2F";
                                      parent.style.color = "#000000";
                                      parent.style.fontSize = "14px";
                                      parent.style.fontWeight = "bold";
                                      parent.style.display = "inline-flex";
                                      parent.style.alignItems = "center";
                                      parent.style.justifyContent = "center";
                                      parent.style.width = "28px";
                                      parent.style.height = "28px";
                                      parent.style.borderRadius = "8px";
                                    }
                                  }}
                                />
                              </div>
                              <span className="wd__currency-text">{symbol}</span>
                              {loadingRates ? (
                                <span className="wd__rate-loading-small">...</span>
                              ) : exchangeRates[symbol] ? (
                                <span className="wd__currency-rate-small">
                                  ({formatUSD(exchangeRates[symbol])})
                                </span>
                              ) : null}
                            </div>
                          );
                        })
                    ) : (
                      <div className="wd__no-options">No currencies available</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Minimum withdrawal requirement */}
            {selected && exchangeRates[selected] && (
              <div className="wd__info-box">
                <div className="wd__info-row">
                  <span className="wd__info-label">Minimum withdrawal:</span>
                  <span className="wd__info-value">
                    {formattedMinAmount} {selected} ({formatUSD(getMinWithdrawalUSD(selected))})
                  </span>
                </div>
              </div>
            )}

            {/* Withdraw network */}
            {selected && networkList.length > 0 && (
              <div className="wd__input-field">
                <label className="wd__input-label">Withdraw network</label>
                <div className="wd__select-wrapper">
                  <div
                    className="wd__select-trigger"
                    onClick={() => setShowNetworkDropdown(!showNetworkDropdown)}
                  >
                    <div className="wd__selected-display">
                      <i className="fas fa-network-wired wd__network-icon" />
                      <span className="wd__network-text">
                        {networkList.find(n => 
                          n._id === selectedNetwork || 
                          n.id === selectedNetwork || 
                          n.name === selectedNetwork
                        )?.name || "Select Network"}
                      </span>
                    </div>
                    <i className="fas fa-chevron-down wd__dropdown-arrow" />
                  </div>
                  
                  {showNetworkDropdown && (
                    <div className="wd__dropdown">
                      {networkList.map((network) => (
                        <div
                          key={network._id || network.id || network.name}
                          className="wd__dropdown-option"
                          onClick={() => handleNetworkSelect(network)}
                        >
                          <i className="fas fa-network-wired wd__network-icon-small" />
                          <span className="wd__network-text">{network.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Withdraw address */}
                <div className="wd__input-field">
                  <label className="wd__input-label">Withdraw address</label>
                  <div className="wd__input-wrapper">
                    <FieldFormItem
                      name="withdrawAdress"
                      type="text"
                      className="wd__address-field"
                      placeholder="Enter your wallet address"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <br />
                </div>

                {/* Amount section */}
                <div className="wd__input-field">
                  <label className="wd__input-label">Amount of coins withdrawn</label>
                  <div className="wd__input-wrapper">
                    <FieldFormItem
                      name="withdrawAmount"
                      type="number"
                      className="wd__amount-field"
                      placeholder="0.0"
                    />
                  </div>
                  <div className="wd__balance-info">
                    <div className="wd__balance-text">
                      Available: <span className="wd__balance-amount">{formattedAvailableBalance} {selected}</span>
                    </div>
                    {isAmountNumber && withdrawalUSDValue > 0 && (
                      <div className="wd__usd-value">
                        ≈ {formatUSD(withdrawalUSDValue)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Fee section */}
                <div className="wd__fee-section">
                  <div className="wd__fee-row">
                    <div className="wd__fee-label">Withdrawal fee:</div>
                    <div className="wd__fee-value">
                      {formattedFeeAmount} {selected}
                      <span className="wd__fee-usd"> ({formatUSD(feeUSDValue)})</span>
                    </div>
                  </div>
                  <div className="wd__fee-row">
                    <div className="wd__fee-label">Minimum withdrawal:</div>
                    <div className="wd__fee-value">
                      {formattedMinAmount} {selected}
                      <span className="wd__fee-usd"> ({formatUSD(getMinWithdrawalUSD(selected))})</span>
                    </div>
                  </div>
                  <div className="wd__fee-row">
                    <div className="wd__fee-label">You will receive:</div>
                    <div className="wd__fee-value wd__receive-amount">
                      {formattedReceiveAmount} {selected}
                      {receiveUSDValue > 0 && (
                        <span className="wd__receive-usd"> (≈ {formatUSD(receiveUSDValue)})</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Withdraw password */}
                <div className="wd__input-field">
                  <label className="wd__input-label">Withdraw password</label>
                  <div className="wd__input-wrapper" style={{ position: "relative" }}>
                    <FieldFormItem
                      name="withdrawPassword"
                      type={showPassword ? "text" : "password"}
                      className="wd__address-field"
                      placeholder="Enter your withdraw password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      style={{
                        position: "absolute", right: 14, top: "50%",
                        transform: "translateY(-50%)",
                        background: "none", border: "none",
                        color: "#AAAAAA", cursor: "pointer", fontSize: 15, padding: 0,
                      }}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"} />
                    </button>
                  </div>
                </div>

                {/* Important notice section */}
                <div className="wd__notice-section">
                  <div className="wd__notice-title">Important notice</div>
                  <div className="wd__notice-content">
                    <div className="wd__notice-item">1. Minimum withdrawal amount is ${getMinWithdrawalUSD(selected)} USD equivalent in selected currency.</div>
                    <div className="wd__notice-item">2. Withdrawal fee is ${WITHDRAWAL_FEE_USD} USD equivalent in selected currency.</div>
                    <div className="wd__notice-item">3. After submitting the withdraw application, the money will arrive within 24 hours. If the money does not arrive after the expected withdraw time, please consult the online customer service.</div>
                    <div className="wd__notice-item">4. After submitting the withdraw application, the funds are frozen because the withdraw is in progress and the funds are temporarily held by the system. This does not mean that you have lost the asset or that there is an abnormality with the asset.</div>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="wd__submit-btn"
                  disabled={validationState.disabled || loading || loadingRates}
                >
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>
                      Processing...
                    </>
                  ) : loadingRates ? (
                    <>
                      <i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>
                      Loading rates...
                    </>
                  ) : (
                    validationState.label
                  )}
                </button>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>

      {selectModal && (
        <SuccessModalComponent
          isOpen={selectModal}
          onClose={handleCloseModal}
          type='withdraw'
          amount={amount}
          coinType={selected}
        />
      )}

      <style>{`
        /* ── Root Container ── */
        .wd__container {
          max-width: 400px;
          margin: 0 auto;
          min-height: 100vh;
          background: #000000;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #FFFFFF;
        }

        /* ── Header / Top Bar ── */
        .wd__header {
          display: flex;
          align-items: center;
          padding: 0 16px;
          height: 56px;
          background: #1A1A1A;
          border-bottom: 1px solid #2a2a2e;
          position: sticky;
          top: 0;
          z-index: 50;
        }
        .wd__nav-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        .wd__back-arrow {
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
        .wd__back-arrow:hover { 
          background: #2a2a2e; 
          border-color: #F3BA2F; 
          color: #F3BA2F; 
        }
        .wd__page-title {
          color: #FFFFFF;
          font-size: 18px;
          font-weight: bold;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }
        .wd__header-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: #1A1A1A;
          border: 1px solid #2a2a2e;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          color: #FFFFFF !important;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .wd__header-icon:hover { 
          border-color: #F3BA2F; 
          color: #F3BA2F !important; 
          background: #2a2a2e;
        }

        /* ── Content ── */
        .wd__content-card {
          min-height: calc(100vh - 56px);
        }
        .wd__content { 
          width: 100%; 
        }
        .wd__form-section { 
          display: flex; 
          flex-direction: column; 
          gap: 20px;
          padding: 20px 16px;
        }

        /* ── Labels ── */
        .wd__input-label {
          display: block;
          font-size: 13px;
          font-weight: bold;
          color: #AAAAAA;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 10px;
        }

        /* ── Select Triggers ── */
        .wd__select-trigger {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          background: #1A1A1A;
          border: 1px solid #2a2a2e;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          min-height: 52px;
        }
        .wd__select-trigger:hover {
          background: #2a2a2e;
          border-color: #F3BA2F;
        }

        /* ── Selected Display ── */
        .wd__selected-display {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
          min-width: 0;
        }
        .wd__currency-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: #000000;
          border: 1px solid #2a2a2e;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 12px;
          font-weight: 700;
          color: #FFFFFF;
        }
        .wd__currency-icon img { 
          width: 100%; 
          height: 100%; 
          object-fit: contain; 
        }
        .wd__currency-text {
          font-size: 16px;
          font-weight: 700;
          color: #FFFFFF;
        }
        .wd__currency-rate {
          font-size: 12px;
          color: #AAAAAA;
          margin-left: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .wd__rate-loading { 
          font-size: 12px; 
          color: #AAAAAA; 
        }
        .wd__placeholder { 
          font-size: 14px; 
          color: #666666; 
        }
        .wd__dropdown-arrow { 
          color: #AAAAAA; 
          font-size: 12px; 
          flex-shrink: 0; 
          transition: transform 0.3s ease; 
        }

        /* ── Dropdowns ── */
        .wd__dropdown {
          position: absolute;
          top: calc(100% + 6px);
          left: 0;
          right: 0;
          background: #1A1A1A;
          border: 1px solid #2a2a2e;
          border-radius: 12px;
          overflow: hidden;
          z-index: 100;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          max-height: 240px;
          overflow-y: auto;
        }
        .wd__dropdown-option {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          border-bottom: 1px solid #2a2a2e;
        }
        .wd__dropdown-option:last-child { 
          border-bottom: none; 
        }
        .wd__dropdown-option:hover { 
          background: #2a2a2e; 
        }
        .wd__currency-rate-small { 
          font-size: 11px; 
          color: #AAAAAA; 
          margin-left: auto; 
        }
        .wd__rate-loading-small { 
          font-size: 11px; 
          color: #AAAAAA; 
          margin-left: auto; 
        }
        .wd__network-icon { 
          font-size: 16px; 
          color: #F3BA2F; 
          flex-shrink: 0; 
        }
        .wd__network-icon-small { 
          font-size: 14px; 
          color: #F3BA2F; 
          flex-shrink: 0; 
        }
        .wd__network-text { 
          font-size: 14px; 
          font-weight: 600; 
          color: #FFFFFF; 
        }
        .wd__no-options { 
          padding: 16px; 
          text-align: center; 
          color: #AAAAAA; 
          font-size: 13px; 
        }

        /* Select wrapper for positioning */
        .wd__select-wrapper { 
          position: relative; 
        }

        /* ── Info Box ── */
        .wd__info-box {
          background: rgba(243, 186, 47, 0.08);
          border: 1px solid rgba(243, 186, 47, 0.25);
          border-radius: 12px;
          padding: 16px;
          box-shadow: 0 2px 8px rgba(243, 186, 47, 0.1);
        }
        .wd__info-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          flex-wrap: wrap;
        }
        .wd__info-label { 
          font-size: 13px; 
          color: #F3BA2F; 
          font-weight: 600; 
        }
        .wd__info-value { 
          font-size: 13px; 
          color: #FFFFFF; 
          font-weight: 700; 
        }

        /* ── Input Fields ── */
        .wd__input-wrapper { 
          position: relative; 
        }
        .wd__input-field input,
        .wd__input-field textarea {
          width: 100%;
          padding: 14px 16px !important;
          background: #1A1A1A !important;
          border: 1px solid #2a2a2e !important;
          border-radius: 12px !important;
          color: #FFFFFF !important;
          font-size: 15px !important;
          font-family: inherit !important;
          outline: none !important;
          transition: all 0.3s ease !important;
          box-sizing: border-box;
          box-shadow: none !important;
        }
        .wd__input-field input::placeholder,
        .wd__input-field textarea::placeholder { 
          color: #666666 !important; 
        }
        .wd__input-field input:hover,
        .wd__input-field textarea:hover {
          border-color: #F3BA2F !important;
        }
        .wd__input-field input:focus,
        .wd__input-field textarea:focus {
          border-color: #F3BA2F !important;
          background: #2a2a2e !important;
          box-shadow: 0 0 0 2px rgba(243, 186, 47, 0.1) !important;
        }
        .wd__input-field .is-invalid,
        .wd__input-field input.is-invalid {
          border-color: #FF4444 !important;
        }
        .wd__input-field .invalid-feedback {
          font-size: 12px !important;
          color: #FF4444 !important;
          margin-top: 6px;
          font-weight: 500;
        }

        /* ── Balance Info ── */
        .wd__balance-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 8px;
          padding: 0 2px;
        }
        .wd__balance-text { 
          font-size: 12px; 
          color: #AAAAAA; 
          padding-bottom: 12px; 
        }
        .wd__balance-amount { 
          color: #FFFFFF; 
          font-weight: 600; 
        }
        .wd__usd-value { 
          font-size: 12px; 
          color: #AAAAAA; 
        }

        /* ── Fee Section ── */
        .wd__fee-section {
          background: #1A1A1A;
          border: 1px solid #2a2a2e;
          border-radius: 12px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
        }
        .wd__fee-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          flex-wrap: wrap;
        }
        .wd__fee-label { 
          font-size: 13px; 
          color: #AAAAAA; 
        }
        .wd__fee-value { 
          font-size: 13px; 
          color: #FFFFFF; 
          font-weight: 600; 
          text-align: right; 
        }
        .wd__fee-usd { 
          color: #AAAAAA; 
          font-weight: 400; 
          font-size: 12px; 
        }
        .wd__receive-amount { 
          color: #F3BA2F; 
        }
        .wd__receive-usd { 
          color: #F3BA2F; 
          opacity: 0.7; 
          font-weight: 400; 
        }

        /* ── Notice Section ── */
        .wd__notice-section {
          background: rgba(243, 186, 47, 0.05);
          border: 1px solid rgba(243, 186, 47, 0.15);
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 20px;
        }
        .wd__notice-title {
          font-size: 14px;
          font-weight: bold;
          color: #F3BA2F;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .wd__notice-title::before {
          content: '⚠';
          font-size: 14px;
        }
        .wd__notice-content { 
          display: flex; 
          flex-direction: column; 
          gap: 8px; 
        }
        .wd__notice-item {
          font-size: 12px;
          color: #AAAAAA;
          line-height: 1.6;
          padding-left: 2px;
        }

        /* ── Submit Button ── */
        .wd__submit-btn {
          width: 100%;
          padding: 16px;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          background: linear-gradient(135deg, #F3BA2F, #FF9800);
          color: #000000;
          letter-spacing: 0.2px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 2px 8px rgba(243, 186, 47, 0.3);
        }
        .wd__submit-btn:hover:not(:disabled) { 
          background: linear-gradient(135deg, #FF9800, #F3BA2F);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(243, 186, 47, 0.4);
        }
        .wd__submit-btn:active:not(:disabled) { 
          transform: scale(0.98); 
        }
        .wd__submit-btn:disabled {
          background: #2a2a2e;
          color: #666666;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        /* ── Scrollbar ── */
        .wd__dropdown::-webkit-scrollbar {
          width: 4px;
        }
        .wd__dropdown::-webkit-scrollbar-track {
          background: transparent;
        }
        .wd__dropdown::-webkit-scrollbar-thumb {
          background: #2a2a2e;
          border-radius: 2px;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .wd__container {
            max-width: 100%;
          }
          .wd__form-section {
            padding: 16px 12px;
          }
          .wd__page-title {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
}

export default Withdraw;