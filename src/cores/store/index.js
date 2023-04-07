import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../reducers/category/index";
import exerciseReducer from "../reducers/exercise/index";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    exercise: exerciseReducer,
  },
});
