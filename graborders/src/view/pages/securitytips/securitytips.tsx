import React from 'react'
import SubHeader from 'src/view/shared/Header/SubHeader'

function securitytips() {

  const handleBackClick = () => {
    window.history.back();
  };
  return (
    <div className="container">
      {/* Header Section */}

      <div className="header">
        <div className="header-content">
          <div className="back-button" onClick={handleBackClick}>
            <i className="fas fa-arrow-left" />
          </div>
          <div className="page-title">Security Center</div>
          <div className="placeholder" />
        </div>
      </div>
      {/* Security Score */}

      {/* Security Tips */}
      <div className="security-tips">
        <div className="section-title">Essential Security Tips</div>
        {/* Password Security */}
        <div className="tip-category">
          <div className="category-title">
            <i className="fas fa-key category-icon" />
            Password Security
          </div>
          <div className="tip-item">
            <i className="fas fa-check-circle tip-icon" />
            <div className="tip-content">
              <div className="tip-title">Use Strong, Unique Passwords</div>
              <div className="tip-description">
                Create complex passwords with uppercase, lowercase, numbers, and
                symbols.
              </div>
            </div>
          </div>
          <div className="tip-item">
            <i className="fas fa-check-circle tip-icon" />
            <div className="tip-content">
              <div className="tip-title">Enable Two-Factor Authentication</div>
              <div className="tip-description">
                Add an extra layer of security to your account with 2FA.
              </div>
            </div>
          </div>
          <div className="tip-item">
            <i className="fas fa-check-circle tip-icon" />
            <div className="tip-content">
              <div className="tip-title">Change Passwords Regularly</div>
              <div className="tip-description">
                Update your passwords every 3-6 months.
              </div>
            </div>
          </div>
        </div>
        {/* Device Security */}
        <div className="tip-category">
          <div className="category-title">
            <i className="fas fa-mobile-alt category-icon" />
            Device Security
          </div>
          <div className="tip-item">
            <i className="fas fa-check-circle tip-icon" />
            <div className="tip-content">
              <div className="tip-title">Keep Software Updated</div>
              <div className="tip-description">
                Regularly update your OS, browser, and wallet software.
              </div>
            </div>
          </div>
          <div className="tip-item">
            <i className="fas fa-check-circle tip-icon" />
            <div className="tip-content">
              <div className="tip-title">Use Antivirus Protection</div>
              <div className="tip-description">
                Install reputable antivirus and anti-malware software.
              </div>
            </div>
          </div>
          <div className="tip-item">
            <i className="fas fa-check-circle tip-icon" />
            <div className="tip-content">
              <div className="tip-title">Avoid Public Wi-Fi</div>
              <div className="tip-description">
                Never access your wallet on public networks without a VPN.
              </div>
            </div>
          </div>
        </div>
        {/* Account Security */}
        <div className="tip-category">
          <div className="category-title">
            <i className="fas fa-user-shield category-icon" />
            Account Security
          </div>
          <div className="tip-item">
            <i className="fas fa-check-circle tip-icon" />
            <div className="tip-content">
              <div className="tip-title">Enable Login Notifications</div>
              <div className="tip-description">
                Get alerts for new logins to your account.
              </div>
            </div>
          </div>
          <div className="tip-item">
            <i className="fas fa-check-circle tip-icon" />
            <div className="tip-content">
              <div className="tip-title">Review Account Activity</div>
              <div className="tip-description">
                Regularly check your account for suspicious activity.
              </div>
            </div>
          </div>
          <div className="tip-item">
            <i className="fas fa-check-circle tip-icon" />
            <div className="tip-content">
              <div className="tip-title">Use Whitelisting</div>
              <div className="tip-description">
                Whitelist trusted withdrawal addresses for added security.
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Action Cards */}
      <div className="action-cards">
        <div className="action-card">
          <i className="fas fa-shield-alt action-icon" />
          <div className="action-title">Enable 2FA</div>
          <div className="action-description">Add an extra layer of security</div>
        </div>
        <div className="action-card">
          <i className="fas fa-list-ul action-icon" />
          <div className="action-title">Activity Log</div>
          <div className="action-description">Review recent account activity</div>
        </div>
        <div className="action-card">
          <i className="fas fa-wrench action-icon" />
          <div className="action-title">Settings</div>
          <div className="action-description">Configure security preferences</div>
        </div>
        <div className="action-card">
          <i className="fas fa-history action-icon" />
          <div className="action-title">Backup Codes</div>
          <div className="action-description">Save your recovery codes</div>
        </div>
      </div>
      {/* Emergency Section */}
      <div className="emergency-section">
        <div className="emergency-title">
          <i className="fas fa-exclamation-triangle" />
          Emergency Procedures
        </div>
        <ul className="emergency-list">
          <li className="emergency-item">
            <i className="fas fa-phone emergency-icon" />
            <div className="emergency-content">
              <div className="emergency-text">
                If you suspect unauthorized access to your account, immediately
                change your password and enable 2FA if not already active.
              </div>
            </div>
          </li>
          <li className="emergency-item">
            <i className="fas fa-ban emergency-icon" />
            <div className="emergency-content">
              <div className="emergency-text">
                If your device is lost or stolen, immediately revoke session access
                from your account settings.
              </div>
            </div>
          </li>
          <li className="emergency-item">
            <i className="fas fa-lock emergency-icon" />
            <div className="emergency-content">
              <div className="emergency-text">
                If you've fallen victim to a phishing attempt, freeze your account
                and contact support immediately.
              </div>
            </div>
          </li>
        </ul>
        <div className="emergency-contact">
          <div className="contact-title">24/7 Security Support</div>
          <div className="contact-info">support@nexus-exchange.com</div>
        </div>
      </div>
      {/* Resources Section */}
      <div className="resources-section">
        <div className="section-title">Security Resources</div>
        <div className="resource-item">
          <div className="resource-icon">
            <i className="fas fa-book" />
          </div>
          <div className="resource-content">
            <div className="resource-title">Security Guide</div>
            <a href="#" className="resource-link">
              Read comprehensive security documentation
            </a>
          </div>
        </div>
        <div className="resource-item">
          <div className="resource-icon">
            <i className="fas fa-graduation-cap" />
          </div>
          <div className="resource-content">
            <div className="resource-title">Learning Center</div>
            <a href="#" className="resource-link">
              Learn about crypto security best practices
            </a>
          </div>
        </div>
        <div className="resource-item">
          <div className="resource-icon">
            <i className="fas fa-question-circle" />
          </div>
          <div className="resource-content">
            <div className="resource-title">FAQ</div>
            <a href="#" className="resource-link">
              Find answers to common security questions
            </a>
          </div>
        </div>
      </div>
      <style>{`  /* Header Section */
        .header {
            background-color: #000000;
            position: sticky;
            top: 0;
            z-index: 100;
            margin-bottom: 20px;
        }
        
        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .back-button {
            color: #FFFFFF;
            font-size: 20px;
            cursor: pointer;
        }
        
        .page-title {
            font-size: 20px;
            font-weight: bold;
        }
        
        .placeholder {
            width: 20px;
        }`}</style>
    </div>

  )
}

export default securitytips