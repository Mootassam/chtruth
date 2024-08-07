import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/styles.css";
import Price from "./Price";

function Coin() {
  const { id }: any = useParams();
  const [active, setActive] = useState("price");
  const [name, setName] = useState("");

  return (
    <div>
      <div className="header__page">
        <div>
          <Link to={"/"}>
            <i
              className="fas fa-long-arrow-alt-left"
              style={{ color: "white" }}
            />
          </Link>
        </div>
        <div className="page__name">
          <span>Currency Detail</span>
        </div>
        <div></div>
      </div>
    

      <div className="coins__content">
        {active === "price" && <Price id={id} />}

      </div>
    </div>
  );
}

export default Coin;
