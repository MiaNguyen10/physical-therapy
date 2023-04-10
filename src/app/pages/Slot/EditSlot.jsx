import { Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCategories } from "../../../cores/reducers/category";
import {
  getSlots,
  getStatusSlots,
  resetStatus,
} from "../../../cores/reducers/slot";
import { getCategoryList } from "../../../cores/thunk/category";
import { editSlot, getSlotList } from "../../../cores/thunk/slot";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import pages from "../../config/pages";
import SlotForm from "./components/SlotForm";
import { selectToken } from "cores/reducers/authentication";

const EditSlot = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const slotStatus = useSelector(getStatusSlots);
  const token = useSelector(selectToken);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const slotList = useSelector(getSlots);
  let categories = useSelector(getCategories);
  const slotDetail =
    Array.isArray(slotList) && slotList.find((slot) => slot.slotID === id);

  const handleClose = () => {
    setOpen(false);
    navigate(`${pages.slotListPath}`);
  };

  const handleFormSubmit = ({
    slotName,
    description,
    timeStart,
    timeEnd,
    price,
  }) => {
    const slot = {
      slotName: slotName,
      description: description,
      timeStart: timeStart,
      timeEnd: timeEnd,
      price: price,
    };
    try {
      dispatch(editSlot({ slot, token })).unwrap();
      setOpen(true);
    } catch (err) {
      // eslint-disable-next-line no-empty
    }
  };

  useEffect(() => {
    if (slotStatus === "succeeded") {
      dispatch(resetStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getSlotList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategoryList());
  }, [dispatch]);

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h1">SỬA BÀI TẬP</Typography>
        <SlotForm
          slotDetail={{
            slotName: slotDetail?.slotName,
            description: slotDetail?.description,
            timeStart: slotDetail?.timeStart,
            timeEnd: slotDetail?.timeEnd,
            price: slotDetail?.price,
          }}
          categories={categories}
          onFormSubmit={handleFormSubmit}
          isLoading={slotStatus === "loading"}
        />
      </Stack>
      <ConfirmDialog
        open={open}
        handleClose={handleClose}
        desc="Cập nhật slot thành công"
      />
    </Container>
  );
};

export default EditSlot;
