import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
import cookie from "react-cookies";
import Loading from "../Others/Loading";
import Navbar from "../Others/Navbar";
import { setByCategory } from "../Redux/Actions/productActions";

import Products from "./Products";
import GsignIn from "../Login/GsignIn";
import { getVendorDetails } from "../../Request/BuyerRequest/request";

function Home() {
  const [page, setPage] = useState(0);
  const [err, setErr] = useState(false);
  let store_link = useParams().store_link;

  let dispatch = useDispatch();
  let vendor = useSelector((state) => state.vendorReducer.vendor);
  let allProducts = useSelector((state) => state.productReducer.products);
  let categories = useSelector((state) => state.productReducer.categories);
  let categoryWise = useSelector((state) => state.productReducer.categorywise);
  const [productList, setList] = useState(null);

  const checkCategory = (category) => {
    if (categoryWise) {
      if (categoryWise[category]) {
        setList([]);
        setList(categoryWise[category]);
      } else {
        setList([]);
        let products = allProducts?.filter(
          (el) => el.product_type === category
        );
        dispatch(setByCategory({ key: category, data: products }));
        setList(products);
      }
    } else {
      let products = allProducts?.filter((el) => el.product_type === category);

      setList(products);

      dispatch(setByCategory({ key: category, data: products }));
    }
  };

  useEffect(() => {
    if (allProducts && categories)
      if (categories.length) checkCategory(categories[page].product_type);
      else setList([]);
  }, [allProducts, categories]);

  useEffect(() => {
    if (!cookie.load("store") && store_link !== null)
      cookie.save("store", store_link);
    if (!vendor)
      getVendorDetails(store_link, dispatch).then((err) => {
        if (err?.isAxiosError) setErr(true);
      });
  }, []);

  useEffect(() => {
    document.title = vendor?.business_name;
  }, [vendor]);

  return (
    <>
      {err ? (
        <Redirect
          push
          to={{
            pathname: "/error",
            state: {
              errCode: "408",
              errText: "Connection Timed Out",
              from: `/store/${store_link}`,
            },
          }}
        />
      ) : (
        ""
      )}
      {vendor?.business_name ? (
        <Navbar title={vendor.business_name} />
      ) : (
        <Loading />
      )}
      <div className="container-fluid my-3">
        <Link to="/search" style={{ textDecoration: "none" }}>
          <span className="form-control text-muted">Search Products...</span>
        </Link>
      </div>
      {categories ? (
        categories.length ? (
          <ul
            className="nav nav-tabs mx-2"
            style={{ width: "100vw !important", height: "20px !important" }}
          >
            {categories.map((key, i) => {
              return (
                <li
                  className="nav-item"
                  key={i}
                  onClick={() => {
                    setPage(i);
                    checkCategory(key.product_type);
                  }}
                >
                  <span
                    className={"nav-link " + (i === page ? "active" : "")}
                    aria-current="page"
                    href="#"
                    style={{ cursor: "pointer" }}
                  >
                    {key.product_type}
                  </span>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="container-fluid text-center">No Categories</div>
        )
      ) : (
        <Loading />
      )}
      {allProducts && categories ? (
        productList ? (
          productList.length ? (
            <>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 m-2 g-2">
                {productList.map((key, i) => {
                  return <Products product={key} key={i} />;
                })}
              </div>
            </>
          ) : (
            <div className="container-fluid text-center">No Products</div>
          )
        ) : (
          <Loading />
        )
      ) : (
        <Loading mt="30vh" />
      )}
      <GsignIn />
    </>
  );
}

export default Home;
