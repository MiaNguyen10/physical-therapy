import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { selectToken } from "cores/reducers/authentication";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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
import DeleteDialog from "app/components/Dialog/DeleteDialog";

const ExerciseResourceList = () => {
  const { id, idDetail } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let exerciseResourceList = useSelector(getExerciseResources);
  const token = useSelector(selectToken);
  const exerciseResourceStatus = useSelector(getStatus);
  //const [page, setPage] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);

  const [resourceId, setResourceId] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleDelete = () => {
    dispatch(
      deleteExerciseResource({
        exerciseResourceID: resourceId,
        token,
      })
    );
    setRefreshKey((oldKey) => oldKey + 1);
    setResourceId("");
    setOpenDialog(false);
    window.location.reload(true);
  };

  /*const handlePageChange = (page) => {
    setPage(page);
  };
  

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
            <Link
              href={`/exercise/${id}/exerciseDetailList/${idDetail}/exerciseResource/${params?.value}/edit`}
            >
              <EditIcon
                fontSize="small"
                sx={{ color: "#0C5E96", cursor: "pointer" }}
              />
            </Link>
            <IconButton
              onClick={() => {
                dispatch(
                  deleteExerciseResource({
                    exerciseResourceID: params.value,
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
  ]; */

  useEffect(() => {
    if (exerciseResourceStatus === "succeeded") {
      dispatch(resetStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getExerciseResourceList({ idDetail: idDetail, token }));
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Typography variant="h3" textAlign="center" sx={{ m: 5 }}>
        DANH SÁCH TÀI NGUYÊN BÀI TẬP
      </Typography>

      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
        spacing={2}
        sx={{ float: "right" }}
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate(`/exercise/${id}/exerciseDetailList`)}
        >
          Quay về chi tiết
        </Button>
        <AddButton
          desc="Thêm tài nguyên bài tập"
          url={`/exercise/${id}/exerciseDetailList/${idDetail}/exerciseResource/add`}
          sx={{ mt: -6 }}
        />
      </Stack>
      <Box>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
          sx={{ float: "left", mt: 8 }}
        >
          {exerciseResourceList
            ? exerciseResourceList.map((exerciseResource) => (
                <Card sx={{ maxWidth: 345 }} key={exerciseResource.exerciseResourceID}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      sx={{
                        height: 'auto',
                        width: 345,
                        maxHeight: { xs: 'auto', md: 167 },
                        maxwidth: { xs: 345, md: 212 },
                      }}
                      alt="User image"
                      src={exerciseResource.imageURL}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {exerciseResource.resourceName}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() =>
                        navigate(
                          `/exercise/${id}/exerciseDetailList/${idDetail}/exerciseResource/${exerciseResource.exerciseResourceID}/edit`
                        )
                      }
                    >
                      Sửa
                    </Button>
                    <Button
                      size="small"
                      onClick={() => {
                        setResourceId(exerciseResource?.exerciseResourceID);
                        setOpenDialog(true);
                      }}
                    >
                      Xóa
                    </Button>
                  </CardActions>
                </Card>
              ))
            : null}
        </Stack>

        {/* <DataGridTable
            columns={columns}
            rows={exerciseResourceList}
            getRowId={(row) => row.exerciseResourceID}
            rowHeight={70}
            page={page}
            onPageChange={handlePageChange}
            rowCount={exerciseResourceList?.length ?? 0}
            isLoading={exerciseResourceStatus !== "succeeded"}
            pagination
            paginationMode="client"
          /> */}
      </Box>
      <DeleteDialog open={openDialog} handleClose={handleClose} handleDelete={handleDelete} desc="Bạn có chắc chắn muốn xóa không?"/>
    </Container>
  );
};

export default ExerciseResourceList;
