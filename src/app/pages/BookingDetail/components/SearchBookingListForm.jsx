import ClearIcon from "@mui/icons-material/Clear";
import { Button, MenuItem, Stack, TextField } from "@mui/material";
import DatePickerInput from "app/components/Input/DatePicker";
import { longTermStatuses, shortTermStatuses } from "app/constant/payment";
import { makeStyles } from "app/pages/Category/components/CategoryForm";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export const ALL_STATUS_SHORT_TERM = -1;
export const ALL_STATUS_LONG_TERM = -2;
const SearchBookingListForm = ({
  onSearch,
  rangeDate,
  setRangeDate,
  setUnique,
}) => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      longTermStatus: ALL_STATUS_LONG_TERM,
      shortTermStatus: ALL_STATUS_SHORT_TERM,
    },
  });
  const styles = makeStyles();

  const handleStartDateChange = (value) => {
    if (value.toString() !== "Invalid Date")
      setRangeDate((prev) => ({ ...prev, startDate: value }));
    else setRangeDate((prev) => ({ ...prev, startDate: null }));
  };

  const handleEndDateChange = (value) => {
    if (value.toString() !== "Invalid Date")
      setRangeDate((prev) => ({ ...prev, endDate: value }));
    else setRangeDate((prev) => ({ ...prev, endDate: null }));
  };

  const onSubmit = (data) => {
    console.log(data);
    onSearch(data);
    setUnique(Math.random());
  };

  return (
    <Stack
      onSubmit={handleSubmit(onSubmit)}
      direction='row'
      component='form'
      alignItems='center'
      spacing={3}
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <DatePickerInput
        disablePast={false}
        disabled={false}
        label='Từ ngày'
        value={rangeDate.startDate ?? ""}
        onChange={handleStartDateChange}
        sx={undefined}
        error={undefined}
      />
      <DatePickerInput
        disablePast={false}
        disabled={false}
        label='Đến ngày'
        value={rangeDate.endDate ?? ""}
        onChange={handleEndDateChange}
        sx={undefined}
        error={undefined}
      />
      <Controller
        control={control}
        name='longTermStatus'
        render={({ field: { onChange, value } }) => {
          return (
            <TextField
              sx={{
                ...styles.textFieldStyle,
                width: "180px",
              }}
              select
              onChange={onChange}
              value={value}
              variant='outlined'
              label='Trạng thái Dài hạn'
            >
              <MenuItem value={ALL_STATUS_LONG_TERM}>Tất cả</MenuItem>
              {longTermStatuses.map(({ id, status }) => (
                <MenuItem value={id} key={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          );
        }}
      />
      <Controller
        control={control}
        name='shortTermStatus'
        render={({ field: { onChange, value } }) => {
          return (
            <TextField
              sx={{
                ...styles.textFieldStyle,
                width: "180px",
              }}
              select
              onChange={onChange}
              value={value}
              variant='outlined'
              label='Trạng thái Ngắn hạn'
            >
              <MenuItem value={ALL_STATUS_SHORT_TERM}>Tất cả</MenuItem>
              {shortTermStatuses.map(({ id, status }) => (
                <MenuItem value={id} key={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          );
        }}
      />
      <Button
        type='submit'
        variant='outlined'
        sx={{
          height: "45px",
          width: "80px",
          fontWeight: "bold",
          boxShadow:
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
          fontSize: "1.2rem", // change this value to increase or decrease the font size
          padding: "10px 32px", // change this value to increase or decrease the padding
          border: "2px solid",
        }}
      >
        Tìm
      </Button>
    </Stack>
  );
};

export default SearchBookingListForm;
