import React from "react";
import "./Loader.scss";
import ReactDOM from "react-dom";
import loaderImg from "../../assets/loader.gif";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className="wrapper">
      <div className="loader">
        <img src={loaderImg} alt="loader.." />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export const Spinner = () => {
  return (
    <div className="--center-all">
      <img src={loaderImg} alt="loader.." />
    </div>
  );
};

export default Loader;
