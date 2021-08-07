import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import GsignIn from "../Login/GsignIn";
import Loading from "../Others/Loading";
import Navbar from "../Others/Navbar";
import { getUserAddress, removeAddress } from "../../Request/BuyerRequest/request";
import AddressModal from "./AddressModal";

function Address() {
  let user = useSelector((state) => state.userReducer.user?.uuid);
  const [adrs, setAdrs] = useState(null);

  useEffect(() => {
    if (user) {
      getUserAddress(user).then((data) => setAdrs(data));
    }
  }, [user]);
  return (
    <>
      <Navbar isCart={true} title={"Addresses"} />
      <GsignIn />
      <AddressModal setAdrs={setAdrs} />
      {user && adrs ? (
        <>
          <div
            className="container mx-auto mt-2 py-2 px-1 pb-2"
            style={{ width: "900px", maxWidth: "100vw" }}
          >
            {adrs.length ? (
              <>
                <div className="container p-0">
                  {adrs.map((address, i) => {
                    return (
                      <div key={i} className="row g-0 mt-2 mx-1">
                        <div className="card py-2 shadow-sm">
                          <div className="card-body">
                            <div className="row row-cols-2">
                              <div className="col w-75 fs-md text-muted my-auto">
                                <span className="fs-md">
                                  <b>{address.name}</b>
                                </span>
                                <br />
                                <b>{address.phoneNo}</b>
                                <br />
                                {address.address_line_1}
                                {address.address_line_2 !== null ?? (
                                  <>
                                    <br />
                                    {address.address_line_2}
                                  </>
                                )}
                                <br />
                                {address.area !== null ? (
                                  <>{address.area}&ensp;</>
                                ) : (
                                  ""
                                )}
                                {address.city !== null ? (
                                  <>{address.city}&ensp;</>
                                ) : (
                                  ""
                                )}
                                {address.state}&ensp;-&ensp;
                                {address.pincode}
                              </div>
                              <div className="col w-25 d-flex me-0 pe-1 text-end align-items-end">
                                <div className="w-auto ms-auto my-auto">
                                  <button
                                    className="btn btn-danger px-2  my-1 mx-1 w-auto "
                                    onClick={() => {
                                      setAdrs(null);
                                      removeAddress(address.address_id).then(
                                        (res) => {
                                          if (res === "ok") {
                                            getUserAddress(user).then((data) =>
                                              setAdrs(data)
                                            );
                                          }
                                        }
                                      );
                                    }}
                                  >
                                    <i className="bi bi-trash fs-6 mx-0 "></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="container-fluid d-flex p-0">
                  <span
                    className="mx-auto"
                    data-bs-toggle="modal"
                    data-bs-target="#addressModal"
                  >
                    <button className="p-2 fs-md my-3 text-center btn btn-success shadow">
                      <span className="text-light">
                        <i className="bi bi-plus mx-0"></i>
                        Add Address
                      </span>
                    </button>
                  </span>
                </div>
              </>
            ) : (
              <div
                className="container d-flex flex-column mx-auto text-muted justify-content-center fs-3 my-auto"
                style={{ height: "90vh" }}
              >
                <span className="mx-auto">No Saved Addresses</span>
                <span
                  className="mx-auto"
                  data-bs-toggle="modal"
                  data-bs-target="#addressModal"
                >
                  <button className="me-2 p-2 fs-md my-3 ms-auto text-center btn btn-success shadow">
                    <span className="text-light">
                      <i className="bi bi-plus mx-0"></i>
                      Add Address
                    </span>
                  </button>
                </span>
              </div>
            )}
          </div>
        </>
      ) : (
        <Loading mt="30vh" />
      )}
    </>
  );
}

export default Address;
