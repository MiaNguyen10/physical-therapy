import { Container, Stack, Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import KeyIcon from "@mui/icons-material/VpnKey";
import { emailRegExp } from "cores/utils/regexFormat";
import LabelledInput from "app/components/Input/LabelledInput";
import { useForm } from "react-hook-form";
import pages from "app/config/pages";
import Link from "@mui/material/Link";
import BackIcon from "@mui/icons-material/KeyboardBackspace";
import axios from "axios";
import { set } from "date-fns";

const SERVER_SUCCESS = 204; //* server respond with status

export default function ResetPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const [successMsg, setSuccessMsg] = useState("");

  async function submitHandler({ email }) {
    try {
      const res = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_ENDPOINT}/User/RecoveryPassword?email=${email}`,
      });
      const success = res.status === SERVER_SUCCESS;
      if (success)
        setSuccessMsg(
          `Liên kết để thay đổi mật khẩu đã được gửi đến ${email}.
          Kiểm tra hòm thư rác nếu không tìm thấy.`
        );
    } catch (e) {
      const error = e.response.status;
      if (error === 400) {
        setError(
          "email",
          { type: "custom", message: "Email không tồn tại" },
          { shouldFocus: true }
        );
      }
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
          Lấy lại mật khẩu
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
            title='Email thay đổi mật khẩu'
            required={true}
            name='email'
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
          {successMsg === "" ? (
            <></>
          ) : (
            <>
              <Typography variant='caption' color='green'>
                {successMsg}
              </Typography>
            </>
          )}
          <Button
            type='submit'
            variant='contained'
            sx={{ mt: 3, mb: 2, minWidth: "65%" }}
          >
            Tìm kiếm email
          </Button>
          <Link href={pages.loginPath}>
            <BackIcon /> Quay lại trang đăng nhập
          </Link>
        </Box>
      </Stack>
    </Container>
  );
}
