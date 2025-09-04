import React from "react";
import Dates from "src/view/shared/utils/Dates";

function SingleItem(props) {
  const { topic, loading } = props;

  return (
    <>
     {topic?.map((item, index) => (
        
        
        <div className="news-item" key={index}>
      <div className="news-header">
        <div className="news-source">
          <i className="fas fa-newspaper" />
        </div>
        <div className="news-info">
          <div className="news-source-name">{item?.meta.sourceName}</div>
          <div className="news-date">  {Dates.NewsDate(item.meta.updatedAt)}</div>
        </div>
      </div>
      <div className="news-title">
     {item?.meta?.title}
      </div>
      <div className="news-content">
     {item?.meta?.subtitle}
      </div>
      <img  loading="lazy"
                src={item?.cover} className="news-image" />

   

    </div> ))}
  </>
  );
}

export default SingleItem;
