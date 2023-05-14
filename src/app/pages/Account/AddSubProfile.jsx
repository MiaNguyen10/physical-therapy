import { Container, Stack, Typography } from "@mui/material";
import { getPhysioStatus } from "cores/reducers/physio";
import { addPhysio } from "cores/thunk/physio";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import SubProfileForm from "./components/SubProfileForm";
import { selectToken } from "cores/reducers/authentication";

const AddSubProfile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const status = useSelector(getPhysioStatus);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [desc, setDesc] = useState("");
  const token = useSelector(selectToken);

  const handleFormSubmit = ({ relationId, subName }) => {
    try {
      const input = {
        subName: subName,
        isDeleted: false,
        userID: id,
        relationId: "33bcf935-d751-4c98-b835-9f23ae881386"
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
      navigate(`/user/${id}/subProfile/add`);
    }
  };
  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3">THÊM THÔNG TIN TÀI KHOẢN</Typography>
        <SubProfileForm
          onFormSubmit={handleFormSubmit}
          isLoading={status === "loading"}
          id={id}
        />
      </Stack>
      <ConfirmDialog open={open} handleClose={handleClose} desc={desc} />
    </Container>
  );
};

export default AddSubProfile;
