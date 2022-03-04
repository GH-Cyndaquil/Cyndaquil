import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = () => {
  const userId = useSelector((state) => state.user.id);
  const isLoggedIn = useSelector((state) => !!state.user.id);
  const dispatch = useDispatch();

  return (
    <div id="navbar">
      <h1>NYET</h1>
      <nav>
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/products">Products</Link>
        </div>

        {isLoggedIn ? (
          <div>
            <Link to={`/users/${userId}`}>Account</Link>
            <a href="#" onClick={() => dispatch(logout())}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}

        <Link to="/viewcart">
          <img id="cartIcon" src="/images/carticon.png" />
          {/* <h5>{number of items in cart}</h5> */}
        </Link>
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
