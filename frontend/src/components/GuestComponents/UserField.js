import React from "react";

export default function UserField({ fieldChange }) {
  return (
    <div className="field">
      <label className="label">Spotify User ID</label>
      <div className="control">
        <input
          className="userField input is-rounded"
          type="text"
          placeholder="Text input"
          onChange={fieldChange}
        ></input>
      </div>
    </div>
  );
}
