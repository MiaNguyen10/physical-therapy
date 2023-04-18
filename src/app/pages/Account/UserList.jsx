import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Container,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { selectState, selectToken } from "cores/reducers/authentication";
import { getUserStatus, getUsers, resetStatus } from "cores/reducers/user";
import { trim } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { banUser, getUserList } from "../../../cores/thunk/user";
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

  const handlePageChange = (page) => {
    setPage(page);
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

    if (filters.role === "Admin") {
      role = "Admin";
    } else if (filters.role === "Staff") {
      role = "Staff";
    } else if (filters.role === "Nhà vật lý trị liệu") {
      role = "Physiotherapist";
    } else {
      role = "Member";
    }

    return listOfUser.filter((user) => {
      const isFoundNameOrEmail =
        user?.email
          .toLowerCase()
          .search(trim(filters.searchKey.toLowerCase())) >= 0 ||
        (user?.firstName + user?.lastName)
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
      field: "lastName",
      headerName: "Họ",
      width: 200,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      renderHeader: (params) => (
        <Typography>{params.colDef.headerName}</Typography>
      ),
      renderCell: (params) => <Typography>{params?.value ?? "-"}</Typography>,
    },
    {
      field: "firstName",
      headerName: "Tên",
      width: 200,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      renderHeader: (params) => (
        <Typography>{params.colDef.headerName}</Typography>
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
        <Typography>{params.colDef.headerName}</Typography>
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
        <Typography>{params.colDef.headerName}</Typography>
      ),
      renderCell: (params) => {
        return <Typography>{params?.value ?? "-"}</Typography>;
      },
    },
    {
      field: "role",
      headerName: "Role",
      width: 200,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      sortable: false,
      renderHeader: (params) => (
        <Typography>{params.colDef.headerName}</Typography>
      ),
      renderCell: (params) => {
        if (params?.value?.name === "Physiotherapist") {
          return <Typography>Nhà vật lý trị liệu</Typography>;
        }else if(params?.value?.name === "Member"){
          return <Typography>Người dùng</Typography>;
        }else{
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
        <Typography>{params.colDef.headerName}</Typography>
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
      headerName: "Action",
      width: 100,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      sortable: false,
      renderHeader: (params) => (
        <Typography>{params.colDef.headerName}</Typography>
      ),
      renderCell: (params) => (
        <>
          <Link href={`/user/${params?.value}/edit`}>
            <EditIcon
              fontSize="small"
              sx={{ color: "#0C5E96", cursor: "pointer" }}
            />
          </Link>
          <IconButton
            onClick={() => {
              dispatch(banUser({ userID: params?.value, token }));
              setRefreshKey((oldKey) => oldKey + 1);
            }}
          >
            <DeleteIcon
              fontSize="small"
              sx={{ color: "#0C5E96", cursor: "pointer" }}
            />
          </IconButton>
        </>
      ),
    },
  ];
  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3" alignItems="center">
          DANH SÁCH NHÀ VẬT LÝ TRỊ LIỆU
        </Typography>
        <SearchUserListForm onSearch={(data) => setFilters(data)} />
        <Box>
          <AddButton
            desc="Thêm người dùng"
            url={`${pages.addUserPath}`}
            sx={{ mt: -6 }}
          />
          <DataGridTable
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
    </Container>
  );
};

export default UserList;
