import axios from "axios";
const initState = {};

const GOT_CART = "GOT_CART";
const ADD_ITEM = "ADD_ITEM";
const DELETE_ITEM = "DELETE_ITEM";

const addedItem = (item) => ({
  type: ADD_ITEM,
  item,
});

export const gotCart = (cart) => ({
  type: GOT_CART,
  cart,
});

const deletedItem = (cart) => ({
  type: DELETE_ITEM,
  cart,
});

export const addItem = (item) => {
  return async (dispatch) => {
    try {
      console.log(item);
      const { data } = await axios.post(`/api/orders/`, item);
      console.log(`DATA:`, data);
      dispatch(fetchCart(item.userId));
    } catch (error) {
      console.error("AddItem Failed");
    }
  };
};

export const fetchCart = (id) => {
  return async (dispatch) => {
    try {
      if (id !== undefined) {
        const { data } = await axios.get(`/api/orders/cart/${id}`);
        dispatch(gotCart(data));
      }
    } catch (error) {
      console.error("fetchCart failed");
    }
  };
};

export const removeItem = (item) => {
  return async (dispatch) => {
    try {
      let { data } = await axios.delete(
        `/api/orders/${item["order-details"].orderId}`,
        {
          headers: item,
        }
      );
      dispatch(gotCart(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateItem = (item) => {
  return async (dispatch) => {
    try {
      let { data } = await axios.put(
        `/api/orders/${item["order-details"].orderId}`,
        item
      );
      dispatch(fetchCart(item.userId));
    } catch (err) {
      console.log(err);
    }
  };
};

export default (state = initState, action) => {
  switch (action.type) {
    case GOT_CART:
      return action.cart;
    case ADD_ITEM:
      return action.item;
    case DELETE_ITEM:
      return state.filter((product) => product.id !== action.product.id);

    default:
      return state;
  }
};
