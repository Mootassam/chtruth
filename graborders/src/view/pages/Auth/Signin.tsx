import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actions from "src/modules/auth/authActions";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import { i18n } from "../../../i18n";
import { yupResolver } from "@hookform/resolvers/yup";
import InputFormItem from "src/shared/form/InputFormItem";
import selectors from "src/modules/auth/authSelectors";
import ButtonIcon from "src/shared/ButtonIcon";
import { useHistory } from "react-router-dom";

// Fixed schema with better validation
const schema = yup.object().shape({
  email: yupFormSchemas
    .string(i18n("user.fields.username"), {
      required: true,
    })
    .email(i18n("validation.email")), // Added email validation
  password: yupFormSchemas.string(i18n("user.fields.password"), {
    required: true,
    min: 6, // Added minimum length
  }),
  rememberMe: yupFormSchemas.boolean(i18n("user.fields.rememberMe")),
});

function Signin() {
  const dispatch = useDispatch();
  const history = useHistory();

  const loading = useSelector(selectors.selectLoading);
  const externalErrorMessage = useSelector(selectors.selectErrorMessage);

  const [initialValues] = useState({
    email: "",
    password: "",
    rememberMe: true,
  });

  useEffect(() => {
    dispatch(actions.doClearErrorMessage());
  }, [dispatch]);

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: initialValues,
  });

  const onSubmit = ({ email, password, rememberMe }) => {
    dispatch(actions.doSigninWithEmailAndPassword(email, password, rememberMe));
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="container">
      <div className="header">
        <div className="back-button" onClick={goBack}>
          <i className="fas fa-arrow-left"></i>
        </div>
        <div className="page-title">{i18n("auth.signin.title")}</div>
        <Link to="/language" className="language-icon remove_blue">
          <i className="fas fa-globe"></i>
        </Link>
      </div>

      <FormProvider {...form}>
        <div className="form-section">
          {/* Display error message if exists */}
          {externalErrorMessage && (
            <div
              className="error-message"
              style={{
                color: "red",
                textAlign: "center",
                marginBottom: "1rem",
                padding: "0.5rem",
                backgroundColor: "#ffe6e6",
                borderRadius: "4px",
              }}
            >
              {externalErrorMessage}
            </div>
          )}

          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="auth__form">
              <div className="form__authgroup">
                <InputFormItem
                  type="text"
                  name="email"
                  label={i18n("auth.fields.emailOrPhone")}
                  placeholder={i18n("user.fields.username")}
                  className="text-input"
                />
              </div>

              <div className="form__authgroup">
                <InputFormItem
                  type="password"
                  name="password"
                  placeholder={i18n("user.fields.password")}
                  className="text-input"
                  label={i18n("auth.fields.password")}
                  autoComplete="current-password"
                />
              </div>
            </div>

            {/* Remember Me checkbox */}
            <div className="remember-me" style={{ marginBottom: "1rem" }}>
              <input
                type="checkbox"
                {...form.register("rememberMe")}
                id="rememberMe"
              />
              <label htmlFor="rememberMe" style={{ marginLeft: "0.5rem" }}>
                {i18n("user.fields.rememberMe")}
              </label>
            </div>

            <div className="auth__bottom">
              <button
                className="login-button"
                disabled={loading}
                type="submit"
                style={{ opacity: loading ? 0.6 : 1 }}
              >
                <ButtonIcon loading={loading} iconClass="fas fa-sign-in-alt" />
                <span>
                  {loading 
                    ? i18n("auth.signin.signingIn") 
                    : i18n("auth.signin.button")
                  }
                </span>
              </button>
            </div>
          </form>
        </div>
      </FormProvider>

      <div className="footer-links">
        <Link to="/forgot-password" className="footer-link">
          {i18n("auth.signin.forgotPassword")}
        </Link>
        <Link to="/auth/signup" className="footer-link">
          {i18n("auth.signin.signUp")}
        </Link>
      </div>

      <div className="divider">
        <div className="divider-line"></div>
        <div className="divider-text">{i18n("auth.signin.orContinueWith")}</div>
        <div className="divider-line"></div>
      </div>

      {/* App Download Section */}
      <div className="app-promotion">
        <div className="promo-title">{i18n("auth.signin.downloadApp")}</div>
        <div className="promo-text">
          {i18n("auth.signin.appDescription")}
        </div>
        <div className="app-badges">
          <Link
            className="app-badge remove_blue"
            to="/playstore"
            style={{ cursor: 'pointer' }}
          >
            <i className="fab fa-google-play" style={{ color: '#F3BA2F' }}></i>
            <span>{i18n("auth.signin.googlePlay")}</span>
          </Link>
        </div>
      </div>

      <style>{`
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
      `}</style>
    </div>
  );
}

export default Signin;