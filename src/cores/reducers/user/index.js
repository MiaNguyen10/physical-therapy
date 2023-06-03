import { createSlice } from "@reduxjs/toolkit";
import {
  addAdmin,
  addPhysiotherapist,
  addStaff,
  addUser,
  banUser,
  editUser,
  getUserDetail,
  getUserList,
  unBanUser,
  fetchUserStatistic,
} from "../../thunk/user";

const initialState = {
  status: "idle",
  error: "",
  users: [],
  userDetail: {},
  userID: "",
  statistic: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(getUserList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addAdmin.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(addAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addPhysiotherapist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addPhysiotherapist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userID = action.payload;
      })
      .addCase(addPhysiotherapist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addStaff.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addStaff.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(addStaff.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getUserDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userDetail = action.payload;
      })
      .addCase(getUserDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(banUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(banUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(banUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(unBanUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(unBanUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(unBanUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUserStatistic.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserStatistic.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.statistic = action.payload;
      })
      .addCase(fetchUserStatistic.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
      
  },
});

export const { resetStatus } = userSlice.actions;
export default userSlice.reducer;
export const getUsers = (state) => state.user.users;
export const getUser = (state) => state.user.userDetail;
export const getUserStatus = (state) => state.user.status;
export const getUserStatistic = (state) => state.user.statistic;
