import{j as e}from"./index-aeb5d9a2.js";import{S as s}from"./SubHeader-48504516.js";import"./useNotifications-1a8c0a15.js";import"./useDispatch-bcf5a85f.js";function d(){return e.jsxs("div",{className:"container",children:[e.jsx(s,{title:"Members"}),e.jsxs("div",{className:"approved-members-container",children:[e.jsx("div",{className:"section-title",children:"Member Directory"}),e.jsxs("div",{className:"members-list",children:[e.jsxs("div",{className:"member-item",children:[e.jsxs("div",{className:"member-info",children:[e.jsx("div",{className:"member-email",children:"johndoe@example.com"}),e.jsx("div",{className:"member-date",children:"Approved: 2023-10-15"})]}),e.jsx("span",{className:"member-status status-approved",children:"Approved"})]}),e.jsxs("div",{className:"member-item",children:[e.jsxs("div",{className:"member-info",children:[e.jsx("div",{className:"member-email",children:"sarah.smith@mail.com"}),e.jsx("div",{className:"member-date",children:"Approved: 2023-10-12"})]}),e.jsx("span",{className:"member-status status-approved",children:"Approved"})]}),e.jsxs("div",{className:"member-item",children:[e.jsxs("div",{className:"member-info",children:[e.jsx("div",{className:"member-email",children:"mike.wilson@proton.me"}),e.jsx("div",{className:"member-date",children:"Approved: 2023-10-10"})]}),e.jsx("span",{className:"member-status status-approved",children:"Approved"})]}),e.jsxs("div",{className:"member-item",children:[e.jsxs("div",{className:"member-info",children:[e.jsx("div",{className:"member-email",children:"emily.johnson@domain.com"}),e.jsx("div",{className:"member-date",children:"Pending approval"})]}),e.jsx("span",{className:"member-status status-pending",children:"Pending"})]}),e.jsxs("div",{className:"member-item",children:[e.jsxs("div",{className:"member-info",children:[e.jsx("div",{className:"member-email",children:"robert.brown@email.net"}),e.jsx("div",{className:"member-date",children:"Approved: 2023-10-05"})]}),e.jsx("span",{className:"member-status status-approved",children:"Approved"})]}),e.jsxs("div",{className:"member-item",children:[e.jsxs("div",{className:"member-info",children:[e.jsx("div",{className:"member-email",children:"lisa.miller@fastmail.com"}),e.jsx("div",{className:"member-date",children:"Approved: 2023-10-01"})]}),e.jsx("span",{className:"member-status status-approved",children:"Approved"})]}),e.jsxs("div",{className:"member-item",children:[e.jsxs("div",{className:"member-info",children:[e.jsx("div",{className:"member-email",children:"david.wilson@company.org"}),e.jsx("div",{className:"member-date",children:"Pending approval"})]}),e.jsx("span",{className:"member-status status-pending",children:"Pending"})]}),e.jsxs("div",{className:"member-item",children:[e.jsxs("div",{className:"member-info",children:[e.jsx("div",{className:"member-email",children:"amanda.lee@webmail.com"}),e.jsx("div",{className:"member-date",children:"Approved: 2023-09-28"})]}),e.jsx("span",{className:"member-status status-approved",children:"Approved"})]}),e.jsxs("div",{className:"member-item",children:[e.jsxs("div",{className:"member-info",children:[e.jsx("div",{className:"member-email",children:"kevin.martin@service.com"}),e.jsx("div",{className:"member-date",children:"Approved: 2023-09-25"})]}),e.jsx("span",{className:"member-status status-approved",children:"Approved"})]}),e.jsxs("div",{className:"member-item",children:[e.jsxs("div",{className:"member-info",children:[e.jsx("div",{className:"member-email",children:"sophia.garcia@mailservice.com"}),e.jsx("div",{className:"member-date",children:"Pending approval"})]}),e.jsx("span",{className:"member-status status-pending",children:"Pending"})]})]})]}),e.jsx("div",{className:"toast-notification",id:"toastNotification",children:"Welcome to Approved Members"}),e.jsx("style",{children:`.members-container {
            max-width: 400px;
            margin: 0 auto;
            padding: 20px;
            padding-bottom: 40px;
        }
        
        /* Header Section */
        .members-header {
            background-color: #000000;
            padding: 15px 0;
            position: sticky;
            top: 0;
            z-index: 100;
            margin-bottom: 20px;
            border-bottom: 1px solid #2A2A2A;
        }
        
        .members-header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .members-back-btn {
            color: #FFFFFF;
            font-size: 20px;
            cursor: pointer;
            padding: 5px 10px;
            border-radius: 5px;
            transition: background-color 0.2s;
        }
        
        .members-back-btn:hover {
            background-color: #1A1A1A;
        }
        
        .members-title {
            font-size: 20px;
            font-weight: bold;
            background: linear-gradient(90deg, #F3BA2F, #ffd700);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .members-placeholder {
            width: 20px;
        }
        
        /* Approved Members Section */
        .approved-members-container {
            background: linear-gradient(145deg, #1A1A1A, #2A2A2A);
            border-radius: 16px;
            padding: 25px;
            margin-bottom: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            border: 1px solid #2A2A2A;
        }
        
        .section-title {
            font-size: 18px;
            font-weight: bold;
            color: #F3BA2F;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .members-list {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        .member-item {
            background: linear-gradient(145deg, #2A2A2A, #1A1A1A);
            border-radius: 12px;
            padding: 15px;
            border: 1px solid #3A3A3A;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all 0.3s;
        }
        
        .member-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        
        .member-info {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        
        .member-email {
            color: #FFFFFF;
            font-weight: 500;
            font-size: 15px;
        }
        
        .member-date {
            color: #AAAAAA;
            font-size: 13px;
        }
        
        .member-status {
            display: inline-block;
            padding: 5px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: bold;
        }
        
        .status-approved {
            background-color: rgba(0, 192, 118, 0.2);
            color: #00C076;
            border: 1px solid rgba(0, 192, 118, 0.5);
        }
        
        .status-pending {
            background-color: rgba(243, 186, 47, 0.2);
            color: #F3BA2F;
            border: 1px solid rgba(243, 186, 47, 0.5);
        }
        
        /* Toast Notification */
        .toast-notification {
            position: fixed;
            bottom: 80px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(90deg, #00C076, #00ff95);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 14px;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        
        .toast-notification.show {
            opacity: 1;
        }
        
        /* Responsive adjustments */
        @media (max-width: 480px) {
            .members-container {
                padding: 15px;
                padding-bottom: 60px;
            }
            
            .approved-members-container {
                padding: 20px;
            }
            
            .member-item {
                padding: 12px;
            }
            
            .member-email {
                font-size: 14px;
            }
        }`})]})}export{d as default};
