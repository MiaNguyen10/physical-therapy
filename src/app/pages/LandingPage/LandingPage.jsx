import React from "react";
import Company from "./components/Company";
import Footer from "./components/Footer";
import HeaderHomePage from "./components/HeaderHomePage";

const LandingPage = () => {
  return (
    <>
      <HeaderHomePage />
      <Company />
      <Footer />
    </>
  );
};

export default LandingPage;
