import React from "react";

export default function ChartLayout() {
  return (
    <div className="tile is-ancestor notification is-dark">
      <div className="tile is-vertical is-parent">
        <div className="tile is-child notification is-success m-2">
          <canvas
            className="box"
            id="PieChart"
            width="400"
            height="400"
          ></canvas>
        </div>
        <div className="tile is-child notification is-success m-2">
          <canvas
            className="box"
            id="BarChart"
            width="400"
            height="400"
          ></canvas>
        </div>
      </div>
      <div className="tile is-vertical is-parent">
        <div className="tile is-child notification is-success m-2">
          <canvas
            className="box"
            id="RadarChart"
            width="400"
            height="400"
          ></canvas>
        </div>
        <div className="tile is-child notification is-success m-2">
          <canvas
            className="box"
            id="LineChart"
            width="400"
            height="400"
          ></canvas>
        </div>
      </div>
    </div>
  );
}
