import React from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { useEffect } from "react";
import { useState } from "react";

function Error(props) {
  let errCode = props.location?.state?.errCode || props.errCode;
  let errText = props.location?.state?.errText || props.errText;
  let store_link = cookie.load("store");
  const [redirect, setRed] = useState("/");
  useEffect(() => {
    if (props.location?.state?.from) setRed(props.location.state.from);
    else setRed("/");
  }, []);

  return (
    <div className="d-flex text-danger" style={{ height: "100vh" }}>
      <div className="m-auto text-center">
        <span className="bi bi-exclamation-circle fs-lg "></span>

        <div className="fs-1">Error {errCode}</div>
        <div>{errText}</div>
        <Link to={redirect}>Retry</Link>
      </div>
    </div>
  );
}

export default Error;
