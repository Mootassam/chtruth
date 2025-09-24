import React, { useMemo, useState, useEffect } from "react";
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
import actions from "src/modules/deposit/form/depositFormActions";

// Minimum deposit amounts for each network
const MIN_DEPOSIT_AMOUNTS = {
  USDT: 30,
  SOL: 0.232,
  BTC: 0.0087,
  ETH: 0.0071,
  XRP: 16.9
};

// Network data with addresses
const networks = [
  { 
    id: "btc", 
    name: "Bitcoin", 
    icon: "fab fa-btc", 
    color: "#F3BA2F",
    address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
  },
  { 
    id: "eth", 
    name: "Ethereum", 
    icon: "fab fa-ethereum", 
    color: "#627EEA",
    address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
  },
  {
    id: "usdt",
    name: "Tether",
    icon: "fas fa-dollar-sign",
    color: "#26A17B",
    address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
  },
  { 
    id: "sol", 
    name: "Solana", 
    icon: "fas fa-bolt", 
    color: "#00FFA3",
    address: "So11111111111111111111111111111111111111112"
  },
  {
    id: "xrp",
    name: "Ripple",
    icon: "fas fa-exchange-alt",
    color: "#23292F",
    address: "rPEPPER7kfTD9w2To4CQk6UCfuHM9c6GDY"
  },
];

// Dynamic schema creation based on selected network
const createSchema = (selectedNetwork) => {
  const minAmount = MIN_DEPOSIT_AMOUNTS[selectedNetwork.toUpperCase()] || 0;
  
  return yup.object().shape({
    orderno: yupFormSchemas.string(i18n("entities.deposit.fields.orderno")),
    amount: yupFormSchemas.decimal(i18n("entities.deposit.fields.amount"), {
      required: true,
      min: minAmount
    }).test(
      'min-deposit',
      `Minimum deposit for ${selectedNetwork.toUpperCase()} is ${minAmount}`,
      function(value) {
        if (!value) return false;
        return parseFloat(value) >= minAmount;
      }
    ),
    txid: yupFormSchemas.string(i18n("entities.deposit.fields.txid"), {
      required: true,
    }),
    rechargechannel: yupFormSchemas.string(
      i18n("entities.deposit.fields.rechargechannel")
    ),
  });
};

function Deposit() {
  const dispatch = useDispatch();
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const [selectedNetwork, setSelectedNetwork] = useState("btc");
  const [showToast, setShowToast] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(networks[0].address);

  // Update schema when network changes
  const schema = useMemo(() => createSchema(selectedNetwork), [selectedNetwork]);

  const [initialValues] = useState(() => {
    return {
      orderno: "",
      amount: "",
      txid: "",
      rechargechannel: "",
      rechargetime: "",
      status: "pending",
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: initialValues,
  });

  // Update address when network changes
  useEffect(() => {
    const network = networks.find(n => n.id === selectedNetwork);
    if (network) {
      setCurrentAddress(network.address);
    }
  }, [selectedNetwork]);

  // Copy address to clipboard
  const copyAddressToClipboard = () => {
    navigator.clipboard.writeText(currentAddress).then(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    });
  };

  const onSubmit = (values) => {
    // Generate order number in format: RE + YYYYMMDD + 7 random digits
    const now = new Date();

    // Format date as YYYYMMDD
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const dateStr = `${year}${month}${day}`;

    // Generate 7 random digits
    const randomDigits = Math.floor(Math.random() * 10000000)
      .toString()
      .padStart(7, "0");

    // Create order number
    values.orderno = `RE${dateStr}${randomDigits}`;

    // Set recharge time to current date and time
    values.rechargetime = now.toISOString();

    values.rechargechannel = selectedNetwork;

    dispatch(actions.doCreate(values));

    // Reset form fields after submission
    form.reset({
      orderno: "",
      amount: "",
      txid: "",
      rechargechannel: "",
      rechargetime: "",
      status: "pending",
    });
  };

  const selectedNetworkData = useMemo(
    () => networks.find((network) => network.id === selectedNetwork),
    [selectedNetwork]
  );

  // Handle network selection
  const handleNetworkSelect = (event) => {
    setSelectedNetwork(event.target.value);
    // Clear amount field when network changes to avoid validation issues
    form.setValue("amount", "");
    form.clearErrors("amount");
  };

  // Get minimum amount for current network
  const getMinAmount = () => {
    return MIN_DEPOSIT_AMOUNTS[selectedNetwork.toUpperCase()] || 0;
  };

  return (
    <div className="container">
      {/* Header Section */}
      <SubHeader title="Deposit Crypto" />

      {/* Network Selection */}
      <div className="networkSection">
        <div className="sectionHeading">Select Network</div>
        <div className="networkDropdownContainer">
          <select
            className="networkDropdown"
            value={selectedNetwork}
            onChange={handleNetworkSelect}
          >
            {networks.map((network) => (
              <option key={network.id} value={network.id}>
                {network.name}
              </option>
            ))}
          </select>
          <div
            className="networkDropdownIcon"
            style={{ color: selectedNetworkData.color }}
          >
            <img
              src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${selectedNetworkData.id.toUpperCase()}.png`}
              style={{ width: 25, height: 25 }}
              alt={selectedNetworkData.id}
            />
          </div>
        </div>
      </div>

      {/* QR Code Section */}
      <div className="qrSection">
        <QRCodeCanvas
          value={currentAddress}
          size={180}
          bgColor="#ffffff"
          fgColor="#000000"
          level="H"
          includeMargin={true}
          className="qrBox"
        />
        <div className="addressSection">
          <div className="addressLabel">Your deposit address</div>
          <div className="addressText" id="walletAddress">
            {currentAddress}
          </div>
          <button 
            type="button"
            className="copyBtn" 
            onClick={copyAddressToClipboard}
          >
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
              type="Number"
              label={`Deposit amount (${selectedNetwork.toUpperCase()})`}
              className="textField"
              className1="inputField"
              className2="inputLabel"
              className3="inputWrapper"
              placeholder={`Minimum: ${getMinAmount()} ${selectedNetwork.toUpperCase()}`}
         
            />

            <FieldFormItem
              name="txid"
              type="text"
              label="Transaction ID (TXID)"
              className="textField"
              className1="inputField"
              className2="inputLabel"
              className3="inputWrapper"
              placeholder="Enter The TXID"
            />
          </div>

          {/* Minimum Amount Warning */}
          <div className="minAmountWarning">
            <i className="fas fa-info-circle" />
            Minimum deposit: <strong>{getMinAmount()} {selectedNetwork.toUpperCase()}</strong>
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
            type="submit" 
            className="depositBtn" 
            disabled={!form.formState.isValid}
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
          <div className="detailLabel">Minimum deposit</div>
          <div className="detailValue">{getMinAmount()} {selectedNetwork.toUpperCase()}</div>
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
      <div className={`toastMsg ${showToast ? 'visible' : ''}`} id="toast">
        Address copied to clipboard!
      </div>

      <style>{`
  .depositContainer {
    max-width: 500px;
    margin: 0 auto;
    padding-bottom: 20px;
  }

  .networkSection {
      padding: 0 15px;
      margin-bottom: 20px;
  }

  .sectionHeading {
      font-weight: bold;
      margin-bottom: 12px;
      font-size: 16px;
      color: #FFFFFF;
  }

  /* Network Dropdown Styles */
  .networkDropdownContainer {
    position: relative;
    width: 100%;
  }

  .networkDropdown {
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
    transition: border-color 0.3s;
  }

  .networkDropdown:focus {
    outline: none;
    border-color: #F3BA2F;
  }

  .networkDropdownIcon {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 24px;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
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
      width: 180px;
      height: 180px;
      margin: 0 auto 20px;
      background-color: #FFFFFF;
      border-radius: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      padding: 10px;
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
      line-height: 1.4;
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
      margin-bottom: 10px;
  }

  .minAmountWarning {
    padding: 0 15px;
    margin-bottom: 20px;
    color: #F3BA2F;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .minAmountWarning i {
    color: #F3BA2F;
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

  .depositBtn:hover:not(:disabled) {
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
      background-color: #1A1A1A;
      border-radius: 12px;
      margin: 20px 15px 0;
  }

  .detailRow {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      font-size: 14px;
  }

  .detailRow:last-child {
      margin-bottom: 0;
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
      pointer-events: none;
  }

  .toastMsg.visible {
      opacity: 1;
  }

  /* Form field styling */
  .inputWrapper {
    // margin-bottom: 16px;
  }

  .inputLabel {
    display: block;
    // margin-bottom: 8px;
    color: #AAAAAA;
    font-size: 14px;
  }

  .inputField {
    width: 100%;
    // background-color: #2A2A2A;
    // border: 2px solid #2A2A2A;
    border-radius: 12px;
    // padding: 12px 15px;
    color: white;
    font-size: 16px;
    transition: border-color 0.3s;
  }

  .inputField:focus {
    outline: none;
    border-color: #F3BA2F;
  }

  .inputField:invalid {
    border-color: #FF6838;
  }

  @media (max-width: 350px) {
    .networkDropdown {
      padding: 10px 40px 10px 12px;
      font-size: 14px;
    }
    
    .networkDropdownIcon {
      font-size: 20px;
      right: 12px;
    }

    .qrBox {
      width: 150px;
      height: 150px;
    }

    .addressText {
      font-size: 12px;
    }
  }
`}</style>
    </div>
  );
}

export default Deposit;