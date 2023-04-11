import { Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getStatusUsers } from "../../../cores/reducers/user";
import { addUser } from "../../../cores/thunk/user";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import pages from "../../config/pages";
import UserForm from "./components/UserForm";
import { selectToken } from "cores/reducers/authentication";

const AddUser = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken)
  const userStatus = useSelector(getStatusUsers);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    navigate(`${pages.accountPath}`);
  };

  const handleFormSubmit = ({
    email,
    password,
    phoneNumber,
    firstName,
    lastName,
    address,
    userName,
    image,
    dob,
    gender,
  }) => {
    const user = {
      email: email,
      userName: userName,
      phoneNumber: phoneNumber,
      password: password,
      address: address,
      firstName: firstName,
      lastName: lastName,
      image: image,
      dob: dob,
      gender: gender,
      bookingStatus: true,
      banStatus: false,
    };
    try {
      dispatch(addUser({user, token})).unwrap();
      setOpen(true);
    } catch (err) {
      // eslint-disable-next-line no-empty
      console.log(err);
    }
  };

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h1">THÊM NGƯỜI DÙNG</Typography>
        <UserForm
          onFormSubmit={handleFormSubmit}
          isLoading={userStatus === "loading"}
        />
      </Stack>
      <ConfirmDialog
        open={open}
        handleClose={handleClose}
        desc="Tạo tài khoản người dùng thành công"
      />
    </Container>
  );
};

export default AddUser;
