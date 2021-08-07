import React, { useState, useEffect } from "react";

// Import Forms: Phone, Otp, Business
import Phone from "./Phone";
import Otp from "./Otp";
import Business from "./Business";
import cookie from "react-cookies";
import { useHistory } from "react-router-dom";
import { getStoreLink } from "../../Request/VendorRequest/request";


// Login Screen
const Login = () => {
  // Which Page to Show???
  const [page, setPage] = useState(1); // Use Page 1 by default

  //   Variable to store Phn_No
  const [phn, setPhn] = useState("");

  //   Variable to store OTP
  const [otp, setOtp] = useState("");

  //   Variable to store Generated OTP
  const [genOtp, set_genOtp] = useState("");

  //   Variable to store Business_Name
  const [business_name, set_B_name] = useState("");

  // Check if User was already Logged In

  const history = useHistory();
  //   Confirm before refresh or leaving
  useEffect(() => {
    if (cookie.load("isLoggedIn")) {
      if (cookie.load("session_id"))
        getStoreLink(cookie.load("session_id"))
          .then((res) => history.push(`/seller/${res[0].store_link}/profile`))
          .catch((err) => console.log(err));
    }
  }, []);

  return (
    <>
      <div
        className="container-fluid fs-3 p-3 sticky-top bg-white"
        id="header"
        style={{
          zIndex: "10",
        }}
      >
        <div className="card mycard d-flex flex-row mx-auto bg-white">
          <span className="material-icons-round fs-1 text-success">
            add_business
          </span>
          <span className="mx-2 ">Name_here</span>
          <div className="ms-auto w-50" id="s-sm">
            <input
              type="text"
              className="form-control"
              placeholder="Search Stores . . ."
            />
          </div>
        </div>
      </div>
      <div
        className="login-form mx-auto"
        style={{
          height: window.innerHeight * 0.54,
        }}
      >
        <img
          src="https://previews.123rf.com/images/art4sale/art4sale1705/art4sale170500077/77924495-man-pointing-at-mobile-phone-in-his-hand-portrait-of-cartoon-man-in-red-t-shirt-.jpg"
          alt=""
          // style={{ width: "150px", height: "150px" }}
          style={{ width: "300px", maxWidth: "100vw" }}
        />
        <div className="card w-100 rounded-3 p-3 border-0">
          {page === 1 && <Phone vars={{ setPage, phn, setPhn, set_genOtp }} />}
          {page === 2 && <Otp vars={{ setPage, otp, setOtp, genOtp, phn }} />}
          {page === 3 && <Business vars={{ phn, business_name, set_B_name }} />}
        </div>
      </div>
    </>
  );
};

export default Login;
