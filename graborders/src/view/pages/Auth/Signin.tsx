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

const schema = yup.object().shape({
  email: yupFormSchemas.string(i18n("user.fields.username"), {
    required: true,
  }),
  password: yupFormSchemas.string(i18n("user.fields.password"), {
    required: true,
  }),
  rememberMe: yupFormSchemas.boolean(i18n("user.fields.rememberMe")),
});
function Signin() {
  const dispatch = useDispatch();

  const loading = useSelector(selectors.selectLoading);

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

  const externalErrorMessage = useSelector(selectors.selectErrorMessage);

  const onSubmit = ({ email, password, rememberMe }) => {
    dispatch(actions.doSigninWithEmailAndPassword(email, password, rememberMe));
  };
  return (
    <div className="container">
      {/* Header Section */}
      <div className="header">
        <div className="page-title">LOGIN</div>
      </div>
      <FormProvider {...form}>
        <div className="form-section">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="auth__form">
              <div className="form__authgroup">
                <InputFormItem
                  type="text"
                  name="email"
                  placeholder={i18n("user.fields.username")}
                  className="text-input "
                  externalErrorMessage={externalErrorMessage}
                />
              </div>
              <div className="form__authgroup">
                <InputFormItem
                  type="text"
                  name="password"
                  placeholder={i18n("user.fields.password")}
                  className="text-input "
                />
              </div>
            </div>

            <div className="auth__bottom">
              <button className="login-button" disabled={loading} type="submit">
                <ButtonIcon loading={loading} />
                <span>Login</span>
              </button>
            </div>
          </form>
        </div>
      </FormProvider>
      <div className="footer-links">
        <a href="#" className="footer-link">
          FORGOT PASSWORD?
        </a>
        <a href="#" className="footer-link">
          SIGN UP
        </a>
      </div>
      {/* Divider */}
      <div className="divider">
        <div className="divider-line" />
        <div className="divider-text">or continue with</div>
        <div className="divider-line" />
      </div>
      {/* Social Login */}
      {/* App Promotion */}
      <div className="app-promotion">
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
      </div>
    </div>
  );
}

export default Signin;
