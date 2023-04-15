import { createSlice } from "@reduxjs/toolkit";
import { deleteSchedule } from "cores/thunk/schedule";

const initialState = {
  status: "idle",
  error: "",
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteSchedule.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteSchedule.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deleteSchedule.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetStatus } = scheduleSlice.actions;
export default scheduleSlice.reducer;
export const getStatus = (state) => state.schedule.status;
