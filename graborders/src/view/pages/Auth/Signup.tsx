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
      .test("captcha-match", "Captcha does not match", function (value) {
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
        <div className="page-title">SIGN UP</div>
      </div>

      {/* Form Section */}
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="form-section">
          <InputFormItem
            type="email"
            name="email"
            placeholder="Enter your email"
            className="text-input"
            externalErrorMessage={errorMessage}
            autoComplete="email"
            label="Email"
          />

          <InputFormItem
            type="tel"
            name="phoneNumber"
            placeholder="Enter your phone number"
            className="text-input"
            autoComplete="tel"
            label="Phone Number"
          />

          {/* Graphical Captcha */}
          <label className="input-label">Graphical Captcha</label>
          <div className="captcha-container">
            <div className="captcha-display">
              <div className="captcha-text">{captchaText}</div>
            </div>
            <div className="captcha-controls">
              <div className="refresh-captcha" onClick={refreshCaptcha}>
                <i className="fas fa-sync-alt" />
                <span>Refresh</span>
              </div>
              <InputFormItem
                type="text"
                name="captcha"
                placeholder="Enter code"
                className="captcha-input"
              />
            </div>
          </div>

          <InputFormItem
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Create a password"
            className="text-input"
            autoComplete="new-password"
            label="Password"
          />

          <InputFormItem
            type="password"
            name="newPasswordConfirmation"
            placeholder="Confirm your password"
            className="text-input"
            autoComplete="new-password"
            label="Confirm Password"
          />
          <InputFormItem
            type="text"
            name="withdrawPassword"
            placeholder="Enter the withdraw Password"
            className="text-input"
            externalErrorMessage={errorMessage}
            label="withdraw Password"
          />
          <InputFormItem
            type="text"
            name="invitationcode"
            placeholder="Enter invitation code"
            className="text-input"
            externalErrorMessage={errorMessage}
            label="Invitation Code"
          />

          <button className="signup-button" disabled={loading} type="submit">
            <ButtonIcon loading={loading} />
            <span>{loading ? "CREATING..." : "CREATE ACCOUNT"}</span>
          </button>
        </form>
      </FormProvider>

      {/* Footer Links */}
      <div
        className="footer-links"
        style={{ textAlign: "center", margin: "20px 0" }}
      >
        <Link to="/auth/signin" className="footer-link">
          Already have an account? Log in
        </Link>
      </div>

      {/* Terms */}
      <div className="terms">
        By creating an account, you agree to our{" "}
        <Link to="/terms-of-use"  className="remove_blue">Terms of Service</Link>
      </div>
    </div>
  );
}

export default Signup;
