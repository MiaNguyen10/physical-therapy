import { yupResolver } from "@hookform/resolvers/yup";
import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
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
    exerciseTimePerWeek: yup
      .number()
      .typeError("Vui lòng điền số lượng thời gian tập luyện trong tuần")
      .required("Vui lòng điền thông tin")
      .min(1, "Số lượng thời gian tập luyện trong tuần phải lớn hơn 0"),
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
      exerciseName: "",
      categoryID: "",
      exerciseTimePerWeek: "",
      flag: true,
      status: true,
    },
  });

  const onSubmit = (data) => {
    onFormSubmit(data);
  };

  useEffect(() => {
    reset({
      exerciseName: exerciseDetail?.exerciseName,
      categoryID: exerciseDetail?.categoryID,
      exerciseTimePerWeek: exerciseDetail?.exerciseTimePerWeekPerWeek,
      status: exerciseDetail?.status,
      flag: exerciseDetail?.flag,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exerciseDetail]);

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
                type="number"
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
            // eslint-disable-next-line no-empty-pattern
            render={({ field: { onChange, value } }) => (
              <TextField
                sx={styles.textFieldStyle}
                select
                onChange={onChange}
                value={value}
                variant="outlined"
                label="Tình trạng"
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      style: {
                        maxHeight:
                          ITEM_HEIGHT * ITEM_DISPLAY_ON_SELECT +
                          ITEM_PADDING_TOP,
                        width: 250,
                      },
                    },
                    disableScrollLock: true,
                  },
                }}
              >
                {categories.map((cate) => (
                  <MenuItem value={cate.categoryID} key={cate.categoryID}>
                    {cate.categoryName}
                  </MenuItem>
                ))}
              </TextField>
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
