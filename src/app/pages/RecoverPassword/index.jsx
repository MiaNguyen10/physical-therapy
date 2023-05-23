import { Box, Button, Container, Link, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import KeyIcon from "@mui/icons-material/VpnKey";
import LabelledInput from "app/components/Input/LabelledInput";
import { passwordRegExp6to16 } from "cores/utils/regexFormat";
import BackIcon from "@mui/icons-material/KeyboardBackspace";
import pages from "app/config/pages";

const SERVER_SUCCESS = 204; //* server respond with status

export default function RecoveryPasswordPage() {
  const [searchParams] = useSearchParams();
  const [email] = useState(searchParams.get("email"));
  const [token] = useState(searchParams.get("code").replace(/ /g, "+")); //* replace all space in query string with `+`
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const isValidURL = email && token;

  async function submitHandler({
    new_password: newPwd,
    re_new_password: reNewPwd,
  }) {
    try {
      setErrorMsg("");
      if (newPwd !== reNewPwd) {
        setError(
          "re-new-password",
          { type: "custom", message: "Mật khẩu nhập lại không trùng" },
          { shouldFocus: true }
        );
        return false;
      }

      const res = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_ENDPOINT}/User/ResetPassword`,
        data: {
          email,
          token,
          newPassword: newPwd,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      const success = res.status === SERVER_SUCCESS;
      if (success)
        setSuccessMsg(
          `Mật khẩu đã thay đổi thành công \r\n` +
            "Bạn sẽ được chuyển sang trang đăng nhập"
        );

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (e) {
      console.log(e);
      setErrorMsg(e.response.data);
    }
  }
  return isValidURL ? (
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
          <Typography>
            Email : <span style={{ fontWeight: "bold" }}>{email}</span>
          </Typography>
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
  ) : (
    <>Email and Token is not valid</>
  );
}
