import React, { useEffect, useState } from "react";
import cookie from "react-cookies";
import { useHistory } from "react-router-dom";
import { getVendorInfo } from "../../Request/VendorRequest/request";
import { capitalize, copyLink } from "../Basics/Functions";
import Loading from "../Basics/Loading";

function Profile() {
  const [keys, setKeys] = useState(null);
  const [data, setData] = useState(null);
  const history = useHistory();
  useEffect(() => {
    if (cookie.load("isLoggedIn")) {
      getVendorInfo(cookie.load("session_id"))
        .then((res) => setData(res[0]))
        .catch((err) => console.log(err));
    } else {
      history.push("/seller");
    }
  }, []);

  useEffect(() => {
    if (data) {
      let key = Object.keys(data);
      key = key.filter(
        (el) =>
          el !== "vendor_id" && el !== "date_created" && el !== "store_link"
      );
      key.unshift("store_link");
      setKeys(key);
    }
  }, [data]);
  return (
    <>
      {keys ? (
        <>
          <div className="card mycard  fs-4 px-0 p-3 mx-auto animate">
            <div className="my-2">My Account</div>
            {keys.map((key, i) => {
              return (
                <div
                  className="row row-cols-1 row-cols-lg-2 p-2 border my-0"
                  key={i}
                >
                  {key === "store_link" ? (
                    <>
                      <div className="col d-flex flex-row text-muted">
                        <label className="fs-5 my-auto px-1 py-0">
                          Store Link
                        </label>
                        <span
                          className="input-group-text material-icons-round ms-auto my-auto p-1 pointer"
                          onClick={() => copyLink("link")}
                        >
                          copy
                        </span>
                      </div>
                      <div className="col d-flex flex-row p-1">
                        <input
                          type="text"
                          id="link"
                          className="form-control text-muted"
                          defaultValue={
                            "http://store-online.com/" + data.store_link
                          }
                          disabled
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="col d-flex flex-row text-muted">
                        <label className="fs-5 px-1 my-auto">
                          {capitalize(key)}
                        </label>
                      </div>
                      <div className="col d-flex flex-row py-0">
                        <input
                          type="text"
                          className="form-control text-muted"
                          defaultValue={data[key] ? data[key] : "-"}
                          disabled
                        />
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Profile;
