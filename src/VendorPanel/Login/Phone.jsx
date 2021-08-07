import toast from "react-hot-toast";

// Function to Generate OTP
const sendOtp = (e, phnNo, setOTP, setPage) => {
  e.preventDefault();
  // Validate Phone No.
  if (phnNo.length !== 10) {
    toast.error(<span>&ensp;Invalid Phone No.</span>);
  }
  // Generate 6 Digit OTP, and log to console
  else {
    let myOtp = Math.floor(100000 + Math.random() * 900000);

    toast.success(<span>&ensp;OTP Sent</span>);

    setOTP(myOtp);

    // Log the OTP
    console.log(myOtp);

    setTimeout(() => {
      setPage(2);
    }, 100);
  }
};

// Phone No Form:
const Phone = ({ vars }) => {
  return (
    <div className="animate">
      <div className="fs-5 text-muted text-center">Phone Number</div>
      <div className="my-2"></div>
      <form
        onSubmit={(e) => sendOtp(e, vars.phn, vars.set_genOtp, vars.setPage)}
      >
        <input
          className="form-control"
          type="number"
          placeholder="Enter Phone No."
          value={vars.phn}
          autoFocus
          onChange={(e) => vars.setPhn(e.target.value)}
        />
        <button type="submit" className="btn btn-success mt-3 w-100">
          Send OTP
        </button>
      </form>
    </div>
  );
};

export default Phone;
