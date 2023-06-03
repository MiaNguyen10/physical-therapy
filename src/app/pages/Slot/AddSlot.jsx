import { Container, Stack, Typography } from "@mui/material";
import { selectToken } from "cores/reducers/authentication";
import { addSlot } from "cores/thunk/slot";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSlots, getStatusSlots } from "../../../cores/reducers/slot";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import pages from "../../config/pages";
import SlotForm from "./components/SlotForm";
import dayjs from "dayjs";

const AddSlot = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const slotStatus = useSelector(getStatusSlots);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [desc, setDesc] = useState("");

  const handleFormSubmit = ({ slotName, timeStart, timeEnd }) => {
    const start = dayjs(timeStart).add(7, "hour").toISOString();
    const end = dayjs(timeEnd).add(7, "hour").toISOString();
    const slot = {
      slotName: slotName,
      timeStart: start,
      timeEnd: end,
      available: true,
      isDeleted: false,
      dateCreated: new Date(),
      dateUpdated: new Date(),
    };
    try {
      console.log(slot);
      dispatch(addSlot({ slot, token })).unwrap();
      setOpen(true);
    } catch (err) {
      // eslint-disable-next-line no-empty
      console.log(err);
    }
  };

  useEffect(() => {
    if (slotStatus === "succeeded") {
      setDesc("Thêm thông tin thành công");
    } else if (slotStatus.includes("overlap")) {
      setDesc("Lỗi, thời gian trùng với buổi trị liệu đã có");
    } else {
      setDesc("Lỗi, vui lòng nhập lại");
    }
  }, [slotStatus]);

  const handleClose = () => {
    if (slotStatus === "succeeded") {
      setOpen(false);
      navigate(`${pages.slotListPath}`);
    } else {
      setOpen(false);
      // navigate(`${pages.addSlotPath}`);
      setDesc("");
    }
  };

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3">THÊM BUỔI TRỊ LIỆU</Typography>
        <SlotForm
          onFormSubmit={handleFormSubmit}
          isLoading={slotStatus === "loading"}
        />
      </Stack>

      <ConfirmDialog open={open} handleClose={handleClose} desc={desc} />
    </Container>
  );
};

export default AddSlot;
