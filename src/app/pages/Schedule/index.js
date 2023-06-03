import React, { useEffect, useRef, useState } from "react";

import Scheduler, { Editing, Resource } from "devextreme-react/scheduler";

import axios from "axios";
import { selectToken } from "cores/reducers/authentication";
import { getList, getStatus } from "cores/reducers/typeOfSlot";
import resetStatusTypeOfSlot from "cores/reducers/typeOfSlot/index";
import { deleteSchedule, editSchedule } from "cores/thunk/schedule";
import { getTypeOfSlotList } from "cores/thunk/typeOfSlot";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import Appointment from "./Appointment";

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const currentDay = new Date().getDate();

const currentDate = new Date(currentYear, currentMonth, currentDay);

const views = ["day", "week", "workWeek", "month"];

const Schedule = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const listTypeOfSlot = useSelector(getList);
  const status = useSelector(getStatus);
  const [uniqueId, setUniqueId] = useState(-1);

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

  const [appointmentList, setAppointmentList] = useState([]);
  const config = useRef({
    allowAdding: false,
    allowDragging: false,
    allowResizing: false,
    allowDeleting: false,
    allowUpdating: true,
  });

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/schedule`).then((res) => {
      const schedules = res.data;
      const formatData = [];
      schedules.forEach((schedule) => {
        const formatDateStart = dayjs(schedule.slot.timeStart).format(
          "YYYY-MM-DD"
        );
        const formatDateEnd = dayjs(schedule.slot.timeEnd).format("YYYY-MM-DD");
        const formatTimeStart = dayjs(schedule.slot.timeStart).format(
          "HH:mm:ss"
        );
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
    });
  }, [uniqueId]);

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
          value: `${physiotherapist?.user?.firstName}`,
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

  const onAppointmentUpdated = async (e) => {
    const input = {
      scheduleID: e.appointmentData.scheduleID,
      slotID: e.appointmentData.slotID,
      physiotherapistID: e.appointmentData.physiotherapistID,
      typeOfSlotID: e.appointmentData.typeOfSlotID,
      description: e.appointmentData.description,
      physioBookingStatus: false,
    };
    console.log("🚀 ~ file: index.js:176 ~ onAppointmentUpdated ~ input.e.appointmentData:", e.appointmentData)
    try {
      await dispatch(editSchedule({ input, token })).unwrap();
      setUniqueId(Math.random())
      // Reload the page
      // window.location.reload();
    } catch (err) {
      // eslint-disable-next-line no-empty
    }
  };

  const onAppointmentDeleted = (e) => {
    dispatch(deleteSchedule({ id: e.appointmentData.scheduleID, token }));
  };

  return (
    <React.Fragment>
      <Scheduler
        timeZone="Asia/Ho_Chi_Minh"
        id="scheduler"
        dataSource={appointmentList}
        views={views}
        defaultCurrentView="week"
        defaultCurrentDate={currentDate}
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
  );
};

export default Schedule;
