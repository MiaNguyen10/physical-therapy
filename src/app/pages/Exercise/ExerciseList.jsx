import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import UpdateIcon from "@mui/icons-material/Update";
import {
  Box,
  Container,
  IconButton,
  Stack,
  Tooltip,
  Typography
} from "@mui/material";
import DeleteDialog from "app/components/Dialog/DeleteDialog";
import { selectToken } from "cores/reducers/authentication";
import { getCategories, getStatusCategory } from "cores/reducers/category";
import { getCategoryList } from "cores/thunk/category";
import { trim } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getExercises,
  getStatusExercises,
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
  const exerciseStatus = useSelector(getStatusExercises);
  let categoryList = useSelector(getCategories);
  const categoryStatus = useSelector(getStatusCategory);
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const [filters, setFilters] = useState({
    searchKey: "",
    searchCate: "",
  });

  const [exerciseId, setExerciseId] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleDelete = () => {
    dispatch(deleteExercise({ exerciseID: exerciseId, token }));
    setRefreshKey((oldKey) => oldKey + 1);
    setExerciseId("");
    setOpenDialog(false);
  };
  useEffect(() => {
    if (categoryStatus === "succeeded") {
      dispatch(resetStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getCategoryList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      width: 550,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      renderHeader: (params) => (
        <Typography sx={{ fontWeight: "bold", fontSize: '19px' }}>{params.colDef.headerName}</Typography>
      ),
      renderCell: (params) => <Typography>{params?.value ?? "-"}</Typography>,
    },
    {
      field: "categoryID",
      headerName: "Tình trạng",
      width: 350,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      renderHeader: (params) => (
        <Typography sx={{ fontWeight: "bold", fontSize: '19px' }}>{params.colDef.headerName}</Typography>
      ),
      renderCell: (params) => (
        <Typography>
          {Array.isArray(categoryList) &&
            categoryList
              .filter((category) => category.categoryID === params.value)
              .map((x) => x.categoryName)}
        </Typography>
      ),
    },
    {
      field: "exerciseTimePerWeek",
      headerName: "Thời gian / Tuần",
      width: 200,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      renderHeader: (params) => (
        <Typography sx={{ fontWeight: "bold", fontSize: '19px' }}>{params.colDef.headerName}</Typography>
      ),
      renderCell: (params) => <Typography>{params?.value ?? "-"}</Typography>,
    },
    {
      field: "exerciseID",
      headerName: "Chỉnh sửa",
      width: 200,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      sortable: false,
      renderHeader: (params) => (
        <Typography sx={{ fontWeight: "bold", fontSize: '19px' }}>{params.colDef.headerName}</Typography>
      ),
      renderCell: (params) => {
        return (
          <>
            <IconButton
              onClick={() =>
                navigate(`${pages.exerciseListPath}/${params?.value}/edit`)
              }
              sx={{ ml: 1 }}
            >
              <EditIcon
                
                sx={{ color: "#008542", cursor: "pointer", fontSize: 28 }}
              />
            </IconButton>
            <IconButton
              onClick={() =>
                navigate(`/exercise/${params?.value}/exerciseDetailList`)
              }
              sx={{ ml: 1, mr: 1 }}
            >
              <Tooltip title="Chi tiết bài tập">
                <UpdateIcon
                  
                  sx={{ color: "#0C5E96", cursor: "pointer", fontSize: 28 }}
                />
              </Tooltip>
            </IconButton>
            <IconButton
              onClick={() => {
                setExerciseId(params?.value);
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
    if (exerciseStatus === "succeeded") {
      dispatch(resetStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getExerciseList(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

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
            rowCount={rows?.length ?? 0}
            isLoading={exerciseStatus !== "succeeded"}
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

export default ExerciseList;
