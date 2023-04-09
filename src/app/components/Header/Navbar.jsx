import MenuIcon from "@mui/icons-material/Menu";
import { Button, Drawer, Link, styled } from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";
import { useState } from "react";
import logo from "../../assets/logo.png";
import pages from "../../config/pages";
import NestedListItem from "./NestedListItem";
import { useDispatch } from "react-redux";
import { logout } from "cores/reducers/authentication";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState({
    left: false,
  });
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.type === "Tab" || event.type === "Shift")
    ) {
      return;
    }

    setMobileMenu({ ...mobileMenu, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 280 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <NestedListItem />
    </Box>
  );

  const NavLink = styled(Link)({
    fontSize: "18px",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  });

  const NavbarLinksBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(3),

    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  const CustomMenuIcon = styled(MenuIcon)(({ theme }) => ({
    cursor: "pointer",
    display: "none",
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  }));

  const NavbarContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(5),
    backgroundColor: "rgb(46, 161, 226)",
    height: "80px",
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2),
    },
  }));

  const NavbarItem = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "2.5rem",
    margin: "-60px 0",
    [theme.breakpoints.down("md")]: {
      margin: "-20px 0",
    },
  }));

  const handleLogout = () => {
    dispatch(logout)
    localStorage.removeItem("authentication")
    localStorage.removeItem("role")
    navigate(`${pages.loginPath}`)
  }

  return (
    <NavbarContainer>
      <NavbarItem>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CustomMenuIcon onClick={toggleDrawer("left", true)} />
          <Drawer
            anchor="left"
            open={mobileMenu["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
          <a href={pages.landingPage}>
            <img src={logo} alt="Logo" />
          </a>
        </Box>

        <NavbarLinksBox>
          <NavLink variant="body2" href={pages.landingPage}>
            Trang chủ
          </NavLink>
          <NavLink variant="body2" href={pages.accountPath}>
            Danh sách người dùng
          </NavLink>
          <NavLink variant="body2" href={pages.categoryListPath}>
            Danh mục
          </NavLink>
          <NavLink variant="body2" href={pages.exerciseListPath}>
            Danh sách bài tập
          </NavLink>
          <NavLink variant="body2" href={pages.exerciseResourceListPath}>
            Tài nguyên bài tập
          </NavLink>
          <NavLink variant="body2" href={pages.slotListPath}>
            Slot
          </NavLink>
          <NavLink variant="body2" href={pages.schedulePath}>
            Lịch
          </NavLink>
        </NavbarLinksBox>
      </NavbarItem>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        {/* <NavLink variant="body2">Đăng nhập</NavLink> */}
        <Button
          sx={{
            fontSize: "18px",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            backgroundColor: "RGB(0, 110, 170)",
            "&:hover": {
              backgroundColor: "rgb(69, 169, 226)",
            },
          }}
          variant="contained"
          onClick={handleLogout}
        >
          Đăng xuất
        </Button>
      </Box>
    </NavbarContainer>
  );
};

export default Navbar;
