import { Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getStatus,
  resetStatus
} from "../../../cores/reducers/category";
import { addCategory } from "../../../cores/thunk/category";
import CategoryForm from "./components/CategoryForm";
import { useNavigate } from "react-router-dom";
import pages from "../../config/pages";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";

const AddCategory = () => {
  const dispatch = useDispatch();
  const categoryStatus = useSelector(getStatus);
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleClose = () => {
    setOpen(false)
    navigate(`${pages.categoryListPath}`)
  }

  const handleFormSubmit = ({ categoryName, description, isDeleted }) => {
    try {
      dispatch(
        addCategory({
          categoryName: categoryName,
          description: description,
          isDeleted: isDeleted,
        })
      ).unwrap();
      setOpen(true)
    } catch (err) {
      // eslint-disable-next-line no-empty
      console.log(err);
    }
  };

  useEffect(() => {
    if (categoryStatus === "succeeded") {
      dispatch(resetStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h1">THÊM DANH MỤC</Typography>
        <CategoryForm
          onFormSubmit={handleFormSubmit}
          isLoading={categoryStatus === 'idle'}
        />
      </Stack>
      <ConfirmDialog open={open} handleClose={handleClose} desc="Thêm danh mục thành công"/>
    </Container>
  );
};

export default AddCategory;
