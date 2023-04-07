import { Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getExerciseDetails,
  getStatus,
  resetStatus,
} from "../../../cores/reducers/exerciseDetail";
import { editExerciseDetail, getExerciseDetailList } from "../../../cores/thunk/exerciseDetail";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import pages from "../../config/pages";
import ExerciseDetailForm from "./components/ExerciseDetailForm";
import { getCategoryList } from "../../../cores/thunk/category";
import { getCategories } from "../../../cores/reducers/category";

const EditExerciseDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const exerciseDetailStatus = useSelector(getStatus);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const exerciseDetailList = useSelector(getExerciseDetails);
  let categories = useSelector(getCategories);
  const exerciseDetailDetail =
    Array.isArray(exerciseDetailList) &&
    exerciseDetailList.find((exerciseDetail) => exerciseDetail.exerciseDetailID === id);

  const handleClose = () => {
    setOpen(false);
    navigate(`${pages.exerciseDetailListPath}`);
  };

  const handleFormSubmit = ({
    exerciseDetailName,
    categoryID,
    exerciseDetailTimePerWeek,
    status,
    flag,
  }) => {
    try {
      dispatch(
        editExerciseDetail({
          exerciseDetailID: id,
          exerciseDetailName: exerciseDetailName,
          flag: JSON.parse([flag]),
          categoryID: categoryID,
          exerciseDetailTimePerWeek: exerciseDetailTimePerWeek,
          status: JSON.parse([status]),
        })
      ).unwrap();
      setOpen(true);
    } catch (err) {
      // eslint-disable-next-line no-empty
    }
  };

  useEffect(() => {
    if (exerciseDetailStatus === "succeeded") {
      dispatch(resetStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getExerciseDetailList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategoryList());
  }, [dispatch]);

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h1">CHI TIẾT BÀI TẬP</Typography>
        <ExerciseDetailForm
          exerciseDetailDetail={{
            exerciseDetailName: exerciseDetailDetail?.exerciseDetailName,
            categoryID: exerciseDetailDetail?.categoryID,
            exerciseDetailTimePerWeek: exerciseDetailDetail?.exerciseDetailTimePerWeek,
            flag: exerciseDetailDetail?.flag,
            status: exerciseDetailDetail?.status,
          }}
          categories={categories}
          onFormSubmit={handleFormSubmit}
          isLoading={exerciseDetailStatus === "loading"}
        />
      </Stack>
      <ConfirmDialog
        open={open}
        handleClose={handleClose}
        desc="Cập nhật bài tập thành công"
      />
    </Container>
  );
};

export default EditExerciseDetail;
