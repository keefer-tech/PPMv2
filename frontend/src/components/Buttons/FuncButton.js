import React from "react";

function FuncButton(props) {
  const { func, colour, name } = props;
  return (
    <button onClick={func} className={`button is-rounded is-${colour}`}>
      {name}
    </button>
  );
}

export default FuncButton;
