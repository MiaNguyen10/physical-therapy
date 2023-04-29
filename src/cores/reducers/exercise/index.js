import { createSlice } from "@reduxjs/toolkit";
import {
  addExercise,
  deleteExercise,
  editExercise,
  getExerciseDetail,
  getExerciseList
} from "../../thunk/exercise";

const initialState = {
  status: "idle",
  error: "",
  exercises: [],
  exerciseDetail: {},
};

const exerciseSlice = createSlice({
  name: "exercise",
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExerciseList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getExerciseList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.exercises = action.payload;
      })
      .addCase(getExerciseList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addExercise.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addExercise.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addExercise.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getExerciseDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getExerciseDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.exerciseDetail = action.payload;
      })
      .addCase(getExerciseDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editExercise.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteExercise.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteExercise.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(deleteExercise.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetStatus } = exerciseSlice.actions;
export default exerciseSlice.reducer;
export const getExercises = (state) => state.exercise.exercises;
export const getExercise = (state) => state.exercise.exerciseDetail;
export const getStatusExercises = (state) => state.exercise.status;
