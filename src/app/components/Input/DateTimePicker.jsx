import { TextField } from '@mui/material'
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import 'dayjs/locale/en'
import React from 'react'

dayjs.locale('en')

const DateTimePickerInput = ({ value, onChange, error, sx }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
      <MobileDateTimePicker
        openTo="hours"
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
  )
}

export default DateTimePickerInput
