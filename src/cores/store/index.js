import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../reducers/category/index";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
  },
});