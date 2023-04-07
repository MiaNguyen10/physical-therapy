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
  Box,
} from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import pages from "../../../config/pages";
import ReactPlayer from "react-player";

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

const ExerciseResourceForm = ({
  exerciseResourceDetail,
  onFormSubmit,
  isLoading,
  exerciseDetails,
}) => {
  const styles = makeStyles();
  const navigate = useNavigate();

  const schema = yup.object({
    resourceName: yup.string().required("Vui lòng điền thông tin"),
    exerciseDetailID: yup.string().required("Vui lòng điền thông tin"),
    imageURL: yup.string().required("Vui lòng điền thông tin"),
    videoURL: yup.string().required("Vui lòng điền thông tin"),
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
      resourceName: "",
      exerciseDetailID: "",
      imageURL: "",
      videoURL: "",
    },
  });

  const onSubmit = (data) => onFormSubmit(data);

  useEffect(() => {
    reset({
      resourceName: exerciseResourceDetail?.resourceName,
      exerciseDetailID: exerciseResourceDetail?.exerciseDetailID,
      imageURL: exerciseResourceDetail?.imageURL,
      videoURL: exerciseResourceDetail?.videoURL,
    });
  }, [exerciseResourceDetail, reset, getValues]);

  return (
    <Container sx={{ width: "50%", display: "flex" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Backdrop open={isLoading} sx={{ zIndex: 9 }}>
          <CircularProgress />
        </Backdrop>
        <Stack alignItems="flex-start" pt={3} spacing={5}>
          <Controller
            control={control}
            name="resourceName"
            render={({ field: { onChange, value } }) => (
              <TextField
                sx={styles.textFieldStyle}
                value={value}
                onChange={onChange}
                error={!!formErrors?.resourceName}
                helperText={formErrors?.resourceName?.message}
                required
                inputProps={{ required: false, maxLength: 255 }}
                label="Tên tài nguyên của bài tập"
                variant="outlined"
              />
            )}
          />

          <Controller
            control={control}
            name="imageURL"
            render={({ field: { onChange, value } }) => (
              <React.Fragment>
                <TextField
                  sx={styles.textFieldStyle}
                  value={value}
                  onChange={onChange}
                  error={!!formErrors?.imageURL}
                  helperText={formErrors?.imageURL?.message}
                  required
                  inputProps={{ required: false, maxLength: 255 }}
                  label="Hình ảnh"
                  variant="outlined"
                />
                <Box component='img' src={value} />
              </React.Fragment>
            )}
          />

          <Controller
            control={control}
            name="videoURL"
            render={({ field: { onChange, value } }) => (
              <React.Fragment>
                <TextField
                  sx={styles.textFieldStyle}
                  value={value}
                  onChange={onChange}
                  error={!!formErrors?.videoURL}
                  helperText={formErrors?.videoURL?.message}
                  required
                  inputProps={{ required: false, maxLength: 255 }}
                  label="Video"
                  variant="outlined"
                />
                <ReactPlayer url={value} controls={true} />
              </React.Fragment>
            )}
          />

          <Controller
            control={control}
            name="exerciseDetailID"
            render={({ field: { onChange, value } }) => (
              <React.Fragment>
                <label required style={{ fontWeight: "bold", top: -25 }}>
                  Chi Tiết Bài tập
                </label>
                <Select
                  sx={styles.selectFieldStyle}
                  value={value}
                  onChange={onChange}
                  error={!!formErrors?.exerciseDetailID}
                  helperText={formErrors?.exerciseDetailID?.message}
                  required
                  inputProps={{ required: false, maxLength: 255 }}
                  variant="outlined"
                  label="Chi Tiết Bài tập"
                  id="demo-simple-select-label"
                >
                  {exerciseDetails.map((cate) => (
                    <MenuItem value={cate.exerciseDetailID}>
                      {cate.detailName}
                    </MenuItem>
                  ))}
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
              onClick={() => navigate(pages.exerciseResourceListPath)}
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

export default ExerciseResourceForm;
