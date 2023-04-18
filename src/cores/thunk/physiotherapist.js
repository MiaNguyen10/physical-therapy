import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPhysiotherapistList = createAsyncThunk(
  "physiotherapist/getPhysiotherapistList",
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

export const addPhysiotherapist = createAsyncThunk(
  "physiotherapist/addPhysiotherapist",
  async (data) => {
    const { physiotherapist, token } = data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/User/Register-Physiotherapist`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...physiotherapist,
        }),
      }
    );
    return await response.json();
  }
);
