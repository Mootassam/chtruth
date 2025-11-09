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
import actions from "src/modules/user/form/userFormActions";

const schema = yup.object().shape({
  password: yupFormSchemas.string(i18n("pages.withdrawPassword.fields.currentPassword"), {
    required: true,
  }),
  newPassword: yupFormSchemas.string(i18n("pages.withdrawPassword.fields.newPassword"), {
    required: true,
  }),
});

function WithdrawPassword() {
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
    dispatch(actions.UpdateWithdraw(values));
  };

  return (
    <div className="container">
      {/* Header */}
      <SubHeader title={i18n("pages.withdrawPassword.title")} />
      
      {/* Password Form */}
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="card">
            <h2 className="card-title">
              {i18n("pages.withdrawPassword.cardTitle")}
            </h2>

            <FieldFormItem
              name="password"
              type="password"
              label={i18n("pages.withdrawPassword.fields.currentPassword")}
              className="form-input"
              className1="form-group"
              className2="form-label"
              className3="password-input-container"
              placeholder={i18n("pages.withdrawPassword.placeholders.currentPassword")}
            />

            <FieldFormItem
              name="newPassword"
              type="password"
              label={i18n("pages.withdrawPassword.fields.newPassword")}
              className="form-input"
              className1="form-group"
              className2="form-label"
              className3="password-input-container"
              placeholder={i18n("pages.withdrawPassword.placeholders.newPassword")}
            />
            
            <button
              className="save-button"
              onClick={form.handleSubmit(onSubmit)}
            >
              {i18n("pages.withdrawPassword.buttons.saveChanges")}
            </button>
            
            <p className="warning-message">
              {i18n("pages.withdrawPassword.warningMessage")}
            </p>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default WithdrawPassword;