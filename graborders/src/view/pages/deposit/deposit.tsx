import React, { useMemo, useState } from "react";
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

function deposit() {
  const dispatch = useDispatch();
  const currentUser = useSelector(authSelectors.selectCurrentUser);

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
  return (
    <div className="depositContainer">
      {/* Header Section */}

      <SubHeader title="Deposit Crypto" />
      {/* Network Selection */}
      <div className="networkSection">
        <div className="sectionHeading">Select Network</div>
        <div className="networkList">
          <div className="networkItem selected" data-network="btc">
            <div className="networkIcon">
              <i className="fab fa-btc" />
            </div>
            <div className="networkName">Bitcoin</div>
          </div>
          <div className="networkItem" data-network="eth">
            <div className="networkIcon">
              <i className="fab fa-ethereum" />
            </div>
            <div className="networkName">Ethereum</div>
          </div>
          <div className="networkItem" data-network="trx">
            <div className="networkIcon">
              <i className="fas fa-bolt" />
            </div>
            <div className="networkName">TRON (TRC20)</div>
          </div>
        </div>
      </div>
      {/* QR Code Section */}
      <div className="qrSection">
        <div className="qrBox" id="qrcode" />
        <div className="addressSection">
          <div className="addressLabel">Your deposit address</div>
          <div className="addressText" id="walletAddress">
            1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
          </div>
          <button className="copyBtn" id="copyAddress">
            <i className="fas fa-copy" /> Copy Address
          </button>
        </div>
      </div>
      {/* Amount Section */}
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="amountSection">
            <div className="amountInputBox">
              <div className="amountLabel">Deposit amount</div>
              <div className="inputRow">
                <input
                  className="amountField"
                  placeholder={"0.0"}
                  id="amountInput"
                />
                <select className="currencyDropdown" id="currencySelector">
                  <option>BTC</option>
                  <option>USDT</option>
                  <option>USD</option>
                </select>
              </div>
            </div>
            <div className="minAmountText" id="minAmount">
              Minimum deposit: 0.001 BTC
            </div>
          </div>

          {/* Warning Section */}
          <div className="warningBox">
            <div className="warningHeader">
              <i className="fas fa-exclamation-circle warningIcon" />
              <div className="warningTitle">Important Notice</div>
            </div>
            <div className="warningContent">
              Please ensure that you select the correct network for your
              deposit. Sending funds through the wrong network may result in
              permanent loss of your assets, which cannot be recovered.
            </div>
          </div>
          {/* Deposit Button */}
          <button
            className="depositBtn"
            id="depositBtn"
            onClick={form.handleSubmit(onSubmit)}
          >
            Confirm Deposit
          </button>
        </form>
      </FormProvider>
      {/* Network Details */}
      <div className="networkDetails">
        <div className="detailRow">
          <div className="detailLabel">Network</div>
          <div className="detailValue" id="detailNetwork">
            Bitcoin (BTC)
          </div>
        </div>
        <div className="detailRow">
          <div className="detailLabel">Estimated arrival</div>
          <div className="detailValue">3 network confirmations</div>
        </div>
        <div className="detailRow">
          <div className="detailLabel">Processing time</div>
          <div className="detailValue">10-30 minutes</div>
        </div>
      </div>
      {/* Toast Notification */}
      <div className="toastMsg" id="toast">
        Address copied to clipboard!
      </div>
    </div>
  );
}

export default deposit;
