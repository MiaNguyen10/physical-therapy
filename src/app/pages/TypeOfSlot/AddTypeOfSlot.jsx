import { Container, Stack, Typography } from "@mui/material";
import { selectToken } from "cores/reducers/authentication";
import { getStatus } from "cores/reducers/typeOfSlot";
import { addTypeOfSlot } from "cores/thunk/typeOfSlot";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import pages from "../../config/pages";
import TypeOfSlotForm from "./components/TypeOfSlotForm";

const AddTypeOfSlot = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const status = useSelector(getStatus);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [desc, setDesc] = useState("");

  const handleFormSubmit = ({ typeName, price }) => {
    const input = {
      typeName: typeName,
      price: price,
      isDeleted: false,
    };
    console.log(input)
    try {
      dispatch(addTypeOfSlot({ input, token })).unwrap();
      setOpen(true);
    } catch (err) {
      // eslint-disable-next-line no-empty
      console.log(err);
    }
  };

  useEffect(() => {
    if (status === "succeeded") {
      setDesc("Thêm thông tin thành công");
    } else {
      setDesc("Lỗi, vui lòng nhập lại");
    }
  }, [status]);

  const handleClose = () => {
    if (status === "succeeded") {
      setOpen(false);
      navigate(`${pages.typeOfSlotListPath}`);
    } else {
      setOpen(false);
      navigate(`${pages.addtypeOfSlotPath}`);
      setDesc("");
    }
  };

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3">THÊM LOẠI SLOT</Typography>
        <TypeOfSlotForm
          onFormSubmit={handleFormSubmit}
          isLoading={status === "loading"}
        />
      </Stack>
      <ConfirmDialog open={open} handleClose={handleClose} desc={desc} />
    </Container>
  );
};

export default AddTypeOfSlot;
