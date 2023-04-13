import { yupResolver } from '@hookform/resolvers/yup'
import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Stack,
  TextField,
} from '@mui/material'
import DateTimePickerInput from 'app/components/Input/DateTimePicker'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import pages from '../../../config/pages'

const ITEM_HEIGHT = 30
const ITEM_PADDING_TOP = 5
const ITEM_DISPLAY_ON_SELECT = 4

const makeStyles = () => ({
  textFieldStyle: {
    width: '520px',
    '.MuiOutlinedInput-root': {
      height: 50,
      '& fieldset': {
        borderColor: '',
      },
    },
    '.MuiSelect-select': {
      marginTop: 1,
    },
    '.MuiInputLabel-root': {
      zIndex: 0,
      top: '-25px',
      fontSize: '16px',
      fontWeight: 700,
      color: '#333333',
      WebkitTransform: 'none',
      span: {
        color: '#D93A39',
      },
      '&.Mui-focused': {
        color: '#333333',
      },
      '&.Mui-error': {
        color: '#333333',
      },
    },
    '.MuiOutlinedInput-notchedOutline': {
      legend: {
        maxWidth: 0,
      },
    },
  },
})

const SlotForm = ({ slotDetail, onFormSubmit, isLoading }) => {
  const styles = makeStyles()
  const navigate = useNavigate()

  const schema = yup.object({
    slotName: yup.string().required('Vui lòng điền thông tin'),
    timeStart: yup.string().required('Vui lòng điền thông tin'),
    timeEnd: yup.string().required('Vui lòng điền thông tin'),
  })

  const {
    handleSubmit,
    formState: { errors: formErrors },
    control,
    reset,
    getValues,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
      slotName: '',
      timeStart: '',
      timeEnd: '',
      available: true,
    },
  })

  const onSubmit = (data) => {
    console.log(data)
    onFormSubmit(data)
  }

  useEffect(() => {
    reset({
      slotName: slotDetail?.slotName,
      timeStart: slotDetail?.timeStart,
      timeEnd: slotDetail?.timeEnd,
      available: slotDetail?.available,
    })
  }, [slotDetail, reset, getValues])

  const [selectedDate, setSelectedDate] = useState(new Date())

  return (
    <Container sx={{ width: '50%', display: 'flex' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Backdrop open={isLoading} sx={{ zIndex: 9 }}>
          <CircularProgress />
        </Backdrop>
        <Stack alignItems="flex-start" pt={3} spacing={5}>
          <Controller
            control={control}
            name="slotName"
            render={({ field: { onChange, value } }) => (
              <TextField
                sx={styles.textFieldStyle}
                value={value}
                onChange={onChange}
                error={!!formErrors?.slotName}
                helperText={formErrors?.slotName?.message}
                required
                inputProps={{ required: false, maxLength: 255 }}
                label="Tên slot"
                variant="outlined"
              />
            )}
          />

          <Controller
            name="timeStart"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <React.Fragment>
                <label required style={{ fontWeight: 'bold', top: -25 }}>
                  Thời gian bắt đầu
                </label>
                <DateTimePickerInput
                  value={value ?? ''}
                  onChange={onChange}
                  sx={styles.textFieldStyle}
                  error={error}
                />
              </React.Fragment>
            )}
          />

          <Controller
            name="timeEnd"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <React.Fragment>
                <label required style={{ fontWeight: 'bold', top: -25 }}>
                  Thời gian kết thúc
                </label>
                <DateTimePickerInput
                  value={value ?? ''}
                  onChange={onChange}
                  sx={styles.textFieldStyle}
                  error={error}
                />
              </React.Fragment>
            )}
          />
          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={2}
            sx={{ width: '100%' }}
          >
            <Button
              variant="outlined"
              onClick={() => navigate(pages.slotListPath)}
              disabled={isLoading}
            >
              Hủy bỏ
            </Button>
            <Button variant="contained" disabled={isLoading} type="submit">
              Lưu thông tin
            </Button>
          </Stack>
        </Stack>
      </form>
    </Container>
  )
}

export default SlotForm
