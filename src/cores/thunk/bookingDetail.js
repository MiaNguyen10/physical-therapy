import { createAsyncThunk } from "@reduxjs/toolkit";

export const getBookingDetailList = createAsyncThunk(
  "bookingDetail/getBookingDetailList",
  async (token) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/BookingDetail`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  }
);

export const addBookingDetail = createAsyncThunk(
  "bookingDetail/addBookingDetail",
  async (data) => {
    const { excercise, token } = data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/BookingDetail`,
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

export const editBookingDetail = createAsyncThunk(
  "bookingDetail/editBookingDetail",
  async (data) => {
    const { excercise, token } = data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/BookingDetail`,
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

export const getBookingDetailDetail = createAsyncThunk(
  "bookingDetail/getBookingDetailDetail",
  async (data) => {
    const { id, token } = data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/BookingDetail/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  }
);

export const deleteBookingDetail = createAsyncThunk(
  "bookingDetail/deleteBookingDetail",
  async (data) => {
    const { bookingDetailID, token } = data
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/BookingDetail/${bookingDetailID}`,
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
