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
import FieldFormItem from "src/shared/form/fieldFormItem";

const schema = yup.object().shape({
  password: yupFormSchemas.string(i18n("user.fields.oldPassword"), {
    required: true,
  }),
  newPassword: yupFormSchemas.string(i18n("user.fields.newPassword"), {
    required: true,
  }),
});
function LoginPassword() {
  const dispatch = useDispatch();
  const currentUser = useSelector(authSelectors.selectCurrentUser);

  const [initialValues] = useState(() => {
    return {
     password: "",
    newPassword: "",
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

            <FieldFormItem
              name="password"
              type="password"
              label="Current Password"
              className="form-input"
              className1="form-group"
              className2="form-label"
              className3="password-input-container"
              placeholder="Enter your Old password"
            />

            <FieldFormItem
              name="newPassword"
              type="password"
              label="New Password"
              className="form-input"
              className1="form-group"
              className2="form-label"
              className3="password-input-container"
              placeholder="Confirm your new password"
            />
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
