import { createSlice } from "@reduxjs/toolkit";
import { getRole, login, resetPassword } from "../../thunk/auth";
import { tokenDecoder } from "../tokenDecoder";

const initialState = {
  access_token: undefined,
  token_type: undefined,
  status: "idle",
  errorCode: undefined,
  firstName: undefined,
  role: undefined,
};

const defautAuthState = {
  access_token: "",
  token_type: "",
  status: "idle",
  errorCode: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  username: "",
  expires_in: 0,
  userID: "",
};

const preloadState = JSON.parse(localStorage.getItem("authentication"));

export const authenSlice = createSlice({
  name: "authentication",
  initialState: preloadState ?? initialState,
  reducers: {
    logout(state) {
      state.access_token = initialState.sessionId;
      state.token_type = initialState.token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "requesting";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "idle";
        state.access_token = action.payload.result.access_token;
        state.token_type = action.payload.result.token_type;
        state.firstName = action.payload.result.firstName;
        state.role = action.payload.result.role.name;
        state.userID = action.payload.result.userID;

        localStorage.setItem("authentication", JSON.stringify(state));
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.errorCode = action.error;
      })
      .addCase(getRole.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getRole.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.role = action.payload.name;

        localStorage.setItem("role", JSON.stringify(state.role));
      })
      .addCase(getRole.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //* reset password
      .addCase(resetPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        console.log("success");
        state.status = "succeeded";
        console.log(action.payload);
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { logout } = authenSlice.actions;
export default authenSlice.reducer;

export const selectToken = (state) => state.auth.access_token;
export const selectState = (state) => {
  if (!state.auth.access_token) {
    return defautAuthState;
  }

  const tokenData = tokenDecoder(state.auth.access_token);

  return {
    ...state.auth,
    ...tokenData,
  };
};
export const getUserRole = (state) => state.auth.role;
export const selectUserId = (state) => state.auth.userID;
