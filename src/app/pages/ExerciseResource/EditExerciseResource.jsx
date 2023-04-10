import { Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getExerciseResources,
  getStatus,
  resetStatus,
} from "../../../cores/reducers/exerciseResource";
import { editExerciseResource, getExerciseResourceList } from "../../../cores/thunk/exerciseResource";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import pages from "../../config/pages";
import ExerciseResourceForm from "./components/ExerciseResourceForm";
import { getExerciseDetailList } from "../../../cores/thunk/exerciseDetail";
import { getExerciseDetails } from "../../../cores/reducers/exerciseDetail";
import { selectToken } from "cores/reducers/authentication";

const EditExerciseResource = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const exerciseResourceStatus = useSelector(getStatus);
  const token = useSelector(selectToken);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const exerciseResourceList = useSelector(getExerciseResources);
  let exerciseDetails = useSelector(getExerciseDetails);
  const exerciseResourceDetail =
    Array.isArray(exerciseResourceList) &&
    exerciseResourceList.find((exerciseResource) => exerciseResource.exerciseResourceID === id);

  const handleClose = () => {
    setOpen(false);
    navigate(`${pages.exerciseResourceListPath}`);
  };

  const handleFormSubmit = ({
    resourceName,
    exerciseDetailID,
    imageURL,
    videoURL,
  }) => {
    const exerciseResource = {
      exerciseResourceID: id,
      resourceName: resourceName,
      videoURL: videoURL,
      exerciseDetailID: exerciseDetailID,
      imageURL: imageURL,
    }
    try {
      dispatch(
        editExerciseResource({ exerciseResource, token})
      ).unwrap();
      setOpen(true);
    } catch (err) {
      // eslint-disable-next-line no-empty
    }
  };

  useEffect(() => {
    if (exerciseResourceStatus === "succeeded") {
      dispatch(resetStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getExerciseResourceList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getExerciseDetailList(token));
  }, [dispatch]);

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h1">SỬA TÀI NGUYÊN BÀI TẬP</Typography>
        <ExerciseResourceForm
          exerciseResourceDetail={{
            resourceName: exerciseResourceDetail?.resourceName,
            exerciseDetailID: exerciseResourceDetail?.exerciseDetailID,
            imageURL: exerciseResourceDetail?.imageURL,
            videoURL: exerciseResourceDetail?.videoURL,
          }}
          exerciseDetails={exerciseDetails}
          onFormSubmit={handleFormSubmit}
          isLoading={exerciseResourceStatus === "loading"}
        />
      </Stack>
      <ConfirmDialog
        open={open}
        handleClose={handleClose}
        desc="Cập nhật tài nguyên bài tập thành công"
      />
    </Container>
  );
};

export default EditExerciseResource;
