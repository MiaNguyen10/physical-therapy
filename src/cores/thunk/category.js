import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCategoryList = createAsyncThunk(
  "category/getCategoryList",
  async () => {
    const response = await fetch(`https://localhost:7166/api/Category`);
    return await response.json();
  }
);

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (inputCreate) => {
    const response = await fetch(`https://localhost:7166/api/Category`, {
      method: "POST",
      headers: {},
      ...inputCreate,
    });
    return await response.json();
  }
);

export const editCategory = createAsyncThunk(
  "category/editCategory",
  async (inputUpdate) => {
    const response = await fetch(`https://localhost:7166/api/Category`, {
      method: "PUT",
      headers: {},
      ...inputUpdate,
    });
    return await response.json();
  }
);

export const getCategoryDetail = createAsyncThunk(
  "category/getCategoryDetail",
  async (id) => {
    const response = await fetch(`https://localhost:7166/api/Category/${id}`, {
      method: "GET",
    });
    return await response.json();
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id) => {
    const response = await fetch(`https://localhost:7166/api/Category/${id}`, {
      method: "DELETE",
    });
    return await response.json();
  }
);