import axios from "axios";

const SET_SELECTED_PRODUCT = "SET_SELECTED_PRODUCT";

const setSelectedProduct = (product) => ({
  type: SET_SELECTED_PRODUCT,
  product,
});

export const fetchSelectedProduct = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/products/${id}`);
    return dispatch(setSelectedProduct(data));
  };
};

const initState = {};

export default (state = initState, action) => {
  switch (action.type) {
    case SET_SELECTED_PRODUCT:
      return action.product;
    default:
      return state;
  }
};
