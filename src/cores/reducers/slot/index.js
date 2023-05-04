import { createSlice } from "@reduxjs/toolkit";
import {
  addSlot,
  deleteSlot,
  editSlot,
  getSlotDetail,
  getSlotList
} from "../../thunk/slot";

const initialState = {
  status: "idle",
  error: "",
  slots: [],
  slotDetail: {},
};

const slotSlice = createSlice({
  name: "slot",
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSlotList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSlotList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.slots = action.payload;
      })
      .addCase(getSlotList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addSlot.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addSlot.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addSlot.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getSlotDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSlotDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.slotDetail = action.payload;
      })
      .addCase(getSlotDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editSlot.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.slotDetail = action.payload;
      })
      .addCase(editSlot.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteSlot.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteSlot.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(deleteSlot.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetStatus } = slotSlice.actions;
export default slotSlice.reducer;
export const getSlots = (state) => state.slot.slots;
export const getSlot = (state) => state.slot.slotDetail
export const getStatusSlots = (state) => state.slot.status;
