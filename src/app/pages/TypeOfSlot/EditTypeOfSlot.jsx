import { Container, Stack, Typography } from "@mui/material";
import { selectToken } from "cores/reducers/authentication";
import { getDetail, getStatus, resetStatus } from "cores/reducers/typeOfSlot";
import { editTypeOfSlot, getTypeOfSlotDetail } from "cores/thunk/typeOfSlot";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import TypeOfSlotForm from "./components/TypeOfSlotForm";

const EditTypeOfSlot = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const status = useSelector(getStatus);
  const token = useSelector(selectToken);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const typeOfSlotDetail = useSelector(getDetail);
  const [refreshKey, setRefreshKey] = useState(0);
  const [desc, setDesc] = useState("");
  const err = useSelector((state) => state.typeOfSlot.error);

  const handleFormSubmit = ({ typeName, price }) => {
    const input = {
      typeOfSlotID: id,
      typeName: typeName,
      price: price,
      isDeleted: false,
    };
    try {
      dispatch(editTypeOfSlot({ input, token })).unwrap();
      
      setRefreshKey((oldKey) => oldKey + 1);
      setOpen(true);
    } catch (error) {
      // eslint-disable-next-line no-empty
    }
  };

  useEffect(() => {
    if (status === "succeeded") {
      dispatch(resetStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  useEffect(() => {
    dispatch(getTypeOfSlotDetail({ id: id, token }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  useEffect(() => {
    if (!err) {
      setDesc("Cập nhật thành công");
    } else {
      setDesc("Lỗi, vui lòng nhập lại");
    }
  }, [err]);

  const handleClose = () => {
    setOpen(false);
    navigate(`/typeOfSlot/${id}/edit`);
  };

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3">SỬA LOẠI SLOT</Typography>
        <TypeOfSlotForm
          typeOfSlotDetail={{
            typeName: typeOfSlotDetail?.typeName,
            price: typeOfSlotDetail?.price,
          }}
          onFormSubmit={handleFormSubmit}
          isLoading={status === "loading"}
        />
      </Stack>
      <ConfirmDialog open={open} handleClose={handleClose} desc={desc} />
    </Container>
  );
};

export default EditTypeOfSlot;
