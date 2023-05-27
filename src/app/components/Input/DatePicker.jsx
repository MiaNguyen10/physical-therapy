import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import React from "react";

dayjs.locale("vi");

const DatePickerInput = ({
  disablePast,
  disabled,
  value,
  onChange,
  sx,
  error,
  label,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
      <DatePicker
        disablePast={disablePast?? false}
        closeOnSelect
        format="DD/MM/YYYY"
        value={value}
        disabled={disabled}
        onChange={onChange}
        sx={{ ...sx }}
        label={label}
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
