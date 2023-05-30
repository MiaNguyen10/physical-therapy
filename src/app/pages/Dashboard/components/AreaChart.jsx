import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const getRandomInt = (min, max) => {
  let number = Math.floor(Math.random() * max);
  return number > min ? number : min + Math.floor(min - number);
};

export const AreaChart = ({ data, options }) => {
  const defaultOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "",
      },
    },
  };

  const labels = ["January", "February", "March", "April", "May"];
  const mockData = {
    labels,
    datasets: [
      {
        fill: true,
        label: "",
        data: labels.map(() => getRandomInt(38, 62)).sort(),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return <Line options={options || defaultOptions} data={data || mockData} />;
};
