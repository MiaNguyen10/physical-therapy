import { Container, Stack, Typography } from "@mui/material";
import { selectToken } from "cores/reducers/authentication";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getExerciseResource,
  getStatus,
  resetStatus,
} from "../../../cores/reducers/exerciseResource";
import {
  editExerciseResource,
  getExerciseResourceDetail,
} from "../../../cores/thunk/exerciseResource";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import ExerciseResourceForm from "./components/ExerciseResourceForm";

const EditExerciseResource = () => {
  const { id, idDetail, idResource } = useParams();
  const dispatch = useDispatch();
  const exerciseResourceStatus = useSelector(getStatus);
  const token = useSelector(selectToken);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const exerciseResourceDetail = useSelector(getExerciseResource);
  const [refreshKey, setRefreshKey] = useState(0);
  const [desc, setDesc] = useState("");

  const handleFormSubmit = ({ resourceName, imageURL, videoURL }) => {
    const exerciseResource = {
      exerciseResourceID: idResource,
      resourceName: resourceName,
      videoURL: videoURL,
      exerciseDetailID: idDetail,
      imageURL: imageURL,
    };
    try {
      dispatch(editExerciseResource({ exerciseResource, token })).unwrap();
      setRefreshKey((oldKey) => oldKey + 1);
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
    dispatch(getExerciseResourceDetail({ id: idResource, token }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  useEffect(() => {
    if (exerciseResourceStatus === "succeeded") {
      setDesc("Thêm thông tin thành công");
    } else {
      setDesc("Lỗi, vui lòng nhập lại");
    }
  }, [exerciseResourceStatus]);

  const handleClose = () => {
    if (exerciseResourceStatus === "succeeded") {
      setOpen(false);
      navigate(`/exercise/${id}/exerciseDetailList/${idDetail}/exerciseResource`);
    } else {
      setOpen(false);
      navigate(`/exercise/${id}/exerciseDetailList/${idDetail}/exerciseResource/${idResource}/edit`);
      setDesc("");
    }
  };

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3">SỬA TÀI NGUYÊN BÀI TẬP</Typography>
        <ExerciseResourceForm
          exerciseResourceDetail={{
            resourceName: exerciseResourceDetail?.resourceName,
            imageURL: exerciseResourceDetail?.imageURL,
            videoURL: exerciseResourceDetail?.videoURL,
          }}
          onFormSubmit={handleFormSubmit}
          isLoading={exerciseResourceStatus === "loading"}
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

export default EditExerciseResource;
