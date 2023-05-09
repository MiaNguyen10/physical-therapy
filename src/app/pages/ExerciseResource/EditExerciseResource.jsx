import { Container, Stack, Typography } from "@mui/material";
import { selectToken } from "cores/reducers/authentication";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getStatus } from "../../../cores/reducers/exerciseResource";
import { editExerciseResource } from "../../../cores/thunk/exerciseResource";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import ExerciseResourceForm from "./components/ExerciseResourceForm";

const EditExerciseResource = () => {
  const { id, idDetail, idResource } = useParams();
  const dispatch = useDispatch();
  const exerciseResourceStatus = useSelector(getStatus);
  const token = useSelector(selectToken);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [desc, setDesc] = useState("");
  const err = useSelector((state) => state.exerciseResource.error);

  const [exerciseResourceDetail, setExerciseResourceDetail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/ExerciseResource/${idResource}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const jsonData = await response.json();
        setExerciseResourceDetail(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      setExerciseResourceDetail(exerciseResource)
      setOpen(true);
    } catch (err) {
      // eslint-disable-next-line no-empty
    }
  };

  useEffect(() => {
    if (!err) {
      setDesc("Thêm thông tin thành công");
    } else {
      setDesc("Lỗi, vui lòng nhập lại");
    }
  }, [err]);

  const handleClose = () => {
    setOpen(false);
    navigate(
      `/exercise/${id}/exerciseDetailList/${idDetail}/exerciseResource/${idResource}/edit`
    );
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
      <ConfirmDialog open={open} handleClose={handleClose} desc={desc} />
    </Container>
  );
};

export default EditExerciseResource;
