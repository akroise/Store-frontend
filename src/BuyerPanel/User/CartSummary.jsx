import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import GsignIn from "../Login/GsignIn";

function CartSummary({ product, border }) {
  const [load, setLoad] = useState(true);
  return (
    <>
      <GsignIn />
      <div
        className={"container d-flex flex-row mt-2 " + (border === false ? "border-2 border-top" : "border rounded-3 border-2")}
      >
        <img
          src={product.product_img}
          alt=""
          className="img-fluid"
          style={{ width: "120px", height: "120px" }}
          onLoad={() => setLoad(false)}
        />
        <div style={{ position: "absolute", margin: "5px" }}>
          <ClipLoader loading={load} size="20px" color="#f08080" />
        </div>
        <div className="d-flex flex-column card-body">
          <div className="fs-sm">{product.product_name}</div>
          <div className="mt-auto w-100 d-flex flex-row">
            <span className="me-auto text-muted">
              {product.qty} x ₹{product.sp}
            </span>
            <span className="ms-auto text-orange">
              ₹{product.qty * product.sp}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartSummary;
