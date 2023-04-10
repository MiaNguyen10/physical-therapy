import { createAsyncThunk } from "@reduxjs/toolkit";

export const getExerciseDetailList = createAsyncThunk(
  "exerciseDetail/getExerciseDetailList",
  async (token) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/ExerciseDetail`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  }
);

export const addExerciseDetail = createAsyncThunk(
  "exerciseDetail/addExerciseDetail",
  async (data) => {
    const { excerciseDetail, token } = data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/ExerciseDetail/Create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...excerciseDetail,
        }),
      }
    );
    return await response.json();
  }
);

export const editExerciseDetail = createAsyncThunk(
  "exerciseDetail/editExerciseDetail",
  async (data) => {
    const { excerciseDetail, token } = data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/ExerciseDetail`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...excerciseDetail,
        }),
      }
    );
    return await response.json();
  }
);

export const getExerciseDetailById = createAsyncThunk(
  "exerciseDetail/getExerciseDetailById",
  async (data) => {
    const { id, token } = data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/ExerciseDetail/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  }
);

export const deleteExerciseDetail = createAsyncThunk(
  "exerciseDetail/deleteExerciseDetail",
  async (data) => {
    const { exerciseDetailID, token } = data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/ExerciseDetail/${exerciseDetailID}`,
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
