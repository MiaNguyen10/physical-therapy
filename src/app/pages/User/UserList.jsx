import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import UpdateIcon from "@mui/icons-material/Update";
import {
  Box,
  Container,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { getCategories, getStatusCategory } from "cores/reducers/category";
import { getCategoryList } from "cores/thunk/category";
import { trim } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  getStatusUsers,
  resetStatus,
} from "../../../cores/reducers/user";
import { deleteUser, getUserList } from "../../../cores/thunk/user";
import AddButton from "../../components/Button/AddButton";
import DataGridTable from "../../components/DataGrid/DataGridTable";
import pages from "../../config/pages";
import SearchUserListFrom from "./components/SearchUserListForm";

const UserList = () => {
  const dispatch = useDispatch();
  let userList = useSelector(getUsers);
  const userStatus = useSelector(getStatusUsers);
  let categoryList = useSelector(getCategories);
  const categoryStatus = useSelector(getStatusCategory);

  const [page, setPage] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const [filters, setFilters] = useState({
    searchKey: "",
    searchCate: "",
  });

  const handlePageChange = (page) => {
    setPage(page);
  };

  useEffect(() => {
    if (categoryStatus === "succeeded") {
      dispatch(resetStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getCategoryList());
  }, [dispatch]);

  const rows = useMemo(() => {
    return (
      Array.isArray(userList) &&
      userList.filter((user) => {
        const isFoundName =
          user.email
            .toLowerCase()
            .search(trim(filters.searchKey.toLowerCase())) >= 0;
        const isFoundCate =
          user.phoneNumber
            .toLowerCase()
            .search(trim(filters.searchCate.toLowerCase())) >= 0;
        return isFoundName && isFoundCate;
      })
    );
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
      width: 150,
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
      width: 350,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      renderHeader: (params) => (
        <Typography>{params.colDef.headerName}</Typography>
      ),
      renderCell: (params) => <Typography>{params?.value ?? "-"}</Typography>,
    },
    {
      field: "phoneNumber",
      headerName: "SĐT",
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
      field: "banStatus",
      headerName: "Tình trạng",
      width: 200,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      renderHeader: (params) => (
        <Typography>{params.colDef.headerName}</Typography>
      ),
      renderCell: (params) => <Typography>{params?.value ? "Bị cấm" : "Đang hoạt động"}</Typography>,
    },
    {
      field: "id",
      headerName: "Action",
      width: 200,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      sortable: false,
      renderHeader: (params) => (
        <Typography>{params.colDef.headerName}</Typography>
      ),
      renderCell: (params) => {
        return (
          <>
            <Link href={`${pages.userListPath}/${params.value}/edit`}>
              <EditIcon
                fontSize="small"
                sx={{ color: "#0C5E96", cursor: "pointer" }}
              />
            </Link>
            {/* <Link href={`${pages.userListPath}/${params.value}/userDetail`}>
              <UpdateIcon
                fontSize="small"
                sx={{ color: "#0C5E96", cursor: "pointer" }}
              />
            </Link>
            <IconButton
              onClick={() => {
                dispatch(deleteUser(params.value));
                setRefreshKey((oldKey) => oldKey + 1);
              }}
            >
              <DeleteIcon
                fontSize="small"
                sx={{ color: "#0C5E96", cursor: "pointer" }}
              />
            </IconButton> */}
          </>
        );
      },
    },
  ];

  useEffect(() => {
    if (userStatus === "succeeded") {
      dispatch(resetStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch, refreshKey]);

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3">DANH SÁCH NGƯỜI DÙNG</Typography>
        <SearchUserListFrom onSearch={(data) => setFilters(data)} />
        <Box>
          {/* <AddButton
            desc="Thêm người dùng"
            url={`${pages.addUserPath}`}
            sx={{ mt: -6 }}
          /> */}
          <DataGridTable
            columns={columns}
            rows={rows}
            getRowId={(row) => row.id}
            rowHeight={70}
            page={page}
            onPageChange={handlePageChange}
            rowCount={userList?.length ?? 0}
            isLoading={userStatus !== "succeeded"}
            pagination
            paginationMode="client"
          />
        </Box>
      </Stack>
    </Container>
  );
};

export default UserList;
