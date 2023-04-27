import { Button, Container, Stack, Typography } from "@mui/material";
import { selectToken } from "cores/reducers/authentication";
import { getPhysio, getPhysioStatus, resetStatus } from "cores/reducers/physio";
import { editPhysio, getPhysioDetail } from "cores/thunk/physio";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import PhysioForm from "./components/PhysioForm";

const Physiotherapist = () => {
  const { id } = useParams();
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const status = useSelector(getPhysioStatus);
  const [open, setOpen] = useState(false);
  const physioDetail = useSelector(getPhysio);
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);
  const [desc, setDesc] = useState("");

  const handleFormSubmit = ({ specialize, skill }) => {
    try {
      const input = {
        physiotherapistID: physioDetail.physiotherapistID,
        userID: id,
        specialize: specialize,
        skill: skill,
        scheduleStatus: physioDetail.scheduleStatus,
        isDeleted: false,
      };
      dispatch(editPhysio({ input, token })).unwrap();
      setRefreshKey((oldKey) => oldKey + 1);
      setOpen(true);
    } catch (err) {
      // eslint-disable-next-line no-empty
    }
  };

  useEffect(() => {
    if (status === "succeeded") {
      dispatch(resetStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getPhysioDetail({ id: id, token }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

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
    } else {
      setOpen(false);
      navigate(`/user/${id}/physiotherapist`);
      setDesc("");
    }
  };

  return physioDetail === {} ? (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h5">
          Chưa có thông tin chuyên viên vật lý trị liệu
        </Typography>
        <Button
          variant="outlined"
          onClick={() => navigate(`/user/${id}/physiotherapist/add`)}
        >
          Thêm thông tin
        </Button>
      </Stack>
    </Container>
  ) : (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3">NHÀ VẬT LÝ TRỊ LIỆU</Typography>
        <PhysioForm
          physioDetail={{
            specialize: physioDetail?.specialize,
            skill: physioDetail?.skill,
          }}
          onFormSubmit={handleFormSubmit}
          isLoading={status === "loading"}
          id={id}
        />
      </Stack>
      <ConfirmDialog open={open} handleClose={handleClose} desc={desc} />
    </Container>
  );
};

export default Physiotherapist;
