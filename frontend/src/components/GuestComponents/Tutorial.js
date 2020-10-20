import React from "react";

export default function Tutorial() {
  return (
    <div className="tile is-parent notification is-success is-vertical">
      <h1 className="title">How to Use</h1>
      <article className="tile is-child notification is-light mb-1">
        <div className="columns">
          <div className="column is-4">
            <figure className="image is-4by3">
              <img
                src={require("../../images/spotify_home_with_dropdown.png")}
                alt=""
              />
            </figure>
          </div>
          <div className="column is-size-5 has-text-left">
            <h2 className="subtitle is-2">Step One - Gather Your User ID's</h2>
            <p className="mb-4">
              First, you need to get your Spotify username. Click the dropdown
              menu next to your profile picture on the top right of your home
              page and click on 'Account'. A new web page will open, and then
              copy/paste your Username into the 'User ID' inputs on the left
              side of this site.
            </p>
            <p className="is-italic">
              Your friends will also need to provide you with their usernames as
              well, so make sure they do this as well.
            </p>
          </div>
        </div>
      </article>
      <article className="tile is-child notification is-light">
        <div className="columns">
          <div className="column is-4">
            <figure className="image is-5by3 mb-1">
              <img src={require("../../images/new_playlist.png")} alt="" />
            </figure>
            <figure className="image is-5by3">
              <img src={require("../../images/publicLiked.png")} alt="" />
            </figure>
          </div>
          <div className="column is-size-5 has-text-left">
            <h2 className="subtitle is-2">
              Step Two - Create a publicLiked Playlist
            </h2>
            <p className="mb-4">
              Your 'Liked Songs' Spotify playlist is private, so we need to
              create a public playlist called 'publicLiked' that we can access
              to generate your party playlist.
            </p>
            <p className="is-italic mb-4">
              To do this, in the Desktop App, go to your 'Liked Songs' playlist,
              click the top song, then click 'Ctrl + A' (Cmd on Mac) and all
              your songs should now be selected. Now, right click any song, then
              click 'Add to Playlist', then 'New Playlist'.
            </p>
            <p className="mb-4">
              Finally, you should see 'New Playlist' in your PLAYLISTS on the
              left, rename that playlist to{" "}
              <span className="has-text-weight-bold">publicLiked</span>. And
              your done. Keep in mind that publicLiked is case sensitive.
            </p>
            <p className="is-italic">
              Keep in mind your friends will also need to this so we can find
              their music to compare as well!
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
