import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "authentication/login",
  async (inputLogin) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/User/Login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...inputLogin,
        }),
      }
    );
    return await response.json();
  }
);

export const getRole = createAsyncThunk(
  "authentication/getRole",
  async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/User/getUserRole/${id}`
    );
    return await response.json();
  }
);

export const resetPassword = createAsyncThunk(
  "/resetPassword",
  async ({ email }) => {
    const res = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/User/RecoveryPassword?email=${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await res.json();
  }
);
