import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import DeleteDialog from "app/components/Dialog/DeleteDialog";
import { selectState, selectToken } from "cores/reducers/authentication";
import { getStatusCategory } from "cores/reducers/category";
import { getCategoryList } from "cores/thunk/category";
import { format } from "date-fns";
import dayjs from "dayjs";
import "dayjs/locale/th";
import { trim } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getSlots,
  getStatusSlots,
  resetStatus,
} from "../../../cores/reducers/slot";
import { deleteSlot, getSlotList } from "../../../cores/thunk/slot";
import AddButton from "../../components/Button/AddButton";
import DataGridTable from "../../components/DataGrid/DataGridTable";
import pages from "../../config/pages";
import SearchSlotListFrom from "../Slot/components/SearchSlotListForm";
import { fstorage } from "cores/store/firebase/config";
import { ref } from "firebase/storage";
dayjs.locale("vi");

const SlotList = () => {
  const dispatch = useDispatch();
  let slotList = useSelector(getSlots);
  const slotStatus = useSelector(getStatusSlots);
  const categoryStatus = useSelector(getStatusCategory);
  const token = useSelector(selectToken);
  const navigate = useNavigate();
  const auth = useSelector(selectState);
  const [page, setPage] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const [filters, setFilters] = useState({
    searchKey: "",
  });
  const [unique, setUnique] = useState(Math.random());

  const [rangeDate, setRangeDate] = useState({
    startDate: null,
    endDate: null,
  });
  const [slotId, setSlotId] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleDelete = () => {
    dispatch(deleteSlot({ id: slotId, token }));
    setRefreshKey((oldKey) => oldKey + 1);
    setSlotId("");
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
    const iRef = ref(fstorage, "images");
    console.log(iRef);
  }, [dispatch]);

  const rows = useMemo(() => {
    if (rangeDate.endDate !== null && rangeDate.startDate !== null) {
      if (dayjs(rangeDate.startDate).diff(dayjs(rangeDate.endDate)) > 0)
        return [];
    }
    return (
      Array.isArray(slotList) &&
      slotList.filter((slot) => {
        // const startDateGMT7 = new Date(
        //   format(new Date(slot.timeStart), "yyyy-MM-dd")
        // );

        // startDateGMT7.setUTCHours(startDateGMT7.getUTCHours() - 7);
        // const startDateGMT0 = new Date(startDateGMT7.getTime());

        let compareDate = true;

        if (rangeDate.endDate !== null && rangeDate.startDate !== null) {
          compareDate =
            // startDateGMT0.getTime() >=
            //   dayjs(rangeDate.startDate).millisecond() &&
            // startDateGMT0.getTime() <= dayjs(rangeDate.endDate).millisecond();
            dayjs(slot.timeStart).diff(dayjs(rangeDate.startDate)) >= 0 &&
            dayjs(slot.timeStart).diff(dayjs(rangeDate.endDate)) <= 0;
        } else if (rangeDate.startDate !== null) {
          compareDate =
            // startDateGMT0.getTime() >= dayjs(rangeDate.startDate).millisecond();
            dayjs(slot.timeStart).diff(dayjs(rangeDate.startDate)) >= 0;
        } else if (rangeDate.endDate !== null) {
          compareDate =
            // startDateGMT0.getTime() <= dayjs(rangeDate.endDate).millisecond();
            dayjs(slot.timeStart).diff(dayjs(rangeDate.endDate)) <= 0;
        }

        const isFoundName = filters.searchKey
          ? slot.slotName
              .toLowerCase()
              .includes(trim(filters.searchKey.toLowerCase()))
          : true;

        console.log(compareDate, isFoundName);

        return compareDate && isFoundName;
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, slotList, unique]);

  const columns = [
    {
      field: "slotName",
      headerName: "Tên buổi trị liệu",
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
      field: "timeStart",
      headerName: "Bắt đầu",
      width: 200,
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
          {dayjs(params?.value).format("DD-MM-YYYY HH:mm A") ?? "-"}
        </Typography>
      ),
    },
    {
      field: "timeEnd",
      headerName: "Kết thúc",
      width: 200,
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
          {dayjs(params?.value).format("DD-MM-YYYY HH:mm A") ?? "-"}
        </Typography>
      ),
    },
    {
      field: "available",
      headerName: "Trạng thái",
      width: 200,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      renderHeader: (params) => (
        <Typography sx={{ fontWeight: "bold", fontSize: "19px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <Typography>{params?.value ? "Còn trống" : "Đã đầy"}</Typography>
      ),
    },
    {
      field: "slotID",
      headerName: "Chỉnh sửa",
      width: 200,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      sortable: false,
      renderHeader: (params) => (
        <Typography sx={{ fontWeight: "bold", fontSize: "19px" }}>
          {auth.role === "Staff" ? params.colDef.headerName : ""}
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <>
            {auth.role === "Staff" && (
              <IconButton
                onClick={() =>
                  navigate(`${pages.slotListPath}/${params.value}/edit`)
                }
                sx={{ ml: 1 }}
              >
                <EditIcon
                  sx={{ color: "#008542", cursor: "pointer", fontSize: 28 }}
                />
              </IconButton>
            )}
            {auth.role === "Staff" && (
              <IconButton
                onClick={() => navigate(`/slot/${params.value}/schedule`)}
                sx={{ ml: 1, mr: 1 }}
              >
                <CalendarMonthIcon
                  sx={{ color: "#0C5E96", cursor: "pointer", fontSize: 28 }}
                />
              </IconButton>
            )}
            {auth.role === "Staff" && (
              <IconButton
                onClick={() => {
                  setSlotId(params?.value);
                  setOpenDialog(true);
                }}
              >
                <DeleteIcon
                  sx={{ color: "#e63307", cursor: "pointer", fontSize: 28 }}
                />
              </IconButton>
            )}
          </>
        );
      },
    },
  ];

  useEffect(() => {
    if (slotStatus === "succeeded") {
      dispatch(resetStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getSlotList(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="space-between" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3">DANH SÁCH BUỔI TRỊ LIỆU</Typography>
        <SearchSlotListFrom
          onSearch={(data) => setFilters(data)}
          rangeDate={rangeDate}
          setRangeDate={setRangeDate}
          setUnique={setUnique}
        />
        <Box>
          {auth.role === "Staff" && (
            <>
              <AddButton
                desc="Thêm nhiều buổi trị liệu"
                url={`${pages.addMultipleSlotPath}`}
                sx={{
                  mt: -6,
                  fontWeight: "bold",
                  boxShadow:
                    "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                }}
              />
              <AddButton
                desc="Thêm buổi trị liệu"
                url={`${pages.addSlotPath}`}
                sx={{
                  mx: 5,
                  mt: -6,
                  fontWeight: "bold",
                  boxShadow:
                    "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                }}
              />
            </>
          )}
          <DataGridTable
            width="100%"
            columns={columns}
            rows={rows}
            getRowId={(row) => row.slotID}
            rowHeight={70}
            page={page}
            onPageChange={handlePageChange}
            rowCount={rows?.length ?? 0}
            isLoading={slotStatus !== "succeeded"}
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

export default SlotList;
