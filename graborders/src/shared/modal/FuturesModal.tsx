import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import futuresFormAction from "src/modules/futures/form/futuresFormActions";

interface FuturesModalProps {
  isOpen: boolean;
  onClose: () => void;
  direction: "up" | "down" | null;
  dispatch;
  listAssets;
  selectedCoin: string;
  marketPrice: string;
  availableBalance: number;
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
}) => {
  const [selectedDuration, setSelectedDuration] = useState<string>("120");
  const [selectedLeverage, setSelectedLeverage] = useState<string>("2");
  const [futuresAmount, setFuturesAmount] = useState<number>(1);
  const [tradeStatus, setTradeStatus] = useState<
    "configuring" | "in-progress" | "completed"
  >("configuring");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [tradeResult, setTradeResult] = useState<"win" | "loss" | null>(null);
  const [amountError, setAmountError] = useState<string>("");

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

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (tradeStatus === "in-progress" && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (tradeStatus === "in-progress" && timeLeft === 0) {
      completeTrade();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [tradeStatus, timeLeft]);

  // Validate amount when it changes
  useEffect(() => {
    if (futuresAmount <= 0) {
      setAmountError("Amount must be greater than 0");
    } else if (futuresAmount > availableBalance) {
      setAmountError("Insufficient balance");
    } else {
      setAmountError("");
    }
  }, [futuresAmount, availableBalance]);

  const startTrade = () => {
    if (!direction || futuresAmount <= 0 || futuresAmount > availableBalance) return;

    setTradeStatus("in-progress");
    setTimeLeft(parseInt(selectedDuration));
    create();
  };

  const completeTrade = () => {
    // Randomly determine win/loss for demonstration
    const isWin = Math.random() > 0.5;
    setTradeResult(isWin ? "win" : "loss");
    setTradeStatus("completed");
  };

  const resetTrade = () => {
    setTradeStatus("configuring");
    setTradeResult(null);
    setTimeLeft(0);
  };

  const calculateProfit = (
    amount: number,
    leverage: string,
    duration: string
  ): number => {
    return (amount * parseInt(leverage) * parseInt(duration)) / 10000;
  };

  const calculateProgress = (): number => {
    if (tradeStatus !== "in-progress") return 0;
    const total = parseInt(selectedDuration);
    return ((total - timeLeft) / total) * 100;
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  if (!isOpen) return null;

  const create = () => {
    const currentPrice = parseFloat(marketPrice);
    const isWin = tradeResult === "win";
    
    // Calculate close price based on direction and result
    let closePrice;
    if (direction === "up") {
      closePrice = isWin ? currentPrice * 1.05 : currentPrice * 0.95;
    } else {
      closePrice = isWin ? currentPrice * 0.95 : currentPrice * 1.05;
    }
    
    // Calculate P&L based on direction and result
    let pnl;
    if (direction === "up") {
      pnl = isWin 
        ? futuresAmount * parseFloat(selectedLeverage) * 0.05 
        : -futuresAmount * parseFloat(selectedLeverage) * 0.05;
    } else {
      pnl = isWin 
        ? futuresAmount * parseFloat(selectedLeverage) * 0.05 
        : -futuresAmount * parseFloat(selectedLeverage) * 0.05;
    }

    const item = {
      futuresStatus: direction === "up" ? "long" : "short",
      profitAndLossAmount: pnl,
      leverage: parseInt(selectedLeverage),
      control: isWin ? "profit" : "loss",
      operate: "low",
      closePositionTime: new Date(Date.now() + parseInt(selectedDuration) * 1000).toISOString(),
      closePositionPrice: closePrice,
      openPositionTime: new Date().toISOString(),
      openPositionPrice: currentPrice,
      contractDuration: selectedDuration,
      futuresAmount: futuresAmount,
    };

    dispatch(futuresFormAction.doCreate(item));
  };

  const modalContent = (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-container ${
          direction === "up" ? "up-theme" : "down-theme"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Section */}
        <div className="modal-header">
          <div className="pair-info">
            <div className="pair-icon">
              <img
                src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${
                  selectedCoin.split("USDT")[0]
                }.png`}
                style={{ width: 30, height: 30 }}
                alt={selectedCoin}
                loading="lazy"
              />
            </div>
            <div className="pair-name">{selectedCoin.replace("USDT", "/USDT")}</div>
          </div>
        </div>

        {/* Trade in progress display */}
        {tradeStatus !== "configuring" && (
          <div className="trade-progress-section">
            <div className="progress-container">
              <div
                className="circular-progress"
                style={{
                  background: `conic-gradient(${
                    direction === "up" ? "#00C076" : "#FF6838"
                  } ${calculateProgress()}%, #3a3a3a ${calculateProgress()}%)`,
                }}
              >
                <div className="progress-inner">
                  <div className="progress-time">{formatTime(timeLeft)}</div>
                  <div className="progress-label">Remaining</div>
                </div>
              </div>
            </div>

            {tradeStatus === "completed" && tradeResult && (
              <div className={`trade-result ${tradeResult}`}>
                {tradeResult === "win"
                  ? `Trade Successful! +${calculateProfit(
                      futuresAmount,
                      selectedLeverage,
                      selectedDuration
                    ).toFixed(2)} USDT`
                  : `Trade Failed! -${futuresAmount} USDT`}
              </div>
            )}

            <div className="trade-actions">
              {tradeStatus === "completed" ? (
                <>
                  <button
                    className="trade-action-btn secondary"
                    onClick={onClose}
                  >
                    Close
                  </button>
                  <button
                    className="trade-action-btn primary"
                    onClick={resetTrade}
                  >
                    New Trade
                  </button>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        )}

        {/* Configuration form (only shown when configuring) */}
        {tradeStatus === "configuring" && (
          <>
            {/* Direction Indicator */}
            <div className={`direction-indicator ${direction}-indicator`}>
              {direction === "up"
                ? "Predicting price will go UP"
                : "Predicting price will go DOWN"}
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
                  {[
                    { duration: "60", payout: "10" },
                    { duration: "120", payout: "20" },
                    { duration: "180", payout: "40" },
                    { duration: "240", payout: "80" },
                  ].map((option) => (
                    <button
                      key={option.duration}
                      className={`option-btn ${
                        selectedDuration === option.duration ? "selected" : ""
                      }`}
                      onClick={() => setSelectedDuration(option.duration)}
                    >
                      {option.duration}s ({option.payout}%)
                    </button>
                  ))}
                </div>
              </div>

              {/* Leverage Section */}
              <div className="section">
                <div className="section-title">
                  <span>Leverage</span>
                </div>
                <div className="options-container">
                  {["2", "5", "10", "20", "50"].map((leverage) => (
                    <button
                      key={leverage}
                      className={`option-btn ${
                        selectedLeverage === leverage ? "selected" : ""
                      }`}
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
                  <button
                    className="amount-btn"
                    onClick={() =>
                      setFuturesAmount((prev) => Math.max(1, prev - 1))
                    }
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="amount-inputs"
                    value={futuresAmount}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      setFuturesAmount(Math.max(0, value));
                    }}
                    min="1"
                  />
                  <button
                    className="amount-btn"
                    onClick={() => setFuturesAmount((prev) => prev + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="balance-info">
                  Available: {availableBalance.toFixed(2)} USDT
                </div>
                {amountError && (
                  <div className="error-message" style={{color: "#FF6838", fontSize: "12px", marginTop: "5px"}}>
                    {amountError}
                  </div>
                )}
              </div>

              {/* Projected Profit */}
              <div className="profit-info">
                Projected Profit:{" "}
                {calculateProfit(
                  futuresAmount,
                  selectedLeverage,
                  selectedDuration
                ).toFixed(2)}{" "}
                USDT
              </div>

              {/* Confirm Button */}
              <button
                className="confirm-btn"
                onClick={startTrade}
                disabled={!direction || futuresAmount <= 0 || futuresAmount > availableBalance}
                style={{
                  opacity: (!direction || futuresAmount <= 0 || futuresAmount > availableBalance) ? 0.5 : 1,
                  cursor: (!direction || futuresAmount <= 0 || futuresAmount > availableBalance) ? "not-allowed" : "pointer"
                }}
              >
                {futuresAmount > availableBalance ? "INSUFFICIENT BALANCE" : "CONFIRM ORDER"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default FuturesModal;