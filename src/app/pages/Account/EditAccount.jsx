import { Container, Stack, Typography } from "@mui/material";
import ConfirmDialog from "app/components/Dialog/ConfirmDialog";
import { selectToken } from "cores/reducers/authentication";
import { getUser, getUserStatus, resetStatus } from "cores/reducers/user";
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
  const [refreshKey, setRefreshKey] = useState(0);
  const [desc, setDesc] = useState("");
  const error = useSelector(state => state.user.error)

  
  const handleClose = () => {
    setOpen(false);
    navigate(`/user/${id}/edit`);
  };

  const handleFormSubmit = ({
    email,
    firstName,
    address,
    image,
    dob,
    phoneNumber,
    gender,
  }) => {
    const user = {
      id: id,
      email: email,
      firstName: firstName,
      lastName: "",
      address: address,
      image: image,
      dob: dob,
      phoneNumber: phoneNumber,
      gender: gender === "Nam" ? true : false, 
      bookingStatus: true,
    };
    try {
      dispatch(editUser({ user, token })).unwrap();
      setRefreshKey((oldKey) => oldKey + 1);
      setOpen(true);
    } catch (err) {
      // eslint-disable-next-line no-empty
    }
  };
  useEffect(() => {
    dispatch(getUserDetail({ id: id, token }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  useEffect(() => {
    if (status === "succeeded") {
      dispatch(resetStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  useEffect(() => {
    if (!error) {
      setDesc("Thêm thông tin thành công");
    } else {
      setDesc("Lỗi, vui lòng nhập lại");
    }
  }, [error]);

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3">Chi tiết tài khoản</Typography>
        <AccountForm
          userDetail={{
            //lastName: userDetail?.lastName,
            firstName: userDetail?.firstName,
            email: userDetail?.email,
            phoneNumber: userDetail?.phoneNumber,
            address: userDetail?.address,
            dob: userDetail?.dob,
            image: userDetail?.image,
            role: userDetail?.role,
            gender: userDetail?.gender === true ? "Nam" : "Nữ",
          }}
          onFormSubmit={handleFormSubmit}
          isLoading={status === "loading"}
        />
      </Stack>
      <ConfirmDialog
        open={open}
        handleClose={handleClose}
        desc={desc}
      />
    </Container>
  );
};

export default EditAccount;
