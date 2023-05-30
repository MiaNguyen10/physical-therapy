import { yupResolver } from '@hookform/resolvers/yup'
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
} from '@mui/material'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

export const makeStyles = () => ({
  textFieldStyle: {
    width: '500px',
    '.MuiOutlinedInput-root': {
      height: 45,
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

const CategoryForm = ({ categoryDetail, onFormSubmit, isLoading, onClose }) => {
  const styles = makeStyles()

  const schema = yup.object({
    categoryName: yup.string().required('Vui lòng điền thông tin'),
    description: yup.string().required('Vui lòng điền thông tin'),
    // iconUrl: yup.string().required('Vui lòng đính kèm ảnh'),
  })

  const {
    handleSubmit,
    formState: { errors: formErrors },
    control,
    reset,
    getValues,
    watch,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
      categoryName: '',
      description: '',
      iconUrl: '',
    },
  })

  const onSubmit = (data) => onFormSubmit(data)

  useEffect(() => {
    reset({
      categoryName: categoryDetail?.categoryName,
      description: categoryDetail?.description,
      iconUrl: categoryDetail?.iconUrl,
    })
  }, [categoryDetail, reset, getValues])

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Backdrop open={isLoading} sx={{ zIndex: 9 }}>
        <CircularProgress />
      </Backdrop>
      <Stack alignItems="center" pt={3} spacing={5}>
        <Controller
          control={control}
          name="categoryName"
          render={({ field: { onChange, value } }) => (
            <TextField
              sx={styles.textFieldStyle}
              value={value}
              onChange={onChange}
              error={!!formErrors?.categoryName}
              helperText={formErrors?.categoryName?.message}
              required
              inputProps={{ required: false, maxLength: 255 }}
              label="Tên tình trạng"
              variant="outlined"
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <TextField
              sx={styles.textFieldStyle}
              value={value}
              onChange={onChange}
              error={!!formErrors?.description}
              helperText={formErrors?.description?.message}
              required
              inputProps={{ required: false, maxLength: 255 }}
              label="Mô tả"
              variant="outlined"
            />
          )}
        />

        {watch('iconUrl') ? (
          <Box
            component="img"
            sx={{
              height: '50%',
              width: '50%',
            }}
            alt="image"
            src={watch('iconUrl')}
          />
        ) : null}
        <Controller
          control={control}
          name="iconUrl"
          render={({ field: { onChange, value } }) => (
            <TextField
              sx={styles.textFieldStyle}
              value={value}
              onChange={onChange}
              error={!!formErrors?.iconUrl}
              helperText={formErrors?.iconUrl?.message}
              placeholder="Không bắt buộc điền"
              // required
              inputProps={{ required: false }}
              label="Đường link của Icon"
              variant="outlined"
              // hidden
            />
          )}
        />

        <Stack
          direction="row"
          justifyContent="flex-end"
          spacing={2}
          sx={{ width: '100%' }}
        >
          <Button variant="outlined" onClick={onClose} disabled={isLoading}>
            Hủy bỏ
          </Button>
          <Button variant="contained" disabled={isLoading} type="submit">
            Lưu thông tin
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}

export default CategoryForm
