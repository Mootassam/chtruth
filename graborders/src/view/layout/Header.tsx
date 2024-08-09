import React from "react";
import "./styles/style.css";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div className="app__header">
      <div>
      <img src="/icons/Mexec.svg" alt="" style={{width:130}} />

      </div>
      <div>
      </div>
      <Link to={"/currency"} className="linkWithoutUnderline">
        <div>

          <i className="fa fa-search" style={{fontSize:22}}></i>
        </div>
        </Link>
    </div>
  );
}

export default Header;
