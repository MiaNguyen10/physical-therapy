import { yupResolver } from "@hookform/resolvers/yup";
import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Stack,
  TextField,
} from "@mui/material";
import { DateTimePicker } from "@mui/lab";
import { LocalizationProvider } from "@mui/lab";
import DateFnsAdapter from "@mui/lab/AdapterDateFns";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import pages from "../../../config/pages";

const ITEM_HEIGHT = 30;
const ITEM_PADDING_TOP = 5;
const ITEM_DISPLAY_ON_SELECT = 4;

const makeStyles = () => ({
  textFieldStyle: {
    width: "520px",
    ".MuiOutlinedInput-root": {
      height: 50,
      "& fieldset": {
        borderColor: "",
      },
    },
    ".MuiSelect-select": {
      marginTop: 1,
    },
    ".MuiInputLabel-root": {
      zIndex: 0,
      top: "-25px",
      fontSize: "16px",
      fontWeight: 700,
      color: "#333333",
      WebkitTransform: "none",
      span: {
        color: "#D93A39",
      },
      "&.Mui-focused": {
        color: "#333333",
      },
      "&.Mui-error": {
        color: "#333333",
      },
    },
    ".MuiOutlinedInput-notchedOutline": {
      legend: {
        maxWidth: 0,
      },
    },
  },
});

const SlotForm = ({ slotDetail, onFormSubmit, isLoading }) => {
  const styles = makeStyles();
  const navigate = useNavigate();

  const schema = yup.object({
    slotName: yup.string().required("Vui lòng điền thông tin"),
    description: yup.string().required("Vui lòng điền thông tin"),
    timeStart: yup.string().required("Vui lòng điền thông tin"),
    timeEnd: yup.string().required("Vui lòng điền thông tin"),
    price: yup.string().required("Vui lòng điền thông tin"),
  });

  const {
    handleSubmit,
    formState: { errors: formErrors },
    control,
    reset,
    getValues,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      slotName: "",
      description: "",
      timeStart: "",
      timeEnd: "",
      price: "",
      available: true,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    onFormSubmit(data);
  };

  useEffect(() => {
    reset({
      slotName: slotDetail?.slotName,
      description: slotDetail?.description,
      price: slotDetail?.price,
      timeStart: slotDetail?.timeStart,
      timeEnd: slotDetail?.timeEnd,
      available: slotDetail?.available,
    });
  }, [slotDetail, reset, getValues]);

  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Container sx={{ width: "50%", display: "flex" }}>
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
            control={control}
            name="price"
            render={({ field: { onChange, value } }) => (
              <TextField
                sx={styles.textFieldStyle}
                value={value}
                onChange={onChange}
                error={!!formErrors?.price}
                helperText={formErrors?.price?.message}
                required
                inputProps={{ required: false, maxLength: 255 }}
                label="Giá tiền"
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

          {/* <Controller
            control={control}
            name="timeStart"
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={DateFnsAdapter}>
                <DateTimePicker
                  label="Select Date and Time"
                  value={value}
                  onChange={onChange}
                  ampm={false}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            )}
          />

          <Controller
            control={control}
            name="timeEnd"
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={DateFnsAdapter}>
                <DateTimePicker
                  label="Select Date and Time"
                  value={selectedDate}
                  minDateTime={new Date("2023-04-01T00:00")}
                  maxDateTime={new Date("2023-04-30T23:59")}
                  ampm={false}
                  showTodayButton
                  onChange={(newValue) => {
                    setSelectedDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            )}
          /> */}

          <Controller
            control={control}
            name="timeStart"
            render={({ field: { onChange, value } }) => (
              <TextField
                sx={styles.textFieldStyle}
                value={value}
                onChange={onChange}
                error={!!formErrors?.timeStart}
                helperText={formErrors?.timeStart?.message}
                required
                inputProps={{ required: false, maxLength: 255 }}
                label="Thời gian bắt đầu"
                variant="outlined"
              />
            )}
          />

          <Controller
            control={control}
            name="timeEnd"
            render={({ field: { onChange, value } }) => (
              <TextField
                sx={styles.textFieldStyle}
                value={value}
                onChange={onChange}
                error={!!formErrors?.timeEnd}
                helperText={formErrors?.timeEnd?.message}
                required
                inputProps={{ required: false, maxLength: 255 }}
                label="Thời gian kết thúc"
                variant="outlined"
              />
            )}
          />

          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={2}
            sx={{ width: "100%" }}
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
  );
};

export default SlotForm;
