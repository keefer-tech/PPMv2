import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import TrackListing from "../components/GuestComponents/TrackListing";
import ChartLayout from "../components/Charts/ChartLayout";
import PreviousPlaylists from "../components/GuestComponents/PreviousPlaylists";

export default function GuestVisual() {
  let { playlist } = useParams();

  const [pieObject, setPieObject] = useState({});
  const [barObject, setBarObject] = useState({});
  const [lineObject, setLineObject] = useState({});
  const [radarObject, setRadarObject] = useState({});
  const [songs, setSongs] = useState([]);
  const [allPlaylistNames, setAllPlaylistNames] = useState([]);

  // phil = 22nllj3rpfhvzlgt5hin5aqra
  // tyler = tylerhall12
  // simon = 1231189291
  // keefer = 12179586444

  useEffect(() => {
    const fetchData = async () => {
      let {
        data: { chartData: data, filteredData: tracks, allPlaylistNames: allPlaylistNames },
      } = await axios.get(`http://localhost:5000/data/${playlist}`);
      setPieObject(data.pie);
      setBarObject(data.bar);
      setLineObject(data.line);
      setRadarObject(data.radar);

      let musicList = [];

      tracks.forEach((t) => {
        musicList.push(<TrackListing track={t} />);
      });

      setSongs(musicList);
      setAllPlaylistNames(allPlaylistNames);
    };
    fetchData();
  }, [playlist]);
  return (
    <div className="tile is-ancestor notification is-dark vh-85">
      <div className="tile is-vertical is-3">
        <div className="tile is-parent is-vertical">
          <div className="container">
            <h4 className="subtitle is-4">
              {songs.length} bangers found on playlist:
            </h4>
            <h3 className="title is-3">{playlist}</h3>
          </div>
          <div className="box scrollable vh-70">{songs}</div>
        </div>
      </div>
      <div className="tile is-vertical container">
        <h4 className="subtitle is-4">Here's a breakdown of your playlist</h4>
        <ChartLayout
          chartData={{ pieObject, barObject, lineObject, radarObject }}
        />
      </div>
      <div className="tile is-vertical is-2">
        <div className="tile is-parent is-vertical">
          <div className="container">
            <h4 className="subtitle is-4">Here are the 15 most recent playlist breakdowns by others</h4>
          </div>
          <div className="scrollable vh-70">
            <PreviousPlaylists allPlaylistNames={allPlaylistNames} />
          </div>
        </div>
      </div>
    </div>
  );
}
