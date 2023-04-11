import { createAsyncThunk } from "@reduxjs/toolkit";

export const getExerciseList = createAsyncThunk(
  "exercise/getExerciseList",
  async (token) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/Exercise`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  }
);

export const addExercise = createAsyncThunk(
  "exercise/addExercise",
  async (data) => {
    const { excercise, token } = data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/Exercise`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...excercise,
        }),
      }
    );
    return await response.json();
  }
);

export const editExercise = createAsyncThunk(
  "exercise/editExercise",
  async (data) => {
    const { excercise, token } = data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/Exercise`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...excercise,
        }),
      }
    );
    return await response.json();
  }
);

export const getExerciseDetail = createAsyncThunk(
  "exercise/getExerciseDetail",
  async (data) => {
    const { id, token } = data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/Exercise/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  }
);

export const deleteExercise = createAsyncThunk(
  "exercise/deleteExercise",
  async (data) => {
    const { exerciseID, token } = data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/Exercise/${exerciseID}`,
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
