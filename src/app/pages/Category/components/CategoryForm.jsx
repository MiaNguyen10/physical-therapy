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
import { CStatus } from "../CategoryData";

const makeStyles = () => ({
  textFieldStyle: {
    width: "320px",
    ".MuiOutlinedInput-root": {
      height: 44,
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

const CategoryForm = ({ categoryDetail, onFormSubmit, isLoading }) => {
  const styles = makeStyles();
  const navigate = useNavigate();

  const schema = yup.object({
    categoryName: yup.string().required("Vui lòng điền thông tin"),
    isDeleted: yup.string().required("Vui lòng chọn trạng thái"),
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
      categoryName: "",
      isDeleted: "Đang hoạt động",
    },
  });

  const onSubmit = (data) => onFormSubmit(data);

  useEffect(() => {
    reset({
      categoryName: categoryDetail?.categoryName,
      isDeleted: categoryDetail?.status ?? getValues("isDeleted"),
    });
  }, [categoryDetail, reset, getValues]);

  return (
    <Container sx={{ width: "70%", display: "flex" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Backdrop open={isLoading} sx={{ zIndex: 9 }}>
          <CircularProgress />
        </Backdrop>
        <Stack alignItems="flex-start" pt={6} spacing={5}>
          <Stack direction="row" spacing={3}>
            <Controller
              control={control}
              name="categoryName"
              render={({ field: { onChange, value } }) => (
                <TextField
                  sx={styles.textFieldStyle}
                  value={value}
                  onChange={onChange}
                  error={!!formErrors?.lastName}
                  helperText={formErrors?.lastName?.message}
                  required
                  inputProps={{ required: false, maxLength: 255 }}
                  label="Tên danh mục"
                  variant="outlined"
                />
              )}
            />

            <Controller
              control={control}
              name="isDeleted"
              render={({ field: { onChange, value } }) => (
                <TextField
                  sx={styles.textFieldStyle}
                  select
                  onChange={onChange}
                  value={value}
                  variant="outlined"
                  label="Trạng thái"
                >
                  {CStatus.map((status, index) => (
                    <MenuItem value={index} key={index}>
                      {status}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Stack>

          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={2}
            sx={{ width: "100%" }}
          >
            <Button
              variant="outlined"
              onClick={() => navigate(pages.categoryListPath)}
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

export default CategoryForm;
