import React from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";

const Layout = ({ children }) => {
  //children prop to  anything inbetween layout
  return (
    <>
      <Header />
      <div className="--pad" style={{ minHeight: "80vh" }}>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
