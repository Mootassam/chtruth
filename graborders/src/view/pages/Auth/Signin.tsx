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
      {/* Header Section */}
      <div className="header" style={{ display: "flex" }}>
        <div className="back-button" onClick={goBack}>
          <i className="fas fa-arrow-left" />
        </div>
        <div className="page-title">LOGIN</div>
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
                  type="text" // Changed to text to allow both email and phone
                  name="email"
                  label={"Email/Phone Number"}
                  placeholder={i18n("user.fields.username")}
                  className="text-input"
                  // Removed externalErrorMessage from here since we display it above
                />
              </div>

              <div className="form__authgroup">
                <InputFormItem
                  type="password" // ✅ Fixed: Changed to password type
                  name="password"
                  placeholder={i18n("user.fields.password")}
                  className="text-input"
                  label={"Password"}
                  autoComplete="current-password" // Added for better browser support
                />
              </div>
            </div>

            {/* Remember Me checkbox - if you want to use it */}
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
                style={{ opacity: loading ? 0.6 : 1 }} // Visual feedback for loading
              >
                <ButtonIcon loading={loading} iconClass="fas fa-sign-in-alt" />
                <span>{loading ? "Logging in..." : "Login"}</span>
              </button>
            </div>
          </form>
        </div>
      </FormProvider>

      <div className="footer-links">
        <Link to="/auth/forgot-password" className="footer-link">
          {" "}
          {/* Better to use Link */}
          FORGOT PASSWORD?
        </Link>
        <Link to="/auth/signup" className="footer-link">
          SIGN UP
        </Link>
      </div>

      {/* Divider */}
      {/* <div className="divider">
        <div className="divider-line" />
        <div className="divider-text">or continue with</div>
        <div className="divider-line" />
      </div> */}

      {/* Social Login - Add your social login buttons here */}
      {/* <div
        className="social-login"
        style={{ textAlign: "center", margin: "1rem 0" }}
      >
      </div> */}

      {/* App Promotion */}
      {/* <div className="app-promotion">
        console.log(`🚀 ~   <div className="app-promotion">
        <div className="promo-title">Trade Anywhere</div>
        <div className="promo-text">
          Download our app for the best mobile experience
        </div>
        <div className="app-badges">
          <div className="app-badge">
            <i className="fab fa-apple" />
            <span>App Store</span>
          </div>
          <div className="app-badge">
            <i className="fab fa-google-play" />
            <span>Play Store</span>
          </div>
        </div>
      </div>:`,   <div className="app-promotion">
        <div className="promo-title">Trade Anywhere</div>
        <div className="promo-text">
          Download our app for the best mobile experience
        </div>
        <div className="app-badges">
          <div className="app-badge">
            <i className="fab fa-apple" />
            <span>App Store</span>
          </div>
          <div className="app-badge">
            <i className="fab fa-google-play" />
            <span>Play Store</span>
          </div>
        </div>
      </div>)
        <div className="promo-title">Trade Anywhere</div>
        <div className="promo-text">
          Download our app for the best mobile experience
        </div>
        <div className="app-badges">
          <div className="app-badge">
            <i className="fab fa-apple" />
            <span>App Store</span>
          </div>
          <div className="app-badge">
            <i className="fab fa-google-play" />
            <span>Play Store</span>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Signin;
