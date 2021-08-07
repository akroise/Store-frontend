import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Error from "./Others/Error";
import ThankYou from "./Others/ThankYou";
import Cart from "./Store/Cart";

import "./index.css";
import Home from "./Store/Home";
import Search from "./Store/Search";
import Account from "./User/Account";
import Address from "./User/Address";
import CheckOut from "./User/CheckOut";
import OrderPage from "./User/OrderPage";
import Orders from "./User/Orders";
import PlaceOrder from "./User/PlaceOrder";
import StoreList from "./StoreList";
import { Provider } from "react-redux";
import store from "./Redux/store";

function App() {
  // code
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          {/* <Route path="/" exact>
          <Redirect to="/store/My-Store-7" />
        </Route> */}
          <Route path="/store" exact component={StoreList} />
          <Route path="/error" component={(props) => <Error {...props} />} />
          <Route path="/store/:store_link/cart" component={Cart} />
          <Route path="/store/:store_link" exact component={Home} />
          <Route path="/account" component={Account} />
          <Route path="/address" component={Address} />
          <Route path="/orders" exact component={Orders} />
          <Route path="/store/:store_link/checkout" component={CheckOut} />
          <Route path="/search" component={Search} />
          <Route path="/store/:store_link/placeOrder" component={PlaceOrder} />
          <Route path="/orderPlaced" component={ThankYou} />
          <Route path="/orders/:order_id" component={OrderPage} />
          <Route
            component={(props) => (
              <Error errCode="404" errText="Page Not Found" />
            )}
          />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
