import React from "react";

// import { Orbitals, Ripple } from 'react-spinners-css';
import { Ripple } from "react-spinners-css";

export default function LoadingAnimation() {
  return (
    <div className="relContain">
      <div className="absChild">
        <h1 className="title is-1 mt-6">Hang Tight!</h1>
        <h2 className="subtitle is-1 mb-6">Numbers are being crunched...</h2>
        <div className="">
          <Ripple color="#FFF" size={400} />
          {/* <Orbitals color="#2F2F2F" size={600} /> */}
          {/* <Ripple color="#48C774" size={400}/> */}
        </div>
      </div>
    </div>
  );
}
