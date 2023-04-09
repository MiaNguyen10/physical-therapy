import { Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../../cores/reducers/category";
import { getStatusSlots } from "../../../cores/reducers/slot";
import { getCategoryList } from "../../../cores/thunk/category";
import { addSlot } from "../../../cores/thunk/slot";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import pages from "../../config/pages";
import SlotForm from "./components/SlotForm";

const AddSlot = () => {
  const dispatch = useDispatch();
  let categories = useSelector(getCategories);

  const slotStatus = useSelector(getStatusSlots);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    navigate(`${pages.slotListPath}`);
  };

  const handleFormSubmit = ({ slotName, timeStart, timeEnd, price, description }) => {
    try {
      dispatch(
        addSlot({
          slotName: slotName,
          description: description,
          timeStart: timeStart,
          timeEnd: timeEnd,
          price: price,
          available: true,
          isDeleted: false
        })
      ).unwrap();
      setOpen(true);
    } catch (err) {
      // eslint-disable-next-line no-empty
      console.log(err);
    }
  };

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h1">THÊM SLOT</Typography>
        <SlotForm
          onFormSubmit={handleFormSubmit}
          isLoading={slotStatus === "loading"}
          categories={categories}
        />
      </Stack>
      <ConfirmDialog
        open={open}
        handleClose={handleClose}
        desc="Thêm slot thành công"
      />
    </Container>
  );
};

export default AddSlot;
