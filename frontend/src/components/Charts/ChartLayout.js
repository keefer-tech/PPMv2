import Axios from "axios";
import React, { useEffect } from "react";
import Chart from "chartjs";
import { useParams } from "react-router-dom";

export default function ChartLayout() {
  let { playlist } = useParams();

  console.log(playlist);

  // store the state of the data in usestate
  // use useEffect to make the axios call to the backend which fetches you the data
  // update state in useeffect
  // react will re-render the page
  async function getChartData(playlist) {
    let data = Axios({
      method: "get",
      url: `http://localhost:5000/data/${playlist}`,
    });
    return data;
  }

  function populateCharts(data) {
    let charts = Array.from(document.getElementsByClassName("chartTarget"));
    for (let chart of charts) {
      let canvas = chart.getContext("2d");
      switch (chart.id) {
        case "PieChart":
          new Chart(canvas, data.pie);
          break;
        case "BarChart":
          new Chart(canvas, data.bar);
          break;
        case "LineChart":
          new Chart(canvas, data.line);
          break;
        case "RadarChart":
          new Chart(canvas, data.radar);
          break;
        default:
          console.log("No Charts!");
      }
    }
  }

  // let chartData = await getChartData(playlist);

  //DUMMY DATA FOR NOW
  let chartData = {
    pie: {
      type: "pie",
      data: {
        datasets: [
          {
            data: [10, 20, 30],
          },
        ],
        labels: ["Red", "Yellow", "Blue"],
      },
      options: {
        responsive: true,
        title: {
          display: false,
          text: "Pie Chart",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: null,
        },
      },
    },
    bar: {
      type: "bar",
      data: {},
      options: {},
    },
    line: {
      type: "line",
      data: {},
      options: {},
    },
    radar: {
      type: "radar",
      data: {},
      options: {},
    },
  };

  useEffect(() => populateCharts(chartData), []);

  return (
    <div className="columns notification is-dark is-centered">
      <div className="column">
        <div className="notification is-success m-2">
          <canvas
            className="chartTarget box"
            id="PieChart"
            width="150"
            height="150"
          ></canvas>
        </div>
        <div className="notification is-success m-2">
          <canvas
            className="chartTarget box"
            id="BarChart"
            width="150"
            height="150"
          ></canvas>
        </div>
      </div>
      <div className="column">
        <div className="notification is-success m-2">
          <canvas
            className="chartTarget box"
            id="LineChart"
            width="150"
            height="150"
          ></canvas>
        </div>
        <div className="notification is-success m-2">
          <canvas
            className="chartTarget box"
            id="RadarChart"
            width="150"
            height="150"
          ></canvas>
        </div>
      </div>
    </div>
  );
}
