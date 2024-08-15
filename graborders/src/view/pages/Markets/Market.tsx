import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useDispatch, useSelector } from "react-redux";
import selector from "src/modules/product/list/productListSelectors";
import productListActions from "src/modules/product/list/productListActions";
import ListCoins from "./ListCoin";
import Header from "src/view/layout/Header";
import LoadingModal from "src/shared/LoadingModal";
import { Link } from "react-router-dom";
import ExploreNews from "./Explore";
import productListSelectors from "src/modules/product/list/productListSelectors";

function Market() {
  const [newselected, setNewSelected] = useState("news");
  const [coincategory, setCoinCategory] = useState("");
  const [response, setResponse] = useState([]);
  const record = useSelector(selector.selectRows);
  const loading = useSelector(selector.selectLoading);
  const [coins, setCoins] = useState();

  const selectNews = useSelector(productListSelectors.selectNews);
  const selectloadingNews = useSelector(productListSelectors.selectloadingNews);

  const dispatch = useDispatch();

  const listFetchNews = (item, coin) => {
    setNewSelected(item);
    setCoins(coin);
    dispatch(productListActions.doFindNews(coin));
  };

  const fetchCoins = () => {
    dispatch(productListActions.doFetch());
    dispatch(productListActions.doFindNews(1));
  };

  useEffect(() => {
    fetchCoins();
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
   
      <div className="home__video">

<video autoPlay playsInline poster="/images/banner.png" className="max__video">
  <source src="/images/Mexc.mp4" type="video/mp4"   />
</video>



<div className="advertise__speaker">
          <div>

<i className="fa-solid fa-volume-high" style={{color:"white"}}></i>          </div>

          <div className="marquee">
            <span>
              Our security is our top priority, an we want to ensure that you
              are protected from any potential risks. Please be aware that we
              will never request you to send money to an unknown address. Before
              making any payments, we kindly ask you to verify the details with
              us first.
            </span>
          </div>
        </div>
        </div>
      <div className="home__page">
    

      <div className="home__section">

      </div>
        {/* <div className="home__news">
          <div className="homelist__coins">
            <div
              className={`${coincategory === "all" ? "news__active" : ""}`}
              onClick={() => setCoinCategory("all")}
            >
              All
            </div>
            <div
              className={`${coincategory === "new" ? "news__active" : ""}`}
              onClick={() => setCoinCategory("new")}
            >
              New
            </div>
            <div
              className={`${coincategory === "gainers" ? "news__active" : ""}`}
              onClick={() => setCoinCategory("gainers")}
            >
              Gainers
            </div>
            <div
              className={`${coincategory === "losers" ? "news__active" : ""}`}
              onClick={() => setCoinCategory("losers")}
            >
              Losers
            </div>
          </div>



          <div className="resutls__ofcoins">
            {!loading && response && <ListCoins data={response} />}
          </div>
          <Link to="/invitation" className="view__more">
            <div className=""> View More</div>
          </Link>
        </div> */}
        <div className="home__news">
          <div className="homelist__coins">
            <div
              className={`${newselected === "news" ? "news__active" : ""}`}
              onClick={() => listFetchNews("news", 0)}
            >
              New
            </div>

            <div
              className={`${newselected === "bitcoin" ? "news__active" : ""}`}
              onClick={() => listFetchNews("bitcoin", 1)}
            >
              Bitcoin
            </div>
            <div
              className={`${newselected === "ethereum" ? "news__active" : ""}`}
              onClick={() => listFetchNews("ethereum", 1027)}
            >
              Ethereum
            </div>
            <div
              className={`${newselected === "Usdt" ? "news__active" : ""}`}
              onClick={() => listFetchNews("Usdt", 825)}
            >
              Tether Usdt
            </div>
            <div
              className={`${newselected === "BNB" ? "news__active" : ""}`}
              onClick={() => listFetchNews("BNB", 1839)}
            >
              BNB
            </div>
            <div
              className={`${newselected === "Solona" ? "news__active" : ""}`}
              onClick={() => listFetchNews("Solona", 5426)}
            >
              Solona
            </div>

            <div
              className={`${newselected === "USDC" ? "news__active" : ""}`}
              onClick={() => listFetchNews("USDC", 3408)}
            >
              USDC
            </div>

            <div
              className={`${newselected === "XRP" ? "news__active" : ""}`}
              onClick={() => listFetchNews("XRP", 52)}
            >
              XRP
            </div>
            <div
              className={`${newselected === "toncoin" ? "news__active" : ""}`}
              onClick={() => listFetchNews("toncoin", 11419)}
            >
              Toncoin
            </div>
          </div>

          <div className="result__ofnews">
            <ExploreNews topic={selectNews} loading={selectloadingNews} />
          </div>
        </div>

        <div className="home__questions">
          <h2>What’s MEXEC about?</h2>

          <p>
            <div>
              MEXEC gives you price data of all cryptocurrencies. Here, you can
              check for real-time prices, market caps and historical price data.
              Also, we put cryptocurrencies into many different categories. In
              this way, you can track which category is performing well and in
              which one you could invest your money.
            </div>
            <div className="second__p">
              Essentially, MEXEC makes it easier for you to spot investment
              opportunities in the cryptocurrency market.
            </div>
          </p>

          <h3>Popular questions</h3>

          <div className="list__question">
            <ul className="ul__list">
              <li> How do we rank cryptocurrencies?</li>
              <li>What data sources do we use?</li>
              <li>What is market cap?</li>
              <li>What is Bitcoin dominance?</li>
              <li>
                What’s the difference between a cryptocurrency, coin and token?
              </li>
              <li>What are the different types of cryptocurrencies?</li>
              <li>Does MEXEC list all cryptocurrencies?</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Market;
