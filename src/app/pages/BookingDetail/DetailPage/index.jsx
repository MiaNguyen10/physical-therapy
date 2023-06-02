import { Box, Container, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserAvatar from "./components/UserAvatar";
import { Info } from "@mui/icons-material";
import InfoField from "./components/InfoField";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { getDate } from "./utils";
import { getTypeOfSlot } from "app/constant/bookingDetail";
import { getPaymentStatus } from "app/constant/payment";

const initState = {
  imageUrl: undefined,
  patientName: undefined,
  createDate: undefined,
  therapistName: undefined,
  status: {
    color: undefined,
    status: undefined,
  },
  typeOfSlot: {
    color: undefined,
    slot: undefined,
  },
};

export default function DetailPage() {
  const { id } = useParams();
  const [detail, setDetail] = useState(initState);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/BookingDetail/${id}`
        );

        const {
          imageUrl,
          bookingSchedule,
          shorttermStatus: statusId,
          longtermStatus: typeOfSlotId,
        } = res.data;
        const { subProfile, timeBooking, schedule } = bookingSchedule;
        console.log(res.data);
        //* get therapis name
        const { physiotherapistDetail } = schedule;
        const { user: therapist } = physiotherapistDetail;
        const { firstName: therapistName } = therapist;
        //* get patient name
        const { subName: patientName } = subProfile;

        //* get create date
        const createDate = getDate(timeBooking);

        //* get status
        const status = getPaymentStatus(statusId);

        //* get type of slot
        const typeOfSlot = getTypeOfSlot(typeOfSlotId);

        setDetail((prev) => {
          return {
            imageUrl,
            patientName,
            createDate,
            therapistName,
            status,
            typeOfSlot,
          };
        });
      } catch (e) {
        console.log(e);
      }
    };

    fetch();
  }, []);

  return (
    <Container fixed maxWidth='md' sx={{ minHeight: "100vh" }}>
      <Stack alignItems='center' sx={{ padding: 3 }}>
        <UserAvatar url={detail.imageUrl} userName={detail.patientName} />
        <Typography variant='h5' textTransform='capitalize' gutterBottom>
          Chi tiết lịch
        </Typography>
        <Grid container flexWrap='wrap' sx={{ paddingY: 4 }} rowSpacing={3}>
          <InfoField label='Ngày đặt' content={detail.createDate} />
          <InfoField
            label='Chuyên viên điều trị'
            content={detail.therapistName}
          />
          <InfoField
            label='Trạng thái'
            content={detail.status.status}
            textColor={detail.status.color}
            sx={{ fontWeight: "bold" }}
          />
          <InfoField
            label='Loại điều trị'
            content={detail.typeOfSlot.slot}
            borderColor={detail.typeOfSlot.color}
          />
          <InfoField content='Test' />
        </Grid>
      </Stack>
    </Container>
  );
}
