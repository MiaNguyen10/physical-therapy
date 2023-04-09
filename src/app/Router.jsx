import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import pages from "./config/pages";
import AddAccount from "./pages/Account/AddAccount";
import EditAccount from "./pages/Account/EditAccount";
import ManagerList from "./pages/Account/ManagerList";
import MemberList from "./pages/Account/MemberList";
import TherapistList from "./pages/Account/TherapistList";
import TypeOfAccount from "./pages/Account/TypeOfAccount";
import AddCategory from "./pages/Category/AddCategory";
import CategotyList from "./pages/Category/CategoryList";
import EditCategory from "./pages/Category/EditCategory";
import AddExercise from "./pages/Exercise/AddExercise";
import EditExercise from "./pages/Exercise/EditExercise";
import ExerciseList from "./pages/Exercise/ExerciseList";
import AddExerciseDetail from "./pages/ExerciseDetail/AddExerciseDetail";
import ExerciseDetail from "./pages/ExerciseDetail/ExerciseDetail";
import AddExerciseResource from "./pages/ExerciseResource/AddExerciseResource";
import EditExerciseResource from "./pages/ExerciseResource/EditExerciseResource";
import ExerciseResourceList from "./pages/ExerciseResource/ExerciseResourceList";
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Login";
import Demo from "./pages/Schedule/demo";
import AddSlot from "./pages/Slot/AddSlot";
import SlotList from "./pages/Slot/SlotList";
import EditSlot from "./pages/Slot/EditSlot";
import AddUser from "./pages/User/AddUser";
import AddPhysiotherapist from "./pages/User/AddPhysiotherapist";
import UserList from "./pages/User/UserList";
import EditUser from "./pages/User/EditUser";
import ProtectedRoutes from "./middlewares/ProtectedRoutes";

const Router = () => {
  return (
    <Routes>
      <Route path={`/${pages.loginPath}`} element={<Login />} />
      <Route element={<Layout />}>
        <Route
          path={`/${pages.landingPage}`}
          element={
            <ProtectedRoutes>
              <LandingPage />
            </ProtectedRoutes>
          }
        />
        {/* Account */}
        <Route
          path={`/${pages.accountPath}`}
          element={
            <ProtectedRoutes>
              <TypeOfAccount />
            </ProtectedRoutes>
          }
        />
        <Route
          path={`/${pages.memberListPath}`}
          element={
            <ProtectedRoutes>
              <MemberList />
            </ProtectedRoutes>
          }
        />
        <Route
          path={`/${pages.managerListPath}`}
          element={
            <ProtectedRoutes>
              <ManagerList />
            </ProtectedRoutes>
          }
        />
        <Route
          path={`/${pages.therapistListPath}`}
          element={
            <ProtectedRoutes>
              <TherapistList />
            </ProtectedRoutes>
          }
        />
        <Route
          path={`/${pages.addAccountPath}`}
          element={
            <ProtectedRoutes>
              <AddAccount />
            </ProtectedRoutes>
          }
        />
        <Route
          path={`/${pages.accountEditPath}`}
          element={
            <ProtectedRoutes>
              <EditAccount />
            </ProtectedRoutes>
          }
        />
        {/* Category */}
        <Route
          path={`/${pages.categoryListPath}`}
          element={
            <ProtectedRoutes>
              <CategotyList />
            </ProtectedRoutes>
          }
        />
        <Route
          path={`/${pages.addCategoryPath}`}
          element={
            <ProtectedRoutes>
              <AddCategory />
            </ProtectedRoutes>
          }
        />
        <Route
          path={`/${pages.categoryEditPath}`}
          element={
            <ProtectedRoutes>
              <EditCategory />
            </ProtectedRoutes>
          }
        />
        {/* Exercise */}
        <Route
          path={`/${pages.exerciseListPath}`}
          element={
            <ProtectedRoutes>
              <ExerciseList />
            </ProtectedRoutes>
          }
        />
        <Route
          path={`/${pages.addExercisePath}`}
          element={
            <ProtectedRoutes>
              <AddExercise />
            </ProtectedRoutes>
          }
        />
        <Route
          path={`/${pages.exerciseEditPath}`}
          element={
            <ProtectedRoutes>
              <EditExercise />
            </ProtectedRoutes>
          }
        />
        {/* Detail */}
        <Route
          path={`/${pages.exerciseDetailPath}`}
          element={
            <ProtectedRoutes>
              <ExerciseDetail />
            </ProtectedRoutes>
          }
        />
        <Route
          path={`/${pages.exerciseDetailAddPath}`}
          element={
            <ProtectedRoutes>
              <AddExerciseDetail />
            </ProtectedRoutes>
          }
        />
        {/* Resource */}
        <Route
          path={`/${pages.addExerciseResourcePath}`}
          element={
            <ProtectedRoutes>
              <AddExerciseResource />
            </ProtectedRoutes>
          }
        />
        <Route
          path={`/${pages.exerciseResourceListPath}`}
          element={
            <ProtectedRoutes>
              <ExerciseResourceList />
            </ProtectedRoutes>
          }
        />
        <Route
          path={`/${pages.exerciseResourceEditPath}`}
          element={
            <ProtectedRoutes>
              <EditExerciseResource />
            </ProtectedRoutes>
          }
        />
        <Route path={`/${pages.schedulePath}`} element={<Demo />} />
        <Route path={`/${pages.slotListPath}`} element={<SlotList />} />
        <Route path={`/${pages.addSlotPath}`} element={<AddSlot />} />
        <Route path={`/${pages.slotEditPath}`} element={<EditSlot />} />
        <Route path={`/${pages.userListPath}`} element={<UserList />} />
        <Route path={`/${pages.addUserPath}`} element={<AddUser />} />

        <Route
          path={`/${pages.addPhysiotherapistPath}`}
          element={<AddPhysiotherapist />}
        />
        <Route path={`/${pages.slotEditPath}`} element={<EditUser />} />
      </Route>
    </Routes>
  );
};

export default Router;
