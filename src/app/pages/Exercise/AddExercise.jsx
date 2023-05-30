import { Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../../cores/reducers/category";
import { getStatusExercises } from "../../../cores/reducers/exercise";
import { getCategoryList } from "../../../cores/thunk/category";
import { addExercise } from "../../../cores/thunk/exercise";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import pages from "../../config/pages";
import ExerciseForm from "./components/ExerciseForm";
import { selectToken } from "cores/reducers/authentication";

const AddExercise = () => {
  const dispatch = useDispatch();
  let categories = useSelector(getCategories);
  const token = useSelector(selectToken)
  const exerciseStatus = useSelector(getStatusExercises);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [desc, setDesc] = useState("");

  const handleFormSubmit = ({
    exerciseName,
    exerciseTimePerWeek,
    categoryID,
    iconUrl,
  }) => {
    if (!iconUrl) {
      // Set a default value for iconUrl
      iconUrl = "https://firebasestorage.googleapis.com/v0/b/healthcaresystem-98b8d.appspot.com/o/exercise%2Fdefault.png?alt=media&token=8adfd8ce-aea7-4248-92da-a63403e54f91&_gl=1*6v4lvz*_ga*OTY4MjcyNzY2LjE2ODQ1NjA4MzQ.*_ga_CW55HF8NVT*MTY4NTQ0NDY3Ny4zLjEuMTY4NTQ0NDcyNy4wLjAuMA..";
    }
    const excercise = {
      exerciseName: exerciseName,
      categoryID: categoryID,
      exerciseTimePerWeek: exerciseTimePerWeek,
      iconUrl: iconUrl,
      flag: true,
      status: true,
      isDeleted: false,
    }
    try {
      dispatch(
        addExercise({excercise, token})
      ).unwrap();
      setOpen(true);
    } catch (err) {
      // eslint-disable-next-line no-empty
      console.log(err);
    }
  };
  

  useEffect(() => {
    dispatch(getCategoryList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (exerciseStatus === "succeeded") {
      setDesc("Thêm thông tin thành công");
    } else {
      setDesc("Lỗi, vui lòng nhập lại");
    }
  }, [exerciseStatus]);

  const handleClose = () => {
    if (exerciseStatus === "succeeded") {
      setOpen(false);
      navigate(`${pages.exerciseListPath}`);
    } else {
      setOpen(false);
      navigate(`${pages.addExercisePath}`);
      setDesc("");
    }
  };
  
  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3">THÊM BÀI TẬP</Typography>
        <ExerciseForm
          onFormSubmit={handleFormSubmit}
          isLoading={exerciseStatus === "loading"}
          categories={categories}
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

export default AddExercise;
