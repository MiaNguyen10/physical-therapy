import { formatDate } from "devextreme/localization";
import React from "react";

export default function Appointment(model) {
  const { targetedAppointmentData } = model.data;

  return (
    <div className="showtime-preview">
      <div>
        <strong>{targetedAppointmentData.text}</strong>{" "}
      </div>
      <div>
        Chuyên viên vật lý trị liệu:{" "}
        {`${targetedAppointmentData.physiotherapistDetail.user.firstName}`}
      </div>
      <div>
        Chuyên môn: {targetedAppointmentData.physiotherapistDetail.specialize}
      </div>
      <div>
        Kĩ năng điều trị: {targetedAppointmentData.physiotherapistDetail.skill}
      </div>
      <div>Loại điều trị: {targetedAppointmentData.typeOfSlot?.typeName}</div>
      <div>
        {formatDate(targetedAppointmentData.displayStartDate, "shortTime")}
        {" - "}
        {formatDate(targetedAppointmentData.displayEndDate, "shortTime")}
      </div>
    </div>
  );
}
