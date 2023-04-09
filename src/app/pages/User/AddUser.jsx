import { Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../../cores/reducers/category";
import { getStatusUsers } from "../../../cores/reducers/user";
import { getCategoryList } from "../../../cores/thunk/category";
import { addUser } from "../../../cores/thunk/user";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import pages from "../../config/pages";
import UserForm from "./components/UserForm";

const AddUser = () => {
  const dispatch = useDispatch();
  let categories = useSelector(getCategories)

  const userStatus = useSelector(getStatusUsers);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    navigate(`${pages.userListPath}`);
  };
  

  const handleFormSubmit = ({ email, userTimePerWeek, phoneNumber}) => {
    try {
      dispatch(
        addUser({
          email: email,
          phoneNumber: phoneNumber,
          userTimePerWeek: userTimePerWeek,
          flag: true,
          status: true,
          isDeleted: false,
        })
      ).unwrap();
      setOpen(true);
    } catch (err) {
      // eslint-disable-next-line no-empty
      console.log(err);
    }
  };

  useEffect(() => {
    dispatch(getCategoryList());
  }, [dispatch]);

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h1">THÊM NGƯỜI DÙNG</Typography>
        <UserForm
          onFormSubmit={handleFormSubmit}
          isLoading={userStatus === "loading"}
          categories={categories}
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

export default AddUser;
