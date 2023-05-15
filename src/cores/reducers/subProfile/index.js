import { createSlice } from "@reduxjs/toolkit";
import {
  addSubProfile,
  deleteSubProfile,
  editSubProfile,
  getSubProfileDetail,
  // getSubProfileList,
  getSubProfileByID,
  getSubProfileListByID,
} from "../../thunk/subProfile";

const initialState = {
  status: "idle",
  error: "",
  subProfiles: [],
  subProfileDetail: {},
  subProfile: {},
  subProfileList: [],
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
      // .addCase(getSubProfileList.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(getSubProfileList.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   state.subProfiles = action.payload;
      // })
      // .addCase(getSubProfileList.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.error = action.error.message;
      // })
      .addCase(getSubProfileListByID.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSubProfileListByID.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.subProfileList = action.payload;
      })
      .addCase(getSubProfileListByID.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getSubProfileByID.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSubProfileByID.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.subProfile = action.payload;
      })
      .addCase(getSubProfileByID.rejected, (state, action) => {
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
