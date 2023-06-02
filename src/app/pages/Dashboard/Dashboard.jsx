import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Dashboard.css";
import { AreaChart, getRandomInt } from "./components/AreaChart";
import { Container, Stack } from "@mui/material";
import DatePickerInput from "app/components/Input/DatePicker";
import dayjs from "dayjs";
import { makeStyles } from "../Slot/components/BulkSlotForm";
import TimePickerInput from "app/components/Input/TimePicker";
import { getSlotList } from "cores/thunk/slot";
import { selectToken } from "cores/reducers/authentication";
import { getSlots } from "cores/reducers/slot";
import { getUsers } from "cores/reducers/user";
import { getUserList } from "cores/thunk/user";
import { getFeedbackList } from "cores/thunk/feedback";
import { getAllFeedback } from "cores/reducers/feedback";

const mockup = {
  total: {
    user: 62,
    newUser: 24,
    userDataset: [],
    booking: 342,
    newBooking: 117,
    bookingDataset: [],
    slots: 486,
    newSlots: 207,
    slotDataset: [],
    timeRange: {
      startDate: "",
      endDate: "",
    },
  },
}; // cấu trúc data cần lấy lên từ API

const Dashboard = () => {
  const styles = makeStyles();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  let slotList = useSelector(getSlots);
  const userList = useSelector(getUsers);
  const feedbackList = useSelector(getAllFeedback);
  const [reload, setReload] = useState(false);

  const slotDuration = 1; // by hour
  const current =
    dayjs(new Date()).hour() + 3 > 24
      ? dayjs(new Date()).add(1, "day").set("minute", 0).set("hour", 0)
      : dayjs(new Date());

  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(
    current.minute() !== 0
      ? current.set("m", 0).add(slotDuration, "hour")
      : current
  );

  const getAllData = async () => {
    dispatch(getSlotList(token));
    dispatch(getUserList(token));
    dispatch(getFeedbackList(token));
  };

  useEffect(() => {
    getAllData();
  }, [reload]);

  useEffect(() => {
    console.log(slotList, userList, feedbackList);
  }, [slotList, userList, feedbackList]);

  const labels = ["January", "February", "March", "April", "May"];
  const userData = {
    labels,
    datasets: [
      {
        fill: true,
        label: "số lượng người dùng",
        data: labels.map(() => getRandomInt(38, 62)).sort(),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const bookingData = {
    labels,
    datasets: [
      {
        fill: true,
        label: "số lượng booking",
        data: labels.map(() => getRandomInt(342 - 117, 342)).sort(),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="dashboard-heading">
      <div className="all">
        <h2
          style={{
            paddingTop: "0.75em",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          Bảng điều khiển
        </h2>
        <div className="starter-stats">
          <div className="blok">
            <i className="fa fa-money"></i>
            <div className="no">
              <p>Tổng số người dùng</p>
              <p>
                {mockup.total.user}
                {mockup.total.newUser > 0 ? (
                  <span style={{ color: "green", fontSize: "small" }}>
                    {" "}
                    (+{mockup.total.newUser})
                  </span>
                ) : (
                  <span style={{ color: "red", fontSize: "small" }}>
                    {" "}
                    {mockup.total.newUser}
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="blok">
            <i className="fa fa-money kl"></i>
            <div className="no">
              <p>Tổng số booking</p>
              <p>
                {mockup.total.booking}
                {mockup.total.newBooking > 0 ? (
                  <span style={{ color: "green", fontSize: "small" }}>
                    {" "}
                    (+{mockup.total.newBooking})
                  </span>
                ) : (
                  <span style={{ color: "red", fontSize: "small" }}>
                    {" "}
                    {mockup.total.newBooking}
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="blok">
            <i className="fa fa-money pl"></i>
            <div className="no">
              <p>Tổng số buổi điều trị</p>
              <p>
                {mockup.total.slots}
                {mockup.total.newSlots > 0 ? (
                  <span style={{ color: "green", fontSize: "small" }}>
                    {" "}
                    (+{mockup.total.newSlots})
                  </span>
                ) : (
                  <span style={{ color: "red", fontSize: "small" }}>
                    {" "}
                    {mockup.total.newSlots}
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="clear"></div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              padding: "1em 1.5%",
            }}
          >
            <Stack
              direction={"row"}
              spacing={2}
              alignItems="center"
              justifyContent="start"
              sx={{ width: "50%" }}
            >
              <Stack
                direction={"column"}
                spacing={1}
                justifyContent="flex-start"
              >
                <label required style={{ fontWeight: "bold", top: -25 }}>
                  Ngày bắt đầu
                </label>
                <DatePickerInput
                  disabled={false}
                  value={dateStart}
                  onChange={(value) => {
                    setDateStart(dayjs(value));
                  }}
                  sx={{
                    ...styles.textFieldStyle,
                    width: "100%",
                    backgroundColor: "#fff",
                  }}
                  error={""}
                />
              </Stack>
              <Stack direction={"column"} spacing={1} justifyContent="flex-end">
                <label required style={{ fontWeight: "bold", top: -25 }}>
                  Ngày kết thúc
                </label>
                <DatePickerInput
                  disabled={false}
                  value={dateEnd}
                  onChange={(value) => {
                    setDateStart(dayjs(value));
                  }}
                  sx={{
                    ...styles.textFieldStyle,
                    width: "100%",
                    backgroundColor: "#fff",
                  }}
                  error={""}
                />
              </Stack>
            </Stack>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              padding: "0 1.5%",
              gap: "2em",
            }}
          >
            <div className="gains">
              <label>Biểu đồ Người dùng</label>
              <AreaChart data={userData} />
            </div>
            <div className="gains">
              <label>Biểu đồ Booking</label>
              <AreaChart data={bookingData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
