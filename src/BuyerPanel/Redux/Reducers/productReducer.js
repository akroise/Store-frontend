const initialState = {
  products: null,
  categories: null,
  categorywise: null,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "SET_CATEGORY":
      return { ...state, categories: action.payload };

    case "ADD_CATEGORY":
      return {
        ...state,
        categorywise: {
          ...state.categorywise,
          [action.payload.key]: action.payload.data,
        },
      };

    default:
      return state;
  }
};
