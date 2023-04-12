import { Container, Stack, Typography } from "@mui/material";
import { selectToken } from "cores/reducers/authentication";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCategories } from "../../../cores/reducers/category";
import {
  getExercise,
  getStatusExercises,
  resetStatus
} from "../../../cores/reducers/exercise";
import { getCategoryList } from "../../../cores/thunk/category";
import { editExercise, getExerciseDetail } from "../../../cores/thunk/exercise";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import pages from "../../config/pages";
import ExerciseForm from "./components/ExerciseForm";

const EditExercise = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const exerciseStatus = useSelector(getStatusExercises);
  const token = useSelector(selectToken);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  let categories = useSelector(getCategories);
  const exerciseDetail = useSelector(getExercise)
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
    const excercise = {
      exerciseID: id,
      exerciseName: exerciseName,
      flag: flag,
      categoryID: categoryID,
      exerciseTimePerWeek: exerciseTimePerWeek,
      status: JSON.parse([status]),
    };
    try {
      dispatch(editExercise({ excercise, token })).unwrap();
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
    dispatch(getExerciseDetail({id, token}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getCategoryList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
