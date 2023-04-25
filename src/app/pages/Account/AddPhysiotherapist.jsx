import { Container, Stack, Typography } from "@mui/material";
import { getPhysioStatus } from "cores/reducers/physio";
import { addPhysio } from "cores/thunk/physio";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import PhysioForm from "./components/PhysioForm";
import { selectToken } from "cores/reducers/authentication";

const AddPhysiotherapist = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const status = useSelector(getPhysioStatus);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [desc, setDesc] = useState("");
  const token = useSelector(selectToken);

  const handleFormSubmit = ({ specialize, skill }) => {
    try {
      const input = {
        userID: id,
        specialize: specialize,
        skill: skill,
        scheduleStatus: 0,
        isDeleted: false,
      };
      dispatch(addPhysio({ input, token })).unwrap();
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
      navigate(`/user/${id}/edit`);
      setDesc("");
    } else {
      setOpen(false);
      navigate(`/user/${id}/physiotherapist/add`);
    }
  };
  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3">THÊM THÔNG TIN NHÀ VẬT LÝ TRỊ LIỆU</Typography>
        <PhysioForm
          onFormSubmit={handleFormSubmit}
          isLoading={status === "loading"}
          id={id}
        />
      </Stack>
      <ConfirmDialog open={open} handleClose={handleClose} desc={desc} />
    </Container>
  );
};

export default AddPhysiotherapist;
