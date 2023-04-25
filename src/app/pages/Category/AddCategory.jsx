import { Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getStatusCategory } from "../../../cores/reducers/category";
import { addCategory } from "../../../cores/thunk/category";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import pages from "../../config/pages";
import CategoryForm from "./components/CategoryForm";

const AddCategory = () => {
  const dispatch = useDispatch();
  const categoryStatus = useSelector(getStatusCategory);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [desc, setDesc] = useState("");

  const handleFormSubmit = ({ categoryName, description, iconUrl }) => {
    try {
      dispatch(
        addCategory({
          categoryName: categoryName,
          description: description,
          iconUrl: iconUrl,
          isDeleted: false,
        })
      ).unwrap();
      setOpen(true);
    } catch (err) {
      // eslint-disable-next-line no-empty
      console.log(err);
    }
  };

  useEffect(() => {
    if (categoryStatus === "succeeded") {
      setDesc("Thêm thông tin thành công");
    } else {
      setDesc("Lỗi, vui lòng nhập lại");
    }
  }, [categoryStatus]);

  const handleClose = () => {
    if (categoryStatus === "succeeded") {
      setOpen(false);
      navigate(`${pages.categoryListPath}`);
    } else {
      setOpen(false);
      navigate(`${pages.addCategoryPath}`);
      setDesc("");
    }
  };

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3">THÊM TÌNH TRẠNG</Typography>
        <CategoryForm
          onFormSubmit={handleFormSubmit}
          isLoading={categoryStatus === "loading"}
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

export default AddCategory;
