import React, { useEffect } from "react";
import { useState } from "react";
import cookie from "react-cookies";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { db } from "../Others/firebaseConfig";
import Navbar from "../Others/Navbar";
import { placeOrder } from "../../Request/BuyerRequest/request";
import CartSummary from "./CartSummary";

function PlaceOrder(props) {
  const [cod] = useState(true);
  const [red, setRed] = useState(false);
  let store_link = useParams().store_link;
  const history = useHistory();
  let address_id = props.location.state?.address_id;
  let uuid = useSelector((state) => state.userReducer.user?.uuid);
  let cart = useSelector((state) => state.cartReducer.cart);
  let total = useSelector((state) => state.cartReducer.total);
  let vendor_id = useSelector((state) => state.vendorReducer.vendor?.vendor_id);
  let dispatch = useDispatch();
  useEffect(() => {
    if (address_id === undefined) setRed(true);
    if (!cart.length) setRed(true);
  }, []);
  return (
    <>
      {red ? <Redirect to={`/store/${store_link}`} /> : ""}
      <Navbar
        isCart={true}
        title="Confirm Order"
        back={`/store/${store_link}/checkout`}
      />
      <div
        className="container mx-auto p-2"
        style={{ width: "900px", maxWidth: "100vw" }}
      >
        <hr />

        <div className="card border-0 mx-1 my-2 p-2 ">
          <h4 className="text-muted mb-1">Payment Mode</h4>
          <div className="d-flex flex-row px-3 mt-3">
            <h6 className="me-auto my-auto text-muted">Cash on Delivery</h6>
            <input
              type="radio"
              checked={cod}
              onChange={() => console.log("yo")}
              className="form-check-input"
            />
          </div>
        </div>
        <hr />
        <div className="card border-0 mx-1 my-2 p-2">
          <h4 className="text-muted my-0">Cart Total</h4>
          <div className="d-flex flex-row fs-md mb-2 px-3 mt-3">
            <span className="me-auto text-orange">Item Total</span>
            <span className="ms-auto text-muted">₹{total}</span>
          </div>

          <div className="d-flex flex-row fs-md px-3">
            <span className="me-auto text-orange">Delivery</span>
            <span className="ms-auto text-success">Free</span>
          </div>
          <div className="container">
            <hr />
          </div>
          <div className="d-flex flex-row fs-5 px-3">
            <span className="me-auto text-orange">Grand Total</span>
            <span className="ms-auto text-success">₹{total}</span>
          </div>
        </div>
        <hr />
        <div className="card border-0 my-2 mx-1 p-2">
          <h4 className="text-muted my-1">Cart Summary</h4>
          {cart?.length
            ? cart.map((key, i) => {
                return <CartSummary product={key} key={i} />;
              })
            : ""}
        </div>
        <div className="p-5"></div>
      </div>

      {
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
              let tCart = cart.map((key) => ({
                product_id: key.product_id,
                sp: key.sp,
                qty: key.qty,
              }));
              placeOrder({
                uuid,
                vendor_id,
                status: "Pending",
                address_id,
                total,
                cart: tCart,
              }).then((res) => {
                if (res === "ok") {
                  cookie.remove("cart");
                  db.collection("Users").doc(uuid).set({ cart: [] });
                  dispatch({ type: "FETCH_CART", payload: [] });
                  history.push("/orderPlaced");
                }
              });
            }}
          >
            Place Order&emsp;<i className="bi bi-arrow-right"></i>
          </button>
        </div>
      }
    </>
  );
}

export default PlaceOrder;
