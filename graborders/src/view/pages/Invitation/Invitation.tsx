import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useDispatch, useSelector } from "react-redux";
import selector from "src/modules/product/list/productListSelectors";
import productListActions from "src/modules/product/list/productListActions";
import Header from "src/view/layout/Header";
import ListCoins from "../Markets/ListCoin";
import LoadingModal from "src/shared/LoadingModal";

function Market() {
  const dispatch = useDispatch();
  const record = useSelector(selector.selectRows);
  const loading = useSelector(selector.selectLoading);
  const [response, setResponse] = useState([]);
  const [hasMore, setHasMore] = useState(true);


  const doListCompany = () => {
    dispatch(productListActions.doFetch());
  };

  useEffect(() => {
    doListCompany();
  }, [dispatch]);

  useEffect(() => {
    setResponse(record);
  }, [record]);




  const handleScroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.target.scrollingElement;
    if (scrollHeight - scrollTop <= clientHeight * 1.5 && hasMore) {
      doListCompany
      
   
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

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

      {loading && <LoadingModal />}
      {!loading && response && <ListCoins data={response} />}
    </div>
  );
}

export default Market;
