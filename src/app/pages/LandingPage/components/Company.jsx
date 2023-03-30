import { Box, styled, Typography } from "@mui/material";
import React from "react";

import flexibleTime from "../../../assets/flexible.png";
import medicalTeam from "../../../assets/medical-team.png";
import physicalTherapy from "../../../assets/physical-therapy.png";

import CustomButton from "./CustomButton";
import DownloadApp from "./DownloadApp";

const Company = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    width: "70%",
    [theme.breakpoints.down("md")]: {
      width: "85%",
    },
  }));

  const GuidesBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-around",
    width: "70%",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: "0",
      flexDirection: "column",
    },
  }));

  const GuideBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2, 0, 2, 0),
    },
  }));

  const LargeText = styled(Typography)(({ theme }) => ({
    fontSize: "64px",
    color: "#000",
    fontWeight: "700",
    [theme.breakpoints.down("md")]: {
      fontSize: "32px",
    },
  }));

  const SmallText = styled(Typography)(({ theme }) => ({
    fontSize: "18px",
    color: "#7B8087",
    fontWeight: "500",
    [theme.breakpoints.down("md")]: {
      fontSize: "14px",
    },
  }));

  const TextFlexbox = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(7),
    display: "flex",
    justifyContent: "space-between",
    gap: theme.spacing(20),
    padding: theme.spacing(0, 5, 0, 5),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      gap: theme.spacing(5),
    },
  }));

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "5%",
            height: "5px",
            backgroundColor: "#000339",
            margin: "0 auto",
          }}
        ></div>

        <Typography
          variant="h3"
          sx={{
            fontSize: "35px",
            fontWeight: "bold",
            color: "#000339",
            my: 3,
            textAlign: "center",
          }}
        >
          Vật lý trị liệu phục hồi chức năng cùng Physical Therapy Company
        </Typography>

        <CustomBox>
          <Typography
            variant="body2"
            sx={{
              fontSize: "16px",
              fontWeight: "500",
              color: "#5A6473",
              textAlign: "center",
            }}
          >
            Physical Therapy là nền tảng ứng dụng cung cấp cho bạn những bài tập
            Vật lý trị liệu – Phục hồi chức năng mới nhất, được nhiều bệnh nhân
            trong và ngoài nước tin tưởng tìm đến. Ưu điểm nổi bật khi trải
            nghiệm Physical Therapy app là
          </Typography>
        </CustomBox>

        <GuidesBox>
          <GuideBox>
            <img src={medicalTeam} alt="medical team" />
            <Typography
              variant="body2"
              sx={{
                fontWeight: "500",
                fontSize: "20px",
                color: "#3B3c45",
                my: 1,
              }}
            >
              Đội ngũ chuyên gia uy tín
            </Typography>
          </GuideBox>

          <GuideBox>
            <img src={physicalTherapy} alt="physical therapy excercise" />
            <Typography
              variant="body2"
              sx={{
                fontWeight: "500",
                fontSize: "20px",
                color: "#3B3c45",
                my: 1,
              }}
            >
              Đa dạng các loại bài tập
            </Typography>
          </GuideBox>

          <GuideBox>
            <img src={flexibleTime} alt="flexible time" />
            <Typography
              variant="body2"
              sx={{
                fontWeight: "500",
                fontSize: "20px",
                color: "#3B3c45",
                my: 1,
              }}
            >
              Giờ giấc linh hoạt
            </Typography>
          </GuideBox>
        </GuidesBox>

        <CustomButton
          backgroundColor="#0F1B4C"
          color="#fff"
          buttonText="See Full Guides"
          guideBtn={true}
        />

        <TextFlexbox>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <LargeText>1500+</LargeText>
            <SmallText>Người tin dùng</SmallText>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <LargeText>100+</LargeText>
            <SmallText>Bác sĩ chuyên khoa</SmallText>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <LargeText>1000+</LargeText>
            <SmallText>Bệnh nhân đã khỏi bệnh</SmallText>
          </Box>
        </TextFlexbox>
      </Box>
      <DownloadApp />
    </>
  );
};

export default Company;
