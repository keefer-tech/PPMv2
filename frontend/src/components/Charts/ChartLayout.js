import React from "react";
import { Bar, Line, Pie, Radar } from "react-chartjs-2";

export default function ChartLayout({
  chartData: { pieObject, barObject, lineObject, radarObject },
}) {
  return (
    <div className="tile">
      <div className="tile is-vertical column">
        <div className="tile is-parent notification is-success m-2">
          <div className="tile is-child notification is-light">
            <h4 className="subtitle is-4">Tracks Contributed</h4>
            <Pie data={pieObject.data} options={pieObject.options} />
          </div>
        </div>
        <div className="tile is-parent notification is-success m-2">
          <div className="tile is-child notification is-light">
            <h4 className="subtitle is-4">Most Popular Artists</h4>
            <Bar data={barObject.data} options={barObject.options} />
          </div>
        </div>
      </div>
      <div className="tile is-vertical column">
        <div className="tile is-parent notification is-success m-2">
          <div className="tile is-child notification is-light">
            <h4 className="subtitle is-4">Favourite Decades</h4>
            <Line data={lineObject.data} options={lineObject.options} />
          </div>
        </div>
        <div className="tile is-parent notification is-success m-2">
          <div className="tile is-child notification is-light">
            {pieObject.data !== undefined &&
            pieObject.data.datasets[0].data.length > 2 ? (
              <>
                <h4 className="subtitle is-4">How Mainstream Are You</h4>
                <Radar data={radarObject.data} options={radarObject.options} />
              </>
            ) : (
              <p>Need to analyse more than 3 users to view this graph</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
