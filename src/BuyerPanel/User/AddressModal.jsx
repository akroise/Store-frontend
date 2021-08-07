import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../Others/Loading";
import { addAddress, getUserAddress, getUserDetails } from "../../Request/BuyerRequest/request";

function AddressModal({ setAdrs }) {
  let uuid = useSelector((state) => state.userReducer.user?.uuid);
  const [load, setLoad] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (uuid) {
      getUserDetails(uuid).then((res) => {
        setUser({ username: res.user_name, phone_no: res.phone_no });
      });
    }
  }, [uuid]);

  const add = (e) => {
    e.preventDefault();
    setAdrs(null);
    setLoad(true);
    let formData = new FormData(e.target);
    addAddress({
      uuid: uuid,
      name: formData.get("name"),
      phnNo: formData.get("phnNo"),
      addressLine1: formData.get("addressLine1"),
      addressLine2: formData.get("addressLine2"),
      city: formData.get("city"),
      state: formData.get("state"),
      pincode: formData.get("pincode"),
    }).then((res) => {
      if (res === "ok") {
        {
          document.getElementById("closeModal").click();
          getUserAddress(uuid).then((data) => setAdrs(data));
          setLoad(false);
          clearForm();
        }
      } else {
        console.log(res);
      }
    });
  };
  const clearForm = () => {
    document.getElementById("name").value = "";
    document.getElementById("phnNo").value = "";
    document.getElementById("addressLine1").value = "";
    document.getElementById("addressLine2").value = "";
    document.getElementById("city").value = "";
    document.getElementById("state").value = "";
    document.getElementById("pincode").value = "";
  };
  return (
    <>
      <div
        className="modal fade"
        id="addressModal"
        tabIndex="-1"
        aria-labelledby="addressModal"
        aria-hidden="true"
      >
        <div className="modal-dialog" style={{ marginTop: "20vh" }}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addressModal">
                Add Address
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="form-inline" onSubmit={(e) => add(e)}>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control my-2"
                  placeholder="Full Name"
                  required
                  defaultValue={user?.username}
                />
                <input
                  type="text"
                  name="phnNo"
                  id="phnNo"
                  className="form-control my-2"
                  placeholder="Phone No."
                  required
                  defaultValue={user?.phone_no}
                />
                <input
                  type="text"
                  name="addressLine1"
                  id="addressLine1"
                  placeholder="Address Line 1"
                  className="form-control my-2"
                  required
                />
                <input
                  type="text"
                  name="addressLine2"
                  placeholder="Address Line 2 (optional)"
                  id="addressLine2"
                  className="form-control my-2"
                />
                <input
                  type="text"
                  name="city"
                  id="city"
                  placeholder="City"
                  className="form-control my-2"
                  required
                />
                <input
                  type="text"
                  name="state"
                  id="state"
                  placeholder="State"
                  className="form-control my-2"
                  required
                />
                <input
                  type="text"
                  name="pincode"
                  id="pincode"
                  pattern="[0-9]{6}"
                  placeholder="PIN Code"
                  className="form-control my-2"
                  required
                />
                <hr />
                <div className="container-fluid p-0 d-flex">
                  <button
                    type="button"
                    id="closeModal"
                    className="btn btn-danger w-100"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <div className="mx-2"></div>
                  <button type="submit" className="btn btn-primary w-100">
                    {load ? <Loading mt="0vh" /> : "Save Address"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddressModal;
