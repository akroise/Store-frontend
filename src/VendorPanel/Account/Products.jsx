import React, { useEffect, useState } from "react";
import cookie from "react-cookies";
import { ClipLoader } from "react-spinners";
import { getVendorProducts } from "../../Request/VendorRequest/request";
import Loading from "../Basics/Loading";

const VerticalCard = ({ product }) => {
  const [load, setLoad] = useState(true);
  return (
    <>
      <div className="col mt-3">
        <div className="card p-0 h-100">
          <ClipLoader loading={load} />
          <img
            src={product.product_img}
            onLoad={() => setLoad(false)}
            className="card-img-top"
            style={{ dispay: load ? "none" : "block" }}
          />
          <div className="card-body d-flex flex-column pb-1">
            <h6 className="text-muted mb-2">{product.product_name}</h6>
            <div className="d-flex mt-auto">
              <span className="text-orange">₹{product.sp}</span>
              <span className="text-muted ms-auto">₹{product.mrp}</span>
            </div>
            <div>
              <div className="d-flex mt-1">
                <div className="form-check-div my-auto text-muted me-auto">In Stock</div>
                <div className="form-check form-switch mt-2">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
function Products() {
  const [vendorProducts, setProducts] = useState(null);

  useEffect(() => {
    if (cookie.load("isLoggedIn")) {
      getVendorProducts(cookie.load("session_id"))
        .then((res) => {
          setProducts(res);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  return (
    <>
      {vendorProducts ? (
        vendorProducts?.length ? (
          <>
            <div className="card mycard   my-2 px-1 py-3 mx-auto animate ">
              <div className="d-flex flex-row fs-4">
                <span className="my-auto">Product List</span>
              </div>

              <div className="g-2 row row-cols-2 row-cols-sm-2 row-col-md-3 row-cols-lg-3 row-cols-xl-4">
                {vendorProducts.map((key, i) => {
                  return <VerticalCard key={i} product={key} />;
                })}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="d-flex flex-row fs-4">
              <span className="my-auto">Product List</span>
            </div>
            <div
              className="text-center text-muted"
              style={{ paddingTop: "30vh" }}
            >
              Nothing Here
            </div>
          </>
        )
      ) : (
        <Loading />
      )}

      <div
        className="d-flex flex-row rounded-pill shadow p-2 pointer hover bg-light"
        style={{
          position: "fixed",
          bottom: "2vh",
          right: "5vw",
          zIndex: "100",
        }}
        // data-bs-toggle="modal"
        // data-bs-target="#productList"
        onClick={() => (window.location.href = "/add-products")}
      >
        <span className="material-icons-round p-0 text-peach fs-2 my-auto">
          add
        </span>
        <span className="text-peach my-auto p-0 fs-6">Add Products</span>
      </div>
    </>
  );
}

export default Products;
