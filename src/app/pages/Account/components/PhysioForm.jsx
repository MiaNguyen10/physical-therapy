import { yupResolver } from "@hookform/resolvers/yup";
import {
    Backdrop,
    Button,
    CircularProgress,
    Container,
    Stack,
    TextField
} from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { makeStyles } from "./AccountForm";

const PhysioForm = ({physioDetail, onFormSubmit, isLoading, id }) => {
  const styles = makeStyles();
  const navigate = useNavigate();


  const schema = yup.object({
    specialize: yup.string().required("Vui lòng điền thông tin"),
    skill: yup.string().required("Vui lòng điền thông tin"),
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
      specialize: "",
      skill: "",
    },
  });

  const onSubmit = (data) => onFormSubmit(data);

  useEffect(() => {
    reset({
      specialize: physioDetail?.specialize,
      skill: physioDetail?.skill,
    });
  }, [physioDetail, reset]);

  return (
    <Container sx={{ width: "90%", display: "flex" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Backdrop open={isLoading} sx={{ zIndex: 9 }}>
          <CircularProgress />
        </Backdrop>
        <Stack alignItems="flex-start" pt={6} spacing={5}>
          <Stack direction="row" spacing={3}>
            <Controller
              control={control}
              name="specialize"
              render={({ field: { onChange, value } }) => (
                <TextField
                  sx={styles.textFieldStyle}
                  value={value}
                  onChange={onChange}
                  error={!!formErrors?.specialize}
                  helperText={formErrors?.specialize?.message}
                  required
                  inputProps={{ required: false, maxLength: 255 }}
                  label="Chuyên về"
                  variant="outlined"
                />
              )}
            />
            <Controller
              control={control}
              name="skill"
              render={({ field: { onChange, value } }) => (
                <TextField
                  sx={styles.textFieldStyle}
                  value={value}
                  onChange={onChange}
                  error={!!formErrors?.skill}
                  helperText={formErrors?.skill?.message}
                  required
                  inputProps={{ required: false, maxLength: 255 }}
                  label="Kĩ năng"
                  variant="outlined"
                />
              )}
            />
          </Stack>

          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={2}
            sx={{ width: "100%" }}
          >
            <Button
              variant="outlined"
              onClick={() => navigate(`/user/${id}/edit`)}
              disabled={isLoading}
            >
              Hủy bỏ
            </Button>
            <Button variant="contained" disabled={isLoading} type="submit">
              Lưu thông tin
            </Button>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
};

export default PhysioForm;
