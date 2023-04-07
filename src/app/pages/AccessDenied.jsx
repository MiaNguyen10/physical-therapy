import { Box, Typography, styled } from "@mui/material";
import CenterPage from "app/components/Page/CenterPage";
import React from "react";

const CenterBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const AccessDenied = () => {
  return (
    <CenterPage>
      <CenterBox>
        <Typography
          sx={{ fontSize: 200, fontWeight: 400, color: "rgb(46, 161, 226)" }}
        >
          403
        </Typography>
      </CenterBox>

      <CenterBox>
        <Typography
          sx={{ fontSize: 60, fontWeight: 400, color: "rgb(46, 161, 226)" }}
        >
          TỪ CHỐI QUYỀN TRUY CẬP
        </Typography>
      </CenterBox>

      <CenterBox>
        <Typography sx={{ fontSize: 32, fontWeight: 600 }}>
          Bạn không có quyền vào trang này.
        </Typography>
      </CenterBox>
    </CenterPage>
  );
};

export default AccessDenied;
