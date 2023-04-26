import { createAsyncThunk } from "@reduxjs/toolkit";

export const getFeedbackList = createAsyncThunk(
  "feedback/getFeedbackList",
  async (token) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/Feedback`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  }
);
