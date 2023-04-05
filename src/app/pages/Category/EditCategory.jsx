import { Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCategory,
  getStatus,
  resetStatus,
} from "../../../cores/reducers/category";
import CategoryForm from "./components/CategoryForm";
import { editCategory, getCategoryDetail } from "../../../cores/thunk/category";
import pages from "../../config/pages";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";

const EditCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const categoryStatus = useSelector(getStatus);
  const categoryDetail = useSelector(getCategory);
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleClose = () => {
    setOpen(false)
    navigate(`${pages.categoryListPath}`)
  }

  const handleFormSubmit = ({ categoryID, categoryName, description }) => {
    try {
      dispatch(
        editCategory({
          categoryID: id,
          categoryName: categoryName,
          description: description,
          isDeleted: false,
        })
      ).unwrap();
      setOpen(true)
    } catch (err) {
      // eslint-disable-next-line no-empty
    }
  };

  useEffect(() => {
    if (categoryStatus === "idle") {
      dispatch(
        getCategoryDetail({
          categoryID: id ?? "",
        })
      );
    }
  }, [dispatch, categoryStatus, id]);

  useEffect(() => {
    if (categoryStatus === "succeeded") {
      dispatch(resetStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h1">SỬA DANH MỤC</Typography>
        <CategoryForm
          categoryDetail={{
            categoryID: categoryDetail.categoryID,
            categoryName: categoryDetail.categoryName,
            description: categoryDetail.description,
            isDeleted: categoryDetail.isDeleted,
          }}
          onFormSubmit={handleFormSubmit}
          isLoading={categoryStatus === "loading"}
        />
      </Stack>
      <ConfirmDialog open={open} handleClose={handleClose} desc="Cập nhật danh mục thành công"/>
    </Container>
  );
};

export default EditCategory;
