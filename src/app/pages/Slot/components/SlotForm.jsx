import { yupResolver } from "@hookform/resolvers/yup";
import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Stack,
  TextField,
} from "@mui/material";
import DateTimePickerInput from "app/components/Input/DateTimePicker";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import pages from "../../../config/pages";

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

  const startOfDay = dayjs(slotDetail?.timeStart).startOf("day");
  const endOfDay = dayjs(slotDetail?.timeStart).endOf("day");

  const schema = yup.object({
    slotName: yup.string().required("Vui lòng điền thông tin"),
    timeStart: yup.string().required("Vui lòng điền thông tin"),
    timeEnd: yup
      .string()
      .required("Vui lòng điền thông tin")
      .test(
        "is-greater",
        "Thời gian kết thúc phải sau thời gian bắt đầu",
        function (value) {
          const { timeStart } = this.parent;
          console.log(timeStart)
          return dayjs(value).isAfter(dayjs(timeStart));
        }
      )
      .test(
        "is-same-day",
        "Thời gian kết thúc phải trong cùng một ngày với thời gian bắt đầu",
        function (value) {
          const { timeStart } = this.parent;
          return dayjs(value).isBetween(startOfDay, endOfDay, null, "[]");
        }
      ),
  });

  const {
    handleSubmit,
    formState: { errors: formErrors },
    control,
    reset,
    getValues,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema), // <-- use the schema with yupResolver
    defaultValues: {
      slotName: "",
      timeStart: dayjs(new Date()),
      timeEnd: dayjs(new Date()),
      available: true,
    },
  });

  const onSubmit = (data) => {
    onFormSubmit(data);
  };

  useEffect(() => {
    reset({
      slotName: slotDetail?.slotName,
      timeStart: slotDetail?.timeStart,
      timeEnd: slotDetail?.timeEnd,
      available: slotDetail?.available,
    });
  }, [slotDetail, reset, getValues]);

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
            name="timeStart"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <React.Fragment>
                <label required style={{ fontWeight: "bold", top: -25 }}>
                  Thời gian bắt đầu
                </label>
                <DateTimePickerInput
                  value={value ?? ""}
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
                <label required style={{ fontWeight: "bold", top: -25 }}>
                  Thời gian kết thúc
                </label>
                <DateTimePickerInput
                  value={value ?? ""}
                  onChange={onChange}
                  sx={styles.textFieldStyle}
                  error={error || !!formErrors.timeEnd} // <-- show formErrors.timeEnd as well
                />
                {formErrors.timeEnd && (
                  <p style={{ color: "#f44336", fontSize: "0.75rem" }}>
                    {formErrors.timeEnd.message}
                  </p>
                )}
              </React.Fragment>
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
