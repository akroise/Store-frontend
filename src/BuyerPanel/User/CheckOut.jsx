import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import GsignIn from "../Login/GsignIn";
import Loading from "../Others/Loading";
import Navbar from "../Others/Navbar";
import { getUserAddress } from "../../Request/BuyerRequest/request";
import Cart from "../Store/Cart";
import AddressModal from "./AddressModal";

function CheckOut() {
  let user = useSelector((state) => state.userReducer.user?.uuid);
  let store_link = useParams().store_link;
  let cart = useSelector((state) => state.cartReducer.cart);
  const history = useHistory();
  const [adrs, setAdrs] = useState(null);
  const [selAdrs, setSelAdrs] = useState(0);
  let total = useSelector((state) => state.cartReducer.total);

  useEffect(() => {
    if (user) {
      getUserAddress(user).then((data) => setAdrs(data));
    }
  }, [user]);
  useEffect(() => {
    if (adrs?.length) setSelAdrs(0);
    else setSelAdrs(null);
  }, [adrs]);
  return (
    <>
      <Navbar
        isCart={true}
        title={"Select Address"}
        back={`/store/${store_link}/cart`}
      />
      <GsignIn />
      <AddressModal setAdrs={setAdrs} />
      {user && adrs ? (
        <>
          {adrs.length ? (
            <>
              <div
                className="container mx-auto"
                style={{ width: "900px", maxWidth: "100vw" }}
              >
                {adrs.map((address, i) => {
                  return (
                    <div key={i} className="row g-0 my-2 mx-2">
                      <div className="card py-1 shadow-sm">
                        <div className="card-body">
                          <div className="row row-cols-2">
                            <div className="d-flex col w-100 fs-md text-muted my-auto">
                              <input
                                type="checkbox"
                                className="form-check-input me-3 my-auto"
                                checked={selAdrs === i}
                                onChange={() => setSelAdrs(i)}
                              />
                              {address.name} <br />
                              {address.phoneNo} <br />
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
                  <button className="p-2 fs-md my-3 mx-auto text-center btn btn-success shadow">
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
                <button className="p-2 fs-md my-3 text-center btn btn-success shadow">
                  <span className="text-light">
                    <i className="bi bi-plus mx-0"></i>
                    Add Address
                  </span>
                </button>
              </span>
            </div>
          )}
        </>
      ) : (
        <Loading mt="30vh" />
      )}
      {
        <div
          className="container d-flex flex-row fixed-bottom py-2 bg-light mx-auto"
          style={{ width: "900px", maxWidth: "100vw" }}
        >
          <span className="my-auto w-100 text-center text-muted border border-2 p-2">
            ₹{total}&ensp;({cart?.length} items)
          </span>
          <div className="mx-1"></div>
          <button
            className="btn btn-orange w-100 p-2"
            disabled={adrs?.length ? false : true}
            onClick={() =>
              history.push({
                pathname: `/store/${store_link}/placeOrder`,
                state: { address_id: adrs[selAdrs].address_id },
              })
            }
          >
            Continue&emsp;<i className="bi bi-arrow-right"></i>
          </button>
        </div>
      }
    </>
  );
}

export default CheckOut;
