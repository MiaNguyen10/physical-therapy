import { Container, Stack, Typography } from "@mui/material";
import { selectToken } from "cores/reducers/authentication";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getStatusSlots } from "../../../cores/reducers/slot";
import { editSlot } from "../../../cores/thunk/slot";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import SlotForm from "./components/SlotForm";
import pages from "../../config/pages";

const EditSlot = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const slotStatus = useSelector(getStatusSlots);
  const token = useSelector(selectToken);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [desc, setDesc] = useState("");
  const err = useSelector((state) => state.slot.error);

  const [slotDetail, setSlotDetail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/Slot/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const jsonData = await response.json();
        setSlotDetail(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFormSubmit = ({ slotName, timeStart, timeEnd }) => {
    const start = dayjs(timeStart).add(7, "hour");
    const end = dayjs(timeEnd).add(7, "hour");
    const slot = {
      slotID: id,
      slotName: slotName,
      timeStart: start,
      timeEnd: end,
      available: true,
    };
    try {
      dispatch(editSlot({ slot, token })).unwrap();
      setSlotDetail(slot);
      setOpen(true);
    } catch (error) {
      // eslint-disable-next-line no-empty
    }
  };

  useEffect(() => {
    if (!err) {
      setDesc("Cập nhật thành công");
    } else {
      setDesc("Lỗi, vui lòng nhập lại");
    }
  }, [err]);

  const handleClose = () => {
    if (slotStatus === "succeeded") {
      setOpen(false);
      navigate(`${pages.slotListPath}`);
    } else {
      setOpen(false);
      navigate(`${pages.editSlotPath}`);
      setDesc("");
    }
  };

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3">SỬA BUỔI TRỊ LIỆU</Typography>
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
