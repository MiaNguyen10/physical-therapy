import React, { useEffect, useRef, useState } from "react";

import Scheduler, { Editing, Resource } from "devextreme-react/scheduler";

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
import { getList, getStatus } from "cores/reducers/typeOfSlot";
import resetStatusTypeOfSlot from "cores/reducers/typeOfSlot/index";
import { getTypeOfSlotList } from "cores/thunk/typeOfSlot";

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
  const listTypeOfSlot = useSelector(getList);
  const status = useSelector(getStatus);

  useEffect(() => {
    dispatch(getTypeOfSlotList(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (physiotherapistStatus === "succeeded") {
      dispatch(resetStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status === "succeeded") {
      dispatch(resetStatusTypeOfSlot);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getPhysiotherapistList(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [appointmentList, setAppointmentList] = useState([]);
  const config = useRef({
    allowAdding: false,
    allowDragging: false,
  });

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
          text: schedule.slot.slotName,
          description: schedule.description,
          physiotherapistID: schedule.physiotherapistID,
          startDate: new Date(`${formatDate}T${formatTimeStart}`),
          endDate: new Date(`${formatDate}T${formatTimeEnd}`),
          typeOfSlotID: schedule.typeOfSlotID,
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

  function getTypeOfSlotById(typeOfSlotID) {
    return Query(listTypeOfSlot)
      .filter(["typeOfSlotID", typeOfSlotID])
      .toArray()[0];
  }

  const onAppointmentFormOpening = (e) => {
    const { form } = e;
    let slotName = e.appointmentData.text;
    let desc = e.appointmentData.description;
    let startDate = e.appointmentData.startDate;
    let endDate = e.appointmentData.endDate;
    let physiotherapist =
      getTherapistById(e.appointmentData?.physiotherapistID) || {};
    

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
        dataField: "startDate",
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
        dataField: "endDate",
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
          text: "Bác sĩ vật lý trị liệu",
        },
        name: "physiotherapist",
        editorType: "dxTextBox",
        editorOptions: {
          value: `${physiotherapist.user?.firstName} ${physiotherapist.user?.lastName}`,
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
        editing={config.current}
        allDayPanelMode="hidden"
        onAppointmentFormOpening={onAppointmentFormOpening}
        appointmentComponent={Appointment}
        recurrenceEditMode="occurrence"
      >
        <Editing allowAdding={false} />
        <Resource
          dataSource={listTypeOfSlot}
          fieldExpr="typeOfSlotID"
        />
      </Scheduler>
    </React.Fragment>
  );
};

export default Schedule;
