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
import { differenceInYears } from "date-fns";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import pages from "../../../config/pages";
import { Gender } from "./UserForm";

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
    // ".MuiContainer-root": {
    //   paddingTop: 0,
    // },
  },
});

const AccountForm = ({ userDetail, onFormSubmit, isLoading }) => {
  const styles = makeStyles();
  const navigate = useNavigate();
  const { id } = useParams();

  const schema = yup.object({
    firstName: yup
      .string()
      .required("Vui lòng điền thông tin")
      .matches(/^[^\d]*$/, "Tên không được chứa số"),
    // lastName: yup.string().required("Vui lòng điền thông tin"),
    phoneNumber: yup
      .string()
      .required("Vui lòng điền thông tin")
      .matches(phoneRegExp, "Độ dài là 10 số, không gồm chữ cái"),
    email: yup
      .string()
      .required("Vui lòng điền thông tin")
      .matches(emailRegExp, "Vui lòng điền đúng quy cách mail"),
    address: yup
      // .required("Vui lòng điền thông tin")
      .string(),
    image: yup
      // .required("Vui lòng đính kèm ảnh")
      .string(),
    gender: yup.string().required("Vui lòng điền thông tin"),
    dob: yup
      .string()
      .test("dob", "Lớn hơn 18 tuổi và ít hơn 80 tuổi", function (value) {
        return (
          differenceInYears(new Date(), new Date(value)) >= 18 &&
          differenceInYears(new Date(), new Date(value)) <= 80
        );
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
      // lastName: "",
      firstName: "",
      email: "",
      phoneNumber: "",
      address: "",
      dob: "2000-01-01",
      image:
        "https://firebasestorage.googleapis.com/v0/b/healthcaresystem-98b8d.appspot.com/o/icon%2FavatarIcon.png?alt=media&token=790e190a-1559-4272-b4c8-213fbc0d7f89",
      gender: true,
    },
  });

  const onSubmit = (data) => onFormSubmit(data);

  useEffect(() => {
    reset({
      //lastName: userDetail?.lastName || "",
      firstName: userDetail?.firstName || "",
      email: userDetail?.email || "",
      phoneNumber: userDetail?.phoneNumber || "",
      address: userDetail?.address,
      dob: dayjs(userDetail?.dob).format("YYYY-MM-DD") || "",
      image: userDetail?.image || "",
      gender: userDetail?.gender || "",
    });
  }, [userDetail, reset]);

  return (
    <Container sx={{ width: "90%", display: "flex" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Backdrop open={isLoading} sx={{ zIndex: 9 }}>
          <CircularProgress />
        </Backdrop>
        {watch("image") ? (
          <CardMedia
            component="img"
            sx={{
              height: 150, // Set the height and width to the same value for a square image
              width: 150,
              objectFit: "cover", // Maintain aspect ratio and fill the square container
              margin: "auto", // Center the image
            }}
            alt="User image"
            src={watch("image")}
          />
        ) : null}

        <Stack alignItems="flex-start" pt={6} spacing={5}>
          <Stack direction="row" spacing={3}>
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
                  label="Họ tên"
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
                  label="Ngày sinh"
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
                  disabled
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
                  inputProps={{ required: false, maxLength: 255 }}
                  label="Số điện thoại"
                  variant="outlined"
                  required
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
                  inputProps={{ required: false, maxLength: 255 }}
                  label="Địa chỉ"
                  variant="outlined"
                  placeholder="Có thể để trống"
                />
              )}
            />
            <Controller
              control={control}
              name="gender"
              render={({ field: { onChange, value } }) => (
                <TextField
                  sx={{
                    ...styles.textFieldStyle,
                  }}
                  select
                  onChange={onChange}
                  value={value}
                  variant="outlined"
                  label="Giới tính"
                  required
                >
                  {Gender.map((gender, index) => (
                    <MenuItem value={gender} key={index}>
                      {gender}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Stack>
          {/* {watch("image") ? (
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
                inputProps={{ required: true }}
                label="Đường link của Hình ảnh"
                variant="outlined"
                hidden
              />
            )}
          /> */}

          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={2}
            sx={{ width: "100%" }}
          >
            {userDetail?.role?.name === "Physiotherapist" ? (
              <Button
                variant="outlined"
                onClick={() => navigate(`/user/${id}/physiotherapist`)}
                disabled={isLoading}
              >
                Xem chi tiết chuyên viên vật lý trị liệu
              </Button>
            ) : null}
            {userDetail?.role?.name === "Member" ? (
              <Button
                variant="outlined"
                onClick={() => navigate(`/user/${id}/subProfileList`)}
                disabled={isLoading}
              >
                Xem mối quan hệ với người dùng
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
