import ClearIcon from '@mui/icons-material/Clear'
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material'
import DatePickerInput from 'app/components/Input/DatePicker'
import { makeStyles } from 'app/pages/Category/components/CategoryForm'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'

const SearchSlotListForm = ({
  onSearch,
  rangeDate,
  setRangeDate,
  setUnique,
}) => {
  const styles = makeStyles()
  const { handleSubmit, control } = useForm({
    defaultValues: {
      searchKey: '',
    },
  })

  const handleStartDateChange = (value) => {
    if (value.toString() !== 'Invalid Date')
      setRangeDate((prev) => ({ ...prev, startDate: value }))
    else setRangeDate((prev) => ({ ...prev, startDate: null }))
  }

  const handleEndDateChange = (value) => {
    if (value.toString() !== 'Invalid Date')
      setRangeDate((prev) => ({ ...prev, endDate: value }))
    else setRangeDate((prev) => ({ ...prev, endDate: null }))
  }

  const onSubmit = (data) => {
    onSearch(data)
    setUnique(Math.random())
  }

  return (
    <Stack
      onSubmit={handleSubmit(onSubmit)}
      direction="row"
      component="form"
      alignItems="center"
      spacing={3}
    >
      <Controller
        control={control}
        name="searchKey"
        render={({ field: { onChange, value } }) => (
          <TextField
            sx={{
              ...styles.textFieldStyle,
              width: '380px',
            }}
            placeholder="Nhập tên slot cần tìm"
            label="Slot"
            value={value}
            onChange={onChange}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => onChange('')}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />

      <DatePickerInput
        label="Ngày bắt đầu"
        value={rangeDate.startDate}
        onChange={handleStartDateChange}
      />
      <DatePickerInput
        label="Ngày kết thúc"
        value={rangeDate.endDate}
        onChange={handleEndDateChange}
      />

      <Button
        type="submit"
        variant="outlined"
        sx={{ height: '45px', width: '80px' }}
      >
        Tìm
      </Button>
    </Stack>
  )
}

export default SearchSlotListForm
