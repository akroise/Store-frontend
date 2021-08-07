import React from "react";
import { BarLoader } from "react-spinners";

function Loading() {
  return (
    <>
      <div className="card mt-1" style={{ width: "100vw !important" }}>
        <BarLoader color={"#f08080"} width={"100%"} speedMultiplier={0.7} />
      </div>
      <div
        className="login-form mx-auto"
        style={{ height: window.innerHeight * 0.85 }}
      >
        <div className="text-animation">Connecting to Store . . .</div>
      </div>
    </>
  );
}

export default Loading;
