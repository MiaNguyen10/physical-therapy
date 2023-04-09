import { Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCategories } from "../../../cores/reducers/category";
import {
  getUsers,
  getStatusUsers,
  resetStatus
} from "../../../cores/reducers/user";
import { getCategoryList } from "../../../cores/thunk/category";
import { editUser, getUserList } from "../../../cores/thunk/user";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import pages from "../../config/pages";
import UserForm from "./components/UserForm";

const EditUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const userStatus = useSelector(getStatusUsers);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const userList = useSelector(getUsers);
  let categories = useSelector(getCategories);
  const userDetail =
    Array.isArray(userList) &&
    userList.find((user) => user.userID === id);

  const handleClose = () => {
    setOpen(false);
    navigate(`${pages.userListPath}`);
  };

  const handleFormSubmit = ({
    email,
    phoneNumber,
    userTimePerWeek,
    status,
    flag,
  }) => {
    try {
      dispatch(
        editUser({
          userID: id,
          email: email,
          flag: flag,
          phoneNumber: phoneNumber,
          userTimePerWeek: userTimePerWeek,
          status: JSON.parse([status]),
        })
      ).unwrap();
      setOpen(true);
    } catch (err) {
      // eslint-disable-next-line no-empty
    }
  };

  useEffect(() => {
    if (userStatus === "succeeded") {
      dispatch(resetStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategoryList());
  }, [dispatch]);

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h1">SỬA NGƯỜI DÙNG</Typography>
        <UserForm
          userDetail={{
            email: userDetail?.email,
            phoneNumber: userDetail?.phoneNumber,
            userTimePerWeek: userDetail?.userTimePerWeek,
            flag: userDetail?.flag,
            status: userDetail?.status,
          }}
          categories={categories}
          onFormSubmit={handleFormSubmit}
          isLoading={userStatus === "loading"}
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

export default EditUser;
