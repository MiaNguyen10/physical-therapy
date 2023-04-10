import { Button, Container, Stack, Typography } from "@mui/material";
import ConfirmDialog from "app/components/Dialog/ConfirmDialog";
import pages from "app/config/pages";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getStatus, resetStatus } from "../../../cores/reducers/exerciseDetail";
import {
  deleteExerciseDetail,
  editExerciseDetail,
  getExerciseDetailById,
} from "../../../cores/thunk/exerciseDetail";
import ExerciseDetailForm from "./components/ExerciseDetailForm";
import { selectToken } from "cores/reducers/authentication";

const ExerciseDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  let exerciseDetail = useSelector(
    (state) => state.exerciseDetail.exerciseDetail
  );
  const exerciseDetailStatus = useSelector(getStatus);
  const token = useSelector(selectToken);
  const [open, setOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditFormSubmit = ({ detailName, set, description }) => {
    try {
      dispatch(
        editExerciseDetail({
          exerciseDetailID: exerciseDetail.exerciseDetailID,
          detailName: detailName,
          description: description,
          exerciseID: exerciseDetail.exerciseID,
          set: set,
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
    dispatch(getExerciseDetailById({id, token}));
  }, [dispatch, id, refreshKey]);

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3">CHI TIẾT BÀI TẬP</Typography>
        {!Object.keys(exerciseDetail).length ? (
          <>
            <Button
              variant="text"
              onClick={() =>
                navigate(`${pages.exerciseListPath}/${id}/addExerciseDetail`)
              }
            >
              Thêm chi tiết bài tập
            </Button>
          </>
        ) : (
          <ExerciseDetailForm
            exerciseDetail={{
              detailName: exerciseDetail?.detailName,
              set: exerciseDetail?.set,
              description: exerciseDetail?.description,
            }}
            onFormSubmit={handleEditFormSubmit}
            isLoading={exerciseDetailStatus === "loading"}
          />
        )}

        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={18}
        >
          <Button
            variant="outlined"
            onClick={() => navigate(pages.exerciseListPath)}
          >
            Quay về danh sách bài tập
          </Button>
          {!Object.keys(exerciseDetail).length ? (
            ""
          ) : (
            <>
              <Button
                variant="contained"
                onClick={() =>
                  navigate(
                    `/exercise/${id}/exerciseDetail/${exerciseDetail.exerciseDetailID}/exerciseResource`
                  )
                }
              >
                Xem tài nguyên
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  dispatch(
                    deleteExerciseDetail({exerciseDetailID: exerciseDetail.exerciseDetailID, token})
                  );
                  navigate(pages.exerciseListPath);
                }}
              >
                Xóa chi tiết
              </Button>
            </>
          )}
        </Stack>
        <ConfirmDialog
          open={open}
          handleClose={handleClose}
          desc="Cập nhật chi tiết bài tập thành công"
        />
      </Stack>
    </Container>
  );
};

export default ExerciseDetail;
