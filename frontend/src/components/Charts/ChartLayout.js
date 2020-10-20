import React from "react";
import { Bar, Line, Pie, Radar } from "react-chartjs-2";
<<<<<<< HEAD
import { useParams } from "react-router-dom";

export default function ChartLayout() {
  let { playlist } = useParams();

  const [pieObject, setPieObject] = useState({});
  const [barObject, setBarObject] = useState({});
  const [lineObject, setLineObject] = useState({});
  const [radarObject, setRadarObject] = useState({});

  // phil = 22nllj3rpfhvzlgt5hin5aqra
  // tyler = tylerhall12
  // simon = 1231189291
  // keefer = 12179586444

  useEffect(() => {
    const fetchData = async () => {
      let resp = await axios.get(`http://localhost:5000/data/${playlist}`);
      let chartData = resp.data.chartData
      let playlistData = resp.data.filteredData
      console.log({playlistData});
      setPieObject(chartData.pie);
      setBarObject(chartData.bar);
      setLineObject(chartData.line);
      setRadarObject(chartData.radar);
    };
    fetchData();
  }, [playlist]);
=======
>>>>>>> main

export default function ChartLayout({
  chartData: { pieObject, barObject, lineObject, radarObject },
}) {
  return (
    <div className="tile is-ancestor notification is-dark is-centered">
      <div className="tile is-vertical is-parent">
        <div className="tile is-child notification is-success m-2">
          <div className="box">
            <Pie data={pieObject.data} options={pieObject.options} />
          </div>
        </div>
        <div className="tile is-child notification is-success m-2">
          <div className="box">
            <Bar data={barObject.data} options={barObject.options} />
          </div>
        </div>
      </div>
      <div className="tile is-vertical is-parent">
        <div className="tile is-child notification is-success m-2">
          <div className="box">
            <Line data={lineObject.data} options={lineObject.options} />
          </div>
        </div>
        <div className="tile is-child notification is-success m-2">
          <div className="box">
            {pieObject.data !== undefined &&
            pieObject.data.datasets[0].data.length > 2 ? (
              <Radar data={radarObject.data} options={radarObject.options} />
            ) : (
              <p>Need to analyse more than 3 users to view this graph</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
