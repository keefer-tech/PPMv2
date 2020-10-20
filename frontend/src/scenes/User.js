import React from "react";
import HeroButton from "../components/Buttons/HeroButton";

export default function User() {
  return (
    <div className="columns notification is-dark  vh-70 mr-1">
      <div className="column is-half ml-4 mr-1">
        <div className="tile is-child pt-6">
          <h1 className="title">Get a true sense of a playlist.</h1>
          <div className="buttons are-large is-centered">
            <HeroButton
              href={"/user/analyse"}
              colour={"success"}
              name={"ANALYSE"}
            />
          </div>
        </div>
      </div>
      <div className="column is-half ml-4 mr-1">
        <div className="tile is-child pt-6">
          <h1 className="title">Compare the music you follow.</h1>
          <div className="buttons are-large is-centered">
            <HeroButton
              href={"/user/compare"}
              colour={"light"}
              name={"COMPARE"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
