import React, { useEffect } from "react";
import Query from "devextreme/data/query";
import { useDispatch, useSelector } from "react-redux";
import {
  getPhysiotherapists,
  getStatusPhysioTherapist,
} from "cores/reducers/physiotherapist";
import { selectToken } from "cores/reducers/authentication";
import { resetStatus } from "cores/reducers/category";
import { getPhysiotherapistList } from "cores/thunk/physiotherapist";
import { formatDate } from "devextreme/localization";

export default function Appointment(model) {
  const { targetedAppointmentData } = model.data;
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

  function getTherapistById(physiotherapistID) {
    return Query(physiotherapistList)
      .filter(["physiotherapistID", physiotherapistID])
      .toArray()[0];
  }

  const physiotherapist =
    getTherapistById(targetedAppointmentData.physiotherapistID) || {};
  return (
    <div className="showtime-preview">
      <div>
        <strong>{targetedAppointmentData.text}</strong>{" "}
      </div>
      <div>
        Bác sĩ trị liệu:{" "}
        {`${physiotherapist.user.firstName} ${physiotherapist.user.lastName}`}
      </div>
      <div>
        {formatDate(targetedAppointmentData.displayStartDate, "shortTime")}
        {" - "}
        {formatDate(targetedAppointmentData.displayEndDate, "shortTime")}
      </div>
    </div>
  );
}
