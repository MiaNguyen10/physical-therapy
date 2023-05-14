import { default as React } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import pages from "./config/pages";
import { RestrictedPermission } from "./middlewares/PermissionProvider";
import ProtectedRoutes from "./middlewares/ProtectedRoutes";
import AddAccount from "./pages/Account/AddAccount";
import AddPhysiotherapist from "./pages/Account/AddPhysiotherapist";
import EditAccount from "./pages/Account/EditAccount";
import Physiotherapist from "./pages/Account/Physiotherapist";
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
import FeedbackList from "./pages/Feedback/FeedbackList";
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Login";
import Schedule from "./pages/Schedule";
import ScheduleBySlot from "./pages/Schedule/ScheduleBySlot";
import AddSlot from "./pages/Slot/AddSlot";
import EditSlot from "./pages/Slot/EditSlot";
import SlotList from "./pages/Slot/SlotList";
import AddTypeOfSlot from "./pages/TypeOfSlot/AddTypeOfSlot";
import EditTypeOfSlot from "./pages/TypeOfSlot/EditTypeOfSlot";
import TypeOfSlorList from "./pages/TypeOfSlot/TypeOfSlotList";
import BookingDetailList from "./pages/BookingDetail/BookingDetailList";
import AddSubProfile from "./pages/SubProfile/AddSubProfile";
import SubProfile from "./pages/Account/SubProfile";
import SubProfileList from "./pages/SubProfile/SubProfileList";
import EditSubProfile from "./pages/SubProfile/EditSubProfile";

const Router = () => {
  return (
    <Routes>
      <Route path={`/${pages.loginPath}`} element={<Login />} />
      <Route element={<Layout />}>
        <Route element={<ProtectedRoutes />}>
          <Route
            element={<RestrictedPermission permission={["Admin", "Staff"]} />}
          >
            {/* User */}
            <Route path={`/${pages.userListPath}`} element={<UserList />} />
            <Route path={`/${pages.addUserPath}`} element={<AddAccount />} />
            <Route path={`/${pages.userEditPath}`} element={<EditAccount />} />
            <Route path={`${pages.subProfilePath}`} element={<SubProfile />} />

            {/* SubProfile */}
            <Route
                path={`/${pages.subProfileListPath}`}
                element={<SubProfileList />}
              />
              <Route
                path={`/${pages.subProfileEditPath}`}
                element={<EditSubProfile />}
              />
              <Route
                path={`/${pages.subProfileAddPath}`}
                element={<AddSubProfile />}
              />

            {/* Physiotherapist */}
            <Route path={`${pages.physioPath}`} element={<Physiotherapist />} />
            <Route
              path={`${pages.addPhysioPath}`}
              element={<AddPhysiotherapist />}
            />

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
              {/* Type Of Slot */}
              <Route
                path={`/${pages.typeOfSlotListPath}`}
                element={<TypeOfSlorList />}
              />
              <Route
                path={`/${pages.addtypeOfSlotPath}`}
                element={<AddTypeOfSlot />}
              />
              <Route
                path={`/${pages.typeOfSlotEditPath}`}
                element={<EditTypeOfSlot />}
              />

              {/* Schedule */}
              <Route path={`/${pages.schedulePath}`} element={<Schedule />} />
              <Route
                path={`/${pages.scheduleBySlotID}`}
                element={<ScheduleBySlot />}
              />
              <Route path={`/${pages.bookingDetailPath}`} element={<BookingDetailList />} />
            </Route>
          </Route>
        </Route>
        <Route index path={`/${pages.landingPage}`} element={<LandingPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
