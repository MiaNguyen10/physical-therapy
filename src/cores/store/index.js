import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../reducers/category/index";
import authReducer from "../reducers/authentication/index"

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    auth: authReducer,
  },
});