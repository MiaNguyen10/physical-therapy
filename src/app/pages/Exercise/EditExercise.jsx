import { Container, Stack, Typography } from "@mui/material";
import { selectToken } from "cores/reducers/authentication";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCategories } from "../../../cores/reducers/category";
import { getStatusExercises } from "../../../cores/reducers/exercise";
import { getCategoryList } from "../../../cores/thunk/category";
import { editExercise } from "../../../cores/thunk/exercise";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import ExerciseForm from "./components/ExerciseForm";

const EditExercise = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const exerciseStatus = useSelector(getStatusExercises);
  const token = useSelector(selectToken);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  let categories = useSelector(getCategories);
  const [desc, setDesc] = useState("");
  const err = useSelector((state) => state.exercise.error);

  const [data, setData] = useState(null);
  console.log("🚀 ~ file: EditExercise.jsx:25 ~ EditExercise ~ data:", data)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/Exercise/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFormSubmit = ({
    exerciseName,
    categoryID,
    exerciseTimePerWeek,
    iconUrl,
  }) => {
    if (!iconUrl) {
      // Set a default value for iconUrl
      iconUrl = "https://firebasestorage.googleapis.com/v0/b/healthcaresystem-98b8d.appspot.com/o/exercise%2Fdefault.png?alt=media&token=8adfd8ce-aea7-4248-92da-a63403e54f91&_gl=1*6v4lvz*_ga*OTY4MjcyNzY2LjE2ODQ1NjA4MzQ.*_ga_CW55HF8NVT*MTY4NTQ0NDY3Ny4zLjEuMTY4NTQ0NDcyNy4wLjAuMA..";
    }
    const excercise = {
      exerciseID: id,
      exerciseName: exerciseName,
      categoryID: categoryID,
      exerciseTimePerWeek: exerciseTimePerWeek,
      iconUrl: iconUrl,
    };
    try {
      dispatch(editExercise({ excercise, token })).unwrap();
      if (!err) setData(excercise);
      setOpen(true);
    } catch (err) {
      // eslint-disable-next-line no-empty
    }
  };

  useEffect(() => {
    dispatch(getCategoryList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!err) {
      setDesc("Cập nhật thông tin thành công");
    } else {
      setDesc("Lỗi, vui lòng nhập lại");
    }
  }, [err]);

  const handleClose = () => {
    setOpen(false);
    navigate(`/exercise/${id}/edit`);
  };

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3">SỬA BÀI TẬP</Typography>
        <ExerciseForm
          exerciseDetail={{
            exerciseName: data?.exerciseName,
            categoryID: data?.categoryID,
            exerciseTimePerWeek: data?.exerciseTimePerWeek,
            iconUrl: data?.iconUrl,
            flag: data?.flag,
            status: data?.status,
          }}
          categories={categories}
          onFormSubmit={handleFormSubmit}
          isLoading={exerciseStatus === "loading"}
        />
      </Stack>
      <ConfirmDialog open={open} handleClose={handleClose} desc={desc} />
    </Container>
  );
};

export default EditExercise;
