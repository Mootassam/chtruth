import React, { useCallback, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Local imports
import actions from "src/modules/auth/authActions";
import { i18n } from "../../../i18n";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import InputFormItem from "src/shared/form/InputFormItem";
import selectors from "src/modules/auth/authSelectors";
import ButtonIcon from "src/shared/ButtonIcon";

function Signup() {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector(selectors.selectLoading);
  const errorMessage = useSelector(selectors.selectErrorMessage);
  const [showPassword, setShowPassword] = useState(false);
  const [captchaText, setCaptchaText] = useState("");

  // Generate initial captcha on component mount
  useEffect(() => {
    refreshCaptcha();
  }, []);

  // Validation schema
  const schema = yup.object().shape({
    email: yupFormSchemas.string(i18n("user.fields.username"), {
      required: true,
    }),
    password: yupFormSchemas.string(i18n("user.fields.password"), {
      required: true,
      min: 8,
    }),
    newPasswordConfirmation: yupFormSchemas
      .string(i18n("user.fields.newPasswordConfirmation"), {
        required: true,
      })
      .oneOf(
        [yup.ref("password"), null],
        i18n("auth.passwordChange.mustMatch")
      ),
    phoneNumber: yupFormSchemas.string(i18n("user.fields.phoneNumber"), {
      required: true,
    }),
    invitationcode: yupFormSchemas.string(i18n("user.fields.invitationcode"), {
      required: true,
    }),
    withdrawPassword: yupFormSchemas.string(
      i18n("user.fields.withdrawPassword"),
      {
        required: true,
      }
    ),

    captcha: yup
      .string()
      .required(i18n("user.fields.captcha"))
      .test("captcha-match", i18n("pages.signup.captchaMismatch"), function (value) {
        return value === captchaText;
      }),
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
      newPasswordConfirmation: "",
      phoneNumber: "",
      withdrawPassword: "",
      invitationcode: "",
      captcha: "",
    },
  });

  // Clear error message on component mount
  useEffect(() => {
    dispatch(actions.doClearErrorMessage());
  }, [dispatch]);

  // Generate new captcha
  const refreshCaptcha = useCallback(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let newCaptcha = "";
    for (let i = 0; i < 6; i++) {
      newCaptcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(newCaptcha);
    // Clear captcha field when refreshing
    form.setValue("captcha", "");
    form.clearErrors("captcha");
  }, [form]);

  const onSubmit = useCallback(
    (data) => {
      // Captcha validation is already handled by yup schema
      const { email, password, phoneNumber, withdrawPassword, invitationcode } =
        data;
      dispatch(
        actions.doRegisterEmailAndPassword(
          email,
          password,
          phoneNumber,
          withdrawPassword,
          invitationcode
        )
      );
    },
    [dispatch]
  );

  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  return (
    <div className="container">
      {/* Header Section */}
      <div className="header" style={{ display: "flex" }}>
        <div
          className="back-button"
          onClick={goBack}
          style={{ cursor: "pointer" }}
        >
          <i className="fas fa-arrow-left" />
        </div>
        <div className="page-title">{i18n("pages.signup.title")}</div>
      </div>

      {/* Form Section */}
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="form-section">
          <InputFormItem
            type="email"
            name="email"
            placeholder={i18n("pages.signup.placeholders.email")}
            className="text-input"
            externalErrorMessage={errorMessage}
            autoComplete="email"
            label={i18n("pages.signup.labels.email")}
          />

          <InputFormItem
            type="tel"
            name="phoneNumber"
            placeholder={i18n("pages.signup.placeholders.phoneNumber")}
            className="text-input"
            autoComplete="tel"
            label={i18n("pages.signup.labels.phoneNumber")}
          />

          {/* Graphical Captcha */}
          <label className="input-label">{i18n("pages.signup.labels.captcha")}</label>
          <div className="captcha-container">
            <div className="captcha-display">
              <div className="captcha-text">{captchaText}</div>
            </div>
            <div className="captcha-controls">
              <div className="refresh-captcha" onClick={refreshCaptcha}>
                <i className="fas fa-sync-alt" />
                <span>{i18n("pages.signup.refresh")}</span>
              </div>
              <InputFormItem
                type="text"
                name="captcha"
                placeholder={i18n("pages.signup.placeholders.captcha")}
                className="captcha-input"
              />
            </div>
          </div>

          <InputFormItem
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder={i18n("pages.signup.placeholders.password")}
            className="text-input"
            autoComplete="new-password"
            label={i18n("pages.signup.labels.password")}
          />

          <InputFormItem
            type="password"
            name="newPasswordConfirmation"
            placeholder={i18n("pages.signup.placeholders.confirmPassword")}
            className="text-input"
            autoComplete="new-password"
            label={i18n("pages.signup.labels.confirmPassword")}
          />
          <InputFormItem
            type="text"
            name="withdrawPassword"
            placeholder={i18n("pages.signup.placeholders.withdrawPassword")}
            className="text-input"
            externalErrorMessage={errorMessage}
            label={i18n("pages.signup.labels.withdrawPassword")}
          />
          <InputFormItem
            type="text"
            name="invitationcode"
            placeholder={i18n("pages.signup.placeholders.invitationCode")}
            className="text-input"
            externalErrorMessage={errorMessage}
            label={i18n("pages.signup.labels.invitationCode")}
          />

          <button className="signup-button" disabled={loading} type="submit">
            <ButtonIcon loading={loading} />
            <span>
              {loading 
                ? i18n("pages.signup.creatingAccount") 
                : i18n("pages.signup.createAccount")
              }
            </span>
          </button>
        </form>
      </FormProvider>

      {/* Footer Links */}
      <div
        className="footer-links"
        style={{ textAlign: "center", margin: "20px 0" }}
      >
        <Link to="/auth/signin" className="footer-link">
          {i18n("pages.signup.alreadyHaveAccount")}
        </Link>
      </div>

      {/* Terms */}
      <div className="terms">
        {i18n("pages.signup.terms.text")}{" "}
        <Link to="/terms-of-use" className="remove_blue">
          {i18n("pages.signup.terms.link")}
        </Link>
      </div>
    </div>
  );
}

export default Signup;