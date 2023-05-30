import { Box, Container, styled, Typography } from "@mui/material";
import React from "react";
import DiseaseBox from "./DiseaseBox";
import respiratory from "../../../assets/respiratory.jpg";
import nerveDamage from "../../../assets/nerve_damage.jpg";
import osPain from "../../../assets/osteoarthritis_pain.jpg";

const ReasonToApply = () => {
  const PropertiesBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  }));

  const PropertiesTextBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
  }));

  const ReasonBox = styled(Box)(({ theme }) => ({
    marginTop: "10px",
    [theme.breakpoints.down("md")]: {
      marginTop: "20px",
    },
  }));

  return (
    <ReasonBox>
      <Container>
        <PropertiesTextBox>
          <Typography
            sx={{ color: "#000339", fontSize: "35px", fontWeight: "bold" }}
          >
            Khi nào cần tập vật lý trị liệu phục hồi chức năng?
          </Typography>
          <Typography sx={{ color: "#5A6473", fontSize: "16px", mt: 1 }}>
            Điều trị bằng phương pháp vật lý trị liệu được khuyến khích khi bạn
            đang gặp phải hoặc trải qua những tình trạng như:
          </Typography>
        </PropertiesTextBox>

        <PropertiesBox>
          {DiseaseData.map((disease) => (
            <DiseaseBox
              key={disease.id}
              img={disease.img}
              header={disease.header}
              des={disease.des}
              style={{ borderRadius: "1em" }}
            />
          ))}
        </PropertiesBox>
      </Container>
    </ReasonBox>
  );
};

export default ReasonToApply;

const DiseaseData = [
  {
    id: 1,
    img: nerveDamage,
    header: "Tổn thương về thần kinh – cơ",
    des: "Như chấn thương sọ não, bại não, tổn thương tủy sống hay đột quỵ",
  },
  {
    id: 2,
    img: osPain,
    header: "Mắc bệnh lý về cơ – xương – khớp",
    des: "Như gãy xương, thoái hóa cột sống, gai cột sống, vẹo cột sống hoặc tổn thương dây chằng.",
  },
  {
    id: 3,
    img: respiratory,
    header: "Gặp vấn đề ở đường hô hấp",
    des: "Như viêm phổi, hen phế quản hoặc tắc nghẽn phổi.",
  },
];
