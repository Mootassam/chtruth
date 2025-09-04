import React, { useMemo, useState } from "react";
import SubHeader from "src/view/shared/Header/SubHeader";
import { useParams } from "react-router-dom";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import * as yup from "yup";
import { i18n } from "../../../i18n";
import { useDispatch, useSelector } from "react-redux";
import authSelectors from "src/modules/auth/authSelectors";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import actions from "src/modules/auth/authActions";

const schema = yup.object().shape({
  oldPassword: yupFormSchemas.string(i18n("user.fields.oldPassword"), {
    required: true,
  }),
  newPassword: yupFormSchemas.string(i18n("user.fields.newPassword"), {
    required: true,
  }),
  newPasswordConfirmation: yupFormSchemas
    .string(i18n("user.fields.newPasswordConfirmation"), {
      required: true,
    })
    .oneOf(
      [yup.ref("newPassword"), null],
      i18n("auth.passwordChange.mustMatch")
    ),
});

function LoginPassword() {
  const dispatch = useDispatch();
  const currentUser = useSelector(authSelectors.selectCurrentUser);

  const [initialValues] = useState(() => ({
    oldPassword: "",
    newPassword: "",
    newPasswordConfirmation: "",
  }));

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: initialValues,
  });
  const onSubmit = (values) => {
    dispatch(actions.doChangePassword(values.oldPassword, values.newPassword));
  };

  return (
    <div className="container">
      <SubHeader title="Login Password" />
      {/* Password Form */}

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="card">
            <h2 className="card-title">CHANGE LOGIN PASSWORD</h2>
            <div className="form-group">
              <label className="form-label">Old Password</label>
              <div className="password-input-container">
                <input
                  type="password"
                  className="form-input"
                  placeholder="Enter your current password"
                />
                <button className="toggle-password" type="button">
                  <i className="fas fa-eye" />
                </button>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">New Password</label>
              <div className="password-input-container">
                <input
                  type="password"
                  className="form-input"
                  placeholder="Create a new password"
                />
                <button className="toggle-password" type="button">
                  <i className="fas fa-eye" />
                </button>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <div className="password-input-container">
                <input
                  type="password"
                  className="form-input"
                  placeholder="Confirm your new password"
                />
                <button className="toggle-password" type="button">
                  <i className="fas fa-eye" />
                </button>
              </div>
            </div>
            <button
              className="save-button"
              onClick={form.handleSubmit(onSubmit)}
            >
              SAVE CHANGES
            </button>
            <p className="warning-message">
              For the safety of your funds, withdrawals are not allowed within
              24 hours after the login password has been changed.
            </p>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default LoginPassword;
