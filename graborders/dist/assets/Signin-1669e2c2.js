import{J as j,K as o,N as y,u as l,f as d,h as c,V as p,j as e,L as t}from"./index-c8bac528.js";import{a as i,u as v,y as N,F as k}from"./FormErrors-ee84fd17.js";import{I as m}from"./InputFormItem-44bcea11.js";import{B as F}from"./ButtonIcon-f66c477c.js";import{u as w}from"./useDispatch-675fadf1.js";const S=j().shape({email:i.string(o("user.fields.username"),{required:!0}).email(o("validation.email")),password:i.string(o("user.fields.password"),{required:!0,min:6}),rememberMe:i.boolean(o("user.fields.rememberMe"))});function z(){const s=w(),x=y(),r=l(d.selectLoading),n=l(d.selectErrorMessage),[u]=c.useState({email:"",password:"",rememberMe:!0});c.useEffect(()=>{s(p.doClearErrorMessage())},[s]);const a=v({resolver:N.yupResolver(S),mode:"onSubmit",defaultValues:u}),g=({email:h,password:f,rememberMe:A})=>{s(p.doSigninWithEmailAndPassword(h,f,A))},b=()=>{x.goBack()};return e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"header",children:[e.jsx("div",{className:"back-button",onClick:b,children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("div",{className:"page-title",children:"LOGIN"}),e.jsx("div",{className:"language-icon"})]}),e.jsx(k,{...a,children:e.jsxs("div",{className:"form-section",children:[n&&e.jsx("div",{className:"error-message",style:{color:"red",textAlign:"center",marginBottom:"1rem",padding:"0.5rem",backgroundColor:"#ffe6e6",borderRadius:"4px"},children:n}),e.jsxs("form",{onSubmit:a.handleSubmit(g),children:[e.jsxs("div",{className:"auth__form",children:[e.jsx("div",{className:"form__authgroup",children:e.jsx(m,{type:"text",name:"email",label:"Email/Phone Number",placeholder:o("user.fields.username"),className:"text-input"})}),e.jsx("div",{className:"form__authgroup",children:e.jsx(m,{type:"password",name:"password",placeholder:o("user.fields.password"),className:"text-input",label:"Password",autoComplete:"current-password"})})]}),e.jsxs("div",{className:"remember-me",style:{marginBottom:"1rem"},children:[e.jsx("input",{type:"checkbox",...a.register("rememberMe"),id:"rememberMe"}),e.jsx("label",{htmlFor:"rememberMe",style:{marginLeft:"0.5rem"},children:o("user.fields.rememberMe")})]}),e.jsx("div",{className:"auth__bottom",children:e.jsxs("button",{className:"login-button",disabled:r,type:"submit",style:{opacity:r?.6:1},children:[e.jsx(F,{loading:r,iconClass:"fas fa-sign-in-alt"}),e.jsx("span",{children:r?"Logging in...":"Login"})]})})]})]})}),e.jsxs("div",{className:"footer-links",children:[e.jsx(t,{to:"/LiveChat",className:"footer-link",children:"FORGOT PASSWORD?"}),e.jsx(t,{to:"/auth/signup",className:"footer-link",children:"SIGN UP"})]}),e.jsxs("div",{className:"divider",children:[e.jsx("div",{className:"divider-line"}),e.jsx("div",{className:"divider-text",children:"or continue with"}),e.jsx("div",{className:"divider-line"})]}),e.jsxs("div",{className:"app-promotion",children:[e.jsx("div",{className:"promo-title",children:"DOWNLOAD OUR APP"}),e.jsx("div",{className:"promo-text",children:"Get the best crypto experience on your mobile device"}),e.jsx("div",{className:"app-badges",children:e.jsxs(t,{className:"app-badge remove_blue",to:"/playstore",style:{cursor:"pointer"},children:[e.jsx("i",{className:"fab fa-google-play",style:{color:"#F3BA2F"}}),e.jsx("span",{children:"Google Play"})]})})]}),e.jsx("style",{children:`
        .container {
          width: 100%;
          max-width: 400px;
          padding: 20px 0px;
          margin: 0 auto;
        }
        
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 5px;
        }
        
        .back-button {
          color: #AAAAAA;
          font-size: 18px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: background-color 0.2s;
          cursor: pointer;
        }
        
        .back-button:hover {
          background-color: #1A1A1A;
        }
        
        .form-section {
          background-color: #1A1A1A;
          border-radius: 12px;
          padding: 25px 20px;
          margin-bottom: 25px;
        }
        
        .footer-links {
          display: flex;
          justify-content: space-between;
          padding: 0 10px;
          margin-bottom: 30px;
        }
        
        .footer-link {
          color: #F3BA2F;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          padding: 8px 5px;
          transition: opacity 0.2s;
        }
        
        .footer-link:hover {
          opacity: 0.8;
        }
        
        .login-button {
          width: 100%;
          background-color: #F3BA2F;
          color: #000000;
          border: none;
          border-radius: 8px;
          padding: 16px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          margin-top: 10px;
          transition: background-color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        
        .login-button:hover {
          background-color: #e0ab29;
        }
        
        .login-button:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }
        
        /* App Promotion Section */
        .app-promotion {
          text-align: center;
          margin-top: 10px;
          padding: 20px;
          background-color: #1A1A1A;
          border-radius: 12px;
        }
        
        .promo-title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 15px;
          color: #F3BA2F;
        }
        
        .promo-text {
          font-size: 14px;
          color: #AAAAAA;
          margin-bottom: 20px;
        }
        
        .app-badges {
          display: flex;
          justify-content: center;
          gap: 15px;
        }
        
        .app-badge {
          background-color: #2A2A2A;
          padding: 10px 15px;
          border-radius: 8px;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: background-color 0.2s;
          color: #FFFFFF;
        }
        
        .app-badge:hover {
          background-color: #363636;
        }
        
        /* Input styling to match the original theme */
        :global(.form__authgroup) {
          margin-bottom: 20px;
        }
        
        :global(.text-input) {
          width: 100%;
          background-color: #2A2A2A;
          border: none;
          border-radius: 8px;
          padding: 14px 16px;
          color: #FFFFFF;
          font-size: 16px;
          outline: none;
        }
        
        :global(.text-input:focus) {
          outline: 1px solid #F3BA2F;
        }
        
        :global(.text-input::placeholder) {
          color: #777777;
        }
        
        :global(label) {
          display: block;
          font-size: 14px;
          color: #AAAAAA;
          margin-bottom: 8px;
          padding-left: 5px;
        }
        
        /* Remember me checkbox styling */
        .remember-me {
          display: flex;
          align-items: center;
          color: #AAAAAA;
        }
        
        .remember-me input[type="checkbox"] {
          margin: 0;
        }
        
        .remember-me label {
          margin: 0;
          padding: 0;
        }
      `})]})}export{z as default};
