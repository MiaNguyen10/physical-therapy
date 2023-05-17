import EditIcon from "@mui/icons-material/Edit";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import DeleteDialog from "app/components/Dialog/DeleteDialog";
import { selectState, selectToken } from "cores/reducers/authentication";
import { getUserStatus, getUsers, resetStatus } from "cores/reducers/user";
import { trim } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { banUser, getUserList, unBanUser } from "../../../cores/thunk/user";
import AddButton from "../../components/Button/AddButton";
import DataGridTable from "../../components/DataGrid/DataGridTable";
import pages from "../../config/pages";
import SearchUserListForm from "./components/SearchUserListForm";

const UserList = () => {
  const dispatch = useDispatch();
  const userList = useSelector(getUsers);
  const status = useSelector(getUserStatus);
  const token = useSelector(selectToken);
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState({
    searchKey: "",
    searchPhone: "",
    status: "Tất cả",
    role: "Tất cả",
  });
  const [refreshKey, setRefreshKey] = useState(0);
  const auth = useSelector(selectState);
  const [idUser, setIdUser] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const [desc, setDesc] = useState("");

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleDelete = () => {
    if (desc === "Bạn có muốn khôi phục tài khoản không?") {
      dispatch(unBanUser({ userID: idUser, token }));
    } else {
      dispatch(banUser({ userID: idUser, token }));
    }
    setRefreshKey((oldKey) => oldKey + 1);
    setIdUser("");
    setOpenDialog(false);
  };

  useEffect(() => {
    dispatch(getUserList(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  useEffect(() => {
    if (status === "succeeded") {
      dispatch(resetStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userListForStaff = userList.filter(
    (user) =>
      user?.role?.name === "Physiotherapist" || user?.role?.name === "Member"
  );
  const listOfUser = auth.role === "Admin" ? userList : userListForStaff;

  const rows = useMemo(() => {
    let banStatus, role;
    if (filters.status === "Hoạt động") {
      banStatus = false;
    } else if (filters.status === "Không hoạt động") {
      banStatus = true;
    }

    if (filters.role === "Quản trị viên") {
      role = "Admin";
    } else if (filters.role === "Nhân viên") {
      role = "Staff";
    } else if (filters.role === "Chuyên viên vật lý trị liệu") {
      role = "Physiotherapist";
    } else {
      role = "Member";
    }

    return listOfUser.filter((user) => {
      const isFoundNameOrEmail =
        user?.email
          .toLowerCase()
          .search(trim(filters.searchKey.toLowerCase())) >= 0 ||
        user?.firstName
          .toLowerCase()
          .search(trim(filters.searchKey.toLowerCase())) >= 0;
      const isFoundPhoneNumb =
        user?.phoneNumber.search(trim(filters.searchPhone)) >= 0;
      const isFoundRole =
        filters.role === "Tất cả" ? true : user?.role?.name === role;
      const isFoundBanded =
        filters.status === "Tất cả" ? true : user?.banStatus === banStatus;
      return (
        isFoundNameOrEmail && isFoundPhoneNumb && isFoundRole && isFoundBanded
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, userList]);

  const columns = [
    {
      field: "firstName",
      headerName: "Họ tên",
      width: 200,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      renderHeader: (params) => (
        <Typography sx={{ fontWeight: "bold", fontSize: "19px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
      renderCell: (params) => <Typography>{params?.value ?? "-"}</Typography>,
    },

    {
      field: "email",
      headerName: "Email",
      width: 250,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      renderHeader: (params) => (
        <Typography sx={{ fontWeight: "bold", fontSize: "19px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
      renderCell: (params) => {
        return <Typography>{params?.value ?? "-"}</Typography>;
      },
    },
    {
      field: "phoneNumber",
      headerName: "Số điện thoại",
      width: 200,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      sortable: false,
      renderHeader: (params) => (
        <Typography sx={{ fontWeight: "bold", fontSize: "19px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
      renderCell: (params) => {
        const phoneNumberRender = params?.value;
        return (
          <Typography>
            {phoneNumberRender ? phoneNumberRender : "< Không có >"}
          </Typography>
        );
      },
    },
    {
      field: "role",
      headerName: "Vai trò",
      width: 200,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      sortable: false,
      renderHeader: (params) => (
        <Typography sx={{ fontWeight: "bold", fontSize: "19px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
      renderCell: (params) => {
        if (params?.value?.name === "Physiotherapist") {
          return <Typography>Chuyên viên vật lý trị liệu</Typography>;
        } else if (params?.value?.name === "Member") {
          return <Typography>Người dùng</Typography>;
        } else if (params?.value?.name === "Staff") {
          return <Typography>Nhân viên</Typography>;
        } else if (params?.value?.name === "Admin") {
          return <Typography>Quản trị viên</Typography>;
        } else {
          return <Typography>{params?.value?.name ?? "-"}</Typography>;
        }
      },
    },
    {
      field: "banStatus",
      headerName: "Trạng thái",
      width: 150,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      renderHeader: (params) => (
        <Typography sx={{ fontWeight: "bold", fontSize: "19px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <Typography>
            {params?.value === true ? "Không hoạt động" : "Hoạt động"}
          </Typography>
        );
      },
    },
    {
      field: "id",
      headerName: "Chỉnh sửa",
      width: 180,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      sortable: false,
      renderHeader: (params) => (
        <Typography sx={{ fontWeight: "bold", fontSize: "19px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <>
            <IconButton
              onClick={() => navigate(`/user/${params?.value}/edit`)}
              sx={{ ml: 1 }}
            >
              <EditIcon
                sx={{ color: "#008542", cursor: "pointer", fontSize: 28 }}
              />
            </IconButton>
            <IconButton
              onClick={() => {
                setOpenDialog(true);
                setIdUser(params?.value);
                params?.row.banStatus === true
                  ? setDesc("Bạn có muốn khôi phục tài khoản không?")
                  : setDesc("Bạn có muốn chặn người dùng này không?");
              }}
              sx={{ ml: 1 }}
              disabled={params?.row.role.name === "Admin"}
            >
              <RemoveCircleIcon
                sx={{
                  color:
                    params?.row.role.name === "Admin" ||
                    params?.row.banStatus === true
                      ? "#1712116f"
                      : "#e63307",
                  cursor: "pointer",
                  fontSize: 28,
                }}
              />
            </IconButton>
          </>
        );
      },
    },
  ];
  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3" alignItems="center">
          DANH SÁCH NGƯỜI DÙNG
        </Typography>
        <SearchUserListForm onSearch={(data) => setFilters(data)} />
        <Box>
          <AddButton
            desc="Thêm người dùng"
            url={`${pages.addUserPath}`}
            sx={{
              mt: -6,
              fontWeight: "bold",
              boxShadow:
                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
            }}
          />
          <DataGridTable
            width="1200px"
            columns={columns}
            rows={rows}
            getRowId={(row) => row.id}
            rowHeight={70}
            page={page}
            onPageChange={handlePageChange}
            rowCount={rows?.length ?? 0}
            isLoading={status !== "succeeded"}
            pagination
            paginationMode="client"
          />
        </Box>
      </Stack>
      <DeleteDialog
        open={openDialog}
        handleClose={handleClose}
        handleDelete={handleDelete}
        desc={desc}
      />
    </Container>
  );
};

export default UserList;
