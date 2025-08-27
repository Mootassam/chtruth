import React from 'react'
import SubHeader from 'src/view/shared/Header/SubHeader'
import { Link } from 'react-router-dom';

function WirthdrawAddress() {
  return (
   <div className='container'>
  {/* Currency Selection Page */}
  <div id="currency-page">


    <SubHeader title="Withdrawal Address" />
    <div className="card">
      <h2 className="card-title">CURRENCY TYPE</h2>
      <div className="currency-options">
        <Link to="/formwithdrawaddress"
        
   
          className="currency-option remove_blue"

        >
          <div className="currency-icon">
            <i className="fab fa-bitcoin" />
          </div>
          <div className="currency-name">BTC (Bitcoin)</div>
          <div className="currency-arrow">
            <i className="fas fa-chevron-right" />
          </div>
        </Link>
         <Link to="/formwithdrawaddress"
        
   
          className="currency-option remove_blue"

        >
          <div className="currency-icon">
            <i className="fab fa-ethereum" />
          </div>
          <div className="currency-name">ETH (Ethereum)</div>
          <div className="currency-arrow">
            <i className="fas fa-chevron-right" />
          </div>
      </Link>
        <Link to="/formwithdrawaddress"
        
   
          className="currency-option remove_blue"

        >
          <div className="currency-icon">
            <i className="fas fa-dollar-sign" />
          </div>
          <div className="currency-name">USDT (Tether)</div>
          <div className="currency-arrow">
            <i className="fas fa-chevron-right" />
          </div>
        </Link>
      </div>
    </div>
  </div>

 
</div>

  )
}

export default WirthdrawAddress