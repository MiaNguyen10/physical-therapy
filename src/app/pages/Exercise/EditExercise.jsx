import { Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCategories } from "../../../cores/reducers/category";
import {
  getExercises,
  getStatusExercises,
  resetStatus
} from "../../../cores/reducers/exercise";
import { getCategoryList } from "../../../cores/thunk/category";
import { editExercise, getExerciseList } from "../../../cores/thunk/exercise";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import pages from "../../config/pages";
import ExerciseForm from "./components/ExerciseForm";

const EditExercise = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const exerciseStatus = useSelector(getStatusExercises);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const exerciseList = useSelector(getExercises);
  let categories = useSelector(getCategories);
  const exerciseDetail =
    Array.isArray(exerciseList) &&
    exerciseList.find((exercise) => exercise.exerciseID === id);

  const handleClose = () => {
    setOpen(false);
    navigate(`${pages.exerciseListPath}`);
  };

  const handleFormSubmit = ({
    exerciseName,
    categoryID,
    exerciseTimePerWeek,
    status,
    flag,
  }) => {
    try {
      dispatch(
        editExercise({
          exerciseID: id,
          exerciseName: exerciseName,
          flag: flag,
          categoryID: categoryID,
          exerciseTimePerWeek: exerciseTimePerWeek,
          status: JSON.parse([status]),
        })
      ).unwrap();
      setOpen(true);
    } catch (err) {
      // eslint-disable-next-line no-empty
    }
  };

  useEffect(() => {
    if (exerciseStatus === "succeeded") {
      dispatch(resetStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getExerciseList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategoryList());
  }, [dispatch]);

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h1">SỬA BÀI TẬP</Typography>
        <ExerciseForm
          exerciseDetail={{
            exerciseName: exerciseDetail?.exerciseName,
            categoryID: exerciseDetail?.categoryID,
            exerciseTimePerWeek: exerciseDetail?.exerciseTimePerWeek,
            flag: exerciseDetail?.flag,
            status: exerciseDetail?.status,
          }}
          categories={categories}
          onFormSubmit={handleFormSubmit}
          isLoading={exerciseStatus === "loading"}
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

export default EditExercise;
