import { yupResolver } from "@hookform/resolvers/yup";
import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Stack,
  TextField,
} from "@mui/material";
import { makeStyles } from "app/pages/Category/components/CategoryForm";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

const makeStylesDesc = () => ({
  textFieldStyle: {
    width: "500px",
    ".MuiOutlinedInput-root": {
      height: 200,
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

const ExerciseDetailForm = ({ exerciseDetail, onFormSubmit, isLoading }) => {
  const styles = makeStyles();
  const styleDesc = makeStylesDesc();
  const schema = yup.object({
    detailName: yup.string().required("Vui lòng điền thông tin"),
    set: yup.string().required("Vui lòng điền thông tin"),
    description: yup.string().required("Vui lòng điền thông tin"),
  });

  const {
    handleSubmit,
    formState: { errors: formErrors },
    control,
    reset,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      detailName: "",
      set: "",
      description: "",
    },
  });

  const onSubmit = (data) => onFormSubmit(data);

  useEffect(() => {
    reset({
      detailName: exerciseDetail?.detailName,
      set: exerciseDetail?.set,
      description: exerciseDetail?.description,
    });
  }, [exerciseDetail, reset]);

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
                label="Tên chi tiết của bài tập"
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
                sx={styleDesc.textFieldStyle}
                value={value}
                onChange={onChange}
                error={!!formErrors?.description}
                helperText={formErrors?.description?.message}
                required
                inputProps={{ required: false, maxLength: 1000 }}
                label="Mô tả"
                multiline
                variant="outlined"
              />
            )}
          />
          <Stack
            direction="row"
            justifyContent="center"
            spacing={2}
            sx={{ width: "100%" }}
          >
            <Button
              variant="outlined"
              disabled={isLoading}
              onClick={() =>
                reset({
                  detailName: exerciseDetail?.detailName,
                  set: exerciseDetail?.set,
                  description: exerciseDetail?.description,
                })
              }
            >
              Hủy bỏ
            </Button>
            <Button variant="contained" disabled={isLoading} type="submit">
              Lưu
            </Button>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
};

export default ExerciseDetailForm;
