import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, gotCart } from '../store/orders';
import { Link } from 'react-router-dom';

const ViewCart = (props) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => {
    return state.user.id;
  });
  let curCart = useSelector((state) => {
    return state.orders;
  });

  useEffect(() => {
    if (localStorage.cart) {
      let products = [];
      let cart = JSON.parse(localStorage.getItem('cart'));
      for (let key in cart) {
        products.push(cart[key]);
      }
      dispatch(gotCart({ products: products }));
    }
  }, []);

  useEffect(() => {
    if (userId !== undefined) {
      dispatch(fetchCart(userId));
    }
  }, [userId]);

  function numberWithCommas(price) {
    if (price.toString().split('.')[1] !== undefined) {
      if (price.toString().split('.')[1].length === 1) {
        price = price.toString() + 0;
      }
    }
    return Number(price)
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function getTotal() {
    let total = 0;
    if (curCart.id) {
      for (let i = 0; i < curCart.products.length; i++) {
        total +=
          +curCart.products[i].price *
          curCart['order-details'][i].quantityOrdered;
      }
    } else {
      for (let i = 0; i < curCart.products.length; i++) {
        total +=
          +curCart.products[i].price * curCart.products[i].quantityOrdered;
      }
    }
    return numberWithCommas(total);
  }

  if (curCart.id !== undefined || Object.keys(curCart).length > 0) {
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
                {curCart.shipState !== undefined
                  ? curCart.products.map((product, i) => (
                      <tr key={product.id}>
                        <td>
                          <img className="img" src={product.imageUrl}></img>
                        </td>

                        <td>{curCart['order-details'][i].quantityOrdered}</td>
                        <td>${numberWithCommas(curCart.products[i].price)}</td>
                        <td>
                          $
                          {numberWithCommas(
                            curCart.products[i].price *
                              curCart['order-details'][i].quantityOrdered
                          )}
                        </td>
                        <td>
                          <i
                            className="fa fa-trash-o"
                            style={{ fontSize: '24px' }}
                          ></i>
                        </td>
                      </tr>
                    ))
                  : curCart.products.map((product, i) => (
                      <tr key={product.id}>
                        <td>
                          <img src={product.imageUrl}></img>
                        </td>

                        <td>{curCart.products[i].quantity}</td>
                        <td>${numberWithCommas(curCart.products[i].price)}</td>
                        <td>
                          $
                          {numberWithCommas(
                            +curCart.products[i].price *
                              +curCart.products[i].quantityOrdered
                          )}
                        </td>
                        <td>
                          <i
                            className="fa fa-trash-o"
                            style={{ fontSize: '24px' }}
                          ></i>
                        </td>
                      </tr>
                    ))}

                <tr>
                  <td></td>
                  <td></td>
                  <td>Total</td>
                  <td>${getTotal()}</td>
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
