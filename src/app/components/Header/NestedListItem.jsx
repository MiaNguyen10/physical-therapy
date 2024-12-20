import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CategoryIcon from "@mui/icons-material/Category";
import EventIcon from "@mui/icons-material/Event";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import HomeIcon from "@mui/icons-material/Home";
import TextsmsIcon from "@mui/icons-material/Textsms";
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { RestrictedPermission } from "app/middlewares/PermissionProvider";
import { useNavigate } from "react-router-dom";
import pages from "../../config/pages";

const NestedListItem = () => {
  const navigate = useNavigate();
  return (
    <List
      sx={{ width: "100%", maxWidth: 400, bgcolor: "background.paper" }}
      component="nav"
    >
      <ListItemButton onClick={() => navigate(`${pages.landingPage}`)}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Trang chủ" />
      </ListItemButton>

      <ListItemButton onClick={() => navigate(`${pages.userListPath}`)}>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Quản lý người dùng" />
      </ListItemButton>
      <RestrictedPermission permission={"Admin"}>
        <ListItemButton onClick={() => navigate(`${pages.categoryListPath}`)}>
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Tình trạng" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate(`${pages.exerciseListPath}`)}>
          <ListItemIcon>
            <FitnessCenterIcon />
          </ListItemIcon>
          <ListItemText primary="Danh sách bài tập" />
        </ListItemButton>{" "}
      </RestrictedPermission>

      <RestrictedPermission permission={"Staff"}>
        <ListItemButton onClick={() => navigate(`${pages.slotListPath}`)}>
          <ListItemIcon>
            <EventIcon />
          </ListItemIcon>
          <ListItemText primary="Buổi điều trị" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate(`${pages.typeOfSlotListPath}`)}>
          <ListItemIcon>
            <AddIcCallIcon />
          </ListItemIcon>
          <ListItemText primary="Loại điều trị" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate(`${pages.schedulePath}`)}>
          <ListItemIcon>
            <CalendarMonthIcon />
          </ListItemIcon>
          <ListItemText primary="Lịch" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate(`${pages.bookingDetailPath}`)}>
          <ListItemIcon>
            <AccountBalanceWalletIcon />
          </ListItemIcon>
          <ListItemText primary="Booking" />
        </ListItemButton>
      </RestrictedPermission>

      <ListItemButton onClick={() => navigate(`${pages.feedbackListPath}`)}>
        <ListItemIcon>
          <TextsmsIcon />
        </ListItemIcon>
        <ListItemText primary="Phản hồi" />
      </ListItemButton>
    </List>
  );
};

export default NestedListItem;
