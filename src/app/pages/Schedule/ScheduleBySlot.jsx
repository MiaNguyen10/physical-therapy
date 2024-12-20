import React, { useEffect, useRef, useState } from "react";

import Scheduler, { Editing, Resource } from "devextreme-react/scheduler";

import { Button } from "@mui/material";
import pages from "app/config/pages";
import { selectToken } from "cores/reducers/authentication";
import {
  getSchedule,
  getScheduleStatus,
  resetScheduleStatus,
} from "cores/reducers/schedule";
import { getSlot, getStatusSlots, resetStatus } from "cores/reducers/slot";
import { getList, getStatus } from "cores/reducers/typeOfSlot";
import resetStatusTypeOfSlot from "cores/reducers/typeOfSlot/index";
import {
  deleteSchedule,
  editSchedule,
  getScheduleBySlotID,
} from "cores/thunk/schedule";
import { getSlotDetail } from "cores/thunk/slot";
import { getTypeOfSlotList } from "cores/thunk/typeOfSlot";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Appointment from "./Appointment";
import dayjs from "dayjs";

const views = ["day", "week", "workWeek", "month"];

const ScheduleBySlot = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const listTypeOfSlot = useSelector(getList);
  const status = useSelector(getStatus);
  const navigate = useNavigate();
  const slotStatus = useSelector(getStatusSlots);
  const slotDetail = useSelector(getSlot);

  const schedules = useSelector(getSchedule);
  const scheduleStatus = useSelector(getScheduleStatus);
  // const currentDate = new Date(2023, 1, 4);
  // console.log(new Date(dayjs(slotDetail.timeStart).format("YYYY/DD/MM")));
  // console.log(currentDate);

  useEffect(() => {
    dispatch(getSlotDetail({ id: id, token }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (slotStatus === "succeeded") {
      dispatch(resetStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getTypeOfSlotList(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status === "succeeded") {
      dispatch(resetStatusTypeOfSlot);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (slotDetail) dispatch(getScheduleBySlotID({ slotID: id, token }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slotDetail]);

  useEffect(() => {
    if (scheduleStatus === "succeeded") {
      dispatch(resetScheduleStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [appointmentList, setAppointmentList] = useState([]);
  const config = useRef({
    allowAdding: false,
    allowDragging: false,
    allowResizing: false,
    allowDeleting: false,
    allowUpdating: true,
  });

  useEffect(() => {
    const formatData = [];
    schedules.forEach((schedule) => {
      const formatDateStart = dayjs(schedule.slot.timeStart).format(
        "YYYY-MM-DD"
      );
      const formatDateEnd = dayjs(schedule.slot.timeEnd).format("YYYY-MM-DD");
      const formatTimeStart = dayjs(schedule.slot.timeStart).format("HH:mm:ss");
      const formatTimeEnd = dayjs(schedule.slot.timeEnd).format("HH:mm:ss");

      const formatSchedule = {
        text: schedule.slot.slotName,
        description: schedule.description,
        physiotherapistDetail: schedule.physiotherapistDetail,
        typeOfSlot: schedule.typeOfSlot,
        physiotherapistID: schedule.physiotherapistID,
        startDate: new Date(`${formatDateStart}T${formatTimeStart}`),
        endDate: new Date(`${formatDateEnd}T${formatTimeEnd}`),
        typeOfSlotID: schedule.typeOfSlotID,
        scheduleID: schedule.scheduleID,
        slotID: schedule.slotID,
      };
      formatData.push(formatSchedule);
    });
    const filterData = formatData.filter(
      (data) => data.typeOfSlot?.typeName !== "Trị liệu dài hạn"
    );
    setAppointmentList(filterData);
  }, [schedules]);

  const onAppointmentFormOpening = (e) => {
    const filteredListTypeOfSlot = listTypeOfSlot.filter(
      (typeOfSlot) => typeOfSlot.typeName !== "Trị liệu dài hạn"
    );
    const { form } = e;
    let slotName = e.appointmentData.text;
    let desc = e.appointmentData.description;
    let startDate = e.appointmentData.startDate;
    let endDate = e.appointmentData.endDate;
    let physiotherapist = e.appointmentData?.physiotherapistDetail || {};

    form.option("items", [
      {
        label: {
          text: "Tên buổi điều trị",
        },
        name: "slotName",
        editorType: "dxTextBox",
        editorOptions: {
          value: slotName,
          readOnly: true,
        },
      },
      {
        label: {
          text: "Mô tả",
        },
        name: "description",
        editorType: "dxTextBox",
        colSpan: 10,
        editorOptions: {
          value: desc,
          readOnly: true,
        },
      },
      {
        name: "startDate",
        dataField: "Thời gian bắt đầu",
        editorType: "dxDateBox",
        editorOptions: {
          width: "100%",
          type: "datetime",
          value: startDate,
          readOnly: true,
        },
      },
      {
        name: "endDate",
        dataField: "Thời gian kết thúc",
        editorType: "dxDateBox",
        editorOptions: {
          width: "100%",
          type: "datetime",
          value: endDate,
          readOnly: true,
        },
      },
      {
        label: {
          text: "Chuyên viên vật lý trị liệu",
        },
        name: "physiotherapist",
        editorType: "dxTextBox",
        editorOptions: {
          value: `${physiotherapist?.user?.firstName} ${physiotherapist?.user?.lastName}`,
          readOnly: true,
        },
      },
      {
        label: {
          text: "Loại điều trị",
        },
        editorType: "dxSelectBox",
        dataField: "typeOfSlotID",
        editorOptions: {
          items: filteredListTypeOfSlot,
          displayExpr: "typeName",
          valueExpr: "typeOfSlotID",
        },
      },
    ]);
  };

  const onAppointmentUpdated = (e) => {
    const input = {
      scheduleID: e.appointmentData.scheduleID,
      slotID: e.appointmentData.slotID,
      physiotherapistID: e.appointmentData.physiotherapistID,
      typeOfSlotID: e.appointmentData.typeOfSlotID,
      description: e.appointmentData.description,
      physioBookingStatus: false,
    };
    try {
      dispatch(editSchedule({ input, token })).unwrap();
    } catch (err) {
      // eslint-disable-next-line no-empty
    }
  };

  const onAppointmentDeleted = (e) => {
    dispatch(deleteSchedule({ id: e.appointmentData.scheduleID, token }));
  };

  return slotDetail.timeStart ? (
    <React.Fragment>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => navigate(pages.slotListPath)}
        sx={{
          m: 2,
          float: "right",
          fontWeight: "bold",
          boxShadow:
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        }}
      >
        Quay về buổi điều trị
      </Button>
      <Scheduler
        timeZone="Asia/Ho_Chi_Minh"
        id="scheduler"
        dataSource={appointmentList}
        views={views}
        defaultCurrentView="day"
        defaultCurrentDate={
          new Date(dayjs(slotDetail.timeStart).format("YYYY/MM/DD"))
        }
        startDayHour={0}
        editing={config.current}
        allDayPanelMode="hidden"
        onAppointmentFormOpening={onAppointmentFormOpening}
        appointmentComponent={Appointment}
        recurrenceEditMode="occurrence"
        onAppointmentUpdated={onAppointmentUpdated}
        onAppointmentDeleted={onAppointmentDeleted}
        firstDayOfWeek={1}
      >
        <Editing allowAdding={false} />
        <Resource dataSource={listTypeOfSlot} fieldExpr="typeOfSlotID" />
      </Scheduler>
    </React.Fragment>
  ) : null;
};

export default ScheduleBySlot;
