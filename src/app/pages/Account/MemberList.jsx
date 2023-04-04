import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Container, Link, Stack, Typography } from "@mui/material";
import { trim } from "lodash";
import React, { useMemo, useState } from "react";
import AddButton from "../../components/Button/AddButton";
import DataGridTable from "../../components/DataGrid/DataGridTable";
import pages from "../../config/pages";
import accountData from "./Data";
import SearchUserListForm from "./components/SearchUserListForm";

const MemberList = () => {
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState({
    searchKey: "",
    role: "Tất cả",
    status: "Tất cả",
  });

  const handlePageChange = (page) => {
    setPage(page);
  };

  const rows = useMemo(() => {
    let banStatus, role;
    if (filters.status === "Active") {
      banStatus = true;
    } else if (filters.status === "Banded") {
      banStatus = false;
    }

    if (filters.role === "Admin") {
      role = 1;
    } else if (filters.role === "Quản lý") {
      role = 2;
    } else if (filters.role === "Bác sĩ vật lý trị liệu") {
      role = 3;
    } else if (filters.role === "Người dùng") {
      role = 4;
    }

    return accountData.filter((user) => {
      const isFoundNameOrEmail =
        user?.email
          .toLowerCase()
          .search(trim(filters.searchKey.toLowerCase())) >= 0 ||
        (user?.firstName + user?.lastName)
          .toLowerCase()
          .search(trim(filters.searchKey.toLowerCase())) >= 0;
      const isFoundRole =
        filters.role === "Tất cả" ? true : user.roleId === role;
      const isFoundBanded =
        filters.status === "Tất cả" ? true : user.banStatus === banStatus;
      return isFoundNameOrEmail && isFoundRole && isFoundBanded;
    });
  }, [filters]);

  const columns = [
    {
      field: "firstName",
      headerName: "Firstname",
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
      field: "lastName",
      headerName: "Lastname",
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
      field: "phone",
      headerName: "Phone",
      width: 250,
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
      field: "roleId",
      headerName: "Role",
      width: 200,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      renderHeader: (params) => (
        <Typography>{params.colDef.headerName}</Typography>
      ),
      renderCell: (params) => {
        switch (params?.value) {
          case 1:
            return <Typography>Admin</Typography>;
          case 2:
            return <Typography>Quản lý</Typography>;
          case 3:
            return <Typography>Bác sĩ vật lý trị liệu</Typography>;
          case 4:
            return <Typography>Người dùng</Typography>;
          default:
            return null;
        }
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
      renderCell: (params) => {
        return (
          <>
            <Link href={`${pages.accountPath}/${params.value}/edit`}>
              <EditIcon
                fontSize="small"
                sx={{ color: "#0C5E96", cursor: "pointer" }}
              />
            </Link>
            <DeleteIcon
              fontSize="small"
              sx={{ color: "#0C5E96", cursor: "pointer" }}
            />
          </>
        );
      },
    },
  ];
  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3">DANH SÁCH NGƯỜI DÙNG</Typography>
        <SearchUserListForm onSearch={(data) => setFilters(data)} />
        <Box>
          <AddButton
            desc="Thêm người dùng"
            url={`${pages.addAccountPath}`}
            sx={{ mt: -6 }}
          />
          <DataGridTable
            columns={columns}
            rows={rows}
            rowHeight={70}
            page={page}
            onPageChange={handlePageChange}
            rowCount={accountData?.length ?? 0}
            pagination
            paginationMode="client"
          />
        </Box>
      </Stack>
    </Container>
  );
};

export default MemberList;
