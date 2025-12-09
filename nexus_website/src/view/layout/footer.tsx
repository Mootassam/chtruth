import React from "react";
import { Link, useLocation } from "react-router-dom";
function TabBottomNavigator() {
  const location = useLocation();

  return (
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-column">
              <h3>NEXUS EXCHANGE</h3>
              <p style={{ color: 'var(--light-gray)', marginBottom: '20px' }}>The All-In-One Crypto Trading Hub for
                professional traders and beginners alike.</p>
                <div className="social-links">
    <a href="mailto:support@nexus-exchange.com" className="social-link"  style={{ textDecoration: "none" }}>
        <i className="fas fa-envelope"></i>
    </a>

    <a href="https://t.me/nexusexchange_official" target="_blank" className="social-link"  style={{ textDecoration: "none" }}>
        <i className="fab fa-telegram-plane"></i>
    </a>
</div>

            
            </div>
            <div className="footer-column">
              <h3>Quick Links</h3>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/services">About Us</Link></li>
                <li><Link to="/market">Market Trends</Link></li>
                <li><a href="https://nexus-exchange.com/">Trading</a></li>
                <li><a href="https://nexus-exchange.com">How It Works</a></li>
                <li><a href="https://nexus-exchange.com/playstore">Download App</a></li>
                <li><Link to="/helpcenter">Help & Support</Link></li>
                <li><Link to="/faqs">FAQs</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Legal</h3>
              <ul className="footer-links">
                <li><Link to="/terms-of-use">Terms of Use</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/privacy">Cookie Policy</Link></li>
                <li><Link to="/privacy">AML Policy</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Support</h3>
              <ul className="footer-links">
                <li><Link to="/helpcenter">Help Center</Link></li>
                <li><a href="mailto:support@nexus-exchange.com">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; 2025 Nexus Exchange. All rights reserved.</p>
          </div>
        </div>
      </footer>
  );
}

export default TabBottomNavigator;
