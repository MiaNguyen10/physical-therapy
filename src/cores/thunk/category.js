import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCategoryList = createAsyncThunk(
  "category/getCategoryList",
  async () => {
    const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/Category`);
    console.log(response.json())
    return await response.json();
  }
);

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (inputCreate) => {
    const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/Category`, {
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
    const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/Category`, {
      method: "PUT",
      headers: {},
      ...inputUpdate,
    });
    return await response.json();
  }
);

export const getCategoryDetail = createAsyncThunk(
  "category/getCategoryDetail",
  async (categoryID) => {
    const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/Category/${categoryID}`, {
      method: "GET",
    });
    return await response.json();
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (categoryID) => {
    const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/Category/${categoryID}`, {
      method: "DELETE",
    });
    return await response.json();
  }
);