import { Container, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getStatus } from "../../../cores/reducers/exerciseResource";
import { addExerciseResource } from "../../../cores/thunk/exerciseResource";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import pages from "../../config/pages";
import ExerciseResourceForm from "./components/ExerciseResourceForm";
import { getExerciseDetails } from "../../../cores/reducers/exerciseDetail";
import { useEffect } from "react";
import { getExerciseDetailList } from "../../../cores/thunk/exerciseDetail";

const AddExerciseResource = () => {
  const dispatch = useDispatch();
  let exerciseDetails = useSelector(getExerciseDetails)

  const exerciseResourceStatus = useSelector(getStatus);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    navigate(`${pages.exerciseResourceListPath}`);
  };
  

  const handleFormSubmit = ({ resourceName, imageURL, exerciseDetailID, videoURL}) => {
    try {
      dispatch(
        addExerciseResource({
          resourceName: resourceName,
          exerciseDetailID: exerciseDetailID,
          imageURL: imageURL,
          videoURL: videoURL,
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
    dispatch(getExerciseDetailList());
  }, [dispatch]);

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h1">THÊM TÀI NGUYÊN BÀI TẬP</Typography>
        <ExerciseResourceForm
          onFormSubmit={handleFormSubmit}
          isLoading={exerciseResourceStatus === "loading"}
          exerciseDetails={exerciseDetails}
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

export default AddExerciseResource;
