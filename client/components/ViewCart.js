import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
import { fetchCart } from "../store/orders";
import { Link } from "react-router-dom";

const ViewCart = (props) => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => {
    return state.user.id;
  });

  const curCart = useSelector((state) => {
    return state.orders.products;
  });

  console.log("user------", curCart);

  useEffect(() => {
    dispatch(fetchCart(2));
  }, []);

  if (curCart) {
    return (
      <>
        <main id="cart">
          <div>
            <table>
              <caption>Your Cart</caption>
              <tbody>
                <tr>
                  <th></th>
                  <th>Qty.</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                </tr>
                {curCart.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img src={product.imageUrl}></img>
                    </td>

                    <td>{product["order-details"].quantityOrdered}</td>
                    <td>{product["order-details"].price}</td>
                    <td>
                      {product["order-details"].price *
                        product["order-details"].quantityOrdered}
                    </td>
                    <td>
                      <i
                        className="fa fa-trash-o"
                        style={{ fontSize: "24px" }}
                      ></i>
                    </td>
                  </tr>
                ))}

                <tr>
                  <td></td>
                  <td></td>
                  <td>Total:</td>
                  {/* need to figure out how to do a total here */}
                  <td>43.70</td>
                  <td>
                    <Link to="/checkoutuser">
                      <button>Checkout</button>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </>
    );
  } else {
    return (
      <main id="cart">
        <h1>Your Cart is Empty!</h1>
      </main>
    );
  }
};
export default ViewCart;
