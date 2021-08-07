import cookie from "react-cookies";

const initialState = {
  user: cookie.load("user") ? cookie.load("user") : null,
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_USER":
      return { ...state, user: payload };
    default:
      return state;
  }
};
