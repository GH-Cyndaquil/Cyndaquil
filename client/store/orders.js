import axios from "axios";
const initState = {};

const GOT_CART = "GOT_CART";
const ADD_ITEM = "ADD_ITEM";

const addedItem = (item) => ({
  type: ADD_ITEM,
  item,
});

const gotCart = (cart) => ({
  type: GOT_CART,
  cart,
});

export const addItem = (item) => {
  return async (dispatch) => {
    try {
      console.log(item);
      const { data } = await axios.post(`/api/orders/`, item);
      dispatch(gotCart(data));
    } catch (error) {
      console.error("AddItem Failed");
    }
  };
};

export const fetchCart = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/orders/${id}`);
      dispatch(gotCart(data));
    } catch (error) {
      console.error("fetchCart failed");
    }
  };
};

export default (state = initState, action) => {
  switch (action.type) {
    case GOT_CART:
      return action.cart;
    case ADD_ITEM:
      return action.item;
    default:
      return state;
  }
};
