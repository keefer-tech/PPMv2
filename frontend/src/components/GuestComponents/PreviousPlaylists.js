import React from "react";
import { Link } from "react-router-dom";
import HeroButton from "../Buttons/HeroButton";

export default function PreviousPlaylists({ allPlaylistNames }) {
  let playlists = [];
  let playlists1 = [],
    playlists2 = [],
    playlists3 = [];

  for (let i = 0; i < allPlaylistNames.length; i++) {
    const element = allPlaylistNames[i];

    playlists.push(
      <li key={element.playlistName} className="my-3">
        <HeroButton
          href={`https://ppmv2-api.herokuapp.com/guest/${element.playlistName}`}
          colour="link"
          name={element.playlistName}
        />
      </li>
    );
  }

  return <ul>{playlists}</ul>;
}
