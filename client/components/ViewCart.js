import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
import { fetchCart } from "../store/orders";

function ViewCart() {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.id);

  const curCart = useSelector((state) => {
    return state.orders.products;
  });

  //  let [regionFilter, setRegionFilter] = useState("");
  //  let [ingredientFilter, setIngredientFilter] = useState("");

  useEffect(() => {
    dispatch(fetchCart(2));
  }, []);

  if (curCart) {
    return (
      //need to check length of cart, if it's empty display one thing if not display the other

      <main id="cart">
        <h1>Your Cart</h1>

        {curCart.map((product) => (
          <div key={product.id}>
            <img src={product.imageUrl}></img>
            <h2>Qty.</h2>
            <h3>{product["order-details"].quantityOrdered}</h3>
            <h2>Price</h2>
            <h3>{product["order-details"].price}</h3>
            <h2>Subtotal</h2>
            <h3>
              {product["order-details"].price *
                product["order-details"].quantityOrdered}
            </h3>
          </div>
        ))}
        {console.log("this is the console log-------", curCart)}
      </main>
    );
  } else {
    return (
      <main id="cart">
        <h1>Your Cart is empty</h1>
      </main>
    );
  }
}
export default ViewCart;
