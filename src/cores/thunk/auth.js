import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "authentication/login",
  async (inputLogin, { rejectWithValue }) => {
    try {
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
      if (response.status < 400)
        return await response.json();
      else
        return rejectWithValue("Có sự cố xảy ra trong quá trình đăng nhập");
    } catch (e) {
      return rejectWithValue("Tài khoản hoặc mật khẩu không đúng");
    }
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
