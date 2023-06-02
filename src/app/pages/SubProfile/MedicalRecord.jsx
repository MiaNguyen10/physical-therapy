import { Button, Container, Stack, Typography } from "@mui/material";
import { selectToken } from "cores/reducers/authentication";
import { getSubProfileStatus } from "cores/reducers/subProfile";
import { getMedicalRecordByID } from "cores/thunk/subProfile";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import MedicalRecordForm from "./components/MedicalRecordForm";

const MedicalRecord = () => {
  const { id, idSub } = useParams();
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const status = useSelector(getSubProfileStatus);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [desc, setDesc] = useState("");
  const error = useSelector((state) => state.medicalRecord);

  const [medicalRecordDetail, setMedicalRecordDetail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/MedicalRecord/GetBySubProfileID?subID=${idSub}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const jsonData = await response.json();
        setMedicalRecordDetail(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return medicalRecordDetail === {} ? (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h5">Chưa có thông tin hồ sơ bệnh án</Typography>
        {/* <Button
          variant="outlined"
          onClick={() => navigate(`/user/${id}/medicalRecord/add`)}
        >
          Thêm thông tin
        </Button> */}
      </Stack>
    </Container>
  ) : (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3">HỒ SƠ BỆNH ÁN</Typography>
        <MedicalRecordForm
          medicalRecordDetail={{
            problem: medicalRecordDetail?.problem,
            medicine: medicalRecordDetail?.medicine,
            difficult: medicalRecordDetail?.difficult,
            injury: medicalRecordDetail?.injury,
            curing: medicalRecordDetail?.curing,
          }}
          //   onFormSubmit={handleFormSubmit}
          isLoading={status === "loading"}
          idSub={idSub}
          id={id}
        />
      </Stack>
      {/* <ConfirmDialog open={open} handleClose={handleClose} desc={desc} /> */}
    </Container>
  );
};

export default MedicalRecord;
