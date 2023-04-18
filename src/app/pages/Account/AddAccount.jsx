import { Container, Stack, Typography } from "@mui/material";
import ConfirmDialog from "app/components/Dialog/ConfirmDialog";
import pages from "app/config/pages";
import { selectToken } from "cores/reducers/authentication";
import { getUserStatus } from "cores/reducers/user";
import {
  addAdmin,
  addStaff,
  addPhysiotherapist,
  addUser,
} from "cores/thunk/user";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserForm from "./components/UserForm";

const AddAccount = () => {
  const dispatch = useDispatch();
  const status = useSelector(getUserStatus);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const token = useSelector(selectToken);

  const handleClose = () => {
    setOpen(false);
    navigate(`${pages.userListPath}`);
  };

  const handleFormSubmit = ({
    userName,
    password,
    email,
    firstName,
    lastName,
    address,
    image,
    dob,
    phoneNumber,
    role,
  }) => {
    const user = {
      userName: userName,
      password: password,
      email: email,
      firstName: firstName,
      lastName: lastName,
      address: address,
      image: image,
      dob: dob,
      phoneNumber: phoneNumber,
      gender: true,
      bookingStatus: true,
      banStatus: true,
    };
    try {
      if (role === "Admin") {
        dispatch(addAdmin({ user, token })).unwrap();
      } else if (role === "Quản lý") {
        dispatch(addStaff({ user, token })).unwrap();
      } else if (role === "Nhà vật lý trị liệu") {
        dispatch(addPhysiotherapist({ user, token })).unwrap();
      } else {
        dispatch(addUser({ user, token })).unwrap();
      }
      setOpen(true);
    } catch (err) {
      // eslint-disable-next-line no-empty
      console.log(err);
    }
  };
  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h1">Thêm tài khoản</Typography>
        <UserForm
          onFormSubmit={handleFormSubmit}
          isLoading={status === "loading"}
        />
      </Stack>
      <ConfirmDialog
        open={open}
        handleClose={handleClose}
        desc="Thêm người dùng thành công"
      />
    </Container>
  );
};

export default AddAccount;
