import React from 'react'

function proof() {
  return (
<div className="container">
  {/* Header Section */}
  <div className="header">
    <div className="header-content">
      <div className="back-button">
        <i className="fas fa-arrow-left" />
      </div>
      <div className="page-title">Identity Verification</div>
      <div className="placeholder" />
    </div>
  </div>
  {/* Instructions */}
  <div className="instructions">
    Verify your identity to access all features of your crypto wallet
  </div>
  {/* Form Section */}
  <div className="form-section">
    <div className="section-title">Document Information</div>
    {/* Document Type */}
    <div className="input-group">
      <label className="input-label">
        Document Type <span className="required">*</span>
      </label>
      <div className="radio-group">
        <div className="radio-option selected">
          <i className="fas fa-passport radio-icon" />
          <span className="radio-text">Passport</span>
        </div>
        <div className="radio-option">
          <i className="fas fa-id-card radio-icon" />
          <span className="radio-text">ID Card</span>
        </div>
        <div className="radio-option">
          <i className="fas fa-id-card-alt radio-icon" />
          <span className="radio-text">Driver's License</span>
        </div>
      </div>
    </div>
    {/* Personal Information */}
    <div className="input-group">
      <label className="input-label">
        First Name <span className="required">*</span>
      </label>
      <div className="input-container">
        <input
          type="text"
          className="text-input"
          placeholder="Enter your first name"
        />
      </div>
    </div>
    <div className="input-group">
      <label className="input-label">
        Last Name <span className="required">*</span>
      </label>
      <div className="input-container">
        <input
          type="text"
          className="text-input"
          placeholder="Enter your last name"
        />
      </div>
    </div>
    <div className="input-group">
      <label className="input-label">
        Date of Birth <span className="required">*</span>
      </label>
      <div className="input-container">
        <input type="date" className="text-input" />
      </div>
    </div>
    <div className="input-group">
      <label className="input-label">
        Address <span className="required">*</span>
      </label>
      <div className="input-container">
        <input
          type="text"
          className="text-input"
          placeholder="Enter your full address"
        />
      </div>
    </div>
    <div className="input-group">
      <label className="input-label">
        Country <span className="required">*</span>
      </label>
      <div className="input-container">
        <select className="select-input">
          <option value="">Select your country</option>
          <option value="us">United States</option>
          <option value="uk">United Kingdom</option>
          <option value="ca">Canada</option>
          <option value="au">Australia</option>
          <option value="de">Germany</option>
          <option value="fr">France</option>
          <option value="jp">Japan</option>
        </select>
      </div>
    </div>
    <div className="input-group">
      <label className="input-label">
        Document Number <span className="required">*</span>
      </label>
      <div className="input-container">
        <input
          type="text"
          className="text-input"
          placeholder="Enter your document number"
        />
      </div>
    </div>
    <div className="input-group">
      <label className="input-label">
        Expiration Date <span className="required">*</span>
      </label>
      <div className="input-container">
        <input type="date" className="text-input" />
      </div>
    </div>
  </div>
  {/* Document Upload Section */}
  <div className="form-section">
    <div className="section-title">Document Upload</div>
    {/* Front of ID */}
    <div className="file-upload">
      <label className="input-label">
        Front of Document <span className="required">*</span>
      </label>
      <div className="upload-area">
        <div className="upload-icon">
          <i className="fas fa-cloud-upload-alt" />
        </div>
        <div className="upload-text">Upload front side of your document</div>
        <div className="upload-subtext">JPG, PNG or PDF, max 5MB</div>
        <input type="file" style={{ display: "none" }} accept="image/*,.pdf" />
      </div>
      <div className="upload-preview">
        <div className="preview-item">
          <div className="preview-placeholder">
            <i className="fas fa-id-card" />
          </div>
        </div>
      </div>
    </div>
    {/* Back of ID */}
    <div className="file-upload">
      <label className="input-label">
        Back of Document <span className="required">*</span>
      </label>
      <div className="upload-area">
        <div className="upload-icon">
          <i className="fas fa-cloud-upload-alt" />
        </div>
        <div className="upload-text">Upload back side of your document</div>
        <div className="upload-subtext">JPG, PNG or PDF, max 5MB</div>
        <input type="file" style={{ display: "none" }} accept="image/*,.pdf" />
      </div>
      <div className="upload-preview">
        <div className="preview-item">
          <div className="preview-placeholder">
            <i className="fas fa-id-card" />
          </div>
        </div>
      </div>
    </div>
    {/* Selfie with Document */}
    <div className="file-upload">
      <label className="input-label">
        Selfie with Document <span className="required">*</span>
      </label>
      <div className="upload-area">
        <div className="upload-icon">
          <i className="fas fa-camera" />
        </div>
        <div className="upload-text">Upload a selfie holding your document</div>
        <div className="upload-subtext">
          JPG or PNG, max 5MB. Make sure your face and document are visible
        </div>
        <input type="file" style={{ display: "none" }} accept="image/*" />
      </div>
      <div className="upload-preview">
        <div className="preview-item">
          <div className="preview-placeholder">
            <i className="fas fa-user" />
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Security Note */}
  <div className="security-note">
    <div className="security-title">
      <i className="fas fa-shield-alt" />
      Security Notice
    </div>
    <div className="security-text">
      Your information is encrypted and secure. We use bank-level security
      measures to protect your data. All documents are verified manually by our
      security team to ensure your account's safety.
    </div>
  </div>
  {/* Submit Button */}
  <button className="submit-button">VALIDATE DOCUMENTS</button>
  {/* Footer */}
  <div className="footer">
    © 2024 CryptoWallet. All rights reserved. | <a href="#">Privacy Policy</a>
  </div>
</div>

  )
}

export default proof