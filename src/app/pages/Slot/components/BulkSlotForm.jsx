import { yupResolver } from "@hookform/resolvers/yup";
import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import DatePickerInput from "app/components/Input/DatePicker";
import TimePickerInput from "app/components/Input/TimePicker";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import pages from "../../../config/pages";
import { getSlots } from "cores/reducers/slot";
import { useSelector } from "react-redux";

export const makeStyles = () => ({
  textFieldStyle: {
    width: "520px",
    ".MuiOutlinedInput-root": {
      height: 50,
      "& fieldset": {
        borderColor: "",
      },
      "&.Mui-disabled": {
        cursor: "default",
      },

      ".Mui-disabled": {
        cursor: "default",
      },
    },
    // ".MuiSelect-select": {
    //   marginTop: 1,
    // },
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
const BulkSlotForm = ({ slotDetail, onFormSubmit, isLoading }) => {
  const styles = makeStyles();
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const slotList = useSelector(getSlots);
  const [typeOfBulk, setTypeOfBulk] = useState("day");
  const [numberOfSlot, setNumberOfSlot] = useState(1);
  const slotDuration = 1; // in hour
  const slotGap = 0.5; // in hour
  const [slotsInDay, setSlotsInDay] = useState([1]);
  const current =
    dayjs(new Date()).hour() + 3 > 24
      ? dayjs(new Date()).add(1, "day").set("minute", 0).set("hour", 0)
      : dayjs(new Date());

  const [dateStart, setDateStart] = useState(
    current.minute() !== 0
      ? current.set("m", 0).add(slotDuration, "hour")
      : current
  );
  const [dateEnd, setDateEnd] = useState(
    dateStart.add(slotDuration + slotGap, "hour")
  );

  const schema = yup.object({
    slotName: yup.string().required("Vui lòng điền thông tin"),
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
      dateStart: dateStart,
      dateEnd: dateEnd,
      timeStart: dateStart,
      timeEnd: dateEnd,
      available: true,
    },
  });

  const handleChangeNumberSlots = (event) => {
    setNumberOfSlot(event.target.value);
  };

  const handleChangeBulkType = (event) => {
    setTypeOfBulk(event.target.value);
  };

  const onSubmit = (data) => {
    let listCreate = [];
    let index = 0;

    switch (typeOfBulk) {
      case "day":
        index = 0;
        for (let s = 0; s < numberOfSlot; s++) {
          const start = dayjs(dateStart).add(
            (slotDuration + slotGap) * s,
            "hours"
          );
          const end = dayjs(start).add(1, "hours");
          const name = `${data.slotName} (${start.format(
            "DD/MM/YYYY - HH:mm"
          )})`;
          listCreate.push({
            index: index,
            slotName: name,
            timeStart: start.toISOString(),
            timeEnd: end.toISOString(),
            available: true,
            isDeleted: false,
            dateCreated: new Date().toISOString(),
            dateUpdated: new Date().toISOString(),
            status: "pending",
          });
          index++;
        }
        break;
      case "week":
        // let numberDate = dateEnd.diff(dateStart) / (1000 * 60 * 60 * 24);
        index = 0;
        for (let d = 0; d < 7; d++) {
          const tmpDate = dateStart.add(d, "days");
          for (let s = 0; s < numberOfSlot; s++) {
            const start = dayjs(tmpDate).add(
              (slotDuration + slotGap) * s,
              "hours"
            );
            const end = dayjs(start).add(1, "hours");
            const name = `${data.slotName} (${start.format(
              "DD/MM/YYYY - HH:mm"
            )})`;
            listCreate.push({
              index: index,
              slotName: name,
              timeStart: start,
              timeEnd: end,
              available: true,
              isDeleted: false,
              dateCreated: new Date().toISOString(),
              dateUpdated: new Date().toISOString(),
              status: "pending",
            });
            index++;
          }
        }
    }
    console.log(listCreate);
    onFormSubmit({ listCreate });
  };

  useEffect(() => {
    reset({
      slotName: slotDetail?.slotName,
      timeStart: slotDetail?.timeStart,
      timeEnd: slotDetail?.timeEnd,
      available: slotDetail?.available,
    });
  }, [slotDetail, reset, getValues]);

  useEffect(() => {
    let start = dayjs(dateStart).get("h");
    start >= 23 && (start = 0);
    let numSlots = (1440 - start * 60) / ((slotDuration + slotGap) * 60);
    console.log(start, numSlots);
    if (numSlots > 0 && numSlots < 100) {
      let sList = [];
      for (let i = 0; i < numSlots; i++) {
        sList.push(i + 1);
      }
      setSlotsInDay(sList);
      setNumberOfSlot(1);
    }
  }, [slotDuration, reset, control, slotDetail, getValues, dateStart]);

  useEffect(() => {
    switch (typeOfBulk) {
      case "day":
        setDateEnd(
          dateStart.add(
            (numberOfSlot || 0) * (slotDuration + slotGap) - slotGap,
            "hours"
          )
        );
        break;
      case "week":
        setDateEnd(
          dateStart
            .add(1, "week")
            .add(
              (numberOfSlot || 0) * (slotDuration + slotGap) - slotGap,
              "hours"
            )
        );
    }
  }, [dateStart, numberOfSlot, typeOfBulk]);

  return (
    <Container
      sx={{ width: "100%", display: "flex", justifyContent: "center" }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Backdrop open={isLoading} sx={{ zIndex: 9 }}>
          <CircularProgress />
        </Backdrop>
        <Stack
          alignItems="flex-start"
          pt={3}
          spacing={4}
          justifyContent="space-between"
          sx={{ width: "100%" }}
        >
          <Stack
            direction={"row"}
            spacing={2}
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
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
                  label="Mẫu tên cho buổi điều trị"
                  placeholder={'Tên cho từng buổi: "Mẫu tên (ngày - giờ)"'}
                  variant="outlined"
                />
              )}
            />
            <FormControl
              required
              sx={{
                ...styles.textFieldStyle,
                width: "24%",
                marginLeft: "0 !important",
              }}
            >
              <InputLabel id="ns-select-label">Số buổi trong ngày</InputLabel>
              <Select
                required
                labelId="ns-select-label"
                id="ns-select"
                value={numberOfSlot}
                label="Số buổi trong ngày"
                onChange={handleChangeNumberSlots}
                sx={{
                  marginTop: "0 !important",
                  height: "50px",
                }}
              >
                {slotsInDay.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              required
              sx={{
                ...styles.textFieldStyle,
                width: "24%",
                marginLeft: "0 !important",
              }}
            >
              <InputLabel id="b-select-label">Kiểu thêm</InputLabel>
              <Select
                required
                labelId="b-select-label"
                id="b-select"
                value={typeOfBulk}
                label="Kiểu thêm"
                onChange={handleChangeBulkType}
                sx={{ height: "50px" }}
              >
                <MenuItem value={"day"}>Theo Ngày</MenuItem>
                <MenuItem value={"week"}>Theo Tuần</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Stack
            direction={"row"}
            spacing={2}
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <Container
              spacing={2}
              sx={{
                width: "50%",
                display: "flex",
                justifyContent: "space-between",
                paddingLeft: "0px !important",
                paddingRight: "0px !important",
              }}
            >
              <Stack
                direction={"column"}
                spacing={2}
                justifyContent="flex-start"
                sx={{ width: "64%" }}
              >
                <label required style={{ fontWeight: "bold", top: -25 }}>
                  Ngày bắt đầu
                </label>
                <DatePickerInput
                  disabled={false}
                  value={dateStart ?? ""}
                  onChange={(value) => {
                    setDateStart(dayjs(value));
                  }}
                  sx={{ ...styles.textFieldStyle, width: "100%" }}
                  error={""}
                />
              </Stack>
              <Stack
                direction={"column"}
                spacing={2}
                justifyContent="flex-start"
                sx={{ width: "35%" }}
              >
                <label required style={{ fontWeight: "bold", top: -25 }}>
                  Giờ bắt đầu
                </label>
                <TimePickerInput
                  disabled={false}
                  value={dateStart ?? ""}
                  onChange={(value) => {
                    setDateStart(dayjs(value));
                  }}
                  sx={{ ...styles.textFieldStyle, width: "100%" }}
                  error={""}
                />
              </Stack>
            </Container>
            <Container
              spacing={2}
              sx={{
                width: "50%",
                display: "flex",
                justifyContent: "space-between",
                paddingLeft: "0px !important",
                paddingRight: "0px !important",
              }}
            >
              <Stack
                direction={"column"}
                spacing={2}
                justifyContent="flex-end"
                sx={{ width: "64%" }}
              >
                <label required style={{ fontWeight: "bold", top: -25 }}>
                  Ngày kết thúc
                </label>
                <DatePickerInput
                  disabled={true}
                  value={dateEnd ?? ""}
                  onChange={(value) => {
                    setDateStart(dayjs(value));
                  }}
                  sx={{ ...styles.textFieldStyle, width: "100%" }}
                  error={""}
                />
              </Stack>
              <Stack
                direction={"column"}
                spacing={2}
                justifyContent="flex-end"
                sx={{ width: "35%" }}
              >
                <label required style={{ fontWeight: "bold", top: -25 }}>
                  Giờ kết thúc
                </label>
                <TimePickerInput
                  disabled={true}
                  value={dateEnd ?? ""}
                  onChange={(value) => {
                    setDateStart(dayjs(value));
                  }}
                  sx={{ ...styles.textFieldStyle, width: "100%" }}
                  error={""}
                />
              </Stack>
            </Container>
          </Stack>
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
              Tạo
            </Button>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
};

export default BulkSlotForm;
