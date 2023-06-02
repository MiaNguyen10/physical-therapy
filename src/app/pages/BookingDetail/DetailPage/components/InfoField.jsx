import {
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import colors from "app/constant/color";
import React from "react";

export default function InfoField({
  content = "Không có thông tin",
  label = "Thông tin",
  textColor = "black",
  borderColor = colors.primary,
  sx = undefined,
}) {
  return (
    <Grid xs={4}>
      <FormControl>
        <InputLabel htmlFor={content} sx={{ color: `${colors.primary}` }}>
          {label}
        </InputLabel>
        <OutlinedInput
          disabled
          id={content}
          value={content}
          size='small'
          label={label}
          sx={{
            ...sx,
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
    </Grid>
  );
}
