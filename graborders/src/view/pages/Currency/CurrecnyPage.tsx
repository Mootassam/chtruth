import React, { useState } from "react";
import "./currencyStyle.css";
import axios from "axios";
import authAxios from "../../../modules/shared/axios/authAxios";
import AuthCurrentTenant from "src/modules/auth/authCurrentTenant";
import { Link } from "react-router-dom";

function CurrecnyPage() {
  const [coins, setResponse] = useState([]);
  console.log(coins);
  const searchCurrency = async (e) => {
    const data = e.target.value;
    const tenantId = AuthCurrentTenant.get();
    let response = await authAxios.get(`/tenant/${tenantId}/findcoin/${data}`);
    setResponse(response.data);
  };
  return (
    <div className="search__page">
      <div className="search__input">
        <i className="fa fa-search" style={{ fontSize: 22 }} />
        <input
          type="text"
          placeholder="search"
          className="search"
          onChange={(e) => searchCurrency(e)}
          style={{ fontSize: 18 }}
        />
        <div>
          <Link to={"/invitation"}>
            <i className="fa fa-close" style={{ fontSize: 26 }}></i>
          </Link>
        </div>
      </div>

      <div className="search__content">

      <div class="search__label">
              Coins
            </div>
        {coins.map((item) => (
          <div className="coins__list">
            <Link to={`coin/${item.uuid}`} className="remove__lg">
              <img src={item.iconUrl} alt=""  className="__image" />
              <span className="coin__name"> {item.name}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CurrecnyPage;
