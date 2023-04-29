import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Box, Container, IconButton, Stack, Typography } from '@mui/material'
import DeleteDialog from 'app/components/Dialog/DeleteDialog'
import { selectToken } from 'cores/reducers/authentication'
import { getStatusCategory } from 'cores/reducers/category'
import { getCategoryList } from 'cores/thunk/category'
import { format } from 'date-fns'
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import { trim } from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  getSlots,
  getStatusSlots,
  resetStatus,
} from '../../../cores/reducers/slot'
import { deleteSlot, getSlotList } from '../../../cores/thunk/slot'
import AddButton from '../../components/Button/AddButton'
import DataGridTable from '../../components/DataGrid/DataGridTable'
import pages from '../../config/pages'
import SearchSlotListFrom from '../Slot/components/SearchSlotListForm'
dayjs.locale('th')

const SlotList = () => {
  const dispatch = useDispatch()
  let slotList = useSelector(getSlots)
  const slotStatus = useSelector(getStatusSlots)
  const categoryStatus = useSelector(getStatusCategory)
  const token = useSelector(selectToken)
  const navigate = useNavigate()
  const [page, setPage] = useState(0)
  const [refreshKey, setRefreshKey] = useState(0)
  const [filters, setFilters] = useState({
    searchKey: '',
  })
  const [unique, setUnique] = useState(Math.random())

  const [rangeDate, setRangeDate] = useState({ startDate: null, endDate: null })
  const [slotId, setSlotId] = useState('')
  const [openDialog, setOpenDialog] = useState(false)

  const handlePageChange = (page) => {
    setPage(page)
  }

  const handleClose = () => {
    setOpenDialog(false)
  }

  const handleDelete = () => {
    dispatch(deleteSlot({ id: slotId, token }))
    setRefreshKey((oldKey) => oldKey + 1)
    setSlotId('')
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
  }, [dispatch])

  const rows = useMemo(() => {
    if (rangeDate.endDate !== null && rangeDate.startDate !== null) {
      if (rangeDate.startDate.getTime() > rangeDate.endDate.getTime()) return []
    }
    return (
      Array.isArray(slotList) &&
      slotList.filter((slot) => {
        const startDateGMT7 = new Date(
          format(new Date(slot.timeStart), 'yyyy-MM-dd')
        )

        startDateGMT7.setUTCHours(startDateGMT7.getUTCHours() - 7)
        const startDateGMT0 = new Date(startDateGMT7.getTime())
        let compareDate = true

        if (rangeDate.startDate !== null && rangeDate.endDate === null) {
          compareDate = startDateGMT0.getTime() >= rangeDate.startDate.getTime()
        } else if (rangeDate.startDate === null && rangeDate.endDate !== null) {
          compareDate = startDateGMT0.getTime() <= rangeDate.endDate.getTime()
        } else if (rangeDate.endDate !== null && rangeDate.startDate !== null) {
          compareDate =
            startDateGMT0.getTime() >= rangeDate.startDate.getTime() &&
            startDateGMT0.getTime() <= rangeDate.endDate.getTime()
        }

        const isFoundName =
          slot.slotName
            .toLowerCase()
            .search(trim(filters.searchKey.toLowerCase())) >= 0
        return compareDate && isFoundName
      })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, slotList, unique])

  const columns = [
    {
      field: 'slotName',
      headerName: 'Tên',
      width: 350,
      headerAlign: 'center',
      align: 'center',
      disableColumnMenu: true,
      renderHeader: (params) => (
        <Typography sx={{ fontWeight: 'bold', fontSize: '19px' }}>
          {params.colDef.headerName}
        </Typography>
      ),
      renderCell: (params) => <Typography>{params?.value ?? '-'}</Typography>,
    },
    {
      field: 'timeStart',
      headerName: 'Bắt đầu',
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
          {dayjs(params?.value).format("DD-MM-YYYY HH:mm A") ?? "-"}
        </Typography>
      ),
    },
    {
      field: 'timeEnd',
      headerName: 'Kết thúc',
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
          {dayjs(params?.value).format("DD-MM-YYYY HH:mm A") ?? "-"}
        </Typography>
      ),
    },
    {
      field: 'available',
      headerName: 'Trạng thái',
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
        <Typography>{params?.value ? 'Còn trống' : 'Đã đầy'}</Typography>
      ),
    },
    {
      field: "slotID",
      headerName: "Chỉnh sửa",
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
                navigate(`${pages.slotListPath}/${params.value}/edit`)
              }
              sx={{ ml: 1 }}
            >
              <EditIcon
               
                sx={{ color: "#008542", cursor: "pointer", fontSize: 28 }}
              />
            </IconButton>
            <IconButton
              onClick={() => navigate(`/slot/${params.value}/schedule`)}
              sx={{ ml: 1, mr: 1 }}
            >
              <CalendarMonthIcon
                sx={{ color: '#0C5E96', cursor: 'pointer', fontSize: 28 }}
              />
            </IconButton>
            <IconButton
              onClick={() => {
                setSlotId(params?.value)
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
    if (slotStatus === 'succeeded') {
      dispatch(resetStatus)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    dispatch(getSlotList(token))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey])

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: '38px' }}>
        <Typography variant="h3">DANH SÁCH SLOT</Typography>
        <SearchSlotListFrom
          onSearch={(data) => setFilters(data)}
          rangeDate={rangeDate}
          setRangeDate={setRangeDate}
          setUnique={setUnique}
        />
        <Box>
          <AddButton
            desc="Thêm slot"
            url={`${pages.addSlotPath}`}
            sx={{ mt: -6 }}
          />
          <DataGridTable
            width="1200px"
            columns={columns}
            rows={rows}
            getRowId={(row) => row.slotID}
            rowHeight={70}
            page={page}
            onPageChange={handlePageChange}
            rowCount={rows?.length ?? 0}
            isLoading={slotStatus !== 'succeeded'}
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

export default SlotList
