import React from "react";
import ChartLayout from "../components/Charts/ChartLayout";

export default function GuestVisual() {
  return (
    <div className="tile is-ancestor  notification is-dark">
      <div className="tile is-parent is-vertical is-3">
        <div className="tile is-child is-vertical">
          <h1 className="title">Playlist Here:</h1>
        </div>
      </div>
      <div className="tile is-parent is-vertical">
        <div className="tile is-child">
          <ChartLayout />
        </div>
      </div>
    </div>
  );
}
