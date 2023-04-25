import { selectState, selectToken } from "cores/reducers/authentication";
import { getRole } from "cores/thunk/auth";
import { default as React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import pages from "./config/pages";
import AddAccount from "./pages/Account/AddAccount";
import EditAccount from "./pages/Account/EditAccount";
import UserList from "./pages/Account/UserList";
import AddCategory from "./pages/Category/AddCategory";
import CategotyList from "./pages/Category/CategoryList";
import EditCategory from "./pages/Category/EditCategory";
import AddExercise from "./pages/Exercise/AddExercise";
import EditExercise from "./pages/Exercise/EditExercise";
import ExerciseList from "./pages/Exercise/ExerciseList";
import AddExerciseDetail from "./pages/ExerciseDetail/AddExerciseDetail";
import EditExerciseDetail from "./pages/ExerciseDetail/EditExerciseDetail";
import ExerciseDetailList from "./pages/ExerciseDetail/ExerciseDetailList";
import AddExerciseResource from "./pages/ExerciseResource/AddExerciseResource";
import EditExerciseResource from "./pages/ExerciseResource/EditExerciseResource";
import ExerciseResourceList from "./pages/ExerciseResource/ExerciseResourceList";
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Login";
import Schedule from "./pages/Schedule";
import ScheduleBySlot from "./pages/Schedule/ScheduleBySlot";
import AddSlot from "./pages/Slot/AddSlot";
import EditSlot from "./pages/Slot/EditSlot";
import SlotList from "./pages/Slot/SlotList";
import FeedbackList from "./pages/Feedback/FeedbackList";
import ProtectedRoutes from "./middlewares/ProtectedRoutes";
import { RestrictedPermission } from "./middlewares/PermissionProvider";
import Physiotherapist from "./pages/Account/Physiotherapist";
import AddPhysiotherapist from "./pages/Account/AddPhysiotherapist";

const Router = () => {
  const token = useSelector(selectToken);
  const currentState = useSelector(selectState);
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      dispatch(getRole(currentState.UserId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentState.UserId]);
  return (
    <Routes>
      <Route path={`/${pages.loginPath}`} element={<Login />} />
      <Route element={<Layout />}>
        <Route element={<ProtectedRoutes />}>
          {/* User */}
          <Route path={`/${pages.userListPath}`} element={<UserList />} />
          <Route path={`/${pages.addUserPath}`} element={<AddAccount />} />
          <Route path={`/${pages.userEditPath}`} element={<EditAccount />} />

          {/* Physiotherapist */}
          <Route path={`${pages.physioPath}`} element={<Physiotherapist />} />
          <Route path={`${pages.addPhysioPath}`} element={<AddPhysiotherapist />} />

          {/* Feedback */}
          <Route
            path={`${pages.feedbackListPath}`}
            element={<FeedbackList />}
          />

          {/* Admin */}
          <Route element={<RestrictedPermission permission={"Admin"} />}>
            {/* Category */}
            <Route
              path={`/${pages.categoryListPath}`}
              element={<CategotyList />}
            />
            <Route
              path={`/${pages.addCategoryPath}`}
              element={<AddCategory />}
            />
            <Route
              path={`/${pages.categoryEditPath}`}
              element={<EditCategory />}
            />
            {/* Exercise */}
            <Route
              path={`/${pages.exerciseListPath}`}
              element={<ExerciseList />}
            />
            <Route
              path={`/${pages.addExercisePath}`}
              element={<AddExercise />}
            />
            <Route
              path={`/${pages.exerciseEditPath}`}
              element={<EditExercise />}
            />
            {/* Detail */}
            <Route
              path={`/${pages.exerciseDetailListPath}`}
              element={<ExerciseDetailList />}
            />
            <Route
              path={`/${pages.exerciseDetailEditPath}`}
              element={<EditExerciseDetail />}
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
              path={`/${pages.editExerciseResourcePath}`}
              element={<EditExerciseResource />}
            />
          </Route>

          {/* Staff */}
          <Route element={<RestrictedPermission permission={"Staff"} />}>
            {/* Slot */}
            <Route path={`/${pages.slotListPath}`} element={<SlotList />} />
            <Route path={`/${pages.addSlotPath}`} element={<AddSlot />} />
            <Route path={`/${pages.slotEditPath}`} element={<EditSlot />} />

            {/* Schedule */}
            <Route path={`/${pages.schedulePath}`} element={<Schedule />} />
            <Route
              path={`/${pages.scheduleBySlotID}`}
              element={<ScheduleBySlot />}
            />
          </Route>
        </Route>
        <Route index path={`/${pages.landingPage}`} element={<LandingPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
