import { createAsyncThunk } from "@reduxjs/toolkit";

export const getTypeOfSlotList = createAsyncThunk(
  "typeOfSlot/getTypeOfSlotList",
  async (token) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/TypeOfSlot`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  }
);

export const addTypeOfSlot = createAsyncThunk(
  "typeOfSlot/addTypeOfSlot",
  async (data) => {
    const { input, token } = data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/TypeOfSlot/Create`,
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
  }
);

export const editTypeOfSlot = createAsyncThunk(
  "typeOfSlot/editTypeOfSlot",
  async (data) => {
    const { input, token } = data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/User`,
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

export const getTypeOfSlotDetail = createAsyncThunk(
  "typeOfSlot/getUserDetail",
  async (data) => {
    const { id, token } = data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/TypeOfSlot/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  }
);

export const deleteTypeOfSlot = createAsyncThunk(
  "typeOfSlot/deleteUser",
  async (data) => {
    const { id, token } = data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/TypeOfSlot/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  }
);
