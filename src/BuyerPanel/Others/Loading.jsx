import React from "react";
import { ClipLoader } from "react-spinners";

function Loading({ mt }) {
  mt = mt || "2vh";
  return (
    <div className="d-flex align-items-center" style={{ paddingTop: mt }}>
      <div className="mx-auto text-center">
        <ClipLoader color="#f08080" size="30px" />
        <br />
        <span className="text-muted blink">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;
