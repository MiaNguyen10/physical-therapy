import { TextField } from "@mui/material";
import {
  LocalizationProvider,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import React from "react";

dayjs.locale("vi");

const TimePickerInput = ({ value, onChange, error, sx }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
      <MobileDateTimePicker
        format="HH:mm"
        value={dayjs(value)}
        onChange={onChange}
        closeOnSelect
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

export default TimePickerInput;
