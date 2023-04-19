import React, { useEffect, useRef, useState } from "react";

import Scheduler, { Editing, Resource } from "devextreme-react/scheduler";

import { selectToken } from "cores/reducers/authentication";
import {
  getSchedule,
  getScheduleStatus,
  resetScheduleStatus,
} from "cores/reducers/schedule";
import { getList, getStatus } from "cores/reducers/typeOfSlot";
import resetStatusTypeOfSlot from "cores/reducers/typeOfSlot/index";
import {
  deleteSchedule,
  editSchedule,
  getScheduleBySlotID,
} from "cores/thunk/schedule";
import { getTypeOfSlotList } from "cores/thunk/typeOfSlot";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Appointment from "./Appointment";
import { Button } from "@mui/material";
import pages from "app/config/pages";

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const currentDay = new Date().getDate();

const currentDate = new Date(currentYear, currentMonth, currentDay);

const views = ["day", "week", "workWeek", "month"];

const ScheduleBySlot = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const listTypeOfSlot = useSelector(getList);
  const status = useSelector(getStatus);
  const navigate = useNavigate()

  const schedules = useSelector(getSchedule);
  const scheduleStatus = useSelector(getScheduleStatus);

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
    dispatch(getScheduleBySlotID({ slotID: id, token }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    allowDeleting: true,
    allowUpdating: true,
  });

  useEffect(() => {
    const formatData = [];
    schedules.forEach((schedule) => {
      const formatDateStart = moment(schedule.slot.timeStart).format(
        "YYYY-MM-DD"
      );
      const formatDateEnd = moment(schedule.slot.timeEnd).format("YYYY-MM-DD");
      const formatTimeStart = moment(schedule.slot.timeStart).format(
        "HH:mm:ss"
      );
      const formatTimeEnd = moment(schedule.slot.timeEnd).format("HH:mm:ss");
      const formatSchedule = {
        text: schedule.slot.slotName,
        description: schedule.description,
        physiotherapistDetail: schedule.physiotherapistDetail,
        startDate: new Date(`${formatDateStart}T${formatTimeStart}`),
        endDate: new Date(`${formatDateEnd}T${formatTimeEnd}`),
        typeOfSlotID: schedule.typeOfSlotID,
        scheduleID: schedule.scheduleID,
        slotID: schedule.slotID,
      };
      formatData.push(formatSchedule);
    });
    setAppointmentList(formatData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schedules]);

  const onAppointmentFormOpening = (e) => {
    const { form } = e;
    let slotName = e.appointmentData.text;
    let desc = e.appointmentData.description;
    let startDate = e.appointmentData.startDate;
    let endDate = e.appointmentData.endDate;
    let physiotherapist = e.appointmentData?.physiotherapistDetail || {};

    form.option("items", [
      {
        label: {
          text: "Tên slot",
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
          text: "Nhà vật lý trị liệu",
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
          text: "Loại Slot",
        },
        editorType: "dxSelectBox",
        dataField: "typeOfSlotID",
        editorOptions: {
          items: listTypeOfSlot,
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
      physioBookingStatus: true,
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

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => navigate(pages.slotListPath)}
        sx={{m: 2, float: "right"}}
      >
        Quay về slot
      </Button>
      <Scheduler
        timeZone="Asia/Ho_Chi_Minh"
        id="scheduler"
        dataSource={appointmentList}
        views={views}
        defaultCurrentView="week"
        defaultCurrentDate={currentDate}
        height={600}
        startDayHour={5}
        editing={config.current}
        allDayPanelMode="hidden"
        onAppointmentFormOpening={onAppointmentFormOpening}
        appointmentComponent={Appointment}
        recurrenceEditMode="occurrence"
        onAppointmentUpdated={onAppointmentUpdated}
        onAppointmentDeleted={onAppointmentDeleted}
      >
        <Editing allowAdding={false} />
        <Resource dataSource={listTypeOfSlot} fieldExpr="typeOfSlotID" />
      </Scheduler>
    </React.Fragment>
  );
};

export default ScheduleBySlot;