import React, { useState } from "react";
import Tutorial from "../components/GuestComponents/Tutorial";
import CollectUsers from "../components/GuestComponents/CollectUsers";
import LoadingAnimation from "../components/GuestComponents/LoadingAnimation";
export default function Guest() {
  const [loading, setLoading] = useState(false);

  function onRequest() {
    setLoading(true);
  }

  return (
    <div className="tile is-ancestor vh-70 mr-1">
      <div className="tile is-parent is-vertical notification is-dark is-3 scrollable ml-4 mr-1 vh-70">
        <div className="tile is-child ">
          <h1 className="title">Users to compare:</h1>
          <CollectUsers triggerLoading={onRequest} />
        </div>
      </div>
      <div className="tile is-parent is-vertical notification is-success scrollable">
        <div className="tile is-child">
          {!loading && <Tutorial />}
          {loading && <LoadingAnimation />}
        </div>
      </div>
    </div>
  );
}
