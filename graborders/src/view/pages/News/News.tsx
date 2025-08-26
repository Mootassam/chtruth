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
      <div className="market-overview">
        <div className="market-header">
          <div className="market-title">Market Overview</div>
          <a href="#" className="market-view-all">
            View All
          </a>
        </div>
        <div className="market-tickers">
          <div className="ticker-item">
            <div className="ticker-name">
              <div className="ticker-icon">B</div>
              <span>BTC</span>
            </div>
            <div className="ticker-price">$51,402.18</div>
            <div className="ticker-change change-up">+2.35%</div>
          </div>
          <div className="ticker-item">
            <div className="ticker-name">
              <div className="ticker-icon">E</div>
              <span>ETH</span>
            </div>
            <div className="ticker-price">$2,832.45</div>
            <div className="ticker-change change-up">+1.78%</div>
          </div>
          <div className="ticker-item">
            <div className="ticker-name">
              <div className="ticker-icon">S</div>
              <span>SOL</span>
            </div>
            <div className="ticker-price">$128.67</div>
            <div className="ticker-change change-down">-0.45%</div>
          </div>
          <div className="ticker-item">
            <div className="ticker-name">
              <div className="ticker-icon">B</div>
              <span>BNB</span>
            </div>
            <div className="ticker-price">$352.19</div>
            <div className="ticker-change change-up">+0.92%</div>
          </div>
        </div>
      </div>
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
      {/* Trending Section */}
      <div className="trending-section">
        <div className="news-section-title">Trending Topics</div>
        <ul className="trending-list">
          <li className="trending-item">
            <div className="trending-number">1</div>
            <div className="trending-content">
              <div className="trending-title">
                NFT Market Shows Signs of Recovery
              </div>
              <div className="trending-stats">
                <span>1,245 articles</span>
                <span>•</span>
                <span>Trending</span>
              </div>
            </div>
          </li>
          <li className="trending-item">
            <div className="trending-number">2</div>
            <div className="trending-content">
              <div className="trending-title">
                Central Bank Digital Currencies Update
              </div>
              <div className="trending-stats">
                <span>892 articles</span>
                <span>•</span>
                <span>Trending</span>
              </div>
            </div>
          </li>
          <li className="trending-item">
            <div className="trending-number">3</div>
            <div className="trending-content">
              <div className="trending-title">
                DeFi Protocol Reaches $100B TVL
              </div>
              <div className="trending-stats">
                <span>756 articles</span>
                <span>•</span>
                <span>Trending</span>
              </div>
            </div>
          </li>
          <li className="trending-item">
            <div className="trending-number">4</div>
            <div className="trending-content">
              <div className="trending-title">
                Crypto Mining Sustainability Efforts
              </div>
              <div className="trending-stats">
                <span>632 articles</span>
                <span>•</span>
                <span>Trending</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      {/* Newsletter Signup */}
      <div className="newsletter">
        <div className="newsletter-title">Stay Informed</div>
        <div className="newsletter-text">
          Get the latest crypto news and market updates delivered to your inbox
          daily
        </div>
        <div className="newsletter-form">
          <input
            type="email"
            className="newsletter-input"
            placeholder="Your email address"
          />
          <button className="newsletter-button">Subscribe</button>
        </div>
      </div>
    </div>
  );
}

export default News;
