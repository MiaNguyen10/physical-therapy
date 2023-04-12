import { createSlice } from "@reduxjs/toolkit";
import {
  addExerciseResource,
  deleteExerciseResource,
  getExerciseResourceDetail,
  getExerciseResourceList
} from "../../thunk/exerciseResource";

const initialState = {
  status: "idle",
  error: "",
  exerciseResources: [],
  exerciseResource: {},
};

const exerciseResourceSlice = createSlice({
  name: "exerciseResource",
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = "idel";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExerciseResourceList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getExerciseResourceList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.exerciseResources = action.payload;
      })
      .addCase(getExerciseResourceList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addExerciseResource.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addExerciseResource.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addExerciseResource.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getExerciseResourceDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getExerciseResourceDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.exerciseResourceDetail = action.payload;
      })
      .addCase(getExerciseResourceDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteExerciseResource.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteExerciseResource.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(deleteExerciseResource.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetStatus } = exerciseResourceSlice.actions;
export default exerciseResourceSlice.reducer;
export const getExerciseResources = (state) => state.exerciseResource.exerciseResources;
export const getExerciseResource = (state) => state.exerciseResource.exerciseResourceDetail;
export const getStatus = (state) => state.exerciseResource.status;
