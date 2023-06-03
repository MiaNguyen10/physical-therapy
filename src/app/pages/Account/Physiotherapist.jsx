import { Button, Container, Stack, Typography } from "@mui/material";
import { selectToken } from "cores/reducers/authentication";
import { getPhysioStatus } from "cores/reducers/physio";
import { editPhysio } from "cores/thunk/physio";
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
  const navigate = useNavigate();
  const [desc, setDesc] = useState("");
  const error = useSelector((state) => state.physio.error);

  const [physioDetail, setPhysioDetail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/Physiotherapist/GetPhysiotherapistByUserID?userID=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const jsonData = await response.json();
        setPhysioDetail(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      setPhysioDetail(input);
      setOpen(true);
    } catch (err) {
      // eslint-disable-next-line no-empty
    }
  };

  useEffect(() => {
    if (!error) {
      setDesc("Thêm thông tin thành công");
    } else {
      setDesc("Lỗi, vui lòng nhập lại");
    }
  }, [error]);

  const handleClose = () => {
    setOpen(false);
    navigate(`/user/${id}/physiotherapist`);
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
