import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import actions from "src/modules/record/list/recordListActions";
import selectors from "src/modules/record/list/recordListSelectors";
import LoadingModal from "src/shared/LoadingModal";
import Calcule from "src/view/shared/utils/Calcule";
import Dates from "src/view/shared/utils/Dates";
import Nodata from "src/view/shared/Nodata";
import SubHeader from "src/view/shared/Header/SubHeader";
import { Rating } from "react-simple-star-rating";
import Currency from "src/view/shared/utils/Currency";

function Portfolio() {
  const [active, setActive] = useState("completed");
  const dispatch = useDispatch();
  const record = useSelector(selectors.selectRows);
  const loading = useSelector(selectors.selectLoading);
  const total = useSelector(selectors.selectTotal);
  const selectHasRows = useSelector(selectors.selectHasRows);
  // const [limit, setLimit] = useState<number>(10);
  // const count = useSelector(selectors.selectCount);

  useEffect(() => {
    const values = {

    };


    dispatch(actions.doFetch(values, values));
  }, [dispatch, active]);

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  // const handleScroll = () => {
  //   if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
  //     if (count >= limit) {
  //       const values = {
  //         "status": active
  //       };
  //       setLimit(prevLimit => prevLimit + 10);
  //       dispatch(actions.doFetch(values, values, limit + 10));
  //     } else {
  //       return;
  //     }
  //   }
  // };

  const All = () => (
    <>
<div className="orders-list">
<div className="orders-list">
  {record.map((item, index) => (
    <div className="single-product" key={`${item.id}-${index}`}>
      <div className="order-header">
        <span className="order-status">Completed</span>
      </div>
      <div className="order-details">
        <div className="order-time">
          <strong>Order Time:</strong> {Dates.currentDate(item?.date)}
        </div>
        <div className="order-amount">
          <strong>Order Price:</strong> ${Currency.formatNumber(item?.price)}
        </div>
        <div className="order-time">
          <strong>Amount:</strong> ${item.amount}
        </div>
        <div className="order-price">
          <strong>Profit:</strong> ${item.commission}
        </div>
        <div className="order-coin">
          <strong>Coin:</strong> {item.coin}
        </div>
        <div className="order-time-seconds">
          <strong>Time:</strong> {item.time}s
        </div>
      </div>
    </div>
  ))}
</div>

</div>

    </>
  );

  return (
    <div>
            <SubHeader title="order" path="/profile" />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {/* <div className="header_order">
          <div className="order__header">
            <div className="order__record">Order Record</div>
          </div>
          <div className="order__background">
            <div className="order__remaining">
              <label htmlFor="" className="remaining__assets">
                {" "}
                Remaining Availalbe assets
              </label>
              <span className="remaining__amount">
                {total}
                <span style={{ fontSize: 19 }}>USDT</span>{" "}
              </span>
            </div>
          </div>
        </div> */}
        {/* <div className="order__list">
          <div className="list__actions">
            <div
              onClick={() => setActive("completed")}
              className={active === "completed" ? `active__order` : ""}
            >
              <span>Completed</span>
            </div>
            <div
              onClick={() => setActive("pending")}
              className={active === "pending" ? `active__order` : ""}
            >
              <span>Pending</span>
            </div>
            <div
              onClick={() => setActive("canceled")}
              className={active === "canceled" ? `active__order` : ""}
            >
              <span>Canceled</span>
            </div>
          </div>
        </div> */}
        <div className="list__product">
          {loading && <LoadingModal />}
          {!loading && record && <All />}
        </div>

        {!selectHasRows && <Nodata />}
      </div>
    </div>
  );
}

export default Portfolio;
