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
import { selectToken } from "cores/reducers/authentication";
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
    searchAddress: "",
    status: "Tất cả",
  });
  const [refreshKey, setRefreshKey] = useState(0);

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

  const rows = useMemo(() => {
    let banStatus;
    if (filters.status === "Hoạt động") {
      banStatus = false;
    } else if (filters.status === "Không hoạt động") {
      banStatus = true;
    }

    return userList.filter((user) => {
      const isFoundNameOrEmail =
        user?.email
          .toLowerCase()
          .search(trim(filters.searchKey.toLowerCase())) >= 0 ||
        (user?.firstName + user?.lastName)
          .toLowerCase()
          .search(trim(filters.searchKey.toLowerCase())) >= 0;
      const isFoundPhoneNumb =
        user?.address
          .toLowerCase()
          .search(trim(filters.searchAddress.toLowerCase())) >= 0;
      const isFoundBanded =
        filters.status === "Tất cả" ? true : user.banStatus === banStatus;
      return isFoundNameOrEmail && isFoundPhoneNumb && isFoundBanded;
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
      width: 300,
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
      field: "address",
      headerName: "Địa chỉ nhà",
      width: 300,
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
            rowCount={userList?.length ?? 0}
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
