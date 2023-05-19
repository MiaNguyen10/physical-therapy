import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import DeleteDialog from "app/components/Dialog/DeleteDialog";
import { selectToken } from "cores/reducers/authentication";
import { getList, getStatus, resetStatus } from "cores/reducers/typeOfSlot";
import { deleteTypeOfSlot, getTypeOfSlotList } from "cores/thunk/typeOfSlot";
import dayjs from "dayjs";
import "dayjs/locale/th";
import { trim } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddButton from "../../components/Button/AddButton";
import DataGridTable from "../../components/DataGrid/DataGridTable";
import pages from "../../config/pages";
import SearchTypeOfSlotForm from "./components/SearchTypeOfSlotForm";
dayjs.locale("th");

const TypeOfSlotList = () => {
  const dispatch = useDispatch();
  let typeOfSlotList = useSelector(getList);
  const status = useSelector(getStatus);
  const token = useSelector(selectToken);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const [filters, setFilters] = useState({
    searchKey: "",
    searchPrice: "",
  });

  const [id, setId] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleDelete = () => {
    dispatch(deleteTypeOfSlot({ id: id, token }));
    setRefreshKey((oldKey) => oldKey + 1);
    setId("");
    setOpenDialog(false);
  };

  useEffect(() => {
    if (status === "succeeded") {
      dispatch(resetStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getTypeOfSlotList(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  const rows = useMemo(() => {
    return (
      Array.isArray(typeOfSlotList) &&
      typeOfSlotList.filter((type) => {
        const isFoundName =
          type.typeName
            .toLowerCase()
            .search(trim(filters.searchKey.toLowerCase())) >= 0;

        return isFoundName;
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, typeOfSlotList]);

  const columns = [
    {
      field: "typeName",
      headerName: "Tên loại điều trị",
      width: 450,
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
      field: "price",
      headerName: "Giá tiền/Buổi",
      width: 300,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      renderHeader: (params) => (
        <Typography sx={{ fontWeight: "bold", fontSize: "19px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <Typography>
          {params.value
            ? params.value.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })
            : "-"}
        </Typography>
      ),
    },
    {
      field: "typeOfSlotID",
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
              onClick={() => navigate(`/typeOfSlot/${params?.value}/edit`)}
              sx={{ ml: 1 }}
            >
              <EditIcon
                sx={{ color: "#008542", cursor: "pointer", fontSize: 28 }}
              />
            </IconButton>
            <IconButton
              onClick={() => {
                setId(params?.value);
                setOpenDialog(true);
              }}
              disabled={params?.row.typeName === "Trị liệu dài hạn"}
            >
              <DeleteIcon
                sx={{
                  color:
                    params?.row.typeName === "Trị liệu dài hạn"
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
        <Typography variant="h3">DANH SÁCH LOẠI ĐIỀU TRỊ</Typography>
        <SearchTypeOfSlotForm onSearch={(data) => setFilters(data)} />
        <Box>
          <AddButton
            desc="Thêm loại điều trị"
            url={`${pages.addtypeOfSlotPath}`}
            sx={{
              mt: -6,
              fontWeight: "bold",
              boxShadow:
                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
            }}
          />
          <DataGridTable
            sx={{ ml: 10 }}
            width="1000px"
            columns={columns}
            rows={rows}
            getRowId={(row) => row.typeOfSlotID}
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
        desc="Bạn có chắc chắn muốn xóa không?"
      />
    </Container>
  );
};

export default TypeOfSlotList;
