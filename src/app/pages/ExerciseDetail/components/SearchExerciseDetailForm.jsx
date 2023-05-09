import ClearIcon from "@mui/icons-material/Clear";
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { makeStyles } from "app/pages/Category/components/CategoryForm";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const SearchExerciseListDetailForm = ({ onSearch }) => {
  const styles = makeStyles();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      searchKey: "",
      searchSet: "",
      searchDesc: "",
    },
  });

  const onSubmit = (data) => {
    onSearch(data);
  };

  return (
    <Stack
      onSubmit={handleSubmit(onSubmit)}
      direction="row"
      component="form"
      alignItems="center"
      spacing={3}
    >
      <Controller
        control={control}
        name="searchKey"
        render={({ field: { onChange, value } }) => (
          <TextField
            sx={{
              ...styles.textFieldStyle,
              width: "380px",
            }}
            placeholder="Nhập chi tiết bài tập"
            label="Chi tiết bài tập"
            value={value}
            onChange={onChange}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => onChange("")}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />

      <Controller
        control={control}
        name="searchDesc"
        render={({ field: { onChange, value } }) => (
          <TextField
            sx={{
              ...styles.textFieldStyle,
              width: "400px",
            }}
            placeholder="Nhập mô tả"
            label="Mô tả"
            value={value}
            onChange={onChange}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => onChange("")}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      <Controller
        control={control}
        name="searchSet"
        render={({ field: { onChange, value } }) => (
          <TextField
            sx={{
              ...styles.textFieldStyle,
              width: "140px",
            }}
            placeholder="Nhập set"
            label="Set"
            value={value}
            onChange={onChange}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => onChange("")}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
            <Button
        type="submit"
        variant="outlined"
        sx={{
          height: "45px",
          width: "80px",
          fontWeight: "bold",
          boxShadow:
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
          fontSize: "1.2rem", // change this value to increase or decrease the font size
          padding: "10px 32px", // change this value to increase or decrease the padding
          border: "2px solid",
        }}
      >
        Tìm
      </Button>
    </Stack>
  );
};

export default SearchExerciseListDetailForm;
