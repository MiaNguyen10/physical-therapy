import { createAsyncThunk } from "@reduxjs/toolkit";

const jwtToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI0OWM0MWNiYS02YzQwLTQ3YTUtOTc4ZC04NmE2MWM5Njg0MTUiLCJFbWFpbCI6Im5ndXllbmhhdGhpZW4yNTEyQGdtYWlsLmNvbSIsIkZ1bGxOYW1lIjoiVGhpw6puIiwiVXNlck5hbWUiOiJhZG1pbjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsIlBob25lTnVtYmVyIjoiMDk0MTg2NjAyNCIsImV4cCI6MTY4MDkzMTk3MywiaXNzIjoiTmhhdF9Mb25nIiwiYXVkIjoiTmhhdF9Mb25nIn0.1epqkLDGpFp8KxloBxs8R9kqhoJSsyONC8wBj79DOJM"; // Replace with your actual JWT token

export const getExerciseDetailList = createAsyncThunk(
  "exerciseDetail/getExerciseDetailList",
  async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/ExerciseDetail`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    return await response.json();
  }
);

export const addExerciseDetail = createAsyncThunk(
  "exerciseDetail/addExerciseDetail",
  async (inputCreate) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/ExerciseDetail`,
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

export const editExerciseDetail = createAsyncThunk(
  "exerciseDetail/editExerciseDetail",
  async (inputUpdate) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/ExerciseDetail`,
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

export const getExerciseDetailDetail = createAsyncThunk(
  "exerciseDetail/getExerciseDetailDetail",
  async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/ExerciseDetail/${id}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    return await response.json();
  }
);

export const deleteExerciseDetail = createAsyncThunk(
  "exerciseDetail/deleteExerciseDetail",
  async (exerciseDetailID) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/ExerciseDetail/${exerciseDetailID}`,
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
