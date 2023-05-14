import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSubProfileList = createAsyncThunk(
  "subProfile/getSubProfileList",
  async (token) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/SubProfile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  }
);

// export const addSubProfile = createAsyncThunk(
//   "subProfile/addSubProfile",
//   async (data) => {
//     const { subProfile, token } = data
//     const response = await fetch(
//       `${process.env.REACT_APP_API_ENDPOINT}/SubProfile/Create`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           ...subProfile,
//         }),
//       }
//     );
//     return await response.json();
//   }
// );

export const addSubProfile = createAsyncThunk(
  "subProfile/addSubProfile",
  async (data) => {
    const { subProfile, token, userID, subName } = data;
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/SubProfile/Create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...subProfile,
          subName: subName,
          userID: userID
        }),
      }
    );
    return await response.json();
  }
);

export const getSubProfileListByID = createAsyncThunk(
  "exerciseDetail/getSubProfileList",
  async (data) => {
    const { id, token } = data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/SubProfile/GetByUserID/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  }
);

export const editSubProfile = createAsyncThunk(
  "subProfile/editSubProfile",
  async (data) => {
    const { subProfile, token } = data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/SubProfile`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...subProfile,
        }),
      }
    );
    return await response.json();
  }
);

export const getSubProfileDetail = createAsyncThunk(
  "subProfile/getSubProfileDetail",
  async (data) => {
    const { id, token } = data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/SubProfile/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  }
);

export const deleteSubProfile = createAsyncThunk(
  "subProfile/deleteSubProfile",
  async (data) => {
    const { subProfileID, token } = data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/SubProfile/${subProfileID}`,
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
