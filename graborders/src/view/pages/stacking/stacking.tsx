import { log } from "node:console";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import stackingPlanListActions from "src/modules/stackingPlan/list/stackingPlanListActions";
import stackingPlanListSelectros from "src/modules/stackingPlan/list/stackingPlanListSelectors";
import stckingListSelectors from "src/modules/stacking/list/stackingListSelectors";
import stackingListSelectors from "src/modules/stacking/list/stackingListSelectors";
import stackingListActions from "src/modules/stacking/list/stackingListActions";
import assetsListSelector from "src/modules/assets/list/assetsListSelectors";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import { i18n } from "../../../i18n";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import stackingFormAction from "src/modules/stacking/form/stackingFormActions";
import FieldFormItem from "src/shared/form/FieldFormItem";
import authSelectors from "src/modules/auth/authSelectors";
const schema = yup.object().shape({
  user: yupFormSchemas.relationToOne(i18n("entities.stacking.fields.user"), {}),
  plan: yupFormSchemas.relationToOne(i18n("entities.stacking.fields.plan"), {}),
  amount: yupFormSchemas.decimal(i18n("entities.stacking.fields.amount"), {
    required: true,
  }),
  status: yupFormSchemas.enumerator(i18n("entities.stacking.fields.status"), {
    options: ["active", "completed", "cancelled"],
  }),
  startDate: yupFormSchemas.datetime(
    i18n("entities.stacking.fields.startDate"),
    {}
  ),
  endDate: yupFormSchemas.datetime(
    i18n("entities.stacking.fields.endDate"),
    {}
  ),
  earnedRewards: yupFormSchemas.decimal(
    i18n("entities.stacking.fields.earnedRewards"),
    {}
  ),
});
function StackingPage() {
  const [activeTab, setActiveTab] = useState("options");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const listPlanStacking = useSelector(stackingPlanListSelectros.selectRows);
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const stackingActive = useSelector(stackingListSelectors.selectRows);
  const listStacking = useSelector(stckingListSelectors.selectRows);
  const assets = useSelector(assetsListSelector.selectRows);

  const [modalData, setModalData] = useState({
    crypto: "",
    daily: "",
    balance: 0,
    min: 0,
    max:0,
    symbol: "",
    plan: "",
    unstakingPeriod: "",
  });
  const [stakeAmount, setStakeAmount] = useState("");
  const [initialValues] = useState(() => {
    return {
      user: "",
      plan: "",
      amount: "",
      status: "",
      startDate: "",
      endDate: "",
      earnedRewards: "",
    };
  });
  const form = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: initialValues,
  });

  const onSubmit = (values) => {
    values.startDate = Date.now();
    // values.endDate = modalData.unstakingPeriod
    values.status = "active";
    values.plan = modalData.plan;
    values.user = currentUser.id;
    dispatch(stackingFormAction.doCreate(values));
  };
  const openStakeModal = (
    crypto,
    daily,
    balance,
    min,
    max,
    symbol,
    plan,
    unstakingPeriod
  ) => {
    setModalData({
      crypto,
      daily,
      balance,
      min,
      max,
      symbol,
      plan,
      unstakingPeriod,
    });
    setIsModalOpen(true);
  };

  const closeStakeModal = () => {
    setIsModalOpen(false);
    setStakeAmount("");
  };

  const handleStake = () => {
    // Handle stake logic here
    alert(`Staking ${stakeAmount} ${modalData.symbol}`);
    closeStakeModal();
  };

  const calculateRewards = () => {
    if (!stakeAmount || isNaN(stakeAmount) || stakeAmount <= 0) return "0";
    const amount = parseFloat(stakeAmount);
    const apy = parseFloat(modalData.daily);
    return (amount * (apy / 100)).toFixed(4);
  };
  const [balances, setBalances] = useState<{ [key: string]: number }>({});

  const balance = (symbol?) => {
    const formatted = assets.reduce((acc, item) => {
      acc[item.symbol] = item.amount;
      return acc;
    }, {});
    setBalances(formatted);
  };
  useEffect(() => {
    dispatch(stackingPlanListActions.doFetch());
    dispatch(stackingListActions.doFetch());
    balance();

    return () => {};
  }, [dispatch]);

  return (
    <div className="stacking-container">
      {/* Header Section */}
      <div className="stacking-header">
        <div
          className="stacking-back-button"
          onClick={() => window.history.back()}
        >
          <i className="fas fa-arrow-left" />
        </div>
        <div className="stacking-page-title">Staking</div>
        <div className="stacking-header-actions">
          {/* <i className="fas fa-gift stacking-header-icon" aria-label="Rewards" />
          <i className="fas fa-history stacking-header-icon" aria-label="Staking History" /> */}
        </div>
      </div>

      {/* Staking Overview */}
      <div className="stacking-overview">
        <div className="stacking-label">Total Staked Balance</div>
        <div className="stacking-balance">$3,425.80</div>
        <div className="stacking-rewards-earned">+ $142.50 earned</div>
      </div>

      {/* Toggle Section */}
      <div className="stacking-toggle-section">
        <div
          className={`stacking-toggle-option ${
            activeTab === "options" ? "stacking-toggle-active" : ""
          }`}
          onClick={() => setActiveTab("options")}
        >
          Staking Options
        </div>
        <div
          className={`stacking-toggle-option ${
            activeTab === "active" ? "stacking-toggle-active" : ""
          }`}
          onClick={() => setActiveTab("active")}
        >
          Active Stakes
        </div>
      </div>

      {/* Staking Options */}
      {activeTab === "options" && (
        <div className="stacking-options">
          {listPlanStacking.map((item) => (
            <div className="stacking-option-card" key={item.currency}>
              <div className="stacking-option-header">
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <img
                    src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${item.currency}.png`}
                    style={{ width: 25, height: 25 }}
                    alt={item.currency}
                  />
                  <div className="stacking-option-name">{item.currency}</div>
                </div>
                <div className="stacking-option-apy">
                  {item.dailyRate}% Daily
                </div>{" "}
                {/* changed from APY */}
              </div>

              <div className="stacking-option-details">
                <div className="stacking-detail-label">Minimum Stake</div>
                <div className="stacking-detail-value">
                  {item.minimumStake} {item.currency}
                </div>
              </div>

              <div className="stacking-option-details">
                <div className="stacking-detail-label">Unstaking Period</div>
                <div className="stacking-detail-value">
                  {item.unstakingPeriod} days
                </div>
              </div>

              <div
                className="stacking-stake-button"
                onClick={() =>
                  openStakeModal(
                    item.currency, // name
                    item.dailyRate, // daily rate
                    item.earnedRewards, // earned rewards or any value you want
                    item.minimumStake, // minimum stake
                    item.maxStake,
                    item.currency, // currency
                    item.id,
                    item.unstakingPeriod
                  )
                }
              >
                Stake {item.currency}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Active Stakes */}
      {activeTab === "active" && (
        <div className="stacking-active-stakes">
          <div className="stacking-section-title">
            <span>Active Stakes</span>
            <span className="stacking-view-all">View All</span>
          </div>
          {listStacking.map((item) => (
            <div className="stacking-stake-item">
              <div className="stacking-stake-header">
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <img
                    src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${item?.plan?.currency}.png`}
                    style={{ width: 25, height: 25 }}
                    alt={item.currency}
                  />
                  <div className="stacking-stake-crypto">
                    {item?.plan?.currency}
                  </div>
                </div>
                <div className="stacking-stake-amount">
                  {item.amount} {item?.plan?.currency}
                </div>
              </div>
              <div className="stacking-stake-details">
                <div className="stacking-stake-label">Daily</div>
                <div className="stacking-stake-value">
                  {item?.plan?.dailyRate}%
                </div>
              </div>
              <div className="stacking-stake-details">
                <div className="stacking-stake-label">Earned</div>
                <div className="stacking-stake-value stacking-value-positive">
                  0.12 ETH
                </div>
              </div>
              <div className="stacking-stake-details">
                <div className="stacking-stake-label">Duration</div>
                <div className="stacking-stake-value">
                  15/{item?.plan?.unstakingPeriod} days
                </div>
              </div>
              <div className="stacking-progress-bar">
                <div
                  className="stacking-progress-fill"
                  style={{ width: "50%" }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stake Modal */}
      {isModalOpen && (
        <div className="stacking-modal-overlay">
          <div className="stacking-modal-content">
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="stacking-modal-header">
                  <div className="stacking-modal-title">
                    Stake <span>{modalData.crypto}</span>
                  </div>
                  <div
                    className="stacking-close-modal"
                    onClick={closeStakeModal}
                  >
                    <i className="fas fa-times" />
                  </div>
                </div>
                <div className="stacking-input-group">
                  <FieldFormItem
                    name="amount"
                    type="text"
                    label="Amount to Stake"
                    className="textField"
                    className1="inputField"
                    className2="inputLabel"
                    className3="inputWrapper"
                    placeholder="Enter The Amount"
                  />
                  <div className="stacking-balance-info">
                    Balance: <span>{balances[modalData.symbol]}</span>{" "}
                    <span>{modalData.symbol}</span>
                  </div>
                </div>
                <div className="stacking-modal-details">
                  <div className="stacking-modal-detail">
                    <span>Daily</span>
                    <span>{modalData.daily}%</span>
                  </div>
                  <div className="stacking-modal-detail">
                    <span>Minimum Stake</span>
                    <span>
                      {modalData.min} {modalData.symbol}
                    </span>
                  </div>
                  <div className="stacking-modal-detail">
                    <span>Maximum Stake</span>
                    <span>
                      {modalData.max} {modalData.symbol}
                    </span>
                  </div>
                  <div className="stacking-modal-detail">
                    <span>Estimated Rewards</span>
                    <span>
                      {calculateRewards()} {modalData.symbol}/year
                    </span>
                  </div>
                </div>
                <div
                  onClick={form.handleSubmit(onSubmit)}
                  className="stacking-modal-button"
                >
                  Confirm Stake
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      )}

      <style>{`
        .stacking-container {
          max-width: 400px;
          margin: 0 auto;
          background-color: #000000;
          color: #ffffff;
          min-height: 100vh;
          padding-bottom: 80px;
        }

        /* Header Section */
        .stacking-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 15px;
          background-color: #000000;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .stacking-back-button {
          cursor: pointer;
          font-size: 18px;
        }

        .stacking-page-title {
          font-weight: bold;
          font-size: 18px;
        }

        .stacking-header-actions {
          display: flex;
          gap: 15px;
        }

        .stacking-header-icon {
          font-size: 20px;
          cursor: pointer;
        }

        /* Staking Overview */
        .stacking-overview {
          margin: 20px 15px;
          background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
          border-radius: 16px;
          padding: 20px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .stacking-balance {
          font-size: 32px;
          font-weight: bold;
          margin: 10px 0;
          color: #f3ba2f;
        }

        .stacking-label {
          color: #aaaaaa;
          font-size: 14px;
          margin-bottom: 15px;
        }

        .stacking-rewards-earned {
          background-color: rgba(0, 192, 118, 0.2);
          color: #00c076;
          padding: 8px 15px;
          border-radius: 20px;
          font-size: 14px;
          display: inline-block;
          margin-top: 10px;
        }

        /* Toggle Section */
        .stacking-toggle-section {
          display: flex;
          background-color: #1a1a1a;
          margin: 0 15px 20px;
          border-radius: 12px;
          padding: 5px;
        }

        .stacking-toggle-option {
          flex: 1;
          padding: 12px;
          text-align: center;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .stacking-toggle-active {
          background-color: #2a2a2a;
          color: #f3ba2f;
        }

        /* Staking Options */
        .stacking-options {
          margin: 0 15px 20px;
        }

        .stacking-option-card {
          background-color: #1a1a1a;
          border-radius: 12px;
          padding: 15px;
          margin-bottom: 15px;
          border: 1px solid #2a2a2a;
          transition: transform 0.2s ease;
        }

        .stacking-option-card:hover {
          transform: translateY(-2px);
          border-color: #f3ba2f;
        }

        .stacking-option-header {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
        }

        .stacking-option-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 12px;
        }

        .stacking-eth-icon {
          background-color: #627eea;
          color: #fff;
        }

        .stacking-btc-icon {
          background-color: #f3ba2f;
          color: #000;
        }

        .stacking-bnb-icon {
          background-color: #f3ba2f;
          color: #000;
        }

        .stacking-option-name {
          font-weight: bold;
          font-size: 16px;
        }

        .stacking-option-apy {
          margin-left: auto;
          background-color: rgba(0, 192, 118, 0.2);
          color: #00c076;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: bold;
        }

        .stacking-option-details {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .stacking-detail-label {
          color: #aaaaaa;
          font-size: 14px;
        }

        .stacking-detail-value {
          font-weight: bold;
          font-size: 14px;
        }

        .stacking-stake-button {
          background-color: #f3ba2f;
          color: #000000;
          text-align: center;
          padding: 12px;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          margin-top: 10px;
          transition: background-color 0.2s ease;
        }

        .stacking-stake-button:hover {
          background-color: #e0a91c;
        }

        /* Active Stakes */
        .stacking-active-stakes {
          margin: 25px 15px;
        }

        .stacking-section-title {
          font-weight: bold;
          font-size: 16px;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .stacking-view-all {
          color: #f3ba2f;
          font-size: 14px;
          cursor: pointer;
        }

        .stacking-stake-item {
          background-color: #1a1a1a;
          border-radius: 12px;
          padding: 15px;
          margin-bottom: 15px;
        }

        .stacking-stake-header {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
        }

        .stacking-stake-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 10px;
        }

        .stacking-stake-crypto {
          font-weight: bold;
        }

        .stacking-stake-amount {
          margin-left: auto;
          font-weight: bold;
        }

        .stacking-stake-details {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .stacking-stake-label {
          color: #aaaaaa;
          font-size: 12px;
        }

        .stacking-stake-value {
          font-size: 12px;
          font-weight: 500;
        }

        .stacking-value-positive {
          color: #00c076;
        }

        .stacking-progress-bar {
          height: 6px;
          background-color: #2a2a2a;
          border-radius: 3px;
          margin: 10px 0;
          overflow: hidden;
        }

        .stacking-progress-fill {
          height: 100%;
          background-color: #f3ba2f;
          border-radius: 3px;
          width: 65%;
        }

        /* Bottom Navigation */
        .stacking-bottom-nav {
          position: fixed;
          bottom: 0;
          width: 100%;
          max-width: 400px;
          background-color: #000000;
          display: flex;
          justify-content: space-around;
          padding: 15px 0;
          border-top: 1px solid #2a2a2a;
        }

        .stacking-nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #aaaaaa;
          font-size: 12px;
          cursor: pointer;
        }

        .stacking-nav-icon {
          font-size: 20px;
          margin-bottom: 4px;
        }

        .stacking-nav-active {
          color: #f3ba2f;
        }

        /* Modal */
        .stacking-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .stacking-modal-content {
          background-color: #1a1a1a;
          width: 90%;
          max-width: 400px;
          border-radius: 16px;
          padding: 20px;
        }

        .stacking-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .stacking-modal-title {
          font-weight: bold;
          font-size: 18px;
        }

        .stacking-close-modal {
          color: #aaaaaa;
          font-size: 20px;
          cursor: pointer;
        }

        .stacking-input-group {
          margin-bottom: 20px;
        }

        .stacking-input-label {
          display: block;
          color: #aaaaaa;
          margin-bottom: 8px;
          font-size: 14px;
        }

        .stacking-amount-input {
          background-color: #2a2a2a;
          border: none;
          color: white;
          font-size: 18px;
          padding: 15px;
          border-radius: 8px;
          width: 100%;
          outline: none;
        }

        .stacking-balance-info {
          text-align: right;
          color: #aaaaaa;
          font-size: 12px;
          margin-top: 5px;
        }

        .stacking-modal-details {
          background-color: #2a2a2a;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 20px;
        }

        .stacking-modal-detail {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .stacking-modal-detail:last-child {
          margin-bottom: 0;
        }

        .stacking-modal-button {
          background-color: #f3ba2f;
          color: #000000;
          text-align: center;
          padding: 16px;
          border-radius: 12px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .stacking-modal-button:hover {
          background-color: #e0a91c;
        }

        @media (max-width: 350px) {
          .stacking-balance {
            font-size: 28px;
          }

          .stacking-option-icon {
            width: 36px;
            height: 36px;
          }

          .stacking-option-name {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
}

export default StackingPage;
