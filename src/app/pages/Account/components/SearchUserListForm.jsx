import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { makeStyles } from "app/pages/Category/components/CategoryForm";
import React from "react";
import { Controller, useForm } from "react-hook-form";

export const UStatus = ["Tất cả", "Hoạt động", "Không hoạt động"];

const SearchUserListForm = ({ onSearch }) => {
  const styles = makeStyles();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      searchKey: "",
      searchAddress: "",
      status: "Tất cả",
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
            placeholder="Nhập tên hoặc email cần tìm"
            value={value}
            onChange={onChange}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      <Controller
        control={control}
        name="searchAddress"
        render={({ field: { onChange, value } }) => (
          <TextField
            sx={styles.textFieldStyle}
            placeholder="Nhập số điện thoại"
            value={value}
            onChange={onChange}
            variant="outlined"
          />
        )}
      />
      <Controller
        control={control}
        name="status"
        render={({ field: { onChange, value } }) => {
          return (
            <TextField
              sx={{
                ...styles.textFieldStyle,
                width: "140px",
              }}
              select
              onChange={onChange}
              value={value}
              variant="outlined"
              label="Status"
            >
              {UStatus.map((status) => (
                <MenuItem value={status} key={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          );
        }}
      />
      <Button
        type="submit"
        variant="outlined"
        sx={{ height: "45px", width: "80px" }}
      >
        Search
      </Button>
    </Stack>
  );
};

export default SearchUserListForm;
