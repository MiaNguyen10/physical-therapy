import { Button, Container, Stack, Typography } from "@mui/material";
import ConfirmDialog from "app/components/Dialog/ConfirmDialog";
import { selectToken } from "cores/reducers/authentication";
import {
  getStatus,
  resetStatus,
  retreiveExerciseResource,
} from "cores/reducers/exerciseResource";
import {
  deleteExerciseResource,
  getExerciseResource,
} from "cores/thunk/exerciseResource";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  editExerciseDetail
} from "../../../cores/thunk/exerciseDetail";
import ExerciseResourceForm from "./components/ExerciseResourceForm";

const ExerciseResource = () => {
  const { id, idDetail } = useParams();
  const dispatch = useDispatch();
  let exerciseResource = useSelector(retreiveExerciseResource);
  const resourceStatus = useSelector(getStatus);
  const token = useSelector(selectToken);
  const [open, setOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };

  const handleEditFormSubmit = ({ detailName, set, description }) => {
    const excerciseDetail = {
      exerciseDetailID: exerciseResource.exerciseDetailID,
      detailName: detailName,
      description: description,
      exerciseID: exerciseResource.exerciseID,
      set: set,
    };
    try {
      dispatch(editExerciseDetail({ excerciseDetail, token })).unwrap();
      setOpen(true);
      setRefreshKey((oldKey) => oldKey + 1);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (resourceStatus === "succeeded") {
      dispatch(resetStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getExerciseResource({ id: idDetail, token }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3">TÀI NGUYÊN BÀI TẬP</Typography>
        {!Object.keys(exerciseResource).length ? (
          <>
            <Button
              variant="text"
              onClick={() =>
                navigate(
                  `/exercise/${id}/exerciseDetail/${idDetail}/addExerciseResource`
                )
              }
            >
              Thêm tài nguyên bài tập
            </Button>
          </>
        ) : (
          <ExerciseResourceForm
            exerciseResourceDetail={{
              resourceName: exerciseResource?.resourceName,
              imageURL: exerciseResource?.imageURL,
              videoURL: exerciseResource?.videoURL,
            }}
            onFormSubmit={handleEditFormSubmit}
            isLoading={resourceStatus === "loading"}
          />
        )}
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={10}
        >
          <Button
            variant="outlined"
            onClick={() => {
              navigate(`/exercise/${id}/exerciseDetail`);
            }}
          >
            Quay về chi tiết bài tập
          </Button>
          {!Object.keys(exerciseResource).length ? (
            ""
          ) : (
            <>
              <Button
                variant="contained"
                onClick={() => {
                  navigate(`/exercise/${id}/exerciseDetail/${idDetail}/editExerciseResource`);
                }}
              >
                Sửa tài nguyên
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  dispatch(
                    deleteExerciseResource({
                      exerciseResourceID: exerciseResource.exerciseResourceID,
                      token,
                    })
                  );
                  navigate(`/exercise/${id}/exerciseDetail`);
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

export default ExerciseResource;
