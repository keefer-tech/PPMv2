import React from "react";

export default function UserField(props) {
  return (
    <div className="field">
      <label className="label">Spotify User ID</label>
      <div className="control">
        <input
          id={props.uniq}
          className="input is-rounded"
          type="text"
          placeholder="Text input"
        ></input>
      </div>
    </div>
  );
}
