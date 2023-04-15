import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../reducers/category/index";
import authReducer from "../reducers/authentication/index";
import exerciseReducer from "../reducers/exercise/index";
import exerciseDetailReducer from "../reducers/exerciseDetail/index";
import exerciseResourceReducer from "../reducers/exerciseResource/index";
import slotReducer from "../reducers/slot/index";
import userReducer from "../reducers/user/index";
import physiotherapistReducer from "cores/reducers/physiotherapist/index";
import typeOfSlotReducer from "cores/reducers/typeOfSlot/index"
import scheduleReducer from "cores/reducers/schedule/index"

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    auth: authReducer,
    exercise: exerciseReducer,
    exerciseDetail: exerciseDetailReducer,
    exerciseResource: exerciseResourceReducer,
    slot: slotReducer,
    user: userReducer,
    physiotherapist: physiotherapistReducer,
    typeOfSlot: typeOfSlotReducer,
    schedule: scheduleReducer,
  },
});
