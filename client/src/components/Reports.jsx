import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Header from "./Header";
import "./reports.css";

export default function Reports() {
  const [vacDataArr, setVacDataArr] = useState([]);

  useEffect(() => {
    fetch("http://localhost:1000/vacations", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setVacDataArr(data));
  }, []);

  const sortedArray = vacDataArr.sort((a, b) => b.followers - a.followers);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: true,
        text: "Vacation Followers Report",
        font: {
          size: 24,
        },
        color: "#000",
      },
    },
    scales: {
      y: {
        ticks: {
          font: {
            size: 16,
          },
          color: "#000",
        },
      },
      x: {
        ticks: {
          font: {
            size: 16,
          },
          color: "#000",
        },
      },
    },
  };

  const labels = sortedArray.map((v) => v.destination);

  const data = {
    labels,
    datasets: [
      {
        label: "Followers",
        data: sortedArray.map((v) => v.followers),
        backgroundColor: "#303f9f95",
      },
    ],
  };

  return (
    <div className="reports">
      <Header />
      <div className="chart">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}
