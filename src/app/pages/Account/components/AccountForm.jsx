import { yupResolver } from "@hookform/resolvers/yup";
import {
  Backdrop,
  Button,
  CardMedia,
  CircularProgress,
  Container,
  Stack,
  TextField,
} from "@mui/material";
import { emailRegExp, phoneRegExp } from "cores/utils/regexFormat";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import pages from "../../../config/pages";
import { differenceInYears } from "date-fns";

export const makeStyles = () => ({
  textFieldStyle: {
    width: "500px",
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

const AccountForm = ({ userDetail, onFormSubmit, isLoading }) => {
  const styles = makeStyles();
  const navigate = useNavigate();

  const schema = yup.object({
    firstName: yup.string().required("Vui lòng điền thông tin"),
    lastName: yup.string().required("Vui lòng điền thông tin"),
    phoneNumber: yup
      .string()
      .required("Vui lòng điền thông tin")
      .matches(phoneRegExp, "Độ dài là 10 số, không gồm chữ cái"),
    email: yup
      .string()
      .required("Vui lòng điền thông tin")
      .matches(emailRegExp, "Vui lòng điền đúng quy cách mail"),
    address: yup.string().required("Vui lòng điền thông tin"),
    image: yup.string().required("Vui lòng đính kèm ảnh"),
    dob: yup.string().test("dob", "Phải lớn hơn 18 tuổi", function (value) {
      return differenceInYears(new Date(), new Date(value)) >= 18;
    }),
  });

  const {
    handleSubmit,
    formState: { errors: formErrors },
    control,
    reset,
    watch,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      lastName: "",
      firstName: "",
      email: "",
      phoneNumber: "",
      address: "",
      dob: dayjs(new Date()).format("YYYY-MM-DD"),
      image: "",
    },
  });

  const onSubmit = (data) => onFormSubmit(data);

  useEffect(() => {
    reset({
      lastName: userDetail?.lastName || "",
      firstName: userDetail?.firstName || "",
      email: userDetail?.email || "",
      phoneNumber: userDetail?.phoneNumber || "",
      address: userDetail?.address,
      dob: dayjs(userDetail?.dob).format("YYYY-MM-DD") || "",
      image: userDetail?.image || "",
    });
  }, [userDetail, reset]);

  return (
    <Container sx={{ width: "90%", display: "flex" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Backdrop open={isLoading} sx={{ zIndex: 9 }}>
          <CircularProgress />
        </Backdrop>
        <Stack alignItems="flex-start" pt={6} spacing={5}>
          <Stack direction="row" spacing={3}>
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
          </Stack>
          <Stack direction="row" spacing={3}>
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
          </Stack>
          <Stack direction="row" spacing={3}>
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
              name="dob"
              render={({ field: { onChange, value } }) => (
                <TextField
                  sx={styles.textFieldStyle}
                  type="date"
                  value={value}
                  onChange={onChange}
                  error={!!formErrors?.dob}
                  helperText={formErrors?.dob?.message}
                  required
                  inputProps={{ required: false, maxLength: 255 }}
                  label="DOB"
                  variant="outlined"
                />
              )}
            />
          </Stack>
          {watch("image") ? (
            <CardMedia
              component="img"
              sx={{
                height: 233,
                width: 350,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
              }}
              alt="User image"
              src={watch("image")}
            />
          ) : null}
          <Controller
            control={control}
            name="image"
            render={({ field: { onChange, value } }) => (
              <TextField
                sx={styles.textFieldStyle}
                value={value}
                onChange={onChange}
                error={!!formErrors?.image}
                helperText={formErrors?.image?.message}
                required
                inputProps={{ required: true }}
                label="Hình ảnh"
                variant="outlined"
              />
            )}
          />

          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={2}
            sx={{ width: "100%" }}
          >
            {userDetail?.role?.name === "Physiotherapist" ? (
              <Button
                variant="outlined"
                onClick={() => navigate(pages.userListPath)}
                disabled={isLoading}
              >
                Xem chi tiết
              </Button>
            ) : null}
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

export default AccountForm;
