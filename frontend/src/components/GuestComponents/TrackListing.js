import React from "react";
import HeroButton from "../Buttons/HeroButton";

export default function TrackListing({ track }) {
  const { artist, name, link } = track;
  return (
    <div className="box columns">
      <div className="column">
        <h1 className="title is-5">
          <strong>{artist}:</strong>
        </h1>
        <h2 className="subtitle is-6">{name}</h2>
      </div>
      <div className="column is-4">
        <HeroButton href={link} colour="success" name="Spotify" />
      </div>
    </div>
  );
}
