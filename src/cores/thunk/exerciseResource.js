import { createAsyncThunk } from "@reduxjs/toolkit";

export const getExerciseResourceList = createAsyncThunk(
  "exerciseResource/getExerciseResourceList",
  async (data) => {
    const {idDetail, token} = data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/ExerciseResource/GetByExerciseDetailId/${idDetail}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  }
);

export const addExerciseResource = createAsyncThunk(
  "exerciseResource/addExerciseResource",
  async (data) => {
    const { exerciseResource, token } = data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/ExerciseResource/Create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...exerciseResource,
        }),
      }
    );
    return await response.json();
  }
);

export const editExerciseResource = createAsyncThunk(
  "exerciseResource/editExerciseResource",
  async (data) => {
    const { exerciseResource, token } = data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/ExerciseResource`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...exerciseResource,
        }),
      }
    );
    return await response.json();
  }
);

export const getExerciseResourceDetail = createAsyncThunk(
  "exerciseResource/getExerciseResourceDetail",
  async (data) => {
    const { id, token } = data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/ExerciseResource/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  }
);

export const deleteExerciseResource = createAsyncThunk(
  "exerciseResource/deleteExerciseResource",
  async (data) => {
    const {exerciseResourceID, token} = data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/ExerciseResource/${exerciseResourceID}`,
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
