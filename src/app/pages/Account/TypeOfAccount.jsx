import { Button, Container, Stack, styled } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import pages from "../../config/pages";

const ButtonStyle = styled(Button)({
  alignItems: "center",
  appearance: "button",
  backgroundColor: "#0276FF",
  borderRadius: "8px",
  borderStyle: "none",
  fontWeight:'bold',
  boShadow: "rgba(255, 255, 255, 0.26) 0 1px 2px inset",
  boxSizing: "border-box",
  color: "#fff",
  cursor: "pointer",
  display: "flex",
  flexDirection: "row",
  flexShrink: 0,
  fontSize: " 25px",
  lineHeight: 1.15,
  margin: 0,
  padding: "10px 21px",
  textAlign: "center",
  textTransform: "none",
  transition:
    "color .13s ease-in-out,background .13s ease-in-out,opacity .13s ease-in-out,box-shadow .13s ease-in-out",
  userSelect: "none",
  touchAction: "manipulation",
  width: "300px",
  height: "100px",
  "&:hover": {
    backgroundColor: "rgb(69, 169, 226)",
  },
});

const TypeOfAccount = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "60px" }}>
        <ButtonStyle
          variant="text"
          onClick={() => navigate(`${pages.userListPath}`)}
        >
          Quản lý
        </ButtonStyle>

        <ButtonStyle
          variant="text"
          onClick={() => navigate(`${pages.therapistListPath}`)}
        >
          Nhà vật lý trị liệu
        </ButtonStyle>

        <ButtonStyle
          variant="text"
          onClick={() => navigate(`${pages.memberListPath}`)}
        >
          Người dùng
        </ButtonStyle>
      </Stack>
    </Container>
  );
};

export default TypeOfAccount;
