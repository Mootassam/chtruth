import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SubHeader from "src/view/shared/Header/SubHeader";
import { useDispatch, useSelector } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import { i18n } from "../../../i18n";
import authSelectors from "src/modules/auth/authSelectors";
import actions from "src/modules/withdraw/form/withdrawFormActions";
import assetsListSelectors from "src/modules/assets/list/assetsListSelectors";
import assetsListActions from "src/modules/assets/list/assetsListActions";

// Network fee configuration
const networkFees = {
  BTC: {
    minAmount: 0.00091,
    fee: 0.00002,
    network: "Bitcoin",
  },
  ETH: {
    minAmount: 0.0077,
    fee: 0.0005,
    network: "Ethereum (ERC20)",
  },
  USDT: {
    minAmount: 30,
    fee: 3,
    network: "Tron (TRC20)",
  },
  SOL: {
    minAmount: 0.01,
    fee: 0.000005,
    network: "Solana",
  },
  XRP: {
    minAmount: 10,
    fee: 0.1,
    network: "Ripple",
  },
};

const schema = yup.object().shape({
  orderNo: yupFormSchemas.string(i18n("entities.withdraw.fields.orderNo")),
  currency: yupFormSchemas.string(i18n("entities.withdraw.fields.currency")),
  withdrawAmount: yupFormSchemas.decimal(
    i18n("entities.withdraw.fields.withdrawAmount"),
    { required: true }
  ),
  fee: yupFormSchemas.decimal(i18n("entities.withdraw.fields.fee")),
  totalAmount: yupFormSchemas.decimal(
    i18n("entities.withdraw.fields.totalAmount")
  ),
  auditor: yupFormSchemas.relationToOne(
    i18n("entities.withdraw.fields.auditor")
  ),
  acceptTime: yupFormSchemas.datetime(
    i18n("entities.withdraw.fields.acceptTime")
  ),
  status: yupFormSchemas.enumerator(i18n("entities.withdraw.fields.status"), {
    options: ["pending", "canceled", "success"],
  }),
  withdrawPassword: yup
    .string()
    .required("Withdrawal password is required")
    .min(6, "Withdrawal password must be at least 6 characters"),
});

function Withdraw() {
  const dispatch = useDispatch();
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const assets = useSelector(assetsListSelectors.selectRows);

  const [address, setAddress] = useState("");
  const [selected, setSelected] = useState("");
  const [item, setItem] = useState(null);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update selected asset info when currency changes
  useEffect(() => {
    if (selected && assets.length) {
      const foundItem = assets.find((asset) => asset.symbol === selected);
      setItem(foundItem || null);

      // Update address from wallet if available
      const walletAddress = currentUser?.wallet?.[selected]?.address || "";
      setAddress(walletAddress);
    } else {
      setItem(null);
      setAddress("");
    }
  }, [selected, assets, currentUser]);

  // Fetch assets once
  useEffect(() => {
    dispatch(assetsListActions.doFetch());
  }, [dispatch]);

  // Check if user has any wallet
  const hasAnyWallet =
    currentUser?.wallet &&
    Object.values(currentUser.wallet).some(
      (val) => val?.address?.trim() !== ""
    );

  const initialValues = {
    orderNo: "",
    currency: "",
    withdrawAmount: "",
    fee: "",
    totalAmount: "",
    auditor: "",
    acceptTime: "",
    status: "pending",
    withdrawAdress: "",
    withdrawPassword: "",
  };

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: initialValues,
  });

  // Watch form values
  const withdrawPassword = form.watch("withdrawPassword");
  const formWithdrawAmount = form.watch("withdrawAmount");

  // Sync form withdrawAmount with local state
  useEffect(() => {
    if (formWithdrawAmount !== withdrawAmount) {
      setWithdrawAmount(formWithdrawAmount || "");
    }
  }, [formWithdrawAmount]);

  // Calculate received amount
  const calculateReceivedAmount = () => {
    if (!selected || !withdrawAmount) return 0;

    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount)) return 0;

    const fee = networkFees[selected]?.fee || 0;
    return Math.max(0, amount - fee);
  };

  // Validate withdrawal amount
  const validateWithdrawal = () => {
    const newErrors = {};

    if (!selected) {
      newErrors.currency = "Please select a currency";
    }

    if (!withdrawAmount) {
      newErrors.amount = "Please enter withdrawal amount";
    } else {
      const amount = parseFloat(withdrawAmount);
      const minAmount = networkFees[selected]?.minAmount || 0;
      const availableBalance = item?.amount || 0;

      if (isNaN(amount) || amount <= 0) {
        newErrors.amount = "Please enter a valid amount";
      } else if (amount < minAmount) {
        newErrors.amount = `Minimum withdrawal is ${minAmount} ${selected}`;
      } else if (amount > availableBalance) {
        newErrors.amount = `Insufficient balance. Available: ${availableBalance} ${selected}`;
      }
    }

    if (!withdrawPassword) {
      newErrors.password = "Withdrawal password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (values) => {
    console.log("Form submitted with values:", values);
    
    if (!validateWithdrawal()) {
      console.log("Validation failed");
      return;
    }

    try {
      setIsSubmitting(true);

      // Generate order number in format: RE + YYYYMMDD + 7 random digits
      const now = new Date();
      const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(
        2,
        "0"
      )}${String(now.getDate()).padStart(2, "0")}`;
      const randomDigits = Math.floor(Math.random() * 1e7)
        .toString()
        .padStart(7, "0");

      const submitData = {
        ...values,
        orderNo: `RE${dateStr}${randomDigits}`,
        currency: selected,
        withdrawAmount: parseFloat(withdrawAmount),
        totalAmount: parseFloat(withdrawAmount),
        withdrawAdress: address,
        fee: networkFees[selected]?.fee || 0,
        status: "pending",
      };

      console.log("Dispatching with data:", submitData);

      // Dispatch the action
      await dispatch(actions.doCreate(submitData));

      // Reset form on success
      form.reset(initialValues);
      setSelected("");
      setAddress("");
      setWithdrawAmount("");
      setErrors({});
      
      console.log("Withdrawal request submitted successfully");

    } catch (error) {
      console.error("Error submitting withdrawal:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currencyOptions = [
    { id: "BTC", name: "Bitcoin", icon: "fab fa-btc", color: "#F3BA2F" },
    { id: "ETH", name: "Ethereum", icon: "fab fa-ethereum", color: "#627EEA" },
    {
      id: "USDT",
      name: "Tether",
      icon: "fas fa-dollar-sign",
      color: "#26A17B",
    },
    { id: "SOL", name: "Solana", icon: "fas fa-bolt", color: "#00FFA3" },
    {
      id: "XRP",
      name: "Ripple",
      icon: "fas fa-exchange-alt",
      color: "#23292F",
    },
  ];

  const selectedCurrencyData = useMemo(
    () => currencyOptions.find((currency) => currency.id === selected),
    [selected]
  );

  const currentFeeConfig = selected ? networkFees[selected] : null;
  const receivedAmount = calculateReceivedAmount();

  // Check if form is valid for enabling the button
  const isFormValid = selected && withdrawAmount && withdrawPassword && !isSubmitting;

  return (
    <div className="withdrawContainer">
      <SubHeader title="Withdraw Crypto" />
      <div className="container">
        {!hasAnyWallet ? (
          <div className="noWalletSection">
            <div className="noWalletCard">
              <div className="noWalletIcon">
                <i className="fas fa-wallet"></i>
              </div>
              <h3>No Wallet Address Found</h3>
              <p>
                You haven't added any wallet addresses yet. Please add a
                withdrawal address to proceed with your transaction.
              </p>
              <Link to="/withdrawaddress" className="addWalletBtn">
                <i className="fas fa-plus"></i>
                Add Wallet Address
              </Link>
              <div className="securityNotice">
                <div className="securityHeader">
                  <i className="fas fa-shield-alt securityIcon" />
                  <div className="securityTitle">Security First</div>
                </div>
                <div className="securityText">
                  For your security, we require a verified withdrawal address
                  for each cryptocurrency. This helps prevent errors and ensures
                  your funds reach the correct destination.
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="currencySection">
              <div className="sectionHeading">Select Currency</div>
              <div className="currencyDropdownContainer">
                <select
                  className="currencyDropdown"
                  value={selected}
                  onChange={(e) => {
                    setSelected(e.target.value);
                    setErrors({});
                    form.setValue("currency", e.target.value);
                  }}
                >
                  <option value="">Select a currency</option>
                  {currencyOptions.map((currency) => {
                    const hasWallet =
                      currentUser?.wallet?.[currency.id]?.address;
                    return (
                      <option
                        key={currency.id}
                        value={currency.id}
                        disabled={!hasWallet}
                      >
                        {currency.name} ({currency.id})
                        {!hasWallet && " - No wallet address"}
                      </option>
                    );
                  })}
                </select>
                {selected && (
                  <div
                    className="currencyDropdownIcon"
                    style={{ color: selectedCurrencyData?.color }}
                  >
                    <img
                      src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${selectedCurrencyData?.id.toUpperCase()}.png`}
                      style={{ width: 25, height: 25 }}
                      alt={selectedCurrencyData?.id}
                    />
                  </div>
                )}
              </div>
              {errors.currency && (
                <div className="errorText">{errors.currency}</div>
              )}
              {!selected && (
                <div className="dropdownHint">
                  Please select a currency to continue
                </div>
              )}
            </div>

            {selected && (
              <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="formSection">
                    {/* Withdrawal Address */}
                    <div className="inputField">
                      <label className="inputLabel">Withdrawal Address</label>
                      <div className="inputWrapper">
                        <input
                          type="text"
                          className="textField"
                          id="withdrawalAddress"
                          placeholder="Enter wallet address"
                          value={address}
                          disabled
                        />
                        <div className="networkInfo" id="networkDetails">
                          Network: {currentFeeConfig?.network}
                        </div>
                      </div>
                    </div>

                    {/* Withdrawal Amount */}
                    <div className="inputField">
                      <label className="inputLabel">Withdrawal Amount</label>
                      <div className="inputWrapper">
                        <input
                          type="number"
                          step="any"
                          className="amountField"
                          placeholder="0.0"
                          value={withdrawAmount}
                          onChange={(e) => {
                            const value = e.target.value;
                            setWithdrawAmount(value);
                            form.setValue("withdrawAmount", value);
                            setErrors({ ...errors, amount: null });
                          }}
                        />
                        <div className="balanceText">
                          Available:{" "}
                          <span id="availableBalance">
                            {item ? item?.amount : 0} {selected.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      {errors.amount && (
                        <div className="errorText">{errors.amount}</div>
                      )}
                    </div>

                    {/* Withdrawal Password */}
                    <div className="inputField">
                      <label className="inputLabel">Withdrawal Password</label>
                      <div className="inputWrapper">
                        <input
                          type="password"
                          className="textField"
                          placeholder="Enter withdrawal password"
                          {...form.register("withdrawPassword")}
                          onChange={(e) => {
                            form.setValue("withdrawPassword", e.target.value);
                            setErrors({ ...errors, password: null });
                          }}
                        />
                      </div>
                      {errors.password && (
                        <div className="errorText">{errors.password}</div>
                      )}
                    </div>

                    {/* Fee Information */}
                    <div className="feeContainer">
                      {currentFeeConfig && (
                        <>
                          <div className="feeRow">
                            <div className="feeLabel">Minimum withdrawal</div>
                            <div className="feeValue">
                              {currentFeeConfig.minAmount} {selected}
                            </div>
                          </div>
                          <div className="feeRow">
                            <div className="feeLabel">Network fee</div>
                            <div className="feeValue">
                              {currentFeeConfig.fee} {selected}
                            </div>
                          </div>
                          <div className="feeRow">
                            <div className="feeLabel">Service fee</div>
                            <div className="feeValue">0.0000 {selected}</div>
                          </div>
                          <div className="feeRow receiveAmount">
                            <div className="feeLabel">You will receive</div>
                            <div className="feeValue">
                              {receivedAmount.toFixed(8)} {selected}
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="securityNotice">
                      <div className="securityHeader">
                        <i className="fas fa-shield-alt securityIcon" />
                        <div className="securityTitle">
                          Security Verification
                        </div>
                      </div>
                      <div className="securityText">
                        For your security, withdrawals require password
                        confirmation and may be subject to review. Withdrawals
                        to incorrect addresses cannot be reversed.
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="withdrawBtn"
                      disabled={!isFormValid || isSubmitting}
                    >
                      {isSubmitting ? "Processing..." : "Confirm Withdrawal"}
                    </button>
                  </div>
                </form>
              </FormProvider>
            )}
          </>
        )}

        <div className="toastMsg" id="toastNotification">
          Withdrawal address copied!
        </div>
      </div>

      <style>{`
        .withdrawContainer {
          padding-bottom: 30px;
        }
        
        .container {
          padding: 0 15px;
        }
        
        .noWalletCard {
          background: #2A2A2A;
          border-radius: 16px;
          padding: 30px;
          text-align: center;
          border: 1px solid #333333;
        }
        
        .noWalletIcon {
          font-size: 48px;
          color: #F3BA2F;
          margin-bottom: 16px;
        }
        
        .noWalletCard h3 {
          font-size: 20px;
          margin-bottom: 12px;
          color: #FFFFFF;
        }
        
        .noWalletCard p {
          color: #AAAAAA;
          margin-bottom: 24px;
          line-height: 1.5;
        }
        
        .addWalletBtn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #F3BA2F;
          color: #000000;
          border: none;
          border-radius: 12px;
          padding: 14px 24px;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s ease;
          margin-bottom: 24px;
        }
        
        .addWalletBtn:hover {
          background: #e6ab0a;
          text-decoration: none;
          color: #000000;
        }
        
        /* Currency Dropdown Styles */
        .currencySection {
          margin-bottom: 20px;
        }
        
        .sectionHeading {
          font-weight: bold;
          margin-bottom: 12px;
          font-size: 16px;
          color: #FFFFFF;
        }
        
        .currencyDropdownContainer {
          position: relative;
          width: 100%;
        }
        
        .currencyDropdown {
          width: 100%;
          background-color: #2A2A2A;
          border: 2px solid #2A2A2A;
          border-radius: 12px;
          padding: 12px 45px 12px 15px;
          color: white;
          font-size: 16px;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          cursor: pointer;
        }
        
        .currencyDropdown:focus {
          outline: none;
          border-color: #F3BA2F;
        }
        
        .currencyDropdownIcon {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 24px;
          pointer-events: none;
        }
        
        .dropdownHint {
          color: #FF6838;
          font-size: 14px;
          margin-top: 8px;
        }
        
        .errorText {
          color: #FF4444;
          font-size: 14px;
          margin-top: 5px;
        }
        
        /* Form Styles */
        .formSection {
          margin-top: 20px;
        }
        
        .inputField {
          margin-bottom: 20px;
        }
        
        .inputLabel {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #FFFFFF;
        }
        
        .inputWrapper {
          background-color: #2A2A2A;
          border-radius: 12px;
          padding: 15px;
          border: 1px solid #333333;
        }
        
        .inputWrapper:focus-within {
          border-color: #F3BA2F;
        }
        
        .textField {
          width: 100%;
          background: transparent;
          border: none;
          color: #FFFFFF;
          font-size: 16px;
          outline: none;
        }
        
        .textField:disabled {
          color: #777777;
        }
        
        .networkInfo {
          color: #AAAAAA;
          font-size: 14px;
          margin-top: 8px;
        }
        
        .amountField {
          width: 100%;
          background: transparent;
          border: none;
          color: #FFFFFF;
          font-size: 20px;
          font-weight: bold;
          outline: none;
          margin-bottom: 8px;
        }
        
        .balanceText {
          color: #AAAAAA;
          font-size: 14px;
        }
        
        .feeContainer {
          background-color: #2A2A2A;
          border-radius: 12px;
          padding: 15px;
          margin-bottom: 20px;
          border: 1px solid #333333;
        }
        
        .feeRow {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          font-size: 14px;
        }
        
        .feeLabel {
          color: #AAAAAA;
        }
        
        .feeValue {
          color: #FFFFFF;
          font-weight: 500;
        }
        
        .receiveAmount {
          border-top: 1px solid #333333;
          padding-top: 12px;
          margin-top: 12px;
          font-weight: bold;
          font-size: 16px;
        }
        
        .securityNotice {
          background-color: rgba(255, 104, 56, 0.1);
          border: 1px solid #FF6838;
          border-radius: 12px;
          padding: 15px;
          margin-bottom: 25px;
        }
        
        .securityHeader {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }
        
        .securityIcon {
          color: #FF6838;
          margin-right: 10px;
          font-size: 18px;
        }
        
        .securityTitle {
          color: #FF6838;
          font-weight: bold;
          font-size: 16px;
        }
        
        .securityText {
          color: #FF6838;
          font-size: 14px;
          line-height: 1.5;
        }
        
        .withdrawBtn {
          background-color: #F3BA2F;
          color: #000000;
          border: none;
          border-radius: 12px;
          padding: 16px;
          font-size: 16px;
          font-weight: bold;
          width: 100%;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        
        .withdrawBtn:hover:not(:disabled) {
          background-color: #e6ab0a;
        }
        
        .withdrawBtn:disabled {
          background-color: #2A2A2A;
          color: #777777;
          cursor: not-allowed;
        }
        
        /* Toast Notification */
        .toastMsg {
          position: fixed;
          bottom: 80px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #00C076;
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          font-size: 14px;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1000;
        }
        
        .toastMsg.visible {
          opacity: 1;
        }
        
        @media (max-width: 350px) {
          .currencyDropdown {
            padding: 10px 40px 10px 12px;
            font-size: 14px;
          }
          
          .currencyDropdownIcon {
            font-size: 20px;
            right: 12px;
          }
        }
      `}</style>
    </div>
  );
}

export default Withdraw;