import { yupResolver } from "@hookform/resolvers/yup";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  InputLabel,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
  emailRegExp,
  passwordRegExp,
  phoneRegExp,
} from "../../../../cores/utils/regexFormat";
import DatePickerInput from "../../../components/Input/DatePicker";
import pages from "../../../config/pages";
import { UGender } from "../Data";
import dayjs from "dayjs";

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

const UserForm = ({ userDetail, onFormSubmit, isLoading,  }) => {
  const styles = makeStyles();
  const navigate = useNavigate();

  const schema = yup.object({
    firstName: yup.string().required("Vui lòng điền thông tin"),
    lastName: yup.string().required("Vui lòng điền thông tin"),
    phone: yup
      .string()
      .required("Vui lòng điền thông tin")
      .matches(phoneRegExp, "Độ dài là 10 số, không gồm chữ cái"),
    email: yup
      .string()
      .required("Vui lòng điền thông tin")
      .matches(emailRegExp, "Vui lòng điền đúng quy cách mail"),
    DOB: yup.string().required("Vui lòng điền thông tin"),
    password: yup
      .string()
      .required("Vui lòng điền thông tin")
      .matches(
        passwordRegExp,
        "Mật khẩu phải nhiều hơn 6 kí tự, có 1 ký tự đặc biệt, 1 chữ số, 1 chữ hoa và 1 chữ thường"
      ),
    image: yup.string().required("Vui lòng đính kèm ảnh"),
  });

  const {
    handleSubmit,
    formState: { errors: formErrors },
    control,
    reset,
    getValues,
    watch,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      DOB: dayjs(new Date()),
      gender: "",
      email: "",
      password: "",
      image: "",
    },
  });

  const onSubmit = (data) => onFormSubmit(data);

  useEffect(() => {
    reset({
      email: userDetail?.email,
      firstName: userDetail?.firstName,
      lastName: userDetail?.lastName,
      role: userDetail?.role,
      status: userDetail?.status ?? getValues("status"),
    });
  }, [userDetail, reset, getValues]);

  const imageSize = (url) => {
    const img = document.createElement("img");

    const promise = new Promise((resolve, reject) => {
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        resolve({ width, height });
      };
      img.onerror = reject;
    });
    img.src = url;

    return promise;
  };

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
                  disabled={!!userDetail?.email}
                />
              )}
            />
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, value } }) => (
                <TextField
                  sx={styles.textFieldStyle}
                  value={value}
                  onChange={onChange}
                  error={!!formErrors?.phone}
                  helperText={formErrors?.phone?.message}
                  required
                  inputProps={{ required: false, maxLength: 255 }}
                  label="Phone"
                  variant="outlined"
                  disabled={!!userDetail?.phone}
                />
              )}
            />
          </Stack>
          <Stack direction="row" spacing={3}>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <TextField
                  sx={styles.textFieldStyle}
                  type="password"
                  value={value}
                  onChange={onChange}
                  error={!!formErrors?.password}
                  helperText={formErrors?.password?.message}
                  required
                  inputProps={{ required: false, maxLength: 255 }}
                  label="Mật khẩu"
                  variant="outlined"
                  disabled={!!userDetail?.password}
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
                  disabled={!!userDetail?.gender}
                >
                  {UGender.map((role, index) => (
                    <MenuItem value={index} key={index}>
                      {role}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Stack>
          <Stack direction="column">
            <InputLabel>
              <Typography sx={{ color: "#333333", fontWeight: 2000 }}>
                DOB
                <span style={{ color: "#D93A39", fontWeight: 1000 }}> *</span>
              </Typography>
            </InputLabel>
            <Controller
              name="DOB"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <DatePickerInput
                  value={value ?? ""}
                  onChange={onChange}
                  sx={styles.textFieldStyle}
                  error={error}
                />
              )}
            />
          </Stack>
          {watch("image")?.url ? (
            <Box
              component="img"
              sx={{
                height: 233,
                width: 350,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
              }}
              alt="User image"
              src={watch("image")?.url}
            />
          ) : null}
          <Controller
            control={control}
            name="image"
            render={({ field: { onChange } }) => (
              <>
                <Button variant="outlined" color="primary" component="label">
                  Add image
                  <input
                    onChange={async (event) => {
                      const { files } = event.target;
                      if (files?.[0]) {
                        const imageUrl = URL.createObjectURL(files[0]);
                        const imageUrlPath = files[0].name;
                        const { width, height } = await imageSize(imageUrl);
                        onChange({
                          path: imageUrlPath,
                          url: imageUrl,
                          width,
                          height,
                        });
                      }
                    }}
                    type="file"
                    accept="image/*"
                    hidden
                  />
                </Button>
              </>
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
              onClick={() => navigate(pages.memberListPath)}
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
