import React, { useState } from "react";
import { Link, Redirect, Route, Switch, useParams } from "react-router-dom";
import ActiveOrders from "./ActiveOrders";

function Orders() {
  const store_link = useParams().store_link;
  let link = window.location.pathname.split("/");
  const [page, setPage] = useState(link[link.length - 1]);
  return (
    <>
      <div className="scrollmenu p-2">
        <Link to={`/seller/${store_link}/orders/activeOrders`}>
          <span
            onClick={() => setPage("activeOrders")}
            className={
              "nav-link " + (page === "activeOrders" ? "active rounded-3" : "")
            }
          >
            Active Orders
          </span>
        </Link>
        <Link to={`/seller/${store_link}/orders/deliveredOrders`}>
          <span
            onClick={() => setPage("deliveredOrders")}
            className={
              "nav-link " +
              (page === "deliveredOrders" ? "active rounded-3" : "")
            }
          >
            Delivered Orders
          </span>
        </Link>
        <Link to={`/seller/${store_link}/orders/cancelledOrders`}>
          <span
            onClick={() => setPage("cancelledOrders")}
            className={
              "nav-link " +
              (page === "cancelledOrders" ? "active rounded-3" : "")
            }
          >
            Cancelled Orders
          </span>
        </Link>
      </div>

      <Switch>
        <Redirect
          from="/seller/:store_link/orders"
          exact
          to={`/seller/${store_link}/orders/activeOrders`}
        />
        <Route path="/seller/:store_link/orders/activeOrders">
          <ActiveOrders />
        </Route>
        <Route path="/seller/:store_link/orders/deliveredOrders">
          <>Delivered</>
        </Route>
        <Route path="/seller/:store_link/orders/cancelledOrders">
          <>Cancelled</>
        </Route>
      </Switch>
    </>
  );
}

export default Orders;
