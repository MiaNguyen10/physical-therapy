import { createAsyncThunk } from "@reduxjs/toolkit";

const jwtToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJkNDI1ZGY2Yi1kMTdhLTRlZjAtOWIwNS05ZmQ5NTdmNTk5YjQiLCJFbWFpbCI6Im5ndXllbmhhdGhpZW4yNTEyQGdtYWlsLmNvbSIsIkZ1bGxOYW1lIjoiVGhpw6puIiwiVXNlck5hbWUiOiJhZG1pbjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsIlBob25lTnVtYmVyIjoiMDk0MTg2NjAyNCIsImV4cCI6MTY4MTA3MTA1MiwiaXNzIjoiTmhhdF9Mb25nIiwiYXVkIjoiTmhhdF9Mb25nIn0.yCbn5z2vttxScmg6juHTS_TJ5X3ZC2UjCyX6oo5K03w"; // Replace with your actual JWT token

export const getSlotList = createAsyncThunk(
  "slot/getSlotList",
  async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/Slot`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    return await response.json();
  }
);

export const addSlot = createAsyncThunk(
  "slot/addSlot",
  async (inputCreate) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/Slot/Create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          ...inputCreate,
        }),
      }
    );
    return await response.json();
  }
);

export const editSlot = createAsyncThunk(
  "slot/editSlot",
  async (inputUpdate) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/Slot`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          ...inputUpdate,
        }),
      }
    );
    return await response.json();
  }
);

export const getSlotDetail = createAsyncThunk(
  "slot/getSlotDetail",
  async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/Slot/${id}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    return await response.json();
  }
);

export const deleteSlot = createAsyncThunk(
  "slot/deleteSlot",
  async (slotID) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/Slot/${slotID}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    return await response.json();
  }
);
