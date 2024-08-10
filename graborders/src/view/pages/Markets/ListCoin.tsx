import React from "react";
import { Link } from "react-router-dom";
import {
  Sparklines,
  SparklinesLine,
  SparklinesNormalBand,
} from "react-sparklines";
import Currency from "src/view/shared/utils/Currency";

function ListCoins(props) {
  const changeColor = (item) => {
    if (!item) return;
    return parseFloat(item) <= 0 ? "red" : "green";
  };

  const changePrice = (price) => {
    if (!price) return;
    return parseFloat(price) <= 0 ? price : `+${price}`;
  };

  const { data } = props;

  if (!Array.isArray(data)) {
    return <p>No data available</p>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: "start", width: "25%" }}>All coins</th>
            <th style={{ textAlign: "end", width: "30%" }}>Price</th>
            <th style={{ textAlign: "center", width: "20%" }}>24h</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <Link
              to={`coin/${item.uuid}`}
              style={{
                textDecoration: "none",
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                color: "#b1b4c3",
              }}
            >
              <tr key={index}>
                <td
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 23% auto auto)", // Three columns with specified sizes
                    gridTemplateRows: "auto", // Automatic row sizing
                    justifyContent: "flex-start",
                    width: "40%",
                    textAlign: "start",
                  }}
                >
                  <div>{index + 1}</div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <img
                      src={item.iconUrl}
                      alt={item.name}
                      style={{ width: 30, height: 30 }}
                    />
                    <div>
                      <p>{item.name}</p>
                      <p style={{ fontSize: 13, color: "#60A0c4" }}>
                        {item.symbol}
                      </p>
                    </div>
                  </div>
                </td>

                <td
                  style={{
                    display: "flex",
                    width: "45%",
                    justifyContent: "center",
                    flexDirection: "column",
                    textAlign: "start",
                    alignItems: "end",
                  }}
                >
                  <p>$ {Currency.formatNumber(item?.price)}</p>
                  <p style={{ fontSize: 13, color: "#60A0c4" }}>
                    {Currency.formatNumber(item?.marketCap)}
                  </p>
                </td>

                <td
                  style={{
                    flexDirection: "column",
                    width: "20%",
                  }}
                >
                  <p style={{ color: changeColor(item.change) }}>
                    {changePrice(item.change)}
                  </p>
                  <Sparklines data={item.sparkline}>
                    <SparklinesLine color={changeColor(item.change)} />
                    <SparklinesNormalBand />
                  </Sparklines>
                </td>
                <td>{/* The Link is now wrapping the table cell content */}</td>
              </tr>
            </Link>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListCoins;
