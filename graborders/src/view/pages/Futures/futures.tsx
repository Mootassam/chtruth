// src/components/Futures.tsx (optimized with i18n)
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import CoinListModal from "src/shared/modal/CoinListModal";
import FuturesModal from "src/shared/modal/FuturesModal";
import FuturesChart from "./FuturesChart";
import futuresListAction from "src/modules/futures/list/futuresListActions";
import futuresListSelectors from "src/modules/futures/list/futuresListSelectors";
import assetsListAction from "src/modules/assets/list/assetsListActions";
import selector from "src/modules/assets/list/assetsListSelectors";
import { useDispatch, useSelector } from "react-redux";
import FutureList from "./FutureList";
import { i18n } from '../../../i18n';

// Interface for Binance ticker data
interface BinanceTicker {
  e: string;
  E: number;
  s: string;
  c: string;
  o: string;
  h: string;
  l: string;
  v: string;
  q: string;
  P: string;
}

// Interface for Order data
interface Order {
  id: number;
  pair: string;
  direction: string;
  status: string;
  investment: number;
  openPrice: number;
  openTime: string;
  leverage: number;
  pnl?: number;
  closePrice?: number;
  closeTime?: string;
  currentPrice?: number;
  stopLoss?: number;
  takeProfit?: number;
  orderType: string;
  margin: number;
  fee: number;
}

function Futures() {
  const dispatch = useDispatch();

  // Redux selectors
  const listAssets = useSelector(selector.selectRows);
  const loadingList = useSelector(selector.selectLoading);
  const listFutures = useSelector(futuresListSelectors.selectRows);
  const pendingList = useSelector(futuresListSelectors.pendingRows);
  const pendingCount = useSelector(futuresListSelectors.pendingcount);
  const pendingLoading = useSelector(futuresListSelectors.pendingLoading);
  const futuretLoading = useSelector(futuresListSelectors.selectLoading);
  const countFutures = useSelector(futuresListSelectors.selectCount);

  // State declarations
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tradeDirection, setTradeDirection] = useState<string | null>(null);
  const [isCoinModalOpen, setIsCoinModalOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState("BTCUSDT");
  const [marketPrice, setMarketPrice] = useState("0");
  const [priceChangePercent, setPriceChangePercent] = useState("0");
  const [highPrice, setHighPrice] = useState("0");
  const [lowPrice, setLowPrice] = useState("0");
  const [volume, setVolume] = useState("0");
  const [activeTab, setActiveTab] = useState<"openOrders" | "recentOrders">("openOrders");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isOrdersLoading, setIsOrdersLoading] = useState(true);
  const [usdtBalance, setUsdtBalance] = useState<number>(0);
  const [openingOrders, setOpeningOrders] = useState<any[]>([]);

  // Refs
  const tickerWs = useRef<WebSocket | null>(null);
  const currentCoinRef = useRef(selectedCoin);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();

  // Memoized utility functions
  const safeToFixed = useCallback((value: any, decimals: number = 2): string => {
    if (value === null || value === undefined) return "0.00";
    const num = typeof value === "string" ? parseFloat(value) : value;
    return isNaN(num) ? "0.00" : num.toFixed(decimals);
  }, []);

  const formatNumber = useCallback((num: any, decimals: number = 2): string => {
    if (num === null || num === undefined) return "0.00";
    const numValue = typeof num === "string" ? parseFloat(num) : num;
    if (isNaN(numValue)) return "0.00";

    return numValue.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }, []);

  const formatVolume = useCallback((vol: any): string => {
    if (vol === null || vol === undefined) return "0";
    const volumeNum = typeof vol === "string" ? parseFloat(vol) : vol;
    if (isNaN(volumeNum)) return "0";

    if (volumeNum >= 1e9) {
      return (volumeNum / 1e9).toFixed(2) + i18n('pages.marketDetail.volume.billion');
    } else if (volumeNum >= 1e6) {
      return (volumeNum / 1e6).toFixed(2) + i18n('pages.marketDetail.volume.million');
    } else {
      return formatNumber(volumeNum, 0);
    }
  }, [formatNumber]);

  const formatDateTime = useCallback((dateString: string): string => {
    if (!dateString) return i18n('pages.assetsDetail.status.pending');
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;

      const now = new Date();
      const isToday = date.toDateString() === now.toDateString();

      if (isToday) {
        return i18n('pages.history.dateFormats.today', date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }));
      } else {
        return i18n('pages.history.dateFormats.yesterday', date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }));
      }
    } catch (error) {
      console.error("Error formatting date:", error, dateString);
      return dateString;
    }
  }, []);

  const formatDateTimeDetailed = useCallback((dateString: string): string => {
    if (!dateString) return i18n('pages.assetsDetail.status.pending');
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;

      return `${date.toLocaleDateString([], {
        year: "numeric",
        month: "short",
        day: "numeric",
      })} ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })}`;
    } catch (error) {
      console.error("Error formatting date:", error, dateString);
      return dateString;
    }
  }, []);

  // Calculate and set balances
  const calculateBalances = useCallback(() => {
    if (listAssets?.length > 0) {
      const usdtAsset = listAssets.find((asset: any) => asset.symbol === 'USDT');
      setUsdtBalance(usdtAsset?.amount || 0);
    }
  }, [listAssets]);

  // Current tab data - memoized
  const currentTabData = useMemo(() => {
    if (activeTab === "openOrders") {
      return {
        count: pendingCount,
        loading: pendingLoading,
        list: Array.isArray(pendingList) ? pendingList : []
      };
    } else {
      return {
        count: countFutures,
        loading: futuretLoading,
        list: Array.isArray(listFutures) ? listFutures : []
      };
    }
  }, [activeTab, pendingCount, pendingLoading, pendingList, countFutures, futuretLoading, listFutures]);

  // Fetch initial data via REST API
  useEffect(() => {
    let isMounted = true;

    const fetchInitialData = async () => {
      if (!selectedCoin) return;

      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.binance.us/api/v3/ticker/24hr?symbol=${selectedCoin}`
        );

        if (!response.ok) throw new Error("Failed to fetch ticker data");

        const tickerData = await response.json();

        if (isMounted) {
          setMarketPrice(tickerData.lastPrice || "0");
          setPriceChangePercent(tickerData.priceChangePercent || "0");
          setHighPrice(tickerData.highPrice || "0");
          setLowPrice(tickerData.lowPrice || "0");
          setVolume(tickerData.volume || "0");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
        if (isMounted) setIsLoading(false);
      }
    };

    fetchInitialData();

    return () => {
      isMounted = false;
    };
  }, [selectedCoin]);

  // WebSocket connection with proper cleanup
  useEffect(() => {
    if (!selectedCoin) return;

    let isMounted = true;
    currentCoinRef.current = selectedCoin;

    const connectTickerWebSocket = () => {
      // Cleanup previous connection
      if (tickerWs.current) {
        tickerWs.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }

      try {
        tickerWs.current = new WebSocket(
          `wss://stream.binance.us:9443/ws/${selectedCoin.toLowerCase()}@ticker`
        );

        tickerWs.current.onopen = () => {
        };

        tickerWs.current.onmessage = (event: MessageEvent) => {
          if (!isMounted) return;

          try {
            const tickerData: BinanceTicker = JSON.parse(event.data);
            if (tickerData.s === currentCoinRef.current && isMounted) {
              setMarketPrice(tickerData.c || "0");
              setPriceChangePercent(tickerData.P || "0");
              setHighPrice(tickerData.h || "0");
              setLowPrice(tickerData.l || "0");
              setVolume(tickerData.v || "0");
            }
          } catch (error) {
            console.error("Error parsing WebSocket message:", error);
          }
        };

        tickerWs.current.onerror = (error: Event) => {
          console.error("Ticker WebSocket error:", error);
        };

        tickerWs.current.onclose = (event: CloseEvent) => {

          if (selectedCoin === currentCoinRef.current && isMounted) {
            reconnectTimeoutRef.current = setTimeout(connectTickerWebSocket, 2000);
          }
        };
      } catch (error) {
        console.error("WebSocket connection error:", error);
      }
    };

    connectTickerWebSocket();

    return () => {
      isMounted = false;
      if (tickerWs.current) {
        tickerWs.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [selectedCoin]);

  // Simulate loading orders data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOrdersLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Fetch data on component mount
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(futuresListAction.doFetchPending()),
          dispatch(assetsListAction.doFetch())
        ]);
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  // Calculate balances when assets data changes
  useEffect(() => {
    calculateBalances();
  }, [calculateBalances]);

  // Event handlers
  const handleOpenCoinModal = useCallback(() => {
    setIsCoinModalOpen(true);
  }, []);

  const handleCloseCoinModal = useCallback(() => {
    setIsCoinModalOpen(false);
  }, []);

  const handleSelectCoin = useCallback((coin: string) => {
    setIsLoading(true);
    // Reset market data
    setMarketPrice("0");
    setPriceChangePercent("0");
    setHighPrice("0");
    setLowPrice("0");
    setVolume("0");
    setSelectedCoin(coin);
    setIsCoinModalOpen(false);
  }, []);

  const handleOpenModal = useCallback((direction: string) => {
    dispatch(assetsListAction.doFetch());
    setTradeDirection(direction);
    setIsModalOpen(true);
  }, [dispatch]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTradeDirection(null);
  }, []);

  const handleOpenOrderModal = useCallback((order: any) => {
    setSelectedOrder(order);
    setIsOrderModalOpen(true);
  }, []);

  const handleCloseOrderModal = useCallback(() => {
    setIsOrderModalOpen(false);
    setSelectedOrder(null);
  }, []);

  const FetchTab = useCallback((tab: string) => {
    if (tab === "openOrders") {
      setActiveTab("openOrders");
      dispatch(futuresListAction.doFetchPending());
    } else {
      setActiveTab("recentOrders");
      dispatch(futuresListAction.doFetch());
    }
  }, [dispatch]);

  // Loading placeholder component
  const LoadingPlaceholder = useCallback(({
    width = "100%",
    height = "1em"
  }: {
    width?: string;
    height?: string;
  }) => (
    <div className="loading-placeholder" style={{ width, height }} />
  ), []);

  // Coin icon URL
  const coinIconUrl = useMemo(() => {
    const coinSymbol = selectedCoin.split("USDT")[0];
    return `https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${coinSymbol}.png`;
  }, [selectedCoin]);

  return (
    <div className="container">
      {/* Header Section */}
      <div className="header">
        <div className="header-top">
          <div className="market-info">
            <div className="market-icon">
              <img
                src={coinIconUrl}
                style={{ width: 30, height: 30 }}
                alt={selectedCoin}
                loading="lazy"
                onError={(e) => {
                  // Fallback if image fails to load
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
            <div className="market-name">{selectedCoin}</div>
            <div
              className="market-change"
              style={{
                color: priceChangePercent?.startsWith("-") ? "#FF6838" : "#00C076",
              }}
            >
              {priceChangePercent !== "0" ? (
                `${priceChangePercent}%`
              ) : (
                <LoadingPlaceholder width="50px" height="16px" />
              )}
            </div>
          </div>
          <div className="additional-actions" onClick={handleOpenCoinModal}>
            <i className="fas fa-filter" />
          </div>
        </div>
        <div className="market-price">
          {marketPrice !== "0" ? (
            `$${formatNumber(marketPrice)}`
          ) : (
            <LoadingPlaceholder width="120px" height="28px" />
          )}
        </div>
        <div className="market-stats">
          <span>
            {i18n('pages.marketDetail.stats.high')}:{" "}
            {highPrice !== "0" ? (
              `$${formatNumber(highPrice)}`
            ) : (
              <LoadingPlaceholder width="80px" height="12px" />
            )}
          </span>
          <span>
            {i18n('pages.marketDetail.stats.volume')}:{" "}
            {volume !== "0" ? (
              `${formatVolume(volume)} ${selectedCoin.replace("USDT", "")}`
            ) : (
              <LoadingPlaceholder width="80px" height="12px" />
            )}
          </span>
          <span>
            {i18n('pages.marketDetail.stats.low')}:{" "}
            {lowPrice !== "0" ? (
              `$${formatNumber(lowPrice)}`
            ) : (
              <LoadingPlaceholder width="80px" height="12px" />
            )}
          </span>
        </div>
      </div>

      {/* Chart */}
      <FuturesChart symbol={selectedCoin} />

      {/* Action Buttons */}
      <div className="future-action-buttons">
        <button
          className="action-button buy-button"
          onClick={() => handleOpenModal("up")}
        >
          {i18n('pages.futures.actions.buyUp')}
        </button>
        <button
          className="action-button sell-button"
          onClick={() => handleOpenModal("down")}
        >
          {i18n('pages.futures.actions.buyDown')}
        </button>
      </div>

      {/* Tabs */}
      <div className="section-tabs">
        <div
          className={`tab ${activeTab === "openOrders" ? "active" : ""}`}
          onClick={() => FetchTab("openOrders")}
        >
          {i18n('pages.futures.tabs.openOrders')} ({pendingCount || 0})
        </div>
        <div
          className={`tab ${activeTab === "recentOrders" ? "active" : ""}`}
          onClick={() => FetchTab("recentOrders")}
        >
          {i18n('pages.futures.tabs.recentOrders')} ({countFutures || 0})
        </div>
      </div>

      {/* Orders List */}
      <FutureList
        countFutures={currentTabData.count}
        futuretLoading={currentTabData.loading}
        listFutures={currentTabData.list}
        handleOpenOrderModal={handleOpenOrderModal}
        formatNumber={formatNumber}
        formatDateTime={formatDateTime}
      />

      {/* Order Detail Modal */}
      {isOrderModalOpen && selectedOrder && (
        <OrderDetailModal
          selectedOrder={selectedOrder}
          onClose={handleCloseOrderModal}
          formatDateTimeDetailed={formatDateTimeDetailed}
          safeToFixed={safeToFixed}
        />
      )}

      {/* Futures Modal */}
      <FuturesModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        direction={tradeDirection}
        dispatch={dispatch}
        listAssets={listAssets}
        selectedCoin={selectedCoin}
        marketPrice={marketPrice}
        availableBalance={usdtBalance}
        setOpeningOrders={setOpeningOrders}
      />

      <CoinListModal
        isOpen={isCoinModalOpen}
        onClose={handleCloseCoinModal}
        onSelectCoin={handleSelectCoin}
      />

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .container {
          max-width: 400px;
          margin: 0 auto;
          padding-bottom: 70px;
          background-color: #000000;
          color: #FFFFFF;
          min-height: 100vh;
        }

        .modal-content {
  max-height: 90vh;
  overflow-y: scroll;  /* allow scroll */
  scrollbar-width: none; /* Firefox */
}
        
        /* Header Section */
        .header {
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
          margin-bottom: 15px;
        }
        
        .market-info {
          display: flex;
          align-items: center;
        }
        
        .market-icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: #F3BA2F;
          margin-right: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .market-icon i {
          color: #000;
        }
        
        .market-name {
          font-weight: bold;
          font-size: 18px;
          margin-right: 10px;
        }
        
        .market-change {
          font-size: 14px;
          font-weight: bold;
        }
        
        .market-price {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        
        .market-stats {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #AAAAAA;
          flex-wrap: wrap;
        }
        
        .market-stats span {
          margin-right: 10px;
          margin-bottom: 5px;
        }
        
        .additional-actions {
          color: #AAAAAA;
          font-size: 20px;
          cursor: pointer;
        }
        
        /* Trading View Chart */
        .chart-container {
          height: 480px;
          background-color: #1A1A1A;
          margin: 15px;
          border-radius: 12px;
          position: relative;
          overflow: hidden;
        }
        
        .chart-placeholder {
          width: 100%;
          height: 100%;
        }
        
        .chart-loading {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.7);
          z-index: 10;
          color: #777;
        }
        
        .chart-controls {
          position: absolute;
          bottom: 10px;
          right: 10px;
          display: flex;
          gap: 5px;
          z-index: 5;
        }
        
        .chart-timeframe {
          background-color: #2A2A2A;
          color: #AAAAAA;
          border: none;
          border-radius: 4px;
          padding: 4px 8px;
          font-size: 12px;
        }
        
        /* Action Buttons */
        .future-action-buttons {
          display: flex;
          gap: 15px;
          margin: 15px;
        }
        
        .action-button {
          flex: 1;
          padding: 13px;
          border: none;
          font-size: 13px;
          font-weight: bold;
          cursor: pointer;
        }
        
        .buy-button {
          background-color: #00C076;
          color: white;
        }
        
        .sell-button {
          background-color: #FF6838;
          color: white;
        }
        
        /* Section Tabs */
        .section-tabs {
          display: flex;
          margin: 15px 15px 0;
          border-bottom: 1px solid #2A2A2A;
        }
        
        .tab {
          padding: 10px 15px;
          cursor: pointer;
          color: #777;
          font-size: 14px;
          position: relative;
          flex: 1;
          text-align: center;
        }
        
        .tab.active {
          color: #FFFFFF;
          font-weight: bold;
        }
        
        .tab.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background-color: #00C076;
        }
        
        /* Orders Container */
        .orders-container {
          margin: 15px;
        }
        
        .order-card {
          background-color: #1A1A1A;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 15px;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .order-card.loading {
          cursor: default;
        }
        
        .order-card:hover:not(.loading) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        
        .order-pair {
          font-weight: bold;
          font-size: 16px;
        }
        
        .order-direction {
          font-size: 12px;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: bold;
        }
        
        .order-direction.buy {
          background-color: rgba(0, 192, 118, 0.2);
          color: #00C076;
        }
        
        .order-direction.sell {
          background-color: rgba(255, 104, 56, 0.2);
          color: #FF6838;
        }
        
        .order-status {
          font-size: 12px;
          margin-bottom: 12px;
        }
        
        .order-status.open {
          color: #00C076;
        }
        
        .order-status.closed {
          color: #777;
        }
        
        .order-details {
          border-top: 1px solid #2A2A2A;
          padding-top: 12px;
        }
        
        .order-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 13px;
        }
        
        .order-label {
          color: #AAAAAA;
        }
        
        .order-value {
          font-weight: 500;
        }
        
        .order-value.buy {
          color: #00C076;
        }
        
        .order-value.sell {
          color: #FF6838;
        }
        
        .no-orders {
          text-align: center;
          padding: 30px 0;
          color: #777;
        }
        
        .no-orders i {
          font-size: 24px;
          margin-bottom: 10px;
          opacity: 0.5;
        }
        
        /* Loading Placeholder */
        .loading-placeholder {
          animation: pulse 1.5s ease-in-out infinite;
          background-color: #2A2A2A;
          border-radius: 4px;
        }
        
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        
        /* Modal Styles */
        .modal-overlays {
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
          padding: 20px;
        }
        
        .modal-content {
          background-color: #1A1A1A;
          border-radius: 12px;
          width: 100%;
          max-width: 400px;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #2A2A2A;
        }
        
        .modal-header h2 {
          font-size: 18px;
          font-weight: bold;
        }
        
        .modal-close {
          background: none;
          border: none;
          color: #AAAAAA;
          font-size: 20px;
          cursor: pointer;
        }
        
        .modal-body {
          padding: 20px;
        }
        
        .modal-footer {
          display: flex;
          justify-content: flex-end;
          padding: 20px;
          border-top: 1px solid #2A2A2A;
          gap: 10px;
        }
        
        .modal-button {
          background-color: #2A2A2A;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 10px 20px;
          cursor: pointer;
          font-weight: bold;
        }
        
        .close-order-button {
          background-color: #FF6838;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 10px 20px;
          cursor: pointer;
          font-weight: bold;
        }
        
        .order-detail-section {
          margin-bottom: 20px;
        }
        
        .order-detail-section h3 {
          font-size: 14px;
          color: #AAAAAA;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .detail-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        
        .detail-pair {
          font-weight: bold;
          font-size: 18px;
        }
        
        .detail-direction {
          font-size: 14px;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: bold;
        }
        
        .detail-direction.buy {
          background-color: rgba(0, 192, 118, 0.2);
          color: #00C076;
        }
        
        .detail-direction.sell {
          background-color: rgba(255, 104, 56, 0.2);
          color: #FF6838;
        }
        
        .detail-status {
          font-size: 14px;
          margin-bottom: 15px;
        }
        
        .detail-status.open {
          color: #00C076;
        }
        
        .detail-status.closed {
          color: #777;
        }
        
        .detail-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 14px;
        }
        
        .detail-label {
          color: #AAAAAA;
        }
        
        .detail-value {
          font-weight: 500;
        }
        
        .detail-value.profit {
          color: #00C076;
        }
        
        .detail-value.loss {
          color: #FF6838;
        }
      `}</style>
    </div>
  );
}

// Extracted Order Detail Modal Component
const OrderDetailModal = ({
  selectedOrder,
  onClose,
  formatDateTimeDetailed,
  safeToFixed
}: any) => (
  <div className="modal-overlays" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <h2>{i18n('pages.futures.orderDetails.title')}</h2>
        <button className="modal-close" onClick={onClose}>
          <i className="fas fa-times" />
        </button>
      </div>
      <div className="modal-body">
        <div className="order-detail-section">
          <div className="detail-header">
            <span className="detail-pair">
              {selectedOrder.symbol || selectedOrder.pair}
            </span>
            <span
              className={`detail-direction ${selectedOrder.futuresStatus === "long" || selectedOrder.direction === "BUY UP"
                ? "buy"
                : "sell"
                }`}
            >
              {selectedOrder.futuresStatus === "long"
                ? i18n('pages.futures.actions.buyUp')
                : selectedOrder.futuresStatus === "short"
                  ? i18n('pages.futures.actions.buyDown')
                  : selectedOrder.direction}
            </span>
          </div>
          <div
            className={`detail-status ${selectedOrder.finalized ? "closed" : "open"
              }`}
          >
            ● {selectedOrder.finalized ? i18n('pages.futures.orderDetails.closed') : i18n('pages.futures.orderDetails.open')}
          </div>
        </div>

        <div className="order-detail-section">
          <OrderDetailRow label={i18n('pages.futures.orderDetails.futuresAmount')} value={`${selectedOrder.futuresAmount || selectedOrder.investment} USDT`} />

          {selectedOrder.contractDuration && (
            <OrderDetailRow label={i18n('pages.futures.orderDetails.contractDuration')} value={`${selectedOrder.contractDuration} ${i18n('pages.futures.orderDetails.seconds')}`} />
          )}

          <OrderDetailRow
            label={i18n('pages.futures.orderDetails.futuresStatus')}
            value={selectedOrder.closePositionTime ? i18n('pages.futures.orderDetails.completed') : i18n('pages.futures.orderDetails.open')}
          />
          <OrderDetailRow
            label={i18n('pages.futures.orderDetails.openPositionPrice')}
            value={selectedOrder.openPositionPrice || selectedOrder.openPrice}
          />
          <OrderDetailRow
            label={i18n('pages.futures.orderDetails.openPositionTime')}
            value={formatDateTimeDetailed(selectedOrder.openPositionTime || selectedOrder.openTime)}
          />

          {selectedOrder.closePositionPrice && (
            <OrderDetailRow label={i18n('pages.futures.orderDetails.closePositionPrice')} value={selectedOrder.closePositionPrice} />
          )}

          {selectedOrder.closePositionTime && (
            <OrderDetailRow
              label={i18n('pages.futures.orderDetails.closePositionTime')}
              value={formatDateTimeDetailed(selectedOrder.closePositionTime)}
            />
          )}

          <OrderDetailRow
            label={i18n('pages.futures.orderDetails.profitLossAmount')}
            value={
              (selectedOrder.profitAndLossAmount || selectedOrder.pnl)
                ? `${safeToFixed(selectedOrder.profitAndLossAmount || selectedOrder.pnl, 2)} USDT`
                : "__"
            }
            className={selectedOrder.control === "profit" ? "profit" : "loss"}
          />

          <OrderDetailRow label={i18n('pages.futures.orderDetails.leverage')} value={`${selectedOrder.leverage}X`} />
        </div>
      </div>
      <div className="modal-footer">
        <button className="modal-button" onClick={onClose}>
          {i18n('pages.futures.orderDetails.done')}
        </button>
      </div>
    </div>
  </div>
);

// Helper component for order detail rows
const OrderDetailRow = ({ label, value, className = "" }: any) => (
  <div className="detail-row">
    <span className="detail-label">{label}</span>
    <span className={`detail-value ${className}`}>{value}</span>
  </div>
);

export default Futures;