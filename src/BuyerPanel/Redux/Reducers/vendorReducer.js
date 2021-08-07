const initialState = {
  vendor: null,
};

export const vendorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_VENDOR_DETAILS":
      return { ...state, vendor: action.payload };
    default:
      return state;
  }
};
