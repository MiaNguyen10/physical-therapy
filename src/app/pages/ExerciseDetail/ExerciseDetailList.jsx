import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import UpdateIcon from "@mui/icons-material/Update";
import {
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { selectToken } from "cores/reducers/authentication";
import {
  getExerciseDetailsList,
  getStatus,
  resetStatus,
} from "cores/reducers/exerciseDetail";
import {
  deleteExerciseDetail,
  getExerciseDetailListByID,
} from "cores/thunk/exerciseDetail";
import { trim } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AddButton from "../../components/Button/AddButton";
import DataGridTable from "../../components/DataGrid/DataGridTable";

const ExerciseDetailList = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  let exerciseDetailList = useSelector(getExerciseDetailsList);
  const status = useSelector(getStatus);
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const [filters, setFilters] = useState({
    searchKey: "",
    searchDesc: "",
  });

  console.log(exerciseDetailList);

  const handlePageChange = (page) => {
    setPage(page);
  };

  useEffect(() => {
    dispatch(getExerciseDetailListByID({ id: id, token }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  const rows = useMemo(() => {
    return (
      Array.isArray(exerciseDetailList) &&
      exerciseDetailList.filter((exerciseDetail) => {
        const isFoundName =
          exerciseDetail.detailName
            .toLowerCase()
            .search(trim(filters.searchKey.toLowerCase())) >= 0;
        const isFoundCate =
          exerciseDetail.description
            .toLowerCase()
            .search(trim(filters.searchDesc.toLowerCase())) >= 0;
        return isFoundName && isFoundCate;
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const columns = [
    {
      field: "detailName",
      headerName: "Tên chi tiết của bài tập",
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
      field: "set",
      headerName: "SET",
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
      field: "description",
      headerName: "Mô tả",
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
      field: "exerciseDetailID",
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
            <Link
              href={`/exercise/${id}/exerciseDetailList/${params?.value}/edit`}
            >
              <EditIcon
                fontSize="small"
                sx={{ color: "#0C5E96", cursor: "pointer" }}
              />
            </Link>
            <Link
              href={`/exercise/${id}/exerciseDetailList/${params?.value}/exerciseResource`}
            >
              <Tooltip title="Chi tiết tài nguyên">
                <UpdateIcon
                  fontSize="small"
                  sx={{ color: "#0C5E96", cursor: "pointer" }}
                />
              </Tooltip>
            </Link>
            <IconButton
              onClick={() => {
                dispatch(
                  deleteExerciseDetail({
                    exerciseDetailID: params?.value,
                    token,
                  })
                );
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
    if (status === "succeeded") {
      dispatch(resetStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3">DANH SÁCH CHI TIẾT BÀI TẬP</Typography>
        {/* <SearchExerciseListFrom onSearch={(data) => setFilters(data)} /> */}
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
              onClick={() => navigate(`/exercise`)}
            >
              Quay về chi tiết
            </Button>
            <AddButton
              desc="Thêm chi tiết bài tập"
              url={`/exercise/${id}/exerciseDetailList/add`}
              sx={{ mt: -6 }}
            />
          </Stack>
          <DataGridTable
            columns={columns}
            rows={exerciseDetailList}
            getRowId={(row) => row.exerciseDetailID}
            rowHeight={70}
            page={page}
            onPageChange={handlePageChange}
            rowCount={exerciseDetailList?.length ?? 0}
            isLoading={status !== "succeeded"}
            pagination
            paginationMode="client"
          />
        </Box>
      </Stack>
    </Container>
  );
};

export default ExerciseDetailList;
