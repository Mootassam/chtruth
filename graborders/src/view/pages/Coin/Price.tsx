import React, { useState, useEffect } from "react";
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
import CountdownTimer from "src/view/shared/utils/CountdownTimer";

const schema = yup.object().shape({
  amount: yupFormSchemas.decimal(i18n("entities.product.fields.amount"), {
    required: true,
  }),
});

function Price(props) {
  const dispatch = useDispatch();
  const [close, setClose] = useState(false);
  const [response, setResponse] = useState({});
  const [link, setLinks] = useState([]);
  const record = useSelector(productListSelectors.selectRows);
  const loading = useSelector(productListSelectors.selectLoading);
  const saveLoading = useSelector(recordFormSelectors.selectSaveLoading);

  const searchAllCoins = async () => {
    try {
      dispatch(productListActions.doFindById(props.id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await searchAllCoins();
    };
    fetchData();
  }, [props.id, dispatch]);

  useEffect(() => {
    if (record) {
      setResponse(record);
      setLinks(record.links || []);
    }
  }, [record]);

  useEffect(() => {
    if (
      !loading &&
      response &&
      response.symbol &&
      response.symbol !== undefined
    ) {
      new TradingView.widget({
        autosize: true,
        symbol: `BINANCE:${response?.symbol}USDT`, // Check symbol format
        timezone: "Asia/Dubai",
        theme: "dark",
        toolbar_bg: "#f1f3f6",
        enable_publishing: false,
        hide_ideas: true, // Corrected option name
        hide_top_toolbar: false,
        hide_symbol: true, // Corrected option name
        details: false,
        studies: [],
        container_id: "tvchart",
        range: false,
        hide_legend: true,
        hide_side_toolbar: true,
        allow_symbol_change: false,
        save_image: false,
        do_not_store_settings: false, // Corrected option name
        backgroundColor: "", // This option might be ignored; consider using `colorTheme` instead
        horz_touch_drag: "", // Corrected option name
        vert_touch_drag: true, // Corrected option name
        extended_hours: false, // Changed to boolean
        hide_ideas_button: false, // Corrected option name
        with_date_ranges: false, // Corrected option name
        hide_volume: false,
        padding: "", // This option might be ignored; check documentation
        show_popup_button: false,
        studies_overrides: {},
        publish_source: false,
        venue: false,
        symbology: false,
        who_trades: false,
        referral_id: false,
        no_referral_id: false,
        fundamental: false,
        percentage: false,
        utm_source: false,
        utm_medium: false,
        utm_campaign: false,
      });
    }
  }, [loading, response]);

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const [percent, setProfit] = useState();
  const [time, setTime] = useState();
  const [number] = useState(Dates.Number());

  const { setValue } = form;
  const handleBalanceClick = async (profit, time) => {
   await setProfit(profit);
   await setTime(time);
  };
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const [showTimer, setShowTimer] = useState(false);
  const [timerDuration, setTimerDuration] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [showProfit, setShowProfit] = useState(false);

  const onSubmit = (values) => {
    values.number = number;
    values.user = currentUser.id;
    values.profit = percent;
    values.coin = response?.name;
    values.price = response?.price;
    values.time = time;

    let profit = parseFloat(values.amount) * (parseFloat(values.profit) / 100);

    setTotalProfit(profit);
    setShowTimer(true);
    dispatch(recordFormActions.doCreate(values));
    setTimerDuration(values.time);
    setClose(false);
  };

useEffect(() => {

 
}, [percent]);

  const handleTimerComplete = () => {
    setShowTimer(false);
    setShowProfit(true);
  };


  return (
    <div>
      {!loading && response && (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <img
                src={response.iconUrl}
                style={{ width: 40, height: 40 }}
                alt="coin icon"
              />
              <div>
                <p>{response.name}</p>
                <p style={{ fontSize: 12 }}>{response.symbol}</p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "end",
              }}
            >
              <h3>$ {Currency.formatNumber(response?.price)}</h3>
              <div className="live">
                <p>Live</p>
              </div>
            </div>
          </div>

          <br />

          <div
            className="tradingview-widget-container"
            id="tvchart"
            style={{ width: "100%", height: 460 }}
          ></div>
          <br />
          <div className="pricedetaill">
            <div className="coins__detail">
              <p>About {response.name}</p>
              <div className="box__detail">
                <p
                  className="news__p"
                  dangerouslySetInnerHTML={{
                    __html: response.description || "",
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
                      style={{
                        display: "flex",
                        paddingBottom: 10,
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <p>{item.type}</p>
                      </div>
                      <a
                        href={item.url}
                        style={{ textDecoration: "none" }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i
                          className="fas fa-link"
                          style={{ color: "white" }}
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
                    __html: response.description || "",
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
              ></i>
            </div>
          </div>

          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              style={{ width: "100%" }}
            >
              <div className="">
                <div className="timing__">
                  <div className="time__div">
                    <div
                      onClick={() => handleBalanceClick(20, 60)}
                      className={time === 60 ? "timer__active" : ""}
                    >
                      60s
                    </div>
                    <div
                      onClick={() => handleBalanceClick(20, 90)}
                      className={time === 90 ? "timer__active" : ""}
                    >
                      90s
                    </div>
                    <div
                      onClick={() => handleBalanceClick(45, 120)}
                      className={time === 120 ? "timer__active" : ""}
                    >
                      120s
                    </div>
                  </div>
                  <div className="time__div">
                    <div
                      onClick={() => handleBalanceClick(60, 180)}
                      className={time === 180 ? "timer__active" : ""}
                    >
                      180s
                    </div>
                    <div
                      onClick={() => handleBalanceClick(60, 360)}
                      className={time === 360 ? "timer__active" : ""}
                    >
                      360s
                    </div>
                    <div
                      onClick={() => handleBalanceClick(60, 480)}
                      className={time === 480 ? "timer__active" : ""}
                    >
                      480s
                    </div>
                  </div>
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  <span className="exchnage">Number of lots to exchange:</span>
                  <InputFormItem
                    type="text"
                    name="amount"
                    placeholder={i18n("entities.transaction.fields.amount")}
                    className="input__withdraw"
                  />
                </div>
              </div>

              <div className="modal__button">
                <div className="button__close" onClick={() => setClose(false)}>
                  Close
                </div>
                <button
                  className="button__confirm"
                  onClick={form.handleSubmit(onSubmit)}
                  disabled={saveLoading}
                >
                  <ButtonIcon loading={saveLoading} />
                  <span>Confirm</span>
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      )}

      {showTimer && (
        <CountdownTimer
          startTime={timerDuration}
          onComplete={handleTimerComplete}
        />
      )}
      {showProfit && (
        <div className="countdown-timer flex">
          <div className="profit__close" onClick={() => setShowProfit(false)}>
            <i className="fa fa-close"></i>
          </div>
          <h3 className="title__profit">Profit:</h3>
          <p className="total__profit">${totalProfit.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}

export default Price;
