import axios from "axios";

const SET_PRODUCTS = "SET_PRODUCTS";
const setProducts = (products) => ({
  type: SET_PRODUCTS,
  products,
});

export const fetchProducts = () => {
  return async (dispatch) => {
    const { data } = await axios.get("/api/products");
    return dispatch(setProducts(data));
  };
};

const initState = [];

export default (state = initState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
};
