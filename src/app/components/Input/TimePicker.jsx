import { TextField } from "@mui/material";
import { LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import React from "react";

dayjs.locale("vi");

const TimePickerInput = ({ disabled, value, onChange, error, sx }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
      <MobileTimePicker
        // disablePast
        closeOnSelect
        format="HH:mm"
        disabled={disabled}
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

export default TimePickerInput;
