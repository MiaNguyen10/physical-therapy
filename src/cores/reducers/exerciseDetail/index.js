import { createSlice } from "@reduxjs/toolkit";
import {
  addExerciseDetail,
  deleteExerciseDetail,
  getExerciseDetailById,
  getExerciseDetailListByID,
} from "../../thunk/exerciseDetail";

const initialState = {
  status: "idle",
  error: "",
  exerciseDetail: {},
  exerciseDetailList: [],
};

const exerciseDetailSlice = createSlice({
  name: "exerciseDetail",
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = "idel";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addExerciseDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addExerciseDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addExerciseDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getExerciseDetailListByID.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getExerciseDetailListByID.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.exerciseDetailList = action.payload;
      })
      .addCase(getExerciseDetailListByID.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getExerciseDetailById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getExerciseDetailById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.exerciseDetail = action.payload;
      })
      .addCase(getExerciseDetailById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteExerciseDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteExerciseDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(deleteExerciseDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetStatus } = exerciseDetailSlice.actions;
export default exerciseDetailSlice.reducer;
export const getExerciseDetailsList = (state) =>
  state.exerciseDetail.exerciseDetailList;
export const getEDetailById = (state) => state.exerciseDetail.exerciseDetail;
export const getStatus = (state) => state.exerciseDetail.status;
