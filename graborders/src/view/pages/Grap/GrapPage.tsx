import React, { useState, useEffect, useCallback, useMemo } from "react";
import "../styles/styles.css";
import { useDispatch, useSelector } from "react-redux";
import authSelectors from "src/modules/auth/authSelectors";
import actions from "src/modules/product/list/productListActions";
import selector from "src/modules/product/list/productListSelectors";
import LoadingModal from "src/shared/LoadingModal";
import Dates from "src/view/shared/utils/Dates";
import recordActions from "src/modules/record/form/recordFormActions";
import recordListAction from "src/modules/record/list/recordListActions";
import recordSelector from "src/modules/record/list/recordListSelectors";

import selectors from "src/modules/record/list/recordListSelectors";

import { useHistory } from "react-router-dom";
import authActions from "src/modules/auth/authActions";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import selectorsC from "src/modules/company/list/companyListSelectors";
import listactions from "src/modules/company/list/companyListActions";

const Grappage = () => {
  const [rating, setRating] = useState(0);
  const handleRating = (rate: number) => {
    setRating(rate);

    // other logic
  };
  // Optinal callback functions

  const totalperday = useSelector(selectors.selectTotalPerday);
  const loadingImage = useSelector(selectorsC?.selectLoading);
  const logorecord = useSelector(selectorsC.selectRows);
  const history = useHistory();
  const dispatch = useDispatch();
  const record = useSelector(authSelectors.selectCurrentUser);
  const items = useSelector(selector.selectRows);
  const loading = useSelector(selector.selectLoading);
  // const numberRecord = useSelector(recordSelector.selectCount);
  const [showModal, setShowModal] = useState(false);
  const [lodingRoll, setLoadingRoll] = useState(false);
  const selectCountRecord = useSelector(recordSelector.selectCountRecord);

  const error = useSelector(recordSelector.selectError);

  const refreshItems = useCallback(async () => {
    try {
      // Await each action to ensure they complete in order
      await dispatch(recordListAction.doFetch());
      await dispatch(actions.doFetch());
      await dispatch(authActions.doRefreshCurrentUser());
      await dispatch(recordListAction.doCountDay());
    } catch (error) {
      console.error("Error during refreshing items:", error);
      // Optionally handle error state or show an error message to the user
    }
  }, [dispatch]);

  const stop = useMemo(() => {
    return parseInt(selectCountRecord) === parseInt(record?.vip?.dailyorder);
  }, [selectCountRecord, record]);

  const rollAll = async () => {
    try {
      setLoadingRoll(true);
      await dispatch(recordListAction.doCheck());
      if (error) {
        return;
      }
      await dispatch(actions.doFetch());

      setTimeout(() => {
        setShowModal(true);
      }, 1000);

      setLoadingRoll(false);
    } catch (error) {
      // Handle other errors
      setLoadingRoll(false);
    }
  };

  const hideModal = () => {
    setShowModal(false);
  };

  const [number] = useState(Dates.Number());

  useEffect(() => {
    dispatch(recordListAction.doCount());
    dispatch(listactions.doFetch());
    dispatch(recordListAction.doCountDay());
  }, [dispatch]);

  const calcule__total = (price, comission) => {
    const total = (parseFloat(comission) / 100) * parseFloat(price);
    return total.toFixed(3);
  };

  const currentUser = useSelector(authSelectors.selectCurrentUser);

  const submit = async () => {
    const values = {
      number: number,
      product: items?.id,
      status: items?.combo ? "pending" : "completed",
      user: currentUser.id,
      rating: rating,
    };
    await dispatch(recordActions.doCreate(values));
    await refreshItems();
    setShowModal(false);
  };

  return (
    <>
      <div className="market__header">
        {!loadingImage &&
          logorecord.map((item) => (
            <img
              src={item?.photo[0]?.downloadUrl}
              alt=""
              className="logo__header"
            />
          ))}
      </div>

      <div className="app__grappage">
        <div className="grap__movies">
          <img src="/images/start_img.gif" alt="" />
        </div>

        <div className="button__start">
          <button
            disabled={lodingRoll}
            className={`button__grapstart ${lodingRoll ? "__disabled" : ""}`}
            onClick={() => rollAll()}
          >
            Start
          </button>
          <Link to={"/order"} className="butoon__order remove__lg">
            Orders
          </Link>
        </div>

        <div className="terms__">
          <span>
            <Link to="/tc" className="remove__lg">
              terms & conditions
            </Link>
          </span>
        </div>

        <div className="film__score">
          <div className="film__sc">
            <div className="grap__page">
              {" "}
              ${currentUser?.balance.toFixed(2)}
            </div>
            <div className="grap__">
              {currentUser?.tasksDone}/{record?.vip?.dailyorder}
            </div>
          </div>

          <div className="film__cadre">
            <div className="cadre__filma">
              <span className="av__balance">Today's earnings: </span>
              <label htmlFor="" className="balance__film">
                ${totalperday?.toFixed(3)}
              </label>
            </div>
            <div className="cadre__filma">
              <span className="av__balance">Account Balance : </span>
              <label htmlFor="" className="balance__film">
                ${currentUser?.balance.toFixed(2)}
              </label>
            </div>
            <div className="cadre__filma">
              <span className="av__balance">Freeze Balance : </span>
              <label htmlFor="" className="balance__film">
                ${currentUser?.freezeblance?.toFixed(2)}
              </label>
            </div>
          </div>
        </div>

        {loading && <LoadingModal />}

        {!loading && showModal && items && (
          <>
            <div className="film__modal">
              <div className="film__modal__close" onClick={() => hideModal()}>
                <i
                  className="fa fa-close"
                  style={{ color: "white", fontSize: 35 }}
                />
              </div>
              <div className="film__details">
                <div className="submit__information">
                  <span className="submit__information__title">
                    Submit Information
                  </span>

                  {items?.photo && items?.photo[0]?.downloadUrl && (
                    <img
                      src={items?.photo[0]?.downloadUrl}
                      alt=""
                      style={{ width: "120px" }}
                    />
                  )}

                  <h3 className="grap__titleh3">{items?.title}</h3>
                </div>

                <div className="creation__time">
                  <span className="title__creation">Creation time:</span>
                  <label htmlFor="" className="date__creation">
                    {Dates.current()}
                  </label>
                </div>

                <div className="order__number">
                  <div>
                    <span className="tile">Order Number:</span>
                    <span>{number}</span>
                  </div>
                  <div>
                    <span className="tile">Order amount:</span>
                    <span>${items?.amount}</span>
                  </div>
                  <div>
                    <span className="tile">Income</span>
                    <span>
                      ${calcule__total(items?.amount, items?.commission)}
                    </span>
                  </div>
                </div>

                <div className="rating__box">
                  <div className="buyer__rating">
                    Buyer Ratings ({rating}/5)
                  </div>
                  <div>
                    {" "}
                    <Rating
                      onClick={handleRating}
                      size={20}
                      /* Available Props */
                    />
                  </div>
                </div>

                <div className="rating__submit" onClick={() => submit()}>
                  Submit
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Grappage;
