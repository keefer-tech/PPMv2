import React, { useState } from "react";
import axios from "axios";
import FuncButton from "../Buttons/FuncButton";
import UserField from "../GuestComponents/UserField";

export default function CollectUsers({ triggerLoading }) {
  const [fields, setFields] = useState([<UserField />, <UserField />]);

  function getUsers() {
    let nodes = Array.from(document.getElementsByClassName("userField"));
    let users = nodes.map((field) => field.value);
    return users;
  }

  function addField() {
    setFields((prevFields) => prevFields.concat(<UserField />));
  }

  function removeField() {
    let oldFields = [...fields];
    oldFields.splice(-1, 1);
    setFields(oldFields);
  }

  async function requestInfo() {
    triggerLoading();
    let users = getUsers();

    let res = await axios({
      method: "post",
      url: "http://localhost:5000/guest/analyse",
      headers: {},
      data: {
        users: users,
      },
    });

    if (res) {
      window.location.href = res.data.redirect;
    } else {
      window.location.href = "whoops";
    }
  }

  return (
    <div className="notification is-light has-text-left">
      {fields}
      <div className="buttons is-fullwidth">
        <FuncButton func={addField} colour={"info"} name={"Add User"} />
        {fields.length > 2 && (
          <FuncButton
            func={removeField}
            colour={"danger"}
            name={"Remove User"}
          />
        )}
        <FuncButton func={requestInfo} colour={"success"} name={"Generate"} />
      </div>
    </div>
  );
}
