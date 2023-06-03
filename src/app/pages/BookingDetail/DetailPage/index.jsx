import { Box, Container, Divider, Stack, Typography } from "@mui/material";
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
import SectionTitle from "./components/SectionTitle";

const scheduleInitState = {
  imageUrl: undefined,
  createDate: undefined,
  therapist: {
    name: undefined,
    email: undefined,
  },
  status: {
    color: undefined,
    status: undefined,
  },
  typeOfSlot: undefined,
  slotDate: undefined,
  timeStart: undefined,
  timeEnd: undefined,
};

const paitentInitState = {
  name: undefined,
  avatarUrl: undefined,
  email: undefined,
  relationship: undefined,
  problem: undefined,
  medicine: undefined,
  difficult: undefined,
  injury: undefined,
  curing: undefined,
  isNotOwner: false,
};

const initState = {
  schedule: scheduleInitState,
  patient: paitentInitState,
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
          medicalRecord,
        } = res.data;
        const { subProfile, timeBooking, schedule } = bookingSchedule;
        // console.log(res.data);
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
        const typeOfSlot = schedule.typeOfSlot.typeName;

        //* get slot
        const slotDate = schedule.slot.slotName;

        //*get time start
        const timeStart = getDate(schedule.slot.timeStart);
        //*get time end
        const timeEnd = getDate(schedule.slot.timeEnd);

        //* get therapist email
        const therapistEmail = schedule.physiotherapistDetail.user.email;

        //* get user avatar
        const patientAvaURL = bookingSchedule.user.image;

        //* get user email
        const patientEmail = bookingSchedule.user.email;

        //* get relationship
        const { relationship } = subProfile;
        let relationshipName = relationship.relationName;

        //* get problem, curing, difficult, injury, medicine
        const { problem, curing, difficult, injury, medicine } = medicalRecord;
        console.log(problem);
        console.log(res.data);
        let isNotOwner = true;
        if (relationshipName.toLowerCase() === "tôi") {
          relationshipName = "Chủ tài khoản";
          isNotOwner = false;
        }

        const scheduleData = {
          imageUrl,
          createDate,
          therapist: {
            name: therapistName,
            email: therapistEmail,
          },
          status,
          typeOfSlot,
          slotDate,
          timeStart,
          timeEnd,
        };

        const patientData = {
          name: patientName,
          avatarUrl: patientAvaURL,
          email: patientEmail,
          relationship: relationshipName,
          problem,
          curing,
          difficult,
          injury,
          medicine,
          isNotOwner,
        };

        setDetail((prev) => {
          return {
            schedule: scheduleData,
            patient: patientData,
          };
        });
      } catch (e) {
        console.log(e);
      }
    };

    fetch();
  }, []);

  return (
    <Container fixed sx={{ minHeight: "100vh" }}>
      <Grid container columnSpacing={2} justifyContent='center' flexWrap='wrap'>
        <Grid xs={12} sm={6}>
          <Stack
            alignItems='center'
            sx={{
              my: 3,
              padding: 3,
              border: "1px solid #d1d1d1",
              borderRadius: "10px",
            }}
          >
            <SectionTitle>Hồ sơ bệnh án</SectionTitle>
            <UserAvatar
              url={detail.patient.avatarUrl}
              userName={detail.patient.name}
              email={detail.patient.email}
              relationship={detail.patient.relationship}
              isNotOwner={detail.patient.isNotOwner}
            />
            <Grid
              container
              flexWrap='wrap'
              sx={{ padding: 4 }}
              rowSpacing={3}
              columnSpacing={2}
            >
              <InfoField
                xs={12}
                label='Tình trạng'
                content={detail.patient.problem}
              />
              <InfoField
                label='Thuốc đang sử dụng'
                content={detail.patient.medicine}
              />
              <InfoField
                label='Gặp khó khăn'
                content={detail.patient.difficult}
              />
              <InfoField
                label='Vị trí chấn thương'
                content={detail.patient.injury}
              />
              <InfoField
                label='P/p chữa bệnh'
                content={detail.patient.curing}
              />
            </Grid>
          </Stack>
        </Grid>
        <Divider orientation='vertical' flexItem absolute />
        <Grid xs={12} sm={6}>
          <Stack
            alignItems='center'
            sx={{
              my: 3,
              border: "1px solid #d1d1d1",
              borderRadius: "10px",
              padding: 3,
            }}
          >
            <SectionTitle>Chi tiết lịch</SectionTitle>
            <Typography>
              <strong>Chuyên viên điều trị: </strong>
              {detail.schedule.therapist.name}
            </Typography>
            <Typography variant='subtitle1' sx={{ fontSize: "14px" }}>
              <strong>Email: </strong>
              {detail.schedule.therapist.email}
            </Typography>
            <Grid
              container
              flexWrap='wrap'
              sx={{ padding: 4 }}
              rowSpacing={3}
              columnSpacing={2}
            >
              <InfoField
                xs={12}
                width='100%'
                label='Buổi trị liệu'
                content={detail.schedule.slotDate}
              />
              <InfoField
                label='Thời gian bắt đầu'
                content={detail.schedule.timeStart}
              />
              <InfoField
                label='Thời gian kết thúc'
                content={detail.schedule.timeEnd}
              />
              <InfoField
                label='Ngày đặt'
                content={detail.schedule.createDate}
              />
              <InfoField
                label='Loại trị liệu'
                content={detail.schedule.typeOfSlot}
              />
              <InfoField
                label='Trạng thái'
                content={detail.schedule.status.status}
                textColor={detail.schedule.status.color}
                sx={{ fontWeight: "bold" }}
              />
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
