import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = (props) => {
  const userId = useSelector((state) => state.user.id);
  const isLoggedIn = useSelector((state) => !!state.user.id);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return (
    <div id="navbar">
      <nav>
        <h1 className="nav-button">NYET</h1>
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home" className="nav-button">
            Home
          </Link>
          <Link to="/products" className="nav-button">
            Products
          </Link>
        </div>

        {isLoggedIn ? (
          <div id="nav-user-control">
            <Link to={`/users/${userId}`} className="nav-button">
              <div>Hello, {user.username}</div>
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
              Cart
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
              Cart
              {/* <h5>{number of items in cart}</h5> */}
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
