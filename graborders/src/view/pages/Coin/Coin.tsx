// import React, { useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import "../styles/styles.css";
// import Price from "./Price";

// function Coin() {
//   const { id }: any = useParams();
//   const [active, setActive] = useState("price");
//   const [name, setName] = useState("");

//   return (
//     <div>
//       <div className="header__page">
//         <div>
//           <Link to={"/"}>
//             <i
//               className="fas fa-long-arrow-alt-left"
//               style={{ color: "white" }}
//             />
//           </Link>
//         </div>
//         <div className="page__name">
//           <span>Currency Detail</span>
//         </div>
//         <div></div>
//       </div>
//       <div className="coin__menue">
//         <div
//           onClick={() => setActive("price")}
//           className={active === "price" ? "tabactive" : ""}
//         >
//           Price
//         </div>
//         <div
//           onClick={() => setActive("about")}
//           className={active === "about" ? "tabactive" : ""}
//         >
//           About
//         </div>
//         <div
//           onClick={() => setActive("exchanges")}
//           className={active === "exchanges" ? "tabactive" : ""}
//         >
//           Exchanges
//         </div>
//         <div
//           onClick={() => setActive("markets")}
//           className={active === "markets" ? "tabactive" : ""}
//         >
//           Markets
//         </div>
//       </div>

//       <div className="coins__content">
//         {active === "price" && <Price id={id} />}

//       </div>
//     </div>
//   );
// }

// export default Coin;
