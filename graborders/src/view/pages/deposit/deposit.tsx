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
import { QRCodeCanvas } from "qrcode.react";
import FieldFormItem from "src/shared/form/FieldFormItem";

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

  const [selectedNetwork, setSelectedNetwork] = useState("btc");

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

  // Network data
  const networks = [
    { id: "btc", name: "Bitcoin", icon: "fab fa-btc", color: "#F3BA2F" },
    { id: "eth", name: "Ethereum", icon: "fab fa-ethereum", color: "#627EEA" },
    { id: "usdt", name: "Tether", icon: "fas fa-dollar-sign", color: "#26A17B" },
    { id: "sol", name: "Solana", icon: "fas fa-bolt", color: "#00FFA3" },
    { id: "xrp", name: "Ripple", icon: "fas fa-exchange-alt", color: "#23292F" }
  ];

  const selectedNetworkData = useMemo(() => 
    networks.find(network => network.id === selectedNetwork), 
    [selectedNetwork]
  );

  // Handle network selection
  const handleNetworkSelect = (networkId) => {
    setSelectedNetwork(networkId);
  };

  return (
    <div className="depositContainer">
      {/* Header Section */}
      <SubHeader title="Deposit Crypto" />
      
      {/* Network Selection */}
      <div className="networkSection">
        <div className="sectionHeading">Select Network</div>
        <div className="networkList">
          {networks.map((network) => (
            <div 
              key={network.id}
              className={`networkItem ${selectedNetwork === network.id ? 'selected' : ''}`}
              onClick={() => handleNetworkSelect(network.id)}
              data-network={network.id}
            >
              <div className="networkIcon" style={{ color: network.color }}>
                <i className={network.icon} />
              </div>
              <div className="networkName">{network.name}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* QR Code Section */}
      <div className="qrSection">
        <QRCodeCanvas
          value={"1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"} // the text (wallet address) to encode
          size={180} // size in pixels
          bgColor="#ffffff" // background color
          fgColor="#000000" // foreground (QR color)
          level="H" // error correction level (L, M, Q, H)
          includeMargin={true}
          className="qrBox"
        />
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
      
      {/* Form Section */}
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="amountSection">
            <FieldFormItem
              name="amount"
              type="text"
              label="Deposit amount"
              className="form-input"
              className1="form-group"
              className2="form-label"
              className3="password-input-container"
              placeholder="0.00"
            />

            <FieldFormItem
              name="txid"
              type="text"
              label="Transaction ID (TXID)"
              className="form-input"
              className1="form-group"
              className2="form-label"
              className3="password-input-container"
              placeholder="Enter The TXID"
            />
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
            {selectedNetworkData.name} ({selectedNetwork.toUpperCase()})
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

      <style>{`
  .networkSection {
      padding: 0 15px;
      margin-bottom: 20px;
  }

  .sectionHeading {
      font-weight: bold;
      margin-bottom: 12px;
      font-size: 16px;
  }

  .networkList {
      display: flex;
      gap: 10px;
      overflow-x: auto;
      padding-bottom: 5px;
  }

  .networkItem {
      background-color: #2A2A2A;
      border: 2px solid #2A2A2A;
      border-radius: 12px;
      padding: 12px 15px;
      min-width: 110px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
  }

  .networkItem:hover {
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  .networkItem.selected {
      border-color: #F3BA2F;
      background-color: rgba(243, 186, 47, 0.1);
  }

  .networkIcon {
      font-size: 24px;
      margin-bottom: 8px;
  }

  .networkName {
      font-size: 14px;
      font-weight: 500;
  }

  /* QR Code Section */
  .qrSection {
      background-color: #1A1A1A;
      border-radius: 16px;
      padding: 25px;
      margin: 0 15px 20px;
      text-align: center;
  }

  .qrBox {
      width: 200px;
      height: 200px;
      margin: 0 auto 20px;
      background-color: #FFFFFF;
      border-radius: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
  }

  .addressSection {
      margin-bottom: 20px;
  }

  .addressLabel {
      font-size: 14px;
      color: #AAAAAA;
      margin-bottom: 8px;
  }

  .addressText {
      font-size: 14px;
      word-break: break-all;
      margin-bottom: 15px;
      font-family: monospace;
      color: #F3BA2F;
  }

  .copyBtn {
      background-color: #2A2A2A;
      color: #FFFFFF;
      border: none;
      border-radius: 8px;
      padding: 10px 20px;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      cursor: pointer;
      transition: background-color 0.3s;
  }

  .copyBtn:hover {
      background-color: #3A3A3A;
  }

  .copyBtn i {
      margin-right: 8px;
  }

  /* Amount Section */
  .amountSection {
      padding: 0 15px;
      margin-bottom: 20px;
  }

  .amountInputBox {
      background-color: #2A2A2A;
      border-radius: 12px;
      padding: 15px;
      margin-bottom: 8px;
  }

  .amountLabel {
      font-size: 14px;
      color: #AAAAAA;
      margin-bottom: 8px;
  }

  .inputRow {
      display: flex;
      align-items: center;
      justify-content: space-between;
  }

  .amountField {
      background: transparent;
      border: none;
      color: #FFFFFF;
      font-size: 24px;
      font-weight: bold;
      width: 70%;
      outline: none;
  }

  .currencyDropdown {
      background-color: #1A1A1A;
      color: #FFFFFF;
      border: none;
      border-radius: 6px;
      padding: 8px 12px;
      font-size: 14px;
  }

  .minAmountText {
      color: #FF6838;
      font-size: 12px;
      margin-top: 5px;
  }

  /* Warning Section */
  .warningBox {
      background-color: rgba(255, 104, 56, 0.1);
      border: 1px solid #FF6838;
      border-radius: 12px;
      padding: 15px;
      margin: 0 15px 25px;
  }

  .warningHeader {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
  }

  .warningIcon {
      color: #FF6838;
      margin-right: 10px;
      font-size: 18px;
  }

  .warningTitle {
      color: #FF6838;
      font-weight: bold;
      font-size: 16px;
  }

  .warningContent {
      color: #FF6838;
      font-size: 14px;
      line-height: 1.5;
  }

  /* Deposit Button */
  .depositBtn {
      background-color: #F3BA2F;
      color: #000000;
      border: none;
      border-radius: 12px;
      padding: 16px;
      font-size: 16px;
      font-weight: bold;
      width: calc(100% - 30px);
      margin: 0 15px;
      cursor: pointer;
      transition: background-color 0.3s ease;
  }

  .depositBtn:hover {
      background-color: #e6ab0a;
  }

  .depositBtn:disabled {
      background-color: #2A2A2A;
      color: #777777;
      cursor: not-allowed;
  }

  /* Network Details */
  .networkDetails {
      padding: 15px;
      margin-top: 20px;
  }

  .detailRow {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      font-size: 14px;
  }

  .detailLabel {
      color: #AAAAAA;
  }

  .detailValue {
      color: #FFFFFF;
      font-weight: 500;
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

  @media (min-width: 401px) {
    .wallet-container {
      box-shadow: 0 0 20px rgba(243, 186, 47, 0.1);
      min-height: 100vh;
    }
  }

  @media (max-width: 350px) {
    .wallet-asset-icon,
    .wallet-transaction-icon {
      width: 35px;
      height: 35px;
      font-size: 16px;
    }
    
    .networkItem {
      min-width: 90px;
      padding: 10px;
    }
    
    .networkIcon {
      font-size: 20px;
    }
    
    .networkName {
      font-size: 12px;
    }
  }

  .toastMsg.visible {
      opacity: 1;
  }
`}</style>
    </div>
  );
}

export default deposit;