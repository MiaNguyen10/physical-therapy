import { Container, Stack, Typography } from "@mui/material";
import { selectToken } from "cores/reducers/authentication";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getStatus } from "../../../cores/reducers/exerciseResource";
import { addExerciseResource } from "../../../cores/thunk/exerciseResource";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import ExerciseResourceForm from "./components/ExerciseResourceForm";

const AddExerciseResource = () => {
  const {id, idDetail} = useParams();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const exerciseResourceStatus = useSelector(getStatus);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [desc, setDesc] = useState("");

  const handleFormSubmit = ({ resourceName, imageURL, videoURL}) => {
    try {
      const exerciseResource = {
        resourceName: resourceName,
        exerciseDetailID: idDetail,
        imageURL: imageURL,
        videoURL: videoURL,
        isDeleted: false,
      }
      dispatch(
        addExerciseResource({ exerciseResource, token })
      ).unwrap();
      setOpen(true);
    } catch (err) {
      // eslint-disable-next-line no-empty
      console.log(err);
    }
  };

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
      navigate(`/exercise/${id}/exerciseDetailList/${idDetail}/exerciseResource/add`);
      setDesc("");
    }
  };
  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3">THÊM TÀI NGUYÊN BÀI TẬP</Typography>
        <ExerciseResourceForm
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

export default AddExerciseResource;
