import { Box, styled, Typography } from "@mui/material";
import React from "react";

const DiseaseBox = ({ img, header, des }) => {
  const HouseBox = styled(Box)(({ theme }) => ({
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    maxWidth: 350,
    backgroundColor: "#fff",
    margin: theme.spacing(0, 2, 0, 2),
    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(2, 0, 2, 0),
    },
  }));

  const ImgContainer = styled(Box)(() => ({
    width: "100%",
  }));

  return (
    <HouseBox>
      <ImgContainer>
        <img
          src={img}
          alt={header}
          style={{ width: "350px", height: "227px", borderRadius: "1em" }}
        />
      </ImgContainer>

      <Box
        sx={{
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="body2"
          sx={{ fontWeight: "700", textAlign: "center" }}
        >
          {header}
        </Typography>
        <Typography variant="body2" sx={{ my: 2 }}>
          {des}
        </Typography>
      </Box>
    </HouseBox>
  );
};

export default DiseaseBox;
