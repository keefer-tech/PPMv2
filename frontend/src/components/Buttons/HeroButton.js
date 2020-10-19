import React from "react";

function HeroButton(props) {
  const { href, colour, name } = props;
  return (
    <a href={href} className={`button is-rounded is-${colour}`}>
      {name}
    </a>
  );
}

export default HeroButton;
