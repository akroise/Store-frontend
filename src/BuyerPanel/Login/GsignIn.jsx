import React, { useEffect } from "react";
import { auth, db, provider } from "../Others/firebaseConfig";
import cookie from "react-cookies";

import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../Request/BuyerRequest/request";


function GsignIn() {
  let dispatch = useDispatch();
  let cart = useSelector((state) => state.cartReducer.cart);
  useEffect(() => {
    auth.getRedirectResult().then((response) => {
      if (response?.additionalUserInfo?.isNewUser) {
        db.collection("Users")
          .doc(response.user.uid)
          .set({ cart: cart })
          .then(() => {
            addUser({
              uuid: response.user.uid,
              email: response.user.email,
              user_name: response.user.displayName,
            });
          });
      }
    });
    auth.onAuthStateChanged((result) => {
      if (result) {
        dispatch({
          type: "SET_USER",
          payload: { uuid: result.uid },
        });

        if (cookie.load("cart") !== undefined) {
          db.collection("Users").doc(result.uid).set({
            cart: cart,
          });
        } else {
          db.collection("Users")
            .doc(result.uid)
            .get()
            .then((res) =>
              dispatch({ type: "FETCH_CART", payload: res.data().cart })
            );
        }
      }
    });
  }, []);
  const Gsign = () => {
    auth.signInWithRedirect(provider);
  };
  return (
    <div
      className="modal fade"
      id="gSignIn"
      tabIndex="-1"
      aria-labelledby="gSignIn"
      aria-hidden="true"
    >
      <div className="modal-dialog mx-auto modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Sign In</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body d-flex flex-column">
            <button
              className="btn btn-outline-light border rounded-circle mt-2 mx-auto text-secondary"
              onClick={Gsign}
            >
              <i className="bi bi-google text-success"></i>
              {/* <span className="">
                &nbsp;&nbsp;Sign In&nbsp;&nbsp;&nbsp;&nbsp;
              </span> */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GsignIn;
