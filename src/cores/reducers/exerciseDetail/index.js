import { createSlice } from "@reduxjs/toolkit";
import {
  addExerciseDetail,
  deleteExerciseDetail,
  getExerciseDetailDetail,
  getExerciseDetailList
} from "../../thunk/exerciseDetail";

const initialState = {
  status: "idle",
  error: "",
  exerciseDetails: [],
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
      .addCase(getExerciseDetailList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getExerciseDetailList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.exerciseDetails = action.payload;
      })
      .addCase(getExerciseDetailList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
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
      .addCase(getExerciseDetailDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getExerciseDetailDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.exerciseDetailDetail = action;
        console.log(action)
      })
      .addCase(getExerciseDetailDetail.rejected, (state, action) => {
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
export const getExerciseDetails = (state) => state.exerciseDetail.exerciseDetails;
export const getStatus = (state) => state.exerciseDetail.status;
