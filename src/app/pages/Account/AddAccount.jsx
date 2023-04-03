import React from "react";
import UserForm from "./components/UserForm";
import { Container, Typography, Stack } from "@mui/material";

const AddAccount = () => {
  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h1">Thêm tài khoản</Typography>
        <UserForm />
      </Stack>
    </Container>
  );
};

export default AddAccount;
