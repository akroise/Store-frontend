import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import Home_Vendor from "./VendorPanel/Home_Vendor";
import App from "./BuyerPanel/App";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/store" component={App} />
      <Route path="/seller" component={Home_Vendor} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
