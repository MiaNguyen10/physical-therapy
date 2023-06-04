import { styled, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import homeIllustration from "../../../assets/qrcode_drive.google.com.png";
import CustomButton from "./CustomButton";

const DownloadApp = () => {
  const CustomContainer = styled(Container)(({ theme }) => ({
    backgroundColor: "#17275F",
    height: "416px",
    borderRadius: "15px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      height: "auto",
      flexDirection: "column",
      alignItems: "center",
      padding: theme.spacing(3, 3, 0, 3),
      width: "90%",
      margin: "20px",
    },
  }));

  const CustomBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(5, 0, 10, 0),
    margin: theme.spacing(0, 2, 0, 2),
    [theme.breakpoints.down("md")]: {
      padding: "0",
    },
  }));

  return (
    <CustomBox>
      <CustomContainer>
        <Box>
          <Typography
            sx={{ fontSize: "35px", color: "white", fontWeight: "700" }}
          >
            Tải ứng dụng Mobile của chúng tôi
          </Typography>
          <Typography
            sx={{ fontSize: "16px", color: "#ccc", fontWeight: "500", my: 2 }}
          >
            - Ứng dụng chỉ dành cho chuyên viên và người dùng
          </Typography>
          <Typography
            sx={{ fontSize: "16px", color: "#ccc", fontWeight: "500", my: 2 }}
          >
            - Ứng dụng hỗ trợ đặt lịch hẹn cho người dùng và chuyên viên
          </Typography>
          <Typography
            sx={{ fontSize: "16px", color: "#ccc", fontWeight: "500", my: 2 }}
          >
            - Nhanh tay tải app để có thể cập nhật những bài tập vật lý trị liệu
            mới nhất của chúng tôi!
          </Typography>

          <CustomButton
            backgroundColor="#fff"
            color="#17275F"
            buttonText="Nhấn vào đây để tải ứng dụng HEH"
            // href={process.env.DOWNLOAD_APP}
            href="https://drive.google.com/file/d/1nNgXYQxk2wT_g_cWEnpb3N8l7TRLCeGi/view?usp=drivesdk"
            getStartedBtn={true}
          />
        </Box>

        <img
          src={homeIllustration}
          alt="illustration"
          style={{ maxWidth: "30%" }}
        />
      </CustomContainer>
    </CustomBox>
  );
};

export default DownloadApp;
