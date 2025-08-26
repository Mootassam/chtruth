import React from "react";
import SubHeader from "src/view/shared/Header/SubHeader";

function Withdraw() {
  return (
    <div className="withdrawContainer">
      {/* Header Section */}

      <SubHeader title="Withdraw Crypto" />
      {/* Currency Selection */}
      <div className="currencySection">
        <div className="sectionHeading">Select Currency</div>
        <div className="currencyList">
          <div className="currencyItem selected" data-currency="btc">
            <div className="currencyIcon btcColor">
              <i className="fab fa-btc" />
            </div>
            <div className="currencyTitle">Bitcoin</div>
            <div className="currencyBalance">0.2543 BTC</div>
          </div>
          <div className="currencyItem" data-currency="eth">
            <div className="currencyIcon ethColor">
              <i className="fab fa-ethereum" />
            </div>
            <div className="currencyTitle">Ethereum</div>
            <div className="currencyBalance">1.842 ETH</div>
          </div>
          <div className="currencyItem" data-currency="usdt">
            <div className="currencyIcon usdtColor">
              <i className="fas fa-dollar-sign" />
            </div>
            <div className="currencyTitle">USDT</div>
            <div className="currencyBalance">1250.50 USDT</div>
          </div>
        </div>
      </div>
      {/* Form Section */}
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
            For your security, withdrawals require password confirmation and may
            be subject to review. Withdrawals to incorrect addresses cannot be
            reversed.
          </div>
        </div>
        {/* Withdraw Button */}
        <button className="withdrawBtn" id="withdrawBtn">
          Confirm Withdrawal
        </button>
      </div>
      {/* Toast Notification */}
      <div className="toastMsg" id="toastNotification">
        Withdrawal address copied!
      </div>
    </div>
  );
}

export default Withdraw;
