import React from 'react'

function Playstore() {
    return (
        <>
            <div className="play-store-container">
                {/* Header */}
                <div className="header">
                    <div className="back-button">
                        <i className="fas fa-arrow-left" />
                    </div>
                    <div className="search-bar">
                        <i className="fas fa-search" />
                        <input type="text" placeholder="Search Google Play" />
                    </div>
                    <div className="more-options">
                        <i className="fas fa-ellipsis-v" />
                    </div>
                </div>
                {/* App Header */}
                <div className="app-header">
                    <img src="/playsotre/nexus.jpg" className="app-icon" />
                    <div className="app-info">
                        <h1 className="app-title">NEXUS - Crypto &amp; Forex</h1>
                        <div className="app-developer">SpotTrade Technologies Inc.</div>
                        <div className="app-badges">
                            <div className="rating">
                                <div className="stars">
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star-half-alt" />
                                </div>
                                <span className="rating-value">4.5</span>
                                <span className="rating-count">(1.2M)</span>
                            </div>
                        </div>
                        <div className="downloads">10M+ downloads</div>
                        <div className="age-rating">Rated for 3+</div>
                        <div className="actions-buttons">
                            <button className="install-button">
                                <i className="fas fa-download" /> Install
                            </button>
                            <button className="wishlist-button">
                                <i className="far fa-bookmark" />
                            </button>
                            <button className="share-button">
                                <i className="fas fa-share-alt" />
                            </button>
                        </div>
                    </div>
                </div>
                {/* Screenshots */}
                <div className="screenshots">
                    <h2 className="sections-title">About this app</h2>
                    <div className="screenshot-container">
                        <div className="screenshot">
                            <div className="screenshot-label">Dashboard</div>
                        </div>
                        <div className="screenshot">
                            <div className="screenshot-label">Trading</div>
                        </div>
                        <div className="screenshot">
                            <div className="screenshot-label">Charts</div>
                        </div>
                        <div className="screenshot">
                            <div className="screenshot-label">Wallet</div>
                        </div>
                    </div>
                </div>
                {/* App Details */}
                <div className="app-details">
                    <div className="about-app">
                        <p className="description">
                            SpotTrade is the ultimate trading platform for cryptocurrency and
                            forex markets. Trade Bitcoin, Ethereum, Forex pairs and more with
                            advanced charting tools, real-time market data, and secure
                            transactions. Enjoy a seamless trading experience with our intuitive
                            interface designed for both beginners and experts.
                        </p>
                        <div className="read-more">Read more</div>
                    </div>
                    <div className="details-grid">
                        <div className="detail-item">
                            <span className="detail-label">Updated</span>
                            <span className="detail-value">August 15, 2023</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Size</span>
                            <span className="detail-value">87 MB</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Downloads</span>
                            <span className="detail-value">10,000,000+</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Current Version</span>
                            <span className="detail-value">3.4.2</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Requires Android</span>
                            <span className="detail-value">8.0 and up</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">In-app Purchases</span>
                            <span className="detail-value">$0.99 - $99.99 per item</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Content Rating</span>
                            <span className="detail-value">Rated for 3+</span>
                        </div>
                    </div>
                </div>
                {/* Reviews */}
                <div className="reviews">
                    <h2 className="sections-title">Ratings and reviews</h2>
                    <div className="review-summary">
                        <div className="overall-rating">
                            <div className="rating-large">4.5</div>
                            <div className="stars-large">
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star-half-alt" />
                            </div>
                            <div className="rating-total">1.2M reviews</div>
                        </div>
                        <div className="rating-bars">
                            <div className="rating-bar">
                                <span className="bar-label">5</span>
                                <div className="bar-container">
                                    <div className="bar-fill" style={{ width: "65%" }} />
                                </div>
                                <span className="bar-count">65%</span>
                            </div>
                            <div className="rating-bar">
                                <span className="bar-label">4</span>
                                <div className="bar-container">
                                    <div className="bar-fill" style={{ width: "20%" }} />
                                </div>
                                <span className="bar-count">20%</span>
                            </div>
                            <div className="rating-bar">
                                <span className="bar-label">3</span>
                                <div className="bar-container">
                                    <div className="bar-fill" style={{ width: "8%" }} />
                                </div>
                                <span className="bar-count">8%</span>
                            </div>
                            <div className="rating-bar">
                                <span className="bar-label">2</span>
                                <div className="bar-container">
                                    <div className="bar-fill" style={{ width: "4%" }} />
                                </div>
                                <span className="bar-count">4%</span>
                            </div>
                            <div className="rating-bar">
                                <span className="bar-label">1</span>
                                <div className="bar-container">
                                    <div className="bar-fill" style={{ width: "3%" }} />
                                </div>
                                <span className="bar-count">3%</span>
                            </div>
                        </div>
                    </div>
                    <div className="review-list">
                        <div className="review-item">
                            <div className="review-header">
                                <div className="reviewer-avatar">J</div>
                                <div>
                                    <span className="reviewer-name">John Smith</span>
                                    <span className="review-date">August 10, 2023</span>
                                </div>
                            </div>
                            <div className="review-stars">
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                            </div>
                            <p className="review-text">
                                Excellent trading app! The interface is intuitive and the real-time
                                data is accurate. I've been using it for 6 months and made some good
                                profits.
                            </p>
                        </div>
                        <div className="review-item">
                            <div className="review-header">
                                <div className="reviewer-avatar">M</div>
                                <div>
                                    <span className="reviewer-name">Maria Garcia</span>
                                    <span className="review-date">July 28, 2023</span>
                                </div>
                            </div>
                            <div className="review-stars">
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="far fa-star" />
                            </div>
                            <p className="review-text">
                                Good app overall, but sometimes the charts load slowly during high
                                volatility periods. Customer support is responsive though.
                            </p>
                        </div>
                    </div>
                </div>
                {/* Similar Apps */}
                <div className="similar-apps">
                    <h2 className="sections-title">Similar apps</h2>
                    <div className="app-grid">
                        <div className="app-card">
                            <div
                                className="app-card-icon"
                                style={{
                                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                                }}
                            >
                                <i className="fas fa-coins" />
                            </div>
                            <div className="app-card-title">Crypto Trader</div>
                            <div className="app-card-developer">CryptoApps Ltd</div>
                            <div className="app-card-rating">
                                <div className="app-card-stars">
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star-half-alt" />
                                </div>
                                <span>4.3</span>
                            </div>
                        </div>
                        <div className="app-card">
                            <div
                                className="app-card-icon"
                                style={{
                                    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
                                }}
                            >
                                <i className="fas fa-chart-bar" />
                            </div>
                            <div className="app-card-title">Forex Master</div>
                            <div className="app-card-developer">Forex Solutions</div>
                            <div className="app-card-rating">
                                <div className="app-card-stars">
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="far fa-star" />
                                </div>
                                <span>4.0</span>
                            </div>
                        </div>
                        <div className="app-card">
                            <div
                                className="app-card-icon"
                                style={{
                                    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
                                }}
                            >
                                <i className="fas fa-wallet" />
                            </div>
                            <div className="app-card-title">Bitcoin Wallet</div>
                            <div className="app-card-developer">Blockchain Tech</div>
                            <div className="app-card-rating">
                                <div className="app-card-stars">
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                </div>
                                <span>4.8</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Footer */}
                <div className="footer">
                    <p>Google Play and the Google Play logo are trademarks of Google LLC.</p>
                </div>
            </div>
            {/* Navigation Bar */}
            <div className="nav-bar">
                <div className="nav-item active">
                    <i className="fas fa-home nav-icon" />
                    <span>Home</span>
                </div>
                <div className="nav-item">
                    <i className="fas fa-gamepad nav-icon" />
                    <span>Games</span>
                </div>
                <div className="nav-item">
                    <i className="fas fa-film nav-icon" />
                    <span>Movies</span>
                </div>
                <div className="nav-item">
                    <i className="fas fa-book nav-icon" />
                    <span>Books</span>
                    {/*        </div*/}
                </div>
            </div>

            <style>{`     * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Roboto', Arial, sans-serif;
        }
        
        body {
            background-color: #f8f9fa;
            color: #3c4043;
            line-height: 1.5;
            max-width: 400px;
            margin: 0 auto;
            position: relative;
        }
        
        .play-store-container {
            background-color: white;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            min-height: 100vh;
        }
        
        /* Header */
        .header {
            display: flex;
            align-items: center;
            padding: 12px 16px;
            border-bottom: 1px solid #e8eaed;
            background-color: white;
            position: sticky;
            top: 0;
            z-index: 100;
        }
        
        .back-button {
            margin-right: 16px;
            color: #5f6368;
            font-size: 20px;
            cursor: pointer;
        }
        
        .search-bar {
            flex: 1;
            display: flex;
            align-items: center;
            background-color: #f1f3f4;
            border-radius: 20px;
            padding: 8px 16px;
            margin: 0 8px;
        }
        
        .search-bar i {
            color: #5f6368;
            margin-right: 8px;
            font-size: 18px;
        }
        
        .search-bar input {
            border: none;
            background: transparent;
            width: 100%;
            font-size: 16px;
            outline: none;
        }
        
        .more-options {
            color: #5f6368;
            font-size: 20px;
            cursor: pointer;
        }
        
        /* App Header */
        .app-header {
            padding: 16px;
            border-bottom: 1px solid #e8eaed;
        }
        
        .app-icon {
            width: 80px;
            height: 80px;
            border-radius: 16px;
            background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 16px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
            float: left;
        }
        
        .app-icon i {
            font-size: 40px;
            color: white;
        }
        
        .app-info {
            overflow: hidden;
      
        }
        
        .app-title {
            font-size: 18px;
            font-weight: 500;
            margin-bottom: 4px;
            line-height: 1.3;
        }
        
        .app-developer {
            color: #1a73e8;
            margin-bottom: 8px;
            font-size: 13px;
        }
        
        .app-badges {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
        }
        
        .rating {
            display: flex;
            align-items: center;
            margin-right: 12px;
        }
        
        .stars {
            color: #fbbc04;
            margin-right: 4px;
            font-size: 14px;
        }
        
        .rating-value {
            font-weight: 500;
            margin-right: 4px;
            font-size: 14px;
        }
        
        .rating-count {
            color: #5f6368;
            font-size: 13px;
        }
        
        .downloads {
            color: #5f6368;
            font-size: 13px;
        }
        
        .age-rating {
            background-color: #f1f3f4;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 11px;
            color: #5f6368;
            display: inline-block;
            margin-bottom: 12px;
        }
        
        .actions-buttons {
            display: flex;
            margin-top: 8px;
        }
        
        .install-button {
            background-color: #1a73e8;
            color: white;
            border: none;
            border-radius: 4px;
            padding: 10px 20px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            margin-right: 12px;
            display: flex;
            align-items: center;
            flex: 1;
            justify-content: center;
        }
        
        .install-button i {
            margin-right: 8px;
        }
        
        .wishlist-button, .share-button {
            background-color: #f1f3f4;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: #5f6368;
            margin-right: 8px;
        }
        
        /* Screenshots */
        .screenshots {
            padding: 16px;
            border-bottom: 1px solid #e8eaed;
        }
        
        .sections-title {
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 12px;
        }
        
        .screenshot-container {
            display: flex;
            overflow-x: auto;
            padding-bottom: 8px;
            gap: 12px;
        }
        
        .screenshot {
            width: 200px;
            height: 355px;
            border-radius: 12px;
            flex-shrink: 0;
            background-size: cover;
            background-position: center;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            position: relative;
        }
        
        .screenshot:nth-child(1) {
            background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
        }
        
        .screenshot:nth-child(2) {
            background: linear-gradient(135deg, #2575fc 0%, #6a11cb 100%);
        }
        
        .screenshot:nth-child(3) {
            background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
        }
        
        .screenshot:nth-child(4) {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .screenshot-label {
            position: absolute;
            bottom: 10px;
            left: 10px;
            background-color: rgba(0,0,0,0.7);
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
        }
        
        /* App Details */
        .app-details {
            padding: 16px;
            border-bottom: 1px solid #e8eaed;
        }
        
        .about-app {
            margin-bottom: 20px;
        }
        
        .description {
            color: #5f6368;
            margin-bottom: 12px;
            font-size: 14px;
            line-height: 1.5;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        
        .description.expanded {
            -webkit-line-clamp: unset;
        }
        
        .read-more {
            color: #1a73e8;
            font-weight: 500;
            cursor: pointer;
            font-size: 14px;
        }
        
        .details-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0;
        }
        
        .detail-item {
            display: flex;
            justify-content: space-between;
            padding: 12px 0;
            border-bottom: 1px solid #e8eaed;
            font-size: 14px;
        }
        
        .detail-item:last-child {
            border-bottom: none;
        }
        
        .detail-label {
            color: #5f6368;
        }
        
        .detail-value {
            font-weight: 500;
            text-align: right;
        }
        
        /* Reviews */
        .reviews {
            padding: 16px;
            border-bottom: 1px solid #e8eaed;
        }
        
        .review-summary {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
        }
        
        .overall-rating {
            text-align: center;
            margin-right: 20px;
        }
        
        .rating-large {
            font-size: 36px;
            font-weight: 500;
            line-height: 1;
        }
        
        .stars-large {
            color: #fbbc04;
            font-size: 16px;
            margin: 6px 0;
        }
        
        .rating-total {
            color: #5f6368;
            font-size: 13px;
        }
        
        .rating-bars {
            flex: 1;
        }
        
        .rating-bar {
            display: flex;
            align-items: center;
            margin-bottom: 6px;
        }
        
        .bar-label {
            width: 20px;
            font-size: 13px;
            color: #5f6368;
        }
        
        .bar-container {
            flex: 1;
            height: 6px;
            background-color: #f1f3f4;
            border-radius: 3px;
            margin: 0 8px;
            overflow: hidden;
        }
        
        .bar-fill {
            height: 100%;
            background-color: #fbbc04;
            border-radius: 3px;
        }
        
        .bar-count {
            width: 30px;
            font-size: 13px;
            color: #5f6368;
            text-align: right;
        }
        
        .review-list {
            margin-top: 20px;
        }
        
        .review-item {
            padding: 16px 0;
            border-bottom: 1px solid #e8eaed;
        }
        
        .review-item:last-child {
            border-bottom: none;
        }
        
        .review-header {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
        }
        
        .reviewer-avatar {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background-color: #e0e0e0;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 12px;
            font-weight: bold;
            color: #5f6368;
            font-size: 16px;
        }
        
        .reviewer-name {
            font-weight: 500;
            margin-right: 8px;
            font-size: 14px;
        }
        
        .review-date {
            color: #5f6368;
            font-size: 13px;
        }
        
        .review-stars {
            color: #fbbc04;
            margin-bottom: 8px;
            font-size: 14px;
        }
        
        .review-text {
            color: #3c4043;
            font-size: 14px;
            line-height: 1.4;
        }
        
        /* Similar Apps */
        .similar-apps {
            padding: 16px;
        }
        
        .app-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
        }
        
        .app-card {
            text-align: center;
        }
        
        .app-card-icon {
            width: 60px;
            height: 60px;
            border-radius: 12px;
            margin: 0 auto 6px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .app-card-icon i {
            font-size: 28px;
            color: white;
        }
        
        .app-card-title {
            font-size: 12px;
            font-weight: 500;
            margin-bottom: 2px;
            line-height: 1.3;
        }
        
        .app-card-developer {
            font-size: 11px;
            color: #5f6368;
            margin-bottom: 6px;
        }
        
        .app-card-rating {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 11px;
        }
        
        .app-card-stars {
            color: #fbbc04;
            margin-right: 2px;
            font-size: 10px;
        }
        
        /* Footer */
        .footer {
            padding: 20px 16px;
            background-color: #f8f9fa;
            border-top: 1px solid #e8eaed;
            text-align: center;
            color: #5f6368;
            font-size: 12px;
        }
        
        /* Navigation Bar */
        .nav-bar {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: white;
            display: flex;
            justify-content: space-around;
            padding: 8px 0;
            border-top: 1px solid #e8eaed;
            max-width: 400px;
            margin: 0 auto;
            z-index: 100;
        }
        
        .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #5f6368;
            font-size: 10px;
        }
        
        .nav-item.active {
            color: #1a73e8;
        }
        
        .nav-icon {
            font-size: 20px;
            margin-bottom: 2px;
        }
        
        /* Responsive adjustments */
        @media (max-width: 400px) {
            body {
                max-width: 100%;
            }
            
            .nav-bar {
                max-width: 100%;
            }
        }`}</style>
        </>

    )
}

export default Playstore