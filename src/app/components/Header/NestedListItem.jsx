import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CategoryIcon from "@mui/icons-material/Category";
import EventIcon from "@mui/icons-material/Event";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import HomeIcon from "@mui/icons-material/Home";
import TextsmsIcon from "@mui/icons-material/Textsms";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { selectState } from "cores/reducers/authentication";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import pages from "../../config/pages";

const NestedListItem = () => {
  const navigate = useNavigate();
  const auth = useSelector(selectState);
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
      {auth.role === "Ädmin" ? (
        <>
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
        </>
      ) : (
        <>
          <ListItemButton onClick={() => navigate(`${pages.accountPath}`)}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Quản lý người dùng" />
          </ListItemButton>

          <ListItemButton onClick={() => navigate(`${pages.slotListPath}`)}>
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary="SLOT" />
          </ListItemButton>

          <ListItemButton onClick={() => navigate(`${pages.schedulePath}`)}>
            <ListItemIcon>
              <CalendarMonthIcon />
            </ListItemIcon>
            <ListItemText primary="Lịch" />
          </ListItemButton>
        </>
      )}

      <ListItemButton onClick={() => navigate(`${pages.feedbackListPath}`)}>
        <ListItemIcon>
          <TextsmsIcon />
        </ListItemIcon>
        <ListItemText primary="Feedback" />
      </ListItemButton>
    </List>
  );
};

export default NestedListItem;
