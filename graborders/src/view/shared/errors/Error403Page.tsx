import React from 'react'
import './Styles/error.css'
import { Link } from 'react-router-dom'
import { i18n } from './../../../i18n';

function Error403Page() {
  return (
    <div className="error-container-403">
      <div className="error-logo-403">
        <i className="fas fa-coins error-logo-icon-403" />
        <div className="error-logo-text-403">NUXES</div>
      </div>
      <div className="error-content-403">
        <div className="error-icon-403">
          <i className="fas fa-exclamation-triangle" />
        </div>
        <h1 className="error-title-403">ERROR 404</h1>
        <p className="error-message-403">{i18n('errors.404')}</p>

        <Link to="/" className="underline">
          <a href="#" className="error-home-button-403">
            <i className="fas fa-home" />
            {i18n('errors.backToHome')} 
          </a>
        </Link>
      </div>
      <div className="error-crypto-elements-403">
        <div className="error-crypto-element-403">
          <div className="error-crypto-icon-403">
            <i className="fab fa-bitcoin" />
          </div>
          <div className="error-crypto-name-403">Bitcoin</div>
        </div>
        <div className="error-crypto-element-403">
          <div className="error-crypto-icon-403">
            <i className="fab fa-ethereum" />
          </div>
          <div className="error-crypto-name-403">Ethereum</div>
        </div>
        <div className="error-crypto-element-403">
          <div className="error-crypto-icon-403">
            <i className="fas fa-coins" />
          </div>
          <div className="error-crypto-name-403">Altcoins</div>
        </div>
      </div>
      <div className="error-footer-403">
        <p>© 2023 NUXES. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Error403Page