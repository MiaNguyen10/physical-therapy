import {
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  Tooltip,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import colors from "app/constant/color";
import React from "react";

const NULL_CONTENT = "Không có thông tin";
const LONG_TEXT_NUMBER = 20;

export default function InfoField({
  content = NULL_CONTENT,
  label = "Thông tin",
  textColor = "black",
  borderColor = colors.primary,
  sx = undefined,
  xs = 6,
  width = "95%",
}) {
  return (
    <Grid xs={content.length >= LONG_TEXT_NUMBER ? 12 : xs}>
      <Tooltip title={content} placement='top-start'>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel htmlFor={content} sx={{ color: `${colors.primary}` }}>
            {label}
          </InputLabel>
          <OutlinedInput
            disabled
            id={content}
            value={content === "" ? NULL_CONTENT : content}
            size='small'
            label={label}
            sx={{
              ...sx,
              width,
              "& .Mui-disabled": {
                WebkitTextFillColor: `${textColor} !important`,
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: ` ${borderColor} !important`,
              },
              fontSize: "15px",
            }}
          />
        </FormControl>
      </Tooltip>
    </Grid>
  );
}
