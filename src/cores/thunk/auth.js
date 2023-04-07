import { createAsyncThunk } from '@reduxjs/toolkit'

export const login = createAsyncThunk(
  "äuthentication/login",
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