import cookie from "react-cookies";
import React from "react";
import Error from "../Basics/Error";
import {
  addVendor,
  getStoreLink,
  getVendorId,
} from "../../Request/VendorRequest/request";
import { useHistory } from "react-router-dom";

// Add Business Form
const Business = ({ vars }) => {
  const [err, setErr] = React.useState(false);
  const [errDetail, setErrDetail] = React.useState(null);
  const history = useHistory();

  return err ? (
    errDetail ? (
      <Error err_code={errDetail.code} err_text={errDetail.text} />
    ) : (
      ""
    )
  ) : (
    <div className="animate">
      <label className="fs-5 text-muted">Business Name</label>
      <div className="my-1"></div>
      <hr />
      <div className="my-2"></div>
      <input
        className="form-control"
        type="text"
        placeholder="Enter Business Name"
        value={vars.business_name}
        onChange={(e) => vars.set_B_name(e.target.value)}
      />

      <br />
      <label className="fs-5 text-muted">Business Type</label>
      <div className="my-2"></div>
      <select id="business_type" className="form-select">
        <option value="Wholeseller">Wholeseller</option>
        <option value="Retailer">Retailer</option>
        <option value="Kirana_Store">Kirana Store</option>
      </select>
      <button
        className="btn btn-success mt-3 w-100"
        onClick={() =>
          addVendor(
            vars.phn,
            vars.business_name,
            document.getElementById("business_type").value
          )
            .then((response) => {
              getVendorId(vars.phn)
                .then((res) => {
                  getStoreLink(cookie.load("session_id")).then((res) => {
                    history.push(`/seller/${res[0].store_link}/profile`);
                  });
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err))
        }
      >
        Create Account
      </button>
    </div>
  );
};

export default Business;
