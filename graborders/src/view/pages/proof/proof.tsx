import React, { useState, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { i18n } from "../../../i18n";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import InputFormItem from "src/shared/form/InputFormItem";
import ImagesFormItem from "src/shared/form/ImagesFormItems";
import * as yup from "yup";
import actions from "src/modules/kyc/form/kycFormActions";
import { yupResolver } from "@hookform/resolvers/yup";
import authSelectors from "src/modules/auth/authSelectors";
import transactionEnumerators from "src/modules/transaction/transactionEnumerators";
import Storage from "src/security/storage";

// Dynamic schema function
const createSchema = (documentType) =>
  yup.object().shape({
    user: yupFormSchemas.relationToOne(i18n("entities.vip.fields.title"), {}),
    Documenttype: yupFormSchemas.string(i18n("Document Type")),
    realname: yupFormSchemas.string(i18n("Full Name"), { required: true }),
    idnumer: yupFormSchemas.string(i18n("Document Number"), { required: true }),
    address: yupFormSchemas.string(i18n("Address"), { required: true }),
    front: yupFormSchemas.images(i18n("Front Side"), { required: true }),
    back:
      documentType === "passport"
        ? yupFormSchemas.images(i18n("Back Side"))
        : yupFormSchemas.images(i18n("Back Side"), { required: true }),
    selfie: yupFormSchemas.images(i18n("Selfie"), { required: true }),
    status: yupFormSchemas.enumerator(
      i18n("entities.transaction.fields.status"),
      { options: transactionEnumerators.status }
    ),
  });

function Proof() {
  const history = useHistory();
  const [document, setDocument] = useState("passport");
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const dispatch = useDispatch();

  // Use useMemo to recompute schema only when document changes
  const schema = useMemo(() => createSchema(document), [document]);

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: {
      user: currentUser || [],
      Documenttype: document,
      realname: "",
      idnumer: "",
      address: "",
      front: [],
      back: [],
      selfie: [],
      status: "pending",
    },
  });

  const onSubmit = (values) => {
    const data = { ...values, user: currentUser, Documenttype: document };
    if (document === "passport") data.back = [];
    dispatch(actions.doCreate(data));
  };

  const handleDocumentChange = (type) => {
    setDocument(type);
    if (type === "passport") form.setValue("back", []);
  };

  const goBack = () => history.goBack();

  const documentTypeOptions = [
    { value: "passport", label: "Passport", icon: "fas fa-passport" },
    { value: "idCard", label: "ID Card", icon: "fas fa-id-card" },
    { value: "driversLicense", label: "Driver's License", icon: "fas fa-id-card-alt" },
  ];

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <div className="header-content">
          <div className="back-button" onClick={goBack}>
            <i className="fas fa-arrow-left" />
          </div>
          <div className="page-title">Identity Verification</div>
          <div className="placeholder" />
        </div>
      </div>

      <div className="instructions">
        Verify your identity to access all features of your Nexus Exchange
      </div>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Document Info */}
          <div className="form-section">
            <div className="proof-section-title">Document Information</div>

            <div className="input-group">
              <label className="input-label">
                Document Type <span className="required">*</span>
              </label>
              <div className="radio-group">
                {documentTypeOptions.map((item) => (
                  <div
                    key={item.value}
                    className={`radio-option ${item.value === document ? "selected" : ""}`}
                    onClick={() => handleDocumentChange(item.value)}
                  >
                    <i className={`${item.icon} radio-icon`} />
                    <span className="radio-text">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <InputFormItem className="text-input" name="realname" label="Full Name" placeholder="Enter your full name" />
            <InputFormItem className="text-input" name="idnumer" label="Document Number" placeholder="Enter your document number" />
            <InputFormItem className="text-input"
              name="address" label="Address" placeholder="Enter your complete address" />
          </div>

          {/* Upload Section */}
          <div className="form-section">
            <div className="proof-section-title">Document Upload</div>

            <ImagesFormItem
              name="front"
              label={i18n("Front of Document")}
              storage={Storage.values.categoryPhoto}
              text="Upload front side of your document"
              max={2}
            />

            {document !== "passport" && (
              <ImagesFormItem
                name="back"
                label={i18n("Back of Document")}
                storage={Storage.values.categoryPhoto}
                text="Upload back side of your document"
                max={2}
              />
            )}

            <ImagesFormItem
              name="selfie"
              label={i18n("Selfie with Document")}
              storage={Storage.values.categoryPhoto}
              text="Upload a selfie holding your document"
              max={2}
            />
          </div>

          {/* Security Note */}
          <div className="security-note">
            <div className="security-title">
              <i className="fas fa-shield-alt" /> Security Notice
            </div>
            <div className="security-text">
              Your information is encrypted and secure. We use bank-level
              protection and manually verify each document for your safety.
            </div>
          </div>

          <button type="submit" className="submit-button">
            VALIDATE DOCUMENTS
          </button>
        </form>
      </FormProvider>

      <div className="footer">
        © 2025 CryptoWallet. All rights reserved. | <a href="#">Privacy Policy</a>
      </div>
    </div>
  );
}

export default Proof;
