import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useDispatch, useSelector } from "react-redux";
import selector from "src/modules/product/list/productListSelectors";
import productListActions from "src/modules/product/list/productListActions";
import Header from "src/view/layout/Header";
import ListCoins from "../Markets/ListCoin";

function Market() {
  const dispatch = useDispatch();
  const record = useSelector(selector.selectRows);
  const loading = useSelector(selector.selectLoading);
  const [response, setResponse] = useState([]);

  const doListCompany = () => {
    dispatch(productListActions.doFetch());
  };

  useEffect(() => {
    doListCompany();
  }, [dispatch]);

  useEffect(() => {
    setResponse(record);
  }, [record]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />

      <br />
      <br />
      <br />
      <br />

      {loading && <h1 style={{ color: "white" }}>Loading ...</h1>}
      {!loading && response && <ListCoins data={response} />}
    </div>
  );
}

export default Market;
