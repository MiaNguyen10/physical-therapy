import React, { useEffect, useState } from "react";

import Scheduler, { Editing } from "devextreme-react/scheduler";

import axios from "axios";
import { selectToken } from "cores/reducers/authentication";
import {
  getPhysiotherapists,
  getStatusPhysioTherapist,
  resetStatus,
} from "cores/reducers/physiotherapist";
import { getPhysiotherapistList } from "cores/thunk/physiotherapist";
import Query from "devextreme/data/query";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Appointment from "./Appointment";

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const currentDay = new Date().getDate();

const currentDate = new Date(currentYear, currentMonth, currentDay);

const views = ["day", "week", "workWeek", "month"];

const Schedule = () => {
  const dispatch = useDispatch();
  const physiotherapistList = useSelector(getPhysiotherapists);
  const physiotherapistStatus = useSelector(getStatusPhysioTherapist);
  const token = useSelector(selectToken);
  useEffect(() => {
    if (physiotherapistStatus === "succeeded") {
      dispatch(resetStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getPhysiotherapistList(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [appointmentList, setAppointmentList] = useState([]);
  // const config = useRef({
  //   allowAdding: true,
  //   allowDragging: true,
  // });

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/schedule`).then((res) => {
      const schedules = res.data;
      const formatData = [];
      schedules.forEach((schedule) => {
        const formatDate = moment(schedule.day).format("YYYY-MM-DD");
        const formatTimeStart = moment(schedule.slot.timeStart).format(
          "HH:mm:ss"
        );
        const formatTimeEnd = moment(schedule.slot.timeEnd).format("HH:mm:ss");
        const formatSchedule = {
          slot: schedule.slot.slotName,
          description: schedule.description,
          physiotherapistID: schedule.physiotherapistID,
          startDate: new Date(`${formatDate}T${formatTimeStart}`),
          endDate: new Date(`${formatDate}T${formatTimeEnd}`),
          typeOfSlotName: schedule.typeOfSlot?.typeName,
        };
        formatData.push(formatSchedule);
      });
      setAppointmentList(formatData);
    });
  }, []);

  function getTherapistById(physiotherapistID) {
    return Query(physiotherapistList)
      .filter(["physiotherapistID", physiotherapistID])
      .toArray()[0];
  }

  const onAppointmentFormOpening = (e) => {
    const { form } = e;
    let slotName = e.appointmentData.slot;
    let desc = e.appointmentData.description;
    let startDate = e.appointmentData.startDate;
    let endDate = e.appointmentData.endDate;
    let physiotherapist =
      getTherapistById(e.appointmentData.physiotherapistID) || {};
    let typeOfSlotName = e.appointmentData.typeOfSlotName;

    form.option("items", [
      {
        label: {
          text: "Tên slot",
        },
        name: "slotName",
        editorType: "dxTextBox",
        dataField: "slotID",
        editorOptions: {
          displayExpr: "text",
          valueExpr: "id",
          value: slotName,
        },
      },
      {
        label: {
          text: "Mô tả",
        },
        name: "description",
        editorType: "dxTextBox",
        colSpan: 2,
        dataField: "description",
        editorOptions: {
          displayExpr: "text",
          value: desc,
        },
      },
      {
        dataField: "startDate",
        editorType: "dxDateBox",
        editorOptions: {
          width: "100%",
          type: "datetime",
          value: startDate,
        },
      },
      {
        name: "endDate",
        dataField: "endDate",
        editorType: "dxDateBox",
        editorOptions: {
          width: "100%",
          type: "datetime",
          value: endDate,
        },
      },
      {
        label: {
          text: "Bác sĩ vật lý trị liệu",
        },
        name: "physiotherapist",
        editorType: "dxTextBox",
        dataField: "physiotherapistID",
        editorOptions: {
          displayExpr: "text",
          value: `${physiotherapist.user.firstName} ${physiotherapist.user.lastName}`,
        },
      },
      {
        label: {
          text: "Loại slot",
        },
        name: "typeOfSlot",
        editorType: "dxTextBox",
        dataField: "typeOfSlotID",
        editorOptions: {
          displayExpr: "text",
          value: typeOfSlotName,
        },
      },
    ]);
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
        height={600}
        startDayHour={5}
        allDayPanelMode="hidden"
        editing={true}
        onAppointmentFormOpening={onAppointmentFormOpening}
        appointmentComponent={Appointment}
        recurrenceEditMode="occurrence" 
      >
        <Editing allowAdding={true} />
      </Scheduler>
    </React.Fragment>
  );
};

export default Schedule;
