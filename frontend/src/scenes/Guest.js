import React from "react";
import MainTitle from "../components/Headers/MainTitle";
export default function Guest() {
  return (
    <div className="box">
      <MainTitle />
      <div className="tile is-ancestor">
        <div className="tile is-vertical is-4">
          <div className="tile">
            <div className="tile is-parent notification is-dark is-vertical">
              <h1 className="title">User's to compare:</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
