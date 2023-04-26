import { Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getStatus } from "../../../cores/reducers/exerciseDetail";
import { addExerciseDetail } from "../../../cores/thunk/exerciseDetail";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import ExerciseDetailForm from "./components/ExerciseDetailForm";
import { selectToken } from "cores/reducers/authentication";

const AddExerciseDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const exerciseDetailStatus = useSelector(getStatus);
  const token = useSelector(selectToken);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [desc, setDesc] = useState("");

  const handleFormSubmit = ({ detailName, set, description }) => {
    const excerciseDetail = {
      exerciseID: id,
      detailName: detailName,
      description: description,
      set: set,
      isDeleted: false,
    };
    try {
      dispatch(addExerciseDetail({ excerciseDetail, token })).unwrap();
      setOpen(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (exerciseDetailStatus === "succeeded") {
      setDesc("Thêm thông tin thành công");
    } else {
      setDesc("Lỗi, vui lòng nhập lại");
    }
  }, [exerciseDetailStatus]);

  const handleClose = () => {
    if (exerciseDetailStatus === "succeeded") {
      setOpen(false);
      navigate(`/exercise/${id}/exerciseDetailList`);
    } else {
      setOpen(false);
      navigate(`/exercise/${id}/exerciseDetailList/add`);
      setDesc("");
    }
  };

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3">THÊM CHI TIẾT BÀI TẬP</Typography>
        <ExerciseDetailForm
          onFormSubmit={handleFormSubmit}
          isLoading={exerciseDetailStatus === "loading"}
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

export default AddExerciseDetail;
