import { Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../../cores/reducers/category";
import { getStatusExercises } from "../../../cores/reducers/exercise";
import { getCategoryList } from "../../../cores/thunk/category";
import { addExercise } from "../../../cores/thunk/exercise";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import pages from "../../config/pages";
import ExerciseForm from "./components/ExerciseForm";
import { selectToken } from "cores/reducers/authentication";

const AddExercise = () => {
  const dispatch = useDispatch();
  let categories = useSelector(getCategories);
  const token = useSelector(selectToken)
  const exerciseStatus = useSelector(getStatusExercises);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    navigate(`${pages.exerciseListPath}`);
  };

  const handleFormSubmit = ({
    exerciseName,
    exerciseTimePerWeek,
    categoryID,
  }) => {
    const excercise = {
      exerciseName: exerciseName,
      categoryID: categoryID,
      exerciseTimePerWeek: exerciseTimePerWeek,
      flag: true,
      status: true,
      isDeleted: false,
    }
    try {
      dispatch(
        addExercise({excercise, token})
      ).unwrap();
      setOpen(true);
    } catch (err) {
      // eslint-disable-next-line no-empty
      console.log(err);
    }
  };
  

  useEffect(() => {
    dispatch(getCategoryList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3">THÊM BÀI TẬP</Typography>
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
