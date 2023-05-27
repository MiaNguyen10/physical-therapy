import { TextField } from "@mui/material";
import {
  LocalizationProvider,
  MobileDateTimePicker,
  DateTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import React from "react";

dayjs.locale("vi");

const DateTimePickerInput = ({
  disablePast,
  disabled,
  value,
  onChange,
  error,
  sx,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
      <MobileDateTimePicker
        disablePast={disablePast ?? false}
        closeOnSelect
        disabled={disabled}
        format="DD/MM/YYYY HH:mm"
        value={dayjs(value)}
        onChange={onChange}
        sx={{ ...sx }}
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

export default DateTimePickerInput;
