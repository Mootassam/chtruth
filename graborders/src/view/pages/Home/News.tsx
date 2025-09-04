import React, { useState } from "react";
import { Link } from "react-router-dom";

function News(props) {
  const [response, setResponse] = useState();
  const { topic, loading } = props;
  return (
    <div className="crypto-news-container">
      {/* News Section Header */}
      <div className="news-section-header">
        <div className="news-sections-title">Crypto News</div>
        <Link to="/news" className="news-see-all remove_blue">
          See All →
        </Link>
      </div>
      {/* News Items */}
      {topic?.map((item, index) => (
        <>
          <div className="news-item-card">
            <div>
              <img
                src={item?.cover}
                className="news-image-placeholder"
                loading="lazy"
              />
            </div>
            <div className="news-content-wrapper">
              <div className="news-headline">{item?.meta?.title}</div>
              <div className="news-summary">{item?.meta?.subtitle}</div>
              <div className="news-meta-info">2 hours ago • CryptoDaily</div>
            </div>
          </div>
        </>
      ))}
      {/* News Section Footer */}
    </div>
  );
}

export default News;
