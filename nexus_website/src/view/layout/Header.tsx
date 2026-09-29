import { Link } from 'react-router-dom';
import { useState } from 'react';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const router = [
    {
      text: "Home",
      path: "/"
    },
    {
      text: "About Us",
      path: "/services"
    }, 
    {
      text: "Market",
      path: "/market"
    }, 
    {
      text: "FAQs",
      path: "/faqs"
    }, 
    {
      text: "Term of Use",
      path: "/terms-of-use"
    },
    {
      text: "Privacy Policy",
      path: "/privacy"
    }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="MEV-header">
      <div className="MEV-container">
        <div className="MEV-header-content">
          {/* Left side - Logo and Navigation */}
          <div className="MEV-header-left">
            <div className="MEV-logo">
              <img src="./logo.png" alt="Mev Exchange" width={140} />
            </div>
            <ul className={`MEV-nav-menu ${isMobileMenuOpen ? 'MEV-active' : ''}`}>
              {router.map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.path} 
                    className="MEV-nav-link"
                    onClick={closeMobileMenu}
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right side - Auth Buttons */}
          <div className="MEV-header-right">
            <div className="MEV-auth-buttons">
              <a href="https://mevexchange.com/auth/signin" target='_blank' className="MEV-btn MEV-btn-login">
                <i className="fas fa-sign-in-alt"></i>
                Login
              </a>
              <a href="https://mevexchange.com/auth/signup" target='_blank' className="MEV-btn MEV-btn-register">
                <i className="fas fa-user-plus"></i>
                Register
              </a>
            </div>
          </div>

          <div className="MEV-mobile-toggle" onClick={toggleMobileMenu}>
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`} />
          </div>
        </div>
      </div>

      <style>{`
        .MEV-header {
          background-color: rgba(0, 0, 0, 0.9);
          padding: 20px 0;
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 1000;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .MEV-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .MEV-header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .MEV-header-left {
          display: flex;
          align-items: center;
          gap: 40px;
        }

        .MEV-header-right {
          display: flex;
          align-items: center;
        }

        .MEV-auth-buttons {
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .MEV-btn {
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 2px solid transparent;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .MEV-btn-login {
          background-color: transparent;
          color: #FFFFFF;
          border-color: #F3BA2F;
        }

        .MEV-btn-login:hover {
          background-color: rgba(243, 186, 47, 0.1);
          transform: translateY(-2px);
        }

        .MEV-btn-register {
          background-color: #F3BA2F;
          color: #000000;
        }

        .MEV-btn-register:hover {
          background-color: #e0a91a;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(243, 186, 47, 0.3);
        }

        .MEV-nav-menu {
          display: flex;
          list-style: none;
          gap: 30px;
          margin: 0;
          padding: 0;
        }

        .MEV-nav-link {
          color: #FFFFFF;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s;
          position: relative;
        }

        .MEV-nav-link:hover {
          color: #F3BA2F;
        }

        .MEV-nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -5px;
          left: 0;
          background-color: #F3BA2F;
          transition: width 0.3s;
        }

        .MEV-nav-link:hover::after {
          width: 100%;
        }

        .MEV-mobile-toggle {
          display: none;
          font-size: 24px;
          cursor: pointer;
          color: #FFFFFF;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .MEV-header-left {
            gap: 20px;
          }

          .MEV-auth-buttons {
            gap: 10px;
          }

          .MEV-btn {
            padding: 8px 16px;
            font-size: 13px;
          }

          .MEV-btn i {
            display: none;
          }

          .MEV-nav-menu {
            display: none;
          }

          .MEV-nav-menu.MEV-active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background-color: rgba(0, 0, 0, 0.95);
            padding: 20px;
            gap: 15px;
            z-index: 1001;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
          }

          .MEV-nav-menu.MEV-active li {
            padding: 10px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }

          .MEV-nav-menu.MEV-active li:last-child {
            border-bottom: none;
          }

          .MEV-mobile-toggle {
            display: block;
            z-index: 1002;
          }

          .MEV-header-right {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .MEV-header-content {
            flex-wrap: wrap;
          }

          .MEV-auth-buttons {
            order: 3;
            width: 100%;
            justify-content: center;
            margin-top: 15px;
          }

          .MEV-btn {
            flex: 1;
            max-width: 120px;
            text-align: center;
          }
        }
      `}</style>
    </header>
  );
}

export default Header;