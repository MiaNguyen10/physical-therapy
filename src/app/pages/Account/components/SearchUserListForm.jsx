import ClearIcon from "@mui/icons-material/Clear";
import {
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { makeStyles } from "app/pages/Category/components/CategoryForm";
import { selectState } from "cores/reducers/authentication";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export const UStatus = ["Tất cả", "Hoạt động", "Không hoạt động"];
export const URole = [
  "Tất cả",
  "Admin",
  "Staff",
  "Chuyên viên vật lý trị liệu",
  "Người dùng",
];
export const URoleForStaff = ["Tất cả", "Chuyên viên vật lý trị liệu", "Người dùng"];

const SearchUserListForm = ({ onSearch }) => {
  const styles = makeStyles();
  const auth = useSelector(selectState);
  const { handleSubmit, control } = useForm({
    defaultValues: {
      searchKey: "",
      searchPhone: "",
      status: "Tất cả",
      role: "Tất cả",
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
            label="Tên hoặc email"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => onChange("")}>
                    <ClearIcon fontSize="small"/>
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      <Controller
        control={control}
        name="searchPhone"
        render={({ field: { onChange, value } }) => (
          <TextField
            sx={{
              ...styles.textFieldStyle,
              width: "380px",
            }}
            placeholder="Nhập số điện thoại"
            value={value}
            label="Số điện thoại"
            onChange={onChange}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => onChange("")}>
                    <ClearIcon fontSize="small"/>
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
              label="Trạng thái"
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
      <Controller
        control={control}
        name="role"
        render={({ field: { onChange, value } }) => {
          return (
            <TextField
              sx={{
                ...styles.textFieldStyle,
                width: "180px",
              }}
              select
              onChange={onChange}
              value={value}
              variant="outlined"
              label="Vai trò"
            >
              {auth.role === "Staff"
                ? URoleForStaff.map((role) => (
                    <MenuItem value={role} key={role}>
                      {role}
                    </MenuItem>
                  ))
                : URole.map((role) => (
                    <MenuItem value={role} key={role}>
                      {role}
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
        Tìm
      </Button>
    </Stack>
  );
};

export default SearchUserListForm;
