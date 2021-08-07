import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import GsignIn from "../Login/GsignIn";
import { getUserDetails, updateUser } from "../../Request/BuyerRequest/request";
import Loading from "../Others/Loading";
import Navbar from "../Others/Navbar";

function Account() {
  let user = useSelector((state) => state.userReducer.user?.uuid);
  const [acDetail, setDetail] = useState(null);
  const [edit, setEdit] = React.useState(false);

  const editDetail = () => {
    setEdit(true);
    document.getElementById("cancelBtn").style.opacity = "1";
  };
  const updateDetail = () => {
    let name = document.getElementById("name").value;
    updateUser(name, user).then((res) => {
      //
      if (res === "ok") {
        setDetail({ ...acDetail, user_name: name });
        document.getElementById("name").value = name;
      }
    });
    cancel();
  };
  const cancel = () => {
    setEdit(false);
    document.getElementById("cancelBtn").style.opacity = "0";
    document.getElementById("name").value = acDetail.user_name;
    // document.getElementById("phone").value = acDetail.phone;
  };
  useEffect(() => {
    if (user) {
      getUserDetails(user).then((result) => setDetail(result));
    }
  }, [user]);
  return (
    <>
      <GsignIn />
      <Navbar isCart={true} title={"Account"} />
      {user && acDetail ? (
        <>
          <div
            className="card mx-auto border-0 mt-2 py-2 px-1 pb-2"
            style={{ width: "900px", maxWidth: "100vw" }}
          >
            
            <div className="container">
              <div className="row border mx-1 p-2 fs-6 text-muted">
                <div className="col w-25 my-auto">User Name:</div>
                <div className="col w-75">
                  <input
                    type="text"
                    id="name"
                    className="form-control disable"
                    defaultValue={acDetail.user_name}
                    disabled={!edit}
                  />
                </div>
              </div>
              <div className="row border mx-1 p-2 fs-6 text-muted">
                <div className="col w-25  my-auto">Email:</div>
                <div className="col w-75 text-start">
                  <input
                    type="text"
                    className="form-control disable"
                    defaultValue={acDetail.email}
                    disabled
                  />
                </div>
              </div>
              <div className="row border mx-1 p-2 fs-6 text-muted">
                <div className="col w-25  my-auto">Phone no:</div>
                <div className="col w-75 text-start">
                  <input
                    type={acDetail.phone ? "number" : "text"}
                    id="phone"
                    className="form-control disable"
                    defaultValue={acDetail.phone ? acDetail : " - "}
                    //   disabled={!edit}
                    disabled
                  />
                </div>
              </div>
              <div className="row p-2 pb-0">
                <div className="col w-auto">
                  <button
                    className="btn btn-primary"
                    onClick={edit ? updateDetail : editDetail}
                  >
                    {edit ? "Save Changes" : "Edit"}
                  </button>
                  <button
                    className="btn btn-danger mx-2"
                    id="cancelBtn"
                    style={{ opacity: "0" }}
                    onClick={cancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Account;
