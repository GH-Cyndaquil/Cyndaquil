import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = () => {
  const userId = useSelector((state) => state.user.id);
  const isLoggedIn = useSelector((state) => !!state.user.id);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>NYET</h1>
      <nav>
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/products">Products</Link>
        </div>

        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to={`/users/${userId}`}>Account</Link>
            <a href="#" onClick={() => dispatch(logout())}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
        <Link to="/viewcart">
          <img id="cartIcon" src="/images/carticon.png" />
        </Link>
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
