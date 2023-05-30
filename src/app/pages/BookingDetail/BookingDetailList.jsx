import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import {
  Box,
  Container,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteDialog from "app/components/Dialog/DeleteDialog";
import { selectToken } from "cores/reducers/authentication";
import dayjs from "dayjs";
import "dayjs/locale/th";
// import { getStatusCategory } from 'cores/reducers/category'
// import { getCategoryList } from 'cores/thunk/category'
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getBookingDetails,
  getStatusBookingDetails,
  resetStatus,
} from "../../../cores/reducers/bookingDetail";
import {
  deleteBookingDetail,
  getBookingDetailList,
} from "../../../cores/thunk/bookingDetail";
import DataGridTable from "../../components/DataGrid/DataGridTable";
import pages from "../../config/pages";
import {
  getLongTermPaymentStatus,
  getShortTermPaymentStatus,
} from "app/constant/payment";
import SearchBookingListForm, {
  ALL_STATUS_LONG_TERM,
  ALL_STATUS_SHORT_TERM,
} from "./components/SearchBookingListForm";

const BookingDetailList = () => {
  const dispatch = useDispatch();
  let bookingDetailList = useSelector(getBookingDetails);
  const bookingDetailStatus = useSelector(getStatusBookingDetails);

  const fetchBookingDetailList = () => {
    dispatch(getBookingDetailList(token));
  };

  const [filters, setFilters] = useState({
    longTermStatus: undefined,
    shortTermStatus: undefined,
  });
  const [unique, setUnique] = useState(Math.random());
  const [rangeDate, setRangeDate] = useState({
    startDate: null,
    endDate: null,
  });
  // let categoryList = useSelector(getCategories);
  // const categoryStatus = useSelector(getStatusCategory)
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const [bookingDetailId, setBookingDetailId] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchBookingDetailList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey, filters]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleDelete = () => {
    // dispatch(deleteBookingDetail({ bookingDetailID: bookingDetailId, token }));
    setRefreshKey((oldKey) => oldKey + 1);
    setBookingDetailId("");
    setOpenDialog(false);
  };
  // useEffect(() => {
  //   if (categoryStatus === 'succeeded') {
  //     dispatch(resetStatus)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // useEffect(() => {
  //   dispatch(getCategoryList())
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  const rows = useMemo(() => {
    console.log(bookingDetailList);
    if (rangeDate.endDate !== null && rangeDate.startDate !== null) {
      if (dayjs(rangeDate.startDate).diff(dayjs(rangeDate.endDate)) > 0)
        return [];
    }
    return (
      Array.isArray(bookingDetailList) &&
      bookingDetailList.filter((schedule) => {
        const time = schedule.bookingSchedule.timeBooking;
        const longtermStatus = schedule.longtermStatus;
        const shortTermStatus = schedule.shorttermStatus;

        let compareDate = true;
        //* is set from and to date
        if (rangeDate.endDate !== null && rangeDate.startDate !== null) {
          const isValidStartDate =
            getDifferenceDates(time, rangeDate.startDate) >= 0;
          const isValidToDate =
            getDifferenceDates(time, rangeDate.endDate) <= 0;

          compareDate = isValidStartDate && isValidToDate;
          //* only set from date
        } else if (rangeDate.startDate !== null) {
          const isValidStartDate =
            getDifferenceDates(time, rangeDate.startDate) >= 0;

          compareDate = isValidStartDate;
          //* only set to date
        } else if (rangeDate.endDate !== null) {
          const isValidToDate =
            getDifferenceDates(time, rangeDate.endDate) <= 0;
          compareDate = isValidToDate;
        }

        const matchLongTermStatus =
          ALL_STATUS_LONG_TERM === filters.longTermStatus
            ? true
            : longtermStatus === filters.longTermStatus;
        const matchShortTermStatus =
          filters.shortTermStatus === ALL_STATUS_SHORT_TERM
            ? true
            : shortTermStatus === filters.shortTermStatus;

        const matchedStatuses = matchLongTermStatus && matchShortTermStatus;

        return compareDate && matchedStatuses;
      })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, bookingDetailList, unique]);

  const columns = [
    {
      field: "timeBooking",
      headerName: "Ngày đặt",
      width: 250,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      renderHeader: (params) => (
        <Typography sx={{ fontWeight: "bold", fontSize: "19px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
      renderCell: (params) => {
        const time = new Date(params.row.bookingSchedule.timeBooking);
        const options = {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        };
        const formattedTime = time.toLocaleString("vi", options);
        return <Typography>{formattedTime}</Typography>;
      },
    },
    {
      field: "subProfile",
      headerName: "Bệnh nhân",
      width: 170,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      renderHeader: (params) => (
        <Typography sx={{ fontWeight: "bold", fontSize: "19px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <Typography>{params.row.bookingSchedule.subProfile.subName}</Typography>
      ),
    },
    {
      field: "physio",
      headerName: "Người điều trị",
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
          {
            params.row.bookingSchedule.schedule.physiotherapistDetail.user
              .firstName
          }
        </Typography>
      ),
    },
    // {
    //   field: "longTermStatus",
    //   headerName: "Dài hạn",
    //   width: 170,
    //   headerAlign: "center",
    //   align: "center",
    //   disableColumnMenu: true,
    //   renderHeader: (params) => (
    //     <Typography sx={{ fontWeight: "bold", fontSize: "19px" }}>
    //       {params.colDef.headerName}
    //     </Typography>
    //   ),
    //   renderCell: (params) => {
    //     const status = getLongTermPaymentStatus(params.row.longtermStatus);

    //     return (
    //       <Typography color={status.color} fontWeight="bold">
    //         {status.status}
    //       </Typography>
    //     );
    //   },
    // },
    // {
    //   field: "shortTermStatus",
    //   headerName: "Ngắn hạn",
    //   width: 170,
    //   headerAlign: "center",
    //   align: "center",
    //   disableColumnMenu: true,
    //   renderHeader: (params) => (
    //     <Typography sx={{ fontWeight: "bold", fontSize: "19px" }}>
    //       {params.colDef.headerName}
    //     </Typography>
    //   ),
    //   renderCell: (params) => {
    //     const status = getShortTermPaymentStatus(params.row.shorttermStatus);

    //     return (
    //       <Typography color={status.color} fontWeight="bold">
    //         {status.status}
    //       </Typography>
    //     );
    //   },
    // },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 170,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      renderHeader: (params) => (
        <Typography sx={{ fontWeight: "bold", fontSize: "19px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
      renderCell: (params) => {
        const typeofslot =
          params.row.bookingSchedule.schedule.typeOfSlot.typeName;
        let status;

        if (typeofslot === "Trị liệu dài hạn") {
          status = getLongTermPaymentStatus(params.row.longtermStatus);
        } else {
          status = getShortTermPaymentStatus(params.row.shorttermStatus);
        }

        return (
          <Typography color={status.color} fontWeight="bold">
            {status.status}
          </Typography>
        );
      },
    },
    {
      field: "nameOfSlot",
      headerName: "Loại điều trị",
      width: 170,
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
          {params.row.bookingSchedule.schedule.typeOfSlot.typeName}
        </Typography>
      ),
    },
    {
      field: "price",
      headerName: "Giá tiền",
      width: 100,
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
          {params.row.bookingSchedule.schedule.typeOfSlot.price}
        </Typography>
      ),
    },
    {
      field: "action",
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
                navigate(`${pages.bookingDetailListPath}/${params?.value}/edit`)
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
                  `/bookingDetail/${params?.value}/bookingDetailDetailList`
                )
              }
              sx={{ ml: 1, mr: 1 }}
            >
              <Tooltip title="Chi tiết bài tập">
                <InfoIcon
                  sx={{ color: "#0C5E96", cursor: "pointer", fontSize: 28 }}
                />
              </Tooltip>
            </IconButton>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    if (bookingDetailStatus === "succeeded") {
      dispatch(resetStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getBookingDetailList(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3">DANH SÁCH BOOKING</Typography>
        <SearchBookingListForm
          onSearch={setFilters}
          rangeDate={rangeDate}
          setRangeDate={setRangeDate}
          setUnique={setUnique}
        />
        {/* <SearchBookingDetailListFrom onSearch={(data) => setFilters(data)} /> */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <DataGridTable
            columns={columns}
            rows={rows}
            getRowId={(row) => row.bookingDetailID}
            rowHeight={70}
            page={page}
            onPageChange={handlePageChange}
            rowCount={rows?.length ?? 0}
            isLoading={bookingDetailStatus !== "succeeded"}
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

function getDifferenceDates(toBeChecked, timeCheck) {
  const formatTimeChecked = dayjs(toBeChecked);
  const formatTimeCheck = dayjs(timeCheck);

  return formatTimeChecked.diff(formatTimeCheck, "day");
}

export default BookingDetailList;
