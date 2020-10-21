import React from "react";
import { Link } from "react-router-dom";



export default function PreviousPlaylists({ allPlaylistNames }) {

  let playlists1 = [], playlists2 = [], playlists3 = []

  for (let i = 0; i < allPlaylistNames.length; i++) {
    const element = allPlaylistNames[i];
    console.log(element);

    if (i < 5) {
      playlists1.push(
        <li key={element.playlistName}>
          <Link to={`/guest/${element.playlistName}`}>
            {element.playlistName}
          </Link>
        </li>
      )
    }

    else if (i < 10) {
      playlists2.push(
        <li key={element.playlistName}>
          <Link to={`/guest/${element.playlistName}`}>
            {element.playlistName}
          </Link>
        </li>
      )
    }

    else if (i < 15) {
      playlists3.push(
        <li key={element.playlistName}>
          <Link to={`/guest/${element.playlistName}`}>
            {element.playlistName}
          </Link>
        </li>
      )
    } else break
  }

  return (
    <div className="relContain">
      <div className="tile is-child is-ancestor">
        <h4 className="subtitle is-3">15 Most Recent Playlists</h4>
        <div className="tile is-parent columns container is-inline-flex">
          <div className="tile column is-vertical is-parent">
            <ul>
              {playlists1}
            </ul>
          </div>
          <div className="tile column is-vertical is-parent">
            <ul>
              {playlists2}
            </ul>
          </div>
          <div className="tile column is-vertical is-parent">
            <ul>
              {playlists3}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
