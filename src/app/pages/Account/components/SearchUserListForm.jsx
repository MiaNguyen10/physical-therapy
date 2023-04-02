import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { UStatus } from "../Data";

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

const SearchUserListForm = ({ onSearch }) => {
  const styles = makeStyles();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      searchKey: "",
      role: "All",
      status: "All",
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
            placeholder="Enter user name"
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
      {/* <Controller
        control={control}
        name="role"
        render={({ field: { onChange, value } }) => (
          <TextField
            sx={styles.textFieldStyle}
            select
            onChange={onChange}
            value={value}
            variant="outlined"
            label="Role"
          >
            {URole.map((role) => (
              <MenuItem value={role} key={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
        )}
      /> */}
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
      <Button type="submit" variant="outlined" sx={{height: '45px', width: '80px'}}>
        Search
      </Button>
    </Stack>
  );
};

export default SearchUserListForm;
