import { Container, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getStatus } from "../../../cores/reducers/exerciseDetail";
import { addExerciseDetail } from "../../../cores/thunk/exerciseDetail";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import pages from "../../config/pages";
import ExerciseDetailForm from "./components/ExerciseDetailForm";
import { getExercises } from "../../../cores/reducers/exercise";
import { useEffect } from "react";
import { getExerciseList } from "../../../cores/thunk/exercise";

const AddExerciseDetail = () => {
  const dispatch = useDispatch();
  let exercises = useSelector(getExercises)

  const exerciseDetailStatus = useSelector(getStatus);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    navigate(`${pages.exerciseDetailListPath}`);
  };
  

  const handleFormSubmit = ({ detailName, set, exerciseID, description}) => {
    try {
      dispatch(
        addExerciseDetail({
          detailName: detailName,
          exerciseID: exerciseID,
          set: set,
          description: description,
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
    dispatch(getExerciseList());
  }, [dispatch]);

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h1">THÊM CHI TIẾT BÀI TẬP</Typography>
        <ExerciseDetailForm
          onFormSubmit={handleFormSubmit}
          isLoading={exerciseDetailStatus === "loading"}
          exercises={exercises}
        />
      </Stack>
      <ConfirmDialog
        open={open}
        handleClose={handleClose}
        desc="Thêm chi tiết bài tập thành công"
      />
    </Container>
  );
};

export default AddExerciseDetail;
