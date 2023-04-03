import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import pages from "./config/pages";
import MemberList from "./pages/Account/MemberList";
import LandingPage from "./pages/LandingPage/LandingPage";
import AddAccount from "./pages/Account/AddAccount";
import EditAccount from "./pages/Account/EditAccount";
import TypeOfAccount from "./pages/Account/TypeOfAccount";
import ManagerList from "./pages/Account/ManagerList";
import TherapistList from "./pages/Account/TherapistList";
import CategotyList from "./pages/Category/CategoryList";
import AddCategory from "./pages/Category/AddCategory";
import EditCategory from "./pages/Category/EditCategory";

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={`/${pages.landingPage}`} element={<LandingPage />} />
        <Route path={`/${pages.accountPath}`} element={<TypeOfAccount />} />
        <Route path={`/${pages.memberListPath}`} element={<MemberList />} />
        <Route path={`/${pages.managerListPath}`} element={<ManagerList />} />
        <Route
          path={`/${pages.therapistListPath}`}
          element={<TherapistList />}
        />
        <Route path={`/${pages.addAccountPath}`} element={<AddAccount />} />
        <Route path={`/${pages.accountEditPath}`} element={<EditAccount />} />
        <Route path={`/${pages.categoryListPath}`} element={<CategotyList />} />
        <Route path={`/${pages.addCategoryPath}`} element={<AddCategory />} />
        <Route path={`/${pages.categoryEditPath}`} element={<EditCategory />} />
      </Route>
    </Routes>
  );
};

export default Router;
