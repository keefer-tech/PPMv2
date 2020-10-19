import React, { useState } from "react";
import axios from "axios";
import FuncButton from "../Buttons/FuncButton";
import UserField from "../GuestComponents/UserField";

export default function CollectUsers() {
  const [fields, setFields] = useState([<UserField />, <UserField />]);

  function addField() {
    setFields((prevFields) => prevFields.concat(<UserField />));
  }

  function removeField() {
    let oldFields = [...fields];
    oldFields.splice(-1, 1);
    setFields(oldFields);
  }

  async function requestInfo() {
    let res = await axios.get("http:localhost:5000/");
    console.log({ res });
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
