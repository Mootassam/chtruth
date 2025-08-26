import React from "react";
import SubHeader from "src/view/shared/Header/SubHeader";

function Support() {
  return (
    <div className="container">
      {/* Header Section */}

      <SubHeader title="Support Center" />

   
      {/* Support Options */}
      <div className="support-options">
        <div className="option-card">
          <div className="option-icon">
            <i className="fas fa-book" />
          </div>
          <div className="option-content">
            <div className="option-title">Help Articles</div>
            <div className="option-description">Step-by-step guides</div>
          </div>
        </div>
        <div className="option-card">
          <div className="option-icon">
            <i className="fas fa-comments" />
          </div>
          <div className="option-content">
            <div className="option-title">Live Chat</div>
            <div className="option-description">24/7 support available</div>
          </div>
        </div>
        <div className="option-card">
          <div className="option-icon">
            <i className="fas fa-envelope" />
          </div>
          <div className="option-content">
            <div className="option-title">Email Support</div>
            <div className="option-description">Response within 24 hours</div>
          </div>
        </div>
      </div>
      {/* FAQ Section */}
      <div className="faq-section">
        <div className="section-title">Frequently Asked Questions</div>
        <div className="faq-item">
          <div className="faq-question">
            <div className="faq-question-text">
              How do I deposit funds into my wallet?
            </div>
            <i className="fas fa-chevron-down faq-icon" />
          </div>
          <div className="faq-answer">
            To deposit funds, go to the Deposit section, select your preferred
            cryptocurrency, and send funds to your unique wallet address. Always
            ensure you're using the correct network.
          </div>
        </div>
        <div className="faq-item">
          <div className="faq-question">
            <div className="faq-question-text">
              What are the withdrawal fees?
            </div>
            <i className="fas fa-chevron-down faq-icon" />
          </div>
          <div className="faq-answer">
            Withdrawal fees vary by cryptocurrency and network conditions. You
            can view the current fees in the withdrawal confirmation screen
            before completing any transaction.
          </div>
        </div>
        <div className="faq-item">
          <div className="faq-question">
            <div className="faq-question-text">
              How long do transactions take?
            </div>
            <i className="fas fa-chevron-down faq-icon" />
          </div>
          <div className="faq-answer">
            Transaction times vary by network congestion. Bitcoin transactions
            typically take 10-30 minutes, while Ethereum transactions usually
            complete in under 5 minutes.
          </div>
        </div>
        <div className="faq-item">
          <div className="faq-question">
            <div className="faq-question-text">
              Is my cryptocurrency insured?
            </div>
            <i className="fas fa-chevron-down faq-icon" />
          </div>
          <div className="faq-answer">
            We maintain comprehensive insurance coverage for digital assets held
            in our custody. However, transfers to external wallets are not
            covered by our insurance policy.
          </div>
        </div>
      </div>
      {/* Contact Section */}
      <div className="contact-section">
        <div className="section-title">Contact Support</div>
        <div className="contact-methods">
          <div className="contact-method">
            <div className="contact-icon">
              <i className="fas fa-comment-dots" />
            </div>
            <div className="contact-title">Live Chat</div>
          </div>
          <div className="contact-method">
            <div className="contact-icon">
              <i className="fas fa-envelope" />
            </div>
            <div className="contact-title">Email Us</div>
          </div>
        </div>
      </div>
      {/* Community Section */}
      <div className="community-section">
        <div className="community-title">Community</div>
        <div className="community-links">
          <div className="community-link">
            <i className="fab fa-twitter community-link-icon" />
            <div className="community-link-text">Twitter</div>
          </div>
          <div className="community-link">
            <i className="fab fa-telegram community-link-icon" />
            <div className="community-link-text">Telegram</div>
          </div>
          <div className="community-link">
            <i className="fab fa-discord community-link-icon" />
            <div className="community-link-text">Discord</div>
          </div>
          <div className="community-link">
            <i className="fab fa-reddit community-link-icon" />
            <div className="community-link-text">Reddit</div>
          </div>
        </div>
      </div>
      {/* Bottom Navigation */}
    </div>
  );
}

export default Support;
