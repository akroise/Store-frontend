export const setProducts = (products) => {
  return {
    type: "SET_PRODUCTS",
    payload: products,
  };
};

export const setCategories = (categories) => {
  return {
    type: "SET_CATEGORY",
    payload: categories,
  };
};

export const setByCategory = (category) => {
  
  return {
    type: "ADD_CATEGORY",
    payload: category,
  };
};
