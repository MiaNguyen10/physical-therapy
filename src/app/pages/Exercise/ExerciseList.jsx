import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import UpdateIcon from '@mui/icons-material/Update';
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
  getExercises,
  getStatus,
  resetStatus,
} from "../../../cores/reducers/exercise";
import { deleteExercise, getExerciseList } from "../../../cores/thunk/exercise";
import AddButton from "../../components/Button/AddButton";
import DataGridTable from "../../components/DataGrid/DataGridTable";
import pages from "../../config/pages";
import SearchExerciseListFrom from "../Exercise/components/SearchExerciseListForm";

const ExerciseList = () => {
  const dispatch = useDispatch();
  let exerciseList = useSelector(getExercises);
  const exerciseStatus = useSelector(getStatus);
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
      Array.isArray(exerciseList) &&
      exerciseList.filter((exercise) => {
        const isFoundName =
          exercise.exerciseName
            .toLowerCase()
            .search(trim(filters.searchKey.toLowerCase())) >= 0;
        const isFoundCate =
          exercise.categoryID
            .toLowerCase()
            .search(trim(filters.searchCate.toLowerCase())) >= 0;
        return isFoundName && isFoundCate;
      })
    );
  }, [filters, exerciseList]);

  const columns = [
    {
      field: "exerciseName",
      headerName: "Bài tập",
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
      field: "categoryID",
      headerName: "Danh mục",
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
      field: "exerciseTimePerWeek",
      headerName: "Thời gian / Tuần",
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
      field: "status",
      headerName: "Trạng thái",
      width: 200,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      renderHeader: (params) => (
        <Typography>{params.colDef.headerName}</Typography>
      ),
      renderCell: (params) => <Typography>{params?.value ? "Đang hoạt động" : "Ngừng hoạt động"}</Typography>,
    },
    {
      field: "exerciseID",
      headerName: "Action",
      width: 300,
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
            <Link href={`${pages.exerciseListPath}/${params.value}/edit`}>
              <EditIcon
                fontSize="small"
                sx={{ color: "#0C5E96", cursor: "pointer" }}
              />
            </Link>
            <Link href={`${pages.exerciseListPath}/${params.value}/edit`}>
              <UpdateIcon
                fontSize="small"
                sx={{ color: "#0C5E96", cursor: "pointer" }}
              />
            </Link>
            <IconButton
              onClick={() => {
                dispatch(deleteExercise(params.value));
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
    if (exerciseStatus === "succeeded") {
      dispatch(resetStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getExerciseList());
  }, [dispatch, refreshKey]);

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3">DANH SÁCH BÀI TẬP</Typography>
        <SearchExerciseListFrom onSearch={(data) => setFilters(data)} />
        <Box>
          <AddButton
            desc="Thêm bài tập"
            url={`${pages.addExercisePath}`}
            sx={{ mt: -6 }}
          />
          <DataGridTable
            columns={columns}
            rows={rows}
            getRowId={(row) => row.exerciseID}
            rowHeight={70}
            page={page}
            onPageChange={handlePageChange}
            rowCount={exerciseList?.length ?? 0}
            isLoading={exerciseStatus !== "succeeded"}
            pagination
            paginationMode="client"
          />
        </Box>
      </Stack>
    </Container>
  );
};

export default ExerciseList;
