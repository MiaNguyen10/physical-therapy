import React, { useEffect } from "react";
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
import EditSlot from "./pages/Slot/EditSlot";
import SlotList from "./pages/Slot/SlotList";
import AddPhysiotherapist from "./pages/User/AddPhysiotherapist";
import AddUser from "./pages/User/AddUser";
import EditUser from "./pages/User/EditUser";
import UserList from "./pages/User/UserList";
import { useDispatch, useSelector } from "react-redux";
import { selectState, selectToken } from "cores/reducers/authentication";
import { getRole } from "cores/thunk/auth";
import ExerciseResource from "./pages/ExerciseResource/ExerciseResouce";

const Router = () => {
  const token = useSelector(selectToken);
  const currentState = useSelector(selectState);
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      dispatch(getRole(currentState.UserId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Routes>
      <Route path={`/${pages.loginPath}`} element={<Login />} />
      <Route element={<Layout />}>
        <Route index path={`/${pages.landingPage}`} element={<LandingPage />} />
        {/* Account */}
        <Route path={`/${pages.accountPath}`} element={<TypeOfAccount />} />
        <Route path={`/${pages.memberListPath}`} element={<MemberList />} />
        <Route path={`/${pages.managerListPath}`} element={<ManagerList />} />
        <Route
          path={`/${pages.therapistListPath}`}
          element={<TherapistList />}
        ></Route>
        <Route path={`/${pages.addAccountPath}`} element={<AddAccount />} />
        <Route path={`/${pages.accountEditPath}`} element={<EditAccount />} />
        {/* Category */}
        <Route path={`/${pages.categoryListPath}`} element={<CategotyList />} />
        <Route path={`/${pages.addCategoryPath}`} element={<AddCategory />} />
        <Route path={`/${pages.categoryEditPath}`} element={<EditCategory />} />
        {/* Exercise */}
        <Route path={`/${pages.exerciseListPath}`} element={<ExerciseList />} />
        <Route path={`/${pages.addExercisePath}`} element={<AddExercise />} />
        <Route path={`/${pages.exerciseEditPath}`} element={<EditExercise />} />
        {/* Detail */}
        <Route
          path={`/${pages.exerciseDetailPath}`}
          element={<ExerciseDetail />}
        />
        <Route
          path={`/${pages.exerciseDetailAddPath}`}
          element={<AddExerciseDetail />}
        />
        {/* Resource */}
        <Route
          path={`/${pages.addExerciseResourcePath}`}
          element={<AddExerciseResource />}
        />
        <Route
          path={`/${pages.exerciseResourceListPath}`}
          element={<ExerciseResourceList />}
        />
        <Route
          path={`/${pages.exerciseResourcePath}`}
          element={<ExerciseResource />}
        />
        <Route
          path={`/${pages.exerciseResourceEditPath}`}
          element={<EditExerciseResource />}
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
