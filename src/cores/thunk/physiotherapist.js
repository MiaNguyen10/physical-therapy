import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPhysiotherapistList = createAsyncThunk(
  "category/getPhysiotherapistList",
  async (token) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/Physiotherapist`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  }
);
