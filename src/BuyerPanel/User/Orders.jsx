import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import GsignIn from "../Login/GsignIn";
import Loading from "../Others/Loading";
import Navbar from "../Others/Navbar";
import { getOrders } from "../../Request/BuyerRequest/request";
import OrderList from "./OrderList";

function Orders() {
  const [order, setOrder] = useState(null);
  let uuid = useSelector((state) => state.userReducer.user?.uuid);

  useEffect(() => {
    if (order === null) {
      if (uuid !== undefined) getOrders(uuid).then((res) => setOrder(res.reverse()));
    }
  }, [uuid]);

  return (
    <>
      <GsignIn />
      <Navbar isCart={true} title="Orders" />
      {uuid && order ? (
        order?.length ? (
          <>
            {order.map((key, i) => {
              return <OrderList order={key} key={i} />;
            })}
          </>
        ) : (
          "No Previous Orders"
        )
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Orders;
