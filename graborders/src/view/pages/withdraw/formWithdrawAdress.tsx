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

const currencyType = [
  { icon: "fab fa-bitcoin", label: "BTC (Bitcoin)", id: "btc" },
  { icon: "fab fa-ethereum", label: "ETH (Ethereum)", id: "eth" },
  { icon: "fas fa-chevron-right", label: "USDT (Tether)", id: "usdt" },
];

const schema = yup.object().shape({
  user: yupFormSchemas.relationToOne(i18n("entities.vip.fields.title"), {}),
  Documenttype: yupFormSchemas.string(i18n("Document Type"), {}),
  realname: yupFormSchemas.string(i18n("Full Name"), {}),
  idnumer: yupFormSchemas.string(i18n("Id Numer"), {}),
});

function formWithdrawAdress() {
  const { id } = useParams<{ id: string }>();
  const selected = currencyType.filter((item) => item.id === id);
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

      <SubHeader title="Withdrawal Address" />
      {/* Selected Currency */}
      <div className="card compact-section">
        <div className="card-title">CURRENCY TYPE</div>

        {selected.map((item) => (
          <div className="selected-currency">
            <div className="currency-icon">
              <i className={item.icon} />
            </div>
            <div className="currency-name">{item.label}</div>
          </div>
        ))}
      </div>
      {/* Withdrawal Form */}

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="card">
            <div className="card-title small-margin">WITHDRAWAL ADDRESS</div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <div className="input-with-button">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter wallet address"
                  id="addressInput"
                />

                <button className="paste-button">PASTE</button>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Crypto Withdrawal Password</label>
              <input
                type="password"
                className="password-input"
                placeholder="Enter your password"
                id="passwordInput"
              />
            </div>
            <button
              className="save-button"
              onClick={form.handleSubmit(onSubmit)}
            >
              SAVE
            </button>
          </div>
        </form>
      </FormProvider>
      {/* Notification */}
      <div className="notification" id="notification">
        Address saved successfully!
      </div>
      {/* Bottom Navigation */}
    </div>
  );
}

export default formWithdrawAdress;
