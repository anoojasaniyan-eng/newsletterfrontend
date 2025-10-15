

import React from "react";
import "./UrlList.css";

const UrlList = ({ urls }) => {
  if (!urls || urls.length === 0) {
    return <p>No URLs saved yet.</p>;
  }

  return (
    <div className="url-list">
      {urls.map((item) => (
        <div key={item.id} className="url-card">
          {item.image && (
            <img
              src={item.image}
              alt={item.title}
              className="url-card-image"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          )}
          <div className="url-card-content">
            <h4 className="url-card-title">{item.title || "Untitled"}</h4>
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="url-card-link">
              {item.url}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UrlList;
