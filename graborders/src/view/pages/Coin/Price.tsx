import axios from "axios";
import React, { useState, useEffect } from "react";
import "../styles/styles.css";
import Currency from "src/view/shared/utils/Currency";
function Price(props) {
  const [response, setReponse] = useState([]);
  const [link, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchAllCoins = async () => {
    try {
      setLoading(true);
      const data = await axios.get(
        `http://192.168.1.43:8080/api/coins/price/${props.id}`
      );
      setReponse(data.data.coin);
      setLinks(data?.data?.coin?.links);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  console.log("Response data", response.symbol);

  const showingChart = async () => {
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
  };

  useEffect(() => {
    const fetchData = async () => {
      await searchAllCoins();
    };
    fetchData();
  }, [props.id]);

  useEffect(() => {
    showingChart();
  }, [loading, response]);
  return (
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
          <img src={response.iconUrl} style={{ width: 40, height: 40 }} />
          <div>
            <p> {response.name}</p>
            <p style={{ fontSize: 12 }}>{response.symbol}</p>
          </div>
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", textAlign: "end" }}
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
          <p> About {response.name}</p>
          <div className="box__detail">
            <p
              className="news__p"
              dangerouslySetInnerHTML={{ __html: response.description }}
            />
          </div>
        </div>

        <div className="coins__detail">
          <p> Links </p>
          <div className="box__detail">
            {link?.map((item) => (
              <div
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
                >
                  <i className="fas fa-link" style={{ color: "white" }}></i>
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="coins__detail">
          <p> Social </p>
          <div className="box__detail">
            <p
              className="news__p"
              dangerouslySetInnerHTML={{ __html: response.description }}
            />
          </div>
        </div>
      </div>

      <div className="buysell">
        <div className="buy">BUY </div>
        <div className="sell">SELL</div>
      </div>
    </div>
  );
}

export default Price;
