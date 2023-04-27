import { TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import dayjs from 'dayjs'
import 'dayjs/locale/en'
import React from 'react'

dayjs.locale('en')

const DatePickerInput = ({ value, onChange, sx, label }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        inputFormat="dd/mm/YYYY"
        value={value}
        onChange={(value) => onChange(value)}
        closeOnSelect
        sx={{ ...sx }}
        label={label}
        slotProps={{ textField: { size: 'small' } }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  )
}

export default DatePickerInput
