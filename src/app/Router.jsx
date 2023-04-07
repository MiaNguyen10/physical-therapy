import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import pages from "./config/pages";
import { RestrictedPermission } from "./middlewares/PermissionProvider";
import AddAccount from "./pages/Account/AddAccount";
import EditAccount from "./pages/Account/EditAccount";
import ManagerList from "./pages/Account/ManagerList";
import MemberList from "./pages/Account/MemberList";
import TherapistList from "./pages/Account/TherapistList";
import TypeOfAccount from "./pages/Account/TypeOfAccount";
import AddCategory from "./pages/Category/AddCategory";
import CategotyList from "./pages/Category/CategoryList";
import EditCategory from "./pages/Category/EditCategory";
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Login";
import ExerciseList from "./pages/Exercise/ExerciseList";
import AddExercise from "./pages/Exercise/AddExercise";
import EditExercise from "./pages/Exercise/EditExercise";
import EditExerciseDetail from "./pages/ExerciseDetail/EditExerciseDetail";
import AddExerciseDetail from "./pages/ExerciseDetail/AddExerciseDetail";
import ExerciseDetailList from "./pages/ExerciseDetail/ExerciseDetailList";
import EditExerciseResource from "./pages/ExerciseResource/EditExerciseResource";
import AddExerciseResource from "./pages/ExerciseResource/AddExerciseResource";
import ExerciseResourceList from "./pages/ExerciseResource/ExerciseResourceList";


const Router = () => {
  return (
    <Routes>
      <Route path={`/${pages.loginPath}`} element={<Login />} />
      {/* <Route element={<ProtectedRoutes />}>
        
      </Route> */}
      <Route element={<Layout />}>
        <Route path={`/${pages.landingPage}`} element={<LandingPage />} />
        <Route path={`/${pages.accountPath}`} element={<TypeOfAccount />} />
        <Route path={`/${pages.memberListPath}`} element={<MemberList />} />
        <Route element={<RestrictedPermission permission={["Bearer"]} />}>
          <Route path={`/${pages.managerListPath}`} element={<ManagerList />} />
        </Route>
        <Route
          path={`/${pages.therapistListPath}`}
          element={<TherapistList />}
        />
        <Route path={`/${pages.addAccountPath}`} element={<AddAccount />} />
        <Route path={`/${pages.accountEditPath}`} element={<EditAccount />} />
        <Route path={`/${pages.categoryListPath}`} element={<CategotyList />} />
        <Route path={`/${pages.addCategoryPath}`} element={<AddCategory />} />
        <Route path={`/${pages.categoryEditPath}`} element={<EditCategory />} />
        <Route path={`/${pages.exerciseListPath}`} element={<ExerciseList />} />
        <Route path={`/${pages.addExercisePath}`} element={<AddExercise />} />
        <Route path={`/${pages.exerciseEditPath}`} element={<EditExercise />} />
        <Route path={`/${pages.addExerciseDetailPath}`} element={<AddExerciseDetail />} />
        <Route path={`/${pages.exerciseDetailListPath}`} element={<ExerciseDetailList />} />
        <Route path={`/${pages.exerciseDetailEditPath}`} element={<EditExerciseDetail />} />
        <Route path={`/${pages.addExerciseResourcePath}`} element={<AddExerciseResource />} />
        <Route path={`/${pages.exerciseResourceListPath}`} element={<ExerciseResourceList />} />
        <Route path={`/${pages.exerciseResourceEditPath}`} element={<EditExerciseResource />} />
      </Route>
    </Routes>
  );
};

export default Router;
