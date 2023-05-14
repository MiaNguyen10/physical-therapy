import { Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getStatus } from "../../../cores/reducers/subProfile";
import { addSubProfile } from "../../../cores/thunk/subProfile";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import SubProfileForm from "./components/SubProfileForm";
import { selectToken } from "cores/reducers/authentication";

const AddSubProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const subProfileStatus = useSelector(getStatus);
  const token = useSelector(selectToken);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [desc, setDesc] = useState("");

  const handleFormSubmit = ({ relationName, set, description }) => {
    const excerciseDetail = {
      userID: id,
      relationName: relationName,
      description: description,
      set: set,
      isDeleted: false,
    };
    try {
      dispatch(addSubProfile({ excerciseDetail, token })).unwrap();
      setOpen(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (subProfileStatus === "succeeded") {
      setDesc("Thêm thông tin thành công");
    } else {
      setDesc("Lỗi, vui lòng nhập lại");
    }
  }, [subProfileStatus]);

  const handleClose = () => {
    if (subProfileStatus === "succeeded") {
      setOpen(false);
      navigate(`/user/${id}/subProfileList`);
    } else {
      setOpen(false);
      navigate(`/user/${id}/subProfileList/add`);
      setDesc("");
    }
  };

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3">THÊM CHI TIẾT MỐI QUAN HỆ</Typography>
        <SubProfileForm
          onFormSubmit={handleFormSubmit}
          isLoading={subProfileStatus === "loading"}
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

export default AddSubProfile;
