import { yupResolver } from "@hookform/resolvers/yup";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import { makeStyles } from "app/pages/Category/components/CategoryForm";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

const ExerciseResourceForm = ({
  exerciseResourceDetail,
  onFormSubmit,
  isLoading,
}) => {
  const styles = makeStyles();
  const navigate = useNavigate();
  const { id, idDetail } = useParams();
  const inputRef = React.useRef();
  const schema = yup.object({
    resourceName: yup.string().required("Vui lòng điền thông tin"),
    imageURL: yup.string().required("Vui lòng đính kèm ảnh"),
    videoURL: yup.string().required("Vui lòng đính kèm video"),
  });

  const {
    handleSubmit,
    formState: { errors: formErrors },
    control,
    reset,
    watch,
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
    <Container sx={{ width: "100%", display: "flex" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Backdrop open={isLoading} sx={{ zIndex: 9 }}>
          <CircularProgress />
        </Backdrop>
        <Grid container spacing={3}>
          <Grid item xs={6}>
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
                  inputProps={{ required: true }}
                  label="Tên tài nguyên của bài tập"
                  variant="outlined"
                />
              )}
            />

            {watch("imageURL") ? (
              <Box
                component="img"
                sx={{
                  height: 350,
                  width: 450,
                  maxHeight: { xs: 350, md: 217 },
                  maxWidth: { xs: 450, md: 350 },
                  mt: 4,
                }}
                alt="User image"
                src={watch("imageURL")}
                ref={inputRef}
              />
            ) : null}
            <Controller
              control={control}
              name="imageURL"
              render={({ field: { onChange, value } }) => (
                <TextField
                  sx={{ ...styles.textFieldStyle, mt:5 }}
                  value={value}
                  onChange={onChange}
                  error={!!formErrors?.imageURL}
                  helperText={formErrors?.imageURL?.message}
                  required
                  inputProps={{ required: true }}
                  label="Hình ảnh"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            {watch("videoURL") ? (
              <ReactPlayer
                url={watch("videoURL")}
                controls
                width="100%"
                height="300px"
              />
            ) : null}
            <Controller
              control={control}
              name="videoURL"
              render={({ field: { onChange, value } }) => (
                <TextField
                  sx={{...styles.textFieldStyle, mt: 4, width: '540px' }}
                  value={value}
                  onChange={onChange}
                  error={!!formErrors?.videoURL}
                  helperText={formErrors?.videoURL?.message}
                  required
                  inputProps={{ required: true }}
                  label="Video"
                  variant="outlined"
                />
              )}
            />
          </Grid>
        </Grid>

        {/* <Controller
            control={control}
            name="imageURL"
            render={({ field: { onChange } }) => (
              <>
                <Button variant="outlined" color="primary" component="label">
                  Add image
                  <input
                    onChange={async (event) => {
                      const { files } = event.target;
                      if (files?.[0]) {
                        const imageUrl = URL.createObjectURL(files[0]);
                        onChange(imageUrl);
                      }
                    }}
                    type="file"
                    accept="image/*"
                    hidden
                    ref={inputRef}
                  />
                </Button>
              </>
            )}
          /> 
          {formErrors?.imageURL && (
            <Typography variant="body2" sx={{ color: "#d32f2f" }}>
              {formErrors.imageURL?.message}
            </Typography>
          )}*/}

        {/* <Controller
            control={control}
            name="videoURL"
            render={({ field: { onChange } }) => (
              <>
                <Button variant="outlined" color="primary" component="label">
                  Add video
                  <input
                    onChange={async (event) => {
                      const { files } = event.target;
                      if (files?.[0]) {
                        const videoUrl = URL.createObjectURL(files[0]);
                        onChange(videoUrl);
                      }
                    }}
                    type="file"
                    accept="video/*"
                    hidden
                  />
                </Button>
              </>
            )}
          /> 
          {formErrors?.videoURL && (
            <Typography variant="body2" sx={{ color: "#d32f2f" }}>
              {formErrors.videoURL?.message}
            </Typography>
          )}*/}

        <Stack
          direction="row"
          justifyContent="flex-end"
          spacing={2}
          sx={{ width: "100%", mt: 4 }}
        >
          <Button
            variant="outlined"
            onClick={() =>
              navigate(
                `/exercise/${id}/exerciseDetailList/${idDetail}/exerciseResource`
              )
            }
            disabled={isLoading}
          >
            Hủy bỏ
          </Button>
          <Button variant="contained" disabled={isLoading} type="submit">
            Lưu thông tin
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default ExerciseResourceForm;
