import { yupResolver } from "@hookform/resolvers/yup";
import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Stack,
  TextField,
} from "@mui/material";
import { makeStyles } from "app/pages/Account/components/AccountForm";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import pages from "../../../config/pages";

const TypeOfSlotForm = ({ typeOfSlotDetail, onFormSubmit, isLoading }) => {
  const styles = makeStyles();
  const navigate = useNavigate();

  const schema = yup.object({
    typeName: yup.string().required("Vui lòng điền thông tin"),
    price: yup.string().required("Vui lòng điền thông tin"),
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
      typeName: "",
      price: "",
    },
  });

  const onSubmit = (data) => {
    if (data.price < 1000) {
      data.price *= 1000;
    }
    onFormSubmit(data);
  };

  useEffect(() => {
    reset({
      typeName: typeOfSlotDetail?.typeName,
      price: typeOfSlotDetail?.price,
    });
  }, [typeOfSlotDetail, reset]);

  const isTrilieu = typeOfSlotDetail?.typeName === "Trị liệu dài hạn";

  return (
    <Container sx={{ width: "50%", display: "flex" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Backdrop open={isLoading} sx={{ zIndex: 9 }}>
          <CircularProgress />
        </Backdrop>
        <Stack alignItems="flex-start" pt={3} spacing={5}>
          <Controller
            control={control}
            name="typeName"
            render={({ field: { onChange, value } }) => (
              <TextField
                sx={styles.textFieldStyle}
                value={value}
                onChange={onChange}
                error={!!formErrors?.typeName}
                helperText={formErrors?.typeName?.message}
                required
                inputProps={{ required: false, maxLength: 255 }}
                label="Tên loại điều trị"
                variant="outlined"
                disabled={isTrilieu}
              />
            )}
          />

          <Controller
            control={control}
            name="price"
            render={({ field: { onChange, value } }) => (
              <TextField
                sx={styles.textFieldStyle}
                value={value}
                onChange={onChange}
                error={!!formErrors?.price}
                helperText={formErrors?.price?.message}
                required
                inputProps={{ required: false, maxLength: 255 }}
                label="Giá tiền/Buổi"
                variant="outlined"
                type="number"
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
              onClick={() => navigate(pages.typeOfSlotListPath)}
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

export default TypeOfSlotForm;
