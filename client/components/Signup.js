import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../store";
import { Link } from "react-router-dom";

const Signup = () => {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const error = useSelector((state) => state.user.error);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(authenticate(newUser, "signup"));
  };

  return (
    <div className="login-container">
      <div className="signup-background"></div>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h1>Signup</h1>
          <div className="error">{error ? error.response.data : ""}</div>
          <div className="form-element">
            <label htmlFor="firstName">
              <small>First Name</small>
            </label>
            <input
              name="firstName"
              type="text"
              onChange={handleChange}
              value={newUser.firstName}
              required
            />
          </div>
          <div className="form-element">
            <label htmlFor="lastName">
              <small>Last Name</small>
            </label>
            <input
              name="lastName"
              type="text"
              onChange={handleChange}
              value={newUser.lastName}
              required
            />
          </div>
          <div className="form-element">
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input
              name="email"
              type="text"
              onChange={handleChange}
              value={newUser.email}
              required
            />
          </div>
          <div className="form-element">
            <label htmlFor="username">
              <small>Username</small>
            </label>
            <input
              name="username"
              type="text"
              onChange={handleChange}
              value={newUser.username}
              required
            />
          </div>
          <div className="form-element">
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              value={newUser.password}
              required
            />
          </div>
          <button type="submit">Signup</button>
          <Link to="/login">Already have an account? Login</Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
