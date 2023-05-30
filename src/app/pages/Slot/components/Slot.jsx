import { formatDate } from "devextreme/localization";
import React from "react";

export default function Slot(model) {
  const { slot } = model.data;

  return (
    <div className="showtime-preview">
      <div>
        Buổi: <strong>{slot.slotName}</strong>
      </div>
      <div>Trạng thái: {slot.available ? "Còn trống" : "Đã hết"}</div>
      <div>
        {formatDate(slot.timeStart, "shortTime")}
        {" - "}
        {formatDate(slot.timeEnd, "shortTime")}
      </div>
    </div>
  );
}
