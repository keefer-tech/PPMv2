import React from "react";
import HeroButton from "../components/Buttons/HeroButton";

export default function User() {
  return (
    <div>
      <div className="columns">
        <div className="column has-text-centered">
          <HeroButton href={"/user/analyse"} colour={"dark"} name={"ANALYSE"} />
        </div>
        <div className="column has-text-centered">
          <HeroButton href={"/user/compare"} colour={"dark"} name={"COMPARE"} />
        </div>
      </div>
    </div>
  );
}
