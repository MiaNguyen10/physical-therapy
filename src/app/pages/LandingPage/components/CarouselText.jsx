import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";

const steps = [
  {
    label: "Các hình thức vật lý trị liệu",
    description: `Về cơ bản, vật lý trị liệu được phân thành hai loại, đó là vật lý trị liệu chủ động và vật lý trị liệu bị động`,
  },
  {
    label: "Vật lý trị liệu chủ động",
    description: `Hình thức chủ động của vật lý trị liệu bao gồm các bài tập vận động thể lực, 
      chẳng hạn như bài tập kéo giãn cơ, bài tập cải thiện cơ bắp, bài tập vận động có dụng 
      cụ hoặc bài tập vận động dưới nước. Các bài tập này giúp thúc đẩy tuần hoàn máu, 
      tăng cường sức mạnh cơ bắp và duy trì tính linh hoạt cho xương khớp`,
  },
  {
    label: "Vật lý trị liệu bị động",
    description: `Tập vật lý trị liệu theo hình thức thụ động không 
    yêu cầu người bệnh tăng cường vận động. Thay vào đó, đây là phương pháp được hỗ trợ 
    từ thiết bị hiện đại nhằm giải phóng rễ thần kinh bị chèn ép, tái tạo mô bị tổn thương 
    cũng như giảm áp lực nơi cột sống. Các biện pháp trị liệu vật lý bị động hiện nay bao gồm: 
    sử dụng liệu pháp nhiệt (nóng hoặc lạnh),     sử dụng sóng âm, kích thích điện, điều trị bằng siêu âm, 
    điều trị bằng ánh sáng, nắn hoặc xoa bóp các khớp.`,
  },
];

export default function CarouselText() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={8}
    >
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 50,
          bgcolor: "background.default",
        }}
      >
        <Typography
          sx={{ fontWeight: "bold", fontSize: "30px", alignItems: "left" }}
        >
          {steps[activeStep].label}
        </Typography>
      </Paper>
      <Box sx={{ height: 255, maxWidth: 450, width: "100%" }}>
        {steps[activeStep].description}
      </Box>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
            sx={{pl:3}}
          >
            Tiếp theo
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={handleBack}
            disabled={activeStep === 0}
            sx={{pr:3}}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Trở lại
          </Button>
        }
      />
    </Stack>
  );
}
