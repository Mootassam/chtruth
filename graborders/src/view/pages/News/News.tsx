import React from "react";
import SubHeader from "src/view/shared/Header/SubHeader";

function News() {
  return (
    <div className="container">
      {/* Header Section */}

      <SubHeader title="Crypto News" />
      {/* News Filters */}
      <div className="news-filters">
        <button className="filter-button active">All</button>
        <button className="filter-button">Bitcoin</button>
        <button className="filter-button">Ethereum</button>
        <button className="filter-button">DeFi</button>
        <button className="filter-button">NFT</button>
        <button className="filter-button">Regulation</button>
        <button className="filter-button">Market</button>
        <button className="filter-button">Web3</button>
      </div>
      {/* Market Overview */}

      {/* News List */}
      <div className="news-list">
        <div className="news-section-title">Latest News</div>
        {/* News Item 1 */}
        <div className="news-item">
          <div className="news-header">
            <div className="news-source">
              <i className="fas fa-newspaper" />
            </div>
            <div className="news-info">
              <div className="news-source-name">CryptoNews</div>
              <div className="news-date">2 hours ago</div>
            </div>
          </div>
          <div className="news-title">
            Bitcoin Surpasses $52,000 as Institutional Demand Increases
          </div>
          <div className="news-content">
            Major companies continue to add Bitcoin to their balance sheets,
            driving prices to new yearly highs amid growing institutional
            adoption.
          </div>
          <div className="news-image">
            <i className="fas fa-image" /> Bitcoin Chart Analysis
          </div>
          <div className="news-footer">
            <div className="news-tags">
              <span className="news-tag">Bitcoin</span>
              <span className="news-tag">Market</span>
            </div>
            <div className="news-actions">
              <div className="news-action">
                <i className="far fa-bookmark" />
              </div>
              <div className="news-action">
                <i className="fas fa-share-alt" />
              </div>
            </div>
          </div>
        </div>
        {/* News Item 2 */}
        <div className="news-item">
          <div className="news-header">
            <div className="news-source">
              <i className="fas fa-chart-line" />
            </div>
            <div className="news-info">
              <div className="news-source-name">MarketWatch</div>
              <div className="news-date">5 hours ago</div>
            </div>
          </div>
          <div className="news-title">
            Ethereum Upgrade Scheduled for Next Month to Reduce Gas Fees
          </div>
          <div className="news-content">
            The upcoming network update promises to significantly lower
            transaction costs and improve scalability for the Ethereum
            ecosystem.
          </div>
          <div className="news-footer">
            <div className="news-tags">
              <span className="news-tag">Ethereum</span>
              <span className="news-tag">Technology</span>
            </div>
            <div className="news-actions">
              <div className="news-action">
                <i className="far fa-bookmark" />
              </div>
              <div className="news-action">
                <i className="fas fa-share-alt" />
              </div>
            </div>
          </div>
        </div>
        {/* News Item 3 */}
        <div className="news-item">
          <div className="news-header">
            <div className="news-source">
              <i className="fas fa-landmark" />
            </div>
            <div className="news-info">
              <div className="news-source-name">Regulation Daily</div>
              <div className="news-date">8 hours ago</div>
            </div>
          </div>
          <div className="news-title">
            New Crypto Regulations Proposed to Protect Investors
          </div>
          <div className="news-content">
            Lawmakers have introduced a new bill aimed at creating clearer
            guidelines for cryptocurrency exchanges and protecting consumer
            assets.
          </div>
          <div className="news-image">
            <i className="fas fa-image" /> Regulation Impact
          </div>
          <div className="news-footer">
            <div className="news-tags">
              <span className="news-tag">Regulation</span>
              <span className="news-tag">Policy</span>
            </div>
            <div className="news-actions">
              <div className="news-action">
                <i className="far fa-bookmark" />
              </div>
              <div className="news-action">
                <i className="fas fa-share-alt" />
              </div>
            </div>
          </div>
        </div>
      </div>
    
    
    
    </div>
  );
}

export default News;
