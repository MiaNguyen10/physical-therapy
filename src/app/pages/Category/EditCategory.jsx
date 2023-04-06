import { Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCategories,
  getStatus,
  resetStatus
} from "../../../cores/reducers/category";
import { editCategory, getCategoryList } from "../../../cores/thunk/category";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import pages from "../../config/pages";
import CategoryForm from "./components/CategoryForm";

const EditCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const categoryStatus = useSelector(getStatus);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const categoryList = useSelector(getCategories)
  const categoryDetail = Array.isArray(categoryList) && categoryList.find(category => category.categoryID === id)

  const handleClose = () => {
    setOpen(false);
    navigate(`${pages.categoryListPath}`);
  };

  const handleFormSubmit = ({ categoryName, description }) => {
    try {
      dispatch(
        editCategory({
          categoryID: id,
          categoryName: categoryName,
          description: description,
          isDeleted: true,
        })
      ).unwrap();
      setOpen(true);
    } catch (err) {
      // eslint-disable-next-line no-empty
    }
  };

  useEffect(() => {
    if (categoryStatus === "succeeded") {
      dispatch(resetStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  useEffect(() => {
    dispatch(getCategoryList());
  }, [dispatch]);

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h1">SỬA DANH MỤC</Typography>
        <CategoryForm
          categoryDetail={{
            categoryName: categoryDetail?.categoryName,
            description: categoryDetail?.description,
          }}
          onFormSubmit={handleFormSubmit}
          isLoading={categoryStatus === "loading"}
        />
      </Stack>
      <ConfirmDialog
        open={open}
        handleClose={handleClose}
        desc="Cập nhật danh mục thành công"
      />
    </Container>
  );
};

export default EditCategory;
