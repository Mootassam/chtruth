import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { i18n } from "../../../i18n";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import InputFormItem from "src/shared/form/InputFormItem";
import ImagesUploader from "src/view/shared/uploaders/ImagesUploader";
import * as yup from "yup";
import selectors from "src/modules/kyc/kycSelectors";
import actions from "src/modules/kyc/form/kycFormActions";
import { yupResolver } from "@hookform/resolvers/yup";
import authSelectors from "src/modules/auth/authSelectors";
import transactionEnumerators from "src/modules/transaction/transactionEnumerators";
import ImagesFormItem from "src/shared/form/ImagesFormItems";
import Storage from "src/security/storage";

const schema = yup.object().shape({
  user: yupFormSchemas.relationToOne(i18n("entities.vip.fields.title"), {
    
  }),
  Documenttype: yupFormSchemas.string(i18n("Document Type")),
  realname: yupFormSchemas.string(i18n("Full Name"), {    required: true,}),
  idnumer: yupFormSchemas.string(i18n("Document Number"), {    required: true,}),
  front: yupFormSchemas.images(i18n("Front Side"), { required: true}),
  back: yupFormSchemas.images(i18n("Back Side"), { required: true}),

  selfie: yupFormSchemas.images(i18n("Selfie"), {required: true}),
status: yupFormSchemas.enumerator(
    i18n('entities.transaction.fields.status'),
    {
      options: transactionEnumerators.status,
    },
  ),
});

function proof() {


  const history = useHistory();
  const [document, setdocument] = useState("passport");
  const currentUser = useSelector(authSelectors.selectCurrentUser);

  const dispatch = useDispatch();

  // const loading = useSelector(selectors.selectLoading);

  const [initialValues] = useState(() => {
    return {
      user: currentUser || [],
      Documenttype: document,
      realname: "",
      idnumer: "",
      front: [],
      back: [],
      selfie: [],
      status: "pending",
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: initialValues,
  });

  const onSubmit = (values) => {

     const data = {
      user :currentUser,
      Documenttype: document,
      ...values
    };

    dispatch(actions.doCreate(data));
  };

  const goBack = () => {
    history.goBack(); // This will take you back to the previous page
  };

  const documentTypeOptions = [
    {
      value: "passport",
      label: "Passport",
      icon: "fas fa-passport",
    },
    {
      value: "idCard",
      label: "ID Card",
      icon: "fas fa-id-card",
    },
    {
      value: "driversLicense",
      label: "Driver's License",
      icon: "fas fa-id-card-alt",
    },
  ];
  return (
    <div className="container">
      {/* Header Section */}
      <div className="header">
        <div className="header-content">
          <div className="back-button" onClick={() => goBack()}>
            <i className="fas fa-arrow-left" />
          </div>

          <div className="page-title">Identity Verification</div>
          <div className="placeholder" />
        </div>
      </div>
      {/* Instructions */}
      <div className="instructions">
        Verify your identity to access all features of your crypto wallet
      </div>
      {/* Form Section */}
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="form-section">
            <div className="proof-section-title">Document Information</div>
            {/* Document Type */}
            <div className="input-group">
              <label className="input-label">
                Document Type <span className="required">*</span>
              </label>
              <div className="radio-group">
                {documentTypeOptions.map((item) => (
                  <div
                    key={item.icon}
                    className={`radio-option ${
                      item.value == document ? "selected" : ""
                    }`}
                    onClick={() => setdocument(item.value)}
                  >
                    <i className={`${item.icon} radio-icon`} />
                    <span className="radio-text">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Personal Information */}

            <InputFormItem
              type="text"
              name="realname"
              className="text-input"
              placeholder="Enter your first name"
              label="Full Name"
            />

            <InputFormItem
              type="text"
              name="idnumer"
              className="text-input"
              placeholder="Enter your document number"
              label="Document Number"
            />
          </div>
          {/* Document Upload Section */}
          <div className="form-section">
            <div className="proof-section-title">Document Upload</div>


            {/* Front of ID */}
            <ImagesFormItem
                name="front"
                label={i18n('Front of Document')}
                storage={Storage.values.categoryPhoto}
                text="Upload front side of your document"
              />

            {/* Back of ID */}
             <ImagesFormItem
                name="back"
                label={i18n(' Back of Document')}
                storage={Storage.values.categoryPhoto}
                text="Upload back side of your document"
              />

            {/* Selfie with Document */}
               <ImagesFormItem
                name="selfie"
                label={i18n('Selfie with Document')}
                storage={Storage.values.categoryPhoto}
                text="Upload a selfie holding your document"
              />
          </div>

          {/* Security Note */}
          <div className="security-note">
            <div className="security-title">
              <i className="fas fa-shield-alt" />
              Security Notice
            </div>
            <div className="security-text">
              Your information is encrypted and secure. We use bank-level
              security measures to protect your data. All documents are verified
              manually by our security team to ensure your account's safety.
            </div>
          </div>
          {/* Submit Button */}
          <button
            className="submit-button"
            onClick={form.handleSubmit(onSubmit)}
          >
            VALIDATE DOCUMENTS
          </button>
        </form>
      </FormProvider>
      {/* Footer */}
      <div className="footer">
        © 2025 CryptoWallet. All rights reserved. |
        <a href="#">Privacy Policy</a>
      </div>
    </div>
  );
}

export default proof;
