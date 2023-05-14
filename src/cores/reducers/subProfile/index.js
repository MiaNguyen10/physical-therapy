import { createSlice } from "@reduxjs/toolkit";
import {
  addSubProfile,
  deleteSubProfile,
  editSubProfile,
  getSubProfileDetail,
  getSubProfileList,
} from "../../thunk/subProfile";

const initialState = {
  status: "idle",
  error: "",
  subProfiles: [],
  subProfileDetail: {},
};

const subProfileSlice = createSlice({
  name: "subProfile",
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSubProfileList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSubProfileList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.subProfiles = action.payload;
      })
      .addCase(getSubProfileList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addSubProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addSubProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addSubProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getSubProfileDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSubProfileDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.subProfileDetail = action.payload;
      })
      .addCase(getSubProfileDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editSubProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteSubProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteSubProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(deleteSubProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetStatus } = subProfileSlice.actions;
export default subProfileSlice.reducer;
export const getSubProfiles = (state) => state.subProfile.subProfiles;
export const getSubProfilesList = (state) => state.subProfile.subProfileList;
export const getSubProfile = (state) => state.subProfile.subProfileDetail;
export const getSubProfileStatus = (state) => state.subProfile.status;
export const getStatus = (state) => state.subProfile.status;
