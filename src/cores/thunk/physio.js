import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPhysioDetail = createAsyncThunk(
  "physio/getPhysioDetail",
  async (data) => {
    const { id, token } = data;
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/Physiotherapist/GetPhysiotherapistByUserID?userID=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  }
);

export const addPhysio = createAsyncThunk("physio/addPhysio", async (data) => {
  const { input, token } = data;
  const response = await fetch(
    `${process.env.REACT_APP_API_ENDPOINT}/Physiotherapist/Create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...input,
      }),
    }
  );
  return await response.json();
});

export const editPhysio = createAsyncThunk(
  "physio/editPhysio",
  async (data) => {
    const { input, token } = data;
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/Physiotherapist`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...input,
        }),
      }
    );
    return await response.json();
  }
);

export const deletePhysio = createAsyncThunk(
  "physio/deletePhysio",
  async (data) => {
    const { id, token } = data;
    await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/Physiotherapist/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
);
