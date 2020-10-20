import React, { useEffect } from "react";
import Chart from "chartjs";

export default function NewChart({ data, id }) {
  let chartCanvas = document.getElementById({ id }).getContext("2d");
  new Chart(chartCanvas, data);

  return (
    <div>
      <canvas className="box" id={id} width="400" height="400"></canvas>
    </div>
  );
}
