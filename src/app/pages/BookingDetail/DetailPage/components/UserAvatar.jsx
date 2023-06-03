import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";

const SIZE = 120;

export default function UserAvatar({
  url,
  userName = "Tên bệnh nhân",
  email,
  relationship,
  isNotOwner,
}) {
  return (
    <Stack alignItems='center'>
      <Avatar
        imgProps={{ loading: "lazy", height: SIZE, width: SIZE }}
        sx={{ width: SIZE, height: SIZE, margin: 3 }}
        alt={userName}
        src={url}
      />
      <Typography variant='h5' fontWeight='bold'>
        {userName}
      </Typography>
      <Typography variant='subtitle1' sx={{ fontSize: "14px" }}>
        <strong>Email: </strong>
        {email}
      </Typography>
      <Typography variant='caption' fontSize={13}>
        {isNotOwner ? `${relationship} của chủ tài khoản` : relationship}
      </Typography>
    </Stack>
  );
}
