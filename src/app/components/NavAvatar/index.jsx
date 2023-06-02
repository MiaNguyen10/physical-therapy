import {
  Avatar,
  IconButton,
  Link,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import React from "react";
import KeyIcon from "@mui/icons-material/VpnKey";
import LogoutIcon from "@mui/icons-material/Logout";

const avatarSize = 40;

export default function AvatarMenu({ firstName, profilePath, onLogOut }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        size='small'
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup='true'
        aria-expanded={open ? "true" : undefined}
      >
        <Avatar
          alt={firstName}
          sx={{ width: avatarSize, height: avatarSize }}
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem sx={{ display: "flex", justifyContent: "center" }}>
          <Link
            href={profilePath}
            style={{
              color: "black",
            }}
          >
            Tên người dùng:{" "}
            <span
              style={{
                fontWeight: "bold",
                marginLeft: "3px",
              }}
            >{` ${firstName}`}</span>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            href='/change-password'
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "black",
            }}
          >
            <ListItemIcon>
              <KeyIcon />
            </ListItemIcon>
            Thay đổi mật khẩu
          </Link>
        </MenuItem>
        <MenuItem onClick={onLogOut}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          Đăng xuất
        </MenuItem>
      </Menu>
    </>
  );
}
