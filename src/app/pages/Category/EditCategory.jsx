import { Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCategory,
  getStatusCategory,
  resetStatus,
} from "../../../cores/reducers/category";
import { editCategory, getCategoryDetail } from "../../../cores/thunk/category";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import pages from "../../config/pages";
import CategoryForm from "./components/CategoryForm";

const EditCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const categoryStatus = useSelector(getStatusCategory);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const categoryDetail = useSelector(getCategory);
  const [refreshKey, setRefreshKey] = useState(0);
  const [desc, setDesc] = useState("");

  const handleFormSubmit = ({ categoryName, description, iconUrl }) => {
    try {
      dispatch(
        editCategory({
          categoryID: id,
          categoryName: categoryName,
          description: description,
          iconUrl: iconUrl,
        })
      ).unwrap();
      setRefreshKey((oldKey) => oldKey + 1);
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
    dispatch(getCategoryDetail(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

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
      navigate(`/category/${id}/edit`);
      setDesc("");
    }
  };

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3">SỬA TÌNH TRẠNG</Typography>
        <CategoryForm
          categoryDetail={{
            categoryName: categoryDetail?.categoryName,
            description: categoryDetail?.description,
            iconUrl: categoryDetail?.iconUrl,
          }}
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

export default EditCategory;
