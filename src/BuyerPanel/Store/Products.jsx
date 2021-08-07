import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PuffLoader } from "react-spinners";
import { addToCart, removeFromCart } from "../Redux/Actions/cartActions";

function Products({ product }) {
  const [img, setImg] = useState(true);
  const [btn, setBtn] = useState(true);
  const [qty, setQty] = useState(0);

  const updateCart = () => {
    let flag = false;
    let qty = 0;
    if (cart?.length) {
      cart.forEach((item) => {
        if (item.product_id === product.product_id) {
          flag = true;
          qty = item.qty;
        }
      });
    }
    if (flag) setBtn(false);
    else setBtn(true);

    setQty(qty);
  };

  let discount = Math.round((1 - product.sp / product.mrp) * 100);
  let dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer.cart);
  const user = useSelector((state) => state.userReducer.user?.uuid);

  // useEffect(() => {
  //   // setImg(true);
  //   updateCart();
  // }, [product]);

  // useEffect(() => {}, [user]);

  useEffect(() => {
    if (user) product.user = user;
    else product.user = null;
    updateCart();
  }, [cart, product]);
  return (
    <div className="col">
      <div className="card d-flex flex-row p-0 border-2 h-100">
        <div className="d-flex h-100 align-items-center">
          <div style={{ width: "100px", height: "100px" }}>
            <div style={{ position: "absolute", top: "40%", left: "10%" }}>
              <PuffLoader color="red" size="20px" loading={img} />
            </div>
            {discount >= 1 ? (
              <div className="discount">{discount}% off</div>
            ) : (
              ""
            )}
            <img
              src={product.product_img}
              alt={product.product_name}
              className="rounded-start p-0 my-auto"
              style={{
                width: "100px",
                height: "100px",
                display: img ? "none" : "block",
              }}
              onLoad={() => setImg(false)}
              // onError={() => console.log("hello")}
            />
          </div>
        </div>
        <div className="card border-0 p-2 w-100">
          <div className="card border-0 h-100 p-2 pb-0 ">
            <div className="card-title fs-sm mb-auto">
              {product.product_name}
            </div>
            <div className="card-text fs-xs mt-auto p-1">
              <div className="d-flex">
                <span className="fs-5 mt-auto text-orange">₹{product.sp}</span>
                &emsp;
                <strike className="fs-xs mt-auto pb-1">₹{product.mrp}</strike>
              </div>
              <hr className="my-2"/>
              <div className="d-flex p-0">
                {btn ? (
                  <button
                    className="btn p-1 btn-orange w-100"
                    onClick={() => dispatch(addToCart(product))}
                  >
                    Add to cart
                  </button>
                ) : (
                  <div className="d-flex w-100">
                    <button
                      className="w-25 btn border btn-orange p-1"
                      onClick={() => dispatch(removeFromCart(product))}
                    >
                      -
                    </button>
                    <span className="w-50 border fs-6 text-center py-1">
                      {qty}
                    </span>
                    <button
                      className="w-25 btn border btn-orange ms-auto p-1"
                      onClick={() => dispatch(addToCart(product))}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;

/*
const addToCart = (e, product) => {
    cartArray.push();
    console.log(cartArray);
    e.target.style.display = "none";
  };
  const add = (field) => {
    field.value = parseInt(field.value) + 1;
  };
  const minus = (field) => {
    if (parseInt(field.value) !== 1) field.value -= 1;
  };

  const isValid = (event) => {
    if (
      event.target.value === "" ||
      event.target.value.indexOf(".") !== -1 ||
      event.target.value <= 0
    )
      setBtn(true);
    else {
      setBtn(false);
    }
  };
*/

/*
<div className="col">
      <div className="card p-0 h-100">
        <div style={{ minHeight: "100px" }}>
          <img
            src={product.product_img}
            alt={product.product_name}
            className="card-img-top p-0"
            onLoad={() => setImg(false)}
          />
          <div className="container-fluid d-flex justify-content-center" >
            <PuffLoader color="grey" size="20" loading={img} />
          </div>
        </div>
        <div className="card-body pt-0">
          <div className="fs-sm">{product.product_name}</div>
        </div>
      </div>
    </div>
*/
