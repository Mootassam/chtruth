import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import SubHeader from "src/view/shared/Header/SubHeader";
import productListSelectors from "src/modules/product/list/productListSelectors";
import productListActions from "src/modules/product/list/productListActions";
import selector from "src/modules/product/list/productListSelectors";
import SingleItem from "./SingleItem";

// Define filter options in a constant to avoid recreation on each render
const FILTER_OPTIONS = [
  { key: "news", coin: 0, label: "All" },
  { key: "bitcoin", coin: 1, label: "Bitcoin" },
  { key: "ethereum", coin: 1027, label: "Ethereum" },
  { key: "Usdt", coin: 825, label: "Usdt" },
  { key: "BNB", coin: 1839, label: "BNB" },
  { key: "Solona", coin: 5426, label: "Solona" },
  { key: "USDC", coin: 3408, label: "USDC" },
  { key: "XRP", coin: 52, label: "XRP" },
  { key: "toncoin", coin: 11419, label: "TonCoin" },
];

function News() {
  const dispatch = useDispatch();
  const [newselected, setNewSelected] = useState("news");
  
  // Select data from Redux store
  const selectNews = useSelector(productListSelectors.selectNews);
  const selectloadingNews = useSelector(productListSelectors.selectloadingNews);
  const record = useSelector(selector.selectRows);
  
  // Memoized filter option to prevent unnecessary recalculations
  const filterOptions = useMemo(() => FILTER_OPTIONS, []);

  // Memoized event handler to prevent unnecessary re-renders of filter buttons
  const handleFilterClick = useCallback((item, coin) => {
    setNewSelected(item);
    dispatch(productListActions.doFindNews(coin));
  }, [dispatch]);

  // Memoized fetch function with useCallback
  const fetchCoins = useCallback(() => {
    dispatch(productListActions.doFetch());
    dispatch(productListActions.doFindNews(1));
  }, [dispatch]);

  // Fetch data on component mount
  useEffect(() => {
    fetchCoins();
  }, [fetchCoins]);

  return (
    <div className="container">
      {/* Header Section */}
      <SubHeader title="Crypto News" />
      
      {/* News Filters */}
      <div className="news-filters">
        {filterOptions.map((filter) => (
          <button
            key={filter.key}
            className={`filter-button ${newselected === filter.key ? 'active' : ''}`}
            onClick={() => handleFilterClick(filter.key, filter.coin)}
          >
            {filter.label}
          </button>
        ))}
      </div>
      
      {/* News List */}
      <div className="news-list">
        <div className="news-section-title">Latest News</div>
        <SingleItem topic={selectNews} loading={selectloadingNews} />
      </div>
    </div>
  );
}

// Use React.memo to prevent unnecessary re-renders if props don't change
export default React.memo(News);