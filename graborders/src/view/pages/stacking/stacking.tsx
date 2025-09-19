import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWatch } from 'react-hook-form';
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
import assetsActions from "src/modules/assets/list/assetsListActions"; // Import assets actions

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
  const [cryptoPrices, setCryptoPrices] = useState({});

  const [modalData, setModalData] = useState({
    crypto: "",
    daily: "",
    balance: 0,
    min: 0,
    max: 0,
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

  // Use useWatch to get the amount field value from react-hook-form
  const watchedAmount = useWatch({
    control: form.control,
    name: 'amount',
    defaultValue: ''
  });

  // Update stakeAmount when the form field changes
  useEffect(() => {
    setStakeAmount(watchedAmount || '');
  }, [watchedAmount]);

  const onSubmit = async (values) => {
    values.startDate = new Date();
    
    // Calculate the endDate by adding unstakingPeriod days to startDate
    const endDate = new Date(values.startDate);
    endDate.setDate(endDate.getDate() + parseInt(modalData.unstakingPeriod));
    values.endDate = endDate.toISOString();

    values.status = "active";
    values.plan = modalData.plan;
    values.user = currentUser.id;
    
    try {
      await dispatch(stackingFormAction.doCreate(values));
      
      // Refresh assets data after successful stake
      dispatch(assetsActions.doFetch());
      
      // Update the local balances state immediately
      setBalances(prev => ({
        ...prev,
        [modalData.symbol]: prev[modalData.symbol] - parseFloat(stakeAmount)
      }));
      
      closeStakeModal();
    } catch (error) {
      console.error("Staking failed:", error);
    }
  };

  const calculateRewards = () => {
    if (!stakeAmount || isNaN(stakeAmount) || stakeAmount <= 0) return "0";
    
    const amount = parseFloat(stakeAmount);
    const dailyRate = parseFloat(modalData.daily);
    const unstakingPeriod = parseFloat(modalData.unstakingPeriod);

    // Total Reward = Amount * (Daily Rate / 100) * Unstaking Period
    const totalReward = amount * (dailyRate / 100) * unstakingPeriod;
    
    return totalReward.toFixed(6);
  };

  const validateStake = () => {
    const amount = parseFloat(stakeAmount);
    const userBalance = balances[modalData.symbol] || 0;

    // Check if input is a valid number
    if (isNaN(amount) || amount <= 0) {
      return { isValid: false, message: "Enter an amount" };
    }

    // Check if user has enough balance
    if (amount > userBalance) {
      return { isValid: false, message: "Insufficient balance" };
    }

    // Check if amount is within plan limits
    if (amount < modalData.min) {
      return { isValid: false, message: `Min: ${modalData.min}` };
    }

    if (amount > modalData.max) {
      return { isValid: false, message: `Max: ${modalData.max}` };
    }

    // If all checks pass
    return { isValid: true, message: "Confirm Stake" };
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
    setStakeAmount(""); // Reset amount when opening modal
    form.setValue('amount', ''); // Also reset the form value
  };

  const closeStakeModal = () => {
    setIsModalOpen(false);
    setStakeAmount("");
    form.setValue('amount', ''); // Reset form value when closing modal
  };

  const [balances, setBalances] = useState<{ [key: string]: number }>({});

  const balance = (symbol?) => {
    const formatted = assets.reduce((acc, item) => {
      acc[item.symbol] = item.amount;
      return acc;
    }, {});
    setBalances(formatted);
  };

  // Fetch cryptocurrency prices
  const fetchCryptoPrices = async () => {
    try {
      // Get unique currencies from stacking plans
      const currencies = [...new Set(listPlanStacking.map(plan => plan.currency))];
      
      // Fetch prices for each currency
      const pricePromises = currencies.map(async (currency) => {
        if (currency === 'USDT') return { currency, price: 1 };
        
        try {
          const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${currency}USDT`);
          const data = await response.json();
          return { currency, price: parseFloat(data.price) };
        } catch (error) {
          console.error(`Error fetching price for ${currency}:`, error);
          return { currency, price: 0 };
        }
      });
      
      const prices = await Promise.all(pricePromises);
      const priceMap = {};
      prices.forEach(item => {
        priceMap[item.currency] = item.price;
      });
      
      setCryptoPrices(priceMap);
    } catch (error) {
      console.error('Error fetching crypto prices:', error);
    }
  };

  // Calculate total staked value in USD
  const calculateTotalStakedValue = () => {
    let total = 0;
    
    listStacking.forEach(stake => {
      const currency = stake?.plan?.currency;
      const amount = parseFloat(stake.amount) || 0;
      const price = cryptoPrices[currency] || 0;
      
      total += amount * price;
    });
    
    return total.toFixed(2);
  };

  // Calculate total earned rewards in USD
  const calculateTotalEarnedRewards = () => {
    let total = 0;
    
    listStacking.forEach(stake => {
      const currency = stake?.plan?.currency;
      const earned = parseFloat(stake.earnedRewards) || 0;
      const price = cryptoPrices[currency] || 0;
      
      total += earned * price;
    });
    
    return total.toFixed(2);
  };
  
  useEffect(() => {
    dispatch(stackingPlanListActions.doFetch());
    dispatch(stackingListActions.doFetch());
     dispatch(assetsActions.doFetch()); 
    balance();

    return () => {};
  }, [dispatch ]);

  // Fetch crypto prices when component mounts and when stacking data changes
  useEffect(() => {
    if (listPlanStacking.length > 0) {
      fetchCryptoPrices();
    }
  }, [listPlanStacking]);

  // Get validation result for the button
  const validation = validateStake();
  const isButtonDisabled = !validation.isValid;
  const buttonText = validation.message;

  const daysElpased =(item) => { 
    const now = new Date()
     const startDate = new Date(item.startDate);
  const remaininig =  Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
return remaininig
  }

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
        <div className="stacking-balance">${calculateTotalStakedValue()}</div>
        <div className="stacking-rewards-earned">+ ${calculateTotalEarnedRewards()} earned</div>
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
                </div>
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
                    item.currency,
                    item.dailyRate,
                    item.earnedRewards,
                    item.minimumStake,
                    item.maxStake,
                    item.currency,
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
    {listStacking.map((item) => {
      const progressPercentage = Math.min(100, (daysElpased(item) / item?.plan?.unstakingPeriod) * 100);
      
      return (
        <div className="stacking-stake-item" key={item.id}>
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
              {item.earnedRewards || 0} {item?.plan?.currency}
            </div>
          </div>
          <div className="stacking-stake-details">
            <div className="stacking-stake-label">Duration</div>
            <div className="stacking-stake-value">
              {daysElpased(item)}/{item?.plan?.unstakingPeriod} days
            </div>
          </div>
          <div className="stacking-progress-bar">
            <div
              className="stacking-progress-fill"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      );
    })}
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
                    type="number"
                    label="Amount to Stake"
                    className="textField"
                    className1="inputField"
                    className2="inputLabel"
                    className3="inputWrapper"
                    placeholder="Enter The Amount"
                    // No onChange needed - handled by useWatch
                  />
                  <div className="stacking-balance-info">
                    Balance: <span>{balances[modalData.symbol] || 0}</span>{" "}
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
                    <span>Estimated Total Rewards</span>
                    <span>
                      {calculateRewards()} {modalData.symbol}
                    </span>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isButtonDisabled}
                  className={`stacking-modal-button ${
                    isButtonDisabled ? 'stacking-modal-button-disabled' : ''
                  }`}
                >
                  {buttonText}
                </button>
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
          border: none;
          width: 100%;
          font-size: 16px;
        }

        .stacking-modal-button:hover:not(:disabled) {
          background-color: #e0a91c;
        }

        .stacking-modal-button-disabled {
          background-color: #2a2a2a !important;
          color: #aaaaaa !important;
          cursor: not-allowed !important;
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