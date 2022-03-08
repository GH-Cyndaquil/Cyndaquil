import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../store";
import { fetchCart } from "../store/orders";

const Navbar = (props) => {
  const userId = useSelector((state) => state.user.id);
  const isLoggedIn = useSelector((state) => !!state.user.id);
  const isAdmin = useSelector((state) => !!state.user.id);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  let cart = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchCart(userId));
  }, [userId]);

  function cartCounter() {
    if (cart.products !== undefined) {
      return cart.products.reduce((accum, num) => {
        accum += num["order-details"].quantityOrdered;
        return accum;
      }, 0);
    } else {
      return 0;
    }
  }

  function localStorageCount() {
    if (localStorage.cart) {
      let cart = Object.values(JSON.parse(localStorage.getItem("cart")));
      let items = 0;
      for (let i = 0; i < cart.length; i++) {
        items += Number(cart[i].quantityOrdered);
      }
      return items;
    } else {
      return 0;
    }
  }

  return (
    <div id="navbar">
      <nav>
        <a href="/">
          <h1 className="title">NYET</h1>
        </a>

        <div>
          <NavLink exact to="/" className="nav-button">
            Home
          </NavLink>
          <NavLink to="/products?page=1" className="nav-button">
            Products
          </NavLink>
        </div>
        {isLoggedIn ? (
          <div id="nav-user-control">
            {isAdmin ? (
              <div>
                <NavLink to="/admin" className="nav-button">
                  Admin
                </NavLink>
              </div>
            ) : null}
            <NavLink to={`/users/${userId}`} className="nav-button">
              <div id="hello-user">Hello, {user.username}</div>
              Account
            </NavLink>
            <a
              className="nav-button"
              href="#"
              onClick={() => dispatch(logout())}
            >
              Logout
            </a>
            <NavLink to="/viewcart" className="nav-button">
              <div id="container">
                <i
                  id="shopping-cart"
                  className="fa fa-shopping-cart"
                  style={{ fontSize: "50px" }}
                ></i>
                {cart.id !== undefined && cart !== null ? (
                  <div id="cart-count">{cartCounter()}</div>
                ) : (
                  <div id="cart-count">{0}</div>
                )}
              </div>
              {/* <h5>{number of items in cart}</h5> */}
            </NavLink>
          </div>
        ) : (
          <div id="nav-user-control">
            <NavLink to="/login" className="nav-button">
              Login
            </NavLink>
            <NavLink to="/signup" className="nav-button">
              Sign Up
            </NavLink>
            <NavLink to="/viewcart" className="nav-button">
              <div id="container">
                <i
                  id="shopping-cart"
                  className="fa fa-shopping-cart"
                  style={{ fontSize: "50px" }}
                ></i>
                <div id="cart-count">{localStorageCount()}</div>
              </div>
              {/* <h5>{number of items in cart}</h5> */}
            </NavLink>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
