import React from "react";

const Error = ({ err_code, err_text }) => {
  return (
    <div className="card text-center mt-5">
      <span className="material-icons-round big-icon text-danger">error</span>
      <span className="text-danger fs-1">{"Error " + err_code}</span>
      <span className="text-danger fs-3">{err_text}</span>

      <span
        className="pointer text-decoration-underline p-2"
        onClick={() => window.location.reload()}
      >
        Retry
      </span>
    </div>
  );
};

export default Error;
