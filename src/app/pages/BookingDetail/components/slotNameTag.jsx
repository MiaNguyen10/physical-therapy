import { Typography } from "@mui/material";
import colors from "app/constant/color";
import React from "react";

export default function SlotNameTag({ bgColor = "red", slotName }) {
  return (
    <Typography
      sx={{
        background: bgColor,
        padding: "3px",
        borderRadius: "10px",
        minWidth: "80px",
        textAlign: "center",
      }}
    >
      {slotName}
    </Typography>
  );
}
