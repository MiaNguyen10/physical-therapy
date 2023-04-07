import { createSlice } from "@reduxjs/toolkit";
import {
  addExercise,
  deleteExercise,
  getExerciseDetail,
  getExerciseList
} from "../../thunk/exercise";

const initialState = {
  status: "idle",
  error: "",
  exercises: [],
};

const exerciseSlice = createSlice({
  name: "exercise",
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = "idel";
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
        state.exerciseDetail = action;
        console.log(action)
      })
      .addCase(getExerciseDetail.rejected, (state, action) => {
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
export const getStatus = (state) => state.exercise.status;
