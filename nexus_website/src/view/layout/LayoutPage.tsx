import React from "react";
import Header from "src/view/layout/Header";
import Footer from "./footer";
function LayoutPage(props) {
  return (
    <>
<Header />
      <>{props.children}</>
      <Footer />
    </>
  );
}

export default LayoutPage;
