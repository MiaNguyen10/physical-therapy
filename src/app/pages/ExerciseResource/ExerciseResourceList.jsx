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
  getExerciseResources,
  getStatus,
  resetStatus,
} from "../../../cores/reducers/exerciseResource";
import {
  deleteExerciseResource,
  getExerciseResourceList,
} from "../../../cores/thunk/exerciseResource";
import AddButton from "../../components/Button/AddButton";
import DataGridTable from "../../components/DataGrid/DataGridTable";
import pages from "../../config/pages";
import SearchExerciseResourceListFrom from "./components/SearchExerciseResourceListForm";
import { selectToken } from "cores/reducers/authentication";

const ExerciseResourceList = () => {
  const dispatch = useDispatch();
  let exerciseResourceList = useSelector(getExerciseResources);
  const token = useSelector(selectToken)
  const exerciseResourceStatus = useSelector(getStatus);
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
      Array.isArray(exerciseResourceList) &&
      exerciseResourceList.filter((exerciseResource) => {
        const isFoundName =
          exerciseResource.resourceName
            .toLowerCase()
            .search(trim(filters.searchKey.toLowerCase())) >= 0;
        const isFoundCate =
          exerciseResource.exerciseDetailID
            .toLowerCase()
            .search(trim(filters.searchCate.toLowerCase())) >= 0;
        return isFoundName && isFoundCate;
      })
    );
  }, [filters, exerciseResourceList]);

  const columns = [
    {
      field: "resourceName",
      headerName: "Tài nguyên Bài tập",
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
      field: "exerciseDetailID",
      headerName: "Chi tiết Bài tập",
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
      field: "imageURL",
      headerName: "Hình ảnh",
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
      field: "videoURL",
      headerName: "Video",
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
      field: "exerciseResourceID",
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
            <Link href={`${pages.exerciseResourceListPath}/${params.value}/edit`}>
              <EditIcon
                fontSize="small"
                sx={{ color: "#0C5E96", cursor: "pointer" }}
              />
            </Link>
            {/* <Link
              href={`${pages.exerciseResourceDetailsEditPath}/${params.value}/edit`}
            >
              <UpdateIcon
                fontSize="small"
                sx={{ color: "#0C5E96", cursor: "pointer" }}
              />
            </Link> */}
            <IconButton
              onClick={() => {
                dispatch(deleteExerciseResource({ exerciseResourceID: params.value, token }));
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
    if (exerciseResourceStatus === "succeeded") {
      dispatch(resetStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getExerciseResourceList(token));
  }, [dispatch, refreshKey]);

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3">DANH SÁCH TÀI NGUYÊN BÀI TẬP</Typography>
        <SearchExerciseResourceListFrom onSearch={(data) => setFilters(data)} />
        <Box>
          <AddButton
            desc="Thêm tài nguyên bài tập"
            url={`${pages.addExerciseResourcePath}`}
            sx={{ mt: -6 }}
          />
          <DataGridTable
            columns={columns}
            rows={rows}
            getRowId={(row) => row.exerciseResourceID}
            rowHeight={70}
            page={page}
            onPageChange={handlePageChange}
            rowCount={exerciseResourceList?.length ?? 0}
            isLoading={exerciseResourceStatus !== "succeeded"}
            pagination
            paginationMode="client"
          />
        </Box>
      </Stack>
    </Container>
  );
};

export default ExerciseResourceList;
