import{X as j,p as o,y,u as l,k as d,o as c,a8 as p,j as e,L as r}from"./index-4cd6ea8b.js";import{a as t,u as v,y as k,F as N}from"./FormErrors-7891a2f4.js";import{I as m}from"./InputFormItem-826cf1a5.js";import{B as F}from"./ButtonIcon-480d05cc.js";import{u as w}from"./useDispatch-1f91c277.js";const _=j().shape({email:t.string(o("user.fields.username"),{required:!0}).email(o("validation.email")),password:t.string(o("user.fields.password"),{required:!0,min:6}),rememberMe:t.boolean(o("user.fields.rememberMe"))});function C(){const a=w(),u=y(),s=l(d.selectLoading),n=l(d.selectErrorMessage),[g]=c.useState({email:"",password:"",rememberMe:!0});c.useEffect(()=>{a(p.doClearErrorMessage())},[a]);const i=v({resolver:k.yupResolver(_),mode:"onSubmit",defaultValues:g}),x=({email:h,password:f,rememberMe:A})=>{a(p.doSigninWithEmailAndPassword(h,f,A))},b=()=>{u.goBack()};return e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"header",children:[e.jsx("div",{className:"back-button",onClick:b,children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("div",{className:"page-title",children:o("auth.signin.title")}),e.jsx(r,{to:"/language",className:"language-icon remove_blue",children:e.jsx("i",{className:"fas fa-globe"})})]}),e.jsx(N,{...i,children:e.jsxs("div",{className:"form-section",children:[n&&e.jsx("div",{className:"error-message",style:{color:"red",textAlign:"center",marginBottom:"1rem",padding:"0.5rem",backgroundColor:"#ffe6e6",borderRadius:"4px"},children:n}),e.jsxs("form",{onSubmit:i.handleSubmit(x),children:[e.jsxs("div",{className:"auth__form",children:[e.jsx("div",{className:"form__authgroup",children:e.jsx(m,{type:"text",name:"email",label:o("auth.fields.emailOrPhone"),placeholder:o("user.fields.username"),className:"text-input"})}),e.jsx("div",{className:"form__authgroup",children:e.jsx(m,{type:"password",name:"password",placeholder:o("user.fields.password"),className:"text-input",label:o("auth.fields.password"),autoComplete:"current-password"})})]}),e.jsxs("div",{className:"remember-me",style:{marginBottom:"1rem"},children:[e.jsx("input",{type:"checkbox",...i.register("rememberMe"),id:"rememberMe"}),e.jsx("label",{htmlFor:"rememberMe",style:{marginLeft:"0.5rem"},children:o("user.fields.rememberMe")})]}),e.jsx("div",{className:"auth__bottom",children:e.jsxs("button",{className:"login-button",disabled:s,type:"submit",style:{opacity:s?.6:1},children:[e.jsx(F,{loading:s,iconClass:"fas fa-sign-in-alt"}),e.jsx("span",{children:s?o("auth.signin.signingIn"):o("auth.signin.button")})]})})]})]})}),e.jsxs("div",{className:"footer-links",children:[e.jsx(r,{to:"/forgot-password",className:"footer-link",children:o("auth.signin.forgotPassword")}),e.jsx(r,{to:"/auth/signup",className:"footer-link",children:o("auth.signin.signUp")})]}),e.jsxs("div",{className:"divider",children:[e.jsx("div",{className:"divider-line"}),e.jsx("div",{className:"divider-text",children:o("auth.signin.orContinueWith")}),e.jsx("div",{className:"divider-line"})]}),e.jsxs("div",{className:"app-promotion",children:[e.jsx("div",{className:"promo-title",children:o("auth.signin.downloadApp")}),e.jsx("div",{className:"promo-text",children:o("auth.signin.appDescription")}),e.jsx("div",{className:"app-badges",children:e.jsxs(r,{className:"app-badge remove_blue",to:"/playstore",style:{cursor:"pointer"},children:[e.jsx("i",{className:"fab fa-google-play",style:{color:"#F3BA2F"}}),e.jsx("span",{children:o("auth.signin.googlePlay")})]})})]}),e.jsx("style",{children:`
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
      `})]})}export{C as default};
