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
      color: "currencyIcon btcColor",
    },
    {
      id: "eth",
      icon: "fab fa-ethereum",
      label: "Ethereum",
      color: "currencyIcon ethColor",
    },
    {
      id: "tether",
      icon: "fas fa-dollar-sign",
      label: "USDT",
      color: "currencyIcon usdtColor",
    },
  ];

  return (
    <div className="withdrawContainer">
      {/* Header Section */}
      <SubHeader title="Withdraw Crypto" />
      <div className="container">


      {/* No Wallet Message or Form */}
      {!selectedCurrencyHasWallet ? (
        <div className="noWalletSection">
          <div className="noWalletCard">
            <div className="noWalletIcon">
              <i className="fas fa-wallet"></i>
            </div>
            <h3>No Wallet Address Found</h3>
            <p>
              You haven't added a {selected.toUpperCase()} wallet address yet. 
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
        
              {/* Currency Selection */}
      <div className="currencySection">
        <div className="sectionHeading">Select Currency</div>
        <div className="currencyList">
          {currencyOptions.map((item) => {
            const hasWallet = !!currentUser.wallet?.[item.id]; // safe check

            return (
              <div
                key={item.id}
                className={`currencyItem ${selected === item.id ? 'selected' : ''} ${!hasWallet ? 'disabled' : ''}`}
                data-currency={item.id}
                onClick={() => hasWallet && setSelected(item.id)}
              >
                <div className={item.color}>
                  <i className={item.icon} />
                </div>
                <div className="currencyTitle">{item.label}</div>
              </div>
            );
          })}
        </div>
      </div>
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
                    value={currentUser?.wallet[selected]?.address}
                    disabled
                  />
                  <div className="networkInfo" id="networkDetails">
                    Network: Bitcoin (BTC)
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
                    Available: <span id="availableBalance">0.2543 BTC</span>
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
                    0.001 BTC
                  </div>
                </div>
                <div className="feeRow">
                  <div className="feeLabel">Network fee</div>
                  <div className="feeValue" id="networkFee">
                    0.0005 BTC
                  </div>
                </div>
                <div className="feeRow">
                  <div className="feeLabel">Service fee</div>
                  <div className="feeValue" id="serviceFee">
                    0.0001 BTC
                  </div>
                </div>
                <div className="feeRow receiveAmount">
                  <div className="feeLabel">You will receive</div>
                  <div className="feeValue" id="receiveAmount">
                    0.0000 BTC
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
        </>

      )}

      {/* Toast Notification */}
      <div className="toastMsg" id="toastNotification">
        Withdrawal address copied!
      </div>

      </div>

      <style >{`
        
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
        
      `}</style>
    </div>
  );
}

export default Withdraw;