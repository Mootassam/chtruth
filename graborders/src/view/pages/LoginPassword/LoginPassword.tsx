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
import FieldFormItem from "src/shared/form/fieldFormItem";

const schema = yup.object().shape({
  oldPassword: yupFormSchemas.string(i18n("pages.loginPassword.fields.oldPassword"), {
    required: true,
  }),
  newPassword: yupFormSchemas.string(i18n("pages.loginPassword.fields.newPassword"), {
    required: true,
  }),
  newPasswordConfirmation: yupFormSchemas
    .string(i18n("pages.loginPassword.fields.newPasswordConfirmation"), {
      required: true,
    })
    .oneOf(
      [yup.ref("newPassword"), null],
      i18n("pages.loginPassword.validation.mustMatch")
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
      <SubHeader title={i18n("pages.loginPassword.title")} />
      
      {/* Password Form */}
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="card">
            <h2 className="card-title">
              {i18n("pages.loginPassword.cardTitle")}
            </h2>

            <FieldFormItem
              name="oldPassword"
              type="password"
              label={i18n("pages.loginPassword.fields.oldPassword")}
              className="form-input"
              className1="form-group"
              className2="form-label"
              className3="password-input-container"
              placeholder={i18n("pages.loginPassword.placeholders.oldPassword")}
            />

            <FieldFormItem
              name="newPassword"
              type="password"
              label={i18n("pages.loginPassword.fields.newPassword")}
              className="form-input"
              className1="form-group"
              className2="form-label"
              className3="password-input-container"
              placeholder={i18n("pages.loginPassword.placeholders.newPassword")}
            />

            <FieldFormItem
              name="newPasswordConfirmation"
              type="password"
              label={i18n("pages.loginPassword.fields.newPasswordConfirmation")}
              className="form-input"
              className1="form-group"
              className2="form-label"
              className3="password-input-container"
              placeholder={i18n("pages.loginPassword.placeholders.confirmPassword")}
            />

            <button
              className="save-button"
              onClick={form.handleSubmit(onSubmit)}
            >
              {i18n("pages.loginPassword.buttons.saveChanges")}
            </button>
            
            <p className="warning-message">
              {i18n("pages.loginPassword.warningMessage")}
            </p>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default LoginPassword;