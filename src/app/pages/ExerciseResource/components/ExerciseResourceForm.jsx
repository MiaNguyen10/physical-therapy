import { yupResolver } from "@hookform/resolvers/yup";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  TextField,
} from "@mui/material";
import { makeStyles } from "app/pages/Category/components/CategoryForm";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import pages from "../../../config/pages";

const ExerciseResourceForm = ({
  exerciseResourceDetail,
  onFormSubmit,
  isLoading,
}) => {
  const styles = makeStyles();
  const navigate = useNavigate();
  const {id} = useParams()

  const schema = yup.object({
    resourceName: yup.string().required("Vui lòng điền thông tin"),
    imageURL: yup.string().required("Vui lòng điền thông tin"),
    videoURL: yup.string().required("Vui lòng điền thông tin"),
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
      resourceName: "",
      imageURL: "",
      videoURL: "",
    },
  });

  const onSubmit = (data) => onFormSubmit(data);

  useEffect(() => {
    reset({
      resourceName: exerciseResourceDetail?.resourceName,
      imageURL: exerciseResourceDetail?.imageURL,
      videoURL: exerciseResourceDetail?.videoURL,
    });
  }, [exerciseResourceDetail, reset]);

  return (
    <Container sx={{ width: "50%", display: "flex" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Backdrop open={isLoading} sx={{ zIndex: 9 }}>
          <CircularProgress />
        </Backdrop>
        <Stack alignItems="flex-start" pt={3} spacing={5}>
          <Controller
            control={control}
            name="resourceName"
            render={({ field: { onChange, value } }) => (
              <TextField
                sx={styles.textFieldStyle}
                value={value}
                onChange={onChange}
                error={!!formErrors?.resourceName}
                helperText={formErrors?.resourceName?.message}
                required
                inputProps={{ required: false, maxLength: 255 }}
                label="Tên tài nguyên của bài tập"
                variant="outlined"
              />
            )}
          />

          <Controller
            control={control}
            name="imageURL"
            render={({ field: { onChange, value } }) => (
              <React.Fragment>
                <TextField
                  sx={styles.textFieldStyle}
                  value={value}
                  onChange={onChange}
                  error={!!formErrors?.imageURL}
                  helperText={formErrors?.imageURL?.message}
                  required
                  inputProps={{ required: false, maxLength: 255 }}
                  label="Hình ảnh"
                  variant="outlined"
                />
                <Box component="img" src={value} />
              </React.Fragment>
            )}
          />

          <Controller
            control={control}
            name="videoURL"
            render={({ field: { onChange, value } }) => (
              <React.Fragment>
                <TextField
                  sx={styles.textFieldStyle}
                  value={value}
                  onChange={onChange}
                  error={!!formErrors?.videoURL}
                  helperText={formErrors?.videoURL?.message}
                  required
                  inputProps={{ required: false, maxLength: 255 }}
                  label="Video"
                  variant="outlined"
                />
                <ReactPlayer url={value} controls={true} />
              </React.Fragment>
            )}
          />

          <Stack
            direction="row"
            justifyContent="center"
            spacing={2}
            sx={{ width: "100%" }}
          >
            <Button
              variant="outlined"
              onClick={() => navigate(`/exercise/${id}/exerciseDetail`)}
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

export default ExerciseResourceForm;
