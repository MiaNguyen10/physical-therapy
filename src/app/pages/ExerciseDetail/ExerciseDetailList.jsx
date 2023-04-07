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
import { trim } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getExerciseDetails,
  getStatus,
  resetStatus,
} from "../../../cores/reducers/exerciseDetail";
import {
  deleteExerciseDetail,
  getExerciseDetailList,
} from "../../../cores/thunk/exerciseDetail";
import AddButton from "../../components/Button/AddButton";
import DataGridTable from "../../components/DataGrid/DataGridTable";
import pages from "../../config/pages";
import SearchExerciseDetailListFrom from "./components/SearchExerciseDetailListForm";

const ExerciseDetailList = () => {
  const dispatch = useDispatch();
  let exerciseDetailList = useSelector(getExerciseDetails);
  const exerciseDetailStatus = useSelector(getStatus);
  const [page, setPage] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const [filters, setFilters] = useState({
    searchKey: "",
    searchCate: "",
  });

  const handlePageChange = (page) => {
    setPage(page);
  };

  const rows = useMemo(() => {
    return (
      Array.isArray(exerciseDetailList) &&
      exerciseDetailList.filter((exerciseDetail) => {
        const isFoundName =
          exerciseDetail.detailName
            .toLowerCase()
            .search(trim(filters.searchKey.toLowerCase())) >= 0;
        const isFoundCate =
          exerciseDetail.exerciseID
            .toLowerCase()
            .search(trim(filters.searchCate.toLowerCase())) >= 0;
        return isFoundName && isFoundCate;
      })
    );
  }, [filters, exerciseDetailList]);

  const columns = [
    {
      field: "detailName",
      headerName: "Bài tập",
      width: 300,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      renderHeader: (params) => (
        <Typography>{params.colDef.headerName}</Typography>
      ),
      renderCell: (params) => <Typography>{params?.value ?? "-"}</Typography>,
    },
    {
      field: "exerciseID",
      headerName: "Bài tập",
      width: 300,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      renderHeader: (params) => (
        <Typography>{params.colDef.headerName}</Typography>
      ),
      renderCell: (params) => <Typography>{params?.value ?? "-"}</Typography>,
    },
    {
      field: "set",
      headerName: "Set",
      width: 300,
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
      field: "exerciseDetailID",
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
            <Link href={`${pages.exerciseDetailListPath}/${params.value}/edit`}>
              <EditIcon
                fontSize="small"
                sx={{ color: "#0C5E96", cursor: "pointer" }}
              />
            </Link>
            <Link
              href={`${pages.exerciseDetailDetailsEditPath}/${params.value}/edit`}
            >
              <UpdateIcon
                fontSize="small"
                sx={{ color: "#0C5E96", cursor: "pointer" }}
              />
            </Link>
            <IconButton
              onClick={() => {
                dispatch(deleteExerciseDetail(params.value));
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
    if (exerciseDetailStatus === "succeeded") {
      dispatch(resetStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getExerciseDetailList());
  }, [dispatch, refreshKey]);

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3">DANH SÁCH CHI TIẾT BÀI TẬP</Typography>
        <SearchExerciseDetailListFrom onSearch={(data) => setFilters(data)} />
        <Box>
          <AddButton
            desc="Thêm bài tập"
            url={`${pages.addExerciseDetailPath}`}
            sx={{ mt: -6 }}
          />
          <DataGridTable
            columns={columns}
            rows={rows}
            getRowId={(row) => row.exerciseDetailID}
            rowHeight={70}
            page={page}
            onPageChange={handlePageChange}
            rowCount={exerciseDetailList?.length ?? 0}
            isLoading={exerciseDetailStatus !== "succeeded"}
            pagination
            paginationMode="client"
          />
        </Box>
      </Stack>
    </Container>
  );
};

export default ExerciseDetailList;
