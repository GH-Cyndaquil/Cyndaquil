import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { fetchCart } from '../store/orders';

const Navbar = (props) => {
  const userId = useSelector((state) => state.user.id);
  const isLoggedIn = useSelector((state) => !!state.user.id);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  let cart = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchCart(userId));
  }, [userId]);

  function cartCounter() {
    if (cart.products !== undefined) {
      return cart.products.reduce((accum, num) => {
        accum += num['order-details'].quantityOrdered;
        return accum;
      }, 0);
    } else {
      return 0;
    }
  }

  function localStorageCount() {
    if (localStorage.cart) {
      let cart = Object.values(JSON.parse(localStorage.getItem('cart')));
      let items = 0;
      for (let i = 0; i < cart.length; i++) {
        items += Number(cart[i].quantityOrdered);
      }
      return items;
    } else {
      return 0;
    }
  }
  console.log('cart', cart);
  return (
    <div id="navbar">
      <nav>
        <h1 className="title">NYET</h1>
        <div>
          <Link to="/home" className="nav-button">
            Home
          </Link>
          <Link to="/products?page=1" className="nav-button">
            Products
          </Link>
        </div>

        {isLoggedIn ? (
          <div id="nav-user-control">
            <Link to={`/users/${userId}`} className="nav-button">
              <div id="hello-user">Hello, {user.username}</div>
              Account
            </Link>
            <a
              className="nav-button"
              href="#"
              onClick={() => dispatch(logout())}
            >
              Logout
            </a>
            <Link to="/viewcart" className="nav-button">
              <div id="container">
                <i
                  id="shopping-cart"
                  className="fa fa-shopping-cart"
                  style={{ fontSize: '50px' }}
                ></i>
                {cart.id !== undefined ? (
                  <div id="cart-count">{cartCounter()}</div>
                ) : (
                  <div id="cart-count">{0}</div>
                )}
              </div>
              {/* <h5>{number of items in cart}</h5> */}
            </Link>
          </div>
        ) : (
          <div id="nav-user-control">
            <Link to="/login" className="nav-button">
              Login
            </Link>
            <Link to="/signup" className="nav-button">
              Sign Up
            </Link>
            <Link to="/viewcart" className="nav-button">
              <div id="container">
                <i
                  id="shopping-cart"
                  className="fa fa-shopping-cart"
                  style={{ fontSize: '50px' }}
                ></i>
                <div id="cart-count">{localStorageCount()}</div>
              </div>
              {/* <h5>{number of items in cart}</h5> */}
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
