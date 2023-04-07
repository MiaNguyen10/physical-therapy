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
import { selectSession } from "cores/reducers/authentication";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { login } from "../../cores/thunk/auth";
import { phoneRegExp } from "../../cores/utils/regexFormat";
import logo2 from "../assets/logo2.jpg";
import LabelledInput from "../components/Input/LabelledInput";
import pages from "../config/pages";

const Login = () => {
  const state = useLocation().state;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentSession = useSelector(selectSession);
  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ phoneNumber, password }) => {
    try {
      await dispatch(login({ phoneNumber, password })).unwrap();

      const destination =
        state && state.from.pathname ? state.from.pathname : pages.landingPage;
      navigate(destination, { replace: true });
    } catch (e) {
      e && setError(true);
    }
  };

  if (currentSession) {
    navigate(pages.landingPage, { replace: true });
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
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(submitHandler)}
            sx={{ mt: 1 }}
          >
            <LabelledInput
              title="Phonenumber"
              name="phoneNumber"
              errors={errors}
              register={register}
              rules={{
                required: "Vui lòng điền thông tin",
                pattern: {
                  value: phoneRegExp,
                  message: "Số điện thoại không hợp lệ",
                },
              }}
            />
            <LabelledInput
              title="Password"
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
            {error && <Typography sx={{color: 'red', fontStyle: 'italic', fontSize:'14px'}}>Mật khẩu hoặc SĐT của bạn bị sai. Vui lòng nhập lại </Typography>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                Don't have an account?
                <Link href="#" variant="body2">
                  {" Sign Up"}
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
