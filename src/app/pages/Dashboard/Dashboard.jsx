import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Dashboard.css";
import { AreaChart, getRandomInt } from "./components/AreaChart";
import { Container, Stack } from "@mui/material";
import DatePickerInput from "app/components/Input/DatePicker";
import dayjs from "dayjs";
import { makeStyles } from "../Slot/components/BulkSlotForm";
import { getSlotList } from "cores/thunk/slot";
import { selectToken } from "cores/reducers/authentication";
import { getSlots } from "cores/reducers/slot";
import { getUserStatistic, getUsers } from "cores/reducers/user";
import { fetchUserStatistic, getUserList } from "cores/thunk/user";
import { getFeedbackList } from "cores/thunk/feedback";
import { getAllFeedback } from "cores/reducers/feedback";

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Dashboard = () => {
  // const styles = makeStyles();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const statistic = useSelector(getUserStatistic);
  const [reload, setReload] = useState(false);
  const [listLabel, setListLabel] = useState(
    labels
    // .slice(0, new Date().getMonth())
  );

  const slotDuration = 1; // by hour
  const current =
    dayjs(new Date()).hour() + 3 > 24
      ? dayjs(new Date()).add(1, "day").set("minute", 0).set("hour", 0)
      : dayjs(new Date());

  const [dateStart, setDateStart] = useState(
    dayjs(new Date(current.year(), 0, 1))
  );
  const [dateEnd, setDateEnd] = useState(
    current.minute() !== 0
      ? current.set("m", 0).add(slotDuration, "hour")
      : current
  );

  const getAllData = async () => {
    dispatch(
      fetchUserStatistic({
        start: new Date(new Date().getFullYear(), 0, 1).toISOString(),
        end: new Date().toISOString(),
        token: token,
      })
    );
  };

  useEffect(() => {
    getAllData();
  }, [reload]);

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
                {statistic.user}
                {statistic.newUser > 0 ? (
                  <span style={{ color: "green", fontSize: "small" }}>
                    {" "}
                    (+{statistic.newUser})
                  </span>
                ) : (
                  <span style={{ color: "red", fontSize: "small" }}>
                    {" "}
                    {statistic.newUser}
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
                {statistic.booking}
                {statistic.newBooking > 0 ? (
                  <span style={{ color: "green", fontSize: "small" }}>
                    {" "}
                    (+{statistic.newBooking})
                  </span>
                ) : (
                  <span style={{ color: "red", fontSize: "small" }}>
                    {" "}
                    {statistic.newBooking}
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="blok">
            <i className="fa fa-money pl"></i>
            <div className="no">
              <p>Tổng số buổi trị liệu</p>
              <p>
                {statistic.slots}
                {statistic.newSlots > 0 ? (
                  <span style={{ color: "green", fontSize: "small" }}>
                    {" "}
                    (+{statistic.newSlots})
                  </span>
                ) : (
                  <span style={{ color: "red", fontSize: "small" }}>
                    {" "}
                    {statistic.newSlots}
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="clear"></div>
          {/* <div
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
                  disablePast={false}
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
          </div> */}
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
              <AreaChart
                data={{
                  labels: listLabel,
                  datasets: [
                    {
                      fill: true,
                      label: "số người dùng mới",
                      data: statistic?.userDataset?.map((u) => u?.total),
                      borderColor: "rgb(53, 162, 235)",
                      backgroundColor: "rgba(53, 162, 235, 0.5)",
                    },
                  ],
                }}
              />
            </div>
            <div className="gains">
              <label>Biểu đồ Booking</label>
              <AreaChart
                data={{
                  labels: listLabel,
                  datasets: [
                    {
                      fill: true,
                      label: "số lượt booking",
                      data: statistic?.bookingDataset?.map((b) => b?.total),
                      borderColor: "rgb(53, 162, 235)",
                      backgroundColor: "rgba(53, 162, 235, 0.5)",
                    },
                  ],
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
