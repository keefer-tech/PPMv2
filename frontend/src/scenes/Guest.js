import React from "react";
import MainTitle from "../components/Headers/MainTitle";
import Tutorial from "../components/GuestComponents/Tutorial";
import CollectUsers from "../components/GuestComponents/CollectUsers";
export default function Guest() {
  return (
    <div className="box">
      <MainTitle />
      <div className="tile is-ancestor">
        <div className="tile is-vertical is-4">
          <div className="tile">
            <div className="tile is-parent notification is-dark is-vertical mr-1">
              <h1 className="title">Users to compare:</h1>
              <CollectUsers />
            </div>
          </div>
        </div>
        <div className="tile is-vertical">
          <div className="tile">
            <Tutorial />
          </div>
        </div>
      </div>
    </div>
  );
}
