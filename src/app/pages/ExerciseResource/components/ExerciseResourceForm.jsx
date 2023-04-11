import { yupResolver } from "@hookform/resolvers/yup";
import {
  Backdrop,
  Box,
  Button,
  CardMedia,
  CircularProgress,
  Container,
  Stack,
  TextField,
} from "@mui/material";
import { makeStyles } from "app/pages/Category/components/CategoryForm";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

const ExerciseResourceForm = ({
  exerciseResourceDetail,
  onFormSubmit,
  isLoading,
}) => {
  const styles = makeStyles();
  const navigate = useNavigate();
  const { id } = useParams();

  const schema = yup.object({
    resourceName: yup.string().required("Vui lòng điền thông tin"),
    imageURL: yup.object().required("Vui lòng đính kèm ảnh"),
    videoURL: yup.object().required("Vui lòng đính kèm video"),
  });

  const {
    handleSubmit,
    formState: { errors: formErrors },
    control,
    reset,
    watch,
    register,
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

          {watch("imageURL") ? (
            <Box
              component="img"
              sx={{
                height: 233,
                width: 350,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
              }}
              alt="User image"
              src={watch("imageURL")}
            />
          ) : null}
          {/* <Controller
            control={control}
            name="imageURL"
            render={({ field: { onChange } }) => (
              <>
                <Button variant="outlined" color="primary" component="label">
                  Add image
                  <input
                    onChange={(e) => onChange(e.target.files)}
                    type="file"
                    accept="image/*"
                    hidden
                    required
                  />
                </Button>
              </>
            )}
          /> */}
          <Button variant="outlined" color="primary" component="label">
            Add image
            <input
              name="imageURL"
              type="file"
              accept="image/*"
              hidden
              required
              {...register("imageURL", { required: true })}
            />
          </Button>

          {watch("videoURL") ? (
            <video
              width="100%"
              height="300px"
              controls
              src={watch("videoURL")}
            />
          ) : null}
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
                        const videoUrlPath = files[0].name;
                        onChange({
                          path: videoUrlPath,
                          url: videoUrl,
                        });
                      }
                    }}
                    type="file"
                    accept="video/*"
                    hidden
                    required
                  />
                </Button>
              </>
            )}
          /> */}
          <Button variant="outlined" color="primary" component="label">
            Add video
            <input
              name="videoURL"
              type="file"
              accept="video/*"
              hidden
              {...register("videoURL", { required: true })}
            />
          </Button>

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
