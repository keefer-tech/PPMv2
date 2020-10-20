import Axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import NewChart from "./NewChart";

export default async function ChartLayout() {
  let { playlist } = useParams();

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

  let chartData = await getChartData(playlist);

  return (
    <div className="tile is-ancestor notification is-dark">
      <div className="tile is-vertical is-parent">
        <div className="tile is-child notification is-success m-2">
          <NewChart data={chartData.pie} id={"PieChart"} />
        </div>
        <div className="tile is-child notification is-success m-2">
          <NewChart data={chartData.bar} id={"BarChart"} />
        </div>
      </div>
      <div className="tile is-vertical is-parent">
        <div className="tile is-child notification is-success m-2">
          <NewChart data={chartData.line} id={"LineChart"} />
        </div>
        <div className="tile is-child notification is-success m-2">
          <NewChart data={chartData.radar} id={"RadarChart"} />
        </div>
      </div>
    </div>
  );
}
