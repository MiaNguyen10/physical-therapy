import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import InfoIcon from '@mui/icons-material/Info'
import {
  Box,
  Container,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import DeleteDialog from 'app/components/Dialog/DeleteDialog'
import { selectToken } from 'cores/reducers/authentication'
import { getStatusCategory } from 'cores/reducers/category'
import { getCategoryList } from 'cores/thunk/category'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  getBookingDetails,
  getStatusBookingDetails,
  resetStatus,
} from '../../../cores/reducers/bookingDetail'
import {
  deleteBookingDetail,
  getBookingDetailList,
} from '../../../cores/thunk/bookingDetail'
import DataGridTable from '../../components/DataGrid/DataGridTable'
import pages from '../../config/pages'

const BookingDetailList = () => {
  const dispatch = useDispatch()
  let bookingDetailList = useSelector(getBookingDetails)
  const bookingDetailStatus = useSelector(getStatusBookingDetails)
  // let categoryList = useSelector(getCategories);
  const categoryStatus = useSelector(getStatusCategory)
  const token = useSelector(selectToken)
  const navigate = useNavigate()

  const [page, setPage] = useState(0)
  const [refreshKey, setRefreshKey] = useState(0)
  const [filters, setFilters] = useState({
    searchKey: '',
    searchCate: '',
  })

  const [bookingDetailId, setBookingDetailId] = useState('')
  const [openDialog, setOpenDialog] = useState(false)

  const handlePageChange = (page) => {
    setPage(page)
  }

  const handleClose = () => {
    setOpenDialog(false)
  }

  const handleDelete = () => {
    dispatch(deleteBookingDetail({ bookingDetailID: bookingDetailId, token }))
    setRefreshKey((oldKey) => oldKey + 1)
    setBookingDetailId('')
    setOpenDialog(false)
  }
  useEffect(() => {
    if (categoryStatus === 'succeeded') {
      dispatch(resetStatus)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    dispatch(getCategoryList())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const rows = useMemo(() => {
    return bookingDetailList
    // Array.isArray(bookingDetailList) &&
    // bookingDetailList.filter((bookingDetail) => {
    //   // const isFoundName =
    //   //   bookingDetail.bookingDetailName
    //   //     .toLowerCase()
    //   //     .search(trim(filters.searchKey.toLowerCase())) >= 0;
    //   // const isFoundCate =
    //   //   bookingDetail.categoryID
    //   //     .toLowerCase()
    //   //     .search(trim(filters.searchCate.toLowerCase())) >= 0;
    //   // return isFoundName && isFoundCate;
    // }
  }, [bookingDetailList])
  console.log(bookingDetailList)

  const columns = [
    {
      field: 'firstName',
      headerName: 'Tên người đặt',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      disableColumnMenu: true,
      renderHeader: (params) => (
        <Typography sx={{ fontWeight: 'bold', fontSize: '19px' }}>
          {params.colDef.headerName}
        </Typography>
      ),
      renderCell: (params) => {
        console.log(params)
        return (
          <Typography>
            {/* {Array.isArray(bookingDetailList) &&
                bookingDetailList
                  .filter(
                    (bookingDetail) =>
                      bookingDetail.bookingDetailID === params.value
                  )
                  .map((x) => x.firstName)} */}
            {params.row.bookingSchedule.user.firstName}
          </Typography>
        )
      },
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
      headerAlign: 'center',
      align: 'center',
      disableColumnMenu: true,
      renderHeader: (params) => (
        <Typography sx={{ fontWeight: 'bold', fontSize: '19px' }}>
          {params.colDef.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <Typography>{params.row.bookingSchedule.user.email}</Typography>
      ),
    },
    {
      field: 'subProfile',
      headerName: 'Tên người được điều chị',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      disableColumnMenu: true,
      renderHeader: (params) => (
        <Typography sx={{ fontWeight: 'bold', fontSize: '19px' }}>
          {params.colDef.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <Typography>{params.row.bookingSchedule.subProfile.subName}</Typography>
      ),
    },
    {
      field: 'physio',
      headerName: 'Người điều trị',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      disableColumnMenu: true,
      renderHeader: (params) => (
        <Typography sx={{ fontWeight: 'bold', fontSize: '19px' }}>
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
      field: 'longTermStatus',
      headerName: 'Dài hạn',
      width: 100,
      headerAlign: 'center',
      align: 'center',
      disableColumnMenu: true,
      renderHeader: (params) => (
        <Typography sx={{ fontWeight: 'bold', fontSize: '19px' }}>
          {params.colDef.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <Typography>{params.row.longtermStatus}</Typography>
      ),
    },
    {
      field: 'shortTermStatus',
      headerName: 'Ngắn hạn',
      width: 100,
      headerAlign: 'center',
      align: 'center',
      disableColumnMenu: true,
      renderHeader: (params) => (
        <Typography sx={{ fontWeight: 'bold', fontSize: '19px' }}>
          {params.colDef.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <Typography>{params.row.shorttermStatus}</Typography>
      ),
    },
    {
      field: 'nameOfSlot',
      headerName: 'Loại điều trị',
      width: 250,
      headerAlign: 'center',
      align: 'center',
      disableColumnMenu: true,
      renderHeader: (params) => (
        <Typography sx={{ fontWeight: 'bold', fontSize: '19px' }}>
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
      field: 'price',
      headerName: 'Giá tiền',
      width: 100,
      headerAlign: 'center',
      align: 'center',
      disableColumnMenu: true,
      renderHeader: (params) => (
        <Typography sx={{ fontWeight: 'bold', fontSize: '19px' }}>
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
      field: 'action',
      headerName: 'Chỉnh sửa',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      disableColumnMenu: true,
      sortable: false,
      renderHeader: (params) => (
        <Typography sx={{ fontWeight: 'bold', fontSize: '19px' }}>
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
                sx={{ color: '#008542', cursor: 'pointer', fontSize: 28 }}
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
                  sx={{ color: '#0C5E96', cursor: 'pointer', fontSize: 28 }}
                />
              </Tooltip>
            </IconButton>
            <IconButton
              onClick={() => {
                setBookingDetailId(params?.value)
                setOpenDialog(true)
              }}
            >
              <DeleteIcon
                sx={{ color: '#e63307', cursor: 'pointer', fontSize: 28 }}
              />
            </IconButton>
          </>
        )
      },
    },
  ]

  useEffect(() => {
    if (bookingDetailStatus === 'succeeded') {
      dispatch(resetStatus)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    dispatch(getBookingDetailList(token))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey])

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: '38px' }}>
        <Typography variant="h3">DANH SÁCH BOOKING</Typography>
        {/* <SearchBookingDetailListFrom onSearch={(data) => setFilters(data)} /> */}
        <Box>
          {/* <AddButton
            desc="Thêm bài tập"
            url={`${pages.addBookingDetailPath}`}
            sx={{
              mt: -6,
              fontWeight: "bold",
              boxShadow:
                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
            }}
          /> */}
          <DataGridTable
            columns={columns}
            rows={rows}
            getRowId={(row) => row.bookingDetailID}
            rowHeight={70}
            page={page}
            onPageChange={handlePageChange}
            rowCount={rows?.length ?? 0}
            isLoading={bookingDetailStatus !== 'succeeded'}
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
  )
}

export default BookingDetailList
