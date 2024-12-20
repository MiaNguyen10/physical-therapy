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

  // const startOfDay = dayjs(slotDetail?.timeStart).startOf("day");
  // const endOfDay = dayjs(slotDetail?.timeStart).endOf("day");

  const schema = yup.object({
    slotName: yup.string().required("Vui lòng điền thông tin"),
    timeStart: yup
      .string()
      .required("Vui lòng điền thông tin"),
      // .test(
      //   "is-valid-start-time",
      //   "Thời gian bắt đầu phải từ 5 giờ sáng đến 11 giờ tối",
      //   function (value) {
      //     const startTime = dayjs(value, "HH:mm");
      //     const startBoundary = dayjs("05:00", "HH:mm");
      //     const endBoundary = dayjs("23:00", "HH:mm");
      //     return (
      //       startTime.isSameOrAfter(startBoundary) &&
      //       startTime.isSameOrBefore(endBoundary)
      //     );
      //   }
      // ),
    timeEnd: yup
      .string()
      .required("Vui lòng điền thông tin")
      // .test(
      //   "is-valid-time-end",
      //   "Thời gian kết thúc phải từ 5 AM đến 11 PM",
      //   function (value) {
      //     const endTime = dayjs(value, "h:mm A").format("HH:mm");
      //     return (
      //       dayjs(endTime, "HH:mm").isSameOrAfter(dayjs("05:00", "HH:mm")) &&
      //       dayjs(endTime, "HH:mm").isSameOrBefore(dayjs("23:00", "HH:mm"))
      //     );
      //   }
      // )
      // .test(
      //   "is-valid-end-time",
      //   "Thời gian kết thúc phải từ 5 giờ sáng đến 11 giờ tối",
      //   function (value) {
      //     const endTime = dayjs(value, "HH:mm");
      //     const startBoundary = dayjs("05:00", "HH:mm");
      //     const endBoundary = dayjs("23:00", "HH:mm");
      //     return (
      //       endTime.isSameOrAfter(startBoundary) &&
      //       endTime.isSameOrBefore(endBoundary)
      //     );
      //   }
      // )
      .test(
        "is-greater",
        "Thời gian kết thúc phải sau thời gian bắt đầu",
        function (value) {
          const { timeStart } = this.parent;
          return dayjs(value).isAfter(dayjs(timeStart));
        }
      )
      .test(
        "is-same-day",
        "Thời gian kết thúc phải trong cùng một ngày với thời gian bắt đầu",
        function (value) {
          const { timeStart } = this.parent;
          return dayjs(value).isSame(dayjs(timeStart), "day");
        }
      )
      .test(
        "is-at-least-one-hour-later",
        "Thời gian kết thúc phải ít nhất 1 giờ sau thời gian bắt đầu",
        function (value) {
          const { timeStart } = this.parent;
          const timeStartPlusOneHour = dayjs(timeStart)
            .add(1, "hour")
            .subtract(1, "minute");
          return dayjs(value).isAfter(timeStartPlusOneHour);
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
                label="Tên buổi điều trị"
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
