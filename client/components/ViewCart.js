import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, gotCart, removeItem, updateItem } from '../store/orders';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ViewCart = (props) => {
  const dispatch = useDispatch();
  let [productQuantities, setProductQuantities] = useState({});
  const isLoggedIn = useSelector((state) => !!state.user.id);
  const userId = useSelector((state) => {
    return state.user.id;
  });

  let stateCart = useSelector((state) => {
    return state.orders;
  });

  let [curCart, setCurCart] = useState({});

  useEffect(() => {
    if (!isLoggedIn && localStorage.cart) {
      let products = [];
      let cart = JSON.parse(localStorage.getItem('cart'));
      for (let key in cart) {
        products.push(cart[key]);
      }
      dispatch(gotCart({ products: products }));
    } else {
      dispatch(fetchCart(userId));
    }
  }, []);

  useEffect(() => {
    setCurCart(stateCart);
  }, [stateCart]);

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
          curCart.products[i]['order-details'].quantityOrdered;
      }
    } else {
      for (let i = 0; i < curCart.products.length; i++) {
        total +=
          +curCart.products[i].unitPrice * curCart.products[i].quantityOrdered;
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

  function updateItemCount(evt, product) {
    if (userId) {
      dispatch(
        updateItem({
          ...product,
          userId,
          quantity: Number(productQuantities[evt.target.id].quantity),
        })
      );
    } else {
      let cart = JSON.parse(localStorage.getItem('cart'));
      let cartItem = cart[`${evt.target.id}`];
      cartItem.quantityOrdered = Number(
        productQuantities[evt.target.id].quantity
      );
      cartItem.price = productQuantities[evt.target.id].price.toString();
      cartItem.unitPrice = productQuantities[evt.target.id].unitPrice;
      let products = [];
      for (let key in cart) {
        products.push(cart[key]);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch(gotCart({ products: products }));
    }
  }

  if (curCart.products && curCart.products.length > 0) {
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
                {isLoggedIn && curCart.id
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
                            defaultValue={
                              product['order-details'].quantityOrdered
                            }
                            onChange={(evt) =>
                              setProductQuantities({
                                ...productQuantities,
                                [product.id]: {
                                  quantity: evt.target.value,
                                  price: evt.target.value * product.price,
                                  unitPrice: product.unitPrice,
                                  imageUrl: product.imageUrl,
                                },
                              })
                            }
                          ></input>
                          <button
                            id={product.id}
                            onClick={(evt) => updateItemCount(evt, product)}
                          >
                            Update
                          </button>
                        </td>
                        <td>${numberWithCommas(product.price)}</td>
                        <td>
                          $
                          {numberWithCommas(
                            +product.price *
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
                            id="cart-item-quantity"
                            min={1}
                            defaultValue={product.quantityOrdered}
                            onChange={(evt) =>
                              setProductQuantities({
                                ...productQuantities,
                                [product.id]: {
                                  quantity: evt.target.value,
                                  price: evt.target.value * product.price,
                                  unitPrice: product.unitPrice,
                                  imageUrl: product.imageUrl,
                                },
                              })
                            }
                          ></input>
                          {curCart.products[i].quantity}
                          <button
                            id={product.id}
                            onClick={(evt) => updateItemCount(evt, product)}
                          >
                            Update
                          </button>
                        </td>
                        <td>${numberWithCommas(product.unitPrice)}</td>
                        <td>
                          $
                          {numberWithCommas(
                            +product.unitPrice *
                              curCart.products[i].quantityOrdered
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
                    {/* {userId ? (
                      <Link to="/checkoutuser">
                        <button>Checkout</button>
                      </Link>
                    ) : (
                      <Link to="/checkoutguest">
                        <button>Checkout</button>
                      </Link>
                    )} */}
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
