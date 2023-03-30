import { styled } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import physicalTherapyActivity from "../../../assets/physical_therapy_activity.jpg";
import CarouselText from "./CarouselText";

const Details = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: theme.spacing(10),
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  }));

  const ImgContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  }));

  return (
    <Box sx={{ py: 10 }}>
      <Container>
        <CustomBox>
          <ImgContainer>
            <img
              src={physicalTherapyActivity}
              alt="physical_therapy_activity"
              style={{ maxWidth: "100%", borderRadius: 10 }}
            />
          </ImgContainer>
          <CarouselText />
        </CustomBox>
      </Container>
    </Box>
  );
};

export default Details;
