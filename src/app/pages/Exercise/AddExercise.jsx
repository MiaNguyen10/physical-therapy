import { Container, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getStatus } from "../../../cores/reducers/exercise";
import { addExercise } from "../../../cores/thunk/exercise";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import pages from "../../config/pages";
import ExerciseForm from "./components/ExerciseForm";
import { getCategories } from "../../../cores/reducers/category";
import { useEffect } from "react";
import { getCategoryList } from "../../../cores/thunk/category";

const AddExercise = () => {
  const dispatch = useDispatch();
  let categories = useSelector(getCategories)

  const exerciseStatus = useSelector(getStatus);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    navigate(`${pages.exerciseListPath}`);
  };
  

  const handleFormSubmit = ({ exerciseName, exerciseTimePerWeek, categoryID, status, flag}) => {
    try {
      dispatch(
        addExercise({
          exerciseName: exerciseName,
          flag: JSON.parse([flag]),
          categoryID: categoryID,
          exerciseTimePerWeek: exerciseTimePerWeek,
          status: JSON.parse([status]),
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
        <Typography variant="h1">THÊM BÀI TẬP</Typography>
        <ExerciseForm
          onFormSubmit={handleFormSubmit}
          isLoading={exerciseStatus === "loading"}
          categories={categories}
        />
      </Stack>
      <ConfirmDialog
        open={open}
        handleClose={handleClose}
        desc="Thêm bài tập thành công"
      />
    </Container>
  );
};

export default AddExercise;
