import cookie from "react-cookies";
import { db } from "../../Others/firebaseConfig";

const initialState = {
  cart: cookie.load("cart") ? cookie.load("cart") : [],
  total: cookie.load("cart")
    ? cookie
        .load("cart")
        .reduce((start, index) => start + index.qty * index.sp, 0)
    : 0,
};

export const cartReducer = (state = initialState, { type, payload }) => {
  let temp;
  let sum = 0;
  const inCart = () => {
    let flag = false;
    if (state.cart?.length) {
      state.cart.forEach((item) => {
        if (item.product_id === payload.product_id) {
          flag = true;
        }
      });
    }
    return flag;
  };
  switch (type) {
    case "FETCH_CART":
      sum = payload?.reduce((sum, index) => sum + index.qty * index.sp, 0);
      return { ...state, cart: payload, total: sum };
    case "ADD_TO_CART":
      if (inCart()) {
        temp = {
          ...state,
          cart: state.cart.map((item) => {
            if (item.product_id === payload.product_id)
              return {
                ...item,
                qty: (item.qty += 1),
              };
            return item;
          }),
        };

        sum = temp.cart?.reduce((sum, index) => sum + index.qty * index.sp, 0);
        temp = { ...temp, total: sum };
        state = temp;
        if (payload.user !== null) {
          let uuid = payload.user;
          delete payload.user;
          db.collection("Users").doc(uuid).set({ cart: state.cart });
        }
        cookie.save("cart", JSON.stringify(state.cart), { path: "/" });
        return state;
      } else {
        payload.qty = 1;

        temp = {
          ...state,
          cart: [...state.cart, payload],
        };

        sum = temp.cart?.reduce((sum, index) => sum + index.qty * index.sp, 0);
        temp = { ...temp, total: sum };
        state = temp;

        if (payload.user !== null) {
          let uuid = payload.user;
          delete payload.user;
          db.collection("Users").doc(uuid).set({ cart: state.cart });
        }
        cookie.save("cart", JSON.stringify(state.cart), { path: "/" });
        return state;
      }

    case "REMOVE_FROM_CART":
      let index = state.cart.findIndex(
        (item) => item.product_id === payload.product_id
      );
      if (state.cart[index].qty === 1) {
        let cart = state.cart;
        cart.splice(index, 1);
        if (cart.length) {
          temp = {
            ...state,
            cart: state.cart.filter(
              (item) => item.product_id !== payload.product_id
            ),
          };

          sum = temp.cart?.reduce(
            (sum, index) => sum + index.qty * index.sp,
            0
          );
          temp = { ...temp, total: sum };
          state = temp;
          if (payload.user !== null) {
            let uuid = payload.user;
            delete payload.user;
            db.collection("Users").doc(uuid).set({ cart: state.cart });
          }
          cookie.save("cart", JSON.stringify(state.cart), { path: "/" });
          return state;
        } else {
          cookie.remove("cart", { path: "/" });
          if (payload.user !== null)
            db.collection("Users").doc(payload.user).set({ cart: new Array() });
          return {
            ...state,
            cart: new Array(),
          };
        }
      } else {
        temp = {
          ...state,
          cart: state.cart.map((item) => {
            if (item.product_id === payload.product_id) {
              return {
                ...item,
                qty: (item.qty -= 1),
              };
            } else return item;
          }),
        };

        sum = temp.cart?.reduce((sum, index) => sum + index.qty * index.sp, 0);
        temp = { ...temp, total: sum };
        state = temp;
        if (payload.user !== null) {
          let uuid = payload.user;
          delete payload.user;
          db.collection("Users").doc(uuid).set({ cart: state.cart });
        }
        cookie.save("cart", JSON.stringify(state.cart), { path: "/" });
        return state;
      }

    default:
      return state;
  }
};
