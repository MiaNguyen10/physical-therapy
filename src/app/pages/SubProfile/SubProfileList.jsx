import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SourceIcon from "@mui/icons-material/Source";
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteDialog from "app/components/Dialog/DeleteDialog";
import { selectToken } from "cores/reducers/authentication";
import {
  getSubProfilesList,
  getStatus,
  resetStatus,
} from "cores/reducers/subProfile";
import {
  deleteSubProfile,
  getSubProfileListByID,
} from "cores/thunk/subProfile";
import { trim } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AddButton from "../../components/Button/AddButton";
import DataGridTable from "../../components/DataGrid/DataGridTable";
import SearchExerciseListDetailForm from "./components/SearchSubProfileForm";

const SubProfileList = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  let subProfileList = useSelector(getSubProfilesList);
  const status = useSelector(getStatus);
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const [filters, setFilters] = useState({
    searchKey: "",
    searchSet: "",
  });

  const [detailId, setDetailId] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleDelete = () => {
    dispatch(
      deleteSubProfile({
        profileID: detailId,
        token,
      })
    );
    setRefreshKey((oldKey) => oldKey + 1);
    setDetailId("");
    setOpenDialog(false);
  };

  useEffect(() => {
    dispatch(getSubProfileListByID({ id: id, token }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  const rows = useMemo(() => {
    return (
      Array.isArray(subProfileList) &&
      subProfileList.filter((subProfile) => {
        const isFoundName =
          subProfile.relationName
            .toLowerCase()
            .search(trim(filters.searchKey.toLowerCase())) >= 0;
        const isFoundSet =
          subProfile.subName
            .toLowerCase()
            .search(trim(filters.searchSet.toLowerCase())) >= 0;
        // const isFoundDesc =
        //   subProfile.description
        //     .toLowerCase()
        //     .search(trim(filters.searchDesc.toLowerCase())) >= 0;
        return isFoundName && isFoundSet;
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, subProfileList]);

  const columns = [
    {
      field: "relationName",
      headerName: "Tên mối quan hệ",
      width: 350,
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
      field: "subName",
      headerName: "subName",
      width: 350,
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
    // {
    //   field: "description",
    //   headerName: "Mô tả",
    //   width: 400,
    //   headerAlign: "center",
    //   align: "center",
    //   disableColumnMenu: true,
    //   renderHeader: (params) => (
    //     <Typography sx={{ fontWeight: "bold", fontSize: "19px" }}>
    //       {params.colDef.headerName}
    //     </Typography>
    //   ),
    //   renderCell: (params) => <Typography>{params?.value ?? "-"}</Typography>,
    // },
    {
      field: "profileID",
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
              onClick={() =>
                navigate(`/user/${id}/subProfileList/${params?.value}/edit`)
              }
              sx={{ ml: 1 }}
            >
              <EditIcon
                sx={{ color: "#008542", cursor: "pointer", fontSize: 28 }}
              />
            </IconButton>
            <IconButton
              onClick={() =>
                navigate(
                  `/user/${id}/subProfileList/${params?.value}/userResource`
                )
              }
              sx={{ ml: 1, mr: 1 }}
            >
              <Tooltip title="Chi tiết mối quan hệ">
                <SourceIcon
                  sx={{ color: "#0C5E96", cursor: "pointer", fontSize: 28 }}
                />
              </Tooltip>
            </IconButton>
            <IconButton
              onClick={() => {
                setDetailId(params?.value);
                setOpenDialog(true);
              }}
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
    if (status === "succeeded") {
      dispatch(resetStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3">DANH SÁCH MỐI QUAN HỆ</Typography>
        <SearchExerciseListDetailForm onSearch={(data) => setFilters(data)} />
        <Box>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
            sx={{ float: "right", mb: 3 }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate(`/user/${id}/edit`)}
              sx={{
                fontWeight: "bold",
                boxShadow:
                  "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              }}
            >
              Quay về
            </Button>
            <AddButton
              desc="Thêm mối quan hệ"
              url={`/user/${id}/subProfileList/add`}
              sx={{
                mt: -6,
                fontWeight: "bold",
                boxShadow:
                  "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              }}
            />
          </Stack>
          <DataGridTable
            columns={columns}
            rows={rows}
            getRowId={(row) => row.profileID}
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

export default SubProfileList;
