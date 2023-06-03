import { Typography } from "@mui/material";
import React from "react";

export default function SectionTitle({ children }) {
  return (
    <Typography
      variant='h4'
      gutterBottom
      textTransform='uppercase'
      fontWeight={700}
    >
      {children}
    </Typography>
  );
}
