import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserList = createAsyncThunk(
  "user/getUserList",
  async (token) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/User`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  }
);

export const addUser = createAsyncThunk(
  "user/addUser",
  async (data) => {
    const { user, token } = data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/User/Register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...user,
        }),
      }
    );
    return await response.json();
  }
);

export const addPhysiotherapist = createAsyncThunk(
  "user/addUser",
  async (data) => {
    const { physiotherapist, token } = data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/User/Register-Physiotherapist`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...physiotherapist,
        }),
      }
    );
    return await response.json();
  }
);

export const editUser = createAsyncThunk(
  "user/editUser",
  async (data) => {
    const { user, token } = data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/User`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...user,
        }),
      }
    );
    return await response.json();
  }
);

export const getUserDetail = createAsyncThunk(
  "user/getUserDetail",
  async (data) => {
    const { id, token } = data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/User/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (data) => {
    const { userID, token } = data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/User/${userID}`,
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
