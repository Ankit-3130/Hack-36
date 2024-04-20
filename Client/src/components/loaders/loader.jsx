import React from "react";
import "./loader.css";

const Loader = ({ backgroundColor }) => {
  return (
    <div className="banter-loader-container" style={{ backgroundColor: backgroundColor }}>
      <div className="banter-loader">
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
      </div>
    </div>
  );
};

export default Loader;
