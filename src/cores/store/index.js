import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../reducers/category/index";
import exerciseReducer from "../reducers/exercise/index";
import exerciseDetailReducer from "../reducers/exerciseDetail/index";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    exercise: exerciseReducer,
    exerciseDetail: exerciseDetailReducer,
  },
});
