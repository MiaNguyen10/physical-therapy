import { yupResolver } from "@hookform/resolvers/yup";
import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Select,
  Stack,
  TextField,
  MenuItem,
} from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import pages from "../../../config/pages";

const makeStyles = () => ({
  textFieldStyle: {
    width: "500px",
    ".MuiOutlinedInput-root": {
      height: 44,
      "& fieldset": {
        borderColor: "",
      },
    },
    ".MuiInputBase-root": {
      marginTop: 0,
    },
    ".MuiSelect-root": {
      marginTop: 0,
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
  selectFieldStyle: {
    width: "500px",
    margin: "0",
    ".MuiOutlinedInput-root": {
      height: 44,
      "& fieldset": {
        borderColor: "",
      },
    },
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
    ".MuiOutlinedInput-notchedOutline": {
      legend: {
        maxWidth: 0,
      },
    },
  },
});

const ExerciseForm = ({
  exerciseDetail,
  onFormSubmit,
  isLoading,
  categories,
}) => {
  const styles = makeStyles();
  const navigate = useNavigate();

  const schema = yup.object({
    exerciseName: yup.string().required("Vui lòng điền thông tin"),
    categoryID: yup.string().required("Vui lòng điền thông tin"),
    exerciseTimePerWeek: yup.string().required("Vui lòng điền thông tin"),
    status: yup.string().required("Vui lòng điền thông tin"),
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
      exerciseName: "",
      categoryID: "",
      exerciseTimePerWeek: "",
      flag: true,
      status: true,
    },
  });

  const onSubmit = (data) => onFormSubmit(data);

  useEffect(() => {
    reset({
      exerciseName: exerciseDetail?.exerciseName,
      categoryID: exerciseDetail?.categoryID,
      exerciseTimePerWeek: exerciseDetail?.exerciseTimePerWeek,
      status: exerciseDetail?.status,
      flag: exerciseDetail?.flag,
    });
  }, [exerciseDetail, reset, getValues]);

  return (
    <Container sx={{ width: "50%", display: "flex" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Backdrop open={isLoading} sx={{ zIndex: 9 }}>
          <CircularProgress />
        </Backdrop>
        <Stack alignItems="flex-start" pt={3} spacing={5}>
          <Controller
            control={control}
            name="exerciseName"
            render={({ field: { onChange, value } }) => (
              <TextField
                sx={styles.textFieldStyle}
                value={value}
                onChange={onChange}
                error={!!formErrors?.exerciseName}
                helperText={formErrors?.exerciseName?.message}
                required
                inputProps={{ required: false, maxLength: 255 }}
                label="Tên bài tập"
                variant="outlined"
              />
            )}
          />

          <Controller
            control={control}
            name="exerciseTimePerWeek"
            render={({ field: { onChange, value } }) => (
              <TextField
                sx={styles.textFieldStyle}
                value={value}
                onChange={onChange}
                error={!!formErrors?.exerciseTimePerWeek}
                helperText={formErrors?.exerciseTimePerWeek?.message}
                required
                inputProps={{ required: false, maxLength: 255 }}
                label="Thời gian tập trong tuần"
                variant="outlined"
              />
            )}
          />

          <Controller
            control={control}
            name="categoryID"
            render={({ field: { onChange, value } }) => (
              <React.Fragment>
                <label required style={{ fontWeight: "bold", top: -25 }}>
                  Danh mục
                </label>
                <Select
                  sx={styles.selectFieldStyle}
                  value={value}
                  onChange={onChange}
                  error={!!formErrors?.categoryID}
                  helperText={formErrors?.categoryID?.message}
                  required
                  inputProps={{ required: false, maxLength: 255 }}
                  variant="outlined"
                  label="Danh mục"
                  id="demo-simple-select-label"
                >
                  {categories.map((cate) => (
                    <MenuItem value={cate.categoryID}>
                      {cate.categoryName}
                    </MenuItem>
                  ))}
                </Select>
              </React.Fragment>
            )}
          />

          <Controller
            control={control}
            name="status"
            render={({ field: { onChange, value } }) => (
              <React.Fragment>
                <label required style={{ fontWeight: "bold", top: -25 }}>
                  Trạng thái
                </label>
                <Select
                  sx={styles.selectFieldStyle}
                  value={value}
                  onChange={onChange}
                  error={!!formErrors?.status}
                  helperText={formErrors?.status?.message}
                  required
                  inputProps={{ required: false, maxLength: 255 }}
                  variant="outlined"
                  label="Trạng thái"
                  id="demo-simple-select-label"
                >
                  <MenuItem value={true}>Đang hoạt động</MenuItem>
                  <MenuItem value={false}>Ngừng hoạt động</MenuItem>
                </Select>
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
              onClick={() => navigate(pages.exerciseListPath)}
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

export default ExerciseForm;
