import { yupResolver } from "@hookform/resolvers/yup";
import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

export const makeStyles = () => ({
  textFieldStyle: {
    width: "500px",
    ".MuiOutlinedInput-root": {
      height: 44,
      "& fieldset": {
        borderColor: "",
      },
    },
    ".MuiSelect-select": {
      marginTop: 1,
    },
    ".MuiInputLabel-root": {
      zIndex: 0,
      top: "-25px",
      fontSize: "16px",
      fontWeight: 700,
      color: "#333333",
      WebkitTransform: "none",
      span: {
        color: "#D93A39",
      },
      "&.Mui-focused": {
        color: "#333333",
      },
      "&.Mui-error": {
        color: "#333333",
      },
    },
    ".MuiOutlinedInput-notchedOutline": {
      legend: {
        maxWidth: 0,
      },
    },
    // ".MuiContainer-root": {
    //   paddingTop: 0,
    // },
  },
});

const MedicalRecordForm = ({
  medicalRecordDetail,
  onFormSubmit,
  isLoading,
  id,
  idSub,
}) => {
  // const { id } = useParams();
  // const { idSub } = useParams();
  const styles = makeStyles();
  const navigate = useNavigate();

  const schema = yup.object({
    problem: yup.string().required("Vui lòng điền thông tin"),
    medicine: yup.string().required("Vui lòng điền thông tin"),
  });

  const {
    handleSubmit,
    formState: { errors: formErrors },
    control,
    reset,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      problem: "",
      medicine: "",
      difficult: "",
      injury: "",
      curing: "",
    },
  });

  const onSubmit = (data) => onFormSubmit(data);

  useEffect(() => {
    reset({
      problem: medicalRecordDetail?.problem,
      medicine: medicalRecordDetail?.medicine,
      difficult: medicalRecordDetail?.difficult,
      injury: medicalRecordDetail?.injury,
      curing: medicalRecordDetail?.curing,
    });
  }, [medicalRecordDetail, reset]);

  return (
    <Container sx={{ width: "90%", display: "flex" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Backdrop open={isLoading} sx={{ zIndex: 9 }}>
          <CircularProgress />
        </Backdrop>
        <Stack alignItems="center" pt={6} spacing={5}>
          <Stack direction="row" spacing={3}>
            <Controller
              control={control}
              name="problem"
              render={({ field: { onChange, value } }) => (
                <TextField
                  sx={styles.textFieldStyle}
                  value={value}
                  onChange={onChange}
                  error={!!formErrors?.problem}
                  helperText={formErrors?.problem?.message}
                  required
                  disabled
                  inputProps={{ required: false, maxLength: 255 }}
                  label="Tình trạng"
                  variant="outlined"
                />
              )}
            />
            <Controller
              control={control}
              name="medicine"
              render={({ field: { onChange, value } }) => (
                <TextField
                  sx={styles.textFieldStyle}
                  value={value}
                  onChange={onChange}
                  error={!!formErrors?.medicine}
                  helperText={formErrors?.medicine?.message}
                  required
                  disabled
                  inputProps={{ required: false, maxLength: 255 }}
                  label="Thuốc đang sử dụng"
                  variant="outlined"
                />
              )}
            />
          </Stack>

          <Stack direction="row" spacing={3}>
            <Controller
              control={control}
              name="injury"
              render={({ field: { onChange, value } }) => (
                <TextField
                  sx={styles.textFieldStyle}
                  value={value}
                  onChange={onChange}
                  error={!!formErrors?.injury}
                  helperText={formErrors?.injury?.message}
                  required
                  disabled
                  inputProps={{ required: false, maxLength: 255 }}
                  label="Vị trí bị chấn thương"
                  variant="outlined"
                />
              )}
            />
            <Controller
              control={control}
              name="difficult"
              render={({ field: { onChange, value } }) => (
                <TextField
                  sx={styles.textFieldStyle}
                  value={value}
                  onChange={onChange}
                  error={!!formErrors?.difficult}
                  helperText={formErrors?.difficult?.message}
                  required
                  disabled
                  inputProps={{ required: false, maxLength: 255 }}
                  label="Khó khăn đang mắc phải"
                  variant="outlined"
                />
              )}
            />
          </Stack>
          <Controller
            control={control}
            name="curing"
            render={({ field: { onChange, value } }) => (
              <TextField
                sx={styles.textFieldStyle}
                value={value}
                onChange={onChange}
                error={!!formErrors?.curing}
                helperText={formErrors?.curing?.message}
                required
                disabled
                inputProps={{ required: false, maxLength: 255 }}
                label="Phương pháp chữa bệnh"
                variant="outlined"
              />
            )}
          />

          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={2}
            sx={{ width: "100%" }}
          >
            <Button
              variant="outlined"
              onClick={() => navigate(`/user/${id}/subProfileList`)}
              disabled={isLoading}
            >
              Quay lại
            </Button>
            {/* <Button variant="contained" disabled={isLoading} type="submit">
              Lưu thông tin
            </Button> */}
          </Stack>
        </Stack>
      </form>
    </Container>
  );
};

export default MedicalRecordForm;
