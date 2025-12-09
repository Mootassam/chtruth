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
    <header className="nexus-header">
      <div className="nexus-container">
        <div className="nexus-header-content">
          {/* Left side - Logo and Navigation */}
          <div className="nexus-header-left">
            <div className="nexus-logo">
              <img src="./logo.png" alt="Nexus Exchange" width={140} />
            </div>
            <ul className={`nexus-nav-menu ${isMobileMenuOpen ? 'nexus-active' : ''}`}>
              {router.map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.path} 
                    className="nexus-nav-link"
                    onClick={closeMobileMenu}
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right side - Auth Buttons */}
          <div className="nexus-header-right">
            <div className="nexus-auth-buttons">
              <a href="https://nexus-exchange.com/auth/signin" target='_blank' className="nexus-btn nexus-btn-login">
                <i className="fas fa-sign-in-alt"></i>
                Login
              </a>
              <a href="https://nexus-exchange.com/auth/signup" target='_blank' className="nexus-btn nexus-btn-register">
                <i className="fas fa-user-plus"></i>
                Register
              </a>
            </div>
          </div>

          <div className="nexus-mobile-toggle" onClick={toggleMobileMenu}>
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`} />
          </div>
        </div>
      </div>

      <style>{`
        .nexus-header {
          background-color: rgba(0, 0, 0, 0.9);
          padding: 20px 0;
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 1000;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .nexus-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .nexus-header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .nexus-header-left {
          display: flex;
          align-items: center;
          gap: 40px;
        }

        .nexus-header-right {
          display: flex;
          align-items: center;
        }

        .nexus-auth-buttons {
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .nexus-btn {
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

        .nexus-btn-login {
          background-color: transparent;
          color: #FFFFFF;
          border-color: #F3BA2F;
        }

        .nexus-btn-login:hover {
          background-color: rgba(243, 186, 47, 0.1);
          transform: translateY(-2px);
        }

        .nexus-btn-register {
          background-color: #F3BA2F;
          color: #000000;
        }

        .nexus-btn-register:hover {
          background-color: #e0a91a;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(243, 186, 47, 0.3);
        }

        .nexus-nav-menu {
          display: flex;
          list-style: none;
          gap: 30px;
          margin: 0;
          padding: 0;
        }

        .nexus-nav-link {
          color: #FFFFFF;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s;
          position: relative;
        }

        .nexus-nav-link:hover {
          color: #F3BA2F;
        }

        .nexus-nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -5px;
          left: 0;
          background-color: #F3BA2F;
          transition: width 0.3s;
        }

        .nexus-nav-link:hover::after {
          width: 100%;
        }

        .nexus-mobile-toggle {
          display: none;
          font-size: 24px;
          cursor: pointer;
          color: #FFFFFF;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .nexus-header-left {
            gap: 20px;
          }

          .nexus-auth-buttons {
            gap: 10px;
          }

          .nexus-btn {
            padding: 8px 16px;
            font-size: 13px;
          }

          .nexus-btn i {
            display: none;
          }

          .nexus-nav-menu {
            display: none;
          }

          .nexus-nav-menu.nexus-active {
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

          .nexus-nav-menu.nexus-active li {
            padding: 10px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }

          .nexus-nav-menu.nexus-active li:last-child {
            border-bottom: none;
          }

          .nexus-mobile-toggle {
            display: block;
            z-index: 1002;
          }

          .nexus-header-right {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .nexus-header-content {
            flex-wrap: wrap;
          }

          .nexus-auth-buttons {
            order: 3;
            width: 100%;
            justify-content: center;
            margin-top: 15px;
          }

          .nexus-btn {
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