import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import cookie from "react-cookies";

const getStoreName = (store) => {
  store = store.split("-");
  store.splice(store.length - 1);
  store = store.join(" ");
  return store;
};
function Navbar({ store }) {
  let link = window.location.pathname.split("/");
  const [storeName, setStore] = useState("");
  const [page, setPage] = useState(link[link.length - 1]);
  const history = useHistory();
  useEffect(() => {
    if (!cookie.load("isLoggedIn")) window.location.href = "/";
    setStore(getStoreName(store));
  }, []);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow">
      <div className="container-fluid">
        <span className="fs-4 navbar-brand" style={{ fontFamily: "monospace" }}>
          {storeName}
        </span>
        <button
          className="navbar-toggler my-2 px-1 p-0"
          type="button"
          id="close"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <Link
              to={`/seller/${store}/profile`}
              style={{ textDecoration: "none" }}
            >
              <li className="nav-item">
                <span
                  className={
                    "nav-link pointer " +
                    (page === "profile" ? "active rounded-3" : "")
                  }
                  onClick={() => {
                    setPage("profile");
                    document.getElementById("close").click();
                  }}
                >
                  My Profile
                </span>
              </li>
            </Link>
            <Link
              to={`/seller/${store}/products`}
              style={{ textDecoration: "none" }}
            >
              <li className="nav-item">
                <span
                  className={
                    "nav-link pointer " +
                    (page === "products" ? "active rounded-3" : "")
                  }
                  onClick={() => {
                    setPage("products");
                    document.getElementById("close").click();
                  }}
                >
                  Products
                </span>
              </li>
            </Link>

            <Link
              to={`/seller/${store}/orders`}
              style={{ textDecoration: "none" }}
            >
              <li className="nav-item">
                <span
                  className={
                    "nav-link pointer " +
                    (page === "orders" ? "active rounded-3" : "")
                  }
                  onClick={() => {
                    setPage("orders");
                    document.getElementById("close").click();
                  }}
                >
                  Orders
                </span>
              </li>
            </Link>
            <li className="nav-item my-auto">
              <span
                className="nav-link py-1 text-danger pointer"
                onClick={() => {
                  cookie.remove("session_id", { path: "/" });
                  cookie.remove("isLoggedIn", { path: "/" });
                  window.location.href = "/";
                }}
              >
                Log Out
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
