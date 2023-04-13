import { createSlice } from "@reduxjs/toolkit";
import { getPhysiotherapistList } from "cores/thunk/physiotherapist";

const initialState = {
  status: "idle",
  error: "",
  physiotherapists: [],
};

const physiotherapistSlice = createSlice({
  name: "physiotherapist",
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPhysiotherapistList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPhysiotherapistList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.physiotherapists = action.payload;
      })
      .addCase(getPhysiotherapistList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetStatus } = physiotherapistSlice.actions;
export default physiotherapistSlice.reducer;
export const getPhysiotherapists = (state) => state.physiotherapist.physiotherapists;
export const getStatusPhysioTherapist = (state) => state.physiotherapist.status;
