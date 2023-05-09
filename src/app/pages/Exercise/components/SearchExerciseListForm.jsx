import ClearIcon from "@mui/icons-material/Clear";
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const makeStyles = () => ({
  textFieldStyle: {
    width: "320px",
    ".MuiOutlinedInput-root": {
      height: 44,
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
  },
});

const SearchExerciseListForm = ({ onSearch }) => {
  const styles = makeStyles();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      searchKey: "",
      searchCate: "",
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
            placeholder="Nhập tên bài tập cần tìm"
            label="Bài tập"
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
        name="searchCate"
        render={({ field: { onChange, value } }) => (
          <TextField
            sx={{
              ...styles.textFieldStyle,
              width: "500px",
            }}
            placeholder="Nhập tình trạng"
            label="Tình trạng"
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

export default SearchExerciseListForm;
