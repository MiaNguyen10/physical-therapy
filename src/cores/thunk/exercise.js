import { createAsyncThunk } from "@reduxjs/toolkit";

// const jwtToken =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJkNDI1ZGY2Yi1kMTdhLTRlZjAtOWIwNS05ZmQ5NTdmNTk5YjQiLCJFbWFpbCI6Im5ndXllbmhhdGhpZW4yNTEyQGdtYWlsLmNvbSIsIkZ1bGxOYW1lIjoiVGhpw6puIiwiVXNlck5hbWUiOiJhZG1pbjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsIlBob25lTnVtYmVyIjoiMDk0MTg2NjAyNCIsImV4cCI6MTY4MTE0OTU1MCwiaXNzIjoiTmhhdF9Mb25nIiwiYXVkIjoiTmhhdF9Mb25nIn0.GGxcLC-BnLkl1LOq7J-BJBdSCnviUpm4JeCmNcNRBSg"; // Replace with your actual JWT token

const jwtToken= (JSON.parse(localStorage.getItem("authentication"))).access_token

export const getExerciseList = createAsyncThunk(
  "exercise/getExerciseList",
  async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/Exercise`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        },
      }
    );  
    return await response.json();
  }
);

export const addExercise = createAsyncThunk(
  "exercise/addExercise",
  async (inputCreate) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/Exercise`,
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

export const editExercise = createAsyncThunk(
  "exercise/editExercise",
  async (inputUpdate) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/Exercise`,
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

export const getExerciseDetail = createAsyncThunk(
  "exercise/getExerciseDetail",
  async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/Exercise/${id}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    return await response.json();
  }
);

export const deleteExercise = createAsyncThunk(
  "exercise/deleteExercise",
  async (exerciseID) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/Exercise/${exerciseID}`,
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
