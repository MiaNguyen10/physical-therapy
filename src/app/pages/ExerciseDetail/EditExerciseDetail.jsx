import { Container, Stack, Typography } from "@mui/material";
import ConfirmDialog from "app/components/Dialog/ConfirmDialog";
import { selectToken } from "cores/reducers/authentication";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getStatus } from "../../../cores/reducers/exerciseDetail";
import { editExerciseDetail } from "../../../cores/thunk/exerciseDetail";
import ExerciseDetailForm from "./components/ExerciseDetailForm";

const EditExerciseDetail = () => {
  const { id, idDetail } = useParams();
  const dispatch = useDispatch();
  const exerciseDetailStatus = useSelector(getStatus);
  const token = useSelector(selectToken);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [desc, setDesc] = useState("");
  const err = useSelector((state) => state.exerciseDetail.error);

  const [exerciseDetail, setExerciseDetail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/ExerciseDetail/${idDetail}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const jsonData = await response.json();
        setExerciseDetail(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


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
      setExerciseDetail(excerciseDetail)
      setOpen(true);
    } catch (error) {}
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
    navigate(`/exercise/${id}/exerciseDetailList/${idDetail}/edit`);
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
      <ConfirmDialog open={open} handleClose={handleClose} desc={desc} />
    </Container>
  );
};

export default EditExerciseDetail;
