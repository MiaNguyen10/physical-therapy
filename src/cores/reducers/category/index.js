import { createSlice } from "@reduxjs/toolkit";
import {
  addCategory,
  deleteCategory,
  editCategory,
  getCategoryDetail,
  getCategoryList,
} from "../../thunk/category";

const initialState = {
  status: "idle",
  error: "",
  categories: [],
  categoryDetail: {},
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCategoryList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(getCategoryList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getCategoryDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCategoryDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categoryDetail = action.payload;
      })
      .addCase(getCategoryDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetStatus } = categorySlice.actions;
export default categorySlice.reducer;
export const getCategories = (state) => state.category.categories;
export const getCategory = (state) => state.category.categoryDetail;
export const getStatusCategory = (state) => state.category.status;
