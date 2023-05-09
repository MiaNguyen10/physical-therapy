import { Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../../cores/reducers/category";
import { getStatusBookingDetails } from "../../../cores/reducers/bookingDetail";
import { getCategoryList } from "../../../cores/thunk/category";
import { addBookingDetail } from "../../../cores/thunk/bookingDetail";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import pages from "../../config/pages";
import BookingDetailForm from "./components/BookingDetailForm";
import { selectToken } from "cores/reducers/authentication";

const AddBookingDetail = () => {
  const dispatch = useDispatch();
  let categories = useSelector(getCategories);
  const token = useSelector(selectToken)
  const bookingDetailStatus = useSelector(getStatusBookingDetails);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [desc, setDesc] = useState("");

  const handleFormSubmit = ({
    bookingDetailName,
    bookingDetailTimePerWeek,
    categoryID,
  }) => {
    const excercise = {
      bookingDetailName: bookingDetailName,
      categoryID: categoryID,
      bookingDetailTimePerWeek: bookingDetailTimePerWeek,
      flag: true,
      status: true,
      isDeleted: false,
    }
    try {
      dispatch(
        addBookingDetail({excercise, token})
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
    if (bookingDetailStatus === "succeeded") {
      setDesc("Thêm thông tin thành công");
    } else {
      setDesc("Lỗi, vui lòng nhập lại");
    }
  }, [bookingDetailStatus]);

  const handleClose = () => {
    if (bookingDetailStatus === "succeeded") {
      setOpen(false);
      navigate(`${pages.bookingDetailListPath}`);
    } else {
      setOpen(false);
      navigate(`${pages.addBookingDetailPath}`);
      setDesc("");
    }
  };
  
  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3">THÊM BÀI TẬP</Typography>
        <BookingDetailForm
          onFormSubmit={handleFormSubmit}
          isLoading={bookingDetailStatus === "loading"}
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

export default AddBookingDetail;
