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
import { trim } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  getStatusCategory,
  resetStatus,
} from "../../../cores/reducers/category";
import { deleteCategory, getCategoryList } from "../../../cores/thunk/category";
import AddButton from "../../components/Button/AddButton";
import DataGridTable from "../../components/DataGrid/DataGridTable";
import pages from "../../config/pages";
import SearchCategoryListFrom from "../Category/components/SearchCategoryListForm";
import { RestrictedPermission } from "app/middlewares/PermissionProvider";

const CategotyList = () => {
  const dispatch = useDispatch();
  let categoryList = useSelector(getCategories);
  const categoryStatus = useSelector(getStatusCategory);
  const [page, setPage] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const [filters, setFilters] = useState({
    searchKey: "",
    searchDesc: "",
  });

  const handlePageChange = (page) => {
    setPage(page);
  };

  const rows = useMemo(() => {
    return (
      Array.isArray(categoryList) &&
      categoryList.filter((category) => {
        const isFoundName =
          category.categoryName
            .toLowerCase()
            .search(trim(filters.searchKey.toLowerCase())) >= 0;
        const isFoundDesc =
          category.description
            .toLowerCase()
            .search(trim(filters.searchDesc.toLowerCase())) >= 0;
        return isFoundName && isFoundDesc;
      })
    );
  }, [filters, categoryList]);

  const columns = [
    {
      field: "categoryName",
      headerName: "Tình trạng",
      width: 400,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      renderHeader: (params) => (
        <Typography>{params.colDef.headerName}</Typography>
      ),
      renderCell: (params) => <Typography>{params?.value ?? "-"}</Typography>,
    },
    {
      field: "description",
      headerName: "Mô tả",
      width: 500,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      renderHeader: (params) => (
        <Typography>{params.colDef.headerName}</Typography>
      ),
      renderCell: (params) => <Typography>{params?.value ?? "-"}</Typography>,
    },
    {
      field: "categoryID",
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
            <Link href={`${pages.categoryListPath}/${params.value}/edit`}>
              <EditIcon
                fontSize="small"
                sx={{ color: "#0C5E96", cursor: "pointer" }}
              />
            </Link>
            <IconButton
              onClick={() => {
                dispatch(deleteCategory(params.value));
                setRefreshKey((oldKey) => oldKey + 1);
              }}
            >
              <DeleteIcon
                fontSize="small"
                sx={{ color: "#0C5E96", cursor: "pointer" }}
              />
            </IconButton>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    if (categoryStatus === "succeeded") {
      dispatch(resetStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getCategoryList());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3">TÌNH TRẠNG</Typography>
        <SearchCategoryListFrom onSearch={(data) => setFilters(data)} />
        <Box>
          {/* Staff  */}
          <RestrictedPermission permission={"Staff"}>
            <AddButton
              desc="Thêm tình trạng"
              url={`${pages.addCategoryPath}`}
              sx={{ mt: -6 }}
            />
          </RestrictedPermission>
          <DataGridTable
            width="1200px"
            columns={columns}
            rows={rows}
            getRowId={(row) => row.categoryID}
            rowHeight={70}
            page={page}
            onPageChange={handlePageChange}
            rowCount={rows?.length ?? 0}
            isLoading={categoryStatus !== "succeeded"}
            pagination
            paginationMode="client"
          />
        </Box>
      </Stack>
    </Container>
  );
};

export default CategotyList;
