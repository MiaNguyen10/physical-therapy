import { createAsyncThunk } from "@reduxjs/toolkit";

export const getScheduleList = createAsyncThunk(
  "schedule/getScheduleList",
  async (token) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/Schedule`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  }
);

export const editSchedule = createAsyncThunk(
  "schedule/editSchedule",
  async (data) => {
    const { input, token } = data;
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/Schedule`,
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

export const deleteSchedule = createAsyncThunk(
  "schedule/deleteSchedule",
  async (data) => {
    const { id, token } = data;
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/Schedule/${id}`,
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

export const getScheduleBySlotID = createAsyncThunk(
  "schedule/getScheduleBySlotID",
  async (data) => {
    const { slotID, token } = data;
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/Schedule/getBySlotID/${slotID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json()
  }
);
