import { Box, styled, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

import physicalTherapy from "../../../assets/physical_therapy.jpg";
import Details from "./Details";
import ReasonToApply from "./ReasonToApply";

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: "64px",
  color: "#000336",
  fontWeight: "bold",
  margin: theme.spacing(4, 0, 4, 0),
  [theme.breakpoints.down("sm")]: {
    fontSize: "40px",
  },
}));

const HeaderHomePage = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(5),
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  return (
    <>
      <Box sx={{ minHeight: "80vh", mt: 10 }}>
        <Container>
          <CustomBox>
            <Box sx={{ flex: "1" }}>
              <Title variant="h2">Vật lý trị liệu là gì?</Title>
              <Typography
                variant="body2"
                sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
              >
                Vật lý trị liệu (physiotherapy) là một trong các phương pháp
                chữa bệnh không dùng thuốc, sử dụng các yếu tố vật lý như nhiệt,
                ánh sáng, điện từ trường, sóng âm, và các tác dụng cơ học như
                kéo giãn, nén ép, để điều trị giảm đau.
              </Typography>
            </Box>

            <Box sx={{ flex: "1" }}>
              <img
                src={physicalTherapy}
                alt="Physical Therapy"
                style={{
                  maxWidth: "100%",
                  marginBottom: "2rem",
                  borderRadius: 20,
                }}
              />
            </Box>
          </CustomBox>
        </Container>
      </Box>
      <ReasonToApply />
      <Details />
    </>
  );
};

export default HeaderHomePage;
