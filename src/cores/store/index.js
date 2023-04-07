import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../reducers/category/index";
import authReducer from "../reducers/authentication/index";
import exerciseReducer from "../reducers/exercise/index";
import exerciseDetailReducer from "../reducers/exerciseDetail/index";
import exerciseResourceReducer from "../reducers/exerciseResource/index";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    auth: authReducer,
    exercise: exerciseReducer,
    exerciseDetail: exerciseDetailReducer,
    exerciseResource: exerciseResourceReducer,
  },
});
