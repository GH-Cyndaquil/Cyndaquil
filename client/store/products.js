import axios from "axios";
//Action creators
const SET_PRODUCTS = "SET_PRODUCTS";
const ADD_PRODUCT = "ADD_PRODUCT";

//action types
const setProducts = (products) => ({
  type: SET_PRODUCTS,
  products,
});
const addedProduct = (product) => ({
  type: ADD_PRODUCT,
  product,
});

//thunk creators
export const fetchProducts = (location, filters) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/products${location.search}`, {
      headers: filters,
    });
    return dispatch(setProducts(data));
  };
};

export const addProduct = (product) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/adminproduct", product);
    dispatch(addedProduct(data));
  } catch (error) {
    console.log(error);
  }
  s;
};

const initState = [];

export default (state = initState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    case ADD_PRODUCT:
      return [action.product, ...state];
    default:
      return state;
  }
};
