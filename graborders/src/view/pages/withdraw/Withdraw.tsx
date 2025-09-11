import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SubHeader from "src/view/shared/Header/SubHeader";
import { useParams } from "react-router-dom";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import * as yup from "yup";
import { i18n } from "../../../i18n";
import { useDispatch, useSelector } from "react-redux";
import authSelectors from "src/modules/auth/authSelectors";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  user: yupFormSchemas.relationToOne(i18n("entities.vip.fields.title"), {}),
  Documenttype: yupFormSchemas.string(i18n("Document Type"), {}),
  realname: yupFormSchemas.string(i18n("Full Name"), {}),
  idnumer: yupFormSchemas.string(i18n("Id Numer"), {}),
});

function Withdraw() {
  const dispatch = useDispatch();
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  
  // Check if user has any wallet
  const hasAnyWallet = currentUser.wallet && 
    Object.values(currentUser.wallet).some(val => val !== null && val !== "");
  
  const [selected, setSelected] = useState("");
  
  // Check if user has a wallet for the selected currency
  const selectedCurrencyHasWallet = Object.values(
    currentUser.wallet || {}
  ).some((currency) => 
    (currency as { address?: string }).address?.trim() !== ""
  );

  const [initialValues] = useState(() => {
    return {
      user: currentUser || [],
      Documenttype: document,
      realname: "",
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: initialValues,
  });

  const onSubmit = (values) => {
    const data = {
      user: currentUser,
      Documenttype: document,
      ...values,
    };
    alert("values");
    // dispatch(actions.doCreate(data));
  };

  const currencyOptions  = [
    {
      id: "btc",
      icon: "fab fa-btc",
      label: "Bitcoin",
      color: "#F3BA2F",
    },
    {
      id: "eth",
      icon: "fab fa-ethereum",
      label: "Ethereum",
      color: "#627EEA",
    },
    {
      id: "tether",
      icon: "fas fa-dollar-sign",
      label: "USDT",
      color: "#26A17B",
    },
  ];

  // Get selected currency data
  const selectedCurrencyData = useMemo(() => 
    currencyOptions.find(currency => currency.id === selected), 
    [selected]
  );

  return (
    <div className="withdrawContainer">
      {/* Header Section */}
      <SubHeader title="Withdraw Crypto" />
      <div className="container">

      {/* No Wallet Message or Form */}
      {!hasAnyWallet ? (
        <div className="noWalletSection">
          <div className="noWalletCard">
            <div className="noWalletIcon">
              <i className="fas fa-wallet"></i>
            </div>
            <h3>No Wallet Address Found</h3>
            <p>
              You haven't added any wallet addresses yet. 
              Please add a withdrawal address to proceed with your transaction.
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
                For your security, we require a verified withdrawal address for each cryptocurrency.
                This helps prevent errors and ensures your funds reach the correct destination.
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Form Section */
        <>
          {/* Currency Selection - Changed to Dropdown */}
          <div className="currencySection">
            <div className="sectionHeading">Select Currency</div>
            <div className="currencyDropdownContainer">
              <select 
                className="currencyDropdown"
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
              >
                <option value="">Select a currency</option>
                {currencyOptions.map((currency) => {
                  const hasWallet = !!currentUser.wallet?.[currency.id];
                  return (
                    <option 
                      key={currency.id} 
                      value={currency.id}
                      disabled={!hasWallet}
                    >
                      {currency.label}
                    </option>
                  );
                })}
              </select>
              {selected && (
                <div className="currencyDropdownIcon" style={{ color: selectedCurrencyData.color }}>
                  <i className={selectedCurrencyData.icon} />
                </div>
              )}
            </div>
            {!selected && (
              <div className="dropdownHint">Please select a currency to continue</div>
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
                        className="textField "
                        id="withdrawalAddress"
                        placeholder="Enter wallet address "
                        value={currentUser?.wallet[selected]?.address || ''}
                        disabled
                      />
                      <div className="networkInfo" id="networkDetails">
                        Network: {selectedCurrencyData.label} ({selected.toUpperCase()})
                      </div>
                    </div>
                  </div>
                  {/* Amount */}
                  <div className="inputField">
                    <label className="inputLabel">Withdrawal Amount</label>
                    <div className="inputWrapper">
                      <div className="amountRow">
                        <input
                          className="amountField"
                          id="amountInput"
                          placeholder={0.0}
                        />
                        <button className="maxBtn" id="maxBtn">
                          MAX
                        </button>
                      </div>
                      <div className="balanceText">
                        Available: <span id="availableBalance">0.2543 {selected.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>
                  {/* Withdrawal Password */}
                  <div className="inputField">
                    <label className="inputLabel">Withdrawal Password</label>
                    <div className="inputWrapper">
                      <input
                        type="password"
                        className="textField"
                        id="withdrawalPassword"
                        placeholder="Enter withdrawal password"
                      />
                    </div>
                  </div>
                  {/* Fee Information */}
                  <div className="feeContainer">
                    <div className="feeRow">
                      <div className="feeLabel">Minimum withdrawal</div>
                      <div className="feeValue" id="minWithdrawal">
                        0.001 {selected.toUpperCase()}
                      </div>
                    </div>
                    <div className="feeRow">
                      <div className="feeLabel">Network fee</div>
                      <div className="feeValue" id="networkFee">
                        0.0005 {selected.toUpperCase()}
                      </div>
                    </div>
                    <div className="feeRow">
                      <div className="feeLabel">Service fee</div>
                      <div className="feeValue" id="serviceFee">
                        0.0001 {selected.toUpperCase()}
                      </div>
                    </div>
                    <div className="feeRow receiveAmount">
                      <div className="feeLabel">You will receive</div>
                      <div className="feeValue" id="receiveAmount">
                        0.0000 {selected.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  {/* Security Notice */}
                  <div className="securityNotice">
                    <div className="securityHeader">
                      <i className="fas fa-shield-alt securityIcon" />
                      <div className="securityTitle">Security Verification</div>
                    </div>
                    <div className="securityText">
                      For your security, withdrawals require password confirmation and
                      may be subject to review. Withdrawals to incorrect addresses
                      cannot be reversed.
                    </div>
                  </div>
                  {/* Withdraw Button */}
                  <button
                    className="withdrawBtn"
                    id="withdrawBtn"
                    onClick={form.handleSubmit(onSubmit)}
                  >
                    Confirm Withdrawal
                  </button>
                </div>
              </form>
            </FormProvider>
          )}
        </>
      )}

      {/* Toast Notification */}
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
        
        .amountRow {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
        }
        
        .amountField {
          flex: 1;
          background: transparent;
          border: none;
          color: #FFFFFF;
          font-size: 20px;
          font-weight: bold;
          outline: none;
        }
        
        .maxBtn {
          background-color: #1A1A1A;
          color: #F3BA2F;
          border: none;
          border-radius: 6px;
          padding: 6px 12px;
          font-size: 14px;
          cursor: pointer;
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