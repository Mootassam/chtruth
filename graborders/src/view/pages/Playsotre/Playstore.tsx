import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

function Playstore() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [expandedDescription, setExpandedDescription] = useState(false)
  const [showDownloadModal, setShowDownloadModal] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const history = useHistory();

  const screenshots = [
    { src: "/playsotre/3.jpg", label: "Advanced Charts" },
    { src: "/playsotre/1.jpg", label: "Fast Withdrawals" },
    { src: "/playsotre/2.png", label: "Crypto Staking" },
    { src: "/playsotre/assets.jpg", label: "Portfolio" },
    { src: "/playsotre/chat.png", label: "24/7 Support" }
  ]

  const openImage = (imageSrc) => {
    setSelectedImage(imageSrc)
  }

  const closeImage = () => {
    setSelectedImage(null)
  }

  const handleInstallClick = () => {
    setShowDownloadModal(true)
  }

  const handleDownloadAPK = async () => {
    setIsDownloading(true)

    try {
      const apkUrl = 'https://nexus-exchange.com/apk/nexus-exchange.apk'

      // Create a temporary link to trigger download
      const link = document.createElement('a')
      link.href = apkUrl
      link.download = 'Nexus-Exchange-v3.4.2.apk'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Simulate download time
      setTimeout(() => {
        setIsDownloading(false)
        setShowDownloadModal(false)
      }, 2000)

    } catch (error) {
      console.error('Download failed:', error)
      setIsDownloading(false)
    }
  }

  const handleOutsideClick = (e) => {
    if (e.target.closest('.screenshot') || e.target.closest('.install-button') || e.target.closest('.share-button') || e.target.closest('.back-button')) {
      return
    }
    setShowDownloadModal(true)
  }

  // Share functionality
  const shareData = {
    title: 'Nexus Exchange - Crypto Trading App',
    text: 'Check out Nexus Exchange - The ultimate trading platform for cryptocurrency and forex markets. Trade Bitcoin, Ethereum, and more with advanced tools!',
    url: 'https://nexus-exchange.com/playstore',
    apkUrl: 'https://nexus-exchange.com/apk/nexus-exchange.apk'
  }

  const shareToWhatsApp = () => {
    const message = `${shareData.title}\n\n${shareData.text}\n\nDownload: ${shareData.url}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
    setShowShareModal(false);
  }

  const shareToFacebook = () => {
    const encodedUrl = encodeURIComponent(shareData.url);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank', 'width=600,height=400');
    setShowShareModal(false);
  }

  const shareViaSMS = () => {
    const message = `${shareData.title}\n${shareData.text}\nDownload: ${shareData.url}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`sms:?body=${encodedMessage}`, '_blank');
    setShowShareModal(false);
  }

  const shareViaEmail = () => {
    const subject = encodeURIComponent(shareData.title);
    const body = encodeURIComponent(`${shareData.text}\n\nDownload: ${shareData.url}`);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
    setShowShareModal(false);
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareData.url).then(() => {
      alert('Link copied to clipboard!');
      setShowShareModal(false);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }

  const openShareModal = () => {
    setShowShareModal(true);
  }
  const goBack = () => {
    history.goBack();
  };

  return (
    <>
      <div className="play-store-container" onClick={handleOutsideClick}>
        {/* Header */}
        <div className="header">
          <div className="back-button" onClick={goBack}>
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
          <img src="/playsotre/nexus.jpg" className="app-icon" alt="Nexus Exchange" />
          <div className="app-info">
            <h1 className="app-title">Nexus Exchange</h1>
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
              <div className="editor-choice">
                <i className="fas fa-award" /> Editor's Choice
              </div>
            </div>
            <div className="downloads">10M+ downloads</div>
            <div className="age-rating">Rated for 3+</div>
            <div className="actions-buttons">
              <button className="install-button" onClick={handleInstallClick}>
                <i className="fas fa-download" /> Install
              </button>
              <button className="wishlist-button">
                <i className="far fa-bookmark" />
              </button>
              <button className="share-button" onClick={openShareModal}>
                <i className="fas fa-share-alt" />
              </button>
            </div>
          </div>
        </div>

        {/* Screenshots */}
        <div className="screenshots">
          <h2 className="sections-title">About this app</h2>
          <div className="screenshot-container">
            {screenshots.map((screenshot, index) => (
              <div
                key={index}
                className="screenshot"
                onClick={() => openImage(screenshot.src)}
              >
                <img src={screenshot.src} alt={screenshot.label} />
                <div className="screenshot-label">{screenshot.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* App Details */}
        <div className="app-details">
          <div className="about-app">
            <p className={`description ${expandedDescription ? 'expanded' : ''}`}>
              Nexus Exchange is the ultimate trading platform for cryptocurrency and forex markets.
              Trade Bitcoin, Ethereum, Forex pairs and more with advanced charting tools, real-time
              market data, and secure transactions. Enjoy a seamless trading experience with our
              intuitive interface designed for both beginners and experts.

              {expandedDescription && (
                <>
                  <br /><br />
                  Features include:
                  • Real-time market data and advanced charts
                  • Secure wallet integration
                  • Multiple payment methods
                  • 24/7 customer support
                  • Advanced order types
                  • Portfolio tracking
                  • Price alerts and notifications
                </>
              )}
            </p>
            <div
              className="read-more"
              onClick={() => setExpandedDescription(!expandedDescription)}
            >
              {expandedDescription ? 'Read less' : 'Read more'}
            </div>
          </div>
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Updated</span>
              <span className="detail-value">August 15, 2023</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Size</span>
              <span className="detail-value">35 MB</span>
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
                  <span className="reviewer-name">James Carter</span>
                  <span className="review-date">January 14, 2025</span>
                </div>
              </div>
              <div className="review-stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="review-text">
                I’ve used several trading apps, but this one is by far the smoothest.
                The real-time updates are accurate, and the interface is super clean.
                I made my first successful trades within a week — highly recommend it for both beginners and pros!
              </p>
            </div>

            <div className="review-item">
              <div className="review-header">
                <div className="reviewer-avatar">O</div>
                <div>
                  <span className="reviewer-name">Olivia Martin</span>
                  <span className="review-date">February 3, 2025</span>
                </div>
              </div>
              <div className="review-stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="far fa-star"></i>
              </div>
              <p className="review-text">
                Great platform! I love how easy it is to analyze charts and execute trades quickly.
                I just wish there were more color themes for customization. Other than that, it’s perfect!
              </p>
            </div>

            <div className="review-item">
              <div className="review-header">
                <div className="reviewer-avatar">A</div>
                <div>
                  <span className="reviewer-name">Ahmed Hassan</span>
                  <span className="review-date">March 19, 2025</span>
                </div>
              </div>
              <div className="review-stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="review-text">
                Very reliable trading app. Fast withdrawals, accurate data, and professional design.
                The live support team is also helpful — they solved my issue in less than 10 minutes.
              </p>
            </div>

            <div className="review-item">
              <div className="review-header">
                <div className="reviewer-avatar">S</div>
                <div>
                  <span className="reviewer-name">Sophia Lee</span>
                  <span className="review-date">April 22, 2025</span>
                </div>
              </div>
              <div className="review-stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="review-text">
                This app made trading so much easier for me. The learning curve is smooth,
                and the built-in tutorials helped me understand how to read market signals.
                Definitely a must-have for new traders.
              </p>
            </div>

            <div className="review-item">
              <div className="review-header">
                <div className="reviewer-avatar">D</div>
                <div>
                  <span className="reviewer-name">Daniel Johnson</span>
                  <span className="review-date">June 8, 2025</span>
                </div>
              </div>
              <div className="review-stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="review-text">
                Fast, modern, and trustworthy. I’ve been using it daily for over three months
                and haven’t faced a single technical issue. The profit tracking and history
                features are top-notch!
              </p>
            </div>

            <div className="review-item">
              <div className="review-header">
                <div className="reviewer-avatar">L</div>
                <div>
                  <span className="reviewer-name">Laura Fernandez</span>
                  <span className="review-date">August 1, 2025</span>
                </div>
              </div>
              <div className="review-stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="far fa-star"></i>
              </div>
              <p className="review-text">
                Excellent app for mobile trading! The charts are easy to read, and the notifications
                keep me updated on market movements. It would be great to add more indicators,
                but overall it’s fantastic.
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
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="image-modal" onClick={closeImage}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeImage}>
              <i className="fas fa-times" />
            </button>
            <img src={selectedImage} alt="App screenshot" />
          </div>
        </div>
      )}

      {/* Download APK Modal */}
      {showDownloadModal && (
        <div className="download-modal" onClick={() => setShowDownloadModal(false)}>
          <div className="download-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="download-header">
              <div className="download-app-icon">
                <img src="/playsotre/nexus.jpg" alt="Nexus Exchange" />
              </div>
              <div className="download-app-info">
                <h3>Nexus Exchange</h3>
                <p>SpotTrade Technologies Inc.</p>
                <div className="download-rating">
                  <div className="stars">
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star-half-alt" />
                  </div>
                  <span>4.5 • 10M+ downloads</span>
                </div>
              </div>
            </div>

            <div className="download-details">
              <div className="download-detail-item">
                <span className="label">Version:</span>
                <span className="value">3.4.2</span>
              </div>
              <div className="download-detail-item">
                <span className="label">Size:</span>
                <span className="value">35 MB</span>
              </div>
              <div className="download-detail-item">
                <span className="label">Required Android:</span>
                <span className="value">8.0 and up</span>
              </div>
              <div className="download-detail-item">
                <span className="label">Permissions:</span>
                <span className="value">Network, Storage, Camera</span>
              </div>
            </div>

            <div className="download-warning">
              <i className="fas fa-exclamation-triangle" />
              <p>This APK file is safe and verified. Enable "Install from unknown sources" in your Android settings if needed.</p>
            </div>

            <div className="download-actions">
              <button
                className="cancel-button"
                onClick={() => setShowDownloadModal(false)}
              >
                Cancel
              </button>
              <button
                className={`download-apk-button ${isDownloading ? 'downloading' : ''}`}
                onClick={handleDownloadAPK}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <>
                    <i className="fas fa-spinner fa-spin" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <i className="fas fa-download" />
                    Download APK
                  </>
                )}
              </button>
            </div>

            <div className="download-footer">
              <p>By downloading, you agree to our Terms of Service and Privacy Policy</p>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="share-modal" onClick={() => setShowShareModal(false)}>
          <div className="share-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="share-header">
              <h3>Share Nexus Exchange</h3>
              <button className="close-share-button" onClick={() => setShowShareModal(false)}>
                <i className="fas fa-times" />
              </button>
            </div>

            <div className="share-options">
              <div className="share-option" onClick={shareToWhatsApp}>
                <div className="share-icon whatsapp">
                  <i className="fab fa-whatsapp" />
                </div>
                <span>WhatsApp</span>
              </div>

              <div className="share-option" onClick={shareToFacebook}>
                <div className="share-icon facebook">
                  <i className="fab fa-facebook-f" />
                </div>
                <span>Facebook</span>
              </div>

              <div className="share-option" onClick={shareViaSMS}>
                <div className="share-icon sms">
                  <i className="fas fa-sms" />
                </div>
                <span>SMS</span>
              </div>

              <div className="share-option" onClick={shareViaEmail}>
                <div className="share-icon email">
                  <i className="fas fa-envelope" />
                </div>
                <span>Email</span>
              </div>

              <div className="share-option" onClick={copyToClipboard}>
                <div className="share-icon link">
                  <i className="fas fa-link" />
                </div>
                <span>Copy Link</span>
              </div>
            </div>

            <div className="share-url">
              <input
                type="text"
                value={shareData.url}
                readOnly
                className="url-input"
              />
              <button onClick={copyToClipboard} className="copy-url-button">
                <i className="fas fa-copy" />
              </button>
            </div>
          </div>
        </div>
      )}

      <style >{`
        * {
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
          min-height: 100vh;
          padding-bottom: 60px;
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
          padding: 20px 16px;
          border-bottom: 1px solid #e8eaed;
          display: flex;
          align-items: flex-start;
        }
        
        .app-icon {
          width: 80px;
          height: 80px;
          border-radius: 16px;
          margin-right: 16px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        }
        
        .app-info {
          flex: 1;
        }
        
        .app-title {
          font-size: 18px;
          font-weight: 500;
          margin-bottom: 4px;
          line-height: 1.3;
          color: #3c4043;
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
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .rating {
          display: flex;
          align-items: center;
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
        
        .editor-choice {
          display: flex;
          align-items: center;
          background: #f8f9fa;
          color: #5f6368;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 500;
        }
        
        .editor-choice i {
          margin-right: 4px;
          color: #1a73e8;
          font-size: 10px;
        }
        
        .downloads {
          color: #5f6368;
          font-size: 13px;
          margin-bottom: 4px;
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
          transition: background-color 0.2s;
        }
        
        .install-button:hover {
          background-color: #1669d6;
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
          transition: background-color 0.2s;
        }
        
        .wishlist-button:hover, .share-button:hover {
          background-color: #e8eaed;
        }
        
        /* Screenshots */
        .screenshots {
          padding: 20px 16px;
          border-bottom: 1px solid #e8eaed;
        }
        
        .sections-title {
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 12px;
          color: #3c4043;
        }
        
        .screenshot-container {
          display: flex;
          overflow-x: auto;
          padding-bottom: 8px;
          gap: 12px;
          scrollbar-width: none;
        }
        
        .screenshot-container::-webkit-scrollbar {
          display: none;
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
          cursor: pointer;
          transition: transform 0.2s;
          overflow: hidden;
        }
        
        .screenshot:hover {
          transform: scale(1.02);
        }
        
        .screenshot img {
          width: 100%;
          height: 100%;
          object-fit: cover;
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
          padding: 20px 16px;
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
          -webkit-line-clamp: ${expandedDescription ? 'unset' : '3'};
          -webkit-box-orient: vertical;
          overflow: hidden;
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
          background: #f8f9fa;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #e8eaed;
        }
        
        .detail-item {
          display: flex;
          justify-content: space-between;
          padding: 12px 16px;
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
          padding: 20px 16px;
          border-bottom: 1px solid #e8eaed;
        }
        
        .review-summary {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          padding: 16px;
          background: #f8f9fa;
          border-radius: 8px;
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
          background-color: #e8eaed;
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
          padding: 20px 16px;
        }
        
        .app-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        
        .app-card {
          text-align: center;
          padding: 12px 8px;
          border-radius: 8px;
          transition: background-color 0.2s;
          cursor: pointer;
        }
        
        .app-card:hover {
          background-color: #f8f9fa;
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
          color: #3c4043;
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
          color: #5f6368;
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
          padding: 4px 8px;
          border-radius: 8px;
          transition: background-color 0.2s;
        }
        
        .nav-item.active {
          color: #1a73e8;
        }
        
        .nav-item:hover {
          background-color: #f8f9fa;
        }
        
        .nav-icon {
          font-size: 20px;
          margin-bottom: 2px;
        }
        
        /* Image Modal */
        .image-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }
        
        .modal-content {
          position: relative;
          max-width: 100%;
          max-height: 100%;
        }
        
        .modal-content img {
          width: 100%;
          height: auto;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }
        
        .close-button {
          position: absolute;
          top: -40px;
          right: 0;
          background: rgba(255, 255, 255, 0.9);
          color: #3c4043;
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 16px;
        }
        
        /* Download Modal */
        .download-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 20px;
        }
        
        .download-modal-content {
          background: white;
          border-radius: 12px;
          width: 100%;
          max-width: 360px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          overflow: hidden;
        }
        
        .download-header {
          display: flex;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #e8eaed;
          background: #f8f9fa;
        }
        
        .download-app-icon {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          margin-right: 16px;
          overflow: hidden;
        }
        
        .download-app-icon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .download-app-info h3 {
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 4px;
          color: #3c4043;
        }
        
        .download-app-info p {
          font-size: 13px;
          color: #1a73e8;
          margin-bottom: 6px;
        }
        
        .download-rating {
          display: flex;
          align-items: center;
        }
        
        .download-rating .stars {
          font-size: 12px;
          margin-right: 6px;
        }
        
        .download-rating span {
          font-size: 12px;
          color: #5f6368;
        }
        
        .download-details {
          padding: 16px 20px;
          border-bottom: 1px solid #e8eaed;
        }
        
        .download-detail-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 13px;
        }
        
        .download-detail-item:last-child {
          margin-bottom: 0;
        }
        
        .download-detail-item .label {
          color: #5f6368;
        }
        
        .download-detail-item .value {
          font-weight: 500;
          text-align: right;
        }
        
        .download-warning {
          display: flex;
          align-items: flex-start;
          padding: 16px 20px;
          background: #fff8e1;
          border-left: 4px solid #ffc107;
          margin: 0 20px 16px;
          border-radius: 4px;
        }
        
        .download-warning i {
          color: #ff9800;
          margin-right: 8px;
          margin-top: 2px;
          font-size: 14px;
        }
        
        .download-warning p {
          font-size: 12px;
          color: #5f6368;
          line-height: 1.4;
        }
        
        .download-actions {
          display: flex;
          gap: 12px;
          padding: 0 20px 20px;
        }
        
        .cancel-button {
          flex: 1;
          background: #f1f3f4;
          border: none;
          border-radius: 4px;
          padding: 12px;
          font-size: 14px;
          font-weight: 500;
          color: #5f6368;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .cancel-button:hover {
          background: #e8eaed;
        }
        
        .download-apk-button {
          flex: 2;
          background: #1a73e8;
          border: none;
          border-radius: 4px;
          padding: 12px;
          font-size: 14px;
          font-weight: 500;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background-color 0.2s;
        }
        
        .download-apk-button:hover:not(.downloading) {
          background: #1669d6;
        }
        
        .download-apk-button.downloading {
          background: #5f6368;
          cursor: not-allowed;
        }
        
        .download-footer {
          padding: 12px 20px;
          background: #f8f9fa;
          border-top: 1px solid #e8eaed;
        }
        
        .download-footer p {
          font-size: 11px;
          color: #5f6368;
          text-align: center;
          line-height: 1.3;
        }
        
        /* Share Modal */
        .share-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 20px;
        }
        
        .share-modal-content {
          background: white;
          border-radius: 16px;
          width: 100%;
          max-width: 320px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          overflow: hidden;
          animation: slideUp 0.3s ease;
        }
        
        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .share-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #e8eaed;
        }
        
        .share-header h3 {
          font-size: 18px;
          font-weight: 500;
          color: #3c4043;
          margin: 0;
        }
        
        .close-share-button {
          background: none;
          border: none;
          color: #5f6368;
          font-size: 18px;
          cursor: pointer;
          padding: 4px;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s;
        }
        
        .close-share-button:hover {
          background-color: #f1f3f4;
        }
        
        .share-options {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          padding: 20px;
        }
        
        .share-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          padding: 12px 8px;
          border-radius: 12px;
          transition: background-color 0.2s;
        }
        
        .share-option:hover {
          background-color: #f8f9fa;
        }
        
        .share-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
          font-size: 20px;
          color: white;
        }
        
        .share-icon.whatsapp {
          background: #25D366;
        }
        
        .share-icon.facebook {
          background: #1877F2;
        }
        
        .share-icon.sms {
          background: #34B7F1;
        }
        
        .share-icon.email {
          background: #EA4335;
        }
        
        .share-icon.link {
          background: #5f6368;
        }
        
        .share-option span {
          font-size: 12px;
          font-weight: 500;
          color: #3c4043;
          text-align: center;
        }
        
        .share-url {
          padding: 0 20px 20px;
          display: flex;
          gap: 8px;
        }
        
        .url-input {
          flex: 1;
          padding: 12px;
          border: 1px solid #e8eaed;
          border-radius: 8px;
          font-size: 14px;
          background: #f8f9fa;
          color: #5f6368;
        }
        
        .copy-url-button {
          background: #1a73e8;
          border: none;
          border-radius: 8px;
          padding: 12px 16px;
          color: white;
          cursor: pointer;
          font-size: 14px;
          transition: background-color 0.2s;
        }
        
        .copy-url-button:hover {
          background: #1669d6;
        }
        
        /* Responsive adjustments */
        @media (max-width: 400px) {
          body {
            max-width: 100%;
          }
          
          .nav-bar {
            max-width: 100%;
          }
          
          .screenshot {
            width: 180px;
            height: 320px;
          }
          
          .download-modal-content,
          .share-modal-content {
            margin: 0 16px;
          }
          
          .share-options {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </>
  )
}

export default Playstore