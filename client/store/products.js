import axios from "axios";
//Action creators
const SET_PRODUCTS = "SET_PRODUCTS";
const CREATE_PRODUCT = "CREATE_PRODUCT";
const UPDATE_PRODUCT = "UPDATE_PRODUCT";

//action types
const setProducts = (products) => ({
  type: SET_PRODUCTS,
  products,
});

const _createProduct = (product) => {
  console.log(product, CREATE_PRODUCT);
  return {
    type: CREATE_PRODUCT,
    product,
  };
};

const editProduct = (product) => ({
  type: UPDATE_PRODUCT,
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

export const createProduct = (product, history) => {
  return async (dispatch) => {
    try {
      console.log(history);
      const { data: created } = await axios.post("/api/adminproduct", product);
      console.log(created);
      dispatch(_createProduct(created));
      history.push(`/products/${created.id}`);
    } catch (err) {
      console.error(err);
    }
  };
};

export const adminEditProduct = (product) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `/api/adminproduct/${product.id}`,
        product
      );
      dispatch(editProduct(data));
    } catch (error) {
      console.error(error);
    }
  };
};

const initState = [];

export default (state = initState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    case CREATE_PRODUCT:
      return [...state, action.product];
    case UPDATE_PRODUCT:
      return action.product;
    default:
      return state;
  }
};
