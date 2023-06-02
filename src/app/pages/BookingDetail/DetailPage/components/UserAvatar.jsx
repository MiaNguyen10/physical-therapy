import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";

const SIZE = 120;

export default function UserAvatar({ url, userName = "Tên bệnh nhân" }) {
  return (
    <Stack alignItems='center' sx={{ padding: 3 }}>
      <Typography variant='h4'>Bệnh nhân</Typography>
      <Avatar
        imgProps={{ loading: "lazy", height: SIZE, width: SIZE }}
        sx={{ width: SIZE, height: SIZE, margin: 3 }}
        alt={userName}
        src={url}
      />
      <Typography variant='h5' fontWeight='bold'>
        {userName}
      </Typography>
    </Stack>
  );
}
