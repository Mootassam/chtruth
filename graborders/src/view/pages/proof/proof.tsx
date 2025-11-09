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
    Documenttype: yupFormSchemas.string(i18n("pages.proof.fields.documentType")),
    realname: yupFormSchemas.string(i18n("pages.proof.fields.fullName"), { required: true }),
    idnumer: yupFormSchemas.string(i18n("pages.proof.fields.documentNumber"), { required: true }),
    address: yupFormSchemas.string(i18n("pages.proof.fields.address"), { required: true }),
    front: yupFormSchemas.images(i18n("pages.proof.fields.frontSide"), { required: true }),
    back:
      documentType === "passport"
        ? yupFormSchemas.images(i18n("pages.proof.fields.backSide"))
        : yupFormSchemas.images(i18n("pages.proof.fields.backSide"), { required: true }),
    selfie: yupFormSchemas.images(i18n("pages.proof.fields.selfie"), { required: true }),
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
    { value: "passport", label: i18n("pages.proof.documentTypes.passport"), icon: "fas fa-passport" },
    { value: "idCard", label: i18n("pages.proof.documentTypes.idCard"), icon: "fas fa-id-card" },
    { value: "driversLicense", label: i18n("pages.proof.documentTypes.driversLicense"), icon: "fas fa-id-card-alt" },
  ];

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <div className="header-content">
          <div className="back-button" onClick={goBack}>
            <i className="fas fa-arrow-left" />
          </div>
          <div className="page-title">{i18n("pages.proof.title")}</div>
          <div className="placeholder" />
        </div>
      </div>

      <div className="instructions">
        {i18n("pages.proof.instructions")}
      </div>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Document Info */}
          <div className="form-section">
            <div className="proof-section-title">
              {i18n("pages.proof.sections.documentInfo")}
            </div>

            <div className="input-group">
              <label className="input-label">
                {i18n("pages.proof.fields.documentType")} <span className="required">*</span>
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

            <InputFormItem 
              className="text-input" 
              name="realname" 
              label={i18n("pages.proof.fields.fullName")} 
              placeholder={i18n("pages.proof.placeholders.fullName")} 
            />
            <InputFormItem 
              className="text-input" 
              name="idnumer" 
              label={i18n("pages.proof.fields.documentNumber")} 
              placeholder={i18n("pages.proof.placeholders.documentNumber")} 
            />
            <InputFormItem 
              className="text-input"
              name="address" 
              label={i18n("pages.proof.fields.address")} 
              placeholder={i18n("pages.proof.placeholders.address")} 
            />
          </div>

          {/* Upload Section */}
          <div className="form-section">
            <div className="proof-section-title">
              {i18n("pages.proof.sections.documentUpload")}
            </div>

            <ImagesFormItem
              name="front"
              label={i18n("pages.proof.fields.frontSide")}
              storage={Storage.values.categoryPhoto}
              text={i18n("pages.proof.uploadTexts.frontSide")}
              max={2}
            />

            {document !== "passport" && (
              <ImagesFormItem
                name="back"
                label={i18n("pages.proof.fields.backSide")}
                storage={Storage.values.categoryPhoto}
                text={i18n("pages.proof.uploadTexts.backSide")}
                max={2}
              />
            )}

            <ImagesFormItem
              name="selfie"
              label={i18n("pages.proof.fields.selfie")}
              storage={Storage.values.categoryPhoto}
              text={i18n("pages.proof.uploadTexts.selfie")}
              max={2}
            />
          </div>

          {/* Security Note */}
          <div className="security-note">
            <div className="security-title">
              <i className="fas fa-shield-alt" /> {i18n("pages.proof.security.title")}
            </div>
            <div className="security-text">
              {i18n("pages.proof.security.text")}
            </div>
          </div>

          <button type="submit" className="submit-button">
            {i18n("pages.proof.buttons.validateDocuments")}
          </button>
        </form>
      </FormProvider>

      <div className="footer">
        {i18n("pages.proof.footer.copyright")} | <a href="#">{i18n("pages.proof.footer.privacyPolicy")}</a>
      </div>
    </div>
  );
}

export default Proof;