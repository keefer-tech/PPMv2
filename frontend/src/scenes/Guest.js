import React from "react";
import Tutorial from "../components/GuestComponents/Tutorial";
import CollectUsers from "../components/GuestComponents/CollectUsers";
export default function Guest() {
  return (
    <div className="tile is-ancestor">
      <div className="tile is-parent is-vertical notification is-dark is-3">
        <div className="tile is-child is-vertical">
          <h1 className="title">Users to compare:</h1>
          <CollectUsers />
        </div>
      </div>
      <div className="tile is-parent is-vertical notification is-success">
        <div className="tile is-child">
          <Tutorial />
        </div>
      </div>
    </div>
  );
}
