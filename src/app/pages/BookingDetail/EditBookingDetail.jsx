import { Container, Stack, Typography } from "@mui/material";
import { selectToken } from "cores/reducers/authentication";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCategories } from "../../../cores/reducers/category";
import { getStatusBookingDetails } from "../../../cores/reducers/bookingDetail";
import { getCategoryList } from "../../../cores/thunk/category";
import { editBookingDetail } from "../../../cores/thunk/bookingDetail";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import BookingDetailForm from "./components/BookingDetailForm";

const EditBookingDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const bookingDetailStatus = useSelector(getStatusBookingDetails);
  const token = useSelector(selectToken);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  let categories = useSelector(getCategories);
  const [desc, setDesc] = useState("");
  const err = useSelector((state) => state.bookingDetail.error);

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/BookingDetail/${id}`,
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
    bookingDetailName,
    categoryID,
    bookingDetailTimePerWeek,
  }) => {
    const excercise = {
      bookingDetailID: id,
      bookingDetailName: bookingDetailName,
      categoryID: categoryID,
      bookingDetailTimePerWeek: bookingDetailTimePerWeek,
    };
    try {
      dispatch(editBookingDetail({ excercise, token })).unwrap();
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
      setDesc("Thêm thông tin thành công");
    } else {
      setDesc("Lỗi, vui lòng nhập lại");
    }
  }, [err]);

  const handleClose = () => {
    setOpen(false);
    navigate(`/bookingDetail/${id}/edit`);
  };

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3">SỬA BÀI TẬP</Typography>
        <BookingDetailForm
          bookingDetailDetail={{
            bookingDetailName: data?.bookingDetailName,
            categoryID: data?.categoryID,
            bookingDetailTimePerWeek: data?.bookingDetailTimePerWeek,
            flag: data?.flag,
            status: data?.status,
          }}
          categories={categories}
          onFormSubmit={handleFormSubmit}
          isLoading={bookingDetailStatus === "loading"}
        />
      </Stack>
      <ConfirmDialog open={open} handleClose={handleClose} desc={desc} />
    </Container>
  );
};

export default EditBookingDetail;
