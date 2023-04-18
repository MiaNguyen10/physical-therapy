import { createSlice } from "@reduxjs/toolkit";
import { deleteSchedule, getScheduleBySlotID } from "cores/thunk/schedule";

const initialState = {
  status: "idle",
  error: "",
  scheduleList: [],
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    resetScheduleStatus(state) {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getScheduleBySlotID.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getScheduleBySlotID.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.scheduleList = action.payload;
      })
      .addCase(getScheduleBySlotID.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
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

export const {  resetScheduleStatus } = scheduleSlice.actions;
export default scheduleSlice.reducer;
export const getScheduleStatus = (state) => state.schedule.status;
export const getSchedule = (state) => state.schedule.scheduleList;
