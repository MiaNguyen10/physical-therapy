import { createAsyncThunk } from "@reduxjs/toolkit";

const jwtToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI0OWM0MWNiYS02YzQwLTQ3YTUtOTc4ZC04NmE2MWM5Njg0MTUiLCJFbWFpbCI6Im5ndXllbmhhdGhpZW4yNTEyQGdtYWlsLmNvbSIsIkZ1bGxOYW1lIjoiVGhpw6puIiwiVXNlck5hbWUiOiJhZG1pbjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsIlBob25lTnVtYmVyIjoiMDk0MTg2NjAyNCIsImV4cCI6MTY4MDkzMTk3MywiaXNzIjoiTmhhdF9Mb25nIiwiYXVkIjoiTmhhdF9Mb25nIn0.1epqkLDGpFp8KxloBxs8R9kqhoJSsyONC8wBj79DOJM"; // Replace with your actual JWT token

export const getExerciseResourceList = createAsyncThunk(
  "exerciseResource/getExerciseResourceList",
  async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/ExerciseResource`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    return await response.json();
  }
);

export const addExerciseResource = createAsyncThunk(
  "exerciseResource/addExerciseResource",
  async (inputCreate) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/ExerciseResource/Create`,
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

export const editExerciseResource = createAsyncThunk(
  "exerciseResource/editExerciseResource",
  async (inputUpdate) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/ExerciseResource`,
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

export const getExerciseResourceDetail = createAsyncThunk(
  "exerciseResource/getExerciseResourceDetail",
  async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/ExerciseResource/${id}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    return await response.json();
  }
);

export const deleteExerciseResource = createAsyncThunk(
  "exerciseResource/deleteExerciseResource",
  async (exerciseResourceID) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/ExerciseResource/${exerciseResourceID}`,
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
