import React from "react";
import "material-icons/iconfont/material-icons.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./Login/Login";
import Account from "./Account/Account";

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Switch>
          <Route path="/seller" exact>
            <Login />
          </Route>
          <Route path="/seller/:store_link">
            <Account />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
