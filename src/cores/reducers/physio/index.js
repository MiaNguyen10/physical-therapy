import { createSlice } from "@reduxjs/toolkit";
import { addPhysio, deletePhysio, editPhysio, getPhysioDetail } from "cores/thunk/physio";

const initialState = {
  status: "idle",
  error: "",
  physio: {},
};

const physioSlice = createSlice({
  name: "physio",
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPhysioDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPhysioDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.physio = action.payload;
      })
      .addCase(getPhysioDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addPhysio.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addPhysio.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addPhysio.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editPhysio.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deletePhysio.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePhysio.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(deletePhysio.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});


export const { resetStatus } = physioSlice.actions;
export default physioSlice.reducer;
export const getPhysio = (state) => state.physio.physio
export const getPhysioStatus = (state) => state.physio.status