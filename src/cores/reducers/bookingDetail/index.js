import { createSlice } from "@reduxjs/toolkit";
import {
  addBookingDetail,
  deleteBookingDetail,
  editBookingDetail,
  getBookingDetailDetail,
  getBookingDetailList
} from "../../thunk/bookingDetail";

const initialState = {
  status: "idle",
  error: "",
  bookingDetails: [],
  bookingDetailDetail: {},
};

const bookingDetailSlice = createSlice({
  name: "bookingDetail",
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBookingDetailList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBookingDetailList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookingDetails = action.payload;
      })
      .addCase(getBookingDetailList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addBookingDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addBookingDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addBookingDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getBookingDetailDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBookingDetailDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookingDetailDetail = action.payload;
      })
      .addCase(getBookingDetailDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editBookingDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteBookingDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteBookingDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(deleteBookingDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetStatus } = bookingDetailSlice.actions;
export default bookingDetailSlice.reducer;
export const getBookingDetails = (state) => state.bookingDetail.bookingDetails;
export const getBookingDetail = (state) => state.bookingDetail.bookingDetailDetail;
export const getStatusBookingDetails = (state) => state.bookingDetail.status;
