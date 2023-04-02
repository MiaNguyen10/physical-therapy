import { TextField } from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/en";
import React, { useState } from "react";

dayjs.locale("en");

const DatePickerInput = ({ value, onChange, error, sx }) => {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="en"
    >
      <MobileDatePicker
        inputFormat="dd/mm/YYYY"
        value={value}
        onChange={onChange}
        closeOnSelect
        sx={{...sx}}
        renderInput={(params) => (
          <TextField
            {...params}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DatePickerInput;
