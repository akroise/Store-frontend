import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Loading from "../Others/Loading";
import Navbar from "../Others/Navbar";
import { getOrderList } from "../../Request/BuyerRequest/request";
import CartSummary from "./CartSummary";

function OrderPage(props) {
  let order_id = useParams().order_id;
  let details = props.location.state;
  const [order, setOrder] = useState(null);
  const history = useHistory();
  useEffect(() => {
    if (props.location.state === undefined) history.push("/orders");
    else getOrderList(order_id).then((res) => setOrder(res));
  }, []);
  return (
    <>
      <Navbar isCart={true} title="Order Details" back="/orders" />
      <div
        className="container px-0 mx-auto"
        style={{ width: "900px", maxWidth: "100vw" }}
      >
        <div className="card mx-2 mt-3 border-2 p-2 text-muted">
          <h5 className=" mt-1">Order Details</h5>
          <div className="container fs-sm">
            <div className="d-flex flex-row mt-1">
              <span>Order Date:</span>
              <span className="ms-auto my-auto">
                {details.date}&ensp;{details.time}
              </span>
            </div>
            <div className="d-flex flex-row mt-1">
              <span>Deliver Date:</span>
              <span className="ms-auto my-auto">
                {details.status === "Delivered" ? (
                  <>
                    {details.date}&ensp;{details.time}
                  </>
                ) : details.status === "Pending" &&
                  details.deliveredDate === null ? (
                  " - "
                ) : (
                  <>
                    {details.date}&ensp;{details.time}&nbsp;(expected)
                  </>
                )}
              </span>
            </div>
            <div className="d-flex flex-row mt-1">
              <span>Payment Mode:</span>
              <span className="ms-auto my-auto">Cash on Delivery</span>
            </div>
            <hr className="mb-2" />
            <div className="d-flex flex-row fs-6">
              <span>Cart Total:</span>
              <span className="ms-auto my-auto text-orange">
                ₹{details.order_total}
              </span>
            </div>
          </div>
        </div>
        <div className="card mx-2 mt-3 border-2 p-2">
          <h5 className="text-muted mt-1">Shipping Details</h5>
          <div className="px-2 fs-sm">
            <div className="text-dark mt-1">
              {details.name},&nbsp;{details.phoneNo}
            </div>
            <div className="mt-1">{details.address_line_1}</div>
            <div className="mt-1">
              {details.address_line_2 ? details.address_line_2 : ""}
            </div>
            <div className="mt-1">
              {details.area ? <>{details.area},&nbsp;</> : ""}
              {details.city}
              ,&nbsp;{details.state} - {details.pincode}
            </div>
          </div>
        </div>
        <div className="card mx-2 my-3 border-2">
          <h5 className="text-muted m-2 mt-3">Cart Details</h5>
          {order?.length ? (
            order.map((key, i) => {
              return <CartSummary product={key} key={i} border={false} />;
            })
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </>
  );
}

export default OrderPage;
