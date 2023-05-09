import { Container, Stack, Typography } from "@mui/material";
import ConfirmDialog from "app/components/Dialog/ConfirmDialog";
import pages from "app/config/pages";
import { selectToken } from "cores/reducers/authentication";
import { getUserStatus } from "cores/reducers/user";
import {
  addAdmin,
  addPhysiotherapist,
  addStaff,
  addUser,
} from "cores/thunk/user";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserForm from "./components/UserForm";

const AddAccount = () => {
  const dispatch = useDispatch();
  const status = useSelector(getUserStatus);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const error = useSelector((state) => state.user.error);
  const [desc, setDesc] = useState("");
  const id = useSelector((state) => state.user.userID);

  const handleClose = () => {
    if (!error) {
      setOpen(false);
      navigate(`${pages.userListPath}`);
    } else {
      setOpen(false);
      navigate(`${pages.addUserPath}`);
    }
  };

  const handleFormSubmit = ({
    gender,
    password,
    email,
    firstName,
    address,
    image,
    dob,
    phoneNumber,
    role,
  }) => {
    const user = {
      userName: phoneNumber,
      password: password,
      email: email,
      firstName: firstName,
      lastName: "",
      address: address,
      image: image,
      dob: dob,
      phoneNumber: phoneNumber,
      gender: gender === "Nam" ? true : false,
      bookingStatus: true,
      banStatus: false,
    };
    try {
      if (role === "Admin") {
        dispatch(addAdmin({ user, token })).unwrap();
        setOpen(true);
      } else if (role === "Quản lý") {
        dispatch(addStaff({ user, token })).unwrap();
        setOpen(true);
      } else if (role === "Chuyên viên vật lý trị liệu") {
        dispatch(addPhysiotherapist({ user, token })).unwrap();

        if (id) {
          navigate(`/user/${id}/physiotherapist/add`);
        } else {
          setOpen(true);
        }
      } else {
        dispatch(addUser({ user, token })).unwrap();
        setOpen(true);
      }
    } catch (err) {
      // eslint-disable-next-line no-empty
    }
  };

  useEffect(() => {
    if (
      error === "Unexpected token 'E', \"Email Đã Tồn Tại!\" is not valid JSON"
    ) {
      setDesc("Email Đã Tồn Tại!. Nhập email khác");
    } else if (
      error === "Unexpected token 'S', \"Số Điện Th\"... is not valid JSON"
    ) {
      setDesc("Số điện thoại đã tồn tại! Nhập SĐT khác");
    } else if (status === "failed") {
      setDesc("Lỗi. Vui lòng nhập lại");
    } else {
      setDesc("Thêm người dùng thành công");
    }
  }, [error, status]);
  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3">Thêm tài khoản</Typography>
        <UserForm
          onFormSubmit={handleFormSubmit}
          isLoading={status === "loading"}
        />
      </Stack>
      <ConfirmDialog open={open} handleClose={handleClose} desc={desc} />
    </Container>
  );
};

export default AddAccount;
