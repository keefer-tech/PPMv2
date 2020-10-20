import React from "react";

// import { Orbitals, Ripple } from 'react-spinners-css';
import { Ripple } from "react-spinners-css";

export default function LoadingAnimation() {
  return (
    <>
      <Ripple color="#FFF" size={400} />
      {/* <Orbitals color="#2F2F2F" size={600} /> */}
      {/* <Ripple color="#48C774" size={400}/> */}
    </>
  );
}
