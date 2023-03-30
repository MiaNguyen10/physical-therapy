import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import pages from "./config/pages";
import LandingPage from "./pages/LandingPage/LandingPage"

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={`/${pages.landingPage}`} element={<LandingPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
