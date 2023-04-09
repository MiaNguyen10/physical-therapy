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

const UserForm = ({
  userDetail,
  onFormSubmit,
  isLoading,
  categories,
}) => {
  const styles = makeStyles();
  const navigate = useNavigate();

  const schema = yup.object({
    email: yup.string().required("Vui lòng điền thông tin"),
    phoneNumber: yup.string().required("Vui lòng điền thông tin"),
    userTimePerWeek: yup.string().required("Vui lòng điền thông tin"),
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
      email: "",
      phoneNumber: "",
      userTimePerWeek: "",
      flag: true,
      status: true,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    onFormSubmit(data);
  };

  useEffect(() => {
    reset({
      email: userDetail?.email,
      phoneNumber: userDetail?.phoneNumber,
      // categories
      //   .filter((category) => category.phoneNumber === userDetail.phoneNumber)
      //   .map((x) => x.categoryName)
      userTimePerWeek: userDetail?.userTimePerWeek,
      status: userDetail?.status,
      flag: userDetail?.flag,
    });
  }, [userDetail, reset, getValues, categories]);

  return (
    <Container sx={{ width: "50%", display: "flex" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Backdrop open={isLoading} sx={{ zIndex: 9 }}>
          <CircularProgress />
        </Backdrop>
        <Stack alignItems="flex-start" pt={3} spacing={5}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextField
                sx={styles.textFieldStyle}
                value={value}
                onChange={onChange}
                error={!!formErrors?.email}
                helperText={formErrors?.email?.message}
                required
                inputProps={{ required: false, maxLength: 255 }}
                label="Tên người dùng"
                variant="outlined"
              />
            )}
          />

          <Controller
            control={control}
            name="userTimePerWeek"
            render={({ field: { onChange, value } }) => (
              <TextField
                sx={styles.textFieldStyle}
                value={value}
                onChange={onChange}
                type="number"
                error={!!formErrors?.userTimePerWeek}
                helperText={formErrors?.userTimePerWeek?.message}
                required
                inputProps={{ required: false, maxLength: 255 }}
                label="Thời gian tập trong tuần"
                variant="outlined"
              />
            )}
          />

          <Controller
            control={control}
            name="phoneNumber"
            // eslint-disable-next-line no-empty-pattern
            render={({ field: { onChange, value } }) => (
              <TextField
                sx={styles.textFieldStyle}
                select
                onChange={onChange}
                value={value}
                variant="outlined"
                label="Danh mục"
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
                    <MenuItem value={cate.phoneNumber} key={cate.phoneNumber}>
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
              onClick={() => navigate(pages.userListPath)}
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

export default UserForm;
