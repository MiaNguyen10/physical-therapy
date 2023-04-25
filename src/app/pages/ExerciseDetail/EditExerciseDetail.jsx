import { Container, Stack, Typography } from "@mui/material";
import ConfirmDialog from "app/components/Dialog/ConfirmDialog";
import { selectToken } from "cores/reducers/authentication";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getStatus, resetStatus } from "../../../cores/reducers/exerciseDetail";
import {
  editExerciseDetail,
  getExerciseDetailById,
} from "../../../cores/thunk/exerciseDetail";
import ExerciseDetailForm from "./components/ExerciseDetailForm";

const EditExerciseDetail = () => {
  const { id, idDetail } = useParams();
  const dispatch = useDispatch();
  let exerciseDetail = useSelector(
    (state) => state.exerciseDetail.exerciseDetail
  );
  const exerciseDetailStatus = useSelector(getStatus);
  const token = useSelector(selectToken);
  const [open, setOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();
  const [desc, setDesc] = useState("");

  const handleEditFormSubmit = ({ detailName, set, description }) => {
    try {
      const excerciseDetail = {
        exerciseDetailID: idDetail,
        detailName: detailName,
        description: description,
        exerciseID: id,
        set: set,
      };
      dispatch(
        editExerciseDetail({
          excerciseDetail,
          token,
        })
      ).unwrap();
      setOpen(true);
      setRefreshKey((oldKey) => oldKey + 1);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (exerciseDetailStatus === "succeeded") {
      dispatch(resetStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getExerciseDetailById({ id: idDetail, token }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  useEffect(() => {
    if (exerciseDetailStatus === "succeeded") {
      setDesc("Thêm thông tin thành công");
    } else {
      setDesc("Lỗi, vui lòng nhập lại");
    }
  }, [exerciseDetailStatus]);

  const handleClose = () => {
    if (exerciseDetailStatus === "succeeded") {
      setOpen(false);
      navigate(`/exercise/${id}/exerciseDetailList`);
    } else {
      setOpen(false);
      navigate(`/exercise/${id}/exerciseDetailList/${idDetail}/edit`);
      setDesc("");
    }
  };

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3">SỬA CHI TIẾT BÀI TẬP</Typography>

        <ExerciseDetailForm
          exerciseDetail={{
            detailName: exerciseDetail?.detailName,
            set: exerciseDetail?.set,
            description: exerciseDetail?.description,
          }}
          onFormSubmit={handleEditFormSubmit}
          isLoading={exerciseDetailStatus === "loading"}
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

export default EditExerciseDetail;
