import React from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useParams,
} from "react-router-dom";
import Navbar from "../Basics/Navbar";
import Orders from "./Orders/Orders";
import Products from "./Products";
import Profile from "./Profile";

function Account() {
  const store_link = useParams().store_link;
  return (
    <BrowserRouter>
      <Navbar store={store_link} />
      <Switch>
        <Redirect
          exact
          from="/seller/:store_link"
          to={`/seller/${store_link}/profile`} 
        />
        <Route path="/seller/:store_link/profile">
          <Profile />
        </Route>
        <Route path="/seller/:store_link/products">
          <Products />
        </Route>
        <Route path="/seller/:store_link/orders">
          <Orders />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Account;
