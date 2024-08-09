import React, { useState, useEffect, useCallback } from "react";
import "../styles/styles.css";
import Currency from "src/view/shared/utils/Currency";
import { useDispatch, useSelector } from "react-redux";
import productListActions from "src/modules/product/list/productListActions";
import productListSelectors from "src/modules/product/list/productListSelectors";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import { i18n } from "../../../i18n";
import recordFormActions from "src/modules/record/form/recordFormActions";
import InputFormItem from "src/shared/form/InputFormItem";
import Dates from "src/view/shared/utils/Dates";
import authSelectors from "src/modules/auth/authSelectors";
import recordFormSelectors from "src/modules/record/form/recordFormSelectors";
import ButtonIcon from "src/shared/ButtonIcon";

const schema = yup.object().shape({
  amount: yupFormSchemas.decimal(i18n("entities.product.fields.amount"), {
    required: true,
  }),
});

function Price(props) {
  const dispatch = useDispatch();
  const [close, setClose] = useState(false);
  const [profits, setProfit] = useState();
  const [time, setTime] = useState(60);
  const [link, setLinks] = useState([]);
  const record = useSelector(productListSelectors.selectRows);
  const loading = useSelector(productListSelectors.selectLoading);
  const saveLoading = useSelector(recordFormSelectors.selectSaveLoading);
  const currentUser = useSelector(authSelectors.selectCurrentUser);

  const number = Dates.Number();

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const searchAllCoins = useCallback(async () => {
    try {
      dispatch(productListActions.doFindById(props.id));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, props.id]);

  useEffect(() => {
    searchAllCoins();
  }, [searchAllCoins]);

  useEffect(() => {
    if (record) {
      setLinks(record.links || []);
    }
  }, [record]);

  useEffect(() => {
    if (
      !loading &&
      record &&
      record.symbol &&
      record.symbol !== undefined
    ) {
      const widget = new TradingView.widget({
        autosize: true,
        symbol: `BINANCE:${record.symbol}USDT`,
        timezone: "Asia/India",
        theme: "dark",
        toolbar_bg: "#f1f3f6",
        enable_publishing: false,
        hideideas: true,
        hide_top_toolbar: false,
        hide__symbol: true,
        details: false,
        studies: [],
        container_id: "tvchart",
        range: false,
        hide_legend: true,
        hide_side_toolbar: true,
        allow_symbol_change: false,
        save_image: false,
        doNotStoreSettings: false,
        backgroundColor: "",
        horztouchdrag: "",
        verttouchdrag: true,
        extended_hours: "",
        hideideasbutton: false,
        withdateranges: false,
        hide_volume: false,
        padding: "",
        show_popup_button: false,
        studies_overrides: false,
        publish_source: false,
        venue: false,
        symbology: false,
        whotrades: false,
        referral_id: false,
        no_referral_id: false,
        fundamental: false,
        percentage: false,
        utm_source: false,
        utm_medium: false,
        utm_campaign: false,
      });

      return () => {
        if (widget) {
          widget.remove();
        }
      };
    }
  }, [loading, record]);

  const handleBalanceClick = (profit, time) => {
    setProfit(profit);
    setTime(time);
  };

  const onSubmit = (values) => {
    values.number = number;
    values.user = currentUser.id;
    values.profit = profits;
    values.coin = record?.name;
    values.price = record?.price;
    values.time = time;
    dispatch(recordFormActions.doCreate(values));
    setClose(false);
  };

  return (
    <div>
      {!loading && record && (
        <div>
          <div
            className="coin-info"
          >
            <div className="coin-details">
              <img
                src={record.iconUrl}
                className="coin-icon"
                alt="coin icon"
              />
              <div>
                <p>{record.name}</p>
                <p className="coin-symbol">{record.symbol}</p>
              </div>
            </div>

            <div className="coin-price">
              <h3>{Currency.formatNumber(record?.price)}</h3>
              <div className="live">
                <p>Live</p>
              </div>
            </div>
          </div>

          <div
            className="tradingview-widget-container"
            id="tvchart"
          ></div>

          <div className="pricedetaill">
            <div className="coins__detail">
              <p>About {record.name}</p>
              <div className="box__detail">
                <p
                  className="news__p"
                  dangerouslySetInnerHTML={{
                    __html: record.description || "",
                  }}
                />
              </div>
            </div>

            <div className="coins__detail">
              <p>Links</p>
              <div className="box__detail">
                {link.length > 0 ? (
                  link.map((item, index) => (
                    <div
                      key={index}
                      className="link-item"
                    >
                      <p>{item.type}</p>
                      <a
                        href={item.url}
                        className="link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i
                          className="fas fa-link"
                        ></i>
                      </a>
                    </div>
                  ))
                ) : (
                  <p>No links available</p>
                )}
              </div>
            </div>
            <div className="coins__detail">
              <p>Social</p>
              <div className="box__detail">
                <p
                  className="news__p"
                  dangerouslySetInnerHTML={{
                    __html: record.description || "",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="buysell">
            <div className="buy" onClick={() => setClose(true)}>
              BUY UP
            </div>
            <div className="sell" onClick={() => setClose(true)}>
              BUY DOWN
            </div>
          </div>
        </div>
      )}
      {close && (
        <div className="modal__time">
          <div className="confirmation">
            <div className="order">Order confirmation</div>
            <div>
              <i
                className="fa fa-close"
                onClick={() => setClose(false)}
                style={{ fontSize: "24px" }}
              />
            </div>
          </div>

          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="form"
            >
              <div className="timing__">
                <div className="time__div">
                  <div onClick={() => handleBalanceClick(20, 60)}>60s</div>
                  <div onClick={() => handleBalanceClick(20, 90)}>90s</div>
                  <div onClick={() => handleBalanceClick(45, 120)}>120s</div>
                </div>
                <div className="time__div">
                  <div onClick={() => handleBalanceClick(60, 180)}>180s</div>
                  <div onClick={() => handleBalanceClick(60, 360)}>360s</div>
                  <div onClick={() => handleBalanceClick(60, 480)}>480s</div>
                </div>
              </div>
              <div>
                <span className="exchange">Number of lots to exchange:</span>
                <InputFormItem
                  type="text"
                  name="amount"
                  placeholder={i18n("entities.transaction.fields.amount")}
                  className="input__withdraw"
                />
              </div>

              <div className="modal__button">
                <div className="button__close" onClick
