import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import { productReducer } from "./productReducer";
import { userReducer } from "./userReducer";
import { vendorReducer } from "./vendorReducer";

const reducer = combineReducers({
  productReducer: productReducer,
  vendorReducer: vendorReducer,
  cartReducer: cartReducer,
  userReducer: userReducer,
});
export default reducer;
