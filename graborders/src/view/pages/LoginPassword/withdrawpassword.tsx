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

const schema = yup.object().shape({
  user: yupFormSchemas.relationToOne(i18n("entities.vip.fields.title"), {}),
  Documenttype: yupFormSchemas.string(i18n("Document Type"), {}),
  realname: yupFormSchemas.string(i18n("Full Name"), {}),
  idnumer: yupFormSchemas.string(i18n("Id Numer"), {}),
});
function LoginPassword() {
  const dispatch = useDispatch();
  const currentUser = useSelector(authSelectors.selectCurrentUser);

  const [initialValues] = useState(() => {
    return {
      user: currentUser || [],
      Documenttype: document,
      realname: "",
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: initialValues,
  });

  const onSubmit = (values) => {
    const data = {
      user: currentUser,
      Documenttype: document,
      ...values,
    };
    alert("values");
    // dispatch(actions.doCreate(data));
  };

  return (
    <div className="container">
      {/* Header */}

      <SubHeader title="Withdraw Password" />
      {/* Password Form */}
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="card">
            <h2 className="card-title">CHANGE WITHDRAW PASSWORD</h2>
            <div className="form-group">
              <label className="form-label">Password</label>
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
