import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStores } from "../Request/BuyerRequest/request";
import Loading from "./Others/Loading";

const Stores = ({ store }) => {
  return (
    <>
      <div className="col mt-3">
        <div className="card">
          <div className="card-header">
            <h6>{store.business_name}</h6>
          </div>
          <div className="card-body">
            <div className="card-text">
              <span className="fs-6 fw-bold text-muted">Type:&ensp;</span>
              <span className="text-muted fs-6">{store.business_type}</span>
            </div>
            <div className="card-text">
              <span className="fs-6 fw-bold text-muted">Contact:&ensp;</span>
              <a className="text-muted fs-6" href={`tel:${store.phn_no}`}>
                {store.phn_no}
              </a>
            </div>
          </div>
          <div className="px-3">
            <hr />
          </div>
          <div className="container d-flex mx-auto py-2">
            <Link
              to={`/store/${store.store_link}`}
              target="_blank"
              className="ms-auto"
            >
              <button className="btn btn-outline-primary py-0">
                Visit <i className="bi bi-arrow-right"></i>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
function StoreList() {
  const [storeList, setList] = useState(null);
  const [err, setErr] = useState(null);
  useEffect(() => {
    getStores()
      .then((res) => setList(res))
      .catch((err) => setErr(err));
  }, []);

  return (
    <>
      <div
        className="container-fluid fs-3 p-3 sticky-top bg-white"
        id="header"
        style={{
          zIndex: "10",
        }}
      >
        <div className="card mycard d-flex flex-row mx-auto bg-white">
          <span className="material-icons-round fs-1 text-success">
            add_business
          </span>
          <span className="mx-2 ">Name_here</span>
          <div className="ms-auto w-50" id="s-sm">
            <input
              type="text"
              className="form-control"
              placeholder="Search Stores . . ."
            />
          </div>
        </div>
      </div>
      {err ? (
        <>
          <div
            className="container mx-auto my-4"
            style={{ width: "980px", maxWidth: "100vw" }}
          >
            <div className="text-danger text-center">ERROR: {err}</div>
          </div>
        </>
      ) : storeList?.length ? (
        <>
          <div
            className="container mx-auto my-4"
            style={{ width: "980px", maxWidth: "100vw" }}
          >
            <div className="g-3 row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-3">
              {storeList.map((key, i) => {
                return <Stores store={key} key={i} />;
              })}
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default StoreList;
