import { Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getStatusUsers } from "../../../cores/reducers/user";
import { addPhysiotherapist } from "../../../cores/thunk/user";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import pages from "../../config/pages";
import UserForm from "./components/UserForm";

const AddPhysiotherapist = () => {
  const dispatch = useDispatch();

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
    try {
      dispatch(
        addPhysiotherapist({
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
        })
      ).unwrap();
      setOpen(true);
    } catch (err) {
      // eslint-disable-next-line no-empty
      console.log(err);
    }
  };

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h1">THÊM NHÀ VẬT LÝ TRỊ LIỆU</Typography>
        <UserForm
          onFormSubmit={handleFormSubmit}
          isLoading={userStatus === "loading"}
        />
      </Stack>
      <ConfirmDialog
        open={open}
        handleClose={handleClose}
        desc="Tạo tài khoản nhà vật lý trị liệu thành công"
      />
    </Container>
  );
};

export default AddPhysiotherapist;
