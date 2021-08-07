import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { useState } from "react";

function ThankYou({ store_link }) {
  const [link, setLink] = useState(store_link);
  useEffect(() => {
    if (link === undefined) setLink(cookie.load("store"));
  }, []);
  return (
    <>
      <div
        className="container-fluid d-flex flex-column justify-content-center p-0"
        style={{ height: "100vh" }}
      >
        <div
          className="card d-flex flex-column align-items-center mx-auto w-auto text-muted p-3 border-0"
          style={{ width: "900px", maxWidth: "100vw" }}
        >
          <i className="bi bi-check2-circle fs-xl text-orange"></i>
          <br />
          <h2 className="text-orange">Order Placed</h2>
          <br />
          <h6>Thank You for shopping with us</h6>
          <br />
          <Link to={`/store/${link}`}>
            <button className="btn btn-primary">Back to Homepage</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default ThankYou;
