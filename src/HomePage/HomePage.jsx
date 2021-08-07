import React from "react";
import { useHistory } from "react-router-dom";

const checkStat = (array) => {
  var pos = [];
  array.forEach((element) => {
    pos.push(element.getBoundingClientRect());
  });
  pos.forEach((element, i) => {
    if (element.top + 20 <= window.innerHeight) {
      array[i].classList.remove("margin");
      // array[i].classList.add("mt-5");
    }
  });
};
function scroll(e, arr) {
  if (window.location.href == "http://localhost:3000/") {
    if (window.scrollY < 20) {
      document.getElementById("header").classList.remove("shadow-lg");
    } else {
      document.getElementById("header").classList.add("shadow-lg");
    }
  }
  checkStat(arr);
}
function HomePage() {
  const [bool, setBool] = React.useState(true);

  const history = useHistory();

  React.useEffect(() => {
    // document.body.style.backgroundColor = "#20bf55";
    document.body.style.backgroundImage = "";
    //     background-color #20bf55;
    // background-image linear-gradient(315deg, #20bf55 0%, #01baef 74%);

    var s1 = document.getElementById("step-1");
    var s2 = document.getElementById("step-2");
    var s3 = document.getElementById("step-3");
    var btn = document.getElementById("btn");

    checkStat([s1, s2, s3, btn]);

    window.addEventListener("scroll", (e) => scroll(e, [s1, s2, s3, btn]));

    window.addEventListener("resize", () => {
      if (window.innerWidth < 994) setBool(true);
      else setBool(false);
    });
    window.addEventListener("beforeunload", () => {
      window.removeEventListener("scroll", scroll);
    });
  }, []);

  return (
    <>
      {/* <img
        src="https://source.unsplash.com/1600x900/?grocery"
        style={{ position: "absolute", height: "100%", width: "100%" }}
      /> */}
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

      <div
        className="container-fluid d-flex flex-column border-bottom border-3 border-danger p-0"
        style={{
          height: "40vh",
        }}
      >
        <div
          className="card p-3 border-0 my-auto mx-auto"
          style={{
            width: "200px",
            background: "rgba(255,255,255,0.5)",
          }}
        >
          <button
            className="btn btn-outline-success p-2 fs-5 "
            onClick={() => history.push("/seller")}
          >
            My Store &ensp;<i className="bi bi-arrow-right"></i>
          </button>
          <br />

          <button
            className="btn btn-outline-primary p-2 fs-5 "
            onClick={() => history.push("/store")}
          >
            Explore Stores
          </button>
        </div>
        <br />
        <br />
      </div>

      <div
        className={
          "card mycard mt-4 mx-auto border border-2 border-primary " +
          (bool ? "text-center" : "")
        }
        style={{ background: "rgba(0,0,0,0)" }}
      >
        <div
          className="row row-cols-1 row-cols-lg-2 margin transit"
          id="step-1"
        >
          <div className="col">
            <div
              className="card p-2 pb-3 border-2 border-blue "
              // style={{ background: "rgba(255,255,255,0.5)" }}
            >
              <div className="text-primary fs-5 my-2">Step 1</div>
              <div className=" fs-3 my-2">Add Basic Details</div>
              <div className="my-2 fs-6 text-dark">
                <div>Add Business Name</div>
                <div>Select Business Type</div>
              </div>
            </div>
          </div>
          <div className="col py-3">
            <div className="card p-3 border-0 h-100 pb-0 hh">
              <div className="h-100 bs-1 border-blue"></div>
            </div>
          </div>
        </div>

        <div
          className="row row-cols-1 row-cols-lg-2 margin transit"
          id="step-2"
        >
          <div className="col">
            <div
              className="card p-2 pb-3 border-2 border-green"
              // style={{ background: "rgba(255,255,255,0.5)" }}
            >
              <div className="text-success fs-5 my-2">Step 2</div>
              <div className=" fs-3 my-2">Select Products</div>
              <div className="my-2 fs-6 text-muted">
                <div>Select products, or</div>
                <div>Add your own products</div>
              </div>
            </div>
          </div>
          <div className="col py-3">
            <div className="card p-3 border-0 h-100 pb-0 hh">
              <div className="h-100 bs-2 border-green"></div>
            </div>
          </div>
        </div>

        <div
          className="row row-cols-1 row-cols-lg-2 margin transit"
          id="step-3"
        >
          <div className="col">
            <div className="card p-2 pb-3 border-2 border-red">
              <div className="text-danger fs-5 my-2">Step 3</div>
              <div className=" fs-3 my-2">Share Business</div>
              <div className="my-2 fs-6 text-muted">
                Share your unique <br />
                link with your customers
              </div>
            </div>
          </div>
          <div className="col py-3">
            <div className="card p-3 border-0 h-100 pb-0 hh">
              <div className="h-100 bs-1 border-red"></div>
            </div>
          </div>
        </div>
      </div>
      <br />

      <div className="card mycard mx-auto mb-4 p-3 " id="btn">
        <button
          className="btn w-50 btn-outline-maroon mx-auto p-2"
          onClick={() => (window.location.href = "/login")}
        >
          Start Business Online
        </button>
      </div>
    </>
  );
}

export default HomePage;

/*

import React from "react";
// import { Link } from "react-router-dom";

function Home() {
  const [bool, setBool] = React.useState(true);
    
  const checkStat = (array) => {
    var pos = [];
    array.forEach((element) => {
      pos.push(element.getBoundingClientRect());
    });
    pos.forEach((element, i) => {
      if (element.top + 20 <= window.innerHeight) {
        array[i].classList.remove("margin");
        // array[i].classList.add("mt-5");
      }
    });
  };
  React.useEffect(() => {
    var s1 = document.getElementById("step-1");
    var s2 = document.getElementById("step-2");
    var s3 = document.getElementById("step-3");
    var btn = document.getElementById("btn");

    checkStat([s1, s2, s3, btn]);

    window.addEventListener("scroll", (e) => {
      if (window.scrollY < 20) {
        document.getElementById("header").classList.remove("shadow-lg");
      } else {
        document.getElementById("header").classList.add("shadow-lg");
      }
      checkStat([s1, s2, s3, btn]);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth < 994) setBool(true);
      else setBool(false);
    });
  }, []);

  return (
    <>
      
      <div
        className="container-fluid fs-3 p-3 sticky-top "
        id="header"
        style={{ zIndex: "10", backgroundColor: "white" }}
      >
        <div className="card mycard d-flex flex-row mx-auto">
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

    
      <div className="half">
        <div className="card p-3 border-0">
          <button
            className="btn btn-outline-maroon px-4"
            onClick={() => (window.location.href = "/login")}
          >
            New Business Account
          </button>
          <br />

          <button className="btn btn-outline-primary px-4">
            New User Account
          </button>
        </div>
        <br />
        <br />
      </div>

      
      <div className={"card mycard mx-auto " + (bool ? "text-center" : "")}>
        <div
          className="row row-cols-1 row-cols-lg-2 margin transit"
          id="step-1"
        >
          
          <div className="col">
            <div className="card p-2 ">
              <div className="text-primary fs-6 my-3">Step 1</div>
              <div className=" fs-3 ">Add Basic Details</div>
              <div className="mt-2 fs-6 text-muted">
                <div>Add Business Name</div>
                <div>Select Business Type</div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card p-3 pb-0 h-100 hh ">
              <div className="h-100 bs-1 border-blue"></div>
            </div>
          </div>
        </div>

        
        <div
          className="row row-cols-1 row-cols-lg-2 margin transit"
          id="step-2"
        >
          <div className="col">
            <div className="card p-3">
              <div className="text-success fs-6 my-3">Step 2</div>
              <div className=" fs-3 ">Select Products</div>
              <div className="mt-2 fs-6 text-muted">
                <div>Select products, or</div>
                <div>Add your own products</div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card p-3 h-100 pb-0 hh">
              <div className="h-100 bs-2 border-green"></div>
            </div>
          </div>
        </div>

        
        <div
          className="row row-cols-1 row-cols-lg-2 margin transit"
          id="step-3"
        >
          <div className="col">
            <div className="card p-3">
              <div className="text-danger fs-6 my-3">Step 3</div>
              <div className=" fs-3 ">Share Business</div>
              <div className="mt-2 fs-6 text-muted">
                Share your unique <br />
                link with your customers
              </div>
            </div>
          </div>
          <div className="col mb-3">
            <div className="card p-3 h-100 pb-0 hh">
              <div className="h-100 bs-1 border-red"></div>
            </div>
          </div>
        </div>
      </div>
      <br />

      
      <div className="card mycard mx-auto mb-4 p-3 margin transit" id="btn">
        <button
          className="btn w-50 btn-outline-maroon mx-auto p-2"
          onClick={() => (window.location.href = "/login")}
        >
          Start Business Online
        </button>
      </div>

      
      
    </>
  );
}

export default Home;


*/
