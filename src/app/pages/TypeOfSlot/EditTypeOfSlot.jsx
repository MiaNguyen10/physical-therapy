import { Container, Stack, Typography } from "@mui/material";
import { selectToken } from "cores/reducers/authentication";
import { getStatus } from "cores/reducers/typeOfSlot";
import { editTypeOfSlot } from "cores/thunk/typeOfSlot";
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
  const [desc, setDesc] = useState("");
  const err = useSelector((state) => state.typeOfSlot.error);

  const [typeOfSlotDetail, setTypeOfSlotDetail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/TypeOfSlot/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const jsonData = await response.json();
        setTypeOfSlotDetail(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFormSubmit = ({ typeName, price }) => {
    const input = {
      typeOfSlotID: id,
      typeName: typeName,
      price: price,
      isDeleted: false,
    };
    try {
      dispatch(editTypeOfSlot({ input, token })).unwrap();
      setTypeOfSlotDetail(input)
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
    setOpen(false);
    navigate(`/typeOfSlot`);
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
