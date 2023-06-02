import { Container, Stack, Typography } from "@mui/material";
import { selectToken } from "cores/reducers/authentication";
import { addSlot } from "cores/thunk/slot";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSlots, getStatusSlots } from "../../../cores/reducers/slot";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import pages from "../../config/pages";
import dayjs from "dayjs";
import BulkSlotForm from "./components/BulkSlotForm";
import DataGridTable from "app/components/DataGrid/DataGridTable";

const views = ["day", "week", "workWeek", "month"];
const AddMultipleSlots = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const [slotStatus, setSlotStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [desc, setDesc] = useState("");
  let slotList = useSelector(getSlots);
  const [viewList, setViewList] = useState([]);

  const columns = [
    {
      field: "slotName",
      headerName: "Tên buổi điều trị",
      headerAlign: "center",
      align: "center",
      minWidth: 320,
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
      headerAlign: "center",
      align: "center",
      minWidth: 220,
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
      headerAlign: "center",
      align: "center",
      minWidth: 220,
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
      field: "status",
      headerName: "Trạng thái",
      headerAlign: "center",
      align: "center",
      minWidth: 180,
      disableColumnMenu: true,
      renderHeader: (params) => (
        <Typography sx={{ fontWeight: "bold", fontSize: "19px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
      renderCell: (params) => getStatus(params?.value),
    },
  ];

  const getStatus = (status) => {
    let text = "";
    let color = "";
    switch (status) {
      case "pending":
        text = "Đang chờ";
        break;
      case "succeed":
        text = "Thành công";
        color = "green";
        break;
      case "failed":
        text = "Thất bại";
        color = "red";
        break;
      default:
        text = "-";
    }
    return <Typography color={color}>{text}</Typography>;
  };

  const handleFormSubmit = async ({ listCreate }) => {
    let tempList = [...listCreate];
    setViewList(tempList);
    for (const slot of tempList) {
      try {
        const response = await dispatch(addSlot({ slot, token })).unwrap();
        tempList = tempList.map((s) =>
          s.index === slot.index
            ? {
                ...s,
                status:
                  response?.slotName === slot?.slotName ? "succeed" : "failed",
              }
            : s
        );
      } catch (err) {
        // eslint-disable-next-line no-empty
        tempList = tempList.map((s) =>
          s.index === slot.index ? { ...s, status: "failed" } : s
        );
        console.log(err);
      } finally {
        setViewList(tempList);
      }
    }
    setSlotStatus(true);
  };

  const rows = useMemo(() => {
    return Array.isArray(viewList) && viewList;
  }, [viewList]);

  useEffect(() => {
    if (slotStatus === true) {
      setDesc("Đã thêm thông tin! Chi tiết tại bảng danh sách.");
      setOpen(true);
    }
  }, [slotStatus]);

  const handleClose = () => {
    if (slotStatus === "succeeded") {
      setOpen(false);
      navigate(`${pages.slotListPath}`);
    } else {
      setOpen(false);
      // navigate(`${pages.addSlotPath}`);
      setDesc("");
    }
  };

  return (
    <Container maxWidth="lg" fixed sx={{ mb: 3 }}>
      <Stack alignItems="center" spacing={8} sx={{ marginTop: "38px" }}>
        <Typography variant="h3">THÊM NHIỀU BUỔI ĐIỀU TRỊ</Typography>
        <BulkSlotForm
          onFormSubmit={handleFormSubmit}
          isLoading={slotStatus === "loading"}
        />
      </Stack>
      <DataGridTable
        width="100%"
        columns={columns}
        rows={rows}
        getRowId={(row) => row.slotName}
        rowsPerPage={168}
        rowHeight={70}
        rowCount={rows?.length ?? 0}
        sx={{ mt: "38px" }}
        pagination={false}
      />
      <ConfirmDialog open={open} handleClose={handleClose} desc={desc} />
    </Container>
  );
};

export default AddMultipleSlots;
