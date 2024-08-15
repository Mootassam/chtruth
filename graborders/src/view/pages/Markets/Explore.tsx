import axios from "axios";
import { useEffect, useState } from "react";
import Dates from "src/view/shared/utils/Dates";

function ExploreNews(props) {
  const [response, setResponse] = useState();
  const {topic, loading} = props;


  useEffect(() => {
  }, [response]);
  return (
    <>
    {loading && <div className="news__loading"> <div className="loader__news"></div> </div>}
  
    {!loading && topic && <div className="news__item">
      <div className="news__today">
        <i
          className="fas fa-calendar"
          style={{ fontSize: 18, color: "#858ca2" }}
        ></i>
        <p className="news__todatext"> Today</p>
      </div>
      <div className="item__list">
        {topic?.map((item, index) => (
          <div className="" key={index}>
            <div>
              <label className="time__news">
                {Dates.newTime(item.meta.updatedAt)}
              </label>
              <img
                loading="lazy"
                src={item?.cover}
                alt=""
                width="100%"
                height="230px"
                style={{ paddingTop: 8 }}
              />
            </div>
            <h3 className="news__h3">{item?.meta?.title}</h3>
            <p className="news__p">{item?.meta?.subtitle}</p>
            <div className="ligne__item">
              <h5 className="news__h5">{item?.meta.sourceName}</h5>
              <span className="date__news" style={{ color: "#fff" }}>
                {Dates.NewsDate(item.meta.updatedAt)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div> }
    </>
  );
}

export default ExploreNews;
