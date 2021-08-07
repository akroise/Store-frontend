import toast from "react-hot-toast";
import cookie from "react-cookies";
import Error from "../Basics/Error";
import React from "react";
import { ClipLoader } from "react-spinners";
import { getStoreLink, getVendorId } from "../../Request/VendorRequest/request";
import { useHistory } from "react-router-dom";

// Function to Verify OTP
const verifyOtp = (
  e,
  otp,
  genOtp,
  phn,
  setPage,
  setErr,
  setDetail,
  setLoad,
  history
) => {
  e.preventDefault();
  if (parseInt(otp) === genOtp) {
    toast.success(<span>&ensp;OTP Verified</span>);

    getVendorId(phn)
      .then((res) => {
        if (res === "User") {
          setLoad(false);

          getStoreLink(cookie.load("session_id"))
            .then((res) => {
              history.push(`/seller/${res[0].store_link}/profile`);
            })
            .catch((err) => {
              setErr(true);
              setLoad(false);
              setDetail({
                err_code: 408,
                err_text: err,
              });
            });
        } else setPage(3);
      })
      .catch((err) => {
        setErr(true);
        setLoad(false);
        setDetail({
          err_code: 408,
          err_text: err,
        });
      });
  } else {
    toast.error(<span>&ensp;OTP Incorrect</span>);
  }
};

// OTP Form
const Otp = ({ vars }) => {
  const history = useHistory();
  const [load, setLoad] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const [errDetail, setDetail] = React.useState(null);
  return (
    <>
      {err ? (
        errDetail ? (
          <Error err_code={errDetail.err_code} err_text={errDetail.err_text} />
        ) : (
          ""
        )
      ) : (
        <div className="animate">
          <div className="fs-5 text-muted text-center">One Time Password</div>
          <div className="my-2"></div>
          <form
            onSubmit={(e) => {
              setLoad(true);
              verifyOtp(
                e,
                vars.otp,
                vars.genOtp,
                vars.phn,
                vars.setPage,
                setErr,
                setDetail,
                setLoad,
                history
              );
            }}
          >
            <input
              className="form-control"
              type="number"
              placeholder="Enter OTP"
              autoFocus
              value={vars.otp}
              onChange={(e) => vars.setOtp(e.target.value)}
            />
            <div className="card d-flex flex-row border-0 mt-3">
              <button
                type="reset"
                className="btn btn-danger w-100"
                onClick={() => vars.setPage(1)}
              >
                <div className="d-flex">
                  <span className="material-icons-round">
                    keyboard_backspace
                  </span>
                  <span>&nbsp;Back</span>
                </div>
              </button>
              <span className="px-2"></span>
              <button type="submit" className="btn btn-success ms-auto w-100">
                {load ? <ClipLoader size={15} color={"white"} /> : "Verify OTP"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Otp;
