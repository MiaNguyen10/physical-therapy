import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from '@mui/icons-material/Info';
import { Box, Container, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import OpenModalButton from "app/components/Button/OpenModalButton";
import DeleteDialog from "app/components/Dialog/DeleteDialog";
import { trim } from "lodash";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  getStatusCategory,
  resetStatus,
} from "../../../cores/reducers/category";
import { deleteCategory, getCategoryList } from "../../../cores/thunk/category";
import DataGridTable from "../../components/DataGrid/DataGridTable";
import SearchCategoryListFrom from "../Category/components/SearchCategoryListForm";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import { useNavigate } from "react-router-dom";

const CategotyList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let categoryList = useSelector(getCategories);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [unique, setUnique] = useState(Math.random());
  const [openEditModal, setOpenEditModal] = useState(false);
  const getId = useRef(-1);
  const categoryStatus = useSelector(getStatusCategory);
  const [page, setPage] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const [filters, setFilters] = useState({
    searchKey: "",
    searchDesc: "",
  });
  const [categoryId, setCategoryId] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleOpenAdd = () => {
    setOpenAddModal(true);
  };

  const handleCloseAdd = () => {
    setOpenAddModal(false);
  };

  const handleOpenEdit = (id) => {
    getId.current = id;
    setOpenEditModal(true);
  };

  const handleCloseEdit = () => {
    setOpenEditModal(false);
  };

  const handleDelete = () => {
    dispatch(deleteCategory(categoryId));
    setRefreshKey((oldKey) => oldKey + 1);
    setCategoryId("");
    setOpenDialog(false);
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
        <Typography sx={{ fontWeight: "bold", fontSize: "19px" }}>
          {params.colDef.headerName}
        </Typography>
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
        <Typography sx={{ fontWeight: "bold", fontSize: "19px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
      renderCell: (params) => <Typography>{params?.value ?? "-"}</Typography>,
    },
    {
      field: "categoryID",
      headerName: "Chỉnh sửa",
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
        return (
          <>
            <IconButton
              onClick={() => handleOpenEdit(params.value)}
              sx={{ ml: 1 }}
            >
              <EditIcon
                sx={{ color: "#008542", cursor: "pointer", fontSize: 28 }}
              />
            </IconButton>
            <IconButton
              onClick={() =>
                navigate(`/category/${params?.value}/exercise`)
              }
              sx={{ ml: 1, mr: 1 }}
            >
              <Tooltip title="Các bài tập">
                <InfoIcon
                  sx={{ color: "#0C5E96", cursor: "pointer", fontSize: 28 }}
                />
              </Tooltip>
            </IconButton>
            <IconButton
              onClick={() => {
                setCategoryId(params?.value);
                setOpenDialog(true);
              }}
              sx={{ ml: 1 }}
            >
              <DeleteIcon
                sx={{ color: "#e63307", cursor: "pointer", fontSize: 28 }}
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
  }, [refreshKey, unique]);

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3">TÌNH TRẠNG</Typography>
        <SearchCategoryListFrom onSearch={(data) => setFilters(data)} />
        <Box>
          <OpenModalButton
            desc="Thêm tình trạng"
            onOpen={handleOpenAdd}
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
      {openDialog && (
        <DeleteDialog
          open={openDialog}
          handleClose={handleClose}
          handleDelete={handleDelete}
          desc="Bạn có chắc chắn muốn xóa không?"
        />
      )}
      {openAddModal && (
        <AddCategory
          openModal={openAddModal}
          onClose={handleCloseAdd}
          setUnique={setUnique}
        />
      )}
      {openEditModal && (
        <EditCategory
          setUnique={setUnique}
          openModal={openEditModal}
          onClose={handleCloseEdit}
          id={getId.current}
        />
      )}
    </Container>
  );
};

export default CategotyList;
