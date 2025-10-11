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
import FieldFormItem from "src/shared/form/FieldFormItem";
import actions from "src/modules/user/form/userFormActions";
const currencyType = [
  { icon: "fab fa-bitcoin", label: "BTC (Bitcoin)", id: "BTC", symbol: "BTC" },
  {
    icon: "fab fa-ethereum",
    label: "ETH (Ethereum)",
    id: "ETH",
    symbol: "ETH",
  },
  {
    icon: "fas fa-chevron-right",
    label: "USDT (Tether)",
    id: "USDT",
    symbol: "USDT",
  },
  {
    label: "Solana",
    symbol: "SOL",
    id: "SOL",
  },
  {
    label: "Solana",
    symbol: "XRP",
    id: "XRP",
  },
];

const schema = yup.object().shape({
  address: yupFormSchemas.string(i18n("user.fields.address"), {
    required: true,
  }),
  password: yupFormSchemas.string(i18n("user.fields.password"), {
    required: true,
  }),
});

function formWithdrawAdress() {
  const { id } = useParams<{ id: string }>();
  const selected = currencyType.filter((item) => item.id === id);
  const dispatch = useDispatch();
  const currentUser = useSelector(authSelectors.selectCurrentUser);

  const [initialValues] = useState(() => {
    return {
      currency: id,
      address:
        (currentUser &&
          currentUser.wallet &&
          currentUser?.wallet[id]?.address) ||
        "",
      password: "",
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: initialValues,
  });

  const onSubmit = (values) => {
    values.currency = id;
    dispatch(actions.UpdateWalletAdress(values));
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
            <img
              src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${item.symbol}.png`}
              style={{ width: 26, height: 26 }}
              alt={item.symbol}
            />
            <div className="currency-name">{item.label}</div>
          </div>
        ))}
      </div>
      {/* Withdrawal Form */}

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="card">
            <div className="card-title small-margin">WITHDRAWAL ADDRESS</div>

            <FieldFormItem
              name="address"
              type="text"
              label="Address"
              className="form-input"
              className1="form-group"
              className2="form-label"
              className3="password-input-container"
              placeholder="Enter your wallet address"
            />
            {/* <button className="paste-button">PASTE</button> */}

            <FieldFormItem
              name="password"
              type="password"
              label="Crypto Withdrawal Password"
              className="form-input"
              className1="form-group"
              className2="form-label"
              className3="password-input-container"
              placeholder="Ener your current password"
            />
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
