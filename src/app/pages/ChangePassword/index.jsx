import { Box, Button, Container, Link, Stack, Typography } from "@mui/material";
import LabelledInput from "app/components/Input/LabelledInput";
import pages from "app/config/pages";
import { passwordRegExp6to16 } from "cores/utils/regexFormat";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import KeyIcon from "@mui/icons-material/VpnKey";
import BackIcon from "@mui/icons-material/KeyboardBackspace";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectState } from "cores/reducers/authentication";
import { useNavigate } from "react-router-dom";

const SERVER_SUCCESS = 200;
export default function ChangePasswordPage() {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { userID } = useSelector(selectState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();

  const handleLogout = () => {
    dispatch(logout);
    localStorage.removeItem("authentication");
    navigate(`${pages.loginPath}`);
  };

  async function submitHandler({
    old_password: oldPwd,
    new_password: newPwd,
    re_new_password: reNewPwd,
  }) {
    try {
      if (newPwd !== reNewPwd) {
        setError("re_new_password", {
          type: "custom",
          message: "Mật khẩu nhập lại không khớp",
        });
        return false;
      }

      setErrorMsg("");

      const data = {
        id: userID,
        oldPassword: oldPwd,
        newPassword: newPwd,
      };

      const res = await axios(
        {
          method: "POST",
          url: `${process.env.REACT_APP_API_ENDPOINT}/User/ChangePassword`,
          data,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const success = SERVER_SUCCESS === res.status;

      if (success) {
        setSuccessMsg(
          "Thay đổi mật khẩu thành công. Bạn sẽ quay về trang đăng nhập"
        );
        setTimeout(() => {
          handleLogout();
        }, 3000);
      }
    } catch (error) {
      setErrorMsg(error.response.data);
      reset();
    }
  }

  return (
    <Container
      maxWidth='md'
      sx={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Stack justifyContent='space-between' alignItems='center' spacing={3}>
        <KeyIcon fontSize='large' sx={{ color: "rgb(46, 161, 226)" }} />
        <Typography variant='h4' textTransform='capitalize'>
          Thay đổi mật khẩu
        </Typography>
        <Box
          component='form'
          noValidate
          onSubmit={handleSubmit(submitHandler)}
          sx={{
            mt: 1,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <LabelledInput
            title='Mật khẩu cũ'
            required={true}
            name='old_password'
            errors={errors}
            type='password'
            register={register}
            rules={{
              required: "Vui lòng điền thông tin",
              pattern: {
                value: passwordRegExp6to16,
                message: "Mật khẩu phải có độ dài từ 6 tới 16 kí tự",
              },
            }}
          />
          <LabelledInput
            title='Mật khẩu mới'
            required={true}
            name='new_password'
            errors={errors}
            type='password'
            register={register}
            rules={{
              required: "Vui lòng điền thông tin",
              pattern: {
                value: passwordRegExp6to16,
                message: "Mật khẩu phải có độ dài từ 6 tới 16 kí tự",
              },
            }}
            children={undefined}
          />
          <LabelledInput
            title='Nhập lại mật khẩu mới'
            required={true}
            name='re_new_password'
            errors={errors}
            type='password'
            register={register}
            rules={{
              required: "Vui lòng điền thông tin",
              pattern: {
                value: passwordRegExp6to16,
                message: "Mật khẩu phải có độ dài từ 6 tới 16 kí tự",
              },
            }}
            children={undefined}
          />
          {successMsg === "" ? (
            <></>
          ) : (
            <>
              <Typography variant='caption' color='green'>
                {successMsg}
              </Typography>
            </>
          )}
          {errorMsg === "" ? (
            <></>
          ) : (
            <>
              <Typography variant='caption' color='red'>
                {errorMsg}
              </Typography>
            </>
          )}
          <Button
            type='submit'
            variant='contained'
            sx={{ mt: 3, mb: 2, minWidth: "65%" }}
          >
            Thay đổi mật khẩu
          </Button>
          <Link href={pages.loginPath}>
            <BackIcon /> Quay lại trang đăng nhập
          </Link>
        </Box>
      </Stack>
    </Container>
  );
}
