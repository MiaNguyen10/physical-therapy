import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSlotList = createAsyncThunk(
  "slot/getSlotList",
  async (token) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/Slot`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  }
);

export const addSlot = createAsyncThunk(
  "slot/addSlot",
  async (data) => {
    const { slot, token } = data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/Slot/Create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...slot,
        }),
      }
    );
    return await response.json();
  }
);

export const editSlot = createAsyncThunk(
  "slot/editSlot",
  async (data) => {
    const { slot, token } = data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/Slot`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...slot,
        }),
      }
    );
    return await response.json();
  }
);

export const getSlotDetail = createAsyncThunk(
  "slot/getSlotDetail",
  async (data) => {
    const { id, token } = data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/Slot/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  }
);

export const deleteSlot = createAsyncThunk(
  "slot/deleteSlot",
  async (data) => {
    const { id, token } = data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/Slot/${id}`,
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
