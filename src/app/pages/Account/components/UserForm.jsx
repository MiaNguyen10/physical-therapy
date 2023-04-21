import { yupResolver } from "@hookform/resolvers/yup";
import {
  Backdrop,
  Button,
  CardMedia,
  CircularProgress,
  Container,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { emailRegExp, phoneRegExp } from "cores/utils/regexFormat";
import dayjs from "dayjs";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import pages from "../../../config/pages";
import { makeStyles } from "./AccountForm";
import { differenceInYears } from "date-fns";

const RoleForAdmin = ["Admin", "Quản lý", "Nhà vật lý trị liệu", "Người dùng"];
const RoleForStaff = ["Nhà vật lý trị liệu", "Người dùng"];

const UserForm = ({ onFormSubmit, isLoading }) => {
  const styles = makeStyles();
  const navigate = useNavigate();
  const role = JSON.parse(localStorage.getItem("role"));

  const schema = yup.object({
    userName: yup.string().required("Vui lòng điền thông tin"),
    password: yup
      .string()
      .required("Vui lòng điền thông tin")
      .min(6, "Tối thiểu 6 kí tự"),
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
    role: yup.string().required("Vui lòng điền thông tin"),
    dob: yup.string().test("dob", "Phải lớn hơn 18 tuổi", function (value) {
      return differenceInYears(new Date(), new Date(value)) >= 18;
    }),
  });

  const {
    handleSubmit,
    formState: { errors: formErrors },
    control,
    watch,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      userName: "",
      password: "",
      lastName: "",
      firstName: "",
      email: "",
      phoneNumber: "",
      address: "",
      dob: dayjs(new Date()).format("YYYY-MM-DD"),
      image: "",
      role: "",
    },
  });

  const onSubmit = (data) => onFormSubmit(data);

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
                  label="Username"
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
          </Stack>
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
          <Controller
            control={control}
            name="role"
            render={({ field: { onChange, value } }) => (
              <TextField
                sx={{
                  ...styles.textFieldStyle,
                }}
                select
                onChange={onChange}
                value={value}
                variant="outlined"
                label="Loại tài khoản"
              >
                {role === "Admin"
                  ? RoleForAdmin.map((role) => (
                      <MenuItem value={role} key={role}>
                        {role}
                      </MenuItem>
                    ))
                  : RoleForStaff.map((role) => (
                      <MenuItem value={role} key={role}>
                        {role}
                      </MenuItem>
                    ))}
              </TextField>
            )}
          />
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
