import axios from "axios";
const initState = [];

const GOT_CART = "GOT_CART";

const gotCart = (cart) => ({
  type: GOT_CART,
  cart,
});

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
    default:
      return state;
  }
};
