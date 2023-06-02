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
import { getPaymentStatus } from "app/constant/payment";
import colors from "app/constant/color";
import {
  ALL_TYPE_OF_SLOT,
  STATUS_ALL,
  getTypeOfSlot,
  longTermID,
} from "app/constant/bookingDetail";
import SearchBookingListForm from "./components/SearchBookingListForm";
import SlotNameTag from "./components/slotNameTag";

const BookingDetailList = () => {
  const dispatch = useDispatch();
  let bookingDetailList = useSelector(getBookingDetails);
  const bookingDetailStatus = useSelector(getStatusBookingDetails);

  const fetchBookingDetailList = () => {
    dispatch(getBookingDetailList(token));
  };

  const [filters, setFilters] = useState({
    status: STATUS_ALL,
    typeOfSlot: ALL_TYPE_OF_SLOT,
  });
  const [unique, setUnique] = useState(Math.random());
  const [rangeDate, setRangeDate] = useState({
    startDate: dayjs(),
    endDate: dayjs(),
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
  }, [refreshKey, filters.status, filters.typeOfSlot]);

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
    if (rangeDate.endDate !== null && rangeDate.startDate !== null) {
      if (dayjs(rangeDate.startDate).diff(dayjs(rangeDate.endDate)) > 0)
        return [];
    }
    return (
      Array.isArray(bookingDetailList) &&
      bookingDetailList.filter((schedule) => {
        const time = schedule.bookingSchedule.timeBooking;
        const typeOfSlotID = schedule.longtermStatus;
        const paymentStatus = schedule.shorttermStatus;

        let compareDate = true;
        //*  set both from and to date
        if (rangeDate.endDate !== null && rangeDate.startDate !== null) {
          const isValidStartDate =
            getDifferenceDates(time, rangeDate.startDate) >= 0;

          const isValidToDate = dayjs(time).isBefore(rangeDate.endDate);

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

        const isMatchTypeOfSlotID =
          ALL_TYPE_OF_SLOT === filters.typeOfSlot ||
          filters.typeOfSlot === undefined
            ? true
            : typeOfSlotID === filters.typeOfSlot;

        const isMatchedPaymentStatus =
          filters.status === STATUS_ALL || filters.status === undefined
            ? true
            : paymentStatus === filters.status;

        const isMatchedFilters = isMatchedPaymentStatus && isMatchTypeOfSlotID;

        return compareDate && isMatchedFilters;
      })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filters.status,
    filters.typeOfSlot,
    bookingDetailList,
    unique,
    rangeDate,
  ]);

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
      field: "physio",
      headerName: "Chuyên viên",
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
          {
            params.row.bookingSchedule.schedule.physiotherapistDetail.user
              .firstName
          }
        </Typography>
      ),
    },
    {
      field: "subProfile",
      headerName: "Người được điều trị",
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
        <Typography>{params.row.bookingSchedule.subProfile.subName}</Typography>
      ),
    },

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
        const status = getPaymentStatus(params.row.shorttermStatus);
        return (
          <Typography color={status.color} fontWeight='bold'>
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
      renderCell: (params) => {
        const { id, slot, color } = getTypeOfSlot(params.row.longtermStatus);

        return (
          <SlotNameTag bgColor={`${color}`} slotName={slot}>
            {slot}
          </SlotNameTag>
        );
      },
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
          {params.row.bookingSchedule.schedule.typeOfSlot.price.toLocaleString(
            "vi-VN",
            {
              style: "currency",
              currency: "VND",
            }
          )}
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
                navigate(`/bookingDetail/${params.row.bookingDetailID}`)
              }
              sx={{ ml: 1, mr: 1 }}
            >
              <Tooltip title='Xem thêm chi tiết'>
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
    <Container maxWidth='lg' fixed sx={{ mb: 3 }}>
      <Stack alignItems='center' spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant='h3'>DANH SÁCH LỊCH ĐẶT HẸN</Typography>
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
            paginationMode='client'
          />
        </Box>
      </Stack>
      <DeleteDialog
        open={openDialog}
        handleClose={handleClose}
        handleDelete={handleDelete}
        desc='Bạn có chắc chắn muốn xóa không?'
      />
    </Container>
  );
};

function getDifferenceDates(toBeChecked, timeCheck) {
  const formatTimeToBeChecked = dayjs(toBeChecked);
  const formatTimeCheck = dayjs(timeCheck);

  return formatTimeToBeChecked.diff(formatTimeCheck, "day");
}

export default BookingDetailList;
