import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Others/Navbar";
import Products from "./Products";

function Search() {
  let products = useSelector((state) => state.productReducer.products);
  const [searchItem, setItem] = useState("");
  const [displayProducts, setProducts] = useState("");

  const searchProduct = (item) => {
    if (item.length >= 3) {
      let temp = products?.filter((el) =>
        el.product_name.toLowerCase().includes(item.toLowerCase())
      );
      setProducts(temp);
    }
  };

  return (
    <>
      <Navbar isCart={true} title="Search" />
      <div className="container-fluid my-2">
        <input
          type="text"
          className="form-control"
          placeholder="Search For Products"
          value={searchItem}
          autoFocus
          onChange={(e) => {
            setItem(e.target.value);
            searchProduct(e.target.value);
          }}
        />
      </div>
      <hr />
      <div>
        {searchItem.length >= 3 ? (
          displayProducts?.length ? (
            <>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 m-2 g-2">
                {displayProducts.map((key, i) => {
                  return <Products product={key} key={i} />;
                })}
              </div>
            </>
          ) : (
            <div className="text-center text-muted fs-5">No Products Found</div>
          )
        ) : (
          <div className="text-center text-muted fs-5">
            Enter 3 letters to Search
          </div>
        )}
      </div>
    </>
  );
}

export default Search;
