import { createSlice } from "@reduxjs/toolkit";
import { getFeedbackList } from "cores/thunk/feedback";

const initialState = {
  status: "idle",
  error: "",
  feebackList: [],
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedbackList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getFeedbackList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.feebackList = action.payload;
      })
      .addCase(getFeedbackList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetStatus } = feedbackSlice.actions;
export default feedbackSlice.reducer;
export const getAllFeedback = (state) => state.feedback.feebackList;
export const getFeedbackStatus = (state) => state.feedback.status;
