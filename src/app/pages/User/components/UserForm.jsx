import { yupResolver } from "@hookform/resolvers/yup";
import {
  Backdrop,
  Box,
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

const UserForm = ({ userDetail, onFormSubmit, isLoading, categories }) => {
  const styles = makeStyles();
  const navigate = useNavigate();

  const schema = yup.object({
    email: yup.string().required("Vui lòng điền thông tin"),
    phoneNumber: yup.string().required("Vui lòng điền thông tin"),
    password: yup.string().required("Vui lòng điền thông tin"),
    userName: yup.string().required("Vui lòng điền thông tin"),

    address: yup.string().required("Vui lòng điền thông tin"),
    firstName: yup.string().required("Vui lòng điền thông tin"),
    lastName: yup.string().required("Vui lòng điền thông tin"),
    dob: yup.string().required("Vui lòng điền thông tin"),
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
      userName: "",
      phoneNumber: "",
      password: "",
      address: "",
      firstName: "",
      lastName: "",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
      dob: "",
      gender: true,
      bookingStatus: true,
      banStatus: false,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    onFormSubmit(data);
  };

  useEffect(() => {
    reset({
      email: userDetail?.email,
      password: userDetail?.password,
      phoneNumber: userDetail?.phoneNumber,
      firstName: userDetail?.firstName,
      lastName: userDetail?.lastName,
      address: userDetail?.address,
      userName: userDetail?.userName,
      image: userDetail?.image,
      dob: userDetail?.dob,
      gender: userDetail?.gender,
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
            name="userName"
            render={({ field: { onChange, value } }) => (
              <TextField
                sx={styles.textFieldStyle}
                value={value}
                onChange={onChange}
                error={!!formErrors?.userName}
                helperText={formErrors?.userName?.message}
                required
                inputProps={{ required: false, maxLength: 255 }}
                label="Tên người dùng"
                variant="outlined"
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <TextField
                sx={styles.textFieldStyle}
                value={value}
                onChange={onChange}
                error={!!formErrors?.password}
                helperText={formErrors?.password?.message}
                required
                inputProps={{ required: false, maxLength: 255 }}
                label="Mật khẩu"
                variant="outlined"
              />
            )}
          />

          <Controller
            control={control}
            name="phoneNumber"
            render={({ field: { onChange, value } }) => (
              <TextField
                sx={styles.textFieldStyle}
                value={value}
                onChange={onChange}
                error={!!formErrors?.phoneNumber}
                helperText={formErrors?.phoneNumber?.message}
                required
                inputProps={{ required: false, maxLength: 255 }}
                label="Số điện thoại"
                variant="outlined"
              />
            )}
          />

          <Controller
            control={control}
            name="lastName"
            render={({ field: { onChange, value } }) => (
              <TextField
                sx={styles.textFieldStyle}
                value={value}
                onChange={onChange}
                error={!!formErrors?.lastName}
                helperText={formErrors?.lastName?.message}
                required
                inputProps={{ required: false, maxLength: 255 }}
                label="Họ"
                variant="outlined"
              />
            )}
          />

          <Controller
            control={control}
            name="firstName"
            render={({ field: { onChange, value } }) => (
              <TextField
                sx={styles.textFieldStyle}
                value={value}
                onChange={onChange}
                error={!!formErrors?.firstName}
                helperText={formErrors?.firstName?.message}
                required
                inputProps={{ required: false, maxLength: 255 }}
                label="Tên"
                variant="outlined"
              />
            )}
          />

          <Controller
            control={control}
            name="address"
            render={({ field: { onChange, value } }) => (
              <TextField
                sx={styles.textFieldStyle}
                value={value}
                onChange={onChange}
                error={!!formErrors?.address}
                helperText={formErrors?.address?.message}
                required
                inputProps={{ required: false, maxLength: 255 }}
                label="Địa chỉ"
                variant="outlined"
              />
            )}
          />

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
                label="Email"
                variant="outlined"
              />
            )}
          />

          <Controller
            control={control}
            name="image"
            render={({ field: { onChange, value } }) => (
              <React.Fragment>
                <TextField
                  sx={styles.textFieldStyle}
                  value={value}
                  onChange={onChange}
                  error={!!formErrors?.image}
                  helperText={formErrors?.image?.message}
                  required
                  inputProps={{ required: false, maxLength: 255 }}
                  label="Ảnh"
                  variant="outlined"
                />
                <Box component="img" src={value} />
              </React.Fragment>
            )}
          />

          <Controller
            control={control}
            name="dob"
            render={({ field: { onChange, value } }) => (
              <TextField
                sx={styles.textFieldStyle}
                value={value}
                onChange={onChange}
                error={!!formErrors?.dob}
                helperText={formErrors?.dob?.message}
                required
                inputProps={{ required: false }}
                type="date"
                label="Ngày sinh"
                variant="outlined"
              />
            )}
          />

          <Controller
            control={control}
            name="gender"
            render={({ field: { onChange, value } }) => (
              <TextField
                sx={styles.textFieldStyle}
                select
                onChange={onChange}
                value={value}
                variant="outlined"
                label="Giới tính"
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
                <MenuItem value={true}>Nam</MenuItem>
                <MenuItem value={false}>Nữ</MenuItem>
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
              onClick={() => navigate(pages.accountPath)}
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
