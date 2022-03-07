import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from '../store';
import Signup from './Signup';
import { Link } from 'react-router-dom';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => !!state.user.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authenticate({ username, password }, 'login'));
  };

  return (
    <div className="login-container">
      <div className="login-background"></div>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h1>Login</h1>
          <div className="form-element">
            <label htmlFor="username">
              <small>Username</small>
            </label>
            <input
              name="username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="form-element">
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button type="submit">Login</button>
          <Link to="/signup">Don't have an account? Sign Up</Link>
          {error && error.response && (
            <div className="error">{error.response.data}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
