
// src/components/FuturesModal.tsx
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import futuresFormAction from "src/modules/futures/form/futuresFormActions";
import futuresListAction from "src/modules/futures/list/futuresListActions";
import futuresViewActions from "src/modules/futures/view/futuresViewActions";

interface FuturesModalProps {
  isOpen: boolean;
  onClose: () => void;
  direction: "up" | "down" | null;
  dispatch: any;
  listAssets?: any;
  selectedCoin: string;
  marketPrice: string;
  availableBalance: number;
  setOpeningOrders
}

const FuturesModal: React.FC<FuturesModalProps> = ({
  isOpen,
  onClose,
  direction,
  dispatch,
  listAssets,
  selectedCoin,
  marketPrice,
  availableBalance,
  setOpeningOrders
}) => {
  const [selectedDuration, setSelectedDuration] = useState<string>("120");
  const [selectvalue, setSelectedValue] = useState("")
  const [selectedLeverage, setSelectedLeverage] = useState<string>("2");
  const [futuresAmount, setFuturesAmount] = useState<number>(1);
  const [tradeStatus, setTradeStatus] = useState<
    "configuring" | "in-progress" | "completed"
  >("configuring");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [tradeResult, setTradeResult] = useState<"win" | "loss" | null>(null);
  const [amountError, setAmountError] = useState<string>("");
  const [futureId, setFutureId] = useState<string | null>(null);
  const [pnlDisplay, setPnlDisplay] = useState<string>("");
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [tradeDetails, setTradeDetails] = useState<any>(null);

  const changeValues = (duration, value) => {
    setSelectedDuration(duration);
    setSelectedValue(value)
  }

  // prevent background scroll when modal open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // refresh list on mount (and when dispatch changes)
  useEffect(() => {
    dispatch(futuresListAction.doFetch());

  }, [dispatch]);

  // validate amount
  useEffect(() => {
    if (futuresAmount <= 0) {
      setAmountError("Amount must be greater than 0");
    } else if (futuresAmount > availableBalance) {
      setAmountError("Insufficient balance");
    } else {
      setAmountError("");
    }
  }, [futuresAmount, availableBalance]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (tradeStatus === "in-progress") {

      if (timeLeft > 0) {
        interval = setInterval(() => {
          setTimeLeft((prev) => prev - 1);
        }, 1000);
      } else {
        // if timeLeft is 0 and we're in-progress -> finalize
        (async () => {
          await completeTrade();
        })();
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tradeStatus, timeLeft]);

  // Start the trade: create backend record then start timer
  const startTrade = async () => {
    if (!direction || futuresAmount <= 0 || futuresAmount > availableBalance) {
      return;
    }

    setIsCreating(true);
    try {
      const created = await create(); // create returns created record or null
      if (!created || !created.id) {
        // creation failed, don't start
        setIsCreating(false);
        return;
      }

      // Set trade details for display
      setTradeDetails({
        futuresAmount,
        contractDuration: selectedDuration,
        futuresStatus: direction === "up" ? "long" : "short",
        openPositionPrice: parseFloat(marketPrice || "0") || 0,
        closePositionPrice: null,
        leverage: parseInt(selectedLeverage, 10),
        openPositionTime: new Date(),
        closePositionTime: null
      });

      setOpeningOrders(prev => [...prev, {
        id: futureId, // Use the actual ID from created record
        futuresAmount,
        contractDuration: selectedDuration,
        futuresStatus: direction === "up" ? "long" : "short",
        openPositionPrice: parseFloat(marketPrice || "0") || 0,
        closePositionPrice: null,
        leverage: parseInt(selectedLeverage, 10),
        openPositionTime: new Date().toISOString(),
        closePositionTime: null
      }]);

      // ensure timeLeft set from chosen duration (seconds)
      const secs = parseInt(selectedDuration, 10) || 0;
      setTimeLeft(secs);

      // set status after create succeeded
      setTradeStatus("in-progress");
    } catch (err) {
      console.error("startTrade error", err);
    } finally {
      setIsCreating(false);
    }
  };

  // completeTrade: fetch finalized trade from backend and show real PnL
  const completeTrade = async () => {
    // ensure we have a future id
    setOpeningOrders([]);
    if (!futureId) {
      // no id => nothing we can fetch; fallback to internal calculation
      const calculatedIsWin = false; // fallback: treat as loss
      setTradeResult(calculatedIsWin ? "win" : "loss");
      if (calculatedIsWin) {
        setPnlDisplay(`+${calculateProfit(futuresAmount, selectedLeverage, selectvalue).toFixed(2)} USDT`);
      } else {
        setPnlDisplay(`-${futuresAmount.toFixed(2)} USDT`);
      }
      setTradeStatus("completed");
      return;
    }

    try {
      // dispatch the view action to fetch the latest trade from backend
      const result = await dispatch(futuresViewActions.doFind(futureId));
      const trade = result && result.payload ? result.payload : result;

      if (!trade) {
        // fallback: mark as loss
        setTradeResult("loss");
        setPnlDisplay(`-${futuresAmount.toFixed(2)} USDT`);
        setTradeStatus("completed");
        return;
      }

      // Update trade details with finalized data
      setTradeDetails({
        ...tradeDetails,
        closePositionPrice: trade.closePositionPrice,
        closePositionTime: trade.closePositionTime,
        profitAndLossAmount: trade.profitAndLossAmount
      });

      // Backend should set trade.control (profit | loss), profitAndLossAmount, futuresAmount
      if (trade.control === "profit") {
        setTradeResult("win");
        const pnl = Number(trade.profitAndLossAmount ?? calculateProfit(futuresAmount, selectedLeverage, selectvalue));
        setPnlDisplay(`+${Number.isFinite(pnl) ? pnl.toFixed(2) : "0.00"} USDT`);
      } else {
        setTradeResult("loss");
        const amt = Number(trade.futuresAmount ?? futuresAmount);
        setPnlDisplay(`-${Number.isFinite(amt) ? amt.toFixed(2) : futuresAmount.toFixed(2)} USDT`);
      }

      setTradeStatus("completed");

      // refresh lists/view after finalization
      dispatch(futuresListAction.doFetchPending());

    } catch (err) {
      console.error("completeTrade error", err);
      // fallback to computed display
      setTradeResult("loss");
      setPnlDisplay(`-${futuresAmount.toFixed(2)} USDT`);
      setTradeStatus("completed");
    }
  };

  // create trade record and return created record
  const create = async () => {
    const currentPrice = parseFloat(marketPrice || "0") || 0;

    // derive close price assuming no real result yet; backend or worker will update it later
    let closePrice = currentPrice;
    if (direction === "up") {
      closePrice = currentPrice * 0.95; // default placeholder
    } else {
      closePrice = currentPrice * 1.05; // placeholder
    }

    const payload = {
      futuresStatus: direction === "up" ? "long" : "short",
      profitAndLossAmount: '',
      leverage: parseInt(selectedLeverage, 10),
      control: "loss", // default — worker/ admin may set later
      operate: "low",
      closePositionTime: '',
      closePositionPrice: '',
      openPositionTime: new Date().toISOString(),
      openPositionPrice: currentPrice,
      contractDuration: selectedDuration,
      futuresAmount,
    };

    try {
      const createdRecord = await dispatch(futuresFormAction.doCreate(payload));
      const record = createdRecord && createdRecord.id ? createdRecord : (createdRecord && createdRecord.payload ? createdRecord.payload : null);

      if (record && record.id) {
        setFutureId(record.id);
        return record;
      } else {
        console.warn("Create did not return created record");
        return null;
      }
    } catch (err) {
      console.error("create error", err);
      return null;
    }
  };

  const resetTrade = () => {
    setTradeStatus("configuring");
    setOpeningOrders([]);
    setTradeResult(null);
    setTimeLeft(0);
    setFutureId(null);
    setPnlDisplay("");
    setTradeDetails(null);
  };

  const calculateProfit = (
    amount: number,
    leverage: string,
    value: string
  ): number => {

    return (amount * parseInt(leverage, 10) * parseInt(value, 10)) / 100;
  };

  const calculateProgress = (): number => {
    if (tradeStatus !== "in-progress") return 0;
    const total = parseInt(selectedDuration, 10) || 1;
    return ((total - timeLeft) / total) * 100;
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return "-";
    return new Date(date).toLocaleTimeString();
  };

  if (!isOpen) return null;

  const modalContent = (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-container ${direction === "up" ? "up-theme" : "down-theme"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Section */}
        <div className="modal-header">
          <div className="pair-info">
            <div className="pair-icon">
              <img
                src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${selectedCoin.split("USDT")[0]}.png`}
                style={{ width: 30, height: 30 }}
                alt={selectedCoin}
                loading="lazy"
              />
            </div>
            <div className="pair-name">{selectedCoin.replace("USDT", "/USDT")}</div>
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {/* Trade in progress display */}
        {tradeStatus !== "configuring" && (
          <div className="trade-progress-section">
            <div className="progress-container">
              <div
                className="circular-progress"
                style={{
                  background: `conic-gradient(${direction === "up" ? "#00C076" : "#FF6838"} ${calculateProgress()}%, #3a3a3a ${calculateProgress()}%)`,
                }}
              >
                <div className="progress-inner">
                  <div className="progress-time">{formatTime(timeLeft)}</div>
                  <div className="progress-label">Remaining</div>
                </div>
              </div>
            </div>

            {/* Trade Details */}
            {tradeDetails && (
              <div className="trade-details">
                <div className="trade-details-row">
                  <span>Futures Amount:</span>
                  <span>{tradeDetails.futuresAmount} USDT</span>
                </div>
                <div className="trade-details-row">
                  <span>Contract Duration:</span>
                  <span>{tradeDetails.contractDuration}s</span>
                </div>
                <div className="trade-details-row">
                  <span>Future Type:</span>
                  <span className={tradeDetails.futuresStatus === "long" ? "up-text" : "down-text"}>
                    {tradeDetails.futuresStatus.toUpperCase()}
                  </span>
                </div>
                <div className="trade-details-row">
                  <span>Open Position Price:</span>
                  <span>{tradeDetails.openPositionPrice.toFixed(4)} USDT</span>
                </div>
                <div className="trade-details-row">
                  <span>Close Position Price:</span>
                  <span>{tradeDetails.closePositionPrice ? tradeDetails.closePositionPrice.toFixed(4) : "-"} USDT</span>
                </div>
                <div className="trade-details-row">
                  <span>Leverage:</span>
                  <span>{tradeDetails.leverage}x</span>
                </div>
                <div className="trade-details-row">
                  <span>Open Time:</span>
                  <span>{formatDate(tradeDetails.openPositionTime)}</span>
                </div>
                <div className="trade-details-row">
                  <span>Close Time:</span>
                  <span>{formatDate(tradeDetails.closePositionTime)}</span>
                </div>
              </div>
            )}


            <div className="trade-actions">
              {tradeStatus === "in-progress" && (
                <button className="trade-action-btn keep-buying" onClick={onClose}>
                  Keep Buying
                </button>
              )}
              {tradeStatus === "completed" && (
                <>
                  <button className="trade-action-btn secondary" onClick={onClose}>
                    Close
                  </button>
                  <button className="trade-action-btn primary" onClick={resetTrade}>
                    New Trade
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Configuration form (only shown when configuring) */}
        {tradeStatus === "configuring" && (
          <>
            {/* Direction Indicator */}
            <div className={`direction-indicator ${direction}-indicator`}>
              {direction === "up" ? "Predicting price will go UP" : "Predicting price will go DOWN"}
            </div>

            {/* Modal Content */}
            <div className="modal-content">
              {/* Trade Duration Section */}
              <div className="section">
                <div className="section-title">
                  <span>Contract Duration</span>
                  <span>Payout</span>
                </div>
                <div className="options-container">
                  {[{ duration: "60", payout: "10" }, { duration: "120", payout: "20" }, { duration: "180", payout: "40" }, { duration: "240", payout: "80" }].map(
                    (option) => (
                      <button
                        key={option.duration}
                        className={`option-btn ${selectedDuration === option.duration ? "selected" : ""}`}
                        onClick={() => changeValues(option.duration, option.payout)}
                      >
                        {option.duration}s ({option.payout}%)
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Leverage Section */}
              <div className="section">
                <div className="section-title">
                  <span>Leverage</span>
                </div>
                <div className="options-container">
                  {["1", "2", "5", "10", "20"].map((leverage) => (
                    <button
                      key={leverage}
                      className={`option-btn ${selectedLeverage === leverage ? "selected" : ""}`}
                      onClick={() => setSelectedLeverage(leverage)}
                    >
                      {leverage}×
                    </button>
                  ))}
                </div>
              </div>

              {/* Futures Amount Section */}
              <div className="section">
                <div className="section-title">
                  <span>Futures Amount (USDT)</span>
                </div>
                <div className="amount-control">
                  <button className="amount-btn" onClick={() => setFuturesAmount((prev) => Math.max(1, prev - 1))}>
                    -
                  </button>
                  <input
                    type="number"
                    className="amount-inputs"
                    value={futuresAmount}
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10) || 0;
                      setFuturesAmount(Math.max(0, value));
                    }}
                    min="1"
                  />
                  <button className="amount-btn" onClick={() => setFuturesAmount((prev) => prev + 1)}>
                    +
                  </button>
                </div>
                <div className="balance-info">Available: {availableBalance} USDT</div>
                {amountError && (
                  <div className="error-message" style={{ color: "#FF6838", fontSize: "12px", marginTop: "5px" }}>
                    {amountError}
                  </div>
                )}
              </div>

              {/* Projected Profit */}
              <div className="profit-info">
                Projected Profit: {calculateProfit(futuresAmount, selectedLeverage, selectvalue

                ).toFixed(2)} USDT
              </div>

              {/* Confirm Button */}
              <button
                className="confirm-btn"
                onClick={startTrade}
                disabled={!direction || futuresAmount <= 0 || futuresAmount > availableBalance || isCreating}
                style={{
                  opacity: !direction || futuresAmount <= 0 || futuresAmount > availableBalance ? 0.5 : 1,
                  cursor: !direction || futuresAmount <= 0 || futuresAmount > availableBalance ? "not-allowed" : "pointer",
                }}
              >
                {isCreating ? "CREATING..." : futuresAmount > availableBalance ? "INSUFFICIENT BALANCE" : "CONFIRM ORDER"}
              </button>
            </div>
          </>
        )}
      </div>

      <style>{` 
  .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      // bottom: 0;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 100000;
      padding: 20px;
  }

  .modal-container {
      background-color: #2a2a2a;
      border-radius: 12px;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
      overflow: hidden;
      max-height: 90vh;
      overflow-y: auto;
  }

  .up-theme {
      border-top: 4px solid #00C076;
  }

  .down-theme {
      border-top: 4px solid #FF6838;
  }

  /* Header Section */
  .modal-header {
      background-color: #1a1a1a;
      padding: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #3a3a3a;
  }

  .pair-info {
      display: flex;
      align-items: center;
      gap: 10px;
  }

  .pair-icon {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #F3BA2F;
      display: flex;
      justify-content: center;
      align-items: center;
  }

  .pair-icon i {
      color: #000;
      font-size: 16px;
  }

  .pair-name {
      font-weight: bold;
      font-size: 18px;
  }

  .close-btn {
      background: none;
      border: none;
      color: #AAAAAA;
      font-size: 20px;
      cursor: pointer;
      padding: 5px;
  }

  .close-btn:hover {
      color: #FFFFFF;
  }

  /* Direction Indicator */
  .direction-indicator {
      padding: 10px 15px;
      text-align: center;
      font-weight: bold;
      font-size: 16px;
  }

  .up-indicator {
      background-color: rgba(0, 192, 118, 0.2);
      color: #00C076;
  }

  .down-indicator {
      background-color: rgba(255, 104, 56, 0.2);
      color: #FF6838;
  }

  /* Modal Content */
  .modal-content {
      padding: 15px;
  }

  .section {
      margin-bottom: 20px;
  }

  .section-title {
      font-size: 14px;
      color: #AAAAAA;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
  }

  .options-container {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
  }

  .option-btn {
      background-color: #3a3a3a;
      border: 1px solid #4a4a4a;
      border-radius: 6px;
      padding: 8px 12px;
      color: #FFFFFF;
      font-size: 14px;
      cursor: pointer;
      flex: 1;
      min-width: 70px;
      text-align: center;
      transition: all 0.2s;
  }

  .option-btn:hover {
      background-color: #4a4a4a;
  }

  .option-btn.selected {
      background-color: #00C076;
      border-color: #00C076;
      color: #000;
      font-weight: bold;
  }

  .down-theme .option-btn.selected {
      background-color: #FF6838;
      border-color: #FF6838;
  }

  .amount-control {
      display: flex;
      align-items: center;
      background-color: #3a3a3a;
      border-radius: 6px;
      padding: 5px;
      margin-top: 10px;
  }

  .amount-btn {
      background: none;
      border: none;
      color: #AAAAAA;
      font-size: 20px;
      width: 40px;
      height: 40px;
      cursor: pointer;
      border-radius: 5px;
  }

  .amount-btn:hover {
      background-color: #4a4a4a;
      color: #FFFFFF;
  }

  .amount-inputs {
      flex: 1;
      background: none;
      border: none;
      color: #FFFFFF;
      font-size: 16px;
      text-align: center;
      padding: 10px 0;
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
  }

  input[type="number"] {
      -moz-appearance: textfield;
  }

  .balance-info {
      font-size: 14px;
      color: #AAAAAA;
      text-align: right;
      margin-top: 5px;
  }

  .profit-info {
      text-align: center;
      font-size: 14px;
      color: #AAAAAA;
      margin: 20px 0;
  }

  .confirm-btn {
      background-color: #00C076;
      color: white;
      display: block;
      width: 100%;
      padding: 15px;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s;
  }

  .confirm-btn:hover:not(:disabled) {
      background-color: #00a466;
  }

  .confirm-btn:disabled {
      background-color: #3a3a3a;
      color: #777;
      cursor: not-allowed;
  }

  .down-theme .confirm-btn {
      background-color: #FF6838;
  }

  .down-theme .confirm-btn:hover:not(:disabled) {
      background-color: #e55a2b;
  }
      
  /* Trade Progress Section */
  .trade-progress-section {
      padding: 20px;
      text-align: center;
  }

  .progress-container {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
  }

  .circular-progress {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 1s linear;
  }

  .progress-inner {
      width: 130px;
      height: 130px;
      border-radius: 50%;
      background-color: #2a2a2a;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
  }

  .progress-time {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 5px;
  }

  .progress-label {
      font-size: 12px;
      color: #AAAAAA;
  }

  /* Trade Details */
  .trade-details {
      background-color: #1e1e1e;
      border-radius: 8px;
      padding: 15px;
      margin: 15px 0;
      text-align: left;
      display:flex;
      flex-direction:column
  }

  .trade-details-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      font-size: 14px;
  }

  .trade-details-row:last-child {
      margin-bottom: 0;
  }

  .trade-details-row span:first-child {
      color: #AAAAAA;
  }

  .trade-details-row span:last-child {
      color: #FFFFFF;
      font-weight: 500;
  }

  .up-text {
      color: #00C076 !important;
  }

  .down-text {
      color: #FF6838 !important;
  }

  .trade-result {
      font-size: 16px;
      font-weight: bold;
      margin: 15px 0;
      padding: 10px;
      border-radius: 6px;
  }

  .trade-result.win {
      background-color: rgba(0, 192, 118, 0.2);
      color: #00C076;
  }

  .trade-result.loss {
      background-color: rgba(255, 104, 56, 0.2);
      color: #FF6838;
  }

  .trade-actions {
      display: flex;
      gap: 10px;
      justify-content: center;
      margin-top: 20px;
  }

  .trade-action-btn {
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s;
  }

  .trade-action-btn.primary {
      background-color: #F3BA2F;
      color: #000;
  }

  .trade-action-btn.primary:hover {
      background-color: #e4ab25;
  }

  .trade-action-btn.secondary {
      background-color: #3a3a3a;
      color: #FFFFFF;
  }

  .trade-action-btn.secondary:hover {
      background-color: #4a4a4a;
  }

  .trade-action-btn.keep-buying {
      background-color: #00C076;
      color: white;
  }

  .trade-action-btn.keep-buying:hover {
      background-color: #00a466;
  }

  .down-theme .trade-action-btn.keep-buying {
      background-color: #FF6838;
  }

  .down-theme .trade-action-btn.keep-buying:hover {
      background-color: #e55a2b;
  }
`}</style>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default FuturesModal;