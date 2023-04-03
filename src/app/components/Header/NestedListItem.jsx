import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import HomeIcon from "@mui/icons-material/Home";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Groups2Icon from "@mui/icons-material/Groups2";
import MedicationIcon from "@mui/icons-material/Medication";
import CategoryIcon from '@mui/icons-material/Category';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import pages from "../../config/pages";

const NestedListItem = () => {
  const navigate = useNavigate()
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

      <ListItemButton onClick={() => navigate(`${pages.accountPath}`)}>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Danh sách người dùng" />
      </ListItemButton>
      <List component="div" disablePadding>
        <ListItemButton sx={{ pl: 8 }} onClick={() => navigate(`${pages.managerListPath}`)}>
          <ListItemIcon>
            <ManageAccountsIcon />
          </ListItemIcon>
          <ListItemText primary="Quản lý" />
        </ListItemButton>

        <ListItemButton sx={{ pl: 8 }} onClick={() => navigate(`${pages.therapistListPath}`)}>
          <ListItemIcon>
            <MedicationIcon />
          </ListItemIcon>
          <ListItemText primary="Bác sĩ vật lý trị liệu" />
        </ListItemButton>

        <ListItemButton sx={{ pl: 8 }} onClick={() => navigate(`${pages.memberListPath}`)}>
          <ListItemIcon>
            <Groups2Icon />
          </ListItemIcon>
          <ListItemText primary="Người dùng" />
        </ListItemButton>
      </List>

      <ListItemButton onClick={() => navigate(`${pages.categoryListPath}`)}>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Danh mục" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate(`${pages.landingPage}`)}>
        <ListItemIcon>
          <FitnessCenterIcon />
        </ListItemIcon>
        <ListItemText primary="Danh mục bài tập" />
      </ListItemButton>
    </List>
  );
};

export default NestedListItem;
