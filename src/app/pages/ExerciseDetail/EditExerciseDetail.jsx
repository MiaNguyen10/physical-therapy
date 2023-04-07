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
import { getExerciseList } from "../../../cores/thunk/exercise";
import { getExercises } from "../../../cores/reducers/exercise";

const EditExerciseDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const exerciseDetailStatus = useSelector(getStatus);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const exerciseDetailList = useSelector(getExerciseDetails);
  let exercises = useSelector(getExercises);
  const exerciseDetailDetail =
    Array.isArray(exerciseDetailList) &&
    exerciseDetailList.find((exerciseDetail) => exerciseDetail.exerciseDetailID === id);

  const handleClose = () => {
    setOpen(false);
    navigate(`${pages.exerciseDetailListPath}`);
  };

  const handleFormSubmit = ({
    detailName,
    exerciseID,
    set,
    description,
  }) => {
    try {
      dispatch(
        editExerciseDetail({
          exerciseDetailID: id,
          detailName: detailName,
          description: description,
          exerciseID: exerciseID,
          set: set,
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
    dispatch(getExerciseList());
  }, [dispatch]);

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h1">SỬA CHI TIẾT BÀI TẬP</Typography>
        <ExerciseDetailForm
          exerciseDetailDetail={{
            detailName: exerciseDetailDetail?.detailName,
            exerciseID: exerciseDetailDetail?.exerciseID,
            set: exerciseDetailDetail?.set,
            description: exerciseDetailDetail?.description,
          }}
          exercises={exercises}
          onFormSubmit={handleFormSubmit}
          isLoading={exerciseDetailStatus === "loading"}
        />
      </Stack>
      <ConfirmDialog
        open={open}
        handleClose={handleClose}
        desc="Cập nhật chi tiết bài tập thành công"
      />
    </Container>
  );
};

export default EditExerciseDetail;
