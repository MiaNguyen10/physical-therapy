import { Container, Stack, Typography } from "@mui/material";
import { selectToken } from "cores/reducers/authentication";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSlot,
  getStatusSlots,
  resetStatus,
} from "../../../cores/reducers/slot";
import { editSlot, getSlotDetail } from "../../../cores/thunk/slot";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import pages from "../../config/pages";
import SlotForm from "./components/SlotForm";
import dayjs from "dayjs";
import moment from 'moment';

const EditSlot = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const slotStatus = useSelector(getStatusSlots);
  const token = useSelector(selectToken);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const slotDetail = useSelector(getSlot);
  const [refreshKey, setRefreshKey] = useState(0);
  const [desc, setDesc] = useState("");

  const handleFormSubmit = ({ slotName, timeStart, timeEnd, available }) => {
    // Add 7 hours to timeStart and timeEnd
    const startTime = new Date(timeStart);
    startTime.setHours(startTime.getHours() + 7);
    const endTime = new Date(timeEnd);
    endTime.setHours(endTime.getHours() + 7);
    const slot = {
      slotID: id,
      slotName: slotName,
      timeStart: dayjs(new Date(startTime)),
      timeEnd: dayjs(new Date(endTime)),
      available,
    };
    try {
      dispatch(editSlot({ slot, token })).unwrap();
      setRefreshKey((oldKey) => oldKey + 1);
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
    dispatch(getSlotDetail({ id: id, token }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  useEffect(() => {
    if (slotStatus === "succeeded") {
      setDesc("Cập nhật thông tin thành công");
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
      navigate(`/slot/${id}/edit`);
      setDesc("");
    }
  };

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3">SỬA SLOT</Typography>
        <SlotForm
          slotDetail={{
            slotName: slotDetail?.slotName,
            timeStart: slotDetail?.timeStart,
            timeEnd: slotDetail?.timeEnd,
            available: slotDetail?.available,
          }}
          onFormSubmit={handleFormSubmit}
          isLoading={slotStatus === "loading"}
        />
      </Stack>
      <ConfirmDialog open={open} handleClose={handleClose} desc={desc} />
    </Container>
  );
};

export default EditSlot;
