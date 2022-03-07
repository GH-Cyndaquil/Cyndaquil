import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
import { fetchCart } from "../store/orders";
import { Link } from "react-router-dom";
import { deleteItem } from "../store/orders";

const ViewCart = (props) => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => {
    return state.user.id;
  });

  useEffect(() => {
    dispatch(fetchCart(2));
  }, []);

  const curCart = useSelector((state) => {
    return state.orders.products;
  });

  console.log("user------", curCart);

  if (curCart) {
    return (
      <>
        <main id="cart">
          <div id="cartTable">
            <table>
              <caption>Your Cart</caption>
              <tbody>
                <tr>
                  <th></th>
                  <th>Qty.</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                  <th></th>
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
                        onClick={() => deleteItem(product.id)}
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
                    {/* <Link to="/checkoutuser">
                      <button>Checkout</button>
                    </Link> */}
                    <Link to="/checkout">
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
