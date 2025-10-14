import{h as t,j as e,L as o}from"./index-168cd059.js";import"./error-4ed993c7.js";class a extends t.Component{render(){return e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"crypto-animation",children:[e.jsx("div",{className:"bitcoin",children:e.jsx("i",{className:"fab fa-btc"})}),e.jsx("div",{className:"eth",children:e.jsx("i",{className:"fab fa-ethereum"})}),e.jsx("div",{className:"bnb",children:e.jsx("i",{className:"fas fa-coins"})})]}),e.jsx("div",{className:"error-code",children:"505"}),e.jsx("div",{className:"error-title",children:"Internal Server Error"}),e.jsx("div",{className:"error-message",children:"Oops! Something went wrong on our end. Our team has been notified and is working to fix the issue."}),e.jsx(o,{to:"/",children:e.jsxs("button",{className:"home-button",children:[e.jsx("i",{className:"fas fa-home home-icon"}),"Back to Home"]})}),e.jsx("style",{children:`       
        body {
            background-color: #000000;
            color: #FFFFFF;
            padding: 0;
            margin: 0;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        
        .container {
            max-width: 400px;
            width: 100%;
            padding: 20px;
            text-align: center;
        }
        
        .logo {
            font-weight: bold;
            font-size: 28px;
            color: #F3BA2F;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 30px;
        }
        
        .logo-icon {
            margin-right: 10px;
        }
        
        .error-code {
            font-size: 120px;
            font-weight: 800;
            color: #F3BA2F;
            line-height: 1;
            margin: 20px 0;
            text-shadow: 0 0 15px rgba(243, 186, 47, 0.4);
        }
        
        .error-title {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 15px;
        }
        
        .error-message {
            color: #AAAAAA;
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 30px;
            padding: 0 10px;
        }
        
        .home-button {
            background-color: #F3BA2F;
            color: #000000;
            border: none;
            padding: 16px 30px;
            border-radius: 12px;
            font-weight: bold;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-top: 20px;
            box-shadow: 0 4px 12px rgba(243, 186, 47, 0.3);
        }
        
        .home-button:hover {
            background-color: #E0A91C;
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(243, 186, 47, 0.4);
        }
        
        .home-button:active {
            transform: translateY(0);
        }
        
        .home-icon {
            margin-right: 8px;
        }
        
        .crypto-animation {
            width: 150px;
            height: 150px;
            margin: 0 auto 30px;
            position: relative;
        }
        
        .bitcoin {
            position: absolute;
            width: 60px;
            height: 60px;
            background-color: #F3BA2F;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
            color: #000;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            box-shadow: 0 0 20px rgba(243, 186, 47, 0.5);
            z-index: 3;
        }
        
        .eth, .bnb {
            position: absolute;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 18px;
            color: #fff;
        }
        
        .eth {
            background-color: #627EEA;
            top: 20px;
            left: 20px;
            animation: float 4s ease-in-out infinite;
        }
        
        .bnb {
            background-color: #F3BA2F;
            bottom: 20px;
            right: 20px;
            animation: float 4s ease-in-out infinite reverse;
        }
        
        @keyframes float {
            0% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(10deg); }
            100% { transform: translateY(0) rotate(0deg); }
        }
        
        .support-text {
            margin-top: 30px;
            color: #777;
            font-size: 14px;
        }
        
        .support-link {
            color: #F3BA2F;
            text-decoration: none;
        }
        
        .support-link:hover {
            text-decoration: underline;
        }
        
        @media (max-width: 480px) {
            .error-code {
                font-size: 100px;
            }
            
            .error-title {
                font-size: 22px;
            }
            
            .error-message {
                font-size: 15px;
            }
        }`})]})}}export{a as Error500Page,a as default};
