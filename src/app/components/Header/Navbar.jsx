import MenuIcon from "@mui/icons-material/Menu";
import { Button, Drawer, Link, Typography, styled } from "@mui/material";
import Box from "@mui/material/Box";
import { RestrictedPermission } from "app/middlewares/PermissionProvider";
import { logout, selectState } from "cores/reducers/authentication";
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import pages from "../../config/pages";
import NestedListItem from "./NestedListItem";

export const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState({
    left: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(selectState);
  const role = JSON.parse(localStorage.getItem("authentication"));

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
    dispatch(logout);
    localStorage.removeItem("authentication");
    navigate(`${pages.loginPath}`);
  };

  // const getTranslatedRole = (role) => {
  //   switch (role) {
  //     case "Member":
  //       return "Thành viên";
  //     case "Physiotherapist":
  //       return "Chuyên viên vật lý trị liệu";
  //     case "Staff":
  //       return "Quản lý";
  //     default:
  //       return role;
  //   }
  // };

  return (
    <>
      {JSON.parse(localStorage.getItem("authentication")) ? (
        <NavbarContainer>
          <NavbarItem>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <RestrictedPermission permission={["Admin", "Staff"]}>
                <CustomMenuIcon onClick={toggleDrawer("left", true)} />
                <Drawer
                  anchor="left"
                  open={mobileMenu["left"]}
                  onClose={toggleDrawer("left", false)}
                >
                  {list("left")}
                </Drawer>
              </RestrictedPermission>

              <a href={pages.landingPage}>
                <img src={logo} alt="Logo" />
              </a>
            </Box>
            <RestrictedPermission permission={["Admin", "Staff"]}>
              <NavbarLinksBox>
                <NavLink variant="body2" href={pages.landingPage}>
                  Trang chủ
                </NavLink>
                <NavLink variant="body2" href={pages.userListPath}>
                  Quản lý người dùng
                </NavLink>
                <RestrictedPermission permission={"Admin"}>
                  {/* Admin */}
                  <NavLink variant="body2" href={pages.categoryListPath}>
                    Tình trạng
                  </NavLink>
                  <NavLink variant="body2" href={pages.exerciseListPath}>
                    Danh sách bài tập
                  </NavLink>
                </RestrictedPermission>
                <RestrictedPermission permission={"Staff"}>
                  {/* Staff */}
                  <NavLink variant="body2" href={pages.slotListPath}>
                    Buổi điều trị
                  </NavLink>
                  <NavLink variant="body2" href={pages.typeOfSlotListPath}>
                    Loại điều trị
                  </NavLink>
                  <NavLink variant="body2" href={pages.schedulePath}>
                    Lịch
                  </NavLink>
                  <NavLink variant="body2" href={pages.bookingDetailPath}>
                    Booking
                  </NavLink>
                </RestrictedPermission>

                <NavLink variant="body2" href={pages.feedbackListPath}>
                  Phản hồi
                </NavLink>
              </NavbarLinksBox>
            </RestrictedPermission>
          </NavbarItem>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <Typography variant="h6" sx={{ fontStyle: "bold", color: "white" }}>
              Xin chào{" "}
              {role.role === "Member"
                ? "Thành viên"
                : role.role === "Physiotherapist"
                ? "Chuyên viên vật lý trị liệu"
                : role.role === "Staff"
                ? "Nhân viên"
                : role.role === "Admin"
                ? "Quản trị viên"
                : role.role}
              : {auth.firstName}
            </Typography>

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
      ) : (
        <NavbarContainer>
          <a href={pages.landingPage}>
            <img src={logo} alt="Logo" />
          </a>
          <NavLink variant="body2" href={pages.loginPath}>
            Đăng nhập
          </NavLink>
        </NavbarContainer>
      )}
    </>
  );
};

export default Navbar;
