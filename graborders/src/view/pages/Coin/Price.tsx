import React, { useState, useEffect } from "react";
import "../styles/styles.css";
import Currency from "src/view/shared/utils/Currency";
import { useDispatch, useSelector } from "react-redux";
import productListActions from "src/modules/product/list/productListActions";
import productListSelectors from "src/modules/product/list/productListSelectors";

function Price(props) {
  const dispatch = useDispatch();
const [close , setClose] = useState(false);
  const [response, setResponse] = useState({});
  const [link, setLinks] = useState([]);

  const record = useSelector(productListSelectors.selectRows);
  const loading = useSelector(productListSelectors.selectLoading);

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
        symbol: `BINANCE:${response?.symbol}USDT`,
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
    }
  }, [loading, response]);

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
              <h3>{Currency.formatNumber(response?.price)}</h3>
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
            <div className="buy" onClick={() => setClose(true)} >BUY UP</div>
            <div className="sell" onClick={() => setClose(true)}>BUY DOWN</div>
          </div>
        </div>
      )}
{close &&   <div className="modal__time">
        <div className="confirmation">
          <div className="order">Order confirmation</div>
          <div>
         
            <i className="fa fa-close" onClick={() => setClose(false)} style={{fontSize:"24px"}}> </i>{" "}
          </div>
        </div>
        <div className="">
          <div className="timing__">
            <div className="time__div">
              <div>30s</div>
              <div>60s</div>
              <div>90s</div>
            </div>
            <div className="time__div">
              <div>180s</div>
              <div>360s</div>
              <div>480s</div>
            </div>
          </div>
          <div>
            <span className="exchnage">Number of lots to exchange:</span>
            <input type="text" placeholder="Amount" className="amount" />
          </div>
        </div>

        <div className="modal__button">
          <div className="button__close" onClick={() => setClose(false)}> Close</div>
          <div className="button__confirm">Confirm</div>
        </div>
      </div> }
    
    </div>
  );
}

export default Price;
