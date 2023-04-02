import React, { useState, useMemo } from "react";
import accountData from "./Data";
import { trim } from "lodash";
import { Typography, Container, Stack, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import pages from "../../config/pages";
import DataGridTable from "../../components/DataGrid/DataGridTable";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchUserListForm from "./components/SearchUserListForm";
import AddButton from "../../components/Button/AddButton";

const TherapistList = () => {
  const navigate = useNavigate;
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState({
    searchKey: "",
    role: "All",
    status: "All",
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
    } else if (filters.role === "Manager") {
      role = 2;
    } else if (filters.role === "Physiotherapist") {
      role = 3;
    } else if (filters.role === "Member") {
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
      const isFoundRole = filters.role === "All" ? true : user.roleId === role;
      const isFoundBanded =
        filters.status === "All" ? true : user.banStatus === banStatus;
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
            return <Typography>Manager</Typography>;
          case 3:
            return <Typography>PhysioTherapist</Typography>;
          case 4:
            return <Typography>Member</Typography>;
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
      renderCell: (params) => (
        <>
          <EditIcon
            fontSize="small"
            sx={{ color: "#0C5E96", cursor: "pointer" }}
            onClick={() => {
              navigate(`${pages.accountPath}/${params?.value ?? ""}/edit`);
            }}
          />
          <DeleteIcon
            fontSize="small"
            sx={{ color: "#0C5E96", cursor: "pointer", ml: 2 }}
            onClick={() => {}}
          />
        </>
      ),
    },
  ];
  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3" alignItems='center'>DANH SÁCH BÁC SĨ VẬT LÝ TRỊ LIỆU</Typography>
        <SearchUserListForm onSearch={(data) => setFilters(data)} />
        <Box>
          <AddButton desc="Add user" url={`${pages.addAccountPath}`} sx={{mt: -6}}/>
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

export default TherapistList;
