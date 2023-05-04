import { createSlice } from "@reduxjs/toolkit";
import { addTypeOfSlot, deleteTypeOfSlot, getTypeOfSlotDetail, getTypeOfSlotList } from "cores/thunk/typeOfSlot";

const initialState = {
  status: "idle",
  error: "",
  typeOfSlotList: [],
  typeOfSlotDetail: {},
};

const typeOfSlotSlice = createSlice({
  name: "typeOfSlot",
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTypeOfSlotList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTypeOfSlotList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.typeOfSlotList = action.payload;
      })
      .addCase(getTypeOfSlotList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTypeOfSlot.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTypeOfSlot.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addTypeOfSlot.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getTypeOfSlotDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTypeOfSlotDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.typeOfSlotDetail = action.payload;
      })
      .addCase(getTypeOfSlotDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteTypeOfSlot.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTypeOfSlot.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(deleteTypeOfSlot.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetStatus } = typeOfSlotSlice.actions;
export default typeOfSlotSlice.reducer;
export const getList = (state) => state.typeOfSlot.typeOfSlotList
export const getStatus = (state) => state.typeOfSlot.status;
export const getDetail = (state) => state.typeOfSlot.typeOfSlotDetail
