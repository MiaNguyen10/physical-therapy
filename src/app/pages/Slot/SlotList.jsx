import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Container,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { selectToken } from "cores/reducers/authentication";
import { getStatusCategory } from "cores/reducers/category";
import { getCategoryList } from "cores/thunk/category";
import dayjs from "dayjs";
import "dayjs/locale/th";
import { trim } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
dayjs.locale("th");

const SlotList = () => {
  const dispatch = useDispatch();
  let slotList = useSelector(getSlots);
  const slotStatus = useSelector(getStatusSlots);
  const categoryStatus = useSelector(getStatusCategory);
  const token = useSelector(selectToken);
  console.log(slotList);

  const [page, setPage] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const [filters, setFilters] = useState({
    searchKey: "",
  });

  const handlePageChange = (page) => {
    setPage(page);
  };

  useEffect(() => {
    if (categoryStatus === "succeeded") {
      dispatch(resetStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getCategoryList());
  }, [dispatch]);

  const rows = useMemo(() => {
    return (
      Array.isArray(slotList) &&
      slotList.filter((slot) => {
        const isFoundName =
          slot.slotName
            .toLowerCase()
            .search(trim(filters.searchKey.toLowerCase())) >= 0;
        return isFoundName;
      })
    );
  }, [filters, slotList]);

  const columns = [
    {
      field: "slotName",
      headerName: "Tên",
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
      field: "timeStart",
      headerName: "Bắt đầu",
      width: 200,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      renderHeader: (params) => (
        <Typography>{params.colDef.headerName}</Typography>
      ),
      renderCell: (params) => (
        <Typography>
          {dayjs(params?.value).format("DD-MM-YYYY HH:mm:ss") ?? "-"}
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
        <Typography>{params.colDef.headerName}</Typography>
      ),
      renderCell: (params) => (
        <Typography>
          {dayjs(params?.value).format("DD-MM-YYYY HH:mm:ss") ?? "-"}
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
        <Typography>{params.colDef.headerName}</Typography>
      ),
      renderCell: (params) => (
        <Typography>{params?.value ? "Còn trống" : "Đã đầy"}</Typography>
      ),
    },
    {
      field: "slotID",
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
            <Link href={`${pages.slotListPath}/${params.value}/edit`}>
              <EditIcon
                fontSize="small"
                sx={{ color: "#0C5E96", cursor: "pointer" }}
              />
            </Link>
            <IconButton
              onClick={() => {
                dispatch(deleteSlot({ id: params.value, token }));
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
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3">DANH SÁCH SLOT</Typography>
        <SearchSlotListFrom onSearch={(data) => setFilters(data)} />
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
            rowCount={slotList?.length ?? 0}
            isLoading={slotStatus !== "succeeded"}
            pagination
            paginationMode="client"
          />
        </Box>
      </Stack>
    </Container>
  );
};

export default SlotList;
