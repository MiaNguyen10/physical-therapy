// @ts-nocheck
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { selectToken } from "cores/reducers/authentication";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { login } from "../../cores/thunk/auth";
import { emailRegExp } from "../../cores/utils/regexFormat";
import logo2 from "../assets/logo2.jpg";
import LabelledInput from "../components/Input/LabelledInput";
import pages from "../config/pages";
// import axios from "axios";

const Login = () => {
  const state = useLocation().state;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentSession = useSelector(selectToken);
  const [eMessage, setEMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }) => {
    try {
      const payload = await dispatch(login({ email, password })).unwrap();
      const destination =
        state && state.from.pathname
          ? state.from.pathname
          : payload?.userID
          ? pages.dashboardPath
          : window.location.href;
      navigate(destination, { replace: true });
    } catch (e) {
      setEMessage(e);
    }
  };

  if (currentSession) {
    console.log("there still session");
    navigate(pages.dashboardPath, { replace: true });
  }

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${logo2})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 12,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng nhập
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(submitHandler)}
            sx={{ mt: 1 }}
          >
            <LabelledInput
              title="Email"
              name="email"
              errors={errors}
              register={register}
              rules={{
                required: "Vui lòng điền thông tin",
                pattern: {
                  value: emailRegExp,
                  message: "Email không hợp lệ",
                },
              }}
            />
            <LabelledInput
              title="Mật khẩu"
              name="password"
              type="password"
              errors={errors}
              register={register}
              rules={{
                required: "Vui lòng điền thông tin",
                // pattern: {
                //   value: passwordRegExp,
                //   message: "Mật khẩu không đúng quy cách",
                // },
              }}
            />
            <Typography
              sx={{ color: "red", fontStyle: "italic", fontSize: "14px" }}
            >
              {eMessage}{" "}
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Đăng nhập
            </Button>
            <Grid container justifyContent="space-between">
              <Grid item xs justifyContent="space-between">
                <Link href="/" variant="body2">
                  Trở về trang chủ
                </Link>
              </Grid>
              <Grid item>
                <Link href={pages.resetPassword} variant="body2">
                  Quên mật khẩu?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
