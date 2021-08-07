import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const strfDate = (date) => {
  let day = date.getDate().toString();
  let month = (date.getMonth() + 1).toString();
  let year = date.getFullYear().toString();

  return `${day.padStart(2, 0)}/${month.padStart(2, 0)}/${year.padStart(2, 0)}`;
};

const strfTime = (time) => {
  let hour = time.getHours().toString();
  let minute = time.getMinutes().toString();

  return `${hour.padStart(2, 0)}:${minute.padStart(2, 0)}`;
};
function OrderList({ order }) {
  let date = new Date(order.orderDate);
  const [status] = useState({
    Pending: <i className="bi bi-clock"></i>,
    Delivered: <i className="bi bi-check-circle"></i>,
    Cancelled: <i className="bi bi-x-circle"></i>,
  });
  const [color] = useState({
    Pending: "text-orange",
    Delivered: "text-success",
    Cancelled: "text-danger",
  });
  return (
    <>
      <Link
        to={{
          pathname: `/orders/${order.order_id}`,
          state: {
            date: strfDate(date),
            time: strfTime(date),
            deliveredDate: order.deliveredDate,
            order_total: order.order_total,
            status: order.status,
            name: order.name,
            phoneNo: order.phoneNo,
            address_line_1: order.address_line_1,
            address_line_2: order.address_line_2,
            area: order.area,
            city: order.city,
            state: order.state,
            pincode: order.pincode,
          },
        }}
        style={{ textDecoration: "none" }}
      >
        <div
          className="card mx-auto my-4 shadow"
          style={{ width: "900px", maxWidth: "100vw" }}
        >
          <div className="card-body pb-2">
            <div className="container-fluid d-flex p-0 pe-2">
              <div className="text-muted fw-bold">
                Order&nbsp;:&nbsp;#{order.order_id}
              </div>
              <div className={"ms-auto " + color[order.status]}>
                {status[order.status]}&ensp;
                {order.status}
              </div>
            </div>
            <hr className="m-0 mt-2" />
            <div className="container-fluid d-flex p-0">
              <div className="container border-3 border-end w-75 fs-sm mt-3 mb-1 p-0">
                <div className="mt-1">
                  <b className="text-dark">Order Date:</b> {strfDate(date)}
                  &ensp;{strfTime(date)}
                </div>

                <div className="mt-1">
                  <b className="text-dark">Deliver Date:</b>{" "}
                  {order.status === "Delivered" ? (
                    <>
                      {strfDate(date)}&ensp;{strfTime(date)}
                    </>
                  ) : order.status === "Pending" &&
                    order.deliveredDate === null ? (
                    " - "
                  ) : (
                    <>
                      {strfDate(date)}&ensp;{strfTime(date)}&nbsp;(expected)
                    </>
                  )}
                </div>

                <div className="mt-1">
                  <b className="text-dark">Deliver To: &nbsp;</b>
                  {order.address_line_1}
                </div>
              </div>

              <div className="w-25 my-auto p-1 pt-3 text-center text-orange fw-bold">
                ₹&nbsp;{order.order_total}&nbsp;
                <i className="bi bi-arrow-right text-primary"></i>
                <br />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default OrderList;
