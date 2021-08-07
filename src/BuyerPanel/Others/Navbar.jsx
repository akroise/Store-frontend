import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { auth } from "./firebaseConfig";
import cookie from "react-cookies";
import { getVendorDetails } from "../../Request/BuyerRequest/request";


function Navbar(props) {
  const [linkTo, setLink] = useState(null);
  let business_name = useSelector(
    (state) => state.vendorReducer.vendor?.business_name
  );
  let store_link = useSelector(
    (state) => state.vendorReducer.vendor?.store_link
  );
  let cartLength = useSelector((state) => state.cartReducer.cart?.length);
  let history = useHistory();

  let dispatch = useDispatch();
  let user = useSelector((state) => state.userReducer.user);
  useEffect(() => {
    if (!business_name) {
      getVendorDetails(cookie.load("store"), dispatch);
    }
  }, []);
  function showNav() {
    document.getElementById("sideNav").style.width = "300px";
  }

  function closeNav() {
    document.getElementById("sideNav").style.width = "0px";
  }
  return (
    <>
      {linkTo && <Redirect push to={linkTo} />}
      <div className=" sticky-top navbar navbar-lg bg-dark text-light px-2">
        <div className="navbar-brand d-flex w-100 mx-auto">
          {props.isCart ? (
            <i
              className="bi bi-arrow-left pointer"
              onClick={() => {
                if (props.back) history.push(props.back);
                else history.push(`/store/${store_link}`);
              }}
            ></i>
          ) : (
            <i className="bi bi-list pointer" onClick={showNav}></i>
          )}
          <span className="mx-2">{props.title}</span>

          {props.isCart ? (
            <div className="ms-auto">
              <Link to={`/store/${store_link}`}>
                <i className="bi bi-house-door text-light pointer"></i>
              </Link>
            </div>
          ) : (
            <div className="position-relative ms-auto ">
              <Link to={`/store/${store_link}/cart`}>
                <i className="bi bi-bag text-light fs-4 pointer"></i>
                <span
                  className="position-absolute top-50  start-50 translate-middle badge fs-xs my-1"
                  style={{ color: "orange" }}
                >
                  {cartLength}
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div id="sideNav" className="sidenav bg-dark translate">
        <span className="closebtn" id="close" onClick={closeNav}>
          <i className="bi bi-x-lg fs-5"> </i>
        </span>
        <hr />
        <div className="tags">
          <span
            onClick={() => {
              if (user?.uuid) {
                setLink("/account");
              } else {
                document.getElementById("close").click();
                document.getElementById("showSignIn").click();
              }
            }}
          >
            <i className="bi bi-person"> </i>
            &nbsp;{user?.uuid ? "My Account" : "Login"}
          </span>
          <span
            onClick={() => {
              if (user?.uuid) {
                setLink("/address");
              } else {
                document.getElementById("close").click();
                document.getElementById("showSignIn").click();
              }
            }}
          >
            <i className="bi bi-house-door"> </i>&nbsp;Addresses
          </span>
          <span
            onClick={() => {
              if (user?.uuid) {
                setLink("/orders");
              } else {
                document.getElementById("close").click();
                document.getElementById("showSignIn").click();
              }
            }}
          >
            <i className="bi bi-list-check"> </i>
            &nbsp;Orders
          </span>
          <span>
            <i className="bi bi-info-circle"> </i>
            &nbsp;About us
          </span>
          <span>
            <i className="bi bi-question-circle"> </i>
            &nbsp;FAQs
          </span>
          <span>
            <i className="bi bi-telephone"> </i>
            &nbsp;Contact Us
          </span>
          {user ? (
            <span
              onClick={() => {
                auth.signOut();
                dispatch({ type: "SET_USER", payload: null });
                dispatch({ type: "FETCH_CART", payload: [] });
                cookie.remove("cart", { path: "/" });
              }}
            >
              <i className="bi bi-box-arrow-right"> </i>
              &nbsp;Log Out
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
      <span
        id="showSignIn"
        data-bs-toggle="modal"
        data-bs-target="#gSignIn"
      ></span>
    </>
  );
}

export default Navbar;
