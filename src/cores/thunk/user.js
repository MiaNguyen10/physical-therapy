import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserList = createAsyncThunk(
  "user/getUserList",
  async (token) => {
    const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/User`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  }
);

export const addUser = createAsyncThunk("user/addUser", async (data) => {
  const { user, token } = data;
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
});

export const addAdmin = createAsyncThunk("user/addAdmin", async (data) => {
  const { user, token } = data;
  const response = await fetch(
    `${process.env.REACT_APP_API_ENDPOINT}/User/Register-admin`,
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
});

export const addPhysiotherapist = createAsyncThunk(
  "user/addPhysiotherapist",
  async (data) => {
    const { user, token } = data;
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/User/Register-Physiotherapist`,
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

export const addStaff = createAsyncThunk("user/addStaff", async (data) => {
  const { user, token } = data;
  const response = await fetch(
    `${process.env.REACT_APP_API_ENDPOINT}/User/Register-Staff`,
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
});

export const editUser = createAsyncThunk("user/editUser", async (data) => {
  const { user, token } = data;
  const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/User`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ...user,
    }),
  });
  return await response.json();
});

export const getUserDetail = createAsyncThunk(
  "user/getUserDetail",
  async (data) => {
    const { id, token } = data;
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/User/getById/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  }
);

export const banUser = createAsyncThunk("user/deleteUser", async (data) => {
  const { userID, token } = data;
  const response = await fetch(
    `${process.env.REACT_APP_API_ENDPOINT}/User/BanUser/${userID}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
});

export const unBanUser = createAsyncThunk("user/unBanUser", async (data) => {
  const { userID, token } = data;
  const response = await fetch(
    `${process.env.REACT_APP_API_ENDPOINT}/User/unBanUser/${userID}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
});
