import React from "react";
import HeroButton from "../components/Buttons/HeroButton";

export default function Index() {
  return (
    <div className="columns notification is-dark  vh-85 mr-1">
      <div className="column is-half ml-4 mr-1">
        <div className="tile is-child pt-6">
          <h1 className="title">Cool analytics with your music!</h1>
          <div className="buttons are-large is-centered">
            <HeroButton
              href={"http://localhost:5000/login"}
              colour={"success"}
              name={"Authorise Spotify"}
            />
          </div>
        </div>
      </div>
      <div className="column is-half ml-4 mr-1">
        <div className="tile is-child pt-6">
          <h1 className="title">Compare music between friends.</h1>
          <div className="buttons are-large is-centered">
            <HeroButton
              href={"/guest"}
              colour={"light"}
              name={"Continue as Guest"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
