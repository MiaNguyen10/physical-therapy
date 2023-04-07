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

const ExerciseDetailForm = ({
  exerciseDetailDetail,
  onFormSubmit,
  isLoading,
  exercises,
}) => {
  const styles = makeStyles();
  const navigate = useNavigate();

  const schema = yup.object({
    detailName: yup.string().required("Vui lòng điền thông tin"),
    exerciseID: yup.string().required("Vui lòng điền thông tin"),
    set: yup.string().required("Vui lòng điền thông tin"),
    description: yup.string().required("Vui lòng điền thông tin"),
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
      detailName: "",
      exerciseID: "",
      set: "",
      description: "",
    },
  });

  const onSubmit = (data) => onFormSubmit(data);

  useEffect(() => {
    reset({
      detailName: exerciseDetailDetail?.detailName,
      exerciseID: exerciseDetailDetail?.exerciseID,
      set: exerciseDetailDetail?.set,
      description: exerciseDetailDetail?.description,
    });
  }, [exerciseDetailDetail, reset, getValues]);

  return (
    <Container sx={{ width: "50%", display: "flex" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Backdrop open={isLoading} sx={{ zIndex: 9 }}>
          <CircularProgress />
        </Backdrop>
        <Stack alignItems="flex-start" pt={3} spacing={5}>
          <Controller
            control={control}
            name="detailName"
            render={({ field: { onChange, value } }) => (
              <TextField
                sx={styles.textFieldStyle}
                value={value}
                onChange={onChange}
                error={!!formErrors?.detailName}
                helperText={formErrors?.detailName?.message}
                required
                inputProps={{ required: false, maxLength: 255 }}
                label="Tên bài tập"
                variant="outlined"
              />
            )}
          />

          <Controller
            control={control}
            name="set"
            render={({ field: { onChange, value } }) => (
              <TextField
                sx={styles.textFieldStyle}
                value={value}
                onChange={onChange}
                error={!!formErrors?.set}
                helperText={formErrors?.set?.message}
                required
                inputProps={{ required: false, maxLength: 255 }}
                label="Set"
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

          <Controller
            control={control}
            name="exerciseID"
            render={({ field: { onChange, value } }) => (
              <React.Fragment>
                <label required style={{ fontWeight: "bold", top: -25 }}>
                  Bài tập
                </label>
                <Select
                  sx={styles.selectFieldStyle}
                  value={value}
                  onChange={onChange}
                  error={!!formErrors?.exerciseID}
                  helperText={formErrors?.exerciseID?.message}
                  required
                  inputProps={{ required: false, maxLength: 255 }}
                  variant="outlined"
                  label="Bài tập"
                  id="demo-simple-select-label"
                >
                  {exercises.map((cate) => (
                    <MenuItem value={cate.exerciseID}>
                      {cate.exerciseName}
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
              onClick={() => navigate(pages.exerciseDetailListPath)}
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

export default ExerciseDetailForm;
