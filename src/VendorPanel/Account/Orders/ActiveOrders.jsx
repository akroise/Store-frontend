import React, { useEffect, useState } from "react";
import cookie from "react-cookies";
import { getOrders } from "../../../Request/VendorRequest/request";
import Loading from "../../Basics/Loading";
import OrderList from "./OrderList";

function ActiveOrders() {
  const [activeOrders, setOrders] = useState(null);
  useEffect(() => {
    if (cookie.load("session_id"))
      getOrders("Pending")
        .then((res) => setOrders(res?.reverse()))
        .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {activeOrders?.length ? (
        <>
          {activeOrders.map((key, i) => {
            return <OrderList key={i} order={key} />;
          })}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default ActiveOrders;
