import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, gotCart, removeItem } from '../store/orders';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
          +curCart.products[i]['order-details'].price *
          curCart.products[i]['order-details'].quantityOrdered;
      }
    } else {
      for (let i = 0; i < curCart.products.length; i++) {
        total +=
          +curCart.products[i].price * curCart.products[i].quantityOrdered;
      }
    }
    return numberWithCommas(total);
  }

  function deleteItem(evt, product) {
    if (userId) {
      dispatch(removeItem({ ...product, userId }));
    } else {
      let cart = JSON.parse(localStorage.getItem('cart'));
      delete cart[`${product.id}`];
      let products = [];
      for (let key in cart) {
        products.push(cart[key]);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch(gotCart({ products: products }));
    }
  }

  function updateItem(evt, product) {}

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

                        <td>
                          {' '}
                          <input
                            type="number"
                            id="cart-item-quantity"
                            min={1}
                            defaultValue={product.quantity}
                          ></input>
                          <button>Update</button>
                        </td>
                        <td>${numberWithCommas(curCart.products[i].price)}</td>
                        <td>
                          $
                          {numberWithCommas(
                            product['order-details'].price *
                              product['order-details'].quantityOrdered
                          )}
                        </td>
                        <td>
                          <i
                            className="fa fa-trash-o"
                            style={{ fontSize: '24px' }}
                            onClick={(evt) => deleteItem(evt, product)}
                          ></i>
                        </td>
                      </tr>
                    ))
                  : curCart.products.map((product, i) => (
                      <tr key={product.id}>
                        <td>
                          <img src={product.imageUrl}></img>
                        </td>

                        <td>
                          <input
                            type="number"
                            min={1}
                            defaultValue={product.quantity}
                          ></input>
                          {curCart.products[i].quantity}
                          <button>Update</button>
                        </td>
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
                            onClick={(evt) => deleteItem(evt, product)}
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
                    {userId ? (
                      <Link to="/checkoutuser">
                        <button>Checkout</button>
                      </Link>
                    ) : (
                      <Link to="/checkoutguest">
                        <button>Checkout</button>
                      </Link>
                    )}
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
