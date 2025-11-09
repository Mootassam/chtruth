import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SubHeader from "src/view/shared/Header/SubHeader";
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

// Currency rules: minimum withdrawal and fee per currency
const withdrawRules = {
  BTC: { min: 0.00091, fee: 0.00002, decimals: 8 },
  ETH: { min: 0.0077, fee: 0.0005, decimals: 8 },
  USDT: { min: 30, fee: 3, decimals: 2 },
  SOL: { min: 0.01, fee: 0.0005, decimals: 6 },
  XRP: { min: 1, fee: 0.1, decimals: 6 },
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
    )
    .test(
      "min-by-currency",
      i18n("pages.withdraw.errors.amountMin"),
      function (value) {
        const { currency } = this.parent || {};
        if (!currency || !withdrawRules[currency]) return true;
        return value >= withdrawRules[currency].min;
      }
    ),
  fee: yupFormSchemas.decimal(i18n("entities.withdraw.fields.fee")),
  totalAmount: yupFormSchemas.decimal(
    i18n("entities.withdraw.fields.totalAmount")
  ),
  auditor: yupFormSchemas.relationToOne(i18n("entities.withdraw.fields.auditor")),
  acceptTime: yupFormSchemas.datetime(i18n("entities.withdraw.fields.acceptTime")),
  status: yupFormSchemas.enumerator(i18n("entities.withdraw.fields.status"), {
    options: ["pending", "canceled", "success"],
  }),
  withdrawPassword: yup.string().required(i18n("pages.withdraw.errors.passwordRequired")),
});

function Withdraw() {
  const dispatch = useDispatch();
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const assets = useSelector(assetsListSelectors.selectRows) || [];
  const selectModal = useSelector(selectors.selectModal);
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [selected, setSelected] = useState("");
  const [item, setItem] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch assets once
  useEffect(() => {
    dispatch(assetsListActions.doFetch());
  }, [dispatch]);

  // Update selected asset info when currency or assets change
  useEffect(() => {
    if (selected && assets.length) {
      const found = assets.find((a) => 
        String(a.symbol).toUpperCase() === String(selected).toUpperCase()
      );
      setItem(found || null);
      
      // Fixed: Safely access wallet address
      const walletAddress = currentUser?.wallet?.[selected]?.address || "";
      setAddress(walletAddress);
      
      // Update form currency field
      form.setValue("currency", selected);
    } else {
      setItem(null);
      setAddress("");
      form.setValue("currency", "");
    }
  }, [selected, assets, currentUser]);

  // Do we have any wallet addresses at all?
  const hasAnyWallet = useMemo(() => {
    return (
      currentUser?.wallet &&
      Object.values(currentUser.wallet).some((val) => 
        val?.address?.trim() !== ""
      )
    );
  }, [currentUser]);

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

  // Watch fields we need to react to
  const watchedAmount = useWatch({ control: form.control, name: "withdrawAmount" });
  const watchedPassword = useWatch({ control: form.control, name: "withdrawPassword" });
  const watchedCurrency = useWatch({ control: form.control, name: "currency" });

  // parsed numeric values
  const parsedAmount = Number(watchedAmount);
  const isAmountNumber = !Number.isNaN(parsedAmount) && isFinite(parsedAmount);
  const availableBalance = item ? Number(item.amount) || 0 : 0;

  // rules for selected currency
  const selectedRules = withdrawRules[selected] || { min: 0, fee: 0, decimals: 8 };
  const fee = selected ? selectedRules.fee : 0;
  const min = selected ? selectedRules.min : 0;
  const decimals = selected ? selectedRules.decimals : 8;

  // Receive amount (what user receives after fee)
  const receiveAmount = isAmountNumber ? Math.max(parsedAmount - (fee || 0), 0) : 0;

  // helper to format numbers consistently
  const formatNumber = (value, d = decimals) => {
    if (typeof value !== "number" || !isFinite(value)) return "0";
    return Number(value).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: d,
    });
  };

  // Combine multiple validation checks to produce button label + disabled state + inline messages
  const computeValidationState = () => {
    // not allowed if currency is not selected
    if (!selected) {
      return { disabled: true, label: i18n("pages.withdraw.validation.selectCurrency"), reason: "selectCurrency" };
    }

    // amount missing or invalid
    if (!isAmountNumber || parsedAmount <= 0) {
      return { disabled: true, label: i18n("pages.withdraw.validation.enterAmount"), reason: "enterAmount" };
    }

    // below minimum for currency
    if (min && parsedAmount < min) {
      return {
        disabled: true,
        label: i18n("pages.withdraw.validation.belowMin", formatNumber(min), selected),
        reason: "belowMin",
      };
    }

    // withdraw amount greater than available balance
    if (parsedAmount > availableBalance) {
      return {
        disabled: true,
        label: i18n("pages.withdraw.validation.insufficientBalance"),
        reason: "insufficientBalance",
      };
    }

    // ensure fee can be covered too
    if (parsedAmount + fee > availableBalance) {
      return {
        disabled: true,
        label: i18n("pages.withdraw.validation.insufficientForFee"),
        reason: "insufficientForFee",
      };
    }

    // password required
    if (!watchedPassword || (typeof watchedPassword === "string" && watchedPassword.trim() === "")) {
      return { disabled: true, label: i18n("pages.withdraw.validation.enterPassword"), reason: "enterPassword" };
    }

    // everything okay
    return { disabled: false, label: i18n("pages.withdraw.confirmWithdrawal"), reason: "ok" };
  };

  const validationState = computeValidationState();

  const handleCloseModal = () => {
    dispatch(actions.doClose());
    // Reset form after successful withdrawal
    form.reset(initialValues);
    setSelected("");
    setAddress("");
    setAmount("");
    setIsSubmitting(false);
  };

  // Submit handler
  const onSubmit = async (values) => {
    if (validationState.disabled) return;
    
    setIsSubmitting(true);
    
    try {
      // ensure we use the selected currency
      values.currency = selected;
      
      // generate order number: RE + YYYYMMDD + 7 random digits
      const now = new Date();
      const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
      const randomDigits = Math.floor(Math.random() * 1e7).toString().padStart(7, "0");
      values.orderNo = `RE${dateStr}${randomDigits}`;

      // numeric values
      const amountNum = Number(values.withdrawAmount) || 0;
      const feeNum = fee || 0;
      values.fee = feeNum;
      values.totalAmount = amountNum - feeNum; // what user receives
      values.withdrawAdress = address;
      values.status = "pending";

      setAmount(values.totalAmount.toString());
      
      // Dispatch create action
      await dispatch(actions.doCreate(values));

      // Don't reset form here - wait for success modal close
      // The form reset will happen in handleCloseModal

    } catch (error) {
      console.error("Withdrawal submission error:", error);
      setIsSubmitting(false);
    }
  };

  const currencyOptions = [
    { id: "BTC", name: "Bitcoin", icon: "fab fa-btc", color: "#F3BA2F" },
    { id: "ETH", name: "Ethereum", icon: "fab fa-ethereum", color: "#627EEA" },
    { id: "USDT", name: "Tether", icon: "fas fa-dollar-sign", color: "#26A17B" },
    { id: "SOL", name: "Solana", icon: "fas fa-bolt", color: "#00FFA3" },
    { id: "XRP", name: "Ripple", icon: "fas fa-exchange-alt", color: "#23292F" },
  ];

  const selectedCurrencyData = currencyOptions.find((c) => c.id === selected);

  // form errors for inline display
  const { errors } = form.formState;

  return (
    <div className="withdrawContainer">
      <SubHeader title={i18n("pages.withdraw.title")} />
      <div className="container">
        {!hasAnyWallet ? (
          <div className="noWalletSection">
            <div className="noWalletCard">
              <div className="noWalletIcon">
                <i className="fas fa-wallet"></i>
              </div>
              <h3>{i18n("pages.withdraw.noWallet.title")}</h3>
              <p>
                {i18n("pages.withdraw.noWallet.description")}
              </p>
              <Link to="/withdrawaddress" className="addWalletBtn">
                <i className="fas fa-plus" />
                {i18n("pages.withdraw.noWallet.addButton")}
              </Link>
              <div className="securityNotice">
                <div className="securityHeader">
                  <i className="fas fa-shield-alt securityIcon" />
                  <div className="securityTitle">{i18n("pages.withdraw.security.title")}</div>
                </div>
                <div className="securityText">
                  {i18n("pages.withdraw.security.description")}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="currencySection">
              <div className="sectionHeading">{i18n("pages.withdraw.selectCurrency")}</div>
              <div className="currencyDropdownContainer">
                <select
                  className="currencyDropdown"
                  value={selected}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSelected(val);
                    form.setValue("currency", val);
                    // When currency changes, clear amount/password to force validation
                    form.setValue("withdrawAmount", "");
                    form.setValue("withdrawPassword", "");
                  }}
                >
                  <option value="">{i18n("pages.withdraw.selectPlaceholder")}</option>
                  {currencyOptions.map((currency) => {
                    const hasWallet = currentUser?.wallet?.[currency.id]?.address;
                    return (
                      <option key={currency.id} value={currency.id} disabled={!hasWallet}>
                        {currency.name} {!hasWallet && i18n("pages.withdraw.noWalletAddress")}
                      </option>
                    );
                  })}
                </select>
                {selected && (
                  <div className="currencyDropdownIcon" style={{ color: selectedCurrencyData?.color }}>
                    <i className={selectedCurrencyData?.icon} />
                  </div>
                )}
              </div>
              {!selected && <div className="dropdownHint">{i18n("pages.withdraw.selectHint")}</div>}
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

            {selected && (
              <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="formSection">
                    <div className="inputField">
                      <label className="inputLabel">{i18n("pages.withdraw.withdrawalAddress")}</label>
                      <div className="inputWrapper">
                        <input
                          type="text"
                          className="textField"
                          value={address}
                          disabled
                          readOnly
                          aria-readonly
                        />
                        <div className="networkInfo" id="networkDetails">
                          {i18n("pages.withdraw.networkInfo", selectedCurrencyData?.name, selected)}
                        </div>
                      </div>
                      {!address && (
                        <div className="fieldError" role="alert" style={{ color: "#d9534f", marginTop: 6 }}>
                          {i18n("pages.withdraw.errors.noWalletAddress", selected)}
                        </div>
                      )}
                    </div>

                    <div className="inputField">
                      <label className="inputLabel">{i18n("pages.withdraw.withdrawalAmount")}</label>
                      <div className="inputWrapper">
                        <FieldFormItem
                          name="withdrawAmount"
                          type="number"
                          className="amountField"
                          placeholder="0.0"
                          step="any"
                          min="0"
                          disabled={isSubmitting}
                        />
                        <div className="balanceText">
                          {i18n("pages.withdraw.available")}:{" "}
                          <span id="availableBalance">
                            {formatNumber(availableBalance, decimals)} {selected}
                          </span>
                        </div>
                      </div>

                      <div className="fieldError" role="alert" style={{ color: "#d9534f", marginTop: 6 }}>
                        {errors.withdrawAmount?.message && <div>{errors.withdrawAmount?.message}</div>}
                        {!errors.withdrawAmount?.message && validationState.reason === "enterAmount" && (
                          <div>{i18n("pages.withdraw.validation.enterAmount")}</div>
                        )}
                        {!errors.withdrawAmount?.message && validationState.reason === "belowMin" && (
                          <div>
                            {i18n("pages.withdraw.errors.minimumWithdraw", selected, formatNumber(min, decimals), selected)}
                          </div>
                        )}
                        {!errors.withdrawAmount?.message && validationState.reason === "insufficientBalance" && (
                          <div>{i18n("pages.withdraw.validation.insufficientBalance")}</div>
                        )}
                        {!errors.withdrawAmount?.message && validationState.reason === "insufficientForFee" && (
                          <div>{i18n("pages.withdraw.errors.insufficientForFee", formatNumber(fee, decimals), selected)}</div>
                        )}
                      </div>
                    </div>

                    <div className="inputField">
                      <label className="inputLabel">{i18n("pages.withdraw.withdrawalPassword")}</label>
                      <div className="inputWrapper">
                        <FieldFormItem
                          name="withdrawPassword"
                          type="password"
                          className="textField"
                          placeholder={i18n("pages.withdraw.passwordPlaceholder")}
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="fieldError" role="alert" style={{ color: "#d9534f", marginTop: 6 }}>
                        {errors.withdrawPassword?.message && <div>{errors.withdrawPassword?.message}</div>}
                        {!errors.withdrawPassword?.message && validationState.reason === "enterPassword" && (
                          <div>{i18n("pages.withdraw.validation.enterPassword")}</div>
                        )}
                      </div>
                    </div>

                    <div className="feeContainer">
                      <div className="feeRow">
                        <div className="feeLabel">{i18n("pages.withdraw.amountWithdrawal")}</div>
                        <div className="feeValue">{isAmountNumber ? formatNumber(parsedAmount, decimals) : "-"} {selected}</div>
                      </div>

                      <div className="feeRow">
                        <div className="feeLabel">{i18n("pages.withdraw.minimumWithdrawal")}</div>
                        <div className="feeValue">{formatNumber(min, decimals)} {selected}</div>
                      </div>
                      <div className="feeRow">
                        <div className="feeLabel">{i18n("pages.withdraw.networkFee")}</div>
                        <div className="feeValue">{formatNumber(fee, decimals)} {selected}</div>
                      </div>
                      <div className="feeRow receiveAmount">
                        <div className="feeLabel">{i18n("pages.withdraw.youWillReceive")}</div>
                        <div className="feeValue">{formatNumber(receiveAmount, decimals)} {selected}</div>
                      </div>
                    </div>

                    <div className="securityNotice">
                      <div className="securityHeader">
                        <i className="fas fa-shield-alt securityIcon" />
                        <div className="securityTitle">{i18n("pages.withdraw.securityVerification")}</div>
                      </div>
                      <div className="securityText">
                        {i18n("pages.withdraw.securityMessage")}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="withdrawBtn"
                      disabled={validationState.disabled || isSubmitting}
                      aria-disabled={validationState.disabled || isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>
                          {i18n("pages.withdraw.processing")}
                        </>
                      ) : (
                        validationState.label
                      )}
                    </button>

                  </div>
                </form>
              </FormProvider>
            )}
          </>
        )}
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
        }
        
        .textField {
          width: 100%;
          background: transparent;
          border: none;
          color: #FFFFFF;
          font-size: 16px;
          outline: none;
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
        
        .withdrawBtn:hover {
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