import EditIcon from "@mui/icons-material/Edit";
import { Box, Container, Link, Stack, Typography } from "@mui/material";
import { trim } from "lodash";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddButton from "../../components/Button/AddButton";
import DataGridTable from "../../components/DataGrid/DataGridTable";
import pages from "../../config/pages";
import SearchCategoryListFrom from "../Category/components/SearchCategoryListForm";
import categotyData from "./CategoryData";

const CategotyList = () => {
  const navigate = useNavigate;
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState({
    searchKey: "",
    status: "Tất cả",
  });

  const handlePageChange = (page) => {
    setPage(page);
  };

  const rows = useMemo(() => {
    let isDeleted;
    if (filters.status === "Active") {
      isDeleted = true;
    } else if (filters.status === "Deleted") {
      isDeleted = false;
    }

    return categotyData.filter((category) => {
      const isFoundNameOrEmail =
        category.categoryName
          .toLowerCase()
          .search(trim(filters.searchKey.toLowerCase())) >= 0;
      const isFoundDeleted =
        filters.status === "Tất cả" ? true : category.isDeleted === isDeleted;
      return isFoundNameOrEmail && isFoundDeleted;
    });
  }, [filters]);

  const columns = [
    {
      field: "categoryName",
      headerName: "Danh mục",
      width: 600,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      renderHeader: (params) => (
        <Typography>{params.colDef.headerName}</Typography>
      ),
      renderCell: (params) => <Typography>{params?.value ?? "-"}</Typography>,
    },
    {
      field: "isDeleted",
      headerName: "Trạng thái hoạt động",
      width: 400,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      renderHeader: (params) => (
        <Typography>{params.colDef.headerName}</Typography>
      ),
      renderCell: (params) => {
        switch (params?.value) {
          case true:
            return <Typography>Đang hoạt động</Typography>;
          case false:
            return <Typography>Đã đình chỉ</Typography>;
          default:
            return null;
        }
      },
    },
    {
      field: "id",
      headerName: "Action",
      width: 300,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      sortable: false,
      renderHeader: (params) => (
        <Typography>{params.colDef.headerName}</Typography>
      ),
      renderCell: (params) => (
        <>
          <Link href={`${pages.categoryListPath}/${params.value}/edit`}>
              <EditIcon
                fontSize="small"
                sx={{ color: "#0C5E96", cursor: "pointer" }}
              />
            </Link>
        </>
      ),
    },
  ];
  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3">DANH MỤC</Typography>
        <SearchCategoryListFrom onSearch={(data) => setFilters(data)} />
        <Box>
          <AddButton
            desc="Thêm danh mục"
            url={`${pages.addCategoryPath}`}
            sx={{ mt: -6 }}
          />
          <DataGridTable
            columns={columns}
            rows={rows}
            rowHeight={70}
            page={page}
            onPageChange={handlePageChange}
            rowCount={categotyData?.length ?? 0}
            pagination
            paginationMode="client"
          />
        </Box>
      </Stack>
    </Container>
  );
};

export default CategotyList;
