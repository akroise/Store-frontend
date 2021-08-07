import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Others/Navbar";
import Products from "./Products";
import { Redirect, useParams, useHistory } from "react-router-dom";
import GsignIn from "../Login/GsignIn";
import Loading from "../Others/Loading";
import { getVendorDetails } from "../../Request/BuyerRequest/request";


function Cart() {
  const [load, setLoad] = useState(true);
  const [err, setErr] = useState(false);
  const [errDet, setErrDet] = useState({});

  let dispatch = useDispatch();
  let store_link = useParams().store_link;
  const history = useHistory();
  let cart = useSelector((state) => state.cartReducer.cart);
  const total = useSelector((state) => state.cartReducer.total);
  // const [total] = useState(useSelector((state) => state.cartReducer.total));
  let vendor = useSelector((state) => state.vendorReducer.vendor);
  let user = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    if (!vendor)
      getVendorDetails(store_link, dispatch).then((err) => {
        if (err?.isAxiosError) setErr(true);
        else setLoad(false);
      });
    else setLoad(false);
  }, []);

  // useEffect(() => {
  //   console.log(total);
  // }, [total]);

  return (
    <>
      {err && (
        <Redirect
          to={{
            pathname: "/error",
            state: {
              errCode: "408",
              errText: "Connection Timed Out",
              from: `/store/${store_link}/cart`,
            },
          }}
        />
      )}

      {load ? (
        <Loading />
      ) : (
        <>
          {vendor?.business_name ? (
            <Navbar isCart={true} title="My Cart" />
          ) : (
            ""
          )}
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 m-2 mb-4 g-2">
            {cart.length ? (
              cart.map((key, i) => <Products product={key} key={i} />)
            ) : (
              <div
                className="d-flex align-items-center w-100"
                style={{ height: "75vh" }}
              >
                <div className="d-flex flex-column mx-auto">
                  <i className="bi bi-cart4 mx-auto text-muted fs-lg"></i>

                  <span className="text-muted fs-4">Cart Is Empty</span>
                </div>
              </div>
            )}
          </div>
          <br />
          <br />
          {cart?.length ? (
            <div
              className="container d-flex flex-row fixed-bottom py-2 bg-light mx-auto"
              style={{ width: "900px", maxWidth: "100vw" }}
            >
              <span className="my-auto w-100 text-center text-muted border border-2 p-2">
                ₹{total}&ensp;({cart?.length} items)
              </span>
              <div className="mx-1"></div>
              <button
                className="btn btn-orange w-100 p-2"
                onClick={() => {
                  if (!user) document.getElementById("showSignIn").click();
                  else history.push(`/store/${store_link}/checkout`);
                }}
              >
                <i className="bi bi-house-fill"></i>&emsp;Select Address
              </button>
            </div>
          ) : (
            ""
          )}
          <span
            id="showSignIn"
            data-bs-toggle="modal"
            data-bs-target="#gSignIn"
          ></span>
          <GsignIn />
        </>
      )}
    </>
  );
}

export default Cart;
