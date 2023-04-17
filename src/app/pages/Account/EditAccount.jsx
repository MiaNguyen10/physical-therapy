import { Container, Stack, Typography } from "@mui/material";
import ConfirmDialog from "app/components/Dialog/ConfirmDialog";
import pages from "app/config/pages";
import { selectToken } from "cores/reducers/authentication";
import { getUserStatus, getUser, resetStatus } from "cores/reducers/user";
import { editUser, getUserDetail } from "cores/thunk/user";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AccountForm from "./components/AccountForm";

const EditAccount = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const userDetail = useSelector(getUser);
  const token = useSelector(selectToken);
  const status = useSelector(getUserStatus);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    navigate(pages.userListPath);
  };

  const handleFormSubmit = ({
    email,
    firstName,
    lastName,
    address,
    image,
    dob,
    phoneNumber,
  }) => {
    console.log("1");
    const user = {
      id: id,
      email: email,
      firstName: firstName,
      lastName: lastName,
      address: address,
      image: image,
      dob: dob,
      phoneNumber: phoneNumber,
      gender: true,
      bookingStatus: true,
    };
    try {
      dispatch(editUser({ user, token })).unwrap();
      setOpen(true);
      console.log(user);
    } catch (err) {
      // eslint-disable-next-line no-empty
    }
  };
  useEffect(() => {
    dispatch(getUserDetail({ id: id, token }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status === "succeeded") {
      dispatch(resetStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h1">Chi tiết tài khoản</Typography>
        <AccountForm
          userDetail={{
            lastName: userDetail?.lastName,
            firstName: userDetail?.firstName,
            email: userDetail?.email,
            phoneNumber: userDetail?.phoneNumber,
            address: userDetail?.address,
            dob: userDetail?.dob,
            image: userDetail?.image,
          }}
          onFormSubmit={handleFormSubmit}
          isLoading={status === "loading"}
        />
      </Stack>
      <ConfirmDialog
        open={open}
        handleClose={handleClose}
        desc="Cập nhật người dùng thành công"
      />
    </Container>
  );
};

export default EditAccount;
