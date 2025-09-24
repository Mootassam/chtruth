import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import assetsActions from "src/modules/assets/list/assetsListActions";
import assetsListSelectors from "src/modules/assets/list/assetsListSelectors";

interface BinanceTicker {
  s: string;
  c: string;
  P: string;
}

function Wallet() {
  const dispatch = useDispatch();
  const location = useLocation();
  const listAssets = useSelector(assetsListSelectors.selectRows);
  const [activeItem, setActiveItem] = useState<string>(location.pathname);
  const [marketData, setMarketData] = useState<{
    [key: string]: BinanceTicker;
  }>({});
  const [isMarketDataLoading, setIsMarketDataLoading] = useState(true);
  const ws = useRef<WebSocket | null>(null);
  const symbolsWeCareAbout = useRef(new Set<string>());
  const prevAssetsRef = useRef(listAssets);
  const marketDataCache = useRef<{ [key: string]: BinanceTicker }>({});

  const quickActions = [
    {
      path: "/deposit",
      icon: "fas fa-wallet",
      name: "Deposit",
    },
    {
      path: "/withdraw",
      icon: "fas fa-money-bill-wave",
      name: "Withdraw",
    },
    {
      path: "/history",
      icon: "fas fa-history",
      name: "History",
    },
    {
      path: "/conversion",
      icon: "fas fa-exchange-alt action-icon",
      name: "Convert",
    },
    {
      path: "/stacking",
      icon: "fas fa-coins action-icon",
      name: "Staking",
    },
  ];

  // Memoize the format function to prevent unnecessary re-renders
  const formatAmount = useCallback((amount: string) => {
    const num = parseFloat(amount);
    if (isNaN(num)) return "0";

    if (num % 1 === 0) return num.toString();

    return num.toFixed(8).replace(/\.?0+$/, "");
  }, []);

  // Update symbols we care about only when assets actually change
  useEffect(() => {
    const assetsChanged = listAssets !== prevAssetsRef.current;
    if (assetsChanged) {
      symbolsWeCareAbout.current = new Set(
        listAssets
          .filter((asset) => asset.symbol !== "USDT")
          .map((asset) => `${asset.symbol}USDT`)
      );
      prevAssetsRef.current = listAssets;
    }
  }, [listAssets]);

  // Setup WebSocket with optimized data handling and proper cleanup
  useEffect(() => {
    let isMounted = true;
    setIsMarketDataLoading(true);

    // Use a single WebSocket connection with optimized data processing
    ws.current = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");

    // Throttle updates to prevent excessive re-renders
    let lastUpdateTime = 0;
    const updateThrottleMs = 100; // Update at most every 100ms

    ws.current.onmessage = (event) => {
      // Check if component is still mounted before processing
      if (!isMounted) return;

      const now = Date.now();
      if (now - lastUpdateTime < updateThrottleMs) return;

      try {
        const data: BinanceTicker[] = JSON.parse(event.data);

        // Process data only if we have relevant updates
        const hasRelevantUpdate = data.some((ticker) =>
          symbolsWeCareAbout.current.has(ticker.s)
        );

        if (hasRelevantUpdate) {
          setMarketData((prevData) => {
            // Double-check mounted status inside setState
            if (!isMounted) return prevData;

            const newData = { ...prevData };
            let updated = false;

            data.forEach((ticker) => {
              if (symbolsWeCareAbout.current.has(ticker.s)) {
                // Only update if the data has actually changed
                if (
                  JSON.stringify(newData[ticker.s]) !== JSON.stringify(ticker)
                ) {
                  newData[ticker.s] = ticker;
                  marketDataCache.current[ticker.s] = ticker;
                  updated = true;
                }
              }
            });

            return updated ? newData : prevData;
          });

          lastUpdateTime = now;
          setIsMarketDataLoading(false);
        }
      } catch (error) {
        console.error("Error processing WebSocket data:", error);
      }
    };

    ws.current.onerror = (error) => {
      if (!isMounted) return;
      console.error("WebSocket error:", error);
      setIsMarketDataLoading(false);
    };

    ws.current.onopen = () => {
      if (!isMounted) return;
      console.log("WebSocket connected");
    };

    return () => {
      isMounted = false;

      if (ws.current) {
        // Close the WebSocket connection properly
        ws.current.close();
        ws.current = null;
      }
    };
  }, []);

  // Fetch assets only once on component mount with cleanup
  useEffect(() => {
    let isMounted = true;

    const fetchAssets = async () => {
      try {
        await dispatch(assetsActions.doFetch());
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching assets:", error);
        }
      }
    };

    fetchAssets();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  // Update active item when route changes
  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  // Pre-calculate asset values to minimize computation during render
  const { assetValues, totalValue, portfolioChange, isLoadingTotal } =
    useMemo(() => {
      if (isMarketDataLoading && Object.keys(marketData).length === 0) {
        return {
          assetValues: [],
          totalValue: 0,
          portfolioChange: 0,
          isLoadingTotal: true,
        };
      }

      let totalCurrentValue = 0;
      let totalPreviousValue = 0;

      const calculatedAssetValues = listAssets.map((asset) => {
        if (asset.symbol === "USDT") {
          const value = parseFloat(asset.amount || "0");
          totalCurrentValue += value;
          totalPreviousValue += value; // USDT doesn't change in value
          return {
            value,
            change: 0,
            isPositive: true,
            marketPrice: 1,
          };
        }

        const symbol = `${asset.symbol}USDT`;
        const ticker = marketData[symbol] || marketDataCache.current[symbol];
        const marketPrice = parseFloat(ticker?.c || "0");
        const assetAmount = parseFloat(asset.amount || "0");
        const value = assetAmount * marketPrice;

        // Calculate the previous value based on the 24h change percentage
        const change = ticker ? parseFloat(ticker.P) : 0;
        const previousValue = value / (1 + change / 100);

        totalCurrentValue += value;
        totalPreviousValue += previousValue;

        const isPositive = change >= 0;

        return {
          value,
          change,
          isPositive,
          marketPrice,
        };
      });

      // Calculate portfolio change percentage
      const portfolioChangeValue =
        totalPreviousValue > 0
          ? ((totalCurrentValue - totalPreviousValue) / totalPreviousValue) *
            100
          : 0;

      return {
        assetValues: calculatedAssetValues,
        totalValue: totalCurrentValue,
        portfolioChange: portfolioChangeValue,
        isLoadingTotal: false,
      };
    }, [listAssets, marketData, isMarketDataLoading]);

  // Memoize the asset list rendering to prevent unnecessary re-renders
  const renderedAssets = useMemo(() => {
    if (listAssets.length === 0) {
      return <div className="no-assets">No assets found</div>;
    }

    return listAssets.map((asset, index) => {
      if (isMarketDataLoading) {
        return (
          <div className="wallet-asset-item-placeholder" key={asset.id}>
            <div className="wallet-asset-info-placeholder">
              <div className="wallet-asset-icon-placeholder shimmer"></div>
              <div className="wallet-asset-details-placeholder">
                <div
                  className="placeholder-line shimmer"
                  style={{ width: "80px", height: "16px", marginBottom: "8px" }}
                ></div>
                <div
                  className="placeholder-line shimmer"
                  style={{ width: "60px", height: "12px" }}
                ></div>
              </div>
            </div>
            <div className="wallet-asset-value-placeholder">
              <div
                className="placeholder-line shimmer"
                style={{ width: "70px", height: "16px", marginBottom: "8px" }}
              ></div>
              <div
                className="placeholder-line shimmer"
                style={{ width: "50px", height: "12px" }}
              ></div>
            </div>
          </div>
        );
      }

      const { value, change, isPositive } = assetValues[index];

      return (
        <Link
          to={`/wallets/${asset.id}`}
          className="remove_blue"
          key={asset.id}
        >
          <div className="wallet-asset-item" role="button">
            <div className="wallet-asset-info">
              <div className="wallet-asset-icon">
                <img
                  src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${asset.symbol}.png`}
                  style={{ width: 35, height: 35 }}
                  alt={asset.symbol}
                />
              </div>
              <div className="wallet-asset-details">
                <div className="wallet-asset-name">{asset.coinName}</div>
                <div className="wallet-asset-amount">
                  {formatAmount(asset.amount)}&nbsp;{asset.symbol}
                </div>
              </div>
            </div>
            <div className="wallet-asset-value">
              <div className="wallet-value-amount">
                $
                {value.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
              <div
                className={`wallet-value-change ${
                  isPositive ? "positive" : "negative"
                }`}
              >
                {isPositive && asset.symbol !== "USDT" ? "+" : ""}
                {asset.symbol !== "USDT" ? change.toFixed(2) : "0.00"}%
              </div>
            </div>
          </div>
        </Link>
      );
    });
  }, [listAssets, isMarketDataLoading, assetValues, formatAmount]);

  return (
    <div className="wallet-container">
      {/* Header Section */}
      <div className="wallet-header">
        <div className="header-top">
          <div className="search-icon">
            <Link to="/profile">
              <i className="fas fa-user-circle profile-icon" />
            </Link>
          </div>
          <div>
            <img src="/icons/asset.png" style={{ height: 33 }} />{" "}
          </div>
          <div className="notification-profile">
            <i className="fas fa-bell header-notification-icon profile-icon" />
          </div>
        </div>
        <div className="wallet-total-balance">
          <div className="wallet-balance-label">Total Portfolio Value</div>
          {isLoadingTotal ? (
            <div className="wallet-balance-amount-placeholder">
              <div
                className="placeholder-line shimmer"
                style={{ width: "120px", height: "32px", margin: "0 auto 8px" }}
              ></div>
              <div
                className="placeholder-line shimmer"
                style={{ width: "80px", height: "14px", margin: "0 auto" }}
              ></div>
            </div>
          ) : (
            <>
              <div className="wallet-balance-amount">
                $
                {totalValue.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
              <div
                className={`wallet-balance-change ${
                  portfolioChange >= 0 ? "positive" : "negative"
                }`}
              >
                {portfolioChange >= 0 ? "+" : ""}
                {portfolioChange.toFixed(2)}%
              </div>
            </>
          )}
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="quick-actions">
        {quickActions.map((item) => (
          <Link
            to={item.path}
            className="action-btn remove_blue"
            role="button"
            aria-label={`${item.name} cryptocurrency`}
            key={item.path}
          >
            <div
              className={`action-circle ${
                activeItem === item.path ? "active" : ""
              }`}
            >
              <i className={`${item.icon} action-icon`} aria-hidden="true" />
            </div>
            <span className="action-text">{item.name}</span>
          </Link>
        ))}
      </div>

      {/* Assets Section */}
      <div className="wallet-assets-section">
        <div className="wallet-section-header">
          <div className="wallet-section-title">My Assets</div>
          <div className="wallet-see-all" role="button">
            Manage
          </div>
        </div>
        <div className="wallet-asset-list">{renderedAssets}</div>
      </div>

      {/* Styles remain the same */}
      <style>{`
        /* All the CSS styles from the original component */
        @keyframes shimmer {
          0% {
            background-position: -468px 0;
          }
          100% {
            background-position: 468px 0;
          }
        }
        
        .shimmer {
          animation-duration: 1.5s;
          animation-fill-mode: forwards;
          animation-iteration-count: infinite;
          animation-name: shimmer;
          animation-timing-function: linear;
          background: #2A2A2A;
          background: linear-gradient(to right, #2A2A2A 8%, #333333 18%, #2A2A2A 33%);
          background-size: 800px 104px;
          position: relative;
          border-radius: 4px;
        }
        
        .wallet-balance-amount-placeholder {
          text-align: center;
        }
        
        .wallet-asset-item-placeholder {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 13px;
          background-color: #1A1A1A;
          border-radius: 12px;
        }
        
        .wallet-asset-info-placeholder {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
        }
        
        .wallet-asset-icon-placeholder {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 12px;
        }
        
        .wallet-asset-details-placeholder {
          flex: 1;
        }
        
        .wallet-asset-value-placeholder {
          text-align: right;
        }
        
        .placeholder-line {
          border-radius: 4px;
          margin-bottom: 8px;
        }
        
        .wallet-container {
          max-width: 400px;
          margin: 0 auto;
          padding-bottom: 70px;
          background-color: #000000;
          color: #FFFFFF;
          min-height: 100vh;
        }

        .wallet-header {
          background-color: #000000;
          padding: 20px 15px 15px;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .search-icon, .header-notification-icon {
          color: #FFFFFF;
          font-size: 20px;
          cursor: pointer;
        }

        .notification-profile {
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .profile-icon {
          color: #FFFFFF;
          font-size: 24px;
        }

        .wallet-total-balance {
          background: linear-gradient(135deg, #2A2A2A 0%, #1A1A1A 100%);
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 20px;
          text-align: center;
        }

        .wallet-balance-label {
          color: #AAAAAA;
          font-size: 14px;
          margin-bottom: 8px;
        }

        .wallet-balance-amount {
          font-size: 32px;
          font-weight: bold;
          margin-bottom: 8px;
        }

        .wallet-balance-change {
          font-size: 14px;
        }

        .wallet-balance-change.positive {
          color: #00C076;
        }

        .wallet-balance-change.negative {
          color: #FF6838;
        }

        .quick-actions {
          display: flex;
          justify-content: space-around;
          padding: 15px 0;
          background-color: #000000;
          border-bottom: 1px solid #2A2A2A;
        }

        .action-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          color: #CCCCCC;
        }

        .action-circle {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #2A2A2A;
          margin-bottom: 8px;
          transition: background-color 0.2s ease;
        }

        .action-circle.active, .action-circle:hover {
          background-color: #F3BA2F;
          color: #000000;
        }

        .action-icon {
          font-size: 20px;
        }

        .action-text {
          font-size: 12px;
        }

        .remove_blue {
          color: inherit;
        }

        .wallet-assets-section {
          padding: 0 15px;
        }

        .wallet-section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          margin-top: 20px;
        }

        .wallet-section-title {
          font-weight: bold;
          font-size: 18px;
        }

        .wallet-see-all {
          color: #CCCCCC;
          font-size: 14px;
          cursor: pointer;
        }

        .wallet-asset-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .wallet-asset-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          background-color: #1A1A1A;
          border-radius: 12px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .wallet-asset-item:hover {
          background-color: #2A2A2A;
        }

        .wallet-asset-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .wallet-asset-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          background-color: #2A2A2A;
        }

        .wallet-asset-details {
          display: flex;
          flex-direction: column;
        }

        .wallet-asset-name {
          font-weight: bold;
          margin-bottom: 4px;
        }

        .wallet-asset-amount {
          color: #AAAAAA;
          font-size: 12px;
        }

        .wallet-asset-value {
          text-align: right;
        }

        .wallet-value-amount {
          font-weight: bold;
          margin-bottom: 4px;
        }

        .wallet-value-change {
          font-size: 12px;
        }

        .wallet-value-change.positive {
          color: #00C076;
        }

        .wallet-value-change.negative {
          color: #FF6838;
        }

        .no-assets {
          text-align: center;
          padding: 20px;
          color: #AAAAAA;
        }

        @media (max-width: 480px) {
          .wallet-container {
            padding-bottom: 80px;
          }
          
          .action-circle {
            width: 45px;
            height: 45px;
          }
          
          .action-text {
            font-size: 11px;
          }
        }
      `}</style>
    </div>
  );
}

export default Wallet;
